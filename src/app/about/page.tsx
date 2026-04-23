"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  Plus, Minus, ChevronRight, Globe, Award, Zap, ArrowRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutPage() {
    const [activeFaq, setActiveFaq] = useState(0);

    const stats = [
        { label: "Founded", value: "2018" },
        { label: "Technical staff", value: "50+" },
        { label: "Global partners", value: "12+" }
    ];

    const values = [
        { icon: "/asset/about_image/Integrity_and_Honesty.png", title: "Integrity & Honesty", description: "We do business transparently and responsibly." },
        { icon: "/asset/about_image/Technical_Excellence.png", title: "Technical Excellence", description: "We apply deep expertise across all makes and models of equipment." },
        { icon: "/asset/about_image/Safety_and_Compliance.png", title: "Safety & Compliance", description: "We prevent failures before they disrupt operations." },
        { icon: "/asset/about_image/Proactive_Maintenance.png", title: "Proactive Maintenance", description: "We build lasting relationships, not just complete jobs." },
        { icon: "/asset/about_image/Customer_Partnership.png", title: "Customer Partnership", description: "We prioritize regulatory standards and operational safety at all times." },
        { icon: "/asset/about_image/Dependability.png", title: "Dependability", description: "Our clients can rely on us in routine operations and critical moments." }
    ];

    const services = [
        { 
            title: "Cummins Engines Maintenance & Repair services.", 
            img: "/asset/about_image/Cummins_Engines_Maintenance_and_Repair_services.png",
            desc: "Professional Cummins engine maintenance and repair services for reliable performance, reduced downtime, and extended engine life."
        },
        { 
            title: "Vessel Inspection, Maintenance & Repairs.", 
            img: "/asset/about_image/Vessel_Inspection_Maintenance_and_Repairs.png",
            desc: "Comprehensive sea vessel maintenance and through-life support for all specialized marine operations, ensuring reliability and safety at all times."
        },
        { 
            title: "Sales of Genuine Cummins Engine Spares parts", 
            img: "/asset/about_image/Sales_of_Genuine_Cummins_Engine_Spares_parts.png",
            desc: "Premium quality spares and expert technical support for marine and industrial operations this include sales and installation."
        },
        { 
            title: "Marine & Industrial Fitting / Plumbing", 
            img: "/asset/about_image/Marine_and_Industrial_Fitting_image.png",
            desc: "Specialized fitting and plumbing services tailored exactly to demanding marine and industrial environments."
        },
        { 
            title: "Hydraulic Systems & Hoses Rebuild", 
            img: "/asset/about_image/Hydraulic.png",
            desc: "Hydraulic hose rebuilding. Repairs and remanufacturing of hydraulic pumps, cooling pumps, and fuel injection pumps."
        },
        { 
            title: "Exhaust, Thermal & Heat Control Solutions", 
            img: "/asset/about_image/Exhaust_Thermal_and_Heat_Control_Solutions.png",
            desc: "Exhaust system services, thermal insulation and heat control solutions improving efficiency, safety, and equipment longevity."
        },
        { 
            title: "Structural Welding", 
            img: "/asset/about_image/Structural_Welding.png",
            desc: "Professional welding services for all metal types, ensuring structural strength and durability in demanding environments."
        }
    ];

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

    return (
        <div className="bg-white overflow-x-hidden" style={{ fontSmooth: "antialiased" }}>
            
            {/* HERO SECTION */}
            <section style={{ 
                height: "80vh", 
                minHeight: "700px",
                position: "relative",
                backgroundImage: 'url("/asset/about_image/built_on_excellence.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#fff",
                padding: "0 24px"
            }}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(11,26,46,0.55)" }} />
                <div style={{ position: "relative", zIndex: 2, maxWidth: "1100px" }}>
                    <h1 style={{ 
                        fontSize: "clamp(48px, 10vw, 130px)", 
                        fontWeight: 900, 
                        fontFamily: "'Neue Machina', sans-serif",
                        lineHeight: 0.9,
                        letterSpacing: "-0.04em",
                        marginBottom: "32px",
                        padding: "0 10px"
                    }}>
                        BUILT ON<br className="sm:block hidden"/> EXCELLENCE
                    </h1>
                    <p style={{ 
                        fontSize: "clamp(18px, 4vw, 24px)", 
                        fontWeight: 300, 
                        fontFamily: "'Darker Grotesque', sans-serif",
                        maxWidth: "900px",
                        margin: "0 auto",
                        lineHeight: 1.4,
                        opacity: 0.95,
                        padding: "0 10px"
                    }}>
                        STANCHTECH is a dependable marine and industrial maintenance solutions provider, 
                        built on a foundation of honesty, open-mindedness, 
                        and exceptional service delivery. We play a pivotal role in extending Cummins' 
                        expertise and technological advancements to the market we serve, 
                        along with a comprehensive array of related technologies.
                    </p>
                </div>
            </section>

            {/* MISSION STATEMENTS & STATS */}
            <section style={{ 
                background: "rgba(132, 185, 224, 0.34)", 
                padding: "64px 10vw 120px",
                minHeight: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div className="container mx-auto">
                    <p style={{ 
                        fontSize: "32px", 
                        fontWeight: 500, 
                        fontFamily: "'Darker Grotesque', sans-serif",
                        textAlign: "center",
                        maxWidth: "1200px",
                        margin: "0 auto 100px",
                        color: "#0b1a2e",
                        lineHeight: 1.15
                    }}>
                        Our mission to become a trusted global partner in<br/>
                        marine and industrial maintenance, recognized for reliability,<br/>
                        technical excellence, and proactive service solutions that extend equipment<br/>
                        life and minimize operational risk.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 max-w-[1250px] mx-auto items-start">
                        <div className="flex flex-col items-center group w-full">
                            <div className="relative w-full aspect-[381/265] max-w-[320px] sm:max-w-none flex flex-col justify-center items-center text-center px-4" style={{ 
                                backgroundImage: 'url("/asset/about_image/founded.png")',
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                                <span className="absolute top-[28%] text-[30px] sm:text-[clamp(20px,3.5vw,35px)] font-black text-[#0b1a2e]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>2018</span>
                                <p className="absolute bottom-[28%] text-[16px] sm:text-[clamp(12px,2.5vw,18px)] font-bold text-[#0b1a2e] w-[85%] leading-tight" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                    Founded in Port Harcourt, Nigeria
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center group w-full">
                            <div className="relative w-full aspect-[381/265] max-w-[320px] sm:max-w-none flex flex-col justify-center items-center text-center px-4" style={{ 
                                backgroundImage: 'url("/asset/about_image/team.png")',
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                                <span className="absolute top-[28%] text-[30px] sm:text-[clamp(20px,3.5vw,35px)] font-black text-[#0b1a2e]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>50+</span>
                                <p className="absolute bottom-[28%] text-[16px] sm:text-[clamp(12px,2.5vw,18px)] font-bold text-[#0b1a2e] w-[85%] leading-tight" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                    Specialized Technical Staff
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center group w-full">
                            <div className="relative w-full aspect-[381/265] max-w-[320px] sm:max-w-none flex flex-col justify-center items-center text-center px-4" style={{ 
                                backgroundImage: 'url("/asset/about_image/partners.png")',
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                                <span className="absolute top-[28%] text-[30px] sm:text-[clamp(20px,3.5vw,35px)] font-black text-[#0b1a2e]" style={{ fontFamily: "'Neue Machina', sans-serif" }}>15+</span>
                                <p className="absolute bottom-[28%] text-[16px] sm:text-[clamp(12px,2.5vw,18px)] font-bold text-[#0b1a2e] w-[85%] leading-tight" style={{ fontFamily: "'Darker Grotesque', sans-serif" }}>
                                    Global Technical Partners
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE VALUES */}
            <section style={{ 
                backgroundImage: 'url("/asset/about_image/our_values.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "140px 10vw",
                position: "relative"
            }}>
                <div className="container mx-auto relative z-10">
                    <h2 style={{ 
                        fontSize: "35px", 
                        fontWeight: 900, 
                        fontFamily: "'Neue Machina', sans-serif",
                        marginBottom: "80px",
                        color: "#fff"
                    }}>Our Values</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-24 gap-y-20">
                        {values.map((v, i) => (
                            <div key={i} className="group flex flex-col gap-6 transition-all duration-500 hover:translate-y--2">
                                <div style={{ height: "64px", width: "64px" }}>
                                    <img src={v.icon} alt={v.title} className="w-full h-full object-contain" />
                                </div>
                                <div className="space-y-4">
                                    <h4 style={{ fontSize: "18px", fontWeight: 900, fontFamily: "'Neue Machina', sans-serif", color: "#fff" }}>{v.title}</h4>
                                    <p style={{ fontSize: "16px", fontWeight: 500, color: "rgba(255,255,255,0.7)", lineHeight: 1.4, fontFamily: "'Darker Grotesque', sans-serif" }}>{v.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OUR SERVICES */}
            <section style={{ padding: "80px 10vw 140px", background: "#F8FAFC" }}>
                <div className="container mx-auto">
                    <div style={{ marginBottom: "64px" }}>
                        <h2 style={{ fontSize: "35px", fontWeight: 900, fontFamily: "'Neue Machina', sans-serif", color: "#0b1a2e" }}>Our Services</h2>
                        <p style={{ fontSize: "20px", color: "#64748b", fontWeight: 600, fontFamily: "'Darker Grotesque', sans-serif", marginTop: "10px", lineHeight: 1.5 }}>Delivering reliable marine and industrial solutions with quality, efficiency,<br/>and expert support</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {services.map((s, i) => (
                            <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 transition-all hover:shadow-2xl" style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ height: "260px", overflow: "hidden", flexShrink: 0 }}>
                                    <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                </div>
                                <div style={{ height: "260px", padding: "36px 40px", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
                                    <h4 style={{ fontSize: "20px", fontWeight: 900, color: "#0b1a2e", textTransform: "uppercase", marginBottom: "16px", fontFamily: "'Neue Machina', sans-serif", lineHeight: 1.2 }}>{s.title}</h4>
                                    <p style={{ fontSize: "17px", color: "#64748b", fontWeight: 500, fontFamily: "'Darker Grotesque', sans-serif", lineHeight: 1.5 }}>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OUR TEAM */}
            <section style={{ padding: "140px 10vw", background: "rgba(150, 195, 228, 0.25)" }}>
                <div className="container mx-auto">
                    <div style={{ marginBottom: "80px" }}>
                        <h2 style={{ fontSize: "35px", fontWeight: 900, fontFamily: "'Neue Machina', sans-serif", color: "#0b1a2e", lineHeight: 1, marginBottom: "24px" }}>Our Team</h2>
                        <p style={{ maxWidth: "800px", fontSize: "22px", color: "#64748b", fontWeight: 500, fontFamily: "'Darker Grotesque', sans-serif", lineHeight: 1.4 }}>
                            Our strength lies in our people. STANCH TECH is powered by highly trained engineers and technicians, selected for their technical competence and field experience.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            "/asset/about_image/team_4.png",
                            "/asset/about_image/team_picture_1.jpeg",
                            "/asset/about_image/team_picture2.jpeg",
                            "/asset/about_image/Team1.png",
                            "/asset/about_image/team_2.png",
                            "/asset/about_image/team_3.png"
                        ].map((img, i) => (
                            <div key={i} style={{ aspectRatio: "1/1", borderRadius: "24px", overflow: "hidden" }}>
                                <img src={img}
                                     alt="Team action" className="w-full h-full object-cover transition-all duration-1000" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PARTNERS */}
            <section style={{ padding: "120px 10vw", background: "#ffffff" }}>
                <div className="container mx-auto text-left">
                    <h2 style={{ fontSize: "35px", fontWeight: 900, fontFamily: "'Neue Machina', sans-serif", color: "#0b1a2e", marginBottom: "12px" }}>Our Partners</h2>
                    <p style={{ marginBottom: "80px", color: "#64748b", fontWeight: 700, fontSize: "20px", fontFamily: "'Darker Grotesque', sans-serif" }}>Our partners in delivering reliable marine and industrial maintenance solutions.</p>
                    
                    <div className="flex flex-wrap justify-start items-center gap-24">
                        <img src="/asset/Landing_page_image/partners.png" alt="Collaborative Partners" className="h-32 w-auto object-contain hover:opacity-80 transition-all duration-700" />
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section style={{ 
                background: "rgba(150, 195, 228, 0.25)",
                padding: "140px 10vw",
                minHeight: "835px"
            }}>
                <div className="container mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
                    <div className="lg:w-1/3">
                        <h2 style={{ fontSize: "clamp(42px, 8vw, 70px)", fontWeight: 900, fontFamily: "'Neue Machina', sans-serif", color: "#0b1a2e", lineHeight: 1.0 }}>
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <div className="w-full lg:w-1/2 border-t border-[#0b1a2e]/20" style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "0" }}>
                        {faqs.map((faq, index) => (
                            <div key={faq.id} className="border-b border-[#0b1a2e]/20" style={{ paddingTop: "24px", paddingBottom: "24px" }}>
                                <button 
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                    className="w-full text-left group flex items-center justify-between"
                                    style={{ paddingBottom: "24px" }}
                                >
                                    <div className="flex items-center gap-6 md:gap-8 pr-4">
                                        <span style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "24px", fontWeight: 900, color: "#0b1a2e", opacity: 0.5 }}>{faq.id}</span>
                                        <span style={{ fontFamily: "'Darker Grotesque', sans-serif", fontSize: "26px", fontWeight: 700, color: "#0b1a2e", lineHeight: 1.3, maxWidth: "440px", display: "inline-block" }} className="group-hover:text-blue-600 transition-colors">
                                            {faq.question}
                                        </span>
                                    </div>
                                    <div className={`flex-shrink-0 p-2 rounded-full border ${activeFaq === index ? 'bg-[#0b1a2e] border-[#0b1a2e] text-white' : 'border-[#0b1a2e]/30'} transition-all`}>
                                        {activeFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {activeFaq === index && (
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

        </div>
    );
}
