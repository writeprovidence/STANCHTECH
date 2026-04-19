import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ShoppingCart } from "@/components/shopping-cart";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "../components/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "STANCH TECH | Marine & Industrial Services",
  description: "Applying professional technical support to maintain, upgrade and perform on board technical services. Marine Control, Vessel Inspection, Spares & Support.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Space Grotesk + Darker Grotesque + Inter — all from Google Fonts, reliable in all browsers */}
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Darker+Grotesque:wght@500;700;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-primary/20 selection:text-primary">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main style={{ minHeight: "100vh" }}>
              {children}
            </main>
            <Footer />
            <ShoppingCart />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
