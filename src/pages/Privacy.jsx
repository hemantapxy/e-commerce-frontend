import React from "react";
import { 
  ShieldCheck, 
  Eye, 
  Database, 
  UserCircle, 
  Share2, 
  Lock, 
  Trash2, 
  Download,
  Info
} from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const dataSummary = [
    { title: "What we collect", desc: "Identity, contact, and transaction data.", icon: <UserCircle size={20} /> },
    { title: "How we use it", desc: "To process orders and improve your experience.", icon: <Database size={20} /> },
    { title: "Who we share with", desc: "Only logistics and payment partners.", icon: <Share2 size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] font-sans pb-20">
      {/* 1. Privacy Hero */}
      <section className="bg-white border-b border-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-green-50 p-4 rounded-3xl border border-green-100">
              <ShieldCheck className="text-green-600" size={40} />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Privacy is a <span className="text-blue-600">human right.</span>
          </h1>
          <p className="text-gray-500 text-lg">
            At E-SHOP, your data belongs to you. We believe in being transparent about 
            how we collect and use your information.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-12">
        {/* 2. Privacy-at-a-Glance (MNC Pattern) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {dataSummary.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="text-blue-600 mb-4">{item.icon}</div>
              <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 3. Main Policy Content */}
          <div className="lg:col-span-2 space-y-12 bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye size={24} className="text-blue-600" /> Information Collection
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We collect information to provide better services to all our users. This includes:
              </p>
              <ul className="mt-4 space-y-3">
                <li className="text-gray-600 text-sm flex gap-3">
                  <div className="h-2 w-2 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                  <strong>Personal Identifiers:</strong> Name, email address, and phone number.
                </li>
                <li className="text-gray-600 text-sm flex gap-3">
                  <div className="h-2 w-2 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                  <strong>Transaction Data:</strong> Details about payments and products purchased.
                </li>
              </ul>
            </section>

            <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies & Tracking</h2>
              <p className="text-sm text-gray-500 mb-4">
                We use cookies to enhance site navigation, analyze site usage, and assist in our marketing efforts.
              </p>
              <button className="text-sm font-bold text-blue-600 hover:underline">Manage Cookie Settings</button>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock size={24} className="text-blue-600" /> Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                We work hard to protect you and E-SHOP from unauthorized access to or unauthorized 
                alteration, disclosure, or destruction of information we hold. We use SSL encryption 
                for all data transmission.
              </p>
            </section>
          </div>

          {/* 4. User Rights Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#172337] text-white p-8 rounded-[2.5rem] shadow-2xl">
              <h3 className="text-xl font-bold mb-6">Your Data Rights</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Download className="text-blue-400 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-sm">Portability</p>
                    <p className="text-xs text-gray-400 mt-1">Request a copy of all your data in a machine-readable format.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Trash2 className="text-red-400 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-sm">Right to Erasure</p>
                    <p className="text-xs text-gray-400 mt-1">Request the permanent deletion of your account and data.</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-8 bg-blue-600 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">
                Request Data Access
              </button>
            </div>

            <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-3">
              <Info className="text-blue-600 mt-1 shrink-0" size={18} />
              <p className="text-xs text-blue-800 leading-relaxed">
                <strong>GDPR & CCPA Compliant:</strong> Our privacy practices are designed to comply with global data protection laws.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}