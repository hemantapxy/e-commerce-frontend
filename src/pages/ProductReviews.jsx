import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { Star } from "lucide-react";
import { toast } from "react-toastify";

export default function ProductReviews({ user, token }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Review form state
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  // Check if user already reviewed
  const userHasReviewed = product?.reviews?.some(
    (r) => r.userId === user?._id
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Failed to fetch product reviews.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("You must be logged in to submit a review");

    try {
      const res = await API.post(
        `/products/${id}/review`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update product reviews dynamically
      const newReview = {
        userId: user._id,
        username: user.username,
        rating,
        comment,
      };

      const updatedReviews = [newReview, ...(product.reviews || [])];
      const averageRating =
        updatedReviews.reduce((acc, r) => acc + r.rating, 0) /
        updatedReviews.length;

      setProduct((prev) => ({
        ...prev,
        reviews: updatedReviews,
        averageRating,
      }));

      setRating(5);
      setComment("");
      toast.success("Review submitted successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to submit review");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-[#2874f0] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!product) return <div className="text-center mt-20">Product not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Product Name & Average Rating */}
      <h1 className="text-xl font-bold mb-2">{product.name}</h1>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-green-600 font-bold">
          {product.averageRating?.toFixed(1) || 0}
        </span>
        <Star size={16} fill="#388e3c" />
        <span className="text-gray-500 text-sm">
          {product.reviews?.length || 0} Reviews
        </span>
      </div>

      {/* Review Form (Visible if user is logged in and hasn’t reviewed yet) */}
      {token && !userHasReviewed && (
        <form onSubmit={handleSubmit} className="p-4 border rounded-md mb-6 bg-white">
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className="cursor-pointer"
                fill={hoverRating >= star || rating >= star ? "#388e3c" : "none"}
                stroke={hoverRating >= star || rating >= star ? "#388e3c" : "#aaa"}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Write your review..."
            className="w-full border p-2 rounded-md mb-2 outline-none focus:border-[#2874f0]"
          />
          <button
            type="submit"
            className="bg-[#2874f0] text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit Review
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((r, idx) => (
            <div key={idx} className="p-4 border rounded-md bg-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-green-600 text-white text-[10px] px-1.5 py-[0.5px] rounded font-bold flex items-center gap-0.5">
                  {r.rating} <Star size={8} fill="white" />
                </span>
                <span className="text-sm font-semibold">{r.username}</span>
              </div>
              <p className="text-sm text-gray-700">{r.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center italic">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
}
