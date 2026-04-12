"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ArrowUpRight, Star, Facebook, Instagram, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/data/products";

const HERO_SLIDES = [
  {
    image: "/asset/Landing page_image/low hour engine.jpeg",
    heading: <></>
  },
  {
    image: "/asset/Landing page_image/vessel.png",
    heading: <></>
  },
  {
    image: "/asset/Landing page_image/marine_control_black.png",
    heading: <></>
  },
  {
    image: "/asset/Landing page_image/marine_spares.png",
    heading: <></>
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [exitSlide, setExitSlide] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        setExitSlide(prev);
        return (prev + 1) % HERO_SLIDES.length;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => {
    setExitSlide(prev);
    return (prev + 1) % HERO_SLIDES.length;
  });
  const prevSlide = () => setCurrentSlide((prev) => {
    setExitSlide(prev);
    return (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
  });

  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ─── HERO ─── */}
      <section style={{
        position: "relative",
        height: "85vh",
        minHeight: 650,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        overflow: "hidden",
      }}>
        {/* Dark overlay */}
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          background: "rgba(0,0,0,0.65)", 
          transition: "background 0.9s ease-in-out",
          zIndex: 5
        }} />
        {/* Background image slider */}
        {HERO_SLIDES.map((slide, index) => {
          const isCurrent = index === currentSlide;
          const isExit    = index === exitSlide;
          return (
            <img
              key={slide.image}
              src={slide.image}
              alt="Stanch Tech Marine"
              onTransitionEnd={() => { if (isExit) setExitSlide(null); }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                transform: "scale(1.15)",
                zIndex: isExit ? 2 : isCurrent ? 1 : 0,
                opacity: isExit ? 0 : 1,
                transition: isExit ? "opacity 0.9s ease-in-out" : "none",
              }}
            />
          );
        })}

        {/* Content */}
        <div className="hero-content-wrapper" style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: 900, width: "100%" }}>
          <h1 className="hero-headline" style={{ color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", fontWeight: 800, fontFamily: "'Neue Machina', sans-serif", letterSpacing: "-0.01em", lineHeight: 0.9 }}>
            <span style={{ display: "block", whiteSpace: "nowrap" }}>Next-Level Marine &amp;</span>
            <span style={{ display: "block", whiteSpace: "nowrap" }}>Industrial Maintenance</span>
          </h1>
          <p className="hero-description" style={{
            color: "rgba(255,255,255,0.9)",
            fontFamily: "'Neue Machina', sans-serif",
            fontSize: "clamp(18px, 1.8vw, 22px)",
            maxWidth: 700,
            lineHeight: 1.6,
            fontWeight: 300,
          }}>
            Maintenance is not just about fixing problems, it's about<br className="hide-mobile" /> preventing them before they occur.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="hero-btn-primary">
              Request Service
            </Link>
            <Link href="/shop?view=catalogue" target="_blank" className="hero-btn-secondary" style={{ border: "2.5px solid #ffffff !important", borderColor: "#ffffff !important" }}>
              View Inventory <ArrowUpRight size={18} strokeWidth={2} />
            </Link>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 44 }}>
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{ 
                  display: "inline-block", 
                  width: 32, 
                  height: 3, 
                  background: index === currentSlide ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.18)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                  borderRadius: 1
                }}
              />
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button onClick={prevSlide} aria-label="Previous slide" className="slider-arrow" style={{ position: "absolute", left: 28, top: "50%", zIndex: 12 }}>
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <button onClick={nextSlide} aria-label="Next slide" className="slider-arrow" style={{ position: "absolute", right: 28, top: "50%", zIndex: 12 }}>
          <ChevronRight size={24} strokeWidth={2.5} />
        </button>
      </section>

      <section style={{ 
        background: "rgba(194, 217, 234, 0.34)", 
        color: "#0b1a2e", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "flex-start",
        paddingTop: "140px",
        paddingBottom: "200px"
      }}>
        {/* ─── CORE BUSINESS AREAS ─── */}
        <div style={{ textAlign: "center", padding: "0 5% 100px" }}>
          <h2 className="responsive-title" style={{ fontWeight: 900, marginBottom: 14, letterSpacing: "-0.02em", color: "#0b1a2e", fontFamily: "'Neue Machina', sans-serif" }}>
            Core Business Areas
          </h2>
          <p className="responsive-subtitle" style={{ color: "rgba(11,26,46,0.78)", maxWidth: 840, margin: "0 auto", fontFamily: "'Darker Grotesque', sans-serif" }}>
            Applying professional technical support to maintain, upgrade and perform on board technical services. We offer our clients a
            wide range of marine and industrial maintenance solutions.
          </p>
        </div>

        {/* ─── CUMMINS ENGINES ─── */}
        <div style={{ overflow: "hidden", padding: "0 5%" }}>
          <div className="two-col-grid marine-control-inner-grid" style={{ gap: 60, alignItems: "center" }}>
            {/* Text LEFT */}
            <div className="order-2 lg:order-1" style={{ maxWidth: 1000 }}>
              <h2 style={{ 
                fontSize: "clamp(32px, 8vw, 65px)", 
                fontWeight: 900, 
                lineHeight: 1.05, 
                letterSpacing: "-0.04em", 
                textTransform: "uppercase",
                display: "flex",
                flexDirection: "column",
                marginBottom: "32px",
                fontFamily: "'Neue Machina', sans-serif",
                color: "#0b1a2e"
              }}>
                <span>Cummins</span>
                <span>Engines</span>
                <span>Maintenance</span>
                <span>&amp; Repair services</span>
              </h2>
              <p className="section-body" style={{ color: "rgba(11,26,46,0.72)", marginBottom: 44, lineHeight: 1.45, fontFamily: "'Darker Grotesque', sans-serif" }}>
                Cummins engine maintenance and repair services ensuring optimal performance, reliability, and extended equipment lifespan through expert diagnostics and quality servicing.
              </p>
              <Link
                href="/contact"
                className="hero-btn-primary"
              >
                Request Service <ArrowUpRight size={18} strokeWidth={2} />
              </Link>
            </div>
            {/* Image RIGHT */}
            <div className="order-1 lg:order-2" style={{ height: "600px", overflow: "hidden", position: "relative", borderRadius: "15px", width: "100%" }}>
              <img 
                src="/asset/Landing page_image/Cummins.png" 
                alt="Cummins Engines Maintenance" 
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", mixBlendMode: "multiply", borderRadius: "15px" }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARINE VESSEL INSPECTION ─── */}
      <section style={{ background: "#FFFFFF", color: "#0b1a2e", minHeight: "884px", display: "flex", alignItems: "center", padding: "120px 5%" }}>
        <div className="two-col-grid" style={{ gap: 60, alignItems: "center", maxWidth: 1400, gridTemplateColumns: "1.15fr 1fr" }}>
          {/* Image LEFT - Vessel Presentation */}
          <div style={{ height: "600px", overflow: "hidden", position: "relative", borderRadius: "15px", width: "100%" }}>
            <img 
              src="/asset/Landing page_image/vessel.png" 
              alt="Marine Vessel Inspection" 
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", borderRadius: "15px" }} 
            />
          </div>
          {/* Text RIGHT */}
          <div style={{ maxWidth: 740 }}>
            <h2 style={{ 
              fontSize: "clamp(32px, 8vw, 65px)", 
              fontWeight: 900,
              fontFamily: "'Neue Machina', sans-serif",
              lineHeight: 1.05, 
              letterSpacing: "-0.04em", 
              textTransform: "uppercase",
              marginBottom: "64px",
              display: "flex",
              flexDirection: "column"
            }}>
              <span>Vessel Inspection,</span>
              <span>Maintenance</span>
              <span>&amp; Repairs.</span>
            </h2>
            <p className="section-body" style={{ color: "rgba(11,26,46,0.72)", marginBottom: 44, lineHeight: 1.45, fontFamily: "'Darker Grotesque', sans-serif" }}>
              Ensure vessel safety and performance through thorough inspection, routine maintenance, and reliable repairs. We prevent breakdowns and keep operations running smoothly.
            </p>
            <Link
              href="/contact"
              className="hero-btn-primary"
            >
              Request Service <ArrowUpRight size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SPARES & SUPPORT ─── */}
      <section style={{ background: "rgba(194, 217, 234, 0.34)", color: "#0b1a2e", minHeight: "903px", display: "flex", alignItems: "center", padding: "120px 5%" }}>
        <div className="two-col-grid" style={{ gap: 60, maxWidth: 1400, gridTemplateColumns: "1.1fr 1.15fr" }}>
          {/* Text LEFT */}
          <div className="order-2 lg:order-1" style={{ maxWidth: 840 }}>
            <h2 style={{ 
              fontSize: "clamp(32px, 8vw, 65px)", 
              fontWeight: 900,
              fontFamily: "'Neue Machina', sans-serif",
              lineHeight: 1.05, 
              letterSpacing: "-0.04em", 
              textTransform: "uppercase",
              marginBottom: "64px",
              display: "flex",
              flexDirection: "column"
            }}>
              <span>Sales of</span>
              <span>Genuine</span>
              <span>Cummins Engine</span>
              <span>Spares parts</span>
            </h2>
            <p className="section-body" style={{ color: "rgba(11,26,46,0.72)", marginBottom: 44, lineHeight: 1.45, fontFamily: "'Darker Grotesque', sans-serif" }}>
              We Provide quality spares and expert technical support for marine and industrial operations. We ensure fast delivery, reliable solutions, and minimal downtime across all systems.
            </p>
            <Link
              href="/shop?view=catalogue"
              target="_blank"
              className="hero-btn-primary"
            >
              View Inventory <ArrowUpRight size={18} strokeWidth={2} />
            </Link>
          </div>
          {/* Image RIGHT - Industrial Spares Mastery */}
          <div className="order-1 lg:order-2" style={{ height: "600px", overflow: "hidden", position: "relative", borderRadius: "15px", width: "100%" }}>
            <img 
              src="/asset/Landing page_image/marine_spares.png" 
              alt="Professional Marine and Industrial Spares" 
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "15px" }}
            />
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="section-pad" style={{ 
        backgroundImage: 'url("/asset/product_card.png")', 
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#0b1a2e", 
        position: "relative",
        paddingTop: 60
      }}>
        {/* Header */}
        <div className="fp-header section-header-flex" style={{ maxWidth: 1400, margin: "0 auto 40px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: 0 }}>
          <div style={{ maxWidth: 880 }}>
            <h2 className="responsive-title" style={{ fontSize: "clamp(28px, 6vw, 42px)", fontWeight: 900, letterSpacing: "-0.03em", textTransform: "none", lineHeight: 1.05, marginBottom: 8 }}>
              Featured products
            </h2>
            <p className="responsive-subtitle" style={{ fontSize: "clamp(16px, 4vw, 20px)", color: "rgba(11,26,46,0.72)", fontWeight: 700, fontFamily: "'Darker Grotesque', sans-serif" }}>
              Our products help to reduce downtime and ensure operations run smoothly.
            </p>
          </div>
          {/* Button aligned to the RIGHT within the 1400px container */}
          <Link
            href="/shop?view=catalogue"
            target="_blank"
            className="hero-btn-secondary responsive-btn-center no-caps"
            style={{ 
              background: "transparent", 
              border: "1px solid #0b1a2e", 
              color: "#0b1a2e", 
              padding: "16px 36px",
              marginTop: 24,
            }}
          >
            Explore Full catalog <ArrowUpRight size={18} strokeWidth={2} />
          </Link>
        </div>

        {/* Cards - Sophisticated Tech Presentation */}
        <div className="products-grid" style={{ maxWidth: 1400, margin: "0 auto", gap: 32, position: "relative" }}>
          {/* Card 1 */}
          <div className="product-item-card" style={{ 
            position: "relative",
            background: "rgba(200, 212, 222, 0.5)",
            overflow: "hidden"
          }}>
            {/* Left Image Area (The 'White Card') */}
            <div style={{ flex: "0 0 340px", display: "flex", alignItems: "center", justifyContent: "center", padding: "30px", background: "transparent" }}>
              <img 
                src={PRODUCTS[1].image} 
                alt={PRODUCTS[1].name} 
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            {/* Right Specs Area */}
            <div style={{ flex: 1, background: "#0b1a2e", padding: "25px 44px 55px 44px", color: "#fff", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", textAlign: "left" }}>
              <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 16, letterSpacing: "-0.02em", fontFamily: "'Neue Machina', sans-serif" }}>{PRODUCTS[1].name}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                <li style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.72)", textAlign: "left", whiteSpace: "nowrap", fontFamily: "'Darker Grotesque', sans-serif" }}>• High-Pressure Performance</li>
                <li style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.72)", textAlign: "left", whiteSpace: "nowrap", fontFamily: "'Darker Grotesque', sans-serif" }}>• Saltwater Corrosion Resistant</li>
                <li style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.72)", textAlign: "left", whiteSpace: "nowrap", fontFamily: "'Darker Grotesque', sans-serif" }}>• 24-Month Active Warranty</li>
              </ul>
              <Link href={`/shop/${PRODUCTS[1].id}`} className="hero-btn-secondary no-caps" style={{ width: "fit-content", background: "transparent", border: "1px solid #fff", color: "#fff", padding: "10px 24px", whiteSpace: "nowrap" }}>
                Explore Product <ArrowUpRight size={13} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="product-item-card" style={{ 
            position: "relative",
            background: "rgba(200, 212, 222, 0.5)",
            overflow: "hidden"
          }}>
            {/* Left Image Area (The 'White Card') */}
            <div style={{ flex: "0 0 340px", display: "flex", alignItems: "center", justifyContent: "center", padding: "30px", background: "transparent" }}>
              <img 
                src={PRODUCTS[0].image} 
                alt={PRODUCTS[0].name} 
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            {/* Right Specs Area */}
            <div style={{ flex: 1, background: "#105C7A", padding: "25px 44px 55px 44px", color: "#fff", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", textAlign: "left" }}>
              <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 16, letterSpacing: "-0.02em", fontFamily: "'Neue Machina', sans-serif" }}>{PRODUCTS[0].name}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                <li style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.72)", textAlign: "left", whiteSpace: "nowrap", fontFamily: "'Darker Grotesque', sans-serif" }}>• Ultra-Fine Fuel Atomization</li>
                <li style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.72)", textAlign: "left", whiteSpace: "nowrap", fontFamily: "'Darker Grotesque', sans-serif" }}>• OEM Grade Compatibility</li>
                <li style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.72)", textAlign: "left", whiteSpace: "nowrap", fontFamily: "'Darker Grotesque', sans-serif" }}>• Optimized Fuel Efficiency</li>
              </ul>
              <Link href={`/shop/${PRODUCTS[0].id}`} className="hero-btn-secondary no-caps" style={{ width: "fit-content", background: "transparent", border: "1px solid #fff", color: "#fff", padding: "10px 24px", whiteSpace: "nowrap" }}>
                Explore Product <ArrowUpRight size={13} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section-pad" style={{ background: "#f8fafc", color: "#0b1a2e", overflow: "hidden" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          {/* Header - Minimalist Pattern */}
          <div className="hq-header section-header-flex" style={{ maxWidth: 1400, margin: "0 auto 80px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", textAlign: "left" }}>
            <div style={{ maxWidth: 880 }}>
              <span style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.45em", textTransform: "uppercase", color: "#2563eb", marginBottom: 20, opacity: 0.8 }}>
                Trust in Precision
              </span>
              <h2 className="responsive-title" style={{ fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, textTransform: "none", marginBottom: 28 }}>
                Built on Trust, Driven by <br />
                <span style={{ fontStyle: "italic", fontWeight: 300, color: "#c8d0da", fontFamily: "var(--font-serif, Georgia, serif)" }}>Engineering Excellence.</span>
              </h2>
              <p className="responsive-subtitle" style={{ color: "rgba(11,26,46,0.65)", fontWeight: 700, marginBottom: 40, fontFamily: "'Darker Grotesque', sans-serif" }}>
                Our commitment to excellence is reflected in the success stories and technical milestones achieved alongside our partners.
              </p>
            </div>
            <Link
              href="/contact"
              className="hero-btn-secondary no-caps"
              style={{
                border: "1px solid #0b1a2e",
                color: "#0b1a2e",
                padding: "16px 36px",
                background: "transparent",
                marginBottom: 8,
                flexShrink: 0,
                marginTop: 60
              }}
            >
              Partner with us <ArrowUpRight size={18} strokeWidth={2} />
            </Link>
          </div>

          {/* Testimonials Grid - Cinematic Entry Motion */}
          <div className="testi-grid testi-board-animation" style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: 32 
          }}>
            {[
              { 
                name: "Eloka", 
                role: "E.D Operations", 
                company: "Fymak marine and oil services", 
                initial: "E", 
                quote: "Stanch Tech has consistently delivered high-fidelity spares even in the most demanding timelines. Their expertise in marine engine salvaging is unmatched." 
              },
              { 
                name: "Anozie", 
                role: "Technical Manager", 
                company: "Felz Marine services", 
                initial: "A", 
                quote: "Their diagnostic precision and routine maintenance programs reduced our engine downtime by over 35%. A truly professional team that understands heavy machinery maintenance." 
              },
              { 
                name: "Andy", 
                role: "MD/CEO", 
                company: "Gelose Marine Services Ltd", 
                initial: "A", 
                quote: "From basic routine maintenance to complex engine overhauls, the experience was seamless. Their technical team consistently ensures our engines run at peak efficiency." 
              }
            ].map((t, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
                style={{ 
                  background: "#fff", 
                  padding: "44px", 
                  borderRadius: 24, 
                  border: "1px solid #e2e8f0", 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "space-between",
                  minHeight: 380,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.03)"
                }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
              >
                <div>
                  <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#fbbf24" stroke="#fbbf24" />)}
                  </div>
                  <p style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.55, color: "#0b1a2e", fontStyle: "italic", marginBottom: 32, letterSpacing: "-0.01em", fontFamily: "'Darker Grotesque', sans-serif" }}>
                    "{t.quote}"
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: "#0b1a2e" }}>
                    {t.initial}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p style={{ fontSize: 16, fontWeight: 900, color: "#0b1a2e", marginBottom: 2 }}>{t.name}</p>
                    <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(11,26,46,0.55)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {t.role} <span style={{ opacity: 0.5 }}>|</span> {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
