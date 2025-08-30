import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // `next dev` would otherwise append its own block to CLAUDE.md on every
  // start; AGENTS.md already points agents to node_modules/next/dist/docs.
  agentRules: false,
  images: {
    // The photographs are large JPEGs: AVIF halves their weight again.
    formats: ["image/avif", "image/webp"],
  },
};

// The plugin points next-intl to the request config that loads the messages.
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
