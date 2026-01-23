"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    Users,
    MessageSquare,
    UserCog,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Jobs", href: "/admin/jobs", icon: Briefcase },
    { name: "Applications", href: "/admin/applications", icon: Users },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Team", href: "/admin/team", icon: UserCog },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-40 h-screen w-64 bg-black border-r border-zinc-800
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-zinc-800">
                        <Link href="/admin/dashboard" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">VR</span>
                            </div>
                            <div>
                                <h1 className="text-white font-bold text-lg">VR Tech</h1>
                                <p className="text-zinc-500 text-xs">Admin Panel</p>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
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
                        })}
                    </nav>

                    {/* User section */}
                    <div className="p-4 border-t border-zinc-800">
                        <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-xl mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">A</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium text-sm truncate">Admin User</p>
                                <p className="text-zinc-500 text-xs truncate">admin@vrtech.com</p>
                            </div>
                        </div>
                        <form action="/api/auth/sign-out" method="POST">
                            <button
                                type="submit"
                                className="w-full flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-red-500 hover:bg-zinc-900 rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="text-sm">Sign Out</span>
                            </button>
                        </form>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}
