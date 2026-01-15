import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFlights } from "../api";
import FlightSlider from "../components/FlightSlider";

export default function Flights() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [search, setSearch] = useState({ from: "", to: "", departureDate: "" });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async (params = {}) => {
    try {
      const { data } = await getFlights(params);
      setFlights(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchFlights(search);
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] font-sans">
      
      {/* FLIPKART STYLE SEARCH HEADER */}
      <div className="bg-fuchsia-600 pb-10 pt-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
            Book Flights with <span className="text-[#ffe500] italic">E-CART Travel</span>
          </h1>
          
          <div className="bg-white p-4 rounded-sm shadow-xl grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">From</label>
              <input
                name="from"
                value={search.from}
                onChange={handleChange}
                placeholder="Enter City"
                className="border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-blue-500 text-sm font-semibold"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">To</label>
              <input
                name="to"
                value={search.to}
                onChange={handleChange}
                placeholder="Enter City"
                className="border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-blue-500 text-sm font-semibold"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Departure</label>
              <input
                name="departureDate"
                type="date"
                value={search.departureDate}
                onChange={handleChange}
                className="border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-blue-500 text-sm font-semibold"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#fb641b] hover:bg-[#f4511e] text-white py-3 px-8 rounded-sm font-bold shadow-md transition-all uppercase tracking-tight"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-2 -mt-6 pb-20">
        
        {/* TRENDING SLIDER SECTION */}
        <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-200 mb-6">
          <FlightSlider />
        </div>

        {/* FLIGHT LISTING */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-200">
          
          {/* List Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="font-bold text-gray-800 uppercase text-xs tracking-wider">
              {flights.length} Flights Available
            </h2>
            <div className="text-xs text-blue-600 font-bold cursor-pointer">SORT BY PRICE ↓</div>
          </div>

          {flights.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-gray-400">No flights found. Try a different city.</p>
            </div>
          ) : (
            flights.map((flight) => (
              <div
                key={flight._id}
                className="group p-6 border-b border-gray-100 hover:bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-6 transition-colors"
              >
                {/* Airline & Number */}
                <div className="flex items-center gap-4 w-full md:w-1/4">
                  <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center border border-gray-100 p-2">
                    <img src={flight.image} alt="logo" className="object-contain" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 leading-tight">{flight.airline}</p>
                    <p className="text-[11px] text-gray-500 font-medium uppercase mt-1">{flight.flightNumber}</p>
                  </div>
                </div>

                {/* Departure & Arrival */}
                <div className="flex-1 flex items-center justify-between max-w-md w-full">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{flight.departureTime}</p>
                    <p className="text-xs text-gray-500 font-bold uppercase">{flight.from}</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <p className="text-[10px] text-gray-400 font-bold mb-1">{flight.duration || '2h 10m'}</p>
                    <div className="w-24 h-[1px] bg-gray-300 relative">
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px]">✈</div>
                    </div>
                    <p className="text-[10px] text-green-600 font-bold mt-1 uppercase tracking-tighter">Non-stop</p>
                  </div>

                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{flight.arrivalTime}</p>
                    <p className="text-xs text-gray-500 font-bold uppercase">{flight.to}</p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto md:pl-10 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <p className="text-2xl font-black text-gray-900 leading-none">₹{flight.price.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase line-through">₹{Math.round(flight.price * 1.2)}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/flights/${flight._id}`, { state: { flight } })}
                    className="md:mt-3 bg-[#fb641b] hover:bg-[#f4511e] text-white text-xs font-black py-2.5 px-10 rounded-sm uppercase tracking-tighter transition-all shadow-sm"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}