// // "use client";

// // import { useState } from "react";
// // import { Mail, CheckCircle, XCircle, Loader2, Server } from "lucide-react";
// // import apiService from "../services/api.js";

// // export default function SMTPTest() {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [status, setStatus] = useState(null);
// //   const [message, setMessage] = useState("");

// //   const testSMTPConnection = async () => {
// //     setIsLoading(true);
// //     setMessage("");
// //     setStatus(null);

// //     try {
// //       const response = await apiService.getSMTPStatus();
      
// //       if (response.success) {
// //         setStatus('success');
// //         setMessage(`SMTP Status: ${response.data.status} - ${response.data.message}`);
// //       } else {
// //         setStatus('error');
// //         setMessage(`SMTP Error: ${response.data.message}`);
// //       }
// //     } catch (error) {
// //       setStatus('error');
// //       setMessage(`Connection Error: ${error.message}`);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const testServerHealth = async () => {
// //     setIsLoading(true);
// //     setMessage("");
// //     setStatus(null);

// //     try {
// //       const response = await apiService.checkServerHealth();
      
// //       if (response.success) {
// //         setStatus('success');
// //         setMessage(`Server Status: ${response.message} - Environment: ${response.environment}`);
// //       } else {
// //         setStatus('error');
// //         setMessage(`Server Error: ${response.message}`);
// //       }
// //     } catch (error) {
// //       setStatus('error');
// //       setMessage(`Server Error: ${error.message}`);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const testEmailSending = async () => {
// //     setIsLoading(true);
// //     setMessage("");
// //     setStatus(null);

// //     try {
// //       const testEmail = prompt("Enter your email address to test:");
// //       if (!testEmail) {
// //         setIsLoading(false);
// //         return;
// //       }

// //       const response = await apiService.sendCustomEmail(
// //         testEmail,
// //         "PaperPilot SMTP Test",
// //         `
// //           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
// //             <h2 style="color: #2c3e50;">🎉 SMTP Test Successful!</h2>
// //             <p>Hello!</p>
// //             <p>This is a test email from PaperPilot to verify that the SMTP authentication system is working correctly.</p>
            
// //             <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
// //               <h3 style="color: #28a745; margin-top: 0;">✅ SMTP Features Working:</h3>
// //               <ul style="color: #333;">
// //                 <li>Email sending functionality</li>
// //                 <li>HTML email templates</li>
// //                 <li>SMTP server connection</li>
// //                 <li>Authentication system</li>
// //               </ul>
// //             </div>
            
// //             <p>If you received this email, the PaperPilot SMTP system is fully operational!</p>
            
// //             <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
// //             <p style="color: #666; font-size: 12px;">
// //               PaperPilot Research Platform - SMTP Test Email<br>
// //               This is an automated test message.
// //             </p>
// //           </div>
// //         `,
// //         "PaperPilot Test"
// //       );
      
// //       if (response.success) {
// //         setStatus('success');
// //         setMessage(`Test email sent successfully! Check your inbox at ${testEmail}`);
// //       } else {
// //         setStatus('error');
// //         setMessage(`Failed to send test email: ${response.message}`);
// //       }
// //     } catch (error) {
// //       setStatus('error');
// //       setMessage(`Email Test Error: ${error.message}`);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
// //       <div className="text-center mb-6">
// //         <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
// //           <Server className="h-8 w-8 text-blue-600" />
// //         </div>
// //         <h2 className="text-2xl font-bold text-gray-900">SMTP Connection Test</h2>
// //         <p className="text-gray-600 mt-2">
// //           Test the connection between frontend and backend SMTP system
// //         </p>
// //       </div>

// //       <div className="space-y-4">
// //         {/* Server Health Test */}
// //         <button
// //           onClick={testServerHealth}
// //           disabled={isLoading}
// //           className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
// //         >
// //           {isLoading ? (
// //             <Loader2 className="animate-spin h-5 w-5" />
// //           ) : (
// //             <CheckCircle className="h-5 w-5" />
// //           )}
// //           Test Server Health
// //         </button>

// //         {/* SMTP Status Test */}
// //         <button
// //           onClick={testSMTPConnection}
// //           disabled={isLoading}
// //           className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
// //         >
// //           {isLoading ? (
// //             <Loader2 className="animate-spin h-5 w-5" />
// //           ) : (
// //             <Mail className="h-5 w-5" />
// //           )}
// //           Test SMTP Status
// //         </button>

// //         {/* Email Sending Test */}
// //         <button
// //           onClick={testEmailSending}
// //           disabled={isLoading}
// //           className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
// //         >
// //           {isLoading ? (
// //             <Loader2 className="animate-spin h-5 w-5" />
// //           ) : (
// //             <Mail className="h-5 w-5" />
// //           )}
// //           Send Test Email
// //         </button>
// //       </div>

// //       {/* Status Message */}
// //       {message && (
// //         <div className={`mt-6 rounded-md p-4 ${
// //           status === 'success' ? 'bg-green-50 border border-green-200' :
// //           status === 'error' ? 'bg-red-50 border border-red-200' :
// //           'bg-blue-50 border border-blue-200'
// //         }`}>
// //           <div className="flex">
// //             <div className="flex-shrink-0">
// //               {status === 'success' ? (
// //                 <CheckCircle className="h-5 w-5 text-green-400" />
// //               ) : status === 'error' ? (
// //                 <XCircle className="h-5 w-5 text-red-400" />
// //               ) : (
// //                 <Mail className="h-5 w-5 text-blue-400" />
// //               )}
// //             </div>
// //             <div className="ml-3">
// //               <p className={`text-sm font-medium ${
// //                 status === 'success' ? 'text-green-800' :
// //                 status === 'error' ? 'text-red-800' :
// //                 'text-blue-800'
// //               }`}>
// //                 {message}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Instructions */}
// //       <div className="mt-6 p-4 bg-gray-50 rounded-md">
// //         <h3 className="text-sm font-medium text-gray-900 mb-2">Test Instructions:</h3>
// //         <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
// //           <li>First, test server health to ensure backend is running</li>
// //           <li>Then test SMTP status to verify email configuration</li>
// //           <li>Finally, send a test email to verify full functionality</li>
// //         </ol>
// //       </div>
// //     </div>
// //   );
// // }



"use client";

import { useState } from "react";
import { Mail, CheckCircle, XCircle, Loader2, Server } from "lucide-react";
import apiService from "../services/api.js";

export default function SMTPTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const testSMTPConnection = async () => {
    setIsLoading(true);
    setMessage("");
    setStatus(null);

    try {
      const response = await apiService.getSMTPStatus();
      
      if (response.success) {
        setStatus('success');
        setMessage(`SMTP Status: ${response.data.status} - ${response.data.message}`);
      } else {
        setStatus('error');
        setMessage(`SMTP Error: ${response.data.message}`);
      }
    } catch (error) {
      setStatus('error');
      setMessage(`Connection Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testServerHealth = async () => {
    setIsLoading(true);
    setMessage("");
    setStatus(null);

    try {
      const response = await apiService.checkServerHealth();
      
      if (response.success) {
        setStatus('success');
        setMessage(`Server Status: ${response.message} - Environment: ${response.environment}`);
      } else {
        setStatus('error');
        setMessage(`Server Error: ${response.message}`);
      }
    } catch (error) {
      setStatus('error');
      setMessage(`Server Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testEmailSending = async () => {
    setIsLoading(true);
    setMessage("");
    setStatus(null);

    try {
      const testEmail = prompt("Enter your email address to test:");
      if (!testEmail) {
        setIsLoading(false);
        return;
      }

      const response = await apiService.sendCustomEmail(
        testEmail,
        "PaperPilot SMTP Test",
        `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #002C79;">🎉 SMTP Test Successful!</h2>
            <p>Hello!</p>
            <p>This is a test email from PaperPilot to verify that the SMTP authentication system is working correctly.</p>
            
            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #28a745; margin-top: 0;">✅ SMTP Features Working:</h3>
              <ul style="color: #333;">
                <li>Email sending functionality</li>
                <li>HTML email templates</li>
                <li>SMTP server connection</li>
                <li>Authentication system</li>
              </ul>
            </div>
            
            <p>If you received this email, the PaperPilot SMTP system is fully operational!</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              PaperPilot Research Platform - SMTP Test Email<br>
              This is an automated test message.
            </p>
          </div>
        `,
        "PaperPilot Test"
      );
      
      if (response.success) {
        setStatus('success');
        setMessage(`Test email sent successfully! Check your inbox at ${testEmail}`);
      } else {
        setStatus('error');
        setMessage(`Failed to send test email: ${response.message}`);
      }
    } catch (error) {
      setStatus('error');
      setMessage(`Email Test Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="text-center mb-6">
        <div className="mx-auto h-14 w-14 bg-gradient-to-r from-[#002C79]/10 to-[#175ACD]/10 rounded-full flex items-center justify-center mb-4">
          <Server className="h-7 w-7 text-[#002C79]" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight bg-gradient-to-r from-[#002C79] to-[#175ACD] bg-clip-text text-transparent">
          SMTP Connection Test
        </h2>
        <p className="text-base text-gray-600 mt-2 max-w-xs mx-auto">
          Test the connection between frontend and backend SMTP system
        </p>
      </div>

      <div className="space-y-4">
        {/* Server Health Test */}
        <button
          onClick={testServerHealth}
          disabled={isLoading}
          className="max-w-xs mx-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:ring-[#1E3A8A]/50 transition-all duration-300"
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <CheckCircle className="h-5 w-5" />
          )}
          Test Server Health
        </button>

        {/* SMTP Status Test */}
        <button
          onClick={testSMTPConnection}
          disabled={isLoading}
          className="max-w-xs mx-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:ring-[#1E3A8A]/50 transition-all duration-300"
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <Mail className="h-5 w-5" />
          )}
          Test SMTP Status
        </button>

        {/* Email Sending Test */}
        <button
          onClick={testEmailSending}
          disabled={isLoading}
          className="max-w-xs mx-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#002C79] to-[#175ACD] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:ring-[#1E3A8A]/50 transition-all duration-300"
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <Mail className="h-5 w-5" />
          )}
          Send Test Email
        </button>
      </div>

      {/* Status Message */}
      {message && (
        <div
          className={`mt-6 rounded-xl p-4 border ${
            status === "success"
              ? "bg-gradient-to-r from-[#002C79]/10 to-[#175ACD]/10 border-[#1E3A8A]/20"
              : status === "error"
              ? "bg-red-50 border-red-200"
              : "bg-gray-50 border-gray-200"
          } animate-fade-in`}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {status === "success" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : status === "error" ? (
                <XCircle className="h-5 w-5 text-red-500" />
              ) : (
                <Mail className="h-5 w-5 text-[#002C79]" />
              )}
            </div>
            <div>
              <p
                className={`text-sm font-semibold ${
                  status === "success"
                    ? "text-green-800"
                    : status === "error"
                    ? "text-red-800"
                    : "text-[#1E3A8A]"
                }`}
              >
                {message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#002C79]/5 to-[#175ACD]/5 rounded-xl border border-[#1E3A8A]/10">
        <h3 className="text-base font-bold text-gray-900 mb-3">Test Instructions</h3>
        <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
          {[
            "First, test server health to ensure backend is running",
            "Then test SMTP status to verify email configuration",
            "Finally, send a test email to verify full functionality",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}