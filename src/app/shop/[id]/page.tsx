'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ChevronRight, Star, Minus, Plus, Facebook, Instagram, Loader2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const productId = parseInt(resolvedParams.id);

    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState('specification');
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [canReview, setCanReview] = useState(false);
    const [dynamicReviews, setDynamicReviews] = useState<any[]>([]);
    const { addToCart } = useCart();
    const { user } = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', productId)
                    .single();
                if (error) throw error;
                if (data) setProduct(data);
                else {
                    const local = PRODUCTS.find(p => p.id === productId);
                    if (local) setProduct(local);
                }
            } catch {
                const local = PRODUCTS.find(p => p.id === productId);
                if (local) setProduct(local);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    // Fetch related products live from Supabase only
    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .neq('id', productId)
                    .limit(4);
                if (!error && data) setRelatedProducts(data);
            } catch {}
        };
        fetchRelated();

        // Check if user has purchased and received this product (Live DB & Local Fallback)
        const checkReviewEligibility = async () => {
            let hasDelivered = false;
            console.log("Review eligibility check started for:", productId, product?.name);

            // 1. Local storage check (Instant sync)
            try {
                const rawOrders = localStorage.getItem('orders');
                if (rawOrders) {
                    const orders = JSON.parse(rawOrders);
                    hasDelivered = orders.some((o: any) => {
                        const isDelivered = o.status === 'Delivered';
                        const productMatches = o.items?.some((i: any) => 
                            String(i.id) === String(productId) || 
                            String(i.name).toLowerCase() === String(product?.name).toLowerCase()
                        );
                        return isDelivered && productMatches;
                    });
                }
            } catch (e) {}

            // 2. Live Supabase check (Cross-device sync)
            if (!hasDelivered) {
                try {
                    const rawProfile = localStorage.getItem('stanchtech_checkout_profile');
                    const guestEmail = rawProfile ? JSON.parse(rawProfile).email : null;
                    const emailToCheck = userEmail || guestEmail;

                    console.log("Checking DB with email:", emailToCheck);

                    if (emailToCheck) {
                        const { data, error } = await supabase
                            .from('orders')
                            .select('*')
                            .eq('status', 'Delivered');
                        
                        if (data && !error) {
                            hasDelivered = data.some((o: any) => {
                                const orderEmail = o.billing?.email || o.billing?.emailAddress || o.email || o.billing?.billingEmail;
                                const emailMatches = orderEmail?.toLowerCase() === emailToCheck.toLowerCase();
                                const productMatches = o.items?.some((i: any) => 
                                    String(i.id) === String(productId) || 
                                    String(i.name).toLowerCase() === String(product?.name).toLowerCase()
                                );
                                return emailMatches && productMatches;
                            });
                        }
                    }
                } catch (err) {
                    console.error("Supabase review check error:", err);
                }
            }

            console.log("Eligibility Result:", hasDelivered);
            if (hasDelivered) setCanReview(true);
        };

        if (product) {
            checkReviewEligibility();

            // Load reviews from Supabase (real-time, cross-device)
            const fetchReviews = async () => {
                try {
                    const { data, error } = await supabase
                        .from('reviews')
                        .select('*')
                        .eq('product_id', String(productId))
                        .order('created_at', { ascending: false });

                    if (data && !error) {
                        const shaped = data.map((r: any) => ({
                            name: r.user_name,
                            date: new Date(r.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                            rating: r.rating,
                            comment: r.comment
                        }));
                        setDynamicReviews(shaped);
                    } else {
                        // Fallback to localStorage if DB unavailable
                        const allGlobal = JSON.parse(localStorage.getItem('stanchtech_global_reviews') || '[]');
                        const productSpecific = allGlobal.filter((r: any) => String(r.productId || r.product_id) === String(productId));
                        setDynamicReviews(productSpecific.map((r: any) => ({ ...r, name: r.name || r.user_name })));
                    }
                } catch {
                    const allGlobal = JSON.parse(localStorage.getItem('stanchtech_global_reviews') || '[]');
                    const productSpecific = allGlobal.filter((r: any) => String(r.productId || r.product_id) === String(productId));
                    setDynamicReviews(productSpecific.map((r: any) => ({ ...r, name: r.name || r.user_name })));
                }
            };

            fetchReviews();
        }
    }, [productId, userEmail, product]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={48} /></div>;
    if (!product) return <div className="pt-40 text-center">Product not found</div>;

    const images: string[] = Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : [product.image].filter(Boolean);
    const currentImage = images[activeImage] || product.image;

    return (
        <div className="bg-white min-h-screen pb-20" style={{ paddingTop: "72px" }}>
            {/* Breadcrumb */}
            <div className="border-b border-gray-100 bg-white">
                <div style={{ paddingLeft: "5vw", paddingRight: "5vw" }} className="h-16 flex items-center gap-4">
                    <Link href="/shop" className="text-gray-400 hover:text-black transition-colors font-bold uppercase tracking-widest text-[12px]" style={{ fontFamily: "var(--font-body)" }}>Shop</Link>
                    <ChevronRight size={12} className="text-gray-300" />
                    <span className="text-black font-bold uppercase tracking-widest text-[12px]" style={{ fontFamily: "var(--font-body)" }}>{product.name}</span>
                </div>
            </div>

            <div style={{ paddingLeft: "5vw", paddingRight: "5vw", paddingTop: "40px", paddingBottom: "80px" }}>
                <section className="w-full flex flex-col lg:flex-row gap-24 items-start">
                    {/* LEFT: Images */}
                    <div className="w-full lg:w-[55%] flex flex-col gap-4">
                        <div className="w-full flex gap-8">
                            {/* Thumbnails — desktop vertical */}
                            {images.length > 1 && (
                                <div className="hidden md:flex flex-col gap-4 flex-shrink-0">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(idx)}
                                            className={`w-20 h-20 border-2 transition-all duration-300 overflow-hidden bg-[#f8fafc] flex items-center justify-center p-2 ${activeImage === idx ? "border-black" : "border-transparent opacity-40 hover:opacity-100"}`}
                                        >
                                            <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                                        </button>
                                    ))}
                                </div>
                            )}
                            {/* Main image — background restored, shape as uploaded */}
                            <div className="flex-1 flex items-center justify-center relative" style={{ background: "transparent", aspectRatio: "1 / 1" }}>
                                <div className="absolute top-8 right-8 z-10">
                                    <span className="bg-black text-white px-4 py-1 text-[12px] font-900 uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-body)" }}>
                                        {product.condition}
                                    </span>
                                </div>
                                <img
                                    key={activeImage}
                                    src={currentImage}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                    style={{ transition: "opacity 0.3s" }}
                                />
                            </div>
                        </div>

                        {/* Thumbnails — mobile horizontal */}
                        {images.length > 1 && (
                            <div className="flex md:hidden gap-3 justify-center">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`w-20 h-20 border-2 transition-all duration-300 overflow-hidden bg-[#f8fafc] flex items-center justify-center p-2 ${activeImage === idx ? "border-black" : "border-transparent opacity-40"}`}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Info */}
                    <div className="w-full lg:w-[45%] space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[12px]" style={{ fontFamily: "var(--font-body)" }}>Engine Model: {product.category}</span>
                                <div className="h-px w-8 bg-blue-100" />
                            </div>
                            <h1 className="text-5xl font-800 text-black uppercase leading-[1.1]" style={{ fontFamily: "var(--font-heading)" }}>
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-6" style={{ marginTop: "16px" }}>
                                <span className="text-4xl font-800 text-black" style={{ fontFamily: "var(--font-body)" }}>
                                    ₦{product.price.toLocaleString()}
                                </span>
                                <div className="h-6 w-px bg-gray-100" />
                                <div className="flex gap-1 text-[#FFDA5B]">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                                    <span className="text-gray-400 text-[13px] font-bold uppercase tracking-widest ml-2" style={{ fontFamily: "var(--font-body)" }}>(12 Reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6" style={{ marginTop: "32px" }}>
                            <p className="text-gray-500 text-lg leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-body)" }}>
                                {product.description}
                            </p>
                        </div>

                        {/* CTAs */}
                        <div className="space-y-8" style={{ marginTop: "48px" }}>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center border-2 border-black h-14 bg-white">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-14 h-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-12 text-center font-900 text-lg" style={{ fontFamily: "var(--font-body)" }}>{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-14 h-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => product.stock !== 0 && addToCart({ ...product, quantity })}
                                    disabled={product.stock === 0}
                                    className={`flex-1 h-14 font-bold uppercase tracking-[0.2em] text-[13px] transition-all flex items-center justify-center gap-3 ${
                                        product.stock === 0
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-black text-white hover:bg-blue-600 cursor-pointer'
                                    }`}
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    {product.stock === 0 ? 'Out of Stock' : <>Add To Cart <ChevronRight size={16} /></>}
                                </button>
                            </div>

                            <div className="flex items-center justify-between py-6" style={{ marginTop: "32px" }}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${product.stock === 0 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'}`} />
                                    <span className="text-[13px] font-900 uppercase tracking-widest text-black" style={{ fontFamily: "var(--font-body)" }}>{product.stock === 0 ? 'Out of Stock' : 'In Stock'}</span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <span className="text-[13px] font-900 uppercase tracking-widest text-black" style={{ fontFamily: "var(--font-body)" }}>Share Product</span>
                                    <div className="flex gap-5 items-center">
                                        <Facebook size={18} color="#1877F2" strokeWidth={2} className="cursor-pointer hover:scale-110 transition-transform" />
                                        <Instagram size={18} color="#E4405F" strokeWidth={2} className="cursor-pointer hover:scale-110 transition-transform" />
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer hover:scale-110 transition-transform">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Specs / Tabs */}
            <section style={{ marginTop: "80px", paddingLeft: "5vw", paddingRight: "5vw" }}>
                <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "60px" }}>
                    <div style={{ display: "flex", gap: "48px", marginBottom: "48px", paddingBottom: "16px" }}>
                        {['specification', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-[15px] font-900 uppercase tracking-[0.3em] transition-all ${activeTab === tab ? 'text-black' : 'text-gray-300'}`}
                                style={{ fontFamily: "var(--font-body)" }}
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

                            {activeTab === 'specification' && (
                                <div className="space-y-12">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                                        {/* Technical Identification */}
                                        <div className="lg:col-span-7 flex flex-col">
                                            <div className="mb-20">
                                                <h4 className="text-[13px] font-900 uppercase tracking-[0.3em] text-blue-600" style={{ fontFamily: "var(--font-body)" }}>Technical Identification</h4>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                                                {[
                                                    ['Part Number', product.description?.match(/Part Number:?([\d,\s]+)/)?.[1]?.trim() || product.sku || 'N/A'],
                                                    ['ReCon Equivalent', product.description?.match(/ReCon Equivalent:?([\w\s]+)/)?.[1]?.trim() || 'N/A'],
                                                    ['Engine Model', product.category || 'N/A'],
                                                    ['Condition', product.condition || 'N/A'],
                                                ].map(([label, val]) => (
                                                    <div key={label} className="bg-transparent p-8 lg:p-10 flex flex-col justify-between group cursor-default">
                                                        <span className="text-[10px] font-900 uppercase tracking-[0.2em] text-gray-400 group-hover:text-blue-600 transition-colors" style={{ fontFamily: "var(--font-body)" }}>{label}</span>
                                                        <span className="text-[16px] lg:text-[20px] font-900 text-black uppercase leading-tight mt-6" style={{ fontFamily: "var(--font-body)" }}>{val}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Shipment Characteristics */}
                                        <div className="lg:col-span-5 flex flex-col">
                                            <div className="bg-transparent p-8 lg:p-10 h-full flex flex-col">
                                                <div className="mb-20">
                                                    <h4 className="text-[13px] font-900 uppercase tracking-[0.3em] text-blue-600" style={{ fontFamily: "var(--font-body)" }}>Shipment Characteristics</h4>
                                                </div>
                                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 flex-1 content-end">
                                                    {[
                                                        ['Length', product.description?.match(/Length:?([\d.]+\s*cm)/i)?.[1]?.trim() || 'N/A'],
                                                        ['Weight', product.description?.match(/Weight:?([\d.]+\s*kg)/i)?.[1]?.trim() || 'N/A'],
                                                        ['Width', product.description?.match(/Width:?([\d.]+\s*cm)/i)?.[1]?.trim() || 'N/A'],
                                                        ['Height', product.description?.match(/Height:?([\d.]+\s*cm)/i)?.[1]?.trim() || 'N/A'],
                                                    ].map(([label, val]) => (
                                                        <div key={label} className="flex flex-col border-l-2 border-gray-200 pl-5">
                                                            <span className="text-[10px] font-900 uppercase tracking-[0.2em] text-gray-400 mb-2" style={{ fontFamily: "var(--font-body)" }}>{label}</span>
                                                            <span className="text-[24px] font-800 text-black leading-none" style={{ fontFamily: "var(--font-body)" }}>{val}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Two detail images */}
                                    <div className="border-b border-gray-200" style={{ marginTop: "140px", paddingBottom: "120px" }}>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
                                            <div className="w-full aspect-[4/3] flex items-center justify-center" style={{ background: "transparent" }}>
                                                <img src={images[0] || product.image} alt="Detailed View 1" className="w-full h-full object-contain hover:scale-105 transition-transform duration-700" />
                                            </div>
                                            <div className="w-full aspect-[4/3] flex items-center justify-center" style={{ background: "transparent" }}>
                                                <img src={images[1] || images[0] || product.image} alt="Detailed View 2" className="w-full h-full object-contain hover:scale-105 transition-transform duration-700" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div style={{ paddingBottom: "160px" }}>
                                    {[
                                        ...dynamicReviews,
                                        { name: "John D.", date: "April 12, 2026", rating: 5, comment: "Excellent replacement part. Fitted perfectly and resolved our machine issues instantly. Will definitely source from StanchTech again." },
                                        { name: "Captain H.", date: "March 28, 2026", rating: 5, comment: "Incredibly fast shipping. The parts look pristine and the build quality is obviously premium as described." },
                                        { name: "Mike T.", date: "March 15, 2026", rating: 4, comment: "Good quality, though it took a slight bit of adjustment to fit my specific engine correctly. Very satisfied overall." }
                                    ].map((review, i) => (
                                        <div key={i} className="space-y-6 border-b border-gray-50" style={{ paddingTop: i === 0 ? "0px" : "24px", paddingBottom: "24px" }}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-[#f8fafc] border border-gray-100 flex items-center justify-center font-bold text-black text-xs shadow-sm">{review.name.charAt(0)}</div>
                                                    <div>
                                                        <p className="text-[15px] font-900 uppercase" style={{ fontFamily: "var(--font-heading)", color: '#111' }}>{review.name}</p>
                                                        <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest mt-1" style={{ fontFamily: "var(--font-body)" }}>{review.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1 text-[#FFDA5B]">
                                                    {[...Array(5)].map((_, j) => <Star key={j} size={11} fill={j < review.rating ? "currentColor" : "none"} strokeWidth={j < review.rating ? 0 : 2} />)}
                                                </div>
                                            </div>
                                            <p className="text-[16px] text-gray-500 leading-relaxed font-medium max-w-2xl" style={{ fontFamily: "var(--font-body)" }}>{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Related Spares — only if Supabase has other products */}
            {relatedProducts.length > 0 && (
                <section style={{ marginTop: "100px", paddingLeft: "5vw", paddingRight: "5vw", paddingBottom: "160px" }}>
                    <div className="flex flex-col items-center justify-center px-4 text-center" style={{ marginBottom: "120px" }}>
                        <h2 className="text-[36px] font-800 text-black" style={{ fontFamily: "var(--font-heading)" }}>Related Spares</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((p, index) => (
                            <Link
                                href={`/shop/${p.id}`}
                                key={index}
                                className="group relative bg-white border border-gray-100 text-left transition-all duration-700 flex flex-col items-center"
                                style={{ paddingLeft: "2rem", paddingRight: "2rem", paddingTop: "3rem", paddingBottom: "2rem" }}
                            >
                                <div className="absolute top-6 left-6 px-3 py-1 bg-blue-50 text-blue-600 text-[16px] font-900 uppercase tracking-widest z-10" style={{ fontFamily: "var(--font-body)" }}>
                                    {p.condition}
                                </div>
                                <div className="w-full aspect-square mb-6 flex items-center justify-center p-8">
                                    <img
                                        src={(Array.isArray(p.images) && p.images[0]) || p.image || "/asset/Landing_page_image/marine_spares.png"}
                                        alt={p.name}
                                        className="w-[80%] h-[80%] object-contain transition-all duration-700 opacity-80 group-hover:opacity-100"
                                    />
                                </div>
                                <div style={{ width: "100%", marginTop: "auto", textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
                                    <p className="text-black font-800 text-lg leading-tight uppercase" style={{ fontFamily: "var(--font-body)" }}>{p.name}</p>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", paddingTop: "4px", marginTop: "4px" }}>
                                        <span className="font-[800] text-[18px]" style={{ fontFamily: "var(--font-body)", color: "#000000" }}>
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
                        <Link href="/shop" className="text-[15px] font-900 uppercase tracking-[0.3em] hover:text-blue-600 transition-all" style={{ fontFamily: "var(--font-body)" }}>
                            View Full catalog
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
}
