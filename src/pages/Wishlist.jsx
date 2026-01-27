import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlistFlights")) || [];
    setWishlist(saved);
  }, []);

  // Remove flight
  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((flight) => flight._id !== id);
    localStorage.setItem("wishlistFlights", JSON.stringify(updated));
    setWishlist(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Wishlist ✈️ (Demo)</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          No flights in wishlist
        </p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((flight) => (
            <div
              key={flight._id}
              className="bg-white p-5 rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold text-lg">{flight.airline}</h2>
                <p className="text-sm text-gray-500">
                  {flight.from} → {flight.to}
                </p>
                <p className="font-semibold mt-1">₹{flight.price}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    navigate(`/flights/${flight._id}`, { state: { flight } })
                  }
                  className="bg-orange-500 text-white px-4 py-2 text-sm rounded"
                >
                  Book
                </button>

                <button
                  onClick={() => removeFromWishlist(flight._id)}
                  className="bg-red-500 text-white px-4 py-2 text-sm rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
