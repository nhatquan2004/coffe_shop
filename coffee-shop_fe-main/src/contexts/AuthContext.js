import React, { createContext, useState, useEffect, useContext } from "react";
import { getMe } from "../services/authService";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Always check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await getMe();
          if (response.success) {
            // Always use backend's role, fallback is "user"
            const role =
              response.data.role ||
              localStorage.getItem("userRole") ||
              "user";
            const userData = {
              ...response.data,
              role, // ensure ALWAYS included!
               name: role === "admin" ? "MoodOn Coffee" : response.data.name,
            };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("userRole", userData.role);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("userRole");
            setUser(null);
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("userRole");
          setUser(null);
        }
      } else {
        // For dev
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          try {
            const parsed = JSON.parse(savedUser);
            setUser(parsed);
            if (parsed?.role) {
              localStorage.setItem("userRole", parsed.role);
            }
          } catch {
            localStorage.removeItem("user");
            setUser(null);
          }
        }
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, token) => {
    // Khi login, luôn ép role từ userData hoặc fallback nếu thiếu
    const role = userData.role || "user";
    const userWithRole = { ...userData, role };
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userWithRole));
    localStorage.setItem("userRole", role);
    setUser(userWithRole);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    setUser(null);
  };

  const updateUser = (userData) => {
    const role = userData.role || user?.role || "user";
    const userWithRole = { ...userData, role };
    localStorage.setItem("user", JSON.stringify(userWithRole));
    localStorage.setItem("userRole", role);
    setUser(userWithRole);
  };

  // For testing/dev only
  const setAdminMode = (isAdmin = true) => {
    if (user) {
      const newRole = isAdmin ? "admin" : "user";
      const updatedUser = { ...user, role: newRole };
      localStorage.setItem("userRole", newRole);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const quickLogin = (email = "admin@coffee.com", role = "admin") => {
    const testUser = {
      id: "test_" + Math.random().toString(36).substr(2, 9),
      name: role === "admin" ? "MoodOn Coffee" : "User",
      email,
      avatar: `https://ui-avatars.com/api/?name=${role === "admin" ? "MoodOn Coffee" : "User"}`,
      role,
    };
    localStorage.setItem("user", JSON.stringify(testUser));
    localStorage.setItem("userRole", role);
    setUser(testUser);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    setAdminMode,
    quickLogin,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
