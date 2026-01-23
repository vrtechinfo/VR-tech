import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { Shield, Eye, Lock, FileText, UserCheck, Database, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | VR Tech Info",
  description: "Privacy Policy for VR Tech Info Inc. Learn how we collect, use, and protect your personal information with our user-friendly guide.",
};

export default function PrivacyPolicy() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const highlights = [
    {
      icon: <Eye className="w-6 h-6 text-red-800" />,
      title: "Transparency",
      description: "We are clear about what data we collect and why we need it."
    },
    {
      icon: <Lock className="w-6 h-6 text-red-800" />,
      title: "Security",
      description: "Industry-standard encryption and protocols protect your information."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-red-800" />,
      title: "Your Control",
      description: "You have full rights to access, update, or delete your personal data."
    },
    {
      icon: <Shield className="w-6 h-6 text-red-800" />,
      title: "Compliance",
      description: "We adhere strictly to PIPEDA, GDPR, and global privacy standards."
    }
  ];

  return (
    <LegalLayout title="Privacy Policy" lastUpdated={lastUpdated}>
      {/* Privacy at a Glance Section */}
      <div className="not-prose mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <Shield className="w-8 h-8 text-red-800" />
          Privacy at a Glance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors group">
              <div className="mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-white font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-red-800/10 border-l-4 border-red-800 p-6 mb-12 rounded-r-lg italic text-gray-300">
        "Trust is the foundation of our business. We treat your data with the same respect and security as we do our own."
      </div>

      <p className="text-lg leading-relaxed mb-10">
        VR Tech Info Inc. ("we," "our," or "us") is dedicated to protecting your privacy.
        This policy outlines how we handle your information with the highest standards of
        integrity and security.
      </p>

      <section className="mb-12">
        <h2 className="flex items-center gap-3">
          <Database className="w-6 h-6 text-red-800" />
          1. The Data We Collect
        </h2>
        <p>We only collect information that is essential for providing our high-quality IT services.</p>

        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div className="bg-white/5 p-6 rounded-xl border border-white/5">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-800 rounded-full"></span>
              Provided by You
            </h3>
            <ul className="space-y-2">
              <li>Contact details (Name, Email, Phone)</li>
              <li>Professional info (Company, Job Title)</li>
              <li>Career data (Resumes, Work History)</li>
              <li>Direct messages and inquiries</li>
            </ul>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/5">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-800 rounded-full"></span>
              Collected Automatically
            </h3>
            <ul className="space-y-2">
              <li>Technical IDs (IP Address, Device Type)</li>
              <li>Browsing patterns and site interactions</li>
              <li>Regional location data</li>
              <li>Cookie-based identifiers</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="flex items-center gap-3 font-bold">
          <FileText className="w-6 h-6 text-red-800" />
          2. How We Use Information
        </h2>
        <p>Our use of data is strictly limited to enhancing your experience and delivering our services:</p>
        <ul>
          <li><strong>Service Delivery:</strong> Managing IT consulting and software projects.</li>
          <li><strong>Communication:</strong> Responding to your requests and providing updates.</li>
          <li><strong>Recruitment:</strong> Evaluating candidates for career opportunities.</li>
          <li><strong>Optimization:</strong> Improving website performance and security.</li>
          <li><strong>Legal:</strong> Fulfilling our regulatory and compliance obligations.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="flex items-center gap-3">
          <Lock className="w-6 h-6 text-red-800" />
          3. Keeping Your Data Safe
        </h2>
        <p>
          Security is not an afterthought; it's central to everything we build. We use:
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          {["AES-256 Encryption", "Secure Data Centers", "Regular Audits", "MFA Access", "Strict Internal Policies"].map((tag) => (
            <span key={tag} className="bg-red-800/20 text-red-800 px-3 py-1 rounded-full text-xs font-bold border border-red-800/30">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-6">
          While no digital system is 100% impenetrable, we employ industry-leading
          measures to safeguard your data against unauthorized access or loss.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="flex items-center gap-3">
          <UserCheck className="w-6 h-6 text-red-800" />
          4. Your Privacy Rights
        </h2>
        <p>You are in control of your data. Regardless of where you live, we honor these rights:</p>
        <div className="not-prose space-y-4 mt-6">
          {[
            { label: "Access", text: "Request a copy of the data we hold about you." },
            { label: "Portability", text: "Move your data to another service easily." },
            { label: "Correction", text: "Fix any inaccurate or incomplete information." },
            { label: "Deletion", text: "Ask us to permanently erase your data (the 'right to be forgotten')." }
          ].map((right) => (
            <div key={right.label} className="bg-white/5 p-4 rounded-lg border border-white/5 flex gap-4">
              <span className="text-red-800 font-bold min-w-[100px]">{right.label}</span>
              <span className="text-gray-400">{right.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-red-800" />
          5. Updates & Policy Changes
        </h2>
        <p>
          We may update this policy to reflect new features or legal requirements.
          Significant changes will be highlighted on this page with a fresh "Last Updated" date.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="flex items-center gap-3">
          <Database className="w-6 h-6 text-red-800" />
          6. Contact Us
        </h2>
        <p>For any privacy-related questions or to exercise your rights, reach out to our team:</p>
        <div className="not-prose bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-2xl mt-6">
          <p className="font-bold text-white text-xl mb-2">Privacy Response Team</p>
          <p className="text-gray-400 mb-4 leading-relaxed">VR Tech Info Inc.<br />44 Sandhill Cres, ON L0G 1W0, Canada</p>
          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <a href="mailto:privacy@vrtechinfoinc.ca" className="text-red-800 hover:text-red-700 font-medium underline flex items-center gap-2">
              privacy@vrtechinfoinc.ca
            </a>
            <span className="text-gray-600 hidden sm:block">|</span>
            <a href="tel:+16474475656" className="text-gray-300 hover:text-white transition-colors">
              +1 647 447 5656
            </a>
          </div>
        </div>
      </section>
    </LegalLayout>
  );
}
