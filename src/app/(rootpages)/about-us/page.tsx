"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <OurMissionSection />
      <FounderSection />
      <FaqSection />
    </div>
  );
}

function Hero() {
  return (
    <div className="bg-[url(/services/herobg.png)] bg-cover bg-center min-h-[700px] pt-40 sm:pt-48 md:pt-60 px-4 relative overflow-hidden pb-10 sm:pb-16 md:pb-20">
      {/* Shape 1 - Top right */}
      <div className="absolute top-[180px] right-[-50px] md:right-[50px] lg:right-[150px] z-2 opacity-80 scale-50 md:scale-75 lg:scale-100">
        <img src="/shape1.png" alt="Shape 1" className="w-[650px] h-fit" />
      </div>

      {/* Shape 2 - Bottom left */}
      <div className="absolute top-[280px] right-[200px] md:right-[400px] lg:right-[600px] opacity-80 scale-50 md:scale-75 lg:scale-100 hidden sm:block">
        <img src="/shape2.png" alt="Shape 2" className="w-[550px] h-fit" />
      </div>

      {/* Shape 3 - Top right */}
      <div className="absolute top-[130px] right-[100px] md:right-[180px] lg:right-[250px] z-1 opacity-80 scale-50 md:scale-75 lg:scale-100">
        <img src="/shape3.png" alt="Shape 3" className="w-[150px] h-[150px]" />
      </div>

      {/* Shape 4 - Bottom right */}
      <div className="absolute bottom-[50px] left-[50px] md:bottom-[100px] md:left-[150px] lg:bottom-[150px] lg:left-[200px] opacity-80 scale-50 md:scale-75 lg:scale-100">
        <img src="/shape4.png" alt="Shape 4" className="w-[136px] h-[136px]" />
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl text-center font-semibold text-white relative z-10">
        What are we?
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center text-white mt-6 sm:mt-10 md:mt-15 relative z-10 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
      VRTech Info is a <span className="font-bold">TRUSTED PARTNER</span> for businesses worldwide. With a passionate team of experts,
        we have successfully delivered projects and trained professionals across various domains. Our
        success stories include collaborating with Fortune 500 companies, helping startups scale, and
        empowering individuals to achieve their career goals.
      </p>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center text-white mt-4 relative z-10 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
        Our commitment to innovation, quality, and customer satisfaction has earned us a reputation as 
        a reliable technology partner. We continue to push boundaries, embrace new technologies, and 
        support our clients in navigating the ever-evolving digital landscape.
      </p>
    </div>
  );
}

function OurMissionSection() {
  return (
    <div className="w-full bg-black py-24 px-4 sm:px-6 lg:px-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-red-500 to-red-700 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
            Our Purpose
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          {/* Mission Section */}
          <div className="group p-8 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800 
                        hover:border-red-800 transition-all duration-500 ease-in-out 
                        hover:shadow-[0_0_25px_rgba(255,0,0,0.1)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-labelledby="missionTitle">
                    <title id="missionTitle">Mission Icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold ml-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                To empower businesses through innovative technology solutions and expert guidance. 
                We strive to deliver exceptional value by combining cutting-edge technology with 
                industry best practices, enabling our clients to achieve their digital transformation 
                goals and stay ahead in the competitive landscape.
              </p>
            </div>
          </div>

          {/* Vision Section */}
          <div className="group p-8 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800 
                        hover:border-red-800 transition-all duration-500 ease-in-out 
                        hover:shadow-[0_0_25px_rgba(255,0,0,0.1)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-labelledby="visionTitle">
                    <title id="visionTitle">Vision Icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold ml-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                  Our Vision
                </h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                To be a global leader in technology solutions and professional development, 
                recognized for our commitment to excellence, innovation, and client success. 
                We envision a future where technology bridges gaps, creates opportunities, 
                and drives sustainable growth for businesses worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



function FounderSection() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-20 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Founder image with glossy effect */}
          <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-lg" 
               style={{
                 background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 100%)',
                 boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                 backdropFilter: 'blur(5px)',
                 borderTop: '1px solid rgba(255,255,255,0.3)',
                 borderLeft: '1px solid rgba(255,255,255,0.3)',
                 borderRight: '1px solid rgba(0,0,0,0.1)',
                 borderBottom: '1px solid rgba(0,0,0,0.1)'
               }}>
            <div className="relative h-full">
              <Image
                src="/founder.png"
                alt="Vivek Reddy - Founder"
                width={400}
                height={500}
                className="w-full h-full object-cover"
              />
              {/* Glossy caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4"
                   style={{
                     background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
                     backdropFilter: 'blur(5px)',
                   }}>
                <div className="flex items-center">
                  <p className="text-white font-semibold text-lg ml-10 mr-2">Vivek Reddy</p>
                  
                  <div className="flex items-center">
                    <div className="h-5 w-px bg-gray-500 mx-2" />
                    <span className="text-gray-300 text-lg mr-2">Director at</span>
                    <Image
                      src="/vr-logo.png"
                      alt="VR Tech Logo"
                      width={50}
                      height={50}
                      className="ml-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content with glossy effect */}
          <div className="w-full md:w-2/3 rounded-xl overflow-hidden p-8 flex flex-col justify-center"
               style={{
                 background: 'linear-gradient(135deg, rgba(30,30,30,0.7) 0%, rgba(10,10,10,0.4) 100%)',
                 boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                 backdropFilter: 'blur(5px)',
                 borderTop: '1px solid rgba(255,255,255,0.2)',
                 borderLeft: '1px solid rgba(255,255,255,0.2)',
                 borderRight: '1px solid rgba(0,0,0,0.1)',
                 borderBottom: '1px solid rgba(0,0,0,0.1)'
               }}>
            <h2 className="text-3xl font-bold mb-4">
              Meet the Visionary Behind<br />
              <span className="text-4xl">VR Tech Info</span>
            </h2>
            
            <p className="text-gray-300 mb-6">
              Discover the inspiring journey of Vivek Reddy, the founder of VR Tech 
              Info. With a passion for Tech, Vivek Reddy embarked on a mission to 
              make Tech Solutions accessible to everyone. Their innovative approach 
              and leadership have been the driving force behind VRTech Info's 
              success, shaping it into a trailblazer in Tech industry.
            </p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-0 items-start">
          {/* Left side - Heading, text and button */}
          <div className="self-center md:sticky md:top-20">
            <h2 className="text-5xl font-semibold mb-8">
              FAQ's
            </h2>
            <div className="pr-6">
              <p className="mb-4 text-xl">Have more Questions? Reach out our Team!</p>
              <button type="button" className="bg-transparent border border-gray-600 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300 text-lg">
                Say Hi!
              </button>
            </div>
          </div>

          {/* Right side - Accordion */}
          <div className="space-y-3">
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
