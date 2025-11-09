// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError(""); // Clear error on change
  };

  // Email validation regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = () => {
    // Check name
    if (!formData.name.trim()) {
      setError("Please enter your full name");
      return false;
    }

    if (formData.name.trim().length < 2) {
      setError("Name must be at least 2 characters long");
      return false;
    }

    // Check email
    if (!formData.email.trim()) {
      setError("Please enter your email address");
      return false;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Check password
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (formData.password.length > 50) {
      setError("Password must be less than 50 characters");
      return false;
    }

    // Check confirm password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    // Check phone (optional but if provided, validate)
    if (formData.phone && formData.phone.length < 10) {
      setError("Please enter a valid phone number");
      return false;
    }

    // Check terms
    if (!formData.agreeTerms) {
      setError("You must agree to the Terms & Conditions to continue");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare data - remove confirmPassword and agreeTerms before sending
      const { confirmPassword, agreeTerms, ...registerData } = formData;

      console.log("📤 Sending registration data:", registerData);

      // Call register API
      const response = await register(registerData);

      console.log("✅ Registration response:", response);

      // Handle success response
      if (response.success) {
        setSuccess("Registration successful! Redirecting...");
        
        // Save user and token to context
        authLogin(response.data.user, response.data.token);

        // Small delay to show success message
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 1000);
      } else {
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("❌ Registration error:", err);

      // Handle different error scenarios
      if (err.response?.status === 400) {
        setError(err.response.data?.message || "Invalid registration data");
      } else if (err.response?.status === 409) {
        setError("Email already registered. Please use a different email or login.");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else if (err.message === "Network Error") {
        setError("Unable to connect to server. Please check your connection.");
      } else {
        setError(
          err.response?.data?.message || 
          err.message || 
          "Registration failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background"></div>

      <div className="auth-content">
        <div className="auth-box">
          {/* Logo */}
          <div className="auth-logo">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
              <line x1="6" y1="1" x2="6" y2="4"></line>
              <line x1="10" y1="1" x2="10" y2="4"></line>
              <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
            <h1>MoodOn Coffe</h1>
          </div>

          {/* Title */}
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Sign up to get started with MoodOn Coffe</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="auth-error" role="alert">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="auth-success" role="status">
              <span>✅</span> {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                disabled={loading}
              />
            </div>

            {/* Password Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create password (min 6 chars)"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Checkbox */}
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="checkbox-input"
                  disabled={loading}
                  required
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">
                  I agree to the{" "}
                  <a 
                    href="/terms" 
                    className="auth-link" 
                    onClick={(e) => e.preventDefault()}
                  >
                    Terms & Conditions
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="auth-button" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative Image */}
        <div className="auth-image">
          <div className="image-overlay">
            <h3>Join Us Today</h3>
            <p>Become a member and enjoy exclusive benefits</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
