import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </ThemeProvider>
  );
}
