"use client";
import type { JSX } from "react";
import Image from "next/image";

export default function ContactPage(): JSX.Element {
  return (
    <div className="bg-black text-white">
      {/* Main content with padding for header */}
      <div className="bg-[url(/services/herobg.png)] bg-cover bg-center min-h-[700px] pt-60 px-4 relative overflow-visible pb-20">
        {/* Background elements */}
        {/* Shape 1 - Top right */}
        <div className="absolute top-[80px] right-[150px] z-2 opacity-80">
          <img src="/shape1.png" alt="Shape 1" className="w-[650px] h-fit" />
        </div>

        {/* Shape 2 - Bottom left */}
        <div className="absolute top-[180px] right-[600px] opacity-80">
          <img src="/shape2.png" alt="Shape 2" className="w-[550px] h-fit " />
        </div>

        {/* Shape 3 - Top right */}
        <div className="absolute top-[30px] right-[250px] z-1 opacity-80">
          <img src="/shape3.png" alt="Shape 3" className="w-[150px] h-[150px]" />
        </div>

        {/* Shape 4 - Bottom right */}
        <div className="absolute bottom-[150px] left-[200px] opacity-80">
          <img src="/shape4.png" alt="Shape 4" className="w-[136px] h-[136px]" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-semibold text-center mb-16 relative z-10">
          Start Your Journey With Us Today
        </h1>

        {/* Contact grid */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row relative z-10">
          {/* Left column - Contact Information */}
          <div className="md:w-2/5 bg-[#FFFFFF]/30 p-8 relative overflow-hidden rounded-l-lg flex flex-col justify-between">
            <h2 className="text-3xl font-bold mb-10">Contact Information</h2>

            {/* Contact details */}
            <div className="space-y-6 relative z-10 bottom-50 left-10">
              <div className="flex items-center space-x-4">
                <Image src="/phone.png" alt="Phone" width={24} height={24} />
                <p className="text-xl">+1-647-447-5656</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Image src="/Email.png" alt="Email" width={24} height={24} />
                <p className="text-xl">info@vrtechinfoinc.com</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Image src="/Globe.png" alt="Globe" width={24} height={24} />
                <p className="text-xl">wudyfcgvbn</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <Image src="/Location.png" alt="Location" width={24} height={24} className="mt-1" />
                <p className="text-xl">33 candlebrook Crescent,<br />Scarborough, Ontario,<br />Canada- M1W 4B3.</p>
              </div>
            </div>

            {/* Background circles for design */}
            <div className="absolute bottom-0 right-[-70] w-50 h-50 rounded-full bg-gray-700/20" />
            <div className="absolute bottom-20 right-15 w-32 h-32 rounded-full bg-gray-700/30" />
          </div>

          {/* Right column - Contact Form */}
          <div className="md:w-3/5 p-8 bg-gray-300/10 rounded-r-lg">
            <form className="space-y-8 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name*</label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-2 bg-transparent border-b border-gray-400 focus:border-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name*</label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-2 bg-transparent border-b border-gray-400 focus:border-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email*</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-transparent border-b border-gray-400 focus:border-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone No.*</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 bg-transparent border-b border-gray-400 focus:border-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium mb-2">Upload CV/Resume*</label>
                <div className="border border-gray-400 rounded-md p-4 text-center cursor-pointer hover:bg-gray-800/20 transition-colors">
                  <div className="flex flex-col items-center">
                    <Image src="/Upload.png" alt="Upload" width={40} height={40} className="mb-2" />
                    <p className="text-sm text-gray-400">Click or drag a file to Upload</p>
                  </div>
                  <input
                    type="file"
                    id="resume"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message*</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 bg-transparent border-b border-gray-400 focus:border-white focus:outline-none resize-none"
                  required
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-8 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
