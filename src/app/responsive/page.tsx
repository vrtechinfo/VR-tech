"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";

export default function Home() {
    return (
        <div className="h-full w-full">
            <Header />
            <Hero />
            <Features />
            <Services />
            <div className="relative">
                <WhyChooseUs />
                <div className="absolute left-1/2 transform -translate-x-1/2 w-full px-4 md:w-3/4 lg:w-1/2">
                    <ContactForm />
                </div>
                <Testimonials />
            </div>
            <Footer />
        </div>
    );
}

function Header() {
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const serviceOptions = [
        "Software Development",
        "IT Consulting",
        "Cloud Solutions"
    ];

    const dropdownVariants = {
        hidden: { opacity: 0, y: -20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }
    };

    return (
        <div className="bg-black/90 text-white px-4 md:px-20 flex flex-col md:flex-row items-center justify-between fixed top-0 left-0 right-0 z-50">
            <div className="flex justify-between w-full md:w-auto items-center">
                <div className="pl-2 md:pl-10">
                    <Image
                        src="/vr-logo.png"
                        width={146}
                        height={146}
                        alt="vr tech info logo"
                        className="w-20 md:w-36"
                    />
                </div>
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <Menu size={24} />
                </button>
            </div>

            <nav className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto`}>
                <ul className="flex flex-col md:flex-row md:w-auto space-y-4 md:space-y-0 md:space-x-8 py-4 md:py-0">
                    <li className="hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2">
                        <Link href="/">About Us</Link>
                    </li>
                    <li
                        className="relative"
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                    >
                        <div className="hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2 cursor-pointer">
                            Services
                        </div>
                        <AnimatePresence>
                            {isServicesOpen && (
                                <motion.div
                                    variants={dropdownVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="absolute top-full left-0 mt-2 w-64 bg-black/95 rounded-lg overflow-hidden"
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
                                                href={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                                                className="block px-6 py-3 text-lg hover:bg-red-800/20 transition-colors duration-200"
                                            >
                                                {service}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                    <li className="hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2">
                        <Link href="/">Careers</Link>
                    </li>
                </ul>

                <div className="md:ml-8 mb-4 md:mb-0">
                    <Link
                        href=""
                        className="block text-center border-2 border-red-800 rounded-3xl hover:bg-red-800 px-5 py-1 transition-colors duration-300"
                    >
                        Contact Us
                    </Link>
                </div>
            </nav>
        </div>
    );
}


function Hero() {
    const words = ["Innovate!", "Adapt!", "Thrive!"];
    const [currentWord, setCurrentWord] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const dropAnimation = {
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
        <div className="bg-black text-white pt-32 md:pt-80 pb-15 md:pb-30 px-4 overflow-hidden">
            <div className="flex justify-center pt-15 md:pt-30 pb-5 md:pb-10 h-[120px] md:h-[180px]">
                <h1 className="text-4xl md:text-8xl font-bold flex items-center">
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
                            <span className="text-red-800">{words[currentWord].charAt(0)}</span>
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
                <p className="text-xl md:text-3xl">
                    – All Under One Roof.
                </p>
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
                        backgroundColor: "#9B2C2C",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="border-1 border-red-800 rounded-xl bg-red-800 px-5 py-1 shadow-inner cursor-pointer w-full md:w-auto text-center"
                >
                    <Link href="/">Learn more</Link>
                </motion.div>
                <motion.div
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="border-1 border-white rounded-xl px-5 py-1 shadow-inner text-gray-200 cursor-pointer w-full md:w-auto text-center"
                >
                    <Link href="/">Our Services</Link>
                </motion.div>
            </motion.div>
        </div>
    );
}

function Features() {
    return (
        <div className="bg-[url(/features-bg.png)] min-h-[500px] md:h-[691px] w-full bg-cover bg-center text-white px-4">
            <div className="flex justify-center">
                <h1 className="text-4xl md:text-[66px] text-[#E2E2E2] pt-8 md:pt-11 font-normal">
                    Features
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-40 pt-10 md:pt-25 px-4 md:px-20">
                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <Image src="/Award.png" width={59} height={59} alt="" />
                    </div>
                    <h1 className="text-2xl md:text-3xl text-center pt-5">Qualified Team</h1>
                    <div className="text-base md:text-[20px] font-light text-center pt-5 md:pt-10">
                        <p>Expert designers and developers with</p>
                        <p>experience in top brand websites and</p>
                        <p>apps.</p>
                    </div>
                </div>

                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <Image src="/Award.png" width={59} height={59} alt="" />
                    </div>
                    <h1 className="text-2xl md:text-3xl text-center pt-5">Smart Solutions</h1>
                    <div className="text-base md:text-[20px] font-light text-center pt-5 md:pt-10">
                        <p>We're a leading website design and</p>
                        <p>development agency, providing expert</p>
                        <p>solutions with personalized projects.</p>
                    </div>
                </div>

                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <Image src="/Award.png" width={59} height={59} alt="" />
                    </div>
                    <h1 className="text-2xl md:text-3xl text-center pt-5">Dedicated Support</h1>
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


function Services() {
    return (
        <div className="text-base md:text-[20px] px-4 md:px-8">
            <h1 className="text-center pt-15 md:pt-30 pb-10 md:pb-20 text-4xl md:text-6xl font-semibold 
          [text-shadow:_2px_2px_4px_rgba(0,0,0,0.4)]">
                Our Services
            </h1>
            <div className="pt-5 md:pt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Software Development */}
                    <div className="text-center border-b md:border-r p-6 md:p-10">
                        <Image
                            src="/computer.png"
                            width={253}
                            height={213}
                            alt="Software Development"
                            className="mx-auto w-full max-w-[250px]"
                        />
                        <div className="mt-4 space-y-2">
                            <h1 className="text-[#0F3775] text-2xl md:text-3xl font-semibold">
                                Software Development
                            </h1>
                            <p>End-to-end custom software</p>
                            <p>solutions for businesses, including</p>
                            <p>web and mobile app development</p>
                        </div>
                    </div>

                    {/* IT Consulting */}
                    <div className="text-center border-b md:border-r p-6 md:p-10">
                        <Image
                            src="/it-consulting.png"
                            width={266}
                            height={210}
                            alt="IT Consulting"
                            className="mx-auto w-full max-w-[250px]"
                        />
                        <div className="mt-4 space-y-2">
                            <h1 className="text-[#0F3775] text-2xl md:text-3xl font-semibold">
                                IT Consulting
                            </h1>
                            <p>Expert guidance on digital</p>
                            <p>transformation, cloud solutions,</p>
                            <p>and IT infrastructure.</p>
                        </div>
                    </div>

                    {/* Training & Development */}
                    <div className="text-center border-b lg:border-b-0 p-6 md:p-10">
                        <Image
                            src="/training.png"
                            width={309}
                            height={214}
                            alt="Training & Development"
                            className="mx-auto w-full max-w-[250px]"
                        />
                        <div className="mt-4 space-y-2">
                            <h1 className="text-[#0F3775] text-2xl md:text-3xl font-semibold">
                                Training & Development
                            </h1>
                            <p>Professional courses in software</p>
                            <p>development, cloud computing,</p>
                            <p>and DevOps.</p>
                        </div>
                    </div>

                    {/* Support & Maintenance */}
                    <div className="text-center border-b md:border-b-0 md:border-r p-6 md:p-10">
                        <Image
                            src="/support.png"
                            width={281}
                            height={213}
                            alt="Support & Maintenance"
                            className="mx-auto w-full max-w-[250px]"
                        />
                        <div className="mt-4 space-y-2">
                            <h1 className="text-[#0F3775] text-2xl md:text-3xl font-semibold">
                                Support & Maintenance
                            </h1>
                            <p>24/7 technical support and system</p>
                            <p>maintenance to ensure seamless</p>
                            <p>operations.</p>
                        </div>
                    </div>

                    {/* Data Analytics */}
                    <div className="text-center border-b md:border-b-0 md:border-r p-6 md:p-10">
                        <Image
                            src="/analytics.png"
                            width={308}
                            height={218}
                            alt="Data Analytics"
                            className="mx-auto w-full max-w-[250px]"
                        />
                        <div className="mt-4 space-y-2">
                            <h1 className="text-[#0F3775] text-2xl md:text-3xl font-semibold">
                                Data Analytics
                            </h1>
                            <p>Advanced data solutions to help</p>
                            <p>businesses make data-driven</p>
                            <p>decisions.</p>
                        </div>
                    </div>

                    {/* CyberSecurity Solutions */}
                    <div className="text-center p-6 md:p-10">
                        <Image
                            src="/cybersecurity.png"
                            width={320}
                            height={190}
                            alt="CyberSecurity Solutions"
                            className="mx-auto w-full max-w-[250px]"
                        />
                        <div className="mt-4 space-y-2">
                            <h1 className="text-[#0F3775] text-2xl md:text-3xl font-semibold">
                                CyberSecurity Solutions
                            </h1>
                            <p>Robust security strategies to</p>
                            <p>protect businesses from digital</p>
                            <p>threats.</p>
                        </div>
                    </div>
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
function WhyChooseUs() {
    const features = [
        {
            text: "Expert Trainers with Industry Experience",
            className: "md:ml-0"
        },
        {
            text: "Hands-On Projects and Real-World Scenarios",
            className: "md:ml-20"
        },
        {
            text: "Access to Cutting-Edge Tools and Technologies",
            className: "md:ml-40"
        },
        {
            text: "Certification on Course Completion",
            className: "md:ml-50"
        },
        {
            text: "Flexible Schedules for Working Professionals",
            className: "md:ml-40"
        },
        {
            text: "24/7 Student Support",
            className: "md:ml-20"
        },
        {
            text: "Innovation and creativity are our secrets to web designing and development success",
            className: "md:ml-0"
        }
    ];

    return (
        <div className="bg-[url(/chooseus.png)] min-h-screen w-full bg-cover bg-center text-white px-4">
            <h1 className="font-bold text-4xl md:text-[66px] pl-4 md:pl-30 pt-10 md:pt-20 tracking-wide">
                Why Choose Us?
            </h1>

            <div className="flex justify-center pt-10 md:pt-5">
                <div className="w-full md:w-1/2 md:ml-[600px]">
                    <div className="text-xl md:text-2xl font-light space-y-8 md:space-y-20">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-4 md:gap-10 transition-all duration-300 ${feature.className}`}
                            >
                                <ChooseIcon />
                                <div className="flex-1">{feature.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}



function ContactForm() {
    const [index, setIndex] = useState(0);
    const locations = [
        {
            country: "India",
            name: "Gowtham Porla",
            title: "",
            address: "Plot No: 144, Flat No: 302, OM Shakthi Towers, SR Nagar, Hyderabad-18, Telangana State, India",
            phone: "+91-9052955755",
            email: "Info@Vrtechinfoinc.Com",
            imageUrl: "/map-placeholder.png",
        },
        {
            country: "Canada",
            name: "Vivek Reddy",
            title: "Founder and CEO",
            address: "33 candlebrook Crescent, Scarborough, Ontario, Canada- M1W 4B3.",
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

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? locations.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex === locations.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="w-full max-w-[1500px] mx-auto px-4 py-10 md:py-20">
            <div className="flex flex-col md:flex-row shadow-2xl border border-gray-400 rounded-xl overflow-hidden">
                {/* Left Section - Form */}
                <div className="w-full md:w-1/2 bg-neutral-900 text-white p-6 md:p-8">
                    <h1 className="text-3xl md:text-[40px] mb-6 text-center">Reach out to us!</h1>
                    <form className="space-y-6">
                        <div className="w-full md:w-4/5 mx-auto">
                            <label className="block text-sm font-normal mb-1">Name*</label>
                            <input
                                type="text"
                                required
                                className="w-full p-2 rounded-md bg-transparent text-white border border-gray-400"
                            />
                        </div>

                        <div className="w-full md:w-4/5 mx-auto">
                            <label className="block text-sm font-normal mb-1">Email*</label>
                            <input
                                type="email"
                                required
                                className="w-full p-2 rounded-md bg-transparent text-white border border-gray-400"
                            />
                        </div>

                        <div className="w-full md:w-4/5 mx-auto">
                            <label className="block text-sm font-normal mb-1">Contact No.*</label>
                            <input
                                type="tel"
                                required
                                className="w-full p-2 rounded-md bg-transparent text-white border border-gray-400"
                            />
                        </div>

                        <div className="w-full md:w-4/5 mx-auto">
                            <label className="block text-sm font-normal mb-1">Message*</label>
                            <textarea
                                required
                                className="w-full p-2 rounded-md bg-transparent text-white border border-gray-400 h-24"
                            />
                        </div>

                        <div className="flex justify-center">
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
                <div className="w-full md:w-1/2 bg-white p-6 md:p-8 relative">
                    {/* Country Icons */}
                    <div className="flex justify-center space-x-6 mb-8">
                        {locations.map((loc, i) => (
                            <img
                                key={i}
                                src={`/${loc.country.toLowerCase()}.png`}
                                alt={loc.country}
                                className={`w-12 h-8 cursor-pointer transition-all duration-300 ${i === index
                                    ? "border-2 border-black scale-125 rounded-lg"
                                    : "opacity-50 hover:opacity-75"
                                    }`}
                                onClick={() => setIndex(i)}
                            />
                        ))}
                    </div>

                    {/* Location Content */}
                    <div className="flex flex-col items-center">
                        <img
                            src={locations[index].imageUrl}
                            alt="Office Location"
                            className="w-60 h-40 rounded-lg border border-gray-300 object-cover mb-6"
                        />

                        <h2 className="text-xl font-bold text-red-600 mb-2">
                            {locations[index].name}
                        </h2>
                        {locations[index].title && (
                            <p className="text-gray-600 mb-2">{locations[index].title}</p>
                        )}
                        <p className="text-gray-600 text-center mb-2 max-w-sm">
                            {locations[index].address}
                        </p>
                        <p className="font-semibold mb-2">{locations[index].phone}</p>
                        <p className="text-blue-600 underline">{locations[index].email}</p>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
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
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
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

            {/* Bottom Line */}
            <div className="relative w-full mt-20">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-[900px] max-w-full">
                    <div className="h-[5px] bg-black"></div>
                </div>
            </div>
        </div>
    );
}
function Testimonials() {
    return (
        <div className="bg-[url(/reviewsbackground.png)] min-h-[800px] md:h-[1144px] w-full bg-cover bg-center overflow-hidden">
            <div className="pt-[400px] md:pt-[600px]">
                <div className="mb-10">
                    <h1 className="text-4xl md:text-[48px] font-bold text-center text-black">
                        Hear From Our Customers
                    </h1>
                </div>
                <div className="relative">
                    <CardCarousel>
                        <TestimonialCard
                            name="John Doe"
                            roles="CEO of TechCorp"
                            content="The team provided exceptional service, delivering our project ahead of schedule without compromising on quality. Their attention to detail and innovative solutions exceeded our expectations!"
                        />
                        <TestimonialCard
                            name="Sarah Johnson"
                            roles="CTO of InnovateTech"
                            content="Working with this team has been transformative for our business. Their expertise in cloud solutions and cybersecurity has helped us scale securely and efficiently."
                        />
                        <TestimonialCard
                            name="Michael Chen"
                            roles="Director of Operations"
                            content="The training programs are comprehensive and practical. Our team's productivity has increased significantly after completing their development courses."
                        />
                        <TestimonialCard
                            name="Emily Williams"
                            roles="Product Manager"
                            content="Their support team is incredibly responsive and knowledgeable. They've been instrumental in maintaining our systems and resolving issues promptly."
                        />
                    </CardCarousel>
                </div>
            </div>
        </div>
    );
}

const TestimonialCard = ({ name, roles, content }) => {
    return (
        <div className="bg-[#FDF6F6] p-6 md:p-9 rounded-xl shadow-lg w-[300px] md:w-[450px] h-[350px] md:h-[400px] relative">
            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-6 md:mb-10">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <Image
                        src="/user-avatar.png"
                        alt="User Avatar"
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                </div>
                <div>
                    <h3 className="text-xl md:text-3xl font-bold text-gray-800">{name}</h3>
                    <p className="text-base md:text-xl text-gray-600">{roles}</p>
                </div>
            </div>

            {/* Testimonial Content */}
            <div className="relative">
                <Image
                    src="/quote-left.png"
                    alt="Quote"
                    width={40}
                    height={40}
                    className="absolute -top-4 -left-2 opacity-20"
                />
                <p className="text-lg md:text-2xl text-gray-800 leading-relaxed pl-6">
                    {content}
                </p>
            </div>
        </div>
    );
};

const CardCarousel = ({ children }) => {
    const [index, setIndex] = useState(0);
    const total = React.Children.count(children);

    const getPosition = (cardIndex, currentIndex, totalCards) => {
        const diff = (cardIndex - currentIndex + totalCards) % totalCards;
        if (diff === 0) return { scale: 1, x: 0, zIndex: 3, opacity: 1 }; // Center
        if (diff === 1) return { scale: 0.85, x: '40%', zIndex: 2, opacity: 0.7 }; // Right
        if (diff === totalCards - 1) return { scale: 0.85, x: '-40%', zIndex: 2, opacity: 0.7 }; // Left
        return { scale: 0.7, x: 0, zIndex: 1, opacity: 0 }; // Hidden
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-[500px] md:h-[600px]">
            <div className="relative w-[300px] md:w-[450px]">
                {React.Children.map(children, (child, i) => {
                    const position = getPosition(i, index, total);
                    return (
                        <motion.div
                            key={i}
                            initial={false}
                            animate={{
                                scale: position.scale,
                                x: position.x,
                                zIndex: position.zIndex,
                                opacity: position.opacity,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeInOut",
                            }}
                            className="absolute top-0 left-0 right-0 cursor-grab"
                            style={{
                                transformOrigin: "center center",
                                transform: `translateX(-50%)`,
                                left: "50%",
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset, velocity }) => {
                                if (offset.x > 50) setIndex((prev) => (prev - 1 + total) % total);
                                if (offset.x < -50) setIndex((prev) => (prev + 1) % total);
                            }}
                        >
                            {child}
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute w-full md:w-[140%] flex justify-between px-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <button
                    onClick={() => setIndex((prev) => (prev - 1 + total) % total)}
                    className="transform -translate-x-4 bg-white/20 p-3 rounded-full hover:bg-white/30 transition pointer-events-auto"
                >
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button
                    onClick={() => setIndex((prev) => (prev + 1) % total)}
                    className="transform translate-x-4 bg-white/20 p-3 rounded-full hover:bg-white/30 transition pointer-events-auto"
                >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
                {Array.from({ length: total }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? "bg-gray-800 scale-125" : "bg-gray-300 hover:bg-gray-400"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
function Footer() {
    return (
        <footer className="bg-black text-white py-8 md:py-12 px-4 md:px-24">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {/* Logo Section */}
                <div className="lg:col-span-1">
                    <Image src="/vr-logo.png" alt="VR Tech Info Logo" width={64} height={64} className="mb-4" />
                    <h2 className="text-lg font-semibold mb-2">VR Tech Info Inc.</h2>
                    <p className="text-sm text-gray-400">Bringing your business to the international spotlight</p>
                </div>

                {/* Quick Links Sections */}
                {[
                    {
                        title: "COMPANY",
                        links: ["Blog", "Careers", "FAQ's"]
                    },
                    {
                        title: "QUICK LINKS",
                        links: ["Services", "About Us", "Contact Us"]
                    },
                    {
                        title: "LEGAL",
                        links: ["Terms of Service", "Privacy Policy", "Cookies Policy", "Data Processing"]
                    },
                    {
                        title: "CONTACT US",
                        links: [
                            "CANADA: +1-647-447-5856",
                            "INDIA: +91-9052955755",
                            "USA: +1-618-971-7471",
                            "Mail: info@vrtechinfolinc.com"
                        ]
                    }
                ].map((section, index) => (
                    <div key={index}>
                        <h3 className="text-sm font-bold mb-4">{section.title}</h3>
                        <ul className="text-gray-400 space-y-2">
                            {section.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                    <a href="#" className="hover:text-white">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Copyright & Social */}
            <div className="mt-8 md:mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm order-2 md:order-1 mt-4 md:mt-0">
                    © 2025 VR Tech Info Inc. All rights reserved.
                </p>
                <div className="flex space-x-6 order-1 md:order-2">
                    {["instagram", "facebook", "youtube"].map((social) => (
                        <a key={social} href="#" className="transform hover:scale-110 transition-transform">
                            <Image src={`/${social}-icon.png`} alt={social} width={24} height={24} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

// Helper Components
function Badges({ text }: { text: string }) {
    return (
        <h1 className="text-xl md:text-3xl font-medium border-2 rounded-4xl mx-4 md:mx-10 py-2 md:py-[10px] px-4 md:px-[29px]">
            {text}
        </h1>
    );
}

function ChooseIcon() {
    return <Image src="/chooseicon.png" alt="" height={41} width={41} />;
}



const getPosition = (index, currentIndex, total) => {
    const pos = (index - currentIndex + total) % total;
    if (pos === 0) return { scale: 1, x: 0, zIndex: 10, opacity: 1 };
    if (pos === 1) return { scale: 0.85, x: 250, zIndex: 5, opacity: 0.55 };
    if (pos === total - 1) return { scale: 0.85, x: -250, zIndex: 5, opacity: 0.55 };
    return { scale: 0.7, x: 0, zIndex: 1, opacity: 0 };
};
