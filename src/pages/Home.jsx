import React from "react";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

export default function Home({ token, dark }) {
  return (
    <div className={`${dark ? "dark" : ""} min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors`}>
      
      {/* Header */}
      <header className="bg-blue-600 dark:bg-gray-800 text-white py-6 mb-6 text-center transition-colors">
        <h1 className="text-3xl font-bold">Welcome to E-Shop</h1>
      </header>

      {/* Product List */}
      <ProductList token={token} dark={dark} />

      {/* Footer */}
      {/* <Footer dark={dark} /> */}
    </div>
  );
}
