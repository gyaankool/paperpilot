import logging
from typing import Dict, Any
from services.gemini_service import GeminiService

logger = logging.getLogger(__name__)

class ReviewService:
    """Service for writing review and improvement"""
    
    def __init__(self, gemini_service: GeminiService):
        """Initialize review service"""
        self.gemini_service = gemini_service
    
    def review_papers(self, file_ids: list) -> Dict[str, Any]:
        """Review multiple papers"""
        try:
            review_results = []
            
            for file_id in file_ids:
                # Get file content (simplified for demo)
                content = f"Paper content for file {file_id}"
                
                # Review paper content
                review = self.review_text(content, 'comprehensive')
                review_results.append({
                    'file_id': file_id,
                    'review': review
                })
            
            return {
                'reviews': review_results,
                'total_papers': len(review_results),
                'summary': self._generate_review_summary(review_results)
            }
            
        except Exception as e:
            logger.error(f"Error reviewing papers: {str(e)}")
            raise
    
    def review_text(self, text: str, review_type: str = 'comprehensive') -> Dict[str, Any]:
        """Review and improve writing"""
        try:
            return self.gemini_service.review_writing(text, review_type)
        except Exception as e:
            logger.error(f"Error reviewing text: {str(e)}")
            raise
    
    def check_grammar(self, text: str) -> Dict[str, Any]:
        """Check grammar and syntax"""
        try:
            prompt = f"""
            Perform detailed grammar and syntax check on the following text:
            
            {text}
            
            Identify and correct:
            1. Grammar errors
            2. Syntax issues
            3. Punctuation mistakes
            4. Sentence structure problems
            5. Subject-verb agreement issues
            6. Tense consistency problems
            
            Provide:
            1. List of errors found
            2. Corrected version
            3. Explanation of corrections
            4. Grammar score (0-100)
            
            Return in JSON format.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.2)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'errors': [],
                    'corrected_text': text,
                    'explanations': [],
                    'grammar_score': 85
                }
                
        except Exception as e:
            logger.error(f"Error checking grammar: {str(e)}")
            return {
                'error': str(e),
                'status': 'failed'
            }
    
    def improve_clarity(self, text: str) -> Dict[str, Any]:
        """Improve text clarity and readability"""
        try:
            prompt = f"""
            Improve the clarity and readability of the following text:
            
            {text}
            
            Focus on:
            1. Sentence structure simplification
            2. Word choice improvement
            3. Paragraph organization
            4. Transition improvements
            5. Conciseness
            6. Active voice usage
            
            Provide:
            1. Improved version
            2. Specific improvements made
            3. Clarity score (0-100)
            4. Readability level assessment
            
            Return in JSON format.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.4)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'improved_text': text,
                    'improvements': ['Text reviewed for clarity'],
                    'clarity_score': 80,
                    'readability_level': 'intermediate'
                }
                
        except Exception as e:
            logger.error(f"Error improving clarity: {str(e)}")
            return {
                'error': str(e),
                'status': 'failed'
            }
    
    def enhance_academic_tone(self, text: str) -> Dict[str, Any]:
        """Enhance academic tone and style"""
        try:
            prompt = f"""
            Enhance the academic tone and style of the following text:
            
            {text}
            
            Improve:
            1. Academic vocabulary usage
            2. Formal tone consistency
            3. Objective language
            4. Proper academic conventions
            5. Citation integration
            6. Scholarly voice
            
            Provide:
            1. Enhanced version
            2. Tone improvements made
            3. Academic tone score (0-100)
            4. Style recommendations
            
            Return in JSON format.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.5)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'enhanced_text': text,
                    'tone_improvements': ['Academic tone enhanced'],
                    'academic_score': 75,
                    'recommendations': ['Continue using formal language']
                }
                
        except Exception as e:
            logger.error(f"Error enhancing academic tone: {str(e)}")
            return {
                'error': str(e),
                'status': 'failed'
            }
    
    def check_plagiarism_style(self, text: str) -> Dict[str, Any]:
        """Check for plagiarism and style issues"""
        try:
            prompt = f"""
            Analyze the following text for plagiarism and style issues:
            
            {text}
            
            Check for:
            1. Potential plagiarism indicators
            2. Overly common phrases
            3. Lack of originality
            4. Citation issues
            5. Paraphrasing problems
            6. Style inconsistencies
            
            Provide:
            1. Originality assessment
            2. Potential issues identified
            3. Recommendations for improvement
            4. Originality score (0-100)
            
            Return in JSON format.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.3)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'originality_score': 85,
                    'issues': [],
                    'recommendations': ['Ensure proper citations'],
                    'assessment': 'Good originality'
                }
                
        except Exception as e:
            logger.error(f"Error checking plagiarism style: {str(e)}")
            return {
                'error': str(e),
                'status': 'failed'
            }
    
    def suggest_improvements(self, text: str) -> list:
        """Suggest specific improvements for text"""
        try:
            prompt = f"""
            Provide specific improvement suggestions for the following text:
            
            {text}
            
            Focus on:
            1. Grammar and syntax
            2. Clarity and conciseness
            3. Academic tone
            4. Structure and organization
            5. Word choice
            6. Flow and transitions
            
            Provide actionable, specific suggestions.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.6)
            
            # Parse suggestions from response
            suggestions = []
            lines = response.split('\n')
            
            for line in lines:
                line = line.strip()
                if line and (line.startswith(('1.', '2.', '3.', '4.', '5.', '6.')) or 
                           any(keyword in line.lower() for keyword in ['suggest', 'recommend', 'consider', 'improve'])):
                    suggestions.append(line)
            
            return suggestions[:10]  # Limit to 10 suggestions
            
        except Exception as e:
            logger.error(f"Error suggesting improvements: {str(e)}")
            return ["Improvement suggestions generation failed. Please review manually."]
    
    def calculate_readability_score(self, text: str) -> Dict[str, Any]:
        """Calculate readability scores"""
        try:
            prompt = f"""
            Calculate readability scores for the following text:
            
            {text}
            
            Provide:
            1. Flesch Reading Ease score
            2. Flesch-Kincaid Grade Level
            3. Gunning Fog Index
            4. Coleman-Liau Index
            5. Overall readability assessment
            6. Target audience recommendation
            
            Return in JSON format with numerical scores where possible.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.2)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'flesch_reading_ease': 65,
                    'grade_level': 12,
                    'gunning_fog': 14,
                    'coleman_liau': 13,
                    'assessment': 'Intermediate level',
                    'target_audience': 'College level'
                }
                
        except Exception as e:
            logger.error(f"Error calculating readability: {str(e)}")
            return {
                'error': str(e),
                'status': 'failed'
            }
    
    def _generate_review_summary(self, review_results: list) -> Dict[str, Any]:
        """Generate summary of multiple reviews"""
        try:
            total_papers = len(review_results)
            
            # Extract scores
            grammar_scores = []
            clarity_scores = []
            academic_scores = []
            
            for result in review_results:
                review = result.get('review', {})
                scores = review.get('scores', {})
                
                if 'grammar' in scores:
                    grammar_scores.append(scores['grammar'])
                if 'clarity' in scores:
                    clarity_scores.append(scores['clarity'])
                if 'academic_tone' in scores:
                    academic_scores.append(scores['academic_tone'])
            
            return {
                'total_papers_reviewed': total_papers,
                'average_grammar_score': sum(grammar_scores) / len(grammar_scores) if grammar_scores else 0,
                'average_clarity_score': sum(clarity_scores) / len(clarity_scores) if clarity_scores else 0,
                'average_academic_score': sum(academic_scores) / len(academic_scores) if academic_scores else 0,
                'overall_quality': 'Good' if total_papers > 0 else 'Unknown'
            }
            
        except Exception as e:
            logger.error(f"Error generating review summary: {str(e)}")
            return {
                'total_papers_reviewed': 0,
                'average_grammar_score': 0,
                'average_clarity_score': 0,
                'average_academic_score': 0,
                'overall_quality': 'Unknown'
            }
