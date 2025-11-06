import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Lapo Election Cart | India's First Election eCommerce Platform",
  description:
    "Learn about Lapo Election Cart - India's pioneering eCommerce platform for election campaigns and political technology. Empowering candidates with AI-driven solutions, campaign management tools, and innovative outreach systems from Pune, Maharashtra.",
  keywords: [
    "about lapo election cart",
    "election ecommerce platform India",
    "political campaign technology",
    "AI election tools",
    "campaign management software",
    "election innovation company",
    "political technology solutions",
    "Pune election services",
    "campaign digitization India"
  ],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}