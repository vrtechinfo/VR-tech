"use client";
import { useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import type React from "react";

interface Location {
    country: string;
    name: string;
    title: string;
    address: string;
    phone: string;
    email: string;
    imageUrl: string | StaticImageData;
}

export default function ContactForm(): React.JSX.Element {
    const [index, setIndex] = useState<number>(1);
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add form submission logic here
        console.log("Form submitted");
    };

    return (
        <div className="w-full max-w-[1000px] mx-auto px-4 py-10 md:py-0">
            <div className="flex flex-col md:flex-row shadow-2xl border border-gray-400 rounded-xl overflow-hidden bg-white">
                {/* Left Section - Form */}
                <div className="w-full md:w-1/2 bg-neutral-900 text-white p-4 md:p-8">
                    <h1 className="text-2xl md:text-[40px] mb-4 md:mb-6 text-center">
                        Reach out to us!
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div className="w-full md:w-4/5 mx-auto">
                            <label
                                htmlFor="name"
                                className="block text-sm font-normal mb-0.5 md:mb-1"
                            >
                                Name*
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                className="w-full p-1.5 md:p-2 rounded-md bg-neutral-800 text-white border border-gray-600 focus:border-red-500 focus:ring-red-500 transition"
                            />
                        </div>
                        <div className="w-full md:w-4/5 mx-auto">
                            <label
                                htmlFor="email"
                                className="block text-sm font-normal mb-0.5 md:mb-1"
                            >
                                Email*
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full p-1.5 md:p-2 rounded-md bg-neutral-800 text-white border border-gray-600 focus:border-red-500 focus:ring-red-500 transition"
                            />
                        </div>
                        <div className="w-full md:w-4/5 mx-auto">
                            <label
                                htmlFor="contact"
                                className="block text-sm font-normal mb-0.5 md:mb-1"
                            >
                                Contact No.*
                            </label>
                            <input
                                id="contact"
                                type="tel"
                                required
                                className="w-full p-1.5 md:p-2 rounded-md bg-neutral-800 text-white border border-gray-600 focus:border-red-500 focus:ring-red-500 transition"
                            />
                        </div>
                        <div className="w-full md:w-4/5 mx-auto">
                            <label
                                htmlFor="message"
                                className="block text-sm font-normal mb-0.5 md:mb-1"
                            >
                                Message*
                            </label>
                            <textarea
                                id="message"
                                required
                                className="w-full p-1.5 md:p-2 rounded-md bg-neutral-800 text-white border border-gray-600 h-16 md:h-24 focus:border-red-500 focus:ring-red-500 transition"
                            />
                        </div>
                        <div className="flex justify-center pt-1 md:pt-2">
                            <button
                                type="submit"
                                className="px-6 py-1.5 md:px-8 md:py-2 bg-white rounded-full font-bold text-[#EC6B6B] hover:bg-gray-200 transition-all"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Section - Location Carousel */}
                <div className="w-full md:w-1/2 bg-white p-6 md:p-8 relative flex flex-col items-center text-center">
                    {/* Country Icons - With the selected country centered */}
                    <div 
                        className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4 mb-2 sm:mb-3 md:mb-4 transition-transform duration-300"
                        style={{ transform: `translateX(${index === 0 ? '30px' : index === 2 ? '-30px' : '0px'})` }}
                    >
                        {locations.map((loc, i) => (
                            <button
                                key={`location-${loc.country}-${i}`}
                                type="button"
                                onClick={() => setIndex(i)}
                                className={`w-10 h-10 p-1 bg-transparent transition-all duration-500 ${i === index ? "border-2 border-black scale-150 rounded-full" : "border-transparent scale-100 rounded-full"}`}
                                aria-label={`Select ${loc.country} location`}
                            >
                                <Image
                                    src={`/${loc.country.toLowerCase()}.png`}
                                    alt={loc.country}
                                    width={40}
                                    height={32}
                                    className="w-full h-full object-contain"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Location Content */}
                    <div className="flex flex-col items-center justify-center w-full max-w-sm">
                        <Image
                            src={locations[index].imageUrl}
                            alt="Office Location"
                            width={240}
                            height={160}
                            className="rounded-lg border border-gray-300 object-cover mb-6"
                        />

                        <h2 className="text-xl font-bold text-red-600 mb-3">
                            {locations[index].name}
                        </h2>

                        {locations[index].title && (
                            <p className="text-gray-600 mb-4">
                                {locations[index].title}
                            </p>
                        )}

                        <p className="text-gray-600 text-center mb-6 text-sm">
                            {locations[index].address}
                        </p>

                        <p className="font-semibold mb-6">
                            {locations[index].phone}
                        </p>

                        <a
                            href={`mailto:${locations[index].email}`}
                            className="text-blue-600 underline hover:text-blue-800 text-sm"
                        >
                            {locations[index].email}
                        </a>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        type="button"
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
                        type="button"
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
                <div className="w-11/12 md:w-[900px] max-w-full h-[5px] bg-black" />
            </div>
        </div>
    );
}
