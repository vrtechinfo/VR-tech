"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { JobStatus } from "@/lib/db/schema";

export async function getAllJobs() {
    try {
        return await db
            .selectFrom("job_postings")
            .selectAll()
            .orderBy("created_at", "desc")
            .execute();
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return [];
    }
}

export async function getJobById(id: number) {
    try {
        return await db
            .selectFrom("job_postings")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
    } catch (error) {
        console.error("Error fetching job:", error);
        return null;
    }
}

export async function createJob(data: {
    title: string;
    description: string;
    location: string;
    department: string;
    type: string;
    status?: JobStatus;
}) {
    try {
        const result = await db
            .insertInto("job_postings")
            .values({
                title: data.title,
                description: data.description,
                location: data.location,
                department: data.department,
                type: data.type,
                status: data.status || 'active',
            })
            .returningAll()
            .executeTakeFirst();

        revalidatePath("/admin/jobs");
        revalidatePath("/admin/dashboard");
        revalidatePath("/careers");

        return { success: true, job: result };
    } catch (error) {
        console.error("Error creating job:", error);
        return { success: false, error: "Failed to create job" };
    }
}

export async function updateJob(id: number, data: {
    title: string;
    description: string;
    location: string;
    department: string;
    type: string;
    status: JobStatus;
}) {
    try {
        const result = await db
            .updateTable("job_postings")
            .set({
                title: data.title,
                description: data.description,
                location: data.location,
                department: data.department,
                type: data.type,
                status: data.status,
                updated_at: new Date(),
            })
            .where("id", "=", id)
            .returningAll()
            .executeTakeFirst();

        revalidatePath("/admin/jobs");
        revalidatePath("/admin/dashboard");
        revalidatePath("/careers");

        return { success: true, job: result };
    } catch (error) {
        console.error("Error updating job:", error);
        return { success: false, error: "Failed to update job" };
    }
}

export async function deleteJob(id: number) {
    try {
        await db
            .deleteFrom("job_postings")
            .where("id", "=", id)
            .execute();

        revalidatePath("/admin/jobs");
        revalidatePath("/admin/dashboard");
        revalidatePath("/careers");

        return { success: true };
    } catch (error) {
        console.error("Error deleting job:", error);
        return { success: false, error: "Failed to delete job" };
    }
}

export async function toggleJobStatus(id: number, currentStatus: JobStatus) {
    try {
        const newStatus: JobStatus = currentStatus === 'active' ? 'inactive' : 'active';

        await db
            .updateTable("job_postings")
            .set({
                status: newStatus,
                updated_at: new Date()
            })
            .where("id", "=", id)
            .execute();

        revalidatePath("/admin/jobs");
        revalidatePath("/admin/dashboard");
        revalidatePath("/careers");

        return { success: true, newStatus };
    } catch (error) {
        console.error("Error toggling job status:", error);
        return { success: false, error: "Failed to toggle status" };
    }
}
