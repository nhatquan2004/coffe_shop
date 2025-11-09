import express from "express";
import {
  getAllMenu,
  getSingleMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../app/controllers/MenuController.js";

const router = express.Router();

// GET all menus
router.get("/", getAllMenu);

// GET single menu by ID
router.get("/:id", getSingleMenu);

// CREATE new menu (POST)
router.post("/", createMenu);

// UPDATE menu by ID (PUT)
router.put("/:id", updateMenu);

// DELETE menu by ID (DELETE)
router.delete("/:id", deleteMenu);

export default router;
