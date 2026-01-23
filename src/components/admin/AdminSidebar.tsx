"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    MessageSquare,
    UserCog,
    LogOut,
    Settings
} from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Jobs", href: "/admin/jobs", icon: Briefcase },
    { name: "Applications", href: "/admin/applications", icon: FileText },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Team", href: "/admin/team", icon: UserCog },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
    };

    // Get user initials from name
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const userName = session?.user?.name || 'Admin User';
    const userEmail = session?.user?.email || 'admin@vrtech.com';
    const userInitials = getInitials(userName);

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-zinc-800 flex flex-col" >
            {/* Logo */}
            < div className="p-6 border-b border-zinc-800" >
                <Link href="/admin/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">VR</span>
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg">VR Tech</h1>
                        <p className="text-zinc-500 text-xs">Admin Panel</p>
                    </div>
                </Link>
            </div >

            {/* Navigation */}
            < nav className="flex-1 p-4 space-y-1 overflow-y-auto" >
                {
                    navItems.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                                ${isActive
                                        ? 'bg-red-900/20 text-red-500 border border-red-900/50'
                                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
                                    }
                            `}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })
                }
            </nav >

            {/* User section */}
            < div className="p-4 border-t border-zinc-800 space-y-2" >
                <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{userInitials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">{userName}</p>
                        <p className="text-zinc-500 text-xs truncate">{userEmail}</p>
                    </div>
                </div>

                {/* Sign Out Button */}
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div >
        </aside >
    );
}
