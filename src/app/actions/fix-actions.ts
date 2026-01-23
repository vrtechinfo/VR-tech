"use server";

import { db } from "@/lib/db";

export async function fixTeamMemberProviderId(email: string) {
    try {
        const result = await db
            .updateTable("account")
            .set({ providerId: "credential" })
            .where("accountId", "=", email)
            .where("providerId", "=", "email")
            .executeTakeFirst();

        return {
            success: true,
            message: `Fixed providerId for ${email}. You can now log in!`,
            rowsAffected: Number(result.numUpdatedRows || 0)
        };
    } catch (error) {
        console.error("Fix error:", error);
        return {
            success: false,
            error: String(error)
        };
    }
}
