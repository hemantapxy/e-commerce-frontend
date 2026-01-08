import React from "react";
import { 
    Clock,
  PackageSearch, 
  RotateCcw, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  HelpCircle,
  AlertCircle,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";

export default function Returns() {
  const returnSteps = [
    { title: "Pack Items", desc: "Place items in original packaging with tags.", icon: <FileText /> },
    { title: "Pick-up", desc: "Our agent will arrive within 24-48 hours.", icon: <Truck /> },
    { title: "Quality Check", desc: "Items are inspected at our warehouse.", icon: <ShieldCheck /> },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] font-sans pb-20">
      {/* 1. Portal Hero Section */}
      <section className="bg-white border-b border-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">Self-Service Portal</span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-6 tracking-tight">
              Easy Returns & <br /> Exchanges
            </h1>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Changed your mind? No problem. Use our automated portal to initiate a return 
              in less than 60 seconds.
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-3">
              Start a Return <ChevronRight size={20} />
            </button>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 bg-gray-50 border border-gray-100 p-8 rounded-[2.5rem] relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Check Eligibility</h3>
              <p className="text-sm text-gray-500 mb-6">Enter your Order ID to see if your items can be returned.</p>
              <div className="space-y-4">
                <input type="text" placeholder="Order ID (e.g. #ORD-9921)" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
                <button className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors">Check Status</button>
              </div>
            </div>
            <PackageSearch className="absolute -bottom-4 -right-4 text-gray-200/50" size={160} />
          </motion.div>
        </div>
      </section>

      {/* 2. Process Timeline */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {returnSteps.map((step, idx) => (
            <div key={idx} className="flex-1 space-y-4">
              <div className="w-14 h-14 bg-white shadow-lg shadow-gray-200/50 rounded-2xl flex items-center justify-center text-blue-600 border border-gray-50">
                {step.icon}
              </div>
              <h4 className="text-lg font-bold text-gray-900">Step {idx + 1}: {step.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Policy & Exceptions */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="bg-[#172337] p-10 rounded-[2.5rem] text-white">
          <div className="flex items-center gap-3 mb-6">
            <RotateCcw className="text-blue-400" />
            <h2 className="text-2xl font-bold">Standard Return Policy</h2>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-blue-500/20 p-2 rounded-lg h-fit"><Clock size={18} /></div>
              <div>
                <p className="font-bold">15-Day Window</p>
                <p className="text-sm text-gray-400">Items must be returned within 15 days of delivery.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-blue-500/20 p-2 rounded-lg h-fit"><AlertCircle size={18} /></div>
              <div>
                <p className="font-bold">Original Condition</p>
                <p className="text-sm text-gray-400">Must be unused, unwashed, and with all original tags intact.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Non-Returnable Items</h3>
          <p className="text-gray-500">For hygiene and safety reasons, the following categories cannot be returned:</p>
          <div className="grid grid-cols-2 gap-4">
            {['Innerwear', 'Beauty Products', 'Jewelry', 'Custom Items'].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <XCircle size={16} className="text-red-500" />
                <span className="text-sm font-semibold text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <HelpCircle className="text-blue-600 mt-1 shrink-0" size={18} />
            <p className="text-xs text-blue-800 leading-relaxed">
              <strong>Damaged on arrival?</strong> If you received a defective product, please contact us within 24 hours 
              for an instant replacement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function XCircle({ size, className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
    </svg>
  );
}



         