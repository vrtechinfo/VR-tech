"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="bg-black text-white">
      <WhatAreWeSection />
      <OurMissionSection />
      <OurVisionSection />
      <FaqSection />
    </div>
  );
}

function WhatAreWeSection() {
  return (
    <div className="pt-40 pb-20 px-4 sm:px-6 lg:px-20 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-semibold text-center mb-10">
          What are we?
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-center mb-8">
            <span className="font-bold">VRTech Info is a TRUSTED PARTNER</span> for businesses worldwide. With a passionate team of experts, 
            we have successfully delivered projects and trained professionals across various domains. Our 
            success stories include collaborating with Fortune 500 companies, helping startups scale, and 
            empowering individuals to achieve their career goals.
          </p>
          <p className="text-lg text-center">
            Our commitment to innovation, quality, and customer satisfaction has earned us a reputation as 
            a reliable technology partner. We continue to push boundaries, embrace new technologies, and 
            support our clients in navigating the ever-evolving digital landscape.
          </p>
        </div>
      </div>
    </div>
  );
}

function OurMissionSection() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-20 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-semibold text-center mb-16">
          OUR MISSION
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-full border-2 border-red-800 flex items-center justify-center p-6">
              <p className="text-center text-lg">
                Bridge the skill gap by offering top-notch training programs.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-full border-2 border-red-800 flex items-center justify-center p-6">
              <p className="text-center text-lg">
                Empower businesses with innovative technology solutions.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-full border-2 border-red-800 flex items-center justify-center p-6">
              <p className="text-center text-lg">
                Foster a culture of continuous learning and growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OurVisionSection() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-20 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-semibold text-center mb-16">
          OUR VISION
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              <div className="w-48 h-48 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center relative">
                <Image 
                  src="/globe.svg" 
                  alt="Global Leader" 
                  width={50} 
                  height={50}
                  className="absolute top-10"
                />
                <div className="absolute -bottom-12 right-0">
                  <div className="w-12 h-12 rounded-full bg-black border-2 border-orange-500 flex items-center justify-center">
                    <span className="text-orange-500">1</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 text-center">
              <p className="text-lg">
                To be a global leader in IT solutions and training.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              <div className="w-48 h-48 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center relative">
                <Image 
                  src="/window.svg" 
                  alt="Innovation" 
                  width={50} 
                  height={50}
                  className="absolute top-10"
                />
                <div className="absolute -bottom-12 right-0">
                  <div className="w-12 h-12 rounded-full bg-black border-2 border-orange-500 flex items-center justify-center">
                    <span className="text-orange-500">2</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 text-center">
              <p className="text-lg">
                Inspire innovation and drive technological advancements.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              <div className="w-48 h-48 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center relative">
                <Image 
                  src="/file.svg" 
                  alt="Client Partnerships" 
                  width={50} 
                  height={50}
                  className="absolute top-10"
                />
                <div className="absolute -bottom-12 right-0">
                  <div className="w-12 h-12 rounded-full bg-black border-2 border-orange-500 flex items-center justify-center">
                    <span className="text-orange-500">3</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 text-center">
              <p className="text-lg">
                Foster lasting client partnerships through trust & excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqSection() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    if (openQuestion === index) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(index);
    }
  };

  const faqItems = [
    {
      id: "industries",
      question: "What industries do you cater to?",
      answer: "We serve a wide range of industries including finance, healthcare, education, retail, manufacturing, and technology. Our solutions are adaptable to meet the specific needs of various sectors."
    },
    {
      id: "enrollment",
      question: "How can I enroll in your courses?",
      answer: "You can enroll in our courses through our website by visiting the Training section. Simply select your desired course, complete the registration form, and proceed with payment. For corporate training, please contact our team directly."
    },
    {
      id: "custom-solutions",
      question: "Do you offer customized software solutions?",
      answer: "Yes, we specialize in developing customized software solutions tailored to your specific business requirements. Our team works closely with you to understand your needs and create solutions that address your unique challenges."
    },
    {
      id: "support",
      question: "Is technical support available after project completion?",
      answer: "Absolutely. We provide ongoing technical support and maintenance services after project completion. We offer various support packages to ensure your systems continue to run smoothly and efficiently."
    },
    {
      id: "training-format",
      question: "Are your training programs online or offline?",
      answer: "We offer both online and offline training programs. Our online courses provide flexibility for remote learning, while our in-person training sessions offer hands-on experience. We can also arrange hybrid models based on your preferences."
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-20 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-semibold mb-10">
          FAQ
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="mb-6">Have more Questions? Reach out our Team on WhatsApp!</p>
            <button type="button" className="bg-transparent border border-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300">
              Say Hi!
            </button>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={item.id} className="border border-gray-800 rounded-lg overflow-hidden">
                <button
                  type="button"
                  className="w-full text-left p-4 flex justify-between items-center bg-gray-900"
                  onClick={() => toggleQuestion(index)}
                >
                  <span>{item.question}</span>
                  <span className="text-xl">{openQuestion === index ? '×' : '>'}</span>
                </button>
                {openQuestion === index && (
                  <div className="p-4 bg-black">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
