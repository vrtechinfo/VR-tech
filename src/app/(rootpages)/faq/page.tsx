"use client";

import LegalLayout from "@/components/LegalLayout";
import { HelpCircle, Shield, Code, Clock, Zap, MessageSquare } from "lucide-react";

export default function FAQPage() {
    const lastUpdated = "December 22, 2025";

    const faqs = [
        {
            category: "General Information",
            icon: <HelpCircle className="w-6 h-6 text-red-800" />,
            questions: [
                {
                    q: "Who is VR Tech Info?",
                    a: "VR Tech Info is a leading software engineering and IT consulting firm dedicated to helping businesses innovate and scale through cutting-edge technology solutions."
                },
                {
                    q: "What industries do you serve?",
                    a: "We serve a wide range of industries including Healthcare, Finance, E-commerce, Logistics, and Education, providing tailored solutions for each unique sector."
                }
            ]
        },
        {
            category: "Our Services",
            icon: <Code className="w-6 h-6 text-red-800" />,
            questions: [
                {
                    q: "What kind of software do you build?",
                    a: "We specialize in end-to-end custom software development, including web applications, mobile apps (iOS & Android), and enterprise-grade software systems."
                },
                {
                    q: "Do you offer IT consulting?",
                    a: "Yes, we provide expert guidance on digital transformation, cloud migrations, architecture design, and complex IT infrastructure optimizations."
                }
            ]
        },
        {
            category: "Process & Timelines",
            icon: <Clock className="w-6 h-6 text-red-800" />,
            questions: [
                {
                    q: "How do you handle project timelines?",
                    a: "We use agile methodologies to ensure transparent and predictable delivery. Every project starts with a detailed roadmap and consistent milestone reporting."
                },
                {
                    q: "How do I get started with a project?",
                    a: "You can reach out through our contact form. Our team will schedule a discovery call to understand your requirements and provide a detailed proposal."
                }
            ]
        },
        {
            category: "Support & Maintenance",
            icon: <Zap className="w-6 h-6 text-red-800" />,
            questions: [
                {
                    q: "Do you offer 24/7 support?",
                    a: "Yes, we provide comprehensive support and maintenance packages to ensure your systems remain performant and secure around the clock."
                },
                {
                    q: "What is your typical response time?",
                    a: "For high-priority issues, we have a guaranteed response time of under 2 hours. General inquiries are typically addressed within 12-24 hours."
                }
            ]
        }
    ];

    return (
        <LegalLayout title="Frequently Asked Questions" lastUpdated={lastUpdated}>
            <div className="not-prose space-y-12">
                {faqs.map((group, idx) => (
                    <div key={idx} className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            {group.icon}
                            <h2 className="text-2xl font-bold text-white">{group.category}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {group.questions.map((faq, fIdx) => (
                                <div
                                    key={fIdx}
                                    className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
                                >
                                    <div className="flex gap-4">
                                        <div className="mt-1">
                                            <MessageSquare className="w-5 h-5 text-red-800/60 group-hover:text-red-800 transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold mb-3">{faq.q}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {faq.a}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-red-800/10 border border-red-800/20 p-8 rounded-2xl text-center">
                <h3 className="text-white font-bold text-xl mb-4">Still have questions?</h3>
                <p className="text-gray-400 mb-6">
                    We&apos;re here to help! Reach out to our team for personalized assistance.
                </p>
                <div className="flex justify-center">
                    <a
                        href="/#contact"
                        className="bg-red-800 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
                    >
                        Contact support
                    </a>
                </div>
            </div>
        </LegalLayout>
    );
}
