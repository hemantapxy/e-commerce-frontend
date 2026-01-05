import React from "react";
// Added ArrowRight to the imports below
import { Briefcase, Zap, Heart, ArrowRight, Code, PenTool, BarChart3, Truck } from "lucide-react";

export default function Careers() {
  // Mapping categories to specific icons for an MNC look
  const jobList = [
    { title: "Engineering", icon: <Code size={20} />, color: "bg-blue-50 text-blue-600" },
    { title: "Product", icon: <Zap size={20} />, color: "bg-yellow-50 text-yellow-600" },
    { title: "Design", icon: <PenTool size={20} />, color: "bg-pink-50 text-pink-600" },
    { title: "Marketing", icon: <BarChart3 size={20} />, color: "bg-purple-50 text-purple-600" },
    { title: "Logistics", icon: <Truck size={20} />, color: "bg-green-50 text-green-600" },
  ];

  return (
    <div className="py-20 bg-[#f8fafc] min-h-screen font-sans">
      <div className="max-w-5xl mx-auto px-6">
        <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
          Careers
        </span>
        
        <h2 className="text-4xl md:text-5xl font-black mt-6 mb-4 text-gray-900 leading-tight tracking-tight">
          Help us redefine the <br/>way the world shops.
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mb-12">
          Join a team of passionate individuals working on solving the most complex problems in global e-commerce.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobList.map((job) => (
            <div 
              key={job.title} 
              className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${job.color}`}>
                  {job.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">{job.title}</h4>
                  <p className="text-gray-400 text-sm font-medium">Remote / Bangalore, IN</p>
                </div>
              </div>
              
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-[-45deg] transition-all duration-300">
                <ArrowRight size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Culture Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-200 pt-16">
            <div className="flex gap-4">
                <Heart className="text-red-500 shrink-0" />
                <div>
                    <h5 className="font-bold text-gray-900">Health & Wellness</h5>
                    <p className="text-sm text-gray-500 mt-1">Comprehensive insurance for you and your family.</p>
                </div>
            </div>
            <div className="flex gap-4">
                <Briefcase className="text-blue-500 shrink-0" />
                <div>
                    <h5 className="font-bold text-gray-900">Growth Policy</h5>
                    <p className="text-sm text-gray-500 mt-1">Annual learning budget and mentorship programs.</p>
                </div>
            </div>
            <div className="flex gap-4">
                <Zap className="text-yellow-500 shrink-0" />
                <div>
                    <h5 className="font-bold text-gray-900">Ownership</h5>
                    <p className="text-sm text-gray-500 mt-1">Direct impact on millions of users every day.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}