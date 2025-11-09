const BASE_URL = "http://localhost:5000/api/feed";

// ✅ GET ALL POSTS
export const getAllPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Get posts error:", error);
    throw error;
  }
};

// ✅ CREATE POST
export const createPost = async (postData) => {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to create post");
    }
    return data;
  } catch (error) {
    console.error("❌ Create post error:", error);
    throw error;
  }
};

// ✅ GET SINGLE POST
export const getPostById = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/${postId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Get post error:", error);
    throw error;
  }
};

// ✅ UPDATE POST
export const updatePost = async (postId, postData) => {
  try {
    const response = await fetch(`${BASE_URL}/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to update post");
    }
    return data;
  } catch (error) {
    console.error("❌ Update post error:", error);
    throw error;
  }
};

// ✅ DELETE POST
export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/${postId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to delete post");
    }
    return data;
  } catch (error) {
    console.error("❌ Delete post error:", error);
    throw error;
  }
};

// ✅ LIKE POST
export const toggleLike = async (postId, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to like post");
    }
    return data;
  } catch (error) {
    console.error("❌ Like post error:", error);
    throw error;
  }
};

// ✅ ADD COMMENT
export const addComment = async (postId, commentData) => {
  try {
    const response = await fetch(`${BASE_URL}/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to add comment");
    }
    return data;
  } catch (error) {
    console.error("❌ Add comment error:", error);
    throw error;
  }
};

// ✅ DELETE COMMENT
export const deleteComment = async (postId, commentId) => {
  try {
    const response = await fetch(`${BASE_URL}/${postId}/comment/${commentId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to delete comment");
    }
    return data;
  } catch (error) {
    console.error("❌ Delete comment error:", error);
    throw error;
  }
};

// ✅ UPLOAD MEDIA
export const uploadMedia = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to upload media");
    }
    return data;
  } catch (error) {
    console.error("❌ Upload media error:", error);
    throw error;
  }
};