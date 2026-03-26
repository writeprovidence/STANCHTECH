"use client";

import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, MessageCircle } from "lucide-react";

export function Footer() {
    return (
      <footer style={{ background: "#0b1a2e", color: "#fff", padding: "120px 60px 60px 120px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        {/* Section 2: Main Footer Grid */}
        <section>
          <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 80 }}>
            {/* Column 1: Logo & Vision */}
            <div style={{ maxWidth: 320 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
                <img 
                  src="/asset/stanch_tech logo.png" 
                  alt="Stanch Tech" 
                  style={{ height: 82, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} 
                />
                <span style={{
                  fontSize: 20,
                  fontWeight: 900,
                  letterSpacing: "0.04em",
                  color: "#fff",
                  textTransform: "uppercase",
                  lineHeight: 1,
                  fontFamily: "'Inter', sans-serif"
                }}>
                  STANCH TECH
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                Nigeria's premier partner for marine engine salvaging, diagnostic precision, and global logistics support.
              </p>
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                <a href="#" style={{ color: "#fff", opacity: 0.6, transition: "opacity 0.3s" }} onMouseOver={(e) => e.currentTarget.style.opacity = "1"} onMouseOut={(e) => e.currentTarget.style.opacity = "0.6"}>
                  <Facebook size={20} />
                </a>
                <a href="#" style={{ color: "#fff", opacity: 0.6, transition: "opacity 0.3s" }} onMouseOver={(e) => e.currentTarget.style.opacity = "1"} onMouseOut={(e) => e.currentTarget.style.opacity = "0.6"}>
                  <Instagram size={20} />
                </a>
                <a href="https://wa.me/2348037340959" style={{ color: "#fff", opacity: 0.6, transition: "opacity 0.3s" }} onMouseOver={(e) => e.currentTarget.style.opacity = "1"} onMouseOut={(e) => e.currentTarget.style.opacity = "0.6"}>
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div style={{ paddingTop: 32 }}>
              <p style={{ fontSize: 17, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", marginBottom: 32 }}>Navigation</p>
              <nav style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {["Home", "Shop", "Services", "About"].map((link) => (
                  <Link key={link} href={`/${link === "Home" ? "" : link.toLowerCase()}`} style={{ color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 500, opacity: 0.8 }} className="footer-link">
                    {link}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3: Contact Us */}
            <div style={{ paddingTop: 32 }}>
              <p style={{ fontSize: 17, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", marginBottom: 32 }}>Contact Us</p>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: 500, display: "flex", flexDirection: "column", gap: 20, lineHeight: 1.6 }}>
                <p>
                  Km16 PHC - ABA Express Way,<br />
                  Adjacent Dubi, Port Harcourt,<br />
                  Rivers State, Nigeria
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <p style={{ color: "#fff" }}>stanchtechltd@gmail.com</p>
                  <p>+234 (0) 705 962 3727</p>
                  <p>+234 (0) 803 734 0959</p>
                  <p>+234 (0) 808 529 0298</p>
                  <p style={{ marginTop: 10, color: "#fff" }}>WeChat ID: wxid_jh8kewt3w34u22</p>
                </div>
              </div>
            </div>

            {/* Column 4: Emergency Support */}
            <div style={{ paddingTop: 32 }}>
              <p style={{ fontSize: 17, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", marginBottom: 32 }}>Emergency Support</p>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: 500, display: "flex", flexDirection: "column", gap: 24 }}>
                <p style={{ lineHeight: 1.6 }}>
                  Standby emergency services available. Every call is treated with urgency.
                </p>
                <Link 
                  href="tel:+2347059623727" 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 10, 
                    width: "fit-content", 
                    padding: "12px 24px", 
                    border: "1px solid rgba(255,255,255,0.3)", 
                    borderRadius: 8, 
                    color: "#fff", 
                    textDecoration: "none",
                    fontSize: 16,
                    fontWeight: 700,
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "#fff"; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
                >
                  Reach Us <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{ maxWidth: 1320, margin: "80px auto 0", paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 500 }}>
            <p>&copy; {new Date().getFullYear()} Stanch Tech. All rights reserved.</p>
            <div style={{ display: "flex", gap: 40 }}>
              <span style={{ cursor: "pointer" }}>Privacy Policy</span>
              <span style={{ cursor: "pointer" }}>Terms of Service</span>
            </div>
          </div>
        </section>
      </footer>
    );
}



