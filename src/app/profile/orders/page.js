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
      <div className="bg-white p-12 border border-gray-100/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)] min-h-[500px] flex flex-col items-center justify-center text-center font-['Space_Grotesk',sans-serif]">
        <div className="w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center mb-6">
          <Clock size={20} className="text-[#999]" />
        </div>
        <h2 className="text-[15px] font-bold text-[#333] mb-2 uppercase tracking-wide">No orders yet</h2>
        <p className="text-[13px] font-medium text-[#888] mb-8 max-w-[300px] leading-relaxed">
          Your order history is currently empty. Shop our inventory to start your journey.
        </p>
        
        <Link 
          href="/shop"
          className="text-[13px] font-bold text-black border-b-2 border-black pb-1 hover:opacity-60 transition-opacity no-underline"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 font-['Space_Grotesk',sans-serif]">
      {/* HEADER BLOCK */}
      <div className="bg-white p-10 border border-gray-100/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-[15px] font-bold text-[#333] uppercase tracking-widest mb-1">
              Order History
            </h2>
            <p className="text-[13px] font-medium text-[#888]">
              Manage and track your recent transactions.
            </p>
          </div>
          <span className="text-[12px] font-bold text-[#333] opacity-60">
            {orders.length} TOTAL
          </span>
        </div>
      </div>

      {/* ORDERS LIST */}
      <div className="flex flex-col gap-4 mb-12">
        {orders.map((order, idx) => (
          <div key={idx} className="bg-white p-8 border border-gray-100/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all hover:bg-[#FBFBFB]">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#F5F5F5] flex items-center justify-center shrink-0">
                  <Package className="text-[#666]" size={20} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-bold text-black">{order.id}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-[#EEE] text-[#333] rounded-sm tracking-wide">
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[12px] font-medium text-[#888]">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="w-px h-3 bg-gray-200"></span>
                    <span>{order.items?.length || 0} ITEM{(order.items?.length || 0) === 1 ? '' : 'S'}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row lg:flex-col justify-between items-start lg:items-end gap-2 lg:min-w-[150px]">
                <span className="text-[10px] font-bold text-[#BBB] uppercase tracking-widest">Amount Paid</span>
                <span className="text-[18px] font-bold text-black border-b border-gray-100 pb-1 w-full lg:text-right">
                  NGN {order.total.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                 <button className="text-[12px] font-bold text-black hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer">
                   Details →
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

