import React from "react";
import { useNavigate } from "react-router-dom";

export default function FlightCard({ flight }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/flights/${flight._id}`)}
      className="group bg-white border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer p-5 mb-4 rounded-xl"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* 1. AIRLINE LOGO & NAME */}
        <div className="flex items-center gap-4 min-w-[180px]">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 p-2">
            {/* Fallback to text if image fails, or use flight.image */}
            {flight.image ? (
                <img src={flight.image} alt={flight.airline} className="object-contain" />
            ) : (
                <span className="text-xs font-bold text-gray-400">LOGO</span>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 leading-tight">
              {flight.airline}
            </h2>
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              {flight.flightNumber}
            </p>
          </div>
        </div>

        {/* 2. THE ROUTE TIMELINE */}
        <div className="flex-1 flex items-center justify-between max-w-md mx-auto w-full">
          {/* Departure */}
          <div className="text-left">
            <p className="text-xl font-bold text-gray-800">{flight.departureTime}</p>
            <p className="text-sm font-semibold text-gray-500">{flight.fromCode || flight.from}</p>
          </div>

          {/* Connection Line */}
          <div className="flex-1 px-4 flex flex-col items-center group">
            <p className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-tighter">
                {flight.duration || "2h 30m"}
            </p>
            <div className="relative w-full h-[2px] bg-gray-200">
              <div className="absolute -top-[3px] left-0 w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="absolute -top-[3px] right-0 w-2 h-2 rounded-full bg-gray-300"></div>
              {/* Animated plane on hover */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-1 text-xs transition-transform duration-500 group-hover:translate-x-2">
                ✈️
              </div>
            </div>
            <p className="text-[10px] text-green-600 font-bold mt-1 uppercase">Direct</p>
          </div>

          {/* Arrival */}
          <div className="text-right">
            <p className="text-xl font-bold text-gray-800">{flight.arrivalTime}</p>
            <p className="text-sm font-semibold text-gray-500">{flight.toCode || flight.to}</p>
          </div>
        </div>

        {/* 3. PRICING & CTA */}
        <div className="flex items-center md:flex-col md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8">
          <div className="md:text-right">
            <p className="text-xs text-gray-400 font-medium">Per traveler</p>
            <p className="text-2xl font-black text-gray-900 tracking-tight">
              ₹{flight.price.toLocaleString("en-IN")}
            </p>
          </div>
          <button className="hidden md:block mt-2 bg-blue-600 group-hover:bg-blue-700 text-white text-sm font-bold py-2 px-6 rounded-lg transition-colors">
            Select
          </button>
        </div>

      </div>
    </div>
  );
}