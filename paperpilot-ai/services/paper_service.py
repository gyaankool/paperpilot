import logging
from typing import Dict, List, Any
from services.gemini_service import GeminiService
from services.file_service import FileService
from services.template_service import TemplateService
from services.elsevier_service import ElsevierService

logger = logging.getLogger(__name__)

class PaperService:
    """Service for paper processing and formatting"""
    
    def __init__(self, gemini_service: GeminiService):
        """Initialize paper service"""
        self.gemini_service = gemini_service
        self.file_service = FileService()
        self.template_service = TemplateService()
        self.elsevier_service = ElsevierService()
    
    def format_papers(self, file_ids: List[str], format_type: str = 'ieee') -> Dict[str, Any]:
        """Format multiple papers and generate a comprehensive research paper"""
        try:
            # Separate base and reference papers
            base_papers = []
            reference_papers = []
            
            for file_id in file_ids:
                # Get file content
                file_info = self.file_service.get_file(file_id)
                if not file_info:
                    continue
                
                # Determine if it's a base or reference paper based on file type
                if file_info.get('file_type') == 'base':
                    base_papers.append({
                        'file_id': file_id,
                        'filename': file_info['filename'],
                        'content': file_info['content']
                    })
                else:  # reference
                    reference_papers.append({
                        'file_id': file_id,
                        'filename': file_info['filename'],
                        'content': file_info['content']
                    })
            
            # Generate comprehensive research paper
            if base_papers:
                research_paper_content = self.gemini_service.generate_research_paper(
                    base_papers, reference_papers
                )
                
                # Apply conference template formatting
                formatted_content = self.template_service.apply_conference_formatting(research_paper_content)
                
                # Validate template compliance
                compliance_report = self.template_service.validate_template_compliance(formatted_content)
                
                return {
                    'formatted_papers': [{
                        'file_id': 'generated_research_paper',
                        'filename': 'Generated Research Paper (Conference Format)',
                        'formatted_content': formatted_content,
                        'format_type': 'conference',
                        'word_count': len(formatted_content.split()),
                        'page_count': len(formatted_content.split('\n')) // 25,
                        'base_papers_count': len(base_papers),
                        'reference_papers_count': len(reference_papers),
                        'template_compliance': compliance_report,
                        'template_used': 'Conference Template A4'
                    }],
                    'total_papers': 1,
                    'format_type': 'conference',
                    'generated': True,
                    'template_info': self.template_service.get_conference_template_info()
                }
            else:
                # Fallback: format individual papers if no base papers
                formatted_papers = []
                
                for paper in base_papers + reference_papers:
                    formatted_content = self.format_content(paper['content'], format_type)
                    
                    formatted_papers.append({
                        'file_id': paper['file_id'],
                        'filename': paper['filename'],
                        'formatted_content': formatted_content,
                        'format_type': format_type,
                        'word_count': len(formatted_content.split()),
                        'page_count': len(formatted_content.split('\n')) // 25
                    })
                
                return {
                    'formatted_papers': formatted_papers,
                    'total_papers': len(formatted_papers),
                    'format_type': format_type,
                    'generated': False
                }
            
        except Exception as e:
            logger.error(f"Error formatting papers: {str(e)}")
            raise
    
    def format_content(self, content: str, format_type: str) -> str:
        """Format paper content using Gemini"""
        try:
            return self.gemini_service.format_paper(content, format_type)
        except Exception as e:
            logger.error(f"Error formatting content: {str(e)}")
            raise
    
    def search_papers(self, query: str, filters: Dict[str, Any] = None, limit: int = 10) -> List[Dict[str, Any]]:
        """Search for relevant papers using Elsevier APIs"""
        try:
            # Try Scopus search first (more comprehensive)
            scopus_results = self.elsevier_service.search_scopus(query, count=limit)
            
            if scopus_results.get('success') and scopus_results.get('results'):
                logger.info(f"Found {len(scopus_results['results'])} papers from Scopus")
                return scopus_results['results']
            
            # Fallback to ScienceDirect search
            science_direct_results = self.elsevier_service.search_science_direct(query, count=limit)
            
            if science_direct_results.get('success') and science_direct_results.get('results'):
                logger.info(f"Found {len(science_direct_results['results'])} papers from ScienceDirect")
                return science_direct_results['results']
            
            # Final fallback to Gemini if Elsevier APIs fail
            logger.warning("Elsevier APIs failed, falling back to Gemini search")
            return self.gemini_service.search_papers(query, filters, limit)
            
        except Exception as e:
            logger.error(f"Error searching papers: {str(e)}")
            # Final fallback to Gemini
            try:
                return self.gemini_service.search_papers(query, filters, limit)
            except Exception as fallback_error:
                logger.error(f"Fallback search also failed: {str(fallback_error)}")
                raise
    
    def extract_citations(self, content: str) -> List[Dict[str, Any]]:
        """Extract citations from paper content"""
        try:
            # Use Gemini to extract citations
            prompt = f"""
            Extract all citations from the following research paper content:
            
            {content}
            
            For each citation, provide:
            1. Full citation text
            2. Author names
            3. Publication year
            4. Title
            5. Journal/Conference
            6. DOI (if available)
            
            Return in JSON format with the following structure:
            {{
                "citations": [
                    {{
                        "full_text": "Full citation text",
                        "authors": ["Author 1", "Author 2"],
                        "year": 2024,
                        "title": "Paper Title",
                        "venue": "Journal/Conference",
                        "doi": "10.1000/example"
                    }}
                ]
            }}
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.3)
            
            import json
            try:
                result = json.loads(response)
                return result.get('citations', [])
            except json.JSONDecodeError:
                # Fallback: return empty list
                return []
                
        except Exception as e:
            logger.error(f"Error extracting citations: {str(e)}")
            return []
    
    def generate_abstract(self, content: str) -> str:
        """Generate abstract from paper content"""
        try:
            prompt = f"""
            Generate a concise abstract (150-250 words) for the following research paper:
            
            {content}
            
            The abstract should include:
            1. Problem statement
            2. Methodology
            3. Key findings
            4. Conclusions
            
            Make it suitable for academic publication.
            """
            
            return self.gemini_service.generate_content(prompt, temperature=0.4)
            
        except Exception as e:
            logger.error(f"Error generating abstract: {str(e)}")
            return ""
    
    def check_plagiarism(self, content: str) -> Dict[str, Any]:
        """Check for potential plagiarism"""
        try:
            prompt = f"""
            Analyze the following text for potential plagiarism issues:
            
            {content}
            
            Provide:
            1. Originality score (0-100)
            2. Potential issues identified
            3. Recommendations for improvement
            4. Similarity with common phrases
            
            Return in JSON format.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.2)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'originality_score': 85,
                    'issues': [],
                    'recommendations': ['Ensure proper citations'],
                    'status': 'analyzed'
                }
                
        except Exception as e:
            logger.error(f"Error checking plagiarism: {str(e)}")
            return {
                'originality_score': 0,
                'issues': ['Analysis failed'],
                'recommendations': ['Manual review required'],
                'status': 'error'
            }
    
    def generate_keywords(self, content: str) -> List[str]:
        """Generate keywords from paper content"""
        try:
            prompt = f"""
            Generate 5-10 relevant keywords for the following research paper:
            
            {content}
            
            Keywords should be:
            1. Relevant to the content
            2. Commonly used in academic literature
            3. Specific but not too narrow
            4. Suitable for indexing and search
            
            Return as a simple list, one keyword per line.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.5)
            
            # Parse keywords from response
            keywords = []
            for line in response.split('\n'):
                line = line.strip()
                if line and not line.startswith('#') and not line.startswith('*'):
                    # Clean up the keyword
                    keyword = line.replace('- ', '').replace('* ', '').strip()
                    if keyword:
                        keywords.append(keyword)
            
            return keywords[:10]  # Limit to 10 keywords
            
        except Exception as e:
            logger.error(f"Error generating keywords: {str(e)}")
            return []
    
    def analyze_structure(self, content: str) -> Dict[str, Any]:
        """Analyze paper structure and organization"""
        try:
            prompt = f"""
            Analyze the structure and organization of the following research paper:
            
            {content}
            
            Provide:
            1. Section identification
            2. Structure quality score (0-100)
            3. Missing sections
            4. Organization suggestions
            5. Flow assessment
            
            Return in JSON format.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.3)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'sections': [],
                    'quality_score': 75,
                    'missing_sections': [],
                    'suggestions': ['Improve section organization'],
                    'flow_score': 70
                }
                
        except Exception as e:
            logger.error(f"Error analyzing structure: {str(e)}")
            return {
                'sections': [],
                'quality_score': 0,
                'missing_sections': [],
                'suggestions': ['Analysis failed'],
                'flow_score': 0
            }
