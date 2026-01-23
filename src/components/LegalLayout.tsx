"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Image from "next/image";

interface LegalLayoutProps {
    title: string;
    lastUpdated: string;
    children: ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
    return (
        <div className="min-h-screen pt-36 pb-20 px-4 md:px-10 lg:px-20 text-gray-300 relative bg-[#111324]">
            {/* Optimized Fixed Background */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/hero-background.webp"
                    alt="Legal Background"
                    fill
                    className="object-cover object-center pointer-events-none opacity-40 blur-sm"
                    sizes="100vw"
                    priority
                />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-black/60 backdrop-blur-md rounded-2xl p-6 md:p-12 border border-gray-800 shadow-2xl"
                >
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                            <span className="text-red-800">{title.charAt(0)}</span>
                            {title.slice(1)}
                        </h1>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">
                            Last Updated: <span className="text-red-800/80">{lastUpdated}</span>
                        </p>
                        <div className="h-1 w-20 bg-red-800 mt-6 rounded-full mx-auto md:mx-0"></div>
                    </div>

                    <div className="prose prose-invert prose-red max-w-none 
                        prose-headings:text-white prose-headings:font-bold 
                        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-red-800/30 prose-h2:pb-2
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:text-gray-100
                        prose-p:leading-relaxed prose-p:mb-6 prose-p:text-gray-400
                        prose-li:text-gray-400 prose-ul:mb-6
                        prose-strong:text-red-800 prose-strong:font-semibold
                    ">
                        {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
