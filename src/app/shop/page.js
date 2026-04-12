'use client';

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { Filter, ChevronRight, ChevronDown, ChevronUp, Star, Plus, Minus, Search, X, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ShopContent() {
    const searchParams = useSearchParams();
    const view = searchParams.get('view');
    
    const [showCatalogue, setShowCatalogue] = useState(true);

    useEffect(() => {
        if (view === 'catalogue') {
            setShowCatalogue(true);
        } else if (view === 'landing') {
            setShowCatalogue(false);
        }
    }, [view]);
    const [activeFaq, setActiveFaq] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);

    // Auto-scroll to top when catalogue is shown
    useEffect(() => {
        if (showCatalogue) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [showCatalogue]);

    const toggleFilter = (filter) => {
        setSelectedFilters(prev => 
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
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

    const shopProducts = filteredProducts;

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
                <section className="relative h-[320px] flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img src="/asset/shop_image/spare_background.png" alt="Shop Background" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#0b1a2e]/40" />
                    </div>
                    <div className="relative z-10 text-center w-full max-w-4xl px-6">
                        <h1 className="text-6xl md:text-7xl font-black text-white mb-8" style={{ fontFamily: "'Darker Grotesque', sans-serif", letterSpacing: "-0.04em" }}>Explore Spares</h1>
                        <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.2em]">
                            <Link href="/shop?view=landing" className="text-white hover:text-blue-400 transition-colors" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Home</Link>
                            <ChevronRight size={14} className="text-blue-400" />
                            <span className="text-white/60" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Shop</span>
                        </div>
                    </div>
                </section>

                <div style={{ background: "#fff", paddingLeft: "100px", paddingRight: "100px", paddingTop: "32px", paddingBottom: "32px" }}>
                    <div style={{ background: "#F0F7FF" }} className="border border-gray-100 rounded-xl overflow-hidden w-full">
                        <div style={{ paddingLeft: "40px", paddingRight: "40px" }}>
                            <motion.div onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex gap-4 h-[60px] cursor-pointer transition-all border-b border-gray-100/50" style={{ paddingTop: "18px" }}>
                                <div className="w-8 h-8 rounded-full border border-black/40 flex items-center justify-center">
                                    {isFilterOpen ? <X size={16} className="text-gray-900" /> : <SlidersHorizontal size={14} className="text-gray-900" />}
                                </div>
                                <span className="font-black uppercase tracking-widest text-gray-900" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px", marginTop: "8px" }}>
                                    {isFilterOpen ? "Collapse Filters" : "Filter"} 
                                    <span className="ml-2 font-medium text-gray-500">({shopProducts.length} {shopProducts.length === 1 ? "product" : "products"})</span>
                                </span>
                            </motion.div>

                            <AnimatePresence>
                                {isFilterOpen && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden" style={{ background: "#F0F7FF" }}>
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
                                                <button onClick={() => setIsFilterOpen(false)} className="bg-[#0b1a2e] text-white py-4 rounded font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-colors" style={{ paddingLeft: "12px", paddingRight: "12px", fontFamily: "'Darker Grotesque', sans-serif" }}>Apply Filters</button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div style={{ height: isFilterOpen ? "60px" : "138px", background: "#fff" }} className="transition-all duration-500" />

                <div style={{ paddingLeft: "100px", paddingRight: "100px", paddingBottom: "100px", background: "#fff" }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ columnGap: "32px", rowGap: "48px" }}>
                        {shopProducts.map((product, index) => (
                            <Link href={`/shop/${product.id}`} key={index} className="group flex flex-col items-center text-center border border-gray-100 rounded-xl pt-10 px-8 pb-16 transition-all duration-500 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 bg-white w-full" style={{ maxWidth: "360px" }}>
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
                        <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#0b1a2e] text-white font-bold text-sm shadow-lg shadow-blue-100/20 hover:bg-blue-600 transition-all font-sans">1</button>
                        {[2, 3].map(page => (
                            <button key={page} className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 font-bold text-sm hover:bg-gray-100 transition-all font-sans">{page}</button>
                        ))}
                        <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-50 text-gray-900 hover:bg-gray-100 transition-all"><ChevronRight size={16} /></button>
                    </div>
                    <div style={{ height: "100px" }} />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-20">
            {/* --- LANDING HERO (IMAGE 1) --- */}
            {/* --- LANDING HERO --- */}
            <section 
                style={{ background: "#fff", paddingLeft: "10vw", paddingRight: "10vw" }} 
                className="min-h-[820px] md:h-[820px] flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-[10vw] relative overflow-hidden border-b border-gray-100 py-20 md:py-0"
            >
                <div style={{ color: "#090E1A" }} className="flex flex-col justify-center items-start text-left z-20 flex-shrink-0 w-full md:w-auto mt-12 md:mt-0">
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
                
                <div className="w-full md:w-[35%] h-auto md:h-[80%] flex items-center justify-center z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        <img 
                            src="/asset/spare_parts/part2.png" 
                            alt="Marine Turbo" 
                            style={{ width: "100%", height: "auto", maxWidth: "450px", objectFit: "contain" }}
                            className="relative z-10"
                        />
                    </motion.div>
                </div>
            </section>

            {/* --- CATEGORIES ROW --- */}
            <section 
                style={{ background: "#F0F7FF", paddingLeft: "10vw", paddingRight: "10vw" }} 
                className="min-h-[700px] md:h-[672px] flex items-center py-32 md:py-0 w-full"
            >
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-[15vw] justify-items-center items-center">
                    {/* Fuel Injector */}
                    <div className="flex flex-col items-start text-left group w-full md:w-fit">
                        <div className="h-40 md:h-60 mb-8 flex items-center justify-end w-full group-hover:translate-x-4 transition-transform duration-700">
                            <img 
                                src="/asset/spare_parts/Part3.png" 
                                alt="Fuel Injector" 
                                className="h-full w-auto object-contain object-right transform translate-x-8" 
                            />
                        </div>
                        <h3 style={{ fontSize: "clamp(28px, 6vw, 42px)", fontFamily: "'Darker Grotesque', sans-serif", lineHeight: "1", marginBottom: "32px", fontWeight: 900 }} className="text-gray-900 whitespace-nowrap">Fuel Injector</h3>
                        <button 
                            onClick={() => { setShowCatalogue(true); window.scrollTo(0, 0); }}
                            style={{ fontSize: "20px", fontFamily: "'Darker Grotesque', sans-serif" }}
                            className="font-bold text-gray-900 uppercase tracking-[0.15em] border-b-2 border-gray-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all w-fit"
                        >
                            view more
                        </button>
                    </div>

                    {/* Marine Turbo */}
                    <div className="flex flex-col items-start text-left group w-full md:w-fit">
                        <div className="h-40 md:h-60 mb-8 flex items-center justify-end w-full group-hover:translate-x-4 transition-transform duration-700">
                            <img 
                                src="/asset/spare_parts/part2.png" 
                                alt="Marine Turbo" 
                                className="h-full w-auto object-contain object-right transform translate-x-8" 
                            />
                        </div>
                        <h3 style={{ fontSize: "clamp(28px, 6vw, 42px)", fontFamily: "'Darker Grotesque', sans-serif", lineHeight: "1", marginBottom: "32px", fontWeight: 900 }} className="text-gray-900 whitespace-nowrap">Marine Turbo</h3>
                        <button 
                            onClick={() => { setShowCatalogue(true); window.scrollTo(0, 0); }}
                            style={{ fontSize: "20px", fontFamily: "'Darker Grotesque', sans-serif" }}
                            className="font-bold text-gray-900 uppercase tracking-[0.15em] border-b-2 border-gray-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all w-fit mb-12 md:mb-0"
                        >
                            view more
                        </button>
                    </div>
                </div>
            </section>


            {/* --- TOP PICKS FOR YOU --- */}
            <section id="top-picks-section" style={{ background: "#fff", paddingBottom: "100px", paddingLeft: "10vw", paddingRight: "10vw", paddingTop: "127px" }} className="flex flex-col items-center">
                <div className="container mx-auto w-full">
                    <div className="text-center flex flex-col items-center" style={{ marginBottom: "120px" }}>
                        <h2 className="text-4xl md:text-5xl font-900 text-gray-900" style={{ fontFamily: "'Darker Grotesque', sans-serif", letterSpacing: "-0.02em", marginBottom: "25px" }}>Top Picks For You</h2>
                        <p className="text-gray-500 font-medium leading-relaxed max-w-2xl text-center" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "20px" }}>Find specific recommendations for your specific operations that ensures high quality value.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 justify-items-center" style={{ marginBottom: "129.52px" }}>
                        {landingTopPicks.map((product, index) => {
                            return (
                                <Link href={`/shop/${product.id}`} key={index} className="group flex flex-col items-center text-center">
                                    <div className="aspect-square mb-10 w-[85%] flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="w-full h-full object-contain drop-shadow-2xl mix-blend-multiply"
                                        />
                                    </div>
                                    <h3 className="uppercase tracking-[0.1em] transition-colors whitespace-nowrap" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px", fontWeight: 500, color: "#94A3B8", marginBottom: "8px" }}>
                                        {product.name}
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
                            onClick={() => { setShowCatalogue(true); window.scrollTo(0, 0); }}
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

export default function ShopPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShopContent />
        </Suspense>
    );
}
