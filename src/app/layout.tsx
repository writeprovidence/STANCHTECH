import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ShoppingCart } from "@/components/shopping-cart";
import { CartProvider } from "@/context/cart-context";
import localFont from 'next/font/local'

import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = localFont({
  src: '../../public/fonts/Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf',
  variable: '--font-heading',
  weight: '300 700', // Support the full range
})

const darkerGrotesque = localFont({
  src: '../../public/fonts/Darker_Grotesque/Darker_Grotesque/DarkerGrotesque-VariableFont_wght.ttf',
  variable: '--font-body',
  weight: '300 900',
})



export const metadata = {
  title: "STANCH TECH | Marine & Industrial Services",
  description: "Applying professional technical support to maintain, upgrade and perform on board technical services. Marine Control, Vessel Inspection, Spares & Support.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${darkerGrotesque.variable}`}>
      <body suppressHydrationWarning className="antialiased selection:bg-primary/20 selection:text-primary min-h-screen">
        <ClerkProvider
          appearance={{
            variables: {
              fontFamily: 'var(--font-heading)'
            }
          }}
        >
          <CartProvider>
            <Navbar />
            <main style={{ minHeight: "100vh" }}>
              {children}
            </main>
            <Footer />
            <ShoppingCart />
          </CartProvider>
        </ClerkProvider>
        <Analytics />
      </body>
    </html>
  );
}
