import React from "react";
import ProductList from "../components/ProductList";

export default function Home({ token, dark }) {
  const categories = ["Mobiles", "Fashion", "Electronics", "Home", "Appliances", "Beauty"];

  return (
    <div className={`${dark ? "dark" : ""} min-h-screen bg-[#f1f3f6] dark:bg-gray-950 transition-colors`}>
      
      {/* Category Ribbon (Flipkart Style) */}
      <div className="bg-white dark:bg-gray-900 shadow-sm mb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center overflow-x-auto gap-8 no-scrollbar">
          {categories.map((cat) => (
            <div key={cat} className="flex flex-col items-center cursor-pointer group min-w-fit">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-2 md:px-4">
        {/* Modern Section Container */}
        <div className="bg-white dark:bg-gray-900 rounded-sm shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Best of Electronics</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-sm text-xs font-bold shadow-md hover:bg-blue-700 uppercase">
              View All
            </button>
          </div>
          
          <div className="p-4">
            <ProductList token={token} dark={dark} />
          </div>
        </div>
      </main>
    </div>
  );
}