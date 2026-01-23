"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function FinalCTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto bg-gradient-to-br from-red-950/40 to-black/40 backdrop-blur-3xl border border-white/10 rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
                >
                    {/* Decorative background pulse */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-800/5 blur-[100px] rounded-full animate-pulse" />

                    <div className="relative z-10">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-red-900/20 text-red-500 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-red-500/20"
                        >
                            <Zap className="w-4 h-4 fill-current" />
                            Next-Gen Solutions
                        </motion.div>

                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter"
                        >
                            Scale Your Vision with <span className="text-red-700">VR Tech Info</span>
                        </motion.h2>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
                        >
                            From mission-critical software development to strategic IT consulting and elite-tier training—we deliver the precision tech your business demands to dominate.
                        </motion.p>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row justify-center items-center gap-6"
                        >
                            <Link
                                href="/#contact-heading"
                                className="group bg-red-700 hover:bg-red-800 text-white px-12 py-5 rounded-full font-bold text-xl transition-all flex items-center gap-3 shadow-2xl shadow-red-900/40"
                            >
                                Get Started Today
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </Link>

                            <Link
                                href="/services"
                                className="text-white hover:text-red-500 font-bold text-xl transition-colors py-4 px-8 border border-white/10 hover:border-red-500/30 rounded-full"
                            >
                                See All Services
                            </Link>
                        </motion.div>
                    </div>

                    {/* Background SVG Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                        <svg width="100%" height="100%">
                            <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#cta-grid)" />
                        </svg>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
