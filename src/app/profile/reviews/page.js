"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, ArrowUpRight } from "lucide-react";

export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-6 font-['Space_Grotesk',sans-serif]">
      {/* HEADER BLOCK */}
      <div className="bg-white p-10 border border-gray-100/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <h2 className="text-[15px] font-bold text-[#333] uppercase tracking-widest mb-1">
          Product Reviews
        </h2>
        <p className="text-[13px] font-medium text-[#888]">
          Your feedback on marine and industrial parts.
        </p>
      </div>

      {/* EMPTY STATE BLOCK */}
      <div className="bg-white p-12 border border-gray-100/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)] min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center mb-6">
          <MessageSquare size={20} className="text-[#999]" />
        </div>
        <h2 className="text-[15px] font-bold text-[#333] mb-2 uppercase tracking-wide">No Reviews Yet</h2>
        <p className="text-[13px] font-medium text-[#888] mb-8 max-w-[400px] leading-relaxed mx-auto">
          You haven't shared your experience with any products yet. Your reviews help the community find the best performance parts.
        </p>
        
        <div className="flex gap-4">
          <Link 
            href="/profile/orders"
            className="text-[13px] font-bold text-black border-b-2 border-black pb-1 hover:opacity-60 transition-opacity no-underline"
          >
            Review Orders
          </Link>
          <span className="text-gray-300">•</span>
          <Link 
            href="/shop"
            className="text-[13px] font-bold text-black border-b-2 border-black pb-1 hover:opacity-60 transition-opacity no-underline"
          >
            Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
