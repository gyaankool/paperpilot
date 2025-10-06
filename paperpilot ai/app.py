from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import json
import logging
from datetime import datetime
import google.generativeai as genai
from werkzeug.utils import secure_filename
import tempfile
import uuid
from services.gemini_service import GeminiService
from services.file_service import FileService
from services.paper_service import PaperService
from services.enhanced_paper_service import EnhancedPaperService
from services.analysis_service import AnalysisService
from services.proposal_service import ProposalService
from services.report_service import ReportService
from services.review_service import ReviewService
from services.export_service import ExportService
from services.template_service import TemplateService
from middleware.auth_middleware import auth_required
from middleware.error_handler import handle_errors
from middleware.rate_limiter import rate_limit
from config.settings import Config

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize CORS
CORS(app, origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000"
])

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize services
gemini_service = GeminiService()
file_service = FileService()
paper_service = PaperService(gemini_service)
enhanced_paper_service = EnhancedPaperService(gemini_service)
analysis_service = AnalysisService(gemini_service)
proposal_service = ProposalService(gemini_service)
report_service = ReportService(gemini_service)
review_service = ReviewService(gemini_service)
export_service = ExportService()
template_service = TemplateService()

# Register error handlers
handle_errors(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0'
    })

@app.route('/api/template/info', methods=['GET'])
@auth_required
def get_template_info():
    """Get information about available templates"""
    try:
        template_info = template_service.get_conference_template_info()
        return jsonify({
            'success': True,
            'template_info': template_info
        })
    except Exception as e:
        logger.error(f"Template info error: {str(e)}")
        return jsonify({'error': 'Failed to get template info'}), 500

# ==================== AUTHENTICATION ENDPOINTS ====================

@app.route('/api/auth/login', methods=['POST'])
@rate_limit(limit=5, per=60)  # 5 attempts per minute
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password required'}), 400
        
        # TODO: Implement actual authentication logic
        # For now, return mock success
        return jsonify({
            'success': True,
            'user': {
                'id': str(uuid.uuid4()),
                'email': email,
                'name': email.split('@')[0]
            },
            'token': f'mock_token_{uuid.uuid4()}'
        })
        
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({'error': 'Login failed'}), 500

@app.route('/api/auth/signup', methods=['POST'])
@rate_limit(limit=3, per=60)  # 3 attempts per minute
def signup():
    """User signup endpoint"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        
        if not email or not password:
            return jsonify({'error': 'Email and password required'}), 400
        
        # TODO: Implement actual user creation logic
        # For now, return mock success
        return jsonify({
            'success': True,
            'message': 'User created successfully',
            'user': {
                'id': str(uuid.uuid4()),
                'email': email,
                'name': name or email.split('@')[0]
            }
        })
        
    except Exception as e:
        logger.error(f"Signup error: {str(e)}")
        return jsonify({'error': 'Signup failed'}), 500

# ==================== FILE UPLOAD ENDPOINTS ====================

@app.route('/api/upload', methods=['POST'])
@auth_required
@rate_limit(limit=10, per=60)  # 10 uploads per minute
def upload_file():
    """Upload research files"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        file_type = request.form.get('type', 'base')  # 'base' or 'reference'
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Save file and extract content
        file_info = file_service.save_file(file, file_type)
        
        return jsonify({
            'success': True,
            'file_id': file_info['file_id'],
            'filename': file_info['filename'],
            'file_type': file_type,
            'size': file_info['size'],
            'message': 'File uploaded successfully'
        })
        
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        return jsonify({'error': 'Upload failed'}), 500

@app.route('/api/files/<file_id>', methods=['DELETE'])
@auth_required
def delete_file(file_id):
    """Delete uploaded file"""
    try:
        success = file_service.delete_file(file_id)
        if success:
            return jsonify({'success': True, 'message': 'File deleted successfully'})
        else:
            return jsonify({'error': 'File not found'}), 404
            
    except Exception as e:
        logger.error(f"Delete file error: {str(e)}")
        return jsonify({'error': 'Delete failed'}), 500

# ==================== PAPER PROCESSING ENDPOINTS ====================

@app.route('/api/papers/process', methods=['POST'])
@auth_required
@rate_limit(limit=10, per=60)  # 10 processing requests per minute
def process_papers():
    """Process uploaded papers with AI"""
    try:
        data = request.get_json()
        file_ids = data.get('file_ids', [])
        processing_type = data.get('type', 'format')  # 'format', 'analyze', 'review'
        
        if not file_ids:
            return jsonify({'error': 'No files provided'}), 400
        
        # Process papers based on type
        if processing_type == 'format':
            result = paper_service.format_papers(file_ids, data.get('format_type', 'ieee'))
        elif processing_type == 'enhanced':
            result = enhanced_paper_service.generate_comprehensive_paper(file_ids, data.get('format_type', 'conference'))
        elif processing_type == 'analyze':
            result = analysis_service.analyze_papers(file_ids)
        elif processing_type == 'review':
            result = review_service.review_papers(file_ids)
        else:
            return jsonify({'error': 'Invalid processing type'}), 400
        
        return jsonify({
            'success': True,
            'result': result,
            'processing_type': processing_type
        })
        
    except Exception as e:
        logger.error(f"Process papers error: {str(e)}")
        return jsonify({'error': 'Processing failed'}), 500

@app.route('/api/papers/format', methods=['POST'])
@auth_required
@rate_limit(limit=10, per=60)
def format_paper():
    """Format paper according to specific standards"""
    try:
        data = request.get_json()
        content = data.get('content')
        format_type = data.get('format_type', 'ieee')  # 'ieee', 'arxiv', 'wiley'
        
        if not content:
            return jsonify({'error': 'Paper content required'}), 400
        
        # Format paper using Gemini
        formatted_content = paper_service.format_content(content, format_type)
        
        return jsonify({
            'success': True,
            'formatted_content': formatted_content,
            'format_type': format_type,
            'word_count': len(formatted_content.split()),
            'page_count': len(formatted_content.split('\n')) // 25  # Approximate
        })
        
    except Exception as e:
        logger.error(f"Format paper error: {str(e)}")
        return jsonify({'error': 'Formatting failed'}), 500

# ==================== SEARCH ENDPOINTS ====================

@app.route('/api/search/papers', methods=['POST'])
@auth_required
@rate_limit(limit=20, per=60)  # 20 searches per minute
def search_papers():
    """AI-powered paper search"""
    try:
        data = request.get_json()
        query = data.get('query')
        filters = data.get('filters', {})
        limit = data.get('limit', 10)
        
        if not query:
            return jsonify({'error': 'Search query required'}), 400
        
        # Search papers using Gemini
        results = paper_service.search_papers(query, filters, limit)
        
        return jsonify({
            'success': True,
            'query': query,
            'results': results,
            'total_found': len(results)
        })
        
    except Exception as e:
        logger.error(f"Search papers error: {str(e)}")
        return jsonify({'error': 'Search failed'}), 500

# ==================== DATA ANALYSIS ENDPOINTS ====================

@app.route('/api/analyze/data', methods=['POST'])
@auth_required
@rate_limit(limit=5, per=60)
def analyze_data():
    """Analyze research data with AI"""
    try:
        data = request.get_json()
        dataset = data.get('dataset')
        analysis_type = data.get('analysis_type', 'statistical')
        
        if not dataset:
            return jsonify({'error': 'Dataset required'}), 400
        
        # Analyze data using Gemini
        analysis_result = analysis_service.analyze_dataset(dataset, analysis_type)
        
        return jsonify({
            'success': True,
            'analysis': analysis_result,
            'analysis_type': analysis_type
        })
        
    except Exception as e:
        logger.error(f"Analyze data error: {str(e)}")
        return jsonify({'error': 'Analysis failed'}), 500

# ==================== FUNDING PROPOSAL ENDPOINTS ====================

@app.route('/api/proposals/generate', methods=['POST'])
@auth_required
@rate_limit(limit=3, per=60)  # 3 proposals per minute
def generate_proposal():
    """Generate funding proposal with AI"""
    try:
        data = request.get_json()
        requirements = {
            'title': data.get('title'),
            'description': data.get('description'),
            'amount': data.get('amount'),
            'duration': data.get('duration'),
            'field': data.get('field', 'research')
        }
        
        if not requirements['title'] or not requirements['description']:
            return jsonify({'error': 'Title and description required'}), 400
        
        # Generate proposal using Gemini
        proposal = proposal_service.generate_proposal(requirements)
        
        return jsonify({
            'success': True,
            'proposal': proposal,
            'requirements': requirements
        })
        
    except Exception as e:
        logger.error(f"Generate proposal error: {str(e)}")
        return jsonify({'error': 'Proposal generation failed'}), 500

# ==================== REPORT GENERATION ENDPOINTS ====================

@app.route('/api/reports/generate', methods=['POST'])
@auth_required
@rate_limit(limit=5, per=60)
def generate_report():
    """Generate research report with AI"""
    try:
        data = request.get_json()
        report_data = {
            'title': data.get('title'),
            'department': data.get('department'),
            'period': data.get('period'),
            'content': data.get('content', ''),
            'type': data.get('type', 'progress')  # 'progress', 'analysis', 'summary'
        }
        
        if not report_data['title']:
            return jsonify({'error': 'Report title required'}), 400
        
        # Generate report using Gemini
        report = report_service.generate_report(report_data)
        
        return jsonify({
            'success': True,
            'report': report,
            'metadata': {
                'word_count': len(report['content'].split()),
                'sections': len(report['sections']),
                'generated_at': datetime.utcnow().isoformat()
            }
        })
        
    except Exception as e:
        logger.error(f"Generate report error: {str(e)}")
        return jsonify({'error': 'Report generation failed'}), 500

# ==================== WRITING REVIEW ENDPOINTS ====================

@app.route('/api/review/writing', methods=['POST'])
@auth_required
@rate_limit(limit=15, per=60)  # 15 reviews per minute
def review_writing():
    """Review and improve writing with AI"""
    try:
        data = request.get_json()
        text = data.get('text')
        review_type = data.get('type', 'comprehensive')  # 'grammar', 'style', 'comprehensive'
        
        if not text:
            return jsonify({'error': 'Text content required'}), 400
        
        # Review writing using Gemini
        review_result = review_service.review_text(text, review_type)
        
        return jsonify({
            'success': True,
            'review': review_result,
            'original_text': text,
            'review_type': review_type
        })
        
    except Exception as e:
        logger.error(f"Review writing error: {str(e)}")
        return jsonify({'error': 'Writing review failed'}), 500

# ==================== EXPORT ENDPOINTS ====================

@app.route('/api/export/paper', methods=['POST'])
@auth_required
@rate_limit(limit=10, per=60)
def export_paper():
    """Export paper in various formats"""
    try:
        data = request.get_json()
        content = data.get('content')
        format_type = data.get('format', 'pdf')  # 'pdf', 'docx', 'tex'
        filename = data.get('filename', f'paper_{datetime.now().strftime("%Y%m%d_%H%M%S")}')
        
        if not content:
            return jsonify({'error': 'Paper content required'}), 400
        
        # Export paper
        file_path = export_service.export_paper(content, format_type, filename)
        
        return send_file(
            file_path,
            as_attachment=True,
            download_name=f'{filename}.{format_type}',
            mimetype=export_service.get_mimetype(format_type)
        )
        
    except Exception as e:
        logger.error(f"Export paper error: {str(e)}")
        return jsonify({'error': 'Export failed'}), 500

@app.route('/api/export/metadata', methods=['POST'])
@auth_required
def generate_submission_metadata():
    """Generate submission metadata package"""
    try:
        data = request.get_json()
        paper_data = data.get('paper_data', {})
        
        # Generate metadata using Gemini
        metadata = export_service.generate_submission_metadata(paper_data)
        
        return jsonify({
            'success': True,
            'metadata': metadata,
            'generated_at': datetime.utcnow().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Generate metadata error: {str(e)}")
        return jsonify({'error': 'Metadata generation failed'}), 500

# ==================== GEMINI STATUS ENDPOINT ====================

@app.route('/api/papers/validate-quality', methods=['POST'])
@auth_required
@rate_limit(limit=5, per=60)
def validate_paper_quality():
    """Validate paper quality and plagiarism"""
    try:
        data = request.get_json()
        paper_data = data.get('paper_data', {})
        
        if not paper_data:
            return jsonify({'error': 'Paper data required'}), 400
        
        # Validate paper quality
        validation_result = enhanced_paper_service.validate_paper_quality(paper_data)
        
        # Generate quality report
        quality_report = enhanced_paper_service.generate_quality_report(paper_data)
        
        return jsonify({
            'success': True,
            'validation': validation_result,
            'quality_report': quality_report,
            'timestamp': datetime.utcnow().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Quality validation error: {str(e)}")
        return jsonify({'error': 'Quality validation failed'}), 500

@app.route('/api/papers/check-plagiarism', methods=['POST'])
@auth_required
@rate_limit(limit=10, per=60)
def check_plagiarism():
    """Check plagiarism in paper content"""
    try:
        data = request.get_json()
        content = data.get('content', '')
        
        if not content:
            return jsonify({'error': 'Paper content required'}), 400
        
        # Check plagiarism
        plagiarism_report = enhanced_paper_service._check_plagiarism_comprehensive(content)
        
        return jsonify({
            'success': True,
            'plagiarism_report': plagiarism_report,
            'timestamp': datetime.utcnow().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Plagiarism check error: {str(e)}")
        return jsonify({'error': 'Plagiarism check failed'}), 500

@app.route('/api/gemini/status', methods=['GET'])
def gemini_status():
    """Check Gemini API status"""
    try:
        status = gemini_service.check_status()
        return jsonify({
            'success': True,
            'status': status,
            'model': 'gemini-1.5-pro',
            'timestamp': datetime.utcnow().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Gemini status error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Gemini service unavailable',
            'details': str(e)
        }), 500

if __name__ == '__main__':
    # Create necessary directories
    os.makedirs('uploads', exist_ok=True)
    os.makedirs('exports', exist_ok=True)
    os.makedirs('temp', exist_ok=True)
    
    # Run the app
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=app.config['DEBUG']
    )
