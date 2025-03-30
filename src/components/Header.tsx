"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type JSX } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

export default function Header(): JSX.Element {
    const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const serviceOptions: string[] = [
        "Software Development",
        "IT Consulting",
        "Cloud Solutions",
    ];

    const dropdownVariants: Variants = {
        hidden: { opacity: 0, y: -20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            transition: { duration: 0.2 },
        },
    };

    return (
        <div className="bg-black/90 text-white px-4 md:px-20 flex flex-col md:flex-row items-center justify-between fixed top-0 left-0 right-0 z-50">
            <div className="flex justify-between w-full md:w-auto items-center">
                <div className="pl-2 md:pl-10 py-2">
                    {/* Added padding for logo */}
                    <Image
                        src="/vr-logo.png"
                        width={146}
                        height={146}
                        alt="vr tech info logo"
                        className="w-20 md:w-36" // Adjusted size
                    />
                </div>
                <button
                    type="button"
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <title>Close</title>
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <title>Menu</title>
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Transition */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.nav
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden flex flex-col w-full overflow-hidden" // Ensure overflow is hidden for animation
                    >
                        <HeaderNavLinks
                            serviceOptions={serviceOptions}
                            dropdownVariants={dropdownVariants}
                            isServicesOpen={isServicesOpen}
                            setIsServicesOpen={setIsServicesOpen}
                            onLinkClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                        />
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* Desktop Menu */}
            <nav className="hidden md:flex flex-row items-center w-auto">
                <HeaderNavLinks
                    serviceOptions={serviceOptions}
                    dropdownVariants={dropdownVariants}
                    isServicesOpen={isServicesOpen}
                    setIsServicesOpen={setIsServicesOpen}
                />
            </nav>
        </div>
    );
}

// Extracted Nav Links Component for reuse and clarity
interface HeaderNavLinksProps {
    serviceOptions: string[];
    dropdownVariants: Variants;
    isServicesOpen: boolean;
    setIsServicesOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onLinkClick?: () => void; // Optional callback for mobile
}

const HeaderNavLinks: React.FC<HeaderNavLinksProps> = ({
    serviceOptions,
    dropdownVariants,
    isServicesOpen,
    setIsServicesOpen,
    onLinkClick,
}) => {
    return (
        <>
            <ul className="flex flex-col md:flex-row md:items-center md:w-auto space-y-4 md:space-y-0 md:space-x-8 py-4 md:py-0 text-lg md:text-base lg:text-xl">
                {/* Adjusted text size */}
                <li className="hover:underline underline-offset-8 decoration-red-800 decoration-4 pb-1 md:pb-2">
                    <Link href="/" onClick={onLinkClick}>
                        Home
                    </Link>
                </li>
                <li className="hover:underline underline-offset-8 decoration-red-800 decoration-4 pb-1 md:pb-2">
                    <Link href="/aboutus" onClick={onLinkClick}>
                        About Us
                    </Link>
                </li>
                <li
                    className="relative flex items-center"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                >
                    <div className="flex items-center justify-center">
                        <Link href="/services" className="hover:underline underline-offset-8 decoration-red-800 decoration-4 pb-1 md:pb-2 cursor-pointer">
                            Services
                        </Link>
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-1.5 cursor-pointer mt-0.5 md:-mt-1"
                            animate={{ rotate: isServicesOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <title>Dropdown Arrow</title>
                            <polyline points="6 9 12 15 18 9" />
                        </motion.svg>
                    </div>
                    <AnimatePresence>
                        {isServicesOpen && (
                            <motion.div
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute top-full left-0 mt-2 w-64 bg-black/95 rounded-lg overflow-hidden z-10 border border-red-800/50 shadow-lg" // Added border and shadow
                            >
                                {serviceOptions.map((service, index) => (
                                    <motion.div
                                        key={service}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="border-b border-gray-800 last:border-none"
                                    >
                                        <Link
                                            href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
                                            className="block px-6 py-3 text-base hover:bg-red-800/20 transition-colors duration-200" // Adjusted text size
                                            onClick={onLinkClick}
                                        >
                                            {service}
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </li>
                <li className="hover:underline underline-offset-8 decoration-red-800 decoration-4 pb-1 md:pb-2">
                    <Link href="/contact" onClick={onLinkClick}>
                        Careers
                    </Link>
                </li>
            </ul>
            <div className="md:ml-8 mb-4 md:mb-0 mt-4 md:mt-0">
                {/* Added margin top for mobile */}
                <Link
                    href="/contact"
                    onClick={onLinkClick}
                    className="block text-center border-2 border-red-800 rounded-3xl hover:bg-red-800 px-5 py-1 transition-colors duration-300 text-lg md:text-base lg:text-xl" // Adjusted text size
                >
                    Contact Us
                </Link>
            </div>
        </>
    );
};
