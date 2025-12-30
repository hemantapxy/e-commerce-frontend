import React, { useEffect, useState } from "react";
import axios from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/order/my");
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (orders.length === 0)
    return <p className="text-center text-gray-500 mt-10">No orders yet.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200"
        >
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">
              Order ID: <span className="font-medium">{order._id}</span>
            </p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                order.orderStatus === "Placed"
                  ? "bg-blue-100 text-blue-800"
                  : order.orderStatus === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.orderStatus}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {order.items.map((item) => (
              <div key={item.product._id} className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-gray-600">
                    {item.quantity} x ₹{item.product.price}
                  </p>
                  <p className="text-gray-800 font-semibold">
                    ₹{item.product.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center border-t pt-4 mt-4">
            <p className="text-lg font-semibold">
              Total: ₹{order.totalAmount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
