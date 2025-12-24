import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function Navbar({ searchText, setSearchText }) {
  const token = localStorage.getItem("token");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/?q=${searchText}`);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between sticky top-0 z-50">

      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold italic tracking-wide">
        MiniKart
      </Link>

      {/* SEARCH BAR (Flipkart Style) */}
      <div className="hidden md:flex flex-1 mx-8">
        <div className="flex w-full bg-white rounded-sm overflow-hidden shadow-sm">
          
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for products, brands and more"
            className="flex-1 px-4 py-2 text-sm text-gray-800 outline-none"
          />

          <button
            onClick={handleSearch}
            className="bg-yellow-400 px-5 flex items-center justify-center hover:bg-yellow-300"
          >
            <Search size={18} className="text-gray-800" />
          </button>
        </div>
      </div>

      {/* RIGHT MENU */}
      <div className="flex items-center gap-6">
        {!token ? (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-gray-100"
            >
              Login
            </Link>

            <Link to="/register" className="hover:text-yellow-300">
              Register
            </Link>
          </>
        ) : (
          <>
            {/* CART */}
            <Link to="/cart" className="relative hover:text-yellow-300">
              <span className="text-lg font-semibold">Cart</span>

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cart.reduce((sum, i) => sum + (i.quantity || 1), 0)}
                </span>
              )}
            </Link>

            {/* ORDERS */}
            <Link to="/orders" className="hover:text-yellow-300">
              Orders
            </Link>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
