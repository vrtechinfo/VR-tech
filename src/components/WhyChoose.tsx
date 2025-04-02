import type { JSX } from "react";
import Image from "next/image";

export default function WhyChooseUs(): JSX.Element {
    return (
        <div className="bg-[url(/chooseus.webp)] min-h-[700px] sm:min-h-[800px] md:min-h-[1000px] lg:min-h-[1390px] w-full overflow-hidden bg-cover bg-right sm:bg-right-top md:bg-center text-white">
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[66px] pl-4 sm:pl-10 md:pl-20 lg:pl-30 pt-8 sm:pt-12 md:pt-16 lg:pt-20 tracking-wide">
                Why Choose Us?
            </h1>
            <div className="flex justify-center pt-5 ml-0 sm:ml-[200px] md:ml-[400px] lg:ml-[600px] px-4 sm:px-0">
                <div className="text-lg sm:text-xl md:text-2xl font-light">
                    <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                        <ChooseIcon />
                        <div>Expert Trainers with Industry Experience</div>
                    </div>
                    <div className="flex items-center pl-0 sm:pl-8 md:pl-12 lg:pl-20 pt-6 sm:pt-10 md:pt-15 lg:pt-20 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                        <ChooseIcon />
                        <div>Hands-On Projects and Real-World Scenarios</div>
                    </div>
                    <div className="flex items-center pl-0 sm:pl-16 md:pl-24 lg:pl-40 pt-6 sm:pt-10 md:pt-15 lg:pt-20 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                        <ChooseIcon />
                        <div>Access to Cutting-Edge Tools and Technologies</div>
                    </div>
                    <div className="flex items-center pl-0 sm:pl-20 md:pl-30 lg:pl-50 pt-6 sm:pt-10 md:pt-15 lg:pt-20 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                        <ChooseIcon />
                        <div>Certification on Course Completion</div>
                    </div>
                    <div className="flex items-center pl-0 sm:pl-16 md:pl-24 lg:pl-40 pt-6 sm:pt-10 md:pt-15 lg:pt-20 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                        <ChooseIcon />
                        <div>Flexible Schedules for Working Professionals</div>
                    </div>
                    <div className="flex items-center pl-0 sm:pl-8 md:pl-12 lg:pl-20 pt-6 sm:pt-10 md:pt-15 lg:pt-20 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                        <ChooseIcon />
                        <div>24/7 Student Support</div>
                    </div>
                    <div className="flex items-center pt-6 sm:pt-10 md:pt-15 lg:pt-20 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                        <ChooseIcon />
                        <div className="pr-2 sm:pr-4">
                            Innovation and creativity are our secrets to web designing and development success
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function ChooseIcon(): JSX.Element {
    return <Image src={"/chooseicon.png"} alt="" height={41} width={41} />;
}
