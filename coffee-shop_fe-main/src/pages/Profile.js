// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { updateProfile, changePassword } from "../services/authService";
import { User, Mail, Phone, Lock, Save, Coffee } from "lucide-react";
import "../styles/Profile.css";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Profile form
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ===========================
  // Load user data on mount
  // ===========================
  useEffect(() => {
    console.log("📋 Loading user data:", user);
    if (user) {
      setProfileData({
        name: user.name || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
    setMessage({ type: "", text: "" });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
    setMessage({ type: "", text: "" });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      console.log("📤 Updating profile:", profileData);
      const response = await updateProfile(profileData);
      console.log("✅ Profile update response:", response);

      if (response.success) {
        // Update user in context
        updateUser(response.data);
        setMessage({
          type: "success",
          text: "Profile updated successfully!",
        });
      } else {
        setMessage({
          type: "error",
          text: response.message || "Failed to update profile",
        });
      }
    } catch (error) {
      console.error("❌ Update error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Validation
    if (!passwordData.currentPassword) {
      setMessage({
        type: "error",
        text: "Please enter current password",
      });
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "New password must be at least 6 characters",
      });
      setLoading(false);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({
        type: "error",
        text: "New passwords do not match",
      });
      setLoading(false);
      return;
    }

    try {
      console.log("📤 Changing password...");
      const response = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      console.log("✅ Password change response:", response);

      if (response.success) {
        setMessage({
          type: "success",
          text: "Password changed successfully!",
        });
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setMessage({
          type: "error",
          text: response.message || "Failed to change password",
        });
      }
    } catch (error) {
      console.error("❌ Password change error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to change password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <Coffee size={48} />
          </div>
          <div className="profile-info">
            <h1>{user?.name || "User"}</h1>
            <p className="profile-email">{user?.email}</p>
            <span className="profile-badge">{user?.role || "USER"}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("profile");
              setMessage({ type: "", text: "" });
            }}
          >
            <User size={18} />
            <span>Profile Info</span>
          </button>
          <button
            className={`tab ${activeTab === "password" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("password");
              setMessage({ type: "", text: "" });
            }}
          >
            <Lock size={18} />
            <span>Change Password</span>
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`profile-message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Tab Content */}
        <div className="profile-body">
          {activeTab === "profile" ? (
            <form onSubmit={handleProfileSubmit} className="profile-form">
              <div className="form-group">
                <label>
                  <User size={18} />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Mail size={18} />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="disabled-input"
                />
                <small>Email cannot be changed</small>
              </div>

              <div className="form-group">
                <label>
                  <Phone size={18} />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                <Save size={18} />
                <span>{loading ? "Saving..." : "Save Changes"}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="profile-form">
              <div className="form-group">
                <label>
                  <Lock size={18} />
                  <span>Current Password</span>
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Lock size={18} />
                  <span>New Password</span>
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Lock size={18} />
                  <span>Confirm New Password</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                <Lock size={18} />
                <span>{loading ? "Changing..." : "Change Password"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
