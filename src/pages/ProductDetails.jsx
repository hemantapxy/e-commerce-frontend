import React from "react";

export default function ProductDetails({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 object-contain mb-4"
      />

      <h3 className="text-sm font-semibold line-clamp-2">
        {product.name}
      </h3>

      <p className="text-lg font-bold text-green-600 mt-2">
        ₹{product.price.toLocaleString()}
      </p>

      <button
        onClick={() => onAddToCart(product)}
        className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
