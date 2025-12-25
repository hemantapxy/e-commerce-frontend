import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ ADD THIS
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

// existing exports (keep them)
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const getProducts = () => API.get("/products");
export const getCart = () => API.get("/cart");
export const addToCart = (productId) => API.post("/cart/add", { productId });
export const removeFromCart = (productId) =>
  API.post("/cart/remove", { productId });
