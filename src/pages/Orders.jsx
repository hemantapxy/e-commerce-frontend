import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Show only logged-in user's orders
    const userOrders = allOrders.filter(
      (o) => o.userId === (user?.id || user?._id)
    );

    setOrders(userOrders);
  }, [user]);

  if (orders.length === 0) {
    return (
      <h2 className="p-6 text-xl font-bold text-center">
        No orders placed yet
      </h2>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.map((order, index) => (
        <div
          key={index}
          className="border rounded p-4 mb-4 bg-white shadow"
        >
          <div className="flex justify-between mb-2">
            <span className="font-semibold">
              Order ID: {order.orderId}
            </span>
            <span className="text-green-600 font-semibold">
              {order.status}
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-2">
            Ordered on: {order.date}
          </p>

          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm mb-1">
              <span>
                {item.name} × {item.quantity || 1}
              </span>
              <span>₹{item.price.toLocaleString()}</span>
            </div>
          ))}

          <div className="font-bold text-right mt-2">
            Total: ₹{order.total.toLocaleString()}
          </div>

          <p className="text-sm mt-1">
            Payment Mode: {order.paymentMode}
          </p>
        </div>
      ))}
    </div>
  );
}
