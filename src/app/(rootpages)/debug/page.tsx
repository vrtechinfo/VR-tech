"use client";

import { useState } from "react";
import { debugTeamMember } from "@/app/actions/debug-actions";
import { fixTeamMemberProviderId } from "@/app/actions/fix-actions";
import { resetTeamMemberPassword } from "@/app/actions/reset-password-actions";

export default function DebugPage() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [result, setResult] = useState<any>(null);
    const [fixResult, setFixResult] = useState<any>(null);
    const [resetResult, setResetResult] = useState<any>(null);

    const handleDebug = async () => {
        const data = await debugTeamMember(email);
        setResult(data);
        setFixResult(null);
        setResetResult(null);
    };

    const handleFix = async () => {
        const data = await fixTeamMemberProviderId(email);
        setFixResult(data);
        const updatedData = await debugTeamMember(email);
        setResult(updatedData);
    };

    const handleResetPassword = async () => {
        if (!newPassword) {
            setResetResult({ success: false, error: "Please enter a new password" });
            return;
        }
        const data = await resetTeamMemberPassword(email, newPassword);
        setResetResult(data);
        setNewPassword("");
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Debug & Fix Team Member</h1>

                <div className="mb-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email (e.g., sap@vrtech.com)"
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleDebug}
                            className="px-6 py-3 bg-red-700 hover:bg-red-800 rounded-lg font-bold"
                        >
                            Check Account
                        </button>

                        {result?.account?.providerId === "email" && (
                            <button
                                onClick={handleFix}
                                className="px-6 py-3 bg-green-700 hover:bg-green-800 rounded-lg font-bold"
                            >
                                Fix ProviderId
                            </button>
                        )}
                    </div>

                    {result?.account && (
                        <div className="border-t border-zinc-700 pt-4">
                            <label className="block text-sm font-medium mb-2">Reset Password</label>
                            <div className="flex gap-4">
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
                                />
                                <button
                                    onClick={handleResetPassword}
                                    className="px-6 py-3 bg-blue-700 hover:bg-blue-800 rounded-lg font-bold"
                                >
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {fixResult && (
                    <div className={`mb-6 p-4 rounded-lg ${fixResult.success ? 'bg-green-900/20 border border-green-700' : 'bg-red-900/20 border border-red-700'}`}>
                        <p className="font-bold">{fixResult.message || fixResult.error}</p>
                    </div>
                )}

                {resetResult && (
                    <div className={`mb-6 p-4 rounded-lg ${resetResult.success ? 'bg-green-900/20 border border-green-700' : 'bg-red-900/20 border border-red-700'}`}>
                        <p className="font-bold">{resetResult.message || resetResult.error}</p>
                    </div>
                )}

                {result && (
                    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6">
                        <h3 className="font-bold mb-2">Account Details:</h3>
                        <pre className="text-sm overflow-auto">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
