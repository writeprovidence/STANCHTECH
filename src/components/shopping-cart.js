'use client';

import { useCart } from "@/context/cart-context";
import { X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function ShoppingCart() {
    const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, cartTotal } = useCart();

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
                        <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
                            <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Shopping Cart</h2>
                            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-8">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest text-sm">
                                    Your cart is empty
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
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
                                            <h3 className="font-bold text-gray-900 truncate mb-1">{item.name}</h3>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-sm font-bold text-blue-600">{item.quantity}</span>
                                                <span className="text-xs text-gray-400 uppercase tracking-widest font-black">x</span>
                                                <span className="text-sm font-black text-gray-900">NGN {item.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-300 hover:text-red-500 transition-colors self-center p-2"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="mt-auto pt-10 border-t border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[14px] font-bold text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Subtotal</span>
                                    <span className="text-[18px] font-black text-gray-900" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                        NGN {cartTotal.toLocaleString()}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-4 w-full mt-2">
                                    <Link 
                                        href="/cart"
                                        onClick={() => setIsCartOpen(false)}
                                        className="flex-1 py-2.5 border border-gray-900 rounded-full text-[12px] font-bold uppercase text-center hover:bg-gray-100 transition-all text-gray-900"
                                    >
                                        View Cart
                                    </Link>
                                    <Link 
                                        href="/checkout" 
                                        onClick={() => setIsCartOpen(false)}
                                        className="flex-1 py-2.5 bg-gray-900 text-white rounded-full text-[12px] font-bold uppercase text-center hover:bg-blue-600 transition-all shadow-md"
                                    >
                                        Checkout
                                    </Link>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
