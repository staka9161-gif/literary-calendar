import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/buntomo",
        destination: "https://buntomo.vercel.app/buntomo",
      },
      {
        source: "/buntomo/:path*",
        destination: "https://buntomo.vercel.app/buntomo/:path*",
      },
    ];
  },
};

export default nextConfig;
