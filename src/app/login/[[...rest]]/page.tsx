"use client";

import React, { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginContent() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next") || "/shop";

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 16px" }}>

      <SignIn 
        appearance={{
          elements: {
            rootBox: "w-full max-w-[400px]",
            card: "shadow-none border-2 border-black rounded-none",
            logoBox: "hidden",
            headerTitle: "!text-2xl uppercase tracking-wider",
            headerSubtitle: "!text-xl text-gray-500 font-bold",
            formButtonPrimary: "bg-black hover:bg-gray-800 rounded-none !h-14 !text-base font-bold uppercase tracking-widest",
            formFieldInput: "border-2 border-black rounded-none !h-14 !text-lg focus:ring-0 focus:border-blue-600 transition-all font-bold",
            footerActionText: "!text-base",
            footerActionLink: "text-blue-600 hover:text-blue-800 font-bold !text-base",
            identityPreviewText: "font-bold !text-base",
            formFieldLabel: "!text-base font-black uppercase text-gray-700",
            // Hide phone number related elements
            formField__phoneNumber: "hidden",
            phoneInput: "hidden",
            phoneNumberControl: "hidden",
          }
        }}
        signUpUrl="/signup"
        path="/login"
        routing="path"
        forceRedirectUrl={redirectTo}
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
