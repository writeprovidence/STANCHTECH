'use client';

import React, { use, useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import Link from "next/link";
import { ChevronRight, Star, Minus, Plus, Facebook, Instagram, MessageCircle, Linkedin, Twitter, Heart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { motion, AnimatePresence } from "framer-motion";

const MotionImage = motion(Image);

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const productId = parseInt(resolvedParams.id);
    const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
    
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const { addToCart } = useCart();

    const relatedProducts = PRODUCTS.filter(p => p.id !== productId).slice(0, 4);

    if (!product) return <div className="pt-40 text-center">Product not found</div>;

    const formattedPrice = product.price.toLocaleString(undefined, { minimumFractionDigits: 2 });

    return (
        <div className="bg-white min-h-screen pb-20" style={{ paddingTop: "72px" }}>
            {/* --- PREMIUM BREADCRUMB --- */}
            <div className="border-b border-gray-100 bg-white">
                <div style={{ paddingLeft: "5vw", paddingRight: "5vw" }} className="h-16 flex items-center gap-4">
                    <Link href="/shop" className="text-gray-400 hover:text-black transition-colors font-bold uppercase tracking-widest text-[12px]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Shop</Link>
                    <ChevronRight size={12} className="text-gray-300" />
                    <span className="text-black font-bold uppercase tracking-widest text-[12px]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>{product.name}</span>
                </div>
            </div>

            <div style={{ paddingLeft: "5vw", paddingRight: "5vw", paddingTop: "40px", paddingBottom: "80px" }}>
                {/* --- PRODUCT MAIN --- */}
                <section className="w-full flex flex-col lg:flex-row gap-24 items-start">
                    {/* LEFT: IMAGES */}
                    <div className="w-full lg:w-[55%] flex flex-col gap-4">
                        {/* MAIN IMAGE */}
                        <div className="w-full flex gap-8">
                            {/* THUMBNAILS — vertical on desktop, hidden inside this flex on mobile */}
                            <div className="hidden md:flex flex-col gap-4 flex-shrink-0">
                                {[
                                    { rotate: "0deg", scale: "1" },
                                    { rotate: "8deg", scale: "0.95" },
                                    { rotate: "-6deg", scale: "1.05" }
                                ].map((style, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`w-20 h-20 border-2 transition-all duration-500 overflow-hidden bg-[#f8fafc] flex items-center justify-center p-2 ${activeImage === idx ? "border-black scale-105" : "border-transparent opacity-40 hover:opacity-100"}`}
                                    >
                                        <Image 
                                            src={product.image} 
                                            alt={`View ${idx + 1}`} 
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-contain filter grayscale"
                                            style={{ transform: `rotate(${style.rotate}) scale(${style.scale})`, transition: "transform 0.3s" }}
                                        />
                                    </button>
                                ))}
                            </div>
                            {/* MAIN IMAGE */}
                            <div className="flex-1 border border-gray-50 flex items-center justify-center relative group overflow-hidden" style={{ background: "#f8fafc", aspectRatio: "1 / 1" }}>
                                <div className="absolute top-8 right-8 z-10">
                                    <span className="bg-black text-white px-4 py-1 text-[12px] font-900 uppercase tracking-[0.2em]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                        {product.condition}
                                    </span>
                                </div>
                                <MotionImage 
                                    key={activeImage}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    src={product.image} 
                                    alt={product.name} 
                                    width={1200}
                                    height={1200}
                                    className="w-[85%] h-[85%] object-contain brightness-105"
                                    style={{ transform: activeImage === 1 ? "rotate(8deg)" : activeImage === 2 ? "rotate(-6deg) scale(1.05)" : "rotate(0deg)" }}
                                />
                            </div>
                        </div>

                        {/* THUMBNAILS — horizontal row on mobile only */}
                        <div className="flex md:hidden gap-3 justify-center">
                            {[
                                { rotate: "0deg", scale: "1" },
                                { rotate: "8deg", scale: "0.95" },
                                { rotate: "-6deg", scale: "1.05" }
                            ].map((style, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`w-20 h-20 border-2 transition-all duration-500 overflow-hidden bg-[#f8fafc] flex items-center justify-center p-2 ${activeImage === idx ? "border-black scale-105" : "border-transparent opacity-40"}`}
                                >
                                    <Image 
                                        src={product.image} 
                                        alt={`View ${idx + 1}`} 
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-contain filter grayscale"
                                        style={{ transform: `rotate(${style.rotate}) scale(${style.scale})`, transition: "transform 0.3s" }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: INFO */}
                    <div className="w-full lg:w-[45%] space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[12px]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>{product.category}</span>
                                <div className="h-px w-8 bg-blue-100" />
                            </div>
                            <h1 className="text-5xl font-800 text-black uppercase leading-[1.1]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-6" style={{ marginTop: "16px" }}>
                                <span className="text-4xl font-800 text-black" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                    ₦{product.price.toLocaleString()}
                                </span>
                                <div className="h-6 w-px bg-gray-100" />
                                <div className="flex gap-1 text-[#FFDA5B]">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                                    <span className="text-gray-400 text-[13px] font-bold uppercase tracking-widest ml-2" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>(12 Reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6" style={{ marginTop: "32px" }}>
                            <p className="text-gray-500 text-lg leading-relaxed max-w-xl" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                {product.description}
                            </p>
                        </div>

                        {/* CTAs */}
                        <div className="space-y-8" style={{ marginTop: "48px" }}>
                            <div className="flex items-center gap-6">
                                {/* QUANTITY SELECTOR */}
                                <div className="flex items-center border-2 border-black h-14 bg-white">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-14 h-full flex items-center justify-center hover:bg-black hover:text-white transition-all"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-12 text-center font-900 text-lg" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-14 h-full flex items-center justify-center hover:bg-black hover:text-white transition-all"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <button 
                                    onClick={() => addToCart({ ...product, quantity })}
                                    className="flex-1 h-14 bg-black text-white font-bold uppercase tracking-[0.2em] text-[13px] hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                                    style={{ fontFamily: "'Darker Grotesque', sans-serif" }}
                                >
                                    Add To Cart <ChevronRight size={16} />
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-between py-6" style={{ marginTop: "32px" }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                    <span className="text-[13px] font-900 uppercase tracking-widest text-black" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>In Stock</span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <span className="text-[13px] font-900 uppercase tracking-widest text-black" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Share Product</span>
                                    <div className="flex gap-5 items-center">
                                        <Facebook size={18} color="#1877F2" strokeWidth={2} className="cursor-pointer hover:scale-110 transition-transform" />
                                        <Instagram size={18} color="#E4405F" strokeWidth={2} className="cursor-pointer hover:scale-110 transition-transform" />
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer hover:scale-110 transition-transform">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* --- SPECS SECTION --- */}
            <section style={{ marginTop: "80px", paddingLeft: "5vw", paddingRight: "5vw" }}>
                <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "60px" }}>
                    <div style={{ display: "flex", gap: "48px", marginBottom: "48px", paddingBottom: "16px" }}>
                        {['description', 'specification', 'reviews'].map((tab) => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 relative text-[15px] font-900 uppercase tracking-[0.3em] transition-all ${activeTab === tab ? 'text-black' : 'text-gray-300'}`}
                                style={{ fontFamily: "'Darker Grotesque', sans-serif" }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'description' && (
                                <div className="space-y-16">
                                    <div className="max-w-4xl">
                                        <p className="text-xl text-gray-500 leading-relaxed font-medium" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                            Precision-engineered for heavy-duty performance, our spare parts undergo rigorous testing to exceed OEM standards. Built with premium materials to withstand corrosive marine environments and intense vibration, these highly reliable replacements effortlessly integrate into your existing systems to maximize operational uptime and minimize your long-term maintenance costs.
                                        </p>
                                    </div>
                                    
                                    {/* Big Square Product Images */}
                                    <div className="border-b border-gray-200" style={{ marginTop: "80px", paddingBottom: "120px" }}>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
                                            <div className="bg-[#f8fafc] rounded-2xl w-full aspect-[4/3] flex items-center justify-center p-12">
                                                <img src={product.image} alt="Detailed View 1" className="w-[85%] h-[85%] object-contain hover:scale-105 rotate-90 transition-transform duration-700" />
                                            </div>
                                            <div className="bg-[#f8fafc] rounded-2xl w-full aspect-[4/3] flex items-center justify-center p-12">
                                                <img src={product.image} alt="Detailed View 2" className="w-[85%] h-[85%] object-contain hover:scale-105 transition-transform duration-700" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'specification' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                                    {[
                                        ['Manufacturer', 'Cummins Genuine'],
                                        ['Model Range', 'K-Series / Q-Series'],
                                        ['Material', 'Industrial Grade Alloy'],
                                        ['Certification', 'ISO 9001:2015'],
                                        ['Weight', '4.2 kg'],
                                        ['Part Number', `ST-${product.id}09-XC`],
                                        ['Interface', 'Standard Flange'],
                                        ['Warranty', '12 Months Limited']
                                    ].map(([label, val]) => (
                                        <div key={label} className="flex items-center justify-between py-5 border-b border-gray-100">
                                            <span className="text-[16px] font-bold uppercase tracking-widest text-gray-400" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>{label}</span>
                                            <span className="text-[17px] font-900 uppercase" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>{val}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div>
                                     {[
                                        { name: "John D.", date: "April 12, 2026", rating: 5, comment: "Excellent replacement part. Fitted perfectly and resolved our machine issues instantly. Will definitely source from StanchTech again." },
                                        { name: "Captain H.", date: "March 28, 2026", rating: 5, comment: "Incredibly fast shipping. The parts look pristine and the build quality is obviously premium as described." },
                                        { name: "Mike T.", date: "March 15, 2026", rating: 4, comment: "Good quality, though it took a slight bit of adjustment to fit my specific engine correctly. Very satisfied overall." }
                                    ].map((review, i) => (
                                        <div key={i} className="space-y-6 border-b border-gray-50" style={{ paddingTop: i === 0 ? "0px" : "24px", paddingBottom: "24px" }}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs">{(review.name).charAt(0)}</div>
                                                    <div>
                                                        <p className="text-[17px] font-900 uppercase" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>{review.name}</p>
                                                        <p className="text-[15px] text-gray-400 uppercase tracking-widest" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>{review.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1 text-[#FFDA5B]">
                                                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={i < review.rating ? 0 : 2} />)}
                                                </div>
                                            </div>
                                            <p className="text-lg text-gray-500 leading-relaxed font-medium" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* --- RELATED PARTS --- */}
            <section style={{ marginTop: "100px", paddingLeft: "5vw", paddingRight: "5vw", paddingBottom: "160px" }}>
                <div className="flex flex-col items-center justify-center px-4 text-center" style={{ marginBottom: "120px" }}>
                    <h2 className="text-[36px] font-800 text-black" style={{ fontFamily: "'Neue Machina', sans-serif" }}>Related Spares</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.map((p, index) => (
                        <Link 
                            href={`/shop/${p.id}`} 
                            key={index} 
                            className="group relative bg-white border border-gray-100 text-left transition-all duration-700 hover:-translate-y-2 flex flex-col items-center"
                            style={{ paddingLeft: "2rem", paddingRight: "2rem", paddingTop: "3rem", paddingBottom: "2rem" }}
                        >
                            {/* Genuine Badge */}
                            <div className="absolute top-6 left-6 px-3 py-1 bg-blue-50 text-blue-600 text-[16px] font-900 uppercase tracking-widest opacity-100 transition-opacity duration-300 z-10" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                {p.condition}
                            </div>

                            <div className="w-full aspect-square mb-6 transition-transform duration-700 group-hover:scale-105 flex items-center justify-center p-8">
                                <img 
                                    src={p.image} 
                                    alt={p.name} 
                                    className="w-[80%] h-[80%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100" 
                                />
                            </div>

                            <div style={{ width: "100%", marginTop: "auto", textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
                                <p className="text-black font-800 text-lg leading-tight uppercase" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                    {p.name}
                                </p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", paddingTop: "4px", marginTop: "4px" }}>
                                    <span className="font-[800] text-[18px]" style={{ fontFamily: "'Darker Grotesque', sans-serif", color: "#000000" }}>
                                        ₦{p.price.toLocaleString()}
                                    </span>
                                    <div className="w-8 h-8 rounded-full border border-gray-100 flex flex-shrink-0 items-center justify-center text-gray-300 group-hover:border-black group-hover:text-black transition-all">
                                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                
                <div className="flex justify-center" style={{ marginTop: "120px" }}>
                    <Link href="/shop" className="text-[15px] font-900 uppercase tracking-[0.3em] hover:text-blue-600 transition-all" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                        View Full catalog
                    </Link>
                </div>
            </section>
        </div>
    );
}
