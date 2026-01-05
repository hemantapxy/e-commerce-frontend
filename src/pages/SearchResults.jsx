import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Filter, SearchX, LayoutGrid, List } from "lucide-react";
import api from "../api";

export default function SearchResults({ token }) {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (!query) { setLoading(false); return; }
    setLoading(true);
    api.get(`/products?search=${encodeURIComponent(query)}`)
      .then((res) => {
        setProducts(res.data);
        setCategories([...new Set(res.data.map(p => p.category).filter(Boolean))]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  const filteredProducts = selectedCategory ? products.filter(p => p.category === selectedCategory) : products;

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-500 animate-pulse">Searching the warehouse...</p>
    </div>
  );

  return (
    <div className="bg-[#f8fafc] dark:bg-gray-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Results for "{query}"
            </h1>
            <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} items found</p>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-gray-900 p-1 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
             <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded"><LayoutGrid size={18} /></button>
             <button className="p-2 text-gray-400 hover:text-gray-600"><List size={18} /></button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar: Filters */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 font-bold mb-4 text-gray-800 dark:text-white">
                <Filter size={18} /> Filters
              </div>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${selectedCategory === "" ? "bg-blue-50 text-blue-600 font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition ${selectedCategory === cat ? "bg-blue-50 text-blue-600 font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-800">
                <SearchX size={64} className="mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">No products found</h3>
                <p className="text-gray-500 mt-2">Try different keywords or check your spelling.</p>
                <button onClick={() => navigate('/')} className="mt-6 text-blue-600 font-semibold hover:underline">Back to Shopping</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p._id} product={p} token={token} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}