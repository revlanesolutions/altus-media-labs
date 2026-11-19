import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

// Allow phone previews through this computer's current network addresses.
const localNetworkHosts = Object.values(networkInterfaces())
  .flatMap((addresses) => addresses ?? [])
  .filter((address) => address.family === "IPv4" && !address.internal)
  .map((address) => address.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: localNetworkHosts,
  reactStrictMode: true,
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.altusmedialabs.com",
          },
        ],
        destination: "https://altusmedialabs.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
