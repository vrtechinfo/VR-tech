"use server";

import { db } from "@/lib/db";

export async function debugTeamMember(email: string) {
    try {
        // Check if user exists
        const user = await db
            .selectFrom("user")
            .selectAll()
            .where("email", "=", email)
            .executeTakeFirst();

        // Check if account exists
        const account = await db
            .selectFrom("account")
            .selectAll()
            .where("accountId", "=", email)
            .executeTakeFirst();

        return {
            user: user || null,
            account: account ? {
                ...account,
                password: account.password ? "***HIDDEN***" : null
            } : null
        };
    } catch (error) {
        console.error("Debug error:", error);
        return { error: String(error) };
    }
}
