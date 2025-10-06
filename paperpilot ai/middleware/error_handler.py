import logging
from flask import jsonify, request
from werkzeug.exceptions import HTTPException
import traceback

logger = logging.getLogger(__name__)

def handle_errors(app):
    """Register error handlers for the Flask app"""
    
    @app.errorhandler(400)
    def bad_request(error):
        """Handle 400 Bad Request errors"""
        logger.warning(f"Bad request: {request.url} - {error.description}")
        return jsonify({
            'error': 'Bad Request',
            'message': error.description or 'Invalid request data',
            'status_code': 400
        }), 400
    
    @app.errorhandler(401)
    def unauthorized(error):
        """Handle 401 Unauthorized errors"""
        logger.warning(f"Unauthorized access: {request.url}")
        return jsonify({
            'error': 'Unauthorized',
            'message': 'Authentication required',
            'status_code': 401
        }), 401
    
    @app.errorhandler(403)
    def forbidden(error):
        """Handle 403 Forbidden errors"""
        logger.warning(f"Forbidden access: {request.url}")
        return jsonify({
            'error': 'Forbidden',
            'message': 'Insufficient permissions',
            'status_code': 403
        }), 403
    
    @app.errorhandler(404)
    def not_found(error):
        """Handle 404 Not Found errors"""
        logger.warning(f"Not found: {request.url}")
        return jsonify({
            'error': 'Not Found',
            'message': 'The requested resource was not found',
            'status_code': 404
        }), 404
    
    @app.errorhandler(413)
    def payload_too_large(error):
        """Handle 413 Payload Too Large errors"""
        logger.warning(f"Payload too large: {request.url}")
        return jsonify({
            'error': 'Payload Too Large',
            'message': 'File size exceeds maximum allowed limit',
            'status_code': 413
        }), 413
    
    @app.errorhandler(429)
    def too_many_requests(error):
        """Handle 429 Too Many Requests errors"""
        logger.warning(f"Rate limit exceeded: {request.url}")
        return jsonify({
            'error': 'Too Many Requests',
            'message': 'Rate limit exceeded. Please try again later.',
            'status_code': 429
        }), 429
    
    @app.errorhandler(500)
    def internal_server_error(error):
        """Handle 500 Internal Server Error"""
        logger.error(f"Internal server error: {request.url} - {str(error)}")
        return jsonify({
            'error': 'Internal Server Error',
            'message': 'An unexpected error occurred',
            'status_code': 500
        }), 500
    
    @app.errorhandler(Exception)
    def handle_exception(error):
        """Handle all other exceptions"""
        logger.error(f"Unhandled exception: {request.url} - {str(error)}")
        logger.error(traceback.format_exc())
        
        # Check if it's an HTTP exception
        if isinstance(error, HTTPException):
            return jsonify({
                'error': error.name,
                'message': error.description,
                'status_code': error.code
            }), error.code
        
        # Handle specific exception types
        if isinstance(error, ValueError):
            return jsonify({
                'error': 'Value Error',
                'message': str(error),
                'status_code': 400
            }), 400
        
        if isinstance(error, FileNotFoundError):
            return jsonify({
                'error': 'File Not Found',
                'message': 'The requested file was not found',
                'status_code': 404
            }), 404
        
        if isinstance(error, PermissionError):
            return jsonify({
                'error': 'Permission Denied',
                'message': 'Insufficient permissions to access the resource',
                'status_code': 403
            }), 403
        
        # Generic error response
        return jsonify({
            'error': 'Internal Server Error',
            'message': 'An unexpected error occurred',
            'status_code': 500
        }), 500
    
    @app.errorhandler(413)
    def handle_file_too_large(error):
        """Handle file too large errors"""
        logger.warning(f"File too large: {request.url}")
        return jsonify({
            'error': 'File Too Large',
            'message': 'The uploaded file exceeds the maximum size limit',
            'status_code': 413
        }), 413

class APIError(Exception):
    """Custom API error class"""
    
    def __init__(self, message, status_code=400, payload=None):
        super().__init__()
        self.message = message
        self.status_code = status_code
        self.payload = payload
    
    def to_dict(self):
        rv = dict(self.payload or ())
        rv['error'] = self.message
        rv['status_code'] = self.status_code
        return rv

def handle_api_error(error):
    """Handle custom API errors"""
    logger.error(f"API Error: {error.message}")
    return jsonify(error.to_dict()), error.status_code

def register_error_handlers(app):
    """Register all error handlers"""
    handle_errors(app)
    app.register_error_handler(APIError, handle_api_error)
