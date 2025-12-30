import React, { useEffect, useState } from "react";
import { getCart, addToCart, removeFromCart } from "../api";
import { useNavigate } from "react-router-dom";

export default function CartPage({ token }) {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch cart
  useEffect(() => {
    if (token) {
      getCart(token)
        .then((res) => setCart(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleAdd = async (id) => {
    const res = await addToCart(id, token);
    setCart(res.data);
  };

  const handleRemove = async (id) => {
    const res = await removeFromCart(id, token);
    setCart(res.data);
  };

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        Your cart is empty.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Your Cart</h1>

        {/* CART ITEMS */}
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  className="h-24 w-24 object-cover rounded-lg shadow-sm"
                  alt={item.product.name}
                />
                <div>
                  <h2 className="font-semibold text-gray-800 text-lg">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-gray-600">₹{item.product.price}</p>
                </div>
              </div>

              {/* QUANTITY */}
              <div className="flex items-center gap-3 mt-2 md:mt-0">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => handleRemove(item.product._id)}
                >
                  −
                </button>
                <span className="font-medium text-gray-700">{item.quantity}</span>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  onClick={() => handleAdd(item.product._id)}
                >
                  +
                </button>
              </div>

              {/* PRICE */}
              <p className="font-semibold text-gray-800 text-lg">
                ₹{item.product.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* TOTAL + BUY NOW */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Total: ₹{total}</h2>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-8 py-3 text-sm font-semibold rounded shadow-lg hover:from-orange-500 hover:to-orange-700 transition-all duration-300"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}
