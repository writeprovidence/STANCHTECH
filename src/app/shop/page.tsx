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
    const itemsPerPage = 36;
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
        <div className="bg-[#F8FAFC] min-h-screen pt-20">
            <section className={`relative h-[320px] flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ${isFilterOpen ? 'blur-[1px] opacity-80' : ''}`}>
                <div className="absolute inset-0 z-0">
                    <img src="/asset/shop_image/spare_background.png" alt="Shop Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#0b1a2e]/40" />
                </div>
                <div className="relative z-10 text-center w-full max-w-4xl px-6">
                    <h1 className="text-6xl md:text-7xl font-medium text-white" style={{ fontFamily: "'Darker Grotesque', sans-serif", letterSpacing: "-0.04em" }}>Explore Spares</h1>
                </div>
            </section>

            <div style={{ background: "#F8FAFC", paddingLeft: "5vw", paddingRight: "5vw", paddingTop: "32px", paddingBottom: "32px" }}>
                <div style={{ background: "#ffffff", borderRadius: "5px" }} className="border border-gray-200 overflow-hidden w-full">
                    <div style={{ paddingLeft: "25px", paddingRight: "40px" }}>
                        <motion.div onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-4 h-[70px] cursor-pointer transition-all border-b border-gray-100/50">
                            <div className="w-10 h-10 rounded-full border border-black/40 flex items-center justify-center">
                                {isFilterOpen ? <X size={20} className="text-gray-900" /> : <SlidersHorizontal size={18} className="text-gray-900" />}
                            </div>
                            <span className="font-black uppercase tracking-widest text-gray-900" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>
                                {isFilterOpen ? "Collapse Filters" : "Filter"} 
                                <span className="font-medium text-gray-500" style={{ marginLeft: "12px" }}>({shopProducts.length} {shopProducts.length === 1 ? "product" : "products"})</span>
                            </span>
                        </motion.div>

                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden" style={{ background: "#ffffff" }}>
                                    <div style={{ padding: "50px 0px 80px 0px" }}>
                                        <div className="flex justify-between items-center" style={{ marginBottom: "50px" }}>
                                            <div className="flex items-center gap-8">
                                                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Refine Search</h3>
                                                <button onClick={() => setSelectedFilters([])} className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors underline underline-offset-4" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>Clear All</button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
                                            <div>
                                                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-900" style={{ fontFamily: "'Darker Grotesque', sans-serif", marginBottom: "15px" }}>Part Type</h4>
                                                <div className="flex flex-col gap-5">
                                                    {["Fuel Injectors", "Turbos", "Controllers", "Filters", "Hardware"].map(cat => (
                                                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                                            <input type="checkbox" className="hidden" checked={selectedFilters.includes(cat)} onChange={() => toggleFilter(cat)} />
                                                            <div className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${selectedFilters.includes(cat) ? 'border-blue-600 bg-blue-50' : 'border-gray-300 group-hover:border-blue-600'}`}>
                                                                <div className={`w-2.5 h-2.5 bg-blue-600 rounded-sm transition-all ${selectedFilters.includes(cat) ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                                                            </div>
                                                            <span className={`text-sm font-medium transition-colors ${selectedFilters.includes(cat) ? 'text-black' : 'text-gray-600 group-hover:text-black'}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{cat}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-900" style={{ fontFamily: "'Darker Grotesque', sans-serif", marginBottom: "15px" }}>Price Range</h4>
                                                <div className="flex flex-col gap-5">
                                                    {["Under 50k NGN", "50k - 200k NGN", "200k - 500k NGN", "Over 500k NGN"].map(range => (
                                                        <label key={range} className="flex items-center gap-3 cursor-pointer group">
                                                            <input type="checkbox" className="hidden" checked={selectedFilters.includes(range)} onChange={() => toggleFilter(range)} />
                                                            <div className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${selectedFilters.includes(range) ? 'border-blue-600 bg-blue-50' : 'border-gray-300 group-hover:border-blue-600'}`}>
                                                                <div className={`w-2.5 h-2.5 bg-blue-600 rounded-sm transition-all ${selectedFilters.includes(range) ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                                                            </div>
                                                            <span className={`text-sm font-medium transition-colors ${selectedFilters.includes(range) ? 'text-black' : 'text-gray-600 group-hover:text-black'}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{range}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-900" style={{ fontFamily: "'Darker Grotesque', sans-serif", marginBottom: "15px" }}>Condition</h4>
                                                <div className="flex flex-col gap-5">
                                                    {["Genuine New", "OEM Standard", "Refurbished", "Used / Tested"].map(cond => (
                                                        <label key={cond} className="flex items-center gap-3 cursor-pointer group">
                                                            <input type="checkbox" className="hidden" checked={selectedFilters.includes(cond)} onChange={() => toggleFilter(cond)} />
                                                            <div className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${selectedFilters.includes(cond) ? 'border-blue-600 bg-blue-50' : 'border-gray-300 group-hover:border-blue-600'}`}>
                                                                <div className={`w-2.5 h-2.5 bg-blue-600 rounded-sm transition-all ${selectedFilters.includes(cond) ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                                                            </div>
                                                            <span className={`text-sm font-medium transition-colors ${selectedFilters.includes(cond) ? 'text-black' : 'text-gray-600 group-hover:text-black'}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{cond}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-16 flex justify-end">
                                            <button onClick={() => setIsFilterOpen(false)} className="bg-[#155DFC] text-white py-4 rounded-[4px] font-black uppercase tracking-widest text-xs hover:bg-white hover:text-[#155DFC] hover:border-[#155DFC] border border-transparent transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(21,93,252,0.25)]" style={{ paddingLeft: "12px", paddingRight: "12px", fontFamily: "'Darker Grotesque', sans-serif" }}>Apply Filters</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div style={{ height: isFilterOpen ? "0px" : "12px", background: "#F8FAFC" }} className="transition-all duration-500" />

            <div className={`transition-all duration-500 ${isFilterOpen ? 'blur-[3px] opacity-70 pointer-events-none' : ''}`} style={{ paddingLeft: "5vw", paddingRight: "5vw", paddingTop: "16px", paddingBottom: "100px", background: "#F8FAFC" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ columnGap: "28px", rowGap: "48px" }}>
                    {shopProducts.map((product, index) => (
                        <Link href={`/shop/${product.id}`} key={index} className="group flex flex-col items-center text-center border border-gray-200 rounded-[5px] px-8 transition-all duration-500 hover:border-blue-400 hover:-translate-y-1 bg-white w-full" style={{ maxWidth: "100%", paddingTop: "34px", paddingBottom: "42px" }}>
                            <div className="flex items-center justify-center transition-transform duration-700 group-hover:scale-105" style={{ width: "85%", aspectRatio: "1/1", margin: "0 auto 20px auto" }}>
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-contain drop-shadow-xl" 
                                    style={{ padding: product.name.includes("Turbo") ? "24px" : "0px" }}
                                />
                            </div>
                            <div className="flex flex-col items-start text-left">
                                <h3 className="uppercase tracking-[0.1em] transition-colors group-hover:text-blue-600" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "14px", fontWeight: 500, color: "#94A3B8", marginBottom: "8px" }}>{product.name}</h3>
                                <p style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px", fontWeight: 900, color: "#000", marginBottom: "15px" }}>{product.currency} {product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
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
                            className="w-12 h-12 flex items-center justify-center rounded-[4px] font-bold text-sm bg-[#0b1a2e] text-white shadow-lg shadow-blue-100/20 font-sans"
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
