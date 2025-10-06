// import React, { useState } from "react";
// import { DollarSign, Calendar, FileText, CheckCircle, Send } from "lucide-react";
// import Header from "../components/Header";

// export default function FundingProposalForm() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     amount: "",
//     duration: ""
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Header */}
//       <Header />
      
//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <div className="max-w-4xl mx-auto">
//           {/* Page Title */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Funding Proposals</h1>
//             <p className="text-gray-600">Generate professional funding proposals with AI assistance</p>
//           </div>

//           {/* Main Content Card */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center gap-3 mb-6">
//               <DollarSign className="w-6 h-6 text-[#647ffb]" />
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Funding Proposals - Interactive Demo
//               </h2>
//             </div>
            
//             <p className="text-gray-600 mb-8">
//               Explore the capabilities of funding proposals with this interactive preview.
//             </p>

//             {/* Form */}
//             <form className="space-y-6">
//               {/* Project Title */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Project Title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   placeholder="AI Powered Medical Diagnosis System"
//                   className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#647ffb] focus:border-transparent transition-all duration-300"
//                 />
//               </div>

//               {/* Project Description */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Project Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   placeholder="Our research aims to develop an AI-powered medical diagnosis system that can accurately identify diseases from medical images..."
//                   className="w-full border border-gray-300 rounded-lg p-4 h-32 focus:outline-none focus:ring-2 focus:ring-[#647ffb] focus:border-transparent transition-all duration-300 resize-none"
//                 />
//               </div>

//               {/* Funding Amount & Duration */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <DollarSign className="w-4 h-4 inline mr-1" />
//                     Funding Amount
//                   </label>
//                   <input
//                     type="text"
//                     name="amount"
//                     value={formData.amount}
//                     onChange={handleInputChange}
//                     placeholder="$250,000"
//                     className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#647ffb] focus:border-transparent transition-all duration-300"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <Calendar className="w-4 h-4 inline mr-1" />
//                     Duration
//                   </label>
//                   <input
//                     type="text"
//                     name="duration"
//                     value={formData.duration}
//                     onChange={handleInputChange}
//                     placeholder="24 months"
//                     className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#647ffb] focus:border-transparent transition-all duration-300"
//                   />
//                 </div>
//               </div>

//               {/* Proposal Outline */}
//               <div className="mt-8">
//                 <div className="flex items-center gap-2 mb-4">
//                   <FileText className="w-5 h-5 text-[#647ffb]" />
//                   <h3 className="font-semibold text-lg text-gray-800">AI-Generated Proposal Outline</h3>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <ul className="space-y-3 text-gray-700">
//                     <li className="flex items-center gap-3">
//                       <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                       <span>Executive Summary</span>
//                     </li>
//                     <li className="flex items-center gap-3">
//                       <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                       <span>Problem Statement & Significance</span>
//                     </li>
//                     <li className="flex items-center gap-3">
//                       <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                       <span>Research Methodology</span>
//                     </li>
//                     <li className="flex items-center gap-3">
//                       <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                       <span>Budget Breakdown</span>
//                     </li>
//                     <li className="flex items-center gap-3">
//                       <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                       <span>Timeline & Milestones</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex gap-4 pt-4">
//                 <button
//                   type="button"
//                   className="flex-1 flex items-center justify-center gap-2 bg-[#647ffb] text-white py-4 rounded-lg hover:bg-[#506be0] text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//                 >
//                   <Send className="w-5 h-5" />
//                   Generate Full Proposal
//                 </button>
//                 <button
//                   type="button"
//                   className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md font-medium"
//                 >
//                   Save Draft
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }






// import React, { useState } from "react";
// import { DollarSign, Calendar, FileText, CheckCircle, Send } from "lucide-react";
// import Header from "../components/Header";

// export default function FundingProposalForm() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     amount: "",
//     duration: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Page Title */}
//           <div className="mb-10 text-center">
//             <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
//               Create Funding Proposals
//             </h1>
//             <p className="mt-2 text-lg text-gray-500">
//               Generate professional funding proposals with AI assistance
//             </p>
//           </div>

//           {/* Main Content Card */}
//           <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
//             <div className="flex items-center gap-4 mb-8">
//               <DollarSign className="w-8 h-8 text-[#002C79]" />
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Funding Proposals - Interactive Demo
//               </h2>
//             </div>

//             <p className="text-base text-gray-600 mb-8 max-w-2xl">
//               Explore the capabilities of our AI-powered funding proposal generator with this interactive preview.
//             </p>

//             {/* Form */}
//             <form className="space-y-8">
//               {/* Project Title */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-900 mb-2">
//                   Project Title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   placeholder="AI Powered Medical Diagnosis System"
//                   className="w-full border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#002C79] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
//                 />
//               </div>

//               {/* Project Description */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-900 mb-2">
//                   Project Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   placeholder="Our research aims to develop an AI-powered medical diagnosis system that can accurately identify diseases from medical images..."
//                   className="w-full border border-gray-200 rounded-lg p-4 h-36 text-sm focus:outline-none focus:ring-2 focus:ring-[#002C79] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white resize-none"
//                 />
//               </div>

//               {/* Funding Amount & Duration */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-900 mb-2">
//                     <DollarSign className="w-4 h-4 inline mr-1 text-[#002C79]" />
//                     Funding Amount
//                   </label>
//                   <input
//                     type="text"
//                     name="amount"
//                     value={formData.amount}
//                     onChange={handleInputChange}
//                     placeholder="$250,000"
//                     className="w-full border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#002C79] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-900 mb-2">
//                     <Calendar className="w-4 h-4 inline mr-1 text-[#002C79]" />
//                     Duration
//                   </label>
//                   <input
//                     type="text"
//                     name="duration"
//                     value={formData.duration}
//                     onChange={handleInputChange}
//                     placeholder="24 months"
//                     className="w-full border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#002C79] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
//                   />
//                 </div>
//               </div>

//               {/* Proposal Outline */}
//               <div className="mt-10">
//                 <div className="flex items-center gap-3 mb-4">
//                   <FileText className="w-6 h-6 text-[#002C79]" />
//                   <h3 className="text-xl font-bold text-gray-900">AI-Generated Proposal Outline</h3>
//                 </div>
//                 <div className="bg-gradient-to-r from-[#002C79]/5 to-[#175ACD]/5 rounded-xl p-6 border border-[#002C79]/10">
//                   <ul className="space-y-4 text-gray-700">
//                     {[
//                       "Executive Summary",
//                       "Problem Statement & Significance",
//                       "Research Methodology",
//                       "Budget Breakdown",
//                       "Timeline & Milestones",
//                     ].map((item) => (
//                       <li key={item} className="flex items-center gap-3">
//                         <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                         <span className="text-sm">{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex flex-col sm:flex-row gap-4 pt-6">
//                 <button
//                   type="button"
//                   className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white py-4 rounded-lg text-base font-semibold hover:shadow-lg transition-all duration-300"
//                 >
//                   <Send className="w-5 h-5" />
//                   Generate Full Proposal
//                 </button>
//                 <button
//                   type="button"
//                   className="px-6 py-4 border-2 border-[#002C79] text-[#002C79] rounded-lg text-base font-semibold hover:bg-[#002C79] hover:text-white transition-all duration-300"
//                 >
//                   Save Draft
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }









import React, { useState } from "react";
import { DollarSign, Calendar, FileText, CheckCircle, Send, Sparkles, TrendingUp, Target, Users } from "lucide-react";
import Header from "../components/Header";

export default function FundingProposalForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    duration: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const features = [
    { icon: <Sparkles className="w-5 h-5" />, text: "AI-Powered Generation" },
    { icon: <TrendingUp className="w-5 h-5" />, text: "Success Rate Analysis" },
    { icon: <Target className="w-5 h-5" />, text: "Goal-Oriented Structure" },
    { icon: <Users className="w-5 h-5" />, text: "Stakeholder Alignment" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      {/* <header className="bg-white shadow-md border-b border-gray-200">
        <div className="p-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#002C79] to-[#175ACD] bg-clip-text text-transparent">
            PaperPilot
          </div>
        </div>
      </header> */}
      <Header/>

      {/* Main Content */}
      <main className="flex-1 py-8 px-6">
        <div className=" mx-auto">
          {/* Hero Section */}
          <div className="mb-8">
            {/* <div className="bg-gradient-to-r from-[#002C79] to-[#175ACD] rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden"> */}
            <div className="bg-[#175ACD] rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <DollarSign className="w-9 h-9 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">Create Funding Proposals</h1>
                    <p className="text-blue-100 text-lg mt-1">AI-powered proposal generation for research funding</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-6 ">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-4 rounded-xl border border-white/20">
                      <div className="text-white">{feature.icon}</div>
                      <span className="text-sm text-white font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 ">
            
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#002C79] to-[#175ACD] rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Proposal Details</h2>
                    <p className="text-sm text-gray-600">Fill in your project information</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Project Title */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-gradient-to-r from-[#002C79] to-[#175ACD] rounded-full"></span>
                      Project Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="AI Powered Medical Diagnosis System"
                      className="w-full border-2 border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#002C79] focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    />
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-gradient-to-r from-[#002C79] to-[#175ACD] rounded-full"></span>
                      Project Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Our research aims to develop an AI-powered medical diagnosis system that can accurately identify diseases from medical images..."
                      className="w-full border-2 border-gray-200 rounded-xl p-4 h-40 text-sm focus:outline-none focus:ring-2 focus:ring-[#002C79] focus:border-transparent transition-all duration-300 hover:border-gray-300 resize-none"
                    />
                  </div>

                  {/* Funding Amount & Duration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#002C79]" />
                        Funding Amount
                      </label>
                      <input
                        type="text"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="$250,000"
                        className="w-full border-2 border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#002C79] focus:border-transparent transition-all duration-300 hover:border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#002C79]" />
                        Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="24 months"
                        className="w-full border-2 border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#002C79] focus:border-transparent transition-all duration-300 hover:border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white py-4 rounded-xl text-base font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Send className="w-5 h-5" />
                      Generate Full Proposal
                    </button>
                    <button
                      type="button"
                      className="px-8 py-4 border-2 border-[#002C79] text-[#002C79] rounded-xl text-base font-bold hover:bg-[#002C79] hover:text-white transition-all duration-300"
                    >
                      Save Draft
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Proposal Outline */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#002C79] to-[#175ACD] rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Proposal Outline</h3>
                </div>
                <div className="space-y-3">
                  {[
                    "Executive Summary",
                    "Problem Statement",
                    "Research Methodology",
                    "Budget Breakdown",
                    "Timeline & Milestones",
                  ].map((item, idx) => (
                    <div key={item} className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#002C79]/5 to-[#175ACD]/5 rounded-lg border border-[#002C79]/10">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6 border border-blue-200">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-[#002C79]" />
                  <h3 className="text-lg font-bold text-gray-900">Pro Tips</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#002C79] font-bold flex-shrink-0">•</span>
                    <span>Be specific about your research goals and expected outcomes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#002C79] font-bold flex-shrink-0">•</span>
                    <span>Include measurable milestones and deliverables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#002C79] font-bold flex-shrink-0">•</span>
                    <span>Justify your budget with detailed breakdowns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#002C79] font-bold flex-shrink-0">•</span>
                    <span>Highlight the broader impact of your research</span>
                  </li>
                </ul>
              </div>


            </div>
          </div>
        </div>
      </main>
    </div>
  );
}