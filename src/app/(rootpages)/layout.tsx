import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"


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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/vr-logo.png" type="image/png" />

        {/* Open Graph & Twitter Card */}
        <meta property="og:image" content="https://vr-tech-info.vercel.app/vr-logo.png" />
        <meta name="twitter:image" content="https://vr-tech-info.vercel.app/vr-logo.png" />
      </head>
      <body
        className={`${poppins.className} antialiased`}
      >
        {/* Organization Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "url": "https://vr-tech-info.vercel.app/",
          "logo": "https://vr-tech-info.vercel.app/vr-logo.png",
          "name": "VR Tech Info"
        }) }} />
        <Header />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
