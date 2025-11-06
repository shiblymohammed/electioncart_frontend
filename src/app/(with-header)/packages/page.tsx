"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/Heading";
import { SlideIn } from "@/components/SlideIn";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import productService from "@/services/productService";
import { Package } from "@/types/product";
import { useCart } from "@/context/CartContext";

const PACKAGE_COLORS = ["#46ACFA", "#FF7A51", "#B8FC39", "#9D4EDD"];

function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const color = PACKAGE_COLORS[index % PACKAGE_COLORS.length];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(pkg, "package");
  };

  const handleViewDetails = () => {
    router.push(`/package/${pkg.id}`);
  };

  return (
    <div className="group bg-white border-4 border-black rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full">
      {/* Header with Package Name and Price */}
      <div
        className="p-6 text-center border-b-4 border-black"
        style={{ backgroundColor: color }}
      >
        <h3
          className="text-3xl font-black uppercase mb-3"
          style={{
            fontFamily: "var(--font-laughter)",
            color: "#000000",
          }}
        >
          {pkg.name}
        </h3>
        <div className="inline-block bg-black text-white px-6 py-2 rounded-full">
          <span className="text-2xl font-black">₹{pkg.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Description */}
        <p className="text-gray-700 mb-6 line-clamp-3 flex-shrink-0">
          {pkg.description}
        </p>

        {/* Features List */}
        {pkg.features && pkg.features.length > 0 && (
          <div className="mb-6 flex-1">
            <h4 className="text-sm font-bold uppercase text-gray-500 mb-3">
              What&apos;s Included:
            </h4>
            <ul className="space-y-2">
              {pkg.features.slice(0, 6).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span
                    className="text-lg font-black flex-shrink-0"
                    style={{ color }}
                  >
                    ✓
                  </span>
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            {pkg.features.length > 6 && (
              <p className="text-xs text-gray-500 mt-3 font-bold">
                +{pkg.features.length - 6} more features
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 mt-auto">
          <button
            onClick={handleAddToCart}
            className="w-full button-cutout bg-gradient-to-b from-brand-lime to-brand-orange from-25% to-75% bg-[length:100%_400%] font-bold transition-all duration-300 hover:bg-bottom text-black px-4 py-3"
          >
            Add to Cart
          </button>
          <button
            onClick={handleViewDetails}
            className="w-full button-cutout bg-gradient-to-b from-brand-purple to-brand-blue from-25% to-75% bg-[length:100%_400%] font-bold transition-all duration-300 hover:bg-bottom text-white px-4 py-3"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const data = await productService.getPackages();
        setPackages(data);
      } catch (err) {
        setError("Failed to load packages");
        console.error("Error loading packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-texture bg-brand-gray flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-texture bg-brand-gray flex flex-col items-center justify-center gap-6 px-4">
        <p className="text-2xl font-bold text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="button-cutout bg-gradient-to-b from-brand-orange to-brand-lime from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-black px-8 py-4 text-xl"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-texture bg-brand-gray">
      {/* Hero Section */}
      <div className="bg-texture bg-brand-orange text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SlideIn>
            <Heading as="h1" className="text-center text-6xl mb-4">
              ALL PACKAGES
            </Heading>
          </SlideIn>
          <SlideIn>
            <p className="text-center text-2xl text-brand-lime font-bold">
              Choose Your Perfect Marketing Arsenal
            </p>
          </SlideIn>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        {packages.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-bold text-gray-600 mb-4">
              No packages available yet
            </p>
            <p className="text-lg text-gray-500">
              Check back soon for amazing deals!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <SlideIn key={pkg.id}>
                <PackageCard pkg={pkg} index={index} />
              </SlideIn>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-texture bg-brand-blue text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <SlideIn>
            <Heading as="h2" className="text-4xl mb-6">
              Need a Custom Package?
            </Heading>
          </SlideIn>
          <SlideIn>
            <p className="text-xl mb-8">
              We can create a tailored solution just for you!
            </p>
          </SlideIn>
          <SlideIn>
            <button className="button-cutout bg-gradient-to-b from-brand-lime to-brand-orange from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-black px-8 py-4 text-xl">
              Contact Us
            </button>
          </SlideIn>
        </div>
      </div>
    </div>
  );
}
