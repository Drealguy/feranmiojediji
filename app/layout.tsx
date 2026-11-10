import type { Metadata } from "next";
import Animations from "@/components/Animations";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { interTight } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.feranmiojediji.com"),
  title: "Feranmi Ojediji | Product & Software Builder",
  description:
    "Feranmi Ojediji designs and builds software, digital products, business websites and AI automations for ambitious brands and businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${interTight.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Animations />
        <Navbar />
        <main className="flex-1 px-3 sm:px-6 lg:px-10">
          <div className="mx-auto min-h-full max-w-[76rem] border-x border-line">
            {children}
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
