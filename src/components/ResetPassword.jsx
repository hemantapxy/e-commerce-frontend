import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      toast.success("Password reset successful");
      navigate("/login");
    } catch {
      toast.error("Link expired or invalid");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />
        <button className="w-full bg-green-600 text-white py-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}
