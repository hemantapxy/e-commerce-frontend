import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  ChevronDown,
  Package,
  Heart,
  LogOut,
  UserCircle,
  Store,
} from "lucide-react";
import { useSelector } from "react-redux";
import api from "../api";

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [history, setHistory] = useState([]);

  const dropdownRef = useRef();
  const searchRef = useRef();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    if (token) {
      api
        .get("/user/profile")
        .then((res) => setUsername(res.data.username || "User"))
        .catch(() => setUsername("User"));
    }
  }, [token]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(saved);
  }, []);

  const saveToHistory = (query) => {
    let updated = [query, ...history.filter((h) => h !== query)];
    updated = updated.slice(0, 10);
    setHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    saveToHistory(search.trim());
    navigate(`/search?query=${encodeURIComponent(search.trim())}`);
    setHistoryVisible(false);
  };

  const handleSuggestionClick = (query) => {
    setSearch(query);
    saveToHistory(query);
    navigate(`/search?query=${encodeURIComponent(query)}`);
    setHistoryVisible(false);
  };

  const filteredHistory = history.filter((h) =>
    h.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setHistoryVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#2874f0] text-white py-2.5">
      <div className="max-w-[1248px] mx-auto px-4 flex items-center gap-4 md:gap-12">
        
        {/* LOGO SECTION */}
        <Link to="/" className="flex flex-col items-end leading-none">
          <span className="text-xl font-bold italic tracking-tight">Flipkart</span>
          <span className="text-[11px] italic font-medium flex items-center gap-0.5">
            Explore <span className="text-yellow-400 font-bold">Plus</span>
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/plus-brand-bc170b.svg" alt="plus" className="w-3" />
          </span>
        </Link>

        {/* SEARCH BAR */}
        <div className="flex-1 max-w-[564px] relative" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="flex bg-white rounded-sm shadow-sm overflow-hidden">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHistoryVisible(true);
              }}
              onFocus={() => setHistoryVisible(true)}
              className="w-full h-9 px-4 text-[14px] text-black outline-none placeholder-gray-500"
            />
            <button type="submit" className="px-3 text-[#2874f0]">
              <Search size={20} strokeWidth={2.5} />
            </button>
          </form>

          {/* SEARCH HISTORY DROPDOWN */}
          {historyVisible && history.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl mt-0.5 z-50 rounded-b-sm overflow-hidden text-black">
              {(search ? filteredHistory : history).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSuggestionClick(item)}
                  className="px-4 py-2.5 hover:bg-[#f1f3f6] cursor-pointer text-[14px] flex items-center gap-3"
                >
                  <Search size={16} className="text-gray-400" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ACTIONS SECTION */}
        <div className="flex items-center gap-6 md:gap-10">
          
          {/* USER DROPDOWN / LOGIN */}
          {!token ? (
            <Link
              to="/login"
              className="bg-white text-[#2874f0] px-9 py-0.5 text-[15px] font-bold rounded-sm hover:bg-gray-50"
            >
              Login
            </Link>
          ) : (
            <div 
              className="relative group" 
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 font-bold text-[15px] hover:text-white h-full py-2 transition-all ${dropdownOpen ? 'text-white' : ''}`}
              >
                {username}
                <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* DROPDOWN MENU */}
              {dropdownOpen && (
                <div className="absolute top-full -right-10 bg-white text-black shadow-2xl mt-0 w-60 rounded-sm overflow-hidden">
                  <div className="absolute -top-2 right-12 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
                  <DropdownLink to="/profile" icon={<UserCircle size={18} />} label="My Profile" />
                  <DropdownLink to="/orders" icon={<Package size={18} />} label="Orders" />
                  <DropdownLink to="/wishlist" icon={<Heart size={18} />} label="Wishlist" />
                  <DropdownLink to="/my-bookings" icon={<Store size={18} />} label="My Bookings" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-[#f1f3f6] text-[14px] border-t border-gray-100"
                  >
                    <LogOut size={18} className="text-[#2874f0]" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* BECOME A SELLER (Classic Flipkart) */}
          <Link to="/seller" className="hidden lg:block font-bold text-[15px]">
            Become a Seller
          </Link>

          {/* CART */}
          <Link to="/cart" className="flex items-center gap-2 font-bold text-[15px] hover:text-white transition-colors">
            <div className="relative">
              <ShoppingCart size={20} strokeWidth={2.5} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-[#ff6161] text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full border-2 border-[#2874f0] flex items-center justify-center font-bold">
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

function DropdownLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#f1f3f6] text-[14px] border-b border-gray-50 transition-colors"
    >
      <span className="text-[#2874f0]">{icon}</span>
      <span className="text-gray-800">{label}</span>
    </Link>
  );
}