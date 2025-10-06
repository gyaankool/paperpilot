import React from 'react';
import { CheckCircle, AlertCircle, XCircle, FileText, Shield, TrendingUp } from 'lucide-react';

const QualityReport = ({ paperData, onClose }) => {
  if (!paperData) return null;

  const qualityReport = paperData.quality_report || {};
  const plagiarismReport = paperData.plagiarism_report || {};
  const validation = paperData.validation || {};

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 60) return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  const getStatusColor = (passed) => {
    return passed ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Research Paper Quality Report</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Overall Status */}
          <div className={`p-4 rounded-lg border ${getStatusColor(validation.overall_passed)}`}>
            <div className="flex items-center gap-3 mb-2">
              {validation.overall_passed ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <XCircle className="w-6 h-6" />
              )}
              <h3 className="text-lg font-semibold">
                {validation.overall_passed ? 'Quality Standards Met' : 'Quality Issues Detected'}
              </h3>
            </div>
            <p className="text-sm">
              {validation.overall_passed 
                ? 'Your research paper meets all quality standards and is ready for submission.'
                : 'Your research paper needs improvements before submission.'
              }
            </p>
          </div>

          {/* Quality Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Quality */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-800">Overall Quality</h4>
              </div>
              <div className="flex items-center gap-3">
                {getScoreIcon(qualityReport.overall_score || 0)}
                <span className={`text-2xl font-bold ${getScoreColor(qualityReport.overall_score || 0)}`}>
                  {qualityReport.overall_score || 0}/100
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Minimum required: 80/100
              </p>
            </div>

            {/* Originality Score */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-800">Originality</h4>
              </div>
              <div className="flex items-center gap-3">
                {getScoreIcon(plagiarismReport.originality_score || 0)}
                <span className={`text-2xl font-bold ${getScoreColor(plagiarismReport.originality_score || 0)}`}>
                  {plagiarismReport.originality_score || 0}%
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Minimum required: 85%
              </p>
            </div>
          </div>

          {/* Detailed Quality Breakdown */}
          {qualityReport.scores && (
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-4">Quality Breakdown</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(qualityReport.scores).map(([category, score]) => (
                  <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {category.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-2">
                      {getScoreIcon(score)}
                      <span className={`font-semibold ${getScoreColor(score)}`}>
                        {score}/100
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Plagiarism Analysis */}
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-800">Plagiarism Analysis</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-lg font-semibold text-gray-800">
                  {plagiarismReport.plagiarism_risk || 'Unknown'}
                </div>
                <div className="text-sm text-gray-600">Risk Level</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-lg font-semibold text-gray-800">
                  {plagiarismReport.similarity_analysis?.common_phrases || 0}
                </div>
                <div className="text-sm text-gray-600">Common Phrases</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-lg font-semibold text-gray-800">
                  {plagiarismReport.similarity_analysis?.citation_coverage || 0}%
                </div>
                <div className="text-sm text-gray-600">Citation Coverage</div>
              </div>
            </div>

            {plagiarismReport.issues_found && plagiarismReport.issues_found.length > 0 && (
              <div className="mb-4">
                <h5 className="font-medium text-gray-800 mb-2">Issues Found:</h5>
                <ul className="list-disc list-inside space-y-1">
                  {plagiarismReport.issues_found.map((issue, index) => (
                    <li key={index} className="text-sm text-gray-600">{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Recommendations */}
          {(validation.recommendations && validation.recommendations.length > 0) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-3">Recommendations for Improvement</h4>
              <ul className="space-y-2">
                {validation.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-yellow-700">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Paper Statistics */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-3">Paper Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-800">
                  {paperData.word_count || 0}
                </div>
                <div className="text-sm text-blue-600">Words</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-800">
                  {paperData.page_count || 0}
                </div>
                <div className="text-sm text-blue-600">Pages</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-800">
                  {paperData.base_papers_count || 0}
                </div>
                <div className="text-sm text-blue-600">Base Papers</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-800">
                  {paperData.reference_papers_count || 0}
                </div>
                <div className="text-sm text-blue-600">References</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              // You can add functionality to download the quality report
              console.log('Download quality report');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default QualityReport;

