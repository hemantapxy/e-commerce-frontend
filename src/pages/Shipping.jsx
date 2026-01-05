import React from "react";
import { Truck, Globe, Clock, Package, MapPin, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Shipping() {
  const deliveryTiers = [
    {
      name: "Standard Delivery",
      time: "3-5 Business Days",
      price: "FREE",
      icon: <Package className="text-gray-500" />,
      features: ["Real-time tracking", "Safe handling", "Doorstep delivery"]
    },
    {
      name: "Express Shipping",
      time: "1-2 Business Days",
      price: "₹99",
      icon: <Zap className="text-orange-500" />,
      features: ["Priority handling", "SMS updates", "Signature on delivery"],
      highlight: true
    },
    {
      name: "Next Day Delivery",
      time: "Within 24 Hours",
      price: "₹199",
      icon: <Truck className="text-blue-600" />,
      features: ["Fastest route", "Premium support", "Guaranteed arrival"]
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="bg-[#172337] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-1/2"
          >
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Speed. Safety. <br /><span className="text-blue-400">Reliability.</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg leading-relaxed">
              Our global logistics network ensures your products reach you in pristine condition, 
              wherever you are. Trusted by millions for lightning-fast delivery.
            </p>
          </motion.div>
          <div className="md:w-1/3 bg-[#243147] p-8 rounded-3xl border border-gray-700 shadow-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="text-blue-400" /> Track Order
            </h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Tracking ID (e.g. ESHP12345)" 
                className="w-full bg-[#172337] border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-blue-400 transition-all"
              />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                Track Now <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Tiers */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Choose your shipping speed</h2>
          <p className="text-gray-500 mt-2">Flexible options designed for your convenience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deliveryTiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`p-8 rounded-3xl border transition-all duration-300 ${
                tier.highlight 
                ? "border-blue-600 shadow-2xl shadow-blue-900/10 ring-1 ring-blue-600" 
                : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6">
                {tier.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
              <p className="text-blue-600 font-bold mt-1">{tier.time}</p>
              <div className="mt-4 text-2xl font-black text-gray-900">{tier.price}</div>
              
              <ul className="mt-8 space-y-4">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <ShieldCheck size={16} className="text-green-500" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Global reach, local touch</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm text-blue-600"><Globe /></div>
                <div>
                  <h4 className="font-bold text-lg">200+ Countries</h4>
                  <p className="text-gray-500 text-sm">Our network covers almost every corner of the world.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm text-blue-600"><Clock /></div>
                <div>
                  <h4 className="font-bold text-lg">Real-time Updates</h4>
                  <p className="text-gray-500 text-sm">Know exactly where your package is with satellite tracking.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
                
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}