import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.feranmiojediji.com"),
  title: "Feranmi Ojediji | Web Designer & Creative",
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
    title: "Feranmi Ojediji | Web Designer & Creative",
    description:
      "Web designer crafting purposeful online presence. Specializing in website design, branding, UI/UX, AI automation, and digital strategy.",
    url: "https://www.feranmiojediji.com",
    images: [{ url: "/feranmi.jpg", width: 1200, height: 630, alt: "Feranmi Ojediji" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feranmi Ojediji | Web Designer & Creative",
    description:
      "Web designer crafting purposeful online presence. Specializing in website design, branding, UI/UX, AI automation, and digital strategy.",
    images: ["/feranmi.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Anti-FOUC: runs synchronously before paint, sets data-theme from localStorage */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch{document.documentElement.setAttribute('data-theme','light')}})();`,
          }}
        />
        <link rel="preload" as="image" href="/feranmi.jpg" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Feranmi Ojediji",
              url: "https://www.feranmiojediji.com",
              image: "https://www.feranmiojediji.com/feranmi.jpg",
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
