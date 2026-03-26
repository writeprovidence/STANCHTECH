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
        <div className="bg-slate-50">
            {/* Hero Section */}
            <section className="relative px-6 pt-24 pb-24 overflow-hidden bg-slate-900 text-white">
                <div className="container mx-auto relative z-20 text-center">
                    <div className="max-w-5xl mx-auto">
                        <span className="text-blue-400 font-black uppercase tracking-[0.5em] mb-6 inline-block animate-fade-in">Our Journey Since 2018</span>
                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-12">
                            BUILT ON <br />
                            <span className="italic font-serif text-blue-400">EXCELLENCE.</span>
                        </h1>
                        <p className="text-lg md:text-xl font-medium text-slate-300 mx-auto leading-relaxed mb-10 max-w-4xl">
                            Established in 2018, STANCH TECH emerged with a mission to redefine specialized marine and industrial maintenance. From our humble beginnings to becoming a leading solutions provider, we've remained steadfast in our commitment to honesty, open-mindedness, and exceptional delivery.
                        </p>
                    </div>
                </div>

                {/* Floating elements styling */}
                <div className="absolute top-0 right-0 bottom-0 w-[50vw] z-10 opacity-30">
                    <img
                        src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&auto=format&fit=crop"
                        alt="Shipyard"
                        className="w-full h-full object-cover"
                        style={{ maskImage: 'linear-gradient(to right, transparent, black)' }}
                    />
                </div>
            </section>

            {/* Origin Story Grid */}
            <section className="py-24 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative group">
                        <div className="rounded-[3rem] overflow-hidden shadow-2xl">
                            <img
                                src="/asset/about_image/low hour engine.jpeg"
                                alt="Technical Excellence"
                                className="w-full h-auto block"
                            />
                        </div>
                    </div>
                    <div className="space-y-10">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]">
                            ROBUST <br />
                            <span className="italic font-serif text-blue-600">EXPERIENCE.</span>
                        </h2>
                        <div className="space-y-6 text-lg font-medium text-slate-600 leading-relaxed">
                            <p>
                                Our hallmark is reliability in delivering sustainable solutions that vessel owners, operators, and industry partners can truly depend on.
                            </p>
                            <p>
                                Globally, ambitious industries require quality maintenance support to remain operational, compliant, and competitive. From marine and shipping to mining, rail, power generation, and oil & gas, our technical expertise keeps the most demanding operations running efficiently.
                            </p>
                            <p>
                                With a growing sales and service network, STANCH TECH ensures that you and the people who count on you can operate with confidence. We help you weather any business storm.
                            </p>
                        </div>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-6 bg-slate-900 text-white px-12 py-6 rounded-full font-black text-xl hover:bg-blue-600 transition-all group"
                        >
                            View Our Services
                            <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Mission & Vision - Vertical Impactful Layout */}
            <section className="bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img src="https://images.unsplash.com/photo-1542396601-dca920ea2807?w=1600&auto=format&fit=crop" className="w-full h-full object-cover grayscale" />
                </div>

                {/* Mission Block */}
                <div className="py-32 container mx-auto px-6 relative z-10 border-b border-white/5">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <span className="font-black uppercase tracking-[0.6em] text-xs text-blue-400">Our Mission</span>
                        <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.8]">
                            Trusted <br />
                            Global <span className="italic font-serif text-blue-400 opacity-80 not-uppercase">Partner.</span>
                        </h3>
                        <p className="text-2xl md:text-3xl font-medium text-slate-200 leading-tight max-w-3xl mx-auto italic font-serif">
                            "To become a trusted global partner in marine and industrial maintenance, recognized for reliability, technical excellence, and proactive service solutions that extend equipment life and minimize operational risk."
                        </p>
                    </div>
                </div>

                {/* Vision Block */}
                <div className="py-32 container mx-auto px-6 relative z-10 bg-blue-600">
                    <div className="max-w-4xl mx-auto text-center space-y-10">
                        <span className="font-black uppercase tracking-[0.6em] text-xs text-blue-100">Our Vision</span>
                        <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.8]">
                            Precision <br />
                            Without <span className="italic font-serif text-white opacity-80 not-uppercase">Limits.</span>
                        </h3>
                        <div className="space-y-8 text-xl md:text-2xl font-medium text-blue-50 leading-relaxed max-w-3xl mx-auto">
                            <p>
                                To deliver cost-effective, high-quality products and maintenance services without compromising industry standards, guided by the satisfaction of those we serve.
                            </p>
                            <div className="h-px w-20 bg-blue-400 mx-auto" />
                            <p className="text-white font-bold italic font-serif">
                                We are on a continuous mission to discover better, smarter, and more efficient ways to keep engines, vessels, and equipment operating at peak performance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Cards */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-3xl mx-auto mb-20 space-y-6">
                        <span className="text-blue-600 font-black uppercase tracking-widest text-xs">Our Core Values</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none italic font-serif">What drives us forward.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((v, i) => (
                            <div key={i} className="group p-10 bg-slate-50 rounded-[2rem] hover:bg-slate-900 transition-all duration-500 hover:-translate-y-2 shadow-xl shadow-transparent hover:shadow-xl">
                                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                    {v.icon}
                                </div>
                                <h4 className="text-2xl font-black mb-4 group-hover:text-white transition-colors">{v.title}</h4>
                                <p className="text-slate-500 group-hover:text-slate-300 font-bold text-sm uppercase tracking-wide leading-relaxed transition-colors">
                                    {v.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Team integrated into About */}
            <section className="py-48 bg-slate-950 text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-32 max-w-3xl mx-auto">
                        <span className="text-blue-400 font-black uppercase tracking-widest text-xs mb-4 inline-block">The Experts</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
                            OUR <span className="italic font-serif text-blue-400">TEAM.</span>
                        </h2>
                        <p className="text-lg text-slate-400 font-medium leading-relaxed">
                            Our strength lies in our people. STANCH TECH is powered by highly trained engineers and technicians, carefully selected for their technical competence, discipline, and field experience. No matter where you operate, our team is ready to support you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group">
                            <img
                                src="/asset/team_picture 1.jpeg"
                                alt="STANCH TECH Team 1"
                                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                                <h3 className="text-xl font-bold text-white">Experienced Professionals</h3>
                            </div>
                        </div>
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group">
                            <img
                                src="/asset/team_picture2.jpeg"
                                alt="STANCH TECH Team 2"
                                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                                <h3 className="text-xl font-bold text-white">Trusted Partners</h3>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <p className="text-xl font-medium text-slate-300">
                            Our technicians are more than service providers, they are trusted partners. With extensive experience across multiple machinery brands and models, our team provides the same level of care, precision, and reliability across entire systems &mdash; not just individual components.
                        </p>
                        <p className="text-lg font-medium text-slate-400">
                            They work closely with customers to understand operational realities, anticipate challenges, and deliver solutions that go beyond routine maintenance. Building trust. Delivering solutions. Turning service into partnership.
                        </p>

                        <div className="pt-12">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-4 bg-blue-600 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-600/30 group"
                            >
                                Contact Our Team
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>


                    </div>
                </div>
            </section>
        </div>
    );
}
