"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Globe } from "lucide-react";
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
        address: "44 Sandhill Cres, Adjala-Tosorontio, ON L0G 1W0",
        phone: "+16474475656",
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
            const data = {
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                contact: formData.get("contact") as string,
                message: formData.get("message") as string,
            };

            contactFormSchema.parse(data);
            const result = await submitContactForm(formData);

            if (result && result.success) {
                setSubmitMessage({
                    text: result.message,
                    type: "success"
                });
                if (formRef.current) formRef.current.reset();
            } else {
                setSubmitMessage({
                    text: result.message,
                    type: "error"
                });
                if (result.errors) setFormErrors(result.errors);
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors: Record<string, string[]> = {};
                error.errors.forEach(err => {
                    const field = err.path[0] as string;
                    if (!errors[field]) errors[field] = [];
                    errors[field].push(err.message);
                });
                setFormErrors(errors);
                setSubmitMessage({ text: "Please correct the errors in your form.", type: "error" });
            } else {
                setSubmitMessage({ text: "An unexpected error occurred. Please try again later.", type: "error" });
                console.error("Form error:", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative w-full py-20 overflow-hidden bg-[#0A0C16]">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="text-center mb-16">
                        <h2 id="contact-heading" className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                            Let&apos;s Build the <span className="text-red-500">Future</span> Together
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Whether you have a question or a brilliant idea, we&apos;re here to listen and help you scale your engineering dreams.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        {/* Left: Contact Info */}
                        <div className="lg:col-span-5 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="h-full flex flex-col gap-6"
                            >
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-8">Direct Contact</h3>
                                        <div className="space-y-8">
                                            <div className="flex items-start gap-5">
                                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                                    <Mail className="w-6 h-6 text-red-500" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Email Us</p>
                                                    <a href={`mailto:${location.email}`} className="text-white text-lg font-semibold hover:text-red-500 transition-colors">
                                                        {location.email}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-5">
                                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                                                    <Phone className="w-6 h-6 text-red-500" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Call Us</p>
                                                    <p className="text-white text-lg font-semibold">{location.phone}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-5">
                                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                                                    <MapPin className="w-6 h-6 text-red-500" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Visit Office</p>
                                                    <p className="text-white text-lg font-semibold leading-snug">
                                                        {location.address}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-white/5">
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/5 transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                                    <Globe className="w-5 h-5 text-red-500" />
                                                </div>
                                                <span className="text-white font-medium">View on Google Maps</span>
                                            </div>
                                            <Send className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Form Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-7"
                        >
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                {/* Subtle animated background for form */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[60px] rounded-full" />

                                <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-poppins">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                placeholder="John Doe"
                                                className={`w-full bg-white/5 border ${formErrors.name ? "border-red-500" : "border-white/10"} focus:border-red-500 focus:bg-white/10 p-4 rounded-2xl text-white outline-none transition-all placeholder:text-gray-600`}
                                            />
                                            {formErrors.name && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.name[0]}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="john@example.com"
                                                className={`w-full bg-white/5 border ${formErrors.email ? "border-red-500" : "border-white/10"} focus:border-red-500 focus:bg-white/10 p-4 rounded-2xl text-white outline-none transition-all placeholder:text-gray-600`}
                                            />
                                            {formErrors.email && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.email[0]}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="contact" className="text-sm font-medium text-gray-400 ml-1">Phone Number</label>
                                        <input
                                            id="contact"
                                            name="contact"
                                            type="tel"
                                            required
                                            placeholder="+1 (555) 000-0000"
                                            className={`w-full bg-white/5 border ${formErrors.contact ? "border-red-500" : "border-white/10"} focus:border-red-500 focus:bg-white/10 p-4 rounded-2xl text-white outline-none transition-all placeholder:text-gray-600`}
                                        />
                                        {formErrors.contact && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.contact[0]}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">Your Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            placeholder="Tell us about your project..."
                                            rows={4}
                                            className={`w-full bg-white/5 border ${formErrors.message ? "border-red-500" : "border-white/10"} focus:border-red-500 focus:bg-white/10 p-4 rounded-2xl text-white outline-none transition-all resize-none placeholder:text-gray-600`}
                                        />
                                        {formErrors.message && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.message[0]}</p>}
                                    </div>

                                    <AnimatePresence>
                                        {submitMessage && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className={`p-4 rounded-2xl flex items-center gap-3 ${submitMessage.type === "success"
                                                    ? "bg-green-500/10 border border-green-500/20 text-green-400"
                                                    : "bg-red-500/10 border border-red-500/20 text-red-400"
                                                    }`}
                                            >
                                                {submitMessage.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                                <span className="text-sm font-medium">{submitMessage.text}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full relative group overflow-hidden bg-red-500 hover:bg-red-600 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 p-5 rounded-2xl font-bold text-white transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Sending Message...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A0C16] to-transparent pointer-events-none" />
        </section>
    );
}
