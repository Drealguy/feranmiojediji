import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feranmi Ojediji — Web Designer & Creative",
  description:
    "Web designer crafting purposeful online presence. Specializing in website design, branding, UI/UX, AI automation, and digital strategy.",
  icons: {
    icon: "/feranmilogo.png",
    apple: "/feranmilogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        {/* Preload hero image so LCP fires fast */}
        <link rel="preload" as="image" href="/feranmi.jpg" />
      </head>
      <body className="min-h-full flex flex-col antialiased" style={{ background: "var(--bg)", color: "var(--txt)" }}>
        {/* Anti-FOUC: set theme before first paint */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);})();`}
        </Script>

        {children}

        {/* Load font non-blocking after page is interactive */}
        <Script
          id="clash-grotesk-font"
          strategy="afterInteractive"
        >
          {`(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&display=swap';document.head.appendChild(l);})();`}
        </Script>
      </body>
    </html>
  );
}
