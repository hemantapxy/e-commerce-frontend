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
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-4 rounded"/>
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600 mt-1">₹{product.price}</p>
      <button
        onClick={onAddClick}
        className="bg-green-500 text-white px-3 py-1 rounded mt-2 hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  );
}
