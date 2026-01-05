import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCart } from "../api";
import PaymentButton from "./PaymentButton";

export default function Checkout() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Product from Buy Now
  const productFromState = location.state?.product;
  const quantityFromState = location.state?.quantity || 1;

  useEffect(() => {
    if (productFromState) {
      // Only checkout this product
      setCart({ items: [{ product: productFromState, quantity: quantityFromState }] });
      setLoading(false);
    } else {
      // Fetch full cart if no product passed
      getCart()
        .then((res) => {
          const validItems = (res.data.items || []).filter((item) => item.product !== null);
          setCart({ items: validItems });
        })
        .finally(() => setLoading(false));
    }
  }, [productFromState, quantityFromState]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!cart.items.length) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        No items to checkout.
      </p>
    );
  }

  const total = cart.items
    .filter((item) => item.product)
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f1f3f6] p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

        {cart.items
          .filter((item) => item.product)
          .map((item) => (
            <div key={item.product._id} className="flex justify-between border-b py-4">
              <div className="flex gap-4">
                <img
                  src={item.product.image}
                  className="w-20 h-20 object-cover rounded"
                  alt={item.product.name}
                />
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p>₹{item.product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
              <p>₹{item.product.price * item.quantity}</p>
            </div>
          ))}

        <div className="flex justify-between items-center mt-8">
          <h2 className="text-2xl font-bold">Total: ₹{total}</h2>

          <PaymentButton
            amount={total}
            onSuccess={() => navigate("/orders")}
          />
        </div>
      </div>
    </div>
  );
}
