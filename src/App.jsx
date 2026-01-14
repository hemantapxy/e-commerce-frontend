import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import CartPage from "./components/CartPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./Pages/Profile";
import Orders from "./components/Order";
import Checkout from "./components/Checkout";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import SearchResults from "./Pages/SearchResults";
import ProductDetails from "./Pages/ProductDetails";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Careers from "./Pages/Careers";
import CorporateInfo from "./Pages/CorporateInfo";
import Payments from "./Pages/Payments";
import Shipping from "./Pages/Shipping";
import Cancellation from "./Pages/Cancellation";
import FAQ from "./Pages/Faq";
import Returns from "./Pages/Return";
import Terms from "./Pages/Terms";
import Security from "./Pages/Security";
import Privacy from "./Pages/Privacy";
import BecomeSeller from "./Pages/BecomeSeller";

import Flights from "./Pages/Flights";

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
        <Route path="/search" element={<SearchResults token={token} />} />
        <Route path="/product/:id" element={<ProductDetails token={token} />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/Careers" element={<Careers />} />
        <Route path="/CorporateInfo" element={<CorporateInfo />} />
        <Route path="/Payments" element={<Payments />} />
        <Route path="/Shipping" element={<Shipping />} />
        <Route path="/Cancellation" element={<Cancellation />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/Returns" element={<Returns />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/Security" element={<Security />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/seller" element={<BecomeSeller />} />
        <Route path="/flights" element={<Flights />} />
      </Routes>

      <Footer />
    </Router>
  );
}
export default App;



