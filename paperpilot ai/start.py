#!/usr/bin/env python3
"""
PaperPilot AI Backend - Production Ready Startup Script
"""

import os
import sys
from dotenv import load_dotenv

def main():
    """Main startup function with quota handling"""
    
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
    
    # Import and run the Flask app
    try:
        from app import app
        
        # Get configuration
        host = os.getenv('FLASK_HOST', '0.0.0.0')
        port = int(os.getenv('FLASK_PORT', 5000))
        debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
        
        print("🚀 PaperPilot AI Backend")
        print("=" * 50)
        print(f"📡 Server: http://{host}:{port}")
        print(f"🔗 Frontend: http://localhost:5173")
        print(f"📚 API Docs: http://{host}:{port}/api/health")
        print(f"🤖 Gemini Status: http://{host}:{port}/api/gemini/status")
        print("=" * 50)
        
        if os.getenv('GEMINI_API_KEY'):
            print("✅ Gemini API Key: Configured")
            print("⚠️  Note: Free tier has quota limits")
            print("   Upgrade to paid tier for production use")
        else:
            print("❌ Gemini API Key: Not configured")
        
        print("\n🎯 Available Endpoints:")
        print("   POST /api/auth/login - User authentication")
        print("   POST /api/upload - File upload")
        print("   POST /api/papers/format - Format papers")
        print("   POST /api/search/papers - Search papers")
        print("   POST /api/analyze/data - Analyze data")
        print("   POST /api/proposals/generate - Generate proposals")
        print("   POST /api/reports/generate - Generate reports")
        print("   POST /api/review/writing - Review writing")
        print("   POST /api/export/paper - Export papers")
        print("\n" + "=" * 50)
        
        # Run the application
        app.run(
            host=host,
            port=port,
            debug=debug,
            threaded=True
        )
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("Make sure all dependencies are installed:")
        print("   pip install -r requirements.txt")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Startup error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
