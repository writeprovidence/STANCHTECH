'use client';

import { useCart } from "@/context/cart-context";
import { X, Trash2, Plus, Minus, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function ShoppingCart() {
    const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />
                    
                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-[101] flex flex-col"
                        style={{ padding: "32px" }}
                    >
                        <div className="flex items-center justify-between border-b border-gray-100" style={{ paddingBottom: "34px", marginBottom: "42px" }}>
                            <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Shopping Cart</h2>
                            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-12">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-20 flex flex-col items-center gap-6">
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[13px]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Your cart is empty</p>
                                    <Link 
                                        href="/shop" 
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-blue-600 font-bold uppercase tracking-widest text-[12px] hover:underline flex items-center gap-2"
                                        style={{ fontFamily: "'Darker Grotesque', sans-serif" }}
                                    >
                                        Return to Shop
                                    </Link>
                                </div>
                            ) : (
                                cartItems.map((item, idx) => (
                                    <div key={item.id} className="flex flex-col gap-4" style={{ marginBottom: idx === cartItems.length - 1 ? "0" : "8px" }}>
                                        <div className="flex gap-4 group">
                                            <div className="w-20 h-20 bg-[#E8F3FA] rounded-xl flex items-center justify-center p-4 flex-shrink-0">
                                                <Image 
                                                    src={item.image || "/asset/spare_parts/Part3.png"} 
                                                    alt={item.name} 
                                                    width={200}
                                                    height={200}
                                                    className="w-full h-full object-contain" 
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 truncate mb-1" style={{ fontSize: '15px', fontFamily: "'Neue Machina', sans-serif" }}>{item.name}</h3>
                                                <div className="flex items-center justify-between" style={{ marginTop: "16px" }}>
                                                    <div className="flex items-center border-2 border-black h-8 bg-white" style={{ width: "fit-content" }}>
                                                        <button 
                                                            type="button"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-8 h-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-8 text-center font-900 text-[14px]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>{item.quantity}</span>
                                                        <button 
                                                            type="button"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-8 h-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[16px] font-[800] text-black whitespace-nowrap" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>₦ {item.price.toLocaleString()}</span>
                                                        <button 
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-gray-400 hover:text-red-600 transition-colors p-1 flex items-center justify-center"
                                                            title="Remove item"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {idx !== cartItems.length - 1 && (
                                            <div className="w-full h-px bg-gray-100" style={{ marginTop: "4px" }} />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="mt-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[14px] font-bold text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Subtotal</span>
                                    <span className="text-black" style={{ fontSize: '22px', fontWeight: 900, fontFamily: "'Darker Grotesque', sans-serif" }}>
                                        ₦ {cartTotal.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center" style={{ marginBottom: "26px" }}>
                                    <span className="text-[14px] font-bold text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Shipping</span>
                                    <span className="text-[13px] font-bold text-gray-500 uppercase tracking-[0.1em]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                        Calculated at checkout
                                    </span>
                                </div>
                                
                                <div className="w-full border-t border-gray-200" style={{ paddingTop: "24px" }}>
                                    <div className="flex flex-col gap-4 w-full mt-2">
                                        <Link 
                                            href="/checkout" 
                                            onClick={() => setIsCartOpen(false)}
                                            className="w-full h-14 bg-black text-white font-bold uppercase tracking-[0.2em] text-[13px] hover:bg-blue-600 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3"
                                            style={{ fontFamily: "'Darker Grotesque', sans-serif" }}
                                        >
                                            PROCEED TO CHECKOUT <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
