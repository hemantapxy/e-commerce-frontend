import React, { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, Send, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setIsSubmitted(true);
      toast.success("Reset link sent!");
    } catch (err) {
      toast.error(err.response?.data?.message || "User not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-gray-950 p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              /* --- FORGOT PASSWORD FORM --- */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4 text-blue-600">
                    <Mail size={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Forgot Password?</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Send Reset Link <Send size={18} /></>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* --- SUCCESS STATE --- */
              <motion.div
                key="success"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center py-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-6 text-green-600">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Check your email</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                  We've sent a password reset link to <br />
                  <span className="font-semibold text-gray-900 dark:text-gray-200">{email}</span>
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  Didn't receive the email? Click to retry
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={16} /> Back to login
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
}