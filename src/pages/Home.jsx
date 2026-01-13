import React from "react";
import ProductList from "../components/ProductList";

const CATEGORIES = [
  { name: "Minutes", img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/e00302d428f5c7be.png?q=100", isNew: true },
  { name: "Mobiles & Tablets", img: "https://rukminim2.flixcart.com/flap/64/64/image/22fddf3c7da4c4f4.png?q=100" },
  { name: "Fashion", img: "https://rukminim2.flixcart.com/flap/64/64/image/c12afc017e6f24cb.png?q=100", hasDropdown: true },
  { name: "Electronics", img: "https://rukminim2.flixcart.com/flap/64/64/image/69c6589653afdb9a.png?q=100", hasDropdown: true },
  { name: "TVs & Appliances", img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/e90944802d996756.jpg?q=100" },
  { name: "Home & Furniture", img: "data:image/jpeg;base64,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", hasDropdown: true },
  { name: "Flight Bookings", img: "https://rukminim2.flixcart.com/flap/64/64/image/71050627a56b4693.png?q=100" },
  { name: "Beauty, Food..", img: "https://rukminim2.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100", hasDropdown: true },
  { name: "Grocery", img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/e730a834ad950bae.png?q=100" },
];

export default function Home({ token }) {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* 1. Category Navigation Bar */}
      <div className="bg-white shadow-sm  overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 min-w-[900px]">
          {CATEGORIES.map((cat, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer px-2">
              <div className="relative h-16 w-16 mb-1 flex items-center justify-center">
                {cat.isNew && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold px-1 rounded-sm z-10">
                    NEW
                  </span>
                )}
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="h-full object-contain group-hover:scale-105 transition-transform duration-200" 
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                  {cat.name}
                </span>
                {cat.hasDropdown && (
                  <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Running Paragraph */}
      <div className="bg-white overflow-hidden flex items-center h-10 ">
        <p className="text-amber-600 text-sm animate-marquee whitespace-nowrap font-medium">
          Welcome to our e-commerce store! 🔥 Discover amazing deals on a wide range of products including Mobiles 📱, Laptops 💻, Fashion 👗, Groceries 🥦, Snacks 🍿, Home Appliances 🏠, and Beauty Products 💄. Shop the latest trends, enjoy exclusive discounts, flash sales ⚡ &nbsp; • &nbsp;
        </p>
      </div>

      {/* 3. Product List */}
      <div className="max-w-7xl mx-auto p-4">
        <ProductList token={token} />
      </div>
    </div>
  );
}