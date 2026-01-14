import React, { useState } from "react";
import ProductList from "../components/ProductList";
import BannerSlider from "../components/BannerSlider";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { name: "Minutes", img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/e00302d428f5c7be.png?q=100", isNew: true },

  { name: "Mobiles & Tablets", value: "Mobile", img: "https://rukminim2.flixcart.com/flap/64/64/image/22fddf3c7da4c4f4.png?q=100" },

  { name: "Fashion", value: "Fashion", img: "https://rukminim2.flixcart.com/flap/64/64/image/c12afc017e6f24cb.png?q=100", hasDropdown: true },

  { name: "Electronics", value: "Electronics", img: "https://rukminim2.flixcart.com/flap/64/64/image/69c6589653afdb9a.png?q=100", hasDropdown: true },

  { name: "TVs & Appliances", value: "TVs & Appliances", img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/e90944802d996756.jpg?q=100" },

  { name: "Home & Furniture", value: "Home & Furniture", img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/e90944802d996756.jpg?q=100", hasDropdown: true },

  { name: "Flight Bookings", value: "Flight Bookings", img: "https://rukminim2.flixcart.com/flap/64/64/image/71050627a56b4693.png?q=100" },

  { name: "Beauty, Food..", value: "Beauty, Food", img: "https://rukminim2.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100", hasDropdown: true },

  { name: "Grocery", value: "Grocery", img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/e730a834ad950bae.png?q=100" },
];

export default function Home({ token }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // ✅ Flipkart-style click handler
  const handleCategoryClick = (cat) => {
    if (cat.value === "Flight Bookings") {
      navigate("/flights"); // MUST match App.jsx route
    } else {
      setSelectedCategory(cat.value || "");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 1. CATEGORY BAR */}
      <div className="bg-white shadow-sm overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 min-w-[900px]">

          {CATEGORIES.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(cat)}
              className={`flex flex-col items-center cursor-pointer px-2
                ${selectedCategory === cat.value ? "text-blue-600 font-bold" : ""}
              `}
            >
              <div className="relative h-16 w-16 mb-1 flex items-center justify-center">
                {cat.isNew && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold px-1 rounded-sm">
                    NEW
                  </span>
                )}

                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-full object-contain hover:scale-105 transition"
                />
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[14px] whitespace-nowrap">
                  {cat.name}
                </span>

                {cat.hasDropdown && (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. BANNER SLIDER */}
      <BannerSlider />

      {/* 3. RUNNING TEXT */}
      <div className="bg-white overflow-hidden flex items-center h-10">
        <p className="text-amber-600 text-sm animate-marquee whitespace-nowrap font-medium">
          Welcome to our e-commerce store! 🔥 Discover amazing deals on Mobiles 📱,
          Fashion 👗, Groceries 🥦, Electronics 💻, Beauty 💄, Home & Kitchen 🏠 and much more.
          Enjoy great prices, fast delivery 🚚, and secure payments 🔒.
        </p>
      </div>

      {/* 4. PRODUCT LIST */}
      <div className="max-w-7xl mx-auto p-4">
        <ProductList token={token} category={selectedCategory} />
      </div>

    </div>
  );
}
