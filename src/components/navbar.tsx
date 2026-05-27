'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const helpMenuRef = useRef<HTMLDivElement>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [helpMenuOpen, setHelpMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);

    useEffect(() => {
        const fetchResults = async () => {
            if (searchQuery.trim() === "") {
                setSearchResults([]);
                return;
            }
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('id, name, image, category')
                    .neq('is_hidden', true)
                    .or(`name.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`)
                    .limit(10);
                
                if (data) setSearchResults(data);
            } catch (err) {
                console.error("Error searching products:", err);
            }
        };

        const timer = setTimeout(() => fetchResults(), 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearchSubmit = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && searchResults.length > 0) {
            router.push(`/shop/${searchResults[0].id}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    const handleResultClick = (id: string) => {
        router.push(`/shop/${id}`);
        setIsSearchOpen(false);
        setSearchQuery("");
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (helpMenuRef.current && !helpMenuRef.current.contains(e.target as Node)) {
                setHelpMenuOpen(false);
            }
        };
        if (helpMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [helpMenuOpen]);

    const navLinks = [
        { name: "HOME", href: "/" },
        { name: "ABOUT", href: "/about" },
        { name: "PORTFOLIO", href: "/projects" },
        { name: "INVENTORY", href: "/shop" },
        { name: "CONTACT", href: "/contact" },
    ];

    if (isAuthPage) return null;

    return (
        <>
            <nav style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "78px",
                zIndex: 100,
                transition: "all 0.3s ease",
                background: "#090E1A",
                padding: "0 4vw",
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.2)" : "none",
            }}>
                <div style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    {/* LEFT: Logo */}
                    <div style={{ flex: 1, display: "flex", justifyContent: "flex-start", overflow: "hidden" }}>
                        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                            <img
                                src="/asset/Landing_page_image/stanch_tech_logo.png"
                                alt="STANCH TECH"
                                style={{ 
                                    height: "clamp(28px, 6vw, 55px)", 
                                    width: "auto",
                                    minWidth: "28px",
                                    objectFit: "contain", 
                                    filter: "brightness(0) invert(1)",
                                    flexShrink: 0
                                }}
                            />
                            <span className="logo-text" style={{
                                fontSize: "clamp(12px, 3vw, 16px)",
                                fontWeight: 900,
                                letterSpacing: "0.1em",
                                color: "#fff",
                                textTransform: "uppercase",
                                lineHeight: 1,
                                fontFamily: "var(--font-heading)",
                                whiteSpace: "nowrap"
                            }}>
                                STANCHTECH
                            </span>
                        </Link>
                    </div>

                    {/* CENTER: Navigation Links */}
                    <div className="desktop-nav" style={{ flex: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 32 }}>
                        {navLinks.map((link) => {
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 800,
                                        color: "#fff",
                                        textDecoration: "none",
                                        transition: "color 0.2s",
                                        fontFamily: "var(--font-body)",
                                        letterSpacing: "0.15em"
                                    }}
                                    className="nav-link"
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* RIGHT: Utilities */}
                    <div className="nav-utilities" style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>

                        <div className="relative" ref={helpMenuRef}>
                            <button
                                onClick={() => setHelpMenuOpen(!helpMenuOpen)}
                                style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", gap: 4 }}
                                className="hover:text-blue-600 transition-colors"
                            >
                                <span style={{ fontSize: 15, fontWeight: 800, fontFamily: "var(--font-body)", letterSpacing: "0.15em" }}>HELP</span>
                                <ChevronDown size={13} style={{ transition: "transform 0.2s", transform: helpMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                            </button>

                            {helpMenuOpen && (
                                <div style={{
                                    position: "absolute",
                                    right: 0,
                                    top: "42px",
                                    width: "210px",
                                    backgroundColor: "white",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    zIndex: 50,
                                    border: "1px solid #e5e7eb",
                                }}>
                                    <div style={{ padding: "12px" }}>
                                        <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16, fontFamily: "var(--font-body)" }}>Contact Support</p>
                                        <a
                                            href="https://wa.me/2348037340959"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => setHelpMenuOpen(false)}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 8,
                                                padding: "8px 16px",
                                                backgroundColor: "transparent",
                                                border: "1px solid #25D366",
                                                borderRadius: "8px",
                                                textDecoration: "none",
                                                transition: "all 0.2s",
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.backgroundColor = "rgba(37, 211, 102, 0.05)";
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.backgroundColor = "transparent";
                                            }}
                                        >
                                            <svg width="20" height="20" fill="#25D366" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 13.96 2.56 15.78 3.53 17.31L2.24 21.05C2.12 21.4 2.45 21.73 2.8 21.61L6.61 20.37C8.16 21.4 10.01 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.15 15.34C16.92 15.98 16.03 16.5 15.46 16.59C14.98 16.66 14.33 16.74 12.08 15.8C9.21 14.59 7.35 11.66 7.21 11.47C7.07 11.28 6.05 9.93 6.05 8.52C6.05 7.11 6.77 6.42 7.05 6.13C7.28 5.89 7.66 5.8 8.01 5.8C8.12 5.8 8.22 5.8 8.31 5.85C8.61 6.02 9.08 7.15 9.14 7.29C9.2 7.42 9.27 7.58 9.18 7.74C9.09 7.9 9.01 7.98 8.87 8.14C8.73 8.3 8.6 8.44 8.45 8.62C8.29 8.82 8.12 9.03 8.32 9.38C8.51 9.73 9.18 10.82 10.17 11.69C11.45 12.82 12.47 13.18 12.86 13.34C13.24 13.5 13.68 13.47 13.94 13.19C14.28 12.82 14.68 12.24 15.09 11.66C15.38 11.25 15.75 11.33 16.1 11.46C16.45 11.59 18.25 12.48 18.6 12.65C18.95 12.83 19.18 12.92 19.27 13.07C19.36 13.22 19.36 13.96 19.04 14.86L17.15 15.34Z" />
                                            </svg>
                                            <span style={{ color: "#25D366", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)" }}>WhatsApp</span>
                                        </a>
                                        <p style={{ fontSize: 12, color: "#6b7280", fontWeight: 500, textAlign: "center", marginTop: 10, fontFamily: "var(--font-body)" }}>Replies instantly</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            className="mobile-nav-toggle"
                            onClick={() => setMobileMenuOpen(true)}
                            style={{ 
                                background: "none", 
                                border: "none", 
                                cursor: "pointer", 
                                color: "#fff", 
                                padding: 6, 
                                display: "none" 
                            }}
                            aria-label="Open menu"
                        >
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <div
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                                position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
                                backdropFilter: "blur(4px)", zIndex: 150,
                            }}
                        />
                        <div style={{
                            position: "fixed", right: 0, top: 0, height: "100%", width: "min(300px, 85vw)",
                            background: "#fff", zIndex: 160, padding: "40px",
                            display: "flex", flexDirection: "column", gap: 32,
                            boxShadow: "-10px 0 40px rgba(0,0,0,0.1)",
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ color: "#000", fontSize: 18, fontWeight: 900, textTransform: "uppercase" }}>Menu</span>
                                <button onClick={() => setMobileMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#000" }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                {navLinks.map((link) => {
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            style={{
                                                color: "#000",
                                                textDecoration: "none",
                                                fontSize: 20,
                                                fontWeight: 700,
                                                fontFamily: "var(--font-body)",
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(9, 14, 26, 0.95)",
                            backdropFilter: "blur(20px)",
                            zIndex: 200,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0 6vw"
                        }}
                    >
                        <button 
                            onClick={() => setIsSearchOpen(false)}
                            style={{
                                position: "absolute",
                                top: "40px",
                                right: "6vw",
                                background: "none",
                                border: "none",
                                color: "#fff",
                                cursor: "pointer"
                            }}
                        >
                            <X size={32} />
                        </button>

                        <div style={{ width: "100%", maxWidth: "800px", textAlign: "center" }}>
                            <h2 style={{ 
                                color: "#2563eb", 
                                fontSize: "14px", 
                                fontWeight: 900, 
                                letterSpacing: "0.2em", 
                                marginBottom: "20px",
                                fontFamily: "var(--font-heading)" 
                            }}>SEARCH INVENTORY</h2>
                            
                            <div style={{ position: "relative" }}>
                                <input 
                                    autoFocus
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearchSubmit}
                                    placeholder="Search spares"
                                    style={{
                                        width: "100%",
                                        background: "transparent",
                                        border: "none",
                                        borderBottom: "2px solid rgba(255,255,255,0.1)",
                                        fontSize: "48px",
                                        fontWeight: 800,
                                        color: "#fff",
                                        padding: "20px 0",
                                        outline: "none",
                                        fontFamily: "var(--font-body)"
                                    }}
                                />
                                <div style={{ 
                                    position: "absolute", 
                                    bottom: 0, 
                                    left: 0, 
                                    height: "2px", 
                                    width: "100%", 
                                    background: "linear-gradient(90deg, #2563eb, transparent)",
                                    transform: searchQuery ? "scaleX(1)" : "scaleX(0)",
                                    transition: "transform 0.3s ease",
                                    transformOrigin: "left"
                                }} />
                            </div>

                            {searchResults.length > 0 && (
                                <div style={{ marginTop: "40px", textAlign: "left", maxHeight: "40vh", overflowY: "auto" }}>
                                    {searchResults.map(product => (
                                        <div 
                                            key={product.id}
                                            onClick={() => handleResultClick(product.id)}
                                            style={{ 
                                                padding: "20px", 
                                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "20px"
                                            }}
                                        >
                                            <div style={{ width: "48px", height: "48px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                                                <img src={Array.isArray(product.image) ? product.image[0] : product.image || "/asset/checkout/705687d37a1bd0160f34e53cdcb38e492d45e74c.png"} alt="" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-heading)" }}>{product.name}</h3>
                                                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", fontFamily: "var(--font-body)" }}>{product.category}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 900px) {
                    .desktop-nav { display: none !important; }
                    .mobile-nav-toggle { display: flex !important; }
                    .nav-utilities { gap: 12px !important; }
                }
                .nav-utilities {
                    gap: 36px;
                }
                .nav-link:hover {
                    color: #2563eb !important;
                }
                input:focus + .input-line {
                    transform: scaleX(1) !important;
                }
            `}</style>
        </>
    );
}
