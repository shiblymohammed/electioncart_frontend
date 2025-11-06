"use client";

import { Bounded } from "@/components/Bounded";
import { SlideIn } from "@/components/SlideIn";
import { ButtonLink } from "@/components/ButtonLink";

export function AboutSection() {
  return (
    <Bounded className="bg-texture bg-brand-gray">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-6">
          <SlideIn delay={0} duration={0.3}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy uppercase tracking-tight font-sans">
              About Lapo Election Cart
            </h1>
          </SlideIn>
          
          <SlideIn delay={0.1} duration={0.3}>
            <p className="text-xl font-bold text-brand-orange max-w-3xl mx-auto">
              India&apos;s First eCommerce Platform for Election Campaigns
            </p>
          </SlideIn>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <SlideIn delay={0.2} duration={0.3}>
            <div className="space-y-6">
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Lapo Election Cart revolutionizes political campaigning by providing cutting-edge tools and services through a single online platform.
                </p>
                <p className="text-lg leading-relaxed">
                  From AI-powered video creation to Health ATMs for ethical voter engagement, we help candidates across India run smarter, more effective campaigns.
                </p>
                <p className="text-lg leading-relaxed">
                  Backed by Lapo Election Pvt. Ltd., Pune, we&apos;re committed to making modern campaign technology accessible to everyone - from Panchayat to Parliamentary elections.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <ButtonLink href="/about" color="purple">
                  Learn More About Us
                </ButtonLink>
                <ButtonLink href="/contact" color="orange">
                  Get in Touch
                </ButtonLink>
              </div>
            </div>
          </SlideIn>

          {/* Right Content - Stats/Features */}
          <SlideIn delay={0.3} duration={0.3}>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-4 border-black shadow-lg text-center">
                <div className="text-4xl mb-3">🚁</div>
                <h3 className="font-black text-brand-navy text-lg uppercase mb-2">
                  Campaign Tools
                </h3>
                <p className="text-gray-700 font-bold text-sm">
                  AI Videos, Health ATMs, WhatsApp Messaging & More
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-4 border-black shadow-lg text-center">
                <div className="text-4xl mb-3">🇮🇳</div>
                <h3 className="font-black text-brand-navy text-lg uppercase mb-2">
                  Pan-India
                </h3>
                <p className="text-gray-700 font-bold text-sm">
                  Serving Candidates Across All States & Elections
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-4 border-black shadow-lg text-center">
                <div className="text-4xl mb-3">💡</div>
                <h3 className="font-black text-brand-navy text-lg uppercase mb-2">
                  Innovation
                </h3>
                <p className="text-gray-700 font-bold text-sm">
                  First-of-its-Kind Election eCommerce Platform
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-4 border-black shadow-lg text-center">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="font-black text-brand-navy text-lg uppercase mb-2">
                  Support
                </h3>
                <p className="text-gray-700 font-bold text-sm">
                  24/7 Technical Assistance & Campaign Guidance
                </p>
              </div>
            </div>
          </SlideIn>
        </div>

        {/* Mission Statement */}
        <SlideIn delay={0.4} duration={0.3}>
          <div className="bg-gradient-to-r from-brand-blue to-brand-purple rounded-xl p-8 text-center border-4 border-black">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-white uppercase">
                Our Mission
              </h3>
              <p className="text-white font-bold text-lg max-w-3xl mx-auto leading-relaxed">
                To empower every political candidate with innovative campaign technology that builds stronger voter connections, enhances visibility, and ensures impactful results — ethically and effectively.
              </p>
            </div>
          </div>
        </SlideIn>
      </div>
    </Bounded>
  );
}