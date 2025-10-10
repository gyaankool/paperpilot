// API service for communicating with the PaperPilot backends
const AUTH_API_BASE_URL = 'https://paperpilot-backend.onrender.com/api';  // Express backend for auth/SMTP
const AI_API_BASE_URL = 'https://paperpilot-ai-ih27.onrender.com/api';    // Flask backend for AI services

class ApiService {
  constructor() {
    this.authBaseURL = AUTH_API_BASE_URL;
    this.aiBaseURL = AI_API_BASE_URL;
  }

  // Generic request method for auth endpoints
  async authRequest(endpoint, options = {}) {
    const url = `${this.authBaseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Auth API request failed:', error);
      throw error;
    }
  }

  // Generic request method for AI endpoints
  async aiRequest(endpoint, options = {}) {
    const url = `${this.aiBaseURL}${endpoint}`;
    
    // Get JWT token from localStorage
    const token = localStorage.getItem('authToken');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header for AI backend
        ...(token && { 'Authorization': `Bearer mock_token_${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('AI API request failed:', error);
      throw error;
    }
  }

  // Email verification methods
  async sendVerificationEmail(email, userName = null) {
    return this.authRequest('/auth/send-verification', {
      method: 'POST',
      body: JSON.stringify({ email, userName }),
    });
  }

  async verifyEmail(email, code) {
    return this.authRequest('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  }

  // Password reset methods
  async sendPasswordReset(email, userName = null) {
    return this.authRequest('/auth/send-password-reset', {
      method: 'POST',
      body: JSON.stringify({ email, userName }),
    });
  }

  async verifyPasswordReset(email, code) {
    return this.authRequest('/auth/verify-password-reset', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  }

  // Custom email method
  async sendCustomEmail(to, subject, html, fromName = 'PaperPilot') {
    return this.authRequest('/auth/send-custom-email', {
      method: 'POST',
      body: JSON.stringify({ to, subject, html, fromName }),
    });
  }

  // Authentication methods
  async login(email, password) {
    return this.authRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(email, password, name) {
    return this.authRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  // File upload methods
  async uploadFile(file, fileType = 'base') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', fileType);

    // Get JWT token from localStorage
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${this.aiBaseURL}/upload`, {
      method: 'POST',
      headers: {
        // Add authorization header for AI backend
        ...(token && { 'Authorization': `Bearer mock_token_${token}` }),
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    return data;
  }

  async deleteFile(fileId) {
    return this.aiRequest(`/files/${fileId}`, {
      method: 'DELETE',
    });
  }

  async processPapers(fileIds, processingType = 'format') {
    return this.aiRequest('/papers/process', {
      method: 'POST',
      body: JSON.stringify({ file_ids: fileIds, type: processingType }),
    });
  }

  async processPapersEnhanced(fileIds, formatType = 'conference') {
    return this.aiRequest('/papers/process', {
      method: 'POST',
      body: JSON.stringify({ file_ids: fileIds, type: 'enhanced', format_type: formatType }),
    });
  }

  async validatePaperQuality(paperData) {
    return this.aiRequest('/papers/validate-quality', {
      method: 'POST',
      body: JSON.stringify({ paper_data: paperData }),
    });
  }

  async checkPlagiarism(content) {
    return this.aiRequest('/papers/check-plagiarism', {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  // AI Paper Processing methods
  async formatPaper(content, formatType = 'ieee') {
    return this.aiRequest('/papers/format', {
      method: 'POST',
      body: JSON.stringify({ content, format_type: formatType }),
    });
  }

  async searchPapers(query, filters = {}, limit = 10) {
    return this.aiRequest('/search/papers', {
      method: 'POST',
      body: JSON.stringify({ query, filters, limit }),
    });
  }

  async analyzeData(dataset, analysisType = 'statistical') {
    return this.aiRequest('/analyze/data', {
      method: 'POST',
      body: JSON.stringify({ dataset, analysis_type: analysisType }),
    });
  }

  async generateProposal(requirements) {
    return this.aiRequest('/proposals/generate', {
      method: 'POST',
      body: JSON.stringify(requirements),
    });
  }

  async generateReport(reportData) {
    return this.aiRequest('/reports/generate', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  }

  async reviewWriting(text, reviewType = 'comprehensive') {
    return this.aiRequest('/review/writing', {
      method: 'POST',
      body: JSON.stringify({ text, type: reviewType }),
    });
  }

  async exportPaper(content, format = 'pdf', filename = 'paper') {
    // Get JWT token from localStorage
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${this.aiBaseURL}/export/paper`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header for AI backend
        ...(token && { 'Authorization': `Bearer mock_token_${token}` }),
      },
      body: JSON.stringify({ content, format, filename }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // Handle file download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${format}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return { success: true, message: 'File downloaded successfully' };
  }

  async generateSubmissionMetadata(paperData) {
    return this.aiRequest('/export/metadata', {
      method: 'POST',
      body: JSON.stringify({ paper_data: paperData }),
    });
  }

  async getTemplateInfo() {
    return this.aiRequest('/template/info', {
      method: 'GET',
    });
  }

  // Health check methods
  async checkServerHealth() {
    return this.authRequest('/health', {
      method: 'GET',
    });
  }

  async getGeminiStatus() {
    return this.aiRequest('/gemini/status', {
      method: 'GET',
    });
  }

  async checkSMTPHealth() {
    return this.authRequest('/smtp-health', {
      method: 'GET',
    });
  }

  async getSMTPStatus() {
    return this.authRequest('/auth/smtp-status', {
      method: 'GET',
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

