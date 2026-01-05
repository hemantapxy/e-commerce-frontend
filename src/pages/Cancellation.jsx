import React from "react";
import { 
  XCircle, 
  RefreshCcw, 
  HelpCircle, 
  Clock, 
  Wallet, 
  ChevronRight,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

export default function Cancellation() {
  const steps = [
    { title: "Request", desc: "Go to 'My Orders' and select the item to cancel.", icon: <XCircle /> },
    { title: "Approval", desc: "System checks if the order has been shipped.", icon: <ShieldCheck /> },
    { title: "Refund", desc: "Money is credited back to your original method.", icon: <Wallet /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
      {/* 1. Hero Header */}
      <div className="bg-white border-b border-gray-100 py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-red-50 text-red-600 rounded-2xl mb-6"
        >
          <RefreshCcw size={32} />
        </motion.div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Cancellations & Refunds</h1>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
          Not happy with your purchase? We’ve made our cancellation process 
          as seamless as our shopping experience.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12">
        {/* 2. Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {step.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2">
                0{idx + 1}. {step.title}
              </h3>
              <p className="mt-3 text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              {idx < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 translate-y-[-50%] z-10 text-gray-300">
                  <ChevronRight size={32} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 3. Refund Timeline Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Clock size={20} className="text-blue-600" /> Refund Timelines
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-400 uppercase text-[10px] tracking-widest border-b border-gray-50">
                    <th className="px-6 py-4 font-bold">Payment Method</th>
                    <th className="px-6 py-4 font-bold">Refund Window</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-700">UPI / Wallet</td>
                    <td className="px-6 py-4 text-gray-500 italic">24 - 48 Hours</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-700">Credit / Debit Card</td>
                    <td className="px-6 py-4 text-gray-500 italic">5 - 7 Business Days</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-700">Net Banking</td>
                    <td className="px-6 py-4 text-gray-500 italic">3 - 5 Business Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Important Notes Card */}
          <div className="bg-[#172337] text-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="text-yellow-400" size={24} /> Important
            </h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex gap-3">
                <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0" />
                Items cannot be cancelled once they have been out for delivery.
              </li>
              <li className="flex gap-3">
                <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0" />
                For hygiene reasons, certain items like innerwear are non-returnable.
              </li>
              <li className="flex gap-3">
                <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0" />
                Refunds will be processed to the original payment source only.
              </li>
            </ul>
            <button className="w-full mt-8 bg-white text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}