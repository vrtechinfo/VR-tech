


"use client";

import ContactForm from "@/components/ContactForm";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChoose";
import type { JSX } from "react";

export default function Home(): JSX.Element {
	return (
		<div className="h-full w-full">
			<Hero />
			<Features />
			<Services />
			<div className="relative">
				<WhyChooseUs />
				<div 
					id="contact"
					className="absolute left-0 sm:left-[5%] md:left-[10%] lg:left-[12%] top-[1810px]  md:top-[800px] lg:top-[1250px] w-full sm:w-11/12 md:w-10/12 lg:w-3/4 z-10"
				>
					<ContactForm />
				</div>
				<Testimonials />
			</div>
		</div>
	);
}
