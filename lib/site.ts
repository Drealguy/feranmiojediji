export interface FooterLink {
  label: string;
  /** Leave undefined until the real URL is known: it renders as plain text. */
  href?: string;
}

export const WHATSAPP_URL =
  "https://wa.me/2349167802170?text=Hi%20Feranmi%2C%20I%E2%80%99d%20like%20to%20start%20a%20project.";

export const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "About", href: "/about" },
      { label: "Maintenance", href: "/maintenance" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Billam", href: "https://billam-gules.vercel.app/" },
      { label: "Showya", href: "https://showya.shop" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Vibecoding Mastery", href: "https://courses.feranmiojediji.com" },
      { label: "My Books", href: "/books" },
      { label: "Community" }, // TODO: community URL
    ],
  },
];

export type SocialName = "instagram" | "facebook" | "x" | "linkedin" | "youtube";

export const socials: { name: SocialName; label: string; href?: string }[] = [
  { name: "instagram", label: "Instagram", href: "https://www.instagram.com/feranmi.ojediji/" },
  { name: "facebook", label: "Facebook", href: "https://www.facebook.com/feranmi.ojediji.3/" },
  { name: "x", label: "X", href: "https://x.com/feranmiojediji" },
  { name: "linkedin", label: "LinkedIn" }, // TODO: LinkedIn URL
  { name: "youtube", label: "YouTube" }, // TODO: YouTube URL
];
