
"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import EmailVerification from "../components/EmailVerification.jsx";
import apiService from "../services/api.js";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Basic validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setMessageType("error");
      setIsLoading(false);
      return;
    }

    try {
      // Create user account first
      const signupResponse = await apiService.signup(email, password, name);
      
      if (signupResponse.success) {
        setMessage("Account created! Verification email sent. Please check your inbox.");
        setMessageType("success");
        setShowEmailVerification(true);
      }
    } catch (error) {
      setMessage(error.message || "Failed to create account");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSuccess = () => {
    // Redirect to login page or dashboard
    navigate('/login', { 
      state: { 
        message: "Account created successfully! Please login with your credentials.",
        messageType: "success"
      }
    });
  };

  const handleResendEmail = () => {
    setMessage("Verification email resent!");
    setMessageType("success");
  };

  const handleCancelVerification = () => {
    setShowEmailVerification(false);
    setMessage("");
    setMessageType("");
  };

  // Show email verification component
  if (showEmailVerification) {
    return (
      <EmailVerification
        email={email}
        userName={name}
        onVerificationSuccess={handleVerificationSuccess}
        onResendEmail={handleResendEmail}
        onCancel={handleCancelVerification}
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
          <h2 className="text-2xl font-semibold mb-6">Signup</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                minLength="6"
              />
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

            {/* Sign Up button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-[#13267B] text-2xl text-white py-2 rounded-md hover:bg-[#1e3ab6] transition font-light disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--secondary-font)" }}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>

            {/* OR Google login */}
            <button
              type="button"
              className="w-full mt-6 flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100 transition"
            >
              <FcGoogle size={20} /> Login with Google
            </button>

            {/* Login link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already a user?{" "}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-[#13267B] hover:text-[#1e3ab6] font-medium underline"
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
