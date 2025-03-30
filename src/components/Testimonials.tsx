"use client";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import type { JSX, ReactNode } from "react";
import { useState } from "react";

interface TestimonialCardProps {
	name: string;
	roles: string;
	content: string;
}

const TestimonialCard: React.FC<Readonly<TestimonialCardProps>> = ({
	name,
	roles,
	content,
}) => {
	return (
		<div className="bg-[#FDF6F6] p-4 sm:p-6 md:p-9 rounded-xl shadow-lg w-full max-w-[450px] h-[300px] sm:h-[350px] md:h-[400px] relative">
			{/* Profile Section */}
			<div className="flex items-center gap-4 mb-10">
				{/* Profile Image Placeholder */}
				<div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
					{/* You can add an icon or initials here */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-labelledby="profileIcon"
					>
						<title id="profileIcon">Profile Icon</title>
						<path
							fillRule="evenodd"
							d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				{/* Name and Role */}
				<div>
					<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{name}</h3>
					<p className="text-base sm:text-lg md:text-xl text-gray-600">{roles}</p>
				</div>
			</div>
			{/* Testimonial Content */}
			<p className="text-gray-800 text-base sm:text-xl md:text-2xl leading-relaxed">{content}</p>
		</div>
	);
};

export default function Testimonials(): JSX.Element {
	return (
		<div className="bg-[url(/reviewsbackground.png)] min-h-[700px] sm:min-h-[900px] md:min-h-[1144px] w-full bg-cover bg-center overflow-x-hidden">
			<div className="pt-[300px] sm:pt-[400px] md:pt-[500px] lg:pt-[600px] overflow-hidden">
				<div className="mb-4 sm:mb-6 md:mb-10">
					<h1 className="text-3xl sm:text-4xl md:text-[48px] font-bold text-center text-black">
						Hear From Our Customers
					</h1>
				</div>
				<div className="-m-20 sm:-m-40 md:-m-60 relative overflow-x-hidden">
					<CardCarousel>
						<TestimonialCard
							name="John Doe"
							roles="CEO of TechCorp"
							content="The team provided exceptional service, delivering our project ahead of schedule without compromising on quality. Highly recommended!"
						/>
						<TestimonialCard
							name="Jane Smith"
							roles="Marketing Manager"
							content="Working with them was a breeze. Their insights and expertise significantly boosted our online presence. Fantastic results!"
						/>
						<TestimonialCard
							name="Alex Johnson"
							roles="Startup Founder"
							content="As a startup, we needed a reliable partner. They exceeded our expectations with their innovative solutions and dedicated support."
						/>
						<TestimonialCard
							name="Sarah Lee"
							roles="Project Lead"
							content="Professional, responsive, and highly skilled. They understood our requirements perfectly and delivered a top-notch product."
						/>
					</CardCarousel>
				</div>
			</div>
		</div>
	);
};


interface PositionStyle {
	scale: number;
	x: number;
	zIndex: number;
	opacity: number;
}

const getPosition = (
	index: number,
	currentIndex: number,
	total: number,
): PositionStyle => {
	const pos = (index - currentIndex + total) % total;
	if (pos === 0) return { scale: 1, x: 0, zIndex: 10, opacity: 1 }; // Center
	if (pos === 1) return { scale: 0.85, x: 250, zIndex: 5, opacity: 0.55 }; // Right
	if (pos === total - 1)
		return { scale: 0.85, x: -250, zIndex: 5, opacity: 0.55 }; // Left
	// Hide others further away
	return { scale: 0.7, x: pos > total / 2 ? -350 : 350, zIndex: 1, opacity: 0 };
};

interface CardCarouselProps {
	children: ReactNode;
}

const CardCarousel: React.FC<Readonly<CardCarouselProps>> = ({ children }) => {
	const total = React.Children.count(children);
	const [index, setIndex] = useState<number>(0);

	const nextCard: React.MouseEventHandler<HTMLButtonElement> = () =>
		setIndex((prev) => (prev + 1) % total);
	const prevCard: React.MouseEventHandler<HTMLButtonElement> = () =>
		setIndex((prev) => (prev - 1 + total) % total);

	return (
		<div className="relative flex flex-col items-center justify-center h-screen">
			{/* Increased height to prevent overlap with buttons */}
			<div className="relative w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
				{" "}
				{React.Children.map(children, (child, i) => {
					if (!React.isValidElement(child)) return null; // Ensure child is a valid element
					const { scale, x, zIndex, opacity } = getPosition(i, index, total);
					return (
						<motion.div
							// Using a more unique key with a combination of index and static text
							// This is acceptable in this case since the carousel items are fixed
							key={`testimonial-card-${i}-${Math.random().toString(36).substr(2, 9)}`}
							initial={false} // Prevent initial animation on load
							animate={{ scale, x, zIndex, opacity }}
							transition={{ duration: 0.5, type: "spring", stiffness: 100 }} // Smoother spring animation
							className="absolute w-full flex items-center justify-center" // Removed background/blur here, applied on card itself
						>
							{child}
						</motion.div>
					);
				})}
				{/* Buttons positioned further out and vertically centered */}
				<button
					type="button"
					onClick={prevCard}
					className="absolute left-[-150px] sm:left-[-250px] md:left-[-350px] top-1/2 transform -translate-y-1/2 bg-white/30 p-2 sm:p-3 rounded-full hover:bg-white/50 transition z-50 shadow-md"
				>
					<ChevronLeft size={30} className="text-gray-800" />
				</button>
				<button
					type="button"
					onClick={nextCard}
					className="absolute right-[-150px] sm:right-[-250px] md:right-[-350px] top-1/2 transform -translate-y-1/2 bg-white/30 p-2 sm:p-3 rounded-full hover:bg-white/50 transition z-50 shadow-md"
				>
					<ChevronRight size={30} className="text-gray-800" />
				</button>
			</div>
		</div>
	);
};
