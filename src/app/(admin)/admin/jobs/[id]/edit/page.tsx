"use client";

import { getJobById, updateJob } from "@/app/actions/job-actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditJobPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [job, setJob] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadJob() {
            const jobData = await getJobById(Number(params.id));
            setJob(jobData);
            setLoading(false);
        }
        loadJob();
    }, [params.id]);

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);

        const data = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            location: formData.get("location") as string,
            department: formData.get("department") as string,
            type: formData.get("type") as string,
            status: formData.get("status") as any,
        };

        const result = await updateJob(Number(params.id), data);

        if (result.success) {
            router.push("/admin/jobs");
        } else {
            alert("Failed to update job");
            setIsSubmitting(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-white">Job not found</div>
            </div>
        );
    }

    return (
        <div>
            <Link
                href="/admin/jobs"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Jobs
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Edit Job</h1>
                <p className="text-zinc-400">Update job posting details</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <form action={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                            Job Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            defaultValue={job.title}
                            className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-red-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-white mb-2">
                                Department *
                            </label>
                            <input
                                type="text"
                                id="department"
                                name="department"
                                required
                                defaultValue={job.department}
                                className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-white mb-2">
                                Location *
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                required
                                defaultValue={job.location}
                                className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-red-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-white mb-2">
                                Employment Type *
                            </label>
                            <select
                                id="type"
                                name="type"
                                required
                                defaultValue={job.type}
                                className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-red-500"
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-white mb-2">
                                Status *
                            </label>
                            <select
                                id="status"
                                name="status"
                                required
                                defaultValue={job.status}
                                className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-red-500"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                            Job Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            rows={10}
                            defaultValue={job.description}
                            className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-red-500"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 text-white rounded-lg transition-colors"
                        >
                            {isSubmitting ? "Updating..." : "Update Job"}
                        </button>
                        <Link
                            href="/admin/jobs"
                            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
