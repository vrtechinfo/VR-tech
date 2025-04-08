"use client";
import type { JSX } from "react";
import Image from "next/image";
import CareerForm from "@/components/CareerForm";

// Career Hero Component
function CareerHero(): JSX.Element {
  return (
    <div>
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-semibold text-center mb-10 relative z-10">
        Start Your Journey With Us Today
      </h1>
    </div>
  );
}

// Team Join Component
function TeamJoinSection(): JSX.Element {
  return (
    <div className="max-w-6xl mx-auto mb-16 relative z-10">
      <div className="bg-[#000000]/70 p-8 rounded-lg border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center">Join Our Team</h2>
        <p className="text-lg text-center max-w-4xl mx-auto mb-8">
          At VR Tech Info, we're driven by a shared passion for innovation and excellence. We foster
          collaboration, innovation and growth, empowering individuals to contribute and
          thrive with us and be part of a team dedicated to shaping the future of technology.
        </p>
        <div className="w-full overflow-hidden rounded-lg">
          <img
            src="/team1.webp"
            alt="Our Team"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}

// Job Vacancies Component
function JobVacanciesSection(): JSX.Element {
  return (
    <div className="max-w-6xl mx-auto mb-16 relative z-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Job Vacancies At VRTECH Info</h2>

      {/* Search bar */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <div className="relative flex items-center bg-gray-800/50 rounded-md px-4 py-2 min-w-[200px]">
          <span className="mr-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Time icon">
              <title>Time icon</title>
              <path d="M12 6V12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Industry, department..."
            className="bg-transparent border-0 outline-none text-white w-full"
          />
        </div>

        <div className="relative flex items-center bg-gray-800/50 rounded-md px-4 py-2 min-w-[150px]">
          <span className="mr-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Add icon">
              <title>Add icon</title>
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" />
              <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Country"
            className="bg-transparent border-0 outline-none text-white w-full"
          />
        </div>

        <div className="relative flex items-center bg-gray-800/50 rounded-md px-4 py-2 min-w-[150px]">
          <span className="mr-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Location icon">
              <title>Location icon</title>
              <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" strokeWidth="2" />
              <path d="M19 10C19 15.5 12 20 12 20C12 20 5 15.5 5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10Z" stroke="white" strokeWidth="2" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Location"
            className="bg-transparent border-0 outline-none text-white w-full"
          />
        </div>

        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" aria-label="Search icon">
            <title>Search icon</title>
            <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
            <path d="M20 20L16 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Search
        </button>
      </div>

      {/* Job listings */}
      <div className="space-y-4">
        {/* Job 1 */}
        <div className="bg-gray-800/30 rounded-lg overflow-hidden">
          <div className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">UI/UX Designer</h3>
              <p className="text-gray-400">VR Tech Info</p>
            </div>
            <button type="button" className="text-blue-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Expand details">
                <title>Expand details</title>
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-3 divide-x divide-gray-700">
            <div className="p-3 flex flex-col items-center">
              <h4 className="text-sm text-gray-400">Work Type</h4>
              <p className="flex items-center mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" aria-label="Calendar icon">
                  <title>Calendar icon</title>
                  <rect x="4" y="5" width="16" height="16" rx="2" stroke="white" strokeWidth="2" />
                  <path d="M16 2V5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 2V5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 9H20" stroke="white" strokeWidth="2" />
                </svg>
                Remote
              </p>
            </div>
            <div className="p-3 flex flex-col items-center">
              <h4 className="text-sm text-gray-400">Job Type</h4>
              <p className="flex items-center mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" aria-label="Clock icon">
                  <title>Clock icon</title>
                  <path d="M12 6V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
                </svg>
                Internship
              </p>
            </div>
            <div className="p-3 flex flex-col items-center">
              <h4 className="text-sm text-gray-400">Location</h4>
              <p className="flex items-center mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" aria-label="Pin location icon">
                  <title>Pin location icon</title>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" strokeWidth="2" />
                  <path d="M19 10C19 15.5 12 20 12 20C12 20 5 15.5 5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10Z" stroke="white" strokeWidth="2" />
                </svg>
                Hyderabad
              </p>
            </div>
          </div>
          <div className="bg-gray-800/40 p-3 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-sm text-gray-400 mr-2">Experience:</span>
              <span className="text-sm">0-1 Yrs</span>
            </div>
          </div>
        </div>

        {/* Job 2 */}
        <div className="bg-gray-800/30 rounded-lg overflow-hidden">
          <div className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">UI/UX Designer</h3>
              <p className="text-gray-400">VR Tech Info</p>
            </div>
            <button type="button" className="text-blue-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Expand details">
                <title>Expand details</title>
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-3 divide-x divide-gray-700">
            <div className="p-3 flex flex-col items-center">
              <h4 className="text-sm text-gray-400">Work Type</h4>
              <p className="flex items-center mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" aria-label="Calendar icon">
                  <title>Calendar icon</title>
                  <rect x="4" y="5" width="16" height="16" rx="2" stroke="white" strokeWidth="2" />
                  <path d="M16 2V5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 2V5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 9H20" stroke="white" strokeWidth="2" />
                </svg>
                Remote
              </p>
            </div>
            <div className="p-3 flex flex-col items-center">
              <h4 className="text-sm text-gray-400">Job Type</h4>
              <p className="flex items-center mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" aria-label="Clock icon">
                  <title>Clock icon</title>
                  <path d="M12 6V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
                </svg>
                Internship
              </p>
            </div>
            <div className="p-3 flex flex-col items-center">
              <h4 className="text-sm text-gray-400">Location</h4>
              <p className="flex items-center mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" aria-label="Pin location icon">
                  <title>Pin location icon</title>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" strokeWidth="2" />
                  <path d="M19 10C19 15.5 12 20 12 20C12 20 5 15.5 5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10Z" stroke="white" strokeWidth="2" />
                </svg>
                Hyderabad
              </p>
            </div>
          </div>
          <div className="bg-gray-800/40 p-3 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-sm text-gray-400 mr-2">Experience:</span>
              <span className="text-sm">0-1 Yrs</span>
            </div>
          </div>
        </div>

        {/* Job 3 */}
        <div className="bg-gray-800/30 rounded-lg overflow-hidden">
          <div className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">UI/UX Designer</h3>
              <p className="text-gray-400">VR Tech Info</p>
            </div>
            <button type="button" className="text-blue-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Expand details">
                <title>Expand details</title>
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-3 divide-x divide-gray-700">
            <div className="p-3 flex flex-col items-center">
              <h4 className="text-sm text-gray-400">Work Type</h4>
              <p className="flex items-center mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" aria-label="Calendar icon">
                  <title>Calendar icon</title>
                  <rect x="4" y="5" width="16" height="16" rx="2" stroke="white" strokeWidth="2" />
                  <path d="M16 2V5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 2V5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 9H20" stroke="white" strokeWidth="2" />
                </svg>
                Remote
              </p>
            </div>
            <div className="p-3 flex flex-col items-center">
              <h4 className="text-sm text-gray-400">Job Type</h4>
              <p className="flex items-center mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" aria-label="Clock icon">
                  <title>Clock icon</title>
                  <path d="M12 6V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
                </svg>
                Internship
              </p>
            </div>
            <div className="p-3 flex flex-col items-center">
              <h4 className="text-sm text-gray-400">Location</h4>
              <p className="flex items-center mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2" aria-label="Pin location icon">
                  <title>Pin location icon</title>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" strokeWidth="2" />
                  <path d="M19 10C19 15.5 12 20 12 20C12 20 5 15.5 5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10Z" stroke="white" strokeWidth="2" />
                </svg>
                Hyderabad
              </p>
            </div>
          </div>
          <div className="bg-gray-800/40 p-3 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-sm text-gray-400 mr-2">Experience:</span>
              <span className="text-sm">0-1 Yrs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Why Choose VR Tech Info Component
function WhyChooseSection(): JSX.Element {
  return (
    <div className="max-w-6xl mx-auto mb-16 relative z-10">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="lg:w-1/3">
          <img
            src="/team2.webp"
            alt="Team meeting"
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
        <div className="lg:w-2/3">
          <h2 className="text-3xl font-bold mb-6">Why Choose VR Tech Info?</h2>
          <p className="text-lg mb-6">
            At VR Tech Info, we offer the chance to work on innovative VR and tech
            projects that make an impact, with a collaborative, inclusive team with
            opportunities for career growth, mentorship, and a flexible work-life
            balance. Ready to shape the future? Apply today!
          </p>
        </div>
      </div>
    </div>
  );
}

// Career Contact Component
function ContactSection(): JSX.Element {
  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row relative z-10">
      {/* Left column - Contact Information */}
      <div className="md:w-2/5 bg-[#FFFFFF]/30 p-8 relative overflow-hidden rounded-l-lg flex flex-col">
        <h2 className="text-3xl font-bold mb-10">Company Information</h2>

        {/* Contact details */}
        <div className="flex-grow flex flex-col justify-center z-10 px-4">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Image src="/phone.png" alt="Phone" width={24} height={24} />
              <p className="text-xl">+1-647-447-5656</p>
            </div>

            <div className="flex items-center space-x-4">
              <Image src="/Email.png" alt="Email" width={24} height={24} />
              <p className="text-xl">careers@vrtechinfoinc.com</p>
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
        </div>

        {/* Background circles for design - keeping these absolute for the visual effect */}
        <div className="absolute bottom-0 right-[-70px] w-[200px] h-[200px] rounded-full bg-gray-700/20" />
        <div className="absolute bottom-[80px] right-[60px] w-[128px] h-[128px] rounded-full bg-gray-700/30" />
      </div>

      {/* Right column - Career Form */}
      <div className="md:w-3/5 p-8 bg-gray-300/10 rounded-r-lg">
        <CareerForm />
      </div>
    </div>
  );
}

// Background Elements Component
function BackgroundElements(): JSX.Element {
  return (
    <>
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
    </>
  );
}

// Main Careers Page Component
export default function CareersPage(): JSX.Element {
  return (
    <div className="bg-black text-white">
      {/* Main content with padding for header */}
      <div className="bg-[url(/services/herobg.png)] bg-cover bg-center min-h-[700px] pt-60 px-4 relative overflow-visible pb-20">
        {/* Background elements */}
        <BackgroundElements />

        {/* Hero Section */}
        <CareerHero />

        {/* Team Join Section */}
        <TeamJoinSection />

        {/* Job Vacancies Section */}
        <JobVacanciesSection />

        {/* Why Choose Section */}
        <WhyChooseSection />

        {/* Contact Section */}
        <ContactSection />
      </div>
    </div>
  );
}
