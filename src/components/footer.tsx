"use client";

import Link from "next/link";
import { ArrowUpRight, Instagram, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');
    const isSparesArea = pathname.startsWith('/spares');

    if (isAuthPage) return null;

    return (
      <footer style={{ background: "#060D17", color: "#fff", paddingTop: 0, marginTop: "0" }}>


        {/* ─── MAIN FOOTER LINKS ─── */}
        <section style={{ padding: "60px 5% 60px" }}>
          <div className="footer-grid-wrapper grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-16 items-start" style={{
            maxWidth: 1400,
            margin: "0 auto"
          }}>
            {/* ── Column 1: Brand ── */}
            <div>
              <Link href="/" className="footer-logo-link" style={{ display: "flex", alignItems: "center", gap: 4, textDecoration: "none", marginBottom: 32 }}>
                <img src="/asset/Landing_page_image/stanch_tech_logo.png" alt="ST" style={{ height: 55, filter: "brightness(0) invert(1)" }} />
                <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: "0.1em", color: "#fff", fontFamily: "var(--font-heading)", textTransform: "uppercase" }}>STANCHTECH</span>
              </Link>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 32, fontSize: 15 }}>
                 Nigeria's premier partner for marine engine salvaging, diagnostic precision, and technical maintenance solutions. Committed to engineering excellence since 2018.
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                 <a href="https://www.instagram.com/stanchtech/" target="_blank" rel="noopener noreferrer" style={{ color: "#E1306C" }}>
                    <Instagram size={20} />
                 </a>
                 <a href="https://wa.me/2348037340959" target="_blank" rel="noopener noreferrer" style={{ color: "#25D366" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                 </a>
              </div>
            </div>
 
            {/* ── Column 2: Company ── */}
            <div style={{ paddingTop: 20 }}>
               <h4 style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#fff", marginBottom: 32 }}>Company</h4>
               <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { label: "About", href: "/about" },
                    ...(false ? [{ label: "Portfolio", href: "/projects" }] : []),
                    { label: "Spares", href: "/spares" },
                    { label: "Contact", href: "/contact" }
                  ].map((link, i) => (
                    <li key={i}>
                      <Link 
                        href={link.href} 
                        className="footer-link-animated" 
                        style={{ color: "#fff", textDecoration: "none", fontSize: 15 }}
                        onClick={(e) => {
                          if (link.label === "About") {
                            setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 100);
                          }
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
               </ul>
            </div>
 
            {/* ── Column 3: Contact ── */}
            <div className="footer-contact-column" style={{ paddingTop: 20 }}>
               <h4 style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#fff", marginBottom: 32 }}>Contact Us</h4>
               <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
                  Km16 PHC - ABA Express Way, <br />
                  Adjacent Dubi, Port Harcourt, <br />
                  Rivers State, Nigeria
               </p>
               <p style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>+234 (0) 803 734 0959</p>
               <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15 }}>stanchtechltd@gmail.com</p>
            </div>
 
            {/* ── Column 4: Emergency ── */}
            <div style={{ paddingTop: 20 }}>
               <h4 style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#fff", marginBottom: 32 }}>Emergency Support</h4>
               <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                  Standby emergency services available. Every call is treated with urgency.
               </p>
               <Link href="/contact" className="hero-btn-secondary" style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  width: "200px",
                  height: "48px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 15,
                  transition: "all 0.3s ease",
                  borderRadius: 0
               }}>
                  Reach us <ArrowUpRight size={18} />
               </Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{ 
            maxWidth: 1400, 
            margin: "120px auto 0", 
            paddingTop: 60, 
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
            color: "rgba(255,255,255,0.3)"
          }}>
             <p>&copy; {new Date().getFullYear()} Stanch Tech. All rights reserved.</p>
             <div style={{ display: "flex", gap: "80px", marginLeft: "auto" }}>
                <Link href="/privacy" style={{ color: "inherit", textDecoration: "none" }} className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" style={{ color: "inherit", textDecoration: "none" }} className="hover:text-white transition-colors">Terms of Service</Link>
             </div>
          </div>
        </section>
      </footer>
    );
}


