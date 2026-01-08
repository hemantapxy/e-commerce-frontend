import React from "react";  
import { useNavigate } from "react-router-dom";

export default function BecomeSeller() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Become a Seller on ShopKart
          </h1>
          <p className="text-lg mb-6">
            Sell your products to millions of customers across India
          </p>
          <button
            onClick={() => navigate("/seller/register")}
            className="bg-yellow-400 text-black px-6 py-3 rounded font-bold hover:bg-yellow-300"
          >
            Start Selling
          </button>
        </div>
      </div>

      {/* BENEFITS */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-xl font-bold mb-2">0% Commission*</h3>
          <p className="text-gray-600">
            Lowest commission in the market to help you grow faster.
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-xl font-bold mb-2">Pan India Reach</h3>
          <p className="text-gray-600">
            Reach customers across all cities & villages.
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-xl font-bold mb-2">Fast Payments</h3>
          <p className="text-gray-600">
            Get paid directly to your bank within 7 days.
          </p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-bold text-blue-600">1</div>
              <p className="mt-2">Register as Seller</p>
            </div>

            <div>
              <div className="text-2xl font-bold text-blue-600">2</div>
              <p className="mt-2">List Your Products</p>
            </div>

            <div>
              <div className="text-2xl font-bold text-blue-600">3</div>
              <p className="mt-2">Receive Orders</p>
            </div>

            <div>
              <div className="text-2xl font-bold text-blue-600">4</div>
              <p className="mt-2">Get Paid</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-100 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to start selling?
        </h2>
        <button
          onClick={() => navigate("/seller/register")}
          className="bg-blue-600 text-white px-6 py-3 rounded font-bold hover:bg-blue-700"
        >
          Register Now
        </button>
      </div>
    </div>
  );
}
