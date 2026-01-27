import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/bookings/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load bookings");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading bookings...</p>;

  if (bookings.length === 0)
    return <p className="text-center mt-10">No bookings found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">✈️ My Bookings</h2>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white p-5 rounded shadow flex flex-col md:flex-row justify-between"
          >
            <div>
              <p className="font-bold">
                {b.flight.airline} ({b.flight.flightNumber})
              </p>
              <p className="text-gray-600">
                {b.flight.from} → {b.flight.to}
              </p>
              <p className="text-sm text-gray-500">
                Departure: {b.flight.departureTime}
              </p>
              <p className="text-sm">
                Status:{" "}
                <span className="text-green-600 font-semibold">{b.status}</span>
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/ticket", { state: { booking: b } })
              }
              className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-2 rounded"
            >
              View Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
