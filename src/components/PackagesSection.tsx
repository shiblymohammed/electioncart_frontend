"use client";

import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Heading } from "@/components/Heading";
import { HorizontalLine, VerticalLine } from "@/components/Line";
import { SlideIn } from "@/components/SlideIn";
import { Scribble } from "@/components/Scribble";

import clsx from "clsx";
import productService from "@/services/productService";
import { Package } from "@/types/product";
import Link from "next/link";

const PACKAGE_COLORS = ["#46ACFA", "#FF7A51", "#B8FC39"];

const VERTICAL_LINE_CLASSES =
  "absolute top-0 h-full stroke-[2] text-gray-600 transition-colors group-hover:text-gray-400";

const HORIZONTAL_LINE_CLASSES =
  "-mx-8 stroke-[2] text-gray-600 transition-colors group-hover:text-gray-400";

function PackageCard({
  pkg,
  color,
}: {
  pkg: Package;
  color: string;
}) {
  // Split package name into words for curved text
  const nameWords = pkg.name.split(" ");
  const firstWord = nameWords[0] || "";
  const secondWord = nameWords.slice(1).join(" ") || "";

  // Truncate description to 120 characters
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <div className="group relative h-full">
      <Link href={`/package/${pkg.id}`} className="block h-full">
        {/* Card Container */}
        <div className="relative mx-auto w-full p-3 sm:p-4 cursor-pointer">
          <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "left-4")} />
          <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "right-4")} />
          <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />

          {/* Card Content */}
          <div className="relative h-full bg-transparent rounded-2xl overflow-hidden transition-all duration-300 ease-out cursor-pointer hover:scale-[1.02] hover:shadow-xl shadow-md">
            {/* Scribble Background Effect */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
              <Scribble
                color={color}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full scale-110 rotate-12"
              />
            </div>

            {/* Card Content */}
            <div className="relative p-4 sm:p-5 h-full flex flex-col min-h-[450px] scale-90 origin-top">
              {/* Package Name with Curved Text Effect */}
              <div className="text-center mb-6 relative">
                <div className="relative inline-block">
                  {/* First word - curved upward */}
                  <div
                    className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-wider mb-1"
                    style={{
                      fontFamily: "var(--font-laughter)",
                      color: "#000000",
                      transform: "scaleY(1.1)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {firstWord.toUpperCase()}
                  </div>
                  {/* Second word - curved downward */}
                  {secondWord && (
                    <div
                      className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-wider"
                      style={{
                        fontFamily: "var(--font-laughter)",
                        color: "#000000",
                        transform: "scaleY(1.1)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {secondWord.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {pkg.description && (
                <div className="text-center mb-6">
                  <p className="text-gray-700 text-base leading-relaxed font-medium">
                    {truncateText(pkg.description, 120)}
                  </p>
                </div>
              )}

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-2xl font-black text-black">₹</span>
                  <span
                    className="text-5xl sm:text-6xl font-black"
                    style={{
                      fontFamily: "var(--font-laughter)",
                      color: "#000000",
                    }}
                  >
                    {pkg.price.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Features List with Tick Marks */}
              {pkg.features && pkg.features.length > 0 && (
                <div className="flex-1 mb-6">
                  <ul className="space-y-3">
                    {pkg.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-green-600 text-xl font-black mt-0.5 flex-shrink-0">
                          ✓
                        </span>
                        <span className="text-gray-800 text-base font-medium leading-tight">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Show more features indicator */}
                  {pkg.features.length > 5 && (
                    <div className="text-center mt-4">
                      <span className="text-sm text-gray-500 font-semibold">
                        +{pkg.features.length - 5} more features
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* CTA Button */}
              <div className="mt-auto flex justify-center">
                <button className="w-full button-cutout font-black text-white px-6 py-3 text-base uppercase tracking-wide transition-all duration-300 hover:scale-105 bg-brand-purple">
                  View Details
                </button>
              </div>
            </div>
          </div>

          <HorizontalLine
            className={HORIZONTAL_LINE_CLASSES}
            style={{ color: "#692e54" }}
          />
        </div>
      </Link>
    </div>
  );
}

export function PackagesSection() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("packages-section");
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setShowStickyCTA(isInView && window.innerWidth < 768);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const data = await productService.getPopularPackages();
        setPackages(data || []);
      } catch (error) {
        console.error("Error fetching popular packages:", error);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <section
      id="packages-section"
      className="bg-texture min-h-screen px-4 py-12 sm:py-16 lg:py-20"
      style={{ backgroundColor: "#ece7e1" }}
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <SlideIn>
          <div className="text-center mb-10 sm:mb-14">
            <Heading className="mb-3 sm:mb-4" as="h2">
              POPULAR PACKAGES
            </Heading>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Turn Every Click, Call, and Print Into a Winning Smile
            </p>
          </div>
        </SlideIn>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-20">
            <SlideIn>
              <div className="mb-6">
                <svg
                  className="mx-auto w-24 h-24 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                No Packages Available
              </h3>
              <p className="text-lg text-gray-500 mb-8">
                We&apos;re currently updating our packages. Check back soon for exciting new offerings!
              </p>
              <Link
                href="/contact"
                className="button-cutout inline-flex items-center justify-center bg-brand-purple text-white font-black text-lg px-8 py-4 uppercase tracking-wide transition-all duration-300 hover:scale-105"
              >
                Contact Us for Custom Solutions
              </Link>
            </SlideIn>
          </div>
        ) : (
          <>
            {/* Package Grid - Desktop */}
            <SlideIn>
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-10 sm:mb-12">
                {packages.map((pkg, index) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    color={PACKAGE_COLORS[index % PACKAGE_COLORS.length]}
                  />
                ))}
              </div>
            </SlideIn>

            {/* Package Carousel - Mobile */}
            <div className="md:hidden mb-10 sm:mb-12">
              <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                <div
                  className="flex gap-4 pb-4"
                  style={{ scrollSnapType: "x mandatory" }}
                >
                  {packages.map((pkg, index) => (
                    <div
                      key={pkg.id}
                      className="flex-shrink-0 w-[85vw] max-w-[340px]"
                      style={{ scrollSnapAlign: "center" }}
                    >
                      <PackageCard
                        pkg={pkg}
                        color={PACKAGE_COLORS[index % PACKAGE_COLORS.length]}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Scroll indicator dots */}
              <div className="flex justify-center gap-2 mt-4">
                {packages.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-gray-400"
                  />
                ))}
              </div>
            </div>

            {/* CTA Section - Desktop */}
            <SlideIn>
              <div className="text-center hidden md:block">
                <div className="mb-5">
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-3 font-medium">
                    Need something different? We have more options for you!
                  </p>
                </div>
                <Link
                  href="/packages"
                  className="button-cutout inline-flex items-center justify-center bg-brand-navy text-white font-black text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 uppercase tracking-wide transition-all duration-300 hover:scale-105"
                >
                  <span>View All Packages</span>
                  <svg
                    className="ml-3 w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </SlideIn>
          </>
        )}
      </div>

      {/* Sticky CTA - Mobile Only */}
      {showStickyCTA && !loading && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-[#ece7e1] via-[#ece7e1] to-transparent pb-safe">
          <Link
            href="/packages"
            className="button-cutout w-full flex items-center justify-center bg-brand-navy text-white font-black text-base px-6 py-4 uppercase tracking-wide transition-all duration-300 active:scale-95 shadow-lg"
          >
            <span>View All Packages</span>
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}
