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

// Fallback campaigns for development/testing or when API fails
const FALLBACK_CAMPAIGNS: Campaign[] = [
  {
    id: 2001,
    name: "Helicopter Campaign",
    price: 150000,
    unit: "per event",
    description:
      "Make a grand entrance and capture attention with our helicopter campaign service. Perfect for rallies, events, and creating unforgettable moments that voters will remember.",
    features: [
      "Professional helicopter rental with pilot",
      "Aerial photography and videography",
      "Safety equipment and insurance included",
      "Ground coordination team",
      "Social media content package",
      "Event planning assistance",
    ],
    deliverables: [
      "High-quality aerial footage",
      "Professional photos",
      "Social media ready content",
    ],
    is_active: true,
    is_popular: true,
    popular_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 2002,
    name: "Wellness ATM Campaign",
    price: 75000,
    unit: "per month",
    description:
      "Connect with voters through health and wellness. Our Health ATM provides free health checkups, building trust and goodwill in your constituency while promoting ethical campaigning.",
    features: [
      "Mobile Health ATM unit",
      "Basic health screening services",
      "Trained medical staff",
      "Data collection and analytics",
      "Branded health cards for voters",
      "Community outreach coordination",
      "Monthly health reports",
    ],
    deliverables: [
      "Health screening data",
      "Voter engagement metrics",
      "Campaign impact reports",
    ],
    is_active: true,
    is_popular: true,
    popular_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 2003,
    name: "VR Experience Campaign",
    price: 100000,
    unit: "per event",
    description:
      "Showcase your vision with cutting-edge Virtual Reality technology. Let voters experience your development plans and promises in an immersive, memorable way that sets you apart.",
    features: [
      "VR headsets and equipment",
      "Custom VR content creation",
      "Interactive development showcases",
      "Technical support team",
      "Crowd management assistance",
      "Social media integration",
      "Post-event analytics",
    ],
    deliverables: [
      "Custom VR experience",
      "Event footage and photos",
      "Engagement analytics report",
    ],
    is_active: true,
    is_popular: true,
    popular_order: 3,
    created_at: new Date().toISOString(),
  },
];

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
        console.log("🔄 Fetching popular campaigns from API...");
        const data = await productService.getPopularCampaigns();
        console.log("✅ Popular campaigns received:", data);
        
        // Use API data if available, otherwise use fallback campaigns
        if (data && data.length > 0) {
          setCampaigns(data);
        } else {
          console.log("⚠️ No campaigns from API, using fallback campaigns");
          setCampaigns(FALLBACK_CAMPAIGNS);
        }
      } catch (error) {
        console.error("❌ Error fetching popular campaigns:", error);
        console.log("🔄 Using fallback campaigns for development/testing");
        setCampaigns(FALLBACK_CAMPAIGNS);
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
        <LoadingSpinner />
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
        <div className="min-h-screen flex items-center justify-center bg-brand-gray">
          <p className="text-lg">No campaigns available at the moment.</p>
        </div>
      )}
    </div>
  );
}
