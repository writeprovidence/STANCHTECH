'use client';

import { use, useState } from "react";
import { PRODUCTS } from "@/data/products";
import Link from "next/link";
import { ChevronRight, Star, Minus, Plus, Facebook, Instagram, MessageCircle } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { motion } from "framer-motion";

export default function ProductDetailPage({ params }) {
    const resolvedParams = use(params);
    const productId = parseInt(resolvedParams.id);
    const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
    
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(2);
    const { addToCart } = useCart();

    const relatedProducts = PRODUCTS.filter(p => p.id !== productId).slice(0, 4);

    if (!product) return <div className="pt-40 text-center">Product not found</div>;

    const formattedPrice = product.price.toLocaleString(undefined, { minimumFractionDigits: 2 });

    return (
        <div className="bg-white min-h-screen pb-20" style={{ paddingTop: "144px" }}>
            <div style={{ paddingLeft: "109.27px", paddingRight: "109.27px" }}>
                {/* --- PRODUCT MAIN --- */}
                <section className="w-full flex flex-col lg:flex-row gap-20 items-start" style={{ marginBottom: "311px" }}>
                    {/* LEFT: IMAGES */}
                    <div className="w-full lg:w-1/2 flex gap-8 items-start">
                        {/* THUMBNAILS (3 Synchronized Positions) */}
                        <div className="flex flex-col gap-4">
                            {[0, 1, 2].map((idx) => {
                                const transform = idx === 0 ? 'none' : idx === 1 ? 'scaleX(-1)' : 'scaleX(-1) rotate(5deg) translateX(10px)';
                                return (
                                    <button 
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`w-24 h-24 rounded-xl overflow-hidden bg-[#F0F7FF] transition-all duration-300 ${activeImage === idx ? "ring-2 ring-gray-900 opacity-100" : "opacity-60 hover:opacity-100"}`}
                                    >
                                        <img 
                                            src={product.images[0]} 
                                            alt={`View ${idx + 1}`} 
                                            className="w-full h-full object-contain p-2 mix-blend-multiply" 
                                            style={{ transform }}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                        {/* MAIN IMAGE */}
                        <div className="flex-1 aspect-square bg-[#F0F7FF] rounded-2xl flex items-center justify-center overflow-hidden relative group p-12">
                            <motion.img 
                                key={activeImage}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                src={product.images[0]} 
                                alt={product.name} 
                                className="w-full h-full object-contain transition-transform duration-700 drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:scale-110" 
                                style={{ 
                                    transform: activeImage === 0 ? 'none' : activeImage === 1 ? 'scaleX(-1)' : 'scaleX(-1) rotate(5deg) translateX(20px)'
                                }}
                            />
                        </div>
                    </div>

                    {/* RIGHT: INFO */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <h1 className="text-[42px] font-bold text-gray-900 leading-[0.9] tracking-tight" style={{ fontFamily: "'Neue Machina', sans-serif", marginBottom: "21px" }}>
                            {product.name}
                        </h1>
                        <p className="text-[24px] font-medium" style={{ fontFamily: "'Darker Grotesque', sans-serif", color: "#9F9F9F", marginBottom: "24px" }}>
                            {product.currency} {formattedPrice}
                        </p>
                        
                        <div className="flex items-center gap-4" style={{ marginBottom: "0px" }}>
                            <div className="flex gap-1.5" style={{ color: "#FFDA5B" }}>
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
                            </div>
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-10 border-l border-gray-200" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                Customer Review
                            </span>
                        </div>

                        <p className="text-gray-500 text-[18px] mb-0 font-medium" style={{ fontFamily: "'Darker Grotesque', sans-serif", lineHeight: "auto", marginTop: "40px" }}>
                            {product.description}
                        </p>

                        <div className="text-[14px] font-bold text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "'Darker Grotesque', sans-serif", marginTop: "22px", marginBottom: "54px" }}>
                            Part CODE: <span className="text-gray-900 font-900 ml-2">{product.sku}</span>
                        </div>

                        <div className="flex items-center gap-8" style={{ marginBottom: "175px" }}>
                            {/* QUANTITY BOX */}
                            <div className="flex items-center border border-gray-200 rounded-xl px-6 py-2 justify-between bg-white" style={{ width: "123px", height: "64px" }}>
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-900 hover:text-blue-600 transition-colors">
                                    <Minus size={18} />
                                </button>
                                <span className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="text-gray-900 hover:text-blue-600 transition-colors">
                                    <Plus size={18} />
                                </button>
                            </div>
                            {/* ADD TO CART BUTTON */}
                            <button 
                                onClick={() => addToCart({ ...product, quantity })}
                                className="bg-gray-900 text-white font-bold uppercase tracking-[0.1em] hover:bg-blue-600 transition-all rounded-xl shadow-lg shadow-gray-200"
                                style={{ 
                                    fontFamily: "'Darker Grotesque', sans-serif", 
                                    width: "215px", 
                                    height: "64px", 
                                    fontSize: "20px" 
                                }}
                            >
                                Add To Cart
                            </button>
                        </div>

                        <div className="pt-16 border-t border-gray-100 flex items-center gap-6">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Share</span>
                            <div className="flex gap-4">
                                {[Facebook, Instagram, MessageCircle].map((Icon, i) => (
                                    <Link key={i} href="#" className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                        <Icon size={16} fill="currentColor" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* --- DESCRIPTION CONTENT --- */}
            <section className="border-t border-gray-100 pb-32 bg-white" style={{ paddingTop: 0 }}>
                <div className="w-full" style={{ paddingLeft: "109.27px", paddingRight: "109.27px" }}>
                    <h3 className="text-3xl font-900 text-gray-900 mb-12" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Technical Details</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <p className="text-gray-500 text-xl leading-relaxed font-medium" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                {product.description}
                            </p>
                            <p className="text-gray-500 text-xl leading-relaxed font-medium" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                Embodying the raw, wayward spirit of rock 'n' roll, our advanced range delivers unmistakable performance and unwavering reliability even during rigorous offshore operations. Light in weight but heavy in capability, allowing easy deployment.
                            </p>
                            <ul className="space-y-4 pt-4">
                                {['Enhanced Performance', 'Industrial Grade Materials', 'Marine Certified'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-gray-900 font-bold uppercase tracking-widest text-[12px]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            {[0, 1].map((idx) => (
                                <div key={idx} className="aspect-[4/5] bg-white rounded-2xl p-8 flex items-center justify-center transition-transform duration-500 hover:scale-105 border border-gray-100">
                                    <img 
                                        src={product.images[0]} 
                                        alt={`Detail ${idx + 1}`} 
                                        className="w-full h-full object-contain mix-blend-multiply drop-shadow-md" 
                                        style={{ transform: idx === 1 ? 'scaleX(-1)' : 'none' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- RELATED PRODUCTS --- */}
            <section className="w-full py-32 text-center" style={{ paddingLeft: "109.27px", paddingRight: "109.27px" }}>
                <h2 className="text-4xl font-900 text-gray-900 mb-20" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Related Parts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {relatedProducts.map((p, idx) => (
                        <Link href={`/shop/${p.id}`} key={idx} className="group cursor-pointer block text-center">
                            <div className="aspect-square bg-[#F0F7FF] rounded-2xl p-10 mb-8 flex flex-col items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-200/50">
                                <img 
                                    src={p.image} 
                                    alt={p.name} 
                                    className="w-full h-full object-contain drop-shadow-xl mix-blend-multiply"
                                />
                            </div>
                            <h3 className="text-[14px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-4 group-hover:text-blue-600 transition-colors" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                {p.name}
                            </h3>
                            <p className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                {p.currency}. {p.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    );
}
