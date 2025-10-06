"use client";

import { useState } from "react";
import { Mail, CheckCircle, XCircle, Loader2, ArrowLeft } from "lucide-react";
import apiService from "../services/api.js";

export default function PasswordReset({ onBack, onSuccess }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!email.trim()) {
      setMessage("Please enter your email address");
      setMessageType("error");
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiService.sendPasswordReset(email);
      
      if (response.success) {
        setMessage("Password reset code sent! Please check your email.");
        setMessageType("success");
        setShowCodeInput(true);
      }
    } catch (error) {
      setMessage(error.message || "Failed to send password reset email");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setMessage("");

    if (!verificationCode || verificationCode.length !== 6) {
      setMessage("Please enter a valid 6-digit verification code");
      setMessageType("error");
      setIsVerifying(false);
      return;
    }

    try {
      const response = await apiService.verifyPasswordReset(email, verificationCode);
      
      if (response.success) {
        setMessage("Code verified successfully! You can now reset your password.");
        setMessageType("success");
        
        // Call success callback with email and code
        setTimeout(() => {
          onSuccess && onSuccess(email, verificationCode);
        }, 2000);
      }
    } catch (error) {
      setMessage(error.message || "Verification failed. Please try again.");
      setMessageType("error");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setVerificationCode(value);
    
    // Clear any previous messages when user starts typing
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {showCodeInput 
              ? "Enter the 6-digit code sent to your email"
              : "Enter your email address to receive a reset code"
            }
          </p>
        </div>

        {!showCodeInput ? (
          // Email input form
          <form className="mt-8 space-y-6" onSubmit={handleSendResetEmail}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>

            {/* Message */}
            {message && (
              <div className={`rounded-md p-4 ${
                messageType === 'success' ? 'bg-green-50 border border-green-200' :
                messageType === 'error' ? 'bg-red-50 border border-red-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {messageType === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : messageType === 'error' ? (
                      <XCircle className="h-5 w-5 text-red-400" />
                    ) : (
                      <Mail className="h-5 w-5 text-blue-400" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      messageType === 'success' ? 'text-green-800' :
                      messageType === 'error' ? 'text-red-800' :
                      'text-blue-800'
                    }`}>
                      {message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Send Reset Email Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Code'
                )}
              </button>
            </div>

            {/* Back to Login */}
            <div className="text-center">
              <button
                type="button"
                onClick={onBack}
                className="text-sm text-gray-600 hover:text-gray-500 font-medium flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </button>
            </div>
          </form>
        ) : (
          // Code verification form
          <form className="mt-8 space-y-6" onSubmit={handleVerifyCode}>
            <div>
              <label htmlFor="verification-code" className="sr-only">
                Verification Code
              </label>
              <input
                id="verification-code"
                name="verification-code"
                type="text"
                required
                value={verificationCode}
                onChange={handleCodeChange}
                placeholder="000000"
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 text-center text-2xl font-mono tracking-widest focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                maxLength="6"
                disabled={isVerifying}
              />
            </div>

            {/* Message */}
            {message && (
              <div className={`rounded-md p-4 ${
                messageType === 'success' ? 'bg-green-50 border border-green-200' :
                messageType === 'error' ? 'bg-red-50 border border-red-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {messageType === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : messageType === 'error' ? (
                      <XCircle className="h-5 w-5 text-red-400" />
                    ) : (
                      <Mail className="h-5 w-5 text-blue-400" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      messageType === 'success' ? 'text-green-800' :
                      messageType === 'error' ? 'text-red-800' :
                      'text-blue-800'
                    }`}>
                      {message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Verify Code Button */}
            <div>
              <button
                type="submit"
                disabled={isVerifying || verificationCode.length !== 6}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </button>
            </div>

            {/* Back to Email Input */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setShowCodeInput(false);
                  setMessage("");
                  setMessageType("");
                }}
                className="text-sm text-gray-600 hover:text-gray-500 font-medium flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Use Different Email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

