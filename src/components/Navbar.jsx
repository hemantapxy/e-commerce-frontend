import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  UserCircle,
  ChevronDown,
  Package,
  Heart,
  LogOut,
  Store
} from "lucide-react";
import api from "../api";
import { useSelector } from "react-redux"; // ✅ Redux selector

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef();

  // ✅ Get live cart count from Redux
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  // Fetch user profile
  useEffect(() => {
    if (token) {
      api.get("/user/profile")
        .then((res) => setUsername(res.data.username || "User"))
        .catch(() => setUsername(""));
    }
  }, [token]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUsername("");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?query=${encodeURIComponent(search.trim())}`);
    setSuggestions([]);
  };

  return (
    <nav className="sticky top-0 z-[100] w-full bg-[#2874f0] text-white py-3 shadow-md">
      <div className="max-w-[1248px] mx-auto px-4 flex items-center gap-8">

        {/* Logo */}
        <Link to="/" className="flex flex-col items-start leading-none group">
          <span className="text-xl font-bold italic tracking-tight">E-Cart</span>
          <span className="text-[11px] italic font-medium flex items-center gap-0.5 group-hover:underline">
            Explore <span className="text-[#ffe11b] font-bold">Plus</span>
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png"
              alt="plus"
              className="w-2.5 h-2.5"
            />
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-[600px] relative">
          <div className="flex items-center bg-white rounded-sm overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 px-4 text-gray-800 text-sm focus:outline-none"
            />
            <button type="submit" className="px-3 text-[#2874f0]">
              <Search size={20} strokeWidth={2.5} />
            </button>
          </div>
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-8">

          {/* Login / User */}
          {!token ? (
            <Link
              to="/login"
              className="bg-white text-[#2874f0] px-8 py-1 font-bold rounded-sm hover:bg-gray-100"
            >
              Login
            </Link>
          ) : (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 font-bold py-2"
              >
                {username}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-60 bg-white text-gray-800 shadow-2xl mt-1 border py-1">
                  <DropdownLink to="/profile" icon={<UserCircle size={18} />} label="My Profile" />
                  <DropdownLink to="/orders" icon={<Package size={18} />} label="Orders" />
                  <DropdownLink to="/wishlist" icon={<Heart size={18} />} label="Wishlist" />
                  <DropdownLink to="/my-bookings" icon={<Store size={18} />} label="My Bookings" />
                  <div className="border-t my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 text-sm"
                  >
                    <LogOut size={18} className="text-[#2874f0]" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Seller */}
          <Link to="/seller" className="hidden lg:flex items-center gap-2 font-bold">
            <Store size={18} />
            Become a Seller
          </Link>

          {/* Cart */}
          <Link to="/cart" className="flex items-center gap-2 font-bold">
            <div className="relative">
              <ShoppingCart size={20} />
              {totalQuantity > 0 && (  // ✅ Use Redux live count
                <span className="absolute -top-2 -right-2 bg-[#ff6161] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {totalQuantity}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>

        </div>
      </div>
    </nav>
  );
}

// Dropdown helper
function DropdownLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 text-sm border-b last:border-0"
    >
      <span className="text-[#2874f0]">{icon}</span>
      {label}
    </Link>
  );
}
