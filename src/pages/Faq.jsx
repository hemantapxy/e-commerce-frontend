import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  RefreshCcw, 
  User, 
  CreditCard,
  MessageCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Orders");
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    { name: "Orders", icon: <ShoppingBag size={18} /> },
    { name: "Shipping", icon: <Truck size={18} /> },
    { name: "Returns", icon: <RefreshCcw size={18} /> },
    { name: "Payments", icon: <CreditCard size={18} /> },
    { name: "Account", icon: <User size={18} /> },
  ];

  const faqs = {
    Orders: [
      { q: "How do I track my order?", a: "You can track your order by clicking on the 'Track Order' link in your confirmation email or by visiting the 'My Orders' section in your account." },
      { q: "Can I change my delivery address?", a: "Address changes are only possible if the order hasn't been shipped yet. Please contact support immediately." },
    ],
    Shipping: [
      { q: "What are the shipping charges?", a: "Standard shipping is free on orders above ₹499. For others, a flat fee of ₹40 applies." },
      { q: "Do you ship internationally?", a: "Yes, we currently ship to over 50 countries including the US, UK, and Canada." },
    ],
    Returns: [
      { q: "How long does a refund take?", a: "Once the return is picked up, it usually takes 5-7 business days for the refund to reflect in your original payment method." },
    ],
    // Add more categories as needed...
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
      {/* 1. Hero Section with Search */}
      <div className="bg-[#172337] text-white py-20 px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black mb-6 tracking-tight"
        >
          How can we help you today?
        </motion.h1>
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for articles, orders, policies..." 
            className="w-full bg-white text-gray-900 rounded-2xl py-4 pl-12 pr-4 outline-none shadow-2xl focus:ring-4 focus:ring-blue-500/20 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* 2. Sidebar Categories */}
        <div className="lg:col-span-1 space-y-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4 mb-4">Categories</h3>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => { setActiveCategory(cat.name); setOpenIndex(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeCategory === cat.name 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* 3. Accordion List */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{activeCategory} FAQs</h2>
          <div className="space-y-4">
            {faqs[activeCategory]?.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-bold text-gray-800">{faq.q}</span>
                  {openIndex === idx ? <Minus size={18} className="text-blue-600" /> : <Plus size={18} className="text-gray-400" />}
                </button>
                
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-50"
                    >
                      <div className="p-6 text-gray-600 leading-relaxed text-sm bg-gray-50/30">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* 4. Still have questions? */}
          <div className="mt-12 p-8 bg-blue-50 rounded-3xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg">
                <MessageCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Still have questions?</h4>
                <p className="text-sm text-gray-500">We’re here to help you 24/7 via chat or email.</p>
              </div>
            </div>
            <button className="bg-white text-blue-600 border border-blue-200 px-6 py-2.5 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}