"use client";
import { type Variants, AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { type JSX, useState, useEffect } from "react";

export default function Hero(): JSX.Element {
    const words: string[] = ["Innovate!", "Adapt!", "Thrive!"];
    const [currentWord, setCurrentWord] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 1500);

        return () => clearInterval(interval);
    },); // Added dependency

    const dropAnimation: Variants = {
        initial: {
            y: -100,
            opacity: 0,
            scale: 1.2,
            filter: "blur(5px)",
        },
        animate: {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            filter: "blur(10px)",
            transition: {
                duration: 0.2, // Reduced from 0.3
            },
        },
    };

    return (
        <section className="relative text-white pt-48 md:pt-64 lg:pt-72 pb-24 min-h-screen overflow-hidden flex items-center justify-center bg-[#0A0C16]">
            {/* Optimized Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-background.webp"
                    alt="Hero Background"
                    fill
                    priority
                    className="object-cover object-center pointer-events-none opacity-50"
                    sizes="100vw"
                />
            </div>
            {/* Dark gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C16]/60 via-[#0A0C16]/80 to-[#0A0C16]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(153,27,27,0.1),transparent_50%)]" />

            {/* Floating decorative glows */}
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-red-900/10 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 blur-[150px] rounded-full animate-pulse" />

            {/* Content with higher z-index */}
            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center">
                <div className="h-[120px] sm:h-[140px] md:h-[180px] lg:h-[220px] flex items-center justify-center mb-6">
                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[140px] font-black tracking-tighter leading-none">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentWord}
                                variants={dropAnimation}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 15,
                                    mass: 0.8,
                                    duration: 0.3,
                                }}
                            >
                                <span className="text-red-700">
                                    {words[currentWord].charAt(0)}
                                </span>
                                {words[currentWord].slice(1)}
                            </motion.span>
                        </AnimatePresence>
                    </h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="max-w-5xl mx-auto space-y-8"
                >
                    <p className="text-xl md:text-3xl lg:text-4xl font-light text-gray-300 leading-tight tracking-tight px-4">
                        Empowering Your Business with <span className="text-white font-bold">Cutting-Edge</span> Software, <span className="text-white font-bold">Expert</span> IT Consulting, and <span className="text-white font-bold">Reliable</span> Support.
                    </p>

                    <div className="w-24 h-1 bg-red-800 mx-auto rounded-full" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row justify-center mt-12 gap-6"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="shadow-2xl shadow-red-900/20"
                    >
                        <Link
                            href="/about-us"
                            className="bg-red-800 hover:bg-red-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all block text-center min-w-[200px]"
                        >
                            Discover More
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="shadow-2xl"
                    >
                        <Link
                            href="/services"
                            className="bg-white/5 hover:bg-white/10 border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg transition-all block text-center min-w-[200px]"
                        >
                            Our Services
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
