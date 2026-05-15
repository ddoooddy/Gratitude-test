import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash (default/demo images)
      { protocol: "https", hostname: "images.unsplash.com" },
      // Cloudinary
      { protocol: "https", hostname: "res.cloudinary.com" },
      // Supabase Storage
      { protocol: "https", hostname: "*.supabase.co" },
      // AWS S3
      { protocol: "https", hostname: "*.amazonaws.com" },
    ],
  },
  // Allow serving large files via API
  experimental: {
    serverActions: { bodySizeLimit: "10mb" },
  },
};

export default nextConfig;
