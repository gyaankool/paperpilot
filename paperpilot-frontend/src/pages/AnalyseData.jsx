// import React, { useState } from "react";
// import { Upload, BarChart3, TrendingUp, CheckCircle, Download, Eye } from "lucide-react";
// import Header from "../components/Header";

// export default function AnalyseDataDemo() {
//   const [isUploaded, setIsUploaded] = useState(false);

//   const handleFileUpload = () => {
//     setIsUploaded(true);
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
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Analyze Research Data</h1>
//             <p className="text-gray-600">Upload and analyze your research data with AI-powered insights</p>
//           </div>

//           {/* Main Content Card */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center gap-3 mb-6">
//               <BarChart3 className="w-6 h-6 text-[#647ffb]" />
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Analyze Data - Interactive Demo
//               </h2>
//             </div>
            
//             <p className="text-gray-600 mb-8">
//               Explore the capabilities of data analysis with this interactive preview.
//             </p>

//             {/* Upload Section */}
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-8 hover:border-[#647ffb] transition-all duration-300">
//               <div className="flex justify-center mb-4">
//                 <Upload className="w-12 h-12 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-700 mb-2">Upload Your Dataset</h3>
//               <p className="text-gray-600 mb-4">
//                 Supported formats: CSV, Excel, JSON, TXT
//               </p>
//               <button 
//                 onClick={handleFileUpload}
//                 className="bg-[#647ffb] text-white px-6 py-3 rounded-lg hover:bg-[#506be0] transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium"
//               >
//                 Choose File
//               </button>
//             </div>

//             {/* Analysis Results */}
//             <div className="bg-gray-50 rounded-lg p-6 mb-8">
//               <div className="flex items-center gap-2 mb-6">
//                 <TrendingUp className="w-5 h-5 text-[#647ffb]" />
//                 <h3 className="font-semibold text-lg text-gray-800">Analysis Results</h3>
//               </div>

//               {/* Stats Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                 <div className="bg-white rounded-lg p-4 text-center shadow-sm">
//                   <p className="text-3xl font-bold text-[#647ffb] mb-1">1,247</p>
//                   <p className="text-gray-600">Total Records</p>
//                 </div>
//                 <div className="bg-white rounded-lg p-4 text-center shadow-sm">
//                   <p className="text-3xl font-bold text-green-600 mb-1">94.3%</p>
//                   <p className="text-gray-600">Data Quality</p>
//                 </div>
//                 <div className="bg-white rounded-lg p-4 text-center shadow-sm">
//                   <p className="text-3xl font-bold text-orange-600 mb-1">12</p>
//                   <p className="text-gray-600">Variables</p>
//                 </div>
//               </div>

//               {/* Insights */}
//               <div className="space-y-4">
//                 <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                   <div className="flex items-center gap-2 mb-2">
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                     <p className="font-medium text-green-800">Strong Correlation Found</p>
//                   </div>
//                   <p className="text-sm text-green-700">
//                     Variables X and Y show 0.87 correlation coefficient (p &lt; 0.001)
//                   </p>
//                 </div>

//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <div className="flex items-center gap-2 mb-2">
//                     <TrendingUp className="w-5 h-5 text-blue-600" />
//                     <p className="font-medium text-blue-800">Statistical Significance</p>
//                   </div>
//                   <p className="text-sm text-blue-700">
//                     p-value &lt; 0.001 indicates highly significant results
//                   </p>
//                 </div>

//                 <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
//                   <div className="flex items-center gap-2 mb-2">
//                     <BarChart3 className="w-5 h-5 text-orange-600" />
//                     <p className="font-medium text-orange-800">Data Distribution</p>
//                   </div>
//                   <p className="text-sm text-orange-700">
//                     Normal distribution detected with slight right skew
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4">
//               <button className="flex-1 flex items-center justify-center gap-2 bg-[#647ffb] text-white py-4 rounded-lg hover:bg-[#506be0] text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
//                 <Eye className="w-5 h-5" />
//                 Full View Analysis
//               </button>
//               <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md font-medium">
//                 <Download className="w-5 h-5" />
//                 Export Report
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }






import React, { useState } from "react";
import { Upload, BarChart3, TrendingUp, CheckCircle, Download, Eye } from "lucide-react";
import Header from "../components/Header";

export default function AnalyseDataDemo() {
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileUpload = () => {
    setIsUploaded(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          {/* Page Title */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Analyze Research Data
            </h1>
            <p className="mt-2 text-lg text-gray-500">
              Upload and analyze your research data with AI-powered insights
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <BarChart3 className="w-8 h-8 text-[#002C79]" />
              <h2 className="text-2xl font-bold text-gray-900">
                Analyze Data - Interactive Demo
              </h2>
            </div>

            <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore the capabilities of our AI-powered data analysis tool with this interactive preview.
            </p>

            {/* Upload Section */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center mb-8 hover:border-[#002C79] bg-gradient-to-r from-[#002C79]/5 to-[#175ACD]/5 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <Upload className="w-16 h-16 text-[#002C79]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Dataset</h3>
              <p className="text-sm text-gray-600 mb-4">
                Supported formats: CSV, Excel, JSON, TXT
              </p>
              <button
                onClick={handleFileUpload}
                className="bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white px-6 py-3 rounded-lg text-base font-semibold hover:shadow-lg transition-all duration-300"
              >
                Choose File
              </button>
            </div>

            {/* Analysis Results */}
            <div className="bg-gradient-to-r from-[#002C79]/5 to-[#175ACD]/5 rounded-xl p-6 mb-8 border border-[#002C79]/10">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-[#002C79]" />
                <h3 className="text-xl font-bold text-gray-900">Analysis Results</h3>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100">
                  <p className="text-3xl font-bold text-[#002C79] mb-1">1,247</p>
                  <p className="text-sm text-gray-600">Total Records</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100">
                  <p className="text-3xl font-bold text-green-600 mb-1">94.3%</p>
                  <p className="text-sm text-gray-600">Data Quality</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100">
                  <p className="text-3xl font-bold text-orange-600 mb-1">12</p>
                  <p className="text-sm text-gray-600">Variables</p>
                </div>
              </div>

              {/* Insights */}
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-base font-semibold text-green-800">Strong Correlation Found</p>
                  </div>
                  <p className="text-sm text-green-700">
                    Variables X and Y show 0.87 correlation coefficient (p &lt; 0.001)
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-[#002C79]" />
                    <p className="text-base font-semibold text-blue-800">Statistical Significance</p>
                  </div>
                  <p className="text-sm text-blue-700">
                    p-value &lt; 0.001 indicates highly significant results
                  </p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                    <p className="text-base font-semibold text-orange-800">Data Distribution</p>
                  </div>
                  <p className="text-sm text-orange-700">
                    Normal distribution detected with slight right skew
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white py-4 rounded-lg text-base font-semibold hover:shadow-lg transition-all duration-300">
                <Eye className="w-5 h-5" />
                Full View Analysis
              </button>
              <button className="flex items-center justify-center gap-2 border-2 border-[#002C79] text-[#002C79] px-6 py-4 rounded-lg text-base font-semibold hover:bg-[#002C79] hover:text-white transition-all duration-300">
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}