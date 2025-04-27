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
		<div className="bg-[#FDF6F6] p-4 sm:p-6 md:p-9 rounded-xl shadow-lg w-full max-w-[600px] min-h-[300px] sm:min-h-[350px] md:min-h-[400px] relative overflow-y-auto">
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
			<p className="text-gray-800 text-sm sm:text-base md:text-xl leading-relaxed">{content}</p>
		</div>
	);
};

export default function Testimonials(): JSX.Element {
	return (
		<div className="bg-[url(/reviewsbackground.webp)] min-h-[1500px] sm:min-h-[900px] md:min-h-[1144px] w-full bg-cover bg-center overflow-hidden">
			<div className="pt-[980px] sm:pt-[400px] md:pt-[500px] lg:pt-[600px]">
				<div className="mb-8 sm:mb-10 md:mb-12">
					<h1 className="text-3xl sm:text-4xl md:text-[48px] font-bold text-center text-black">
						Hear From Our Customers
					</h1>
				</div>
				<div className="relative overflow-hidden">
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

// Custom hook for responsive values
const useResponsiveValues = () => {
	const [isMobile, setIsMobile] = React.useState(false);

	React.useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 640);
		};

		// Initial check
		checkMobile();

		// Add event listener for window resize
		window.addEventListener('resize', checkMobile);

		// Cleanup
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	return { isMobile };
};

const getPosition = (
	index: number,
	currentIndex: number,
	total: number,
	isMobile: boolean,
): PositionStyle => {
	const pos = (index - currentIndex + total) % total;

	// Center card
	if (pos === 0) return { scale: 1, x: 0, zIndex: 10, opacity: 1 };

	// Right card - smaller offset on mobile
	if (pos === 1) return {
		scale: 0.85,
		x: isMobile ? 200 : 350,
		zIndex: 5,
		opacity: 0.55
	};

	// Left card - smaller offset on mobile
	if (pos === total - 1) return {
		scale: 0.85,
		x: isMobile ? -200 : -350,
		zIndex: 5,
		opacity: 0.55
	};

	// Hide others further away
	return {
		scale: 0.7,
		x: pos > total / 2 ? (isMobile ? -300 : -450) : (isMobile ? 300 : 450),
		zIndex: 1,
		opacity: 0
	};
};

interface CardCarouselProps {
	children: ReactNode;
}

const CardCarousel: React.FC<Readonly<CardCarouselProps>> = ({ children }) => {
	const total = React.Children.count(children);
	const [index, setIndex] = useState<number>(0);
	const { isMobile } = useResponsiveValues();
	const [dragStartX, setDragStartX] = useState<number | null>(null);

	const nextCard = () => setIndex((prev) => (prev + 1) % total);
	const prevCard = () => setIndex((prev) => (prev - 1 + total) % total);

	// Handle drag for swipe functionality
	const handleDragStart = (event: React.PointerEvent) => {
		if (isMobile) {
			setDragStartX(event.clientX);
		}
	};

	const handleDragEnd = (event: React.PointerEvent) => {
		if (isMobile && dragStartX !== null) {
			const dragEndX = event.clientX;
			const difference = dragEndX - dragStartX;

			// If dragged more than 50px, change slide
			if (Math.abs(difference) > 50) {
				if (difference > 0) {
					// Dragged right, go to previous slide
					prevCard();
				} else {
					// Dragged left, go to next slide
					nextCard();
				}
			}

			setDragStartX(null);
		}
	};

	return (
		<div className="relative flex flex-col items-center justify-center py-8 sm:py-12 md:py-16">
			{/* Responsive width with percentage for mobile */}
			<div
				className="relative w-[90%] max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[650px] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]"
				onPointerDown={handleDragStart}
				onPointerUp={handleDragEnd}
				onPointerLeave={handleDragEnd}
				style={{ touchAction: isMobile ? 'pan-y' : 'auto' }}
			>
				{React.Children.map(children, (child, i) => {
					if (!React.isValidElement(child)) return null; // Ensure child is a valid element

					// Extract the name property from the child's props to use in the key
					const childProps = child.props as TestimonialCardProps;
					const uniqueId = childProps.name.replace(/\s+/g, '-').toLowerCase();

					const { scale, x, zIndex, opacity } = getPosition(i, index, total, isMobile);
					return (
						<motion.div
							// Using a stable key based on the testimonial name
							key={`testimonial-${uniqueId}`}
							initial={false} // Prevent initial animation on load
							animate={{ scale, x, zIndex, opacity }}
							transition={{ duration: 0.5, type: "spring", stiffness: 100 }} // Smoother spring animation
							className="absolute w-full flex items-center justify-center" // Removed background/blur here, applied on card itself
						>
							{child}
						</motion.div>
					);
				})}

				{/* Buttons - hidden on mobile, visible on larger screens */}
				<button
					type="button"
					onClick={prevCard}
					className="hidden sm:block absolute left-[-120px] sm:left-[-200px] md:left-[-300px] lg:left-[-400px] top-1/3 transform -translate-y-1/2 bg-white/50 p-1.5 sm:p-2 md:p-3 rounded-full hover:bg-white/70 transition z-10 shadow-md"
					aria-label="Previous testimonial"
				>
					<ChevronLeft size={24} className="text-gray-800 sm:h-6 sm:w-6 md:h-8 md:w-8" />
				</button>
				<button
					type="button"
					onClick={nextCard}
					className="hidden sm:block absolute right-[-120px] sm:right-[-200px] md:right-[-300px] lg:right-[-400px] top-1/3 transform -translate-y-1/2 bg-white/50 p-1.5 sm:p-2 md:p-3 rounded-full hover:bg-white/70 transition z-10 shadow-md"
					aria-label="Next testimonial"
				>
					<ChevronRight size={24} className="text-gray-800 sm:h-6 sm:w-6 md:h-8 md:w-8" />
				</button>

				{/* Mobile swipe indicator - only visible on mobile */}
				{isMobile && (
					<div className="absolute bottom-[50px] left-0 right-0 flex justify-center items-center space-x-2">
						{React.Children.map(children, (child, i) => {
							if (!React.isValidElement(child)) return null;

							// Extract the name property from the child's props to use in the key
							const childProps = child.props as TestimonialCardProps;
							const uniqueId = childProps.name.replace(/\s+/g, '-').toLowerCase();

							return (
								<div
									key={`indicator-${uniqueId}`}
									className={`w-2 h-2 rounded-full ${i === index ? 'bg-gray-800' : 'bg-gray-400'}`}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};
