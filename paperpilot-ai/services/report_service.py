import logging
from typing import Dict, Any
from services.gemini_service import GeminiService

logger = logging.getLogger(__name__)

class ReportService:
    """Service for generating research reports"""
    
    def __init__(self, gemini_service: GeminiService):
        """Initialize report service"""
        self.gemini_service = gemini_service
    
    def generate_report(self, report_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate research report"""
        try:
            return self.gemini_service.generate_report(report_data)
        except Exception as e:
            logger.error(f"Error generating report: {str(e)}")
            raise
    
    def generate_executive_summary(self, content: str) -> str:
        """Generate executive summary from report content"""
        try:
            prompt = f"""
            Generate a concise executive summary (200-300 words) for the following research report:
            
            {content}
            
            The executive summary should:
            1. Highlight key findings
            2. Summarize main conclusions
            3. Present important recommendations
            4. Include critical metrics
            5. Be suitable for decision-makers
            
            Make it clear, compelling, and actionable.
            """
            
            return self.gemini_service.generate_content(prompt, temperature=0.4)
            
        except Exception as e:
            logger.error(f"Error generating executive summary: {str(e)}")
            return "Executive summary generation failed. Please provide manual input."
    
    def generate_data_visualization_suggestions(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate suggestions for data visualization"""
        try:
            prompt = f"""
            Analyze the following data and suggest appropriate visualizations:
            
            {data}
            
            Provide:
            1. Recommended chart types
            2. Data mapping suggestions
            3. Color schemes
            4. Layout recommendations
            5. Interactive features
            6. Accessibility considerations
            
            Return in JSON format with specific recommendations.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.5)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'chart_types': ['bar', 'line', 'pie'],
                    'recommendations': ['Use clear labels', 'Choose appropriate colors'],
                    'interactive_features': ['hover effects', 'zoom capability']
                }
                
        except Exception as e:
            logger.error(f"Error generating visualization suggestions: {str(e)}")
            return {
                'error': str(e),
                'status': 'failed'
            }
    
    def generate_recommendations(self, findings: str, context: str) -> list:
        """Generate actionable recommendations"""
        try:
            prompt = f"""
            Generate actionable recommendations based on the following findings and context:
            
            Findings: {findings}
            Context: {context}
            
            Provide:
            1. Immediate actions (next 30 days)
            2. Short-term goals (3-6 months)
            3. Long-term strategies (6-12 months)
            4. Resource requirements
            5. Success metrics
            6. Risk considerations
            
            Make recommendations specific, measurable, and achievable.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.6)
            
            # Parse recommendations from response
            recommendations = []
            lines = response.split('\n')
            
            for line in lines:
                line = line.strip()
                if line and (line.startswith(('1.', '2.', '3.', '4.', '5.', '6.')) or 
                           any(keyword in line.lower() for keyword in ['recommend', 'suggest', 'should', 'consider'])):
                    recommendations.append(line)
            
            return recommendations[:10]  # Limit to 10 recommendations
            
        except Exception as e:
            logger.error(f"Error generating recommendations: {str(e)}")
            return ["Recommendation generation failed. Please provide manual input."]
    
    def format_report_section(self, content: str, section_type: str) -> str:
        """Format specific report section"""
        try:
            section_prompts = {
                'introduction': """
                Format the following content as an introduction section:
                
                {content}
                
                Ensure it includes:
                1. Background information
                2. Problem statement
                3. Objectives
                4. Scope and limitations
                5. Report structure overview
                """,
                
                'methodology': """
                Format the following content as a methodology section:
                
                {content}
                
                Ensure it includes:
                1. Research approach
                2. Data collection methods
                3. Analysis techniques
                4. Tools and technologies used
                5. Quality assurance measures
                """,
                
                'results': """
                Format the following content as a results section:
                
                {content}
                
                Ensure it includes:
                1. Clear presentation of findings
                2. Data organization
                3. Key metrics and statistics
                4. Visual elements description
                5. Objective reporting
                """,
                
                'conclusion': """
                Format the following content as a conclusion section:
                
                {content}
                
                Ensure it includes:
                1. Summary of key findings
                2. Implications of results
                3. Limitations acknowledged
                4. Future work suggestions
                5. Final recommendations
                """
            }
            
            if section_type not in section_prompts:
                return content  # Return original content if section type not supported
            
            prompt = section_prompts[section_type].format(content=content)
            return self.gemini_service.generate_content(prompt, temperature=0.3)
            
        except Exception as e:
            logger.error(f"Error formatting report section: {str(e)}")
            return content  # Return original content on error
    
    def generate_report_metadata(self, report_content: str) -> Dict[str, Any]:
        """Generate metadata for report"""
        try:
            prompt = f"""
            Generate metadata for the following research report:
            
            {report_content}
            
            Provide:
            1. Report type classification
            2. Key topics and themes
            3. Target audience
            4. Complexity level
            5. Estimated reading time
            6. Key statistics mentioned
            7. Geographic scope (if applicable)
            8. Time period covered
            
            Return in JSON format.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.3)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'report_type': 'research',
                    'topics': ['research', 'analysis'],
                    'target_audience': 'researchers',
                    'complexity': 'intermediate',
                    'reading_time': '15 minutes',
                    'key_stats': [],
                    'geographic_scope': 'global',
                    'time_period': 'current'
                }
                
        except Exception as e:
            logger.error(f"Error generating report metadata: {str(e)}")
            return {
                'error': str(e),
                'status': 'failed'
            }
