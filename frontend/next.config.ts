import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  allowedDevOrigins: ["http://192.168.1.105:3001"], // or whatever port you're using
};

export default nextConfig;
