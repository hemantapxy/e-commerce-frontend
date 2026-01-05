import React from "react";
import { Users, Globe, Target } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Visual Header */}
      <section className="relative h-[400px] flex items-center justify-center bg-[#172337] overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="relative text-center px-6">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">We are E-Shop.</h1>
          <p className="text-blue-300 text-xl font-medium tracking-wide">Building the future of digital commerce.</p>
        </div>
      </section>

      {/* Stats/Vision */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
              <Globe size={32} />
            </div>
            <h3 className="text-xl font-bold">Our Reach</h3>
            <p className="text-gray-500">Connecting over 10M+ sellers and customers across the globe.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto text-green-600">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold">Our Mission</h3>
            <p className="text-gray-500">To democratize technology for every entrepreneur in the world.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto text-purple-600">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold">Our Team</h3>
            <p className="text-gray-500">A diverse team of 5000+ thinkers, creators, and builders.</p>
          </div>
        </div>
      </section>
    </div>
  );
}