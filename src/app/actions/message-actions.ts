"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { MessageStatus } from "@/lib/db/schema";

export async function getAllMessages() {
    try {
        return await db
            .selectFrom("contact_submissions")
            .selectAll()
            .orderBy("created_at", "desc")
            .execute();
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
}

export async function getMessageById(id: number) {
    try {
        return await db
            .selectFrom("contact_submissions")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
    } catch (error) {
        console.error("Error fetching message:", error);
        return null;
    }
}

export async function updateMessageStatus(id: number, status: MessageStatus) {
    try {
        await db
            .updateTable("contact_submissions")
            .set({ status })
            .where("id", "=", id)
            .execute();

        revalidatePath("/admin/messages");
        revalidatePath("/admin/dashboard");

        return { success: true };
    } catch (error) {
        console.error("Error updating message status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

export async function replyToMessage(id: number, reply: string, userId: string) {
    try {
        await db
            .updateTable("contact_submissions")
            .set({
                admin_reply: reply,
                replied_by: userId,
                replied_at: new Date(),
                status: 'replied',
            })
            .where("id", "=", id)
            .execute();

        revalidatePath("/admin/messages");
        revalidatePath("/admin/dashboard");

        return { success: true };
    } catch (error) {
        console.error("Error replying to message:", error);
        return { success: false, error: "Failed to send reply" };
    }
}

export async function deleteMessage(id: number) {
    try {
        await db
            .deleteFrom("contact_submissions")
            .where("id", "=", id)
            .execute();

        revalidatePath("/admin/messages");
        revalidatePath("/admin/dashboard");

        return { success: true };
    } catch (error) {
        console.error("Error deleting message:", error);
        return { success: false, error: "Failed to delete message" };
    }
}
