import React, { useState } from "react";
import { createRazorpayOrder, verifyRazorpayPayment } from "../api";

export default function PaymentButton({ amount, onSuccess }) {
  const [loading, setLoading] = useState(false); // ✅ loading state

  const handlePayment = async () => {
    if (loading) return; // prevent double clicks
    setLoading(true);

    try {
      const { data } = await createRazorpayOrder({ amount });

      const options = {
        key: data.key,
        order_id: data.order.id,
        amount: data.order.amount,
        currency: "INR",
        name: "My Store",
        description: "Order Payment",

        handler: async (response) => {
          try {
            await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("Payment successful");
            onSuccess(); // ✅ redirect AFTER order saved
          } catch (err) {
            console.error(err);
            alert("Payment verification failed");
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => setLoading(false), // ✅ stop loading if user closes popup
        },

        theme: { color: "#f97316" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`px-8 py-3 rounded-lg text-white ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
      }`}
    >
      {loading ? "Processing..." : `PAY ₹${amount}`}
    </button>
  );
}
