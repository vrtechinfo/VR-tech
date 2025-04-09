"use client";
import { useState, useEffect } from "react";
import type { JSX } from "react";
import Image from "next/image";
import CareerForm from "@/components/CareerForm";
import { getJobRoles, type JobRole } from "./actions";

// Career Hero Component
function CareerHero(): JSX.Element {
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
        <img src="/shape3.png" alt="Shape 3" className="w-[150px] h-[150px]" />
      </div>
      
      {/* Shape 4 - Bottom right */}
      <div className="absolute bottom-[150px] left-[200px] opacity-80">
        <img src="/shape4.png" alt="Shape 4" className="w-[136px] h-[136px]" />
      </div>

      <h1 className="text-6xl text-center font-semibold text-white relative z-10 mt-16">
        Start Your Journey With Us Today
      </h1>
    </div>
  );
}

// Team Join Component
function TeamJoinSection(): JSX.Element {
  return (
    <div className="max-w-6xl mx-auto mb-16 relative z-10">
      <div className="p-8">
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
  const [jobs, setJobs] = useState<JobRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobData = await getJobRoles();
        setJobs(jobData);
      } catch (error) {
        console.error('Failed to fetch job roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const toggleJobExpansion = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mb-16 relative z-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Job Vacancies At VRTECH Info</h2>

      {/* Search bar */}
      <div className="flex justify-center mb-8">
        <div className="relative flex items-center bg-gray-800/50 rounded-md px-4 py-2 w-full max-w-xl">
          <span className="mr-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Search icon">
              <title>Search icon</title>
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by title, department, or location..."
            className="bg-transparent border-0 outline-none text-white w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Job listings */}
      <div className="space-y-4">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        )}
        
        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-8 bg-gray-800/30 rounded-lg p-6">
            <p className="text-gray-300">No job positions found matching your search criteria.</p>
          </div>
        )}
        
        {!loading && filteredJobs.length > 0 && (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-gray-800/30 rounded-lg overflow-hidden border border-gray-700">
              <button 
                type="button"
                onClick={() => toggleJobExpansion(job.id)}
                className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-expanded={expandedJobId === job.id}
                aria-controls={`job-content-${job.id}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <p className="text-gray-400">VR Tech Info</p>
                  </div>
                  <svg 
                    className={`w-6 h-6 transition-transform duration-300 ${expandedJobId === job.id ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <title>Toggle job details</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="flex flex-wrap gap-4 mt-2">
                  <span className="text-sm text-gray-400 flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1" aria-hidden="true">
                      <title>Job type icon</title>
                      <path d="M12 6V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
                    </svg>
                    {job.type}
                  </span>
                  <span className="text-sm text-gray-400 flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1" aria-hidden="true">
                      <title>Location icon</title>
                      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" strokeWidth="2" />
                      <path d="M19 10C19 15.5 12 20 12 20C12 20 5 15.5 5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10Z" stroke="white" strokeWidth="2" />
                    </svg>
                    {job.location}
                  </span>
                  <span className="text-sm text-gray-400 flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1" aria-hidden="true">
                      <title>Department icon</title>
                      <path d="M4 7H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <path d="M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {job.department}
                  </span>
                </div>
              </button>
              
              {expandedJobId === job.id && (
                <div 
                  id={`job-content-${job.id}`}
                  className="p-6 pt-0 border-t border-gray-700 animate-fadeIn"
                >
                  <p className="text-gray-300 mb-6">{job.description}</p>
                  <button 
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition duration-300"
                    onClick={() => {
                      const careerFormSection = document.getElementById('career-form-section');
                      if (careerFormSection) {
                        careerFormSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Apply Now
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Bottom text */}
      
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
    <div id="career-form-section" className="max-w-6xl mx-auto flex flex-col md:flex-row relative z-10">
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

// This component is no longer needed as the shapes are now included in the CareerHero component

// Main Careers Page Component
export default function CareersPage(): JSX.Element {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <CareerHero />
      
      <div className="px-4 relative overflow-visible pb-20">
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
