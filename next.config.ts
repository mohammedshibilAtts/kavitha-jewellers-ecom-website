import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
       {
        protocol: "https",
        hostname: "aupay-img.s3.eu-north-1.amazonaws.com",
      },
       {
        protocol: "https",
        hostname: "aupay-cdn.aupay.auss.co",
      },
    ],
  },
};

export default nextConfig;


