import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Database, 
  UserCheck, 
  Bug, 
  FileLock, 
  Server,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function Security() {
  const securityPillars = [
    {
      title: "Data Encryption",
      desc: "All sensitive data is encrypted at rest and in transit using industry-standard AES-256 and TLS 1.3 encryption.",
      icon: <Lock className="text-blue-500" />,
    },
    {
      title: "2FA Protection",
      desc: "Multi-factor authentication adds an extra layer of security to prevent unauthorized access to your account.",
      icon: <UserCheck className="text-green-500" />,
    },
    {
      title: "PCI Compliance",
      desc: "We are a PCI-DSS Level 1 compliant service provider, ensuring your payment info is never stored on our servers.",
      icon: <ShieldCheck className="text-indigo-500" />,
    },
    {
      title: "Privacy First",
      desc: "We never sell your data. We use anonymized telemetry to improve our services while protecting your identity.",
      icon: <EyeOff className="text-orange-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
      {/* 1. Hero Section: The "Shield" Visual */}
      <section className="bg-[#172337] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-10">
          <ShieldCheck size={400} />
        </div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-xs font-black tracking-widest mb-6 border border-blue-500/30"
          >
            <ShieldCheck size={14} /> SECURITY & TRUST CENTER
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            Your data is <span className="text-blue-400">safe</span> with us.
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We employ bank-level security measures and undergo regular third-party 
            audits to ensure your personal and financial information remains private.
          </p>
        </div>
      </section>

      {/* 2. Core Security Pillars */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityPillars.map((pillar, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:translate-y-[-5px] transition-all duration-300">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{pillar.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Detailed Infrastructure Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">Enterprise-Grade Infrastructure</h2>
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Server /></div>
                <div>
                  <h4 className="font-bold text-gray-900">Distributed Architecture</h4>
                  <p className="text-gray-500 text-sm mt-1">Our services are hosted on global, tier-4 data centers with 99.99% uptime and DDoS protection.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Database /></div>
                <div>
                  <h4 className="font-bold text-gray-900">Daily Off-site Backups</h4>
                  <p className="text-gray-500 text-sm mt-1">We maintain multiple redundant backups of your data across different geographical regions.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm">
             
          </div>
        </div>
      </section>

      {/* 4. Responsible Disclosure (Bug Bounty) */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-[#172337] rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-lg">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-sm mb-4 uppercase tracking-widest">
              <Bug size={18} /> Bug Bounty Program
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">Help us keep E-SHOP secure.</h2>
            <p className="text-gray-400">
              Found a vulnerability? We reward security researchers for helping us stay safe. 
              Join our community of white-hat hackers.
            </p>
          </div>
          <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-blue-400 hover:text-white transition-all group whitespace-nowrap">
            Submit a Report <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 5. Compliance Badges */}
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-wrap justify-center gap-12 opacity-40 grayscale">
        <div className="flex items-center gap-2 font-black text-gray-400"><FileLock size={24} /> SOC2 TYPE II</div>
        <div className="flex items-center gap-2 font-black text-gray-400"><ShieldCheck size={24} /> ISO 27001</div>
        <div className="flex items-center gap-2 font-black text-gray-400"><ShieldCheck size={24} /> GDPR</div>
        <div className="flex items-center gap-2 font-black text-gray-400"><Lock size={24} /> HIPAA</div>
      </div>
    </div>
  );
}