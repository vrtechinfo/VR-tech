"use client";
import { type Variants, AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
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
        <div
            className="relative text-white pt-28 sm:pt-30 md:pt-38 lg:pt-50 pb-8 sm:pb-10 md:pb-12 lg:pb-16 overflow-hidden"
            style={{
                backgroundImage: "url(/hero-background.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: "#111324",
            }}
        >

            
            {/* Content with higher z-index */}
            <div className="relative z-10">
            <div className="flex justify-center pt-6 sm:pt-10 md:pt-13 lg:pt-19 pb-3 sm:pb-4 md:pb-5 h-[100px] sm:h-[120px] md:h-[140px] lg:h-[160px]">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold flex items-center">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentWord}
                            variants={dropAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{
                                type: "spring",
                                stiffness: 400, // Increased from 300
                                damping: 15, // Reduced from 20
                                mass: 0.8, // Reduced from 1
                                duration: 0.3, // Added explicit duration
                            }}
                        >
                            <span className="text-red-800">
                                {words[currentWord].charAt(0)}
                            </span>
                            {words[currentWord].slice(1)}
                        </motion.span>
                    </AnimatePresence>
                </h1>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-medium mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto"
            >
                <p className="text-[16px] sm:text-[18px] md:text-[22px] lg:text-[26px] text-center leading-tight sm:leading-normal md:leading-relaxed">
                    Empowering Your Business with Cutting-Edge Software, Expert IT Consulting, Comprehensive Training, and Reliable Support – All Under One Roof.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex justify-center py-5 sm:py-6 md:py-8 lg:py-10 gap-3 sm:gap-4 md:gap-5"
            >
                <motion.div
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "#9B2C2C",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="border-1 border-red-800 rounded-xl bg-red-800 px-5 py-1 shadow-inner cursor-pointer"
                >
                    <Link href={"/about-us"}>Discover More</Link>
                </motion.div>
                <motion.div
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="border-1 border-white rounded-xl px-5 py-1 shadow-inner text-gray-200 cursor-pointer"
                >
                    <Link href={"/services"}>Our Services</Link>
                </motion.div>
            </motion.div>
            </div>
        </div>
    );
}
