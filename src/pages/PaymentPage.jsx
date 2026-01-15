import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// Optional: Install lucide-react for professional icons
import { Plane, UserPlus, Trash2, ShieldCheck, ChevronRight } from "lucide-react";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const flight = location.state?.flight;

  const [passengers, setPassengers] = useState([{ id: Date.now(), name: "", age: "", gender: "Male" }]);
  const [loading, setLoading] = useState(false);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    if (!userToken) {
      alert("Please login to continue your booking");
      navigate("/login");
    }
  }, [userToken, navigate]);

  if (!flight) return <div className="flex justify-center items-center h-screen font-semibold text-gray-500 text-xl">Loading flight details...</div>;

  const pricePerPerson = flight?.price || 0;
  const totalPrice = pricePerPerson * passengers.length;

  const addPassenger = () => {
    if (passengers.length < 6) {
      setPassengers([...passengers, { id: Date.now() + Math.random(), name: "", age: "", gender: "Male" }]);
    }
  };

  const removePassenger = (id) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter(p => p.id !== id));
    }
  };

  const updatePassenger = (id, field, value) => {
    setPassengers(passengers.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handlePayment = async () => {
    for (const p of passengers) {
      if (!p.name.trim() || !p.age) return alert("Please provide details for all passengers");
    }

    try {
      setLoading(true);
      const { data: orderData } = await axios.post(
        "http://localhost:5000/api/flight-payment/create-order",
        { flightId: flight._id, passengers },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      const { order, key_id } = orderData;

      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: "TravelConnect",
        description: `Booking: ${flight.airline} | ${flight.from} to ${flight.to}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            const res = await axios.post(
              "http://localhost:5000/api/flight-payment/verify-payment",
              { flightId: flight._id, passengers, ...response },
              { headers: { Authorization: `Bearer ${userToken}` } }
            );
            navigate("/ticket", { state: { booking: res.data.booking } });
          } catch (err) {
            alert("Verification failed. Please contact support.");
          }
        },
        theme: { color: "#2874f0" }, // Flipkart Blue
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* Header Area */}
      <div className="bg-blue-600 text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-2">
          <Plane className="rotate-45" />
          <h1 className="text-xl font-bold tracking-tight">Review Your Booking</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Flight & Passenger Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Flight Info Card */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Departure</span>
              <span className="text-gray-500 text-sm italic">Refundable Rules Apply</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 border rounded flex items-center justify-center font-bold text-blue-600 italic">
                {flight.airline.substring(0,2)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">{flight.from} → {flight.to}</h2>
                <p className="text-sm text-gray-500">{flight.airline} • {flight.flightNumber}</p>
              </div>
            </div>
          </div>

          {/* Passenger Input Card */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-200">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <UserPlus size={18} /> Passenger Details
              </h3>
              <span className="text-xs text-gray-500 uppercase tracking-wider">{passengers.length} Adult(s)</span>
            </div>
            
            <div className="p-6 space-y-6">
              {passengers.map((p, index) => (
                <div key={p.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50 relative">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                      <input
                        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="As per Passport/ID"
                        value={p.name}
                        onChange={(e) => updatePassenger(p.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-gray-600 mb-1">Age</label>
                      <input
                        type="number"
                        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Age"
                        value={p.age}
                        onChange={(e) => updatePassenger(p.id, "age", e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-gray-600 mb-1">Gender</label>
                      <select 
                        className="border rounded px-3 py-2 bg-white"
                        value={p.gender}
                        onChange={(e) => updatePassenger(p.id, "gender", e.target.value)}
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                  {passengers.length > 1 && (
                    <button 
                      onClick={() => removePassenger(p.id)}
                      className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1 rounded-full hover:bg-red-200 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}

              <button 
                onClick={addPassenger}
                className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline"
              >
                + ADD ADULT
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Price Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-sm shadow-sm border border-gray-200 sticky top-6">
            <div className="px-6 py-4 border-b">
              <h3 className="font-bold text-gray-500 text-sm uppercase tracking-widest">Fare Summary</h3>
            </div>
            
            <div className="p-6 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Base Fare (x{passengers.length})</span>
                <span>₹{pricePerPerson * passengers.length}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Taxes & Fees</span>
                <span className="text-green-600 text-xs">FREE</span>
              </div>
              <hr className="my-2 border-dashed" />
              <div className="flex justify-between text-lg font-black text-gray-900">
                <span>Total Amount</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 border-t border-b text-[11px] text-gray-600 flex items-start gap-2">
              <ShieldCheck className="text-green-600 flex-shrink-0" size={16} />
              <span>By clicking Continue, you agree to our Terms & Conditions and Fare Rules.</span>
            </div>

            <div className="p-4">
              <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-3 rounded text-white font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2
                  ${loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"}`}
              >
                {loading ? "PROCEEDING..." : "PROCEED TO PAY"}
                {!loading && <ChevronRight size={20} />}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}