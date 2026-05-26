'use client';

import { useState } from "react";
import { Plus, Minus, MapPin, Globe, ArrowRight, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        id: "01",
        question: "How can I get in touch with the team?",
        answer: "You can reach us via email at stanchtechltd@gmail.com, or call our customer support lines for immediate assistance. We are available on WhatsApp as well."
    },
    {
        id: "02",
        question: "Is there a direct phone number or email to reach the team?",
        answer: "Yes, you can call us directly at +234 (0) 705 962 3727 or email us at stanchtechltd@gmail.com. Our various regional contact numbers are also listed in the footer."
    },
    {
        id: "03",
        question: "Can I schedule a (virtual) meeting with a member of the team?",
        answer: "Absolutely. Please send us an email with your project details, and our technical leads will schedule a virtual consultation over Zoom, Microsoft Teams, or Google Meet."
    },
    {
        id: "04",
        question: "How long does it usually take to receive a response from the team?",
        answer: "Our standard response time is within 2-4 business hours for priority maintenance requests and within 24 hours for general inquiries."
    }
];

export default function ContactPage() {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="bg-white min-h-screen pt-[160px]">
            {/* --- HERO SECTION --- */}
            <section className="relative overflow-hidden" style={{ backgroundColor: "rgba(150, 195, 228, 0.5)", padding: "180px 10vw" }}>
                <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="md:w-1/2 z-10 text-center md:text-left">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4"
                            style={{ fontFamily: "var(--font-body)", fontSize: "clamp(30px, 8vw, 64px)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em" }}
                        >
                            <span style={{ display: "block", color: "#0b1a2e", marginBottom: "2px", whiteSpace: "nowrap" }}>
                                <span style={{ color: "#105C7A", fontWeight: 900 }}>Contact</span> Our experts to
                            </span>
                            <span style={{ display: "block", color: "#0b1a2e", whiteSpace: "nowrap" }}>
                                start working together
                            </span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{ fontFamily: "var(--font-body)", fontSize: "20px", color: "#334155", fontWeight: 500, lineHeight: 1.4, maxWidth: "480px", marginTop: "40px", marginBottom: "32px" }}
                        >
                            Collaborate with us to provide dependable marine and industrial maintenance services, ensuring optimal performance, reduced downtime, and expert support for your operations.
                        </motion.p>
                    </div>

                    <div className="md:w-5/12 relative">
                        <motion.img 
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                            src="/asset/Contact_image/contact_image.png" 
                            alt="Contact Us" 
                            className="w-full h-auto object-contain drop-shadow-2xl md:translate-x-12"
                        />
                        {/* Decorative floating chat bubbles (if desired to match the vibe) */}
                        <div className="absolute -top-10 -right-4 w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg animate-bounce duration-[3000ms] opacity-60">
                            <span className="font-bold">@</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- OFFICE & MAP SECTION --- */}
            <section id="address" className="bg-white relative overflow-hidden" style={{ padding: "160px 10vw", minHeight: "auto" }}>
                <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                    
                    {/* Office Info Side */}
                    <div className="lg:w-1/2">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-start pt-8 lg:pt-20"
                        >
                            <div style={{ position: "relative", paddingLeft: 32, borderLeft: "4px solid #2563eb", marginBottom: 60 }}>
                                <h2 style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, lineHeight: 1.0, color: "#111827", letterSpacing: "-0.03em", margin: 0 }}>
                                    VISIT <span style={{ display: "block", fontStyle: "italic", color: "#8ea2b6" }}>OUR OFFICE.</span>
                                </h2>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
                                {/* Address Block */}
                                <div style={{ display: "flex", gap: 20 }}>
                                    <div style={{ width: 44, height: 44, background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <MapPin size={18} color="#2563eb" />
                                    </div>
                                    <div>
                                        <p style={{ color: "#9ca3af", fontSize: 10, fontWeight: 800, textTransform: "uppercase", marginBottom: 6, letterSpacing: "0.1em" }}>Address</p>
                                        <p style={{ fontFamily: "var(--font-body)", fontSize: "17px", color: "#334155", fontWeight: 500, lineHeight: 1.5 }}>
                                            Km16 PHC - ABA Express Way,<br />
                                            Adjacent Dubi, Port Harcourt,<br />
                                            Rivers State, Nigeria
                                        </p>
                                    </div>
                                </div>

                                {/* Email Block */}
                                <div style={{ display: "flex", gap: 20 }}>
                                    <div style={{ width: 44, height: 44, background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                         <Mail size={18} color="#2563eb" />
                                    </div>
                                    <div>
                                        <p style={{ color: "#9ca3af", fontSize: 10, fontWeight: 800, textTransform: "uppercase", marginBottom: 6, letterSpacing: "0.1em" }}>Email</p>
                                        <p style={{ fontSize: 17, fontWeight: 700, color: "#0b1a2e" }}>stanchtechltd@gmail.com</p>
                                    </div>
                                </div>

                                {/* Phone Block */}
                                <div style={{ display: "flex", gap: 20 }}>
                                    <div style={{ width: 44, height: 44, background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                         <Phone size={18} color="#2563eb" />
                                    </div>
                                    <div>
                                        <p style={{ color: "#9ca3af", fontSize: 10, fontWeight: 800, textTransform: "uppercase", marginBottom: 6, letterSpacing: "0.1em" }}>Contact Support</p>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                            <p style={{ fontSize: 16, fontWeight: 700, color: "#0b1a2e" }}>+234 (0) 705 962 3727</p>
                                            <p style={{ fontSize: 16, fontWeight: 700, color: "#0b1a2e" }}>+234 (0) 803 734 0959</p>
                                            <p style={{ fontSize: 16, fontWeight: 700, color: "#0b1a2e" }}>+234 (0) 808 529 0298</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Spacer for right content to maintain flex layout internally */}
                    <div className="lg:w-1/2 hidden lg:block" />
                </div>

                {/* Mobile Spacer to brutally force distance between text and map */}
                <div className="block lg:hidden" style={{ height: "80px", width: "100%" }} />

                {/* Map Side (Right Half) */}
                <div className="w-full lg:w-[48vw] lg:absolute lg:right-[3%] lg:top-1/2 lg:-translate-y-1/2 flex justify-end z-20">
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full bg-white p-3 relative" 
                        style={{ aspectRatio: "4/3", maxWidth: "900px", minHeight: "500px", borderRadius: 0 }} 
                    >
                        <div className="w-full h-full overflow-hidden bg-gray-100 transition-all duration-700 pointer-events-auto border border-gray-100/50 block" style={{ borderRadius: 0 }}>
                            <iframe 
                                src="https://maps.google.com/maps?q=Km16%20PHC%20-%20ABA%20Express%20Way,Port%20Harcourt,Nigeria&t=&z=15&ie=UTF8&iwloc=a&output=embed&gestureHandling=greedy" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen={true} 
                                loading="lazy" 
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section style={{ backgroundColor: "rgba(150, 195, 228, 0.25)", padding: "160px 10vw 60px" }}>
                <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row gap-16 lg:gap-24">
                    <div className="lg:w-1/3">
                        <motion.h2 
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(42px, 8vw, 70px)", fontWeight: 900, lineHeight: 1.0, color: "#0b1a2e", textAlign: "left" }}
                        >
                            Frequently Asked Questions
                        </motion.h2>
                    </div>

                    <div className="w-full lg:w-1/2 border-t border-[#0b1a2e]/20" style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "0" }}>
                        {faqs.map((faq, index) => (
                            <div key={faq.id} className="border-b border-[#0b1a2e]/20" style={{ paddingTop: "24px", paddingBottom: "24px" }}>
                                <button 
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full text-left group flex items-center justify-between"
                                    style={{ paddingBottom: "24px" }}
                                >
                                    <div className="flex items-center gap-6 md:gap-8 pr-4">
                                        <span style={{ fontFamily: "var(--font-heading)", fontSize: "24px", fontWeight: 900, color: "#0b1a2e", opacity: 0.5 }}>{faq.id}</span>
                                        <span style={{ fontFamily: "var(--font-body)", fontSize: "26px", fontWeight: 700, color: "#0b1a2e", lineHeight: 1.3, maxWidth: "440px", display: "inline-block" }} className="group-hover:text-blue-600 transition-colors">
                                            {faq.question}
                                        </span>
                                    </div>
                                    <div className={`flex-shrink-0 p-2 rounded-full border ${openFaq === index ? 'bg-[#0b1a2e] border-[#0b1a2e] text-white' : 'border-[#0b1a2e]/30'} transition-all`}>
                                        {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p style={{ fontFamily: "var(--font-body)", fontSize: "19px", fontWeight: 500, color: "#334155", lineHeight: 1.6, paddingBottom: "40px", paddingLeft: "56px", paddingRight: "16px" }}>
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
