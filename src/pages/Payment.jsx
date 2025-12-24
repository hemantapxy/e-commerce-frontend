import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UPI_APPS = [
  { name: "PhonePe", icon: "data:image/png;base64,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" },
  { name: "Google pay", icon: "data:image/jpeg;base64,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" },
  { name: "Paytm", icon: "data:image/jpeg;base64,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" },
];

export default function Payment() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    setCart(savedCart);

    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) {
      alert("Please login first");
      navigate("/login");
    } else {
      setUser(loggedUser);
    }
  }, [navigate]);

  const total = cart.reduce(
    (sum, p) => sum + p.price * (p.quantity || 1),
    0
  );

  const handlePayment = () => {
    if (!paymentMode) {
      alert("Please select a payment mode");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      orderId: "ORD" + Date.now(),
      userId: user?.id || user?._id,
      items: cart,
      total,
      paymentMode,
      status: "Confirmed",
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutCart");

    alert("Payment successful! Order placed.");
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <h2 className="p-6 text-xl font-semibold text-center">
        Your cart is empty
      </h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">

      {/* LEFT: PAYMENT OPTIONS */}
      <div className="md:col-span-2 bg-white shadow rounded">
        <h2 className="text-xl font-bold px-6 py-4 border-b">
          Payment Options
        </h2>

        <div className="p-6 space-y-4">
          {["UPI", "Credit/Debit Card", "Netbanking", "Cash on Delivery"].map(
            (mode) => (
              <label
                key={mode}
                className={`flex items-center gap-4 p-4 border rounded cursor-pointer 
                ${paymentMode === mode ? "border-blue-600 bg-blue-50" : "hover:bg-gray-50"}`}
              >
                <input
                  type="radio"
                  name="paymentMode"
                  value={mode}
                  checked={paymentMode === mode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                />
                <div>
                  <p className="font-semibold">{mode}</p>
                  {mode === "Cash on Delivery" && (
                    <p className="text-sm text-gray-500">
                      Pay when you receive the product
                    </p>
                  )}
                </div>
              </label>
            )
          )}

          {/* SHOW UPI APPS */}
          {paymentMode === "UPI" && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {UPI_APPS.map((app) => (
                <div
                  key={app.name}
                  className="flex flex-col items-center p-2 border rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => alert(`Proceed with ${app.name}`)}
                >
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="h-12 object-contain mb-1"
                  />
                  <span className="text-sm">{app.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: ORDER SUMMARY */}
      <div className="bg-white shadow rounded p-6 h-fit">
        <h3 className="text-lg font-bold border-b pb-3 mb-4">
          Order Summary
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Price ({cart.length} items)</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Delivery Charges</span>
            <span>FREE</span>
          </div>

          <hr />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total Payable</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold"
        >
          Place Order & Pay
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Safe and secure payments 🔒
        </p>
      </div>
    </div>
  );
}
