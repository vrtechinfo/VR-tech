"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Users, Award, Lightbulb, CheckCircle } from "lucide-react";

const features = [
    {
        title: "Qualified Team",
        desc: "Expert designers and developers with deep experience in building high-end brand websites and complex enterprise apps.",
        icon: <Users className="w-8 h-8 text-red-500" />,
        delay: 0.1
    },
    {
        title: "Smart Solutions",
        desc: "We provide expert, personalized project solutions that leverage the latest technologies to solve your unique business challenges.",
        icon: <Award className="w-8 h-8 text-red-600" />,
        delay: 0.2
    },
    {
        title: "Dedicated Support",
        desc: "Timely, world-class support via all channels, ensuring your operations remain seamless while we go the extra mile for your success.",
        icon: <Lightbulb className="w-8 h-8 text-red-700" />,
        delay: 0.3
    }
];

export default function Features() {
    return (
        <section className="relative py-24 bg-[#0A0C16] overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-red-900/5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
                            Our <span className="text-red-800">Edge</span>
                        </h2>
                        <div className="w-24 h-1 bg-red-800 mx-auto rounded-full" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {features.map((feature, idx) => (
                        <TiltCard key={idx} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TiltCard({ feature }: { feature: typeof features[0] }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: feature.delay }}
            className="group relative p-10 rounded-[32px] bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:border-red-500/30 shadow-2xl overflow-hidden"
        >
            {/* Hover Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

            <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 group-hover:border-red-500/30 transition-all duration-500">
                    {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-red-500 transition-colors">
                    {feature.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                    {feature.desc}
                </p>
            </div>

            {/* Corner Accent */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle className="w-5 h-5 text-red-800/40" />
            </div>
        </motion.div>
    );
}
