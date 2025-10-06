import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// SMTP Configuration
const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
};

// Create transporter
const createTransporter = () => {
  try {
    const transporter = nodemailer.createTransport(smtpConfig);
    
    // Verify connection configuration
    transporter.verify((error, success) => {
      if (error) {
        console.error('SMTP Configuration Error:', error);
      } else {
        console.log('SMTP Server is ready to take our messages');
      }
    });
    
    return transporter;
  } catch (error) {
    console.error('Failed to create SMTP transporter:', error);
    throw error;
  }
};

// Email templates
const emailTemplates = {
  verification: {
    subject: 'Verify Your PaperPilot Account',
    html: (verificationCode, userName) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Welcome to PaperPilot!</h2>
        <p>Hello ${userName || 'User'},</p>
        <p>Thank you for registering with PaperPilot. To complete your registration, please verify your email address using the code below:</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
          <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${verificationCode}</h1>
        </div>
        
        <p>This verification code will expire in 15 minutes.</p>
        <p>If you didn't create an account with PaperPilot, please ignore this email.</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          PaperPilot Research Platform<br>
          This is an automated message, please do not reply.
        </p>
      </div>
    `
  },
  
  passwordReset: {
    subject: 'Reset Your PaperPilot Password',
    html: (resetCode, userName) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Password Reset Request</h2>
        <p>Hello ${userName || 'User'},</p>
        <p>We received a request to reset your password for your PaperPilot account.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
          <h1 style="color: #dc3545; font-size: 32px; margin: 0; letter-spacing: 5px;">${resetCode}</h1>
        </div>
        
        <p>Use this code to reset your password. This code will expire in 10 minutes.</p>
        <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          PaperPilot Research Platform<br>
          This is an automated message, please do not reply.
        </p>
      </div>
    `
  },
  
  welcome: {
    subject: 'Welcome to PaperPilot!',
    html: (userName) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Welcome to PaperPilot!</h2>
        <p>Hello ${userName || 'User'},</p>
        <p>Your email has been successfully verified! Welcome to PaperPilot, your comprehensive research platform.</p>
        
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #28a745; margin-top: 0;">What you can do with PaperPilot:</h3>
          <ul style="color: #333;">
            <li>Search and analyze research papers</li>
            <li>Generate funding proposals</li>
            <li>Format papers according to various standards</li>
            <li>Export papers in multiple formats</li>
            <li>Collaborate with other researchers</li>
          </ul>
        </div>
        
        <p>Start exploring your research journey with PaperPilot today!</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          PaperPilot Research Platform<br>
          This is an automated message, please do not reply.
        </p>
      </div>
    `
  }
};

export { createTransporter, emailTemplates, smtpConfig };
