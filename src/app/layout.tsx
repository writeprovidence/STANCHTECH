import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ShoppingCart } from "@/components/shopping-cart";
import { CartProvider } from "@/context/cart-context";

import { ClerkProvider } from '@clerk/nextjs'
import { Space_Grotesk, Darker_Grotesque, Roboto_Mono } from 'next/font/google'
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-space-grotesk', display: 'swap' });
const darkerGrotesque = Darker_Grotesque({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'], variable: '--font-darker-grotesque', display: 'swap' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-roboto-mono', display: 'swap' });

export const metadata = {
  title: "STANCH TECH | Marine & Industrial Services",
  description: "Applying professional technical support to maintain, upgrade and perform on board technical services. Marine Control, Vessel Inspection, Spares & Support.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning className={`${spaceGrotesk.variable} ${darkerGrotesque.variable} ${robotoMono.variable} antialiased selection:bg-primary/20 selection:text-primary`}>

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
