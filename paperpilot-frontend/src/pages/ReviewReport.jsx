// import React from "react";

// export default function ReviewWritingDemo() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg w-screen h-screen p-10 relative">
//         {/* Close Button */}
//         <button className="absolute top-3 right-3 text-gray-500 hover:text-black">
//           ✕
//         </button>

//         {/* Header */}
//         <h2 className="text-3xl font-bold mb-2">Review Writing - Interactive Demo</h2>
//         <p className="text-gray-600 mb-12">
//           Explore the capabilities of review writing with this interactive preview.
//         </p>

//         {/* Input Box */}
//         <div className="border rounded-md p-4 mb-16">
//           <p className="text-gray-700 pb-10">
//             The results of our experiment shows that the new algorithm perform
//             better than existing methods in terms of accuracy and speed.
//           </p>
//         </div>

//         {/* Writing Analysis Section */}
//         <div className="border rounded-md p-4 space-y-4">
//           <h3 className="font-semibold text-lg mb-2">Writing Analysis</h3>

//           {/* Scores */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-4">
//             {/* Clarity Score */}
//             <div>
//               <p className="font-medium text-gray-700 mb-1">Clarity Score</p>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div className="bg-[#647ffb] h-3 rounded-full w-[78%]"></div>
//               </div>
//               <p className="text-sm text-gray-600 mt-1">78%</p>
//             </div>

//             {/* Academic Tone */}
//             <div>
//               <p className="font-medium text-gray-700 mb-1">Academic Tone</p>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div className="bg-[#647ffb] h-3 rounded-full w-[85%]"></div>
//               </div>
//               <p className="text-sm text-gray-600 mt-1">85%</p>
//             </div>
//           </div>

//           {/* Grammar Issue */}
//           <div className="border border-green-400 rounded-md p-4 m-4">
//             <p className="font-medium text-gray-700">Grammar Issue</p>
//             <p className="text-gray-600 text-sm mt-1">
//               "shows" should be "show" - subject-verb agreement
//             </p>
//           </div>

//           {/* Style Suggestion */}
//           <div className="border border-blue-400 rounded-md p-4 m-4">
//             <p className="font-medium text-gray-700">Style Suggestion</p>
//             <p className="text-gray-600 text-sm mt-1">
//               Consider using "demonstrates" instead of "shows" for academic writing
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








import React from "react";
import { X } from "lucide-react";

export default function ReviewWritingDemo() {
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
              Review Writing - Interactive Demo
            </h2>
            <p className="mt-2 text-lg text-gray-500 max-w-2xl mx-auto">
              Explore the capabilities of review writing with this interactive preview.
            </p>
          </div>

          {/* Input Box */}
          <div className="bg-gradient-to-r from-[#002C79]/5 to-[#175ACD]/5 rounded-xl p-6 mb-10 border border-[#002C79]/10">
            <p className="text-base text-gray-700">
              The results of our experiment show that the new algorithm performs
              better than existing methods in terms of accuracy and speed.
            </p>
          </div>

          {/* Writing Analysis Section */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Writing Analysis</h3>

            {/* Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Clarity Score */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">Clarity Score</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-[#002C79] to-[#175ACD] h-4 rounded-full"
                    style={{ width: "78%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">78%</p>
              </div>

              {/* Academic Tone */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">Academic Tone</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-[#002C79] to-[#175ACD] h-4 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">85%</p>
              </div>
            </div>

            {/* Grammar Issue */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-4">
              <p className="text-base font-semibold text-green-800">Grammar Issue</p>
              <p className="text-sm text-green-700 mt-1">
                "shows" should be "show" - subject-verb agreement
              </p>
            </div>

            {/* Style Suggestion */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <p className="text-base font-semibold text-blue-800">Style Suggestion</p>
              <p className="text-sm text-blue-700 mt-1">
                Consider using "demonstrates" instead of "shows" for academic writing
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}