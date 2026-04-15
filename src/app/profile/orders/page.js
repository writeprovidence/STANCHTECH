"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Package, Clock } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="bg-white p-8 rounded-md shadow-sm shadow-gray-100/50 min-h-[500px] flex flex-col items-center justify-center text-center">
        <h2 className="text-[20px] font-bold text-black mb-3">No orders yet</h2>
        <p className="text-[13px] font-semibold text-gray-500 mb-8 max-w-[300px] mx-auto leading-relaxed">
          All your orders will be saved here for you to access their state anytime.
        </p>
        
        <Link 
          href="/shop"
          className="inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-md text-[13px] font-bold hover:bg-blue-700 transition-colors no-underline"
        >
          View Inventory
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-md shadow-sm shadow-gray-100/50 min-h-[500px]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-900 text-black mb-2 tracking-tighter uppercase" style={{ fontFamily: "'Neue Machina', sans-serif" }}>
            Order History
          </h2>
          <p className="text-[14px] font-semibold text-gray-500 font-['Space_Grotesk',sans-serif]">
            Track and manage your recent marine and industrial part orders.
          </p>
        </div>
        <span className="text-[12px] font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full font-['Space_Grotesk',sans-serif] w-fit">
          {orders.length} TOTAL {orders.length === 1 ? 'ORDER' : 'ORDERS'}
        </span>
      </div>

      <div className="space-y-6">
        {orders.map((order, idx) => (
          <div key={idx} className="border border-gray-100 rounded-xl p-6 md:p-8 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 bg-white group">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
                  <Package className="text-gray-400 group-hover:text-blue-500 transition-colors md:size-30" size={32} />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-lg font-bold text-black font-['Space_Grotesk',sans-serif]">{order.id}</span>
                    <span className="text-[10px] font-black uppercase px-3 py-1 bg-blue-600 text-white rounded-md tracking-wider">
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[13px] font-semibold text-gray-400 font-['Space_Grotesk',sans-serif]">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                    <span className="uppercase">{order.items?.length || 0} ITEM{(order.items?.length || 0) === 1 ? '' : 'S'}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row lg:flex-col justify-between items-start lg:items-end gap-2 lg:min-w-[150px] lg:border-l lg:border-gray-50 lg:pl-8">
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest font-['Neue_Machina',sans-serif]">Amount Paid</span>
                <span className="text-2xl font-900 text-black tracking-tighter font-['Neue_Machina',sans-serif]">
                  NGN {order.total.toLocaleString()}
                </span>
              </div>
              
              <div className="flex flex-row lg:flex-col gap-3 lg:min-w-[140px]">
                 <button className="flex-1 lg:w-full py-3 px-4 bg-black text-white text-[11px] font-bold uppercase tracking-widest rounded-md hover:bg-blue-600 transition-colors cursor-pointer border-none font-['Space_Grotesk',sans-serif]">
                   View Details
                 </button>
                 <button className="flex-1 lg:w-full py-3 px-4 bg-gray-50 text-black text-[11px] font-bold uppercase tracking-widest rounded-md hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200 font-['Space_Grotesk',sans-serif]">
                   Reorder
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

