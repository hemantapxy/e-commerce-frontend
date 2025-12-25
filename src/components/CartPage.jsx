import React from "react";
import { useEffect, useState } from "react";
import { getCart, addToCart, removeFromCart } from "../api";
import { useNavigate } from "react-router-dom";

export default function CartPage({ token }) {
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getCart(token).then((res) => setCart(res.data));
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

  return (
    <div className="min-h-screen bg-[#f1f3f6] p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 shadow">

        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

        {cart.items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="space-y-4">
              {cart.items.map((item) => (
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
                      <h2 className="font-semibold">
                        {item.product.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        ₹{item.product.price}
                      </p>
                    </div>
                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        handleRemove(item.product._id)
                      }
                    >
                      −
                    </button>

                    <span className="font-medium">
                      {item.quantity}
                    </span>

                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        handleAdd(item.product._id)
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* PRICE */}
                  <p className="font-semibold">
                    ₹{item.product.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* TOTAL + BUY NOW */}
            <div className="flex justify-between items-center mt-8">
              <h2 className="text-xl font-bold">
                Total: ₹{total}
              </h2>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-[#fb641b] text-white px-8 py-3 text-sm font-semibold rounded hover:bg-orange-600"
              >
                BUY NOW
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
