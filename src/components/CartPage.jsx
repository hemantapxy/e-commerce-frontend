import React from "react";  
import { useEffect, useState } from "react";
import { getCart, addToCart, removeFromCart } from "../api";

export default function CartPage({ token }) {
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    if(token) getCart(token).then(res => setCart(res.data));
  }, [token]);

  const handleAdd = async id => {
    const res = await addToCart(id, token);
    setCart(res.data);
  };

  const handleRemove = async id => {
    const res = await removeFromCart(id, token);
    setCart(res.data);
  };

  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map(item => (
            <div key={item.product._id} className="flex items-center justify-between border p-4 rounded">
              <div className="flex items-center gap-4">
                <img src={item.product.image} className="h-20 w-20 object-cover rounded"/>
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p>₹{item.product.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={()=>handleRemove(item.product._id)}>-</button>
                <span>{item.quantity}</span>
                <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={()=>handleAdd(item.product._id)}>+</button>
              </div>
              <p className="font-semibold">₹{item.product.price * item.quantity}</p>
            </div>
          ))}
          <div className="text-right mt-6 text-xl font-bold">Total: ₹{total}</div>
        </div>
      )}
    </div>
  );
}
