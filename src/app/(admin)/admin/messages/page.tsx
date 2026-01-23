import { getAllMessages, deleteMessage, updateMessageStatus } from "@/app/actions/message-actions";
import { revalidatePath } from "next/cache";
import { MessagesClient } from "@/components/admin/MessagesClient";

export default async function MessagesPage() {
    const messages = await getAllMessages();

    async function handleDelete(id: number) {
        "use server";
        await deleteMessage(id);
        revalidatePath("/admin/messages");
    }

    async function handleMarkAsRead(id: number) {
        "use server";
        await updateMessageStatus(id, 'read');
        revalidatePath("/admin/messages");
    }

    return (
        <MessagesClient
            messages={messages}
            onDelete={handleDelete}
            onMarkAsRead={handleMarkAsRead}
        />
    );
}
