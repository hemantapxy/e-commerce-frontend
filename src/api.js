import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Auth
export const signup = data => API.post("/auth/signup", data);
export const login = data => API.post("/auth/login", data);

// Products
export const getProducts = () => API.get("/products");

// Cart
export const getCart = token =>
  API.get("/cart", { headers: { Authorization: `Bearer ${token}` } });

export const addToCart = (productId, token) =>
  API.post("/cart/add", { productId }, { headers: { Authorization: `Bearer ${token}` } });

export const removeFromCart = (productId, token) =>
  API.post("/cart/remove", { productId }, { headers: { Authorization: `Bearer ${token}` } });
