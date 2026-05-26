"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, Calendar, MapPin, User, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "Marine Maintenance", "Industrial Services", "Engine Overhaul"];

const PROJECTS = [
  {
    id: 1,
    title: "Vessel Engine Overhaul",
    category: "Engine Overhaul",
    location: "Lagos Port, Nigeria",
    date: "March 2024",
    client: "Fymak Marine",
    description: "Complete overhaul and performance optimization of a Caterpillar C32 marine engine for a high-traffic tugboat fleet. We achieved 100% restored power output and reduced idle fuel consumption by 12%.",
    image: "/asset/Landing_page_image/low_hour_engine.jpeg"
  },
  {
    id: 2,
    title: "Industrial Spares Logistics",
    category: "Industrial Services",
    location: "Onne Free Zone",
    date: "January 2024",
    client: "Global Offshore",
    description: "Managed the supply and installation of essential Cummins engine components for an offshore drilling platform under tight deadlines, ensuring zero downtime during critical operations.",
    image: "/asset/Landing_page_image/marine_spares.png"
  },
  {
    id: 3,
    title: "Skyline Main Harbor Inspection",
    category: "Marine Maintenance",
    location: "Port Harcourt",
    date: "November 2023",
    client: "Felz Marine",
    description: "Comprehensive inspection and routine maintenance for a fleet of five cargo vessels, preventing potential mechanical failures through predictive diagnostics and expert calibration.",
    image: "/asset/Landing_page_image/support.png"
  },
  {
    id: 4,
    title: "Pacific Trade Hub Restoration",
    category: "Industrial Services",
    location: "Apapa Harbor",
    date: "October 2023",
    client: "Gelose Marine",
    description: "Full restoration of industrial cooling systems and auxiliary power generators for a major port logistics hub, significantly increasing operational efficiency.",
    image: "/asset/Landing_page_image/vessel.png"
  },
  {
    id: 5,
    title: "GreenTower Generator Upgrade",
    category: "Industrial Services",
    location: "Victoria Island",
    date: "August 2023",
    client: "Tower Corp",
    description: "Installation and programming of advanced remote monitoring systems for multi-megawatt backup generator sets in prime office locations.",
    image: "/asset/Landing_page_image/cummin_engine.png"
  },
  {
    id: 6,
    title: "DeepSea Platform Maintenance",
    category: "Marine Maintenance",
    location: "Nile Delta Block",
    date: "June 2023",
    client: "Hydro Resources",
    description: "Scheduled deep-water structural inspections and localized engine room repairs for an active oil recovery platform, adhering to the highest international safety standards.",
    image: "/asset/Landing_page_image/vessel.png"
  }
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", color: "#0b1a2e", fontFamily: "var(--font-body)" }}>
      {/* ─── HERO ─── */}
      <section style={{ padding: "140px 5% 80px", textAlign: "center", borderBottom: "1px solid #f1f5f9" }}>
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            fontSize: 15, 
            fontWeight: 800, 
            letterSpacing: "0.2em", 
            textTransform: "uppercase", 
            color: "#6b7280",
            display: "inline-block",
            padding: "4px 12px",
            border: "1px solid #e5e7eb",
            borderRadius: 0,
            marginBottom: 24
          }}
        >
          Our Portfolio
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ 
            fontFamily: "var(--font-heading)", 
            fontSize: "clamp(36px, 6vw, 64px)", 
            fontWeight: 800, 
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 24
          }}
        >
          Expertise That Define <br /> Standards in Marine Works
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ 
            fontSize: 18, 
            color: "#6b7280", 
            maxWidth: 700, 
            margin: "0 auto", 
            lineHeight: 1.6 
          }}
        >
          From high-precision engine overhauls to industrial-scale logistics, explore how Stanch Tech 
          consistently delivers engineering excellence across the marine sector.
        </motion.p>
      </section>

      {/* ─── HIGHLIGHT PROJECT ─── */}
      <section style={{ padding: "80px 5%" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0, borderRadius: 0, overflow: "hidden", background: "#f8fafc", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
             <div style={{ padding: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, borderBottom: "1px solid #e2e8f0" }}>
                <div>
                  <h3 style={{ fontSize: "28px", fontWeight: 800, marginBottom: 8, fontFamily: "var(--font-heading)" }}>Vessel Engine Overhaul</h3>
                  <p style={{ color: "#6b7280", fontSize: 16 }}>Achieved 100% restored power output and reduced fuel consumption by 12% in Lagos Port.</p>
                </div>
                <div style={{ display: "flex", gap: "24px", justifyContent: "flex-end", flexWrap: "wrap" }}>
                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                     <MapPin size={16} color="#2563eb" />
                     <span style={{ fontSize: 15, fontWeight: 600 }}>Lagos, Nigeria</span>
                   </div>
                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                     <Calendar size={16} color="#2563eb" />
                     <span style={{ fontSize: 15, fontWeight: 600 }}>March 2024</span>
                   </div>
                </div>
             </div>
             <div style={{ position: "relative", height: 500 }}>
               <img 
                src="/asset/Landing_page_image/low_hour_engine.jpeg" 
                alt="Main Project" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
               />
               <div style={{ position: "absolute", bottom: "clamp(16px, 4vw, 40px)", left: "clamp(16px, 4vw, 40px)", right: "clamp(16px, 4vw, 40px)", display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", color: "#fff", padding: "clamp(16px, 4vw, 20px) clamp(16px, 4vw, 32px)", borderRadius: 0, maxWidth: 600 }}>
                    <p style={{ fontSize: 16, opacity: 0.8, marginBottom: 8 }}>Highlight Portfolio</p>
                    <h4 style={{ fontSize: "clamp(16px, 4vw, 18px)", fontWeight: 700 }}>Performance optimization of a Caterpillar C32 marine engine for high-traffic fleets.</h4>
                  </div>
                  <Link href={`/projects/${PROJECTS[0].id}`} style={{ 
                    background: "#FFFFFF", 
                    color: "#0b1a2e", 
                    padding: "16px 32px", 
                    borderRadius: 8, 
                    fontWeight: 700, 
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                  }}>
                    See Details <ArrowUpRight size={18} />
                  </Link>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* ─── FILTERS ─── */}
      <section style={{ padding: "clamp(24px, 5vw, 40px) 5%", borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "center", gap: "clamp(8px, 2vw, 16px)", flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "clamp(8px, 2vw, 12px) clamp(16px, 4vw, 32px)",
                borderRadius: 4,
                border: "1px solid",
                borderColor: activeCategory === cat ? "#2563eb" : "#e5e7eb",
                background: activeCategory === cat ? "#2563eb" : "transparent",
                color: activeCategory === cat ? "#fff" : "#6b7280",
                fontWeight: 600,
                fontSize: "clamp(13px, 3vw, 15px)",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
                whiteSpace: "nowrap",
                flex: "1 1 auto",
                maxWidth: "100%",
                textAlign: "center"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ─── GRID ─── */}
      <section style={{ padding: "80px 5% 120px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 350px), 1fr))", gap: 32 }}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "flex", flexDirection: "column", gap: 24 }}
                >
                  <div style={{ borderRadius: 0, overflow: "hidden", height: 320, position: "relative" }}>
                    <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: 20, left: 20, display: "flex", gap: 8 }}>
                      <span style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)", padding: "4px 12px", borderRadius: 4, fontSize: 14, fontWeight: 800, textTransform: "uppercase" }}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <h3 style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-heading)" }}>{project.title}</h3>
                      <Link href={`/projects/${project.id}`} style={{ color: "#2563eb", display: "flex", alignItems: "center", gap: 4, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
                         See Detail <ArrowUpRight size={14} />
                      </Link>
                    </div>
                    <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.5 }}>{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>



      {/* ─── CTA ─── */}
      <section style={{ padding: "160px 5% 160px", background: "#4B7A8D", color: "#fff", textAlign: "center", position: "relative", overflow: "hidden" }}>
         <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 10 }}>
           <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, marginBottom: 24, fontFamily: "var(--font-heading)" }}>Ready to Bring your Portfolio <br /> to Life with Confidence?</h2>
           <div style={{ width: 100, height: 1, background: "rgba(255,255,255,0.3)", margin: "0 auto 40px" }} />
           <Link href="/contact" className="journey-hero-btn">
             Start Your Journey <ArrowUpRight size={20} />
           </Link>
         </div>
         {/* Simple background texture */}
         <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </section>
    </div>
  );
}
