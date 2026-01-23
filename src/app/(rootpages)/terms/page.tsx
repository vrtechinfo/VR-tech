import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { Gavel, Globe, Shield, UserCog, AlertTriangle, CreditCard, Scale, FileText, Lock, Bell } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Service | VR Tech Info",
    description: "Terms of Service for VR Tech Info Inc. Read our user-friendly guide to our terms and conditions for using our services.",
};

export default function TermsOfService() {
    const lastUpdated = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const highlights = [
        {
            icon: <Gavel className="w-6 h-6 text-red-800" />,
            title: "Agreement",
            description: "By using our services, you agree to these legal terms and conditions."
        },
        {
            icon: <Scale className="w-6 h-6 text-red-800" />,
            title: "Our Services",
            description: "We provide IT consulting, development, and support under professional standards."
        },
        {
            icon: <UserCog className="w-6 h-6 text-red-800" />,
            title: "Your Data",
            description: "We handle your information with modern security and respect your privacy."
        },
        {
            icon: <Shield className="w-6 h-6 text-red-800" />,
            title: "Liability",
            description: "Clear boundaries on our responsibilities and your protections."
        }
    ];

    return (
        <LegalLayout title="Terms of Service" lastUpdated={lastUpdated}>
            {/* Terms at a Glance Section */}
            <div className="not-prose mb-16">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <FileText className="w-8 h-8 text-red-800" />
                    Terms at a Glance
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {highlights.map((item, index) => (
                        <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors group">
                            <div className="mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                            <h3 className="text-white font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-lg leading-relaxed mb-10">
                Welcome to VR Tech Info Inc. Our Terms of Service are designed to establish a clear and
                trustworthy professional relationship between us and our clients.
            </p>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-red-800" />
                    1. Acceptance of Terms
                </h2>
                <p>
                    By accessing or using our website and services, you acknowledge that you have read,
                    understood, and agree to be bound by these Terms. If you are entering into this
                    agreement on behalf of a company, you represent that you have the authority to do so.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <Scale className="w-6 h-6 text-red-800" />
                    2. Standard of Services
                </h2>
                <p>
                    We pride ourselves on delivering industry-grade IT solutions. Our services include:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                    {[
                        "Strategic IT Consulting",
                        "Custom Software Development",
                        "Advanced Cybersecurity Audits",
                        "Professional Technical Training",
                        "Ongoing Infrastructure Support"
                    ].map((service) => (
                        <div key={service} className="flex items-center gap-3 bg-white/5 p-4 rounded-lg border border-white/5">
                            <div className="w-2 h-2 bg-red-800 rounded-full"></div>
                            <span className="text-gray-300">{service}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <UserCog className="w-6 h-6 text-red-800" />
                    3. Your Responsibilities
                </h2>
                <p>To ensure the best outcome for our partnership, we ask that you:</p>
                <ul>
                    <li><strong>Accuracy:</strong> Provide precise and complete information when requested.</li>
                    <li><strong>Security:</strong> Keep any provided credentials or access keys confidential.</li>
                    <li><strong>Legality:</strong> Use our services only for lawful, professional purposes.</li>
                    <li><strong>Integrity:</strong> Do not attempt to reverse engineer or disrupt our systems.</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-red-800" />
                    4. Intellectual Property
                </h2>
                <p>
                    All rights, title, and interest in and to our proprietary technology, software code,
                    designs, and documentation belong exclusively to VR Tech Info Inc. unless otherwise
                    specified in a signed Master Services Agreement (MSA).
                </p>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-red-800" />
                    5. Fees and Payments
                </h2>
                <p>
                    Transparency in billing is a core value for us.
                </p>
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl mt-4">
                    <ul className="space-y-4 m-0">
                        <li className="flex gap-4">
                            <span className="text-red-800 font-bold">Terms:</span>
                            <span className="text-gray-400">Payment terms are typically Net 30 days unless otherwise agreed.</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-red-800 font-bold">Invoicing:</span>
                            <span className="text-gray-400">Digital invoices are sent via our automated billing system.</span>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-800" />
                    6. Limitation of Liability
                </h2>
                <p>
                    To the extent permitted by law, VR Tech Info Inc. shall not be liable for indirect,
                    consequential, or incidental damages arising from the use of our services. Our
                    total liability is limited to the fees paid for the specific service in question.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-red-800" />
                    7. Governing Law
                </h2>
                <p>
                    These Terms are governed by the laws of the Province of Ontario, Canada. Any
                    disputes shall be resolved in the competent courts located in the Greater Toronto Area.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <Bell className="w-6 h-6 text-red-800" />
                    8. Changes to Terms
                </h2>
                <p>
                    We may update these terms as our business evolves. Your continued use of our
                    services after an update constitutes acceptance of the refined terms.
                </p>
            </section>

            <section className="mb-12">
                <h2>Contact Our Legal Team</h2>
                <p>For questions regarding these Terms or our professional practices:</p>
                <div className="not-prose bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-2xl mt-6">
                    <p className="font-bold text-white text-xl mb-1">VR Tech Info Legal</p>
                    <div className="flex flex-col sm:flex-row gap-6 mt-4">
                        <a href="mailto:legal@vrtechinfoinc.ca" className="text-red-800 hover:text-red-700 font-medium underline">
                            legal@vrtechinfoinc.ca
                        </a>
                        <span className="text-gray-600 hidden sm:block">|</span>
                        <a href="tel:+16474475656" className="text-gray-300 hover:text-white transition-colors">
                            +1 647 447 5656
                        </a>
                    </div>
                </div>
            </section>
        </LegalLayout>
    );
}
