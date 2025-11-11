import type { NextConfig } from "next";

// Lấy STRAPI_URL từ env và parse để lấy protocol và hostname
const strapiUrl = process.env.STRAPI_URL || "http://localhost:1337";
const strapiUrlObj = new URL(strapiUrl);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: strapiUrlObj.protocol.replace(":", "") as "http" | "https",
        hostname: strapiUrlObj.hostname,
        ...(strapiUrlObj.port && { port: strapiUrlObj.port }),
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
