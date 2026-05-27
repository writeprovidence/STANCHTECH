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
        { label: "Partners", value: "12+" }
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
            answer: "You can reach us via email at stanchtechltd@gmail.com, or call our customer support lines for immediate assistance. We are available on WhatsApp as well."
        },
        {
            id: "02",
            question: "Is there a direct phone number or email to reach the team?",
            answer: "Yes, you can call us directly at +234 (0) 803 734 0959 or email us at stanchtechltd@gmail.com. Our various regional contact numbers are also listed in the footer."
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
        <div id="top" className="bg-white overflow-x-hidden" style={{ fontSmooth: "antialiased" }}>
            
            {/* HERO SECTION */}
            <section style={{ 
                minHeight: "100vh",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
            }}>
                {/* Full background image */}
                <div style={{ position: "absolute", inset: 0 }}>
                    <img 
                        src="/asset/about_image/built_on_excellence.png" 
                        alt="" 
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} 
                    />
                    {/* Dark gradient overlay — left heavy for text legibility */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(11,26,46,0.96) 0%, rgba(11,26,46,0.82) 45%, rgba(11,26,46,0.3) 100%)" }} />
                </div>

                {/* Content */}
                <div style={{ position: "relative", zIndex: 2, padding: "120px 15vw 120px 18vw", maxWidth: "1400px", width: "100%" }}>
                    <span style={{ 
                        display: "inline-block",
                        color: "var(--accent, #3b82f6)", 
                        fontWeight: 800, 
                        textTransform: "uppercase", 
                        letterSpacing: "0.25em", 
                        fontSize: "14px", 
                        fontFamily: "var(--font-body)",
                        marginBottom: "32px"
                    }}>
                        About StanchTech
                    </span>

                    <h1 style={{ 
                        fontSize: "clamp(56px, 10vw, 140px)", 
                        fontWeight: 900, 
                        fontFamily: "var(--font-heading)",
                        lineHeight: 0.88,
                        letterSpacing: "-0.04em",
                        color: "#ffffff",
                        marginBottom: "48px",
                        maxWidth: "900px"
                    }}>
                        BUILT ON<br/>
                        <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.4)", color: "transparent" }}>
                            EXCELLENCE.
                        </span>
                    </h1>

                    <div style={{ width: "60px", height: "3px", background: "var(--accent, #155DFC)", borderRadius: "2px", marginBottom: "40px" }} />

                    <p style={{ 
                        fontSize: "clamp(17px, 2vw, 22px)", 
                        fontWeight: 300, 
                        fontFamily: "var(--font-body)",
                        maxWidth: "620px",
                        lineHeight: 1.75,
                        color: "rgba(255,255,255,0.85)",
                    }}>
                        STANCH TECH is a dependable marine and industrial maintenance solutions provider, 
                        built on a foundation of honesty and exceptional service delivery. We play a pivotal 
                        role in extending Cummins' expertise and technological advancements to the markets we serve.
                    </p>

                    <style>{`
                        .about-btn-primary {
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            width: 220px;
                            height: 58px;
                            background: var(--accent, #155DFC);
                            color: #fff;
                            font-weight: 800;
                            font-size: 14px;
                            text-transform: uppercase;
                            letter-spacing: 0.1em;
                            text-decoration: none;
                            font-family: var(--font-body);
                            transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
                        }
                        .about-btn-primary:hover {
                            background: #0e44cc;
                            transform: translateY(-2px);
                            box-shadow: 0 12px 32px rgba(21, 93, 252, 0.5);
                        }
                        .about-btn-ghost {
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            width: 220px;
                            height: 58px;
                            background: transparent;
                            color: #fff;
                            font-weight: 800;
                            font-size: 14px;
                            text-transform: uppercase;
                            letter-spacing: 0.1em;
                            text-decoration: none;
                            font-family: var(--font-body);
                            border: 1px solid rgba(255,255,255,0.3);
                            transition: background 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
                        }
                        .about-btn-ghost:hover {
                            background: rgba(255,255,255,0.12);
                            border-color: rgba(255,255,255,0.8);
                            transform: translateY(-2px);
                        }
                    `}</style>
                    <div style={{ display: "flex", gap: "24px", marginTop: "56px", flexWrap: "wrap" }}>
                        <a href="/contact" className="about-btn-primary">
                            Get In Touch
                        </a>
                        <a href="/spares" target="_blank" rel="noopener noreferrer" className="about-btn-ghost">
                            Explore Spares
                        </a>
                    </div>
                </div>

                {/* Bottom fade */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to top, rgba(255,255,255,0.05), transparent)" }} />
            </section>

            {/* MISSION STATEMENTS & STATS */}
            <section style={{ background: "#ffffff", padding: "160px 10vw", position: "relative", overflow: "hidden" }}>

                {/* Background accent blob */}
                <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "rgba(84, 150, 255, 0.06)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(84, 150, 255, 0.04)", pointerEvents: "none" }} />

                <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                    {/* Heading block */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "100px" }}>
                        <span style={{ color: "var(--accent, #155DFC)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "13px", display: "block", marginBottom: "20px", fontFamily: "var(--font-body)" }}>Our Purpose</span>
                        <h2 style={{ fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 900, fontFamily: "var(--font-heading)", color: "#0b1a2e", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "32px", maxWidth: "780px" }}>
                            Our Mission
                        </h2>
                        <div style={{ width: "48px", height: "4px", background: "var(--accent, #155DFC)", borderRadius: "2px", marginBottom: "32px" }} />
                        <p style={{ fontSize: "clamp(17px, 2vw, 21px)", color: "#475569", fontFamily: "var(--font-body)", fontWeight: 400, lineHeight: 1.8, maxWidth: "820px" }}>
                            To become a trusted global partner in marine and industrial maintenance — recognized for reliability, technical excellence, and proactive service solutions that extend equipment life and minimize operational risk.
                        </p>
                    </div>

                    {/* Original stamp boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 max-w-[1250px] mx-auto items-start">
                        <div className="flex flex-col items-center group w-full">
                            <div className="relative w-full aspect-[381/265] max-w-[320px] sm:max-w-none flex flex-col justify-center items-center text-center px-4 transition-transform duration-500 group-hover:-translate-y-3" style={{ 
                                backgroundImage: 'url("/asset/about_image/founded.png")',
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                                <span className="absolute top-[28%] text-[30px] sm:text-[clamp(20px,3.5vw,35px)] font-black text-[#0b1a2e]" style={{ fontFamily: "var(--font-body)" }}>2018</span>
                                <p className="absolute bottom-[28%] text-[16px] sm:text-[clamp(12px,2.5vw,18px)] font-bold text-[#0b1a2e] w-[85%] leading-tight" style={{ fontFamily: "var(--font-body)" }}>
                                    Founded in Port Harcourt, Nigeria
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center group w-full">
                            <div className="relative w-full aspect-[381/265] max-w-[320px] sm:max-w-none flex flex-col justify-center items-center text-center px-4 transition-transform duration-500 group-hover:-translate-y-3" style={{ 
                                backgroundImage: 'url("/asset/about_image/team.png")',
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                                <span className="absolute top-[28%] text-[30px] sm:text-[clamp(20px,3.5vw,35px)] font-black text-[#0b1a2e]" style={{ fontFamily: "var(--font-body)" }}>50+</span>
                                <p className="absolute bottom-[28%] text-[16px] sm:text-[clamp(12px,2.5vw,18px)] font-bold text-[#0b1a2e] w-[85%] leading-tight" style={{ fontFamily: "var(--font-body)" }}>
                                    Specialized Technical Staff
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center group w-full">
                            <div className="relative w-full aspect-[381/265] max-w-[320px] sm:max-w-none flex flex-col justify-center items-center text-center px-4 transition-transform duration-500 group-hover:-translate-y-3" style={{ 
                                backgroundImage: 'url("/asset/about_image/partners.png")',
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                                <span className="absolute top-[28%] text-[30px] sm:text-[clamp(20px,3.5vw,35px)] font-black text-[#0b1a2e]" style={{ fontFamily: "var(--font-body)" }}>15+</span>
                                <p className="absolute bottom-[28%] text-[16px] sm:text-[clamp(12px,2.5vw,18px)] font-bold text-[#0b1a2e] w-[85%] leading-tight" style={{ fontFamily: "var(--font-body)" }}>
                                    Technical Partners
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE VALUES */}
            <section style={{ padding: "160px 10vw", background: "#f8fafc", position: "relative", overflow: "hidden" }}>

                {/* Subtle background image with strong overlay */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: 'url("/asset/about_image/our_values.png")', backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", opacity: 0.07 }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: "1400px", margin: "0 auto" }}>
                    {/* Heading */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "80px", flexWrap: "wrap", gap: "32px" }}>
                        <div>
                            <span style={{ color: "var(--accent, #155DFC)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "13px", display: "block", marginBottom: "16px", fontFamily: "var(--font-body)" }}>What We Stand For</span>
                            <h2 style={{ fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 900, fontFamily: "var(--font-heading)", color: "#0b1a2e", lineHeight: 1.05, letterSpacing: "-0.03em", margin: 0 }}>
                                Our Values
                            </h2>
                        </div>
                        <p style={{ fontSize: "18px", color: "#64748b", fontFamily: "var(--font-body)", fontWeight: 400, lineHeight: 1.7, maxWidth: "480px", margin: 0 }}>
                            The principles that guide every decision we make and every service we deliver.
                        </p>
                    </div>

                    {/* Value cards */}
                    <style>{`
                        .value-card {
                            background: #ffffff;
                            border: 1px solid #e2e8f0;
                            padding: 40px 36px;
                            display: flex;
                            flex-direction: column;
                            gap: 24px;
                            transition: all 0.4s ease;
                            position: relative;
                            overflow: hidden;
                        }
                        .value-card::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 4px;
                            height: 0;
                            background: var(--accent, #155DFC);
                            transition: height 0.4s ease;
                        }
                        .value-card:hover {
                            transform: translateY(-6px);
                            box-shadow: 0 20px 48px rgba(11, 26, 46, 0.1);
                            border-color: transparent;
                        }
                        .value-card:hover::before {
                            height: 100%;
                        }
                        .value-card:hover .value-num {
                            color: var(--accent, #155DFC);
                        }
                    `}</style>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((v, i) => (
                            <div key={i} className="value-card">
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <div style={{ width: "60px", height: "60px", flexShrink: 0 }}>
                                        <img src={v.icon} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                    </div>
                                    <span className="value-num" style={{ fontSize: "48px", fontWeight: 900, color: "#f1f5f9", fontFamily: "var(--font-heading)", lineHeight: 1, transition: "color 0.4s ease", userSelect: "none" }}>
                                        0{i + 1}
                                    </span>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: "20px", fontWeight: 900, fontFamily: "var(--font-heading)", color: "#0b1a2e", marginBottom: "12px" }}>{v.title}</h4>
                                    <p style={{ fontSize: "16px", fontWeight: 400, color: "#64748b", lineHeight: 1.7, fontFamily: "var(--font-body)", margin: 0 }}>{v.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OUR SERVICES */}
            <section style={{ padding: "160px 10vw", background: "#ffffff" }}>
                <div className="container mx-auto">
                    <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 100px" }}>
                        <span style={{ color: "var(--accent, #155DFC)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "14px", display: "block", marginBottom: "16px", fontFamily: "var(--font-body)" }}>Core Expertise</span>
                        <h2 style={{ fontSize: "clamp(40px, 6vw, 56px)", fontWeight: 900, fontFamily: "var(--font-heading)", color: "#0b1a2e", marginBottom: "24px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                            Our Services
                        </h2>
                        <p style={{ fontSize: "22px", color: "#64748b", fontWeight: 400, fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
                            Delivering reliable marine and industrial solutions with precision engineering.
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-y-32">
                        {services.map((s, i) => (
                            <div key={i} className={`flex flex-col ${i % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-24 group`}>
                                <div className="w-full lg:w-1/2">
                                    <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl bg-[#f8f9fa]">
                                        <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110" />
                                        <div className="absolute inset-0 border border-black/5 rounded-[32px] pointer-events-none" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                                    <span style={{ color: "#a1a1aa", fontWeight: 900, fontSize: "80px", lineHeight: 1, opacity: 0.2, marginBottom: "-20px", fontFamily: "var(--font-heading)", userSelect: "none" }}>
                                        0{i + 1}
                                    </span>
                                    <h3 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#0b1a2e", marginBottom: "24px", fontFamily: "var(--font-heading)", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                                        {s.title}
                                    </h3>
                                    <p style={{ fontSize: "18px", color: "#475569", lineHeight: 1.8, fontFamily: "var(--font-body)", fontWeight: 400, maxWidth: "600px" }}>
                                        {s.desc}
                                    </p>
                                    <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginTop: "40px", fontSize: "16px", fontWeight: 800, color: "var(--accent, #155DFC)", textTransform: "uppercase", letterSpacing: "0.1em" }} className="hover:opacity-80 transition-opacity">
                                        Request Service <ArrowRight size={20} strokeWidth={2.5} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OUR TEAM */}
            <section style={{ padding: "160px 10vw", background: "#f8fafc", position: "relative", overflow: "hidden" }}>
                {/* Decorative background element */}
                <div style={{ position: "absolute", top: 0, right: 0, width: "50vw", height: "100%", background: "rgba(150, 195, 228, 0.15)", borderRadius: "200px 0 0 200px", transform: "translateX(20%)" }} />
                
                <div className="container mx-auto relative z-10">
                    <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 100px" }}>
                        <span style={{ color: "var(--accent, #155DFC)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "14px", display: "block", marginBottom: "16px", fontFamily: "var(--font-body)" }}>The People Behind the Power</span>
                        <h2 style={{ fontSize: "clamp(40px, 6vw, 56px)", fontWeight: 900, fontFamily: "var(--font-heading)", color: "#0b1a2e", marginBottom: "24px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                            Our Technical Team
                        </h2>
                        <p style={{ fontSize: "22px", color: "#475569", fontWeight: 400, fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
                            Our strength lies in our people. STANCH TECH is powered by highly trained engineers and technicians, selected for their rigorous technical competence and deep field experience.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 pb-16">
                        {[
                            "/asset/about_image/team_4.png",
                            "/asset/about_image/team_picture_1.jpeg",
                            "/asset/about_image/team_picture2.jpeg",
                            "/asset/about_image/Team1.png",
                            "/asset/about_image/team_2.png",
                            "/asset/about_image/team_3.png"
                        ].map((img, i) => (
                            <div key={i} className={`relative overflow-hidden rounded-[32px] group shadow-sm hover:shadow-2xl transition-all duration-700 ${i % 3 === 1 ? 'lg:mt-16' : ''} ${i % 3 === 2 ? 'lg:mt-8' : ''}`} style={{ aspectRatio: "3/4", backgroundColor: "#e2e8f0" }}>
                                <img src={img} alt="Team action" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110" />
                                <div className="absolute inset-0 bg-[#0b1a2e]/10 group-hover:bg-[#0b1a2e]/0 transition-colors duration-700 pointer-events-none" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PARTNERS */}
            <section style={{ padding: "160px 0", background: "#0b1a2e", color: "#ffffff", textAlign: "center", overflow: "hidden" }}>
                <div style={{ padding: "0 10vw" }}>
                    <span style={{ color: "var(--accent, #3b82f6)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "14px", display: "block", marginBottom: "24px", fontFamily: "var(--font-body)" }}>Collaborations</span>
                    <h2 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 900, fontFamily: "var(--font-heading)", color: "#ffffff", marginBottom: "24px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                        Trusted by Industry Leaders
                    </h2>
                    <p style={{ maxWidth: "600px", margin: "0 auto 80px", color: "rgba(255,255,255,0.7)", fontWeight: 400, fontSize: "20px", fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
                        We exclusively partner with the best in the business to deliver reliable marine and industrial maintenance solutions.
                    </p>
                </div>

                {/* Marquee ticker */}
                <style>{`
                    @keyframes marquee {
                        0%   { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .partners-track {
                        display: flex;
                        width: max-content;
                        animation: marquee 70s linear infinite;
                    }
                    .partners-track:hover {
                        animation-play-state: paused;
                    }
                    .partners-item {
                        flex-shrink: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 40px 24px;
                    }
                    .partners-item img {
                        height: 100px;
                        width: auto;
                        object-fit: contain;
                        opacity: 1;
                        transition: transform 0.4s ease;
                    }
                    .partners-item:hover img {
                        transform: scale(1.05);
                    }
                `}</style>

                <div style={{ width: "100%", overflow: "hidden", marginTop: "40px" }}>
                    <div className="partners-track">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="partners-item">
                                <img src="/asset/Landing_page_image/partners.png" alt="Partner" />
                            </div>
                        ))}
                        {[...Array(6)].map((_, i) => (
                            <div key={`dup-${i}`} className="partners-item">
                                <img src="/asset/Landing_page_image/partners.png" alt="Partner" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
