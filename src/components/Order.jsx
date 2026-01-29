import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { Search, Star, ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";

const ORDERS_PER_PAGE = 5;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/order/my")
      .then((res) => {
        const validOrders = (res.data || []).map((order) => ({
          ...order,
          items: (order.items || []).filter((item) => item && item.product),
        }));
        setOrders(validOrders);
      })
      .catch(() => {
        setError("Failed to load orders. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f1f3f6]">
        <div className="w-10 h-10 border-2 border-[#2874f0] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] pb-10">
      <div className="max-w-[1200px] mx-auto py-4 px-2 md:px-0">

        {/* Search Bar */}
        <div className="flex mb-4 bg-white border rounded-sm overflow-hidden">
          <input
            type="text"
            placeholder="Search your orders here"
            className="flex-1 p-3 text-sm outline-none"
          />
          <button className="bg-[#2874f0] text-white px-8 flex items-center gap-2 text-sm font-medium hover:bg-blue-700">
            <Search size={16} /> <span className="hidden md:inline">Search</span>
          </button>
        </div>

        {/* Orders */}
        <div className="flex flex-col gap-3">
          {paginatedOrders.map((order) => (
            <div key={order._id} className="bg-white border rounded-sm p-4">
              {order.items.map((item, idx) => (
                <div
                  key={item.product._id || idx}
                  onClick={() => navigate(`/product/${item.product._id}`)}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 cursor-pointer group ${
                    idx !== 0 ? "mt-6 pt-6 border-t" : ""
                  }`}
                >
                  {/* Product */}
                  <div className="md:col-span-5 flex gap-4">
                    <img
                      src={item.product.image || "https://via.placeholder.com/150"}
                      alt={item.product.name}
                      className="w-20 h-20 object-contain"
                    />
                    <div>
                      <h3 className="text-sm group-hover:text-[#2874f0]">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 text-sm font-semibold">
                    ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                  </div>

                  {/* Delivery Status */}
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          order.status === "delivered"
                            ? "bg-[#26a541]"
                            : "bg-[#ff9f00]"
                        }`}
                      />
                      <span className="text-sm font-semibold">
                        {order.status === "delivered"
                          ? "Delivered"
                          : `Ordered on ${moment(order.createdAt).format(
                              "MMM DD, YYYY"
                            )}`}
                      </span>
                    </div>
                    {order.status === "delivered" && (
                      <p className="text-xs text-gray-600 mt-1 pl-4">
                        Your item has been delivered
                      </p>
                    )}
                  </div>

                  {/* Rate & Review */}
                  <div className="md:col-span-2">
                    <div
                      className="flex items-center gap-2 text-[#2874f0] text-sm font-semibold hover:underline"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent navigating to product page
                        navigate(`/product-reviews/${item.product._id}`);
                      }}
                    >
                      <Star size={14} fill="currentColor" />
                      Rate & Review
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex items-center gap-1 text-[#2874f0] text-sm font-semibold disabled:text-gray-300"
            >
              <ChevronLeft size={18} /> PREVIOUS
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-full text-xs font-bold ${
                  currentPage === i + 1
                    ? "bg-[#2874f0] text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="flex items-center gap-1 text-[#2874f0] text-sm font-semibold disabled:text-gray-300"
            >
              NEXT <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
