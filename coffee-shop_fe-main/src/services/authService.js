// services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/auth";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("📤 Request:", {
      method: config.method,
      url: config.url,
      hasToken: !!token,
    });
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("📥 Response:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth API Functions
export const register = async (userData) => {
  try {
    console.log("🔄 Registering user...", userData);
    const response = await api.post("/register", userData);
    console.log("✅ Registration successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Registration failed:", error.response?.data || error.message);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    console.log("🔄 Logging in...", credentials);
    const response = await api.post("/login", credentials);
    console.log("✅ Login successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (error) {
    console.error("❌ GetMe failed:", error.response?.data || error.message);
    throw error;
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await api.put("/update", userData);
    return response.data;
  } catch (error) {
    console.error("❌ Update failed:", error.response?.data || error.message);
    throw error;
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await api.put("/change-password", passwordData);
    return response.data;
  } catch (error) {
    console.error("❌ Change password failed:", error.response?.data || error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export default api;
