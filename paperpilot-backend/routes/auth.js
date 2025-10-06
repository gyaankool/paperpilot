import express from 'express';
import { body, validationResult } from 'express-validator';
import emailService from '../services/emailService.js';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Simple in-memory user storage (in production, use a database)
const users = new Map();

// JWT secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-here';

// Rate limiting for email operations
const emailRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'development' ? 50 : 5, // More lenient in development
  message: {
    error: 'Too many email requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const verificationRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'development' ? 100 : 10, // More lenient in development
  message: {
    error: 'Too many verification attempts from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation rules
const emailValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
];

const verificationValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('code')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('Verification code must be a 6-digit number')
];

const resetPasswordValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const signupValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name')
    .notEmpty()
    .trim()
    .withMessage('Name is required')
];

// @route   POST /api/auth/send-verification
// @desc    Send email verification code
// @access  Public
router.post('/send-verification', 
  emailRateLimit,
  emailValidation,
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { email, userName } = req.body;

      // Send verification email
      const result = await emailService.sendVerificationEmail(email, userName);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: 'Verification email sent successfully',
          data: {
            email: email,
            messageId: result.messageId
          }
        });
      } else {
        res.status(500).json({
          success: false,
          message: result.message,
          error: result.error
        });
      }
    } catch (error) {
      console.error('Send verification error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
);

// @route   POST /api/auth/verify-email
// @desc    Verify email with code
// @access  Public
router.post('/verify-email',
  verificationRateLimit,
  verificationValidation,
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { email, code } = req.body;

      // Verify the code
      const verification = emailService.verifyCode(email, code, 'verification');

      if (verification.valid) {
        // Mark user as verified if they exist
        const user = users.get(email);
        if (user) {
          user.verified = true;
          users.set(email, user);
        }

        // Send welcome email after successful verification
        await emailService.sendWelcomeEmail(email, req.body.userName);

        res.status(200).json({
          success: true,
          message: 'Email verified successfully',
          data: {
            email: email,
            verified: true
          }
        });
      } else {
        res.status(400).json({
          success: false,
          message: verification.message
        });
      }
    } catch (error) {
      console.error('Verify email error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
);

// @route   POST /api/auth/send-password-reset
// @desc    Send password reset code
// @access  Public
router.post('/send-password-reset',
  emailRateLimit,
  resetPasswordValidation,
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { email, userName } = req.body;

      // Send password reset email
      const result = await emailService.sendPasswordResetEmail(email, userName);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: 'Password reset email sent successfully',
          data: {
            email: email,
            messageId: result.messageId
          }
        });
      } else {
        res.status(500).json({
          success: false,
          message: result.message,
          error: result.error
        });
      }
    } catch (error) {
      console.error('Send password reset error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
);

// @route   POST /api/auth/verify-password-reset
// @desc    Verify password reset code
// @access  Public
router.post('/verify-password-reset',
  verificationRateLimit,
  verificationValidation,
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { email, code } = req.body;

      // Verify the reset code
      const verification = emailService.verifyCode(email, code, 'reset');

      if (verification.valid) {
        res.status(200).json({
          success: true,
          message: 'Password reset code verified successfully',
          data: {
            email: email,
            verified: true
          }
        });
      } else {
        res.status(400).json({
          success: false,
          message: verification.message
        });
      }
    } catch (error) {
      console.error('Verify password reset error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
);

// @route   POST /api/auth/send-custom-email
// @desc    Send custom email (admin only)
// @access  Private (add authentication middleware)
router.post('/send-custom-email',
  emailRateLimit,
  [
    body('to')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid recipient email address'),
    body('subject')
      .notEmpty()
      .trim()
      .withMessage('Subject is required'),
    body('html')
      .notEmpty()
      .withMessage('HTML content is required')
  ],
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { to, subject, html, fromName } = req.body;

      // Send custom email
      const result = await emailService.sendCustomEmail(to, subject, html, fromName);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: 'Custom email sent successfully',
          data: {
            to: to,
            messageId: result.messageId
          }
        });
      } else {
        res.status(500).json({
          success: false,
          message: result.message,
          error: result.error
        });
      }
    } catch (error) {
      console.error('Send custom email error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
);

// @route   GET /api/auth/smtp-status
// @desc    Check SMTP server status
// @access  Private (add authentication middleware)
router.get('/smtp-status', async (req, res) => {
  try {
    const status = await emailService.getSMTPStatus();
    
    res.status(200).json({
      success: true,
      data: status
    });
  } catch (error) {
    console.error('SMTP status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check SMTP status',
      error: error.message
    });
  }
});

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup',
  emailRateLimit,
  signupValidation,
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { email, password, name } = req.body;

      // Check if user already exists
      if (users.has(email)) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email'
        });
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const user = {
        id: Date.now().toString(),
        email,
        name,
        password: hashedPassword,
        verified: false,
        createdAt: new Date().toISOString()
      };

      // Store user
      users.set(email, user);

      // Send verification email
      try {
        await emailService.sendVerificationEmail(email, name);
      } catch (emailError) {
        console.error('Failed to send verification email:', emailError);
        // Don't fail signup if email fails
      }

      res.status(201).json({
        success: true,
        message: 'User created successfully. Please check your email for verification.',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          verified: user.verified
        }
      });

    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login',
  emailRateLimit,
  loginValidation,
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { email, password } = req.body;

      // Check if user exists
      const user = users.get(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Check if email is verified
      if (!user.verified) {
        return res.status(401).json({
          success: false,
          message: 'Please verify your email before logging in'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          verified: user.verified
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
);

// @route   GET /api/auth/debug/code/:email
// @desc    Get verification code for testing (development only)
// @access  Public (development only)
router.get('/debug/code/:email', (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({
      success: false,
      message: 'Not found'
    });
  }

  const { email } = req.params;
  const user = users.get(email);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Get verification code from email service
  const verificationData = emailService.verificationCodes.get(email);
  
  if (!verificationData) {
    return res.status(404).json({
      success: false,
      message: 'No verification code found'
    });
  }

  res.status(200).json({
    success: true,
    email: email,
    code: verificationData.code,
    expiresAt: new Date(verificationData.expiration).toISOString(),
    timeLeft: Math.max(0, Math.floor((verificationData.expiration - Date.now()) / 1000))
  });
});

export default router;



