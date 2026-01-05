import React, { useState } from "react";
import { signup } from "../api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Mail, Lock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};
    if (!form.username.trim()) err.username = "Username is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Invalid email address";
    if (form.password.length < 6) err.password = "Minimum 6 characters required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await signup(form);
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-100"
      >
        <h1 className="text-2xl font-black text-gray-900 mb-2">Create your account</h1>
        <p className="text-gray-500 mb-8">Join thousands of shoppers worldwide.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-600 outline-none transition-all"
            />
            {errors.username && <span className="text-red-500 text-[10px] uppercase font-bold ml-1">{errors.username}</span>}
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-600 outline-none transition-all"
            />
            {errors.email && <span className="text-red-500 text-[10px] uppercase font-bold ml-1">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Create password (6+ chars)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-600 outline-none transition-all"
            />
            {errors.password && <span className="text-red-500 text-[10px] uppercase font-bold ml-1">{errors.password}</span>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle2 size={14} className="text-green-500" /> Secure 256-bit SSL encryption
          </div>
          <p className="text-sm text-center text-gray-600">
            Already a member? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}