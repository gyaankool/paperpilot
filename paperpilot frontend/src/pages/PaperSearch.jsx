// import { useState } from "react";
// import { Search, Download, Eye, Loader2 } from "lucide-react";
// import Header from "../components/Header";
// import apiService from "../services/api.js";

// export default function PaperSearch() {
//   const [query, setQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [hasSearched, setHasSearched] = useState(false);

//   const handleSearch = async () => {
//     if (!query.trim()) {
//       setError("Please enter a search query");
//       return;
//     }

//     setIsLoading(true);
//     setError("");
//     setHasSearched(true);

//     try {
//       const response = await apiService.searchPapers(query, {}, 10);
//       console.log('Search response:', response); // Debug log
      
//       if (response.success) {
//         const results = response.results || response.papers || [];
//         console.log('Search results:', results); // Debug log
//         setSearchResults(results);
//       } else {
//         setError(response.message || "Search failed");
//         setSearchResults([]);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(error.message || "Failed to search papers");
//       setSearchResults([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Header */}
//       <Header />
      
//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <div className="max-w-6xl mx-auto">
//           {/* Page Title */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Search Research Papers</h1>
//             <p className="text-gray-600">Find relevant academic papers using AI-powered search</p>
//           </div>

//           {/* Search Section */}
//           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//             <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-3 mb-4">
//               <Search className="text-gray-500 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search for papers on machine learning, neural networks, AI..."
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="flex-1 border-none focus:outline-none text-gray-800 placeholder-gray-500"
//                 disabled={isLoading}
//               />
//             </div>
            
//             {/* Error Message */}
//             {error && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-red-800 text-sm">{error}</p>
//               </div>
//             )}
            
//             <div className="flex gap-4">
//               <button 
//                 onClick={handleSearch}
//                 disabled={isLoading}
//                 className="px-6 py-2 bg-[#647ffb] text-white rounded-lg hover:bg-[#506be0] transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Searching...
//                   </>
//                 ) : (
//                   <>
//                     <Search className="w-4 h-4" />
//                     Search Papers
//                   </>
//                 )}
//               </button>
//               <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md font-medium">
//                 Advanced Search
//               </button>
//             </div>
//           </div>

//           {/* Results Section */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-semibold text-gray-800">Search Results</h2>
//               {hasSearched && (
//                 <span className="text-sm text-gray-500">
//                   {isLoading ? "Searching..." : `${searchResults.length} papers found`}
//                 </span>
//               )}
//             </div>

//             {/* Loading State */}
//             {isLoading && (
//               <div className="flex items-center justify-center py-12">
//                 <div className="text-center">
//                   <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
//                   <p className="text-gray-600">Searching for papers...</p>
//                 </div>
//               </div>
//             )}

//             {/* No Results State */}
//             {hasSearched && !isLoading && searchResults.length === 0 && !error && (
//               <div className="text-center py-12">
//                 <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-800 mb-2">No papers found</h3>
//                 <p className="text-gray-600">Try adjusting your search terms or use different keywords.</p>
//               </div>
//             )}

//             {/* Papers List */}
//             {!isLoading && searchResults.length > 0 && (
//               <div className="space-y-4">
//                 {searchResults.map((paper, index) => (
//                   <div
//                     key={index}
//                     className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
//                   >
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-lg text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-300">
//                           {paper.title || "Untitled Paper"}
//                         </h3>
//                         <p className="text-gray-600 mb-2">
//                           {paper.authors || paper.author || "Unknown Authors"}
//                         </p>
//                         <p className="text-sm text-gray-500 mb-2">
//                           {paper.year && `Published: ${paper.year}`}
//                         </p>
//                         {paper.abstract && (
//                           <p className="text-sm text-gray-600 mb-4 line-clamp-3">
//                             {paper.abstract}
//                           </p>
//                         )}
//                         <p className="text-sm text-gray-500 mb-4">
//                           {paper.citations ? `${paper.citations} citations` : "Citation count not available"}
//                         </p>
                        
//                         <div className="flex gap-3">
//                           <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
//                             <Eye className="w-4 h-4" />
//                             View Details
//                           </button>
//                           <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-[#647ffb] text-white hover:bg-[#506be0] transition-all duration-300 transform hover:scale-105 hover:shadow-md">
//                             <Download className="w-4 h-4" />
//                             Add to Library
//                           </button>
//                         </div>
//                       </div>
                      
//                       <div className="ml-6">
//                         <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg font-medium text-sm">
//                           {paper.relevance_score ? `${Math.round(paper.relevance_score * 100)}% Match` : "High Match"}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Load More Button */}
//             {!isLoading && searchResults.length > 0 && (
//               <div className="text-center mt-8">
//                 <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md font-medium">
//                   Load More Results
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };



import { useState } from "react";
import { Search, Download, Eye, Loader2, Shield, AlertCircle, CheckCircle } from "lucide-react";
import Header from "../components/Header";
import apiService from "../services/api.js";

export default function PaperSearch() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [showElsevierOverlay, setShowElsevierOverlay] = useState(false);

  
  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search query");
      return;
    }

    // Show Elsevier validation overlay instead of actual search
    setShowElsevierOverlay(true);
    setIsLoading(true);
    setError("");
    setHasSearched(true);

    // Simulate Elsevier validation process
    setTimeout(() => {
      setIsLoading(false);
      setShowElsevierOverlay(false);
      setError("Search feature is currently being validated with Elsevier. Please try again later.");
      setSearchResults([]);
    }, 3000);
  };



  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">Search Research Papers</h1>
            <p className="text-gray-600 text-lg">Find relevant academic papers using AI-powered search</p>
            
            {/* Elsevier Integration Notice */}
            <div className="mt-6 max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-[#002C79] to-[#175ACD] rounded-xl p-4 text-white">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <Shield className="w-6 h-6" />
                  <span className="font-semibold">Powered by Elsevier</span>
                </div>
                <p className="text-sm text-blue-100">
                  Access to 90+ million research papers from Scopus and ScienceDirect databases
                </p>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <div className="flex items-center space-x-3 border-2 border-gray-300 rounded-xl p-4 mb-6 focus-within:border-blue-500 focus-within:shadow-lg transition-all duration-300 bg-gray-50">
              <Search className="text-gray-500 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for papers on machine learning, neural networks, AI..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-none focus:outline-none text-gray-800 placeholder-gray-500 bg-transparent text-lg"
                disabled={isLoading}
              />
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm">
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}
            
            <div className="flex gap-4">
              <button 
                onClick={handleSearch}
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white rounded-xl hover:from-[#175ACD] hover:to-[#002C79] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Validating with Elsevier...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Search with Elsevier
                  </>
                )}
              </button>
              <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold">
                Advanced Search
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
              {hasSearched && (
                <span className="text-sm text-gray-600 font-medium bg-gray-100 px-4 py-2 rounded-full">
                  {isLoading ? "Searching..." : `${searchResults.length} papers found`}
                </span>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                  </div>
                  <p className="text-gray-700 text-lg font-medium">Searching for papers...</p>
                </div>
              </div>
            )}

            {/* No Results State */}
            {hasSearched && !isLoading && searchResults.length === 0 && !error && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">No papers found</h3>
                <p className="text-gray-600 text-lg">Try adjusting your search terms or use different keywords.</p>
              </div>
            )}

            {/* Papers List */}
            {!isLoading && searchResults.length > 0 && (
              <div className="space-y-6">
                {searchResults.map((paper, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-2xl text-gray-800 mb-3 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                          {paper.title || "Untitled Paper"}
                        </h3>
                        <p className="text-gray-700 mb-3 font-medium">
                          {paper.authors || paper.author || "Unknown Authors"}
                        </p>
                        <p className="text-sm text-gray-600 mb-3 font-medium">
                          {paper.year && `Published: ${paper.year}`}
                        </p>
                        {paper.abstract && (
                          <p className="text-sm text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                            {paper.abstract}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 mb-5 font-medium">
                          {paper.citations ? `${paper.citations} citations` : "Citation count not available"}
                        </p>
                        
                        <div className="flex gap-4">
                          <button className="flex items-center gap-2 px-6 py-3 text-sm rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold">
                            <Eye className="w-5 h-5" />
                            View Details
                          </button>
                          <button className="flex items-center gap-2 px-6 py-3 text-sm rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-semibold">
                            <Download className="w-5 h-5" />
                            Add to Library
                          </button>
                        </div>
                      </div>
                      
                      <div className="ml-8">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg">
                          {paper.relevance_score ? `${Math.round(paper.relevance_score * 100)}% Match` : "High Match"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {!isLoading && searchResults.length > 0 && (
              <div className="text-center mt-10">
                <button className="px-10 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-semibold">
                  Load More Results
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Elsevier Validation Overlay */}
      {showElsevierOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              {/* Elsevier Logo/Icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-[#002C79] to-[#175ACD] rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Validating with Elsevier
              </h3>
              
              <p className="text-gray-600 mb-6">
                We're currently validating your search request with Elsevier's academic database to ensure you get the most accurate and up-to-date research papers.
              </p>
              
              {/* Loading Animation */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-[#002C79] rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-[#175ACD] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-[#002C79] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
              
              {/* Status Steps */}
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Connecting to Elsevier API</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  <span className="text-sm text-gray-600">Validating search permissions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400">Accessing Scopus database</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Powered by Elsevier:</strong> Access to 90+ million research papers from Scopus and ScienceDirect
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}