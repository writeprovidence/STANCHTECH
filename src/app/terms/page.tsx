'use client';

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="bg-white min-h-screen pt-20">
            {/* --- HERO SECTION --- */}
            <section className="relative h-[320px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[#0b1a2e]" />
                
                <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 mt-6">
                    <h1 className="text-5xl md:text-6xl font-900 text-white mb-6 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.04em" }}>Terms of Service</h1>
                    <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.2em]">
                        <Link href="/" className="text-white hover:text-blue-400 transition-colors" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Home</Link>
                        <ChevronRight size={14} className="text-blue-400" />
                        <span className="text-white/60" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Terms</span>
                    </div>
                </div>
            </section>

            {/* --- CONTENT SECTION --- */}
            <section style={{ paddingTop: "60px", paddingBottom: "60px", paddingLeft: "8%", paddingRight: "8%", display: "flex", justifyContent: "center" }}>
                <div style={{ maxWidth: "900px", width: "100%", display: "flex", flexDirection: "column", gap: "40px", fontFamily: "var(--font-body)", lineHeight: "1.8", fontSize: "16px", color: "#4b5563" }}>
                    
                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>1. Introduction</h2>
                        <p>
                            Welcome to STANCH TECH. By accessing or using our website, products, or services (including our Marine & Industrial Engineering services and spare parts supply), you agree to comply with and be bound by the following Terms of Service. Please read them carefully.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>2. Products and Services</h2>
                        <p>
                            STANCH TECH specializes in marine systems, industrial support, and high-performance equipment parts. All specifications, descriptions, and prices of products are subject to change at any time without notice. We reserve the right to modify or discontinue any product or service without notice at any time.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>3. Orders and Payments</h2>
                        <p>
                            We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per business, or per order. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the email and/or billing address/phone number provided at the time the order was made. Payment must be cleared prior to dispatch of any spare parts or commencement of engineering services, unless otherwise agreed upon in a formal contract.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>4. Shipping and Delivery</h2>
                        <p>
                            Delivery times for spare parts and equipment are estimates only and STANCH TECH shall not be liable for any delays. The risk of loss and title for items purchased from STANCH TECH pass to you upon delivery of the items to the carrier.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>5. Limitation of Liability</h2>
                        <p>
                            In no case shall STANCH TECH, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, arising from your use of any of the service or any products procured using the service.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>6. Governing Law</h2>
                        <p>
                            These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-gray-200 mt-12">
                        <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
