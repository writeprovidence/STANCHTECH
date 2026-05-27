'use client';

import { useCart } from "@/context/cart-context";
import { useState } from "react";
import Image from "next/image";
import { Star, Minus, Plus, SparespingBag, Settings, ShieldCheck, Wrench, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const PRODUCT = {
    id: 1,
    name: "Marine Engine Diagnostics Kit",
    description: "Advanced diagnostic equipment for complete marine engine analysis.",
    price: 3499.00,
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=80",
    fullDescription: "Our Marine Engine Diagnostics Kit provides industry-leading accuracy for complex vessel systems. Engineered for durability, it helps highly trained technicians analyze and prevent system failures before they disrupt operations. A must-have for proactive maintenance.",
    benefits: [
        { icon: <Settings className="w-5 h-5" />, title: "Precision Tuning", text: "Deep system analysis." },
        { icon: <ShieldCheck className="w-5 h-5" />, title: "Built to Last", text: "Rugged and marine-certified." },
        { icon: <Wrench className="w-5 h-5" />, title: "Easy Setup", text: "Plug-and-play operation." }
    ],
    isNew: true
};

export default function ProductDetailPage() {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart({ ...PRODUCT, quantity });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-slate-50 pt-12 pb-24">
            <div className="container mx-auto px-6">
                {/* Navigation Breadcrumb */}
                <div className="flex items-center gap-4 mb-12 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span className="hover:text-blue-600 cursor-pointer transition-colors">Spares</span>
                    <span>/</span>
                    <span className="hover:text-blue-600 cursor-pointer transition-colors">{PRODUCT.category}</span>
                    <span>/</span>
                    <span className="text-slate-900">{PRODUCT.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Product Gallery */}
                    <div className="relative group">
                        <div className="aspect-square bg-white rounded-[3rem] overflow-hidden flex items-center justify-center p-12 shadow-2xl shadow-black/5 relative">
                            <Image
                                src={PRODUCT.image}
                                alt={PRODUCT.name}
                                fill
                                className="object-cover p-12 group-hover:scale-105 transition-transform duration-700"
                            />
                            {PRODUCT.isNew && (
                                <span className="absolute top-10 left-10 bg-blue-600 text-white text-xs font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full z-10">
                                    New Arrival
                                </span>
                            )}
                        </div>
                        {/* Gallery Thumbnails */}
                        <div className="grid grid-cols-4 gap-4 mt-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-white rounded-2xl overflow-hidden border-2 border-transparent hover:border-blue-600 transition-colors cursor-pointer p-4">
                                    <Image src={PRODUCT.image} alt="Thumbnail" width={100} height={100} className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="flex text-amber-500">
                                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">4.9 (42 Reviews)</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
                                {PRODUCT.name}
                            </h1>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-6">{PRODUCT.category} — Certified Gear</p>
                            <p className="text-3xl font-black text-slate-900">${PRODUCT.price.toFixed(2)}</p>
                        </div>

                        <p className="text-xl font-medium text-slate-600 leading-relaxed max-w-xl">
                            {PRODUCT.fullDescription}
                        </p>

                        {/* Benefits Chips */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                            {PRODUCT.benefits.map((benefit, i) => (
                                <div key={i} className="flex flex-col gap-3">
                                    <div className="w-10 h-10 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-600">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-xs uppercase tracking-widest mb-1 text-slate-900">{benefit.title}</h4>
                                        <p className="text-[10px] text-slate-500 font-bold leading-none">{benefit.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="space-y-8 pt-8 border-t border-slate-200">
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center border-2 border-slate-200 bg-white rounded-full px-4 py-2">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-blue-600 transition-colors"><Minus className="w-5 h-5" /></button>
                                    <span className="w-12 text-center text-lg font-black">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-blue-600 transition-colors"><Plus className="w-5 h-5" /></button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className={`flex-1 min-w-[200px] py-6 rounded-full font-black text-xl flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95 ${added ? "bg-green-500 text-white shadow-green-500/20" : "bg-blue-600 text-white shadow-blue-600/20 hover:scale-[1.02]"
                                        }`}
                                >
                                    <SparespingBag className="w-6 h-6" />
                                    {added ? "Added to Cart!" : "Add to Cart"}
                                </button>
                            </div>
                            <p className="text-[10px] text-center font-black uppercase tracking-widest text-slate-400">
                                Secure Equipment Shipping Worldwide | Quality Guarantee
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cross-Sell Section */}
            <section className="mt-40 container mx-auto px-6">
                <div className="flex justify-between items-end mb-16 px-4">
                    <h2 className="text-4xl md:text-5xl font-black italic font-serif">You might also need...</h2>
                    <ArrowRight className="w-8 h-8 text-blue-600" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Placeholder for related products - could reuse ProductCard component */}
                    <div className="p-12 bg-white rounded-[3rem] text-center animate-pulse">
                        <div className="w-full aspect-[4/5] bg-slate-50 rounded-2xl mb-6" />
                        <div className="h-4 w-3/4 bg-slate-50 rounded mx-auto mb-2" />
                        <div className="h-4 w-1/2 bg-slate-50 rounded mx-auto" />
                    </div>
                    <div className="p-12 bg-white rounded-[3rem] text-center animate-pulse hidden md:block">
                        <div className="w-full aspect-[4/5] bg-slate-50 rounded-2xl mb-6" />
                        <div className="h-4 w-3/4 bg-slate-50 rounded mx-auto mb-2" />
                        <div className="h-4 w-1/2 bg-slate-50 rounded mx-auto" />
                    </div>
                    <div className="p-12 bg-white rounded-[3rem] text-center animate-pulse hidden lg:block">
                        <div className="w-full aspect-[4/5] bg-slate-50 rounded-2xl mb-6" />
                        <div className="h-4 w-3/4 bg-slate-50 rounded mx-auto mb-2" />
                        <div className="h-4 w-1/2 bg-slate-50 rounded mx-auto" />
                    </div>
                    <div className="p-12 bg-white rounded-[3rem] text-center animate-pulse hidden lg:block">
                        <div className="w-full aspect-[4/5] bg-slate-50 rounded-2xl mb-6" />
                        <div className="h-4 w-3/4 bg-slate-50 rounded mx-auto mb-2" />
                        <div className="h-4 w-1/2 bg-slate-50 rounded mx-auto" />
                    </div>
                </div>
            </section>
        </div>
    );
}
