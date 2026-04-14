'use client';

import { use, useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import Link from "next/link";
import { ChevronRight, Star, Minus, Plus, Facebook, Instagram, MessageCircle, Linkedin, Twitter, Heart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { motion } from "framer-motion";

const MotionImage = motion(Image);

export default function ProductDetailPage({ params }) {
    const resolvedParams = use(params);
    const productId = parseInt(resolvedParams.id);
    const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
    
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const { addToCart } = useCart();

    const relatedProducts = PRODUCTS.filter(p => p.id !== productId).slice(0, 4);

    if (!product) return <div className="pt-40 text-center">Product not found</div>;

    const formattedPrice = product.price.toLocaleString(undefined, { minimumFractionDigits: 2 });

    return (
        <div className="bg-white min-h-screen pb-20" style={{ paddingTop: "144px" }}>
            <div style={{ paddingLeft: "109.27px", paddingRight: "109.27px" }}>
                {/* --- PRODUCT MAIN --- */}
                <section className="w-full flex flex-col lg:flex-row gap-20 items-start">
                    {/* LEFT: IMAGES */}
                    <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-8 items-center md:items-start pl-0 md:pl-4">
                        {/* THUMBNAILS (3 Synchronized Positions) */}
                        <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto justify-center md:justify-start mt-4 md:mt-0" style={{ marginLeft: "-18px" }}>
                            {[0, 1, 2].map((idx) => {
                                const transform = idx === 0 ? 'none' : idx === 1 ? 'scaleX(-1)' : 'scaleX(-1) rotate(5deg) translateX(10px)';
                                return (
                                    <button 
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`w-24 h-24 rounded-xl overflow-hidden bg-[#DDE9F1] transition-all duration-300 ${activeImage === idx ? "ring-2 ring-gray-900 opacity-100" : "opacity-60 hover:opacity-100"}`}
                                    >
                                        <Image 
                                            src={product.images[0]} 
                                            alt={`View ${idx + 1}`} 
                                            width={400}
                                            height={400}
                                            className="w-full h-full object-contain p-2 mix-blend-multiply" 
                                            style={{ transform }}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                        {/* MAIN IMAGE */}
                        <div className="flex-1 aspect-square bg-[#DDE9F1] rounded-2xl flex items-center justify-center overflow-hidden relative group p-12">
                            <MotionImage 
                                key={activeImage}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                src={product.images[0]} 
                                alt={product.name} 
                                width={1000}
                                height={1000}
                                className="w-full h-full object-contain transition-transform duration-700 drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:scale-110" 
                                style={{ 
                                    transform: activeImage === 0 ? 'none' : activeImage === 1 ? 'scaleX(-1)' : 'scaleX(-1) rotate(5deg) translateX(20px)'
                                }}
                            />
                        </div>
                    </div>

                    {/* RIGHT: INFO */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <h1 className="text-[42px] font-bold text-gray-900 leading-[0.9] tracking-tight" style={{ fontFamily: "'Neue Machina', sans-serif", marginBottom: "21px" }}>
                            {product.name}
                        </h1>
                        <p className="text-[24px] font-medium" style={{ fontFamily: "'Darker Grotesque', sans-serif", color: "#9F9F9F", marginBottom: "24px" }}>
                            {product.currency} {formattedPrice}
                        </p>
                        
                        <div className="flex items-center gap-4" style={{ marginBottom: "0px" }}>
                            <div className="flex gap-1" style={{ color: "#FFDA5B" }}>
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                            </div>
                            <div className="h-4 border-l-2 border-slate-200" style={{ marginLeft: "4px", marginRight: "4px" }} />
                            <span className="text-[14px] font-bold text-gray-400 uppercase tracking-[0.1em] leading-none" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                Customer Review
                            </span>
                        </div>

                        <p className="text-gray-500 text-[18px] mb-0 font-medium" style={{ fontFamily: "'Darker Grotesque', sans-serif", lineHeight: "auto", marginTop: "40px" }}>
                            {product.description}
                        </p>



                        <div className="flex flex-wrap items-center gap-8" style={{ marginTop: "96px", marginBottom: "80px" }}>
                            {/* QUANTITY BOX */}
                            <div className="flex items-center border-2 border-gray-100 rounded-xl px-4 py-2 justify-center gap-6 bg-gray-50/30 shrink-0" style={{ width: "140px", height: "64px" }}>
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-blue-600 transition-colors p-2">
                                    <Minus size={18} />
                                </button>
                                <span className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-blue-600 transition-colors p-2">
                                    <Plus size={18} />
                                </button>
                            </div>
                            {/* ADD TO CART BUTTON */}
                            <button 
                                onClick={() => addToCart({ ...product, quantity })}
                                className="bg-gray-900 text-white font-bold uppercase tracking-[0.1em] hover:bg-blue-600 transition-all rounded-xl shadow-lg shadow-gray-200"
                                style={{ 
                                    fontFamily: "'Darker Grotesque', sans-serif", 
                                    width: "215px", 
                                    height: "64px", 
                                    fontSize: "20px" 
                                }}
                            >
                                Add To Cart
                            </button>
                        </div>

                        <div className="w-full border-t border-gray-100" style={{ marginTop: "12px", marginBottom: "40px" }} />
                        <div className="flex flex-col gap-4 text-[17px] text-[#9F9F9F]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                            <div className="flex items-center">
                                <span style={{ width: "110px", fontWeight: 700, color: "#222" }}>Part Code</span>
                                <span className="mr-4">:</span>
                                <span>SS001</span>
                            </div>
                            <div className="flex items-center">
                                <span style={{ width: "110px", fontWeight: 700, color: "#222" }}>Category</span>
                                <span className="mr-4">:</span>
                                <span>Industrial Parts</span>
                            </div>
                            <div className="flex items-center">
                                <span style={{ width: "110px", fontWeight: 700, color: "#222" }}>Tags</span>
                                <span className="mr-4">:</span>
                                <span>Marine, Parts, Industrial, Shop</span>
                            </div>
                            <div className="flex items-center">
                                <span style={{ width: "110px", fontWeight: 700, color: "#222" }}>Share</span>
                                <span className="mr-4">:</span>
                                <div className="flex items-center gap-6">
                                    <Facebook size={22} fill="#1877F2" strokeWidth={0} className="cursor-pointer hover:scale-110 transition-transform" />
                                    <Instagram size={22} className="cursor-pointer hover:scale-110 transition-transform text-[#E1306C]" />
                                    <svg className="cursor-pointer hover:scale-110 transition-transform text-[#25D366]" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* --- MULTI-TAB SECTION --- */}
            <section className="border-t border-gray-200 bg-white" style={{ marginTop: "32px", paddingTop: "47px", paddingLeft: "109.27px", paddingRight: "109.27px", paddingBottom: "128px" }}>
                    <div className="flex justify-start items-center gap-16" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "24px", marginBottom: "40px" }}>
                        <span onClick={() => setActiveTab('description')} className={`cursor-pointer transition-colors ${activeTab === 'description' ? 'font-semibold text-black' : 'font-medium text-[#9F9F9F] hover:text-black'}`}>Description</span>
                        <span onClick={() => setActiveTab('additional')} className={`cursor-pointer transition-colors ${activeTab === 'additional' ? 'font-semibold text-black' : 'font-medium text-[#9F9F9F] hover:text-black'}`}>Additional Information</span>
                        <span onClick={() => setActiveTab('reviews')} className={`cursor-pointer transition-colors ${activeTab === 'reviews' ? 'font-semibold text-black' : 'font-medium text-[#9F9F9F] hover:text-black'}`}>Reviews [5]</span>
                    </div>

                    {activeTab === 'description' && (
                        <div className="space-y-6 max-w-5xl text-left">
                            <p className="text-[#9F9F9F] text-[16px] leading-relaxed" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                Embodying the raw power of industrial engineering, our premium marine spare parts deliver unmistakable performance and unwavering reliability during rigorous offshore operations. Built for ultimate durability under extreme conditions, this unit ensures your projects never hit a standstill.
                            </p>
                            <p className="text-[#9F9F9F] text-[16px] leading-relaxed" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                Setting the bar as an industry leader, this product boasts a clear advantage with properly machined components and extended longevity. Designed to withstand substantial wear and tear, whether serving on a commercial vessel or sustaining power generation systems, our premium replacement parts ensure your equipment runs flawlessly. Precision-engineered components allow you to maintain system integrity while industry-compliant fabrication enables easy and reliable installation.
                            </p>
                            <div className="w-full flex flex-col md:flex-row gap-8" style={{ marginTop: "48px" }}>
                                {[0, 1].map((idx) => (
                                    <div key={idx} className="flex-1 flex items-center justify-center rounded-2xl" style={{ backgroundColor: "#DDE9F1", padding: "48px", minHeight: "320px" }}>
                                        <Image
                                            src={product.images[0]}
                                            alt={`Detail ${idx + 1}`}
                                            width={800}
                                            height={800}
                                            className="w-full object-contain mix-blend-multiply drop-shadow-md"
                                            style={{ transform: idx === 1 ? 'scaleX(-1)' : 'none', maxHeight: "280px" }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'additional' && (
                        <div className="w-full max-w-5xl text-left text-[#9F9F9F] text-[16px]" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                            <div className="grid grid-cols-2 gap-y-6 gap-x-4 py-4">
                                <div className="font-bold text-gray-900 uppercase tracking-widest">Dimensions</div>
                                <div>Standard Marine-Grade Form Factor</div>
                                <div className="font-bold text-gray-900 uppercase tracking-widest">Material</div>
                                <div>Heavy-duty Stainless Steel & Cast Iron</div>
                                <div className="font-bold text-gray-900 uppercase tracking-widest">Compatibility</div>
                                <div>{product.name} Industrial Systems</div>
                                <div className="font-bold text-gray-900 uppercase tracking-widest">Warranty</div>
                                <div>2 Years Limited Industrial Warranty</div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="flex flex-col text-left" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                            {[
                                { name: "John D.", date: "April 12, 2026", rating: 5, comment: "Excellent replacement part. Fitted perfectly and resolved our machine issues instantly. Will definitely source from StanchTech again." },
                                { name: "Captain H.", date: "March 28, 2026", rating: 5, comment: "Incredibly fast shipping. The parts look pristine and the build quality is obviously premium as described." },
                                { name: "Mike T.", date: "March 15, 2026", rating: 4, comment: "Good quality, though it took a slight bit of adjustment to fit my specific engine correctly. Very satisfied overall." }
                            ].map((review, i) => (
                                <div key={i} className="flex flex-col gap-4 py-8 border-b border-gray-100">
                                    <div className="flex items-center gap-8">
                                        <span className="font-bold text-xl text-black tracking-wide">{review.name}</span>
                                        <span className="text-[16px] text-gray-400">{review.date}</span>
                                    </div>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, index) => (
                                            <Star key={index} size={16} fill={index < review.rating ? "currentColor" : "none"} strokeWidth={index < review.rating ? 0 : 2} />
                                        ))}
                                    </div>
                                    <p className="text-[#9F9F9F] text-[18px] leading-[2] mt-2">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
            </section>

            <div className="w-full border-t border-gray-200" style={{ marginBottom: "80px" }} />

            {/* --- RELATED PRODUCTS --- */}
            <section className="w-full text-center" style={{ paddingLeft: "5vw", paddingRight: "5vw", paddingTop: 0, paddingBottom: "112px" }}>
                <h2 className="text-4xl font-900 text-gray-900" style={{ fontFamily: "'Neue Machina', sans-serif", marginBottom: "80px" }}>Related Parts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ columnGap: "28px", rowGap: "48px" }}>
                    {relatedProducts.map((p, idx) => (
                        <Link href={`/shop/${p.id}`} key={idx} className="group flex flex-col items-center border border-gray-100/50 shadow-sm rounded-xl px-8 transition-all duration-500 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 bg-white w-full" style={{ maxWidth: "100%", paddingTop: "34px", paddingBottom: "42px" }}>
                            <div className="flex items-center justify-center transition-transform duration-700 group-hover:scale-105" style={{ width: "85%", aspectRatio: "1/1", margin: "0 auto 20px auto" }}>
                                <Image
                                    src={p.image}
                                    alt={p.name}
                                    width={600}
                                    height={600}
                                    className="w-full h-full object-contain drop-shadow-xl"
                                    style={{ padding: p.name.includes("Turbo") ? "24px" : "0px" }}
                                />
                            </div>
                            <div className="flex flex-col items-start text-left">
                                <h3 className="uppercase tracking-[0.1em] transition-colors group-hover:text-blue-600" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "14px", fontWeight: 500, color: "#94A3B8", marginBottom: "8px" }}>{p.name}</h3>
                                <p style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px", fontWeight: 900, color: "#000", marginBottom: "15px" }}>{p.currency} {p.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <Link
                    href="/shop"
                    className="underline text-gray-500 font-medium hover:text-gray-900 transition-colors"
                    style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "20px", display: "inline-block", marginTop: "112px" }}
                >
                    View More
                </Link>
            </section>

        </div>
    );
}
