import React, { useEffect, useState } from "react";
import api from "../api";

export default function Profile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    api.get("/user/profile").then((res) => {
      setUser({
        username: res.data.username || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        address: res.data.address || "",
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put("/user/profile", {
      username: user.username,
      phone: user.phone,
      address: user.address,
    });
    alert("Profile updated successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4">

        {/* LEFT SIDEBAR */}
        <div className="col-span-12 md:col-span-3 bg-white border">
          <div className="p-4 border-b flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              👤
            </div>
            <div>
              <p className="text-xs text-gray-500">Hello,</p>
              <p className="font-semibold text-sm">{user.username}</p>
            </div>
          </div>

          <div className="p-4 text-sm space-y-4">
            <div className="font-semibold text-gray-700">MY ORDERS</div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                ACCOUNT SETTINGS
              </p>
              <ul className="space-y-2">
                <li className="text-blue-600 font-medium">
                  Profile Information
                </li>
                <li className="text-gray-600 hover:text-blue-600 cursor-pointer">
                  Manage Addresses
                </li>
                <li className="text-gray-600 hover:text-blue-600 cursor-pointer">
                  PAN Card Information
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">PAYMENTS</p>
              <ul className="space-y-2">
                <li className="text-gray-600">Gift Cards ₹0</li>
                <li className="text-gray-600">Saved UPI</li>
                <li className="text-gray-600">Saved Cards</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-12 md:col-span-9 bg-white border">
          <div className="border-b px-6 py-4 flex justify-between">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <span className="text-blue-600 text-sm cursor-pointer">
              Edit
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">

            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                className="border px-3 py-2 text-sm rounded-sm"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
                placeholder="Username"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                className="w-full border px-3 py-2 text-sm rounded-sm bg-gray-100 mt-1"
                value={user.email}
                disabled
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="text-sm font-medium">Mobile Number</label>
              <input
                type="text"
                className="w-full border px-3 py-2 text-sm rounded-sm mt-1"
                value={user.phone}
                onChange={(e) =>
                  setUser({ ...user, phone: e.target.value })
                }
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium">Address</label>
              <textarea
                className="w-full border px-3 py-2 text-sm rounded-sm mt-1 resize-none h-24"
                value={user.address}
                onChange={(e) =>
                  setUser({ ...user, address: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="bg-[#2874f0] text-white px-8 py-2 text-sm font-semibold rounded-sm hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}




      

              