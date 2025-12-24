import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Remove item from cart
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle checkout - redirect to address page
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first to place an order");
      navigate("/login");
      return;
    }

    // Save cart for checkout
    localStorage.setItem("checkoutCart", JSON.stringify(cart));

    // Redirect to address page
    navigate("/address");
  };

  const total = cart.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0);

  if (cart.length === 0) {
    return <h2 className="p-6 text-xl font-bold">Your cart is empty</h2>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {cart.map((p, i) => (
        <div
          key={i}
          className="border p-3 mb-2 flex justify-between items-center"
        >
          <div>
            <span className="font-semibold">{p.name}</span>
            <p>
              ₹{p.price.toLocaleString()} x {p.quantity || 1} = ₹
              {(p.price * (p.quantity || 1)).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(i)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          > 
            Remove
          </button>
          <button
        onClick={handleCheckout}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Checkout / Buy Now
      </button>
        </div>
      ))}

      <h3 className="font-bold mt-4">Total: ₹{total.toLocaleString()}</h3>

      <button
        onClick={handleCheckout}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Checkout / Buy Now
      </button>
    </div>
  );
}
