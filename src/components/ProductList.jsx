import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts, addToCart } from "../api";

export default function ProductList({ token }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
  }, []);

  const handleAdd = async (productId) => {
    try {
      await addToCart(productId, token);
      alert("Product added to cart!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <ProductCard key={p._id} product={p} token={token} handleAdd={handleAdd} />
        ))}
      </div>
    </div>
  );
}
