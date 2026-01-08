import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Zap, Star } from "lucide-react";
import { getProductById, addToCart, submitReview } from "../api";

export default function ProductDetails({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⭐ For variant selection
  const [selectedVariant, setSelectedVariant] = useState(null);

  // ⭐ For review form
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
        if (res.data.variants && res.data.variants.length > 0) {
          setSelectedVariant(res.data.variants[0]);
        }
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ⭐ Add to cart
  const handleAddToCart = async () => {
    if (!token) { navigate("/login"); return; }
    try {
      await addToCart(product._id, selectedVariant);
      alert("Added to cart!");
    } catch (err) {
      alert("Failed to add");
    }
  };

  // ⭐ Submit review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!token) { navigate("/login"); return; }
    try {
      await submitReview(product._id, { rating, comment });
      alert("Review submitted!");
      setComment(""); // reset
      // Refresh product to get latest reviews
      const res = await getProductById(id);
      setProduct(res.data);
    } catch (err) {
      alert("Failed to submit review");
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return <div className="text-center py-20 font-bold">Product not found</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-8 grid md:grid-cols-2 gap-10">

        {/* LEFT COLUMN: Gallery & Variant */}
        <div className="space-y-6">
          <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 sticky top-24 bg-white dark:bg-gray-900 shadow-sm">
            <div className="h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
              <img
                src={selectedVariant?.image || product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Color Selector */}
          {product.variants && product.variants.length > 1 && (
            <div className="flex items-center gap-2 mt-4">
              {product.variants.map((v, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVariant(v)}
                  className={`w-8 h-8 rounded-full border-2 ${selectedVariant?.color === v.color ? "border-black" : "border-gray-300"}`}
                  style={{ backgroundColor: v.color }}
                ></button>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="hidden md:flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 h-14 bg-[#ff9f00] text-white font-bold rounded-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#f39700] transition"
            >
              <ShoppingCart size={20} /> ADD TO CART
            </button>
            <button
              onClick={() => navigate("/checkout", { state: { product, quantity: 1, variant: selectedVariant } })}
              className="flex-1 h-14 bg-[#fb641b] text-white font-bold rounded-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#f05a16] transition"
            >
              <Zap size={20} /> BUY NOW
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Info & Reviews */}
        <div className="flex flex-col">
          <nav className="text-sm text-gray-500 mb-2">Home &gt; {product.category} &gt; {product.name}</nav>
          <h1 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white leading-tight">
            {product.name}
          </h1>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{product.price}</span>
            <span className="text-gray-500 line-through text-lg">₹{Math.round(product.price * 1.4)}</span>
            <span className="text-green-600 font-bold text-sm">40% off</span>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold border-b pb-2 dark:text-white">Product Description</h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description || "This high-quality product is designed to meet your every need."}
            </p>
          </div>

          {/* ⭐ Reviews Section */}
          <div className="mt-8">
            <h3 className="text-lg font-bold border-b pb-2 dark:text-white">Reviews</h3>

            {/* Review Form */}
            {token && (
              <form onSubmit={handleSubmitReview} className="mt-4 flex flex-col gap-2">
                <label className="font-medium dark:text-white">
                  Rating:
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="ml-2 p-1 border rounded"
                  >
                    {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r} ⭐</option>)}
                  </select>
                </label>
                <label className="font-medium dark:text-white">
                  Comment:
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border p-2 rounded mt-1"
                    rows={3}
                  />
                </label>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit Review
                </button>
              </form>
            )}

            {/* List of Reviews */}
            <div className="mt-4 space-y-3">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((r, idx) => (
                  <div key={idx} className="border-b py-2">
                    <div className="flex items-center gap-2">
                      <strong>{r.username}</strong>
                      <span>{r.rating} ⭐</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{r.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 mt-2">No reviews yet.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
