# PaperPilot AI Backend

A comprehensive Flask backend service for the PaperPilot research platform, powered by Google Gemini AI.

## 🚀 Features

### Core AI Services
- **Paper Formatting**: IEEE, arXiv, Wiley format conversion
- **Literature Search**: AI-powered academic paper search
- **Writing Review**: Grammar, style, and clarity analysis
- **Report Generation**: Automated research report creation
- **Data Analysis**: Statistical analysis and visualization
- **Funding Proposals**: AI-generated grant proposals
- **Citation Management**: Automatic citation formatting
- **Export Services**: Multiple format export (PDF, DOCX, LaTeX, HTML)

### Technical Features
- **RESTful API**: Clean, well-documented endpoints
- **Authentication**: JWT-based authentication system
- **Rate Limiting**: Configurable rate limiting per endpoint
- **File Processing**: Support for PDF, DOCX, TXT, LaTeX, CSV files
- **Error Handling**: Comprehensive error handling and logging
- **CORS Support**: Cross-origin resource sharing
- **Security**: Input validation and sanitization

## 🛠️ Installation

### Prerequisites
- Python 3.8+
- Google Gemini API key
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd paperpilot-ai
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment configuration**
   ```bash
   cp env.example .env
   # Edit .env file with your configuration
   ```

5. **Set up Gemini API key**
   ```bash
   export GEMINI_API_KEY=your-gemini-api-key-here
   ```

6. **Create necessary directories**
   ```bash
   mkdir -p uploads exports temp
   ```

## 🚀 Running the Application

### Development Mode
```bash
python app.py
```

### Production Mode
```bash
export FLASK_ENV=production
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### File Management
- `POST /api/upload` - Upload research files
- `DELETE /api/files/<file_id>` - Delete uploaded file

### Paper Processing
- `POST /api/papers/process` - Process papers with AI
- `POST /api/papers/format` - Format papers to standards
- `POST /api/search/papers` - AI-powered paper search

### Data Analysis
- `POST /api/analyze/data` - Analyze research data

### Funding Proposals
- `POST /api/proposals/generate` - Generate funding proposals

### Report Generation
- `POST /api/reports/generate` - Generate research reports

### Writing Review
- `POST /api/review/writing` - Review and improve writing

### Export Services
- `POST /api/export/paper` - Export papers in various formats
- `POST /api/export/metadata` - Generate submission metadata

### System
- `GET /api/health` - Health check
- `GET /api/gemini/status` - Gemini API status

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | Required |
| `FLASK_ENV` | Flask environment | development |
| `SECRET_KEY` | Flask secret key | Required |
| `MAX_CONTENT_LENGTH` | Max file upload size | 16MB |
| `LOG_LEVEL` | Logging level | INFO |

### Rate Limiting

Default rate limits per endpoint type:
- Authentication: 5 requests/minute
- File upload: 10 requests/minute
- Search: 20 requests/minute
- Analysis: 5 requests/minute
- Export: 10 requests/minute
- General: 100 requests/minute

## 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=.

# Run specific test file
pytest tests/test_gemini_service.py
```

## 📁 Project Structure

```
paperpilot-ai/
├── app.py                 # Main Flask application
├── config/
│   └── settings.py        # Configuration settings
├── services/
│   ├── gemini_service.py  # Gemini AI integration
│   ├── file_service.py    # File handling
│   ├── paper_service.py   # Paper processing
│   ├── analysis_service.py # Data analysis
│   ├── proposal_service.py # Funding proposals
│   ├── report_service.py  # Report generation
│   ├── review_service.py  # Writing review
│   └── export_service.py  # Export functionality
├── middleware/
│   ├── auth_middleware.py # Authentication
│   ├── error_handler.py   # Error handling
│   └── rate_limiter.py    # Rate limiting
├── uploads/               # Uploaded files
├── exports/               # Exported files
├── temp/                  # Temporary files
├── requirements.txt       # Python dependencies
├── env.example           # Environment template
└── README.md             # This file
```

## 🔒 Security

- JWT-based authentication
- Rate limiting to prevent abuse
- Input validation and sanitization
- CORS configuration
- Secure file handling
- Error message sanitization

## 🚀 Deployment

### Docker Deployment
```bash
# Build image
docker build -t paperpilot-ai .

# Run container
docker run -p 5000:5000 -e GEMINI_API_KEY=your-key paperpilot-ai
```

### Cloud Deployment
The application is ready for deployment on:
- Heroku
- AWS Elastic Beanstalk
- Google Cloud Run
- Azure Container Instances

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation
- Review the logs for error details

## 🔄 Updates

### Version 1.0.0
- Initial release
- Core AI services implementation
- RESTful API endpoints
- Authentication and security
- File processing capabilities
- Export functionality
