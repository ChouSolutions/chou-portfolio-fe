import type { NextConfig } from "next";

// Lấy STRAPI_URL từ env và parse để lấy protocol và hostname
const strapiUrl = process.env.STRAPI_URL || "http://localhost:1337";

// Helper function để parse URL an toàn
function getStrapiImageConfig() {
  try {
    const strapiUrlObj = new URL(strapiUrl);
    return {
      protocol: strapiUrlObj.protocol.replace(":", "") as "http" | "https",
      hostname: strapiUrlObj.hostname,
      ...(strapiUrlObj.port && { port: strapiUrlObj.port }),
      pathname: "/uploads/**",
    };
  } catch (error) {
    // Fallback nếu URL không hợp lệ
    return {
      protocol: "https" as const,
      hostname: "api.choudev.online",
      pathname: "/uploads/**",
    };
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      getStrapiImageConfig(),
      {
        protocol: "https",
        hostname: "api.choudev.online",
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
