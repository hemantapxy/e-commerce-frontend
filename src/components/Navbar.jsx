import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");

  // 🔹 Fetch username when token exists
  useEffect(() => {
    if (token) {
      api
        .get("/user/profile")
        .then((res) => {
          setUsername(res.data.username || "");
        })
        .catch(() => {
          setUsername("");
        });
    } else {
      setUsername("");
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUsername("");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    alert(`Searching for "${search}"`);
    setSearch("");
  };

  return (
    <nav className="bg-blue-600 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center gap-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-white font-bold text-2xl whitespace-nowrap"
        >
          E-Shop
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative max-w-2xl mx-auto border border-white rounded-md">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 px-4 pr-10 rounded-md bg-blue-500 text-white placeholder-white placeholder-opacity-80 focus:outline-none shadow"
            />

            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 text-lg"
            >
              🔍
            </button>
          </div>
        </form>

        {/* Right Buttons */}
        <div className="flex items-center gap-4 whitespace-nowrap">
          {!token && (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-gray-100"
              >
                Signup
              </Link>
            </>
          )}

          {token && (
            <>
              {/* 👋 Username */}
              <span className="text-white font-medium">
                Hello, <span className="font-semibold">{username}</span>
              </span>

              <Link
                to="/cart"
                className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-gray-100"
              >
                Cart
              </Link>

              <Link
                to="/profile"
                className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                to="/orders"
                className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-gray-100"
              >
                My Orders
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded font-semibold hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
