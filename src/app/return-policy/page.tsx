'use client';

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ReturnPolicyPage() {
    return (
        <div className="bg-white min-h-screen pt-20">
            {/* --- HERO SECTION --- */}
            <section className="relative h-[320px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[#0b1a2e]" />
                
                <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 mt-6">
                    <h1 className="text-5xl md:text-6xl font-900 text-white mb-6 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.04em" }}>Return & Refund Policy</h1>
                    <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.2em]">
                        <Link href="/" className="text-white hover:text-blue-400 transition-colors" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Home</Link>
                        <ChevronRight size={14} className="text-blue-400" />
                        <span className="text-white/60" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Returns</span>
                    </div>
                </div>
            </section>

            {/* --- CONTENT SECTION --- */}
            <section style={{ paddingTop: "60px", paddingBottom: "60px", paddingLeft: "8%", paddingRight: "8%", display: "flex", justifyContent: "center" }}>
                <div style={{ maxWidth: "900px", width: "100%", display: "flex", flexDirection: "column", gap: "40px", fontFamily: "var(--font-body)", lineHeight: "1.8", fontSize: "16px", color: "#4b5563" }}>
                    
                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>1. Returns Overview</h2>
                        <p>
                            We have a 14-day return policy for standard marine and industrial spare parts, which means you have 14 days after receiving your item to request a return. Specialized or custom-ordered heavy machinery components may be exempt from standard returns and are handled on a case-by-case basis.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>2. Eligibility for Returns</h2>
                        <p>
                            To be eligible for a return, your item must be in the same condition that you received it, unworn, unused, or uninstalled, with tags or original labels, and in its original packaging. You’ll also need the receipt or proof of purchase.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>3. Defective or Damaged Goods</h2>
                        <p>
                            Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right immediately.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>4. Refund Process</h2>
                        <p>
                            We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>5. Engineering Services</h2>
                        <p>
                            Refunds or cancellations for dispatched engineering technicians and on-site marine repairs are not eligible for standard returns once work has commenced. Concerns regarding service quality must be logged with our operations manager within 7 days of service completion.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-gray-200 mt-12">
                        <p className="text-sm text-gray-500">Contact our support team at info@stanchtech.com for further inquiries and help with any returns.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
