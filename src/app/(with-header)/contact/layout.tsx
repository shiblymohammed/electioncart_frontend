import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Lapo Election Cart | India's No.1 Election Campaign Partner",
  description:
    "Get in touch with Lapo Election Cart for product inquiries, demos, distributor partnerships, and technical support. Available Monday to Saturday, 10 AM – 7 PM (IST). Quick WhatsApp support available.",
  keywords: [
    "contact lapo election cart",
    "election campaign support", 
    "political campaign help India",
    "distributor partnership election",
    "election products demo",
    "campaign tools support",
    "election cart customer service"
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}