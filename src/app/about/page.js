"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  Plus, Minus, ChevronRight, Globe, Award, Zap, ArrowRight 
} from "lucide-react";

export default function AboutPage() {
    const [activeFaq, setActiveFaq] = useState(0);

    const stats = [
        { label: "Founded", value: "2018" },
        { label: "Technical staff", value: "50+" },
        { label: "Global partners", value: "12+" }
    ];

    const values = [
        { icon: "/asset/about_image/Integrity & Honesty.png", title: "Integrity & Honesty", description: "We do business transparently and responsibly." },
        { icon: "/asset/about_image/Technical Excellence.png", title: "Technical Excellence", description: "We apply deep expertise across all makes and models of equipment." },
        { icon: "/asset/about_image/Safety & Compliance.png", title: "Safety & Compliance", description: "We prevent failures before they disrupt operations." },
        { icon: "/asset/about_image/Proactive Maintenance.png", title: "Proactive Maintenance", description: "We build lasting relationships, not just complete jobs." },
        { icon: "/asset/about_image/Customer Partnership.png", title: "Customer Partnership", description: "We prioritize regulatory standards and operational safety at all times." },
        { icon: "/asset/about_image/Dependability.png", title: "Dependability", description: "Our clients can rely on us in routine operations and critical moments." }
    ];

    const services = [
        { 
            title: "Cummins Engine Maintenance", 
            img: "/asset/about_image/Cummins Engine Maintenance.png",
            desc: "Expert repair and routine maintenance for high-performance units."
        },
        { 
            title: "Vessel Inspection & Repairs", 
            img: "/asset/about_image/Vessel Inspection, Maintenance & Repairs.png",
            desc: "Comprehensive technical inspections and onboard maintenance services."
        },
        { 
            title: "Genuine Spares Supply", 
            img: "/asset/about_image/Sales of Genuine Cummins Engine Spares parts.png",
            desc: "Sales of authentic Cummins and industrial spare parts."
        },
        { 
            title: "Structural Welding", 
            img: "/asset/about_image/Structural Welding.png",
            desc: "Specialized maintenance for critical maritime and industrial structures."
        },
        { 
            title: "Hydraulic System Support", 
            img: "/asset/Landing page_image/marine_control_black.png",
            desc: "Specialized maintenance for critical hydraulic and control systems."
        },
        { 
            title: "Technical Support", 
            img: "/asset/about_image/Team1.png",
            desc: "24/7 technical advisory and remote diagnostic services."
        }
    ];

    const faqs = [
        { q: "How can I get in touch with stanch tech?", a: "You can reach us through our contact forms, direct email, or 24/7 technical support hotline for urgent maritime issues." },
        { q: "Is your technical service available 24/7 ?", a: "Yes, we provide round-the-clock emergency maintenance and technical consultancy across global time zones." },
        { q: "What brands of engines do you provide services for?", a: "While we specialize in Cummins engines, our team is trained and experienced across all major marine engine brands." },
        { q: "In which countries are stanch tech services available ?", a: "We operate globally, providing both field technicians for on-site repairs and remote technical support." }
    ];

    return (
        <div className="bg-white overflow-x-hidden" style={{ fontSmooth: "antialiased" }}>
            
            {/* HERO SECTION */}
            <section style={{ 
                height: "80vh", 
                minHeight: "700px",
                position: "relative",
                backgroundImage: 'url("/asset/about_image/built on excellence.png")',
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
                        fontSize: "clamp(64px, 12vw, 150px)", 
                        fontWeight: 900, 
                        fontFamily: "'Neue Machina', sans-serif",
                        lineHeight: 0.85,
                        letterSpacing: "-0.04em",
                        marginBottom: "40px"
                    }}>
                        BUILT ON<br/>EXCELLENCE
                    </h1>
                    <p style={{ 
                        fontSize: "24px", 
                        fontWeight: 600, 
                        fontFamily: "'Darker Grotesque', sans-serif",
                        maxWidth: "900px",
                        margin: "0 auto",
                        lineHeight: 1.25,
                        opacity: 0.95
                    }}>
                        STANCHTECH is a dependable marine and industrial maintenance solutions provider,<br/>
                        built on a foundation of honesty, open-mindedness,<br/>
                        and exceptional service delivery.
                    </p>
                </div>
            </section>

            {/* MISSION STATEMENTS & STATS */}
            <section style={{ 
                background: "rgba(132, 185, 224, 0.34)", 
                padding: "120px 5%",
                minHeight: "810px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div className="container mx-auto">
                    <p style={{ 
                        fontSize: "32px", 
                        fontWeight: 700, 
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
                    
                    <div className="flex flex-wrap justify-center gap-4 max-w-[1200px] mx-auto items-start">
                        <div className="flex flex-col items-center group">
                            <div style={{ 
                                width: "381px", 
                                height: "265px", 
                                backgroundImage: 'url("/asset/about_image/Founded.png")',
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <span style={{ fontSize: "35px", fontWeight: 900, fontFamily: "'Neue Machina', sans-serif", color: "#0b1a2e", marginTop: "-110px" }}>2018</span>
                            </div>
                            <p style={{ fontSize: "18px", fontWeight: 700, fontFamily: "'Darker Grotesque', sans-serif", color: "#0b1a2e", marginTop: "-85px" }}>
                                Founded in Port Harcourt, Nigeria
                            </p>
                        </div>

                        <div className="flex flex-col items-center group">
                            <div style={{ 
                                width: "381px", 
                                height: "265px", 
                                backgroundImage: 'url("/asset/about_image/team.png")',
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <span style={{ fontSize: "35px", fontWeight: 900, fontFamily: "'Neue Machina', sans-serif", color: "#0b1a2e", marginTop: "-110px" }}>50+</span>
                            </div>
                            <p style={{ fontSize: "18px", fontWeight: 700, fontFamily: "'Darker Grotesque', sans-serif", color: "#0b1a2e", marginTop: "-85px" }}>
                                Specialized Technical Staff
                            </p>
                        </div>

                        <div className="flex flex-col items-center group">
                            <div style={{ 
                                width: "381px", 
                                height: "265px", 
                                backgroundImage: 'url("/asset/about_image/partners.png")',
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <span style={{ fontSize: "35px", fontWeight: 900, fontFamily: "'Neue Machina', sans-serif", color: "#0b1a2e", marginTop: "-110px" }}>15+</span>
                            </div>
                            <p style={{ fontSize: "18px", fontWeight: 700, fontFamily: "'Darker Grotesque', sans-serif", color: "#0b1a2e", marginTop: "-85px" }}>
                                Global Technical Partners
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE VALUES */}
            <section style={{ 
                backgroundImage: 'url("/asset/about_image/our values.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "140px 5%",
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
            <section style={{ padding: "140px 5%", background: "#F8FAFC" }}>
                <div className="container mx-auto">
                    <div className="mb-24">
                        <h2 style={{ fontSize: "64px", fontWeight: 900, fontFamily: "'Neue Machina', sans-serif", color: "#0b1a2e" }}>Our Services</h2>
                        <p style={{ fontSize: "20px", color: "#64748b", fontWeight: 600, fontFamily: "'Darker Grotesque', sans-serif", marginTop: "16px" }}>Technical solutions designed for marine and industrial durability.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {services.map((s, i) => (
                            <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 transition-all hover:shadow-2xl">
                                <div style={{ height: "320px", overflow: "hidden" }}>
                                    <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                </div>
                                <div style={{ padding: "40px" }}>
                                    <h4 style={{ fontSize: "20px", fontWeight: 900, color: "#0b1a2e", textTransform: "uppercase", marginBottom: "16px", fontFamily: "'Neue Machina', sans-serif" }}>{s.title}</h4>
                                    <p style={{ fontSize: "18px", color: "#64748b", fontWeight: 500, fontFamily: "'Darker Grotesque', sans-serif", lineHeight: 1.4 }}>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OUR TEAM */}
            <section style={{ padding: "140px 5%", background: "#fff" }}>
                <div className="container mx-auto">
                    <div className="mb-24">
                        <h2 style={{ fontSize: "64px", fontWeight: 900, fontFamily: "'Neue Machina', sans-serif", color: "#0b1a2e", lineHeight: 1, marginBottom: "24px" }}>Our Team</h2>
                        <p style={{ maxWidth: "800px", fontSize: "22px", color: "#64748b", fontWeight: 500, fontFamily: "'Darker Grotesque', sans-serif", lineHeight: 1.4 }}>
                            Our team is built on excellence, consisting of highly trained engineers and technicians selected for technical mastery and experience across multiple machinery brands.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            "/asset/about_image/Team1.png", 
                            "/asset/about_image/team 2.png", 
                            "/asset/about_image/team 3.png", 
                            "/asset/about_image/team 4.png", 
                            "/asset/about_image/team_picture 1.jpeg", 
                            "/asset/about_image/team_picture2.jpeg"
                        ].map((img, i) => (
                            <div key={i} style={{ aspectRatio: "1/1", borderRadius: "24px", overflow: "hidden" }}>
                                <img src={img} 
                                     alt="Team action" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PARTNERS */}
            <section style={{ padding: "120px 5%", background: "#F1F5F9" }}>
                <div className="container mx-auto text-center">
                    <h2 style={{ fontSize: "28px", fontWeight: 900, fontFamily: "'Neue Machina', sans-serif", color: "#0b1a2e", marginBottom: "12px" }}>Our Partners</h2>
                    <p style={{ marginBottom: "80px", color: "#64748b", fontWeight: 700, fontSize: "20px", fontFamily: "'Darker Grotesque', sans-serif" }}>Facilitating reliable maritime and industrial maintenance solutions.</p>
                    
                    <div className="flex flex-wrap justify-center items-center gap-24">
                        <img src="/asset/about_image/partners.png" alt="Collaborative Partners" className="h-20 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section style={{ padding: "140px 5%", background: "#fff" }}>
                <div className="container mx-auto flex flex-col lg:flex-row gap-24">
                    <div className="lg:w-1/3">
                        <h2 style={{ fontSize: "clamp(56px, 8vw, 96px)", fontWeight: 900, fontFamily: "'Neue Machina', sans-serif", color: "#0b1a2e", lineHeight: 0.85 }}>
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <div className="lg:w-2/3 space-y-12">
                        {faqs.map((f, i) => (
                            <div key={i} style={{ borderBottom: "2px solid rgba(11,26,46,0.05)", paddingBottom: "40px" }}>
                                <button 
                                    onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}
                                    className="w-full flex justify-between items-center text-left"
                                >
                                    <span style={{ fontSize: "24px", fontWeight: 900, color: "#0b1a2e", fontFamily: "'Neue Machina', sans-serif" }}>{f.q}</span>
                                    {activeFaq === i ? <Minus size={24} /> : <Plus size={24} />}
                                </button>
                                {activeFaq === i && (
                                    <div style={{ marginTop: "32px" }}>
                                        <p style={{ fontSize: "22px", color: "#64748b", fontWeight: 500, fontFamily: "'Darker Grotesque', sans-serif", lineHeight: 1.4 }}>{f.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{ background: "#060D17", color: "#fff", padding: "140px 5%" }}>
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
                    <div className="space-y-10">
                        <img src="/asset/Landing page_image/stanch_tech logo.png" alt="Logo" className="h-12 w-auto invert" />
                        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", lineHeight: 1.5 }}>Redefining specialized marine and industrial maintenance excellence globally since 2018.</p>
                    </div>
                    <div className="space-y-10">
                        <h4 style={{ fontWeight: 900, fontSize: "20px", fontFamily: "'Neue Machina', sans-serif" }}>Links</h4>
                        <ul className="space-y-6 text-slate-500 font-bold text-lg">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/services">Our Services</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-10">
                        <h4 style={{ fontWeight: 900, fontSize: "20px", fontFamily: "'Neue Machina', sans-serif" }}>Contact Us</h4>
                        <ul className="space-y-6 text-slate-500 font-bold text-lg">
                            <li>Lagos State, Nigeria</li>
                            <li>+234 810 522 6265</li>
                            <li>support@stanch-tech.com</li>
                        </ul>
                    </div>
                    <div className="space-y-10">
                        <h4 style={{ fontWeight: 900, fontSize: "20px", fontFamily: "'Neue Machina', sans-serif" }}>24/7 Support</h4>
                        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", lineHeight: 1.5 }}>For emergency engine repairs or technical guidance, our team is available round the clock.</p>
                        <button style={{ background: "#2563eb", padding: "16px 32px", borderRadius: "100px", fontWeight: 900, fontSize: "14px", letterSpacing: "0.1em" }}>CONTACT NOW</button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
