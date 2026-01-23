"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Rocket, Eye, Shield, Target, Award, Users, Globe, Zap } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <main className="bg-[#0A0C16] text-white min-h-screen">
      <Hero />
      <PurposeSection />
      <CoreValues />
      <FounderSection />
      <CTASection />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url(/hero-background.webp)] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C16]/0 via-[#0A0C16]/80 to-[#0A0C16]" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter">
            What Are <span className="text-red-800">We?</span>
          </h1>

          <div className="max-w-4xl mx-auto space-y-8 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[32px] shadow-2xl shadow-red-900/10">
            <p className="text-lg md:text-2xl text-gray-300 leading-relaxed">
              VR Tech Info is a <span className="text-red-500 font-bold uppercase tracking-wider">Trusted Global Partner</span> for enterprise digital transformation. With a passionate team of world-class experts, we specialize in delivering high-impact software solutions and empowering the next generation of tech leaders.
            </p>
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              Our success stems from a relentless commitment to innovation and quality, earning us the reputation of a gold-standard technology partner for Fortune 500 companies and visionary startups alike.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Floating decorative shapes */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-red-800/10 blur-[120px] rounded-full -translate-y-1/2" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-blue-900/10 blur-[120px] rounded-full translate-y-1/2" />
    </section>
  );
}

function PurposeSection() {
  const cards = [
    {
      title: "Our Mission",
      desc: "To empower global businesses through disruptive technology solutions and strategic guidance. We bridge the gap between complex challenges and innovative software, ensuring our clients stay ahead in the digital race.",
      icon: <Rocket className="w-8 h-8 text-red-500" />,
      color: "from-red-500/20 to-transparent"
    },
    {
      title: "Our Vision",
      desc: "To be the defining global leader in technology engineering, recognized for excellence, integrity, and client success. We envision a future where technology is a catalyst for sustainable growth and limitless human potential.",
      icon: <Eye className="w-8 h-8 text-red-800" />,
      color: "from-red-800/20 to-transparent"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative group p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-red-500/30 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-red-500 transition-colors">{card.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoreValues() {
  const values = [
    { title: "Innovation", desc: "Pushing boundaries with cutting-edge tech.", icon: <Zap className="w-6 h-6" /> },
    { title: "Integrity", desc: "Honesty and transparency in every project.", icon: <Shield className="w-6 h-6" /> },
    { title: "Excellence", desc: "Delivering world-class engineering quality.", icon: <Award className="w-6 h-6" /> },
    { title: "Reliability", desc: "Your consistent partner in a changing world.", icon: <Target className="w-6 h-6" /> }
  ];

  return (
    <section className="py-24 bg-black/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Our Core Values</h2>
          <div className="w-20 h-1 bg-red-800 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-red-500/50 transition-all group hover:bg-white/10"
            >
              <div className="text-red-800 mb-6 group-hover:scale-110 transition-transform duration-300">
                {v.icon}
              </div>
              <h4 className="text-xl font-bold mb-2">{v.title}</h4>
              <p className="text-gray-500 text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/3 relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] group shadow-2xl shadow-red-900/20">
              <Image
                src="/founder.png"
                alt="Vivek Reddy - Founder"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8 backdrop-blur-md bg-white/5 border-t border-white/10">
                <h3 className="text-2xl font-bold text-white mb-1">Vivek Reddy</h3>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-medium">Founder & Director</span>
                  <div className="w-1 h-1 bg-white/30 rounded-full" />
                  <Image src="/vr-logo.png" alt="VR Tech" width={40} height={40} className="opacity-80" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="lg:w-2/3 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-16 rounded-[40px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                <Users className="w-20 h-20 text-white/5" />
              </div>

              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                Meet the Visionary Behind <span className="text-red-800">VR Tech Info</span>
              </h2>

              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Vivek Reddy embarked on a mission to democratize premium technology solutions. His visionary leadership and relentless focus on innovation have transformed VR Tech Info from a local startup into a global powerhouse in software engineering and IT consulting.
                </p>
                <p>
                  With decades of combined industry experience, Vivek has cultivated a culture of excellence, honesty, and technical mastery, shaping the firm into a trailblazer that major enterprises trust with their most critical digital infrastructure.
                </p>
              </div>

              <div className="mt-12 flex flex-wrap gap-8 grayscale opacity-50">
                <div className="flex items-center gap-2"><Globe className="w-5 h-5" /> <span>Global Delivery</span></div>
                <div className="flex items-center gap-2"><Award className="w-5 h-5" /> <span>Top Tier Support</span></div>
                <div className="flex items-center gap-2"><Users className="w-5 h-5" /> <span>Expert Engineering</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-t from-red-950/20 to-transparent">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-6">Have More Questions?</h2>
          <p className="text-gray-400 text-lg mb-10">
            We believe in complete transparency. Visit our dedicated FAQ page to learn more about our processes, support, and services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/faq"
              className="bg-red-800 hover:bg-red-700 text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-red-900/20"
            >
              Visit FAQ Page
            </Link>
            <Link
              href="/#contact"
              className="bg-white/5 hover:bg-white/10 border border-white/20 text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105"
            >
              Reach Our Team
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
