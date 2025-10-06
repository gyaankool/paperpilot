// import React from "react";
// import Header from "../components/Header";
// import paper from "../../public/assets/paper.png";

// export default function PaperTemplates() {
//   const templates = [
//     { id: 1, name: "IEEE Template", img: paper},
//     { id: 2, name: "Wiley Template", img: paper },
//     { id: 3, name: "IEEE Template", img: paper},
//     { id: 4, name: "IEEE Template", img: paper},
//   ];

//   return (
//     <>
//       {/* Header */}
//       <Header />

//       {/* Content */}
//       <div className="max-w-6xl mx-auto mt-12 p-8 border rounded-lg shadow-sm bg-white">
//         <h2 className="text-3xl font-semibold mb-8">
//           Format your Research Papers
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {templates.map((template) => (
//             <div
//               key={template.id}
//               className="flex flex-col items-center  rounded-lg shadow-sm bg-gray-50 "
//             >
//               {/* Image */}
//               <div className="relative w-full  bg-gray-200 rounded-md overflow-hidden">
//                 <img
//                   src={template.img}
//                   alt={template.name}
//                   className="w-full h-full object-cover"
//                 />
//                 {/* Template Label */}
//                 {/* <span className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
//                   {template.name}
//                 </span> */}
//               </div>

//               {/* Select Button */}
//               {/* <button className="mt-4 px-6 py-2 rounded-md bg-[#647ffb] text-white font-medium hover:bg-[#5166e0] transition">
//                 Select
//               </button> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }



import React from "react";
import { FileText } from "lucide-react";
import Header from "../components/Header";

export default function PaperTemplates() {
  const templates = [
    { id: 1, name: "IEEE Template" },
    { id: 2, name: "Wiley Template" },
    { id: 3, name: "Elsevier Template" },
    { id: 4, name: "Springer Template" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header */}
      <Header />

      {/* Content */}
      <main className="flex-1 w-full py-16 px-6 sm:px-8 lg:px-12">
        <div className="bg-white rounded-2xl shadow-lg p-10 border border-gray-100">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight bg-gradient-to-r from-[#002C79] to-[#175ACD] bg-clip-text text-transparent mb-10 text-center">
            Format Your Research Papers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template) => (
              <div
                key={template.id}
                className="flex flex-col items-center bg-white rounded-xl shadow-md border border-[#1E3A8A]/20 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {/* Icon */}
                <div className="relative w-full bg-gradient-to-r from-[#002C79]/10 to-[#175ACD]/10 rounded-t-xl p-6 flex justify-center">
                  <FileText className="w-12 h-12 text-[#002C79]" />
                </div>

                {/* Template Label */}
                <span className="text-lg font-semibold text-gray-900 mt-4">
                  {template.name}
                </span>

                {/* Select Button */}
                <button className="mt-4 mb-6 px-6 py-2 bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white rounded-lg text-base font-semibold hover:shadow-lg focus:ring-4 focus:ring-[#1E3A8A]/50 transition-all duration-300">
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}