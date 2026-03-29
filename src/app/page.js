"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ArrowUpRight, Star, Facebook, Instagram, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const HERO_SLIDES = [
  {
    image: "/asset/about_image/low%20hour%20engine.jpeg",
    heading: <></>
  },
  {
    image: "/asset/hero/marine_vessel_black.png",
    heading: <></>
  },
  {
    image: "/asset/hero/marine_control_black.png",
    heading: <></>
  },
  {
    image: "/asset/hero/marine_spares.png",
    heading: <></>
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ─── HERO ─── */}
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
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)", zIndex: 1 }} />
        
        {/* Background image slider */}
        {HERO_SLIDES.map((slide, index) => (
          <img
            key={slide.image}
            src={slide.image}
            alt="Stanch Tech Marine"
            style={{ 
              position: "absolute", 
              inset: 0, 
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              objectPosition: "center",
              transform: "scale(1.15)", // Increased scale to ensure full coverage left and right 
              opacity: index === currentSlide ? 1 : 0,
              transition: "opacity 1s ease-in-out"
            }}
          />
        ))}

        {/* Content */}
        <div className="hero-content-wrapper" style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", maxWidth: 900, width: "100%" }}>
          {/* Static big headline */}
          <h1 className="hero-headline" style={{
            color: "#fff",
          }}>
            Next-Level Marine &amp;<br />Industrial Maintenance
          </h1>
          <p className="hero-description" style={{
            color: "rgba(255,255,255,0.9)",
            fontFamily: "'Bai Jamjuree', sans-serif",
            fontSize: "clamp(18px, 1.8vw, 22px)",
            maxWidth: 700,
            lineHeight: 1.6,
            fontWeight: 500,
          }}>
            Maintenance is not just about fixing problems, it’s about<br className="hide-mobile" /> preventing them before they occur.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              className="hero-btn-primary"
            >
              Request Service
            </Link>
            <Link
              href="#"
              className="hero-btn-secondary"
              style={{ border: "2.5px solid #ffffff !important", borderColor: "#ffffff !important" }}
            >
              View Inventory <ArrowUpRight size={18} strokeWidth={2} />
            </Link>
          </div>

          {/* Dots as thin boxes */}
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

        {/* Arrows as sophisticated boxes */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="slider-arrow"
          style={{ position: "absolute", left: 28, top: "50%", zIndex: 3 }}
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="slider-arrow"
          style={{ position: "absolute", right: 28, top: "50%", zIndex: 3 }}
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </button>
      </section>

      {/* ─── CORE BUSINESS AREAS ─── */}
      <section className="section-pad" style={{ background: "#0b1a2e", color: "#fff", textAlign: "center", paddingTop: 80, paddingBottom: 80 }}>
        <h2 className="responsive-title" style={{ fontWeight: 800, marginBottom: 14, letterSpacing: "-0.01em" }}>
          Core Business Areas
        </h2>
        <p className="responsive-subtitle" style={{ color: "rgba(255,255,255,0.78)", maxWidth: 840, margin: "0 auto" }}>
          Applying professional technical support to maintain, upgrade and perform on board technical services. We offer our clients a
          wide range of marine and industrial maintenance solutions.
        </p>
      </section>

      {/* ─── MARINE CONTROL ─── */}
      <section className="section-pad" style={{ background: "#0b1a2e", color: "#fff" }}>
        <div className="two-col-grid" style={{ gap: 60, maxWidth: 1400 }}>
          {/* Text LEFT */}
          <div style={{ maxWidth: 740 }}>
            <h2 className="massive-headline" style={{ lineHeight: 1.25, letterSpacing: "0.03em", marginBottom: "64px" }}>
              Marine Control, Monitoring, <br/>
              Navigation &amp; Communication <br/>
              Systems.
            </h2>
            <p className="section-body" style={{ color: "rgba(255,255,255,0.72)", marginBottom: 44, lineHeight: 1.45 }}>
              Precision Control and advanced marine systems maintenance to ensure your vessels run safely and efficiently.
            </p>
            <Link
              href="/contact"
              className="hero-btn-primary"
            >
              Request Service <ArrowUpRight size={18} strokeWidth={2} />
            </Link>
          </div>
          {/* Image RIGHT - Vessel Exterior & Diverse Team */}
          <div className="adaptive-image-container">
            <img 
              src="/asset/services_image/diverse_vessel_technical.png" 
              alt="Marine Technical Services on Vessel" 
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
            />
          </div>
        </div>
      </section>

      {/* ─── MARINE VESSEL INSPECTION ─── */}
      <section className="section-pad" style={{ background: "#96C3E4", color: "#0b1a2e" }}>
        <div className="two-col-grid" style={{ gap: 60, maxWidth: 1400 }}>
          {/* Image LEFT - Vessel Presentation */}
          <div className="adaptive-image-container">
            <img 
              src="/asset/vessel_image.jpg" 
              alt="Marine Vessel Inspection" 
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 60%", display: "block" }} 
            />
          </div>
          {/* Text RIGHT */}
          <div style={{ maxWidth: 740 }}>
            <h2 className="massive-headline" style={{ lineHeight: 1.25, letterSpacing: "0.03em", marginBottom: "64px" }}>
              Vessel Inspection, Maintenance &amp; Repairs.
            </h2>
            <p className="section-body" style={{ color: "rgba(11,26,46,0.72)", marginBottom: 44, lineHeight: 1.45 }}>
              Comprehensive sea vessel maintenance and through-life support for all specialized marine operations, ensuring reliability and safety at all times.
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
      <section className="section-pad" style={{ background: "#fafafa", color: "#0b1a2e" }}>
        <div className="two-col-grid" style={{ gap: 60, maxWidth: 1400 }}>
          {/* Text LEFT */}
          <div style={{ maxWidth: 740 }}>
            <h2 className="massive-headline" style={{ lineHeight: 1.25, letterSpacing: "0.03em", marginBottom: "64px" }}>
              Spares &amp; Support<br />
              for marine and industrial<br />
              systems.
            </h2>
            <p className="section-body" style={{ color: "rgba(11,26,46,0.72)", marginBottom: 44, lineHeight: 1.45 }}>
              Premium quality spares and expert technical support for marine and industrial operations this include sales and installation.
            </p>
            <Link
              href="#"
              className="hero-btn-primary"
            >
              View Inventory <ArrowUpRight size={18} strokeWidth={2} />
            </Link>
          </div>
          {/* Image RIGHT - Industrial Spares Mastery */}
          <div className="adaptive-image-container">
            <img 
              src="/asset/hero/marine_spares.png" 
              alt="Professional Marine and Industrial Spares" 
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
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
            <h2 className="responsive-title" style={{ fontWeight: 900, letterSpacing: "-0.03em", textTransform: "none", lineHeight: 1.05, marginBottom: 8 }}>
              Featured products
            </h2>
            <p className="responsive-subtitle" style={{ color: "rgba(11,26,46,0.72)", fontWeight: 700 }}>
              Our products help to reduce downtime and ensure operations run smoothly.
            </p>
          </div>
          {/* Button aligned to the RIGHT within the 1400px container */}
          <Link
            href="#"
            className="hero-btn-secondary responsive-btn-center"
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
            background: "#fff",
            overflow: "hidden"
          }}>
            {/* Left Image Area (The 'White Card') */}
            <div style={{ flex: "0 0 340px", display: "flex", alignItems: "center", justifyContent: "center", padding: "30px", background: "#fff" }}>
              <img 
                src="/asset/spare_parts/part2.png" 
                alt="Precision Marine Turbo" 
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            {/* Right Specs Area */}
            <div style={{ flex: 1, background: "#0b1a2e", padding: "25px 44px 55px 44px", color: "#fff", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", textAlign: "left" }}>
              <h3 style={{ fontSize: 28, fontWeight: 900, marginBottom: 16, letterSpacing: "-0.02em" }}>Precision Marine Turbo</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                <li style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.72)", textAlign: "left", whiteSpace: "nowrap" }}>• High-Pressure Performance</li>
                <li style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.72)", textAlign: "left", whiteSpace: "nowrap" }}>• Saltwater Corrosion Resistant</li>
                <li style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.72)", textAlign: "left", whiteSpace: "nowrap" }}>• 24-Month Active Warranty</li>
              </ul>
              <Link href="#" className="hero-btn-secondary" style={{ width: "fit-content", background: "transparent", border: "1px solid #fff", color: "#fff", padding: "10px 24px", fontSize: 13, whiteSpace: "nowrap" }}>
                Explore Product <ArrowUpRight size={13} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="product-item-card" style={{ 
            position: "relative",
            background: "#fff",
            overflow: "hidden"
          }}>
            {/* Left Image Area (The 'White Card') */}
            <div style={{ flex: "0 0 340px", display: "flex", alignItems: "center", justifyContent: "center", padding: "30px", background: "#fff" }}>
              <img 
                src="/asset/spare_parts/Part3.png" 
                alt="Advanced Fuel Injector" 
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            {/* Right Specs Area */}
            <div style={{ flex: 1, background: "#0b1a2e", padding: "25px 44px 55px 44px", color: "#fff", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", textAlign: "left" }}>
              <h3 style={{ fontSize: 28, fontWeight: 900, marginBottom: 16, letterSpacing: "-0.02em" }}>Advanced Fuel Injector</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                <li style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.72)", textAlign: "left", whiteSpace: "nowrap" }}>• Ultra-Fine Fuel Atomization</li>
                <li style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.72)", textAlign: "left", whiteSpace: "nowrap" }}>• OEM Grade Compatibility</li>
                <li style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.72)", textAlign: "left", whiteSpace: "nowrap" }}>• Optimized Fuel Efficiency</li>
              </ul>
              <Link href="#" className="hero-btn-secondary" style={{ width: "fit-content", background: "transparent", border: "1px solid #fff", color: "#fff", padding: "10px 24px", fontSize: 13, whiteSpace: "nowrap" }}>
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
              <p className="responsive-subtitle" style={{ color: "rgba(11,26,46,0.65)", fontWeight: 700, marginBottom: 40 }}>
                Our commitment to excellence is reflected in the success stories and technical milestones achieved alongside our partners.
              </p>
            </div>
            <Link
              href="/contact"
              className="hero-btn-secondary"
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
              { name: "David Oke", initial: "D", quote: "Stanch Tech has consistently delivered high-fidelity spares even in the most demanding timelines. Their expertise in marine engine salvaging is unmatched." },
              { name: "Sarah Ahmed", initial: "S", quote: "The diagnostic precision with their systems reduced our downtime by over 35%. A truly professional team that understands marine logistics." },
              { name: "Mike Odunsi", initial: "M", quote: "From inspection to final installation, the experience was seamless. Their technical team provides real peace of mind for our offshore assets." }
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
                  <p style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.55, color: "#0b1a2e", fontStyle: "italic", marginBottom: 32, letterSpacing: "-0.01em" }}>
                    "{t.quote}"
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: "#0b1a2e" }}>
                    {t.initial}
                  </div>
                  <p style={{ fontSize: 20, fontWeight: 900, color: "#0b1a2e" }}>{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
