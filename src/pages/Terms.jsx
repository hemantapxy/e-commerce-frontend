import React from "react";
import { 
  FileText, 
  Scale, 
  ShieldAlert, 
  ExternalLink, 
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function Terms() {
  const sections = [
    "Introduction",
    "Account Responsibilities",
    "Intellectual Property",
    "Prohibited Activities",
    "Limitation of Liability",
    "Governing Law",
    "Contact Information"
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] font-sans pb-20">
      {/* 1. Subtle Header */}
      <div className="bg-white border-b border-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-4">
            <Scale size={14} /> Legal Documentation
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            Terms of Service
          </h1>
          <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
              <Clock size={14} /> Last Updated: January 2026
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" /> Version 2.4.0
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* 2. Sticky Sidebar Navigation */}
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-10 space-y-1">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-4">Table of Contents</h3>
            {sections.map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center justify-between group px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all"
              >
                {section}
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </a>
            ))}
          </div>
        </aside>

        {/* 3. Main Legal Content */}
        <main className="lg:col-span-9 bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-sm leading-relaxed text-gray-700">
          
          <section id="introduction" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to <strong>E-SHOP</strong>. These Terms of Use govern your use of our website, mobile application, and related services. By accessing our platform, you agree to be bound by these terms in full.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 italic text-blue-900 text-sm">
              "Please read these terms carefully. If you do not agree with any part of these terms, you must discontinue use of the service immediately."
            </div>
          </section>

          <section id="account-responsibilities" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Account Responsibilities</h2>
            <p className="mb-4">
              To access certain features, you must register for an account. You are responsible for:
            </p>
            <ul className="list-none space-y-3 ml-2">
              {[
                "Maintaining the confidentiality of your password.",
                "All activities that occur under your account.",
                "Providing accurate and current information."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="prohibited-activities" className="mb-12 p-8 bg-red-50/50 border border-red-100 rounded-2xl">
            <div className="flex items-center gap-2 text-red-600 font-bold mb-4">
              <ShieldAlert size={20} />
              <h2 className="text-xl">3. Prohibited Activities</h2>
            </div>
            <p className="text-sm text-red-900/80 mb-4">
              The following actions will result in immediate account termination:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg text-xs font-semibold text-gray-600 shadow-sm border border-red-100">Fraudulent Transactions</div>
              <div className="bg-white p-3 rounded-lg text-xs font-semibold text-gray-600 shadow-sm border border-red-100">Data Scraping & Bot Usage</div>
              <div className="bg-white p-3 rounded-lg text-xs font-semibold text-gray-600 shadow-sm border border-red-100">Harassment of Employees</div>
              <div className="bg-white p-3 rounded-lg text-xs font-semibold text-gray-600 shadow-sm border border-red-100">Reverse Engineering</div>
            </div>
          </section>

          {/* Additional Sections... */}
          
          <div className="pt-12 border-t border-gray-100 mt-20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-gray-400 italic">
              Need a physical copy? <button className="text-blue-600 font-bold hover:underline">Download PDF</button>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900">
                Privacy Policy <ExternalLink size={14} />
              </button>
              <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900">
                Cookie Policy <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}