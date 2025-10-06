// "use client";

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { usePaper } from "../contexts/PaperContext";
// import Header from "../components/Header";
// import apiService from "../services/api.js";
// import upload from "/assets/upload.png"
// import { FileText, Upload as UploadIcon, CheckCircle, AlertCircle } from "lucide-react";

// const UploadResearch = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { setProcessedPapersData, setIsProcessing: setGlobalProcessing } = usePaper();
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");

//   const handleFileUpload = (event, type) => {
//     const files = Array.from(event.target.files);
//     const newFiles = files.map(file => ({
//       id: Date.now() + Math.random(),
//       name: file.name,
//       size: file.size,
//       type: type,
//       file: file
//     }));
//     setUploadedFiles(prev => [...prev, ...newFiles]);
//   };

//   const handleProcessPapers = async () => {
//     if (uploadedFiles.length === 0) {
//       setMessage("Please upload at least one file before processing");
//       setMessageType("error");
//       return;
//     }

//     setIsProcessing(true);
//     setMessage("");

//     try {
//       // Upload files to backend
//       const fileIds = [];
//       for (const fileInfo of uploadedFiles) {
//         const response = await apiService.uploadFile(fileInfo.file, fileInfo.type);
//         fileIds.push(response.file_id);
//       }

//       // Process papers with enhanced AI (includes quality checks and plagiarism detection)
//       const processResponse = await apiService.processPapersEnhanced(fileIds, 'conference');
      
//       // Store processed papers in context
//       if (processResponse.success && processResponse.result) {
//         setProcessedPapersData(processResponse.result.formatted_papers || []);
//         setGlobalProcessing(false);
//       }
      
//       setMessage("Papers processed successfully! Redirecting to results...");
//       setMessageType("success");
      
//       setTimeout(() => {
//         navigate('/export');
//       }, 1500);
//     } catch (error) {
//       console.error('Processing failed:', error);
//       setMessage(`Failed to process papers: ${error.message}`);
//       setMessageType("error");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const removeFile = (fileId) => {
//     setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <Header />


//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <div className="max-w-5xl mx-auto">
//           <div className="border border-[#805454] rounded-md p-6 bg-white shadow">
//             {/* Title */}
//             <h2 className="text-2xl font-semibold mb-2 text-gray-800">Upload Your Research</h2>
//             <p className="text-base text-gray-600 mb-6 font-medium">
//               Start by uploading your base paper and reference documents
//             </p>

//           {/* Upload Sections */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Base Paper */}
//             <div className="border border-gray-300 rounded-md p-4">
//               <h3 className="font-semibold mb-4 text-xl">Base Paper</h3>
//               <div className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-6 text-center text-base text-gray-600">
//                 <img src={upload} alt="" />
//                 <p className="mb-2 font-bold text-black">Drop your base paper here</p>
//                 <p className="text-xs text-gray-500 mb-3">
//                   Supports PDF, DOCX, LaTeX files
//                 </p>
//                 <input
//                   type="file"
//                   id="base-paper"
//                   multiple
//                   accept=".pdf,.docx,.tex"
//                   onChange={(e) => handleFileUpload(e, 'base')}
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="base-paper"
//                   className="px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-100 cursor-pointer inline-block transition-all duration-300 transform hover:scale-105 hover:shadow-md"
//                 >
//                   Choose File
//                 </label>
//               </div>

//               {/* Meta fields */}
//               <div className="mt-4 space-y-3">
//                 <div>
//                   <label className="block text-base font-medium mb-1">Title (Optional)</label>
//                   <input
//                     type="text"
//                     placeholder="Enter title"
//                     className="w-full border px-3 py-2 rounded-md text-base focus:ring-2 focus:ring-[#647ffb] outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-base font-medium mb-1">Keywords (Optional)</label>
//                   <input
//                     type="text"
//                     placeholder="Enter keywords"
//                     className="w-full border px-3 py-2 rounded-md text-base focus:ring-2 focus:ring-[#647ffb] outline-none"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Reference Papers */}
//             <div className="border border-gray-300 rounded-md p-4">
//               <h3 className="font-semibold mb-4 text-xl">Reference Papers</h3>
//               <div className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-6 text-center text-base text-gray-600">
//                 <p className="mb-2 font-bold text-black">Drop your reference papers here</p>
//                 <p className="text-xs text-gray-500 mb-3">
//                   Supports PDF, DOCX, LaTeX files
//                 </p>
//                 <input
//                   type="file"
//                   id="reference-papers"
//                   multiple
//                   accept=".pdf,.docx,.tex"
//                   onChange={(e) => handleFileUpload(e, 'reference')}
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="reference-papers"
//                   className="px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-100 cursor-pointer inline-block transition-all duration-300 transform hover:scale-105 hover:shadow-md"
//                 >
//                   Add References
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Uploaded Files List */}
//           {uploadedFiles.length > 0 && (
//             <div className="mt-6">
//               <h3 className="text-lg font-semibold mb-3">Uploaded Files</h3>
//               <div className="space-y-2">
//                 {uploadedFiles.map((file) => (
//                   <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
//                     <div className="flex items-center gap-3">
//                       <FileText className="w-5 h-5 text-gray-500" />
//                       <div>
//                         <p className="font-medium text-sm">{file.name}</p>
//                         <p className="text-xs text-gray-500">
//                           {file.type} • {(file.size / 1024 / 1024).toFixed(2)} MB
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => removeFile(file.id)}
//                       className="text-red-500 hover:text-red-700 text-sm transition-all duration-300 transform hover:scale-110"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Message */}
//           {message && (
//             <div className={`mt-6 rounded-md p-4 ${
//               messageType === 'success' ? 'bg-green-50 border border-green-200 text-green-800' :
//               messageType === 'error' ? 'bg-red-50 border border-red-200 text-red-800' :
//               'bg-blue-50 border border-blue-200 text-blue-800'
//             }`}>
//               <div className="flex items-center gap-2">
//                 {messageType === 'success' ? (
//                   <CheckCircle className="w-5 h-5" />
//                 ) : messageType === 'error' ? (
//                   <AlertCircle className="w-5 h-5" />
//                 ) : (
//                   <UploadIcon className="w-5 h-5" />
//                 )}
//                 {message}
//               </div>
//             </div>
//           )}

//           {/* Process Button */}
//           <div className="mt-8 flex justify-center">
//             <button 
//               onClick={handleProcessPapers}
//               disabled={isProcessing || uploadedFiles.length === 0}
//               className="px-6 py-3 text-xl rounded-md bg-[#647ffb] text-white font-medium hover:bg-[#4b64d3] transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
//             >
//               {isProcessing ? (
//                 <>
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   <UploadIcon className="w-5 h-5" />
//                   Process Papers
//                 </>
//               )}
//             </button>
//           </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UploadResearch;









"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { usePaper } from "../contexts/PaperContext";
import Header from "../components/Header";
import apiService from "../services/api.js";
import upload from "/assets/upload.png"
import { FileText, Upload as UploadIcon, CheckCircle, AlertCircle, X, File, Clock, Zap } from "lucide-react";

const UploadResearch = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setProcessedPapersData, setIsProcessing: setGlobalProcessing } = usePaper();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [dragActive, setDragActive] = useState({ base: false, reference: false });

  const handleFileUpload = (event, type) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: type,
      file: file
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(prev => ({ ...prev, [type]: true }));
    } else if (e.type === "dragleave") {
      setDragActive(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [type]: false }));
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const newFiles = files.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: type,
        file: file
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleProcessPapers = async () => {
    if (uploadedFiles.length === 0) {
      setMessage("Please upload at least one file before processing");
      setMessageType("error");
      return;
    }

    setIsProcessing(true);
    setMessage("");

    try {
      // Upload files to backend
      const fileIds = [];
      for (const fileInfo of uploadedFiles) {
        const response = await apiService.uploadFile(fileInfo.file, fileInfo.type);
        fileIds.push(response.file_id);
      }

      // Process papers with enhanced AI (includes quality checks and plagiarism detection)
      const processResponse = await apiService.processPapersEnhanced(fileIds, 'conference');
      
      // Store processed papers in context
      if (processResponse.success && processResponse.result) {
        setProcessedPapersData(processResponse.result.formatted_papers || []);
        setGlobalProcessing(false);
      }
      
      setMessage("Papers processed successfully! Redirecting to results...");
      setMessageType("success");
      
      setTimeout(() => {
        navigate('/export');
      }, 1500);
    } catch (error) {
      console.error('Processing failed:', error);
      setMessage(`Failed to process papers: ${error.message}`);
      setMessageType("error");
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const baseFiles = uploadedFiles.filter(f => f.type === 'base');
  const referenceFiles = uploadedFiles.filter(f => f.type === 'reference');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Upload Your Research
            </h1>
            <p className="text-lg text-gray-600">
              Start by uploading your base paper and reference documents
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 border-2 border-blue-100 flex items-center gap-3">
              {/* <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center"> */}
              <div className="w-12 h-12 rounded-lg bg-[#2773ee] flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Fast Processing</p>
                <p className="text-sm text-gray-600">Results in minutes</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border-2 border-green-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#2773ee] flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Multiple Formats</p>
                <p className="text-sm text-gray-600">PDF, DOCX, LaTeX</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border-2 border-purple-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#2773ee] flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Save Time</p>
                <p className="text-sm text-gray-600">80% faster workflow</p>
              </div>
            </div>
          </div>

          {/* Upload Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Base Paper */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#175ACD] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-900">Base Paper</h3>
              </div>

              <div
                onDragEnter={(e) => handleDrag(e, 'base')}
                onDragLeave={(e) => handleDrag(e, 'base')}
                onDragOver={(e) => handleDrag(e, 'base')}
                onDrop={(e) => handleDrop(e, 'base')}
                className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-center transition-all duration-300 ${
                  dragActive.base 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <UploadIcon className="w-8 h-8 text-blue-600" />
                </div>
                <p className="mb-2 font-bold text-gray-900 text-lg">Drop your base paper here</p>
                <p className="text-sm text-gray-500 mb-4">
                  or click to browse files
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  Supports PDF, DOCX, LaTeX files (Max 50MB)
                </p>
                <input
                  type="file"
                  id="base-paper"
                  multiple
                  accept=".pdf,.docx,.tex"
                  onChange={(e) => handleFileUpload(e, 'base')}
                  className="hidden"
                />
                <label
                  htmlFor="base-paper"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white font-semibold hover:shadow-lg cursor-pointer inline-block transition-all duration-300 transform hover:scale-105"
                >
                  Choose File
                </label>
              </div>

              {/* Uploaded Base Files */}
              {baseFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Uploaded ({baseFiles.length})</p>
                  {baseFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <File className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Meta fields */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Title (Optional)</label>
                  <input
                    type="text"
                    placeholder="Enter paper title"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Keywords (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., machine learning, AI, research"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Reference Papers */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-green-200 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#175ACD] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-900">Reference Papers</h3>
              </div>

              <div
                onDragEnter={(e) => handleDrag(e, 'reference')}
                onDragLeave={(e) => handleDrag(e, 'reference')}
                onDragOver={(e) => handleDrag(e, 'reference')}
                onDrop={(e) => handleDrop(e, 'reference')}
                className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-center transition-all duration-300 ${
                  dragActive.reference 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <UploadIcon className="w-8 h-8 text-blue-600" />
                </div>
                <p className="mb-2 font-bold text-gray-900 text-lg">Drop reference papers here</p>
                <p className="text-sm text-gray-500 mb-4">
                  or click to browse files
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  Supports PDF, DOCX, LaTeX files (Max 50MB each)
                </p>
                <input
                  type="file"
                  id="reference-papers"
                  multiple
                  accept=".pdf,.docx,.tex"
                  onChange={(e) => handleFileUpload(e, 'reference')}
                  className="hidden"
                />
                <label
                  htmlFor="reference-papers"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white font-semibold hover:shadow-lg cursor-pointer inline-block transition-all duration-300 transform hover:scale-105"
                >
                  Add References
                </label>
              </div>

              {/* Uploaded Reference Files */}
              {referenceFiles.length > 0 && (
                <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Uploaded ({referenceFiles.length})</p>
                  {referenceFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-100">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <File className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-6 rounded-xl p-4 border-2 ${
              messageType === 'success' ? 'bg-green-50 border-green-200' :
              messageType === 'error' ? 'bg-red-50 border-red-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center gap-3">
                {messageType === 'success' ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : messageType === 'error' ? (
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                ) : (
                  <UploadIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                )}
                <p className={`font-medium ${
                  messageType === 'success' ? 'text-green-800' :
                  messageType === 'error' ? 'text-red-800' :
                  'text-blue-800'
                }`}>
                  {message}
                </p>
              </div>
            </div>
          )}

          {/* Process Button */}
          <div className="flex justify-center">
            <button 
              onClick={handleProcessPapers}
              disabled={isProcessing || uploadedFiles.length === 0}
              className="px-10 py-4 text-lg rounded-xl bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center gap-3"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Processing Papers...
                </>
              ) : (
                <>
                  <UploadIcon className="w-6 h-6" />
                  Process Papers ({uploadedFiles.length})
                </>
              )}
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Need help? Check our{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium underline">
                formatting guidelines
              </a>
              {" "}or{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium underline">
                contact support
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadResearch;