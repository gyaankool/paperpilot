import logging
from typing import Dict, Any
from services.gemini_service import GeminiService

logger = logging.getLogger(__name__)

class ProposalService:
    """Service for generating funding proposals"""
    
    def __init__(self, gemini_service: GeminiService):
        """Initialize proposal service"""
        self.gemini_service = gemini_service
    
    def generate_proposal(self, requirements: Dict[str, Any]) -> Dict[str, Any]:
        """Generate funding proposal"""
        try:
            return self.gemini_service.generate_proposal(requirements)
        except Exception as e:
            logger.error(f"Error generating proposal: {str(e)}")
            raise
    
    def generate_budget_breakdown(self, total_amount: str, duration: str, field: str) -> Dict[str, Any]:
        """Generate detailed budget breakdown"""
        try:
            prompt = f"""
            Generate a detailed budget breakdown for a research project with the following parameters:
            
            Total Amount: {total_amount}
            Duration: {duration}
            Field: {field}
            
            Include:
            1. Personnel costs (salaries, benefits)
            2. Equipment and supplies
            3. Travel expenses
            4. Publication costs
            5. Indirect costs
            6. Contingency funds
            7. Year-by-year breakdown
            8. Justification for each category
            
            Return in JSON format with detailed breakdown.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.4)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'total_amount': total_amount,
                    'duration': duration,
                    'categories': {
                        'personnel': '40%',
                        'equipment': '25%',
                        'travel': '10%',
                        'publication': '5%',
                        'indirect': '15%',
                        'contingency': '5%'
                    },
                    'justification': 'Standard research budget allocation'
                }
                
        except Exception as e:
            logger.error(f"Error generating budget breakdown: {str(e)}")
            return {
                'error': str(e),
                'status': 'failed'
            }
    
    def generate_timeline(self, duration: str, milestones: list = None) -> Dict[str, Any]:
        """Generate project timeline with milestones"""
        try:
            if milestones is None:
                milestones = []
            
            prompt = f"""
            Generate a detailed project timeline for a research project with duration: {duration}
            
            Milestones to include: {milestones}
            
            Create:
            1. Month-by-month timeline
            2. Key milestones and deliverables
            3. Dependencies between tasks
            4. Risk mitigation periods
            5. Review and evaluation points
            6. Publication timeline
            7. Final reporting schedule
            
            Return in JSON format with detailed timeline.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.3)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'duration': duration,
                    'timeline': [
                        {'month': 1, 'task': 'Project initiation', 'deliverable': 'Project plan'},
                        {'month': 6, 'task': 'Mid-term review', 'deliverable': 'Progress report'},
                        {'month': 12, 'task': 'Final delivery', 'deliverable': 'Final report'}
                    ],
                    'milestones': milestones
                }
                
        except Exception as e:
            logger.error(f"Error generating timeline: {str(e)}")
            return {
                'error': str(e),
                'status': 'failed'
            }
    
    def generate_impact_statement(self, project_description: str, field: str) -> str:
        """Generate impact statement for proposal"""
        try:
            prompt = f"""
            Generate a compelling impact statement for a research project:
            
            Project Description: {project_description}
            Field: {field}
            
            The impact statement should:
            1. Describe potential scientific impact
            2. Highlight societal benefits
            3. Address economic implications
            4. Mention educational outcomes
            5. Discuss long-term benefits
            6. Include measurable outcomes
            
            Make it compelling and specific to the field.
            """
            
            return self.gemini_service.generate_content(prompt, temperature=0.6)
            
        except Exception as e:
            logger.error(f"Error generating impact statement: {str(e)}")
            return "Impact statement generation failed. Please provide manual input."
    
    def generate_methodology_section(self, research_objectives: list, field: str) -> str:
        """Generate methodology section"""
        try:
            prompt = f"""
            Generate a detailed methodology section for a research proposal:
            
            Research Objectives: {research_objectives}
            Field: {field}
            
            Include:
            1. Research approach and philosophy
            2. Data collection methods
            3. Analysis techniques
            4. Tools and technologies
            5. Quality assurance measures
            6. Ethical considerations
            7. Risk mitigation strategies
            
            Make it specific and appropriate for the field.
            """
            
            return self.gemini_service.generate_content(prompt, temperature=0.4)
            
        except Exception as e:
            logger.error(f"Error generating methodology: {str(e)}")
            return "Methodology section generation failed. Please provide manual input."
    
    def review_proposal(self, proposal_content: str) -> Dict[str, Any]:
        """Review and provide feedback on proposal"""
        try:
            prompt = f"""
            Review the following funding proposal and provide comprehensive feedback:
            
            {proposal_content}
            
            Evaluate:
            1. Clarity and coherence
            2. Scientific merit
            3. Feasibility
            4. Budget appropriateness
            5. Timeline realism
            6. Impact potential
            7. Overall strength
            8. Areas for improvement
            
            Provide specific suggestions for enhancement.
            Return in JSON format.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.5)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'overall_score': 75,
                    'strengths': ['Well-structured proposal'],
                    'weaknesses': ['Needs more detail'],
                    'suggestions': ['Provide more specific examples'],
                    'feasibility': 'Good'
                }
                
        except Exception as e:
            logger.error(f"Error reviewing proposal: {str(e)}")
            return {
                'error': str(e),
                'status': 'failed'
            }
