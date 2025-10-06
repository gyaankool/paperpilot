// "use client";

// import React from "react";
// import { Upload, Settings, Eye, Download } from "lucide-react"; // install with: npm install lucide-react
// import Header from "../components/Header";

// const HowItWorks = () => {
//   const steps = [
//     {
//       icon: <Upload className="w-6 h-6" />,
//       title: "Upload Papers",
//       desc: "Drag & drop your base paper and reference documents (PDF, DOCX, LaTeX)",
//       // color: "text-[#647ffb]",
//     },
//     {
//       icon: <Settings className="w-6 h-6" />,
//       title: "AI Processing",
//       desc: "Our AI analyzes, formats, and enhances your research with proper citations",
//       // color: "text-[#647ffb]",
//     },
//     {
//       icon: <Eye className="w-6 h-6" />,
//       title: "Preview & Edit",
//       desc: "Review the formatted paper, make edits, and check grammar & style",
//       // color: "text-[#647ffb]",
//     },
//     {
//       icon: <Download className="w-6 h-6" />,
//       title: "Export Ready",
//       desc: "Download in LaTeX, Word, or PDF format with submission metadata",
//       // color: "text-[#647ffb]",
//     },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <Header />

//       {/* Main Section */}
//       <main className="flex-1 flex justify-center p-6">
//         <div className="w-full max-w-7xl border border-[#805454] rounded-md p-8 bg-white shadow">
//           {/* Title */}
//           <h2 className="text-3xl font-bold mb-2">How It Works</h2>
//           <h3 className="text-xl font-semibold mb-8 mt-4">1.0 Flowchart</h3>

//           {/* Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             {steps.map((step, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white border border-[#805454] rounded-md shadow-[0_8px_24px_rgba(128,84,84,0.2),0_4px_8px_rgba(128,84,84,0.15)] p-4 flex flex-col gap-3 hover:shadow-lg transition"
//               >
//                 <div className={`${step.color} bg-[#f9f5f2] border border-[#be9999] p-2 w-fit`} >{step.icon}</div>
//                 <h4 className="font-bold text-2xl my-4 text-[#805454] ">
//                   {step.title}
//                 </h4>
//                 <p className="text-xl font-bold leading-10 mb-6">{step.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HowItWorks;






"use client";

import React from "react";
import { Upload, Settings, Eye, Download } from "lucide-react";
import Header from "../components/Header";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="w-8 h-8 text-[#002C79]" />,
      title: "Upload Papers",
      desc: "Drag & drop your base paper and reference documents (PDF, DOCX, LaTeX)",
      color: "text-[#002C79]",
    },
    {
      icon: <Settings className="w-8 h-8 text-[#002C79]" />,
      title: "AI Processing",
      desc: "Our AI analyzes, formats, and enhances your research with proper citations",
      color: "text-[#002C79]",
    },
    {
      icon: <Eye className="w-8 h-8 text-[#002C79]" />,
      title: "Preview & Edit",
      desc: "Review the formatted paper, make edits, and check grammar & style",
      color: "text-[#002C79]",
    },
    {
      icon: <Download className="w-8 h-8 text-[#002C79]" />,
      title: "Export Ready",
      desc: "Download in LaTeX, Word, or PDF format with submission metadata",
      color: "text-[#002C79]",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header */}
      <Header />

      {/* Main Section */}
      <main className="flex-1 flex justify-center py-16 px-6 sm:px-8 lg:px-12">
        <div className="w-full bg-white rounded-2xl shadow-lg p-10 border border-gray-100">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight bg-gradient-to-r from-[#002C79] to-[#175ACD] bg-clip-text text-transparent">
              How It Works
            </h2>
            <h3 className="text-xl font-semibold text-gray-600 mt-4">1.0 Flowchart</h3>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#1E3A8A]/20 rounded-xl p-6 flex flex-col gap-4 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-[#002C79]/10 to-[#175ACD]/10 p-3 rounded-full w-fit">
                  {step.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900">{step.title}</h4>
                <p className="text-base text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;