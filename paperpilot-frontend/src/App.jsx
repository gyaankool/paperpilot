import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { PaperProvider } from "./contexts/PaperContext";
import Footer from "./components/Footer";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import UploadResearch from "./pages/UploadResearch";
import HowItWorks from "./pages/HowItWorks";
import ExportPaper from "./pages/ExportPaper";
import SubmissionMetadata from "./pages/Submission";
import PaperTemplates from "./pages/PaperTemplates";
import ResearchExcellence from "./pages/Research";
import FormatPapersDemo from "./pages/FormatPapers";
import PaperSearch from "./pages/PaperSearch";
import FundingProposalForm from "./pages/FundingProposal";
import ReviewWritingDemo from "./pages/ReviewReport";
import WriteReportsDemo from "./pages/WriteReport";
import AnalyseDataDemo from "./pages/AnalyseData";
import SMTPTestPage from "./pages/SMTPTestPage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to home if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/signup" element={
        <PublicRoute>
          <SignupPage />
        </PublicRoute>
      } />
      
      {/* SMTP Test Route (Public for testing) */}
      <Route path="/smtp-test" element={<SMTPTestPage />} />
      
      {/* Protected Routes */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />
      <Route path="/upload" element={
        <ProtectedRoute>
          <UploadResearch />
        </ProtectedRoute>
      } />
      <Route path="/howItWorks" element={
        <ProtectedRoute>
          <HowItWorks />
        </ProtectedRoute>
      } />
      <Route path="/export" element={
        <ProtectedRoute>
          <ExportPaper />
        </ProtectedRoute>
      } />
      <Route path="/submission" element={
        <ProtectedRoute>
          <SubmissionMetadata />
        </ProtectedRoute>
      } />
      <Route path="/paper" element={
        <ProtectedRoute>
          <PaperTemplates />
        </ProtectedRoute>
      } />
      <Route path="/research" element={
        <ProtectedRoute>
          <ResearchExcellence />
        </ProtectedRoute>
      } />
      <Route path="/paper/format" element={
        <ProtectedRoute>
          <FormatPapersDemo />
        </ProtectedRoute>
      } />
      <Route path="/paper/search" element={
        <ProtectedRoute>
          <PaperSearch />
        </ProtectedRoute>
      } />
      <Route path="/funding" element={
        <ProtectedRoute>
          <FundingProposalForm />
        </ProtectedRoute>
      } />
      <Route path="/review" element={
        <ProtectedRoute>
          <ReviewWritingDemo />
        </ProtectedRoute>
      } />
      <Route path="/write" element={
        <ProtectedRoute>
          <WriteReportsDemo />
        </ProtectedRoute>
      } />
      <Route path="/analyse" element={
        <ProtectedRoute>
          <AnalyseDataDemo />
        </ProtectedRoute>
      } />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <PaperProvider>
        <Router>
          <div className="min-h-screen flex flex-col transition-all duration-300 ease-in-out">
            <main className="flex-1">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;
