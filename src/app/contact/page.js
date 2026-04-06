'use client';

import { useState } from "react";
import { Plus, Minus, MapPin, Globe, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        id: "01",
        question: "How can I get in touch with the team?",
        answer: "You can reach us via email at stanchtechltd@gmail.com, or call our customer support lines for immediate assistance. We are available on WhatsApp and WeChat as well."
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
            <section className="relative overflow-hidden" style={{ backgroundColor: "rgba(150, 195, 228, 0.5)", paddingTop: "180px", paddingBottom: "180px" }}>
                <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 px-8 md:px-[100px]">
                    <div className="md:w-1/2 z-10 text-center md:text-left">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4"
                            style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "clamp(42px, 10vw, 64px)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em" }}
                        >
                            <span style={{ display: "inline-block", color: "#0b1a2e", marginBottom: "2px" }}>
                                <span style={{ color: "#105C7A", fontWeight: 900 }}>Contact</span> Our experts to
                            </span>
                            <span style={{ display: "inline-block", color: "#0b1a2e" }}>
                                start working together
                            </span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "20px", color: "#334155", fontWeight: 500, lineHeight: 1.4, maxWidth: "480px", marginTop: "40px", marginBottom: "32px" }}
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
                            className="w-full h-auto object-contain drop-shadow-2xl"
                        />
                        {/* Decorative floating chat bubbles (if desired to match the vibe) */}
                        <div className="absolute -top-10 -right-4 w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg animate-bounce duration-[3000ms] opacity-60">
                            <span className="font-bold">@</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- OFFICE & MAP SECTION --- */}
            <section className="bg-[#fafafc] relative overflow-hidden" style={{ paddingTop: "140px", paddingBottom: "140px", minHeight: "800px" }}>
                <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 px-8 md:px-[100px]">
                    
                    {/* Office Info Side */}
                    <div className="lg:w-1/2">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-start pt-8 lg:pt-20"
                        >
                            <h4 style={{ color: "#2563eb", letterSpacing: "0.2em", fontSize: "14px", fontWeight: 800, textTransform: "uppercase", marginBottom: "32px", fontFamily: "'Darker Grotesque', sans-serif" }}>
                                Our Presence
                            </h4>
                            <div style={{ marginBottom: "48px" }}>
                                <h2 style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, lineHeight: 0.9, color: "#111827", letterSpacing: "-0.03em", margin: 0 }}>
                                    VISIT
                                </h2>
                                <h2 style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, fontStyle: "italic", lineHeight: 0.9, color: "#8ea2b6", letterSpacing: "-0.03em", margin: 0 }}>
                                    OUR HQ.
                                </h2>
                            </div>
                            <p style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "22px", color: "#64748b", fontWeight: 500, lineHeight: 1.3, marginBottom: "48px", maxWidth: "420px" }}>
                                Km16 PHC - ABA Express Way,<br />
                                Adjacent Dubi, Port harcourt,<br />
                                Rivers state, Nigeria
                            </p>
                            
                            <a href="https://maps.google.com" target="_blank" className="flex items-center gap-3 text-[#2563eb] hover:text-blue-800 transition-colors uppercase" style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "16px", fontWeight: 900, letterSpacing: "0.1em" }}>
                                Open in Google Maps <ArrowRight className="w-5 h-5" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Spacer for right content to maintain flex layout internally */}
                    <div className="lg:w-1/2 hidden lg:block" />
                </div>

                {/* Map Side (Right Half) */}
                <div className="w-full lg:w-[50vw] lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 mt-16 lg:mt-0 flex justify-end z-0">
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full bg-white p-3 md:p-5 rounded-l-[40px] shadow-[-20px_20px_50px_rgba(0,0,0,0.08)] relative" 
                        style={{ aspectRatio: "4/3", maxWidth: "900px", minHeight: "500px" }}
                    >
                        <div className="w-full h-full rounded-[32px] rounded-r-none overflow-hidden bg-gray-100 grayscale-[0.5] hover:grayscale-0 transition-all duration-700 pointer-events-auto border border-gray-100/50 block">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127164.2155827376!2d6.93665780516641!3d4.793740266009659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069ce5a18351053%3A0xc023c7270966a3a7!2sPort%20Harcourt!5e0!3m2!1sen!2sng!4v1711660000000!5m2!1sen!2sng" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section style={{ backgroundColor: "rgba(150, 195, 228, 0.25)", padding: "128px 0" }}>
                <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row gap-16 lg:gap-24 px-8 md:px-[100px]">
                    <div className="lg:w-1/3">
                        <motion.h2 
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#0b1a2e", textAlign: "left" }}
                        >
                            Frequently<br />
                            asked<br />
                            questions
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
                                        <span style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "24px", fontWeight: 900, color: "#0b1a2e", opacity: 0.5 }}>{faq.id}</span>
                                        <span style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "26px", fontWeight: 700, color: "#0b1a2e", lineHeight: 1.3, maxWidth: "440px", display: "inline-block" }} className="group-hover:text-blue-600 transition-colors">
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

            {/* --- SHIP ILLUSTRATION SECTION --- */}
            <section className="bg-white mt-12 mb-[-60px] md:mb-[-120px] relative z-10 w-full overflow-hidden">
                <div className="w-full">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full"
                    >
                        <img 
                            src="/asset/Contact_image/ship.jpg" 
                            alt="Stanch Tech Marine Excellence" 
                            className="w-full h-auto object-cover block"
                            style={{ marginTop: "-8%" }}
                        />
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
