import type { JSX } from "react";
import Image from "next/image";

export default function Features(): JSX.Element {
    return (
        <div className="bg-[url(/features-bg.webp)] bg-[#111324] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[691px] w-full bg-cover bg-center text-white pt-2 sm:pt-4 md:pt-6 lg:pt-8 pb-8 sm:pb-12 md:pb-16">
            <div className="flex justify-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] text-[#E2E2E2] pt-4 sm:pt-6 md:pt-8 lg:pt-11 pl-2 font-normal self-center">
                    Features
                </h1>
            </div>

            <div className="flex flex-col md:flex-row justify-center md:gap-10 lg:gap-20 xl:gap-40 pt-10 sm:pt-15 md:pt-20 lg:pt-25 px-4 sm:px-6 md:px-8">
                <div className="mb-12 md:mb-0 md:w-3/4 mx-auto">
                    <div className="flex items-center justify-center">
                        <Image src={"/Smart.png"} width={59} height={59} alt="Smart icon" />
                    </div>
                    <h1 className="text-2xl sm:text-2xl md:text-3xl text-center pt-3 sm:pt-4 md:pt-5">Qualified Team</h1>
                    <div className="text-base sm:text-lg md:text-xl lg:text-[20px] font-light text-center pt-4 sm:pt-6 md:pt-8 lg:pt-10 px-4 w-3/4 mx-auto">
                        <p>Expert designers and developers with experience in top brand websites and apps.</p>
                    </div>
                </div>

                <div className="mb-12 md:mb-0 md:w-3/4 mx-auto">
                    <div className="flex items-center justify-center">
                        <Image src={"/Award.png"} width={59} height={59} alt="Award icon" />
                    </div>
                    <h1 className="text-2xl sm:text-2xl md:text-3xl text-center pt-3 sm:pt-4 md:pt-5">Smart Solutions</h1>
                    <div className="text-base sm:text-lg md:text-xl lg:text-[20px] font-light text-center pt-4 sm:pt-6 md:pt-8 lg:pt-10 px-4 w-3/4 mx-auto">
                        <p>We're a leading website design and development agency, providing expert solutions with personalized projects.</p>
                    </div>
                </div>

                <div className="mb-6 md:mb-0 md:w-3/4 mx-auto">
                    <div className="flex items-center justify-center">
                        <Image src={"/Bulb.png"} width={59} height={59} alt="Bulb icon" />
                    </div>
                    <h1 className="text-2xl sm:text-2xl md:text-3xl text-center pt-3 sm:pt-4 md:pt-5">Dedicated support</h1>
                    <div className="text-base sm:text-lg md:text-xl lg:text-[20px] font-light text-center pt-4 sm:pt-6 md:pt-8 lg:pt-10 px-4 w-3/4 mx-auto">
                        <p>We provide timely support via emails, calls, and in-person visits, going the extra mile to meet your needs.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

