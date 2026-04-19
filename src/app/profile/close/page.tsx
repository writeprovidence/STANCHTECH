"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Trash2, XCircle } from "lucide-react";

export default function CloseAccountPage() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  const handleCloseAccount = () => {
    // Dummy logic for now
    localStorage.removeItem("stanchtech_user");
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-6 font-['Space_Grotesk',sans-serif]">
      {/* HEADER BLOCK */}
      <div className="bg-white p-10 border border-gray-100/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <h2 className="text-[15px] font-bold text-[#333] uppercase tracking-widest mb-1">
          Account Termination
        </h2>
        <p className="text-[13px] font-medium text-[#888]">
          Permanently close your StanchTech profile.
        </p>
      </div>

      {/* WARNING CONTENT */}
      <div className="bg-white p-10 border border-gray-100/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-[700px]">
          <div className="flex items-start gap-6 bg-[#FEF2F2] p-8 border border-red-50 mb-10">
            <AlertTriangle className="shrink-0 text-[#B91C1C]" size={24} />
            <div>
              <h3 className="text-[14px] font-bold text-[#B91C1C] uppercase mb-2 tracking-wide">Permanent System Wipe</h3>
              <p className="text-[13px] font-medium text-[#7F1D1D] opacity-80 leading-relaxed">
                Warning: Closing your account will permanently delete your industrial profile, order history, and saved addresses. This action is irreversible.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { step: "01", text: "Personal data and trade information will be wiped." },
              { step: "02", text: "Access to past invoices and lists will be lost." },
              { step: "03", text: "Immediate session logout and redirect." }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-[#FBFBFB] border border-gray-100">
                <span className="text-[10px] font-bold text-[#999] uppercase tracking-widest block mb-4">{item.step}</span>
                <p className="text-[12px] font-medium text-[#555] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {!confirming ? (
            <button 
              onClick={() => setConfirming(true)}
              className="px-10 py-4 bg-black text-white text-[12px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors cursor-pointer border-none"
            >
              Initiate Closure
            </button>
          ) : (
            <div className="flex flex-col gap-6 p-8 bg-[#FEF2F2] border border-red-100">
              <p className="text-[13px] font-bold text-red-700">
                CRITICAL: Are you absolutely sure? This cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleCloseAccount}
                  className="bg-red-600 text-white px-8 py-4 text-[12px] font-bold uppercase tracking-widest hover:bg-red-700 transition-colors cursor-pointer border-none"
                >
                  Confirm Wipe
                </button>
                <button 
                  onClick={() => setConfirming(false)}
                  className="bg-white text-black border border-gray-200 px-8 py-4 text-[12px] font-bold uppercase tracking-widest hover:border-black transition-colors cursor-pointer"
                >
                  Abort Action
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
