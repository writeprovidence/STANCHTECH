import Link from "next/link";
import { ArrowRight, ShieldCheck, Wrench, Clock, Users, Anchor, CheckCircle } from "lucide-react";

export default function AboutPage() {
    const values = [
        { icon: <ShieldCheck className="w-8 h-8 text-blue-600" />, title: "Integrity & Honesty", description: "We do business transparently and responsibly." },
        { icon: <Wrench className="w-8 h-8 text-blue-600" />, title: "Technical Excellence", description: "Deep expertise across all makes and models of equipment." },
        { icon: <Anchor className="w-8 h-8 text-blue-600" />, title: "Dependability", description: "Clients rely on us in routine operations and critical moments." },
        { icon: <Clock className="w-8 h-8 text-blue-600" />, title: "Proactive Maintenance", description: "We prevent failures before they disrupt operations." },
        { icon: <Users className="w-8 h-8 text-blue-600" />, title: "Customer Partnership", description: "We build lasting relationships, not just complete jobs." },
        { icon: <CheckCircle className="w-8 h-8 text-blue-600" />, title: "Safety & Compliance", description: "We prioritize regulatory standards and operational safety at all times." }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section - Maximum Whitespace */}
            <section className="relative px-6 pt-56 pb-40 overflow-hidden bg-slate-950 text-white">
                <div className="container mx-auto relative z-20">
                    <div className="max-w-4xl">
                        <span className="text-blue-400 font-black uppercase tracking-[0.6em] text-xs mb-8 inline-block animate-fade-in">Our Journey Since 2018</span>
                        <h1 style={{ fontSize: "clamp(64px, 12vw, 160px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.8, marginBottom: "64px", fontFamily: "'Neue Machina', sans-serif" }}>
                            BUILT ON <br />
                            <span style={{ color: "#3b82f6", fontStyle: "italic" }}>EXCELLENCE.</span>
                        </h1>
                        <p style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 500, color: "#94a3b8", lineHeight: 1.6, maxWidth: "640px", fontFamily: "'Darker Grotesque', sans-serif" }}>
                            Redefining specialized marine and industrial maintenance with a steadfast commitment to honesty and technical mastery.
                        </p>
                    </div>
                </div>

                {/* Subtle Background mask */}
                <div className="absolute top-0 right-0 bottom-0 w-[60vw] z-10 opacity-20 hidden lg:block">
                    <img
                        src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&auto=format&fit=crop"
                        alt="Shipyard"
                        className="w-full h-full object-cover"
                        style={{ maskImage: 'linear-gradient(to right, transparent, black)' }}
                    />
                </div>
            </section>

            {/* Origin Story - Clean Whitespace */}
            <section className="py-48 container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Our Heritage</span>
                                <h2 style={{ fontSize: "clamp(48px, 8vw, 84px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.9, fontFamily: "'Neue Machina', sans-serif", color: "#0b1a2e" }}>
                                    ROBUST <br />
                                    <span style={{ color: "#2563eb", fontStyle: "italic" }}>EXPERIENCE.</span>
                                </h2>
                            </div>
                            <div style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 500, color: "#64748b", lineHeight: 1.6, fontFamily: "'Darker Grotesque', sans-serif", display: "flex", flexDirection: "column", gap: "32px" }}>
                                <p>
                                    Established in 2018, STANCH TECH emerged with a mission to redefine specialized maintenance. From our beginnings to becoming a leading solutions provider, we've remained steadfast in our commitment to exceptional delivery.
                                </p>
                                <p>
                                    Our technical expertise keeps the most demanding operations running efficiently across marine, shipping, mining, and power generation sectors.
                                </p>
                            </div>
                            <Link
                                href="/services"
                                className="hero-btn-primary"
                                style={{ padding: "20px 48px", borderRadius: "100px" }}
                            >
                                View Our Services
                                <ArrowRight className="w-8 h-8" />
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transform hover:scale-[1.02] transition-transform duration-700">
                                <img
                                    src="/asset/about_image/low hour engine.jpeg"
                                    alt="Technical Excellence"
                                    className="w-full h-auto aspect-[4/5] object-cover"
                                />
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-50 -z-10 rounded-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision - Impactful Split Layout */}
            <section className="bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Mission Block */}
                        <div className="py-48 lg:pr-24 border-b lg:border-b-0 lg:border-r border-slate-200">
                            <div className="max-w-xl space-y-12">
                                <span className="font-black uppercase tracking-[0.6em] text-xs text-blue-600">Our Mission</span>
                                <h3 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.85, textTransform: "uppercase", fontFamily: "'Neue Machina', sans-serif" }}>
                                    Trusted <br />
                                    Global <span style={{ color: "#2563eb", opacity: 0.8, textTransform: "none", fontStyle: "italic" }}>Partner.</span>
                                </h3>
                                <p style={{ fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 500, color: "#475569", lineHeight: 1.2, fontStyle: "italic", fontFamily: "'Darker Grotesque', sans-serif" }}>
                                    "To become a recognized leader for reliability and technical excellence, recognized for proactive solutions that minimize risk."
                                </p>
                            </div>
                        </div>

                        {/* Vision Block */}
                        <div className="py-48 lg:pl-24">
                            <div className="max-w-xl space-y-12">
                                <span className="font-black uppercase tracking-[0.6em] text-xs text-blue-600">Our Vision</span>
                                <h3 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.85, textTransform: "uppercase", fontFamily: "'Neue Machina', sans-serif" }}>
                                    Precision <br />
                                    Without <span style={{ color: "#2563eb", opacity: 0.8, textTransform: "none", fontStyle: "italic" }}>Limits.</span>
                                </h3>
                                <p style={{ fontSize: "clamp(18px, 2.2vw, 22px)", fontWeight: 500, color: "#64748b", lineHeight: 1.6, fontFamily: "'Darker Grotesque', sans-serif" }}>
                                    To deliver cost-effective, high-quality products without compromising industry standards, guided by the satisfaction of those we serve.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values - Grid with Breathable Spacing */}
            <section className="py-48 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-32 space-y-8">
                        <span className="text-blue-600 font-black uppercase tracking-widest text-xs">Core Values</span>
                        <h2 style={{ fontSize: "clamp(48px, 8vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, fontStyle: "italic", fontFamily: "'Neue Machina', sans-serif" }}>What drives us forward.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {values.map((v, i) => (
                            <div key={i} className="group space-y-8 p-12 rounded-[3rem] border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all duration-500">
                                <div className="bg-blue-50 w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500">
                                    <div className="group-hover:text-white transition-colors">
                                        {v.icon}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.02em", fontFamily: "'Neue Machina', sans-serif" }}>{v.title}</h4>
                                    <p style={{ fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", fontFamily: "'Darker Grotesque', sans-serif" }}>
                                        {v.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section - Cinematic & Spacious */}
            <section className="py-56 bg-slate-950 text-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-24 items-start mb-40">
                        <div className="lg:sticky lg:top-32 max-w-xl space-y-10">
                            <span className="text-blue-400 font-black uppercase tracking-widest text-xs">The Experts</span>
                            <h2 style={{ fontSize: "clamp(56px, 10vw, 96px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.85, fontFamily: "'Neue Machina', sans-serif" }}>
                                OUR <span style={{ color: "#3b82f6", fontStyle: "italic" }}>TEAM.</span>
                            </h2>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: 1.6, color: "#94a3b8", fontFamily: "'Darker Grotesque', sans-serif" }}>
                                Our strength lies in our people. STANCH TECH is powered by highly trained engineers and technicians, selected for their technical competence and field experience.
                            </p>
                             <Link
                                href="/contact"
                                className="hero-btn-primary"
                                style={{ background: "#2563eb", padding: "20px 48px", borderRadius: "100px" }}
                            >
                                Contact Our Team
                                <ArrowRight className="w-8 h-8" />
                            </Link>
                        </div>

                        <div className="flex-1 space-y-12">
                            <div className="aspect-[16/10] rounded-[3rem] overflow-hidden group">
                                <img
                                    src="/asset/team_picture 1.jpeg"
                                    alt="STANCH TECH Team"
                                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]"
                                />
                            </div>
                            <div className="aspect-[16/10] rounded-[3rem] overflow-hidden group">
                                <img
                                    src="/asset/team_picture2.jpeg"
                                    alt="STANCH TECH Team"
                                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="max-w-4xl text-left border-t border-white/10 pt-24">
                        <p style={{ fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 500, color: "#cbd5e1", lineHeight: 1.6, marginBottom: "32px", fontFamily: "'Darker Grotesque', sans-serif" }}>
                            Our technicians are more than service providers; they are trusted partners. With extensive experience across multiple machinery brands, our team provides the same level of care and precision across entire systems.
                        </p>
                        <div className="h-1 w-24 bg-blue-600" />
                    </div>
                </div>
            </section>
        </div>
    );
}

