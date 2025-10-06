import emailService from '../services/emailService.js';

/**
 * Middleware to check if email is verified
 * This middleware can be used to protect routes that require verified emails
 */
export const requireEmailVerification = (req, res, next) => {
  const { email } = req.body || req.params || req.query;
  
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required for verification check'
    });
  }

  // In a real application, you would check the database for email verification status
  // For now, we'll check if there's a pending verification code
  const hasPendingVerification = emailService.verificationCodes.has(email);
  
  if (hasPendingVerification) {
    return res.status(403).json({
      success: false,
      message: 'Email verification required',
      data: {
        email: email,
        verified: false,
        requiresVerification: true
      }
    });
  }

  // If no pending verification, assume email is verified
  // In production, check database for actual verification status
  next();
};

/**
 * Middleware to validate email format
 */
export const validateEmail = (req, res, next) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { email } = req.body || req.params || req.query;
  
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required'
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  next();
};

/**
 * Middleware to check SMTP service availability
 */
export const checkSMTPStatus = async (req, res, next) => {
  try {
    const status = await emailService.getSMTPStatus();
    
    if (status.status !== 'connected') {
      return res.status(503).json({
        success: false,
        message: 'Email service is currently unavailable',
        data: status
      });
    }
    
    next();
  } catch (error) {
    console.error('SMTP status check error:', error);
    return res.status(503).json({
      success: false,
      message: 'Email service is currently unavailable',
      error: error.message
    });
  }
};

/**
 * Middleware to log email operations
 */
export const logEmailOperation = (operation) => {
  return (req, res, next) => {
    const startTime = Date.now();
    const originalSend = res.send;
    
    res.send = function(data) {
      const duration = Date.now() - startTime;
      const { email } = req.body || req.params || req.query;
      
      console.log(`Email Operation: ${operation}`, {
        email: email,
        duration: `${duration}ms`,
        status: res.statusCode,
        timestamp: new Date().toISOString()
      });
      
      originalSend.call(this, data);
    };
    
    next();
  };
};

/**
 * Middleware to prevent email spam
 * Checks if the same email has been used recently
 */
export const preventEmailSpam = (windowMs = 60000) => { // 1 minute default
  const recentEmails = new Map();
  
  return (req, res, next) => {
    const { email } = req.body;
    
    if (!email) {
      return next();
    }
    
    const now = Date.now();
    const lastSent = recentEmails.get(email);
    
    if (lastSent && (now - lastSent) < windowMs) {
      return res.status(429).json({
        success: false,
        message: 'Please wait before sending another email to this address',
        data: {
          email: email,
          retryAfter: Math.ceil((windowMs - (now - lastSent)) / 1000)
        }
      });
    }
    
    recentEmails.set(email, now);
    
    // Clean up old entries
    for (const [emailAddr, timestamp] of recentEmails.entries()) {
      if (now - timestamp > windowMs) {
        recentEmails.delete(emailAddr);
      }
    }
    
    next();
  };
};

/**
 * Middleware to sanitize email input
 */
export const sanitizeEmail = (req, res, next) => {
  if (req.body && req.body.email) {
    req.body.email = req.body.email.toLowerCase().trim();
  }
  
  if (req.params && req.params.email) {
    req.params.email = req.params.email.toLowerCase().trim();
  }
  
  if (req.query && req.query.email) {
    req.query.email = req.query.email.toLowerCase().trim();
  }
  
  next();
};

/**
 * Middleware to check if user has reached email limit
 * This is a simple in-memory implementation
 * In production, use Redis or database
 */
export const checkEmailLimit = (maxEmailsPerDay = 10) => {
  const dailyEmailCount = new Map();
  
  return (req, res, next) => {
    const { email } = req.body;
    
    if (!email) {
      return next();
    }
    
    const today = new Date().toDateString();
    const key = `${email}-${today}`;
    const count = dailyEmailCount.get(key) || 0;
    
    if (count >= maxEmailsPerDay) {
      return res.status(429).json({
        success: false,
        message: 'Daily email limit reached for this address',
        data: {
          email: email,
          limit: maxEmailsPerDay,
          resetTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      });
    }
    
    dailyEmailCount.set(key, count + 1);
    
    // Clean up old entries (older than 2 days)
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toDateString();
    for (const [key, timestamp] of dailyEmailCount.entries()) {
      const keyDate = key.split('-').slice(-3).join('-');
      if (new Date(keyDate) < new Date(twoDaysAgo)) {
        dailyEmailCount.delete(key);
      }
    }
    
    next();
  };
};

export default {
  requireEmailVerification,
  validateEmail,
  checkSMTPStatus,
  logEmailOperation,
  preventEmailSpam,
  sanitizeEmail,
  checkEmailLimit
};



