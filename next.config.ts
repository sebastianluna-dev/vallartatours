import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next dev` would otherwise append its own block to CLAUDE.md on every
  // start; AGENTS.md already points agents to node_modules/next/dist/docs.
  agentRules: false,
  images: {
    // The photographs are large JPEGs: AVIF halves their weight again.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
