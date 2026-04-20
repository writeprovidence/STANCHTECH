"use client";

import React, { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginContent() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next") || "/shop";

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white pt-20">
      {/* LOGO */}
      <Link href="/" className="flex items-center gap-2 text-black no-underline mb-12">
        <img
          src="/asset/Landing page_image/stanch_tech logo.png"
          alt="STANCH TECH"
          style={{ 
            height: "60px", 
            width: "auto", 
            objectFit: "contain",
            filter: "brightness(0)"
          }}
        />
        <span style={{
          fontSize: "20px",
          fontWeight: 900,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "'Neue Machina', sans-serif",
          color: "#000"
        }}>
          STANCHTECH
        </span>
      </Link>

      <SignIn 
        appearance={{
          elements: {
            rootBox: "w-full max-w-[400px]",
            card: "shadow-none border-2 border-black rounded-none",
            headerTitle: "font-['Neue_Machina'] text-xl uppercase tracking-wider",
            headerSubtitle: "font-['Space_Grotesk'] text-sm text-gray-500",
            formButtonPrimary: "bg-black hover:bg-gray-800 rounded-none h-12 text-sm font-bold uppercase tracking-widest",
            formFieldInput: "border-2 border-black rounded-none h-12 focus:ring-0 focus:border-blue-600 transition-all",
            footerActionLink: "text-blue-600 hover:text-blue-800 font-bold",
            identityPreviewText: "font-bold",
            formFieldLabel: "font-['Space_Grotesk'] text-xs font-bold uppercase text-gray-700",
          }
        }}
        signUpUrl="/login" // Can point to a separate signup, or Clerk will show signup tab
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
