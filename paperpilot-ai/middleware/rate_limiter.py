import time
import logging
from functools import wraps
from flask import request, jsonify
from collections import defaultdict, deque

logger = logging.getLogger(__name__)

# In-memory storage for rate limiting (use Redis in production)
rate_limit_storage = defaultdict(lambda: deque())

def rate_limit(limit=100, per=60, key_func=None):
    """
    Rate limiting decorator
    
    Args:
        limit: Number of requests allowed
        per: Time window in seconds
        key_func: Function to generate rate limit key
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Generate rate limit key
            if key_func:
                key = key_func()
            else:
                # Default: use IP address
                key = request.remote_addr or 'unknown'
            
            # Get current timestamp
            now = time.time()
            
            # Clean old entries
            window_start = now - per
            while rate_limit_storage[key] and rate_limit_storage[key][0] < window_start:
                rate_limit_storage[key].popleft()
            
            # Check if limit exceeded
            if len(rate_limit_storage[key]) >= limit:
                logger.warning(f"Rate limit exceeded for {key}")
                return jsonify({
                    'error': 'Rate limit exceeded',
                    'message': f'Too many requests. Limit: {limit} per {per} seconds',
                    'retry_after': int(rate_limit_storage[key][0] + per - now)
                }), 429
            
            # Add current request
            rate_limit_storage[key].append(now)
            
            return f(*args, **kwargs)
        
        return decorated_function
    return decorator

def rate_limit_by_user(limit=100, per=60):
    """Rate limit by authenticated user"""
    def key_func():
        # Try to get user ID from request context
        user = getattr(request, 'current_user', None)
        if user and 'id' in user:
            return f"user:{user['id']}"
        else:
            # Fallback to IP address
            return f"ip:{request.remote_addr or 'unknown'}"
    
    return rate_limit(limit=limit, per=per, key_func=key_func)

def rate_limit_by_endpoint(limit=100, per=60):
    """Rate limit by endpoint"""
    def key_func():
        return f"endpoint:{request.endpoint}:{request.remote_addr or 'unknown'}"
    
    return rate_limit(limit=limit, per=per, key_func=key_func)

def rate_limit_by_api_key(limit=100, per=60):
    """Rate limit by API key"""
    def key_func():
        # Get API key from header
        api_key = request.headers.get('X-API-Key')
        if api_key:
            return f"api_key:{api_key}"
        else:
            # Fallback to IP address
            return f"ip:{request.remote_addr or 'unknown'}"
    
    return rate_limit(limit=limit, per=per, key_func=key_func)

def get_rate_limit_info(key=None):
    """Get current rate limit information for a key"""
    if key is None:
        key = request.remote_addr or 'unknown'
    
    now = time.time()
    window_start = now - 60  # 1 minute window
    
    # Clean old entries
    while rate_limit_storage[key] and rate_limit_storage[key][0] < window_start:
        rate_limit_storage[key].popleft()
    
    return {
        'key': key,
        'current_requests': len(rate_limit_storage[key]),
        'window_start': window_start,
        'window_end': now
    }

def reset_rate_limit(key=None):
    """Reset rate limit for a key"""
    if key is None:
        key = request.remote_addr or 'unknown'
    
    if key in rate_limit_storage:
        del rate_limit_storage[key]
        logger.info(f"Rate limit reset for {key}")

def cleanup_old_entries():
    """Clean up old rate limit entries"""
    now = time.time()
    cutoff_time = now - 3600  # 1 hour ago
    
    keys_to_remove = []
    
    for key, requests in rate_limit_storage.items():
        # Remove old entries
        while requests and requests[0] < cutoff_time:
            requests.popleft()
        
        # Remove empty entries
        if not requests:
            keys_to_remove.append(key)
    
    # Remove empty entries
    for key in keys_to_remove:
        del rate_limit_storage[key]
    
    logger.info(f"Cleaned up {len(keys_to_remove)} old rate limit entries")

# Global rate limit configurations
RATE_LIMITS = {
    'auth': {'limit': 5, 'per': 60},      # 5 auth attempts per minute
    'upload': {'limit': 10, 'per': 60},   # 10 uploads per minute
    'search': {'limit': 20, 'per': 60},   # 20 searches per minute
    'analysis': {'limit': 5, 'per': 60},  # 5 analyses per minute
    'export': {'limit': 10, 'per': 60},   # 10 exports per minute
    'general': {'limit': 100, 'per': 60}  # 100 general requests per minute
}

def get_rate_limit_config(endpoint_type='general'):
    """Get rate limit configuration for endpoint type"""
    return RATE_LIMITS.get(endpoint_type, RATE_LIMITS['general'])

def apply_rate_limit(endpoint_type='general'):
    """Apply rate limit based on endpoint type"""
    config = get_rate_limit_config(endpoint_type)
    return rate_limit(limit=config['limit'], per=config['per'])
