import React from "react";
import { useState } from "react";
import { signup } from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signup({ username, email, password });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch(err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Signup</h1>
        <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} className="w-full p-2 border rounded mb-3"/>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded mb-3"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded mb-3"/>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Signup</button>
      </form>
    </div>
  );
}
