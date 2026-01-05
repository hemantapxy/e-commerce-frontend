import React, { useEffect, useState } from "react";
import API from "../api";
import { Package, HelpCircle, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/order/my")
      .then((res) => {
        // MNC Tip: Data sanitization on the frontend
        const validOrders = (res.data || []).map((order) => ({
          ...order,
          // Ensure items is always an array and filter out corrupted product links
          items: (order.items || []).filter((item) => item && item.product),
          // Ensure totalAmount is always a number
          totalAmount: Number(order.totalAmount) || 0,
        }));
        setOrders(validOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Order Fetch Error:", err);
        setError("Failed to load orders. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium font-sans">Fetching your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center mt-20 text-red-500">
        <AlertCircle size={48} />
        <p className="mt-4 font-semibold">{error}</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="max-w-4xl mx-auto mt-20 text-center px-4 font-sans">
        <div className="bg-blue-50 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="text-blue-600" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No Orders Yet</h2>
        <p className="text-gray-500 mt-2 mb-8">Looks like you haven't made your choice yet. Start shopping to see your orders here!</p>
        <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-sm font-bold shadow-lg hover:bg-blue-700 transition">
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] dark:bg-gray-950 py-8 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
          My Orders <span className="text-sm font-normal text-gray-500">({orders.length} items)</span>
        </h2>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Individual Products within the Order */}
              {order.items.map((item, idx) => (
                <div 
                  key={item.product._id || idx} 
                  className={`p-5 flex flex-col md:flex-row items-start md:items-center gap-6 ${idx !== 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''}`}
                >
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-sm p-1">
                    <img
                      src={item.product.image || "https://via.placeholder.com/150"}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-medium text-gray-900 dark:text-gray-100 truncate hover:text-blue-600 cursor-pointer">
                      {item.product.name || "Unknown Product"}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>

                  <div className="w-32">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      ₹{((item.product.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="w-full md:w-64 flex items-center gap-2">
                    {order.paymentStatus === "PAID" ? (
                      <div className="flex items-center gap-2">
                         <CheckCircle2 size={16} className="text-green-600" />
                         <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Order Confirmed</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                         <Clock size={16} className="text-yellow-600" />
                         {/* <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Processing</span> */}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-blue-600 font-bold text-sm cursor-pointer hover:underline">
                    <HelpCircle size={14} />
                    <span>Need Help?</span>
                  </div>
                </div>
              ))}

              {/* Order Footer - FIXED THE ERROR HERE */}
              <div className="bg-gray-50 dark:bg-gray-800/50 px-5 py-3 flex justify-between items-center text-xs">
                 <div className="text-gray-500">
                    ID: <span className="font-mono">{order._id ? order._id.toUpperCase() : "N/A"}</span>
                 </div>
                 {/* <div className="text-gray-700 dark:text-gray-300">
                    Total Amount: <span className="font-bold text-sm">
                      ₹{(order.totalAmount ?? 0).toLocaleString('en-IN')}
                    </span>
                 </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}