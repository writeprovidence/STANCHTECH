'use client';

import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { ChevronRight, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
    const { cartItems, addToCart, removeFromCart, updateQuantity, cartTotal } = useCart();

    return (
        <div className="bg-white min-h-screen pt-20">
            {/* --- HERO SECTION --- */}
            <section className="relative h-[320px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/asset/about_image/built on excellence.png" 
                        alt="Cart Hero" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0b1a2e]/70 backdrop-blur-[2px]" />
                </div>
                
                <div className="relative z-10 text-center">
                    <h1 className="text-6xl font-900 text-white mb-6 tracking-tight" style={{ fontFamily: "'Neue Machina', sans-serif", letterSpacing: "-0.04em" }}>Your Cart</h1>
                    <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.2em]">
                        <button onClick={() => window.history.back()} className="text-white hover:text-blue-400 transition-colors uppercase" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Back</button>
                        <ChevronRight size={14} className="text-blue-400" />
                        <span className="text-white/60" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Cart</span>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-20">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center space-y-12 py-32">
                        <div className="w-32 h-32 rounded-full bg-[#F0F7FF] flex items-center justify-center text-blue-600 shadow-inner">
                            <ShoppingBag size={48} />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-900 text-gray-900 tracking-tight" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Your cart is empty</h2>
                            <p className="text-gray-400 font-bold text-lg" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Looks like you haven't added any spares yet.</p>
                        </div>
                        <Link href="/shop" className="px-16 py-5 bg-gray-900 text-white rounded-xl font-900 uppercase tracking-[0.2em] text-[12px] hover:bg-blue-600 transition-all shadow-xl shadow-gray-200" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                            Browse Spares
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* CART ITEMS */}
                        <div className="lg:col-span-2 space-y-8">
                            <table className="w-full">
                                <thead className="border-b-2 border-gray-50">
                                    <tr>
                                        <th className="text-left pb-8 text-xs font-900 text-gray-900 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Product</th>
                                        <th className="text-left pb-8 text-xs font-900 text-gray-900 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Price</th>
                                        <th className="text-center pb-8 text-xs font-900 text-gray-900 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Quantity</th>
                                        <th className="text-right pb-8 text-xs font-900 text-gray-900 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Subtotal</th>
                                        <th className="pb-8"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <AnimatePresence>
                                        {cartItems.map((item) => (
                                            <motion.tr 
                                                key={item.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="group"
                                            >
                                                <td className="py-8">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-4">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                                        </div>
                                                        <span className="font-bold text-gray-900">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-8 font-black text-gray-400">
                                                    NGN {item.price.toLocaleString()}
                                                </td>
                                                <td className="py-8">
                                                    <div className="flex items-center justify-center border-2 border-gray-100 rounded-xl px-2 py-1 mx-auto w-fit">
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                            className="p-1 hover:text-blue-600 transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-10 text-center font-black">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1 hover:text-blue-600 transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="py-8 text-right font-black text-gray-900">
                                                    NGN {(item.price * item.quantity).toLocaleString()}
                                                </td>
                                                <td className="py-8 text-right pl-6">
                                                    <button 
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-300 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>

                        {/* CART TOTALS */}
                        <div className="bg-gray-50/50 p-12 rounded-[2rem] border-2 border-slate-50 h-fit sticky top-32">
                            <h3 className="text-2xl font-900 text-gray-900 mb-10 tracking-tight" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Cart Totals</h3>
                            <div className="space-y-6 mb-12">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Subtotal</span>
                                    <span className="text-sm font-black text-gray-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NGN {cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-8 border-y-2 border-white">
                                    <span className="text-sm font-900 text-gray-900 uppercase tracking-[0.2em]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Total</span>
                                    <div className="text-right">
                                        <span className="text-3xl font-900 text-blue-600 block" style={{ fontFamily: "'Neue Machina', sans-serif" }}>
                                            NGN {cartTotal.toLocaleString()}
                                        </span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 block" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Incl. VAT where applicable</span>
                                    </div>
                                </div>
                            </div>
                            <Link 
                                href="/checkout"
                                className="w-full py-5 bg-gray-900 text-white rounded-xl font-900 uppercase tracking-[0.2em] text-[12px] hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 flex items-center justify-center"
                                style={{ fontFamily: "'Darker Grotesque', sans-serif" }}
                            >
                                Proceed To Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
