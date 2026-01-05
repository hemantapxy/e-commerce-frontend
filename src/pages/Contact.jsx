import React from "react";
import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Header */}
      <div className="bg-[#f8fafc] py-20 px-6 text-center border-b border-gray-100">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
        >
          How can we <span className="text-blue-600">help?</span>
        </motion.h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          Our team is here to help you with your order, payment, or technical issues. 
          Expect a response within 24 hours.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <MessageSquare className="text-blue-600 mb-4" />
            <h3 className="font-bold text-gray-900">Chat with us</h3>
            <p className="text-sm text-gray-600 mt-2">Available Mon-Sat (9am - 6pm)</p>
            <button className="mt-4 text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Start Chat <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <Mail className="text-gray-900 mb-4" />
            <h3 className="font-bold text-gray-900">Email Support</h3>
            <p className="text-sm text-gray-600 mt-2">support@eshop.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Full Name</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Message</label>
              <textarea rows="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}