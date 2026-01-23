import { getAllJobs, deleteJob, toggleJobStatus } from "@/app/actions/job-actions";
import { revalidatePath } from "next/cache";
import { JobsClient } from "@/components/admin/JobsClient";
import type { JobStatus } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
    const jobs = await getAllJobs();

    async function handleDelete(id: number) {
        "use server";
        await deleteJob(id);
        revalidatePath("/admin/jobs");
    }

    async function handleToggleStatus(id: number, currentStatus: string) {
        "use server";
        await toggleJobStatus(id, currentStatus as JobStatus);
        revalidatePath("/admin/jobs");
    }

    return (
        <JobsClient
            jobs={jobs}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
        />
    );
}
