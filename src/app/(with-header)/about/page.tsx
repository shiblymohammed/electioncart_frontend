"use client";

import { Bounded } from "@/components/Bounded";
import { PageHeader } from "@/components/PageHeader";
import { SlideIn } from "@/components/SlideIn";
import { ButtonLink } from "@/components/ButtonLink";

const ABOUT_COLORS = ["#4876ff", "#ff7347", "#d9f154", "#692e54"];

function ServiceCard({ 
  title, 
  description, 
  icon, 
  color 
}: { 
  title: string; 
  description: string; 
  icon: string; 
  color: string;
}) {
  return (
    <div 
      className="bg-texture rounded-xl p-6 border-4 border-black transition-all hover:scale-105 hover:rotate-1 shadow-lg"
      style={{ backgroundColor: color }}
    >
      <div className="text-center space-y-3">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="font-black text-lg text-black uppercase">{title}</h3>
        <p className="text-black font-bold text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const keyServices = [
    {
      title: "Candidate Management",
      description: "Manage your campaign team, voters, and booth-level data with ease.",
      icon: "👥",
      color: "#4876ff"
    },
    {
      title: "AI-Powered Videos",
      description: "Personalized campaign videos with local language and candidate face morphing.",
      icon: "🎬",
      color: "#ff7347"
    },
    {
      title: "Health ATMs",
      description: "Build public trust by offering free health checkups at rallies while ethically collecting voter data.",
      icon: "🏥",
      color: "#d9f154"
    },
    {
      title: "WhatsApp Messaging",
      description: "Reach thousands instantly with verified political messages and updates.",
      icon: "📱",
      color: "#692e54"
    }
  ];

  const whyChooseUs = [
    "India's first dedicated election eCommerce platform",
    "AI-powered personalized campaign content",
    "Ethical voter data collection through Health ATMs",
    "Comprehensive booth-level management tools",
    "Multi-language support for diverse constituencies",
    "Real-time analytics and campaign insights",
    "Affordable packages for all campaign sizes",
    "24/7 technical support and training"
  ];

  return (
    <>
      <PageHeader 
        title="About Us"
        description="Empowering Political Campaigns with Innovation. India's first eCommerce platform dedicated to election campaigns and political technology."
      />
      
      <section className="bg-texture bg-brand-gray min-h-screen">
        <Bounded>
          <div className="space-y-16 py-16">
            {/* Mission Section */}
            <SlideIn delay={0.2} duration={0.3}>
              <div className="max-w-4xl mx-auto space-y-4 text-gray-700 text-center">
                <p className="text-lg leading-relaxed">
                  Lapo Election Cart is India&apos;s first eCommerce platform dedicated to election campaigns and political technology.
                </p>
                <p className="text-lg leading-relaxed">
                  We help candidates, campaign managers, and political parties access modern tools, AI-driven solutions, and powerful outreach systems — all from a single online platform.
                </p>
                <p className="text-lg leading-relaxed">
                  Backed by Lapo Election Pvt. Ltd., Pune (Maharashtra), we are redefining how elections are fought, making campaigns more data-driven, engaging, and efficient across India.
                </p>
              </div>
            </SlideIn>

            {/* Mission & Vision */}
            <div className="grid lg:grid-cols-2 gap-8">
              <SlideIn delay={0.1} duration={0.3}>
                <div className="bg-texture bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-4 border-black transition-transform hover:scale-105" style={{ backgroundColor: "#4876ff" }}>
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-5xl">🎯</span>
                    <h3 className="text-2xl font-black text-white uppercase">Our Mission</h3>
                  </div>
                  <p className="text-white font-bold leading-relaxed">
                    To empower every political candidate with innovative campaign technology that builds stronger voter connections, enhances visibility, and ensures impactful results — ethically and effectively.
                  </p>
                </div>
              </SlideIn>

              <SlideIn delay={0.2} duration={0.3}>
                <div className="bg-texture bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-4 border-black transition-transform hover:scale-105" style={{ backgroundColor: "#ff7347" }}>
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-5xl">👁️</span>
                    <h3 className="text-2xl font-black text-black uppercase">Our Vision</h3>
                  </div>
                  <p className="text-black font-bold leading-relaxed">
                    To be India&apos;s leading election innovation company, bridging technology and democracy — from local Panchayat elections to national campaigns — through smart, scalable, and affordable solutions.
                  </p>
                </div>
              </SlideIn>
            </div>

            {/* What We Offer */}
            <SlideIn delay={0.3} duration={0.3}>
              <div className="bg-texture bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-4 border-black text-center transition-transform hover:scale-105" style={{ backgroundColor: "#d9f154" }}>
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <span className="text-5xl">⚙️</span>
                  <h3 className="text-3xl font-black text-black uppercase">What We Offer</h3>
                </div>
                <p className="text-lg text-black font-bold max-w-3xl mx-auto">
                  We provide end-to-end campaign tools designed to simplify, amplify, and modernize political outreach.
                </p>
              </div>
            </SlideIn>

            {/* Key Solutions Grid */}
            <div className="space-y-8">
              <SlideIn delay={0.4} duration={0.3}>
                <h3 className="text-3xl font-bold text-center text-brand-purple">
                  Our Key Solutions
                </h3>
              </SlideIn>
              
              <SlideIn delay={0.5} duration={0.3}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {keyServices.map((service, index) => (
                    <ServiceCard
                      key={index}
                      title={service.title}
                      description={service.description}
                      icon={service.icon}
                      color={service.color}
                    />
                  ))}
                </div>
              </SlideIn>
            </div>

            {/* Why Choose Us */}
            <SlideIn delay={0.6} duration={0.3}>
              <div className="bg-texture bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-4 border-black transition-transform hover:scale-105" style={{ backgroundColor: "#692e54" }}>
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-3 mb-6">
                    <span className="text-5xl">🌍</span>
                    <h3 className="text-3xl font-black text-white uppercase">Why Choose Lapo Election Cart</h3>
                  </div>
                </div>
                
                <div className="grid gap-4 max-w-4xl mx-auto">
                  {whyChooseUs.map((reason, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-4 bg-texture rounded-xl p-4 border-4 border-black transition-transform hover:scale-105"
                      style={{ backgroundColor: ABOUT_COLORS[index % ABOUT_COLORS.length] }}
                    >
                      <span className="text-3xl">✅</span>
                      <span className="text-black font-bold text-lg">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SlideIn>

            {/* Partnership CTA */}
            <SlideIn delay={0.7} duration={0.3}>
              <div className="bg-texture bg-gradient-to-r from-brand-blue to-brand-purple rounded-xl p-8 text-white text-center shadow-lg border-4 border-black transition-transform hover:scale-105">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <span className="text-5xl">🤝</span>
                  <h3 className="text-3xl font-black uppercase">Partner With Us</h3>
                </div>
                <p className="text-lg mb-8 font-bold max-w-3xl mx-auto">
                  Join our growing network of distributors and campaign partners. We offer exclusive regional rights, attractive margins, and full marketing support to help you expand political tech services in your area.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ButtonLink 
                    href="/contact" 
                    className="button-cutout bg-gradient-to-b from-brand-orange to-brand-lime from-25% to-75% bg-[length:100%_400%] font-black transition-[filter,background-position] duration-300 hover:bg-bottom text-black hover:text-black px-8 py-4 rounded-lg text-lg hover:scale-105 border-4 border-black uppercase"
                  >
                    Become a Partner
                  </ButtonLink>
                  <ButtonLink 
                    href="/packages" 
                    className="button-cutout bg-gradient-to-b from-brand-purple to-brand-lime from-25% to-75% bg-[length:100%_400%] font-black transition-[filter,background-position] duration-300 hover:bg-bottom text-white hover:text-black px-8 py-4 rounded-lg text-lg hover:scale-105 border-4 border-black uppercase"
                  >
                    Schedule a Demo
                  </ButtonLink>
                </div>
              </div>
            </SlideIn>

            {/* Company Presence */}
            <SlideIn delay={0.8} duration={0.3}>
              <div className="bg-texture bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-4 border-black transition-transform hover:scale-105" style={{ backgroundColor: "#4876ff" }}>
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-3 mb-6">
                    <span className="text-5xl">📍</span>
                    <h3 className="text-3xl font-black text-white uppercase">Our Presence</h3>
                  </div>
                </div>
                <div className="space-y-4 max-w-4xl mx-auto">
                  <p className="text-xl font-black text-white text-center">
                    We believe technology should empower democracy, not complicate it.
                  </p>
                  <p className="text-lg font-bold text-white text-center">
                    At Lapo Election Cart, every innovation — from AI videos to Health ATMs — is designed to strengthen the connection between leaders and the people they serve.
                  </p>
                  <p className="text-lg font-bold text-white text-center">
                    Together, we&apos;re building the future of smart, ethical, and data-driven campaigning in India.
                  </p>
                </div>
              </div>
            </SlideIn>

            {/* Footer Credits */}
            <SlideIn delay={1.0} duration={0.3}>
              <div className="text-center space-y-2 opacity-70">
                <p className="text-sm text-gray-600">
                  © 2025 Lapo Election Cart. All Rights Reserved.
                </p>
                <p className="text-sm text-gray-600">
                  Designed by Suhaim Soft | Powered by Lapo Election Pvt. Ltd.
                </p>
              </div>
            </SlideIn>
          </div>
        </Bounded>
      </section>
    </>
  );
}