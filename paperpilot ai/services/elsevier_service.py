import requests
import logging
from typing import Dict, List, Any, Optional
from config.settings import Config

logger = logging.getLogger(__name__)

class ElsevierService:
    """Service for interacting with Elsevier APIs"""
    
    def __init__(self):
        """Initialize Elsevier service"""
        # Use API key directly for testing
        self.api_key = "f5d14c75d68b9f61c473efd71d9bf2b6"
        self.base_url = "https://api.elsevier.com/content"
        self.scopus_base_url = "https://api.elsevier.com/content/search/scopus"
        self.science_direct_base_url = "https://api.elsevier.com/content/search/sciencedirect"
        
        if not self.api_key:
            logger.warning("Elsevier API key not found. Some features may not work.")
    
    def search_scopus(self, query: str, start: int = 0, count: int = 25, 
                      sort: str = "relevance", view: str = "STANDARD") -> Dict[str, Any]:
        """Search Scopus database for papers"""
        try:
            if not self.api_key:
                return self._get_fallback_results(query, count)
            
            # Use the correct Scopus search endpoint with proper headers
            url = self.scopus_base_url
            headers = {
                'Accept': 'application/json',
                'X-ELS-APIKey': self.api_key
            }
            params = {
                'query': query,
                'start': start,
                'count': count,
                'sort': sort,
                'view': view
            }
            
            response = requests.get(url, params=params, headers=headers, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            return self._parse_scopus_results(data)
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Scopus search error: {str(e)}")
            logger.error(f"Request URL: {url}")
            logger.error(f"Request headers: {headers}")
            logger.error(f"Request params: {params}")
            if hasattr(e, 'response') and e.response is not None:
                logger.error(f"Response status: {e.response.status_code}")
                logger.error(f"Response text: {e.response.text[:500]}")
            return self._get_fallback_results(query, count)
        except Exception as e:
            logger.error(f"Unexpected error in Scopus search: {str(e)}")
            return self._get_fallback_results(query, count)
    
    def search_science_direct(self, query: str, start: int = 0, count: int = 25,
                             sort: str = "relevance", view: str = "STANDARD") -> Dict[str, Any]:
        """Search ScienceDirect database for papers"""
        try:
            if not self.api_key:
                return self._get_fallback_results(query, count)
            
            # Use the correct ScienceDirect search endpoint with proper headers
            url = self.science_direct_base_url
            headers = {
                'Accept': 'application/json',
                'X-ELS-APIKey': self.api_key
            }
            params = {
                'query': query,
                'start': start,
                'count': count,
                'sort': sort,
                'view': view
            }
            
            response = requests.get(url, params=params, headers=headers, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            return self._parse_science_direct_results(data)
            
        except requests.exceptions.RequestException as e:
            logger.error(f"ScienceDirect search error: {str(e)}")
            return self._get_fallback_results(query, count)
        except Exception as e:
            logger.error(f"Unexpected error in ScienceDirect search: {str(e)}")
            return self._get_fallback_results(query, count)
    
    def get_abstract(self, scopus_id: str) -> Optional[Dict[str, Any]]:
        """Get abstract details for a specific Scopus ID"""
        try:
            if not self.api_key:
                return None
            
            url = f"{self.base_url}/abstract/scopus_id/{scopus_id}"
            headers = {
                'Accept': 'application/json',
                'X-ELS-APIKey': self.api_key
            }
            params = {
                'view': 'FULL'
            }
            
            response = requests.get(url, params=params, headers=headers, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            return self._parse_abstract_data(data)
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Abstract retrieval error: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error in abstract retrieval: {str(e)}")
            return None
    
    def get_author_details(self, author_id: str) -> Optional[Dict[str, Any]]:
        """Get author details from Scopus"""
        try:
            if not self.api_key:
                return None
            
            url = f"{self.base_url}/author"
            headers = {
                'Accept': 'application/json',
                'X-ELS-APIKey': self.api_key
            }
            params = {
                'author_id': author_id,
                'view': 'ENHANCED'
            }
            
            response = requests.get(url, params=params, headers=headers, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            return self._parse_author_data(data)
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Author details error: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error in author details: {str(e)}")
            return None
    
    def get_citation_metrics(self, scopus_id: str) -> Optional[Dict[str, Any]]:
        """Get citation metrics for a paper"""
        try:
            if not self.api_key:
                return None
            
            url = f"{self.base_url}/abstract/citations"
            headers = {
                'Accept': 'application/json',
                'X-ELS-APIKey': self.api_key
            }
            params = {
                'scopus_id': scopus_id,
                'view': 'STANDARD'
            }
            
            response = requests.get(url, params=params, headers=headers, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            return self._parse_citation_metrics(data)
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Citation metrics error: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error in citation metrics: {str(e)}")
            return None
    
    def _parse_scopus_results(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Parse Scopus search results"""
        try:
            results = []
            search_results = data.get('search-results', {})
            entries = search_results.get('entry', [])
            
            for entry in entries:
                paper = {
                    'title': entry.get('dc:title', 'No title available'),
                    'authors': self._extract_authors(entry),
                    'abstract': entry.get('dc:description', 'No abstract available'),
                    'year': self._extract_year(entry),
                    'venue': entry.get('prism:publicationName', 'Unknown venue'),
                    'doi': entry.get('prism:doi', ''),
                    'scopus_id': entry.get('dc:identifier', '').replace('SCOPUS_ID:', ''),
                    'citations': entry.get('citedby-count', 0),
                    'url': entry.get('link', [{}])[0].get('@href', '') if entry.get('link') else '',
                    'source': 'Scopus',
                    'relevance_score': self._calculate_relevance_score(entry)
                }
                results.append(paper)
            
            return {
                'success': True,
                'results': results,
                'total_found': search_results.get('opensearch:totalResults', len(results)),
                'source': 'Scopus'
            }
            
        except Exception as e:
            logger.error(f"Error parsing Scopus results: {str(e)}")
            return self._get_fallback_results("", len(results) if 'results' in locals() else 0)
    
    def _parse_science_direct_results(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Parse ScienceDirect search results"""
        try:
            results = []
            search_results = data.get('search-results', {})
            entries = search_results.get('entry', [])
            
            for entry in entries:
                paper = {
                    'title': entry.get('dc:title', 'No title available'),
                    'authors': self._extract_authors(entry),
                    'abstract': entry.get('dc:description', 'No abstract available'),
                    'year': self._extract_year(entry),
                    'venue': entry.get('prism:publicationName', 'Unknown venue'),
                    'doi': entry.get('prism:doi', ''),
                    'url': entry.get('link', [{}])[0].get('@href', '') if entry.get('link') else '',
                    'source': 'ScienceDirect',
                    'relevance_score': self._calculate_relevance_score(entry)
                }
                results.append(paper)
            
            return {
                'success': True,
                'results': results,
                'total_found': search_results.get('opensearch:totalResults', len(results)),
                'source': 'ScienceDirect'
            }
            
        except Exception as e:
            logger.error(f"Error parsing ScienceDirect results: {str(e)}")
            return self._get_fallback_results("", len(results) if 'results' in locals() else 0)
    
    def _extract_authors(self, entry: Dict[str, Any]) -> List[str]:
        """Extract author names from entry"""
        try:
            authors = []
            author_list = entry.get('author', [])
            
            if isinstance(author_list, list):
                for author in author_list:
                    if isinstance(author, dict):
                        name = author.get('given-name', '') + ' ' + author.get('surname', '')
                        if name.strip():
                            authors.append(name.strip())
            elif isinstance(author_list, dict):
                name = author_list.get('given-name', '') + ' ' + author_list.get('surname', '')
                if name.strip():
                    authors.append(name.strip())
            
            return authors if authors else ['Unknown Author']
            
        except Exception as e:
            logger.error(f"Error extracting authors: {str(e)}")
            return ['Unknown Author']
    
    def _extract_year(self, entry: Dict[str, Any]) -> int:
        """Extract publication year from entry"""
        try:
            year_str = entry.get('prism:coverDate', '')
            if year_str:
                return int(year_str.split('-')[0])
            return 2024  # Default year
        except Exception:
            return 2024
    
    def _calculate_relevance_score(self, entry: Dict[str, Any]) -> int:
        """Calculate relevance score based on entry data"""
        try:
            score = 50  # Base score
            
            # Increase score for citations
            citations = entry.get('citedby-count', 0)
            if citations > 0:
                score += min(citations // 10, 30)
            
            # Increase score for recent publications
            year = self._extract_year(entry)
            if year >= 2020:
                score += 20
            elif year >= 2015:
                score += 10
            
            return min(score, 100)
            
        except Exception:
            return 50
    
    def _parse_abstract_data(self, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Parse abstract data from API response"""
        try:
            abstract_data = data.get('abstracts-retrieval-response', {})
            if not abstract_data:
                return None
            
            return {
                'title': abstract_data.get('coredata', {}).get('dc:title', ''),
                'abstract': abstract_data.get('coredata', {}).get('dc:description', ''),
                'authors': self._extract_authors_from_abstract(abstract_data),
                'doi': abstract_data.get('coredata', {}).get('prism:doi', ''),
                'year': self._extract_year_from_abstract(abstract_data),
                'venue': abstract_data.get('coredata', {}).get('prism:publicationName', ''),
                'citations': abstract_data.get('coredata', {}).get('citedby-count', 0)
            }
            
        except Exception as e:
            logger.error(f"Error parsing abstract data: {str(e)}")
            return None
    
    def _extract_authors_from_abstract(self, abstract_data: Dict[str, Any]) -> List[str]:
        """Extract authors from abstract data"""
        try:
            authors = []
            author_list = abstract_data.get('authors', {}).get('author', [])
            
            if isinstance(author_list, list):
                for author in author_list:
                    if isinstance(author, dict):
                        name = author.get('given-name', '') + ' ' + author.get('surname', '')
                        if name.strip():
                            authors.append(name.strip())
            
            return authors if authors else ['Unknown Author']
            
        except Exception:
            return ['Unknown Author']
    
    def _extract_year_from_abstract(self, abstract_data: Dict[str, Any]) -> int:
        """Extract year from abstract data"""
        try:
            year_str = abstract_data.get('coredata', {}).get('prism:coverDate', '')
            if year_str:
                return int(year_str.split('-')[0])
            return 2024
        except Exception:
            return 2024
    
    def _parse_author_data(self, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Parse author data from API response"""
        try:
            author_data = data.get('author-retrieval-response', {})
            if not author_data:
                return None
            
            return {
                'name': author_data.get('author-profile', {}).get('author-details', {}).get('preferred-name', {}).get('given-name', '') + ' ' + author_data.get('author-profile', {}).get('author-details', {}).get('preferred-name', {}).get('surname', ''),
                'affiliation': author_data.get('author-profile', {}).get('affiliation-current', {}).get('affiliation', {}).get('ip-doc', {}).get('afdispname', ''),
                'h_index': author_data.get('author-profile', {}).get('h-index', 0),
                'document_count': author_data.get('author-profile', {}).get('document-count', 0),
                'citation_count': author_data.get('author-profile', {}).get('citation-count', 0)
            }
            
        except Exception as e:
            logger.error(f"Error parsing author data: {str(e)}")
            return None
    
    def _parse_citation_metrics(self, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Parse citation metrics from API response"""
        try:
            metrics_data = data.get('abstract-citations-response', {})
            if not metrics_data:
                return None
            
            return {
                'total_citations': metrics_data.get('coredata', {}).get('citedby-count', 0),
                'citations_by_year': metrics_data.get('coredata', {}).get('citedby-count-by-year', []),
                'h_index': metrics_data.get('coredata', {}).get('h-index', 0)
            }
            
        except Exception as e:
            logger.error(f"Error parsing citation metrics: {str(e)}")
            return None
    
    def _get_fallback_results(self, query: str, count: int) -> Dict[str, Any]:
        """Get fallback results when API is not available"""
        logger.warning("Using fallback results - Elsevier API not available")
        
        # Return sample results for demonstration
        sample_results = [
            {
                'title': f'Research Paper on {query}',
                'authors': ['Dr. John Smith', 'Dr. Jane Doe'],
                'abstract': f'This is a sample research paper related to {query}. The paper discusses various aspects and provides insights into the topic.',
                'year': 2024,
                'venue': 'International Journal of Research',
                'doi': '10.1000/sample.doi',
                'citations': 25,
                'url': 'https://example.com/paper.pdf',
                'source': 'Fallback',
                'relevance_score': 75
            }
        ]
        
        return {
            'success': True,
            'results': sample_results[:count],
            'total_found': count,
            'source': 'Fallback (API not available)',
            'message': 'Using fallback results. Please configure Elsevier API key for real search results.'
        }
