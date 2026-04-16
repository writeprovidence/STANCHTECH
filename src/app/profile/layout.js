"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, PenLine, MessageSquare, XCircle, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";


export default function ProfileLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isChecking, setIsChecking] = useState(true);

  // Real auth check with Supabase
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login?redirect=" + pathname);
      } else {
        setIsChecking(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsChecking(false);
      } else if (event === 'SIGNED_OUT') {
        router.push("/login?redirect=" + pathname);
      }
    });

    checkSession();

    return () => subscription.unsubscribe();
  }, [router, pathname]);


  if (isChecking) {
     return (
       <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
         <div className="w-12 h-12 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
         <p className="font-['Neue_Machina',sans-serif] text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Verifying Identity</p>
       </div>
     );
  }


  const navItems = [
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
    { name: "Orders", path: "/profile/orders", icon: <PenLine size={18} /> },
    { name: "Reviews", path: "/profile/reviews", icon: <MessageSquare size={18} /> },
    { name: "Close Account", path: "/profile/close", icon: <XCircle size={18} /> },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/shop");
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-['Space_Grotesk',sans-serif] pt-[120px] pb-20">
      
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-10 px-4 md:px-12">
        
        {/* SIDEBAR (W=270, H=514) */}
        <div className="w-[270px] h-[514px] flex flex-col bg-white shrink-0 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] self-start sticky top-[100px]">
            <div className="flex flex-col py-6">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`flex items-center gap-4 px-10 py-5 text-[15px] font-medium no-underline transition-all duration-200
                      ${isActive ? "bg-[#F5F5F5] text-black" : "text-[#777] hover:bg-gray-50 hover:text-black"}
                    `}
                  >
                    <span className="opacity-80">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </div>

          
          <div className="mt-auto border-t border-gray-100 py-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-10 py-5 text-[15px] font-medium text-[#777] hover:bg-gray-50 hover:text-black transition-all duration-200 cursor-pointer text-left border-none bg-transparent"
            >
              <span className="opacity-80"><LogOut size={18} /></span>
              LogOut
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 min-h-[600px]">
          <div className="max-w-[900px]">
            {children}
          </div>
        </div>
        
      </div>
    </div>
  );
}
