"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import CareerForm from "@/components/CareerForm";
import { getJobRoles, type JobRole } from "../actions";
import { Briefcase, MapPin, ChevronLeft } from "lucide-react";
import Link from "next/link";

function ApplyPageContent() {
    const searchParams = useSearchParams();
    const jobId = searchParams.get("jobId") ?? undefined;
    const [job, setJob] = useState<JobRole | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchJob() {
            if (!jobId) {
                setLoading(false);
                return;
            }
            try {
                const roles = await getJobRoles();
                const foundJob = roles.find((r) => r.id === jobId);
                setJob(foundJob || null);
            } catch (error) {
                console.error("Failed to fetch job details:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchJob();
    }, [jobId]);

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/careers"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Careers
                </Link>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-red-900/20 border-t-red-700 rounded-full animate-spin" />
                    </div>
                ) : job && job.status === 'active' ? (
                    <div className="space-y-12">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Applying for <span className="text-red-700">{job.title}</span>
                            </h1>
                            <div className="flex flex-wrap gap-4 text-zinc-400">
                                <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1 rounded-full text-sm">
                                    <Briefcase className="w-4 h-4" /> {job.type}
                                </span>
                                <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1 rounded-full text-sm">
                                    <MapPin className="w-4 h-4" /> {job.location}
                                </span>
                                <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1 rounded-full text-sm">
                                    {job.department}
                                </span>
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 p-8 md:p-12 rounded-[2rem] border border-zinc-800 shadow-2xl">
                            <CareerForm jobId={jobId} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800">
                        <h2 className="text-2xl font-bold mb-4">
                            {job ? "Position Currently Closed" : "Job Not Found"}
                        </h2>
                        <p className="text-zinc-500 mb-8">
                            {job
                                ? "This position is no longer accepting applications. Please check back later or explore other open roles."
                                : "The position you are looking for might have been closed or removed."
                            }
                        </p>
                        <Link
                            href="/careers"
                            className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all"
                        >
                            View All Jobs
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ApplyPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-red-900/20 border-t-red-700 rounded-full animate-spin" />
            </div>
        }>
            <ApplyPageContent />
        </Suspense>
    );
}
