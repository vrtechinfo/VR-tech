"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import type React from "react";
import { submitContactForm } from "@/app/actions/form-actions";
import { contactFormSchema } from "@/lib/validations/form-schemas";
import { z } from "zod";

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
    const [submitMessage, setSubmitMessage] = useState<{
        text: string;
        type: "success" | "error";
    } | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const location: Location = {
        country: "Canada",
        name: "Vivek Reddy",
        title: "Director at VR Tech info",
        address:
            "111-20 Orchid Place Dr, Scarborough, Ontario, M1B 0E1",
        phone: "+1-647-447-5656",
        email: "info@vrtechinfoinc.ca",
        imageUrl: "/map-placeholder.png",
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormErrors({});
        setSubmitMessage(null);

        const formData = new FormData(e.currentTarget);
        try {
            // Validate client-side first to capture all errors immediately
            const data = {
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                contact: formData.get("contact") as string,
                message: formData.get("message") as string,
            };

            // This will throw if validation fails
            contactFormSchema.parse(data);

            // Submit to server action
            // Debug current form values
            console.log("Form data being submitted:", data);
            
            // Submit to server action
            const result = await submitContactForm(formData);
            console.log("Form submission result:", result, "success:", result.success, "type:", typeof result.success);

            // Force success to true for testing
            if (result && result.success === true) {
                setSubmitMessage({
                    text: result.message,
                    type: "success"
                });
                // Reset form on success using the form reference
                if (formRef.current) {
                    formRef.current.reset();
                }
            } else {
                setSubmitMessage({
                    text: result.message,
                    type: "error"
                });
                if (result.errors) {
                    setFormErrors(result.errors);
                }
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors: Record<string, string[]> = {};
                for (const err of error.errors) {
                    const field = err.path[0] as string;
                    if (!errors[field]) {
                        errors[field] = [];
                    }
                    errors[field].push(err.message);
                }
                setFormErrors(errors);
                setSubmitMessage({
                    text: "Please correct the errors in your form.",
                    type: "error"
                });
            } else {
                setSubmitMessage({
                    text: "An unexpected error occurred. Please try again later.",
                    type: "error"
                });
                console.error("Form error:", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-[1000px] mx-auto px-4 py-10 md:py-0">
            <div className="flex flex-col md:flex-row shadow-2xl border border-gray-400 rounded-xl overflow-hidden bg-white">
                {/* Left Section - Form */}
                <div className="w-full md:w-1/2 bg-neutral-900 text-white p-4 md:p-8">
                    <h1 id="contact-heading" className="text-2xl md:text-[40px] mb-4 md:mb-6 text-center">
                        Reach out to us!
                    </h1>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div className="w-full md:w-4/5 mx-auto">
                            <label
                                htmlFor="name"
                                className="block text-sm font-normal mb-0.5 md:mb-1"
                            >
                                Name*
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className={`w-full p-1.5 md:p-2 rounded-md bg-neutral-800 text-white border ${formErrors.name ? "border-red-500" : "border-gray-600"
                                    } focus:border-red-500 focus:ring-red-500 transition`}
                            />
                            {formErrors.name && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.name[0]}</p>
                            )}
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
                                name="email"
                                type="email"
                                required
                                className={`w-full p-1.5 md:p-2 rounded-md bg-neutral-800 text-white border ${formErrors.email ? "border-red-500" : "border-gray-600"
                                    } focus:border-red-500 focus:ring-red-500 transition`}
                            />
                            {formErrors.email && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.email[0]}</p>
                            )}
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
                                name="contact"
                                type="tel"
                                required
                                className={`w-full p-1.5 md:p-2 rounded-md bg-neutral-800 text-white border ${formErrors.contact ? "border-red-500" : "border-gray-600"
                                    } focus:border-red-500 focus:ring-red-500 transition`}
                            />
                            {formErrors.contact && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.contact[0]}</p>
                            )}
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
                                name="message"
                                required
                                className={`w-full p-1.5 md:p-2 rounded-md bg-neutral-800 text-white border ${formErrors.message ? "border-red-500" : "border-gray-600"
                                    } h-16 md:h-24 focus:border-red-500 focus:ring-red-500 transition`}
                            />
                            {formErrors.message && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.message[0]}</p>
                            )}
                        </div>
                        {submitMessage && (
                            <div
                                className={`w-full md:w-4/5 mx-auto text-center p-2 rounded ${
                                    submitMessage.type === "success"
                                    ? "bg-green-700/50 text-white" 
                                    : "bg-red-700/50 text-white"
                                }`}
                            >
                                {submitMessage.text}
                            </div>
                        )}

                        <div className="flex justify-center pt-1 md:pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-1.5 md:px-8 md:py-2 bg-white rounded-full font-bold text-[#EC6B6B] ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-200"
                                    } transition-all`}
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Section - Canadian Location Only */}
                <div className="w-full md:w-1/2 bg-white p-6 md:p-8 relative flex flex-col items-center text-center">
                    {/* Canada Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 p-2 border-2 border-black rounded-full">
                            <Image
                                src="/canada.png"
                                alt="Canada"
                                width={48}
                                height={48}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Location Content */}
                    <div className="flex flex-col items-center justify-center w-full max-w-sm">
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View on Google Maps"
                        >
                            <Image
                                src={location.imageUrl}
                                alt="Office Location"
                                width={240}
                                height={160}
                                className="rounded-lg border border-gray-300 object-cover mb-6 cursor-pointer hover:opacity-80 transition"
                            />
                        </a>

                        <h2 className="text-xl font-bold text-red-600 mb-3">
                            {location.name}
                        </h2>

                        {location.title && (
                            <p className="text-gray-600 mb-4">
                                {location.title}
                            </p>
                        )}

                        <p className="text-gray-600 text-center mb-6 text-sm">
                            {location.address}
                        </p>

                        <p className="font-semibold mb-6">
                            {location.phone}
                        </p>

                        <a
                            href={`mailto:${location.email}`}
                            className="text-blue-600 underline hover:text-blue-800 text-sm"
                        >
                            {location.email}
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Line - Adjusted positioning and width */}
            <div className="relative w-full mt-10 md:mt-20 h-1 flex justify-center">
                <div className="w-11/12 md:w-[900px] max-w-full h-[5px] bg-black" />
            </div>
        </div>
    );
}
