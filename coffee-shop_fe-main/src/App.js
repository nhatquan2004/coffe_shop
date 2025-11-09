import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./contexts/AuthContext";

// Components
import Header from "./components/header/Header";
import Footer from "./pages/footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Gallery from "./pages/gallery/Gallery";
import Feed from "./pages/Feed/Feed"; // ✅ FEED
import Promotion from "./pages/Promotion/Promotion"; // ✅ ADD PROMOTION IMPORT
import Reservation from "./components/reservation/Reservation";
import MenuDetail from "./pages/menuDetail/MenuDetail";
import PayMent from "./components/payment/PayMent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminMenu from "./pages/AdminMenu/AdminMenu";

// Styles
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* ===========================
              PUBLIC ROUTES - No Header/Footer
              =========================== */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ===========================
              ALL OTHER ROUTES - With Header/Footer
              =========================== */}
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Routes>
                  {/* HOME & PUBLIC PAGES */}
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<Home />} />

                  {/* MENU ROUTES */}
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/menu/:id" element={<MenuDetail />} />

                  {/* GALLERY */}
                  <Route path="/gallery" element={<Gallery />} />

                  {/* ✅ FEED ROUTE - Social Media Feed (Public) */}
                  <Route path="/feed" element={<Feed />} />

                  {/* ✅ PROMOTION ROUTE - Admin Promotions (Public) */}
                  <Route path="/promotion" element={<Promotion />} />

                  {/* PROTECTED ROUTES - Requires Authentication */}
                  <Route
                    path="/reservation"
                    element={
                      <ProtectedRoute>
                        <Reservation />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <PayMent />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />

                  {/* ADMIN ROUTES - Requires Authentication */}
                  <Route
                    path="admin/menu"
                    element={
                      <ProtectedRoute>
                        <AdminMenu />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 FALLBACK */}
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </AuthProvider>
  );
}

export default App;
