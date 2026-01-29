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
import FlightDetails from "./Pages/FlightDetails";
import BookingPage from "./Pages/BookingPage";
import PaymentPage from "./Pages/PaymentPage";
import TicketPage from "./Pages/TicketPage";
import BookingSuccess from "./Pages/BookingSuccess";
import MyBookings from "./Pages/MyBookings";
import Wishlist from "./Pages/Wishlist";
import ProductReviews from "./Pages/ProductReviews";


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
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")));

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
        <Route path="/flights/:id" element={<FlightDetails />} />

        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/ticket" element={<TicketPage />} />

        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route
          path="/product-reviews/:id"
          element={<ProductReviews user={user} token={token} />}
        />


      </Routes>

      <Footer />
    </Router>
  );
}
export default App;



