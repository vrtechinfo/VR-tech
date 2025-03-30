"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import React from "react";

// Import motion
import { AnimatePresence, motion } from "framer-motion";

import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

// --- Animation Variants ---
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Time delay between children animations
        },
    },
};

// --- Main Component ---
export default function Home() {
    return (
        <div className="w-full overflow-x-hidden">
            <Header />
            {/* No extra animation needed for main, sections handle their own */}
            <main>
                <Hero /> {/* Hero has its own internal animations */}
                <Features />
                <Services />
                {/* Combined WhyChooseUs background and ContactForm positioning */}
                <div className="relative bg-[url(/chooseus.png)] bg-cover bg-center text-white py-16 md:py-20 overflow-hidden">
                    {" "}
                    {/* Added overflow-hidden */}
                    <WhyChooseUs />
                    {/* Contact form positioned */}
                    <div className="relative md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:-bottom-48 lg:-bottom-64 w-full px-4 md:px-0 md:w-11/12 lg:w-4/5 xl:w-2/3 mt-12 md:mt-0 z-20">
                        <ContactForm />
                    </div>
                </div>
                {/* Testimonials section needs padding top */}
                <div className="relative pt-64 md:pt-80 lg:pt-96 overflow-hidden">
                    {" "}
                    {/* Added overflow-hidden */}
                    <Testimonials />
                </div>
            </main>
            <Footer />
        </div>
    );
}

// --- Header --- (No changes needed for section animation)
function Header() {
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const serviceOptions = [
        "Software Development",
        "IT Consulting",
        "Cloud Solutions",
    ];

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -5, scale: 0.95, transition: { duration: 0.15 } },
    };

    const mobileMenuVariants = {
        hidden: { x: "100%", opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: "tween" } },
        exit: { x: "100%", opacity: 0, transition: { type: "tween" } },
    };

    return (
        <header className="bg-black/90 text-white px-4 sm:px-8 md:px-12 lg:px-20 flex text-lg md:text-xl lg:text-2xl justify-between items-center fixed top-0 left-0 right-0 z-50 h-20 md:h-24">
            <div className="pl-2 md:pl-5 lg:pl-10 flex-shrink-0">
                <Image
                    src={"/vr-logo.png"}
                    width={100}
                    height={100}
                    alt="vr tech info logo"
                    className="w-16 h-16 md:w-24 md:h-24 lg:w-[146px] lg:h-[146px]"
                    priority // Prioritize loading the logo
                />
            </div>
            <nav className="hidden lg:flex flex-grow justify-center">
                <ul className="flex space-x-8 xl:space-x-12 items-center">
                    <li className="hover:underline underline-offset-8 decoration-red-800 decoration-2 md:decoration-4 pb-1">
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li className="hover:underline underline-offset-8 decoration-red-800 decoration-2 md:decoration-4 pb-1">
                        <Link href={"/about"}>About Us</Link>
                    </li>
                    <li
                        className="relative"
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                    >
                        <div className="hover:underline underline-offset-8 decoration-red-800 decoration-2 md:decoration-4 pb-1 cursor-pointer">
                            Services
                        </div>
                        <AnimatePresence>
                            {isServicesOpen && (
                                <motion.div
                                    variants={dropdownVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-60 bg-black/95 rounded-lg overflow-hidden shadow-lg"
                                >
                                    {serviceOptions.map((service, index) => (
                                        <motion.div
                                            key={service}
                                            initial={{ opacity: 0, x: -15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.08 }}
                                            className="border-b border-gray-700 last:border-none"
                                        >
                                            <Link
                                                href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
                                                className="block px-5 py-3 text-base hover:bg-red-800/30 transition-colors duration-200"
                                            >
                                                {service}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                    <li className="hover:underline underline-offset-8 decoration-red-800 decoration-2 md:decoration-4 pb-1">
                        <Link href={"/careers"}>Careers</Link>
                    </li>
                </ul>
            </nav>
            <div className="hidden lg:block self-center border border-red-800 rounded-full hover:bg-red-800 px-4 py-1 text-lg transition-colors duration-300">
                <Link href="/contact">Contact Us</Link>
            </div>
            <div className="lg:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    aria-label="Open menu"
                >
                    <Menu size={32} />
                </button>
            </div>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 bg-black/95 z-50 p-6 flex flex-col lg:hidden"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <Image
                                src={"/vr-logo.png"}
                                width={80}
                                height={80}
                                alt="vr tech info logo"
                            />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                <X size={32} />
                            </button>
                        </div>
                        <nav className="flex-grow">
                            <ul className="flex flex-col space-y-6 text-2xl items-center mt-10">
                                <li>
                                    <Link href={"/"} onClick={() => setIsMobileMenuOpen(false)}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={"/about"}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li className="text-center">
                                    <span className="font-semibold">Services</span>
                                    <ul className="mt-2 space-y-2 text-xl">
                                        {serviceOptions.map((service) => (
                                            <li key={service}>
                                                <Link
                                                    href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="text-gray-300 hover:text-white"
                                                >
                                                    {service}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li>
                                    <Link
                                        href={"/careers"}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Careers
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="mt-auto text-center">
                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="border border-red-800 rounded-full bg-red-800 px-6 py-2 text-xl transition-colors duration-300 inline-block"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

// --- Hero --- (Already has animations, no section wrapper needed)
function Hero() {
    const words = ["Innovate!", "Adapt!", "Thrive!"];
    const [currentWord, setCurrentWord] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 1500);
        return () => clearInterval(interval);
    }, );

    const dropAnimation = {
        initial: { y: -50, opacity: 0, scale: 1.1, filter: "blur(3px)" },
        animate: { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: {
            opacity: 0,
            scale: 0.9,
            filter: "blur(5px)",
            transition: { duration: 0.2 },
        },
    };

    return (
        <section className="bg-black text-white pt-32 md:pt-48 lg:pt-60 pb-16 md:pb-24 lg:pb-30 overflow-hidden min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center">
            <div className="flex justify-center items-center h-[100px] md:h-[140px] lg:h-[180px] mb-4 md:mb-8">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold flex items-center text-center">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentWord}
                            variants={dropAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{
                                type: "spring",
                                stiffness: 350,
                                damping: 18,
                                mass: 0.9,
                                duration: 0.3,
                            }}
                            className="inline-block"
                        >
                            <span className="text-red-800">{words[currentWord].charAt(0)}</span>
                            {words[currentWord].slice(1)}
                        </motion.span>
                    </AnimatePresence>
                </h1>
            </div>
            <motion.div
                // Use pre-defined variant
                variants={fadeInUp}
                initial="hidden"
                // Animate when this specific element is in view
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }} // Trigger once when 50% visible
                className="font-medium mt-6 md:mt-10 px-4 text-center"
            >
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed">
                    Empowering Your Business with Cutting-Edge Software, Expert IT
                    Consulting, Comprehensive Training, and Reliable Support – All Under
                    One Roof.
                </p>
            </motion.div>
            <motion.div
                // Use pre-defined variant with a slight delay
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }} // Add delay here
                className="flex flex-col sm:flex-row justify-center items-center py-10 md:py-16 lg:py-20 gap-4 md:gap-6 text-lg md:text-xl"
            >
                <motion.div
                    whileHover={{ scale: 1.05, backgroundColor: "#7f1d1d" }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-red-800 rounded-lg bg-red-800 px-6 py-2 shadow-inner cursor-pointer"
                >
                    <Link href={"/about"}>Learn more</Link>
                </motion.div>
                <motion.div
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-white rounded-lg px-6 py-2 shadow-inner text-gray-200 cursor-pointer"
                >
                    <Link href={"/services"}>Our Services</Link>
                </motion.div>
            </motion.div>
        </section>
    );
}

// --- Features ---
function Features() {
    const featuresData = [
        {
            icon: "/Award.png",
            title: "Qualified Team",
            description:
                "Expert designers and developers with experience in top brand websites and apps.",
        },
        {
            icon: "/Award.png",
            title: "Smart Solutions",
            description:
                "Leading website design and development agency, providing expert solutions with personalized projects.",
        },
        {
            icon: "/Award.png",
            title: "Dedicated support",
            description:
                "Timely support via emails, calls, and in-person visits, going the extra mile to meet your needs.",
        },
    ];

    return (
        // Section container - no animation itself, children handle it
        <section className="bg-[url(/features-bg.png)] w-full bg-cover bg-center text-white py-16 md:py-24 lg:py-32 px-4">
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="text-center mb-12 md:mb-16 lg:mb-20"
            >
                <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#E2E2E2] font-normal">
                    Features
                </h1>
            </motion.div>

            {/* Stagger container for the grid items */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the container is visible
                className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16"
            >
                {featuresData.map((feature, index) => (
                    // Apply fadeInUp variant to each child grid item
                    <motion.div
                        key={index}
                        variants={fadeInUp} // Use the same variant for children
                        className="text-center flex flex-col items-center"
                    >
                        <div className="mb-4 md:mb-5">
                            <Image
                                src={feature.icon}
                                width={59}
                                height={59}
                                alt={`${feature.title} icon`}
                            />
                        </div>
                        <h2 className="text-2xl md:text-3xl mb-3 md:mb-4">{feature.title}</h2>
                        <p className="text-lg md:text-xl font-light text-gray-300 max-w-xs">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

// --- Services ---
function Services() {
    const servicesData = [
        {
            img: "/computer.png",
            alt: "Software Development",
            title: "Software Development",
            desc: "End-to-end custom software solutions for businesses, including web and mobile app development.",
            imgWidth: 253,
            imgHeight: 213,
        },
        {
            img: "/it-consulting.png",
            alt: "IT Consulting",
            title: "IT Consulting",
            desc: "Expert guidance on digital transformation, cloud solutions, and IT infrastructure.",
            imgWidth: 266,
            imgHeight: 210,
        },
        {
            img: "/training.png",
            alt: "Training & Development",
            title: "Training & Development",
            desc: "Professional courses in software development, cloud computing, and DevOps.",
            imgWidth: 309,
            imgHeight: 214,
        },
        {
            img: "/support.png",
            alt: "Support & Maintenance",
            title: "Support & Maintenance",
            desc: "24/7 technical support and system maintenance to ensure seamless operations.",
            imgWidth: 281,
            imgHeight: 213,
        },
        {
            img: "/analytics.png",
            alt: "Data Analytics",
            title: "Data Analytics",
            desc: "Advanced data solutions to help businesses make data-driven decisions.",
            imgWidth: 308,
            imgHeight: 218,
        },
        {
            img: "/cybersecurity.png",
            alt: "CyberSecurity Solutions",
            title: "CyberSecurity Solutions",
            desc: "Robust security strategies to protect businesses from digital threats.",
            imgWidth: 320,
            imgHeight: 190,
        },
    ];

    return (
        <section className="py-16 md:py-24 lg:py-32 px-4 text-lg md:text-xl">
            <motion.h1
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="text-center pb-12 md:pb-16 lg:pb-20 text-4xl sm:text-5xl md:text-6xl font-semibold
          text-gray-800 [text-shadow:_1px_1px_3px_rgba(0,0,0,0.2)]"
            >
                Our Services
            </motion.h1>
            <div className="max-w-7xl mx-auto">
                {/* Stagger container for service cards */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }} // Trigger earlier for grids
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-300"
                >
                    {servicesData.map((service, index) => (
                        // Apply fadeInUp to each service card
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="text-center border-r border-b border-gray-300 p-6 md:p-8 lg:p-10 flex flex-col items-center min-h-[380px] md:min-h-[420px]"
                        >
                            <div className="mb-4 flex-shrink-0 h-[150px] md:h-[180px] flex items-center justify-center">
                                <Image
                                    src={service.img}
                                    width={service.imgWidth}
                                    height={service.imgHeight}
                                    alt={service.alt}
                                    className="max-w-full max-h-full object-contain"
                                    loading="lazy" // Lazy load images below the fold
                                />
                            </div>
                            <div className="mt-4 space-y-2 flex-grow flex flex-col justify-center">
                                <h2 className="text-[#0F3775] text-2xl md:text-3xl font-semibold">
                                    {service.title}
                                </h2>
                                <p className="text-gray-600 max-w-sm mx-auto">{service.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            {/* Marquee animation is built-in, no extra motion needed */}
            <div className="my-16 md:my-20 overflow-hidden">
                <Marquee autoFill pauseOnHover>
                    <Badges text="Website Development" />
                    <Badges text="Mobile Application Development" />
                    <Badges text="Cloud Solutions" />
                    <Badges text="IT Consulting" />
                </Marquee>
            </div>
        </section>
    );
}

// --- Badges --- (No animation needed)
function Badges({ text }: Readonly<{ text: string }>) {
    return (
        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium border border-gray-400 rounded-full mx-4 sm:mx-6 md:mx-10 py-2 px-4 sm:px-6 md:px-[29px] whitespace-nowrap">
            {text}
        </h1>
    );
}

// --- WhyChooseUs --- (Integrated into parent div in Home)
function WhyChooseUs() {
    const points = [
        "Expert Trainers with Industry Experience",
        "Hands-On Projects and Real-World Scenarios",
        "Access to Cutting-Edge Tools and Technologies",
        "Certification on Course Completion",
        "Flexible Schedules for Working Professionals",
        "24/7 Student Support",
        "Innovation and creativity are our secrets to web designing and development success",
    ];

    return (
        // This component is inside an already animated parent, apply stagger here
        <motion.div
            // No variants needed on the container itself if children handle animation
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-6xl mx-auto px-4 md:px-8 lg:px-0"
        >
            <motion.h1
                variants={fadeInUp} // Animate heading first
                className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[66px] mb-10 md:mb-16 text-center lg:text-left lg:pl-10 tracking-wide"
            >
                Why Choose Us?
            </motion.h1>
            <div className="flex justify-center lg:justify-end">
                {/* Stagger container for the list items */}
                <motion.div
                    variants={staggerContainer}
                    // Inherit initial/whileInView from parent or set explicitly
                    className="w-full lg:w-3/5 xl:w-1/2 space-y-6 md:space-y-8 text-lg sm:text-xl md:text-2xl font-light"
                >
                    {points.map((point, index) => (
                        // Apply fadeInUp to each list item
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="flex items-start gap-4 md:gap-6"
                        >
                            <div className="flex-shrink-0 pt-1">
                                <ChooseIcon />
                            </div>
                            <p>{point}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}

// --- ChooseIcon --- (No animation needed)
function ChooseIcon() {
    return (
        <Image
            src={"/chooseicon.png"}
            alt="Checkmark icon"
            height={35}
            width={35}
            className="w-6 h-6 md:w-8 md:h-8 lg:w-[35px] lg:h-[35px]"
        />
    );
}

// --- ContactForm ---
function ContactForm() {
    const locations = [
        {
            country: "India",
            name: "Gowtham Porla",
            title: "",
            address:
                "Plot No: 144, Flat No: 302, OM Shakthi Towers, SR Nagar, Hyderabad-18, Telangana State, India",
            phone: "+91-9052955755",
            email: "Info@Vrtechinfoinc.Com",
            imageUrl: "/map-placeholder.png",
            flagUrl: "/india.png",
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
            flagUrl: "/canada.png",
        },
        {
            country: "USA",
            name: "Sandeep",
            title: "",
            address: "308 shaker run, Albany, New York-12205 USA.",
            phone: "+1-618-971-7471",
            email: "Info@Vrtechinfoinc.Com",
            imageUrl: "/map-placeholder.png",
            flagUrl: "/usa.png",
        },
    ];

    const [index, setIndex] = useState(0);

    const handlePrev = () => {
        setIndex((prevIndex) =>
            prevIndex === 0 ? locations.length - 1 : prevIndex - 1,
        );
    };

    const handleNext = () => {
        setIndex((prevIndex) =>
            prevIndex === locations.length - 1 ? 0 : prevIndex + 1,
        );
    };

    const currentLoc = locations[index];

    return (
        // Apply animation to the entire form container
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row w-full shadow-2xl border border-gray-300 rounded-xl overflow-hidden bg-white"
        >
            {/* Left Section - Form */}
            <div className="w-full md:w-1/2 bg-neutral-900 text-white p-6 md:p-8 lg:p-10 flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl mb-6 md:mb-8 text-center font-semibold">
                    Reach out to us!
                </h2>
                <form className="space-y-4 md:space-y-5 flex flex-col items-center w-full max-w-md">
                    {/* Form fields... no individual animation needed here */}
                    <div className="w-full">
                        <label className="block text-sm font-normal mb-1 text-gray-300">
                            Name*
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full p-2 rounded-md bg-neutral-800 text-white border border-gray-600 focus:border-red-500 focus:ring-red-500 outline-none"
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-normal mb-1 text-gray-300">
                            Email*
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full p-2 rounded-md bg-neutral-800 text-white border border-gray-600 focus:border-red-500 focus:ring-red-500 outline-none"
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-normal mb-1 text-gray-300">
                            Contact No.*
                        </label>
                        <input
                            type="tel"
                            required
                            className="w-full p-2 rounded-md bg-neutral-800 text-white border border-gray-600 focus:border-red-500 focus:ring-red-500 outline-none"
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-normal mb-1 text-gray-300">
                            Message*
                        </label>
                        <textarea
                            required
                            className="w-full p-2 rounded-md bg-neutral-800 text-white border border-gray-600 focus:border-red-500 focus:ring-red-500 outline-none h-24 resize-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-2/5 sm:w-1/3 px-4 py-2 mt-4 bg-white border border-gray-400 rounded-full font-bold text-red-600 hover:bg-gray-200 transition-all"
                    >
                        Submit
                    </button>
                </form>
            </div>

            {/* Right Section - Image with Carousel */}
            <div className="w-full md:w-1/2 bg-white flex flex-col items-center p-6 md:p-8 relative text-center">
                {/* Content... no individual animation needed here */}
                <div className="flex space-x-4 mb-4 items-center justify-center h-10">
                    {locations.map((loc, i) => (
                        <Image
                            key={i}
                            src={loc.flagUrl}
                            alt={loc.country}
                            width={40}
                            height={30}
                            className={`transition-all duration-300 cursor-pointer ${i === index ? "scale-150 border-2 border-black rounded-sm" : "scale-100 opacity-60 hover:opacity-100"}`}
                            onClick={() => setIndex(i)}
                            loading="lazy"
                        />
                    ))}
                </div>
                <div className="relative w-full max-w-[300px] aspect-video mb-4">
                    <Image
                        // Use a key to force re-render on index change for potential crossfade
                        key={currentLoc.imageUrl}
                        src={currentLoc.imageUrl}
                        alt={`${currentLoc.country} Office Location`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg border border-gray-300"
                        loading="lazy"
                    />
                    <button
                        type="button"
                        aria-label="Previous Location"
                        className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-1 rounded-full hover:bg-black/50 transition"
                        onClick={handlePrev}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        type="button"
                        aria-label="Next Location"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-1 rounded-full hover:bg-black/50 transition"
                        onClick={handleNext}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-red-600 mt-2">
                    {currentLoc.name}
                </h3>
                {currentLoc.title && (
                    <p className="text-sm md:text-base text-gray-700">{currentLoc.title}</p>
                )}
                <p className="text-sm md:text-base text-gray-600 mt-1 max-w-xs mx-auto">
                    {currentLoc.address}
                </p>
                <p className="text-sm md:text-base font-semibold mt-2">
                    {currentLoc.phone}
                </p>
                <a
                    href={`mailto:${currentLoc.email}`}
                    className="text-sm md:text-base text-blue-600 hover:underline"
                >
                    {currentLoc.email}
                </a>
            </div>
        </motion.div>
    );
}

// --- TestimonialCard --- (No changes needed, animated by carousel)
const TestimonialCard = ({
    name,
    roles,
    content,
    imageUrl = "/profile-placeholder.png",
}: {
    name: string;
    roles: string;
    content: string;
    imageUrl?: string;
}) => {
    return (
        <div className="bg-[#FDF6F6]/90 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg w-full h-full flex flex-col">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                        src={imageUrl}
                        alt={`${name}'s profile picture`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                        loading="lazy"
                    />
                </div>
                <div className="overflow-hidden">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 truncate">
                        {name}
                    </h3>
                    <p className="text-base md:text-lg text-gray-600 truncate">{roles}</p>
                </div>
            </div>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed flex-grow">
                {content}
            </p>
        </div>
    );
};

// --- Testimonials ---
const Testimonials = () => {
    const testimonialData = [
        {
            name: "Alice Martin",
            roles: "Project Manager, Innovate Ltd.",
            content:
                "The custom software solution streamlined our workflow significantly. The team was responsive and delivered exactly what we needed. A pleasure to work with!",
            imageUrl: "/profile-placeholder-1.png",
        },
        {
            name: "John Doe",
            roles: "CEO of TechCorp",
            content:
                "Exceptional service and technical expertise. They helped us migrate to the cloud seamlessly, reducing costs and improving performance.",
            imageUrl: "/profile-placeholder-2.png",
        },
        {
            name: "Sarah Chen",
            roles: "Marketing Director, Creative Solutions",
            content:
                "Their IT consulting provided invaluable insights for our digital transformation strategy. Highly knowledgeable and professional.",
            imageUrl: "/profile-placeholder-3.png",
        },
        {
            name: "Mike Roberts",
            roles: "Startup Founder",
            content:
                "From development to ongoing support, VR Tech Info has been a reliable partner. Their dedication is evident in the quality of their work.",
            imageUrl: "/profile-placeholder-4.png",
        },
    ];

    return (
        // Section container
        <section className="bg-[url(/reviewsbackground.png)] min-h-[800px] md:min-h-[900px] w-full bg-cover bg-center overflow-hidden py-16 md:py-24">
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="mb-10 md:mb-16"
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-black">
                    Hear From Our Customers
                </h1>
            </motion.div>
            {/* Carousel handles its own card animations */}
            <div className="relative">
                <CardCarousel>
                    {testimonialData.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </CardCarousel>
            </div>
        </section>
    );
};

// --- CardCarousel --- (No changes needed for section animation)
const getPosition = (
    index: number,
    currentIndex: number,
    total: number,
    isMobile: boolean,
) => {
    const pos = (index - currentIndex + total) % total;
    const baseScale = 0.8;
    const xOffset = isMobile ? 150 : 250;

    if (pos === 0) return { scale: 1, x: 0, zIndex: 10, opacity: 1 };
    if (pos === 1)
        return { scale: baseScale, x: xOffset, zIndex: 5, opacity: 0.5 };
    if (pos === total - 1)
        return { scale: baseScale, x: -xOffset, zIndex: 5, opacity: 0.5 };
    if (pos === 2)
        return { scale: baseScale - 0.1, x: xOffset * 1.5, zIndex: 1, opacity: 0 };
    if (pos === total - 2)
        return { scale: baseScale - 0.1, x: -xOffset * 1.5, zIndex: 1, opacity: 0 };

    return { scale: 0.7, x: 0, zIndex: 1, opacity: 0 };
};

const CardCarousel = ({ children }: { children: React.ReactNode }) => {
    const total = React.Children.count(children);
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const nextCard = () => setIndex((prev) => (prev + 1) % total);
    const prevCard = () => setIndex((prev) => (prev - 1 + total) % total);

    return (
        <div className="relative flex flex-col items-center justify-center h-[500px] md:h-[550px]">
            <div className="relative w-[300px] h-[400px] sm:w-[350px] sm:h-[450px] md:w-[400px] md:h-[480px]">
                {React.Children.map(children, (child, i) => {
                    const { scale, x, zIndex, opacity } = getPosition(
                        i,
                        index,
                        total,
                        isMobile,
                    );
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ scale, x, zIndex, opacity }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="absolute w-full h-full flex items-center justify-center top-0 left-0"
                        >
                            <div className="w-full h-full">{child}</div>
                        </motion.div>
                    );
                })}
            </div>
            <button
                type="button"
                aria-label="Previous Testimonial"
                onClick={prevCard}
                className="absolute left-2 sm:left-4 md:left-[-100px] lg:left-[-150px] xl:left-[-200px] top-1/2 transform -translate-y-1/2 bg-white/30 p-2 md:p-3 rounded-full hover:bg-white/50 transition z-20 text-gray-800"
            >
                {/* FIX: Use className for responsive size */}
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button
                type="button"
                aria-label="Next Testimonial"
                onClick={nextCard}
                className="absolute right-2 sm:right-4 md:right-[-100px] lg:right-[-150px] xl:right-[-200px] top-1/2 transform -translate-y-1/2 bg-white/30 p-2 md:p-3 rounded-full hover:bg-white/50 transition z-20 text-gray-800"
            >
                {/* FIX: Use className for responsive size */}
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
        </div>
    );
};

// --- Footer ---
function Footer() {
    return (
        // Apply animation to the entire footer element
        <motion.footer
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Trigger when footer starts entering view
            className="bg-black text-white py-12 md:py-16 px-4 sm:px-8 md:px-12 lg:px-24"
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-16">
                    {/* Logo Section */}
                    <div className="lg:w-1/4 mb-8 lg:mb-0 text-center lg:text-left">
                        <Image
                            src="/vr-logo.png"
                            alt="VR Tech Info Logo"
                            className="w-16 md:w-20 mx-auto lg:mx-0 mb-4"
                            width={80} // Provide explicit width/height
                            height={80}
                            loading="lazy"
                        />
                        <h2 className="text-lg md:text-xl font-semibold mb-2">
                            VR Tech Info Inc.
                        </h2>
                        <p className="text-sm text-gray-400">
                            Bringing your business to the international spotlight
                        </p>
                    </div>

                    {/* Links Sections */}
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm md:text-base">
                        {/* Column content... no individual animation needed */}
                        <div>
                            <h3 className="font-bold mb-4 uppercase tracking-wider text-gray-400 text-xs md:text-sm">
                                Company
                            </h3>
                            <ul className="text-gray-300 space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="/careers" className="hover:text-white">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        {"FAQ's"}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4 uppercase tracking-wider text-gray-400 text-xs md:text-sm">
                                Quick Links
                            </h3>
                            <ul className="text-gray-300 space-y-2">
                                <li>
                                    <a href="/services" className="hover:text-white">
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a href="/about" className="hover:text-white">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="hover:text-white">
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4 uppercase tracking-wider text-gray-400 text-xs md:text-sm">
                                Legal
                            </h3>
                            <ul className="text-gray-300 space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Cookies Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Data Processing
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4 uppercase tracking-wider text-gray-400 text-xs md:text-sm">
                                Contact Us
                            </h3>
                            <ul className="text-gray-300 space-y-2 break-words">
                                <li>CANADA: +1-647-447-5856</li>
                                <li>INDIA: +91-9052955755</li>
                                <li>USA: +1-618-971-7471</li>
                                <li>Mail: info@vrtechinfolinc.com</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Copyright & Social */}
                <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
                        © {new Date().getFullYear()} VR Tech Info Inc. All rights reserved.
                    </p>
                    <div className="flex space-x-5">
                        <a href="#" aria-label="Instagram">
                            <Image
                                src="/instagram-icon.png"
                                alt="Instagram"
                                className="w-5 h-5 md:w-6 md:h-6 hover:opacity-80 transition"
                                width={24}
                                height={24}
                                loading="lazy"
                            />
                        </a>
                        <a href="#" aria-label="Facebook">
                            <Image
                                src="/facebook-icon.png"
                                alt="Facebook"
                                className="w-5 h-5 md:w-6 md:h-6 hover:opacity-80 transition"
                                width={24}
                                height={24}
                                loading="lazy"
                            />
                        </a>
                        <a href="#" aria-label="YouTube">
                            <Image
                                src="/youtube-icon.png"
                                alt="YouTube"
                                className="w-5 h-5 md:w-6 md:h-6 hover:opacity-80 transition"
                                width={24}
                                height={24}
                                loading="lazy"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}