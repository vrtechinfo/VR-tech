"use client";

import React, { useState } from "react";
import { UserPlus, MoreVertical, X, Shield, Mail, Lock, User, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/app/actions/admin-actions";

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'team_member';
    status: 'active' | 'inactive';
    createdAt: Date;
}

interface TeamClientProps {
    initialUsers: any[];
}

export default function TeamClient({ initialUsers }: TeamClientProps) {
    const [users, setUsers] = useState(initialUsers);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleAddMember = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        setSuccess("");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            role: formData.get("role") as 'admin' | 'team_member',
        };

        const result = await createTeamMember(data);
        if (result.success) {
            setSuccess("Member added successfully!");
            setTimeout(() => {
                setIsAddModalOpen(false);
                setSuccess("");
            }, 1500);
        } else {
            setError(result.error || "Failed to add member");
        }
        setIsSubmitting(false);
    };

    const handleUpdateMember = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        setSuccess("");

        const formData = new FormData(e.currentTarget);
        const data: any = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            role: formData.get("role") as 'admin' | 'team_member',
            status: formData.get("status") as 'active' | 'inactive',
        };

        const password = formData.get("password") as string;
        if (password) data.password = password;

        const result = await updateTeamMember(editingUser.id, data);
        if (result.success) {
            setSuccess("Member updated successfully!");
            setTimeout(() => {
                setEditingUser(null);
                setSuccess("");
            }, 1500);
        } else {
            setError(result.error || "Failed to update member");
        }
        setIsSubmitting(false);
    };

    const handleDeleteMember = async (id: string) => {
        if (!confirm("Are you sure you want to delete this team member? This action cannot be undone.")) return;

        const result = await deleteTeamMember(id);
        if (result.success) {
            setSuccess("Member deleted successfully");
            setTimeout(() => setSuccess(""), 3000);
        } else {
            setError(result.error || "Failed to delete member");
        }
    };

    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Team Members</h1>
                    <p className="text-zinc-400">Manage admin users and team members</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-lg shadow-red-600/20"
                >
                    <UserPlus className="w-5 h-5" />
                    Add Member
                </button>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-4 p-4 bg-green-900/20 border border-green-800 text-green-500 rounded-xl flex items-center gap-3"
                    >
                        <CheckCircle2 className="w-5 h-5" />
                        {success}
                    </motion.div>
                )}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-4 p-4 bg-red-900/20 border border-red-800 text-red-500 rounded-xl flex items-center gap-3"
                    >
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/80 text-zinc-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4 font-medium">Name</th>
                                <th className="px-6 py-4 font-medium">Email</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Joined</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {initialUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                                        No team members found.
                                    </td>
                                </tr>
                            ) : (
                                initialUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-zinc-800/50 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-white">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-600/10">
                                                    <span className="text-white font-bold text-sm">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                {user.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-900/20 text-purple-500 border border-purple-900/30">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium border ${user.status === 'active'
                                                    ? 'bg-green-900/20 text-green-500 border-green-900/30'
                                                    : 'bg-zinc-900/50 text-zinc-500 border-zinc-800'
                                                    }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400 text-sm">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setEditingUser(user)}
                                                className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-lg"
                                            >
                                                Manage
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Member Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-full max-w-md relative shadow-2xl"
                        >
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-red-600/10 rounded-2xl">
                                    <UserPlus className="w-6 h-6 text-red-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Add Team Member</h2>
                            </div>

                            <form onSubmit={handleAddMember} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                        <User className="w-4 h-4" /> Full Name
                                    </label>
                                    <input
                                        name="name"
                                        required
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                        <Mail className="w-4 h-4" /> Email Address
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                        placeholder="john@vrtech.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                        <Lock className="w-4 h-4" /> Initial Password
                                    </label>
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        minLength={8}
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                        <Shield className="w-4 h-4" /> Portal Role
                                    </label>
                                    <select
                                        name="role"
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors appearance-none"
                                    >
                                        <option value="team_member">Team Member</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>

                                <button
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/20 disabled:opacity-50 mt-4"
                                >
                                    {isSubmitting ? "Creating..." : "Create Account"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Manage Member Modal */}
            <AnimatePresence>
                {editingUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-full max-w-md relative shadow-2xl"
                        >
                            <button
                                onClick={() => setEditingUser(null)}
                                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-red-600/10 rounded-2xl">
                                    <Shield className="w-6 h-6 text-red-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Manage Member</h2>
                            </div>

                            <form onSubmit={handleUpdateMember} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Full Name</label>
                                    <input
                                        name="name"
                                        defaultValue={editingUser.name}
                                        required
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        defaultValue={editingUser.email}
                                        required
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">Role</label>
                                        <select
                                            name="role"
                                            defaultValue={editingUser.role}
                                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors appearance-none"
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="team_member">Staff</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">Status</label>
                                        <select
                                            name="status"
                                            defaultValue={editingUser.status}
                                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors appearance-none"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Change Password (leave blank to keep current)</label>
                                    <input
                                        name="password"
                                        type="password"
                                        minLength={8}
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                        placeholder="Enter new password"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteMember(editingUser.id)}
                                        className="p-3 bg-red-900/10 hover:bg-red-900/30 text-red-500 rounded-xl transition-all border border-red-900/30"
                                        title="Delete Member"
                                    >
                                        <Trash2 className="w-6 h-6" />
                                    </button>
                                    <button
                                        disabled={isSubmitting}
                                        className="flex-1 py-3 bg-white hover:bg-zinc-200 text-black font-bold rounded-xl transition-all disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
