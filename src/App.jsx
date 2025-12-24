import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartPage from "./components/CartPage";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Router>
      <Navbar token={token} setToken={setToken}/>
      <Routes>
        <Route path="/" element={<Home token={token}/>}/>
        <Route path="/cart" element={<CartPage token={token}/>}/>
        <Route path="/login" element={<Login setToken={setToken}/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
