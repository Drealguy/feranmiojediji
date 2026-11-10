import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root. Without this, a stray C:\Users\USER\package-lock.json
  // makes Next watch the whole user folder, and unrelated file changes there
  // trigger full page reloads in development.
  turbopack: { root: __dirname },
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  // The work pages moved from /work to /projects; keep old links working.
  async redirects() {
    return [
      { source: "/work", destination: "/projects", permanent: true },
      { source: "/work/:slug", destination: "/projects/:slug", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // Production only: dev chunks keep the same name between edits, so a
      // year-long immutable cache would serve stale CSS/JS while developing.
      ...(process.env.NODE_ENV === "production"
        ? [
            {
              source: "/:path(.*\\.(?:js|css|woff2?|png|jpg|jpeg|svg|ico))",
              headers: [
                { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
              ],
            },
          ]
        : []),
    ];
  },
};

export default nextConfig;
