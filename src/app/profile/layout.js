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
    { name: "Profile", path: "/profile", icon: <User size={20} strokeWidth={2.5} /> },
    { name: "Orders", path: "/profile/orders", icon: <PenLine size={20} strokeWidth={2.5} /> },
    { name: "Reviews", path: "/profile/reviews", icon: <MessageSquare size={20} strokeWidth={2.5} /> },
    { name: "Close Account", path: "/profile/close", icon: <XCircle size={20} strokeWidth={2.5} /> },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/shop");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 pb-16 px-4 md:px-12 font-['Space_Grotesk',sans-serif]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR */}
        <div className="w-full md:w-[280px] flex flex-col bg-white rounded-md overflow-hidden shrink-0 self-start shadow-sm shadow-gray-100/50">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-4 px-6 py-5 text-[12px] font-black no-underline uppercase tracking-widest transition-all duration-200 border-l-4
                    ${isActive ? "bg-blue-50/50 text-blue-600 border-blue-600" : "text-gray-400 hover:bg-gray-50 border-transparent hover:text-black"}
                  `}
                  style={{ fontFamily: "'Neue Machina', sans-serif" }}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}

          
          <div className="border-t border-gray-100 py-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-5 text-[12px] font-black text-gray-400 hover:bg-gray-50 hover:text-red-500 transition-all duration-200 cursor-pointer text-left border-none bg-transparent uppercase tracking-widest border-l-4 border-transparent"
              style={{ fontFamily: "'Neue Machina', sans-serif" }}
            >
              <LogOut size={20} strokeWidth={2.5} />
              LogOut
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col gap-8">
          {children}
        </div>
        
      </div>
    </div>
  );
}
