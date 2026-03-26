'use client';

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ALL_PRODUCTS = [
    {
        id: 1,
        name: "Marine Engine Diagnostics Kit",
        description: "Advanced diagnostic equipment for complete marine engine analysis.",
        price: 3499.00,
        category: "Equipment",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=80",
        isNew: true
    },
    {
        id: 2,
        name: "Industrial Turbine Lubricant",
        description: "High-performance lubricant for demanding industrial turbine operations.",
        price: 850.00,
        category: "Lubricants",
        image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&auto=format&fit=crop&q=80"
    },
    {
        id: 3,
        name: "Marine Valve Service Pack",
        description: "Complete repair kit for standard commercial vessel valve systems.",
        price: 1250.00,
        category: "Parts",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80"
    },
    {
        id: 4,
        name: "Heavy-Duty Generator Filter",
        description: "OEM quality filtration for industrial power generation units.",
        price: 450.00,
        category: "Parts",
        image: "https://images.unsplash.com/photo-1542396601-dca920ea2807?w=800&auto=format&fit=crop&q=80"
    },
    {
        id: 5,
        name: "Planned Maintenance Package",
        description: "Comprehensive preventive service to ensure operational continuity.",
        price: 5000.00,
        category: "Services",
        image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80"
    },
    {
        id: 6,
        name: "Emergency Swift Response Callout",
        description: "Standby emergency services, treated with absolute urgency.",
        price: 1500.00,
        category: "Services",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80"
    }
];

const CATEGORIES = ["All", "Equipment", "Parts", "Lubricants", "Services"];

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredProducts = ALL_PRODUCTS.filter(product => {
        const matchesCategory = activeCategory === "All" || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-slate-50 pt-12 min-h-screen">
            <div className="container mx-auto px-6 pb-24">
                {/* Header */}
                <div className="max-w-4xl mb-20">
                    <span className="text-blue-600 font-black uppercase tracking-widest text-xs mb-4 inline-block">Genuine Spare Parts & Equipment</span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
                        THE PARTS. <br />
                        <span className="italic font-serif text-blue-600">THE POWER.</span>
                    </h1>
                    <p className="text-xl font-medium text-slate-500 max-w-2xl leading-relaxed">
                        Access our curated catalog of high-performance marine and industrial spare parts. Engineered for durability and absolute reliability to keep your operations moving.
                    </p>
                </div>

                {/* Filters & Tools */}
                <div className="flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center mb-16">
                    <div className="flex flex-wrap gap-3">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${activeCategory === cat
                                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/30 scale-105"
                                    : "bg-white text-slate-400 hover:text-slate-900 border border-slate-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-72">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-full px-12 py-4 outline-none focus:border-blue-600 transition-colors font-bold text-sm"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>

                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="p-4 bg-white border border-slate-200 rounded-full hover:bg-slate-100 transition-colors relative"
                        >
                            <SlidersHorizontal className="w-5 h-5 text-slate-900" />
                        </button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-40 text-center">
                        <h3 className="text-3xl font-black text-slate-300 uppercase tracking-widest italic">No products found</h3>
                        <button
                            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                            className="mt-6 text-blue-600 font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
