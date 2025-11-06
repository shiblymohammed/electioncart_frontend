"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/Heading";
import { SlideIn } from "@/components/SlideIn";
import { Navbar } from "@/components/Navbar";
import productService from "@/services/productService";
import { Package } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import Image from "next/image";

export default function PackageDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        const id = parseInt(params.id as string);
        const data = await productService.getPackageById(id);
        setPkg(data);
      } catch (err) {
        setError("Failed to load package details");
        console.error("Error loading package:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPackage();
    }
  }, [params.id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !pkg) {
    return (
      <div className="min-h-screen bg-texture bg-brand-gray flex flex-col items-center justify-center gap-6">
        <p className="text-2xl font-bold text-red-600">
          {error || "Package not found"}
        </p>
        <button
          onClick={() => router.push("/")}
          className="button-cutout bg-gradient-to-b from-brand-orange to-brand-lime from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-black px-8 py-4 text-xl"
        >
          Back to Home
        </button>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-texture bg-brand-gray">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-texture bg-brand-orange text-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SlideIn>
            <button
              onClick={() => router.back()}
              className="mb-4 md:mb-6 text-brand-lime hover:text-white font-bold text-sm md:text-lg transition-colors"
            >
              ← Back to Packages
            </button>
          </SlideIn>
          
          {/* Mobile Layout */}
          <div className="block md:hidden">
            <SlideIn>
              <h1 
                className="text-3xl font-black uppercase mb-4"
                style={{
                  fontFamily: "var(--font-laughter)",
                  color: "#FFFFFF",
                }}
              >
                {pkg.name}
              </h1>
            </SlideIn>
            <SlideIn>
              <p className="text-base leading-relaxed mb-6">
                {pkg.description}
              </p>
            </SlideIn>
            <SlideIn>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-baseline gap-2">
                  <span 
                    className="text-4xl font-black text-black"
                    style={{ fontFamily: "var(--font-laughter)" }}
                  >
                    ₹{pkg.price.toLocaleString()}
                  </span>
                  <span className="text-sm opacity-90">complete package</span>
                </div>
                <button
                  className="button-cutout bg-gradient-to-b from-brand-lime to-brand-orange from-25% to-75% bg-[length:100%_400%] font-bold transition-all duration-300 hover:bg-bottom text-black px-6 py-3 text-lg"
                  onClick={() => addToCart(pkg, "package")}
                >
                  Add to Cart
                </button>
              </div>
            </SlideIn>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
            <SlideIn>
              <div className="flex items-start justify-between mb-6">
                <h1 
                  className="text-4xl lg:text-6xl font-black uppercase"
                  style={{
                    fontFamily: "var(--font-laughter)",
                    color: "#FFFFFF",
                  }}
                >
                  {pkg.name}
                </h1>
                <div className="text-right">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span 
                      className="text-6xl lg:text-8xl font-black text-black"
                      style={{ fontFamily: "var(--font-laughter)" }}
                    >
                      ₹{pkg.price.toLocaleString()}
                    </span>
                    <span className="text-xl lg:text-2xl opacity-90">complete package</span>
                  </div>
                  <button
                    className="button-cutout bg-gradient-to-b from-brand-lime to-brand-orange from-25% to-75% bg-[length:100%_400%] font-bold transition-all duration-300 hover:bg-bottom text-black px-8 py-4 text-xl"
                    onClick={() => addToCart(pkg, "package")}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SlideIn>
            <SlideIn>
              <p className="text-lg lg:text-xl leading-relaxed max-w-3xl">
                {pkg.description}
              </p>
            </SlideIn>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 md:py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          
          {/* Left Column - Images */}
          <div className="space-y-4 md:space-y-6">
            <SlideIn>
              {/* Main Image */}
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 border-2 md:border-4 border-black shadow-xl">
                {pkg.images && pkg.images.length > 0 ? (
                  <div className="aspect-square relative overflow-hidden rounded-lg md:rounded-xl">
                    <Image
                      src={pkg.images[selectedImageIndex]?.image_url || pkg.images[0]?.image_url}
                      alt={pkg.images[selectedImageIndex]?.alt_text || pkg.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-brand-blue to-brand-purple rounded-lg md:rounded-xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl md:text-4xl font-black mb-2" style={{ fontFamily: "var(--font-laughter)" }}>
                        {pkg.name}
                      </h3>
                      <p className="text-sm md:text-lg opacity-80">Campaign Package</p>
                    </div>
                  </div>
                )}
              </div>
            </SlideIn>

            {/* Thumbnail Gallery - Always show at least 4 images */}
            <SlideIn>
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {(() => {
                  // Ensure we have at least 4 images by duplicating if needed
                  const displayImages = pkg.images && pkg.images.length > 0 ? pkg.images : [];
                  const minImages = 4;
                  
                  // If we have fewer than 4 images, duplicate them to reach 4
                  while (displayImages.length < minImages && pkg.images && pkg.images.length > 0) {
                    displayImages.push(...pkg.images.slice(0, minImages - displayImages.length));
                  }
                  
                  // If no images at all, create placeholder images
                  if (displayImages.length === 0) {
                    for (let i = 0; i < minImages; i++) {
                      displayImages.push({
                        id: i,
                        image: `/api/placeholder/300/300?text=${pkg.name}+${i + 1}`,
                        image_url: `/api/placeholder/300/300?text=${pkg.name}+${i + 1}`,
                        thumbnail: `/api/placeholder/100/100?text=${pkg.name}+${i + 1}`,
                        thumbnail_url: `/api/placeholder/100/100?text=${pkg.name}+${i + 1}`,
                        alt_text: `${pkg.name} image ${i + 1}`,
                        is_primary: i === 0,
                        order: i + 1
                      });
                    }
                  }
                  
                  return displayImages.slice(0, Math.max(minImages, displayImages.length)).map((image, index) => (
                    <button
                      key={`${image.id}-${index}`}
                      onClick={() => setSelectedImageIndex(index % (pkg.images?.length || 1))}
                      className={`aspect-square rounded-md md:rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === (index % (pkg.images?.length || 1))
                          ? 'border-brand-orange shadow-lg' 
                          : 'border-gray-300 hover:border-brand-lime'
                      }`}
                    >
                      <Image
                        src={image.thumbnail_url || image.image_url}
                        alt={image.alt_text}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ));
                })()}
              </div>
            </SlideIn>

            {/* Mobile Add to Cart Button - Only show on mobile, hidden on desktop since it's in header */}
            <SlideIn>
              <button
                className="button-cutout w-full bg-gradient-to-b from-brand-lime to-brand-orange from-25% to-75% bg-[length:100%_400%] font-bold transition-all duration-300 hover:bg-bottom text-black px-6 md:px-8 py-4 md:py-6 text-lg md:text-2xl md:hidden"
                onClick={() => addToCart(pkg, "package")}
              >
                Add to Cart - ₹{pkg.price.toLocaleString()}
              </button>
            </SlideIn>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-4 md:space-y-8">
            
            {/* Features */}
            {pkg.features && pkg.features.length > 0 && (
              <SlideIn>
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 border-2 md:border-4 border-black shadow-xl">
                  <Heading as="h2" className="text-xl md:text-3xl mb-4 md:mb-6">
                    Package Features
                  </Heading>
                  <ul className="space-y-2 md:space-y-4">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 md:gap-3">
                        <span className="text-brand-lime text-lg md:text-xl font-bold mt-1">✓</span>
                        <span className="text-sm md:text-lg text-gray-800">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SlideIn>
            )}

            {/* Deliverables */}
            {pkg.deliverables && pkg.deliverables.length > 0 && (
              <SlideIn>
                <div className="bg-texture bg-brand-blue text-white rounded-xl md:rounded-2xl p-4 md:p-8 border-2 md:border-4 border-black shadow-xl">
                  <Heading as="h2" className="text-xl md:text-3xl mb-4 md:mb-6">
                    What You&apos;ll Receive
                  </Heading>
                  <ul className="space-y-2 md:space-y-4">
                    {pkg.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start gap-2 md:gap-3">
                        <span className="text-brand-lime text-lg md:text-xl font-bold mt-1">→</span>
                        <span className="text-sm md:text-lg">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SlideIn>
            )}

            {/* Package Items */}
            {pkg.items && pkg.items.length > 0 && (
              <SlideIn>
                <div className="bg-texture bg-brand-purple text-white rounded-xl md:rounded-2xl p-4 md:p-8 border-2 md:border-4 border-black shadow-xl">
                  <Heading as="h2" className="text-xl md:text-3xl mb-4 md:mb-6">
                    What&apos;s Included
                  </Heading>
                  <div className="space-y-2 md:space-y-3">
                    {pkg.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center bg-white/20 rounded-lg p-3 md:p-4 border-2 border-white/30"
                      >
                        <span className="text-sm md:text-lg font-bold">{item.name}</span>
                        <span className="text-lg md:text-xl font-bold bg-brand-lime text-black px-2 md:px-3 py-1 rounded-full">
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideIn>
            )}
          </div>
        </div>

        {/* What Happens After Purchase */}
        <div className="mt-12 md:mt-20 space-y-6 md:space-y-8">
          <SlideIn>
            <div className="text-center mb-8 md:mb-12">
              <Heading as="h2" className="text-2xl md:text-5xl mb-3 md:mb-4">
                What Happens After You Purchase
              </Heading>
              <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Once you complete your purchase, our dedicated representative will contact you immediately to confirm your order and understand your campaign needs in detail. We believe every election is unique — so our team ensures personalized support from day one.
              </p>
            </div>
          </SlideIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            
            {/* On-Site Assistance */}
            <SlideIn>
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 border-2 md:border-4 border-black shadow-xl h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-blue rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <span className="text-white text-lg md:text-2xl font-bold">1</span>
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">On-Site Assistance</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  A Lapo Election representative will visit your campaign site or office to begin setup and implementation. From installing equipment like Health ATMs or digital displays to coordinating campaign materials, our experts handle everything seamlessly.
                </p>
              </div>
            </SlideIn>

            {/* 24x7 Support */}
            <SlideIn>
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 border-2 md:border-4 border-black shadow-xl h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-orange rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <span className="text-white text-lg md:text-2xl font-bold">2</span>
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">24×7 Support & Service</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Our support team is available 24/7 to assist you — whether it&apos;s a technical query, an urgent setup, or campaign-related guidance. We ensure smooth, uninterrupted campaign operations throughout your journey.
                </p>
              </div>
            </SlideIn>

            {/* Nationwide Coverage */}
            <SlideIn>
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 border-2 md:border-4 border-black shadow-xl h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-lime rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <span className="text-black text-lg md:text-2xl font-bold">3</span>
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">Nationwide Coverage</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  No matter where your campaign is — from panchayat-level elections to state-wide rallies — our logistics and technical teams are fully equipped to provide fast, reliable, and localized services across India.
                </p>
              </div>
            </SlideIn>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mt-8 md:mt-12">
            
            {/* Customization Options */}
            <SlideIn>
              <div className="bg-texture bg-brand-purple text-white rounded-xl md:rounded-2xl p-4 md:p-8 border-2 md:border-4 border-black shadow-xl">
                <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Customization Options</h3>
                <p className="text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
                  Want to modify your campaign plan or add tools like AI videos, vehicle branding, or Health ATMs later? Our packages are flexible and scalable, designed to grow with your campaign needs.
                </p>
              </div>
            </SlideIn>

            {/* Why Choose Lapo ElectionCart */}
            <SlideIn>
              <div className="bg-texture bg-brand-blue text-white rounded-xl md:rounded-2xl p-4 md:p-8 border-2 md:border-4 border-black shadow-xl">
                <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Why Choose Lapo ElectionCart</h3>
                <ul className="space-y-2 md:space-y-3 text-sm md:text-lg">
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="text-brand-lime font-bold">✓</span>
                    <span>Fast Onboarding: Immediate response after purchase.</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="text-brand-lime font-bold">✓</span>
                    <span>Pan-India Reach: Services available in all states and districts.</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="text-brand-lime font-bold">✓</span>
                    <span>Tech-Driven Tools: AI videos, VR experiences, and real-time analytics.</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="text-brand-lime font-bold">✓</span>
                    <span>End-to-End Support: From setup to campaign execution.</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <span className="text-brand-lime font-bold">✓</span>
                    <span>Always Available: 24×7 helpline and on-site assistance.</span>
                  </li>
                </ul>
              </div>
            </SlideIn>
          </div>

          {/* Contact Information */}
          <SlideIn>
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 border-2 md:border-4 border-black shadow-xl text-center">
              <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Need Help?</h3>
              <p className="text-sm md:text-lg text-gray-600 mb-4 md:mb-6">You can always reach us via:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-brand-blue mb-2">Phone</div>
                  <div className="text-sm md:text-lg text-gray-700">+91-9746263653</div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-brand-orange mb-2">Email</div>
                  <div className="text-sm md:text-lg text-gray-700 break-all">support@lapoelectioncart.com</div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-brand-lime mb-2">WhatsApp</div>
                  <div className="text-sm md:text-lg text-gray-700">Chat with us from any package page</div>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </div>
  );
}
