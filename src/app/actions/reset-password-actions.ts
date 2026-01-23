"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function resetTeamMemberPassword(email: string, newPassword: string) {
    try {
        // Find the user
        const user = await db
            .selectFrom("user")
            .select("id")
            .where("email", "=", email)
            .executeTakeFirst();

        if (!user) {
            return { success: false, error: "User not found" };
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the account password
        const result = await db
            .updateTable("account")
            .set({
                password: hashedPassword,
                updatedAt: new Date()
            })
            .where("userId", "=", user.id)
            .where("providerId", "=", "credential")
            .executeTakeFirst();

        return {
            success: true,
            message: `Password reset successfully for ${email}`,
            rowsAffected: Number(result.numUpdatedRows || 0)
        };
    } catch (error) {
        console.error("Password reset error:", error);
        return {
            success: false,
            error: String(error)
        };
    }
}
