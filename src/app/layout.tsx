import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ShoppingCart } from "@/components/shopping-cart";
import { CartProvider } from "@/context/cart-context";

import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";



export const metadata = {
  title: "STANCH TECH | Marine & Industrial Services",
  description: "Applying professional technical support to maintain, upgrade and perform on board technical services. Marine Control, Vessel Inspection, Spares & Support.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning className="antialiased selection:bg-primary/20 selection:text-primary">

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
    </ClerkProvider>
  );
}
