import logging
from functools import wraps
from flask import request, jsonify
import jwt
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

def auth_required(f):
    """Decorator to require authentication for endpoints"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            # Get token from Authorization header
            auth_header = request.headers.get('Authorization')
            
            if not auth_header:
                return jsonify({'error': 'Authorization header required'}), 401
            
            # Check if header starts with 'Bearer '
            if not auth_header.startswith('Bearer '):
                return jsonify({'error': 'Invalid authorization header format'}), 401
            
            # Extract token
            token = auth_header.split(' ')[1]
            
            # For demo purposes, accept any token that starts with 'mock_token_'
            # In production, you would validate the JWT token here
            if not token.startswith('mock_token_'):
                return jsonify({'error': 'Invalid token'}), 401
            
            # Add user info to request context
            request.current_user = {
                'id': 'demo_user_id',
                'email': 'demo@example.com',
                'name': 'Demo User'
            }
            
            return f(*args, **kwargs)
            
        except Exception as e:
            logger.error(f"Authentication error: {str(e)}")
            return jsonify({'error': 'Authentication failed'}), 401
    
    return decorated_function

def optional_auth(f):
    """Decorator for optional authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            # Get token from Authorization header
            auth_header = request.headers.get('Authorization')
            
            if auth_header and auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
                
                # For demo purposes, accept any token that starts with 'mock_token_'
                if token.startswith('mock_token_'):
                    request.current_user = {
                        'id': 'demo_user_id',
                        'email': 'demo@example.com',
                        'name': 'Demo User'
                    }
                else:
                    request.current_user = None
            else:
                request.current_user = None
            
            return f(*args, **kwargs)
            
        except Exception as e:
            logger.error(f"Optional authentication error: {str(e)}")
            request.current_user = None
            return f(*args, **kwargs)
    
    return decorated_function

def admin_required(f):
    """Decorator to require admin privileges"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            # First check if user is authenticated
            auth_header = request.headers.get('Authorization')
            
            if not auth_header or not auth_header.startswith('Bearer '):
                return jsonify({'error': 'Authorization required'}), 401
            
            token = auth_header.split(' ')[1]
            
            if not token.startswith('mock_token_'):
                return jsonify({'error': 'Invalid token'}), 401
            
            # For demo purposes, check if token contains 'admin'
            # In production, you would check user roles from database
            if 'admin' not in token:
                return jsonify({'error': 'Admin privileges required'}), 403
            
            request.current_user = {
                'id': 'admin_user_id',
                'email': 'admin@example.com',
                'name': 'Admin User',
                'role': 'admin'
            }
            
            return f(*args, **kwargs)
            
        except Exception as e:
            logger.error(f"Admin authentication error: {str(e)}")
            return jsonify({'error': 'Admin authentication failed'}), 401
    
    return decorated_function

def get_current_user():
    """Get current authenticated user"""
    return getattr(request, 'current_user', None)

def is_authenticated():
    """Check if user is authenticated"""
    return get_current_user() is not None

def is_admin():
    """Check if user is admin"""
    user = get_current_user()
    return user and user.get('role') == 'admin'
