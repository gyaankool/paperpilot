// import React, { useState } from "react";
// import { Download, FileText, CheckCircle } from "lucide-react";
// import Header from "../components/Header";

// export default function FormatPapersDemo() {
//   const [activeTab, setActiveTab] = useState("ieee");

//   const content = {
//     ieee: (
//       <div className="space-y-4 text-lg">
//         <h3 className="font-semibold text-xl text-gray-800">IEEE Format Preview</h3>
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="mb-2">
//             <span className="font-medium text-gray-700">Title:</span> Deep Learning Approaches
//             for Signal Processing
//           </p>
//           <p className="mb-2">
//             <span className="font-medium text-gray-700">Authors:</span> J. Smith, M. Johnson,
//             and K. Brown
//           </p>
//           <p className="mb-2">
//             <span className="font-medium text-gray-700">Abstract:</span> This paper presents
//             novel deep learning approaches for advanced signal processing applications...
//           </p>
//         </div>
//         <div className="grid md:grid-cols-2 gap-2 mt-4 text-base text-gray-700">
//           <div className="flex items-center gap-2">
//             <CheckCircle className="w-4 h-4 text-green-500" />
//             <span>AI-Generated Proposal Outline</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <CheckCircle className="w-4 h-4 text-green-500" />
//             <span>Executive Summary</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <CheckCircle className="w-4 h-4 text-green-500" />
//             <span>Problem Statement & Significance</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <CheckCircle className="w-4 h-4 text-green-500" />
//             <span>Research Methodology</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <CheckCircle className="w-4 h-4 text-green-500" />
//             <span>Budget Breakdown</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <CheckCircle className="w-4 h-4 text-green-500" />
//             <span>Timeline & Milestones</span>
//           </div>
//         </div>
//       </div>
//     ),
//     arxiv: (
//       <div className="space-y-4 text-lg">
//         <h3 className="font-semibold text-xl text-gray-800">arXiv Format Preview</h3>
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="mb-2">
//             <span className="font-medium text-gray-700">Title:</span> Neural Networks in
//             Computer Vision: A Comprehensive Study
//           </p>
//           <p className="mb-2">
//             <span className="font-medium text-gray-700">Authors:</span> Smith, J., Johnson, M.,
//             Brown, K.
//           </p>
//           <p className="mb-2">
//             <span className="font-medium text-gray-700">Subject:</span> Computer Science -
//             Computer Vision and Pattern Recognition
//           </p>
//         </div>
//       </div>
//     ),
//     wiley: (
//       <div className="space-y-4 text-lg">
//         <h3 className="font-semibold text-xl text-gray-800">Wiley Format Preview</h3>
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="mb-2">
//             <span className="font-medium text-gray-700">Running head:</span> DEEP LEARNING
//             SIGNAL PROCESSING
//           </p>
//           <p className="mb-2">
//             <span className="font-medium text-gray-700">Title:</span> Deep Learning Approaches
//             for Advanced Signal Processing
//           </p>
//           <p className="mb-2">
//             <span className="font-medium text-gray-700">Authors:</span> John Smith, Mary
//             Johnson, Kevin Brown
//           </p>
//         </div>
//       </div>
//     ),
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
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Format Research Papers</h1>
//             <p className="text-gray-600">Transform your research into publication-ready formats</p>
//           </div>

//           {/* Main Content Card */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center gap-3 mb-6">
//               <FileText className="w-6 h-6 text-[#647ffb]" />
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Format Papers - Interactive Demo
//               </h2>
//             </div>
            
//             <p className="text-gray-600 text-lg mb-6">
//               Explore the capabilities of format papers with this interactive preview.
//             </p>

//             {/* Tabs */}
//             <div className="flex gap-2 mb-6 bg-gray-100 p-2 rounded-lg">
//               {["ieee", "arxiv", "wiley"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`flex-1 py-3 px-4 rounded-md text-base font-medium transition-all duration-300 transform hover:scale-105 ${
//                     activeTab === tab
//                       ? "bg-white text-[#647ffb] shadow-md"
//                       : "text-gray-600 hover:bg-gray-200"
//                   }`}
//                 >
//                   {tab.toUpperCase()}
//                 </button>
//               ))}
//             </div>

//             {/* Dynamic Content */}
//             <div className="mb-6">{content[activeTab]}</div>

//             {/* Download Button */}
//             <div className="flex gap-4">
//               <button className="flex items-center gap-2 bg-[#647ffb] text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-[#506be0] transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
//                 <Download size={20} /> Download Template
//               </button>
//               <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
//                 Preview Full Paper
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }








import React, { useState } from "react";
import { Download, FileText, CheckCircle } from "lucide-react";
import Header from "../components/Header";

export default function FormatPapersDemo() {
  const [activeTab, setActiveTab] = useState("ieee");

  const content = {
    ieee: (
      <div className="space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold text-gray-900">IEEE Format Preview</h3>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="mb-3 text-base">
            <span className="font-semibold text-gray-800">Title:</span> Deep Learning Approaches
            for Signal Processing
          </p>
          <p className="mb-3 text-base">
            <span className="font-semibold text-gray-800">Authors:</span> J. Smith, M. Johnson,
            and K. Brown
          </p>
          <p className="mb-3 text-base">
            <span className="font-semibold text-gray-800">Abstract:</span> This paper presents
            novel deep learning approaches for advanced signal processing applications...
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          {[
            "AI-Generated Proposal Outline",
            "Executive Summary",
            "Problem Statement & Significance",
            "Research Methodology",
            "Budget Breakdown",
            "Timeline & Milestones",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    arxiv: (
      <div className="space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold text-gray-900">arXiv Format Preview</h3>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="mb-3 text-base">
            <span className="font-semibold text-gray-800">Title:</span> Neural Networks in
            Computer Vision: A Comprehensive Study
          </p>
          <p className="mb-3 text-base">
            <span className="font-semibold text-gray-800">Authors:</span> Smith, J., Johnson, M.,
            Brown, K.
          </p>
          <p className="mb-3 text-base">
            <span className="font-semibold text-gray-800">Subject:</span> Computer Science -
            Computer Vision and Pattern Recognition
          </p>
        </div>
      </div>
    ),
    wiley: (
      <div className="space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold text-gray-900">Wiley Format Preview</h3>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="mb-3 text-base">
            <span className="font-semibold text-gray-800">Running head:</span> DEEP LEARNING
            SIGNAL PROCESSING
          </p>
          <p className="mb-3 text-base">
            <span className="font-semibold text-gray-800">Title:</span> Deep Learning Approaches
            for Advanced Signal Processing
          </p>
          <p className="mb-3 text-base">
            <span className="font-semibold text-gray-800">Authors:</span> John Smith, Mary
            Johnson, Kevin Brown
          </p>
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Format Research Papers
            </h1>
            <p className="mt-2 text-lg text-gray-500">
              Transform your research into publication-ready formats with ease
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-8">
              <FileText className="w-8 h-8 text-[#002C79]" />
              <h2 className="text-2xl font-bold text-gray-900">
                Format Papers - Interactive Demo
              </h2>
            </div>

            <p className="text-gray-600 text-base mb-8 max-w-3xl">
              Discover how our tool formats your research papers into professional layouts for
              IEEE, arXiv, Wiley, and more.
            </p>

            {/* Tabs */}
            <div className="flex gap-3 mb-8 bg-gray-100 p-2 rounded-xl">
              {["ieee", "arxiv", "wiley"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Dynamic Content */}
            <div className="mb-8">{content[activeTab]}</div>

            {/* Button */}
            <div className="flex justify-center">
              <button 
                onClick={() => window.open('https://api.whatsapp.com/message/7FXO6JIJBMJZN1?autoload=1&app_absent=0', '_blank')}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white px-8 py-4 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 text-lg"
              >
                <FileText size={24} /> Format Paper
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}