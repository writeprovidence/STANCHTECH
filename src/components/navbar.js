'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "/about" },
        { name: "Shop", href: "/shop" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <nav style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                width: "100%",
                borderRadius: 0,
                zIndex: 40,
                transition: "all 0.3s ease",
                background: "#090E1A",
                padding: scrolled ? "6px 4vw" : "10px 4vw",
                borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
                boxShadow: scrolled ? "none" : "0 12px 40px rgba(0,0,0,0.3)",
            }}>
                <div style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    {/* LEFT: Logo - flex-1 for centering middle */}
                    <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
                        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 0, textDecoration: "none" }}>
                            <img
                                src="/asset/stanch_tech%20logo.png"
                                alt="STANCH TECH"
                                style={{ height: 52, width: "auto", objectFit: "contain", marginRight: -2, filter: "brightness(0) invert(1)" }}
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
                        </Link>
                    </div>



                    {/* RIGHT: Combined Nav Links + CTA + Mobile Toggle */}
                    <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 32 }}>
                        {/* Desktop links grouped here */}
                        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 40, marginRight: 20 }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    style={{
                                        fontSize: 14,
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        color: "#fff",
                                        textDecoration: "none",
                                        transition: "color 0.2s",
                                        fontFamily: "'Bai Jamjuree', sans-serif",
                                        fontWeight: 700,
                                    }}
                                    onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.8)"}
                                    onMouseLeave={e => e.target.style.color = "#fff"}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
 
                        <Link
                            href="/contact"
                            className="desktop-nav"
                            style={{
                                background: "transparent",
                                color: "#fff",
                                border: "1px solid rgba(255,255,255,0.2)",
                                padding: "8px 18px",
                                borderRadius: "4px",
                                fontSize: 13,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                display: "inline-block",
                                transition: "all 0.2s ease",
                                fontFamily: "'Bai Jamjuree', sans-serif",
                                fontWeight: 700,
                            }}
                            onMouseEnter={e => {
                                e.target.style.background = "rgba(255,255,255,0.05)";
                            }}
                            onMouseLeave={e => {
                                e.target.style.background = "transparent";
                            }}
                        >
                            Sign in
                        </Link>
 
                        {/* Mobile menu button */}
                        <button
                            className="mobile-nav-toggle"
                            onClick={() => setMobileMenuOpen(true)}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 6, display: "none" }}
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            {mobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                            position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
                            backdropFilter: "blur(4px)", zIndex: 50,
                        }}
                    />
                    {/* Drawer */}
                    <div style={{
                        position: "fixed", left: 0, top: 0, height: "100%", width: "min(280px, 85vw)",
                        background: "#0b1a2e", zIndex: 60, padding: "28px 24px",
                        display: "flex", flexDirection: "column", gap: 0,
                        boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
                            <span style={{ color: "#fff", fontSize: 14, fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                                Menu
                            </span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", padding: 4 }}
                                aria-label="Close menu"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                        fontSize: 18,
                                        fontFamily: "'Bai Jamjuree', sans-serif",
                                        fontWeight: 700,
                                        padding: "14px 0",
                                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                                        display: "block",
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Responsive CSS for navbar */}
            <style>{`
                @media (max-width: 900px) {
                    .desktop-nav { display: none !important; }
                    .mobile-nav-toggle { display: flex !important; }
                }
            `}</style>
        </>
    );
}
