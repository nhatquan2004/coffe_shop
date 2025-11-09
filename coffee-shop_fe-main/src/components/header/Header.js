import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
  Newspaper,
  Gift,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.css";

// Coffee Logo Component
const CoffeeLogo = () => (
  <svg
    width="45"
    height="45"
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
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isUserMenuOpen && !e.target.closest(".user-menu-wrapper")) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isUserMenuOpen]);

  // Helpers
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/home");
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <>
      <header className={isScrolled ? "active" : ""}>
        {/* LOGO + BRAND NAME */}
        <div className="logo">
          <Link to="/home" className="logo-link">
            <CoffeeLogo />
            <span className="logo-text">MoodOn Coffee</span>
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        <ul className="links">
          <li>
            <Link to="/home" className={isActiveLink("/home")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/menu" className={isActiveLink("/menu")}>
              Menu
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={isActiveLink("/gallery")}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/feed" className={isActiveLink("/feed")}>
              <Newspaper size={18} className="nav-icon" />
              Feed
            </Link>
          </li>
          <li>
            <Link to="/promotion" className={isActiveLink("/promotion")}>
              <Gift size={18} className="nav-icon" />
              Promotion
            </Link>
          </li>
          <li>
            <Link to="/reservation" className={isActiveLink("/reservation")}>
              Reservation
            </Link>
          </li>
        </ul>

        {/* HEADER RIGHT SECTION */}
        <div className="header-right">
          {/* Shopping Cart */}
          <div className="icon-container">
            <ShoppingCart size={20} />
            <span>0</span>
          </div>

          {/* AUTH SECTION */}
          {isAuthenticated ? (
            <div className="user-menu-wrapper">
              <button className="user-button" onClick={toggleUserMenu}>
                <User size={20} />
                <span className="user-name">{user?.name}</span>
              </button>

              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <p className="user-email">{user?.email}</p>
                    <span className="user-role">{user?.role}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </Link>
                  <button
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">
                Login
              </Link>
              <Link to="/register" className="btn-register">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <span className="sub-menu" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </span>
        </div>
      </header>

      {/* MOBILE NAVIGATION */}
      <ul className={`sub-links ${isMobileMenuOpen ? "active" : ""}`}>
        <span onClick={toggleMobileMenu}>
          <X />
        </span>

        <li>
          <Link to="/home" className={isActiveLink("/home")}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/menu" className={isActiveLink("/menu")}>
            Menu
          </Link>
        </li>
        <li>
          <Link to="/gallery" className={isActiveLink("/gallery")}>
            Gallery
          </Link>
        </li>
        <li>
          <Link to="/feed" className={isActiveLink("/feed")}>
            <Newspaper size={18} /> Feed
          </Link>
        </li>
        <li>
          <Link to="/promotion" className={isActiveLink("/promotion")}>
            <Gift size={18} /> Promotion
          </Link>
        </li>
        <li>
          <Link to="/reservation" className={isActiveLink("/reservation")}>
            Reservation
          </Link>
        </li>

        {/* MOBILE AUTH SECTION */}
        {isAuthenticated ? (
          <>
            <div className="mobile-user-info">
              <User size={20} />
              <div>
                <p className="mobile-user-name">{user?.name}</p>
                <p className="mobile-user-email">{user?.email}</p>
              </div>
            </div>
            <li>
              <Link to="/profile" className={isActiveLink("/profile")}>
                Profile
              </Link>
            </li>
            <li>
              <button className="mobile-logout" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </li>
          </>
        ) : (
          <div className="mobile-auth-buttons">
            <Link to="/login" className="mobile-btn-login">
              Login
            </Link>
            <Link to="/register" className="mobile-btn-register">
              Sign Up
            </Link>
          </div>
        )}
      </ul>

      {/* BACKDROP */}
      {(isMobileMenuOpen || isUserMenuOpen) && (
        <div
          className="backdrop"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsUserMenuOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

export default Header;
