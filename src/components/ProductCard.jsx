import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, token, handleAdd }) {
  const navigate = useNavigate();

  const onAddClick = () => {
    if (!token) {
      alert("Please login first to add products to cart");
      navigate("/login");
    } else {
      handleAdd(product._id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover mb-4 rounded"
      />
      <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
      <p className="text-gray-600 mt-1 font-medium">₹{product.price}</p>

      {/* Optional: show affiliate link button if exists */}
      {product.affiliateUrl && (
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-3 py-1 rounded mt-2 hover:bg-blue-600 text-center"
        >
          Buy Now
        </a>
      )}

      {!product.affiliateUrl && (
        <button
          onClick={onAddClick}
          className="bg-green-500 text-white px-3 py-1 rounded mt-2 hover:bg-green-600"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
