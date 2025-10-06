// import React from "react";
// import tick from "../../public/assets/tick.png";

// export default function WriteReportsDemo() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg w-screen h-screen p-10 relative">
//         {/* Close Button */}
//         <button className="absolute top-3 right-3 text-gray-500 hover:text-black">
//           ✕
//         </button>

//         {/* Header */}
//         <h2 className="text-3xl font-bold mb-2">Write Reports - Interactive Demo</h2>
//         <p className="text-gray-600 mb-8">
//           Explore the capabilities of write reports with this interactive preview.
//         </p>

//         {/* Form */}
//         <form className="space-y-6">
//           {/* Report Title */}
//           <input
//             type="text"
//             placeholder="Report title: Quarterly Research Progress"
//             className="w-full border rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           {/* Department & Period */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Department: Computer Science"
//               className="w-full border rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="text"
//               placeholder="Period: Q1 2024"
//               className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Report Structure */}
//           <div className="mt-6">
//             <h3 className="font-bold mb-2 text-lg" >
//               Auto-Generated Report Structure
//             </h3>
//             <ul className="space-y-2 text-gray-700 text-lg">
//               <li>
//                 <div className="flex flex-row gap-3 ">
//                 <img src={tick} alt="" className="w-5 h-5" /> 
//                  <span className="font-semibold">Executive Summary</span>
//                  </div>
//                 <p className="text-base text-gray-500">
//                   Key findings and achievements overview...
//                 </p>
//               </li>
//               <li>
//                 <div className="flex flex-row gap-3 ">
//                 <img src={tick} alt="" className="w-5 h-5" /> 
//                  <span className="font-semibold">Research Progress</span>
//                  </div>
//                 <p className="text-base text-gray-500">
//                   Detailed progress on ongoing projects...
//                 </p>
//               </li><li>
//                 <div className="flex flex-row gap-3 ">
//                 <img src={tick} alt="" className="w-5 h-5" /> 
//                  <span className="font-semibold">Data Analysis</span>
//                  </div>
//                 <p className="text-base text-gray-500">
//                   Statistical insights and visualizations...
//                 </p>
//               </li><li>
//                 <div className="flex flex-row gap-3 ">
//                 <img src={tick} alt="" className="w-5 h-5" /> 
//                  <span className="font-semibold">Recommendations</span>
//                  </div>
//                 <p className="text-base text-gray-500">
//                   Future directions and action items...
//                 </p>
//               </li>
//             </ul>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="button"
//             className="w-1/4 text-xl bg-[#647ffb] text-white py-3 rounded-md shadow-md hover:bg-blue-600 transition"
//           >
//             Generate Report
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



import React from "react";
import { X, CheckCircle } from "lucide-react";

export default function WriteReportsDemo() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-white rounded-2xl shadow-lg p-8 relative border border-gray-100">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-[#002C79] transition-all duration-300"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Write Reports - Interactive Demo
            </h2>
            <p className="mt-2 text-lg text-gray-500 max-w-2xl mx-auto">
              Explore the capabilities of report writing with this interactive preview.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-8">
            {/* Report Title */}
            <div>
              <input
                type="text"
                placeholder="Report title: Quarterly Research Progress"
                className="w-full border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#002C79] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
              />
            </div>

            {/* Department & Period */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Department: Computer Science"
                className="w-full border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#002C79] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
              />
              <input
                type="text"
                placeholder="Period: Q1 2024"
                className="w-full border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#002C79] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
              />
            </div>

            {/* Report Structure */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Auto-Generated Report Structure
              </h3>
              <div className="bg-gradient-to-r from-[#002C79]/5 to-[#175ACD]/5 rounded-xl p-6 border border-[#002C79]/10">
                <ul className="space-y-4 text-gray-700">
                  {[
                    {
                      title: "Executive Summary",
                      description: "Key findings and achievements overview...",
                    },
                    {
                      title: "Research Progress",
                      description: "Detailed progress on ongoing projects...",
                    },
                    {
                      title: "Data Analysis",
                      description: "Statistical insights and visualizations...",
                    },
                    {
                      title: "Recommendations",
                      description: "Future directions and action items...",
                    },
                  ].map((item, index) => (
                    <li key={index} className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-base font-semibold text-gray-900">{item.title}</span>
                      </div>
                      <p className="text-sm text-gray-500 ml-8">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="button"
                className="px-8 py-3 bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white rounded-lg text-base font-semibold hover:shadow-lg transition-all duration-300"
              >
                Generate Report
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}