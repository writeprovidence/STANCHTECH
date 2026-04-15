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
    <>
      {/* USER INFO BLOCK */}
      <div className="bg-white p-8 md:p-12 rounded-md shadow-sm shadow-gray-100/50 flex flex-col md:flex-row items-center justify-between gap-8 border-b-4 border-blue-600">
        <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="w-24 h-24 bg-black rounded-2xl flex items-center justify-center text-white font-900 text-4xl uppercase shadow-xl shadow-blue-500/10 font-['Neue_Machina',sans-serif]">
            {username ? username[0] : "U"}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
              <h2 className="text-3xl font-900 text-gray-900 capitalize tracking-tighter" style={{ fontFamily: "'Neue Machina', sans-serif" }}>
                {username || "Stanch User"}
              </h2>
              <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest font-['Space_Grotesk',sans-serif]">
                Verified Partner
              </span>
            </div>
            <p className="text-[15px] font-semibold text-gray-400 font-['Space_Grotesk',sans-serif]">
              Account: <span className="text-gray-900">{email || "user@example.com"}</span>
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
           <button className="bg-[#F8F9FA] text-black border border-gray-200 px-6 py-3 rounded-md text-[12px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors font-['Space_Grotesk',sans-serif] cursor-pointer">
             Edit Profile
           </button>
        </div>
      </div>

      {/* ADDRESSES BLOCK */}
      <div className="bg-white p-8 rounded-md shadow-sm shadow-gray-100/50 min-h-[400px]">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-black" />
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Shipping Addresses</h3>
          </div>
          {!isAddingAddress && (
            <button 
              onClick={() => setIsAddingAddress(true)}
              className="text-[11px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-md transition-colors flex items-center gap-2 cursor-pointer border-none"
            >
              <Plus size={14} />
              Add New Address
            </button>
          )}
        </div>

        {isAddingAddress ? (
          <form onSubmit={handleAddAddress} className="bg-[#F8F9FA] p-6 rounded-lg border border-gray-100 animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">New Address</h4>
              <button 
                type="button" 
                onClick={() => setIsAddingAddress(false)}
                className="text-gray-400 hover:text-black transition-colors bg-transparent border-none cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-400">Label (e.g. Home, Office)</label>
                <input 
                  required
                  value={newAddress.label}
                  onChange={e => setNewAddress({...newAddress, label: e.target.value})}
                  className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-[13px] font-medium outline-none focus:border-black"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-400">Street Address</label>
                <input 
                  required
                  value={newAddress.street}
                  onChange={e => setNewAddress({...newAddress, street: e.target.value})}
                  className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-[13px] font-medium outline-none focus:border-black"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-400">City</label>
                <input 
                  required
                  value={newAddress.city}
                  onChange={e => setNewAddress({...newAddress, city: e.target.value})}
                  className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-[13px] font-medium outline-none focus:border-black"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-400">State / Province</label>
                <input 
                  required
                  value={newAddress.state}
                  onChange={e => setNewAddress({...newAddress, state: e.target.value})}
                  className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-[13px] font-medium outline-none focus:border-black"
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="mt-6 w-full py-3 bg-black text-white rounded-md text-[12px] font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Save Address
            </button>
          </form>
        ) : addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map(addr => (
              <div key={addr.id} className="border border-gray-100 rounded-lg p-5 flex justify-between items-start group hover:border-gray-200 transition-colors bg-white">
                <div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-gray-100 text-gray-600 rounded-sm mb-3 inline-block">
                    {addr.label}
                  </span>
                  <p className="text-[13px] font-bold text-gray-900 mb-1">{addr.street}</p>
                  <p className="text-[12px] font-semibold text-gray-500">{addr.city}, {addr.state}</p>
                </div>
                <button 
                  onClick={() => deleteAddress(addr.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-2 bg-transparent border-none cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#F8F9FA] border border-gray-200 rounded-md p-10 flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Info size={20} className="text-gray-400" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-gray-900 mb-1">No addresses saved</p>
              <p className="text-[12px] font-semibold text-gray-500 max-w-[200px]">Save your shipping addresses for a faster checkout experience.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
