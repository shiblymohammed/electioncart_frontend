import { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { PackagesSection } from "@/components/PackagesSection";
import { CampaignsSection } from "@/components/CampaignsSection";
import { VideoBlock } from "@/components/VideoBlock";
import { ContactSection } from "@/components/ContactSection";

export default function Page() {
  return (
    <>
      <HeroSection />
      <PackagesSection />
      <CampaignsSection />
      <VideoBlock localVideoPath="/lapointro.mp4" />
      <ContactSection />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Buy Election Campaign Packages & Tools Online | Lapo Election Cart",
    description:
      "Shop India's most innovative political campaign products – from AI video generators to display vehicles and branded coffee booths. Secure payment gateway and nationwide delivery. Panchayat to Parliamentary elections.",
    keywords: [
      "buy election campaign packages",
      "election products online",
      "political campaign tools India",
      "AI videos for election",
      "campaign helicopter service",
      "display vehicle for rallies",
      "election coffee booth",
      "WhatsApp bulk messaging politics"
    ],
  };
}
