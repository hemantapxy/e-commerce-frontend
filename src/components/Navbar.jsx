import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for "${search}"`);
    setSearch("");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
      {/* Logo */}
      <Link to="/" className="font-bold text-2xl md:text-3xl">E-Shop</Link>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex flex-1 md:mx-8">
        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 rounded-l-md border-none focus:outline-none text-black"
        />
        <button type="submit" className="bg-yellow-400 text-black px-4 rounded-r-md font-semibold hover:bg-yellow-300">
          Search
        </button>
      </form>

      {/* Buttons */}
      <div className="flex gap-4">
        {!token && (
          <>
            <Link to="/login" className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-gray-100">
              Login
            </Link>
            <Link to="/signup" className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-gray-100">
              Signup
            </Link>
          </>
        )}
        {token && (
          <>
            <Link to="/cart" className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-gray-100">
              Cart
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded font-semibold hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
