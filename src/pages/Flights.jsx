import React, { useState } from "react";

const flightBanners = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
];

export default function Flights() {
  const [tripType, setTripType] = useState("oneway");
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto slide every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev === flightBanners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentBanner((prev) => (prev === 0 ? flightBanners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentBanner((prev) => (prev === flightBanners.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* FLIGHT SLIDER */}
      <div className="relative max-w-6xl mx-auto mt-6 overflow-hidden rounded-lg shadow-lg">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {flightBanners.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full flex-shrink-0 h-64 md:h-80 object-cover"
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70 transition"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70 transition"
        >
          &#10095;
        </button>

        {/* Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {flightBanners.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                currentBanner === index ? "bg-white" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-20">
          <h1 className="text-3xl md:text-4xl font-bold">Flight Bookings ✈️</h1>
          <p className="text-sm md:text-base mt-2">
            Domestic & International Flights at Best Prices
          </p>
        </div>
      </div>

      {/* SEARCH CARD */}
      <div className="max-w-6xl mx-auto mt-6 bg-white rounded shadow p-6">

        {/* Trip Type Tabs */}
        <div className="flex gap-6 border-b pb-3 mb-6">
          {[
            { id: "oneway", label: "One Way" },
            { id: "roundtrip", label: "Round Trip" },
            { id: "multicity", label: "Multi City" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTripType(tab.id)}
              className={`text-sm font-medium pb-2 ${
                tripType === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="border rounded p-3">
            <p className="text-xs text-gray-500">FROM</p>
            <input className="w-full outline-none font-semibold" placeholder="DEL - Delhi" />
          </div>
          <div className="border rounded p-3">
            <p className="text-xs text-gray-500">TO</p>
            <input className="w-full outline-none font-semibold" placeholder="BOM - Mumbai" />
          </div>
          <div className="border rounded p-3">
            <p className="text-xs text-gray-500">DEPARTURE</p>
            <input type="date" className="w-full outline-none" />
          </div>
          {tripType === "roundtrip" && (
            <div className="border rounded p-3">
              <p className="text-xs text-gray-500">RETURN</p>
              <input type="date" className="w-full outline-none" />
            </div>
          )}
          <div className="border rounded p-3">
            <p className="text-xs text-gray-500">TRAVELLERS & CLASS</p>
            <p className="font-semibold">1 Adult, Economy</p>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded font-bold text-lg">
            SEARCH FLIGHTS
          </button>
        </div>
      </div>
    </div>
  );
}
