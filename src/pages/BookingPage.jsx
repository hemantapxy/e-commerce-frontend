import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function BookingPage() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const flight = state?.flight;

  const [passenger, setPassenger] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Male",
  });

  // If flight data is missing, show error
  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Flight data missing ❌
      </div>
    );
  }

  const handleChange = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  const handleBooking = () => {
    const { name, email, phone } = passenger;
    if (!name || !email || !phone) {
      alert("Please fill all passenger details");
      return;
    }

    // Navigate to PaymentPage and pass flight + passenger info
    navigate(`/payment/${id}`, {
      state: { flight, passenger },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto bg-blue-600 text-white p-5 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Review & Book ✈️</h1>
        <p className="text-sm opacity-90">
          {flight.from} → {flight.to}
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PASSENGER FORM */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold text-lg mb-4">Passenger Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={passenger.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-3 rounded focus:outline-blue-500 focus:ring-1 focus:ring-blue-400"
            />
            <input
              name="email"
              type="email"
              value={passenger.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="border p-3 rounded focus:outline-blue-500 focus:ring-1 focus:ring-blue-400"
            />
            <input
              name="phone"
              value={passenger.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border p-3 rounded focus:outline-blue-500 focus:ring-1 focus:ring-blue-400"
            />
            <select
              name="gender"
              value={passenger.gender}
              onChange={handleChange}
              className="border p-3 rounded focus:outline-blue-500 focus:ring-1 focus:ring-blue-400"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* PRICE SUMMARY */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="font-bold text-lg mb-4">Fare Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Base Fare</span>
              <span>₹{flight.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Fees</span>
              <span>₹500</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-green-600">₹{flight.price + 500}</span>
            </div>
          </div>

          <button
            onClick={handleBooking}
            className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold transition-colors duration-200"
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
}
