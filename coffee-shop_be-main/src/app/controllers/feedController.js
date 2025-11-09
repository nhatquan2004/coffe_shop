import Post from "../model/Post.js";
import mongoose from "mongoose";

// GET ALL POSTS
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("❌ Get posts error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// CREATE POST
export const createPost = async (req, res) => {
  try {
    const { author, content, media } = req.body;

    // Validation
    if (!author || !author.id || !author.name) {
      return res.status(400).json({
        success: false,
        error: "Author info is required"
      });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Post content is required"
      });
    }

    const newPost = new Post({
      author,
      content: content.trim(),
      media: media || [],
      likes: {
        count: 0,
        likedBy: [],
      },
      comments: [],
      shares: {
        count: 0,
      },
    });

    await newPost.save();

    console.log("✅ Post created:", newPost._id);

    res.status(201).json({
      success: true,
      message: "✅ Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("❌ Create post error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET SINGLE POST
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const { content, media } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Content cannot be empty",
      });
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        content: content.trim(),
        media: media || [],
        isEdited: true,
        editedAt: new Date(),
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "✅ Post updated successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE POST
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "✅ Post deleted successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// LIKE/UNLIKE POST
export const toggleLike = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    const likedIndex = post.likes.likedBy.indexOf(userId);

    if (likedIndex === -1) {
      // Like
      post.likes.likedBy.push(userId);
      post.likes.count += 1;
      console.log(`❤️ Post liked by ${userId}`);
    } else {
      // Unlike
      post.likes.likedBy.splice(likedIndex, 1);
      post.likes.count -= 1;
      console.log(`💔 Post unliked by ${userId}`);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: likedIndex === -1 ? "❤️ Liked" : "🤍 Unliked",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const { author, text } = req.body;

    if (!author || !author.name) {
      return res.status(400).json({
        success: false,
        error: "Author info is required",
      });
    }

    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Comment text is required",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    const newComment = {
      _id: new mongoose.Types.ObjectId(),
      author,
      text: text.trim(),
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    console.log(`💬 Comment added to post ${req.params.id}`);

    res.status(201).json({
      success: true,
      message: "✅ Comment added",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Comment not found",
      });
    }

    post.comments.splice(commentIndex, 1);
    await post.save();

    res.status(200).json({
      success: true,
      message: "✅ Comment deleted",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
