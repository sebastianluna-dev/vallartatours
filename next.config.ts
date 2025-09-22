import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // `next dev` would otherwise append its own block to CLAUDE.md on every
  // start; AGENTS.md already points agents to node_modules/next/dist/docs.
  agentRules: false,
  images: {
    // The photographs are large JPEGs: AVIF halves their weight again.
    formats: ["image/avif", "image/webp"],
    // Next 16 only optimises the qualities named here. The site serves its
    // photographs at the top of the scale (`PHOTO_QUALITY` in
    // constants/site.const.ts); nothing asks for another one.
    qualities: [100],
  },
};

// The plugin points next-intl to the request config that loads the messages.
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
