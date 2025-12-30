import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Navbar({ token, setToken, dark, setDark }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef();

  // Fetch username when token exists
  useEffect(() => {
    if (token) {
      api
        .get("/user/profile")
        .then((res) => setUsername(res.data.username || ""))
        .catch(() => setUsername(""));
    } else {
      setUsername("");
    }
  }, [token]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUsername("");
    navigate("/login");
  };

  // Search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    alert(`Searching for "${search}"`);
    setSearch("");
    setSuggestions([]);
  };

  // Search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    const dummyProducts = [
      "iPhone 15",
      "Samsung Galaxy S24",
      "MacBook Pro",
      "Dell Laptop",
      "Nike Shoes",
      "Adidas Sneakers",
      "Sony Headphones",
      "Canon Camera",
    ];

    if (value.trim()) {
      setSuggestions(
        dummyProducts.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 px-4 py-2 shadow transition-colors">
      <div className="max-w-7xl mx-auto flex items-center gap-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-white font-bold text-2xl whitespace-nowrap"
        >
          E-Shop
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 relative">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={search}
            onChange={handleSearchChange}
            className="w-full h-10 px-4 rounded-md bg-blue-500 dark:bg-gray-700 text-white placeholder-white placeholder-opacity-80 focus:outline-none shadow"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-lg"
          >
            🔍
          </button>

          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-md shadow mt-1 max-h-48 overflow-y-auto z-50">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => {
                    setSearch(item);
                    setSuggestions([]);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* Right side buttons */}
        <div className="flex items-center gap-4 whitespace-nowrap relative">

          {/* Dark mode toggle */}
          {/* <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {dark ? "☀ Day" : "🌙 Night"}
          </button> */}

          {/* Auth buttons */}
          {!token && (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-gray-100 transition"
              >
                Signup
              </Link>
            </>
          )}

          {/* User dropdown */}
          {token && (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white font-medium px-4 py-1 rounded hover:bg-blue-500 flex items-center gap-1 transition"
              >
                Hello, <span className="font-semibold">{username}</span> ▼
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/cart"
                    className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Cart
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
