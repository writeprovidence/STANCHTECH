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

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(email);

  useEffect(() => {
    setTempEmail(email);
  }, [email]);

  return (
    <div className="flex flex-col gap-6 font-['Space_Grotesk',sans-serif]">
      {/* EMAIL ADDRESS SECTION */}
      <div className="bg-white border border-[#EBEBEB] rounded-[4px] overflow-hidden">
        <div className="p-8 pb-10">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[12px] font-bold text-[#828282]">Email Address</span>
            {!isEditingEmail ? (
                <button 
                  onClick={() => setIsEditingEmail(true)}
                  className="text-[12px] font-bold text-[#155DFC] hover:underline bg-transparent border-none cursor-pointer"
                >
                  Edit Address
                </button>
            ) : (
                <button 
                  onClick={() => setIsEditingEmail(false)}
                  className="text-[12px] font-bold text-[#155DFC] hover:underline bg-transparent border-none cursor-pointer"
                >
                  save
                </button>
            )}
          </div>
          
          <div className="mt-4">
            {!isEditingEmail ? (
                <p className="text-[14px] text-black font-medium">{email}</p>
            ) : (
                <div className="relative">
                  <input 
                    type="text"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    className="w-full border-b border-gray-200 py-2 text-[14px] font-medium focus:border-black outline-none transition-colors"
                  />
                </div>
            )}
          </div>
        </div>
      </div>

      {/* ADDRESSES SECTION */}
      <div className="bg-white border border-[#EBEBEB] rounded-[4px] overflow-hidden min-h-[400px] mb-20">
        <div className="p-8 pb-10">
          <div className="flex items-center gap-6 mb-8">
            <h3 className="text-[14px] font-bold text-black">Addresses</h3>
            {!isAddingAddress && (
              <button 
                onClick={() => setIsAddingAddress(true)}
                className="text-[13px] font-bold text-[#333] hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer flex items-center gap-1"
              >
                + Add
              </button>
            )}
          </div>

        {isAddingAddress ? (
          <form onSubmit={handleAddAddress} className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input 
                placeholder="first name"
                className="w-full h-[45px] px-4 bg-white border border-[#EBEBEB] rounded-[4px] text-[13px] font-medium outline-none focus:border-[#155DFC] transition-colors placeholder:text-[#bdbdbd]"
              />
              <input 
                placeholder="last name"
                className="w-full h-[45px] px-4 bg-white border border-[#EBEBEB] rounded-[4px] text-[13px] font-medium outline-none focus:border-[#155DFC] transition-colors placeholder:text-[#bdbdbd]"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input 
                placeholder="Phone number"
                className="w-full h-[45px] px-4 bg-white border border-[#EBEBEB] rounded-[4px] text-[13px] font-medium outline-none focus:border-[#155DFC] transition-colors placeholder:text-[#bdbdbd]"
              />
              <input 
                placeholder="additional phone number"
                className="w-full h-[45px] px-4 bg-white border border-[#EBEBEB] rounded-[4px] text-[13px] font-medium outline-none focus:border-[#155DFC] transition-colors placeholder:text-[#bdbdbd]"
              />
            </div>

            <input 
              placeholder="delivery address"
              className="w-full h-[45px] px-4 bg-white border border-[#EBEBEB] rounded-[4px] text-[13px] font-medium outline-none focus:border-[#155DFC] transition-colors placeholder:text-[#bdbdbd] mb-4"
            />
            
            <input 
              placeholder="landmark"
              className="w-full h-[45px] px-4 bg-white border border-[#EBEBEB] rounded-[4px] text-[13px] font-medium outline-none focus:border-[#155DFC] transition-colors placeholder:text-[#bdbdbd] mb-4"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="relative">
                <input 
                  placeholder="State"
                  className="w-full h-[45px] px-4 bg-white border border-[#EBEBEB] rounded-[4px] text-[13px] font-medium outline-none focus:border-[#155DFC] transition-colors placeholder:text-[#bdbdbd]"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="relative">
                <input 
                  placeholder="Area Council"
                  className="w-full h-[45px] px-4 bg-white border border-[#EBEBEB] rounded-[4px] text-[13px] font-medium outline-none focus:border-[#155DFC] transition-colors placeholder:text-[#bdbdbd]"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-10">
              <button 
                type="submit"
                className="w-[153px] py-4 bg-[#155DFC] text-white rounded-[6px] text-[13px] font-bold hover:bg-[#1149c7] transition-colors cursor-pointer border-none shadow-lg shadow-blue-200"
              >
                Save
              </button>
            </div>
          </form>
        ) : addresses.length > 0 ? (
          <div className="flex flex-col gap-4">
            {addresses.map(addr => (
              <div key={addr.id} className="bg-[#fbfcff] border border-[#EBEBEB] rounded-[4px] p-8 flex justify-between items-start group relative">
                <div className="flex items-start gap-4">
                  <Info size={18} className="text-[#9ca3af] mt-1 shrink-0" />
                  <div className="flex flex-col gap-1 pr-24">
                     <p className="text-[13.5px] leading-relaxed text-[#555] font-medium">
                        {addr.street}. {addr.city}, {addr.state}
                     </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => {}} // Handle edit
                    className="text-[12px] font-bold text-[#155DFC] hover:underline bg-transparent border-none cursor-pointer"
                  >
                    Edit Address
                  </button>
                  <button 
                    onClick={() => deleteAddress(addr.id)}
                    className="text-[#ff4d4f] opacity-0 group-hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#fbfcff] border border-[#EBEBEB] rounded-[6px] p-10 flex items-center gap-4">
            <Info size={20} className="text-[#9ca3af]" />
            <p className="text-[14px] font-medium text-[#828282]">No Addresses added</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
