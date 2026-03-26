"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ArrowUpRight, Star, Facebook, Instagram, MessageCircle } from "lucide-react";

const HERO_SLIDES = [
  {
    image: "/asset/about_image/low hour engine.jpeg",
    heading: <>A Low Hour Engine that has been extensively salvaged by the <br className="hide-mobile" />effects of Marine Age.</>
  },
  {
    image: "/asset/hero/marine_vessel_black.png",
    heading: <>Comprehensive Marine Vessel Inspection <br className="hide-mobile" />and Lifetime Repair Support.</>
  },
  {
    image: "/asset/hero/marine_control_black.png",
    heading: <>Advanced Marine Control, Monitoring <br className="hide-mobile" />&amp; Navigation Systems.</>
  },
  {
    image: "/asset/hero/marine_spares.png",
    heading: <>Spares &amp; Technical Support for marine <br className="hide-mobile" />and industrial systems.</>
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
        height: "80vh",
        minHeight: 500,
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
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", maxWidth: 900, width: "100%", transform: "translateY(120px)" }}>
          <div style={{ position: "relative", height: 100, marginBottom: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {HERO_SLIDES.map((slide, index) => (
              <h1 
                key={index}
                style={{
                  position: "absolute",
                  width: "100%",
                  padding: "0 12vw",
                  boxSizing: "border-box",
                  fontSize: 34,
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  fontFamily: "var(--font-sans, system-ui, sans-serif)",
                  opacity: index === currentSlide ? 1 : 0,
                  transition: "opacity 0.8s ease-in-out",
                  pointerEvents: index === currentSlide ? "auto" : "none"
              }}>
                {slide.heading}
              </h1>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              className="hero-btn-primary"
            >
              Request Service <ArrowUpRight size={18} strokeWidth={2} />
            </Link>
            <Link
              href="/shop"
              className="hero-btn-secondary"
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
      <section className="section-pad" style={{ background: "#0b1a2e", color: "#fff", textAlign: "center" }}>
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
        <div className="two-col-grid" style={{ gridTemplateColumns: "1.1fr 1fr", gap: 60 }}>
          {/* Text LEFT */}
          <div style={{ maxWidth: 540 }}>
            <h2 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.05, marginBottom: 20, letterSpacing: "-0.03em" }}>
              Marine Control, Monitoring,<br />
              Navigation &amp; Communication<br />
              Systems.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 22, lineHeight: 1.55, marginBottom: 44 }}>
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
          <div style={{ 
            width: "100%", 
            height: 380, 
            borderRadius: 8, 
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0,0,0,0.3)"
          }}>
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
        <div className="two-col-grid" style={{ gridTemplateColumns: "1fr 1.1fr", gap: 60 }}>
          {/* Image LEFT - Vessel Presentation */}
          <div style={{ 
            width: "100%", 
            height: 380, 
            borderRadius: 8, 
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0,0,0,0.15)"
          }}>
            <img 
              src="/asset/vessel_image.jpg" 
              alt="Marine Vessel Inspection" 
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "bottom", display: "block" }} 
            />
          </div>
          {/* Text RIGHT */}
          <div style={{ maxWidth: 620 }}>
            <h2 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.05, marginBottom: 20, letterSpacing: "-0.03em" }}>
              Marine Vessel Inspection,<br />
              Maintenance &amp; Repairs.
            </h2>
            <p style={{ color: "rgba(11,26,46,0.72)", fontSize: 22, lineHeight: 1.55, marginBottom: 44 }}>
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
        <div className="two-col-grid" style={{ gridTemplateColumns: "1.1fr 1fr", gap: 60 }}>
          {/* Text LEFT */}
          <div style={{ maxWidth: 620 }}>
            <h2 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.05, marginBottom: 20, letterSpacing: "-0.03em" }}>
              Spares &amp; Support for marine<br />
              and industrial<br />
              systems.
            </h2>
            <p style={{ color: "rgba(11,26,46,0.72)", fontSize: 22, lineHeight: 1.55, marginBottom: 44 }}>
              Premium quality spares and expert technical support for marine and industrial operations. Direct sales and installation.
            </p>
            <Link
              href="/shop"
              className="hero-btn-primary"
            >
              View Inventory <ArrowUpRight size={18} strokeWidth={2} />
            </Link>
          </div>
          {/* Image RIGHT - Industrial Spares Mastery */}
          <div style={{ 
            width: "100%", 
            height: 380, 
            borderRadius: 8, 
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0,0,0,0.12)"
          }}>
            <img 
              src="/asset/hero/marine_spares.png" 
              alt="Professional Marine and Industrial Spares" 
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
        position: "relative"
      }}>
        {/* Header */}
        <div className="fp-header section-header-flex" style={{ maxWidth: 1400, margin: "0 auto 80px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ maxWidth: 880 }}>
            <h2 className="responsive-title" style={{ fontWeight: 900, letterSpacing: "-0.03em", textTransform: "none", lineHeight: 1.05, marginBottom: 20 }}>
              Featured products
            </h2>
            <p className="responsive-subtitle" style={{ color: "rgba(11,26,46,0.72)", fontWeight: 700 }}>
              Our products help to reduce downtime and ensure operations run smoothly.
            </p>
          </div>
          {/* Button aligned to the RIGHT within the 1400px container */}
          <Link
            href="/shop"
            className="hero-btn-secondary"
            style={{ 
              background: "transparent", 
              border: "1px solid #0b1a2e", 
              color: "#0b1a2e", 
              padding: "16px 36px",
              marginTop: 60,
              alignSelf: "flex-end"
            }}
          >
            Explore Full catalog <ArrowUpRight size={18} strokeWidth={2} />
          </Link>
        </div>

        {/* Cards - Sophisticated Tech Presentation */}
        <div className="products-grid" style={{ maxWidth: 1400, margin: "0 auto", gap: 32, position: "relative" }}>
          {/* Card 1 */}
          <div className="product-item-card" style={{ 
            backgroundImage: 'url("/asset/card 1.png")', 
            backgroundSize: "cover", 
            position: "relative"
          }}>
            {/* Left Image Area */}
            <div style={{ flex: "0 0 292px", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "20px 40px 60px", background: "#fff" }}>
            </div>
            {/* Right Specs Area */}
            <div style={{ flex: 1, background: "#0b1a2e", padding: "25px 44px 75px", color: "#fff", display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12, letterSpacing: "-0.02em" }}>Precision Marine Turbo</h3>
              <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 28 }}>ST-ENGINEERING SERIES</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                <li style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.72)" }}>• High-Pressure Performance</li>
                <li style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.72)" }}>• Saltwater Corrosion Resistant</li>
                <li style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.72)" }}>• 24-Month Active Warranty</li>
              </ul>
              <Link href="/shop" className="hero-btn-secondary" style={{ width: "fit-content", background: "transparent", border: "1px solid #fff", color: "#fff", padding: "10px 24px", fontSize: 12 }}>
                Explore Product <ArrowUpRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="product-item-card" style={{ 
            backgroundImage: 'url("/asset/card 2.png")', 
            backgroundSize: "cover", 
            position: "relative"
          }}>
            {/* Left Image Area */}
            <div style={{ flex: "0 0 292px", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "20px 40px 60px", background: "#fff" }}>
            </div>
            {/* Right Specs Area */}
            <div style={{ flex: 1, background: "#0b1a2e", padding: "25px 44px 75px", color: "#fff", display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12, letterSpacing: "-0.02em" }}>Advanced Fuel Injector</h3>
              <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 28 }}>ST-PRECISION SERIES</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                <li style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.72)" }}>• Ultra-Fine Fuel Atomization</li>
                <li style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.72)" }}>• OEM Grade Compatibility</li>
                <li style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.72)" }}>• Optimized Fuel Efficiency</li>
              </ul>
              <Link href="/shop" className="hero-btn-secondary" style={{ width: "fit-content", background: "transparent", border: "1px solid #fff", color: "#fff", padding: "10px 24px", fontSize: 12 }}>
                Explore Product <ArrowUpRight size={14} strokeWidth={2.5} />
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
                The Voice of our <br />
                global <span style={{ fontStyle: "italic", fontWeight: 300, color: "#c8d0da", fontFamily: "var(--font-serif, Georgia, serif)" }}>partnership network.</span>
              </h2>
              <p className="responsive-subtitle" style={{ color: "rgba(11,26,46,0.65)", fontWeight: 700 }}>
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
                flexShrink: 0
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
              <div key={idx} style={{ 
                background: "#fff", 
                padding: "44px", 
                borderRadius: 24, 
                border: "1px solid #e2e8f0", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between",
                minHeight: 380,
                boxShadow: "none"
              }}>
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
