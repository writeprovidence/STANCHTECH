"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin, Calendar, User, Settings, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const PROJECTS = [
  {
    id: 1,
    title: "Vessel Engine Overhaul",
    category: "Engine Overhaul",
    location: "Lagos Port, Nigeria",
    date: "March 2024",
    client: "Fymak Marine",
    description: "Complete overhaul and performance optimization of a Caterpillar C32 marine engine for a high-traffic tugboat fleet.",
    about: "This project involved a comprehensive teardown and rebuild of a critical power plant for a major regional logistics vessel. Our team of certified technicians performed high-precision calibration and component replacements to meet OEM standards.",
    image: "/asset/Landing_page_image/low_hour_engine.jpeg",
    secondImage: "/asset/Landing_page_image/vessel.png",
    processDescription: "Our systematic approach ensures every component is verified for performance and longevity.",
    highlights: ["Engine restored to 100% rated power", "Reduced fuel consumption by 12%", "Completed within 14-day window", "OEM certified parts used"],
    highlightImages: [
      "/asset/Landing_page_image/vessel.png",
      "/asset/Landing_page_image/low_hour_engine.jpeg",
      "/asset/Landing_page_image/marine_spares.png",
      "/asset/Landing_page_image/support.png"
    ],
    process: ["Initial diagnostics and pressure testing", "Full component cleaning and wear analysis", "Precision assembly and timing calibration", "Sea trials and performance verification"],
    testimonial: {
      quote: "Stanch Tech's expertise in engine overhauls is unparalleled. They returned our vessel to service ahead of schedule and the performance gains were immediately noticeable.",
      author: "Capt. Ibrahim Bello",
      role: "Operations Manager, Fymak Marine"
    }
  },
  {
    id: 2,
    title: "Industrial Spares Logistics",
    category: "Industrial Services",
    location: "Onne Free Zone",
    date: "January 2024",
    client: "Global Offshore",
    description: "Managed the supply and installation of essential Cummins engine components for an offshore drilling platform.",
    about: "Faced with a potential operation shutdown, Stanch Tech mobilized a rapid response team to source and install specialized engine spares in record time. Our global network allowed us to bypass common supply chain bottlenecks.",
    image: "/asset/Landing_page_image/marine_spares.png",
    secondImage: "/asset/Landing_page_image/cummin_engine.png",
    processDescription: "Critical logistics management requiring 24/7 coordination and rapid deployment.",
    highlights: ["Zero operational downtime achieved", "Critical spares sourced in 48 hours", "100% installation success rate", "On-site technical support"],
    highlightImages: [
      "/asset/Landing_page_image/cummin_engine.png",
      "/asset/Landing_page_image/marine_spares.png",
      "/asset/Landing_page_image/support.png",
      "/asset/Landing_page_image/vessel.png"
    ],
    process: ["Urgent needs assessment", "Global spares synchronization", "Priority logistics and customs clearance", "Direct-to-platform delivery and installation"],
    testimonial: {
      quote: "The speed at which Stanch Tech moved to save our operations was incredible. Their logistics precision is world-class.",
      author: "Engr. Sarah John",
      role: "Technical Lead, Global Offshore"
    }
  },
  {
    id: 3,
    title: "Skyline Main Harbor Inspection",
    category: "Marine Maintenance",
    location: "Port Harcourt",
    date: "November 2023",
    client: "Felz Marine",
    description: "Comprehensive inspection and routine maintenance for a fleet of five cargo vessels.",
    about: "Our team conducted a full-scale preventative maintenance circuit across the Felz Marine fleet. By using advanced vibration analysis and borescope inspections, we identified and corrected four major potential failure points.",
    image: "/asset/Landing_page_image/support.png",
    secondImage: "/asset/Landing_page_image/low_hour_engine.jpeg",
    processDescription: "Multi-vessel inspection using predictive diagnostic technology for maximum reliability.",
    highlights: ["Identified 4 failure points early", "Optimized fleet schedule", "Enhanced safety score", "Full diagnostic reporting"],
    highlightImages: [
      "/asset/Landing_page_image/low_hour_engine.jpeg",
      "/asset/Landing_page_image/support.png",
      "/asset/Landing_page_image/vessel.png",
      "/asset/Landing_page_image/marine_spares.png"
    ],
    process: ["Vessel-by-vessel initial screening", "High-precision diagnostic monitoring", "Routine parts replacement and lubrication", "Final verification and safety certification"],
    testimonial: {
      quote: "Stanch Tech provides a level of detail in their reports that we haven't found elsewhere. Truly a professional engineering partner.",
      author: "Chief Engr. David O.",
      role: "Fleet Superintendent, Felz Marine"
    }
  },
  {
    id: 4,
    title: "Pacific Trade Hub Restoration",
    category: "Industrial Services",
    location: "Apapa Harbor",
    date: "October 2023",
    client: "Gelose Marine",
    description: "Full restoration of industrial cooling systems and auxiliary power generators for a major port logistics hub.",
    about: "This project focused on the complete refurbishment of the harbor's primary cooling infrastructure. We overhauled 12 industrial generators and restored the central cooling manifold to full operational efficiency.",
    image: "/asset/Landing_page_image/vessel.png",
    secondImage: "/asset/Landing_page_image/cummin_engine.png",
    processDescription: "Systematic restoration of complex port infrastructure under live operational conditions.",
    highlights: ["12 industrial generators restored", "Cooling efficiency improved by 40%", "Zero safety incidents", "Upgraded remote monitoring"],
    highlightImages: [
      "/asset/Landing_page_image/vessel.png",
      "/asset/Landing_page_image/cummin_engine.png",
      "/asset/Landing_page_image/low_hour_engine.jpeg",
      "/asset/Landing_page_image/support.png"
    ],
    process: ["Site-wide energy audit", "Generator mechanical restoration", "Cooling manifold cleaning", "Final load testing and certification"],
    testimonial: {
      quote: "The Pacific Trade Hub has never run more efficiently. Stanch Tech's restoration work was thorough and professional.",
      author: "Mr. Akpan T.",
      role: "Hub Director, Gelose Marine"
    }
  },
  {
    id: 5,
    title: "GreenTower Generator Upgrade",
    category: "Industrial Services",
    location: "Victoria Island",
    date: "August 2023",
    client: "Tower Corp",
    description: "Installation and programming of advanced remote monitoring systems for multi-megawatt backup generator sets.",
    about: "Tower Corp required a modern solution for their energy backup systems. We installed Cummins-certified remote telemetry and upgraded the switchgear for their primary 2.5MW generator bank.",
    image: "/asset/Landing_page_image/cummin_engine.png",
    secondImage: "/asset/Landing_page_image/marine_spares.png",
    processDescription: "Digital integration and electrical upgrade for mission-critical urban power systems.",
    highlights: ["2.5MW capacity modernized", "Remote monitoring active", "Fuel efficiency optimized", "Switchgear upgraded"],
    highlightImages: [
      "/asset/Landing_page_image/cummin_engine.png",
      "/asset/Landing_page_image/marine_spares.png",
      "/asset/Landing_page_image/support.png",
      "/asset/Landing_page_image/low_hour_engine.jpeg"
    ],
    process: ["Electrical system mapping", "Telemetry installation", "Switchgear programming", "Full system dry-run and training"],
    testimonial: {
      quote: "Stanch Tech brought our power management into the digital age. The remote monitoring alone has saved us countless hours.",
      author: "Mrs. Ngozi E.",
      role: "Operations Director, Tower Corp"
    }
  },
  {
    id: 6,
    title: "Vessel Engine Spares Restoration",
    category: "Industrial Services",
    location: "Onne Free Zone",
    date: "July 2023",
    client: "Hydro Nile Ltd",
    description: "Comprehensive restoration and spares management of critical engine spares for a specialized vessel fleet.",
    about: "Hydro Nile had a large spares of damaged or aged spares. Stanch Tech conducted a full restoration project, salvaging 85% of the components and re-certifying them for active duty.",
    image: "/asset/Landing_page_image/marine_spares.png",
    secondImage: "/asset/Landing_page_image/low_hour_engine.jpeg",
    processDescription: "Precision component salvage and re-certification to maritime standards.",
    highlights: ["85% component salvage rate", "Full spares re-certification", "Significant cost savings", "Custom storage solution"],
    highlightImages: [
      "/asset/Landing_page_image/marine_spares.png",
      "/asset/Landing_page_image/low_hour_engine.jpeg",
      "/asset/Landing_page_image/vessel.png",
      "/asset/Landing_page_image/support.png"
    ],
    process: ["Spares auditing", "Chemical cleaning and NDT testing", "Precision machining and repair", "Certification and packing"],
    testimonial: {
      quote: "They saved us tens of thousands of dollars by restoring parts we thought were scrap. Their technical skill is impressive.",
      author: "Chief Engr. Mike",
      role: "Fleet Manager, Hydro Nile Ltd"
    }
  }
];

export default function ProjectDetail() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const project = PROJECTS.find(p => p.id === id) || PROJECTS[0];

  return (
    <div style={{ background: "#FFFFFF", color: "#0b1a2e", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "120px 5% 120px" }}>
        {/* ─── HEADER (Wide) ─── */}
        <div style={{ marginBottom: 60 }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, marginBottom: 40, lineHeight: 1.1 }}>
            {project.title}
          </h1>
          
          <div style={{ position: "relative", marginBottom: 32 }}>
            <img src={project.image} alt={project.title} style={{ width: "100%", height: "clamp(500px, 70vh, 800px)", objectFit: "cover" }} />
          </div>

          <div className="project-details-row">
            <div className="project-detail-block">
              <p className="project-detail-label">Service</p>
              <p className="project-detail-value">{project.category}</p>
            </div>
            <div className="project-detail-block">
              <p className="project-detail-label">Date</p>
              <p className="project-detail-value">{project.date}</p>
            </div>
            <div className="project-detail-block">
              <p className="project-detail-label">Location</p>
              <p className="project-detail-value">{project.location}</p>
            </div>
            <div className="project-detail-block">
              <p className="project-detail-label">Client</p>
              <p className="project-detail-value">{project.client}</p>
            </div>
          </div>
        </div>

        <div style={{ paddingLeft: "15%" }}>
          {/* ─── CONTENT BLOCKS ─── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 100 }}>
            {/* 01. About */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ maxWidth: 800 }}>
                <h2 style={{ fontSize: 28, fontWeight: 800, fontFamily: "var(--font-heading)", marginBottom: 24 }}>About Portfolio</h2>
                <p style={{ color: "#4b5563", fontSize: 17, lineHeight: 1.8, marginBottom: 40 }}>
                  {project.about}
                </p>
              </div>
              <img 
                src={project.secondImage} 
                alt="Project context" 
                style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 0 }} 
              />
            </div>

            {/* 02. Work Process */}
            <div>
               <h2 style={{ fontSize: 28, fontWeight: 800, fontFamily: "var(--font-heading)", marginBottom: 12 }}>Work Process</h2>
               <p style={{ color: "#9ca3af", fontSize: 14, fontWeight: 600, marginBottom: 40, maxWidth: 600 }}>{project.processDescription}</p>
               
               <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
                  {project.process.map((step, idx) => (
                    <li key={idx} style={{ padding: "24px", background: "#f8fafc", borderLeft: "4px solid #2563eb", display: "flex", flexDirection: "column", gap: 12 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: "#2563eb" }}>PHASE 0{idx + 1}</span>
                      <p style={{ fontSize: 16, fontWeight: 700, color: "#0b1a2e", lineHeight: 1.4 }}>{step}</p>
                    </li>
                  ))}
               </ul>
            </div>

            {/* 03. Completed Highlights */}
            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 80 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, fontFamily: "var(--font-heading)", marginBottom: 48 }}>Completed Highlights</h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", gap: 32, marginBottom: 80 }}>
                {project.highlightImages.map((img, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ height: 260, overflow: "hidden" }}>
                      <img src={img} alt={`Highlight ${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 0 }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* ─── TESTIMONIAL ─── */}
              <div style={{ background: "#0b1a2e", padding: "60px 80px", color: "#fff", position: "relative", marginBottom: 120 }}>
                 <div style={{ fontSize: 60, fontFamily: "serif", position: "absolute", top: 20, left: 40, opacity: 0.2 }}>"</div>
                 <p style={{ fontSize: 22, fontStyle: "italic", lineHeight: 1.6, marginBottom: 32, position: "relative", zIndex: 1, fontFamily: "var(--font-body)" }}>
                   {project.testimonial.quote}
                 </p>
                 <div>
                   <p style={{ fontWeight: 800, fontSize: 18 }}>{project.testimonial.author}</p>
                   <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 600 }}>{project.testimonial.role}</p>
                 </div>
              </div>

              {/* ─── RELATED PROJECTS ─── */}
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 80 }}>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
                   <h2 style={{ fontSize: 28, fontWeight: 800, fontFamily: "var(--font-heading)" }}>Related Portfolio</h2>
                   <Link href="/projects" style={{ color: "#2563eb", fontWeight: 700, textDecoration: "none", fontSize: 14 }}>View All Portfolio</Link>
                 </div>
                 
                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 32 }}>
                    {PROJECTS.filter(p => p.id !== project.id).slice(0, 3).map((rp) => (
                      <Link key={rp.id} href={`/projects/${rp.id}`} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: 16 }}>
                        <div style={{ height: 220, overflow: "hidden" }}>
                           <img src={rp.image} alt={rp.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 0 }} />
                        </div>
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 800, color: "#2563eb", marginBottom: 4 }}>{rp.category}</p>
                          <h4 style={{ fontSize: 18, fontWeight: 800 }}>{rp.title}</h4>
                        </div>
                      </Link>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ─── CTA ─── */}
      <section style={{ padding: "140px 5%", background: "#f8fafc", textAlign: "center" }}>
          <h2 style={{ fontSize: 40, fontWeight: 800, fontFamily: "var(--font-heading)", marginBottom: 32 }}>Let's Build What's Next</h2>
          <Link href="/contact" className="primary-cta-btn">
            Discuss Your Portfolio <ArrowUpRight size={22} />
          </Link>
      </section>
    </div>
  );
}
