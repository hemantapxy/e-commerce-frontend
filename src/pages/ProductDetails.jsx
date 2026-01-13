import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Zap, Star, ChevronRight, RotateCcw, Truck } from "lucide-react";
import { getProductById, addToCart, submitReview } from "../api";
import { toast } from "react-toastify";

export default function ProductDetails({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Selected variant
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Review form
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0); // For star hover effect
  const [comment, setComment] = useState("");

  // Zoom State
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);

        // Set first variant as default
        if (res.data.variants && res.data.variants.length > 0) {
          setSelectedVariant(res.data.variants[0]);
        }

        // Calculate average rating
        if (res.data.reviews && res.data.reviews.length > 0) {
          const avg = res.data.reviews.reduce((sum, r) => sum + r.rating, 0) / res.data.reviews.length;
          setProduct((prev) => ({ ...prev, averageRating: avg }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Side Zoom Logic
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    
    setZoomStyle({
      display: "block",
      backgroundImage: `url(${selectedVariant?.image || product.variants[0]?.image})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "250%", // Magnification
    });
  };

  // Add to cart
  const handleAddToCart = async () => {
    if (!token) return navigate("/login");
    if (!selectedVariant || selectedVariant.stock === 0) return;
    try {
      await addToCart(product._id, { variant: selectedVariant, quantity: 1 });
      toast.success("Added to cart!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  // Buy Now
  const handleBuyNow = () => {
    if (!token) return navigate("/login");
    if (!selectedVariant || selectedVariant.stock === 0) return;
    navigate("/checkout", { state: { product, quantity: 1, variant: selectedVariant } });
  };

  // Submit review (dynamic update)
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!token) return navigate("/login");

    const newReview = {
      username: "You", // Replace with actual user if available
      rating,
      comment,
    };

    try {
      // Submit to backend
      await submitReview(product._id, { rating, comment });

      // Optimistically update frontend
      setProduct((prev) => {
        const updatedReviews = [newReview, ...prev.reviews];
        const avg = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        return { ...prev, reviews: updatedReviews, averageRating: avg };
      });

      setComment("");
      setRating(5);
      toast.success("Review submitted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[100vh] bg-white">
        <div className="w-10 h-10 border-4 border-[#2874f0] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!product)
    return <div className="text-center py-20 font-bold text-lg">Product not found</div>;

  return (
    <div className="min-h-screen bg-[#f1f3f6] pb-10 font-sans text-[#212121]">
      <div className="max-w-[1244px] mx-auto bg-white shadow-sm flex flex-col md:flex-row gap-0">
        
        {/* LEFT COLUMN: Gallery & Buttons */}
        <div className="md:w-[42%] p-3 md:p-6 border-r border-gray-100 relative">
          <div className="md:sticky md:top-20 z-30">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Vertical Thumbnails */}
              <div className="order-2 md:order-1 flex md:flex-col gap-2">
                {product.variants.map((v, i) => (
                  <div 
                    key={i}
                    onMouseEnter={() => setSelectedVariant(v)}
                    className={`w-14 h-16 border p-1 cursor-pointer flex items-center justify-center overflow-hidden transition-all ${
                      selectedVariant?.color === v.color ? 'border-[#2874f0] ring-1 ring-[#2874f0]' : 'border-gray-200'
                    }`}
                  >
                    <img src={v.image} alt="" className="max-h-full max-w-full object-contain" />
                  </div>
                ))}
              </div>

              {/* Main Preview Image with Side Zoom */}
              <div 
                className="order-1 md:order-2 flex-1 border border-gray-100 p-4 h-[450px] flex items-center justify-center relative bg-white cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setZoomStyle({ display: "none" })}
              >
                <img
                  src={selectedVariant?.image || product.variants[0]?.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />

                {/* SIDE ZOOM WINDOW */}
                <div 
                  className="absolute left-[103%] top-0 w-[500px] h-[500px] border border-gray-200 bg-white z-[100] hidden lg:block shadow-2xl"
                  style={{ 
                    ...zoomStyle, 
                    backgroundRepeat: "no-repeat",
                    pointerEvents: "none" 
                  }}
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.stock === 0}
                className={`flex-1 h-14 text-white font-bold flex items-center justify-center gap-2 rounded-sm shadow-sm uppercase tracking-wide transition ${
                  !selectedVariant || selectedVariant.stock === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#ff9f00] hover:bg-[#fb9000]"
                }`}
              >
                <ShoppingCart size={18} fill="white" /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!selectedVariant || selectedVariant.stock === 0}
                className={`flex-1 h-14 text-white font-bold flex items-center justify-center gap-2 rounded-sm shadow-sm uppercase tracking-wide transition ${
                  !selectedVariant || selectedVariant.stock === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#fb641b] hover:bg-[#f05a16]"
                }`}
              >
                <Zap size={18} fill="white" /> Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Details */}
        <div className="md:w-[58%] p-4 md:p-6 z-10">
          <nav className="flex items-center text-xs text-gray-500 mb-2 gap-1 font-medium">
            <span>Home</span> <ChevronRight size={12} />
            <span>{product.category}</span> <ChevronRight size={12} />
            <span className="truncate text-gray-400">{product.name}</span>
          </nav>

          <h1 className="text-lg md:text-[18px] font-normal text-[#212121] leading-relaxed mb-1">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-2">
            <span className="bg-[#388e3c] text-white text-[12px] px-1.5 py-[1px] rounded flex items-center gap-1 font-bold">
              {product.averageRating?.toFixed(1) || 0} <Star size={10} fill="white" />
            </span>
            <span className="text-gray-500 text-sm font-medium">
              {product.reviews?.length || 0} Ratings & {product.reviews?.length || 0} Reviews
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl md:text-3xl font-bold">₹{product.price}</span>
            <span className="text-gray-500 line-through text-base">₹{Math.round(product.price * 1.4)}</span>
            <span className="text-[#388e3c] font-bold text-sm tracking-tight">40% off</span>
          </div>

          <div className="mt-4">
             {selectedVariant && (
              <p className={`text-sm font-bold ${selectedVariant.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                {selectedVariant.stock > 0 ? `In Stock: ${selectedVariant.stock}` : "Out of Stock"}
              </p>
            )}
          </div>

          {product.variants && product.variants.length > 1 && (
            <div className="mt-6 flex items-start gap-10">
              <span className="text-sm font-medium text-gray-500 w-12 mt-2">Color</span>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVariant(v)}
                    className={`w-12 h-14 border-2 p-0.5 rounded-sm transition-all ${
                      selectedVariant?.color === v.color ? "border-[#2874f0]" : "border-gray-200"
                    }`}
                  >
                    <div className="w-full h-full" style={{ backgroundColor: v.color }}>
                       <img src={v.image} className="w-full h-full object-contain opacity-80" alt="" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-b py-6 border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full"><Truck size={20} className="text-[#2874f0]" /></div>
              <span className="text-sm font-medium">Free Delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full"><RotateCcw size={20} className="text-[#2874f0]" /></div>
              <span className="text-sm font-medium">7 Days Replacement</span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold mb-3">Product Description</h3>
            <p className="text-sm text-gray-700 leading-relaxed text-justify">
              {product.description || "Experience the best-in-class performance with this premium product."}
            </p>
          </div>

          {/* Reviews Section */}
          <div className="mt-10 border border-gray-200 rounded-sm overflow-hidden bg-white">
            <div className="bg-gray-50 px-4 py-4 border-b">
              <h3 className="text-lg font-bold uppercase text-gray-600 tracking-wider text-[14px]">Ratings & Reviews</h3>
            </div>

            {/* Review Form */}
            {token && (
              <form onSubmit={handleSubmitReview} className="p-4 bg-white border-b space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-gray-600 uppercase text-[12px]">Rate this product</span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="transition-transform active:scale-90"
                      >
                        <Star 
                          size={28} 
                          fill={(hoverRating || rating) >= star ? "#388e3c" : "none"} 
                          stroke={(hoverRating || rating) >= star ? "#388e3c" : "#abb0b5"}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm font-bold text-gray-500">
                      {["Poor", "Fair", "Good", "Very Good", "Excellent"][(hoverRating || rating) - 1]}
                    </span>
                  </div>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Review this product..."
                  className="w-full border p-3 rounded-sm text-sm outline-none focus:border-[#2874f0] bg-[#fcfcfc]"
                  rows={3}
                />
                <button
                  type="submit"
                  className="bg-[#2874f0] text-white px-8 py-2.5 rounded-sm font-bold shadow-md hover:shadow-lg transition text-sm uppercase"
                >
                  Submit Review
                </button>
              </form>
            )}

            {/* Reviews List */}
            <div className="p-0">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((r, idx) => (
                  <div key={idx} className="p-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#388e3c] text-white text-[10px] px-1.5 py-[0.5px] rounded font-bold flex items-center gap-0.5">
                        {r.rating} <Star size={8} fill="white" />
                      </span>
                      <span className="text-sm font-bold text-gray-800">{r.username}</span>
                    </div>
                    <p className="text-sm text-gray-700">{r.comment}</p>
                  </div>
                ))
              ) : (
                <p className="p-6 text-gray-400 text-sm text-center italic">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
