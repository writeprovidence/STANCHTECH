import Link from "next/link";
import { ArrowRight, Wrench, ShieldCheck, Settings, Anchor, Zap, PenTool, Ship, CheckCircle } from "lucide-react";

export default function ServicesPage() {
    const services = [
        {
            title: "Cummins Engine Sales, Genuine Spares & Technical Support",
            image: "/asset/services_image/Cummins engine.png",
            items: [
                "Cummins propulsion engines",
                "Marine gensets",
                "Auxiliary engines",
                "Genuine spare parts supply",
                "Maintenance and repair service"
            ],
            icon: <Settings className="w-8 h-8 text-blue-600" />,
            description: "Authorized solutions for marine and industrial applications, keeping engines perfectly tuned.",
        },
        {
            title: "Generator Sales, Rentals & Maintenance",
            image: "/asset/services_image/engine2.png",
            items: [
                "Mid-range to heavy-duty generators",
                "Sales & Rentals (Short and long-term)",
                "Preventive and corrective maintenance"
            ],
            icon: <Zap className="w-8 h-8 text-blue-600" />,
            description: "Supporting uninterrupted power across marine and industrial operations.",
        },
        {
            title: "Marine Control, Monitoring, Navigation & Communication Systems",
            image: "/asset/services_image/Marine Control.png",
            items: [
                "Control and monitoring systems",
                "Navigation equipment",
                "Marine communication systems",
                "Installation, servicing, and troubleshooting"
            ],
            icon: <Anchor className="w-8 h-8 text-blue-600" />,
            description: "Ensuring accurate performance, reliability, and safety at sea.",
        },
        {
            title: "Vessel Inspection, Maintenance & Repairs",
            image: "/asset/services_image/Marine Vessel.png",
            items: [
                "Hull systems",
                "Auxiliary engines",
                "Generator systems",
                "Propulsion engines"
            ],
            icon: <Ship className="w-8 h-8 text-blue-600" />,
            description: "Comprehensive inspection and maintenance ensuring vessel safety, efficiency, and operational compliance.",
        },
    ];

    const specializedServices = [
        {
            title: "Hydraulic Systems & Hoses Rebuild",
            description: "Hydraulic hose rebuilding. Repairs and remanufacturing of hydraulic pumps, cooling pumps, and fuel injection pumps. Ensuring system efficiency and pressure integrity.",
            image: "/asset/services_image/Hydraulic Systems.png"
        },
        {
            title: "Diesel Injector & Fuel Pump Repairs",
            description: "Precision repairs and calibration services. Optimizing fuel efficiency, engine performance, and emissions control.",
            image: "/asset/services_image/Diesel Injector1.png"
        },
        {
            title: "Marine & Industrial Fitting / Plumbing",
            description: "Specialized fitting and plumbing services tailored exactly to demanding marine and industrial environments.",
            image: "/asset/services_image/Marine fitting.png"
        },
        {
            title: "Exhaust, Thermal & Heat Control Solutions",
            description: "Exhaust system services, thermal insulation, and advanced heat control solutions. Improving efficiency, safety, and equipment longevity.",
            image: "/asset/services_image/Heat Control.png"
        },
        {
            title: "Structural Welding",
            description: "Professional welding services for all metal types, ensuring complete structural strength and durability in demanding environments.",
            image: "/asset/services_image/Structural Welding.png"
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pt-12 pb-24">
            {/* Hero Section */}
            <section className="relative px-6 pt-40 pb-16 bg-slate-900 text-white overflow-hidden">
                <div className="container mx-auto relative z-20 text-center">
                    <div className="max-w-4xl mx-auto">
                        <span className="text-blue-400 font-black uppercase tracking-[0.3em] mb-6 inline-block animate-fade-in">Our Services</span>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-12">
                            SOLUTIONS <br />
                            <span className="italic font-serif text-blue-400">UNMATCHED.</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-medium text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Delivering comprehensive technical support, maintenance, and genuine parts for marine and industrial operations.
                        </p>
                    </div>
                </div>

                {/* Background imagery for Hero */}
                <div className="absolute inset-0 z-10 opacity-20">
                    <img
                        src="/asset/services_image/Engine.png"
                        alt="Engine background"
                        className="w-full h-full object-cover shadow-2xl"
                    />
                </div>
            </section>

            {/* Core Services Section - Staggered Unique Layout */}
            <section className="py-32 container mx-auto px-6 overflow-hidden">


                <div className="space-y-48">
                    {services.map((service, index) => (
                        <div key={index} className={`flex flex-col lg:flex-row items-center gap-20 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                            <div className="w-full lg:w-1/2 relative group">
                                <div className="absolute -inset-4 bg-blue-600/5 rounded-[4rem] blur-3xl group-hover:bg-blue-600/10 transition-colors" />
                                <div className="relative aspect-[4/3] rounded-[4rem] overflow-hidden shadow-2xl border-2 border-white">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-12">
                                        <div className="text-white">
                                            <p className="font-black text-6xl opacity-20 leading-none">0{index + 1}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 space-y-8">
                                <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-slate-100 px-6 py-3 rounded-full shadow-sm">
                                    {service.icon}
                                    <span className="font-black uppercase tracking-widest text-xs text-slate-400">Section 0{index + 1}</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[1.1]">
                                    {service.title}
                                </h3>
                                <p className="text-xl font-medium text-slate-500 leading-relaxed border-l-4 border-blue-600 pl-8">
                                    {service.description}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-6">
                                    {service.items.map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 bg-white border border-slate-100 p-4 rounded-2xl hover:shadow-lg hover:border-blue-100 transition-all group/item">
                                            <div className="text-blue-600 group-hover/item:scale-110 transition-transform">
                                                <CheckCircle className="w-5 h-5" />
                                            </div>
                                            <span className="text-slate-900 font-bold text-sm tracking-tight leading-tight">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-6 bg-slate-900 text-white px-10 py-4 rounded-full font-black text-sm hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-600/30 group"
                                    >
                                        Request Service
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Specialized Services List - Modern Split-Card Design */}
            <section className="py-32 bg-slate-950 text-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs mb-6 block">Advanced Maintenance</span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic font-serif">
                                Specialized <br />
                                <span className="text-blue-600 not-italic uppercase font-sans tracking-tight">Support.</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 font-medium text-lg max-w-sm border-l-2 border-slate-800 pl-8">
                            High-precision technical solutions for critical marine and industrial systems.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {specializedServices.map((spec, i) => (
                            <div key={i} className="group flex flex-col md:flex-row gap-10 bg-slate-900/30 border border-slate-900 rounded-[3rem] p-10 hover:border-blue-900/30 hover:bg-slate-900/60 transition-all duration-500 overflow-hidden relative">
                                {/* Numbering behind everything */}
                                <span className="absolute -top-10 -right-4 text-[12rem] font-black text-white/[0.03] leading-none pointer-events-none select-none">
                                    0{i + 1}
                                </span>

                                <div className="w-full md:w-2/5 aspect-square rounded-[2rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-2xl relative">
                                    <img
                                        src={spec.image}
                                        alt={spec.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="w-full md:w-3/5 flex flex-col justify-center space-y-6">
                                    <div className="w-12 h-1 bg-blue-600 rounded-full" />
                                    <h4 className="text-2xl md:text-3xl font-black italic font-serif tracking-tight leading-none group-hover:text-blue-500 transition-colors">
                                        {spec.title}
                                    </h4>
                                    <p className="text-slate-400 text-base font-medium leading-relaxed">
                                        {spec.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Spare Parts Sales Section */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <span className="text-blue-600 font-black uppercase tracking-[0.2em] mb-4 inline-block">Supply & Logistics</span>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1]">
                                SPARE PARTS <br />
                                <span className="italic font-serif text-blue-600">SALES.</span>
                            </h2>
                            <p className="text-lg font-medium text-slate-600 leading-relaxed border-l-4 border-blue-600 pl-6">
                                In addition to services, STANCH TECH supplies genuine, high-quality spare parts for marine and industrial equipment. Our parts sourcing ensures compatibility, reliability, and long service life.
                            </p>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl">
                                    <ShieldCheck className="w-8 h-8 text-blue-600" />
                                    <div>
                                        <h4 className="font-bold text-slate-900">Uninterrupted Operations</h4>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Supporting our clients globally</p>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-6 bg-slate-900 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-600/30 group"
                            >
                                Inquire About Parts
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                            </Link>
                        </div>

                        <div className="relative group">
                            <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl relative">
                                <img
                                    src="/asset/services_image/parts2.jpeg"
                                    alt="Genuine Spare Parts"
                                    className="w-full h-full object-cover transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-12 pointer-events-none">
                                    <div className="text-white">
                                        <p className="font-black text-2xl">Genuine Availability</p>
                                        <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mt-2">Quality Sourcing</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
