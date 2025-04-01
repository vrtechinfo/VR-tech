import type { JSX } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function Services(): JSX.Element {
    return (
        <div className="text-sm sm:text-base bg-[#191919] text-white">
            <h1
                className="text-center pt-10 sm:pt-15 md:pt-20 lg:pt-30 pb-8 sm:pb-12 md:pb-16 lg:pb-20 text-4xl sm:text-5xl md:text-6xl font-semibold
          [text-shadow:_2px_2px_4px_rgba(0,0,0,0.4)]"
            >
                Our Services
            </h1>
            <div className="pt-5 sm:pt-8 md:pt-10 flex justify-center px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl gap-0">
                    {/* Service Cards */}
                    <ServiceCard 
                        imageSrc="/computer.png" 
                        imageWidth={253} 
                        imageHeight={213} 
                        title="Software Development" 
                        description="End-to-end custom software solutions for businesses, including web and mobile app development"
                        className="border-b sm:border-r"
                    />
                    <ServiceCard 
                        imageSrc="/it-consulting.png" 
                        imageWidth={266} 
                        imageHeight={210} 
                        title="IT Consulting" 
                        description="Expert guidance on digital transformation, cloud solutions, and IT infrastructure."
                        className="border-b sm:border-r-0 lg:border-r"
                    />
                    <ServiceCard 
                        imageSrc="/training.png" 
                        imageWidth={309} 
                        imageHeight={214} 
                        title="Training & Development" 
                        description="Professional courses in software development, cloud computing, and DevOps."
                        className="border-b"
                    />
                    <ServiceCard 
                        imageSrc="/support.png" 
                        imageWidth={281} 
                        imageHeight={213} 
                        title="Support & Maintenance" 
                        description="24/7 technical support and system maintenance to ensure seamless operations."
                        className="border-b sm:border-b-0 sm:border-r"
                    />
                    <ServiceCard 
                        imageSrc="/analytics.png" 
                        imageWidth={308} 
                        imageHeight={218} 
                        title="Data Analytics" 
                        description="Advanced data solutions to help businesses make data-driven decisions."
                        className="border-b sm:border-b-0 sm:border-r-0 lg:border-r"
                    />
                    <ServiceCard 
                        imageSrc="/cybersecurity.png" 
                        imageWidth={320} 
                        imageHeight={190} 
                        title="CyberSecurity Solutions" 
                        description="Robust security strategies to protect businesses from digital threats."
                        className=""
                    />
                </div>
            </div>
            <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 mb-0">
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

interface ServiceCardProps {
    imageSrc: string;
    imageWidth: number;
    imageHeight: number;
    title: string;
    description: string;
    className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
    imageSrc, 
    imageWidth, 
    imageHeight, 
    title, 
    description,
    className = ""
}) => {
    return (
        <div className={`p-4 sm:p-6 md:p-8 lg:p-10 ${className}`}>
            <div className="flex flex-col items-center">
                {/* Image container with fixed height */}
                <div className="h-[160px] w-full flex items-center justify-center mb-6">
                    <Image
                        src={imageSrc}
                        width={imageWidth}
                        height={imageHeight}
                        alt={title}
                        className="w-auto h-auto max-h-[160px] object-contain"
                    />
                </div>
                
                {/* Content container with fixed height */}
                <div className="h-[150px] w-full flex flex-col items-center">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-center">
                        {title}
                    </h1>
                    <p className="text-center w-full px-2">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};
