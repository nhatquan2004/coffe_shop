// src/services/menuService.js
import axios from "axios";

// ✅ XÓA /v1 ĐI
const API_URL = "http://localhost:5000/api/menu";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("🔵 API Request:", {
      method: config.method.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: config.baseURL + config.url,
    });
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("🟢 API Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("🔴 API Error:", {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
      fullURL: error.config?.baseURL + error.config?.url,
    });
    return Promise.reject(error);
  }
);

// GET ALL MENUS
export const getAllMenus = async () => {
  const response = await api.get("/");
  return response.data;
};

// GET SINGLE MENU
export const getMenuById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// CREATE MENU
export const createMenu = async (menuData) => {
  console.log("📤 Creating menu with data:", menuData);
  const response = await api.post("/", menuData);
  console.log("📥 Create response:", response.data);
  return response.data;
};

// UPDATE MENU
export const updateMenu = async (id, menuData) => {
  const response = await api.put(`/${id}`, menuData);
  return response.data;
};

// DELETE MENU
export const deleteMenu = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export default api;
