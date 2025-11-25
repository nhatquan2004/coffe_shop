import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Promotion.css";

// Avatar paths (tương tự Feed)
const ADMIN_AVT = "/image/AVTadmin.JPG";
const USER_AVT = "/image/AVTuser.jpg";

const Promotion = () => {
  const { user, isAdmin, loading } = useAuth();

  const [promotions, setPromotions] = useState([]);
  const [promotionText, setPromotionText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = () => {
    try {
      const saved = localStorage.getItem("promotions");
      if (saved) setPromotions(JSON.parse(saved));
    } catch (error) {
      console.error("Load promotions error:", error);
    }
  };

  const savePromotions = (newPromotions) => {
    try {
      localStorage.setItem("promotions", JSON.stringify(newPromotions));
    } catch (error) {
      console.error("Save promotions error:", error);
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

  const handleSubmitPromotion = async () => {
    if (!promotionText.trim() && !selectedFile) {
      alert("Vui lòng viết gì đó hoặc thêm ảnh/video!");
      return;
    }
    setIsSubmitting(true);
    try {
      const newPromotion = {
        id: Date.now(),
        author: {
          id: user?.id || `user_${Date.now()}`,
          name: "MoodOn Coffee",
          avatar: getFixedAvatar({ role: "admin" }),
          role: "admin",
        },
        content: promotionText || "(Không có text)",
        image: previewURL || null,
        timestamp: new Date().toISOString(),
      };
      const updatedPromotions = [newPromotion, ...promotions];
      setPromotions(updatedPromotions);
      savePromotions(updatedPromotions);
      setPromotionText("");
      setSelectedFile(null);
      setPreviewURL("");
      alert("Khuyến mãi đã đăng! ✅");
    } catch (error) {
      console.error("Error:", error);
      alert("Lỗi khi đăng khuyến mãi!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deletePromotion = (promotionId) => {
    const updatedPromotions = promotions.filter((p) => p.id !== promotionId);
    setPromotions(updatedPromotions);
    savePromotions(updatedPromotions);
  };

  if (loading) {
    return (
      <div className="promotion-wrapper">
        <div className="empty-state">
          <div className="empty-icon">⏳</div>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="promotion-wrapper">
      {/* Admin Post Form */}
      {isAdmin && (
        <div className="post-card create-post">
          <div className="admin-badge">🔐 ADMIN ONLY</div>
          <div className="creator-header">
            <img src={ADMIN_AVT} alt="avatar" className="avatar" />
            <textarea
              value={promotionText}
              onChange={(e) => setPromotionText(e.target.value)}
              placeholder="Viết khuyến mãi cho cộng đồng..."
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
              <span className="icon">📸</span>
              <span>Ảnh/Video</span>
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
            onClick={handleSubmitPromotion}
            disabled={isSubmitting || (!promotionText.trim() && !selectedFile)}
          >
            {isSubmitting ? "Đang đăng..." : "ĐĂNG KHUYẾN MÃI"}
          </button>
        </div>
      )}

      {/* Promotions List */}
      {promotions.length === 0 && (
        <div className="post-card empty-state">
          <div className="empty-icon">🎉</div>
          <p>Chưa có khuyến mãi nào</p>
          <small>Hãy chờ đợi những ưu đãi tốt nhất!</small>
        </div>
      )}

      <div className="promotions-list">
        {promotions.map((promo) => (
          <div key={promo.id} className="post-card promotion-post">
            <div className="post-header">
              <div className="author-section">
                <img
                  src={getFixedAvatar(promo.author)}
                  alt="author"
                  className="avatar"
                />
                <div className="author-info">
                  <h4 className="author-name">{promo.author.name}</h4>
                  <span className="post-time">
                    {new Date(promo.timestamp).toLocaleString("vi-VN")}
                  </span>
                </div>
              </div>
              {isAdmin && (
                <button
                  className="delete-btn"
                  onClick={() => deletePromotion(promo.id)}
                >
                  ✕
                </button>
              )}
            </div>
            <div className="post-content">
              <p className="post-text">{promo.content}</p>
              {promo.image && (
                <img src={promo.image} alt="promotion" className="post-image" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotion;
