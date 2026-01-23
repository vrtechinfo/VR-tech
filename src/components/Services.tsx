"use client";

import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Code2, Briefcase, GraduationCap, Headphones, PieChart, ShieldCheck } from "lucide-react";

const services = [
    {
        title: "Software Development",
        desc: "End-to-end custom software solutions for enterprise, including full-stack web and high-performance mobile applications.",
        icon: <Code2 className="w-10 h-10 text-red-500" />,
    },
    {
        title: "IT Consulting",
        desc: "Expert strategic guidance on digital transformation, enterprise cloud solutions, and scalable IT infrastructure audit.",
        icon: <Briefcase className="w-10 h-10 text-red-600" />,
    },
    {
        title: "Training & Development",
        desc: "Professional elite-tier courses in advanced software engineering, cloud computing architecture, and modern DevOps.",
        icon: <GraduationCap className="w-10 h-10 text-red-700" />,
    },
    {
        title: "Support & Maintenance",
        desc: "24/7 mission-critical technical support and proactive system maintenance to ensure 99.9% operational uptime.",
        icon: <Headphones className="w-10 h-10 text-red-800" />,
    },
    {
        title: "Data Analytics",
        desc: "Advanced intelligence and BI solutions to help leaders make high-stakes, data-driven decisions with precision.",
        icon: <PieChart className="w-10 h-10 text-red-900" />,
    },
    {
        title: "CyberSecurity",
        desc: "Robust, zero-trust security strategies and penetration testing to protect your enterprise from evolving digital threats.",
        icon: <ShieldCheck className="w-10 h-10 text-red-950" />,
    }
];

export default function Services() {
    return (
        <section className="bg-[#0A0C16] text-white py-24 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
                            Our <span className="text-red-800">Services</span>
                        </h2>
                        <div className="w-24 h-1 bg-red-800 mx-auto rounded-full" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative p-10 rounded-[40px] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-red-500/30 transition-all duration-500 overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-800/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <div className="mb-8 transform group-hover:scale-110 transition-transform duration-500">
                                    {service.icon}
                                </div>
                                <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-red-500 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 text-lg leading-relaxed font-light">
                                    {service.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-24">
                <Marquee autoFill speed={40}>
                    <Badge text="Enterprise Software" />
                    <Badge text="Cloud Architecture" />
                    <Badge text="Elite IT Consulting" />
                    <Badge text="Cyber Defense" />
                    <Badge text="Next-Gen Training" />
                </Marquee>
            </div>
        </section>
    );
}

const Badge = ({ text }: { text: string }) => (
    <div className="mx-6 px-10 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-2xl font-black tracking-widest uppercase text-white/40 hover:text-red-800 hover:border-red-800/40 transition-all duration-500 cursor-default">
        {text}
    </div>
);
