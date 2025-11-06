"use client";

import { Bounded } from "@/components/Bounded";
import { PageHeader } from "@/components/PageHeader";
import { SlideIn } from "@/components/SlideIn";

const CONTACT_COLORS = ["#4876ff", "#ff7347", "#d9f154", "#692e54"];

export default function ContactPage() {
  return (
    <>
      <PageHeader 
        title="Contact Us"
        description="Get in touch with India's No.1 Election Campaign Partner. We're here to help you plan, launch, and win your next election campaign with cutting-edge tools and strategies."
      />
      
      <section className="bg-texture bg-brand-gray min-h-screen">
        <Bounded>
          <div className="space-y-16 py-16">

          {/* Contact Information Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Head Office */}
            <SlideIn delay={0.1} duration={0.3}>
              <div className="bg-texture bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-4 border-black transition-transform hover:scale-105" style={{ backgroundColor: "#4876ff" }}>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-6">
                      <span className="text-3xl sm:text-5xl">🏢</span>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase text-center">Our Head Office</h3>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-texture rounded-xl p-4 border-4 border-black" style={{ backgroundColor: "#d9f154" }}>
                      <h4 className="font-black text-xl text-black mb-2 uppercase">Lapo Election Pvt. Ltd.</h4>
                      <p className="text-black font-bold">Pune, Maharashtra, India</p>
                    </div>
                    
                    <div className="grid gap-3">
                      <div className="bg-texture rounded-xl p-4 border-4 border-black transition-transform hover:scale-105" style={{ backgroundColor: "#ff7347" }}>
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">📞</span>
                          <div>
                            <p className="font-black text-black uppercase">Phone:</p>
                            <a 
                              href="tel:+919746263653" 
                              className="text-black hover:text-white transition-colors text-lg font-bold"
                            >
                              +91-9746263653
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-texture rounded-xl p-4 border-4 border-black transition-transform hover:scale-105" style={{ backgroundColor: "#692e54" }}>
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">📧</span>
                          <div>
                            <p className="font-black text-white uppercase">Email:</p>
                            <a 
                              href="mailto:info@lapoelectioncart.com" 
                              className="text-white hover:text-yellow-300 transition-colors font-bold break-all text-sm sm:text-base"
                            >
                              info@lapoelectioncart.com
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-texture rounded-xl p-4 border-4 border-black transition-transform hover:scale-105" style={{ backgroundColor: "#d9f154" }}>
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">🌐</span>
                          <div>
                            <p className="font-black text-black uppercase">Website:</p>
                            <a 
                              href="https://www.lapoelectioncart.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-black hover:text-blue-600 transition-colors font-bold text-sm sm:text-base break-all"
                            >
                              www.lapoelectioncart.com
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>

            {/* Quick Assistance */}
            <SlideIn delay={0.2} duration={0.3}>
              <div className="bg-texture bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-4 border-black transition-transform hover:scale-105" style={{ backgroundColor: "#ff7347" }}>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-6">
                      <span className="text-3xl sm:text-5xl">💬</span>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-black uppercase text-center">Quick Assistance</h3>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-texture rounded-xl p-4 border-4 border-black" style={{ backgroundColor: "#d9f154" }}>
                      <p className="text-black font-bold text-center text-sm sm:text-base">
                        Our support team is available <br/>
                        <span className="font-black text-lg sm:text-xl">MONDAY TO SATURDAY<br/>10 AM – 7 PM (IST)</span>
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-black text-black mb-3 text-center text-sm sm:text-lg uppercase">Reach out to us for:</p>
                      <div className="grid gap-2">
                        {[
                          "Product inquiries and demos",
                          "Custom campaign packages", 
                          "Distributor partnership details",
                          "Technical or payment support"
                        ].map((item, idx) => (
                          <div 
                            key={idx}
                            className="bg-texture rounded-xl p-2 sm:p-3 border-4 border-black font-bold text-center transition-transform hover:scale-105"
                            style={{ backgroundColor: CONTACT_COLORS[idx % CONTACT_COLORS.length] }}
                          >
                            <span className="text-black text-sm sm:text-base">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* WhatsApp Section */}
          <SlideIn delay={0.3} duration={0.3}>
            <div className="bg-texture bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center shadow-lg border-4 border-black transition-transform hover:scale-105">
              <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-6">
                <span className="text-3xl sm:text-5xl">📱</span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-center">Prefer WhatsApp?</h3>
              </div>
              <p className="text-sm sm:text-lg mb-6 font-bold px-4">
                Click below to chat directly with our support team — quick responses guaranteed.
              </p>
              <a
                href="https://wa.me/919746263653?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Lapo%20Election%20Cart%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="button-cutout inline-flex items-center space-x-2 sm:space-x-3 bg-white text-green-600 px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-black text-sm sm:text-lg hover:bg-gray-100 transition-all hover:scale-105 border-4 border-black"
              >
                <span className="text-2xl sm:text-3xl">📱</span>
                <span className="uppercase text-xs sm:text-base">Send via WhatsApp</span>
              </a>
            </div>
          </SlideIn>

          {/* Contact Form Section */}
          <SlideIn delay={0.4} duration={0.3}>
            <div className="bg-texture bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-8 shadow-lg border-4 border-black transition-transform hover:scale-105 max-w-4xl mx-auto" style={{ backgroundColor: "#d9f154" }}>
              <div className="space-y-8">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-6">
                    <span className="text-3xl sm:text-5xl">✉️</span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-black uppercase text-center">Send us a Message</h3>
                  </div>
                </div>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-black text-black mb-2 uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border-4 border-black rounded-lg focus:border-brand-blue focus:outline-none transition-all font-bold bg-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-black text-black mb-2 uppercase">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-4 py-3 border-4 border-black rounded-lg focus:border-brand-blue focus:outline-none transition-all font-bold bg-white"
                        placeholder="+91-XXXXXXXXXX"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-black text-black mb-2 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border-4 border-black rounded-lg focus:border-brand-blue focus:outline-none transition-all font-bold bg-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-black text-black mb-2 uppercase">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border-4 border-black rounded-lg focus:border-brand-blue focus:outline-none transition-all font-bold bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="demo-request">Demo Request</option>
                      <option value="distributor-partnership">Distributor Partnership</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="payment-support">Payment Support</option>
                      <option value="custom-package">Custom Campaign Package</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-black text-black mb-2 uppercase">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-4 border-black rounded-lg focus:border-brand-blue focus:outline-none transition-all resize-vertical font-bold bg-white"
                      placeholder="Tell us about your requirements, questions, or how we can help you..."
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      className="button-cutout bg-gradient-to-b from-brand-orange to-brand-lime from-25% to-75% bg-[length:100%_400%] font-black transition-[filter,background-position] duration-300 hover:bg-bottom text-black hover:text-black px-8 py-4 rounded-lg text-lg hover:scale-105 border-4 border-black uppercase"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </SlideIn>
          </div>
        </Bounded>
      </section>
    </>
  );
}

