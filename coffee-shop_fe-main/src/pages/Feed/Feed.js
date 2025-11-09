import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Feed.css";

const ADMIN_AVT = "/image/AVTadmin.JPG";
const USER_AVT = "/image/AVTuser.jpg";

const Feed = () => {
  const { user, isAdmin, loading } = useAuth();

  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentText, setCommentText] = useState({});
  const [replyText, setReplyText] = useState({});
  const [expandedComments, setExpandedComments] = useState({});

  const COMMENTS_DISPLAY_LIMIT = 2;

  const getUserKey = () => {
    if (user?.email) return user.email;
    if (user?.id) return user.id;
    return null;
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    try {
      const saved = localStorage.getItem("feedPosts");
      if (saved) setPosts(JSON.parse(saved));
    } catch (error) {
      console.error("Load posts error:", error);
    }
  };

  const savePosts = (newPosts) => {
    try {
      localStorage.setItem("feedPosts", JSON.stringify(newPosts));
    } catch (error) {
      console.error("Save posts error:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File quá lớn! Max 10MB");
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => setPreviewURL(event.target?.result || "");
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewURL("");
  };

  const getFixedAvatar = (info) => {
    if (info?.role === "admin") return ADMIN_AVT;
    return USER_AVT;
  };

  const handleSubmitPost = async () => {
    if (!postText.trim() && !selectedFile) {
      alert("Vui lòng viết gì đó hoặc thêm ảnh/video!");
      return;
    }
    setIsSubmitting(true);
    try {
      const newPost = {
        id: Date.now(),
        author: {
          id: user?.id || `user_${Date.now()}`,
          name: user?.name || "User",
          avatar: getFixedAvatar({ role: isAdmin ? "admin" : "user" }),
          role: isAdmin ? "admin" : "user",
        },
        content: postText || "(Không có text)",
        image: previewURL || null,
        likes: 0,
        likedBy: [],
        comments: [],
        timestamp: new Date().toISOString(),
      };
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      savePosts(updatedPosts);
      setPostText("");
      setSelectedFile(null);
      setPreviewURL("");

      setTimeout(() => {
        alert("Bài viết thành công! ✅");
      }, 300);
    } catch (error) {
      console.error("Error:", error);
      alert("Lỗi khi đăng bài!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = (postId) => {
    const userKey = getUserKey();
    if (!userKey) {
      alert("Vui lòng đăng nhập để thích bài viết!");
      return;
    }

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const hasLiked = post.likedBy.includes(userKey);
        if (hasLiked) {
          alert("Bạn chỉ được thích bài viết này 1 lần vĩnh viễn!");
          return post;
        }
        return {
          ...post,
          likes: post.likes + 1,
          likedBy: [...post.likedBy, userKey],
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  const handleLikeComment = (postId, commentId) => {
    const userKey = getUserKey();
    if (!userKey) {
      alert("Vui lòng đăng nhập!");
      return;
    }

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id === commentId) {
              const hasLiked = (comment.likedBy || []).includes(userKey);
              if (hasLiked) {
                return {
                  ...comment,
                  likes: (comment.likes || 1) - 1,
                  likedBy: (comment.likedBy || []).filter((id) => id !== userKey),
                };
              }
              return {
                ...comment,
                likes: (comment.likes || 0) + 1,
                likedBy: [...(comment.likedBy || []), userKey],
              };
            }
            return comment;
          }),
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  const handleAddComment = (postId) => {
    const userKey = getUserKey();
    if (!userKey) {
      alert("Vui lòng đăng nhập để bình luận!");
      return;
    }
    const text = commentText[postId];
    if (!text || !text.trim()) return;

    const role = isAdmin ? "admin" : "user";
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          userId: userKey,
          author: user?.name || "User",
          avatar: getFixedAvatar({ role }),
          role,
          text: text,
          timestamp: new Date().toLocaleString("vi-VN"),
          likes: 0,
          likedBy: [],
          replies: [],
        };

        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    savePosts(updatedPosts);
    setCommentText({ ...commentText, [postId]: "" });
  };

  const handleReplyComment = (postId, commentId) => {
    const userKey = getUserKey();
    if (!userKey) {
      alert("Vui lòng đăng nhập!");
      return;
    }

    const replyKey = `${postId}-${commentId}`;
    const text = replyText[replyKey];
    if (!text || !text.trim()) return;

    const role = isAdmin ? "admin" : "user";
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [
                  ...(comment.replies || []),
                  {
                    id: Date.now(),
                    userId: userKey,
                    author: user?.name || "User",
                    avatar: getFixedAvatar({ role }),
                    role,
                    text: text,
                    timestamp: new Date().toLocaleString("vi-VN"),
                    likes: 0,
                    likedBy: [],
                  },
                ],
              };
            }
            return comment;
          }),
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    savePosts(updatedPosts);
    setReplyText({ ...replyText, [replyKey]: "" });
  };

  const handleLikeReply = (postId, commentId, replyId) => {
    const userKey = getUserKey();
    if (!userKey) {
      alert("Vui lòng đăng nhập!");
      return;
    }

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: (comment.replies || []).map((reply) => {
                  if (reply.id === replyId) {
                    const hasLiked = (reply.likedBy || []).includes(userKey);
                    if (hasLiked) {
                      return {
                        ...reply,
                        likes: (reply.likes || 1) - 1,
                        likedBy: (reply.likedBy || []).filter((id) => id !== userKey),
                      };
                    }
                    return {
                      ...reply,
                      likes: (reply.likes || 0) + 1,
                      likedBy: [...(reply.likedBy || []), userKey],
                    };
                  }
                  return reply;
                }),
              };
            }
            return comment;
          }),
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  if (loading) {
    return (
      <div className="feed-wrapper">
        <div className="skeleton-loader">
          <div className="skeleton-card">
            <div className="skeleton-header">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-text-group">
                <div className="skeleton-text skeleton-title"></div>
                <div className="skeleton-text skeleton-subtitle"></div>
              </div>
            </div>
            <div className="skeleton-content"></div>
            <div className="skeleton-actions">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-wrapper">
      {/* ===== ADMIN POST CREATOR ===== */}
      {isAdmin && (
        <div className="post-card create-post">
          <div className="admin-badge">
            <span className="badge-icon">👑</span>
            ADMIN ONLY
          </div>
          <div className="creator-header">
            <img src={ADMIN_AVT} alt="avatar" className="avatar" />
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Chia sẻ thông báo với cộng đồng..."
              className="post-textarea"
              maxLength={500}
            />
          </div>
          {previewURL && (
            <div className="preview-container">
              <img src={previewURL} alt="preview" className="preview-image" />
              <button className="remove-btn" onClick={removeFile}>
                ✕
              </button>
            </div>
          )}
          <div className="creator-actions">
            <label className="action-btn">
              <span className="emoji">📸</span>
              <span>Thêm ảnh/video</span>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
          <button
            className="submit-btn"
            onClick={handleSubmitPost}
            disabled={isSubmitting || (!postText.trim() && !selectedFile)}
          >
            {isSubmitting ? "Đang đăng..." : "🚀  ĐĂNG BÀI"}
          </button>
        </div>
      )}

      {/* ===== EMPTY STATE ===== */}
      {posts.length === 0 && (
        <div className="post-card empty-state">
          <div className="empty-circle">
            <span className="empty-icon">📝</span>
          </div>
          <h3 className="empty-title">Chưa có bài viết nào</h3>
          <p className="empty-description">
            Hãy là người đầu tiên chia sẻ điều gì đó thú vị!
          </p>
        </div>
      )}

      {/* ===== POSTS LIST ===== */}
      <div className="posts-list">
        {posts.map((post) => {
          const userKey = getUserKey();
          const isLiked = userKey ? post.likedBy.includes(userKey) : false;
          const isExpanded = expandedComments[post.id] || false;
          const visibleComments = isExpanded
            ? post.comments
            : post.comments.slice(-COMMENTS_DISPLAY_LIMIT);
          const hiddenCount = Math.max(
            0,
            post.comments.length - COMMENTS_DISPLAY_LIMIT
          );

          return (
            <div key={post.id} className="post-card feed-post">
              {/* POST HEADER */}
              <div className="post-header">
                <img
                  src={getFixedAvatar(post.author)}
                  alt="author"
                  className="avatar"
                />
                <div className="author-info">
                  <h4 className="author-name">
                    {post.author.name}
                    {post.author.role === "admin" && (
                      <span className="verified-badge">✓</span>
                    )}
                  </h4>
                  <span className="post-time">
                    {new Date(post.timestamp).toLocaleString("vi-VN")}
                  </span>
                </div>
              </div>

              {/* POST CONTENT */}
              <div className="post-content">
                <p className="post-text">{post.content}</p>
                {post.image && (
                  <div className="post-image-container">
                    <img src={post.image} alt="post" className="post-image" />
                  </div>
                )}
              </div>

              {/* POST STATS */}
              <div className="post-stats">
                <span className="stat-item">
                  <span className="reaction-icon">👍</span>
                  {post.likes > 0 && <span className="stat-count">{post.likes}</span>}
                </span>
                <span className="stat-item stat-comments">
                  {post.comments.length > 0 && `${post.comments.length} bình luận`}
                </span>
              </div>

              {/* POST ACTIONS */}
              <div className="post-actions">
                <button
                  className={`action-btn ${isLiked ? "liked" : ""}`}
                  onClick={() => handleLike(post.id)}
                >
                  <span className="emoji">{isLiked ? "👍" : "👍"}</span>
                  <span>{isLiked ? "Thích" : "Thích"}</span>
                </button>
                <button className="action-btn">
                  <span className="emoji">💬</span>
                  <span>Bình luận</span>
                </button>
              </div>

              {/* ===== COMMENTS SECTION ===== */}
              <div className="comments-section">
                {/* View More Button */}
                {!isExpanded && hiddenCount > 0 && (
                  <button
                    className="view-more-comments-btn"
                    onClick={() =>
                      setExpandedComments({ ...expandedComments, [post.id]: true })
                    }
                  >
                    Xem thêm {hiddenCount} bình luận khác
                  </button>
                )}

                {/* COMMENTS LIST */}
                {visibleComments.length > 0 && (
                  <div className="comments-list">
                    {visibleComments.map((comment) => (
                      <div key={comment.id} className="comment-item">
                        <img
                          src={getFixedAvatar({ role: comment.role })}
                          alt="commenter"
                          className="comment-avatar"
                        />
                        <div className="comment-main">
                          <div className="comment-bubble">
                            <p className="comment-author">
                              {comment.author}
                              {comment.role === "admin" && (
                                <span className="verified-badge">✓</span>
                              )}
                            </p>
                            <p className="comment-text">{comment.text}</p>
                          </div>

                          {/* COMMENT ACTIONS */}
                          <div className="comment-actions">
                            <button
                              className={`comment-action-link ${
                                (comment.likedBy || []).includes(getUserKey())
                                  ? "liked"
                                  : ""
                              }`}
                              onClick={() =>
                                handleLikeComment(post.id, comment.id)
                              }
                            >
                              Thích
                              {(comment.likes || 0) > 0 && ` (${comment.likes})`}
                            </button>
                            <span className="action-separator">·</span>
                            <button className="comment-action-link">
                              Trả lời
                            </button>
                            <span className="action-separator">·</span>
                            <span className="comment-time">
                              {comment.timestamp}
                            </span>
                          </div>

                          {/* REPLIES */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="replies-section">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="reply-item">
                                  <img
                                    src={getFixedAvatar({ role: reply.role })}
                                    alt="replier"
                                    className="reply-avatar"
                                  />
                                  <div className="reply-main">
                                    <div className="reply-bubble">
                                      <p className="reply-author">
                                        {reply.author}
                                        {reply.role === "admin" && (
                                          <span className="verified-badge">✓</span>
                                        )}
                                      </p>
                                      <p className="reply-text">{reply.text}</p>
                                    </div>
                                    <div className="reply-actions">
                                      <button
                                        className={`reply-action-link ${
                                          (reply.likedBy || []).includes(getUserKey())
                                            ? "liked"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          handleLikeReply(
                                            post.id,
                                            comment.id,
                                            reply.id
                                          )
                                        }
                                      >
                                        Thích
                                        {(reply.likes || 0) > 0 &&
                                          ` (${reply.likes})`}
                                      </button>
                                      <span className="action-separator">·</span>
                                      <span className="reply-time">
                                        {reply.timestamp}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* REPLY INPUT */}
                          <div className="reply-input-wrapper">
                            <img
                              src={getFixedAvatar({
                                role: isAdmin ? "admin" : "user",
                              })}
                              alt="you"
                              className="reply-avatar"
                            />
                            <div className="reply-input-container">
                              <input
                                type="text"
                                placeholder="Viết trả lời..."
                                value={replyText[`${post.id}-${comment.id}`] || ""}
                                onChange={(e) =>
                                  setReplyText({
                                    ...replyText,
                                    [`${post.id}-${comment.id}`]:
                                      e.target.value,
                                  })
                                }
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    handleReplyComment(post.id, comment.id);
                                  }
                                }}
                                className="reply-input"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* View Less Button */}
                {isExpanded && post.comments.length > COMMENTS_DISPLAY_LIMIT && (
                  <button
                    className="view-more-comments-btn"
                    onClick={() =>
                      setExpandedComments({ ...expandedComments, [post.id]: false })
                    }
                  >
                    Ẩn bớt bình luận
                  </button>
                )}

                {/* ADD COMMENT INPUT */}
                <div className="add-comment">
                  <img
                    src={getFixedAvatar({
                      role: isAdmin ? "admin" : "user",
                    })}
                    alt="you"
                    className="comment-avatar"
                  />
                  <div className="comment-input-wrapper">
                    <input
                      type="text"
                      placeholder="Viết bình luận..."
                      value={commentText[post.id] || ""}
                      onChange={(e) =>
                        setCommentText({
                          ...commentText,
                          [post.id]: e.target.value,
                        })
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddComment(post.id);
                        }
                      }}
                      className="comment-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feed;