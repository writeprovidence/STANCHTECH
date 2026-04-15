"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, ArrowUpRight } from "lucide-react";

export default function ReviewsPage() {
  return (
    <div className="bg-white p-8 md:p-16 rounded-md shadow-sm shadow-gray-100/50 min-h-[550px] flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 border border-gray-100 shadow-sm">
        <MessageSquare size={40} className="text-gray-300" strokeWidth={1.5} />
      </div>
      
      <h2 className="text-3xl font-900 text-black mb-4 tracking-tighter uppercase font-['Neue_Machina',sans-serif]">
        Voice Your Experience
      </h2>
      
      <p className="text-[15px] font-semibold text-gray-500 mb-10 max-w-[400px] mx-auto leading-relaxed font-['Space_Grotesk',sans-serif]">
        You haven't reviewed any marine or industrial products yet. Your expert feedback helps our engineering community make better technical choices.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/profile/orders"
          className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-md text-[12px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 no-underline shadow-lg shadow-black/5 font-['Space_Grotesk',sans-serif]"
        >
          Review Recent Orders
          <ArrowUpRight size={18} strokeWidth={2.5} />
        </Link>
        
        <Link 
          href="/shop"
          className="inline-flex items-center justify-center gap-3 bg-white text-black border-2 border-gray-100 px-8 py-4 rounded-md text-[12px] font-black uppercase tracking-widest hover:border-black transition-all duration-300 no-underline font-['Space_Grotesk',sans-serif]"
        >
          Explore Catalog
        </Link>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-50 w-full">
        <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.2em] font-['Neue_Machina',sans-serif]">
          StanchTech Verified Reviews Program
        </p>
      </div>
    </div>

  );
}
