import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: false,
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_APP_URL,
    SESSION_PASSWORD: process.env.SESSION_PASSWORD,
  },
};

export default nextConfig;
