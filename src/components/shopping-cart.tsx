'use client';

import { useCart } from "@/context/cart-context";
import { X, Trash2, Plus, Minus } from "lucide-react";
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
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Your cart is empty</p>
                                    <Link 
                                        href="/shop" 
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-blue-600 font-bold uppercase tracking-widest text-xs hover:underline flex items-center gap-2"
                                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
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
                                                <h3 className="font-bold text-gray-900 truncate mb-1" style={{ fontSize: '14px' }}>{item.name}</h3>
                                                <div className="flex items-center justify-between mt-6">
                                                    <div className="flex items-center border border-gray-200 rounded-lg h-11 bg-white shadow-sm overflow-hidden" style={{ width: "fit-content" }}>
                                                        <button 
                                                            type="button"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="px-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="text-[16px] font-bold text-gray-900 min-w-[40px] text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.quantity}</span>
                                                        <button 
                                                            type="button"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="px-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <span className="text-[14px] font-black text-gray-900 whitespace-nowrap pr-2">₦ {item.price.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-600 transition-colors self-center p-2"
                                                title="Remove item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
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
                                    <span className="text-[18px] font-black text-gray-900" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                        ₦ {cartTotal.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center" style={{ marginBottom: "26px" }}>
                                    <span className="text-[14px] font-bold text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Shipping</span>
                                    <span className="text-[14px] font-bold text-gray-500 uppercase tracking-[0.1em]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                        Calculated at checkout
                                    </span>
                                </div>
                                
                                <div className="w-full border-t border-gray-200" style={{ paddingTop: "24px" }}>
                                    <div className="flex flex-col gap-4 w-full mt-2">
                                        <Link 
                                            href="/checkout" 
                                            onClick={() => setIsCartOpen(false)}
                                            style={{ height: "44px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                                            className="bg-[#155DFC] text-white rounded-[4px] text-[14px] font-bold hover:bg-white hover:text-[#155DFC] hover:border-[#155DFC] border border-transparent transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(21,93,252,0.25)] text-center"
                                        >
                                            PROCEED TO CHECKOUT
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
