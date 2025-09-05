"use client";

import Image from "next/image";
import type { JSX } from "react";

export default function Footer(): JSX.Element {
    const footerSections = [
        {
            title: "COMPANY",
            links: [
                { text: "Careers", href: "/careers" },
                { text: "FAQ's", href: "/faq" },
            ],
        },
        {
            title: "QUICK LINKS",
            links: [
                { text: "Services", href: "/services" },
                { text: "About Us", href: "/about-us" },
                { text: "Contact Us", href: "/#contact" },
            ],
        },
        {
            title: "LEGAL",
            links: [
                { text: "Terms of Service", href: "/terms" },
                { text: "Privacy Policy", href: "/privacy" },
                { text: "Cookies Policy", href: "/cookies" },
                { text: "Data Processing", href: "/data-processing" },
            ],
        },
        {
            title: "CONTACT US",
            links: [
                { text: "CANADA: +16474475656", href: "tel:+16474475656" },
                {
                    text: "Mail: info@vrtechinfoinc.ca",
                    href: "mailto:info@vrtechinfoinc.ca",
                },
            ],
        },
    ];

    const socialLinks = [
        { name: "instagram", href: "#", icon: "/instagram-icon.png" },
        { name: "facebook", href: "#", icon: "/facebook-icon.png" },
        { name: "youtube", href: "#", icon: "/youtube-icon.png" },
    ];

    return (
        <footer className="bg-[#191919] text-white py-8 md:py-12 px-4 md:px-16 lg:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-8">
                {/* Logo Section */}
                <div className="md:col-span-2 lg:col-span-1 mb-6 md:mb-0">
                    <Image
                        src="/vr-logo.png"
                        alt="VR Tech Info Logo"
                        width={64}
                        height={64}
                        className="mb-4"
                    />
                    <h2 className="text-lg font-semibold mb-2">
                        VR Tech Info Inc.
                    </h2>
                    <p className="text-sm text-gray-400">
                        Bringing your business to the international spotlight
                    </p>
                </div>

                {/* Links Sections */}
                {footerSections.map((section) => (
                    <div key={section.title} className="md:col-span-1">
                        <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">
                            {section.title}
                        </h3>
                        <ul className="text-gray-400 space-y-2 text-sm">
                            {section.links.map((link) => (
                                <li key={link.text}>
                                    <a
                                        href={link.href}
                                        className="hover:text-white transition-colors duration-200"
                                    >
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Copyright & Social */}
            <div className="mt-8 md:mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm order-2 md:order-1 mt-4 md:mt-0">
                    © {new Date().getFullYear()} VR Tech Info Inc. All rights

                    reserved.
                </p>

                <div className="flex space-x-6 order-1 md:order-2">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            className="transform hover:scale-110 transition-transform duration-200"
                            aria-label={`Visit our ${social.name} page`}
                        >
                            <Image
                                src={social.icon}
                                alt={social.name}
                                width={24}
                                height={24}
                                className="opacity-80 hover:opacity-100"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
