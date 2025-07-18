import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import LogoutPage from "./pages/LogoutPage";
function App() {
const {user}=useAuthContext()
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/signUp" />}
          />
          <Route
            path="/signUp"
            element={!user ? <RegisterPage /> : <Navigate to="/" />}
          />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
