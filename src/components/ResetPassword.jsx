import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState(0);

  // Password Strength Logic
  useEffect(() => {
    let score = 0;
    if (password.length > 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setStrength(score);
  }, [password]);

  const getStrengthColor = () => {
    if (strength === 0) return "bg-gray-200";
    if (strength <= 2) return "bg-red-500";
    if (strength === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (strength < 2) {
      return toast.error("Please use a stronger password");
    }

    setLoading(true);
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      toast.success("Password updated successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Link expired or invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-gray-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-50 dark:bg-green-900/20 rounded-full mb-4 text-green-600">
              <ShieldCheck size={30} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Secure Your Account</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Create a strong password you haven't used before.</p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            {/* New Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 text-gray-400 group-focus-within:text-green-600 transition-colors" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all dark:text-white"
                  required
                />
              </div>
              
              {/* Strength Meter Bars */}
              <div className="flex gap-1 mt-2 px-1">
                {[1, 2, 3, 4].map((step) => (
                  <div 
                    key={step} 
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step <= strength ? getStrengthColor() : 'bg-gray-200 dark:bg-gray-700'}`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-gray-500 mt-1 ml-1 uppercase font-bold tracking-wider">
                Strength: {['Weak', 'Fair', 'Good', 'Strong'][strength - 1] || 'None'}
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Confirm Password</label>
              <div className="relative group">
                <CheckCircle2 className={`absolute left-3 top-3 transition-colors ${password && password === confirmPassword ? 'text-green-500' : 'text-gray-400'}`} size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all dark:text-white"
                  required
                />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle size={12} /> Passwords do not match
                </p>
              )}
            </div>

            <button 
              disabled={loading || strength < 2}
              className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white py-3 rounded-xl font-bold shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all disabled:opacity-30 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Update Password <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
             <p className="text-xs text-gray-400">
               Logging in as a secure user? Your session will be encrypted.
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}