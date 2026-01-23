import { getAllApplications, deleteApplication, updateApplicationStatus } from "@/app/actions/admin-actions";
import { revalidatePath } from "next/cache";
import { ApplicationsClient } from "@/components/admin/ApplicationsClient";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
    const applications = await getAllApplications();

    async function handleDelete(id: number) {
        "use server";
        await deleteApplication(id);
        revalidatePath("/admin/applications");
        revalidatePath("/admin/dashboard");
    }

    async function handleStatusUpdate(id: number, status: string) {
        "use server";
        await updateApplicationStatus(id, status);
        revalidatePath("/admin/applications");
        revalidatePath("/admin/dashboard");
    }

    return (
        <ApplicationsClient
            applications={applications}
            onDelete={handleDelete}
            onStatusUpdate={handleStatusUpdate}
        />
    );
}
