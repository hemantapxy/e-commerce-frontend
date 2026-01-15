import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// 🔐 Attach token automatically if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ================= AUTH =================
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);

// ================= PASSWORD =================
export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", { email });
export const resetPassword = (token, password) =>
  API.post(`/auth/reset-password/${token}`, { password });

// ================= PRODUCTS =================

// ================= PRODUCTS =================
export const getProducts = (params = {}) => API.get("/products", { params });
 // GET /api/products

// ================= CART =================
export const getCart = () => API.get("/cart");
export const addToCart = (productId) =>
  API.post("/cart/add", { productId });
export const removeFromCart = (productId) =>
  API.post("/cart/remove", { productId });

// ================= ORDERS =================
export const placeOrder = () => API.post("/order/place");
export const getOrders = () => API.get("/order/my");

// ================= 💳 RAZORPAY =================
export const createRazorpayOrder = (payload) =>
  API.post("/order/create", payload);
export const verifyRazorpayPayment = (paymentData) =>
  API.post("/order/verify", paymentData);
export const getProductById = (id) =>
  API.get(`/products/${id}`);

// ================= REVIEWS =================
 
export const submitReview = (productId, review) =>
  API.post(`/products/${productId}/review`, review);
// ================= FLIGHTS =================
export const getFlights = (params = {}) =>
  API.get("/flights", { params });

// Get single flight details
export const getFlightById = (id) =>
  API.get(`/flights/${id}`);

// Create booking
export const createFlightBooking = (data) =>
  API.post("/bookings", data);

// Get booking details
export const getFlightBookingById = (id) =>
  API.get(`/bookings/${id}`);
// Correct flight payment API calls
// api.js
export const createRazorpayFlightPayment = (payload) =>
  API.post("/payment/flight/create", payload);


export const verifyRazorpayFlightPayment = (payload) =>
  API.post("/payment/flight/verify", payload);


export default API;
