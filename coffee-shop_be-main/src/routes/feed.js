import express from "express";
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  deleteComment,
} from "../app/controllers/feedController.js"; // ✅ FIXED PATH

const router = express.Router();

// ✅ POST ROUTES
router.get("/", getAllPosts);                    // GET all posts
router.post("/", createPost);                   // CREATE post
router.get("/:id", getPostById);                // GET single post
router.put("/:id", updatePost);                 // UPDATE post
router.delete("/:id", deletePost);              // DELETE post

// ✅ LIKE ROUTES
router.post("/:id/like", toggleLike);           // LIKE/UNLIKE post

// ✅ COMMENT ROUTES
router.post("/:id/comment", addComment);        // ADD comment
router.delete("/:id/comment/:commentId", deleteComment); // DELETE comment

export default router;