'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ChevronRight, Package, Box, Clock, CheckCircle2 } from "lucide-react";

export default function OrdersPage() {
    const { data: session } = useSession();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(savedOrders);
    }, []);

    return (
        <div className="bg-white min-h-screen pt-20">
            {/* --- HERO SECTION --- */}
            <section className="relative h-[320px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/asset/about_image/built on excellence.png" 
                        alt="Orders Hero" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0b1a2e]/70 backdrop-blur-[2px]" />
                </div>
                
                <div className="relative z-10 text-center">
                    <h1 className="text-6xl font-900 text-white mb-6 tracking-tight" style={{ fontFamily: "'Neue Machina', sans-serif", letterSpacing: "-0.04em" }}>My Orders</h1>
                    <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.2em]">
                        <Link href="/shop" className="text-white hover:text-blue-400 transition-colors" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Shop</Link>
                        <ChevronRight size={14} className="text-blue-400" />
                        <span className="text-white/60" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Dashboard</span>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-10 md:px-24 py-24">
                <div className="max-w-6xl mx-auto">
                    {orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center space-y-12 py-32 border-2 border-dashed border-gray-100 rounded-[3rem] bg-gray-50/30">
                            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-gray-200 shadow-xl">
                                <Package size={48} />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-900 text-gray-900 tracking-tight" style={{ fontFamily: "'Neue Machina', sans-serif" }}>No orders yet</h2>
                                <p className="text-gray-400 font-bold text-lg" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>You haven't placed any orders with us yet.</p>
                            </div>
                            <Link href="/shop" className="px-16 py-5 bg-gray-900 text-white rounded-xl font-900 uppercase tracking-[0.2em] text-[12px] hover:bg-blue-600 transition-all shadow-xl shadow-gray-200" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            <div className="flex items-center justify-between border-b-2 border-gray-50 pb-8">
                                <h2 className="text-2xl font-900 text-gray-900" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Recent Purchases ({orders.length})</h2>
                                <button className="text-sm font-bold text-blue-600 hover:text-gray-900 transition-colors uppercase tracking-widest" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Download All Invoices</button>
                            </div>

                            <div className="grid grid-cols-1 gap-8">
                                {orders.map((order, idx) => (
                                    <div key={idx} className="bg-white border-2 border-gray-50 rounded-[2rem] p-10 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group">
                                        <div className="flex flex-col lg:flex-row justify-between gap-10">
                                            <div className="space-y-6 flex-1">
                                                <div className="flex items-center gap-6">
                                                    <div className="px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-900 uppercase tracking-widest" style={{ fontFamily: "'Neue Machina', sans-serif" }}>
                                                        {order.status}
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{order.id}</span>
                                                    {(order.paymentMethod || order.deliveryMethod) && (
                                                        <div className="flex gap-2">
                                                            {order.paymentMethod && (
                                                                <span className="px-3 py-1 rounded bg-gray-100 text-[#666] text-[10px] font-bold uppercase tracking-wider">
                                                                    {order.paymentMethod === 'bank' ? 'Bank Transfer' : 'COD'}
                                                                </span>
                                                            )}
                                                            {order.deliveryMethod && (
                                                                <span className="px-3 py-1 rounded bg-gray-100 text-[#666] text-[10px] font-bold uppercase tracking-wider">
                                                                    {order.deliveryMethod === 'home' ? 'Home Delivery' : 'Pickup'}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <h3 className="text-3xl font-900 text-gray-900" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                                    {order.items.length} {order.items.length === 1 ? 'Part' : 'Parts'} Purchased
                                                </h3>
                                                <div className="flex gap-4">
                                                    {order.items.map((item, itemIdx) => (
                                                        <div key={itemIdx} className="w-16 h-16 rounded-xl bg-gray-50 p-2 flex items-center justify-center border border-gray-100">
                                                            <img src={item.image} alt="Part" className="w-full h-full object-contain" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-between items-end gap-6">
                                                <div className="text-right">
                                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest block mb-2" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Total Amount</span>
                                                    <span className="text-4xl font-900 text-blue-600 block" style={{ fontFamily: "'Neue Machina', sans-serif" }}>NGN {order.total.toLocaleString()}</span>
                                                </div>
                                                <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <div className="container mx-auto px-10 md:px-24 py-12 border-t border-gray-50 mt-auto flex flex-wrap gap-8 text-[12px] font-bold text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                <Link href="#" className="hover:text-blue-600 transition-colors">Refund policy</Link>
                <Link href="#" className="hover:text-blue-600 transition-colors">Privacy policy</Link>
                <Link href="#" className="hover:text-blue-600 transition-colors">Terms of service</Link>
                <div className="ml-auto text-gray-300">© 2024 Stanch Tech Limited</div>
            </div>
        </div>
    );
}
