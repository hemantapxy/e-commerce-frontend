import React, { useEffect, useState } from "react";
import api from "../api";
import { User, Package, CreditCard, Power, ChevronRight, ShieldCheck, MapPin } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    api.get("/user/profile").then((res) => {
      setUser({
        username: res.data.username || "User",
        email: res.data.email || "",
        phone: res.data.phone || "",
        address: res.data.address || "",
      });
    });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put("/user/profile", user);
    alert("Changes Saved");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#111]">
      {/* Breadcrumb - Classic Amazon */}
      <div className="max-w-5xl mx-auto px-4 py-4 text-xs text-[#565959]">
        Your Account <span className="mx-1">›</span> <span className="text-[#c45500]">Login & Security</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-12">
        <h1 className="text-3xl font-normal mb-6">Login & Security</h1>

        <div className="grid grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR - Navigation List */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h3 className="font-bold text-sm">Your Account</h3>
              </div>
              <ul className="text-sm">
                <Link to="/orders" className="flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50 group">
                  <div className="flex items-center gap-3">
                    <Package size={18} className="text-gray-600" />
                    <span className="text-gray-700">Your Orders</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-400" />
                </Link>
                <li className="flex items-center gap-3 p-3 border-b border-gray-100 bg-[#f3f7f8] border-l-4 border-[#e47911]">
                  <ShieldCheck size={18} className="text-[#e47911]" />
                  <span className="font-bold">Login & Security</span>
                </li>
                <li className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <MapPin size={18} className="text-gray-600" />
                  <span className="text-gray-700">Your Addresses</span>
                </li>
                <li className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <CreditCard size={18} className="text-gray-600" />
                  <span className="text-gray-700">Payments</span>
                </li>
                <div 
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 hover:bg-red-50 cursor-pointer text-red-700 mt-4 border-t border-gray-100"
                >
                  <Power size={18} />
                  <span className="font-medium uppercase text-xs">Sign Out</span>
                </div>
              </ul>
            </div>
          </div>

          {/* RIGHT CONTENT - The Data Grid */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            <div className="border border-gray-200 rounded-lg">
              
              {/* Field 1: Name */}
              <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold">Name:</label>
                  <input 
                    type="text" 
                    className="mt-1 w-full max-w-xs border border-gray-400 px-2 py-1 rounded shadow-inner focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] outline-none"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                  />
                </div>
                <button className="text-sm bg-gray-100 border border-gray-300 px-6 py-1 rounded-md shadow-sm hover:bg-gray-200">Edit</button>
              </div>

              {/* Field 2: Email */}
              <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold">Email:</label>
                  <p className="text-sm text-gray-700 mt-1">{user.email}</p>
                </div>
                <span className="text-xs text-gray-500 italic">Primary</span>
              </div>

              {/* Field 3: Phone */}
              <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold">Mobile Phone Number:</label>
                  <input 
                    type="text" 
                    className="mt-1 w-full max-w-xs border border-gray-400 px-2 py-1 rounded shadow-inner outline-none"
                    value={user.phone}
                    onChange={(e) => setUser({...user, phone: e.target.value})}
                  />
                </div>
                <button className="text-sm bg-gray-100 border border-gray-300 px-6 py-1 rounded-md shadow-sm hover:bg-gray-200">Change</button>
              </div>

              {/* Field 4: Address */}
              <div className="p-5 flex flex-col gap-2">
                <label className="block text-sm font-bold">Default Shipping Address:</label>
                <textarea 
                  className="w-full border border-gray-400 p-2 rounded shadow-inner h-24 text-sm outline-none"
                  value={user.address}
                  onChange={(e) => setUser({...user, address: e.target.value})}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center border-t border-gray-200 pt-8">
              <button 
                onClick={handleSubmit}
                className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg px-12 py-2 text-sm font-medium shadow-md transition-all active:scale-95"
              >
                Done
              </button>
            </div>

            {/* Security Footer */}
            <div className="mt-12 bg-gray-50 border border-gray-200 rounded p-6">
                <h4 className="text-sm font-bold mb-2">Secure your account</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                    Make sure you're taking advantage of the latest security features. 
                    Amazon recommends enabling 2-Step Verification to prevent unauthorized access.
                </p>
                <button className="mt-4 text-sm text-blue-700 hover:text-orange-700 hover:underline">
                    Enable 2-Step Verification
                </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}