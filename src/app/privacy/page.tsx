'use client';

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="bg-white min-h-screen pt-20">
            {/* --- HERO SECTION --- */}
            <section className="relative h-[320px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[#0b1a2e]" />
                
                <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 mt-6">
                    <h1 className="text-5xl md:text-6xl font-900 text-white mb-6 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.04em" }}>Privacy Policy</h1>
                    <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.2em]">
                        <Link href="/" className="text-white hover:text-blue-400 transition-colors" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Home</Link>
                        <ChevronRight size={14} className="text-blue-400" />
                        <span className="text-white/60" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px" }}>Privacy</span>
                    </div>
                </div>
            </section>

            {/* --- CONTENT SECTION --- */}
            <section style={{ paddingTop: "60px", paddingBottom: "60px", paddingLeft: "8%", paddingRight: "8%", display: "flex", justifyContent: "center" }}>
                <div style={{ maxWidth: "900px", width: "100%", display: "flex", flexDirection: "column", gap: "40px", fontFamily: "var(--font-body)", lineHeight: "1.8", fontSize: "16px", color: "#4b5563" }}>
                    
                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>1. Information We Collect</h2>
                        <p>
                            We collect information that you manually provide to us when placing an order or registering for an account, such as your name, delivery address, phone number, and email address. We also automatically collect certain information about your device, including information about your web browser, IP address, and time zone when you browse our site.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>2. How We Use Your Information</h2>
                        <p>
                            We use the Order Information that we collect generally to fulfill any orders placed through the site (including arranging for shipping and providing you with invoices and/or order confirmations). Additionally, we use this information to communicate with you, screen our orders for potential risk or fraud, and, when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>3. Sharing Your Information</h2>
                        <p>
                            We share your Personal Information with third parties to help us use your Personal Information, as described above. We may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>4. Data Retention</h2>
                        <p>
                            When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>5. Security</h2>
                        <p>
                            To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
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
