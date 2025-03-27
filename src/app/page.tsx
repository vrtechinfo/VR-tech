"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useState } from "react";
import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import { ChevronLeft, ChevronRight } from "lucide-react"; // Importing arrow icons

export default function Home() {
	return (
		<div className="h-full w-full">
			<Header />
			<Hero />
			<Features />
			<Services />
			<div className="relative">
				<WhyChooseUs />
				<div className="absolute left-1/2 transform -translate-x-9/11 top-240 w-full md:w-3/4 lg:w-1/2">
					<ContactForm />
				</div>
				<Testimonials />
			</div>
			<Footer />
		</div>
	);
}

function Header() {
	return (
		<div className="bg-black  text-white px-20  flex text-2xl justify-between fixed top-0 left-0 right-0 z-100 tr">
			<div className="pl-10">
				<Image
					src={"/vr-logo.png"}
					width={146}
					height={146}
					alt="vr tech info logo"
				/>
			</div>
			<ul className="flex w-1/3">
				<div className="self-center flex justify-between w-full ">
					<li className=" hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2">
						<Link href={"/"}>Home</Link>
					</li>
					<li className=" hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2">
						<Link href={"/"}>About Us</Link>
					</li>
					<li className=" hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2">
						<Link href={"/"}>Services</Link>
					</li>
					<li className=" hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2">
						<Link href={"/"}>Careers</Link>
					</li>
				</div>
			</ul>

			<div className="self-center border-2 border-red-800 rounded-3xl hover:bg-red-800 px-5 py-1 shadow-inner">
				<Link href="">Contact Us</Link>
			</div>
		</div>
	);
}

function Hero() {
	return (
		<div className="bg-black text-white pt-80 pb-30">
			<div className="flex justify-center pt-30 pb-10">
				<h1 className="text-8xl font-bold">
					<span className="text-red-800">I</span>nnovate!
				</h1>
			</div>
			<div className="font-medium">
				<div className="flex justify-center  text-3xl pb-2">
					<p className="">
						Empowering Your Business with Cutting-Edge Software, Expert{" "}
					</p>
				</div>
				<div className="flex justify-center  text-3xl pb-2">
					<p className="">
						{" "}
						IT Consulting, Comprehensive Training, and Reliable Support{" "}
					</p>
				</div>
				<div className="flex justify-center  text-3xl ">
					<p className=""> – All Under One Roof.</p>
				</div>
			</div>

			<div className="flex justify-center py-20 gap-5 ">
				<div className="border-1 border-red-800 rounded-xl bg-red-800 px-5 py-1 shadow-inner ">
					<Link href={"/"}>Learn more</Link>
				</div>
				<div className="border-1 border-white rounded-xl  px-5 py-1 shadow-inner text-gray-200">
					<Link href={"/"}>Our Services</Link>
				</div>
			</div>
		</div>
	);
}

function Features() {
	return (
		<div className="bg-[url(/features-bg.png)] h-[691px] w-full bg-cover bg-center text-white ">
			<div className="flex justify-center ">
				<h1 className="text-[66px] text-[#E2E2E2] pt-11 pl-2 font-normal self-center">
					Features
				</h1>
			</div>

			<div className="flex justify-center gap-40 pt-25">
				<div className="">
					<div className="flex items-center justify-center">
						<Image src={"/Award.png"} width={59} height={59} alt="" />
					</div>
					<h1 className="text-3xl text-center pt-5">Qualified Team</h1>
					<div className="text-[20px] font-light  text-center pt-10">
						<p>Expert designers and developers with </p>
						<p>experience in top brand websites and</p>
						<p>apps.</p>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-center">
						<Image src={"/Award.png"} width={59} height={59} alt="" />
					</div>
					<h1 className="text-3xl text-center pt-5">Smart Solutions</h1>
					<div className="text-[20px] font-light text-center pt-10">
						<p>We’re a leading website design and </p>
						<p> development agency, providing expert</p>
						<p>solutions with personalized projects.</p>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-center">
						<Image src={"/Award.png"} width={59} height={59} alt="" />
					</div>
					<h1 className="text-3xl text-center pt-5">Dedicated support</h1>
					<div className="text-[20px] font-light text-center pt-10">
						<p>We provide timely support via emails,</p>
						<p> calls, and in-person visits, going the </p>
						<p>extra mile to meet your needs.</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function Services() {
	return (
		<div className="text-[20px]">
			<h1
				className="text-center pt-30 pb-20 text-6xl font-semibold 
          [text-shadow:_2px_2px_4px_rgba(0,0,0,0.4)]"
			>
				Our Services
			</h1>
			<div className="pt-10 flex justify-center">
				<div className="grid grid-cols-3">
					{/* First Row */}
					<div className="text-center border-r border-b p-10">
						<Image
							src="/computer.png"
							width={253}
							height={213}
							alt="Software Development"
							className="mx-auto"
						/>
						<div className="mt-4 space-y-2">
							<h1 className="text-[#0F3775] text-3xl font-semibold">
								Software Development
							</h1>
							<p>End-to-end custom software</p>
							<p>solutions for businesses, including</p>
							<p>web and mobile app development</p>
						</div>
					</div>
					<div className="text-center border-r border-b p-10">
						<Image
							src="/it-consulting.png"
							width={266}
							height={210}
							alt="IT Consulting"
							className="mx-auto"
						/>
						<div className="mt-4 space-y-2">
							<h1 className="text-[#0F3775] text-3xl font-semibold">
								IT Consulting
							</h1>
							<p>Expert guidance on digital</p>
							<p>transformation, cloud solutions,</p>
							<p>and IT infrastructure.</p>
						</div>
					</div>
					<div className="text-center border-b p-10">
						<Image
							src="/training.png"
							width={309}
							height={214}
							alt="Training & Development"
							className="mx-auto"
						/>
						<div className="mt-4 space-y-2">
							<h1 className="text-[#0F3775] text-3xl font-semibold">
								Training & Development
							</h1>
							<p>Professional courses in software</p>
							<p>development, cloud computing,</p>
							<p>and DevOps.</p>
						</div>
					</div>
					{/* Second Row */}
					<div className="text-center border-r p-10">
						<Image
							src="/support.png"
							width={281}
							height={213}
							alt="Support & Maintenance"
							className="mx-auto"
						/>
						<div className="mt-4 space-y-2">
							<h1 className="text-[#0F3775] text-3xl font-semibold">
								Support & Maintenance
							</h1>
							<p>24/7 technical support and system</p>
							<p>maintenance to ensure seamless</p>
							<p>operations.</p>
						</div>
					</div>
					<div className="text-center border-r p-10">
						<Image
							src="/analytics.png"
							width={308}
							height={218}
							alt="Data Analytics"
							className="mx-auto"
						/>
						<div className="mt-4 space-y-2">
							<h1 className="text-[#0F3775] text-3xl font-semibold">
								Data Analytics
							</h1>
							<p>Advanced data solutions to help</p>
							<p>businesses make data-driven</p>
							<p>decisions.</p>
						</div>
					</div>
					<div className="p-10">
						<div className="flex flex-col items-center justify-center text-center min-h-[350px]">
							<Image
								src="/cybersecurity.png"
								width={320}
								height={190}
								alt="CyberSecurity Solutions"
								className="mx-auto"
							/>
							<div className="mt-4 space-y-2">
								<h1 className="text-[#0F3775] text-3xl font-semibold">
									CyberSecurity Solutions
								</h1>
								<p>Robust security strategies to</p>
								<p>protect businesses from digital</p>
								<p>threats.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="my-20">
				<Marquee autoFill>
					<Badges text="Website Development" />
					<Badges text="Mobile Application Development" />
				</Marquee>
			</div>
		</div>
	);
}

function Badges({ text }: Readonly<{ text: string }>) {
	return (
		<h1 className="text-3xl font-medium border-2 rounded-4xl mx-10 py-[10px] px-[29px]">
			{text}
		</h1>
	);
}

function WhyChooseUs() {
	return (
		<div className="bg-[url(/chooseus.png)] h-[1288] w-full bg-cover bg-center text-white">
			<h1 className="font-bold text-[66px] pl-30 pt-20 tracking-wide">
				Why Choose Us?
			</h1>
			<div className="flex justify-center pt-5 ml-[600px]">
				<div className="text-2xl font-light">
					<div className="flex items-center gap-10">
						<ChooseIcon />
						<div>Expert Trainers with Industry Experience</div>
					</div>
					<div className="flex items-center pl-20 pt-20 gap-10">
						<ChooseIcon />
						<div>Hands-On Projects and Real-World Scenarios</div>
					</div>
					<div className="flex items-center pl-40 pt-20 gap-10">
						<ChooseIcon />
						<div>Access to Cutting-Edge Tools and Technologies</div>
					</div>
					<div className="flex items-center pl-50 pt-20 gap-10">
						<ChooseIcon />
						<div>Certification on Course Completion</div>
					</div>
					<div className="flex items-center pl-40 pt-20 gap-10">
						<ChooseIcon />
						<div>Flexible Schedules for Working Professionals</div>
					</div>
					<div className="flex items-center pl-20 pt-20 gap-10">
						<ChooseIcon />
						<div>24/7 Student Support</div>
					</div>
					<div className="flex items-center pt-20 gap-10">
						<ChooseIcon />
						<div>
							Innovation and creativity are our secrets to web designing and
							<br />
							development success
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function ChooseIcon() {
	return <Image src={"/chooseicon.png"} alt="" height={41} width={41} />;
}

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

	return (
		<>
			<div className="w-[1500px] flex justify-center items-center min-h-screen">
				<div className="flex w-2/3 shadow-2xl border-1 border-gray-400 rounded-xl overflow-hidden">
					{/* Left Section - Form */}
					<div className="w-1/2 bg-neutral-900 text-white p-6 flex flex-col items-center shadow-2xl">
						<h1 className="text-[40px] mb-4 text-center">Reach out to us!</h1>
						<form className="space-y-4 flex flex-col items-center w-full">
							<div className="w-4/5">
								<label className="block text-sm font-normal mb-1">Name*</label>
								<input
									type="text"
									required
									className="w-full p-2 rounded-md text-white border border-gray-400"
								/>
							</div>

							<div className="w-4/5">
								<label className="block text-sm font-normal mb-1">Email*</label>
								<input
									type="email"
									required
									className="w-full p-2 rounded-md text-white border border-gray-400"
								/>
							</div>

							<div className="w-4/5">
								<label className="block text-sm font-normal mb-1">
									Contact No.*
								</label>
								<input
									type="tel"
									required
									className="w-full p-2 rounded-md text-white border border-gray-400"
								/>
							</div>

							<div className="w-4/5">
								<label className="block text-sm font-normal mb-1">
									Message*
								</label>
								<textarea
									required
									className="w-full p-2 rounded-md text-white border border-gray-400 h-24"
								/>
							</div>

							<button
								type="submit"
								className="w-1/5 px-4 py-1 mt-2 bg-white border border-gray-400 rounded-full font-bold text-[#EC6B6B] hover:bg-gray-200 transition-all mx-auto"
							>
								Submit
							</button>
						</form>
					</div>

					{/* Right Section - Image with Carousel */}
					<div className="w-1/2 bg-white flex flex-col items-center p-6 relative">
						{/* Country Icons */}
						<div
							className="flex ml-30 space-x-4 mb-4 transition-transform duration-300"
							style={{ transform: `translateX(-${index * 60}px)` }}
						>
							{locations.map((loc, i) => (
								<img
									key={i}
									src={`/${loc.country.toLowerCase()}.png`}
									alt={loc.country}
									className={`w-10 h-8 transition-all duration-500 ${i === index ? "border-2 border-black scale-150 rounded-full" : "border-transparent scale-100"}`}
								/>
							))}
						</div>

						{/* Office Image */}
						<img
							src={locations[index].imageUrl}
							alt="Office Location"
							className="w-60 h-40 rounded-lg border border-gray-300"
						/>

						{/* Left Carousel Button */}
						<img
							src="/left-arrow.png"
							alt="Previous"
							className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
							onClick={handlePrev}
						/>

						{/* Right Carousel Button */}
						<img
							src="/right-arrow.png"
							alt="Next"
							className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
							onClick={handleNext}
						/>

						{/* Name and Details */}
						<h2 className="text-lg font-bold text-red-600 mt-2">
							{locations[index].name}
						</h2>
						<p className="text-sm">{locations[index].title}</p>
						<p className="text-sm text-gray-600">{locations[index].address}</p>
						<p className="text-sm font-semibold">{locations[index].phone}</p>
						<p className="text-sm text-blue-600 underline">
							{locations[index].email}
						</p>
					</div>
				</div>
			</div>
			{/* Line added below the form */}
			<div className="relative w-full">
				<div className="absolute left-[300px] w-[900px] -mt-35">
					<div className="h-[5px] bg-black"></div>
				</div>
			</div>
		</>
	);
}

const TestimonialCard = ({ name, roles, content }) => {
	return (
		<div className="bg-[#FDF6F6] p-9 rounded-xl shadow-lg w-[450px] h-[400px] relative">
			{/* Profile Section */}
			<div className="flex items-center gap-4 mb-10">
				{/* Profile Image */}
				<div className="w-24 h-24 bg-gray-200 rounded-full"></div>
				{/* Name and Role */}
				<div>
					<h3 className="text-3xl font-bold text-gray-800">{name}</h3>
					<p className="text-xl text-gray-600">{roles}</p>
				</div>
			</div>
			{/* Testimonial Content */}
			<p className="text-gray-800 text-2xl leading-relaxed">{content}</p>
		</div>
	);
};

const Testimonials = () => {
	return (
		<div className="bg-[url(/reviewsbackground.png)] h-[1144px] w-full bg-cover bg-center overflow-x-hidden">
			<div className="pt-[600px] overflow-hidden">
				<div className="mb-10">
					<h1 className="text-[48px] font-bold text-center text-black">
						Hear From Our Customers
					</h1>
				</div>
				<div className="-m-60 relative overflow-x-hidden">
					<CardCarousel>
						<TestimonialCard
							name="John Doe"
							roles="CEO of TechCorp"
							content="The team provided exceptional service, delivering our project ahead of schedule without compromising on quality. Highly recommended!"
						/>
						<TestimonialCard
							name="John Doe"
							roles="CEO of TechCorp"
							content="The team provided exceptional service, delivering our project ahead of schedule without compromising on quality. Highly recommended!"
						/>
						<TestimonialCard
							name="John Doe"
							roles="CEO of TechCorp"
							content="The team provided exceptional service, delivering our project ahead of schedule without compromising on quality. Highly recommended!"
						/>
						<TestimonialCard
							name="John Doe"
							roles="CEO of TechCorp"
							content="The team provided exceptional service, delivering our project ahead of schedule without compromising on quality. Highly recommended!"
						/>
					</CardCarousel>
				</div>
			</div>
		</div>
	);
};

const getPosition = (index, currentIndex, total) => {
	const pos = (index - currentIndex + total) % total;
	if (pos === 0) return { scale: 1, x: 0, zIndex: 10, opacity: 1 }; // Center
	if (pos === 1) return { scale: 0.85, x: 250, zIndex: 5, opacity: 0.55 }; // Right
	if (pos === total - 1)
		return { scale: 0.85, x: -250, zIndex: 5, opacity: 0.55 }; // Left
	return { scale: 0.7, x: 0, zIndex: 1, opacity: 0 }; // Hide others
};

const CardCarousel = ({ children }) => {
	const total = React.Children.count(children);
	const [index, setIndex] = useState(0);

	const nextCard = () => setIndex((prev) => (prev + 1) % total);
	const prevCard = () => setIndex((prev) => (prev - 1 + total) % total);

	return (
		<div className="relative flex flex-col items-center justify-center h-screen">
			<div className="relative w-[450px] h-[500px]">
				{React.Children.map(children, (child, i) => {
					const { scale, x, zIndex, opacity } = getPosition(i, index, total);
					return (
						<motion.div
							key={i}
							initial={{ opacity: 0 }}
							animate={{ scale, x, zIndex, opacity }}
							transition={{ duration: 0.5 }}
							className="absolute w-full  flex items-center justify-center bg-transparent backdrop-blur-lg rounded-xl shadow-lg  "
						>
							{child}
						</motion.div>
					);
				})}

				{/* Updated button positions */}
				<button
				   type="button"
					onClick={prevCard}
					className="absolute left-[-300px] top-1/2 transform -translate-y-1/2 bg-white/20 p-3 rounded-full hover:bg-white/30 transition z-50"
				>
					<ChevronLeft size={30} />
				</button>

				<button
					type="button"
					onClick={nextCard}
					className="absolute right-[-300px] top-1/2 transform -translate-y-1/2 bg-white/20 p-3 rounded-full hover:bg-white/30 transition z-50"
				>
					<ChevronRight size={30} />
				</button>
			</div>
		</div>
	);
};

function Footer() {
	return (
		<footer className="bg-black text-white py-12 px-8 md:px-24">
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
				{/* Logo Section - Reduced width */}
				<div className="md:w-1/5 mb-8 md:mb-0">
					<img
						src="/vr-logo.png"
						alt="VR Tech Info Logo"
						className="w-16 mb-4"
					/>
					<h2 className="text-lg font-semibold mb-2">VR Tech Info Inc.</h2>
					<p className="text-sm text-gray-400">
						Bringing your business to the international spotlight
					</p>
				</div>

				{/* Right-aligned Columns with Increased Margin */}
				<div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 md:ml-24">
					{/* Company */}
					<div>
						<h3 className="text-sm font-bold mb-4">COMPANY</h3>
						<ul className="text-gray-400 space-y-2">
							<li>
								<a href="#" className="hover:text-white">
									Blog
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white">
									Careers
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white">
									FAQ's
								</a>
							</li>
						</ul>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-sm font-bold mb-4">QUICK LINKS</h3>
						<ul className="text-gray-400 space-y-2">
							<li>
								<a href="#" className="hover:text-white">
									Services
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white">
									About Us
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white">
									Contact Us
								</a>
							</li>
						</ul>
					</div>

					{/* Legal */}
					<div>
						<h3 className="text-sm font-bold mb-4">LEGAL</h3>
						<ul className="text-gray-400 space-y-2">
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

					{/* Contact */}
					<div>
						<h3 className="text-sm font-bold mb-4">CONTACT US</h3>
						<ul className="text-gray-400 space-y-2">
							<li>CANADA: +1-647-447-5856</li>
							<li>INDIA: +91-9052955755</li>
							<li>USA: +1-618-971-7471</li>
							<li>Mail: info@vrtechinfolinc.com</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Copyright & Social */}
			<div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
				<p className="text-gray-500 text-sm order-2 md:order-1 mt-4 md:mt-0">
					© 2025 VR Tech Info Inc. All rights reserved.
				</p>
				<div className="flex space-x-6 order-1 md:order-2">
					<a href="#">
						<img
							src="/instagram-icon.png"
							alt="Instagram"
							className="w-6 h-6"
						/>
					</a>
					<a href="#">
						<img src="/facebook-icon.png" alt="Facebook" className="w-6 h-6" />
					</a>
					<a href="#">
						<img src="/youtube-icon.png" alt="YouTube" className="w-6 h-6" />
					</a>
				</div>
			</div>
		</footer>
	);
}
