"use client";

import { useState, useEffect } from "react";
import { Mail, CheckCircle, XCircle, Loader2 } from "lucide-react";
import apiService from "../services/api.js";

export default function EmailVerification({ 
  email, 
  userName, 
  onVerificationSuccess, 
  onResendEmail,
  onCancel 
}) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success', 'error', 'info'
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsExpired(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    if (!verificationCode || verificationCode.length !== 6) {
      setMessage("Please enter a valid 6-digit verification code");
      setMessageType("error");
      return;
    }

    setIsVerifying(true);
    setMessage("");

    try {
      const response = await apiService.verifyEmail(email, verificationCode);
      
      if (response.success) {
        setMessage("Email verified successfully! Welcome to PaperPilot!");
        setMessageType("success");
        
        // Call success callback after a short delay
        setTimeout(() => {
          onVerificationSuccess && onVerificationSuccess();
        }, 2000);
      }
    } catch (error) {
      setMessage(error.message || "Verification failed. Please try again.");
      setMessageType("error");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setMessage("");

    try {
      const response = await apiService.sendVerificationEmail(email, userName);
      
      if (response.success) {
        setMessage("Verification code sent successfully!");
        setMessageType("success");
        setTimeLeft(900); // Reset timer
        setIsExpired(false);
        onResendEmail && onResendEmail();
      }
    } catch (error) {
      setMessage(error.message || "Failed to resend verification code");
      setMessageType("error");
    } finally {
      setIsResending(false);
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
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-sm font-medium text-blue-600">{email}</p>
        </div>

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
              disabled={isVerifying || isExpired}
            />
          </div>

          {/* Timer */}
          <div className="text-center">
            {!isExpired ? (
              <p className="text-sm text-gray-600">
                Code expires in: <span className="font-mono font-bold text-red-600">{formatTime(timeLeft)}</span>
              </p>
            ) : (
              <p className="text-sm text-red-600 font-medium">
                Verification code has expired
              </p>
            )}
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

          {/* Verify Button */}
          <div>
            <button
              type="submit"
              disabled={isVerifying || isExpired || verificationCode.length !== 6}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </button>
          </div>

          {/* Resend Code */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className="text-sm text-blue-600 hover:text-blue-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? (
                <>
                  <Loader2 className="animate-spin inline h-4 w-4 mr-2" />
                  Sending...
                </>
              ) : (
                "Didn't receive the code? Resend"
              )}
            </button>
          </div>

          {/* Cancel */}
          <div className="text-center">
            <button
              type="button"
              onClick={onCancel}
              className="text-sm text-gray-600 hover:text-gray-500 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

