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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        {/* Load font early — prevents flash of fallback font */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&display=swap"
        />
        {/* Preload hero image so LCP fires fast */}
        <link rel="preload" as="image" href="/feranmi.jpg" />
        {/* Anti-FOUC: apply saved theme before first paint */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased" style={{ background: "var(--bg)", color: "var(--txt)" }}>
        {children}

      </body>
    </html>
  );
}
