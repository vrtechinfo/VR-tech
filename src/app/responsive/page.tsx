"use client";

import Image, { StaticImageData } from "next/image"; // Import StaticImageData
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useEffect, useState, ReactNode, JSX } from "react"; // Import ReactNode
import React from "react";
import {
    AnimatePresence,
    motion,
    Variants,
    DragHandlers,
} from "framer-motion"; // Import Variants, DragHandlers
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";

// Define types for common props or styles if needed
interface PositionStyle {
    scale: number;
    x: number | string; // Allow string for percentage values
    zIndex: number;
    opacity: number;
}

export default function Home(): JSX.Element {
    return (
        <div className="h-full w-full">
            <Header />
            <Hero />
            <Features />
            <Services />
            <div className="relative">
                <WhyChooseUs />
                {/* Adjusted positioning for ContactForm */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-20 md:top-40 w-full px-4 md:w-3/4 lg:w-1/2 z-10">
                    <ContactForm />
                </div>
                <Testimonials />
            </div>
            <Footer />
        </div>
    );
}

function Header(): JSX.Element {
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
                    {" "}
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
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu" // Added aria-label
                >
                    <Menu size={24} />
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
                        className={`md:hidden flex flex-col w-full overflow-hidden`} // Ensure overflow is hidden for animation
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
            <nav className={`hidden md:flex flex-row items-center w-auto`}>
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
                {" "}
                {/* Adjusted text size */}
                <li className="hover:underline underline-offset-8 decoration-red-800 decoration-4 pb-1 md:pb-2">
                    <Link href="/" onClick={onLinkClick}>
                        Home
                    </Link>
                </li>
                <li className="hover:underline underline-offset-8 decoration-red-800 decoration-4 pb-1 md:pb-2">
                    <Link href="/" onClick={onLinkClick}>
                        About Us
                    </Link>
                </li>
                <li
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                >
                    <div className="hover:underline underline-offset-8 decoration-red-800 decoration-4 pb-1 md:pb-2 cursor-pointer">
                        Services
                    </div>
                    <AnimatePresence>
                        {isServicesOpen && (
                            <motion.div
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute top-full left-0 mt-2 w-64 bg-black/95 rounded-lg overflow-hidden z-10" // Added z-index
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
                    <Link href="/" onClick={onLinkClick}>
                        Careers
                    </Link>
                </li>
            </ul>
            <div className="md:ml-8 mb-4 md:mb-0 mt-4 md:mt-0">
                {" "}
                {/* Added margin top for mobile */}
                <Link
                    href=""
                    onClick={onLinkClick}
                    className="block text-center border-2 border-red-800 rounded-3xl hover:bg-red-800 px-5 py-1 transition-colors duration-300 text-lg md:text-base lg:text-xl" // Adjusted text size
                >
                    Contact Us
                </Link>
            </div>
        </>
    );
};

function Hero(): JSX.Element {
    const words: string[] = ["Innovate!", "Adapt!", "Thrive!"];
    const [currentWord, setCurrentWord] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 1500);
        return () => clearInterval(interval);
    }, [words.length]); // Added dependency

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
            transition: { duration: 0.2 },
        },
    };

    return (
        <div className="bg-black text-white pt-48 md:pt-80 pb-15 md:pb-30 px-4 overflow-hidden">
            {" "}
            {/* Increased top padding */}
            <div className="flex justify-center pt-15 md:pt-30 pb-5 md:pb-10 h-[120px] md:h-[180px]">
                <h1 className="text-5xl md:text-8xl font-bold flex items-center text-center">
                    {" "}
                    {/* Centered text */}
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
                className="font-medium mt-5 md:mt-10 text-center"
            >
                <p className="text-xl md:text-3xl pb-2">
                    Empowering Your Business with Cutting-Edge Software, Expert
                </p>
                <p className="text-xl md:text-3xl pb-2">
                    IT Consulting, Comprehensive Training, and Reliable Support
                </p>
                <p className="text-xl md:text-3xl">– All Under One Roof.</p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col md:flex-row justify-center py-10 md:py-20 gap-5 items-center"
            >
                <motion.div
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "#9B2C2C", // Use Tailwind color if possible, e.g., hover:bg-red-700
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-red-800 rounded-xl bg-red-800 px-6 py-2 shadow-inner cursor-pointer w-full md:w-auto text-center text-lg" // Adjusted padding and text size
                >
                    <Link href="/">Learn more</Link>
                </motion.div>
                <motion.div
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-white rounded-xl px-6 py-2 shadow-inner text-gray-200 cursor-pointer w-full md:w-auto text-center text-lg" // Adjusted padding and text size
                >
                    <Link href="/">Our Services</Link>
                </motion.div>
            </motion.div>
        </div>
    );
}

function Features(): JSX.Element {
    return (
        <div className="bg-[url(/features-bg.png)] min-h-[500px] md:h-[691px] w-full bg-cover bg-center text-white px-4 py-10 md:py-0">
            {" "}
            {/* Added padding */}
            <div className="flex justify-center">
                <h1 className="text-4xl md:text-[66px] text-[#E2E2E2] pt-8 md:pt-11 font-normal">
                    Features
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 lg:gap-40 pt-10 md:pt-20 lg:pt-25 px-4 md:px-10 lg:px-20">
                {" "}
                {/* Adjusted gaps and padding */}
                <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                        {" "}
                        {/* Added margin */}
                        <Image src="/Award.png" width={59} height={59} alt="" />
                    </div>
                    <h1 className="text-2xl md:text-3xl text-center pt-5">
                        Qualified Team
                    </h1>
                    <div className="text-base md:text-[20px] font-light text-center pt-5 md:pt-10">
                        <p>Expert designers and developers with</p>
                        <p>experience in top brand websites and</p>
                        <p>apps.</p>
                    </div>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                        {" "}
                        {/* Added margin */}
                        <Image src="/Award.png" width={59} height={59} alt="" />
                    </div>
                    <h1 className="text-2xl md:text-3xl text-center pt-5">
                        Smart Solutions
                    </h1>
                    <div className="text-base md:text-[20px] font-light text-center pt-5 md:pt-10">
                        <p>We're a leading website design and</p>
                        <p>development agency, providing expert</p>
                        <p>solutions with personalized projects.</p>
                    </div>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                        {" "}
                        {/* Added margin */}
                        <Image src="/Award.png" width={59} height={59} alt="" />
                    </div>
                    <h1 className="text-2xl md:text-3xl text-center pt-5">
                        Dedicated Support
                    </h1>
                    <div className="text-base md:text-[20px] font-light text-center pt-5 md:pt-10">
                        <p>We provide timely support via emails,</p>
                        <p>calls, and in-person visits, going the</p>
                        <p>extra mile to meet your needs.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Services(): JSX.Element {
    const serviceItems = [
        {
            imgSrc: "/computer.png",
            alt: "Software Development",
            title: "Software Development",
            desc: [
                "End-to-end custom software",
                "solutions for businesses, including",
                "web and mobile app development",
            ],
        },
        {
            imgSrc: "/it-consulting.png",
            alt: "IT Consulting",
            title: "IT Consulting",
            desc: [
                "Expert guidance on digital",
                "transformation, cloud solutions,",
                "and IT infrastructure.",
            ],
        },
        {
            imgSrc: "/training.png",
            alt: "Training & Development",
            title: "Training & Development",
            desc: [
                "Professional courses in software",
                "development, cloud computing,",
                "and DevOps.",
            ],
        },
        {
            imgSrc: "/support.png",
            alt: "Support & Maintenance",
            title: "Support & Maintenance",
            desc: [
                "24/7 technical support and system",
                "maintenance to ensure seamless",
                "operations.",
            ],
        },
        {
            imgSrc: "/analytics.png",
            alt: "Data Analytics",
            title: "Data Analytics",
            desc: [
                "Advanced data solutions to help",
                "businesses make data-driven",
                "decisions.",
            ],
        },
        {
            imgSrc: "/cybersecurity.png",
            alt: "CyberSecurity Solutions",
            title: "CyberSecurity Solutions",
            desc: [
                "Robust security strategies to",
                "protect businesses from digital",
                "threats.",
            ],
        },
    ];

    return (
        <div className="text-base md:text-[20px] px-4 md:px-8 py-10 md:py-16">
            {" "}
            {/* Added padding */}
            <h1
                className="text-center pt-15 md:pt-20 pb-10 md:pb-16 text-4xl md:text-6xl font-semibold
          [text-shadow:_2px_2px_4px_rgba(0,0,0,0.4)]"
            >
                Our Services
            </h1>
            <div className="pt-5 md:pt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {" "}
                    {/* Adjusted grid and gap */}
                    {serviceItems.map((item, index) => (
                        <div
                            key={index}
                            className="text-center p-6 md:p-10 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" // Added border, rounded, shadow
                        >
                            <Image
                                src={item.imgSrc}
                                width={320} // Consistent width
                                height={218} // Consistent height
                                alt={item.alt}
                                className="mx-auto mb-4 w-full max-w-[250px] h-auto object-contain" // Adjusted styles
                            />
                            <div className="mt-4 space-y-2">
                                <h1 className="text-[#0F3775] text-2xl md:text-3xl font-semibold">
                                    {item.title}
                                </h1>
                                {item.desc.map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="my-10 md:my-20 overflow-hidden">
                <Marquee autoFill speed={50}>
                    <Badges text="Website Development" />
                    <Badges text="Mobile Application Development" />
                    <Badges text="Cloud Computing" />
                    <Badges text="DevOps" />
                    <Badges text="Data Analytics" />
                    <Badges text="Cybersecurity" />
                </Marquee>
            </div>
        </div>
    );
}

interface FeatureItem {
    text: string;
    className: string;
}

function WhyChooseUs(): JSX.Element {
    const features: FeatureItem[] = [
        {
            text: "Expert Trainers with Industry Experience",
            className: "md:ml-0",
        },
        {
            text: "Hands-On Projects and Real-World Scenarios",
            className: "md:ml-20",
        },
        {
            text: "Access to Cutting-Edge Tools and Technologies",
            className: "md:ml-40",
        },
        {
            text: "Certification on Course Completion",
            className: "md:ml-50", // Note: ml-50 is not a standard Tailwind class, might need adjustment
        },
        {
            text: "Flexible Schedules for Working Professionals",
            className: "md:ml-40",
        },
        {
            text: "24/7 Student Support",
            className: "md:ml-20",
        },
        {
            text: "Innovation and creativity are our secrets to web designing and development success",
            className: "md:ml-0",
        },
    ];

    return (
        <div className="bg-[url(/chooseus.png)] min-h-screen w-full bg-cover bg-center text-white px-4 py-16 md:py-24 relative">
            {" "}
            {/* Added padding and relative positioning */}
            {/* Add an overlay for better text readability */}
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            <div className="relative z-10">
                {" "}
                {/* Content container */}
                <h1 className="font-bold text-4xl md:text-[66px] pl-4 md:pl-30 pt-10 md:pt-0 tracking-wide text-center md:text-left">
                    {" "}
                    {/* Adjusted padding and alignment */}
                    Why Choose Us?
                </h1>
                <div className="flex justify-center md:justify-end pt-10 md:pt-5">
                    {" "}
                    {/* Adjusted alignment */}
                    <div className="w-full md:w-1/2 lg:w-2/5 md:mr-20 lg:mr-40">
                        {" "}
                        {/* Adjusted width and margin */}
                        <div className="text-xl md:text-2xl font-light space-y-8 md:space-y-12">
                            {" "}
                            {/* Adjusted spacing */}
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className={`flex items-start gap-4 md:gap-6 ${feature.className}`} // Use items-start for better alignment with multi-line text
                                >
                                    <div className="pt-1">
                                        {" "}
                                        {/* Align icon with first line */}
                                        <ChooseIcon />
                                    </div>
                                    <div className="flex-1">{feature.text}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface Location {
    country: string;
    name: string;
    title: string;
    address: string;
    phone: string;
    email: string;
    imageUrl: string | StaticImageData; // Allow StaticImageData
}

function ContactForm(): JSX.Element {
    const [index, setIndex] = useState<number>(0);
    const locations: Location[] = [
        {
            country: "India",
            name: "Gowtham Porla",
            title: "",
            address:
                "Plot No: 144, Flat No: 302, OM Shakthi Towers, SR Nagar, Hyderabad-18, Telangana State, India",
            phone: "+91-9052955755",
            email: "Info@Vrtechinfoinc.Com",
            imageUrl: "/map-placeholder.png",
        },
        {
            country: "Canada",
            name: "Vivek Reddy",
            title: "Founder and CEO",
            address:
                "33 candlebrook Crescent, Scarborough, Ontario, Canada- M1W 4B3.",
            phone: "+1-647-447-5656",
            email: "Info@Vrtechinfoinc.Com",
            imageUrl: "/map-placeholder.png",
        },
        {
            country: "USA",
            name: "Sandeep",
            title: "",
            address: "308 shaker run, Albany, New York-12205 USA.",
            phone: "+1-618-971-7471",
            email: "Info@Vrtechinfoinc.Com",
            imageUrl: "/map-placeholder.png",
        },
    ];

    const handlePrev: React.MouseEventHandler<HTMLButtonElement> = () => {
        setIndex((prevIndex) =>
            prevIndex === 0 ? locations.length - 1 : prevIndex - 1,
        );
    };

    const handleNext: React.MouseEventHandler<HTMLButtonElement> = () => {
        setIndex((prevIndex) =>
            prevIndex === locations.length - 1 ? 0 : prevIndex + 1,
        );
    };

    const handleCountryClick = (i: number) => {
        setIndex(i);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log("Form submitted");
    };

    return (
        <div className="w-full max-w-[1000px] mx-auto px-4 py-10 md:py-0">
            {" "}
            {/* Adjusted max-width and padding */}
            <div className="flex flex-col md:flex-row shadow-2xl border border-gray-400 rounded-xl overflow-hidden bg-white">
                {" "}
                {/* Added bg-white */}
                {/* Left Section - Form */}
                <div className="w-full md:w-1/2 bg-neutral-900 text-white p-6 md:p-8">
                    <h1 className="text-3xl md:text-[40px] mb-6 text-center">
                        Reach out to us!
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="w-full md:w-4/5 mx-auto">
                            <label
                                htmlFor="name"
                                className="block text-sm font-normal mb-1"
                            >
                                Name*
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                className="w-full p-2 rounded-md bg-neutral-800 text-white border border-gray-600 focus:border-red-500 focus:ring-red-500 transition" // Improved styling
                            />
                        </div>
                        <div className="w-full md:w-4/5 mx-auto">
                            <label
                                htmlFor="email"
                                className="block text-sm font-normal mb-1"
                            >
                                Email*
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full p-2 rounded-md bg-neutral-800 text-white border border-gray-600 focus:border-red-500 focus:ring-red-500 transition" // Improved styling
                            />
                        </div>
                        <div className="w-full md:w-4/5 mx-auto">
                            <label
                                htmlFor="contact"
                                className="block text-sm font-normal mb-1"
                            >
                                Contact No.*
                            </label>
                            <input
                                id="contact"
                                type="tel"
                                required
                                className="w-full p-2 rounded-md bg-neutral-800 text-white border border-gray-600 focus:border-red-500 focus:ring-red-500 transition" // Improved styling
                            />
                        </div>
                        <div className="w-full md:w-4/5 mx-auto">
                            <label
                                htmlFor="message"
                                className="block text-sm font-normal mb-1"
                            >
                                Message*
                            </label>
                            <textarea
                                id="message"
                                required
                                className="w-full p-2 rounded-md bg-neutral-800 text-white border border-gray-600 h-24 focus:border-red-500 focus:ring-red-500 transition" // Improved styling
                            />
                        </div>
                        <div className="flex justify-center pt-2">
                            {" "}
                            {/* Added padding top */}
                            <button
                                type="submit"
                                className="px-8 py-2 bg-white rounded-full font-bold text-[#EC6B6B] hover:bg-gray-200 transition-all"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Section - Location Carousel */}
                <div className="w-full md:w-1/2 bg-white p-6 md:p-8 relative flex flex-col items-center text-center">
                    {" "}
                    {/* Centered content */}
                    {/* Country Icons */}
                    <div className="flex justify-center space-x-6 mb-8">
                        {locations.map((loc, i) => (
                            <button // Changed to button for accessibility
                                key={i}
                                onClick={() => handleCountryClick(i)}
                                className={`p-1 border-2 rounded-lg transition-all duration-300 ${i === index ? "border-black scale-110" : "border-transparent opacity-60 hover:opacity-100"}`}
                                aria-label={`Select ${loc.country} location`}
                            >
                                <Image
                                    src={`/${loc.country.toLowerCase()}.png`}
                                    alt={loc.country}
                                    width={48} // Consistent size
                                    height={32} // Consistent size
                                    className="block" // Ensure image is block
                                />
                            </button>
                        ))}
                    </div>

                    {/* Location Content */}
                    <div className="flex flex-col items-center flex-grow justify-center w-full max-w-sm">
                        {" "}
                        {/* Added width constraint */}
                        <Image
                            src={locations[index].imageUrl}
                            alt="Office Location"
                            width={240} // Explicit width
                            height={160} // Explicit height
                            className="rounded-lg border border-gray-300 object-cover mb-6"
                        />
                        <h2 className="text-xl font-bold text-red-600 mb-1">
                            {" "}
                            {/* Reduced margin */}
                            {locations[index].name}
                        </h2>
                        {locations[index].title && (
                            <p className="text-gray-600 mb-2">
                                {locations[index].title}
                            </p>
                        )}
                        <p className="text-gray-600 text-center mb-2 text-sm">
                            {" "}
                            {/* Smaller text */}
                            {locations[index].address}
                        </p>
                        <p className="font-semibold mb-1">
                            {locations[index].phone}
                        </p>
                        <a // Use anchor tag for email
                            href={`mailto:${locations[index].email}`}
                            className="text-blue-600 underline hover:text-blue-800 text-sm" // Smaller text
                        >
                            {locations[index].email}
                        </a>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                        aria-label="Previous location"
                    >
                        <Image
                            src="/left-arrow.png"
                            alt="Previous"
                            width={24}
                            height={24}
                        />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                        aria-label="Next location"
                    >
                        <Image
                            src="/right-arrow.png"
                            alt="Next"
                            width={24}
                            height={24}
                        />
                    </button>
                </div>
            </div>

            {/* Bottom Line - Adjusted positioning and width */}
            <div className="relative w-full mt-10 md:mt-20 h-1 flex justify-center">
                <div className="w-11/12 md:w-[900px] max-w-full h-[5px] bg-black"></div>
            </div>
        </div>
    );
}

function Testimonials(): JSX.Element {
    return (
        <div className="bg-[url(/reviewsbackground.png)] min-h-[900px] md:min-h-[1144px] w-full bg-cover bg-center overflow-hidden pt-24 md:pt-32">
            {" "}
            {/* Adjusted padding */}
            {/* Increased top padding to accommodate the absolutely positioned ContactForm */}
            <div className="pt-[450px] md:pt-[550px] lg:pt-[600px]">
                <div className="mb-10 md:mb-16">
                    {" "}
                    {/* Increased margin */}
                    <h1 className="text-4xl md:text-[48px] font-bold text-center text-black px-4">
                        {" "}
                        {/* Added padding */}
                        Hear From Our Customers
                    </h1>
                </div>
                <div className="relative">
                    <CardCarousel>
                        <TestimonialCard
                            name="John Doe"
                            roles="CEO of TechCorp"
                            content="The team provided exceptional service, delivering our project ahead of schedule without compromising on quality. Their attention to detail and innovative solutions exceeded our expectations!"
                            avatarSrc="/user-avatar.png" // Added avatar prop
                        />
                        <TestimonialCard
                            name="Sarah Johnson"
                            roles="CTO of InnovateTech"
                            content="Working with this team has been transformative for our business. Their expertise in cloud solutions and cybersecurity has helped us scale securely and efficiently."
                            avatarSrc="/user-avatar.png" // Added avatar prop
                        />
                        <TestimonialCard
                            name="Michael Chen"
                            roles="Director of Operations"
                            content="The training programs are comprehensive and practical. Our team's productivity has increased significantly after completing their development courses."
                            avatarSrc="/user-avatar.png" // Added avatar prop
                        />
                        <TestimonialCard
                            name="Emily Williams"
                            roles="Product Manager"
                            content="Their support team is incredibly responsive and knowledgeable. They've been instrumental in maintaining our systems and resolving issues promptly."
                            avatarSrc="/user-avatar.png" // Added avatar prop
                        />
                    </CardCarousel>
                </div>
            </div>
        </div>
    );
}

interface TestimonialCardProps {
    name: string;
    roles: string;
    content: string;
    avatarSrc: string | StaticImageData; // Added avatar source prop
}

const TestimonialCard: React.FC<Readonly<TestimonialCardProps>> = ({
    name,
    roles,
    content,
    avatarSrc,
}) => {
    return (
        <div className="bg-[#FDF6F6] p-6 md:p-9 rounded-xl shadow-lg w-[300px] sm:w-[350px] md:w-[450px] h-[400px] md:h-[400px] relative flex flex-col">
            {" "}
            {/* Adjusted height and flex */}
            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-6 md:mb-8">
                {" "}
                {/* Adjusted margin */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                    {" "}
                    {/* Added overflow hidden */}
                    <Image
                        src={avatarSrc}
                        alt={`${name}'s Avatar`}
                        width={80} // Match container size
                        height={80} // Match container size
                        className="object-cover w-full h-full" // Ensure image covers the circle
                    />
                </div>
                <div className="flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                        {name}
                    </h3>
                    <p className="text-base md:text-lg text-gray-600">{roles}</p>
                </div>
            </div>

            {/* Testimonial Content */}
            <div className="relative flex-grow">
                {" "}
                {/* Allow content to grow */}
                <Image
                    src="/quote-left.png"
                    alt="Quote"
                    width={40}
                    height={40}
                    className="absolute -top-4 -left-2 opacity-10" // Reduced opacity
                />
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed pl-6 relative z-10">
                    {" "}
                    {/* Adjusted text size and z-index */}
                    {content}
                </p>
            </div>
        </div>
    );
};

interface CardCarouselProps {
    children: ReactNode;
}

const CardCarousel: React.FC<Readonly<CardCarouselProps>> = ({ children }) => {
    const [index, setIndex] = useState<number>(0);
    const total = React.Children.count(children);

    // Type for getPosition function specific to this carousel
    interface CarouselPositionStyle {
        scale: number;
        x: string; // Using percentage strings
        zIndex: number;
        opacity: number;
    }

    const getPosition = (
        cardIndex: number,
        currentIndex: number,
        totalCards: number,
    ): CarouselPositionStyle => {
        const diff = (cardIndex - currentIndex + totalCards) % totalCards;
        if (diff === 0) return { scale: 1, x: "0%", zIndex: 3, opacity: 1 }; // Center
        if (diff === 1)
            return { scale: 0.85, x: "50%", zIndex: 2, opacity: 0.7 }; // Right (adjusted position)
        if (diff === totalCards - 1)
            return { scale: 0.85, x: "-50%", zIndex: 2, opacity: 0.7 }; // Left (adjusted position)
        // Hide cards further away
        const xPos = diff > totalCards / 2 ? "-100%" : "100%";
        return { scale: 0.7, x: xPos, zIndex: 1, opacity: 0 };
    };

    const handleDragEnd: DragHandlers["onDragEnd"] = (
        event,
        { offset, velocity },
    ) => {
        const swipeThreshold = 50; // Minimum distance for a swipe
        const swipeVelocityThreshold = 300; // Minimum velocity for a swipe

        if (
            Math.abs(offset.x) > swipeThreshold ||
            Math.abs(velocity.x) > swipeVelocityThreshold
        ) {
            if (offset.x > 0) {
                // Swiped right (go to previous)
                setIndex((prev) => (prev - 1 + total) % total);
            } else {
                // Swiped left (go to next)
                setIndex((prev) => (prev + 1) % total);
            }
        }
    };

    const handlePrevClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        setIndex((prev) => (prev - 1 + total) % total);
    };

    const handleNextClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        setIndex((prev) => (prev + 1) % total);
    };

    const handleDotClick = (i: number) => {
        setIndex(i);
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-[550px] md:h-[600px]">
            {" "}
            {/* Increased height */}
            <div className="relative w-[300px] sm:w-[350px] md:w-[450px] h-[400px] md:h-[400px]">
                {" "}
                {/* Ensure container matches card size */}
                {React.Children.map(children, (child, i) => {
                    if (!React.isValidElement(child)) return null; // Type guard
                    const position = getPosition(i, index, total);
                    return (
                        <motion.div
                            key={i}
                            initial={false} // Prevent initial animation if not needed
                            animate={{
                                scale: position.scale,
                                x: position.x, // Use the string value directly
                                zIndex: position.zIndex,
                                opacity: position.opacity,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeInOut",
                            }}
                            className="absolute top-0 left-1/2 cursor-grab" // Centered using left-1/2 and transform below
                            style={{
                                transform: `translateX(-50%)`, // Center the card horizontally
                                width: "100%", // Ensure it takes the width of the container
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }} // Constraint dragging
                            dragElastic={0.1} // Reduced elasticity
                            onDragEnd={handleDragEnd}
                        >
                            {child}
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation Buttons - Adjusted positioning */}
            <div className="absolute w-full max-w-screen-lg flex justify-between px-4 sm:px-8 top-1/2 -translate-y-1/2 pointer-events-none">
                <button
                    onClick={handlePrevClick}
                    className="transform -translate-x-4 sm:-translate-x-8 bg-white/30 p-2 sm:p-3 rounded-full hover:bg-white/50 transition pointer-events-auto shadow-md"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-gray-800" />
                </button>
                <button
                    onClick={handleNextClick}
                    className="transform translate-x-4 sm:translate-x-8 bg-white/30 p-2 sm:p-3 rounded-full hover:bg-white/50 transition pointer-events-auto shadow-md"
                    aria-label="Next testimonial"
                >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-gray-800" />
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-12 md:mt-16">
                {" "}
                {/* Increased margin */}
                {Array.from({ length: total }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handleDotClick(i)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? "bg-gray-800 scale-125" : "bg-gray-400 hover:bg-gray-500"}`}
                        aria-label={`Go to testimonial ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

function Footer(): JSX.Element {
    const footerSections = [
        {
            title: "COMPANY",
            links: [
                { text: "Blog", href: "#" },
                { text: "Careers", href: "#" },
                { text: "FAQ's", href: "#" },
            ],
        },
        {
            title: "QUICK LINKS",
            links: [
                { text: "Services", href: "#" },
                { text: "About Us", href: "#" },
                { text: "Contact Us", href: "#" },
            ],
        },
        {
            title: "LEGAL",
            links: [
                { text: "Terms of Service", href: "#" },
                { text: "Privacy Policy", href: "#" },
                { text: "Cookies Policy", href: "#" },
                { text: "Data Processing", href: "#" },
            ],
        },
        {
            title: "CONTACT US",
            links: [
                { text: "CANADA: +1-647-447-5856", href: "tel:+16474475856" },
                { text: "INDIA: +91-9052955755", href: "tel:+919052955755" },
                { text: "USA: +1-618-971-7471", href: "tel:+16189717471" },
                {
                    text: "Mail: info@vrtechinfolinc.com",
                    href: "mailto:info@vrtechinfolinc.com",
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
        <footer className="bg-black text-white py-8 md:py-12 px-4 md:px-16 lg:px-24">
            {" "}
            {/* Adjusted padding */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-8">
                {" "}
                {/* Adjusted grid columns and max-width */}
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
                            {" "}
                            {/* Uppercase title */}
                            {section.title}
                        </h3>
                        <ul className="text-gray-400 space-y-2 text-sm">
                            {" "}
                            {/* Adjusted text size */}
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
                            aria-label={`Visit our ${social.name} page`} // Added aria-label
                        >
                            <Image
                                src={social.icon}
                                alt={social.name}
                                width={24}
                                height={24}
                                className="opacity-80 hover:opacity-100" // Added opacity effect
                            />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

// Helper Components
interface BadgesProps {
    text: string;
}

function Badges({ text }: Readonly<BadgesProps>): JSX.Element {
    return (
        <div className="text-xl md:text-2xl lg:text-3xl font-medium border-2 border-gray-300 rounded-full mx-4 md:mx-8 lg:mx-10 py-2 md:py-2 lg:py-[10px] px-4 md:px-6 lg:px-[29px] whitespace-nowrap bg-white text-gray-800 shadow-sm">
            {" "}
            {/* Adjusted styles */}
            {text}
        </div>
    );
}

function ChooseIcon(): JSX.Element {
    return (
        <Image
            src="/chooseicon.png"
            alt=""
            height={41}
            width={41}
            className="flex-shrink-0" // Prevent icon from shrinking
        />
    );
}

// Standalone getPosition function (if needed elsewhere, otherwise keep inside component)
// Kept the specific one inside CardCarousel as it uses percentages
const getPositionGeneric = (
    index: number,
    currentIndex: number,
    total: number,
): PositionStyle => {
    const pos = (index - currentIndex + total) % total;
    if (pos === 0) return { scale: 1, x: 0, zIndex: 10, opacity: 1 };
    if (pos === 1) return { scale: 0.85, x: 250, zIndex: 5, opacity: 0.55 };
    if (pos === total - 1)
        return { scale: 0.85, x: -250, zIndex: 5, opacity: 0.55 };
    return { scale: 0.7, x: 0, zIndex: 1, opacity: 0 };
};
