import os
from datetime import timedelta

class Config:
    """Base configuration class"""
    
    # Flask Configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    DEBUG = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    
    # Gemini API Configuration
    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
    GEMINI_MODEL = os.environ.get('GEMINI_MODEL', 'gemini-2.0-flash')
    
    # Elsevier API Configuration
    ELSEVIER_API_KEY = os.environ.get('ELSEVIER_API_KEY')
    
    # File Upload Configuration
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'uploads')
    EXPORT_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'exports')
    TEMP_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'temp')
    
    # Allowed file extensions
    ALLOWED_EXTENSIONS = {
        'pdf', 'docx', 'doc', 'txt', 'tex', 'rtf',
        'csv', 'xlsx', 'xls', 'json', 'xml'
    }
    
    # Maximum file size (16MB)
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    
    # Rate Limiting Configuration
    RATELIMIT_STORAGE_URL = os.environ.get('REDIS_URL', 'memory://')
    RATELIMIT_DEFAULT = "1000 per hour"
    
    # CORS Configuration
    CORS_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://paperpilot-frontend.onrender.com"  # Production frontend
    ]
    
    # Database Configuration (for future use)
    DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///paperpilot.db')
    
    # Logging Configuration
    LOG_LEVEL = os.environ.get('LOG_LEVEL', 'INFO')
    LOG_FILE = os.environ.get('LOG_FILE', 'paperpilot.log')
    
    # AI Service Configuration
    GEMINI_SAFETY_SETTINGS = [
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        }
    ]
    
    # Processing Configuration
    MAX_PROCESSING_TIME = 300  # 5 minutes
    BATCH_SIZE = 10  # Maximum files to process in one batch
    
    # Export Configuration
    SUPPORTED_EXPORT_FORMATS = ['pdf', 'docx', 'tex', 'html', 'txt']
    
    # Search Configuration
    MAX_SEARCH_RESULTS = 50
    DEFAULT_SEARCH_LIMIT = 10
    
    # Analysis Configuration
    SUPPORTED_ANALYSIS_TYPES = [
        'statistical',
        'trend',
        'correlation',
        'regression',
        'classification',
        'clustering'
    ]

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    TESTING = False
    
    # Override with production values
    SECRET_KEY = os.environ.get('SECRET_KEY')
    
    if not SECRET_KEY:
        raise ValueError("SECRET_KEY environment variable must be set in production")

class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    DEBUG = True
    
    # Use in-memory database for testing
    DATABASE_URL = 'sqlite:///:memory:'
    
    # Disable rate limiting in tests
    RATELIMIT_ENABLED = False

# Configuration mapping
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
