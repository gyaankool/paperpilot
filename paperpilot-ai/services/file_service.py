import os
import uuid
import logging
from typing import Dict, Any, Optional
from werkzeug.utils import secure_filename
from config.settings import Config

logger = logging.getLogger(__name__)

class FileService:
    """Service for handling file operations"""
    
    def __init__(self):
        """Initialize file service"""
        self.upload_folder = Config.UPLOAD_FOLDER
        self.temp_folder = Config.TEMP_FOLDER
        self.allowed_extensions = Config.ALLOWED_EXTENSIONS
        
        # Create directories if they don't exist
        os.makedirs(self.upload_folder, exist_ok=True)
        os.makedirs(self.temp_folder, exist_ok=True)
    
    def allowed_file(self, filename: str) -> bool:
        """Check if file extension is allowed"""
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in self.allowed_extensions
    
    def save_file(self, file, file_type: str = 'base') -> Dict[str, Any]:
        """Save uploaded file and return file info"""
        try:
            if not self.allowed_file(file.filename):
                raise ValueError(f"File type not allowed. Allowed types: {', '.join(self.allowed_extensions)}")
            
            # Generate unique filename
            file_id = str(uuid.uuid4())
            filename = secure_filename(file.filename)
            file_extension = filename.rsplit('.', 1)[1].lower()
            unique_filename = f"{file_id}.{file_extension}"
            
            # Create subdirectory for file type
            file_type_dir = os.path.join(self.upload_folder, file_type)
            os.makedirs(file_type_dir, exist_ok=True)
            
            # Save file
            file_path = os.path.join(file_type_dir, unique_filename)
            file.save(file_path)
            
            # Get file size
            file_size = os.path.getsize(file_path)
            
            # Extract text content if possible
            content = self.extract_text_content(file_path, file_extension)
            
            return {
                'file_id': file_id,
                'filename': filename,
                'unique_filename': unique_filename,
                'file_path': file_path,
                'file_type': file_type,
                'file_extension': file_extension,
                'size': file_size,
                'content': content
            }
            
        except Exception as e:
            logger.error(f"Error saving file: {str(e)}")
            raise
    
    def get_file(self, file_id: str, file_type: str = 'base') -> Optional[Dict[str, Any]]:
        """Get file information by ID"""
        try:
            file_type_dir = os.path.join(self.upload_folder, file_type)
            
            # Search for file with the given ID
            for filename in os.listdir(file_type_dir):
                if filename.startswith(file_id):
                    file_path = os.path.join(file_type_dir, filename)
                    file_extension = filename.rsplit('.', 1)[1].lower()
                    
                    return {
                        'file_id': file_id,
                        'filename': filename,
                        'file_path': file_path,
                        'file_type': file_type,
                        'file_extension': file_extension,
                        'size': os.path.getsize(file_path),
                        'content': self.extract_text_content(file_path, file_extension)
                    }
            
            return None
            
        except Exception as e:
            logger.error(f"Error getting file {file_id}: {str(e)}")
            return None
    
    def delete_file(self, file_id: str, file_type: str = 'base') -> bool:
        """Delete file by ID"""
        try:
            file_type_dir = os.path.join(self.upload_folder, file_type)
            
            # Find and delete file
            for filename in os.listdir(file_type_dir):
                if filename.startswith(file_id):
                    file_path = os.path.join(file_type_dir, filename)
                    os.remove(file_path)
                    return True
            
            return False
            
        except Exception as e:
            logger.error(f"Error deleting file {file_id}: {str(e)}")
            return False
    
    def extract_text_content(self, file_path: str, file_extension: str) -> str:
        """Extract text content from various file types"""
        try:
            if file_extension == 'txt':
                return self._extract_from_txt(file_path)
            elif file_extension == 'pdf':
                return self._extract_from_pdf(file_path)
            elif file_extension in ['docx', 'doc']:
                return self._extract_from_docx(file_path)
            elif file_extension == 'tex':
                return self._extract_from_tex(file_path)
            elif file_extension == 'csv':
                return self._extract_from_csv(file_path)
            elif file_extension == 'json':
                return self._extract_from_json(file_path)
            else:
                return ""
                
        except Exception as e:
            logger.warning(f"Could not extract text from {file_path}: {str(e)}")
            return ""
    
    def _extract_from_txt(self, file_path: str) -> str:
        """Extract text from TXT file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                return file.read()
        except UnicodeDecodeError:
            # Try with different encoding
            with open(file_path, 'r', encoding='latin-1') as file:
                return file.read()
    
    def _extract_from_pdf(self, file_path: str) -> str:
        """Extract text from PDF file"""
        try:
            import PyPDF2
            
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
                
                return text
                
        except ImportError:
            logger.warning("PyPDF2 not installed, cannot extract PDF text")
            return ""
        except Exception as e:
            logger.warning(f"PDF extraction failed: {str(e)}")
            return ""
    
    def _extract_from_docx(self, file_path: str) -> str:
        """Extract text from DOCX file"""
        try:
            from docx import Document
            
            doc = Document(file_path)
            text = ""
            
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            
            return text
            
        except ImportError:
            logger.warning("python-docx not installed, cannot extract DOCX text")
            return ""
        except Exception as e:
            logger.warning(f"DOCX extraction failed: {str(e)}")
            return ""
    
    def _extract_from_tex(self, file_path: str) -> str:
        """Extract text from LaTeX file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
                
                # Basic LaTeX text extraction (remove commands)
                import re
                
                # Remove LaTeX commands
                content = re.sub(r'\\[a-zA-Z]+\{[^}]*\}', '', content)
                content = re.sub(r'\\[a-zA-Z]+', '', content)
                
                # Remove math environments
                content = re.sub(r'\$[^$]*\$', '', content)
                content = re.sub(r'\\\[[^\]]*\\\]', '', content)
                
                return content
                
        except Exception as e:
            logger.warning(f"LaTeX extraction failed: {str(e)}")
            return ""
    
    def _extract_from_csv(self, file_path: str) -> str:
        """Extract text from CSV file"""
        try:
            # Try pandas first, fallback to built-in csv module
            try:
                import pandas as pd
                
                df = pd.read_csv(file_path)
                
                # Convert to text representation
                text = f"CSV Data Summary:\n"
                text += f"Shape: {df.shape}\n"
                text += f"Columns: {', '.join(df.columns)}\n\n"
                text += f"First 5 rows:\n{df.head().to_string()}\n\n"
                text += f"Data types:\n{df.dtypes.to_string()}\n"
                
                return text
            except ImportError:
                # Fallback to built-in csv module
                import csv
                
                with open(file_path, 'r', encoding='utf-8') as file:
                    csv_reader = csv.reader(file)
                    rows = list(csv_reader)
                
                if not rows:
                    return "CSV file is empty"
                
                # Get header and first few rows
                header = rows[0]
                data_rows = rows[1:6]  # First 5 data rows
                
                text = f"CSV Data Summary:\n"
                text += f"Rows: {len(rows)}\n"
                text += f"Columns: {len(header)}\n"
                text += f"Column names: {', '.join(header)}\n\n"
                text += f"First 5 rows:\n"
                
                # Add header
                text += f"{' | '.join(header)}\n"
                text += f"{'-' * (len(' | '.join(header)))}\n"
                
                # Add data rows
                for row in data_rows:
                    text += f"{' | '.join(row)}\n"
                
                return text
            
        except Exception as e:
            logger.warning(f"CSV extraction failed: {str(e)}")
            return ""
    
    def _extract_from_json(self, file_path: str) -> str:
        """Extract text from JSON file"""
        try:
            import json
            
            with open(file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)
                
                # Convert to readable text
                return json.dumps(data, indent=2)
                
        except Exception as e:
            logger.warning(f"JSON extraction failed: {str(e)}")
            return ""
    
    def get_file_list(self, file_type: str = None) -> list:
        """Get list of uploaded files"""
        try:
            files = []
            
            if file_type:
                # Get files of specific type
                file_type_dir = os.path.join(self.upload_folder, file_type)
                if os.path.exists(file_type_dir):
                    for filename in os.listdir(file_type_dir):
                        file_path = os.path.join(file_type_dir, filename)
                        file_id = filename.split('.')[0]
                        file_extension = filename.rsplit('.', 1)[1].lower()
                        
                        files.append({
                            'file_id': file_id,
                            'filename': filename,
                            'file_type': file_type,
                            'file_extension': file_extension,
                            'size': os.path.getsize(file_path)
                        })
            else:
                # Get all files
                for file_type_dir in os.listdir(self.upload_folder):
                    type_path = os.path.join(self.upload_folder, file_type_dir)
                    if os.path.isdir(type_path):
                        for filename in os.listdir(type_path):
                            file_path = os.path.join(type_path, filename)
                            file_id = filename.split('.')[0]
                            file_extension = filename.rsplit('.', 1)[1].lower()
                            
                            files.append({
                                'file_id': file_id,
                                'filename': filename,
                                'file_type': file_type_dir,
                                'file_extension': file_extension,
                                'size': os.path.getsize(file_path)
                            })
            
            return files
            
        except Exception as e:
            logger.error(f"Error getting file list: {str(e)}")
            return []
    
    def cleanup_temp_files(self, max_age_hours: int = 24):
        """Clean up temporary files older than specified hours"""
        try:
            import time
            
            current_time = time.time()
            max_age_seconds = max_age_hours * 3600
            
            for filename in os.listdir(self.temp_folder):
                file_path = os.path.join(self.temp_folder, filename)
                
                if os.path.isfile(file_path):
                    file_age = current_time - os.path.getmtime(file_path)
                    
                    if file_age > max_age_seconds:
                        os.remove(file_path)
                        logger.info(f"Cleaned up temp file: {filename}")
                        
        except Exception as e:
            logger.error(f"Error cleaning up temp files: {str(e)}")
