// // import React from "react";
// // import Header from "../components/Header";
// // import tick from "../../public/assets/tick.png";
// // export default function SubmissionMetadata() {
// //   return (
// //     <div className="min-h-screen bg-white font-sans">
// //       {/* Navbar */}
// //       <Header/>

      
// //       {/* Content Section */}
// //       <main className="max-w-7xl mx-auto mt-12 p-10 border border-[#805454]  rounded-lg shadow-sm flex justify-between items-start">
// //         {/* Left Side */}
// //         <div className="w-1/2 space-y-10">
// //           <h2 className="text-lg font-bold">Submission Metadata</h2>
// //           <p className="text-gray-600 ">
// //             Generate complete submission package with all required metadata for journal submission.
// //           </p>

// //           <ul className="space-y-4 text-gray-800 text-lg">
// //             <li className="flex items-center font-bold">
// //               <span className="text-green-500 mr-2">
// //                 <img src={tick} alt="" />
// //                 </span> Author information & ORCID
// //             </li>
// //             <li className="flex items-center font-bold">
// //               <span className="text-green-500 mr-2">
// //                 <img src={tick} alt="" />
// //                 </span> Keywords & subject classification
// //             </li>
// //             <li className="flex items-center font-bold">
// //               <span className="text-green-500 mr-2">
// //                 <img src={tick} alt="" />
// //                 </span> Abstract & funding details
// //             </li>
// //             <li className="flex items-center font-bold">
// //               <span className="text-green-500 mr-2">
// //                 <img src={tick} alt="" />
// //                 </span> Copyright & licensing info
// //             </li>
// //           </ul>

// //           <button className="px-6 py-2 bg-[#647ffb] mt-10 text-white rounded-lg hover:bg-[#3b55d6] transition">
// //             Generate Submission Package
// //           </button>
// //         </div>

// //         {/* Right Side Export Summary */}
// //         <div className="w-2/5 rounded-lg p-6 mt-28 shadow-md bg-[#D9D9D9]">
// //           <h3 className="font-semibold mb-4 text-xl">Export Summary</h3>
// //           <div className="space-y-2 mb-4">
// //           <p className="text-gray-700 text-md flex justify-between">Document pages: <span className="font-medium " >12</span></p>
// //           <p className="text-md text-gray-700 flex justify-between">References: <span className="font-medium">34</span></p>
// //           <p className="text-md text-gray-700 flex justify-between">Figures/Tables: <span className="font-medium">8</span></p>
// //           <p className="text-md text-gray-700 mb-6 flex justify-between">Word count: <span className="font-medium">4,567</span></p>
// //           </div>
// //           <div className="flex items-center space-x-2 px-4 py-4 rounded-lg shadow-[0_0_25px_5px_rgba(30,64,175,0.6)] mb-6">
// //             <span className="text-green-500">
// //               <img src={tick} alt="" />
// //             </span>
// //             <span className="text-green-700  ">Ready for Publication</span>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }




import React from "react";
import { CheckCircle } from "lucide-react";
import Header from "../components/Header";

export default function SubmissionMetadata() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Navbar */}
      <Header />

      {/* Content Section */}
      <main className="flex-1 w-full py-16 px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          {/* Left Side */}
          <div className="w-full lg:w-3/5 bg-white rounded-2xl shadow-lg p-10 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight bg-gradient-to-r from-[#002C79] to-[#175ACD] bg-clip-text text-transparent">
                Submission Metadata
              </h2>
              <p className="mt-3 text-lg text-gray-600 max-w-3xl">
                Generate a complete submission package with all required metadata for journal submission.
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#002C79]/5 to-[#175ACD]/5 rounded-xl p-6 border border-[#1E3A8A]/10">
              <ul className="space-y-6">
                {[
                  "Author information & ORCID",
                  "Keywords & subject classification",
                  "Abstract & funding details",
                  "Copyright & licensing info",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 group hover:bg-[#1E3A8A]/5 rounded-lg p-2 transition-all duration-300"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-base font-semibold text-gray-900 group-hover:text-[#1E3A8A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button className="px-10 py-4 bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white rounded-xl text-lg font-semibold hover:shadow-xl hover:scale-105 focus:ring-4 focus:ring-[#1E3A8A]/50 transition-all duration-300">
                Generate Submission Package
              </button>
            </div>
          </div>

          {/* Right Side Export Summary */}
          <div className="w-full lg:w-2/5 bg-white rounded-2xl p-8 shadow-lg border-2 border-[#1E3A8A]/20 mt-8 lg:mt-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Export Summary</h3>
            <div className="space-y-4 mb-8">
              {[
                { label: "Document pages", value: "12" },
                { label: "References", value: "34" },
                { label: "Figures/Tables", value: "8" },
                { label: "Word count", value: "4,567" },
              ].map((item, index) => (
                <p
                  key={index}
                  className="text-base text-gray-700 flex justify-between group hover:text-[#1E3A8A] transition-all duration-300"
                >
                  {item.label}: <span className="font-semibold">{item.value}</span>
                </p>
              ))}
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#002C79]/20 to-[#175ACD]/20 rounded-lg p-5 border border-[#1E3A8A]/20">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-base font-semibold text-green-700">Ready for Publication</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}