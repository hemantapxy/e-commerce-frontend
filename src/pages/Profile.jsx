import React, { useEffect, useState } from "react";
import api from "../api";
import { Package, Power, ChevronRight, User } from "lucide-react";
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

    // 10-Digit Mobile Number Validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(user.phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      await api.put("/user/profile", user);
      alert("Changes Saved Successfully");
    } catch (err) {
      alert("Failed to save changes");
    }
  };

  // Helper to allow only numbers in the phone input
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 10) {
      setUser({ ...user, phone: value });
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] font-sans text-[#111] pb-10">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-gray-500">
        Account <span className="mx-1">›</span> <span className="text-gray-900 font-semibold">Profile Information</span>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-4">
          
          {/* LEFT SIDEBAR */}
          <div className="col-span-12 md:col-span-3">
            <div className="bg-white p-3 flex items-center gap-4 mb-4 shadow-sm rounded-sm">
              <div className="w-12 h-12 bg-[#2874f0] rounded-full flex items-center justify-center text-white">
                <User size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Hello,</p>
                <p className="font-bold text-[16px] truncate">{user.username}</p>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
              <ul className="text-sm">
                <Link to="/orders" className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-[#f1f3f6] group transition-colors">
                  <div className="flex items-center gap-3">
                    <Package size={20} className="text-[#2874f0]" />
                    <span className="text-gray-600 font-bold uppercase text-[14px]">My Orders</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 group-hover:text-[#2874f0]" />
                </Link>

                <div 
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-4 hover:bg-red-50 cursor-pointer text-gray-600 transition-colors"
                >
                  <Power size={20} className="text-[#2874f0]" />
                  <span className="font-bold uppercase text-[14px]">Logout</span>
                </div>
              </ul>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-12 md:col-span-9">
            <div className="bg-white shadow-sm rounded-sm p-6 md:p-8">
              <h2 className="text-[18px] font-bold mb-8">Personal Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="max-w-md">
                  <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 px-4 py-2.5 rounded-sm outline-none focus:border-[#2874f0] text-sm"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    required
                  />
                </div>

                <div className="max-w-md">
                  <label className="block text-sm text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    disabled
                    className="w-full border border-gray-200 bg-gray-50 px-4 py-2.5 rounded-sm text-sm text-gray-500 cursor-not-allowed"
                    value={user.email}
                  />
                  <p className="text-[11px] text-gray-400 mt-1 italic">Email cannot be changed.</p>
                </div>

                <div className="max-w-md">
                  <label className="block text-sm text-gray-700 mb-2">Mobile Number</label>
                  <input 
                    type="text" 
                    placeholder="10-digit mobile number"
                    className={`w-full border px-4 py-2.5 rounded-sm outline-none text-sm transition-colors ${
                        user.phone.length > 0 && user.phone.length < 10 
                        ? "border-red-500" 
                        : "border-gray-300 focus:border-[#2874f0]"
                    }`}
                    value={user.phone}
                    onChange={handlePhoneChange}
                    required
                  />
                  {user.phone.length > 0 && user.phone.length < 10 && (
                    <p className="text-[11px] text-red-500 mt-1">Must be exactly 10 digits.</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Shipping Address</label>
                  <textarea 
                    className="w-full border border-gray-300 p-4 rounded-sm h-32 text-sm outline-none focus:border-[#2874f0]"
                    placeholder="Enter your full delivery address..."
                    value={user.address}
                    onChange={(e) => setUser({...user, address: e.target.value})}
                    required
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="bg-[#fb641b] hover:bg-[#f4511e] text-white px-10 py-3 text-sm font-bold uppercase rounded-sm shadow-md transition-all active:scale-95"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}