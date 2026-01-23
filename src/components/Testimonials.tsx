"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
	id: number;
	name: string;
	role: string;
	content: string;
	rating: number;
}

const testimonials: Testimonial[] = [
	{
		id: 1,
		name: "John Doe",
		role: "CEO of TechCorp",
		content: "The team provided exceptional service, delivering our project ahead of schedule without compromising on quality. Highly recommended!",
		rating: 5
	},
	{
		id: 2,
		name: "Jane Smith",
		role: "Marketing Manager",
		content: "Working with them was a breeze. Their insights and expertise significantly boosted our online presence. Fantastic results!",
		rating: 5
	},
	{
		id: 3,
		name: "Alex Johnson",
		role: "Startup Founder",
		content: "As a startup, we needed a reliable partner. They exceeded our expectations with their innovative solutions and dedicated support.",
		rating: 5
	},
	{
		id: 4,
		name: "Sarah Lee",
		role: "Project Lead",
		content: "Professional, responsive, and highly skilled. They understood our requirements perfectly and delivered a top-notch product.",
		rating: 5
	},
	{
		id: 5,
		name: "Michael Chen",
		role: "CTO at InnovateX",
		content: "One of the best engineering partners we've ever worked with. Their attention to detail and proactive approach is truly world-class.",
		rating: 5
	},
	{
		id: 6,
		name: "Elena Rodriguez",
		role: "Product Director",
		content: "They didn't just build a feature; they helped us redefine our user experience. Their strategic thinking is as sharp as their code.",
		rating: 5
	}
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
	<div className="flex-shrink-0 w-[400px] h-full mx-4">
		<div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl h-full flex flex-col justify-between group hover:bg-white/10 transition-all duration-500 hover:border-red-500/30 relative overflow-hidden">
			{/* Background Glow */}
			<div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[80px] rounded-full group-hover:bg-red-500/20 transition-all duration-500" />

			<div className="relative z-10">
				<div className="flex gap-1 mb-6 text-red-500">
					{[...Array(testimonial.rating)].map((_, i) => (
						<Star key={i} className="w-4 h-4 fill-current" />
					))}
				</div>

				<div className="relative">
					<Quote className="absolute -top-4 -left-6 w-12 h-12 text-white/5 group-hover:text-red-500/10 transition-colors duration-500" />
					<p className="text-gray-300 text-lg leading-relaxed italic relative z-10">
						&quot;{testimonial.content}&quot;
					</p>
				</div>
			</div>

			<div className="mt-8 flex items-center gap-4 relative z-10">
				<div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-800 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-500/20">
					{testimonial.name.charAt(0)}
				</div>
				<div>
					<h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
					<p className="text-red-500 text-sm font-medium">{testimonial.role}</p>
				</div>
			</div>
		</div>
	</div>
);

const TestimonialMarquee = ({ items, direction = "left" }: { items: Testimonial[], direction?: "left" | "right" }) => {
	return (
		<div className="relative flex overflow-hidden py-10">
			<motion.div
				animate={{
					x: direction === "left" ? [0, -items.length * 432] : [-items.length * 432, 0]
				}}
				transition={{
					duration: 30,
					repeat: Infinity,
					ease: "linear",
				}}
				style={{ willChange: "transform" }}
				className="flex"
			>
				{/* Double the items for seamless loop */}
				{[...items, ...items].map((testimonial, index) => (
					<TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
				))}
			</motion.div>
		</div>
	);
};

export default function Testimonials() {
	return (
		<section className="relative py-24 bg-[#0A0C16] overflow-hidden">
			{/* Decorative background elements */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden">
				<div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-900/10 blur-[150px] rounded-full" />
				<div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 blur-[150px] rounded-full" />
			</div>

			<div className="container mx-auto px-4 relative z-10 mb-16 text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
						Why Leaders <span className="text-red-500">Trust</span> Us
					</h2>
					<p className="text-gray-400 text-lg max-w-2xl mx-auto">
						Don&apos;t just take our word for it. Explore what our global partners and customers have to say about our engineering excellence.
					</p>
				</motion.div>
			</div>

			<div className="relative z-10">
				<TestimonialMarquee items={testimonials} direction="left" />
			</div>

			{/* Bottom gradient fade */}
			<div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0A0C16] to-transparent z-10" />
			<div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0A0C16] to-transparent z-10" />
		</section>
	);
}
