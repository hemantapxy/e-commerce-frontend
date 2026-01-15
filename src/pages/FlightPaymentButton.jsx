import React from "react";
import { createFlightPayment, verifyFlightPayment } from "../api";

export default function FlightPaymentButton({ flight, passengers, amount }) {

  const handlePayment = async () => {
    const { data } = await createFlightPayment({
      flightId: flight.id,
      passengers,
      amount,
    });

    const options = {
      key: data.key,
      order_id: data.order.id,
      amount: data.order.amount,
      currency: "INR",
      name: "Flight Booking",
      description: "Flight Ticket Payment",

      handler: async (response) => {
        await verifyFlightPayment({
          bookingId: data.bookingId,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        alert("Flight booked successfully ✈️");
        window.location.href = "/booking-success";
      },
    };

    new window.Razorpay(options).open();
  };

  return (
    <button onClick={handlePayment} className="btn-primary">
      Pay ₹{amount}
    </button>
  );
}
