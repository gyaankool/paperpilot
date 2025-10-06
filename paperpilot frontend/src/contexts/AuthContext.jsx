"use client";

import { createContext, useContext, useState, useEffect } from "react";
import apiService from "../services/api.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [emailVerificationStatus, setEmailVerificationStatus] = useState({});

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if user is logged in (you can implement this with JWT tokens)
      const token = localStorage.getItem('authToken');
      const email = localStorage.getItem('userEmail');
      const name = localStorage.getItem('userName');
      
      if (token && email) {
        // TODO: Verify token with backend
        // For now, just check if token exists
        const userData = { 
          email, 
          name: name || email.split('@')[0],
          id: Date.now().toString()
        };
        
        setIsAuthenticated(true);
        setUser(userData);
        console.log('User restored from localStorage:', userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      
      // Call backend login API
      const response = await apiService.login(email, password);
      
      if (response.success) {
        const userData = response.user;
        
        // Store auth data
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userName', userData.name);
        
        // Update state
        setUser(userData);
        setIsAuthenticated(true);
        
        console.log('Login successful, user authenticated:', userData);
        
        return { success: true, user: userData };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setUser(null);
    setIsAuthenticated(false);
    setEmailVerificationStatus({});
    console.log('User logged out');
  };

  const sendVerificationEmail = async (email, userName) => {
    try {
      const response = await apiService.sendVerificationEmail(email, userName);
      
      if (response.success) {
        setEmailVerificationStatus(prev => ({
          ...prev,
          [email]: { status: 'sent', timestamp: Date.now() }
        }));
      }
      
      return response;
    } catch (error) {
      console.error('Send verification email failed:', error);
      throw error;
    }
  };

  const verifyEmail = async (email, code) => {
    try {
      const response = await apiService.verifyEmail(email, code);
      
      if (response.success) {
        setEmailVerificationStatus(prev => ({
          ...prev,
          [email]: { status: 'verified', timestamp: Date.now() }
        }));
      }
      
      return response;
    } catch (error) {
      console.error('Email verification failed:', error);
      throw error;
    }
  };

  const sendPasswordReset = async (email, userName) => {
    try {
      const response = await apiService.sendPasswordReset(email, userName);
      return response;
    } catch (error) {
      console.error('Send password reset failed:', error);
      throw error;
    }
  };

  const verifyPasswordReset = async (email, code) => {
    try {
      const response = await apiService.verifyPasswordReset(email, code);
      return response;
    } catch (error) {
      console.error('Password reset verification failed:', error);
      throw error;
    }
  };

  const checkEmailVerificationStatus = (email) => {
    return emailVerificationStatus[email] || { status: 'none' };
  };

  const isEmailVerified = (email) => {
    const status = checkEmailVerificationStatus(email);
    return status.status === 'verified';
  };

  const getEmailVerificationTimeLeft = (email) => {
    const status = emailVerificationStatus[email];
    if (!status || status.status !== 'sent') return 0;
    
    const elapsed = Date.now() - status.timestamp;
    const remaining = (15 * 60 * 1000) - elapsed; // 15 minutes
    return Math.max(0, remaining);
  };

  const value = {
    // State
    user,
    isAuthenticated,
    isLoading,
    emailVerificationStatus,
    
    // Actions
    login,
    logout,
    checkAuthStatus,
    
    // Email verification
    sendVerificationEmail,
    verifyEmail,
    checkEmailVerificationStatus,
    isEmailVerified,
    getEmailVerificationTimeLeft,
    
    // Password reset
    sendPasswordReset,
    verifyPasswordReset,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
