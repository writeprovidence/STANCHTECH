import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ShoppingCart } from "@/components/shopping-cart";
import { CartProvider } from "@/context/cart-context";
import "./globals.css";

export const metadata = {
  title: "STANCH TECH | Marine & Industrial Services",
  description: "Applying professional technical support to maintain, upgrade and perform on board technical services. Marine Control, Vessel Inspection, Spares & Support.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;500;600;700&family=Darker+Grotesque:wght@500;700;900&family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://db.onlinewebfonts.com/c/ef633f868c68eb99493540d6c90e0c03?family=Neue+Machina" rel="stylesheet" type="text/css" />
        <link href="https://db.onlinewebfonts.com/c/ae417937d1d283c74900c7e2c90680fd?family=PP+Neue+Machina+Ultrabold" rel="stylesheet" type="text/css" />
      </head>
      <body className="antialiased selection:bg-primary/20 selection:text-primary">
        <CartProvider>
          <Navbar />
          <main style={{ minHeight: "100vh" }}>
            {children}
          </main>
          <Footer />
          <ShoppingCart />
        </CartProvider>
      </body>
    </html>
  );
}
