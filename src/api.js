import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

API.interceptors.request.use(req => {
  const token = localStorage.getItem("token");
  if(token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth
export const signup = data => API.post("/auth/signup", data);
export const login = data => API.post("/auth/login", data);

// Products
export const getProducts = () => API.get("/products");
export const getCart = () => API.get("/cart");
export const addToCart = (productId) => API.post("/cart/add", { productId });
export const removeFromCart = (productId) =>
  API.post("/cart/remove", { productId });

// Orders
export const placeOrder = () => API.post("/order/place");
export const getOrders = () => API.get("/order/my");

export default API;
