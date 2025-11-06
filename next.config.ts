import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
];

const nextConfig: NextConfig = {
  // Production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.onrender.com",
        pathname: "/media/**",
      },
      // Development only
      ...(process.env.NODE_ENV === "development"
        ? [
            {
              protocol: "http" as const,
              hostname: "localhost",
              port: "8000",
              pathname: "/media/**",
            },
            {
              protocol: "http" as const,
              hostname: "127.0.0.1",
              port: "8000",
              pathname: "/media/**",
            },
          ]
        : []),
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
