import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feranmi Ojediji — Web Designer & Creative",
  description:
    "Web designer crafting purposeful online presence. Specializing in website design, branding, UI/UX, AI automation, and digital strategy.",
  icons: {
    icon: "/feranmilogo.png",
    apple: "/feranmilogo.png",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Feranmi Ojediji",
    title: "Feranmi Ojediji — Web Designer & Creative",
    description:
      "Web designer crafting purposeful online presence. Specializing in website design, branding, UI/UX, AI automation, and digital strategy.",
    url: "https://feranmiojediji.com",
    images: [{ url: "/feranmi.jpg", width: 1200, height: 630, alt: "Feranmi Ojediji" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feranmi Ojediji — Web Designer & Creative",
    description:
      "Web designer crafting purposeful online presence. Specializing in website design, branding, UI/UX, AI automation, and digital strategy.",
    images: ["/feranmi.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC: runs synchronously before paint, sets data-theme from localStorage */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&display=swap"
        />
        <link rel="preload" as="image" href="/feranmi.jpg" />
      </head>
      <body className="min-h-full flex flex-col antialiased" style={{ background: "var(--bg)", color: "var(--txt)" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Feranmi Ojediji",
              url: "https://feranmiojediji.com",
              image: "https://feranmiojediji.com/feranmi.jpg",
              jobTitle: "Web Designer & Creative Director",
              description: "Web designer crafting purposeful online presence. Specializing in website design, branding, UI/UX, AI automation, and digital strategy.",
              address: { "@type": "PostalAddress", addressLocality: "Akure", addressCountry: "NG" },
              sameAs: [
                "https://www.instagram.com/feranmi.ojediji/",
                "https://x.com/feranmiojediji",
                "https://www.facebook.com/feranmi.ojediji.3/",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
