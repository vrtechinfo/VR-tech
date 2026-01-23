"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await signIn.email({
                email,
                password,
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/admin/dashboard");
                    },
                    onError: (ctx) => {
                        console.error('SignIn onError:', ctx);
                        setError(ctx.error?.message || "An unexpected error occurred. Please try again.");
                        setLoading(false);
                    }
                }
            });
            console.log('SignIn response:', response);
        } catch (err: any) {
            console.error('SignIn catch error:', err);
            setError(err?.message || "An unexpected error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
                <p className="text-zinc-400">Enter your credentials to access the dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-900/50 transition-all"
                        placeholder="admin@example.com"
                        required
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-zinc-400 mb-2">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-900/50 transition-all"
                        placeholder="••••••••"
                        required
                        disabled={loading}
                    />
                </div>

                {error && (
                    <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </button>
            </form>
        </div>
    );
}
