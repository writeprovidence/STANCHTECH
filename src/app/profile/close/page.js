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
    <div className="bg-white p-8 md:p-16 rounded-md shadow-sm shadow-gray-100/50 min-h-[550px] border-l-4 border-red-600">
      <div className="max-w-[700px]">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
            <XCircle className="text-red-600" size={28} />
          </div>
          <h2 className="text-3xl font-900 text-black tracking-tighter uppercase font-['Neue_Machina',sans-serif]">
            Account Termination
          </h2>
        </div>

        <div className="bg-red-600 rounded-xl p-8 mb-12 text-white shadow-xl shadow-red-200">
          <div className="flex gap-6">
            <AlertTriangle className="shrink-0" size={32} />
            <div>
              <h3 className="text-lg font-black mb-2 uppercase tracking-wider font-['Space_Grotesk',sans-serif]">Permanent System Wipe</h3>
              <p className="text-[14px] font-semibold opacity-90 leading-relaxed font-['Space_Grotesk',sans-serif]">
                Warning: Closing your account will permanently delete your industrial profile, order history, and saved addresses. This action is irreversible and our systems will not be able to recover this data.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3 font-['Neue_Machina',sans-serif]">Step 01</span>
            <p className="text-[13px] font-bold text-gray-600 leading-relaxed font-['Space_Grotesk',sans-serif]">Personal data and trade information will be wiped.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3 font-['Neue_Machina',sans-serif]">Step 02</span>
            <p className="text-[13px] font-bold text-gray-600 leading-relaxed font-['Space_Grotesk',sans-serif]">Access to past invoices and parts lists will be lost.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3 font-['Neue_Machina',sans-serif]">Step 03</span>
            <p className="text-[13px] font-bold text-gray-600 leading-relaxed font-['Space_Grotesk',sans-serif]">Immediate session logout and redirect to index.</p>
          </div>
        </div>

        {!confirming ? (
          <button 
            onClick={() => setConfirming(true)}
            className="w-full sm:w-auto bg-black text-white px-10 py-5 rounded-md text-[13px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all duration-300 shadow-xl shadow-gray-200 font-['Space_Grotesk',sans-serif] cursor-pointer"
          >
            Initiate Account Closure
          </button>
        ) : (
          <div className="flex flex-col gap-6 p-8 bg-gray-50 rounded-xl border-2 border-dashed border-red-200 animate-in fade-in slide-in-from-bottom-4">
            <p className="text-[15px] font-bold text-red-600 font-['Space_Grotesk',sans-serif]">
              CRITICAL: Are you absolutely sure? This cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleCloseAccount}
                className="bg-red-600 text-white px-10 py-5 rounded-md text-[13px] font-black uppercase tracking-[0.2em] hover:bg-red-700 transition-all duration-300 shadow-xl shadow-red-200 flex items-center justify-center gap-3 font-['Space_Grotesk',sans-serif] cursor-pointer"
              >
                <Trash2 size={18} />
                Confirm Wipe
              </button>
              <button 
                onClick={() => setConfirming(false)}
                className="bg-white text-black border-2 border-gray-100 px-10 py-5 rounded-md text-[13px] font-black uppercase tracking-[0.2em] hover:border-black transition-all duration-300 font-['Space_Grotesk',sans-serif] cursor-pointer"
              >
                Abort Action
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}
