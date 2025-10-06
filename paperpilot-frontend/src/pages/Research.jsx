// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import upload from "/assets/upload.png"
// import { Eye, Settings } from "lucide-react";
// const featuresTop = [
//   {
//     title: "Format Papers",
//     description: "Automatically format your papers according to any publisher’s guidelines",
//     points: ["IEEE Efficient", "arXiv standard", "Journal templates", "Citation styles"],
//     icon: <img src={upload} alt="" className="h-6 w-5"/>
//   },
//   {
//     title: "Search Papers",
//     description: "AI-powered literature search across millions of academic papers",
//     points: ["Cross-database search", "Relevance ranking", "Citation analysis", "PDF downloads"],
//     icon: <Settings className="w-6 h-6" />,
//   },
//   {
//     title: "Funding Proposals",
//     description: "Generate compelling funding proposals with AI assistance",
//     points: ["Grant templates", "Budget planning", "Impact statements", "Success metrics"],
//     icon: <Eye className="w-6 h-6" />,
//   },
// ];

// const featuresBottom = [
//   {
//     title: "Review Writing",
//     description: "Comprehensive writing analysis and improvement suggestions",
//     points: ["Grammar check", "Style analysis", "Clarity scoring", "Plagiarism detection"],
//     icon: <img src={upload} alt="" className="h-6 w-5"/>
//   },
//   {
//     title: "Write Reports",
//     description: "Create detailed research reports with data visualization",
//     points: ["Visualization templates", "Visual charts", "Data interpretation", "Export formats"],
//     icon: <img src={upload} alt="" className="h-6 w-5" />
//   },
//   {
//     title: "Analyse Data",
//     description: "Advanced statistical analysis and visualization tools",
//     points: ["Statistical models", "Data visualization", "Trend analysis", "Report results"],
//     icon: <img src={upload} alt="" className="h-6 w-5"/>
//   },
// ];

// export default function ResearchExcellence() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-white">
//       {/* ✅ Use your Header component */}
//       <Header />

//       {/* Content */}
//       <div className="max-w-6xl mx-auto px-6 py-12">
//         <div className="border p-10 mb-10 rounded-xl border-[#805454]">
//         <h2 className="text-3xl font-bold text-center mb-4">
//           Everything You Need for Research Excellence
//         </h2>
//         <p className="text-center  mb-12">
//           Paperpilot combines six powerful AI tools to streamline your entire research workflow,
//           from initial literature search to final publication.
//         </p>

//         {/* Top Feature Cards */}
//         <div className="grid md:grid-cols-3 gap-6 mb-16">
//           {featuresTop.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-white border rounded-xl shadow-md p-6 hover:shadow-lg transition"
//             >
//                             <div className={`${feature.color} bg-[#f9f5f2] border border-[#be9999] p-2 w-fit`} >{feature.icon}</div>
//               <h3 className="font-bold text-lg text-[#805454] mb-2">{feature.title}</h3>
//               <p className="text-base font-bold mb-4">{feature.description}</p>
//               <ul className="text-sm text-gray-700 mb-4 space-y-1">
//                 {feature.points.map((point, i) => (
//                   <li key={i}>✓ {point}</li>
//                 ))}
//               </ul>
//               <button 
//                 onClick={() => {
//                   if (index === 0) navigate('/paper/format');
//                   else if (index === 1) navigate('/paper/search');
//                   else if (index === 2) navigate('/funding');
//                 }}
//                 className="w-full bg-[#647ffb] text-white rounded-lg py-2 font-medium hover:bg-[#506be0] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//               >
//                 Try Feature
//               </button>
//             </div>
//           ))}
//         </div>
//         </div>

//         {/* Bottom Feature Cards */}
//         <div className="grid md:grid-cols-3 gap-6 mb-16 border p-10 border-[#805454] rounded-2xl">
//           {featuresBottom.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-white border rounded-xl shadow-md p-6 hover:shadow-lg transition"
//             >
//               <div className={`${feature.color} bg-[#f9f5f2] border border-[#be9999] p-2 w-fit`} >{feature.icon}</div>
//               <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
//               <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
//               <ul className="text-sm text-gray-700 mb-4 space-y-1">
//                 {feature.points.map((point, i) => (
//                   <li key={i}>✓ {point}</li>
//                 ))}
//               </ul>
//               <button 
//                 onClick={() => {
//                   if (index === 0) navigate('/review');
//                   else if (index === 1) navigate('/write');
//                   else if (index === 2) navigate('/analyse');
//                 }}
//                 className="w-full bg-[#647ffb] text-white rounded-lg py-2 font-medium hover:bg-[#506be0] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//               >
//                 Try Feature
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* CTA Section */}
//         <div className="text-center mt-12">
//           <h3 className="text-xl font-bold mb-2">
//             Ready to Transform Your Research Workflow?
//           </h3>
//           <p className="text-gray-600 mb-6">
//             Join thousands of researchers who trust Paperpilot for their academic success. 
//             Start with any feature and upgrade to access the complete suite.
//           </p>
//           <div className="flex justify-center gap-6">
//             <button 
//               onClick={() => navigate('/upload')}
//               className="bg-[#647ffb] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#506be0] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//             >
//               Start free trial
//             </button>
//             <button 
//               onClick={() => navigate('/smtp-test')}
//               className="text-gray-800 underline hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
//             >
//               Test Email System
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
















import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Settings, Eye, DollarSign, BookOpen, BarChart3, CheckCircle } from "lucide-react";
import Header from "../components/Header";

const featuresTop = [
  {
    title: "Format Papers",
    description: "Automatically format your papers according to any publisher’s guidelines",
    points: ["IEEE Efficient", "arXiv standard", "Journal templates", "Citation styles"],
    icon: <FileText className="w-6 h-6 text-[#002C79]" />,
  },
  {
    title: "Search Papers",
    description: "AI-powered literature search across millions of academic papers",
    points: ["Cross-database search", "Relevance ranking", "Citation analysis", "PDF downloads"],
    icon: <Settings className="w-6 h-6 text-[#002C79]" />,
  },
  {
    title: "Funding Proposals",
    description: "Generate compelling funding proposals with AI assistance",
    points: ["Grant templates", "Budget planning", "Impact statements", "Success metrics"],
    icon: <DollarSign className="w-6 h-6 text-[#002C79]" />,
  },
];

const featuresBottom = [
  {
    title: "Review Writing",
    description: "Comprehensive writing analysis and improvement suggestions",
    points: ["Grammar check", "Style analysis", "Clarity scoring", "Plagiarism detection"],
    icon: <BookOpen className="w-6 h-6 text-[#002C79]" />,
  },
  {
    title: "Write Reports",
    description: "Create detailed research reports with data visualization",
    points: ["Visualization templates", "Visual charts", "Data interpretation", "Export formats"],
    icon: <FileText className="w-6 h-6 text-[#002C79]" />,
  },
  {
    title: "Analyse Data",
    description: "Advanced statistical analysis and visualization tools",
    points: ["Statistical models", "Data visualization", "Trend analysis", "Report results"],
    icon: <BarChart3 className="w-6 h-6 text-[#002C79]" />,
  },
];

export default function ResearchExcellence() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-10 border border-gray-100 mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-4 tracking-tight">
            Everything You Need for Research Excellence
          </h2>
          <p className="text-lg text-gray-500 text-center mb-12 max-w-3xl mx-auto">
            Paperpilot combines six powerful AI tools to streamline your entire research workflow,
            from initial literature search to final publication.
          </p>

          {/* Top Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuresTop.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="bg-gradient-to-r from-[#002C79]/10 to-[#175ACD]/10 p-3 rounded-full w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                <ul className="text-sm text-gray-700 mb-6 space-y-2">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {point}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    if (index === 0) navigate("/paper/format");
                    else if (index === 1) navigate("/paper/search");
                    else if (index === 2) navigate("/funding");
                  }}
                  className="w-full bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white rounded-lg py-3 text-base font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Try Feature
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuresBottom.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="bg-gradient-to-r from-[#002C79]/10 to-[#175ACD]/10 p-3 rounded-full w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                <ul className="text-sm text-gray-700 mb-6 space-y-2">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {point}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    if (index === 0) navigate("/review");
                    else if (index === 1) navigate("/write");
                    else if (index === 2) navigate("/analyse");
                  }}
                  className="w-full bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white rounded-lg py-3 text-base font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Try Feature
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to Transform Your Research Workflow?
          </h3>
          <p className="text-base text-gray-500 mb-6 max-w-2xl mx-auto">
            Join thousands of researchers who trust Paperpilot for their academic success. Start with any feature and upgrade to access the complete suite.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/upload")}
              className="bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white px-6 py-3 rounded-lg text-base font-semibold hover:shadow-lg transition-all duration-300"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => navigate("/smtp-test")}
              className="border-2 border-[#002C79] text-[#002C79] px-6 py-3 rounded-lg text-base font-semibold hover:bg-[#002C79] hover:text-white transition-all duration-300"
            >
              Test Email System
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}