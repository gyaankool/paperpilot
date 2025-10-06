import os
import logging
from typing import Dict, Any, Optional
from config.settings import Config

logger = logging.getLogger(__name__)

class TemplateService:
    """Service for handling paper templates and formatting"""
    
    def __init__(self):
        """Initialize template service"""
        self.template_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
        self.conference_template_path = os.path.join(self.template_folder, 'Conference-template-A4 (1).doc')
        
    def get_conference_template_info(self) -> Dict[str, Any]:
        """Get information about the conference template"""
        try:
            if os.path.exists(self.conference_template_path):
                file_size = os.path.getsize(self.conference_template_path)
                return {
                    'template_name': 'Conference Template A4',
                    'template_path': self.conference_template_path,
                    'template_type': 'conference',
                    'file_size': file_size,
                    'format': 'doc',
                    'available': True
                }
            else:
                return {
                    'template_name': 'Conference Template A4',
                    'template_path': self.conference_template_path,
                    'template_type': 'conference',
                    'available': False
                }
        except Exception as e:
            logger.error(f"Error getting template info: {str(e)}")
            return {
                'template_name': 'Conference Template A4',
                'available': False,
                'error': str(e)
            }
    
    def get_conference_formatting_guidelines(self) -> str:
        """Get formatting guidelines based on the conference template"""
        return """
        CONFERENCE PAPER FORMATTING GUIDELINES
        =====================================
        
        Based on the Conference Template A4, papers should follow these guidelines:
        
        1. **Document Structure**:
           - Title (centered, bold, 14pt)
           - Author names and affiliations
           - Abstract (150-250 words)
           - Keywords (3-5 keywords)
           - Introduction
           - Related Work
           - Methodology
           - Results and Analysis
           - Discussion
           - Conclusion
           - References
        
        2. **Formatting Requirements**:
           - Page size: A4
           - Margins: 2.5cm on all sides
           - Font: Times New Roman, 12pt for body text
           - Line spacing: Single or 1.15
           - Paragraph spacing: 6pt after paragraphs
        
        3. **Section Headings**:
           - Level 1: Bold, 12pt, numbered (1., 2., 3.)
           - Level 2: Bold, 12pt, numbered (1.1, 1.2, 1.3)
           - Level 3: Italic, 12pt, numbered (1.1.1, 1.1.2)
        
        4. **Citations and References**:
           - In-text citations: [1], [2], [3]
           - Reference list: Numbered, hanging indent
           - Format: Author, Title, Conference/Journal, Year, Pages
        
        5. **Figures and Tables**:
           - Centered with captions below
           - Figure captions: "Figure 1: Description"
           - Table captions: "Table 1: Description"
           - Referenced in text as "Figure 1" or "Table 1"
        
        6. **Special Requirements**:
           - Page numbers: Bottom center
           - No headers or footers except page numbers
           - Abstract should be self-contained
           - Keywords should be relevant and searchable
        """
    
    def apply_conference_formatting(self, content: str) -> str:
        """Apply conference template formatting to content"""
        try:
            # Get formatting guidelines
            guidelines = self.get_conference_formatting_guidelines()
            
            # Create formatted paper structure
            formatted_paper = f"""
# CONFERENCE PAPER FORMATTING
# Generated using Conference Template A4

{guidelines}

---

# FORMATTED RESEARCH PAPER

{content}

---

# FORMATTING NOTES
- This paper has been formatted according to the Conference Template A4 guidelines
- Please review and adjust formatting as needed for your specific conference requirements
- Ensure all citations follow the specified format
- Verify that figures and tables meet the template requirements
            """
            
            return formatted_paper.strip()
            
        except Exception as e:
            logger.error(f"Error applying conference formatting: {str(e)}")
            return content  # Return original content if formatting fails
    
    def validate_template_compliance(self, content: str) -> Dict[str, Any]:
        """Validate if content complies with conference template"""
        try:
            compliance_report = {
                'compliant': True,
                'issues': [],
                'suggestions': [],
                'score': 100
            }
            
            # Check for required sections
            required_sections = [
                'abstract', 'introduction', 'methodology', 
                'results', 'conclusion', 'references'
            ]
            
            content_lower = content.lower()
            missing_sections = []
            
            for section in required_sections:
                if section not in content_lower:
                    missing_sections.append(section)
            
            if missing_sections:
                compliance_report['compliant'] = False
                compliance_report['issues'].append(f"Missing sections: {', '.join(missing_sections)}")
                compliance_report['score'] -= len(missing_sections) * 10
            
            # Check for abstract length
            if 'abstract' in content_lower:
                abstract_start = content_lower.find('abstract')
                abstract_end = content_lower.find('introduction', abstract_start)
                if abstract_end == -1:
                    abstract_end = content_lower.find('keywords', abstract_start)
                if abstract_end == -1:
                    abstract_end = abstract_start + 500
                
                abstract_text = content[abstract_start:abstract_end]
                word_count = len(abstract_text.split())
                
                if word_count < 150:
                    compliance_report['issues'].append("Abstract too short (should be 150-250 words)")
                    compliance_report['score'] -= 5
                elif word_count > 300:
                    compliance_report['issues'].append("Abstract too long (should be 150-250 words)")
                    compliance_report['score'] -= 5
            
            # Check for citations
            if '[' not in content or ']' not in content:
                compliance_report['issues'].append("No citations found (should use [1], [2] format)")
                compliance_report['score'] -= 10
            
            # Check for references section
            if 'references' not in content_lower:
                compliance_report['issues'].append("No references section found")
                compliance_report['score'] -= 15
            
            # Generate suggestions
            if compliance_report['score'] < 80:
                compliance_report['suggestions'].append("Review and improve paper structure")
            if compliance_report['score'] < 70:
                compliance_report['suggestions'].append("Add missing required sections")
            if compliance_report['score'] < 60:
                compliance_report['suggestions'].append("Ensure proper citation format")
            
            return compliance_report
            
        except Exception as e:
            logger.error(f"Error validating template compliance: {str(e)}")
            return {
                'compliant': False,
                'issues': ['Validation failed'],
                'suggestions': ['Manual review required'],
                'score': 0,
                'error': str(e)
            }

