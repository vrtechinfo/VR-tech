import { getDashboardStats } from "@/app/actions/admin-actions";
import { Users, FileText, ArrowUpRight, MessageSquare, Briefcase } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    // Get additional stats
    const messagesCount = await db
        .selectFrom("contact_submissions")
        .select(db.fn.count("id").as("count"))
        .executeTakeFirst();

    const newMessagesCount = await db
        .selectFrom("contact_submissions")
        .select(db.fn.count("id").as("count"))
        .where("status", "=", "new")
        .executeTakeFirst();

    const recentMessages = await db
        .selectFrom("contact_submissions")
        .selectAll()
        .orderBy("created_at", "desc")
        .limit(5)
        .execute();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-zinc-400">Welcome back, Admin</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-red-900/20 rounded-xl">
                            <Users className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Applications</h3>
                    </div>
                    <p className="text-4xl font-bold text-white mb-2">{stats.totalApplications}</p>
                    <span className="text-sm text-zinc-500">All time</span>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-900/20 rounded-xl">
                            <MessageSquare className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Messages</h3>
                    </div>
                    <p className="text-4xl font-bold text-white mb-2">{Number(messagesCount?.count || 0)}</p>
                    <span className="text-sm text-green-500">{Number(newMessagesCount?.count || 0)} new</span>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-900/20 rounded-xl">
                            <Briefcase className="w-6 h-6 text-purple-500" />
                        </div>
                        <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Active Jobs</h3>
                    </div>
                    <p className="text-4xl font-bold text-white mb-2">{stats.totalJobs}</p>
                    <span className="text-sm text-zinc-500">Currently live</span>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-900/20 rounded-xl">
                            <FileText className="w-6 h-6 text-green-500" />
                        </div>
                        <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Quick Actions</h3>
                    </div>
                    <div className="space-y-2">
                        <Link href="/admin/jobs/new" className="block text-sm text-red-500 hover:text-red-400">
                            + Create Job
                        </Link>
                        <Link href="/admin/messages" className="block text-sm text-blue-500 hover:text-blue-400">
                            View Messages
                        </Link>
                    </div>
                </div>
            </div>

            {/* Recent Applications Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-black/50">
                    <h3 className="text-xl font-bold text-white">Recent Applications</h3>
                    <Link
                        href="/admin/applications"
                        className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 transition-colors"
                    >
                        View All <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/80 text-zinc-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4 font-medium">Candidate</th>
                                <th className="px-6 py-4 font-medium">Email</th>
                                <th className="px-6 py-4 font-medium">Applied Date</th>
                                <th className="px-6 py-4 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {stats.recentApplications.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                                        No applications yet.
                                    </td>
                                </tr>
                            ) : (
                                stats.recentApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-zinc-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">
                                            {app.first_name} {app.last_name}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400">{app.email}</td>
                                        <td className="px-6 py-4 text-zinc-400">
                                            {new Date(app.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-red-500 hover:text-red-400 text-sm font-medium">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
