import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CartPage from "./components/CartPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./Pages/Profile";
import Orders from "./components/Order";
import Checkout from "./components/Checkout";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // ✅ Dark mode state
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar token={token} setToken={setToken} dark={dark} setDark={setDark} />

      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/cart" element={<CartPage token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>

      <Footer />
    </Router>
  );
}
export default App;
