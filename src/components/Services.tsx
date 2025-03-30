import type { JSX } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function Services(): JSX.Element {
    return (
        <div className="text-base sm:text-lg md:text-[20px]">
            <h1
                className="text-center pt-10 sm:pt-15 md:pt-20 lg:pt-30 pb-8 sm:pb-12 md:pb-16 lg:pb-20 text-4xl sm:text-5xl md:text-6xl font-semibold
          [text-shadow:_2px_2px_4px_rgba(0,0,0,0.4)]"
            >
                Our Services
            </h1>
            <div className="pt-5 sm:pt-8 md:pt-10 flex justify-center px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
                    {/* First Row */}
                    <div className="text-center border-b sm:border-r p-4 sm:p-6 md:p-8 lg:p-10">
                        <Image
                            src="/computer.png"
                            width={253}
                            height={213}
                            alt="Software Development"
                            className="mx-auto w-auto h-auto max-h-[150px] md:max-h-[180px] lg:max-h-[213px]"
                        />
                        <div className="mt-4 space-y-1 sm:space-y-2">
                            <h1 className="text-[#0F3775] text-xl sm:text-2xl md:text-3xl font-semibold">
                                Software Development
                            </h1>
                            <p className="px-2">End-to-end custom software solutions for businesses, including web and mobile app development</p>
                        </div>
                    </div>
                    <div className="text-center border-b p-4 sm:p-6 md:p-8 lg:p-10 sm:border-r-0 lg:border-r">
                        <Image
                            src="/it-consulting.png"
                            width={266}
                            height={210}
                            alt="IT Consulting"
                            className="mx-auto w-auto h-auto max-h-[150px] md:max-h-[180px] lg:max-h-[210px]"
                        />
                        <div className="mt-4 space-y-1 sm:space-y-2">
                            <h1 className="text-[#0F3775] text-xl sm:text-2xl md:text-3xl font-semibold">
                                IT Consulting
                            </h1>
                            <p className="px-2">Expert guidance on digital transformation, cloud solutions, and IT infrastructure.</p>
                        </div>
                    </div>
                    <div className="text-center border-b p-4 sm:p-6 md:p-8 lg:p-10 sm:border-b-0 lg:border-b">
                        <Image
                            src="/training.png"
                            width={309}
                            height={214}
                            alt="Training & Development"
                            className="mx-auto w-auto h-auto max-h-[150px] md:max-h-[180px] lg:max-h-[214px]"
                        />
                        <div className="mt-4 space-y-1 sm:space-y-2">
                            <h1 className="text-[#0F3775] text-xl sm:text-2xl md:text-3xl font-semibold">
                                Training & Development
                            </h1>
                            <p className="px-2">Professional courses in software development, cloud computing, and DevOps.</p>
                        </div>
                    </div>
                    {/* Second Row */}
                    <div className="text-center p-4 sm:p-6 md:p-8 lg:p-10 sm:border-r border-b sm:border-b-0">
                        <Image
                            src="/support.png"
                            width={281}
                            height={213}
                            alt="Support & Maintenance"
                            className="mx-auto w-auto h-auto max-h-[150px] md:max-h-[180px] lg:max-h-[213px]"
                        />
                        <div className="mt-4 space-y-1 sm:space-y-2">
                            <h1 className="text-[#0F3775] text-xl sm:text-2xl md:text-3xl font-semibold">
                                Support & Maintenance
                            </h1>
                            <p className="px-2">24/7 technical support and system maintenance to ensure seamless operations.</p>
                        </div>
                    </div>
                    <div className="text-center p-4 sm:p-6 md:p-8 lg:p-10 sm:border-r-0 lg:border-r border-b sm:border-b-0">
                        <Image
                            src="/analytics.png"
                            width={308}
                            height={218}
                            alt="Data Analytics"
                            className="mx-auto w-auto h-auto max-h-[150px] md:max-h-[180px] lg:max-h-[218px]"
                        />
                        <div className="mt-4 space-y-1 sm:space-y-2">
                            <h1 className="text-[#0F3775] text-xl sm:text-2xl md:text-3xl font-semibold">
                                Data Analytics
                            </h1>
                            <p className="px-2">Advanced data solutions to help businesses make data-driven decisions.</p>
                        </div>
                    </div>
                    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                        <div className="flex flex-col items-center justify-center text-center min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px]">
                            <Image
                                src="/cybersecurity.png"
                                width={320}
                                height={190}
                                alt="CyberSecurity Solutions"
                                className="mx-auto w-auto h-auto max-h-[150px] md:max-h-[170px] lg:max-h-[190px]"
                            />
                            <div className="mt-4 space-y-1 sm:space-y-2">
                                <h1 className="text-[#0F3775] text-xl sm:text-2xl md:text-3xl font-semibold">
                                    CyberSecurity Solutions
                                </h1>
                                <p className="px-2">Robust security strategies to protect businesses from digital threats.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-8 sm:my-12 md:my-16 lg:my-20">
                <Marquee autoFill>
                    <Badges text="Website Development" />
                    <Badges text="Mobile Application Development" />
                </Marquee>
            </div>
        </div>
    );
}

interface BadgesProps {
    text: string;
}

const Badges: React.FC<Readonly<BadgesProps>> = ({ text }) => {
    return (
        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium border-2 rounded-4xl mx-4 sm:mx-6 md:mx-8 lg:mx-10 py-2 sm:py-[10px] px-4 sm:px-[20px] md:px-[29px]">
            {text}
        </h1>
    );
};
