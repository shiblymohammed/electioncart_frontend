"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/Heading";
import { SlideIn } from "@/components/SlideIn";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import productService from "@/services/productService";
import { Campaign } from "@/types/product";
import Image from "next/image";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function CampaignDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const id = parseInt(params.id as string);
        const data = await productService.getCampaignById(id);
        setCampaign(data);
      } catch (err) {
        setError("Failed to load campaign details");
        console.error("Error loading campaign:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCampaign();
    }
  }, [params.id]);

  const getCampaignImage = (campaignName: string): string => {
    const nameLower = campaignName.toLowerCase();
    if (nameLower.includes("helicopter")) {
      return "/helicopter.webp";
    }
    if (nameLower.includes("wellness") || nameLower.includes("health")) {
      return "/healthatm.webp";
    }
    if (nameLower.includes("vr") || nameLower.includes("virtual reality")) {
      return "/vr.webp";
    }
    return "/Z1UNmpbqstJ98M3k_paint-background.png";
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-texture bg-brand-gray flex flex-col items-center justify-center gap-6">
        <p className="text-2xl font-bold text-red-600">
          {error || "Campaign not found"}
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
      {/* Hero Section with Navbar */}
      <div className="bg-texture bg-brand-purple text-white relative min-h-[40vh] py-20 px-4">
        <Navbar />
        <div className="max-w-6xl mx-auto">
          <SlideIn>
            <button
              onClick={() => router.back()}
              className="mb-6 text-brand-lime hover:text-brand-orange font-bold text-lg transition-colors"
            >
              ← Back
            </button>
          </SlideIn>
          <SlideIn>
            <Heading as="h1" className="text-5xl mb-6">
              {campaign.name}
            </Heading>
          </SlideIn>
          <SlideIn>
            <div className="flex items-baseline gap-4">
              <p className="text-6xl font-bold text-brand-lime">
                ${campaign.price}
              </p>
              <p className="text-2xl opacity-90">per {campaign.unit}</p>
            </div>
          </SlideIn>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Campaign Image */}
          <SlideIn>
            <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-black">
              <div className="relative w-full h-96 flex items-center justify-center">
                <Image
                  src={getCampaignImage(campaign.name)}
                  alt={campaign.name}
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>
            </div>
          </SlideIn>

          {/* Campaign Details */}
          <SlideIn>
            <div className="space-y-6">
              {/* Description */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-black">
                <Heading as="h2" className="text-2xl mb-4">
                  Description
                </Heading>
                <p className="text-lg leading-relaxed text-gray-700">
                  {campaign.description}
                </p>
              </div>

              {/* Pricing Info */}
              <div className="bg-texture bg-brand-orange text-white rounded-2xl p-8 shadow-xl border-4 border-black">
                <Heading as="h2" className="text-2xl mb-4">
                  Pricing Details
                </Heading>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Price per unit:</span>
                    <span className="text-3xl font-bold">${campaign.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Unit:</span>
                    <span className="text-2xl font-bold">{campaign.unit}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  className="w-full button-cutout bg-gradient-to-b from-brand-lime to-brand-orange from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-black px-8 py-4 text-xl"
                  onClick={() => addToCart(campaign, "campaign")}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="w-full button-cutout bg-gradient-to-b from-brand-purple to-brand-blue from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-white px-8 py-4 text-xl"
                >
                  Browse More Campaigns
                </button>
              </div>
            </div>
          </SlideIn>
        </div>

        {/* Additional Info */}
        <SlideIn>
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-xl border-4 border-black">
            <Heading as="h2" className="text-2xl mb-6">
              Campaign Information
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-brand-blue text-white rounded-xl">
                <p className="text-4xl font-bold mb-2">✓</p>
                <p className="font-bold text-lg">Active Campaign</p>
              </div>
              <div className="text-center p-6 bg-brand-lime text-black rounded-xl">
                <p className="text-4xl font-bold mb-2">⚡</p>
                <p className="font-bold text-lg">Quick Setup</p>
              </div>
              <div className="text-center p-6 bg-brand-orange text-white rounded-xl">
                <p className="text-4xl font-bold mb-2">★</p>
                <p className="font-bold text-lg">Premium Quality</p>
              </div>
            </div>
          </div>
        </SlideIn>
      </div>
    </div>
  );
}
