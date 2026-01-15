import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        
        <div className="text-green-500 text-6xl mb-4">✔</div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Booking Confirmed!
        </h1>

        <p className="text-gray-600 mb-6">
          Your flight ticket has been booked successfully.
          A confirmation email has been sent to you.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg text-sm text-left mb-6 space-y-1">
          <p>📧 Check your email for ticket details</p>
          <p>🕒 Arrive at airport at least 2 hours before departure</p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Home
          </button>

          <button
            onClick={() => navigate("/flights")}
            className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50"
          >
            Book Another Flight
          </button>
        </div>
      </div>
    </div>
  );
}
