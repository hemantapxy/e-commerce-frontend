import React from "react";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

export default function Home({ token }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white py-6 mb-6 text-center">
        <h1 className="text-3xl font-bold">Welcome to E-Shop</h1>
      </header>
      <ProductList token={token} />
      <Footer />
    </div>
  );
}
