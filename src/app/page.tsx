"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, ArrowUpRight, Star, Facebook, Instagram, MessageCircle, MapPin, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

const HERO_SLIDES = [
  {
    image: "/asset/Landing_page_image/low_hour_engine.jpeg",
    description: "Vessel Inspection, Maintenance & Repairs"
  },
  {
    image: "/asset/Landing_page_image/marine_spares.png",
    description: "Professional one-stop Cummins Diesel Engine spare parts solution"
  },
  {
    image: "/asset/Landing_page_image/support.png",
    description: "Technical support, prompt after-sales service, fast delivery"
  }
];

const PROJECT_SLIDES = [
  {
    id: "project-1",
    category: "Offshore Supply Support",
    title: "Engine Overhaul for Supply Fleet",
    image: "/asset/Landing_page_image/vessel.png",
    detail: "Providing full-spectrum maintenance for deep-sea vessels. This project involved a complete rebuild of twin KTA50 engines under a strict 14-day harbor window."
  },
  {
    id: "project-2",
    category: "Industrial Power Operations",
    title: "Generator Rehabilitation",
    image: "/asset/Landing_page_image/low_hour_engine.jpeg",
    detail: "Comprehensive diagnostic and restore operations on high-capacity industrial generators to ensure uninterrupted power supply for offshore platforms."
  },
  {
    id: "project-3",
    category: "Marine Engineering",
    title: "Propulsion System Upgrade",
    image: "/asset/Landing_page_image/marine_spares.png",
    detail: "Sourcing and integration of OEM genuine parts for an overarching propulsion system refit, maximizing vessel efficiency and reducing future downtime."
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProjectSlide, setCurrentProjectSlide] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [dbLoaded, setDbLoaded] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch ALL products (for general use)
        const { data: allData, error: allError } = await supabase
          .from('products')
          .select('*')
          .neq('is_hidden', true)
          .order('id', { ascending: false });

        if (!allError) {
          setProducts(allData || []);
        }

        // Fetch ONLY featured products for the homepage section
        const { data: featuredData, error: featuredError } = await supabase
          .from('products')
          .select('*')
          .eq('is_featured', true)
          .neq('is_hidden', true)
          .order('id', { ascending: false })
          .limit(3);

        if (!featuredError) {
          setFeaturedProducts(featuredData || []);
        }

        setDbLoaded(true);
      } catch (err) {
        console.error("Error fetching products:", err);
        setDbLoaded(true);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const projectTimer = setInterval(() => {
      setCurrentProjectSlide((prev) => (prev + 1) % PROJECT_SLIDES.length);
    }, 6000);
    return () => clearInterval(projectTimer);
  }, []);

  return (
    <div style={{ overflowX: "hidden", background: "#fff" }}>

      {/* ─── 01. REDESIGNED HERO ─── */}
      <section style={{
        position: "relative",
        height: "85vh",
        minHeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        overflow: "hidden",
      }}>
        {/* Cinematic Backdrop */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(0,0,0,0.5)" }} />
        {HERO_SLIDES.map((slide, index) => (
          <motion.div
            key={slide.image}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1,
              transition: { duration: 1.5, ease: "easeInOut" }
            }}
            style={{ position: "absolute", inset: 0, zIndex: 0 }}
          >
            <Image 
              src={slide.image} 
              alt="" 
              fill 
              priority={index === 0}
              style={{ objectFit: "cover" }} 
            />
          </motion.div>
        ))}

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 1100, padding: "0 24px" }}>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label" 
            style={{ color: "#fff", opacity: 0.8 }}
          >
            Engineering Excellence & Marine Support
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="responsive-title" 
            style={{ color: "#fff", marginBottom: 32, textShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
          >
            Building High-Performance <br />
            Marine Systems
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="responsive-subtitle" 
            style={{ color: "rgba(255,255,255,0.9)", maxWidth: 700, margin: "0 auto 48px" }}
          >
            {HERO_SLIDES[currentSlide].description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ 
              display: "flex", 
              gap: 16, 
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <Link href="/shop" className="hero-btn-primary" style={{ width: "min(100%, 220px)" }}>
              Explore Inventory
            </Link>
            <Link href="/projects" className="hero-btn-secondary" style={{ backdropFilter: "blur(10px)", background: "rgba(255,255,255,0.1)", width: "min(100%, 220px)" }}>
              View Our Portfolio
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── 02. STATS BAR ─── */}
      <section style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "40px 5%" }}>
        <div style={{ 
          maxWidth: 1400, 
          margin: "0 auto", 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: 32 
        }}>
           {[
             { label: "Technical Support", icon: <MessageCircle size={24} /> },
             { label: "Spares Inventory", icon: <Package size={24} /> },
             { label: "Onsite Maintenance", icon: <MapPin size={24} /> },
             { label: "Expert Consultancy", icon: <Star size={24} /> }
           ].map((item, i) => (
             <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, color: "var(--navy)", justifyContent: "center" }}>
                <div style={{ color: "var(--accent)" }}>{item.icon}</div>
                <span style={{ fontWeight: 700, letterSpacing: "0.02em", textTransform: "uppercase", fontSize: 12, fontFamily: "var(--font-heading)" }}>{item.label}</span>
             </div>
           ))}
        </div>
      </section>

      {/* ─── 03. INTRO / STATS ─── */}
      <section className="section-pad" style={{ background: "#fff", paddingBottom: 60 }}>
        <div className="two-col-grid">
          <div style={{ borderLeft: "4px solid var(--accent)", paddingLeft: 40 }}>
             <span className="section-label">Our Philosophy</span>
             <h2 className="responsive-title" style={{ marginBottom: 24 }}>
                Precision is our foundation, <br />
                performance is our <span style={{ color: "var(--accent)" }}>legacy.</span>
             </h2>
             <p className="responsive-subtitle">
                We bring over a decade of technical expertise to the marine and industrial sectors, ensuring your operations never miss a beat. From complex engine overhauls to critical spares logistics.
             </p>
             <Link href="/about" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 40, color: "var(--navy)", fontWeight: 700, textDecoration: "none" }}>
                LEARN MORE ABOUT OUR MISSION <ArrowUpRight size={18} color="var(--accent)" />
             </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 40 }}>
             {[
               { val: "8+", label: "Years Experience" },
               { val: "100+", label: "Projects Completed" },
               { val: "4.8/5", label: "Client Satisfaction" },
               { val: "98%", label: "Repeat Business" },
             ].map((stat, i) => (
               <div key={i}>
                  <h3 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "var(--navy)", marginBottom: 8, letterSpacing: "-0.04em", fontFamily: "var(--font-heading)" }}>{stat.val}</h3>
                  <p style={{ color: "#6b7280", fontWeight: 500, fontSize: 16 }}>{stat.label}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── 04. REDESIGNED SERVICES GRID ─── */}
      <section className="section-pad" style={{ background: "#fff", paddingTop: 60 }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
           <span className="section-label">What We Do</span>
           <h2 className="responsive-title">Engineered to Perfection</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 40, maxWidth: 1400, margin: "0 auto" }}>
           {[
             { num: "01", title: "Cummins engines maintenance and repair services", img: "/asset/Landing_page_image/cummin_engine.png", desc: "Cummins engine maintenance and repair services, ensuring optimal performance, reliability and extended lifespan through expert diagnostics." },
             { num: "02", title: "Vessel Inspection, Maintenance & Repairs.", img: "/asset/Landing_page_image/vessel.png", desc: "Ensure vessel safety and performance through thorough inspection, routine maintenance, and reliable repairs. We prevent breakdowns and keep operations running smoothly." },
             { num: "03", title: "Sales of Genuine Cummins Engine Spares", img: "/asset/Landing_page_image/marine_spares.png", desc: "We Provide quality spares and expert technical support for marine and industrial operations. We ensure fast delivery, reliable solutions, and minimal downtime across all systems." }
           ].map((service, i) => (
             <div key={i} className="premium-card" style={{ display: "flex", flexDirection: "column" }}>
                <span className="card-number">{service.num}/</span>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, fontFamily: "var(--font-heading)" }}>{service.title}</h3>
                <p style={{ color: "#4b5563", lineHeight: 1.6, marginBottom: 32 }}>{service.desc}</p>
                <div style={{ height: 260, position: "relative", marginBottom: -40, marginLeft: -40, marginRight: -40, marginTop: "auto", overflow: "hidden" }}>
                   <Image 
                     src={service.img} 
                     alt={service.title} 
                     fill 
                     style={{ objectFit: "cover" }} 
                   />
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* ─── 05. WHY STANCHTECH? ─── */}
      <section className="section-pad" style={{ background: "#F8F9FE" }}>
         <div style={{ textAlign: "center", marginBottom: "clamp(60px, 10vw, 120px)" }}>
            <span className="section-label">Excellence Guaranteed</span>
            <h2 className="responsive-title">Why StanchTech?</h2>
         </div>
         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 40, maxWidth: 1400, margin: "0 auto" }}>
            {[
              { title: "Unmatched Expertise", desc: "Our technicians are certified specialists for high-power marine diesel systems." },
              { title: "24/7 Deployment", desc: "Breakdowns don't wait. Our support teams are ready for rapid onsite response." },
              { title: "Genuine Guarantee", desc: "We exclusively utilize and supply OEM-certified parts for total reliability." },
              { title: "Integrated Logistics", desc: "From shipping to installation, we handle the entire hardware lifecycle." }
            ].map((item, i) => (
              <div key={i} style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 24 }}>
                 <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                 <p style={{ color: "#4b5563", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
         </div>
      </section>

      {/* ─── 06. CASE STUDIES ─── */}
      <section style={{ background: "#0b1a2e", color: "#fff", padding: "180px 5%" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80 }}>
              <div>
                 <span className="section-label" style={{ color: "var(--accent)" }}>Proven Performance</span>
                 <h2 className="responsive-title" style={{ color: "#fff" }}>Featured Projects</h2>
              </div>
           </div>
           <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr", gap: 72, alignItems: "stretch", overflow: "hidden", borderRadius: 0, maxWidth: 1400, margin: "0 auto" }}>
              <Link href={`/projects/${PROJECT_SLIDES[currentProjectSlide].id}`} style={{ display: "block", height: "clamp(300px, 60vw, 420px)", overflow: "hidden", position: "relative", borderRadius: 0 }}>
                  <AnimatePresence mode="wait">
                     <motion.div
                        key={currentProjectSlide}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
                     >
                        <Image 
                          src={PROJECT_SLIDES[currentProjectSlide].image} 
                          alt={PROJECT_SLIDES[currentProjectSlide].title} 
                          fill 
                          style={{ objectFit: "cover" }} 
                        />
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(24px, 5vw, 60px)", background: "linear-gradient(to top, rgba(11,26,46,0.9) 0%, transparent 100%)" }}>
                           <span className="section-label" style={{ color: "#fff" }}>{PROJECT_SLIDES[currentProjectSlide].category}</span>
                           <h3 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 700, fontFamily: "var(--font-heading)", color: "#fff" }}>{PROJECT_SLIDES[currentProjectSlide].title}</h3>
                        </div>
                     </motion.div>
                  </AnimatePresence>
              </Link>
              <div style={{ display: "flex", flexDirection: "column", gap: 32, justifyContent: "space-between" }}>
                  <AnimatePresence mode="wait">
                     <motion.div
                        key={currentProjectSlide}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                     >
                        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Technical Detail</h3>
                        <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                           {PROJECT_SLIDES[currentProjectSlide].detail}
                        </p>
                     </motion.div>
                  </AnimatePresence>

                  {/* Rectangular Slider controls */}
                  <div style={{ display: "flex", gap: "clamp(12px, 3vw, 32px)", marginTop: 40, flexWrap: "wrap", justifyContent: "flex-start" }}>
                     {PROJECT_SLIDES.map((_, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                           <button 
                              onClick={() => setCurrentProjectSlide(idx)}
                              style={{ 
                                 width: "clamp(40px, 8vw, 64px)", 
                                 height: 4, 
                                 background: currentProjectSlide === idx ? "var(--accent)" : "rgba(255,255,255,0.3)",
                                 border: "none",
                                 cursor: "pointer",
                                 padding: 0,
                                 transition: "background 0.3s"
                              }}
                              aria-label={`Go to slide ${idx + 1}`}
                           />
                           <span style={{ fontSize: 15, fontWeight: 600, color: currentProjectSlide === idx ? "#fff" : "rgba(255,255,255,0.4)", fontFamily: "var(--font-heading)", whiteSpace: "nowrap" }}>
                              0{idx + 1}
                           </span>
                        </div>
                     ))}
                  </div>
              </div>
         </div>
        </div>
      </section>

      {/* ─── 07. WORK PROCESS ─── */}
      <section className="section-pad" style={{ background: "#fff" }}>
         <div style={{ maxWidth: 800 }}>
            <span className="section-label">The Blueprint</span>
            <h2 className="responsive-title" style={{ marginBottom: 40 }}>Our Technical Process</h2>
            <p className="responsive-subtitle" style={{ marginBottom: "clamp(40px, 8vw, 80px)" }}>
               We follow a rigorous, documented workflow to ensure every job meets international marine safety standards.
            </p>
         </div>
         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 }}>
            {[
              { step: "01", title: "Site Audit", desc: "Comprehensive onsite diagnostic using advanced thermal imaging and fluid analysis." },
              { step: "02", title: "Strategy", desc: "Detailed engineering proposal with transparent lead times and spare parts verification." },
              { step: "03", title: "Execution", desc: "Clean-room standard mechanical assembly and precision tuning by certified engineers." },
              { step: "04", title: "Validation", desc: "Sea-trial performance testing and full system calibration before documentation handover." }
            ].map((p, i) => (
              <div key={i} style={{ borderTop: "1px solid #eee", paddingTop: 40 }}>
                 <span style={{ fontSize: 15, fontWeight: 700, color: "var(--accent)", display: "block", marginBottom: 20 }}>PHASE {p.step}</span>
                 <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, fontFamily: "var(--font-heading)" }}>{p.title}</h3>
                 <p style={{ color: "#6b7280", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
         </div>
      </section>

      {/* ─── 07.5 FEATURED SPARES ─── */}
      {dbLoaded && featuredProducts.length > 0 && (
        <section className="section-pad" style={{ background: "#fff", color: "#0b1a2e", paddingTop: 60, marginTop: "-40px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 60, position: "relative" }}>
              <span className="section-label" style={{ color: "var(--accent)" }}>SPARE INVENTORY</span>
              <h2 className="responsive-title" style={{ marginBottom: 16 }}>Featured Spares</h2>
              <p style={{ color: "rgba(11,26,46,0.68)", fontSize: 20, maxWidth: 560, margin: "0 auto", fontFamily: "var(--font-body)" }}>
                Our spares help to reduce downtime and ensure operations run smoothly.
              </p>
              <style>{`
                .featured-product-card {
                  transition: all 0.3s ease;
                  position: relative;
                }
                .featured-product-card::before {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 0;
                  height: 4px;
                  background-color: var(--accent, #155DFC);
                  transition: width 0.3s ease;
                }
                .featured-product-card:hover {
                  transform: translateY(-8px);
                  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
                }
                .featured-product-card:hover::before {
                  width: 100%;
                }
              `}</style>
            </div>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
              gap: 32 
            }}>
              {featuredProducts.map((product, idx) => (
                <div 
                  key={product.id || idx} 
                  className="featured-product-card"
                  style={{ 
                    background: "#fff", 
                    padding: 24, 
                    display: "flex", 
                    flexDirection: "column",
                    border: "1px solid #eee",
                  }}
                >
                  <div style={{ 
                    width: "100%",
                    minHeight: 220,
                    background: "#f8fafc",
                    marginBottom: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px 32px",
                    overflow: "hidden"
                  }}>
                    <img 
                      src={(Array.isArray(product.image) ? product.image[0] : product.image) || "/asset/Landing_page_image/marine_spares.png"} 
                      alt={product.name} 
                      style={{ maxWidth: "100%", maxHeight: 180, objectFit: "contain", display: "block" }}
                    />
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, color: "#0b1a2e", fontFamily: "var(--font-heading)" }}>
                      {product.name}
                    </h3>
                    <p style={{ 
                      fontSize: 15, 
                      color: "#64748b", 
                      lineHeight: 1.6, 
                      marginBottom: 32
                    }}>
                      {product.description}
                    </p>
                    
                    <Link 
                      href={`/shop/${product.id}`}
                      style={{ 
                        background: "#0b1a2e",
                        color: "#fff",
                        padding: "14px 28px",
                        textAlign: "center",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        fontSize: 13,
                        display: "block",
                        width: "100%",
                        marginTop: "auto"
                      }}
                    >
                      BUY SPARE
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 08. TESTIMONIALS ─── */}
      <section className="section-pad" style={{ background: "#F8F9FE" }}>
         <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 80px)" }}>
            <span className="section-label" style={{ color: "var(--accent)" }}>Client Success</span>
            <h2 className="responsive-title">Voice of Excellence</h2>
         </div>
         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 32, maxWidth: 1400, margin: "0 auto" }}>
            {[
              {
                quote: "Stanch Tech has consistently delivered high-fidelity spares even in the most demanding timelines. Their expertise in marine engine salvaging is unmatched.",
                author: "Eloka",
                role: "E.D OPERATIONS | FYMAK MARINE AND OIL SERVICES",
                initial: "E"
              },
              {
                quote: "Their diagnostic precision and routine maintenance programs reduced our engine downtime by over 35%. A truly professional team that understands heavy machinery maintenance.",
                author: "Anozie",
                role: "TECHNICAL MANAGER | FELZ MARINE SERVICES",
                initial: "A"
              },
              {
                quote: "From basic routine maintenance to complex engine overhauls, the experience was seamless. Their technical team consistently ensures our engines run at peak efficiency.",
                author: "Andy",
                role: "MD/CEO | GELOSE MARINE SERVICES LTD",
                initial: "A"
              }
            ].map((t, i) => (
              <div key={i} className="premium-card" style={{ padding: "clamp(32px, 5vw, 60px) clamp(24px, 5vw, 48px)", background: "#fff", display: "flex", flexDirection: "column" }}>
                 <div style={{ display: "flex", gap: 4, marginBottom: 32, color: "#FFB800" }}>
                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                 </div>
                 <p style={{ fontSize: 18, lineHeight: 1.8, color: "var(--navy)", fontStyle: "italic", marginBottom: 48, flex: 1 }}>
                    "{t.quote}"
                 </p>
                 <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--faded-accent)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 20 }}>
                       {t.initial}
                    </div>
                    <div>
                       <h4 style={{ fontSize: 18, fontWeight: 700, margin: 0, fontFamily: "var(--font-heading)" }}>{t.author}</h4>
                       <span style={{ fontSize: 14, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginTop: 4 }}>{t.role}</span>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* ─── 09. FINAL CTA ─── */}
      <section className="section-pad" style={{ 
        background: "#0b1a2e", 
        textAlign: "center", 
        color: "#fff",
        backgroundImage: 'linear-gradient(rgba(11,26,46,0.9), rgba(11,26,46,0.9)), url("/asset/Landing_page_image/support.png")',
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        paddingBottom: "60px"
      }}>
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
         >
           <h2 className="responsive-title" style={{ fontSize: 56, marginBottom: 32, color: "#fff" }}>Ready to Optimize Your Fleet?</h2>
           <p className="responsive-subtitle" style={{ color: "rgba(255,255,255,0.7)", maxWidth: 640, margin: "0 auto 48px" }}>
              Join hundreds of marine operators who trust StanchTech for precision engineering and mission-critical support.
           </p>
           <Link href="/contact" className="hero-btn-primary" style={{ border: "none", width: 240, height: 56, fontSize: 16 }}>
              CONTACT US TODAY
           </Link>
         </motion.div>
      </section>
    </div>
  );
}
