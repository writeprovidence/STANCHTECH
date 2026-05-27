'use client';

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ChevronRight, Loader2, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PHONE_NUMBER = "+2348037340959";
const WHATSAPP_NUMBER = "2348037340959";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const productId = parseInt(resolvedParams.id);

    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', productId)
                    .single();
                if (!error && data) setProduct(data);
            } catch {
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('id, name, image, images, condition')
                    .neq('id', productId)
                    .neq('is_hidden', true)
                    .limit(4);
                if (!error && data) setRelatedProducts(data);
            } catch {}
        };
        fetchRelated();
    }, [productId]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={48} /></div>;
    if (!product) return <div className="pt-40 text-center">Product not found</div>;

    const images: string[] = Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : [product.image].filter(Boolean);
    const currentImage = images[activeImage] || product.image;

    const whatsappMessage = encodeURIComponent(
        `Hello STANCH TECH, I'm interested in the *${product.name}* from your inventory. Could you please provide pricing and availability?`
    );

    return (
        <div className="bg-white min-h-screen pb-20" style={{ paddingTop: "72px" }}>

            {/* Breadcrumb */}
            <div className="border-b border-gray-100 bg-white">
                <div style={{ paddingLeft: "5vw", paddingRight: "5vw" }} className="h-16 flex items-center gap-4">
                    <Link href="/shop" className="text-gray-400 hover:text-black transition-colors font-bold uppercase tracking-widest text-[12px]" style={{ fontFamily: "var(--font-body)" }}>Inventory</Link>
                    <ChevronRight size={12} className="text-gray-300" />
                    <span className="text-black font-bold uppercase tracking-widest text-[12px]" style={{ fontFamily: "var(--font-body)" }}>{product.name}</span>
                </div>
            </div>

            <div style={{ paddingLeft: "5vw", paddingRight: "5vw", paddingTop: "40px", paddingBottom: "80px" }}>
                <section className="w-full flex flex-col lg:flex-row gap-24 items-start">

                    {/* LEFT: Images */}
                    <div className="w-full lg:w-[55%] flex flex-col gap-4">
                        <div className="w-full flex gap-8">
                            {images.length > 1 && (
                                <div className="hidden md:flex flex-col gap-4 flex-shrink-0">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(idx)}
                                            className={`w-20 h-20 border transition-all duration-300 overflow-hidden bg-white flex items-center justify-center p-2 ${activeImage === idx ? "border-black shadow-lg" : "border-gray-100 opacity-40 hover:opacity-100"}`}
                                        >
                                            <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div className="flex-1 flex items-center justify-center relative border border-gray-50" style={{ background: "white", aspectRatio: "1 / 1" }}>
                                <div className="absolute top-6 right-6 z-10">
                                    <span className="bg-black text-white px-4 py-1 text-[11px] font-900 uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-body)" }}>
                                        {product.condition}
                                    </span>
                                </div>
                                <img
                                    key={activeImage}
                                    src={currentImage}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-8"
                                    style={{ transition: "opacity 0.3s" }}
                                />
                            </div>
                        </div>

                        {/* Mobile thumbnails */}
                        {images.length > 1 && (
                            <div className="flex md:hidden gap-3 justify-center mt-4">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`w-20 h-20 border transition-all duration-300 overflow-hidden bg-white flex items-center justify-center p-2 ${activeImage === idx ? "border-black shadow-lg" : "border-gray-100 opacity-40"}`}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Info */}
                    <div className="w-full lg:w-[45%] space-y-8">
                        <div>
                            <span className="text-[12px] font-900 uppercase tracking-[0.25em] text-blue-600 block mb-4" style={{ fontFamily: "var(--font-body)" }}>
                                Inventory Details
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-800 text-black uppercase leading-[1.1]" style={{ fontFamily: "var(--font-heading)" }}>
                                {product.name}
                            </h1>
                        </div>

                        {product.description && (
                            <p className="text-gray-500 text-lg leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                                {product.description}
                            </p>
                        )}

                        {/* Contact CTAs */}
                        <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "16px" }}>
                            <p className="text-[12px] font-900 uppercase tracking-[0.2em] text-gray-400 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                                Interested? Get in touch to enquire or order
                            </p>

                            {/* WhatsApp CTA */}
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "12px",
                                    height: "58px",
                                    background: "#25D366",
                                    color: "#fff",
                                    fontWeight: 800,
                                    fontSize: "14px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.12em",
                                    textDecoration: "none",
                                    fontFamily: "var(--font-body)",
                                    transition: "background 0.3s ease, transform 0.2s ease",
                                }}
                                onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = "#1ebe5d"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                                onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = "#25D366"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                                </svg>
                                Enquire on WhatsApp
                            </a>

                            {/* Call CTA */}
                            <a
                                href={`tel:${PHONE_NUMBER}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "12px",
                                    height: "58px",
                                    background: "transparent",
                                    color: "#0b1a2e",
                                    fontWeight: 800,
                                    fontSize: "14px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.12em",
                                    textDecoration: "none",
                                    fontFamily: "var(--font-body)",
                                    border: "2px solid #0b1a2e",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = "#0b1a2e"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                                onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#0b1a2e"; }}
                            >
                                <Phone size={18} />
                                Call: {PHONE_NUMBER}
                            </a>
                        </div>

                        {/* Availability dot */}
                        <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid #f3f4f6" }}>
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <span className="text-[12px] font-900 uppercase tracking-widest text-black" style={{ fontFamily: "var(--font-body)" }}>Available — Contact for Stock Confirmation</span>
                        </div>
                    </div>
                </section>
            </div>

            {/* Specifications */}
            <section style={{ paddingLeft: "5vw", paddingRight: "5vw", paddingBottom: "120px" }}>
                <div style={{ paddingTop: "80px" }}>
                    <div className="flex items-center gap-6" style={{ marginBottom: "64px" }}>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                            <span className="w-8 h-[2px] bg-blue-600"></span>
                        </div>
                        <h2 className="text-[13px] font-900 uppercase tracking-[0.4em] text-black" style={{ fontFamily: "var(--font-body)" }}>
                            Technical Specifications
                        </h2>
                        <div className="flex-1 h-[1px] bg-gray-100"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-20 mb-32">
                        {[
                            { label: 'Part Number', val: product.description?.match(/Part Number:?([\d,\s]+)/)?.[1]?.trim() || product.sku || 'N/A', highlight: true },
                            { label: 'Weight', val: product.weight || product.description?.match(/Weight:?([\d.]+\s*kg)/i)?.[1]?.trim() || 'N/A', highlight: true },
                            { label: 'Condition', val: product.condition || 'N/A' },
                            { label: 'ReCon Equivalent', val: product.description?.match(/ReCon Equivalent:([\w\s]+)/)?.[1]?.trim() || 'N/A' },
                        ].map((spec, i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <span className="text-[11px] font-900 uppercase tracking-[0.2em] text-gray-400" style={{ fontFamily: "var(--font-body)" }}>
                                    {spec.label}
                                </span>
                                <span className={`${spec.highlight ? 'text-[24px] text-blue-600' : 'text-[16px] text-black'} font-900 uppercase leading-none`} style={{ fontFamily: "var(--font-body)" }}>
                                    {spec.val}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-20" style={{ marginTop: "80px" }}>
                        {[
                            { label: 'Stock Status', val: 'Immediate Availability' },
                            { label: 'Technical Support', val: 'Available' },
                        ].map((spec, i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <span className="text-[11px] font-900 uppercase tracking-[0.2em] text-gray-400" style={{ fontFamily: "var(--font-body)" }}>
                                    {spec.label}
                                </span>
                                <span className="text-[14px] font-700 text-gray-600 uppercase leading-none" style={{ fontFamily: "var(--font-body)" }}>
                                    {spec.val}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                    {/* Detail images */}
                    <div style={{ marginTop: "80px", paddingBottom: "80px" }}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
                            <div className="w-full aspect-[4/3] flex items-center justify-center bg-white border border-gray-50">
                                <img src={images[0] || product.image} alt="Detailed View 1" className="w-full h-full object-contain hover:scale-105 transition-transform duration-700 p-8" />
                            </div>
                            <div className="w-full aspect-[4/3] flex items-center justify-center bg-white border border-gray-50">
                                <img src={images[1] || images[0] || product.image} alt="Detailed View 2" className="w-full h-full object-contain hover:scale-105 transition-transform duration-700 p-8" />
                            </div>
                        </div>
                    </div>
            </section>

            {/* Related Spares */}
            {relatedProducts.length > 0 && (
                <section style={{ paddingLeft: "5vw", paddingRight: "5vw", paddingBottom: "120px" }}>
                    <div style={{ textAlign: "center", marginBottom: "80px" }}>
                        <h2 className="text-[36px] font-800 text-black" style={{ fontFamily: "var(--font-heading)" }}>More Spares</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((p, index) => (
                            <Link
                                href={`/shop/${p.id}`}
                                key={index}
                                className="group relative bg-white border border-gray-100 text-left transition-all duration-500 flex flex-col items-center hover:shadow-lg hover:-translate-y-1"
                                style={{ paddingLeft: "2rem", paddingRight: "2rem", paddingTop: "3rem", paddingBottom: "2rem" }}
                            >
                                <div className="absolute top-4 left-4 text-blue-600 text-[11px] font-900 uppercase tracking-widest z-10" style={{ fontFamily: "var(--font-body)" }}>
                                    {p.condition}
                                </div>
                                <div className="w-full aspect-square mb-6 flex items-center justify-center p-6 bg-white border-b border-gray-50">
                                    <img
                                        src={(Array.isArray(p.images) && p.images[0]) || p.image || "/asset/Landing_page_image/marine_spares.png"}
                                        alt={p.name}
                                        className="w-[80%] h-[80%] object-contain transition-all duration-700 opacity-80 group-hover:opacity-100"
                                    />
                                </div>
                                <div style={{ width: "100%", textAlign: "left", display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <p className="text-black font-800 text-[15px] leading-tight uppercase" style={{ fontFamily: "var(--font-body)" }}>{p.name}</p>
                                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mt-1" style={{ fontFamily: "var(--font-body)" }}>View Details →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="flex justify-center" style={{ marginTop: "80px" }}>
                        <Link href="/shop" className="text-[15px] font-900 uppercase tracking-[0.3em] hover:text-blue-600 transition-all" style={{ fontFamily: "var(--font-body)" }}>
                            View Full Inventory
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
}
