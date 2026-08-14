export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  workHref: string;
}

export const services: ServiceItem[] = [
  {
    id: "branding",
    number: "01",
    title: "Logo & Brand Identity Design",
    description: "Build a clear and memorable visual identity for your business, from the logo to the complete brand system.",
    tags: ["Logo Design", "Brand Identity", "Social Media Design", "Packaging Design"],
    workHref: "/works?service=branding",
  },
  {
    id: "website-design-development",
    number: "02",
    title: "Business & Corporate Websites",
    description: "Custom websites designed and developed to help businesses look professional, communicate clearly, and convert visitors.",
    tags: ["Business Websites", "UI/UX Design", "WordPress"],
    workHref: "/works?service=website-design",
  },
  {
    id: "ecommerce-digital-platforms",
    number: "03",
    title: "Ecommerce Websites & Digital Platforms",
    description: "Digital platforms built around how your business actually works, from online stores to learning platforms and custom products.",
    tags: ["Ecommerce", "Online Course Platforms", "Customer Portals", "Custom Platforms"],
    workHref: "/works?service=ecommerce",
  },
  {
    id: "brand-strategy-content",
    number: "04",
    title: "Brand Strategy & Content",
    description: "Strategy and creative direction that helps your brand communicate consistently and show up with purpose.",
    tags: ["Brand Strategy", "Consultation", "Photography", "Video & Content"],
    workHref: "/works?service=brand-strategy-content",
  },
];
