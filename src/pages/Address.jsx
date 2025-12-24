import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Address() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const handleNext = () => {
    if (!address.trim()) return alert("Please enter your address");
    localStorage.setItem("shippingAddress", address);
    navigate("/payment");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50">
      {/* STEPPER HEADER */}
      <div className="flex items-center justify-center mb-8 space-x-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 text-white flex items-center justify-center rounded-full">
            1
          </div>
          <span className="font-semibold text-gray-700">Address</span>
        </div>
        <div className="w-12 h-0.5 bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 text-white flex items-center justify-center rounded-full">
            2
          </div>
          <span className="font-semibold text-gray-400">Payment</span>
        </div>
      </div>

      {/* ADDRESS FORM */}
      <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
        <textarea
          className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          placeholder="Enter your complete address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          onClick={handleNext}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
        >
          Deliver Here & Proceed
        </button>
      </div>
    </div>
  );
}
