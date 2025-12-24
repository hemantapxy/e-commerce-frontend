import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";

export default function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <BrowserRouter>
      <Navbar searchText={searchText} setSearchText={setSearchText} />

      <Routes>
        <Route path="/" element={<Home searchText={searchText} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}
