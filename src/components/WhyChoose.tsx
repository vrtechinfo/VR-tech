import type { JSX } from "react";
import { CheckCircle } from "lucide-react";

export default function WhyChooseUs(): JSX.Element {
    return (
        <div
            className="relative min-h-[700px] sm:min-h-[800px] md:min-h-[1000px] lg:min-h-[1390px] w-full overflow-hidden text-white"
            style={{
                backgroundColor: '#191919',
                backgroundImage: "url(/chooseus.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center right",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "scroll"
            }}
        >
            {/* Decorative background image */}
            <div
                aria-hidden="true"
                className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
                style={{
                    backgroundImage: 'url(/whychooseus.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '380px',
                    opacity: 0.3,
                    width: '380px',
                    height: '380px',
                }}
            />
            <div className="flex flex-col items-center justify-center w-full h-full px-4 py-12 sm:py-20 relative z-10">
                <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl lg:text-[66px] text-center mb-10 tracking-wide drop-shadow-lg">
                    Why Choose Us?
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mt-50">
                    <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center text-lg sm:text-xl md:text-2xl font-light shadow-lg backdrop-blur-sm">
                        <CheckCircle className="text-red-600 w-10 h-10 mb-2" />
                        <div className="mt-4 text-center">Expert Trainers with Industry Experience</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center text-lg sm:text-xl md:text-2xl font-light shadow-lg backdrop-blur-sm">
                        <CheckCircle className="text-red-600 w-10 h-10 mb-2" />
                        <div className="mt-4 text-center">Hands-On Projects and Real-World Scenarios</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center text-lg sm:text-xl md:text-2xl font-light shadow-lg backdrop-blur-sm">
                        <CheckCircle className="text-red-600 w-10 h-10 mb-2" />
                        <div className="mt-4 text-center">Personalized Learning Paths and Support</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center text-lg sm:text-xl md:text-2xl font-light shadow-lg backdrop-blur-sm">
                        <CheckCircle className="text-red-600 w-10 h-10 mb-2" />
                        <div className="mt-4 text-center">Access to Cutting-Edge Tools and Technologies</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center text-lg sm:text-xl md:text-2xl font-light shadow-lg backdrop-blur-sm">
                        <CheckCircle className="text-red-600 w-10 h-10 mb-2" />
                        <div className="mt-4 text-center">Certification on Course Completion</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center text-lg sm:text-xl md:text-2xl font-light shadow-lg backdrop-blur-sm">
                        <CheckCircle className="text-red-600 w-10 h-10 mb-2" />
                        <div className="mt-4 text-center">Flexible Schedules for Working Professionals</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center text-lg sm:text-xl md:text-2xl font-light shadow-lg backdrop-blur-sm">
                        <CheckCircle className="text-red-600 w-10 h-10 mb-2" />
                        <div className="mt-4 text-center">24/7 Student Support</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center text-lg sm:text-xl md:text-2xl font-light shadow-lg backdrop-blur-sm lg:col-span-2">
                        <CheckCircle className="text-red-600 w-10 h-10 mb-2" />
                        <div className="mt-4 text-center">Innovation and creativity are our secrets to web designing and development success</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

