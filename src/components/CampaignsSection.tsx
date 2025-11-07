"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { LoadingSpinner } from "@/components/LoadingSpinner";

import { Bounded } from "@/components/Bounded";
import { ButtonLink } from "@/components/ButtonLink";
import { Heading } from "@/components/Heading";
import { SlideIn } from "@/components/SlideIn";
import { CampaignParallaxImage } from "@/components/CampaignParallaxImage";
import productService from "@/services/productService";
import { Campaign } from "@/types/product";

// Theme colors for campaigns
type CampaignTheme = "Blue" | "Orange" | "Navy" | "Lime";



// Campaign image mapping - Fallback for campaigns without uploaded images
const getCampaignImageFallback = (campaignName: string): string | undefined => {
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
  // Add more campaign image mappings here
  return undefined;
};

// Get campaign image - prioritize uploaded image, fallback to hardcoded
const getCampaignImage = (campaign: Campaign): string | undefined => {
  // First priority: Use primary_image from API (uploaded in admin)
  if (campaign.primary_image?.image_url) {
    return campaign.primary_image.image_url;
  }
  
  // Second priority: Use first image if available
  if (campaign.images && campaign.images.length > 0) {
    return campaign.images[0].image_url;
  }
  
  // Fallback: Use hardcoded image based on name
  return getCampaignImageFallback(campaign.name);
};

interface CampaignWithTheme extends Campaign {
  theme: CampaignTheme;
  imagePosition: "left" | "right";
  foregroundImage?: string;
}

interface CampaignCardProps {
  campaign: CampaignWithTheme;
  index: number;
  isOutro?: boolean;
}

function CampaignCard({ campaign, index, isOutro = false }: CampaignCardProps) {
  const { theme, name, description, imagePosition } = campaign;

  // Outro slide with call to action
  if (isOutro) {
    return (
      <Bounded
        className={clsx(
          "sticky top-[calc(var(--index)*2rem)]",
          theme === "Blue" && "bg-texture bg-brand-blue text-white"
        )}
        style={{ "--index": index } as React.CSSProperties}
      >
        <div className="text-center max-w-4xl mx-auto">
          <SlideIn>
            <Heading className="~mb-4/6" as="h2">
              EXPLORE MORE CAMPAIGNS
            </Heading>
          </SlideIn>
          <SlideIn>
            <div className="~mb-6/10">
              <p className="text-lg ~mb-8/12 leading-relaxed">
                Discover our full range of innovative campaign solutions designed to help you connect with voters and win elections. From traditional methods to cutting-edge technology, we have everything you need.
              </p>
            </div>
          </SlideIn>
          <SlideIn>
            <div className="flex justify-center">
              <ButtonLink href="/campaigns" color="lime" size="lg">
                View All Campaigns
              </ButtonLink>
            </div>
          </SlideIn>
        </div>
      </Bounded>
    );
  }

  return (
    <Bounded
      className={clsx(
        "sticky top-[calc(var(--index)*2rem)]",
        theme === "Blue" && "bg-texture bg-brand-blue text-white",
        theme === "Orange" && "bg-texture bg-brand-orange text-white",
        theme === "Navy" && "bg-texture bg-brand-navy text-white",
        theme === "Lime" && "bg-texture bg-brand-lime"
      )}
      style={{ "--index": index } as React.CSSProperties}
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
        <div
          className={clsx(
            "flex flex-col items-center gap-8 text-center md:items-start md:text-left",
            imagePosition === "left" && "md:order-2"
          )}
        >
          <SlideIn>
            <Heading size="lg" as="h2">
              {name}
            </Heading>
          </SlideIn>
          <SlideIn>
            <div className="max-w-md text-lg leading-relaxed">
              <p>{description}</p>
            </div>
          </SlideIn>
          <SlideIn>
            <div className="flex justify-center md:justify-start">
              <ButtonLink
                href={`/campaign/${campaign.id}`}
                color={theme === "Lime" ? "orange" : "lime"}
                size="lg"
              >
                View Details
              </ButtonLink>
            </div>
          </SlideIn>
        </div>

        <CampaignParallaxImage
          foregroundImage={campaign.foregroundImage}
          campaignName={name}
        />
      </div>
    </Bounded>
  );
}

export function CampaignsSection() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const data = await productService.getPopularCampaigns();
        setCampaigns(data || []);
      } catch (error) {
        console.error("Error fetching popular campaigns:", error);
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Sort campaigns by name to ensure consistent order
  const sortedCampaigns = campaigns
    .filter((c) => c.is_active)
    .sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      
      // Define the desired order
      if (aName.includes("helicopter")) return -1;
      if (bName.includes("helicopter")) return 1;
      if (aName.includes("wellness") || aName.includes("health")) return aName.includes("helicopter") ? 1 : -1;
      if (bName.includes("wellness") || bName.includes("health")) return bName.includes("helicopter") ? -1 : 1;
      if (aName.includes("vr") || aName.includes("virtual reality")) return 1;
      if (bName.includes("vr") || bName.includes("virtual reality")) return -1;
      
      return 0;
    });

  // Add theme and imagePosition to campaigns with specific colors
  // 1st campaign = Lime, 2nd = Navy, 3rd = Orange
  const themeOrder: CampaignTheme[] = ["Lime", "Navy", "Orange"];
  
  const campaignsWithTheme: CampaignWithTheme[] = sortedCampaigns
    .slice(0, 3)
    .map((campaign, index) => {
      return {
        ...campaign,
        theme: themeOrder[index] || "Orange",
        imagePosition: index % 2 === 0 ? "left" : "right",
        foregroundImage: getCampaignImage(campaign),
      };
    });

  // Create outro slide
  const outroSlide: CampaignWithTheme = {
    id: 0,
    name: "EXPLORE MORE CAMPAIGNS",
    description: "Discover our full range of innovative campaign solutions",
    price: 0,
    unit: "",
    is_active: true,
    created_at: "",
    theme: "Blue",
    imagePosition: "right",
  };

  return (
    <div>
      {/* Campaign Cards from API */}
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-texture bg-brand-gray">
          <LoadingSpinner />
        </div>
      ) : campaignsWithTheme.length > 0 ? (
        <>
          {campaignsWithTheme.map((campaign, index) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              index={index}
            />
          ))}
          
          {/* Outro slide with integrated button */}
          <CampaignCard campaign={outroSlide} index={campaignsWithTheme.length} isOutro={true} />
        </>
      ) : (
        <Bounded className="bg-texture bg-brand-gray text-black min-h-screen flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto py-20">
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </SlideIn>
            <SlideIn>
              <Heading as="h2" className="mb-6">
                NO CAMPAIGNS AVAILABLE
              </Heading>
            </SlideIn>
            <SlideIn>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We&apos;re currently preparing exciting new campaign options for you. Check back soon or contact us for custom campaign solutions!
              </p>
            </SlideIn>
            <SlideIn>
              <div className="flex justify-center">
                <ButtonLink href="/contact" color="lime" size="lg">
                  Contact Us
                </ButtonLink>
              </div>
            </SlideIn>
          </div>
        </Bounded>
      )}
    </div>
  );
}
