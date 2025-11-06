"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/Heading";
import { SlideIn } from "@/components/SlideIn";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import productService from "@/services/productService";
import { Campaign } from "@/types/product";

import Image from "next/image";

const CAMPAIGN_COLORS = ["#46ACFA", "#FF7A51", "#B8FC39", "#9D4EDD"];

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

function CampaignCard({ campaign, index }: { campaign: Campaign; index: number }) {
  const router = useRouter();
  const color = CAMPAIGN_COLORS[index % CAMPAIGN_COLORS.length];

  const handleViewDetails = () => {
    router.push(`/campaign/${campaign.id}`);
  };

  return (
    <div className="group bg-white border-4 border-black rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
        {/* Image Section - Takes 2 columns */}
        <div
          className="md:col-span-2 relative h-64 md:h-auto flex items-center justify-center p-8"
          style={{ backgroundColor: color }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={getCampaignImage(campaign.name)}
              alt={campaign.name}
              width={300}
              height={300}
              className="object-contain max-h-full"
            />
          </div>
        </div>

        {/* Content Section - Takes 3 columns */}
        <div className="md:col-span-3 p-8 flex flex-col justify-between">
          {/* Header */}
          <div className="mb-8">
            <h3
              className="text-5xl font-black uppercase mb-6"
              style={{
                fontFamily: "var(--font-laughter)",
                color: "#000000",
              }}
            >
              {campaign.name}
            </h3>
          </div>

          {/* Pricing and Actions */}
          <div>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-7xl font-black" style={{ color }}>
                ₹{campaign.price}
              </span>
              <span className="text-2xl text-gray-600 font-medium">
                per {campaign.unit}
              </span>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleViewDetails}
                className="button-cutout bg-gradient-to-b from-brand-purple to-brand-blue from-25% to-75% bg-[length:100%_400%] font-bold transition-all duration-300 hover:bg-bottom text-white px-12 py-4 text-xl"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const data = await productService.getCampaigns();
        setCampaigns(data.filter((c) => c.is_active));
      } catch (err) {
        setError("Failed to load campaigns");
        console.error("Error loading campaigns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
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
      <div className="bg-texture bg-brand-purple text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SlideIn>
            <Heading as="h1" className="text-center text-6xl mb-4">
              ALL CAMPAIGNS
            </Heading>
          </SlideIn>
          <SlideIn>
            <p className="text-center text-2xl text-brand-lime font-bold">
              Amplify Your Message with Proven Strategies
            </p>
          </SlideIn>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        {campaigns.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-bold text-gray-600 mb-4">
              No campaigns available yet
            </p>
            <p className="text-lg text-gray-500">
              Check back soon for exciting campaigns!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {campaigns.map((campaign, index) => (
              <SlideIn key={campaign.id}>
                <CampaignCard campaign={campaign} index={index} />
              </SlideIn>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-texture bg-brand-orange text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <SlideIn>
            <Heading as="h2" className="text-4xl mb-6">
              Need a Custom Campaign?
            </Heading>
          </SlideIn>
          <SlideIn>
            <p className="text-xl mb-8">
              Let&apos;s create something unique for your brand!
            </p>
          </SlideIn>
          <SlideIn>
            <button className="button-cutout bg-gradient-to-b from-brand-lime to-brand-purple from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-white px-8 py-4 text-xl">
              Get in Touch
            </button>
          </SlideIn>
        </div>
      </div>
    </div>
  );
}
