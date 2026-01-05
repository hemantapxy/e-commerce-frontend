import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Heart } from "lucide-react"; // Install lucide-react for professional icons

export default function ProductCard({ product, token, handleAdd, showActions = true }) {
  const navigate = useNavigate();

  const goToDetails = () => navigate(`/product/${product._id}`);

  const onAddClick = (e) => {
    e.stopPropagation();
    if (!token) {
      navigate("/login");
    } else {
      handleAdd(product._id);
    }
  };

  return (
    <div 
      onClick={goToDetails}
      className="bg-white dark:bg-gray-900 group border-r border-b border-gray-100 dark:border-gray-800 p-4 flex flex-col cursor-pointer transition-all hover:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] relative"
    >
      {/* Wishlist Icon */}
      <button className="absolute top-3 right-3 text-gray-300 hover:text-red-500 z-10 transition-colors">
        <Heart size={18} />
      </button>

      {/* Image Container with Aspect Ratio */}
      <div className="h-44 w-full flex items-center justify-center mb-3 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow text-center md:text-left">
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating Badge */}
        <div className="flex items-center gap-2 mt-1 justify-center md:justify-start">
          <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
            4.2 <Star size={8} fill="currentColor" />
          </span>
          <span className="text-gray-400 text-[11px] font-medium">(1,240)</span>
        </div>

        {/* Pricing Hierarchy */}
        <div className="mt-2 flex items-center gap-2 justify-center md:justify-start">
          <span className="text-base font-bold text-gray-900 dark:text-white">₹{product.price}</span>
          <span className="text-gray-400 line-through text-xs font-medium">₹{Math.round(product.price * 1.3)}</span>
          <span className="text-green-600 text-xs font-bold italic">30% off</span>
        </div>
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="mt-3 flex gap-2">
          {product.affiliateUrl ? (
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-[#fb641b] text-white py-2 text-xs font-bold rounded-sm text-center uppercase shadow-sm"
            >
              Buy Now
            </a>
          ) : (
            <button
              onClick={onAddClick}
              className="flex-1 bg-[#ff9f00] text-white py-2 text-xs font-bold rounded-sm uppercase shadow-sm"
            >
              Add to Cart
            </button>
          )}
        </div>
      )}
    </div>
  );
}