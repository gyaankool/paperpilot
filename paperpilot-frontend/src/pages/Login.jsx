"use client";

import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PasswordReset from "../components/PasswordReset.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  // Check for success message from signup
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setMessageType(location.state.messageType || "success");
      
      // Clear the state to prevent showing the message again
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      setIsLoading(false);
      return;
    }

    try {
      // Use the AuthContext login function
      const result = await login(email, password);
      
      if (result.success) {
        setMessage("Login successful! Redirecting...");
        setMessageType("success");
        
        // The redirect will happen automatically via the useEffect
        // that watches isAuthenticated state
      }
      
    } catch (error) {
      setMessage(error.message || "Login failed. Please check your credentials.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordResetSuccess = (email, code) => {
    // TODO: Implement password reset flow
    console.log("Password reset verified for:", email, "with code:", code);
    setMessage("Password reset verified! You can now set a new password.");
    setMessageType("success");
    setShowPasswordReset(false);
  };

  const handleBackFromReset = () => {
    setShowPasswordReset(false);
    setMessage("");
    setMessageType("");
  };

  // Show password reset component
  if (showPasswordReset) {
    return (
      <PasswordReset
        onBack={handleBackFromReset}
        onSuccess={handlePasswordResetSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side with image */}
      <div className="hidden md:flex md:w-1/2 bg-cover bg-center" 
           style={{ backgroundImage: "url('/assets/loginImage.png')" }}>
      </div>

      {/* Right side login form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowPasswordReset(true)}
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Message */}
            {message && (
              <div className={`rounded-md p-3 ${
                messageType === 'success' ? 'bg-green-50 border border-green-200 text-green-800' :
                messageType === 'error' ? 'bg-red-50 border border-red-200 text-red-800' :
                'bg-blue-50 border border-blue-200 text-blue-800'
              }`}>
                {message}
              </div>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-[#13267B] text-white py-2 rounded-md hover:bg-[#1e3ab6] text-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ fontFamily: "var(--secondary-font)" }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            {/* OR Google login */}
            <button
              type="button"
              className="w-full mt-6 flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
            >
              <FcGoogle size={20} /> Login with Google
            </button>

            {/* Sign up link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                New user?{" "}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-[#13267B] hover:text-[#1e3ab6] font-medium underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
