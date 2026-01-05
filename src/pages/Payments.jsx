import React, { useState } from "react";
import { 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  Info
} from "lucide-react";
import { motion } from "framer-motion";

export default function Payments() {
  const [selectedMethod, setSelectedMethod] = useState("card");

  const paymentMethods = [
    { id: "card", title: "Credit / Debit Card", icon: <CreditCard size={20} />, desc: "Visa, Mastercard, Amex, RuPay" },
    { id: "upi", title: "UPI / QR Code", icon: <Smartphone size={20} />, desc: "Google Pay, PhonePe, Paytm" },
    { id: "net", title: "Net Banking", icon: <Info size={20} />, desc: "All major Indian banks supported" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-green-100">
            <ShieldCheck size={14} /> PCI-DSS COMPLIANT INTERFACE
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Secure Payment Gateway
          </h1>
          <p className="text-gray-500 mt-2">All transactions are encrypted and 100% secure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          
          {/* Left: Payment Method Selector */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1 mb-4">Payment Methods</h3>
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full flex flex-col items-start p-4 rounded-2xl border transition-all duration-300 ${
                  selectedMethod === method.id 
                  ? "bg-white border-blue-600 shadow-xl shadow-blue-900/5 ring-4 ring-blue-50" 
                  : "bg-transparent border-gray-200 hover:border-gray-300 text-gray-500"
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className={`${selectedMethod === method.id ? "text-blue-600" : "text-gray-400"}`}>
                    {method.icon}
                  </div>
                  <span className={`font-bold ${selectedMethod === method.id ? "text-gray-900" : ""}`}>
                    {method.title}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{method.desc}</span>
              </button>
            ))}
          </div>

          {/* Right: Payment Details Form */}
          <motion.div 
            key={selectedMethod}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-2xl shadow-gray-200/50"
          >
            {selectedMethod === "card" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-xl text-gray-900">Card Information</h4>
                  <div className="flex gap-2 grayscale opacity-50">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-3.5 text-gray-400" size={18} />
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-600 outline-none transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">Expiry Date</label>
                      <input type="text" placeholder="MM / YY" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-600 outline-none transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">CVV</label>
                      <div className="relative">
                        <Lock className="absolute right-4 top-3.5 text-gray-400" size={18} />
                        <input type="password" placeholder="***" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-600 outline-none transition-all" />
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 mt-6">
                  Pay Now <ArrowRight size={18} />
                </button>
              </div>
            )}

            {selectedMethod === "upi" && (
              <div className="text-center py-10 space-y-6">
                <div className="w-48 h-48 bg-gray-100 rounded-2xl mx-auto flex items-center justify-center border-2 border-dashed border-gray-300">
                  <span className="text-gray-400 text-xs font-bold">QR CODE PLACEHOLDER</span>
                </div>
                <p className="text-sm text-gray-500">Scan this QR code using your UPI app to pay.</p>
                <div className="flex justify-center gap-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" className="h-6 opacity-60" alt="UPI" />
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Trust Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-200 pt-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg"><CheckCircle2 size={20} /></div>
            <div className="text-sm font-bold text-gray-700">Bank-level Security</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Lock size={20} /></div>
            <div className="text-sm font-bold text-gray-700">256-bit Encryption</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg"><ShieldCheck size={20} /></div>
            <div className="text-sm font-bold text-gray-700">Refund Protection</div>
          </div>
        </div>
      </div>
    </div>
  );
}