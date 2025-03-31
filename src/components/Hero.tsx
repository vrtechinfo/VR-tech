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
        <div className="bg-black text-white pt-20 sm:pt-40 md:pt-60 lg:pt-80 pb-10 sm:pb-15 md:pb-20 lg:pb-30 overflow-hidden">
            <div className="flex justify-center pt-10 sm:pt-15 md:pt-20 lg:pt-30 pb-5 sm:pb-8 md:pb-10 h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px]">
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
                className="font-medium mt-5 sm:mt-8 md:mt-10 px-4 sm:px-6 md:px-8" // Added responsive margin and padding
            >
                <div className="flex justify-center text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] pb-2 text-center">
                    <p>
                        Empowering Your Business with Cutting-Edge Software, Expert{" "}
                    </p>
                </div>
                <div className="flex justify-center  text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] pb-2 text-center">
                    <p>
                        {" "}
                        IT Consulting, Comprehensive Training, and Reliable Support{" "}
                    </p>
                </div>
                <div className="flex justify-center  text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] text-center">
                    <p> – All Under One Roof.</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex justify-center py-10 sm:py-12 md:py-16 lg:py-20 gap-3 sm:gap-4 md:gap-5"
            >
                <motion.div
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "#9B2C2C",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="border-1 border-red-800 rounded-xl bg-red-800 px-5 py-1 shadow-inner cursor-pointer"
                >
                    <Link href={"/"}>Learn more</Link>
                </motion.div>
                <motion.div
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="border-1 border-white rounded-xl px-5 py-1 shadow-inner text-gray-200 cursor-pointer"
                >
                    <Link href={"/"}>Our Services</Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
