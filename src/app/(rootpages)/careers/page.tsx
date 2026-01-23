"use client";
import { useState, useEffect } from "react";
import type { JSX } from "react";
import Image from "next/image";
import {
  Zap,
  ShieldCheck,
  Users,
  Clock,
  MapPin,
  Briefcase,
  CheckCircle2,
  Globe2,
  HeartPulse,
  TrendingUp,
  ChevronDown,
  Search
} from "lucide-react";
import CareerForm from "@/components/CareerForm";
import { getJobRoles, type JobRole } from "./actions";

// Career Hero Component
function CareerHero(): JSX.Element {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 overflow-hidden bg-black">
      {/* Background Shapes (Subtle red/grey) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-zinc-800/20 rounded-full blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-tight">
          Pioneer the future of <span className="text-red-700">VR Solutions</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join a team of visionaries shaping the next generation of virtual reality and immersive technology. We're looking for world-class talent to build what's next.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type="button"
            onClick={() => {
              const jobsSection = document.getElementById('open-positions');
              if (jobsSection) jobsSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all text-lg min-w-[200px]"
          >
            Open Positions
          </button>
        </div>
      </div>

      {/* Hero Image / Team Illustration Replacement */}
      <div className="mt-20 w-full max-w-6xl mx-auto rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl shadow-red-900/10">
        <img
          src="/team1.webp"
          alt="Discovery & Collaboration"
          className="w-full h-auto object-cover opacity-90 transition-opacity hover:opacity-100 duration-700"
        />
      </div>
    </div>
  );
}

// Principles Section
function PrinciplesSection(): JSX.Element {
  const principles = [
    {
      title: "First principles",
      description: "We solve complex problems from the ground up, questioning basic assumptions to find the most innovative VR solutions.",
      icon: <Zap className="w-10 h-10 text-red-600" />
    },
    {
      title: "High ownership",
      description: "We empower every member to take full responsibility, lead initiatives, and make a measurable impact on our products.",
      icon: <ShieldCheck className="w-10 h-10 text-red-600" />
    },
    {
      title: "Excellence everywhere",
      description: "Quality is non-negotiable. From backend architecture to final UX design, we strive for perfection in every pixel.",
      icon: <CheckCircle2 className="w-10 h-10 text-red-600" />
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black border-y border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Principles</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            The core values that guide our engineering and design decisions every single day.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {principles.map((p, i) => (
            <div key={i} className="p-10 bg-zinc-900/50 rounded-3xl border border-zinc-800 hover:border-red-900/50 transition-all duration-300 group">
              <div className="mb-8 p-4 bg-black rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-900/5">
                {p.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{p.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-lg">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Culture Section
function CultureSection(): JSX.Element {
  return (
    <section className="py-24 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
            Pioneering the next wave of immersive technology.
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed mb-8">
            At VR Tech Info, we're not just building apps; we're crafting experiences. Our team is a blend of world-class engineers, designers, and visionaries working together in a high-trust, fast-paced environment.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-white">
              <div className="p-2 bg-red-900/20 rounded-full"><Users className="w-5 h-5 text-red-600" /></div>
              <span className="text-lg font-medium">Collaborative environment</span>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="p-2 bg-red-900/20 rounded-full"><Globe2 className="w-5 h-5 text-red-600" /></div>
              <span className="text-lg font-medium">Global impact with VR solutions</span>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="p-2 bg-red-900/20 rounded-full"><TrendingUp className="w-5 h-5 text-red-600" /></div>
              <span className="text-lg font-medium">Rapid career growth paths</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <img src="/team2.webp" alt="Culture 1" className="rounded-2xl w-full h-[300px] object-cover" />
            <div className="h-40 bg-zinc-900 rounded-2xl border border-zinc-800" />
          </div>
          <div className="space-y-4 pt-12">
            <div className="h-40 bg-red-950/20 rounded-2xl border border-red-900/20" />
            <img src="/team1.webp" alt="Culture 2" className="rounded-2xl w-full h-[300px] object-cover contrast-125" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Benefits Section (High Contrast)
function BenefitsSection(): JSX.Element {
  const benefits = [
    { title: "Remote-first culture", icon: <Globe2 className="w-6 h-6" /> },
    { title: "Competitive compensation", icon: <TrendingUp className="w-6 h-6" /> },
    { title: "Health & Wellness", icon: <HeartPulse className="w-6 h-6" /> },
    { title: "Modern tech stack", icon: <Zap className="w-6 h-6" /> },
    { title: "Paid time off", icon: <Clock className="w-6 h-6" /> },
    { title: "Annual team offsites", icon: <Users className="w-6 h-6" /> }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-zinc-900 to-black p-12 md:p-20 rounded-[3rem] border border-zinc-800">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center md:text-left">What we offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-6 p-6 bg-zinc-950/50 rounded-2xl border border-zinc-800 group hover:border-red-900/30 transition-all">
                <div className="text-red-700 group-hover:scale-125 transition-transform">{b.icon}</div>
                <span className="text-xl font-medium text-white">{b.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
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
    <section id="open-positions" className="py-24 px-4 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Open Positions</h2>
            <p className="text-zinc-400 text-lg">Help us build the next dimension of technology.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search roles or locations..."
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-red-900/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-red-900/20 border-t-red-700 rounded-full animate-spin" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800">
              <p className="text-zinc-500 text-lg">No positions match your search. Check back soon!</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="group relative">
                <button
                  type="button"
                  onClick={() => toggleJobExpansion(job.id)}
                  className={`w-full text-left p-8 rounded-3xl border transition-all duration-300 ${expandedJobId === job.id
                    ? 'bg-zinc-900/80 border-red-900/50 ring-1 ring-red-900/20'
                    : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700'
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-1.5 text-sm font-medium px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full">
                          <Briefcase className="w-3.5 h-3.5" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm font-medium px-3 py-1 bg-red-950/30 text-red-500 rounded-full">
                          <Globe2 className="w-3.5 h-3.5" /> {job.location}
                        </span>
                        <span className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full border ${job.status === 'active'
                          ? 'bg-green-900/20 text-green-500 border-green-900/30'
                          : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                          }`}>
                          {job.status === 'active' ? 'Active' : 'Currently Closed'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="hidden md:block text-zinc-500 font-medium uppercase tracking-widest text-xs">
                        {job.department}
                      </span>
                      <ChevronDown className={`w-6 h-6 text-zinc-500 transition-transform duration-300 ${expandedJobId === job.id ? 'rotate-180 text-white' : ''}`} />
                    </div>
                  </div>
                </button>

                {expandedJobId === job.id && (
                  <div className="px-8 pb-8 pt-4 bg-zinc-900/80 border-x border-b border-red-900/50 rounded-b-3xl -mt-4 relative z-0 animate-in fade-in slide-in-from-top-4">
                    <div className="prose prose-invert max-w-none text-zinc-400 mb-8 leading-relaxed">
                      {job.description}
                    </div>
                    <button
                      type="button"
                      disabled={job.status !== 'active'}
                      className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all shadow-lg ${job.status === 'active'
                        ? 'bg-red-700 hover:bg-red-800 text-white shadow-red-900/20'
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                        }`}
                      onClick={() => {
                        window.location.href = `/careers/apply?jobId=${job.id}`;
                      }}
                    >
                      {job.status === 'active' ? 'Apply for this role' : 'Applications Closed'}
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

// Career Contact Component
function ContactSection(): JSX.Element {
  return (
    <section id="career-form-section" className="py-24 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-800 flex flex-col md:flex-row shadow-2xl">
          <div className="md:w-5/12 p-12 lg:p-16 bg-gradient-to-br from-red-950/20 to-zinc-900 relative">
            <h2 className="text-4xl font-bold text-white mb-8">Let's talk.</h2>
            <p className="text-xl text-zinc-400 mb-12">
              Even if you don't see the perfect role, we're always looking for exceptional talent. Reach out to us.
            </p>

            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-6 group">
                <div className="p-4 bg-zinc-800 rounded-2xl group-hover:bg-red-900/30 transition-colors">
                  <Image src="/Email.png" alt="Email" width={24} height={24} className="invert" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">Email Us</p>
                  <p className="text-lg text-white">hr@vrtechinfoinc.ca</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-zinc-800 rounded-2xl group-hover:bg-red-900/30 transition-colors">
                  <Image src="/Location.png" alt="Location" width={24} height={24} className="invert" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">Visit Us</p>
                  <p className="text-lg text-white leading-relaxed">
                    44 Sandhill Cres,<br />Adjala-Tosorontio, ON L0G 1W0
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-700/10 rounded-full blur-3xl" />
          </div>

          <div className="md:w-7/12 p-12 lg:p-16 bg-zinc-900/50">
            <CareerForm />
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Careers Page Component
export default function CareersPage(): JSX.Element {
  return (
    <div className="bg-black text-white selection:bg-red-900/50 selection:text-white">
      <CareerHero />
      <PrinciplesSection />
      <CultureSection />
      <JobVacanciesSection />
      <BenefitsSection />
      <ContactSection />

      {/* Scroll indicator for modern feel */}
      <div className="fixed bottom-10 left-10 hidden xl:flex flex-col items-center gap-4 z-50">
        <div className="w-px h-24 bg-gradient-to-t from-red-700 to-transparent" />
        <span className="[writing-mode:vertical-lr] text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
          Scroll to explore
        </span>
      </div>
    </div>
  );
}

