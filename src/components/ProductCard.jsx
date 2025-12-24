import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
      <img src={product.image} className="h-40 w-full object-cover" />
      <h2 className="font-bold mt-2">{product.name}</h2>
      <p className="text-gray-600">₹{product.price}</p>

      <div className="flex justify-between mt-3">
        <Link
          to={`/product/${product._id}`}
          className="text-blue-600"
        >
          View
        </Link>
        <button
          onClick={addToCart}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}




          