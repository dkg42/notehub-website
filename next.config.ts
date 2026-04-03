import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Allow the /auth page to be embedded in an iframe by Chrome extensions
        source: '/auth',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' chrome-extension://*",
          },
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
