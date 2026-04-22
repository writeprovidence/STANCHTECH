"use client";

import React, { Suspense } from "react";
import { SignUp } from "@clerk/nextjs";

function SignupContent() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 16px" }}>
      <SignUp 
        appearance={{
          elements: {
            rootBox: "w-full max-w-[400px]",
            card: "shadow-none border-2 border-black rounded-none",
            logoBox: "hidden",
            headerTitle: "font-['Neue_Machina'] text-xl uppercase tracking-wider",
            headerSubtitle: "font-['Space_Grotesk'] text-sm text-gray-500",
            formButtonPrimary: "bg-black hover:bg-gray-800 rounded-none h-12 text-sm font-bold uppercase tracking-widest",
            formFieldInput: "border-2 border-black rounded-none h-12 focus:ring-0 focus:border-blue-600 transition-all",
            footerActionLink: "text-blue-600 hover:text-blue-800 font-bold",
            identityPreviewText: "font-bold",
            formFieldLabel: "font-['Space_Grotesk'] text-xs font-bold uppercase text-gray-700",
            // Hide phone number related elements if they appear
            formField__phoneNumber: "hidden",
            phoneInput: "hidden",
            phoneNumberControl: "hidden",
          }
        }}
        signInUrl="/login"
        path="/signup"
        routing="path"
      />
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
      </div>
    }>
      <SignupContent />
    </Suspense>
  );
}
