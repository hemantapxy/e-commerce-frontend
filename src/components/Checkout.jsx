import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, placeOrder } from "../api";

export default function Checkout() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart
    getCart()
      .then(res => {
        setCart(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch cart:", err);
        setLoading(false);
      });
  }, []);

  const handlePlaceOrder = async () => {
    try {
      await placeOrder(); // creates order and clears cart
      alert("Order placed successfully!");
      navigate("/orders"); // go to Orders page
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (!cart.items || cart.items.length === 0)
    return <p>Your cart is empty.</p>;

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#f1f3f6] p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

        {/* CART ITEMS */}
        <div className="space-y-4">
          {cart.items.map(item => (
            <div
              key={item.product._id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  className="h-20 w-20 object-cover rounded"
                  alt={item.product.name}
                />
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p className="text-sm text-gray-600">₹{item.product.price}</p>
                </div>
              </div>

              <span className="font-medium">{item.quantity}</span>

              <p className="font-semibold">
                ₹{item.product.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* TOTAL + PLACE ORDER */}
        <div className="flex justify-between items-center mt-8">
          <h2 className="text-xl font-bold">Total: ₹{total}</h2>
          <button
            onClick={handlePlaceOrder}
            className="bg-[#fb641b] text-white px-8 py-3 text-sm font-semibold rounded hover:bg-orange-600"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
}
