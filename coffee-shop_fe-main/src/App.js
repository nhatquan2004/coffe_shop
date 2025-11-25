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
import Feed from "./pages/Feed/Feed";
import Promotion from "./pages/Promotion/Promotion";
import Reservation from "./components/reservation/Reservation";
import AdminReservation from "./pages/AdminReservation/AdminReservation";
import MenuDetail from "./pages/menuDetail/MenuDetail";
import PayMent from "./components/payment/PayMent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminMenu from "./pages/AdminMenu/AdminMenu";

// Styles
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Layout component with Header/Footer
function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* LOGIN & REGISTER - No Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ALL OTHER PAGES - With Header/Footer Layout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/menu"
          element={
            <MainLayout>
              <Menu />
            </MainLayout>
          }
        />
        <Route
          path="/menu/:id"
          element={
            <MainLayout>
              <MenuDetail />
            </MainLayout>
          }
        />
        <Route
          path="/gallery"
          element={
            <MainLayout>
              <Gallery />
            </MainLayout>
          }
        />
        <Route
          path="/feed"
          element={
            <MainLayout>
              <Feed />
            </MainLayout>
          }
        />
        <Route
          path="/promotion"
          element={
            <MainLayout>
              <Promotion />
            </MainLayout>
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservation"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Reservation />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PayMent />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/menu"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AdminMenu />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reservation"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AdminReservation />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
