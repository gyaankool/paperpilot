import { createTransporter, emailTemplates } from '../config/smtp.js';
import crypto from 'crypto';

class EmailService {
  constructor() {
    this.transporter = createTransporter();
    this.verificationCodes = new Map(); // In production, use Redis or database
    this.resetCodes = new Map(); // In production, use Redis or database
  }

  // Generate verification code
  generateVerificationCode() {
    return crypto.randomInt(100000, 999999).toString();
  }

  // Generate password reset code
  generateResetCode() {
    return crypto.randomInt(100000, 999999).toString();
  }

  // Store verification code with expiration
  storeVerificationCode(email, code) {
    const expiration = Date.now() + (15 * 60 * 1000); // 15 minutes
    this.verificationCodes.set(email, { code, expiration });
  }

  // Store reset code with expiration
  storeResetCode(email, code) {
    const expiration = Date.now() + (10 * 60 * 1000); // 10 minutes
    this.resetCodes.set(email, { code, expiration });
  }

  // Verify code
  verifyCode(email, code, type = 'verification') {
    const codeMap = type === 'verification' ? this.verificationCodes : this.resetCodes;
    const stored = codeMap.get(email);
    
    if (!stored) {
      return { valid: false, message: 'No verification code found for this email' };
    }
    
    if (Date.now() > stored.expiration) {
      codeMap.delete(email);
      return { valid: false, message: 'Verification code has expired' };
    }
    
    if (stored.code !== code) {
      return { valid: false, message: 'Invalid verification code' };
    }
    
    // Code is valid, remove it
    codeMap.delete(email);
    return { valid: true, message: 'Code verified successfully' };
  }

  // Send verification email
  async sendVerificationEmail(email, userName = null) {
    try {
      const verificationCode = this.generateVerificationCode();
      this.storeVerificationCode(email, verificationCode);

      const mailOptions = {
        from: {
          name: 'PaperPilot',
          address: process.env.SMTP_USER
        },
        to: email,
        subject: emailTemplates.verification.subject,
        html: emailTemplates.verification.html(verificationCode, userName)
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Verification email sent:', result.messageId);
      
      return {
        success: true,
        message: 'Verification email sent successfully',
        messageId: result.messageId
      };
    } catch (error) {
      console.error('Error sending verification email:', error);
      return {
        success: false,
        message: 'Failed to send verification email',
        error: error.message
      };
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(email, userName = null) {
    try {
      const resetCode = this.generateResetCode();
      this.storeResetCode(email, resetCode);

      const mailOptions = {
        from: {
          name: 'PaperPilot',
          address: process.env.SMTP_USER
        },
        to: email,
        subject: emailTemplates.passwordReset.subject,
        html: emailTemplates.passwordReset.html(resetCode, userName)
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Password reset email sent:', result.messageId);
      
      return {
        success: true,
        message: 'Password reset email sent successfully',
        messageId: result.messageId
      };
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return {
        success: false,
        message: 'Failed to send password reset email',
        error: error.message
      };
    }
  }

  // Send welcome email
  async sendWelcomeEmail(email, userName = null) {
    try {
      const mailOptions = {
        from: {
          name: 'PaperPilot',
          address: process.env.SMTP_USER
        },
        to: email,
        subject: emailTemplates.welcome.subject,
        html: emailTemplates.welcome.html(userName)
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Welcome email sent:', result.messageId);
      
      return {
        success: true,
        message: 'Welcome email sent successfully',
        messageId: result.messageId
      };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return {
        success: false,
        message: 'Failed to send welcome email',
        error: error.message
      };
    }
  }

  // Send custom email
  async sendCustomEmail(to, subject, html, fromName = 'PaperPilot') {
    try {
      const mailOptions = {
        from: {
          name: fromName,
          address: process.env.SMTP_USER
        },
        to: to,
        subject: subject,
        html: html
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Custom email sent:', result.messageId);
      
      return {
        success: true,
        message: 'Email sent successfully',
        messageId: result.messageId
      };
    } catch (error) {
      console.error('Error sending custom email:', error);
      return {
        success: false,
        message: 'Failed to send email',
        error: error.message
      };
    }
  }

  // Clean up expired codes (call this periodically)
  cleanupExpiredCodes() {
    const now = Date.now();
    
    // Clean verification codes
    for (const [email, data] of this.verificationCodes.entries()) {
      if (now > data.expiration) {
        this.verificationCodes.delete(email);
      }
    }
    
    // Clean reset codes
    for (const [email, data] of this.resetCodes.entries()) {
      if (now > data.expiration) {
        this.resetCodes.delete(email);
      }
    }
  }

  // Get SMTP status
  async getSMTPStatus() {
    try {
      await this.transporter.verify();
      return {
        status: 'connected',
        message: 'SMTP server is ready'
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'SMTP server connection failed',
        error: error.message
      };
    }
  }
}

// Create singleton instance
const emailService = new EmailService();

// Clean up expired codes every 5 minutes
setInterval(() => {
  emailService.cleanupExpiredCodes();
}, 5 * 60 * 1000);

export default emailService;

