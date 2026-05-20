'use client';

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { Filter, ChevronRight, ChevronDown, ChevronUp, Star, Plus, Minus, Search, X, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ShopContent() {
    const [activeFaq, setActiveFaq] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [selectedFilters, setSelectedFilters] = useState([]);

    // Auto-scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const toggleFilter = (filter) => {
        setSelectedFilters(prev => 
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
        setCurrentPage(1); // Reset to first page on filter change
    };

    // Filter products based on selected categories, price, and condition
    const filteredProducts = PRODUCTS.filter(product => {
        if (selectedFilters.length === 0) return true;
        
        const categoryFilters = ["Fuel Injectors", "Turbos", "Controllers", "Filters", "Hardware"];
        const priceFilters = ["Under 50k NGN", "50k - 200k NGN", "200k - 500k NGN", "Over 500k NGN"];
        const conditionFilters = ["Genuine New", "OEM Standard", "Refurbished", "Used / Tested"];

        const activeCategoryFilters = selectedFilters.filter(f => categoryFilters.includes(f));
        const activePriceFilters = selectedFilters.filter(f => priceFilters.includes(f));
        const activeConditionFilters = selectedFilters.filter(f => conditionFilters.includes(f));

        const matchesCategory = activeCategoryFilters.length === 0 || activeCategoryFilters.includes(product.category);
        
        const matchesPrice = activePriceFilters.length === 0 || activePriceFilters.some(f => {
            if (f === "Under 50k NGN") return product.price < 50000;
            if (f === "50k - 200k NGN") return product.price >= 50000 && product.price <= 200000;
            if (f === "200k - 500k NGN") return product.price > 200000 && product.price <= 500000;
            if (f === "Over 500k NGN") return product.price > 500000;
            return false;
        });

        const matchesCondition = activeConditionFilters.length === 0 || activeConditionFilters.includes(product.condition);

        return matchesCategory && matchesPrice && matchesCondition;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const shopProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

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

    return (
        <div className="bg-[#F8FAFC] min-h-screen pt-20" style={{ fontFamily: "var(--font-body)" }}>
            <section className={`relative h-[320px] flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ${isFilterOpen ? 'blur-[1px] opacity-80' : ''}`}>
                <div className="absolute inset-0 z-0">
                    <img src="/asset/shop_image/spare_background.png" alt="Shop Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#0b1a2e]/40" />
                </div>
                <div className="relative z-10 text-center w-full max-w-4xl px-6">
                    <h1 className="text-6xl md:text-7xl font-800 text-white" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.04em" }}>Explore Spares</h1>
                </div>
            </section>

            <div style={{ background: "#F8FAFC", paddingLeft: "5vw", paddingRight: "5vw", paddingTop: "16px", paddingBottom: "16px" }}>
                <div style={{ background: "#ffffff", borderRadius: "0" }} className="border border-gray-200 w-full">
                    <div style={{ paddingLeft: "25px", paddingRight: "40px" }}>
                        <motion.div 
                            onClick={() => setIsFilterOpen(!isFilterOpen)} 
                            className="flex items-center gap-6 h-[64px] cursor-pointer group transition-all"
                        >
                            <div className={`w-12 h-12 rounded-none border-2 flex items-center justify-center transition-all duration-500 ${isFilterOpen ? 'bg-black border-black text-white rotate-90' : 'bg-transparent border-black/10 text-gray-900 group-hover:border-black group-hover:scale-105'}`}>
                                {isFilterOpen ? <X size={20} /> : <SlidersHorizontal size={18} />}
                            </div>
                            <div className="flex items-baseline gap-4">
                                <span className="font-900 uppercase tracking-[0.2em] text-black" style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}>
                                    {isFilterOpen ? "Close" : "Filter"} 
                                </span>
                                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
                                    ({shopProducts.length} product)
                                </span>
                            </div>
                        </motion.div>

                        <div
                            style={{
                                maxHeight: isFilterOpen ? "1400px" : "0px",
                                overflow: "hidden",
                                transition: "max-height 0.5s ease",
                                background: "white"
                            }}
                        >
                            <div style={{ padding: "32px 24px", borderTop: "1px solid #f9fafb" }}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                                    {/* Part Type */}
                                    <div>
                                        <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#9ca3af", marginBottom: "28px" }}>01. Category</h4>
                                        <div className="flex flex-col gap-6">
                                            {["Fuel Injectors", "Turbos", "Controllers", "Filters", "Hardware"].map(cat => (
                                                <label key={cat} className="flex items-center gap-4 cursor-pointer group">
                                                    <input type="checkbox" className="hidden" checked={selectedFilters.includes(cat)} onChange={() => toggleFilter(cat)} />
                                                    <div className={`w-4 h-4 border-2 transition-all duration-300 ${selectedFilters.includes(cat) ? 'bg-black border-black scale-110' : 'border-gray-200 group-hover:border-black'}`} />
                                                    <span className={`text-[13px] font-bold uppercase tracking-widest transition-colors ${selectedFilters.includes(cat) ? 'text-black' : 'text-gray-400 group-hover:text-black'}`} style={{ fontFamily: "var(--font-body)" }}>{cat}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Range */}
                                    <div>
                                        <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#9ca3af", marginBottom: "28px" }}>02. Budget</h4>
                                        <div className="flex flex-col gap-6">
                                            {["Under 50k NGN", "50k - 200k NGN", "200k - 500k NGN", "Over 500k NGN"].map(range => (
                                                <label key={range} className="flex items-center gap-4 cursor-pointer group">
                                                    <input type="checkbox" className="hidden" checked={selectedFilters.includes(range)} onChange={() => toggleFilter(range)} />
                                                    <div className={`w-4 h-4 border-2 transition-all duration-300 ${selectedFilters.includes(range) ? 'bg-black border-black scale-110' : 'border-gray-200 group-hover:border-black'}`} />
                                                    <span className={`text-[13px] font-bold uppercase tracking-widest transition-colors ${selectedFilters.includes(range) ? 'text-black' : 'text-gray-400 group-hover:text-black'}`} style={{ fontFamily: "var(--font-body)" }}>{range}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Condition */}
                                    <div>
                                        <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#9ca3af", marginBottom: "28px" }}>03. Condition</h4>
                                        <div className="flex flex-col gap-6">
                                            {["Genuine New", "OEM Standard", "Refurbished", "Used / Tested"].map(cond => (
                                                <label key={cond} className="flex items-center gap-4 cursor-pointer group">
                                                    <input type="checkbox" className="hidden" checked={selectedFilters.includes(cond)} onChange={() => toggleFilter(cond)} />
                                                    <div className={`w-4 h-4 border-2 transition-all duration-300 ${selectedFilters.includes(cond) ? 'bg-black border-black scale-110' : 'border-gray-200 group-hover:border-black'}`} />
                                                    <span className={`text-[13px] font-bold uppercase tracking-widest transition-colors ${selectedFilters.includes(cond) ? 'text-black' : 'text-gray-400 group-hover:text-black'}`} style={{ fontFamily: "var(--font-body)" }}>{cond}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #f9fafb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <button onClick={() => setSelectedFilters([])} className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors" style={{ fontFamily: "var(--font-body)" }}>Reset All Filters</button>
                                    <button onClick={() => setIsFilterOpen(false)} className="hero-btn-primary" style={{ fontFamily: "var(--font-heading)" }}>Apply Filters</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ height: isFilterOpen ? "0px" : "12px", background: "#F8FAFC" }} className="transition-all duration-500" />

            <div className={`transition-all duration-500 ${isFilterOpen ? 'blur-[3px] opacity-70 pointer-events-none' : ''}`} style={{ paddingLeft: "5vw", paddingRight: "5vw", paddingTop: "16px", paddingBottom: "100px", background: "#F8FAFC" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {shopProducts.map((product, index) => (
                        <Link 
                            href={`/shop/${product.id}`} 
                            key={index} 
                            className="group relative bg-white border border-gray-100 text-left transition-all duration-700 hover:-translate-y-2 flex flex-col items-center"
                            style={{ paddingLeft: "2rem", paddingRight: "2rem", paddingTop: "3rem", paddingBottom: "2rem" }}
                        >
                            {/* Genuine Badge */}
                            <div className="absolute top-6 left-6 text-blue-600 text-[16px] font-900 uppercase tracking-widest opacity-100 transition-opacity duration-300 z-10" style={{ fontFamily: "var(--font-body)" }}>
                                {product.condition}
                            </div>

                            <div className="w-full aspect-square mb-6 transition-transform duration-700 group-hover:scale-105 flex items-center justify-center p-8">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-[80%] h-[80%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100" 
                                />
                            </div>

                            <div style={{ width: "100%", marginTop: "auto", textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
                                <p className="text-gray-500 font-800 text-[18px] leading-tight uppercase" style={{ fontFamily: "var(--font-body)" }}>
                                    {product.name}
                                </p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", paddingTop: "4px", marginTop: "4px" }}>
                                    <span className="font-[800] text-[18px]" style={{ fontFamily: "var(--font-heading)", color: "#000000" }}>
                                        ₦{product.price.toLocaleString()}
                                    </span>
                                    <div className="w-8 h-8 rounded-full border border-gray-100 flex flex-shrink-0 items-center justify-center text-gray-300 group-hover:border-black group-hover:text-black transition-all">
                                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div style={{ height: "118px" }} />
                    <div className="flex justify-center items-center gap-4">
                         <button 
                            className="w-12 h-12 flex items-center justify-center rounded-[4px] bg-gray-50 text-gray-300 opacity-50 cursor-default transition-all"
                        >
                            <ChevronDown className="rotate-90" size={16} />
                        </button>

                        <button 
                            className="w-12 h-12 flex items-center justify-center rounded-[4px] font-bold text-sm bg-[#0b1a2e] text-white shadow-lg shadow-blue-100/20"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            1
                        </button>

                        <button 
                            className="w-12 h-12 flex items-center justify-center rounded-[4px] bg-gray-50 text-gray-900 transition-all opacity-50 cursor-default"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                <div style={{ height: "100px" }} />
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShopContent />
        </Suspense>
    );
}
