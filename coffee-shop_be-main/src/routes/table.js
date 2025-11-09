import express from "express";
import { createTable } from "../app/controllers/TableController.js";

const router = express.Router();

router.post("/", createTable);

export default router;
