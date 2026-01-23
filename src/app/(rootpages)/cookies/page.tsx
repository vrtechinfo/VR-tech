import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { Cookie, BarChart3, Settings, ShieldCheck, EyeOff, MousePointer2, Info } from "lucide-react";

export const metadata: Metadata = {
    title: "Cookies Policy | VR Tech Info",
    description: "Cookies Policy for VR Tech Info Inc. Learn how we use cookies and tracking technologies in our user-friendly guide.",
};

export default function CookiesPolicy() {
    const lastUpdated = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const highlights = [
        {
            icon: <ShieldCheck className="w-6 h-6 text-red-800" />,
            title: "Essential",
            description: "Required for basic site functionality and security."
        },
        {
            icon: <BarChart3 className="w-6 h-6 text-red-800" />,
            title: "Analytics",
            description: "Helps us understand how you use our site to improve it."
        },
        {
            icon: <Settings className="w-6 h-6 text-red-800" />,
            title: "Preferences",
            description: "Remembers your settings for a more personalized experience."
        },
        {
            icon: <MousePointer2 className="w-6 h-6 text-red-800" />,
            title: "Marketing",
            description: "Used to deliver relevant content and track our campaigns."
        }
    ];

    return (
        <LegalLayout title="Cookies Policy" lastUpdated={lastUpdated}>
            {/* Cookie Highlights Section */}
            <div className="not-prose mb-16">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <Cookie className="w-8 h-8 text-red-800" />
                    Our Cookie Usage
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
                At VR Tech Info Inc., we use cookies to ensure our website is fast, secure, and
                user-friendly. This policy explains what these technologies are and how you can
                manage your preferences.
            </p>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <Info className="w-6 h-6 text-red-800" />
                    1. What are Cookies?
                </h2>
                <p>
                    Cookies are small text files stored on your device when you visit a website. They
                    act like a memory for the browser, allowing it to remember your preferences and
                    provide a smoother browsing experience.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <Settings className="w-6 h-6 text-red-800" />
                    2. How We Use Them
                </h2>
                <p>We categorize our cookies to give you a clear understanding of their purpose:</p>

                <div className="space-y-6 mt-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                        <h3 className="text-white font-bold mb-2 flex items-center gap-2">Essential Cookies</h3>
                        <p className="text-gray-400 text-sm">
                            These are technically necessary for you to navigate our site and use its
                            secure areas. Without these, core services like authentication cannot be provided.
                        </p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                        <h3 className="text-white font-bold mb-2 flex items-center gap-2">Analytical/Performance</h3>
                        <p className="text-gray-400 text-sm">
                            We use tools like Google Analytics and Vercel Analytics to understand which
                            pages are most popular and how visitors move around the site. This data is
                            anonymized and used only for optimization.
                        </p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                        <h3 className="text-white font-bold mb-2 flex items-center gap-2">Functional Cookies</h3>
                        <p className="text-gray-400 text-sm">
                            These allow our website to remember choices you make (such as your language
                            or the region you are in) and provide enhanced, more personal features.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-red-800" />
                    3. Controlling Your Cookies
                </h2>
                <p>You have full control over the cookies stored on your device:</p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                        <h4 className="text-red-800 font-bold mb-3 uppercase text-xs tracking-widest">Browser Level</h4>
                        <p className="text-sm text-gray-400">
                            Most browsers allow you to block or delete cookies through their settings menu.
                            Look for the "Privacy" or "Security" tabs in your browser preferences.
                        </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                        <h4 className="text-red-800 font-bold mb-3 uppercase text-xs tracking-widest">Opt-Out Tools</h4>
                        <p className="text-sm text-gray-400">
                            You can also use tools like the DAA's WebChoices or browser extensions that
                            block trackers (e.g., uBlock Origin or Privacy Badger).
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3">
                    <EyeOff className="w-6 h-6 text-red-800" />
                    4. Do Not Track (DNT)
                </h2>
                <p>
                    While we respect privacy signals, there is currently no legal or technical
                    standard for "Do Not Track" signals. As such, our website does not alter its
                    behavior in response to these browser-based signals.
                </p>
            </section>

            <section className="mb-12">
                <h2>Questions about Tracking?</h2>
                <p>If you need more information about how we use tracking technologies:</p>
                <div className="not-prose bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-2xl mt-6">
                    <p className="font-bold text-white text-xl mb-1 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-red-800" />
                        Privacy Support
                    </p>
                    <a href="mailto:privacy@vrtechinfoinc.ca" className="text-red-800 hover:text-red-700 font-medium underline mt-2 inline-block">
                        privacy@vrtechinfoinc.ca
                    </a>
                </div>
            </section>
        </LegalLayout>
    );
}
