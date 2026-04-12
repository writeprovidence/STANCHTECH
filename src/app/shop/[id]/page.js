'use client';

import { use, useState } from "react";
import { PRODUCTS } from "@/data/products";
import Link from "next/link";
import { ChevronRight, Star, Minus, Plus, Facebook, Linkedin, Twitter } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { motion } from "framer-motion";

export default function ProductDetailPage({ params }) {
    const resolvedParams = use(params);
    const productId = parseInt(resolvedParams.id);
    const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
    
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const { addToCart } = useCart();

    const relatedProducts = PRODUCTS.filter(p => p.id !== productId).slice(0, 4);

    if (!product) return <div className="pt-40 text-center">Product not found</div>;

    const formattedPrice = product.price.toLocaleString(undefined, { minimumFractionDigits: 2 });

    return (
        <div className="bg-white min-h-screen pt-20 pb-20">
            {/* --- BREADCRUMBS --- */}
            <div className="container mx-auto px-10 md:px-24 py-8">
                <div className="flex items-center gap-3 text-xs font-bold text-gray-400 capitalize tracking-wide">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <ChevronRight size={14} className="text-gray-300" />
                    <Link href="/shop" className="hover:text-blue-600 transition-colors">Shop</Link>
                    <ChevronRight size={14} className="text-gray-300" />
                    <span className="text-gray-900 border-l border-gray-300 pl-3">{product.name}</span>
                </div>
            </div>

            {/* --- PRODUCT MAIN --- */}
            <section className="container mx-auto px-10 md:px-24 flex flex-col lg:flex-row gap-20 mb-32">
                {/* LEFT: IMAGES */}
                <div className="w-full lg:w-1/2 flex gap-6">
                    <div className="flex flex-col gap-4">
                        {product.images.map((img, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`w-24 h-24 rounded-xl overflow-hidden bg-[#F0F7FF] transition-all duration-300 ${activeImage === idx ? "ring-2 ring-gray-900 opacity-100 scale-105" : "opacity-60 hover:opacity-100 scale-100"}`}
                            >
                                <img src={img} alt="Thumbnail" className="w-full h-full object-contain p-4 mix-blend-multiply" />
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 aspect-square bg-[#F0F7FF] rounded-2xl flex items-center justify-center p-16 overflow-hidden relative group">
                        <motion.img 
                            key={activeImage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            src={product.images[activeImage]} 
                            alt={product.name} 
                            className="w-full h-full object-contain transition-transform duration-700 drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] group-hover:scale-110" 
                        />
                    </div>
                </div>

                {/* RIGHT: INFO */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <h1 className="text-5xl md:text-6xl font-900 text-gray-900 mb-4 leading-[0.9] tracking-tight" style={{ fontFamily: "'Neue Machina', sans-serif" }}>
                        {product.name}
                    </h1>
                    <p className="text-3xl font-black text-gray-900 mb-8" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                        {product.currency} {formattedPrice}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-10">
                        <div className="flex text-blue-600 gap-1.5">
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-4 border-l border-gray-200" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                            Customer Review
                        </span>
                    </div>

                    <p className="text-gray-500 text-[18px] leading-relaxed mb-10 max-w-lg font-medium" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                        {product.description}
                    </p>

                    <div className="text-[14px] font-bold text-gray-400 mb-12 uppercase tracking-[0.2em]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                        Part CODE: <span className="text-gray-900 font-900 ml-2">{product.sku}</span>
                    </div>

                    <div className="flex items-center gap-8 mb-16">
                        <div className="flex items-center border-2 border-gray-100 rounded-xl px-4 py-2 w-40 justify-between bg-gray-50/50">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-gray-900 hover:text-blue-600 transition-colors">
                                <Minus size={18} />
                            </button>
                            <span className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-gray-900 hover:text-blue-600 transition-colors">
                                <Plus size={18} />
                            </button>
                        </div>
                        <button 
                            onClick={() => addToCart({ ...product, quantity })}
                            className="flex-1 max-w-xs py-5 bg-gray-900 text-white font-900 uppercase tracking-[0.2em] text-[12px] hover:bg-blue-600 transition-all rounded-xl shadow-xl shadow-gray-200"
                            style={{ fontFamily: "'Darker Grotesque', sans-serif" }}
                        >
                            Add To Cart
                        </button>
                    </div>

                    <div className="pt-10 border-t border-gray-100 flex items-center gap-6">
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Share</span>
                        <div className="flex gap-4">
                            {[Facebook, Linkedin, Twitter].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                    <Icon size={16} fill="currentColor" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- DESCRIPTION CONTENT --- */}
            <section className="border-t border-gray-100 py-32 bg-[#F9FBFF]">
                <div className="container mx-auto px-10 md:px-24">
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
                                <div key={idx} className="aspect-[4/5] bg-white rounded-2xl p-8 flex items-center justify-center shadow-xl shadow-blue-900/5">
                                    <img src={product.images[idx] || product.images[0]} alt={`Detail ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply drop-shadow-lg" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- RELATED PRODUCTS --- */}
            <section className="container mx-auto px-10 md:px-24 py-32 text-center">
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
