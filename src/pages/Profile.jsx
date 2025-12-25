import React from "react";
import { useEffect, useState } from "react";
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
    <div className="min-h-screen bg-[#f1f3f6] flex justify-center p-6">
      <div className="bg-white w-full max-w-3xl p-6 rounded shadow-sm">
        <h2 className="text-lg font-semibold border-b pb-3 mb-6">
          Personal Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username & Email */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Username
              </label>
              <input
                className="w-full border px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
              />
            </div>

            <div className="flex-1">
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Email
              </label>
              <input
                className="w-full border px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
                value={user.email}
                disabled
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Phone
            </label>
            <input
              className="w-full border px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              value={user.phone}
              onChange={(e) =>
                setUser({ ...user, phone: e.target.value })
              }
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Address
            </label>
            <textarea
              className="w-full border px-3 py-2 text-sm resize-none h-20 focus:outline-none focus:border-blue-500"
              value={user.address}
              onChange={(e) =>
                setUser({ ...user, address: e.target.value })
              }
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-[#2874f0] text-white px-6 py-2 text-sm font-semibold hover:bg-blue-600 transition"
          >
            SAVE CHANGES
          </button>
        </form>
      </div>
    </div>
  );
}
