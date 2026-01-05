import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Zap, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { getProductById, addToCart } from "../api";

export default function ProductDetails({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) { navigate("/login"); return; }
    try {
      await addToCart(product._id);
      // MNC Style: Using a toast or small UI change instead of an alert is better
      alert("Added to cart!"); 
    } catch (err) {
      alert("Failed to add");
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
        
        {/* LEFT COLUMN: Gallery & Actions */}
        <div className="space-y-6">
          <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 sticky top-24 bg-white dark:bg-gray-900 shadow-sm">
            <div className="h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Large MNC-style Buttons (Hidden on mobile sticky footer) */}
          <div className="hidden md:flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 h-14 bg-[#ff9f00] text-white font-bold rounded-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#f39700] transition"
            >
              <ShoppingCart size={20} /> ADD TO CART
            </button>
            <button
              onClick={() => navigate("/checkout", { state: { product, quantity: 1 } })}
              className="flex-1 h-14 bg-[#fb641b] text-white font-bold rounded-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#f05a16] transition"
            >
              <Zap size={20} /> BUY NOW
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Info */}
        <div className="flex flex-col">
          <nav className="text-sm text-gray-500 mb-2">Home &gt; {product.category} &gt; {product.name}</nav>
          <h1 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white leading-tight">
            {product.name}
          </h1>

          {/* Ratings & Trust */}
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-sm font-bold">
              4.2 <Star size={12} fill="currentColor" />
            </div>
            <span className="text-gray-400 font-medium text-sm">1,240 Ratings & 85 Reviews</span>
          </div>

          {/* Pricing Section */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{product.price}</span>
            <span className="text-gray-500 line-through text-lg">₹{Math.round(product.price * 1.4)}</span>
            <span className="text-green-600 font-bold text-sm">40% off</span>
          </div>

          {/* Bank Offers - Hires look for MNC apps */}
          <div className="mt-6 border border-gray-100 dark:border-gray-800 rounded-lg p-4 space-y-3 bg-gray-50/50 dark:bg-gray-900/50">
            <h3 className="font-bold text-sm dark:text-white">Available offers</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">Bank Offer</span> 10% instant discount on ICICI Bank Cards, up to ₹1000.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">Special Price</span> Get extra ₹500 off (price inclusive of cashbacks/coupons).
            </p>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-lg font-bold border-b pb-2 dark:text-white">Product Description</h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description || "This high-quality product is designed to meet your every need. Crafted with precision and durability in mind."}
            </p>
          </div>

          {/* Service Tags */}
          <div className="mt-8 grid grid-cols-3 gap-2 py-6 border-y border-gray-100 dark:border-gray-800">
            <div className="flex flex-col items-center text-center gap-1">
              <RotateCcw className="text-blue-600" size={24} />
              <span className="text-[10px] md:text-xs font-medium dark:text-gray-300">7 Days Replacement</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <Truck className="text-blue-600" size={24} />
              <span className="text-[10px] md:text-xs font-medium dark:text-gray-300">Free Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <ShieldCheck className="text-blue-600" size={24} />
              <span className="text-[10px] md:text-xs font-medium dark:text-gray-300">1 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY FOOTER: Standard for MNC Mobile UX */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t flex z-50">
        <button 
          onClick={handleAddToCart}
          className="flex-1 font-bold text-gray-800 dark:text-white flex items-center justify-center border-r"
        >
          ADD TO CART
        </button>
        <button 
          onClick={() => navigate("/checkout", { state: { product, quantity: 1 } })}
          className="flex-1 font-bold bg-[#fb641b] text-white flex items-center justify-center"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}