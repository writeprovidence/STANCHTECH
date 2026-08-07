'use client';

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronRight, ChevronDown, Loader2, Search } from "lucide-react";
import Image from "next/image";

function SparesContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || "";
    
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('id, name, image, images, condition, category')
                    .neq('is_hidden', true)
                    .order('id', { ascending: false });
                if (!error && data) setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const conditionFilters = ["Genuine Part", "OEM", "Rerun/Reman", "Used"];

    const toggleFilter = (filter: string) => {
        setSelectedFilters(prev =>
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
        setCurrentPage(1);
    };

    const filteredProducts = products
        .filter(product => {
            const query = searchQuery.toLowerCase().trim();
            const matchesSearch = !query || 
                                (product.name || "").toLowerCase().includes(query) || 
                                (product.category || "").toLowerCase().includes(query) || 
                                (product.sku || "").toLowerCase().includes(query);
            
            const activeConditionFilters = selectedFilters.filter(f => conditionFilters.includes(f));
            const matchesCondition = activeConditionFilters.length === 0 || activeConditionFilters.includes(product.condition);

            return matchesSearch && matchesCondition;
        })
        .sort((a, b) => {
            const query = searchQuery.toLowerCase().trim();
            if (!query) return (b.id || 0) - (a.id || 0); // Default to newest if no search

            const aName = (a.name || "").toLowerCase();
            const bName = (b.name || "").toLowerCase();

            // Prioritize results that START with the query (alphabetical priority)
            const aStarts = aName.startsWith(query);
            const bStarts = bName.startsWith(query);

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;

            return aName.localeCompare(bName);
        });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const SparesProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    return (
        <div className="bg-[#F8FAFC] min-h-screen" style={{ fontFamily: "var(--font-body)" }}>

            {/* Hero */}
            <section className="relative min-h-[360px] md:h-[380px] flex flex-col items-center justify-center overflow-hidden py-16 md:py-0">
                <div className="absolute inset-0 z-0">
                    <img src="/asset/spares_image/spare_background.png" alt="Spares Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#0b1a2e]/65" />
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto px-5 md:px-8" style={{ paddingTop: "80px" }}>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-800 text-white leading-tight" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.03em" }}>Explore Spares</h1>
                    <p className="text-sm sm:text-base md:text-lg" style={{ color: "rgba(255,255,255,0.75)", marginTop: "14px", fontFamily: "var(--font-body)", lineHeight: "1.6" }}>
                        Browse our spares — contact us directly to enquire or place an order.
                    </p>
                    
                    {/* Prominent Search Bar */}
                    <div className="w-full" style={{ maxWidth: "600px", marginTop: "24px", paddingLeft: "16px", paddingRight: "16px" }}>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0"
                            style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.2)", padding: "8px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
                            <div className="flex items-center flex-1" style={{ paddingLeft: "16px" }}>
                                <input 
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name, SKU or category..."
                                    className="w-full"
                                    style={{ background: "transparent", border: "none", outline: "none", color: "white", padding: "12px 8px", fontSize: "15px", fontFamily: "var(--font-body)", fontWeight: 500 }}
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", color: "white", opacity: 0.5, cursor: "pointer", paddingRight: "8px", flexShrink: 0 }}>
                                        <X size={18} />
                                    </button>
                                )}
                            </div>
                            <button 
                                onClick={() => window.scrollTo({ top: 460, behavior: 'smooth' })}
                                className="w-full sm:w-auto"
                                style={{ background: "#155DFC", color: "white", border: "none", borderRadius: "10px", padding: "14px 28px", fontSize: "13px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-heading)", cursor: "pointer", whiteSpace: "nowrap" }}
                            >
                                Find Spares
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Banner */}
            <div style={{ background: "#0b1a2e", padding: "20px 5vw", display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                    <a href="https://wa.me/2348037340959" target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontWeight: 700, fontSize: "14px", fontFamily: "var(--font-body)", textDecoration: "none", letterSpacing: "0.05em" }}>
                        WhatsApp: +234 803 734 0959
                    </a>
                    <span style={{ color: "#4b5563" }}>|</span>
                    <a href="tel:+2348037340959" style={{ color: "#fff", fontWeight: 700, fontSize: "14px", fontFamily: "var(--font-body)", textDecoration: "none", letterSpacing: "0.05em" }}>
                        Call Us: +234 803 734 0959
                    </a>
                </div>
            </div>

            {/* Filter Bar */}
            <div style={{ background: "#F8FAFC", paddingLeft: "5vw", paddingRight: "5vw", paddingTop: "16px", paddingBottom: "16px" }}>
                <div style={{ background: "#ffffff", border: "1px solid #e5e7eb" }}>
                    <div style={{ paddingLeft: "25px", paddingRight: "40px" }}>
                        <div onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-6 h-[64px] cursor-pointer group transition-all">
                            <div className={`w-12 h-12 rounded-none border-2 flex items-center justify-center transition-all duration-500 ${isFilterOpen ? 'bg-black border-black text-white rotate-90' : 'bg-transparent border-black/10 text-gray-900 group-hover:border-black group-hover:scale-105'}`}>
                                {isFilterOpen ? <X size={20} /> : <SlidersHorizontal size={18} />}
                            </div>
                            <div className="flex items-baseline gap-4">
                                <span className="font-900 uppercase tracking-[0.2em] text-black" style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}>
                                    {isFilterOpen ? "Close" : "Filter"}
                                </span>
                                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
                                    ({filteredProducts.length} items)
                                </span>
                            </div>
                        </div>

                        <div style={{ maxHeight: isFilterOpen ? "400px" : "0px", overflow: "hidden", transition: "max-height 0.5s ease", background: "white" }}>
                            <div style={{ padding: "32px 24px", borderTop: "1px solid #f9fafb" }}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                                    <div>
                                        <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#9ca3af", marginBottom: "28px" }}>Condition</h4>
                                        <div className="flex flex-col gap-6">
                                            {conditionFilters.map(cond => (
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
                                    <button onClick={() => setSelectedFilters([])} className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors" style={{ fontFamily: "var(--font-body)" }}>Reset All</button>
                                    <button onClick={() => setIsFilterOpen(false)} className="hero-btn-primary" style={{ fontFamily: "var(--font-heading)" }}>Apply Filters</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div style={{ paddingLeft: "5vw", paddingRight: "5vw", paddingTop: "16px", paddingBottom: "80px", background: "#F8FAFC" }}>
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="bg-white border border-gray-100 flex flex-col items-center animate-pulse" style={{ padding: "2rem" }}>
                                <div className="w-full aspect-square mb-6 bg-gray-100 rounded-lg" />
                                <div className="w-full flex flex-col gap-3">
                                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {SparesProducts.map((product, index) => {
                            const imgSrc = (Array.isArray(product.image) ? product.image[0] : product.image) || "/asset/Landing_page_image/marine_spares.png";
                            return (
                                <Link
                                    href={`/spares/${product.id}`}
                                    key={product.id ?? index}
                                    className="group relative bg-white border border-gray-100 text-left transition-all duration-700 flex flex-col items-center hover:shadow-lg hover:-translate-y-1"
                                    style={{ paddingLeft: "2rem", paddingRight: "2rem", paddingTop: "3rem", paddingBottom: "2rem" }}
                                >
                                    {/* Condition Badge */}
                                    <div className="absolute top-6 left-6 text-blue-600 text-[12px] font-900 uppercase tracking-widest z-10" style={{ fontFamily: "var(--font-body)" }}>
                                        {product.condition === 'Genuine Part' ? 'Cummins' : (product.condition || 'Cummins')}
                                    </div>

                                    <div className="w-full aspect-square mb-6 flex items-center justify-center p-8 relative">
                                        <Image
                                            src={imgSrc}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-contain transition-all duration-700 group-hover:scale-105 p-8"
                                            priority={index < 4}
                                            loading={index < 4 ? "eager" : "lazy"}
                                            unoptimized={!imgSrc.startsWith('https://')}
                                        />
                                    </div>

                                    <div style={{ width: "100%", marginTop: "auto", textAlign: "left", display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <p className="text-gray-800 font-800 text-[16px] leading-tight uppercase" style={{ fontFamily: "var(--font-body)" }}>
                                            {product.name}
                                        </p>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", paddingTop: "4px" }}>
                                            <span className="text-[12px] font-bold text-blue-600 uppercase tracking-widest" style={{ fontFamily: "var(--font-body)" }}>
                                                Enquire for price
                                            </span>
                                            <div className="w-8 h-8 rounded-full border border-gray-100 flex flex-shrink-0 items-center justify-center text-gray-300 group-hover:border-black group-hover:text-black transition-all">
                                                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                <div style={{ height: "60px" }} />
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4">
                        <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}
                            className={`w-12 h-12 flex items-center justify-center rounded-[4px] bg-gray-50 transition-all ${currentPage === 1 ? 'text-gray-300 opacity-50 cursor-default' : 'text-gray-900 cursor-pointer hover:bg-gray-200'}`}>
                            <ChevronDown className="rotate-90" size={16} />
                        </button>
                        {Array.from({ length: totalPages }).map((_, i) => {
                            const pageNum = i + 1;
                            const isActive = pageNum === currentPage;
                            return (
                                <button key={pageNum} onClick={() => handlePageChange(pageNum)}
                                    className={`w-12 h-12 flex items-center justify-center rounded-[4px] font-bold text-sm transition-all ${isActive ? 'bg-[#2563eb] text-white shadow-lg' : 'bg-gray-50 text-gray-600 hover:bg-gray-200 cursor-pointer'}`}
                                    style={{ fontFamily: "var(--font-heading)" }}>
                                    {pageNum}
                                </button>
                            );
                        })}
                        <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}
                            className={`w-12 h-12 flex items-center justify-center rounded-[4px] bg-gray-50 transition-all ${currentPage === totalPages ? 'text-gray-300 opacity-50 cursor-default' : 'text-gray-900 cursor-pointer hover:bg-gray-200'}`}>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function SparesLoadingSkeleton() {
    return (
        <div className="bg-[#F8FAFC] min-h-screen pt-20">
            <div className="h-[320px] bg-[#0b1a2e] animate-pulse" />
            <div style={{ paddingLeft: "5vw", paddingRight: "5vw", paddingTop: "32px", paddingBottom: "100px", background: "#F8FAFC" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-white border border-gray-100 flex flex-col items-center animate-pulse" style={{ padding: "2rem" }}>
                            <div className="w-full aspect-square mb-6 bg-gray-100 rounded-lg" />
                            <div className="w-full flex flex-col gap-3">
                                <div className="h-4 bg-gray-100 rounded w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function SparesPage() {
    return (
        <Suspense fallback={<SparesLoadingSkeleton />}>
            <SparesContent />
        </Suspense>
    );
}
