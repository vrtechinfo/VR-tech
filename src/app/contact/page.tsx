"use client";
import type { JSX } from "react";
import Image from "next/image";

export default function ContactPage(): JSX.Element {
  return (
    <div className="bg-black text-white">
      {/* Main content with padding for header */}
      <div className="pt-40 pb-20 relative">
        {/* Background elements */}
        <div className="absolute top-40 left-20 w-40 h-40 rounded-full border-2 border-red-800 opacity-20" />
        <div className="absolute top-60 right-40 w-96 h-96 rounded-full border-2 border-red-800 opacity-20 transform rotate-45" />
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Start Your Journey With Us Today
        </h1>
        
        {/* Contact grid */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
          {/* Left column - Contact Information */}
          <div className="md:w-2/5 bg-[#2A2A2A] rounded-lg p-8 relative overflow-hidden">
            <h2 className="text-3xl font-bold mb-10">Contact Information</h2>
            
            {/* Contact details */}
            <div className="space-y-6 relative z-10">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">📞</div>
                <p className="text-xl">+1-647-447-5656</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-2xl">✉️</div>
                <p className="text-xl">info@vrtechinfoinc.com</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-2xl">🌐</div>
                <p className="text-xl">wudyfcgvbn</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-2xl mt-1">📍</div>
                <p className="text-xl">33 candlebrook Crescent,<br />Scarborough, Ontario,<br />Canada- M1W 4B3.</p>
              </div>
            </div>
            
            {/* Background circles for design */}
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-gray-700/20" />
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-gray-700/30" />
          </div>
          
          {/* Right column - Contact Form */}
          <div className="md:w-3/5 px-8 py-4">
            <form className="space-y-8">
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
                    <Image src="/file.svg" alt="Upload" width={40} height={40} className="mb-2" />
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
