import express from "express";
import {
  getAllPromotions,
  createPromotion,
  getPromotionById,
  updatePromotion,
  deletePromotion,
} from "../app/controllers/PromotionController.js"; // ✅ FIXED PATH

const router = express.Router();

// ✅ PROMOTION ROUTES
router.get("/", getAllPromotions);           // GET all promotions
router.post("/", createPromotion);           // CREATE promotion (Admin)
router.get("/:id", getPromotionById);        // GET single promotion
router.put("/:id", updatePromotion);         // UPDATE promotion (Admin)
router.delete("/:id", deletePromotion);      // DELETE promotion (Admin)

export default router;