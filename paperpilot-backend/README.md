# PaperPilot Backend - SMTP Authentication System

A comprehensive SMTP authentication system for the PaperPilot research platform, built with Node.js, Express, and Nodemailer.

## Features

- ✅ Email verification with 6-digit codes
- ✅ Password reset functionality
- ✅ Welcome emails
- ✅ Custom email sending
- ✅ Rate limiting and spam protection
- ✅ SMTP server health monitoring
- ✅ Comprehensive error handling
- ✅ Email templates with HTML formatting
- ✅ Security middleware and validation

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the environment template and configure your SMTP settings:

```bash
cp env.example .env
```

Edit `.env` file with your SMTP credentials:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 3. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## SMTP Configuration

### Gmail Setup

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use the app password in your `.env` file

### Other SMTP Providers

The system supports various SMTP providers:

- **Outlook/Hotmail**: `smtp-mail.outlook.com:587`
- **Yahoo**: `smtp.mail.yahoo.com:587`
- **Custom SMTP**: Configure your own server

## API Endpoints

### Authentication Routes

#### Send Verification Email
```http
POST /api/auth/send-verification
Content-Type: application/json

{
  "email": "user@example.com",
  "userName": "John Doe"
}
```

#### Verify Email Code
```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "email": "user@example.com",
  "code": "123456"
}
```

#### Send Password Reset
```http
POST /api/auth/send-password-reset
Content-Type: application/json

{
  "email": "user@example.com",
  "userName": "John Doe"
}
```

#### Verify Password Reset Code
```http
POST /api/auth/verify-password-reset
Content-Type: application/json

{
  "email": "user@example.com",
  "code": "123456"
}
```

#### Send Custom Email
```http
POST /api/auth/send-custom-email
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Custom Subject",
  "html": "<h1>Custom HTML Content</h1>",
  "fromName": "Custom Sender"
}
```

#### Check SMTP Status
```http
GET /api/auth/smtp-status
```

### Health Check Endpoints

#### Server Health
```http
GET /health
```

#### SMTP Health
```http
GET /smtp-health
```

## Usage Examples

### Basic Email Verification Flow

```javascript
// 1. Send verification email
const response = await fetch('/api/auth/send-verification', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    userName: 'John Doe'
  })
});

// 2. User enters the 6-digit code
const verifyResponse = await fetch('/api/auth/verify-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    code: '123456'
  })
});
```

### Using the Email Service Directly

```javascript
import emailService from './services/emailService.js';

// Send verification email
const result = await emailService.sendVerificationEmail('user@example.com', 'John Doe');

// Send custom email
const customResult = await emailService.sendCustomEmail(
  'user@example.com',
  'Custom Subject',
  '<h1>Hello World!</h1>'
);
```

## Middleware

### Available Middleware

- `requireEmailVerification`: Check if email is verified
- `validateEmail`: Validate email format
- `checkSMTPStatus`: Verify SMTP service availability
- `logEmailOperation`: Log email operations
- `preventEmailSpam`: Prevent email spam
- `sanitizeEmail`: Sanitize email inputs
- `checkEmailLimit`: Enforce daily email limits

### Using Middleware

```javascript
import { requireEmailVerification, checkSMTPStatus } from './middleware/emailAuth.js';

// Protect a route with email verification
app.post('/protected-route', requireEmailVerification, (req, res) => {
  // Route logic here
});

// Check SMTP status before sending emails
app.post('/send-email', checkSMTPStatus, (req, res) => {
  // Email sending logic here
});
```

## Security Features

### Rate Limiting
- Email sending: 5 requests per 15 minutes per IP
- Verification attempts: 10 attempts per 15 minutes per IP
- General API: 100 requests per 15 minutes per IP

### Spam Protection
- Email spam prevention (1-minute cooldown)
- Daily email limits (10 emails per day per address)
- Input validation and sanitization

### Security Headers
- Helmet.js for security headers
- CORS configuration
- Input validation with express-validator

## Email Templates

The system includes three built-in email templates:

1. **Verification Email**: 6-digit verification code
2. **Password Reset**: 6-digit reset code
3. **Welcome Email**: Post-verification welcome message

### Customizing Templates

Edit the templates in `config/smtp.js`:

```javascript
const emailTemplates = {
  verification: {
    subject: 'Your Custom Subject',
    html: (code, userName) => `
      <div>
        <h1>Custom Template</h1>
        <p>Your code: ${code}</p>
      </div>
    `
  }
};
```

## Error Handling

The system provides comprehensive error handling:

- SMTP connection errors
- Invalid email formats
- Expired verification codes
- Rate limit exceeded
- Validation errors

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message",
  "data": {
    "additional": "context"
  }
}
```

## Production Considerations

### Database Integration
For production, replace the in-memory storage with a database:

```javascript
// Instead of Map, use database
const verificationCode = await VerificationCode.findOne({ email });
```

### Redis Integration
Use Redis for better performance and scalability:

```javascript
import redis from 'redis';
const client = redis.createClient(process.env.REDIS_URL);
```

### Environment Variables
Ensure all sensitive data is in environment variables:

```env
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
JWT_SECRET=your-jwt-secret
```

## Monitoring and Logging

### Health Checks
- Server health: `GET /health`
- SMTP health: `GET /smtp-health`

### Logging
The system logs:
- Email sending operations
- SMTP connection status
- Error messages
- Rate limiting events

## Troubleshooting

### Common Issues

1. **SMTP Authentication Failed**
   - Check your email credentials
   - Ensure 2FA is enabled for Gmail
   - Use app passwords, not regular passwords

2. **Connection Timeout**
   - Verify SMTP host and port
   - Check firewall settings
   - Ensure TLS/SSL configuration

3. **Rate Limiting**
   - Check rate limit settings
   - Implement proper error handling
   - Consider increasing limits for production

### Debug Mode

Enable debug logging:

```env
NODE_ENV=development
LOG_LEVEL=debug
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**PaperPilot Backend** - Empowering research through technology.

