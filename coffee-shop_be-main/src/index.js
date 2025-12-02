import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";

// ========================================
// IMPORT ALL ROUTES
// ========================================
import menuRoutes from "./routes/menu.js";
import tableRoutes from "./routes/table.js";
import authRoutes from "./routes/auth.js";
import feedRoutes from "./routes/feed.js";
import promotionRoutes from "./routes/promotionRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ===========================
// Get __dirname for ES modules
// ===========================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===========================
// Database Connection
// ===========================
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log("✅ Connected to database successfully");
  } catch (error) {
    console.error("❌ Connect to database failed:", error.message);
    process.exit(1);
  }
};

// ===========================
// 🔴 [SỬA CORS] - CHO RAILWAY & VERCEL
// ===========================
// 📝 COMMENT:
// - Thêm URL Railway Backend (lấy từ Railway Deploy)
// - Thêm URL Vercel Frontend (lấy từ Vercel Deploy)
// - Giữ localhost cho dev local
// - Bây giờ thêm placeholder, bạn sẽ update URL thực sau deploy
// ===========================

const corsOptions = {
  // ✅ THÊM URL CỦA RAILWAY & VERCEL VÀO ĐÂY
  origin: [
    // 🟢 DEV LOCAL
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5000",
    
    // 🔵 PRODUCTION - THAY BẰNG URL THỰC CỦA BẠN
    // ❗ SỬA: Lấy URL Railway và Vercel sau deploy, update vào đây
    "https://coffee-shop-fe-main.vercel.app",      // 📝 URL Frontend từ Vercel
    "https://coffee-shop-be-main.railway.app",     // 📝 URL Backend từ Railway
  ],
  
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ===========================
// SERVE STATIC FILES
// ===========================
app.use(express.static(path.join(__dirname, "../public")));

// ===========================
// Body Parser Middleware
// ===========================
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// ===========================
// Request Logging
// ===========================
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ===========================
// CONFIGURE MULTER FOR IMAGE/VIDEO UPLOAD
// ===========================
const uploadDir = path.join(__dirname, "../public/images");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ Created /public/images folder");
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Keep original filename with timestamp to avoid conflicts
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${timestamp}${ext}`);
  },
});

// File filter - allow images and videos
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|avi|mov|webm/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("❌ Only image and video files are allowed!"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max
  fileFilter,
});

// ===========================
// UPLOAD ROUTE
// ===========================
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "❌ No file provided",
      });
    }

    const filePath = `/images/${req.file.filename}`;
    res.status(200).json({
      success: true,
      filePath,
      message: `✅ Upload thành công: ${req.file.filename}`,
      filename: req.file.filename,
    });
    console.log(`✅ File uploaded: ${filePath}`);
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "❌ Upload failed",
    });
  }
});

// ===========================
// API ROUTES
// ===========================

// Menu Routes
app.use("/api/v1/menu", menuRoutes);
app.use("/api/menu", menuRoutes);

// Table/Reservation Routes
app.use("/api/v1/reservation", tableRoutes);
app.use("/api/reservation", tableRoutes);

// Auth Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/auth", authRoutes);

// Feed Routes (Social Media Feed)
app.use("/api/feed", feedRoutes);
app.use("/api/v1/feed", feedRoutes);

// Promotion Routes (Admin Promotions)
app.use("/api/promotion", promotionRoutes);
app.use("/api/v1/promotion", promotionRoutes);

// ===========================
// Health Check Route
// ===========================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "☕ Coffee Shop API is running!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    features: {
      upload: "/api/upload",
      staticFiles: "/images/*",
      menu: "/api/menu",
      reservation: "/api/reservation",
      auth: "/api/auth",
      feed: "/api/feed",
      promotion: "/api/promotion",
    },
  });
});

// ===========================
// Test Routes
// ===========================
app.get("/api/upload/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Upload endpoint is working",
    endpoint: "POST /api/upload",
    accept: "multipart/form-data with 'image' field",
    maxSize: "100MB",
  });
});

app.get("/api/feed/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Feed endpoint is working",
    endpoints: {
      getAllPosts: "GET /api/feed",
      createPost: "POST /api/feed",
      likePost: "POST /api/feed/:id/like",
      addComment: "POST /api/feed/:id/comment",
    },
  });
});

app.get("/api/promotion/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Promotion endpoint is working",
    endpoints: {
      getAllPromotions: "GET /api/promotion",
      createPromotion: "POST /api/promotion (Admin only)",
      deletePromotion: "DELETE /api/promotion/:id (Admin only)",
    },
  });
});

// ===========================
// 404 Handler
// ===========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "❌ Route not found",
    path: req.path,
    method: req.method,
  });
});

// ===========================
// Global Error Handler
// ===========================
app.use((err, req, res, next) => {
  console.error("❌ Error:", {
    message: err.message,
    status: err.status || 500,
    path: req.path,
  });

  // Handle multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        message: "❌ File size exceeds 100MB limit",
      });
    }
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "❌ Internal Server Error",
  });
});

// ===========================
// Start Server
// ===========================
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log("\n🚀 Coffee Shop Server Started!");
      console.log(`📍 Port: ${port}`);
      console.log(`🌐 CORS: Enabled for localhost & Railway/Vercel`);
      console.log(`📂 Static Files: Serving from /public folder`);
      console.log(`📤 Upload Endpoint: POST /api/upload`);
      console.log(`📸 Images Folder: /public/images`);
      console.log(`📰 Feed Routes: /api/feed`);
      console.log(`🎉 Promotion Routes: /api/promotion`);
      console.log(`\n✅ All services ready!\n`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;