import logging
from typing import Dict, List, Any
from services.gemini_service import GeminiService

logger = logging.getLogger(__name__)

class AnalysisService:
    """Service for data analysis and statistical processing"""
    
    def __init__(self, gemini_service: GeminiService):
        """Initialize analysis service"""
        self.gemini_service = gemini_service
    
    def analyze_papers(self, file_ids: List[str]) -> Dict[str, Any]:
        """Analyze multiple papers for insights"""
        try:
            analysis_results = []
            
            for file_id in file_ids:
                # Get file content (simplified for demo)
                # In real implementation, you'd get actual file content
                content = f"Paper content for file {file_id}"
                
                # Perform analysis
                analysis = self.analyze_content(content)
                analysis_results.append({
                    'file_id': file_id,
                    'analysis': analysis
                })
            
            return {
                'analyses': analysis_results,
                'total_papers': len(analysis_results),
                'summary': self._generate_analysis_summary(analysis_results)
            }
            
        except Exception as e:
            logger.error(f"Error analyzing papers: {str(e)}")
            raise
    
    def analyze_dataset(self, dataset: Dict[str, Any], analysis_type: str = 'statistical') -> Dict[str, Any]:
        """Analyze research dataset"""
        try:
            return self.gemini_service.analyze_data(dataset, analysis_type)
        except Exception as e:
            logger.error(f"Error analyzing dataset: {str(e)}")
            raise
    
    def analyze_content(self, content: str) -> Dict[str, Any]:
        """Analyze paper content for insights"""
        try:
            prompt = f"""
            Analyze the following research paper content and provide insights:
            
            {content}
            
            Provide:
            1. Research methodology identified
            2. Key findings summary
            3. Statistical methods used
            4. Data quality assessment
            5. Research gaps identified
            6. Contribution to field
            7. Limitations mentioned
            8. Future work suggestions
            
            Return in JSON format.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.4)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'methodology': 'Not identified',
                    'findings': 'Analysis incomplete',
                    'statistical_methods': [],
                    'data_quality': 'Unknown',
                    'gaps': [],
                    'contribution': 'Not assessed',
                    'limitations': [],
                    'future_work': []
                }
                
        except Exception as e:
            logger.error(f"Error analyzing content: {str(e)}")
            return {
                'error': str(e),
                'status': 'failed'
            }
    
    def perform_statistical_analysis(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Perform statistical analysis on data"""
        try:
            prompt = f"""
            Perform comprehensive statistical analysis on the following dataset:
            
            {data}
            
            Include:
            1. Descriptive statistics (mean, median, std, etc.)
            2. Distribution analysis
            3. Correlation analysis
            4. Hypothesis testing
            5. Confidence intervals
            6. Effect sizes
            7. Statistical significance
            8. Visualization recommendations
            
            Return in JSON format with numerical results where applicable.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.2)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'descriptive_stats': {},
                    'correlations': {},
                    'significance_tests': {},
                    'recommendations': ['Manual statistical analysis recommended']
                }
                
        except Exception as e:
            logger.error(f"Error in statistical analysis: {str(e)}")
            return {
                'error': str(e),
                'status': 'failed'
            }
    
    def detect_trends(self, time_series_data: Dict[str, Any]) -> Dict[str, Any]:
        """Detect trends in time series data"""
        try:
            prompt = f"""
            Analyze the following time series data for trends:
            
            {time_series_data}
            
            Identify:
            1. Overall trend direction
            2. Seasonal patterns
            3. Cyclical components
            4. Trend significance
            5. Breakpoints or changes
            6. Forecasting recommendations
            7. Confidence in trend detection
            
            Return in JSON format.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.3)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'trend_direction': 'unknown',
                    'seasonal_patterns': [],
                    'significance': 'not assessed',
                    'forecast': 'not available'
                }
                
        except Exception as e:
            logger.error(f"Error detecting trends: {str(e)}")
            return {
                'error': str(e),
                'status': 'failed'
            }
    
    def analyze_correlations(self, variables: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze correlations between variables"""
        try:
            prompt = f"""
            Analyze correlations between the following variables:
            
            {variables}
            
            Provide:
            1. Correlation matrix
            2. Strong correlations (|r| > 0.7)
            3. Moderate correlations (0.3 < |r| < 0.7)
            4. Statistical significance
            5. Interpretation of relationships
            6. Causation considerations
            7. Recommendations for further analysis
            
            Return in JSON format.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.3)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'correlation_matrix': {},
                    'strong_correlations': [],
                    'moderate_correlations': [],
                    'interpretations': []
                }
                
        except Exception as e:
            logger.error(f"Error analyzing correlations: {str(e)}")
            return {
                'error': str(e),
                'status': 'failed'
            }
    
    def generate_insights(self, analysis_results: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Generate insights from analysis results"""
        try:
            prompt = f"""
            Generate key insights from the following analysis results:
            
            {analysis_results}
            
            Provide:
            1. Key findings summary
            2. Important patterns identified
            3. Statistical significance highlights
            4. Practical implications
            5. Research recommendations
            6. Limitations of analysis
            7. Next steps suggested
            
            Return in JSON format.
            """
            
            response = self.gemini_service.generate_content(prompt, temperature=0.5)
            
            import json
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    'key_findings': ['Analysis completed'],
                    'patterns': [],
                    'implications': [],
                    'recommendations': []
                }
                
        except Exception as e:
            logger.error(f"Error generating insights: {str(e)}")
            return {
                'error': str(e),
                'status': 'failed'
            }
    
    def _generate_analysis_summary(self, analysis_results: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Generate summary of multiple analyses"""
        try:
            total_papers = len(analysis_results)
            
            # Extract common themes
            all_methodologies = []
            all_findings = []
            
            for result in analysis_results:
                analysis = result.get('analysis', {})
                if 'methodology' in analysis:
                    all_methodologies.append(analysis['methodology'])
                if 'findings' in analysis:
                    all_findings.append(analysis['findings'])
            
            return {
                'total_papers_analyzed': total_papers,
                'common_methodologies': list(set(all_methodologies)),
                'key_themes': all_findings[:5],  # Top 5 findings
                'analysis_quality': 'high' if total_papers > 0 else 'low'
            }
            
        except Exception as e:
            logger.error(f"Error generating analysis summary: {str(e)}")
            return {
                'total_papers_analyzed': 0,
                'common_methodologies': [],
                'key_themes': [],
                'analysis_quality': 'unknown'
            }
