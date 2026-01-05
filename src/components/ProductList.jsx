import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts, addToCart } from "../api";

export default function ProductList({ token }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = async (productId) => {
    try {
      await addToCart(productId);
      alert("Product added to cart!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        No products available.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            token={token}
            handleAdd={handleAdd}
          />
        ))}
      </div>
    </div>
  );
}
