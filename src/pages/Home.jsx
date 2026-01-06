import React from "react";
import ProductList from "../components/ProductList";

export default function Home({ token }) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Running Paragraph */}
      <div className="bg-white overflow-hidden flex items-center h-12">
        <p className="text-amber-600 text-sm animate-marquee text-center w-full whitespace-nowrap font-semibold ">
          Welcome to our e-commerce store! 🔥 Discover amazing deals on a wide range of products including Mobiles 📱, Laptops 💻, Fashion 👗, Groceries 🥦, Snacks 🍿, Home Appliances 🏠, and Beauty Products 💄. Shop the latest trends, enjoy exclusive discounts, flash sales ⚡ &nbsp; • &nbsp;
        </p>
      </div>

      {/* Product List */}
      <div className="max-w-7xl mx-auto p-4">
        <ProductList token={token} />
      </div>
    </div>
  );
}
