#!/usr/bin/env python3
"""
PaperPilot AI Backend Startup Script
"""

import os
import sys
from dotenv import load_dotenv

def main():
    """Main startup function"""
    
    # Load environment variables
    load_dotenv()
    
    # Check for required environment variables
    required_vars = ['GEMINI_API_KEY']
    missing_vars = []
    
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        print("❌ Missing required environment variables:")
        for var in missing_vars:
            print(f"   - {var}")
        print("\nPlease set these variables in your .env file or environment.")
        print("See env.example for reference.")
        sys.exit(1)
    
    # Create necessary directories
    directories = ['uploads', 'exports', 'temp']
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"✅ Created directory: {directory}")
    
    # Import and run the Flask app
    try:
        from app import app
        
        # Get configuration
        host = os.getenv('FLASK_HOST', '0.0.0.0')
        port = int(os.getenv('FLASK_PORT', 5001))
        debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
        
        print(f"\n🚀 Starting PaperPilot AI Backend...")
        print(f"   Host: {host}")
        print(f"   Port: {port}")
        print(f"   Debug: {debug}")
        print(f"   Environment: {os.getenv('FLASK_ENV', 'development')}")
        print(f"\n📚 API Documentation: http://{host}:{port}/api/health")
        print(f"🔗 Frontend URL: http://localhost:5173")
        print(f"\n" + "="*50)
        
        # Run the application
        app.run(
            host=host,
            port=port,
            debug=debug,
            threaded=True
        )
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("Make sure all dependencies are installed: pip install -r requirements.txt")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Startup error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
