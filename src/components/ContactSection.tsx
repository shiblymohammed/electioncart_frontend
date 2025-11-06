"use client";

import { useState } from "react";
import { Heading } from "@/components/Heading";
import { SlideIn } from "@/components/SlideIn";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // TODO: Replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitStatus({
        type: "success",
        message: "Thank you! We'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-texture bg-brand-navy text-white py-10 sm:py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-lime rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-orange rounded-full blur-3xl animate-pulse-slower"></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-brand-blue rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="mx-auto w-full max-w-6xl relative z-10">
        {/* Header */}
        <SlideIn>
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <Heading className="mb-4 sm:mb-4 text-white" as="h2">
              GET IN TOUCH
            </Heading>
            <p className="text-sm sm:text-base lg:text-lg text-brand-lime max-w-2xl mx-auto leading-relaxed font-bold px-4">
              Have questions? We&apos;re here to help you win your campaign!
            </p>
          </div>
        </SlideIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16">
          {/* Contact Form - First on Mobile, Second on Desktop */}
          <SlideIn>
            <div className="lg:order-2">
              <div className="bg-white rounded-2xl p-5 sm:p-8 md:p-10 shadow-2xl max-w-2xl mx-auto lg:max-w-none">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-brand-navy mb-4 sm:mb-6 md:mb-8 text-center md:text-left">
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                  {/* Name & Email - Side by side on tablet */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-brand-navy font-bold mb-1.5 sm:mb-2 text-xs sm:text-sm"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-3 sm:px-4 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 focus:outline-none text-brand-navy font-medium transition-all duration-300 text-sm sm:text-base hover:border-brand-navy/50"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-brand-navy font-bold mb-1.5 sm:mb-2 text-xs sm:text-sm"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-3 sm:px-4 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 focus:outline-none text-brand-navy font-medium transition-all duration-300 text-sm sm:text-base hover:border-brand-navy/50"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject - Side by side on tablet */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-brand-navy font-bold mb-1.5 sm:mb-2 text-xs sm:text-sm"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-3 sm:px-4 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 focus:outline-none text-brand-navy font-medium transition-all duration-300 text-sm sm:text-base hover:border-brand-navy/50"
                        placeholder="+91 1234567890"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-brand-navy font-bold mb-1.5 sm:mb-2 text-xs sm:text-sm"
                      >
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-3 sm:px-4 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 focus:outline-none text-brand-navy font-medium transition-all duration-300 text-sm sm:text-base hover:border-brand-navy/50"
                      >
                        <option value="">Select a subject</option>
                        <option value="package">Package Inquiry</option>
                        <option value="campaign">Campaign Service</option>
                        <option value="custom">Custom Solution</option>
                        <option value="support">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-brand-navy font-bold mb-1.5 sm:mb-2 text-xs sm:text-sm"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-3 py-3 sm:px-4 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 focus:outline-none text-brand-navy font-medium transition-all duration-300 resize-none text-sm sm:text-base min-h-[100px] sm:min-h-[120px] hover:border-brand-navy/50"
                      placeholder="Tell us about your needs..."
                    />
                  </div>

                  {/* Submit Status */}
                  {submitStatus.type && (
                    <div
                      className={`p-3 sm:p-4 rounded-lg text-center font-bold text-xs sm:text-sm animate-fadeIn ${
                        submitStatus.type === "success"
                          ? "bg-green-100 text-green-800 border-2 border-green-300"
                          : "bg-red-100 text-red-800 border-2 border-red-300"
                      }`}
                    >
                      {submitStatus.type === "success" ? "✓ " : "✗ "}
                      {submitStatus.message}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-cutout w-full bg-brand-navy text-white font-black text-sm sm:text-base md:text-lg px-6 py-4 sm:py-4 uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 relative overflow-hidden group"
                  >
                    <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Message"}</span>
                    {!isSubmitting && (
                      <span className="absolute inset-0 bg-gradient-to-r from-brand-lime/20 to-brand-orange/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </SlideIn>

          {/* Contact Info - Second on Mobile, First on Desktop */}
          <SlideIn>
            <div className="space-y-8 md:space-y-10 lg:order-1 lg:sticky lg:top-24 lg:self-start">
              <div className="text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 text-brand-lime">
                  Let&apos;s Connect
                </h3>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0">
                  Ready to transform your campaign? Reach out to us and let&apos;s discuss how we can help you achieve victory.
                </p>
              </div>

              {/* Contact Details - Grid on Tablet */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 md:gap-6 lg:gap-6">
                {/* Email */}
                <div className="flex items-start gap-4 md:gap-5 p-4 md:p-5 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 lg:w-12 lg:h-12 bg-brand-lime rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <svg
                      className="w-7 h-7 md:w-8 md:h-8 lg:w-6 lg:h-6 text-brand-navy"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-black text-base md:text-lg mb-1 md:mb-2 transition-colors group-hover:text-brand-lime">Email</h4>
                    <a
                      href="mailto:info@lapoelectioncart.com"
                      className="text-brand-lime hover:underline text-sm md:text-base break-words transition-all"
                    >
                      info@lapoelectioncart.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 md:gap-5 p-4 md:p-5 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 lg:w-12 lg:h-12 bg-brand-lime rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <svg
                      className="w-7 h-7 md:w-8 md:h-8 lg:w-6 lg:h-6 text-brand-navy"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-black text-base md:text-lg mb-1 md:mb-2 transition-colors group-hover:text-brand-lime">Phone</h4>
                    <a
                      href="tel:+911234567890"
                      className="text-brand-lime hover:underline text-sm md:text-base transition-all"
                    >
                      +91 123 456 7890
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 md:gap-5 p-4 md:p-5 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 lg:w-12 lg:h-12 bg-brand-lime rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <svg
                      className="w-7 h-7 md:w-8 md:h-8 lg:w-6 lg:h-6 text-brand-navy"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-black text-base md:text-lg mb-1 md:mb-2 transition-colors group-hover:text-brand-lime">Location</h4>
                    <p className="text-white text-sm md:text-base transition-colors group-hover:text-brand-lime/80">
                      Pune, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8 md:pt-10 border-t border-white/20 md:col-span-2 lg:col-span-1 lg:border-t-0 lg:pt-0">
                <h4 className="font-black text-base sm:text-lg mb-5 sm:mb-6 text-center md:text-left">Follow Us</h4>
                <div className="flex gap-4 sm:gap-5 justify-center md:justify-start">
                  <a
                    href="#"
                    className="w-12 h-12 sm:w-11 sm:h-11 bg-brand-lime rounded-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6 sm:w-5 sm:h-5 text-brand-navy" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 sm:w-11 sm:h-11 bg-brand-lime rounded-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
                    aria-label="Twitter"
                  >
                    <svg className="w-6 h-6 sm:w-5 sm:h-5 text-brand-navy" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 sm:w-11 sm:h-11 bg-brand-lime rounded-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-6 h-6 sm:w-5 sm:h-5 text-brand-navy" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
