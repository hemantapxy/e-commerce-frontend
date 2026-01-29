import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCartItems } from "../redux/cartSlice";
import api from "../api";

export default function ProductCard({ product, token, showActions = true }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inWishlist, setInWishlist] = useState(false);

  const goToDetails = () => navigate(`/product/${product._id}`);

  // 🔹 Check wishlist status
  useEffect(() => {
    if (!token) return;

    const checkWishlist = async () => {
      try {
        const res = await api.get("/wishlist");
        const exists = res.data.items.some(
          (item) => item.product?._id === product._id
        );
        setInWishlist(exists);
      } catch (err) {
        console.log("Wishlist fetch error", err);
      }
    };

    checkWishlist();
  }, [product._id, token]);

  // 🔹 Add to Cart
  const onAddClick = async (e) => {
    e.stopPropagation();
    if (!token) return navigate("/login");

    const variantId = product.variants?.[0]?._id || null;

    try {
      const res = await api.post("/cart/add", {
        productId: product._id,
        variant: variantId,
        quantity: 1,
      });

      const validItems = res.data.items.filter(
        (item) => item.product !== null
      );
      dispatch(setCartItems(validItems));
    } catch (err) {
      console.log("Add to cart error:", err);
    }
  };

  // 🔹 Wishlist Toggle
  const onWishlistClick = async (e) => {
    e.stopPropagation();
    if (!token) return navigate("/login");

    try {
      if (inWishlist) {
        await api.post("/wishlist/remove", { productId: product._id });
        setInWishlist(false);
      } else {
        await api.post("/wishlist/add", { productId: product._id });
        setInWishlist(true);
      }
    } catch (err) {
      console.log("Wishlist toggle error:", err);
    }
  };

  const imageSrc =
    product.image || product.variants?.[0]?.image || "/fallback.png";

  return (
    <div
      onClick={goToDetails}
      className="bg-white group border-r border-b border-gray-100 p-4 flex flex-col cursor-pointer hover:shadow-lg relative"
    >
      {/* ❤️ Wishlist */}
      <button
        onClick={onWishlistClick}
        className={`absolute top-3 right-3 z-10 ${
          inWishlist ? "text-red-500" : "text-gray-300"
        } hover:text-red-500`}
      >
        <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
      </button>

      {/* Image */}
      <div className="h-44 flex items-center justify-center mb-3">
        <img
          src={imageSrc}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow text-center md:text-left">
        <h3 className="text-sm font-medium text-gray-800 group-hover:text-blue-600">
          {product.name}
        </h3>

        {/* Rating */}
        {product.numReviews > 0 ? (
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
              {product.averageRating.toFixed(1)}
              <Star size={8} fill="currentColor" />
            </span>
            <span className="text-gray-400 text-[11px]">
              ({product.numReviews})
            </span>
          </div>
        ) : (
          <span className="text-gray-400 text-xs mt-1">No ratings yet</span>
        )}

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-bold">₹{product.price}</span>
          <span className="text-gray-400 line-through text-xs">
            ₹{Math.round(product.price * 1.3)}
          </span>
          <span className="text-green-600 text-xs font-bold">30% off</span>
        </div>
      </div>

      {/* Add to Cart */}
      {showActions && (
        <button
          onClick={onAddClick}
          className="mt-3 bg-[#ff9f00] text-white py-2 text-xs font-bold uppercase rounded-sm"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
