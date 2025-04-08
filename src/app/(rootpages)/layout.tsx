import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";
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
      <body
        className={`${poppins.className} antialiased`}
      ><Header />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
