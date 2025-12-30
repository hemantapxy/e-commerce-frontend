import React  from "react";
import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("Reset link sent to email");
    } catch {
      toast.error("User not found");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Send Reset Link
        </button>

        <p className="text-sm text-center mt-4">
          <Link to="/login" className="text-blue-600">Back to login</Link>
        </p>
      </form>
    </div>
  );
}
