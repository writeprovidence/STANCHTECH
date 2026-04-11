'use client';

import { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { Filter, ChevronRight, ChevronDown, ChevronUp, Star, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopPage() {
    const [showCatalogue, setShowCatalogue] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);

    const shopProducts = Array(16).fill(null).map((_, i) => ({
        id: i + 1,
        name: "Advanced Fuel Injector",
        price: 25000,
        currency: "NGN.",
        image: "/asset/spare_parts/Part3.png"
    }));

    const faqs = [
        {
            id: "01",
            question: "Are all spare parts sold on StanchTech genuine?",
            answer: "Yes, we exclusively provide genuine Cummins and industrial-grade spare parts. Each part comes with manufacturer certification and a quality guarantee to ensure your equipment's longevity."
        },
        {
            id: "02",
            question: "How long does shipping usually take?",
            answer: "For domestic orders within Nigeria, shipping typically takes 2-4 business days. International shipping for marine spares usually takes 7-10 business days depending on your location and customs processing."
        },
        {
            id: "03",
            question: "What payment methods do you accept?",
            answer: "We accept secure payments via credit/debit cards, bank transfers, and corporate purchase orders (subject to account verification). All transactions are encrypted for your security."
        },
        {
            id: "04",
            question: "Do you provide installation support for purchased parts?",
            answer: "Absolutely. Our specialized technical team is available for on-site installation and maintenance services. You can select 'Add Installation Support' during checkout or contact us via our support line."
        }
    ];

    const landingTopPicks = PRODUCTS.slice(0, 4);

    if (showCatalogue) {
        return (
            <div className="bg-white min-h-screen pt-20">
                {/* --- CATALOGUE HEADER --- */}
                <section className="relative h-[320px] flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="/asset/about_image/built on excellence.png" 
                            alt="Shop Background" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#0b1a2e]/60 backdrop-blur-[2px]" />
                    </div>
                    <div className="relative z-10 text-center">
                        <h1 className="text-6xl font-900 text-white mb-4" style={{ fontFamily: "'Darker Grotesque', sans-serif", letterSpacing: "-0.04em" }}>Explore Spares</h1>
                        <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.2em]">
                            <button onClick={() => setShowCatalogue(false)} className="text-white hover:text-blue-400 transition-colors" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Home</button>
                            <ChevronRight size={14} className="text-blue-400" />
                            <span className="text-white/60" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Shop</span>
                        </div>
                    </div>
                </section>

                {/* --- FILTER BAR --- */}
                <div className="border-b border-gray-100 bg-white">
                    <div className="container mx-auto px-10 md:px-24 py-8 flex justify-between items-center">
                        <div className="flex items-center gap-8">
                            <button className="flex items-center gap-3 text-gray-900 hover:text-blue-600 transition-colors">
                                <Filter size={18} />
                                <span className="uppercase text-xs font-900 tracking-[0.2em]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Filter</span>
                            </button>
                            <div className="h-6 w-[1px] bg-gray-200"></div>
                            <span className="text-gray-400 font-bold" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "18px" }}>Showing 1-16 of 32 results</span>
                        </div>
                        <div className="hidden md:block">
                            <select className="bg-transparent border-none text-sm font-bold uppercase tracking-widest focus:ring-0 cursor-pointer" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>
                                <option>Default Sorting</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* --- PRODUCT GRID --- */}
                <div className="bg-white pb-24">
                    <div className="container mx-auto px-10 md:px-24 py-16">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-24">
                            {shopProducts.map((product, index) => (
                                <Link href={`/shop/${product.id}`} key={index} className="group flex flex-col items-center text-center">
                                    <div className="aspect-square mb-10 w-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="w-full h-full object-contain drop-shadow-xl"
                                        />
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 group-hover:text-blue-600 transition-colors" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "14px" }}>
                                        {product.name}
                                    </h3>
                                    <p className="text-2xl font-900 text-gray-900" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                        {product.currency} {product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </p>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-32 flex justify-center items-center gap-4">
                            <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#0b1a2e] text-white font-bold text-sm shadow-lg shadow-blue-100/20 hover:bg-blue-600 transition-all font-sans">
                                1
                            </button>
                            {[2, 3].map(page => (
                                <button key={page} className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 font-bold text-sm hover:bg-gray-100 transition-all font-sans">
                                    {page}
                                </button>
                            ))}
                            <button className="px-8 h-12 flex items-center justify-center rounded-lg bg-gray-50 text-gray-900 font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-20">
            {/* --- LANDING HERO (IMAGE 1) --- */}
            {/* --- LANDING HERO --- */}
            <section 
                style={{ background: "#fff", height: "820px", paddingLeft: "12vw", paddingRight: "12vw" }} 
                className="hidden md:flex items-center justify-between relative overflow-hidden border-b border-gray-100"
            >
                <div style={{ color: "#090E1A" }} className="flex flex-col justify-center items-start text-left z-20 flex-shrink-0 w-full md:w-auto">
                    <h1 style={{ lineHeight: "0.85", fontFamily: "'Darker Grotesque', sans-serif", fontWeight: 900 }} className="flex flex-col tracking-tighter text-5xl sm:text-7xl lg:text-[84px]">
                        <span>Precision</span>
                        <span className="text-blue-600">Marine Turbo</span>
                    </h1>
                    
                    <div className="h-12 md:h-24" />

                    <button 
                        onClick={() => setShowCatalogue(true)}
                        className="inline-block uppercase tracking-[0.25em] text-blue-600 border-b-2 border-blue-600 pb-4 hover:opacity-80 transition-all w-fit font-[900]"
                        style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "24px" }}
                    >
                        Shop Now
                    </button>
                </div>
                
                <div className="w-full md:w-[35%] h-[300px] md:h-[80%] flex items-center justify-center z-10 mt-12 md:mt-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        <img 
                            src="/asset/spare_parts/part2.png" 
                            alt="Marine Turbo" 
                            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                            className="relative z-10"
                        />
                    </motion.div>
                </div>
            </section>

            {/* --- CATEGORIES ROW --- */}
            <section 
                style={{ background: "#F0F7FF", height: "672px", paddingLeft: "12vw", paddingRight: "12vw" }} 
                className="hidden md:flex items-center"
            >
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 lg:gap-64">
                    {/* Fuel Injector */}
                    <div className="flex flex-col items-start text-left group w-fit">
                        <div className="h-48 md:h-60 mb-6 flex items-center justify-end w-full group-hover:translate-x-4 transition-transform duration-700">
                            <img 
                                src="/asset/spare_parts/Part3.png" 
                                alt="Fuel Injector" 
                                className="h-full w-auto object-contain object-right transform translate-x-8" 
                            />
                        </div>
                        <h3 style={{ fontSize: "clamp(32px, 4vw, 42px)", fontFamily: "'Darker Grotesque', sans-serif", lineHeight: "1", marginBottom: "40px", fontWeight: 900 }} className="text-gray-900 whitespace-nowrap">Fuel Injector</h3>
                        <button 
                            onClick={() => setShowCatalogue(true)}
                            style={{ fontSize: "20px", fontFamily: "'Darker Grotesque', sans-serif" }}
                            className="font-bold text-gray-900 uppercase tracking-[0.15em] border-b-2 border-gray-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all w-fit"
                        >
                            view more
                        </button>
                    </div>

                    {/* Marine Turbo */}
                    <div className="flex flex-col items-start text-left group w-fit">
                        <div className="h-48 md:h-60 mb-6 flex items-center justify-end w-full group-hover:translate-x-4 transition-transform duration-700">
                            <img 
                                src="/asset/spare_parts/part2.png" 
                                alt="Marine Turbo" 
                                className="h-full w-auto object-contain object-right transform translate-x-8" 
                            />
                        </div>
                        <h3 style={{ fontSize: "clamp(32px, 4vw, 42px)", fontFamily: "'Darker Grotesque', sans-serif", lineHeight: "1", marginBottom: "40px", fontWeight: 900 }} className="text-gray-900 whitespace-nowrap">Marine Turbo</h3>
                        <button 
                            onClick={() => setShowCatalogue(true)}
                            style={{ fontSize: "20px", fontFamily: "'Darker Grotesque', sans-serif" }}
                            className="font-bold text-gray-900 uppercase tracking-[0.15em] border-b-2 border-gray-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all w-fit"
                        >
                            view more
                        </button>
                    </div>
                </div>
            </section>


            {/* --- TOP PICKS FOR YOU --- */}
            <section id="top-picks-section" style={{ background: "#fff", paddingBottom: "100px", paddingLeft: "12vw", paddingRight: "12vw", paddingTop: "127px" }} className="flex flex-col items-center">
                <div className="container mx-auto w-full">
                    <div className="text-center flex flex-col items-center" style={{ marginBottom: "120px" }}>
                        <h2 className="text-4xl md:text-5xl font-900 text-gray-900" style={{ fontFamily: "'Darker Grotesque', sans-serif", letterSpacing: "-0.02em", marginBottom: "25px" }}>Top Picks For You</h2>
                        <p className="text-gray-500 font-medium leading-relaxed max-w-2xl text-center" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "20px" }}>Find specific recommendations for your specific operations that ensures high quality value.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20" style={{ marginBottom: "129.52px" }}>
                        {landingTopPicks.map((product, index) => {
                            const displayNames = ["Fuel Injector", "Marine Turbo", "Engine Controller", "Fuel Injector"];
                            return (
                                <Link href={`/shop/${product.id}`} key={index} className="group flex flex-col items-start text-left">
                                    <div className="aspect-square mb-10 w-[85%] flex items-center justify-start transition-transform duration-700 group-hover:translate-x-3">
                                        <img 
                                            src={product.image} 
                                            alt={displayNames[index]} 
                                            className="w-full h-full object-contain drop-shadow-2xl mix-blend-multiply"
                                        />
                                    </div>
                                    <h3 className="uppercase tracking-[0.1em] transition-colors whitespace-nowrap" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px", fontWeight: 500, color: "#94A3B8", marginBottom: "8px" }}>
                                        {displayNames[index]}
                                    </h3>
                                    <p style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "20px", fontWeight: 900, color: "#000" }}>
                                        {product.currency} {product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex justify-center">
                        <button 
                            onClick={() => setShowCatalogue(true)}
                            className="inline-block text-xs font-bold text-gray-900 uppercase tracking-[0.3em] border-b-2 border-gray-900 pb-2 hover:text-blue-600 hover:border-blue-600 transition-all font-sans"
                            style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}
                        >
                            View More
                        </button>
                    </div>
                </div>
            </section>



            {/* --- OUR INSTAGRAM --- */}
            <section className="text-center relative flex items-center justify-center overflow-hidden" style={{ minHeight: "500px", padding: "192px 0" }}>
                {/* Background Image with Blue Fade */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/asset/shop_image/instagram.png"
                        alt="Instagram Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0b1a2e]/85 backdrop-blur-[1px]" />
                </div>
                <div className="relative z-10 max-w-lg px-4 flex flex-col items-center">
                    <h2 className="font-black text-white" style={{ fontFamily: "'Darker Grotesque', sans-serif", letterSpacing: "-0.02em", marginBottom: "8px", fontSize: "60px" }}>Our Instagram</h2>
                    <p className="text-white/80 font-bold text-[20px]" style={{ fontFamily: "'Darker Grotesque', sans-serif", marginBottom: "16px" }}>Follow our store on instagram</p>
                    <Link 
                        href="https://instagram.com" 
                        target="_blank"
                        className="hero-btn-primary"
                        style={{ padding: "18px 48px", minWidth: "255px", justifyContent: "center", borderRadius: "4px" }}
                    >
                        Follow us
                    </Link>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section style={{ background: "rgba(150, 195, 228, 0.25)", padding: "140px 10vw", minHeight: "835px" }}>
                <div className="container mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
                    <div className="lg:w-1/3">
                        <h2 style={{ fontSize: "clamp(42px, 8vw, 70px)", fontWeight: 900, fontFamily: "'Darker Grotesque', sans-serif", color: "#0b1a2e", lineHeight: 1.0 }}>
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <div className="w-full lg:w-1/2 border-t border-[#0b1a2e]/20" style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "0" }}>
                        {faqs.map((faq, index) => (
                            <div key={faq.id} className="border-b border-[#0b1a2e]/20" style={{ paddingTop: "24px", paddingBottom: "24px" }}>
                                <button 
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                    className="w-full text-left group flex items-center justify-between"
                                    style={{ paddingBottom: "24px" }}
                                >
                                    <div className="flex items-center gap-6 md:gap-8 pr-4">
                                        <span style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "24px", fontWeight: 900, color: "#0b1a2e", opacity: 0.5 }}>{faq.id}</span>
                                        <span style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "26px", fontWeight: 700, color: "#0b1a2e", lineHeight: 1.3, maxWidth: "440px", display: "inline-block" }} className="group-hover:text-blue-600 transition-colors">
                                            {faq.question}
                                        </span>
                                    </div>
                                    <div className={`flex-shrink-0 p-2 rounded-full border ${activeFaq === index ? 'bg-[#0b1a2e] border-[#0b1a2e] text-white' : 'border-[#0b1a2e]/30'} transition-all`}>
                                        {activeFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {activeFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "19px", fontWeight: 500, color: "#334155", lineHeight: 1.6, paddingBottom: "40px", paddingLeft: "56px", paddingRight: "16px" }}>
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
