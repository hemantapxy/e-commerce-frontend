import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFlights } from "../api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function FlightSlider() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const { data } = await getFlights();
      setFlights(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!flights.length) return null;

  return (
    <div className="max-w-6xl mx-auto py-10 overflow-hidden">
      <div className="flex items-center gap-2 mb-6 px-4">
        <div className="w-2 h-8 bg-[#001b94] rounded-full"></div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Trending Routes</h2>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={3} 
        loop={true}
        allowTouchMove={false} // Prevents user dragging from breaking the flow
        speed={6000} // Adjust this for speed (higher = slower)
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: true, // THIS IS THE KEY FOR LEFT-TO-RIGHT
        }}
        className="continuous-slider"
        breakpoints={{
          320: { slidesPerView: 1.2, spaceBetween: 15 },
          768: { slidesPerView: 2.2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {flights.map((flight) => (
          <SwiperSlide key={flight._id}>
            <div
              onClick={() => navigate(`/flights/${flight._id}`)}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group"
            >
              <div className="relative h-40 overflow-hidden rounded-t-2xl">
                <img
                  src={flight.image}
                  alt={flight.to}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-3 left-4">
                    <p className="text-white font-black text-lg tracking-tight">{flight.to}</p>
                </div>
              </div>
              
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Starts at</p>
                  <p className="text-lg font-black text-[#001b94]">₹{flight.price.toLocaleString()}</p>
                </div>
                <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                    View →
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ESSENTIAL CSS FOR SMOOTH CONTINUOUS MOTION */}
      <style jsx="true">{`
        .continuous-slider .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </div>
  );
}