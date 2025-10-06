// "use client";

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import Header from "../components/Header";
// import { Upload, Search, FileText, Download, Settings, BarChart3, Mail } from "lucide-react";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const quickActions = [
//     {
//       title: "Upload Research",
//       description: "Upload your papers and references",
//       icon: <Upload className="w-8 h-8" />,
//       action: () => navigate('/upload'),
//       color: "bg-blue-500"
//     },
//     {
//       title: "Search Papers",
//       description: "Find relevant research papers",
//       icon: <Search className="w-8 h-8" />,
//       action: () => navigate('/paper/search'),
//       color: "bg-green-500"
//     },
//     {
//       title: "Format Papers",
//       description: "Format according to standards",
//       icon: <FileText className="w-8 h-8" />,
//       action: () => navigate('/paper/format'),
//       color: "bg-purple-500"
//     },
//     {
//       title: "Export Papers",
//       description: "Download in various formats",
//       icon: <Download className="w-8 h-8" />,
//       action: () => navigate('/export'),
//       color: "bg-orange-500"
//     },
//     {
//       title: "Funding Proposals",
//       description: "Generate funding proposals",
//       icon: <Settings className="w-8 h-8" />,
//       action: () => navigate('/funding'),
//       color: "bg-red-500"
//     },
//     {
//       title: "Analyze Data",
//       description: "Statistical analysis tools",
//       icon: <BarChart3 className="w-8 h-8" />,
//       action: () => navigate('/analyse'),
//       color: "bg-indigo-500"
//     }
//   ];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />


//       {/* Main Section */}
//       <main className="flex-1 p-6">
//         <div className="max-w-6xl mx-auto">
//           {/* Quick Actions */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Quick Actions</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {quickActions.map((action, index) => (
//                 <button
//                   key={index}
//                   onClick={action.action}
//                   className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-300 group transform hover:-translate-y-1"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className={`${action.color} text-white p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
//                       {action.icon}
//                     </div>
//                     <div className="text-left">
//                       <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
//                         {action.title}
//                       </h3>
//                       <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
//                         {action.description}
//                       </p>
//                     </div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Platform Overview */}
//           <div className="border border-[#805454] rounded-md p-8 bg-white shadow">
//             <h2 className="text-3xl font-bold mb-4 text-gray-800">
//               Transform Your Research Papers
//             </h2>

//             <h3 className="text-xl font-semibold mb-3 text-gray-700">Platform Overview</h3>
//             <p className="text-gray-700 leading-relaxed mb-6 text-lg">
//               PaperPilot provides an AI-driven solution for researchers to
//               seamlessly transform their manuscripts into publication-ready
//               research papers. By allowing users to upload a base paper along with
//               relevant references, the system automatically applies standardized
//               formatting, ensures compliance with academic style guidelines, and
//               performs advanced grammar and language checks. The AI engine
//               intelligently organizes citations, optimizes structure, and enhances
//               readability, enabling researchers to focus on content quality while
//               ensuring the final document meets the rigorous standards of scholarly
//               publication.
//             </p>

//             {/* Features */}
//             <div className="flex flex-wrap gap-4 mb-6">
//               <span className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm bg-blue-100 text-blue-800">
//                 <span className="w-2 h-2 rounded-full bg-blue-500"></span>
//                 LaTeX & Word Support
//               </span>
//               <span className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm bg-green-100 text-green-800">
//                 <span className="w-2 h-2 rounded-full bg-green-500"></span>
//                 AI Grammar Check
//               </span>
//               <span className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm bg-purple-100 text-purple-800">
//                 <span className="w-2 h-2 rounded-full bg-purple-500"></span>
//                 Citation Formatting
//               </span>
//               <span className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm bg-orange-100 text-orange-800">
//                 <span className="w-2 h-2 rounded-full bg-orange-500"></span>
//                 Email Verification
//               </span>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-4">
//               <button 
//                 onClick={() => navigate('/upload')}
//                 className="px-6 py-3 bg-[#647ffb] text-white rounded-lg hover:bg-[#506be0] transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-lg"
//               >
//                 Start Uploading
//               </button>
//               <button 
//                 onClick={() => navigate('/research')}
//                 className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-md"
//               >
//                 Explore Features
//               </button>
//               <button 
//                 onClick={() => navigate('/smtp-test')}
//                 className="px-6 py-3 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-all duration-300 font-medium flex items-center gap-2 transform hover:scale-105 hover:shadow-md"
//               >
//                 <Mail className="w-4 h-4" />
//                 Test Email System
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HomePage;










// "use client";

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import Header from "../components/Header";
// import { Upload, Search, FileText, Download, Settings, BarChart3, Mail, ChevronRight, CheckCircle2 } from "lucide-react";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const quickActions = [
//     {
//       title: "Upload Research",
//       description: "Upload your papers and references",
//       icon: <Upload className="w-8 h-8 text-white" />,
//       action: () => navigate('/upload'),
//       color: "bg-[#0062FF]",
//       gradient: "from-blue-500 to-blue-600"
//     },
//     {
//       title: "Search Papers",
//       description: "Find relevant research papers",
//       icon: <Search className="w-8 h-8 text-white" />,
//       action: () => navigate('/paper/search'),
//        color: "bg-[#0062FF]",
//       gradient: "from-green-500 to-green-600"
//     },
//     {
//       title: "Format Papers",
//       description: "Format according to standards",
//       icon: <FileText className="w-8 h-8 text-white" />,
//       action: () => navigate('/paper/format'),
//        color: "bg-[#0062FF]",
//       gradient: "from-purple-500 to-purple-600"
//     },
//     {
//       title: "Export Papers",
//       description: "Download in various formats",
//       icon: <Download className="w-8 h-8 text-white" />,
//       action: () => navigate('/export'),
//        color: "bg-[#0062FF]",
//       gradient: "from-orange-500 to-orange-600"
//     },
//     {
//       title: "Funding Proposals",
//       description: "Generate funding proposals",
//       icon: <Settings className="w-8 h-8 text-white"  />,
//       action: () => navigate('/funding'),
//       color: "bg-[#0062FF]",
//       gradient: "from-red-500 to-red-600"
//     },
//     {
//       title: "Analyze Data",
//       description: "Statistical analysis tools",
//       icon: <BarChart3 className="w-8 h-8 text-white" />,
//       action: () => navigate('/analyse'),
//       color: "bg-[#0062FF]",
//       gradient: "from-indigo-500 to-indigo-600"
//     }
//   ];

//   const badges = [
//     { text: "LaTeX & Word Support" },
//     { text: "AI Grammar Check" },
//     { text: "Citation Formatting" },
//     { text: "Email Verification" }
//   ];

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
//       <Header />

//       {/* Main Section */}
//       <main className="flex-1 ">
//         <div>
//           {/* Quick Actions */}



//           <div className="mb-6 px-20 bg-[#F2F5FC] rounded-2xl py-10">
//   <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">
//     Quick Actions
//   </h2>

//   <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
//     {quickActions.map((action, index) => (
//       <button
//         key={index}
//         onClick={action.action}
//         onMouseEnter={() => setHoveredCard(index)}
//         onMouseLeave={() => setHoveredCard(null)}
//         className="group  relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-blue-200 overflow-hidden w-lg"
//       >
//         {/* Gradient Background on Hover */}
//         <div
//           className={`absolute inset-0 ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
//         ></div>

//         <div className="relative z-10 flex flex-col h-full">
//           {/* Icon */}
//           <div
//             // className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
//             className={`w-16 h-16 rounded-2xl bg-gradient-to-br bg-[#2773ee] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
//           >
//             {action.icon}
//           </div>

//           {/* Title */}
//           <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
//             {action.title}
//           </h4>

//           {/* Description */}
//           <p className="text-gray-600 flex-grow ">{action.description}</p>

//           {/* Learn More */}
//           <div className="flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             Learn more
//             <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
//           </div>
//         </div>
//       </button>
//     ))}
//   </div>
// </div>

//           {/* Platform Overview */}
//           <div className="max-w-7xl mx-auto p-4">
//             <div className="bg-gradient-to-r from-[#002C79] to-[#175ACD] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
//               {/* Decorative Elements */}
//               <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
//               <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
//               <div className="relative z-10">
//                 <h2 className="text-4xl font-bold mb-4">
//                   Transform Your Research Papers
//                 </h2>

//                 <h3 className="text-2xl font-semibold mb-3 text-blue-100">
//                   Platform Overview
//                 </h3>
                
//                 <p className="text-lg text-blue-50 leading-relaxed mb-6">
//                   PaperPilot provides an AI-driven solution for researchers to
//                   seamlessly transform their manuscripts into publication-ready
//                   research papers. By allowing users to upload a base paper along with
//                   relevant references, the system automatically applies standardized
//                   formatting, ensures compliance with academic style guidelines, and
//                   performs advanced grammar and language checks. The AI engine
//                   intelligently organizes citations, optimizes structure, and enhances
//                   readability, enabling researchers to focus on content quality while
//                   ensuring the final document meets the rigorous standards of scholarly
//                   publication.
//                 </p>

//                 {/* Features */}
//                 <div className="flex flex-wrap gap-3 mb-6">
//                   {badges.map((badge, idx) => (
//                     <span key={idx} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30 flex items-center gap-2">
//                       <CheckCircle2 className="w-4 h-4" />
//                       {badge.text}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-wrap gap-4">
//                   <button 
//                     onClick={() => navigate('/upload')}
//                     className="px-8 py-4 bg-white text-[#002C79] rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold hover:scale-105 hover:shadow-xl"
//                   >
//                     Start Uploading
//                   </button>
//                   <button 
//                     onClick={() => navigate('/research')}
//                     className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300 font-semibold"
//                   >
//                     Explore Features
//                   </button>
//                   <button 
//                     onClick={() => navigate('/smtp-test')}
//                     className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300 font-semibold flex items-center gap-2"
//                   >
//                     <Mail className="w-5 h-5" />
//                     Test Email System
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HomePage;



"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import { Upload, Search, FileText, Download, Settings, Mail, ChevronRight, CheckCircle2, Zap, Shield, Users, BookOpen, Award, TrendingUp } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hoveredCard, setHoveredCard] = useState(null);

  const quickActions = [
    {
      title: "Upload Research",
      description: "Upload your papers and references",
      icon: <Upload className="w-8 h-8 text-white" />,
      action: () => navigate('/upload'),
      color: "bg-[#0062FF]",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Search Papers",
      description: "Find relevant research papers",
      icon: <Search className="w-8 h-8 text-white" />,
      action: () => navigate('/paper/search'),
       color: "bg-[#0062FF]",
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Format Papers",
      description: "Format according to standards",
      icon: <FileText className="w-8 h-8 text-white" />,
      action: () => navigate('/paper/format'),
       color: "bg-[#0062FF]",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Export Papers",
      description: "Download in various formats",
      icon: <Download className="w-8 h-8 text-white" />,
      action: () => navigate('/export'),
       color: "bg-[#0062FF]",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      title: "Funding Proposals",
      description: "Generate funding proposals",
      icon: <Settings className="w-8 h-8 text-white"  />,
      action: () => window.open('https://wa.me/message/7FXO6JIJBMJZN1', '_blank'),
      color: "bg-[#0062FF]",
      gradient: "from-red-500 to-red-600"
    }
  ];

  const badges = [
    { text: "LaTeX & Word Support" },
    { text: "AI Grammar Check" },
    { text: "Citation Formatting" },
    { text: "Email Verification" }
  ];

  // New content sections
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Processing",
      description: "Process your research papers in minutes, not hours. Our AI-powered engine optimizes formatting speed without compromising quality.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Confidential",
      description: "Your research is protected with enterprise-grade encryption. We never share or store your intellectual property beyond processing.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Multiple Citation Styles",
      description: "Support for APA, MLA, Chicago, IEEE, Harvard, and 50+ other citation formats. Automatically format references with precision.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Publication Ready",
      description: "Ensure your papers meet the highest academic standards. Compatible with major journals and conference submission requirements.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Research Papers Formatted", icon: <FileText className="w-6 h-6" /> },
    { number: "95%", label: "Accuracy Rate", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "5,000+", label: "Active Researchers", icon: <Users className="w-6 h-6" /> },
    { number: "50+", label: "Citation Styles", icon: <BookOpen className="w-6 h-6" /> }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Upload Your Manuscript",
      description: "Simply upload your research paper and reference materials in any common format."
    },
    {
      step: "02",
      title: "AI Processing",
      description: "Our advanced AI analyzes your content, checks grammar, and applies proper formatting."
    },
    {
      step: "03",
      title: "Review & Refine",
      description: "Review the formatted paper, make adjustments, and ensure everything meets your standards."
    },
    {
      step: "04",
      title: "Export & Publish",
      description: "Download your publication-ready paper in your preferred format and submit with confidence."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      {/* Main Section */}
      <main className="flex-1 ">
        <div>
          {/* Quick Actions */}
          <div className="mb-6 px-20 bg-[#F2F5FC] rounded-2xl py-10">
            <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">
              Quick Actions
            </h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group  relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-blue-200 overflow-hidden w-lg"
                >
                  {/* Gradient Background on Hover */}
                  <div
                    className={`absolute inset-0 ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br bg-[#2773ee] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                    >
                      {action.icon}
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {action.title}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-600 flex-grow ">{action.description}</p>

                    {/* Learn More */}
                    <div className="flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn more
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Platform Overview */}
          <div className="max-w-7xl mx-auto p-4">
            <div className="bg-gradient-to-r from-[#002C79] to-[#175ACD] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4">
                  Transform Your Research Papers
                </h2>

                <h3 className="text-2xl font-semibold mb-3 text-blue-100">
                  Platform Overview
                </h3>
                
                <p className="text-lg text-blue-50 leading-relaxed mb-6">
                  PaperPilot provides an AI-driven solution for researchers to
                  seamlessly transform their manuscripts into publication-ready
                  research papers. By allowing users to upload a base paper along with
                  relevant references, the system automatically applies standardized
                  formatting, ensures compliance with academic style guidelines, and
                  performs advanced grammar and language checks. The AI engine
                  intelligently organizes citations, optimizes structure, and enhances
                  readability, enabling researchers to focus on content quality while
                  ensuring the final document meets the rigorous standards of scholarly
                  publication.
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {badges.map((badge, idx) => (
                    <span key={idx} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      {badge.text}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => navigate('/upload')}
                    className="px-8 py-4 bg-white text-[#002C79] rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold hover:scale-105 hover:shadow-xl"
                  >
                    Start Uploading
                  </button>
                  <button 
                    onClick={() => navigate('/research')}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300 font-semibold"
                  >
                    Explore Features
                  </button>
                  <button 
                    onClick={() => navigate('/smtp-test')}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300 font-semibold flex items-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Test Email System
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* NEW: Key Features Section */}
          {/* <div className="max-w-7xl mx-auto p-4 my-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose PaperPilot?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Powerful features designed to streamline your academic publishing workflow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div> */}

          {/* NEW: Stats Section */}
          <div className="max-w-7xl mx-auto p-4 my-16">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 border-2 border-blue-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Trusted by Researchers Worldwide
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center group">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#002C79] to-[#175ACD] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                    </div>
                    {/* <div className="text-4xl font-bold bg-gradient-to-r from-[#002C79] to-[#175ACD] bg-clip-text text-transparent mb-2"> */}
                    <div className="text-4xl font-bold bg-[#175ACD]   bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NEW: How It Works Section */}
          <div id="how-it-works" className="max-w-7xl mx-auto p-4 my-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Four simple steps to transform your manuscript into a publication-ready paper
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowSteps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 h-full">
                    <div className="text-5xl font-bold text-blue-100 mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {idx < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ChevronRight className="w-6 h-6 text-blue-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* NEW: CTA Section */}
          <div className="max-w-7xl mx-auto p-4 my-16">
            <div className="bg-gradient-to-r from-[#002C79] to-[#175ACD] rounded-3xl p-12 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4">
                  Ready to Elevate Your Research?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of researchers who trust PaperPilot to format their academic papers with precision and speed.
                </p>
                <button 
                  onClick={() => navigate('/upload')}
                  className="px-10 py-4 bg-white text-[#002C79] rounded-xl hover:bg-blue-50 transition-all duration-300 font-bold text-lg hover:scale-105 hover:shadow-2xl inline-flex items-center gap-2"
                >
                  Get Started Now
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default HomePage;