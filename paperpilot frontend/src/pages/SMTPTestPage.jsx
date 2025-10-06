// "use client";

// import SMTPTest from "../components/SMTPTest.jsx";

// export default function SMTPTestPage() {
//   return (
//     <div className="min-h-screen bg-gray-100 py-12">
//       <div className="container mx-auto px-4">
//         <SMTPTest />
//       </div>
//     </div>
//   );
// }


"use client";

import React from "react";
import SMTPTest from "../components/SMTPTest.jsx";
import Header from "../components/Header";

export default function SMTPTestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex justify-center py-16 px-6 sm:px-8 lg:px-12">
        <SMTPTest />
      </main>
    </div>
  );
}