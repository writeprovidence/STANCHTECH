"use client";

import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, MessageCircle } from "lucide-react";

export function Footer() {
    return (
      <footer style={{ background: "#0b1a2e", color: "#fff", padding: "120px 4vw 60px 4vw", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        {/* Section 2: Main Footer Grid */}
        <section>
          <div className="footer-grid">
            {/* Column 1: Logo & Vision */}
            <div className="footer-col">
              <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
                <img 
                  src="/asset/stanch_tech logo.png" 
                  alt="Stanch Tech" 
                  style={{ height: 82, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", marginRight: -4 }} 
                />
                <span style={{
                  fontSize: 16,
                  fontWeight: 900,
                  letterSpacing: "0.04em",
                  color: "#fff",
                  textTransform: "uppercase",
                  lineHeight: 1,
                  fontFamily: "'Inter', sans-serif"
                }}>
                  STANCHTECH
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                Nigeria's premier partner for marine engine salvaging, diagnostic precision, and global logistics support.
              </p>
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                <a href="#" style={{ color: "#1877F2", transition: "transform 0.3s ease", display: "inline-flex" }} onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}>
                  <Facebook size={24} fill="#1877F2" strokeWidth={0} />
                </a>
                <a href="#" style={{ color: "#E1306C", transition: "transform 0.3s ease", display: "inline-flex" }} onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}>
                  <Instagram size={24} />
                </a>
                <a href="https://wa.me/2348037340959" style={{ color: "#25D366", transition: "transform 0.3s ease", display: "inline-flex" }} onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="footer-col">
              <div style={{ height: 82, display: "flex", alignItems: "center", marginBottom: 32 }}>
                <p style={{ fontSize: 17, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", margin: 0 }}>Navigation</p>
              </div>
              <nav style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {["Home", "Shop", "Services", "About"].map((link) => (
                  <Link key={link} href={`/${link === "Home" ? "" : link.toLowerCase()}`} style={{ color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 500, opacity: 0.8 }} className="footer-link">
                    {link}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3: Contact Us */}
            <div className="footer-col">
              <div style={{ height: 82, display: "flex", alignItems: "center", marginBottom: 32 }}>
                <p style={{ fontSize: 17, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", margin: 0 }}>Contact Us</p>
              </div>
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
            <div className="footer-col">
              <div style={{ height: 82, display: "flex", alignItems: "center", marginBottom: 32 }}>
                <p style={{ fontSize: 17, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", margin: 0 }}>Emergency Support</p>
              </div>
              <div className="footer-content-col" style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: 500, display: "flex", flexDirection: "column", gap: 24 }}>
                <p style={{ lineHeight: 1.6 }}>
                  Standby emergency services available. Every call is treated with urgency.
                </p>
                <Link 
                  href="tel:+2347059623727" 
                  className="hero-btn-secondary"
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



