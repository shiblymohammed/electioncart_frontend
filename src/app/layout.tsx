import type { Metadata } from "next";
import { Bowlby_One_SC, DM_Mono, Rubik_Wet_Paint } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import { SVGFilters } from "@/components/SVGFilters";
import { AuthProvider } from "@/context/AuthContext";

const bowlby = Bowlby_One_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bowlby-sc",
  weight: "400",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
  weight: "500",
});

const laughter = localFont({
  src: "./fonts/LAUGHTER.ttf",
  variable: "--font-laughter",
  display: "swap",
});

const rubikWetPaint = Rubik_Wet_Paint({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik-wet-paint",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Lapo Election Cart - India's First Election Campaign eCommerce Platform",
  description: "Lapo Election Cart is India's leading platform for tech-driven election campaigns. Explore AI videos, Health ATMs, VR effects, WhatsApp bulk messaging, display vehicles, and more. Empower your campaign today!",
  keywords: [
    "election campaign packages India",
    "political campaign tools",
    "AI videos for election",
    "candidate management system India",
    "election campaign solutions",
    "political marketing India",
    "election technology provider",
    "election management platform",
    "digital election promotion",
    "political outreach tools",
    "Health ATM for campaign",
    "WhatsApp bulk messaging for politics",
    "VR election experience India",
    "display vehicle for rallies",
    "campaign helicopter service",
    "election coffee booth ideas",
    "voter data analytics India",
    "panchayat campaign services",
    "election products online",
    "buy election campaign packages"
  ],
  authors: [{ name: "Lapo Election", url: "https://lapoelectioncart.com" }],
  creator: "Lapo Election",
  publisher: "Lapo Election",
  robots: "index, follow",
  openGraph: {
    title: "Lapo Election Cart - India's First Election Campaign eCommerce Platform",
    description: "India's leading platform for tech-driven election campaigns. AI videos, Health ATMs, VR effects, and more innovative campaign tools.",
    type: "website",
    siteName: "Lapo Election Cart",
    locale: "en_IN",
    url: "https://lapoelectioncart.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lapo Election Cart - Election Campaign Platform",
    description: "India's first election campaign eCommerce platform. AI videos, Health ATMs, VR effects, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bowlby.variable} ${dmMono.variable} ${laughter.variable} ${rubikWetPaint.variable} antialiased font-mono font-medium text-zinc-800`}
      >
        <AuthProvider>
          <main>{children}</main>
          <SVGFilters />
        </AuthProvider>
      </body>
    </html>
  );
}
