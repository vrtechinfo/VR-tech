"use client";

import type React from "react";

import { useRouter } from "next/navigation";

export default function Services() {
    return (
        <div className="bg-[#131313] text-white">
            <Hero />
            <ServicesSection />

        </div>
    );
}

function Hero() {
    return (
        <div className="bg-[url(/services/herobg.png)] bg-cover bg-center min-h-[700px] pt-60 px-4 relative overflow-visible pb-20">
            {/* Shape 1 - Top right */}
            <div className="absolute top-[180px] right-[150px] z-2 opacity-80">
                <img src="/shape1.png" alt="Shape 1" className="w-[650px] h-fit" />
            </div>
            
            {/* Shape 2 - Bottom left */}
            <div className="absolute top-[280px] right-[600px] opacity-80">
                <img src="/shape2.png" alt="Shape 2" className="w-[550px] h-fit " />
            </div>
            
            {/* Shape 3 - Top right */}
            <div className="absolute top-[130px] right-[250px] z-1 opacity-80">
                <img src="/shape3.png" alt="Shape 3" className="w-[150px] h-[150px]"/>
            </div>
            
            {/* Shape 4 - Bottom right */}
            <div className="absolute bottom-[150px] left-[200px] opacity-80">
                <img src="/shape4.png" alt="Shape 4" className="w-[136px] h-[136px]"/>
            </div>

            <div className="container mx-auto px-20 text-center">
                <h1 className="text-6xl font-semibold text-white relative z-10">
                    Innovative IT Solutions for Your Business Growth
                </h1>
                <p className="text-[20px] text-white mt-6 relative z-10 mx-auto max-w-3xl">
                    We offer a wide range of services tailored to meet the diverse needs of our clients. Our core services include:
                </p>
                <div className="flex justify-center mt-16 relative z-10">
                    <ContactButton>
                        Get a Free Consultation
                    </ContactButton>
                </div>
            </div>
        </div>
    );
}

function ServicesSection() {
    return (
        <div className="mt-16 bg-[#131313]">
            <div className="flex justify-center">
                <div className="text-4xl  font-medium px-5 py-2 rounded-3xl text-[#FF0000] w-fit  bg-white">
                    Our Services
                </div>
            </div>
            <SoftwareDevelopmentSection />
            <ItConsultingSection />
            <TrainingDevelopmentSection />
            <SupportMaintenanceSection />
            <DataAnalyticsSection />
            <CybersecuritySolutionsSection />
        </div>
    );
}



function SoftwareDevelopmentSection() {

    return (
        // Use React.Fragment to wrap the section and the hr
        <>
            <section id="software-development" className=" text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8">
                {/* Reduced bottom padding (pb-10) to make space for hr margin */}
                <div className="max-w-7xl mx-auto">
                    {/* Main Heading and Description */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                            Software Development {/* Hardcoded */}
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto text-white">
                            {/* Hardcoded */}
                            We create custom software solutions that drive efficiency and
                            innovation. Whether you need a robust web or mobile app,
                            enterprise-level software, or AI-driven applications, our team
                            ensures high-quality, scalable development.
                        </p>
                    </div>

                    {/* Expertise Section */}
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-semibold text-white">
                            Our Expertise {/* Hardcoded */}
                        </h3>
                    </div>

                    {/* Expertise Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* Card 1: Web & Mobile */}
                        <div className="border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Web & Mobile App
                                <br />
                                Development {/* Hardcoded */}
                            </h4>
                            <p className="text-white">
                                Scalable and user-friendly solutions
                                <br />
                                for all industries. {/* Hardcoded */}
                            </p>
                        </div>

                        {/* Card 2: Enterprise */}
                        <div className="border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Enterprise Software
                                <br />
                                Solutions {/* Hardcoded */}
                            </h4>
                            <p className="text-white">
                                Scalable and user-friendly solutions
                                <br />
                                for all industries. {/* Hardcoded */}
                            </p>
                        </div>

                        {/* Card 3: Cloud-Based */}
                        <div className="border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Cloud-Based
                                <br />
                                Applications {/* Hardcoded */}
                            </h4>
                            <p className="text-white">
                                Secure, high-performance cloud
                                <br />
                                computing solutions. {/* Hardcoded */}
                            </p>
                        </div>

                        {/* Card 4: AI & ML - Positioned specifically */}
                        <div className="md:col-start-1 lg:col-start-2 border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                AI & Machine Learning
                                <br />
                                Integration {/* Hardcoded */}
                            </h4>
                            <p className="text-white">
                                Smart systems for automation and
                                <br />
                                efficiency. {/* Hardcoded */}
                            </p>
                        </div>
                    </div>

                    {/* Consultation Button */}
                    <div className="text-center">
                        <ContactButton className="bg-[#9A0000] text-white font-medium px-8 py-3 rounded hover:bg-[#7f0000] transition-colors duration-300">
                            Get a Free Consultation
                        </ContactButton>
                    </div>
                </div>
            </section>

            {/* Horizontal Line */}
            <hr className="border-t border-gray-700 w-full mx-auto " />
            {/* Styles: border-t creates the line, border-gray-700 sets color,
           max-w-7xl mx-auto centers it matching section content width,
           my-8 adds vertical margin */}
        </>
    );
}

function ItConsultingSection() {
    return (
        // Use React.Fragment to wrap the section and the hr
        <>
            <section id="it-consulting" className=" text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Main Heading and Description */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                            IT Consulting {/* Updated */}
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto text-white">
                            {/* Updated */}
                            We help businesses navigate the ever-changing technology landscape
                            with expert IT consulting services. Our specialists provide
                            strategic advice on digital transformation, cloud computing, and
                            IT infrastructure.
                        </p>
                    </div>

                    {/* Expertise Section */}
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-semibold text-white">
                            Our Expertise {/* Consistent */}
                        </h3>
                    </div>

                    {/* Expertise Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* Card 1: Digital Transformation */}
                        <div className="border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Digital Transformation
                                <br />
                                Strategies {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Optimize your business with modern
                                <br />
                                technology. {/* Updated */}
                            </p>
                        </div>

                        {/* Card 2: Cloud Solutions */}
                        <div className="border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Cloud Solutions &<br />
                                Migration {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Secure and seamless transition to
                                <br />
                                the cloud. {/* Updated */}
                            </p>
                        </div>

                        {/* Card 3: IT Infrastructure */}
                        <div className="border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                IT Infrastructure &<br />
                                Networking {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Build a reliable and scalable IT
                                <br />
                                environment. {/* Updated */}
                            </p>
                        </div>

                        {/* Card 4: Enterprise Architecture - Positioned specifically */}
                        <div className="md:col-start-1 lg:col-start-2 border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Enterprise
                                <br />
                                Architecture Design {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Align IT with your
                                <br />
                                business goals. {/* Updated */}
                            </p>
                        </div>
                    </div>

                    {/* Consultation Button */}
                    <div className="text-center">
                        <ContactButton className="bg-[#9A0000] text-white font-medium px-8 py-3 rounded hover:bg-[#7f0000] transition-colors duration-300">
                            Talk to an Expert
                        </ContactButton>
                    </div>
                </div>
            </section>

            {/* Horizontal Line */}
            <hr className="border-t border-gray-700 w-full mx-auto " />
        </>
    );
}



function TrainingDevelopmentSection() {
    return (
        // Use React.Fragment to wrap the section and the hr
        <>
            <section id="cloud-solutions" className=" text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Main Heading and Description */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                            Training & Development {/* Updated */}
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto text-white">
                            {/* Updated */}
                            Stay ahead in the tech industry with professional training
                            programs designed for individuals and corporate teams. We offer
                            hands-on courses led by industry experts.
                        </p>
                    </div>

                    {/* Expertise Section */}
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-semibold text-white">
                            Our Expertise {/* Consistent */}
                        </h3>
                    </div>

                    {/* Expertise Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* Card 1: Software Development Bootcamps */}
                        <div className="border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Software Development
                                <br />
                                Bootcamps {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Master programming languages and
                                <br />
                                frameworks. {/* Updated */}
                            </p>
                        </div>

                        {/* Card 2: Cloud Computing & DevOps Training */}
                        <div className="border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Cloud Computing & DevOps
                                <br />
                                Training {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Learn AWS, Azure, Kubernetes, and
                                <br />
                                CI/CD pipelines. {/* Updated */}
                            </p>
                        </div>

                        {/* Card 3: AI & Data Science Workshops */}
                        <div className="border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                AI & Data Science
                                <br />
                                Workshops {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Build skills in machine learning and
                                <br />
                                big data. {/* Updated */}
                            </p>
                        </div>

                        {/* Card 4: Corporate IT Training - Positioned specifically */}
                        <div className="md:col-start-1 lg:col-start-2 border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Corporate IT Training {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Upskill your workforce for modern
                                <br />
                                technology demands. {/* Updated */}
                            </p>
                        </div>
                    </div>

                    {/* Consultation Button */}
                    <div className="text-center">
                        <ContactButton className="bg-[#9A0000] text-white font-medium px-8 py-3 rounded hover:bg-[#7f0000] transition-colors duration-300">
                            Join a Course
                        </ContactButton>
                    </div>
                </div>
            </section>

            {/* Horizontal Line - Using the specified style */}
            <hr className="border-t border-gray-700 w-full mx-auto " />
        </>
    );
}


function SupportMaintenanceSection() {
    return (
        // Use React.Fragment to wrap the section and the hr
        <>
            <section id="it-consulting" className=" text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Main Heading and Description */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                            Support & Maintenance {/* Updated */}
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto text-white">
                            {/* Updated */}
                            Ensure your business operations run smoothly with 24/7 technical
                            support and system maintenance. Our team proactively monitors,
                            troubleshoots, and secures your IT environment.
                        </p>
                    </div>

                    {/* Expertise Section */}
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-semibold text-white">
                            Our Expertise {/* Consistent */}
                        </h3>
                    </div>

                    {/* Expertise Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* Card 1: Proactive System Monitoring */}
                        <div className="border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Proactive System
                                <br />
                                Monitoring {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Identify and fix issues before they
                                <br />
                                impact operations. {/* Updated */}
                            </p>
                        </div>

                        {/* Card 2: Bug Fixes & Security Updates */}
                        <div className="border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Bug Fixes & Security
                                <br />
                                Updates {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Keep your software secure and up-
                                <br />
                                to-date. {/* Updated */}
                            </p>
                        </div>

                        {/* Card 3: Performance Optimization */}
                        <div className="border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Performance
                                <br />
                                Optimization {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Ensure fast, efficient, and reliable
                                <br />
                                system performance. {/* Simplified based on image */}
                            </p>
                        </div>

                        {/* Card 4: Disaster Recovery Solutions - Positioned specifically */}
                        <div className="md:col-start-1 lg:col-start-2 border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Disaster Recovery
                                <br />
                                Solutions {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Minimize downtime with backup and
                                <br />
                                recovery plans {/* Updated */}
                            </p>
                        </div>
                    </div>

                    {/* Consultation Button */}
                    <div className="text-center">
                        <ContactButton className="bg-[#9A0000] text-white font-medium px-8 py-3 rounded hover:bg-[#7f0000] transition-colors duration-300">
                            Get Ongoing Support
                        </ContactButton>
                    </div>
                </div>
            </section>

            {/* Horizontal Line - Using the specified style without margin */}
            <hr className="border-t border-gray-700 w-full mx-auto" />
        </>
    );
}




function DataAnalyticsSection() {
    return (
        // Use React.Fragment to wrap the section and the hr
        <>
            <section id="it-consulting" className=" text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Main Heading and Description */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                            Data Analytics {/* Updated */}
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto text-white">
                            {/* Updated */}
                            Turn raw data into actionable insights with our advanced data
                            analytics solutions. We help businesses make informed decisions
                            using cutting-edge data processing tools.
                        </p>
                    </div>

                    {/* Expertise Section */}
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-semibold text-white">
                            Our Expertise {/* Consistent */}
                        </h3>
                    </div>

                    {/* Expertise Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* Card 1: Business Intelligence & Reporting */}
                        <div className="border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Business Intelligence &<br />
                                Reporting {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Visualize trends and performance
                                <br />
                                metrics. {/* Updated */}
                            </p>
                        </div>

                        {/* Card 2: Predictive Analytics & Machine Learning */}
                        <div className="border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Predictive Analytics & Machine
                                <br />
                                Learning {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Forecast business outcomes with AI. {/* Updated */}
                            </p>
                        </div>

                        {/* Card 3: Data Warehousing & Integration */}
                        <div className="border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Data Warehousing &<br />
                                Integration {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Manage and streamline big data
                                <br />
                                storage. {/* Updated */}
                            </p>
                        </div>

                        {/* Card 4: Real-Time Data Processing - Positioned specifically */}
                        {/* Note: Text in image for card 4 description seems cut off/incorrect, adjusted slightly */}
                        <div className="md:col-start-1 lg:col-start-2 border border-gray-800 p-6 text-center">
                            <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                                Real-Time Data
                                <br />
                                Processing {/* Updated */}
                            </h4>
                            <p className="text-white">
                                Gain instant insights for quick
                                <br />
                                decision-making. {/* Adjusted based on likely intent */}
                            </p>
                        </div>
                    </div>

                    {/* Consultation Button */}
                    <div className="text-center">
                        <ContactButton className="bg-[#9A0000] text-white font-medium px-8 py-3 rounded hover:bg-[#7f0000] transition-colors duration-300">
                            Request a Demo
                        </ContactButton>
                    </div>
                </div>
            </section>

            {/* Horizontal Line - Using the specified style without margin */}
            <hr className="border-t border-gray-700 w-full mx-auto" />
        </>
    );
}

// ContactButton component to handle navigation to home page contact form
function ContactButton({ children, className = "text-center border border-white text-white px-5 py-3 rounded-2xl hover:bg-white hover:text-black transition-colors duration-300" }: {
    children: React.ReactNode;
    className?: string;
}) {
    const router = useRouter();
    
    const handleClick = () => {
        // Navigate to home page and add a hash to scroll to contact form
        router.push('/?contact=true');
    };
    
    return (
        <button 
            type="button" 
            className={className}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}

function CybersecuritySolutionsSection() {
    return (
        <section className=" text-white pt-16 pb-16 px-4 sm:px-6 lg:px-8">
            {/* Increased bottom padding since hr is removed */}
            <div className="max-w-7xl mx-auto">
                {/* Main Heading and Description */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                        Cybersecurity Solutions {/* Updated */}
                    </h2>
                    <p className="text-lg max-w-3xl mx-auto text-white">
                        {/* Updated */}
                        Protect your business from digital threats with comprehensive
                        cybersecurity strategies. Our team secures your systems, networks,
                        and data against cyber attacks.
                    </p>
                </div>

                {/* Expertise Section */}
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-semibold text-white">
                        Our Expertise {/* Consistent */}
                    </h3>
                </div>

                {/* Expertise Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {/* Card 1: Risk Assessment & Compliance */}
                    <div className="border border-gray-800 p-6 text-center">
                        <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                            Risk Assessment &<br />
                            Compliance {/* Updated */}
                        </h4>
                        <p className="text-white">
                            Identify vulnerabilities and ensure
                            <br />
                            regulatory compliance. {/* Updated */}
                        </p>
                    </div>

                    {/* Card 2: Network Security & Firewalls */}
                    <div className="border border-gray-800 p-6 text-center">
                        <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                            Network Security &<br />
                            Firewalls {/* Updated */}
                        </h4>
                        <p className="text-white">
                            Implement secure network
                            <br />
                            architecture. {/* Updated */}
                        </p>
                    </div>

                    {/* Card 3: Endpoint Protection & Incident Response */}
                    <div className="border border-gray-800 p-6 text-center">
                        <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                            Endpoint Protection & Incident
                            <br />
                            Response {/* Updated */}
                        </h4>
                        <p className="text-white">
                            Defend against malware and
                            <br />
                            cyberattacks. {/* Updated */}
                        </p>
                    </div>

                    {/* Card 4: Data Encryption & Threat Intelligence - Positioned specifically */}
                    <div className="md:col-start-1 lg:col-start-2 border border-gray-800 p-6 text-center">
                        <h4 className="text-xl font-semibold text-[#9A0000] mb-3">
                            Data Encryption & Threat
                            <br />
                            Intelligence {/* Updated */}
                        </h4>
                        <p className="text-white">
                            Prevent data breaches and cyber
                            <br />
                            threats. {/* Updated */}
                        </p>
                    </div>
                </div>

                {/* Consultation Button */}
                <div className="text-center">
                    <ContactButton className="bg-[#9A0000] text-white font-medium px-8 py-3 rounded hover:bg-[#7f0000] transition-colors duration-300">
                        Secure Your Business
                    </ContactButton>
                </div>
            </div>
        </section>
        // No <hr /> tag included here
    );
}
