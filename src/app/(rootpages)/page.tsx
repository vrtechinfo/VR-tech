"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChoose";
import ScrollGraphics from "@/components/ScrollGraphics";
import FinalCTA from "@/components/FinalCTA";
import FuturisticHero from "@/components/ui/hero-futuristic";

const sectionVariants: Variants = {
	hidden: { opacity: 0, y: 100, scale: 0.9, rotateX: 20 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		rotateX: 0,
		transition: {
			type: "spring",
			stiffness: 50,
			damping: 20,
			duration: 0.8
		}
	}
};

export default function Home() {
	return (
		<main className="min-h-screen w-full bg-[#0A0C16] relative overflow-x-hidden">
			{/* Futuristic Background Layer (Disabled for now)
			<div className="fixed inset-0 z-0 pointer-events-none opacity-40">
				<FuturisticHero />
			</div>
			*/}

			{/* Immersive Background Layer */}
			<ScrollGraphics />

			<div className="relative z-10">
				<Hero />

				<motion.section
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.1 }}
					variants={sectionVariants}
				>
					<Features />
				</motion.section>

				<motion.section
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.1 }}
					variants={sectionVariants}
				>
					<Services />
				</motion.section>

				<motion.section
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.1 }}
					variants={sectionVariants}
				>
					<WhyChooseUs />
				</motion.section>

				<motion.section
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.1 }}
					variants={sectionVariants}
				>
					<FinalCTA />
				</motion.section>

				<motion.section
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.1 }}
					variants={sectionVariants}
				>
					<div id="contact">
						<ContactForm />
					</div>
				</motion.section>

				<motion.section
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.1 }}
					variants={sectionVariants}
				>
					<Testimonials />
				</motion.section>
			</div>
		</main>
	);
}
