"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [newsletters, setNewsletters] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next") || "/shop";

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push(redirectTo);
      }
    };
    checkUser();
  }, [router, redirectTo]);

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`,
        },
      });
      
      if (error) {
        if (error.message.includes("rate limit")) {
          throw new Error("Too many attempts. Please wait a few minutes before trying again.");
        }
        throw error;
      }
      setMessage("Magic link sent! Please check your email inbox (and spam folder) to complete your login.");
    } catch (error) {
      console.error("Auth error:", error.message);
      setMessage("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setMessage("");
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`
        }
      });
      if (error) {
        if (error.message.includes("provider is not enabled")) {
          throw new Error("Google login is currently disabled on the server. Please use your email instead.");
        }
        throw error;
      }
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-white px-4" style={{ paddingTop: "0px", paddingBottom: "60px" }}>
      <div className="w-full max-w-[420px] flex flex-col items-center relative bg-white" style={{ paddingTop: "20px" }}>
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 text-black no-underline" style={{ marginBottom: "6px", marginTop: "40px" }}>
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

        {/* SUBTITLE */}
        <p className="text-[#6B7280] text-[13px] font-semibold tracking-wide font-['Space_Grotesk',sans-serif]" style={{ marginBottom: "24px" }}>
          Use your email address to login or sign up
        </p>

        {/* FEEDBACK MESSAGE */}
        {message && (
          <div className={`w-[373px] mb-6 p-4 rounded-md text-xs font-bold font-['Space_Grotesk',sans-serif] ${message.startsWith("Error") ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>
            {message}
          </div>
        )}

        {/* FORM */}
        <form className="w-full flex flex-col items-center" onSubmit={handleContinue}>
          {/* EMAIL */}
          <div className="w-full flex justify-center" style={{ marginBottom: "12px" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={isLoading}
              className="border-2 border-black rounded-md px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500 font-['Space_Grotesk',sans-serif] disabled:opacity-50"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                width: "373px",
                height: "55px",
                paddingLeft: "20px"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white rounded-md text-sm font-bold hover:bg-gray-800 transition-colors cursor-pointer border-none flex items-center justify-center gap-2 disabled:bg-gray-400"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              marginBottom: "17px",
              width: "373px",
              height: "55px"
            }}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                PROCESSING...
              </span>
            ) : "Continue"}
          </button>

          <div className="flex items-center" style={{ width: "373px", marginBottom: "54px" }}>
            <input
              type="checkbox"
              id="newsletters"
              checked={newsletters}
              onChange={(e) => setNewsletters(e.target.checked)}
              className="w-4 h-4 rounded-sm border-gray-300 text-black focus:ring-black accent-black cursor-pointer shrink-0"
            />
            <label htmlFor="newsletters" className="text-[11px] font-bold text-[#4B5563] cursor-pointer" style={{ fontFamily: "'Space Grotesk', sans-serif", marginLeft: "12px" }}>
              Email me with news and Offers
            </label>
          </div>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center gap-4" style={{ marginBottom: "20px", width: "373px" }}>
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs font-bold text-gray-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Or log in with
          </span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* SOCIAL LOGINS */}
        <div className="flex justify-center" style={{ marginBottom: "20px" }}>
          <button 
            onClick={handleGoogleLogin}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer shadow-sm border border-gray-200"
            aria-label="Login with Google"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.52 12.2721C23.52 11.42 23.4437 10.5985 23.3019 9.80942H12V14.4647H18.4554C18.1772 15.9697 17.3047 17.2475 16.0396 18.0934V21.1118H19.9213C22.1931 19.0195 23.52 15.9329 23.52 12.2721Z" fill="#4285F4"/>
              <path d="M12.0001 24.0001C15.2405 24.0001 17.9649 22.9234 19.9214 21.1119L16.0397 18.0935C14.9818 18.8021 13.6133 19.2312 12.0001 19.2312C8.87556 19.2312 6.22956 17.1215 5.28913 14.3015H1.27258V17.4143C3.25057 21.3486 7.30607 24.0001 12.0001 24.0001Z" fill="#34A853"/>
              <path d="M5.28906 14.3015C5.04918 13.5828 4.91286 12.8055 4.91286 12.0001C4.91286 11.1947 5.04918 10.4173 5.28906 9.69871V6.58594H1.27251C0.466046 8.19888 0 10.0381 0 12.0001C0 13.9621 0.466046 15.8013 1.27251 17.4142L5.28906 14.3015Z" fill="#FBBC05"/>
              <path d="M12.0001 4.76882C13.7667 4.76882 15.347 5.37688 16.5958 6.57022L20.0051 3.16091C17.9592 1.25867 15.2348 0 12.0001 0C7.30607 0 3.25057 2.6515 1.27258 6.58591L5.28913 9.6987C6.22956 6.87878 8.87556 4.76882 12.0001 4.76882Z" fill="#EA4335"/>
            </svg>
          </button>
        </div>

        {/* FOOTER TEXT */}
        <div className="text-center">
          <span className="text-[11px] font-bold text-gray-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            By continuing, you agree to our <Link href="/terms" className="text-gray-400 underline hover:text-gray-600">Terms of service</Link>
          </span>
        </div>

      </div>
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
