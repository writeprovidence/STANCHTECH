"use client";

import React, { useEffect, useState } from "react";
import { Info, MapPin, Trash2, Plus, X } from "lucide-react";
import { supabase } from "@/lib/supabase";


export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    street: "",
    city: "",
    state: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email);
        setUsername(user.user_metadata?.full_name || user.email.split('@')[0]);
      }
    };
    fetchUser();
    
    const savedAddresses = JSON.parse(localStorage.getItem("stanchtech_addresses") || "[]");
    setAddresses(savedAddresses);
  }, []);


  const handleAddAddress = (e) => {
    e.preventDefault();
    const updated = [...addresses, { ...newAddress, id: Date.now() }];
    setAddresses(updated);
    localStorage.setItem("stanchtech_addresses", JSON.stringify(updated));
    setIsAddingAddress(false);
    setNewAddress({ label: "Home", street: "", city: "", state: "" });
  };

  const deleteAddress = (id) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    localStorage.setItem("stanchtech_addresses", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col gap-6 font-['Space_Grotesk',sans-serif]">
      {/* USER INFO BLOCK (Smaller Upper Box) */}
      <div className="bg-white p-6 border border-gray-100/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col gap-1">
          <h2 className="text-[14px] font-bold text-[#333] tracking-wide uppercase">
            Profile Details
          </h2>
          <div className="flex items-center gap-6 mt-2">
            <div>
              <p className="text-[11px] font-bold text-[#999] uppercase mb-0.5">Full Name</p>
              <p className="text-[14px] font-medium text-[#333]">{username || "Stanch User"}</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div>
              <p className="text-[11px] font-bold text-[#999] uppercase mb-0.5">Email Address</p>
              <p className="text-[14px] font-medium text-[#333]">{email || "user@example.com"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ADDRESSES BLOCK */}
      <div className="bg-white p-10 border border-gray-100/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)] min-h-[400px]">
        <div className="flex items-center gap-6 mb-8">
          <h3 className="text-[14px] font-bold text-[#333]">Addresses</h3>
          {!isAddingAddress && (
            <button 
              onClick={() => setIsAddingAddress(true)}
              className="text-[13px] font-bold text-black hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer flex items-center gap-1"
            >
              + Add
            </button>
          )}
        </div>

        {isAddingAddress ? (
          <form onSubmit={handleAddAddress} className="bg-[#FBFBFB] p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-black">New Address</h4>
              <button 
                type="button" 
                onClick={() => setIsAddingAddress(false)}
                className="text-gray-400 hover:text-black transition-colors bg-transparent border-none cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase text-[#999]">Label</label>
                <input 
                  required
                  value={newAddress.label}
                  onChange={e => setNewAddress({...newAddress, label: e.target.value})}
                  className="w-full h-11 px-4 bg-white border border-gray-200 rounded-sm text-[13px] font-medium outline-none focus:border-black transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase text-[#999]">Street Address</label>
                <input 
                  required
                  value={newAddress.street}
                  onChange={e => setNewAddress({...newAddress, street: e.target.value})}
                  className="w-full h-11 px-4 bg-white border border-gray-200 rounded-sm text-[13px] font-medium outline-none focus:border-black transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase text-[#999]">City</label>
                <input 
                  required
                  value={newAddress.city}
                  onChange={e => setNewAddress({...newAddress, city: e.target.value})}
                  className="w-full h-11 px-4 bg-white border border-gray-200 rounded-sm text-[13px] font-medium outline-none focus:border-black transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase text-[#999]">State / Province</label>
                <input 
                  required
                  value={newAddress.state}
                  onChange={e => setNewAddress({...newAddress, state: e.target.value})}
                  className="w-full h-11 px-4 bg-white border border-gray-200 rounded-sm text-[13px] font-medium outline-none focus:border-black transition-colors"
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="mt-8 w-full py-4 bg-black text-white rounded-sm text-[12px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors cursor-pointer border-none"
            >
              Save Address
            </button>
          </form>
        ) : addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map(addr => (
              <div key={addr.id} className="border border-gray-100 p-6 flex justify-between items-start group hover:border-gray-200 transition-colors bg-white">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-[#F5F5F5] text-[#555] rounded-sm self-start">
                    {addr.label}
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-[#333] mb-1">{addr.street}</p>
                    <p className="text-[12px] font-medium text-[#888]">{addr.city}, {addr.state}</p>
                  </div>
                </div>
                <button 
                  onClick={() => deleteAddress(addr.id)}
                  className="text-gray-300 hover:text-black transition-colors p-2 bg-transparent border-none cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#F8F9FA] border border-gray-100 rounded-[4px] p-6 flex items-center gap-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Info size={18} className="text-[#999]" />
            </div>
            <p className="text-[13px] font-medium text-[#666]">No Addresses added</p>
          </div>
        )}
      </div>
    </div>
  );
}
