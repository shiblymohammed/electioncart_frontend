import { Scribble } from "@/components/Scribble";
import Image from "next/image";

export function MinimalFooter() {
  return (
    <footer className="bg-texture bg-brand-purple relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 bg-brand-lime rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-brand-orange rounded-full blur-3xl animate-pulse-slower"></div>
        <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-brand-blue rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Scribble decorations */}
      <div className="absolute top-20 left-10 opacity-10 pointer-events-none hidden lg:block">
        <Scribble color="#d9f154" className="w-32 h-32 rotate-12" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 pointer-events-none hidden lg:block">
        <Scribble color="#ff7347" className="w-40 h-40 -rotate-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        {/* Main content */}
        <div className="text-center space-y-8 sm:space-y-10">
          {/* Logo/Brand with shadow */}
          <div className="space-y-4 sm:space-y-6">
            {/* Logo Image */}
            <div className="flex justify-center mb-6">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-2xl">
                <Image
                  src="/logo.png"
                  alt="Lapo Election Cart"
                  width={800}
                  height={200}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Text logo with matching fonts */}
            <h2
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-white uppercase tracking-tight"
              style={{
                fontFamily: "var(--font-laughter)",
                textShadow: "4px 4px 0 #d9f154, 8px 8px 0 #ff7347",
              }}
            >
              LAPO ELECTION CART
            </h2>
            <p
              className="text-brand-lime text-base sm:text-lg lg:text-xl font-black max-w-3xl mx-auto px-4 uppercase"
              style={{ fontFamily: "var(--font-bowlby-sc)" }}
            >
              India&apos;s First eCommerce Platform for Election Campaigns
            </p>
          </div>

          {/* Stats/Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto py-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-white/10 hover:border-brand-lime/50 transition-all duration-300 hover:scale-105">
              <div
                className="text-3xl sm:text-4xl font-black text-brand-lime mb-2"
                style={{ fontFamily: "var(--font-laughter)" }}
              >
                500+
              </div>
              <div
                className="text-xs sm:text-sm text-white/80 font-bold uppercase"
                style={{ fontFamily: "var(--font-bowlby-sc)" }}
              >
                Campaigns
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-white/10 hover:border-brand-orange/50 transition-all duration-300 hover:scale-105">
              <div
                className="text-3xl sm:text-4xl font-black text-brand-orange mb-2"
                style={{ fontFamily: "var(--font-laughter)" }}
              >
                98%
              </div>
              <div
                className="text-xs sm:text-sm text-white/80 font-bold uppercase"
                style={{ fontFamily: "var(--font-bowlby-sc)" }}
              >
                Success Rate
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-white/10 hover:border-brand-blue/50 transition-all duration-300 hover:scale-105">
              <div
                className="text-3xl sm:text-4xl font-black text-brand-blue mb-2"
                style={{ fontFamily: "var(--font-laughter)" }}
              >
                24/7
              </div>
              <div
                className="text-xs sm:text-sm text-white/80 font-bold uppercase"
                style={{ fontFamily: "var(--font-bowlby-sc)" }}
              >
                Support
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-white/10 hover:border-brand-lime/50 transition-all duration-300 hover:scale-105">
              <div
                className="text-3xl sm:text-4xl font-black text-brand-lime mb-2"
                style={{ fontFamily: "var(--font-laughter)" }}
              >
                100+
              </div>
              <div
                className="text-xs sm:text-sm text-white/80 font-bold uppercase"
                style={{ fontFamily: "var(--font-bowlby-sc)" }}
              >
                Products
              </div>
            </div>
          </div>

          {/* Decorative divider with icons */}
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto py-4">
            <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-brand-lime to-brand-lime rounded-full"></div>
            <div className="w-3 h-3 bg-brand-lime rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-3 h-3 bg-brand-blue rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <div className="flex-1 h-1 bg-gradient-to-l from-transparent via-brand-orange to-brand-orange rounded-full"></div>
          </div>

          {/* Location & Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/60 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-brand-lime"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span
                className="font-bold uppercase"
                style={{ fontFamily: "var(--font-bowlby-sc)" }}
              >
                Pune, Maharashtra
              </span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-brand-lime"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span
                className="font-bold"
                style={{ fontFamily: "var(--font-bowlby-sc)" }}
              >
                info@lapoelectioncart.com
              </span>
            </div>
          </div>

          {/* Copyright */}
          <div className="space-y-2 pt-4">
            <p
              className="text-white/60 text-xs sm:text-sm font-bold uppercase"
              style={{ fontFamily: "var(--font-bowlby-sc)" }}
            >
              © {new Date().getFullYear()} Lapo Election Pvt. Ltd. • All Rights
              Reserved
            </p>
            <p
              className="text-white/40 text-xs uppercase"
              style={{ fontFamily: "var(--font-bowlby-sc)" }}
            >
              Empowering Democracy Through Technology
            </p>
          </div>
        </div>
      </div>

      {/* Decorative bottom accent - thicker and more vibrant */}
      <div className="h-2 bg-gradient-to-r from-brand-blue via-brand-lime to-brand-orange"></div>
    </footer>
  );
}
