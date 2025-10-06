/**
 * SMTP Authentication Test Script
 * 
 * This script demonstrates how to test the SMTP authentication system
 * Run with: node test-smtp.js
 */

import emailService from './services/emailService.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testSMTPAuthentication() {
  console.log('🧪 Testing SMTP Authentication System...\n');

  try {
    // Test 1: Check SMTP Status
    console.log('1️⃣ Checking SMTP Status...');
    const status = await emailService.getSMTPStatus();
    console.log('SMTP Status:', status);
    console.log('');

    if (status.status !== 'connected') {
      console.error('❌ SMTP server is not connected. Please check your configuration.');
      return;
    }

    // Test 2: Send Verification Email
    console.log('2️⃣ Testing Email Verification...');
    const testEmail = process.env.TEST_EMAIL || 'test@example.com';
    const verificationResult = await emailService.sendVerificationEmail(testEmail, 'Test User');
    console.log('Verification Email Result:', verificationResult);
    console.log('');

    // Test 3: Test Code Verification (This will fail with a real code)
    console.log('3️⃣ Testing Code Verification...');
    const verificationCheck = emailService.verifyCode(testEmail, '123456', 'verification');
    console.log('Code Verification Result:', verificationCheck);
    console.log('');

    // Test 4: Send Password Reset Email
    console.log('4️⃣ Testing Password Reset...');
    const resetResult = await emailService.sendPasswordResetEmail(testEmail, 'Test User');
    console.log('Password Reset Email Result:', resetResult);
    console.log('');

    // Test 5: Send Welcome Email
    console.log('5️⃣ Testing Welcome Email...');
    const welcomeResult = await emailService.sendWelcomeEmail(testEmail, 'Test User');
    console.log('Welcome Email Result:', welcomeResult);
    console.log('');

    // Test 6: Send Custom Email
    console.log('6️⃣ Testing Custom Email...');
    const customResult = await emailService.sendCustomEmail(
      testEmail,
      'Test Custom Email',
      '<h1>This is a test custom email!</h1><p>If you receive this, the SMTP system is working correctly.</p>',
      'PaperPilot Test'
    );
    console.log('Custom Email Result:', customResult);
    console.log('');

    console.log('✅ All SMTP tests completed successfully!');
    console.log('📧 Check your email inbox for the test emails.');

  } catch (error) {
    console.error('❌ SMTP Test Failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the test
testSMTPAuthentication();

