import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "VR Tech Info | IT Consulting & Technology Solutions",
    description: "VR Tech Info provides expert IT consulting, cybersecurity, training, and technology solutions to help businesses innovate and grow. Professional IT services across USA, Canada, and India.",
    icons: {
        icon: "/favicon.png",
    },
};

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://vrtechinfoinc.com";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <head>
                {/* Favicon */}
                <link rel="icon" href="/favicon.png" type="image/png" />

                {/* Open Graph & Twitter Card */}
                <meta property="og:image" content={`${siteUrl}/vr-logo.png`} />
                <meta name="twitter:image" content={`${siteUrl}/vr-logo.png`} />

                {/* Suppress MetaMask/Extension Errors */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                const originalError = console.error;
                                console.error = function(...args) {
                                    if (args[0] && typeof args[0] === 'string' && 
                                        (args[0].includes('MetaMask') || 
                                         args[0].includes('nkbihfbeogaeaoehlefnkodbefgpgknn') ||
                                         args[0].includes('inpage.js'))) {
                                        return;
                                    }
                                    originalError.apply(console, args);
                                };
                                window.addEventListener('unhandledrejection', function(event) {
                                    if (event.reason && 
                                        ((event.reason.message && event.reason.message.includes('MetaMask')) || 
                                         (event.reason.stack && event.reason.stack.includes('metamask')) ||
                                         (event.reason.message && event.reason.message.includes('nkbihfbeogaeaoehlefnkodbefgpgknn')))) {
                                        event.preventDefault();
                                        event.stopPropagation();
                                    }
                                }, true);
                            })();
                        `,
                    }}
                />
            </head>
            <body className={`${poppins.className} antialiased`}>
                {/* Organization Structured Data */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "url": siteUrl,
                        "logo": `${siteUrl}/vr-logo.png`,
                        "name": "VR Tech Info"
                    })
                }} />

                {children}
            </body>
        </html>
    );
}
