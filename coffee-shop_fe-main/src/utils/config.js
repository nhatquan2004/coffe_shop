
const isDevelopment = process.env.NODE_ENV === "development";

// 🟢 DEVELOPMENT: http://localhost:5000/api/v1
// 🔵 PRODUCTION: https://coffee-shop-backend-pg5o.onrender.com/api/v1
export const BASE_URL = isDevelopment
  ? "http://localhost:5000/api/v1"  // ✅ Thêm /api/v1
  : process.env.REACT_APP_API_URL || "https://coffee-shop-backend-pg5o.onrender.com/api/v1";

// 🔍 DEBUG: Log API URL để kiểm tra
console.log("🔗 [CONFIG] Environment:", process.env.NODE_ENV);
console.log("🔗 [CONFIG] API URL:", BASE_URL);
console.log("🔗 [CONFIG] REACT_APP_API_URL:", process.env.REACT_APP_API_URL);

export default BASE_URL;