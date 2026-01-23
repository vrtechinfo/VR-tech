import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { Database, ShieldAlert, UserCheck, RefreshCcw, Lock, HardDrive, Search, FileSignature } from "lucide-react";

export const metadata: Metadata = {
    title: "Data Processing Agreement | VR Tech Info",
    description: "Data Processing Agreement for VR Tech Info Inc. Read about our high-standard data handling and security practices.",
};

export default function DataProcessing() {
    const lastUpdated = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const highlights = [
        {
            icon: <Database className="w-6 h-6 text-red-800" />,
            title: "Data Stewardship",
            description: "We process your data only as instructed and for specified purposes."
        },
        {
            icon: <Lock className="w-6 h-6 text-red-800" />,
            title: "Active Defense",
            description: "Layered security protocols ensure data integrity and confidentiality."
        },
        {
            icon: <UserCheck className="w-6 h-6 text-red-800" />,
            title: "Compliance",
            description: "Aligned with GDPR, PIPEDA, and international data standards."
        },
        {
            icon: <RefreshCcw className="w-6 h-6 text-red-800" />,
            title: "Rights",
            description: "Full support for data subject requests and portability."
        }
    ];

    return (
        <LegalLayout title="Data Processing" lastUpdated={lastUpdated}>
            {/* DPA Overview Section */}
            <div className="not-prose mb-16">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <FileSignature className="w-8 h-8 text-red-800" />
                    DPA Overview
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
                This Data Processing Agreement ("DPA") establishes the strict standards by which
                VR Tech Info Inc. ("Processor") handles personal data on behalf of our clients
                ("Controller").
            </p>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <HardDrive className="w-6 h-6 text-red-800" />
                    1. Roles & Responsibilities
                </h2>
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                        <h3 className="text-white font-bold mb-4">The Controller (You)</h3>
                        <p className="text-gray-400 text-sm">
                            As the Controller, you determine the purpose and legal basis for processing.
                            You ensure that you have all necessary consents or legal grounds to share
                            data with us.
                        </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                        <h3 className="text-white font-bold mb-4">The Processor (Us)</h3>
                        <p className="text-gray-400 text-sm">
                            As the Processor, we act strictly upon your documented instructions. We
                            never use your data for our own marketing or share it with third parties
                            outside this agreement.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-red-800" />
                    2. Advanced Security Measures
                </h2>
                <p>Our commitment to security is absolute. We maintain a multi-layered defense:</p>
                <div className="space-y-4 mt-6">
                    {[
                        { tag: "Encryption", detail: "End-to-end encryption for data both in transit (TLS 1.3) and at rest (AES-256)." },
                        { tag: "Access Control", detail: "Strict Principle of Least Privilege (PoLP) and Multi-Factor Authentication for all staff." },
                        { tag: "Monitoring", detail: "24/7 logging and automated threat detection across all processing environments." },
                        { tag: "Audits", detail: "Periodic internal and external security audits to ensure continued compliance." }
                    ].map((item) => (
                        <div key={item.tag} className="flex gap-4 bg-white/5 p-4 rounded-lg border border-white/5">
                            <span className="text-red-800 font-bold min-w-[120px]">{item.tag}</span>
                            <span className="text-gray-400 text-sm">{item.detail}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <ShieldAlert className="w-6 h-6 text-red-800" />
                    3. Breach Notification
                </h2>
                <p>
                    In the unlikely event of a data breach, we follow a rapid response protocol:
                </p>
                <ul className="mt-4">
                    <li><strong>Detection:</strong> Immediate isolation and investigation by our security team.</li>
                    <li><strong>Notification:</strong> We notify the Controller without undue delay (typically within 48 hours).</li>
                    <li><strong>Assistance:</strong> We provide full detailed reports to help you meet your regulatory reporting obligations.</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <Search className="w-6 h-6 text-red-800" />
                    4. Audit & Inspection Rights
                </h2>
                <p>
                    We believe in complete transparency. Clients have the right to conduct audits or
                    inspections of our processing facilities and data handling practices, provided
                    reasonable notice is given.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <RefreshCcw className="w-6 h-6 text-red-800" />
                    5. Data Return & Deletion
                </h2>
                <p>
                    Upon completion of our services, we will—at your choice—securely delete or
                    return all personal data, unless applicable laws require a specific retention period.
                    We provide a Certificate of Destruction upon request.
                </p>
            </section>

            <section className="mb-12">
                <h2>DPA Inquiries</h2>
                <p>For more details on our data processing or to request a signed copy of our DPA:</p>
                <div className="not-prose bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-2xl mt-6">
                    <p className="font-bold text-white text-xl mb-1 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-red-800" />
                        Data Protection Office
                    </p>
                    <a href="mailto:privacy@vrtechinfoinc.ca" className="text-red-800 hover:text-red-700 font-medium underline mt-2 inline-block">
                        privacy@vrtechinfoinc.ca
                    </a>
                    <p className="text-gray-500 text-xs mt-4">VR Tech Info Inc. | Security First Enterprise IT</p>
                </div>
            </section>
        </LegalLayout>
    );
}
