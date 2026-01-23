"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";

export default function ScrollGraphics() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress, scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Velocity-based scale for elements
    const scaleSync = useTransform(scrollVelocity, [-2000, 0, 2000], [1.2, 1, 1.2]);
    const smoothScale = useSpring(scaleSync, { stiffness: 300, damping: 30 });

    // Parallax movements
    const y1 = useTransform(smoothProgress, [0, 1], [0, -300]);
    const y2 = useTransform(smoothProgress, [0, 1], [0, -600]);
    const rotate1 = useTransform(smoothProgress, [0, 1], [0, 90]);
    const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [1, 0.6, 0.4, 0.2]);

    // Create a stable grid of particles
    const particles = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 5 + 3,
            delay: Math.random() * 2
        }));
    }, []);

    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Atmospheric Pulsing Glows */}
            <motion.div
                style={{ y: y1, opacity, scale: smoothScale }}
                className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-red-900/10 blur-[150px] rounded-full"
            />
            <motion.div
                style={{ y: y2, opacity, scale: smoothScale }}
                className="absolute bottom-1/4 -left-20 w-[800px] h-[800px] bg-blue-900/5 blur-[180px] rounded-full"
            />

            {/* Floating Particles that react to scroll velocity */}
            {isMounted && particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        y: [0, -20, 0],
                        x: [0, 10, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay
                    }}
                    style={{
                        position: 'absolute',
                        top: p.top,
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        filter: 'blur(1px)',
                        scale: smoothScale,
                        willChange: 'transform'
                    }}
                />
            ))}

            {/* High-Tech Floating Grids */}
            <motion.div
                style={{ y: y2, rotate: rotate1, scale: smoothScale }}
                className="absolute top-[30%] right-[10%] opacity-[0.05]"
            >
                <svg width="400" height="400" viewBox="0 0 400 400">
                    <defs>
                        <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="white" />
                            <stop offset="100%" stopColor="red" />
                        </linearGradient>
                    </defs>
                    <path d="M0 200 L400 200 M200 0 L200 400" stroke="url(#grid-grad)" strokeWidth="0.5" />
                    <circle cx="200" cy="200" r="100" stroke="url(#grid-grad)" strokeWidth="0.2" fill="none" />
                    <circle cx="200" cy="200" r="180" stroke="url(#grid-grad)" strokeWidth="0.1" fill="none" />
                </svg>
            </motion.div>

            {/* Velocity-Responsive Overlay Glow */}
            <motion.div
                style={{ opacity: useTransform(scrollVelocity, [-3000, 0, 3000], [0.1, 0, 0.1]) }}
                className="absolute inset-0 bg-red-900/5 backdrop-brightness-110 pointer-events-none"
            />
        </div>
    );
}
