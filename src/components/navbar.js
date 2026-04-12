'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";

export function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();
    const { data: session } = useSession();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchResults([]);
            return;
        }
        const filtered = PRODUCTS.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
    }, [searchQuery]);

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter' && searchResults.length > 0) {
            router.push(`/shop/${searchResults[0].id}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    const handleResultClick = (id) => {
        router.push(`/shop/${id}`);
        setIsSearchOpen(false);
        setSearchQuery("");
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "HOME", href: "/" },
        { name: "SHOP", href: "/shop" },
        { name: "ABOUT", href: "/about" },
        { name: "CONTACT", href: "/contact" },
    ];

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
                padding: "0 6vw",
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
                    <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
                        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 0, textDecoration: "none" }}>
                            <img
                                src="/asset/Landing page_image/stanch_tech logo.png"
                                alt="STANCH TECH"
                                style={{ 
                                    height: 55, 
                                    width: "auto", 
                                    objectFit: "contain", 
                                    marginRight: 10,
                                    filter: "brightness(0) invert(1)"
                                }}
                            />
                            <span style={{
                                fontSize: "14px",
                                fontWeight: 900,
                                letterSpacing: "0.1em",
                                color: "#fff",
                                textTransform: "uppercase",
                                lineHeight: 1,
                                fontFamily: "'Neue Machina', sans-serif"
                            }}>
                                STANCHTECH
                            </span>
                        </Link>
                    </div>

                    {/* CENTER: Navigation Links */}
                    <div className="desktop-nav" style={{ flex: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 32 }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                style={{
                                    fontSize: 13,
                                    fontWeight: 800,
                                    color: "#fff",
                                    textDecoration: "none",
                                    transition: "color 0.2s",
                                    fontFamily: "'Neue Machina', sans-serif",
                                    letterSpacing: "0.15em"
                                }}
                                onMouseEnter={e => e.target.style.color = "#2563eb"}
                                onMouseLeave={e => e.target.style.color = "#fff"}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* RIGHT: Utilities */}
                    <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 24 }}>
                        {(pathname.startsWith('/shop') || pathname === '/cart' || pathname === '/checkout' || pathname === '/orders') && (
                                <>
                                    {session ? (
                                        <div className="relative">
                                            <button 
                                                onClick={() => setProfileMenuOpen(!profileMenuOpen)} 
                                                className="flex items-center gap-1 text-white hover:text-blue-600 transition-colors bg-transparent border-none cursor-pointer"
                                            >
                                                <User size={20} />
                                                <ChevronDown size={14} />
                                            </button>
                                            
                                            {profileMenuOpen && (
                                                <div className="absolute right-0 top-8 w-64 bg-white rounded-xl shadow-2xl py-4 flex flex-col z-50 border border-gray-100 pb-2">
                                                    <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                            <User size={16} className="text-gray-500" />
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-700 truncate">{session.user?.email}</span>
                                                    </div>
                                                    <Link href="/profile" onClick={() => setProfileMenuOpen(false)} className="px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Profile</Link>
                                                    <Link href="/settings" onClick={() => setProfileMenuOpen(false)} className="px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Settings</Link>
                                                    <div className="px-4 pt-2">
                                                        <button 
                                                            onClick={() => signOut()} 
                                                            className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-900 transition-colors"
                                                        >
                                                            Sign out
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => signIn('google')} 
                                            className="text-white hover:text-blue-600 transition-colors bg-transparent border-none cursor-pointer"
                                            aria-label="Sign In"
                                        >
                                            <User size={20} />
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => setIsSearchOpen(true)}
                                        style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }} 
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        <Search size={20} />
                                    </button>
                                    <button 
                                        onClick={() => setIsCartOpen(true)}
                                        style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", position: "relative" }}
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        <ShoppingBag size={20} />
                                        {cartCount > 0 && (
                                            <span style={{
                                                position: "absolute",
                                                top: -8,
                                                right: -8,
                                                background: "#2563eb",
                                                color: "#fff",
                                                fontSize: 10,
                                                fontWeight: 900,
                                                width: 18,
                                                height: 18,
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                {cartCount}
                                            </span>
                                        )}
                                    </button>
                                </>
                            )}

                        {/* Mobile menu button */}
                        <button
                            className="mobile-nav-toggle"
                            onClick={() => setMobileMenuOpen(true)}
                            style={{ 
                                background: "none", 
                                border: "none", 
                                cursor: "pointer", 
                                color: isHomePage && !scrolled ? "#fff" : "#000", 
                                padding: 6, 
                                display: "none" 
                            }}
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
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
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        style={{
                                            color: "#000",
                                            textDecoration: "none",
                                            fontSize: 20,
                                            fontWeight: 700,
                                            fontFamily: "'Space Grotesk', sans-serif",
                                        }}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
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
                                fontFamily: "'Darker Grotesque', sans-serif" 
                            }}>SEARCH INVENTORY</h2>
                            
                            <div style={{ position: "relative" }}>
                                <input 
                                    autoFocus
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearchSubmit}
                                    placeholder="Type back to search parts..."
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
                                        fontFamily: "'Darker Grotesque', sans-serif"
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

                            {/* Suggestions List */}
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
                                            <div style={{ width: "48px", height: "48px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <img src={product.image} alt="" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "'Darker Grotesque', sans-serif" }}>{product.name}</h3>
                                                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", fontFamily: "'Space Grotesk', sans-serif" }}>{product.category} • NGN {product.price.toLocaleString()}</p>
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
                }
                input:focus + .input-line {
                    transform: scaleX(1) !important;
                }
            `}</style>
        </>
    );
}
