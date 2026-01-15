import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFlightById } from "../api";
// Note: You can use Lucide-React icons if installed, or standard Emojis as shown below
import { 
  ArrowLeft, 
  Clock, 
  Armchair, 
  ShieldCheck, 
  Briefcase 
} from "lucide-react"; 

export default function FlightDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    getFlightById(id).then((res) => setFlight(res.data));
  }, [id]);

  if (!flight) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-500 font-medium">Fetching best prices...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20">
      {/* MINIMALIST TOP NAV */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-semibold text-gray-600 hover:text-blue-600 transition"
          >
            ← Back to results
          </button>
          <div className="text-right">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Transaction Secured</span>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: FLIGHT INFO */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* MAIN TICKET CARD */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-8 py-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={flight.image} alt={flight.airline} className="h-8 object-contain" />
                  <span className="font-bold text-gray-800">{flight.airline} • {flight.flightNumber}</span>
                </div>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-1 rounded uppercase">
                  Confirmed
                </span>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start">
                  {/* Departure */}
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-900">{flight.departureTime}</h3>
                    <p className="text-lg font-semibold text-gray-700">{flight.fromCode || flight.from}</p>
                    <p className="text-sm text-gray-400">Terminal 3, IGIA</p>
                  </div>

                  {/* Duration Divider */}
                  <div className="flex-1 px-4 flex flex-col items-center pt-2">
                    <span className="text-xs font-bold text-gray-400 mb-2">{flight.duration}</span>
                    <div className="relative w-full border-t-2 border-dashed border-gray-200">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2">
                        ✈️
                      </div>
                    </div>
                    <span className="text-[10px] text-green-600 font-bold mt-2 tracking-widest uppercase">Non-stop</span>
                  </div>

                  {/* Arrival */}
                  <div className="flex-1 text-right">
                    <h3 className="text-3xl font-bold text-gray-900">{flight.arrivalTime}</h3>
                    <p className="text-lg font-semibold text-gray-700">{flight.toCode || flight.to}</p>
                    <p className="text-sm text-gray-400">Terminal 1</p>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-4 border-t pt-8">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-50 rounded-lg text-orange-600 font-bold">🧳</div>
                      <div>
                        <p className="text-[10px] uppercase text-gray-400 font-bold">Baggage</p>
                        <p className="text-sm font-semibold">15kg Check-in</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600 font-bold">💺</div>
                      <div>
                        <p className="text-[10px] uppercase text-gray-400 font-bold">Seat</p>
                        <p className="text-sm font-semibold">{flight.seatsAvailable} Left</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg text-green-600 font-bold">🍔</div>
                      <div>
                        <p className="text-[10px] uppercase text-gray-400 font-bold">Meals</p>
                        <p className="text-sm font-semibold">Available</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* AMENITIES SECTION */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4">Flight Amenities</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {["USB Outlet", "WiFi", "Legroom", "Entertainment"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PRICE BREAKUP & BOOKING */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 sticky top-24">
              <h4 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-4">Price Summary</h4>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Base Fare</span>
                  <span>₹{flight.price - 450}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Fees</span>
                  <span>₹450</span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-black text-blue-600">₹{flight.price}</span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/booking/${flight._id}`, { state: { flight } })}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
              >
                Continue to Booking
              </button>

              <div className="mt-6 flex items-start gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
                <span className="text-green-600 text-lg">🛡️</span>
                <p className="text-[11px] text-green-800 leading-relaxed font-medium">
                  <strong>Secure Booking:</strong> Your data is encrypted and your seat is held for 15 minutes.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}