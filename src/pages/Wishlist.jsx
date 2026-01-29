import React, { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/wishlist")
      .then((res) => {
        const validItems = res.data.items.filter(
          (i) => i.product !== null
        );
        setItems(validItems);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-24 text-gray-500">
        <Heart size={48} className="mb-4 text-gray-300" />
        <h2 className="text-lg font-semibold">Your wishlist is empty ❤️</h2>
        <p className="text-sm mt-1">
          Save items you like by tapping the heart icon
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <ProductCard
          key={item.product._id}
          product={item.product}
          showActions={false}
        />
      ))}
    </div>
  );
}
