"use server";

import { db } from "@/lib/db";
import { sql } from "kysely";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export type DashboardStats = {
    totalApplications: number;
    totalJobs: number;
    recentApplications: any[];
};

export async function getDashboardStats(): Promise<DashboardStats> {
    try {
        const totalApps = await db
            .selectFrom("career_applications")
            .select(db.fn.count("id").as("count"))
            .executeTakeFirst();

        const totalJobs = await db
            .selectFrom("job_postings")
            .select(db.fn.count("id").as("count"))
            .where("status", "=", "active")
            .executeTakeFirst();

        const recentApps = await db
            .selectFrom("career_applications")
            .leftJoin("job_postings", "job_postings.id", "career_applications.job_id")
            .select([
                "career_applications.id",
                "career_applications.first_name",
                "career_applications.last_name",
                "career_applications.email",
                "career_applications.status",
                "career_applications.created_at",
                "job_postings.title as job_title"
            ])
            .orderBy("career_applications.created_at", "desc")
            .limit(5)
            .execute();

        return {
            totalApplications: Number(totalApps?.count || 0),
            totalJobs: Number(totalJobs?.count || 0),
            recentApplications: recentApps,
        };
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        return {
            totalApplications: 0,
            totalJobs: 0,
            recentApplications: [],
        };
    }
}

export async function deleteApplication(id: number) {
    try {
        await db.deleteFrom("career_applications").where("id", "=", id).execute();
        return { success: true };
    } catch (error) {
        console.error("Failed to delete application:", error);
        return { success: false, error: "Failed to delete application" };
    }
}

export async function getAllApplications() {
    try {
        return await db
            .selectFrom("career_applications")
            .leftJoin("job_postings", "job_postings.id", "career_applications.job_id")
            .select([
                "career_applications.id",
                "career_applications.first_name",
                "career_applications.last_name",
                "career_applications.email",
                "career_applications.phone",
                "career_applications.message",
                "career_applications.resume_path",
                "career_applications.status",
                "career_applications.notes",
                "career_applications.created_at",
                "job_postings.title as job_title"
            ])
            .orderBy("career_applications.created_at", "desc")
            .execute();
    } catch (error) {
        console.error("Failed to fetch all applications:", error);
        return [];
    }
}

export async function updateApplicationStatus(id: number, status: string) {
    try {
        await db
            .updateTable("career_applications")
            .set({ status: status as any })
            .where("id", "=", id)
            .execute();
        return { success: true };
    } catch (error) {
        console.error("Failed to update application status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

export async function updateApplicationNotes(id: number, notes: string) {
    try {
        await db
            .updateTable("career_applications")
            .set({ notes })
            .where("id", "=", id)
            .execute();
        return { success: true };
    } catch (error) {
        console.error("Failed to update application notes:", error);
        return { success: false, error: "Failed to update notes" };
    }
}

// Team Management Actions
export async function createTeamMember(data: { name: string; email: string; password: string; role: 'admin' | 'team_member' }) {
    try {
        // Use Better-Auth's API to create the user properly
        // This ensures passwords are hashed correctly by Better-Auth
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/sign-up/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                name: data.name,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create user');
        }

        const result = await response.json();
        const userId = result.user?.id;

        if (!userId) {
            throw new Error('User ID not returned from sign-up');
        }

        // Update the user's role and status
        await db
            .updateTable("user")
            .set({
                role: data.role,
                status: "active",
                emailVerified: true,
                updatedAt: new Date()
            })
            .where("id", "=", userId)
            .execute();

        revalidatePath("/admin/team");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to create team member:", error);
        if (error.message?.includes('already exists')) {
            return { success: false, error: "User with this email already exists" };
        }
        return { success: false, error: error.message || "Failed to create team member" };
    }
}

export async function updateTeamMember(id: string, data: { name?: string; email?: string; role?: 'admin' | 'team_member'; status?: 'active' | 'inactive'; password?: string }) {
    try {
        const now = new Date();
        const updates: any = { ...data, updatedAt: now };

        // Don't update password in the 'user' table
        if (updates.password) {
            const hashedPassword = await bcrypt.hash(updates.password, 10);
            await db
                .updateTable("account")
                .set({ password: hashedPassword, updatedAt: now })
                .where("userId", "=", id)
                .where("providerId", "=", "credential")
                .execute();
            delete updates.password;
        }

        if (Object.keys(updates).length > 1) { // more than just updatedAt
            await db
                .updateTable("user")
                .set(updates)
                .where("id", "=", id)
                .execute();
        }

        revalidatePath("/admin/team");
        return { success: true };
    } catch (error) {
        console.error("Failed to update team member:", error);
        return { success: false, error: "Failed to update team member" };
    }
}

export async function deleteTeamMember(id: string) {
    try {
        // Cascading delete should handle sessions and accounts if foreign keys are set up correctly
        await db.deleteFrom("user").where("id", "=", id).execute();
        revalidatePath("/admin/team");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete team member:", error);
        return { success: false, error: "Failed to delete team member" };
    }
}
