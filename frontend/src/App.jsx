import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ✅ Global auth loader (NO flicker)
  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center bg-base-200">
        <Loader className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div data-theme={theme} className="min-h-screen bg-base-200 pb-10 pt-16">
      {/* Navbar only after auth check */}
      <Navbar />

      <Routes>
        {/* 🏠 Home */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* 🔐 Auth */}
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        {/* ⚙️ Settings */}
        <Route
          path="/settings"
          <Route path="/settings" element={<SettingsPage />} />
        />

        {/* 👤 Profile */}
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />

        {/* ❌ Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
