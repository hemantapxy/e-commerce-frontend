import React from "react";
import { createRazorpayOrder, verifyRazorpayPayment } from "../api";

export default function PaymentButton({ amount, onSuccess }) {
  const handlePayment = async () => {
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
          await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          alert("Payment successful");
          onSuccess(); // ✅ redirect AFTER order saved
        },

        theme: { color: "#f97316" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-600 text-white px-8 py-3 rounded-lg"
    >
      PAY ₹{amount}
    </button>
  );
}
