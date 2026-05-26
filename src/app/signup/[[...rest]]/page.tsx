"use client";

import React, { Suspense } from "react";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

function SignupContent() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 16px" }}>
      <SignUp 
        appearance={{
          elements: {
            card: "shadow-none border-2 border-black rounded-none w-full max-w-[450px]",
            logoBox: "hidden",
            headerTitle: "!text-base uppercase tracking-wider",
            headerSubtitle: "!text-sm text-gray-500 font-bold",
            formButtonPrimary: "bg-black hover:bg-gray-800 rounded-none !h-14 !text-base font-bold uppercase tracking-widest",
            formFieldInput: "border-2 border-black rounded-none !h-14 !text-base focus:ring-0 focus:border-blue-600 transition-all font-bold",
            footerActionText: "!text-sm",
            footerActionLink: "text-blue-600 hover:text-blue-800 font-bold !text-sm",
            identityPreviewText: "font-bold !text-sm",
            formFieldLabel: "!text-sm font-black uppercase text-gray-700",
            // Hide phone number related elements
            formField__phoneNumber: "hidden",
            phoneInput: "hidden",
            phoneNumberControl: "hidden",
          }
        }}
        signInUrl="/login"
        path="/signup"
        routing="path"
        forceRedirectUrl="/shop"
        fallbackRedirectUrl="/shop"
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
