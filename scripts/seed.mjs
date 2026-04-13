import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const tx = client.transaction();

// ── Site Settings ──────────────────────────────────────────────
tx.createOrReplace({
  _id: "siteSettings",
  _type: "siteSettings",
  siteName: "Feranmi Ojediji",
  tagline: "Web designer crafting purposeful online presence",
  email: "theojediji@gmail.com",
  phone: "09167802170",
  location: "Lagos, Nigeria",
  available: true,
  availabilityText: "Taking on new projects for Q3 2025",
  socials: { twitter: "", linkedin: "", dribbble: "", instagram: "" },
});

// ── Home Page ──────────────────────────────────────────────────
tx.createOrReplace({
  _id: "homePage",
  _type: "homePage",
  badgeText: "Available for work",
  headline: "Web designer crafting",
  headlineAccent: "purposeful",
  headlineSuffix: "online presence",
  subtitle: "I help brands grow through strategic design — from websites to full brand identities. Clean, fast, and built to convert.",
  primaryCtaText: "See my work",
  primaryCtaHref: "/works",
  secondaryCtaText: "Book a call",
  secondaryCtaHref: "/contact",
  stats: [
    { value: "8+", label: "Years of experience" },
    { value: "120+", label: "Projects delivered" },
    { value: "35+", label: "Happy clients" },
    { value: "99%", label: "Client satisfaction" },
  ],
  videoLabel: "Watch the process — 4 min",
});

// ── About Page ─────────────────────────────────────────────────
tx.createOrReplace({
  _id: "about",
  _type: "about",
  headline: "Designer by craft,",
  headlineAccent: "builder",
  headlineSuffix: "by nature",
  bio: [
    "I'm Feranmi Ojediji — a web designer and digital creative helping brands show up powerfully online. I've spent the past 8+ years working at the intersection of design, technology, and strategy.",
    "My work isn't just about making things look good — it's about making things work. Every project is rooted in purpose, built to convert, and designed to last.",
  ],
  timeline: [
    { year: "2016", event: "Started freelancing — first logo for a family business." },
    { year: "2018", event: "Landed first brand identity project for a tech startup." },
    { year: "2020", event: "Transitioned fully to web design and digital product work." },
    { year: "2022", event: "Expanded into AI automation and digital strategy consulting." },
    { year: "2025", event: "120+ projects delivered. Still going." },
  ],
  tools: ["Figma", "Webflow", "Framer", "Adobe Creative Suite", "ChatGPT / Claude", "Make.com", "Notion", "Lottie"],
  ctaText: "Ready to build something great?",
  ctaSubtext: "I'm selective about the projects I take on — so if we're a good fit, let's talk.",
});

// ── Services ───────────────────────────────────────────────────
const services = [
  { _id: "service-1", number: "01", title: "Website Design", description: "High-converting websites that look great and perform even better. Built in Webflow or custom-coded.", tags: ["Webflow", "Framer", "UI/UX"], order: 1 },
  { _id: "service-2", number: "02", title: "Brand Identity", description: "Full brand systems — logo, colour, type, and guidelines. Built to grow with your business.", tags: ["Logo", "Identity", "Strategy"], order: 2 },
  { _id: "service-3", number: "03", title: "UI/UX Design", description: "Product design that users love. From wireframes to polished prototypes ready for development.", tags: ["Figma", "Prototyping", "Research"], order: 3 },
  { _id: "service-4", number: "04", title: "AI Automation", description: "Automate your workflows with AI. Content pipelines, lead generation, and client onboarding — on autopilot.", tags: ["Make.com", "AI", "Workflows"], order: 4 },
  { _id: "service-5", number: "05", title: "Strategy & Growth", description: "Digital strategy that connects design to business outcomes. Positioning, funnels, and go-to-market planning.", tags: ["Strategy", "Growth", "Consulting"], order: 5 },
];
services.forEach((s) => tx.createOrReplace({ _type: "service", ...s }));

// ── Projects ───────────────────────────────────────────────────
const projects = [
  { _id: "project-1", title: "Lumina — Brand Identity", slug: { current: "lumina-brand-identity" }, category: "Branding", year: "2025", description: "Full brand identity system for a Lagos-based design studio.", accentColor: "#c8f53c", tags: ["Logo", "Identity", "Guidelines"], featured: true, order: 1 },
  { _id: "project-2", title: "Revive — SaaS Dashboard", slug: { current: "revive-saas-dashboard" }, category: "UI/UX Design", year: "2024", description: "End-to-end product design for a health-tech startup.", accentColor: "#a78bfa", tags: ["Product Design", "Figma", "Prototyping"], featured: true, order: 2 },
  { _id: "project-3", title: "Forma — Agency Website", slug: { current: "forma-agency-website" }, category: "Website Design", year: "2024", description: "Award-nominated website for a creative agency.", accentColor: "#60a5fa", tags: ["Webflow", "Animation", "CMS"], featured: true, order: 3 },
  { _id: "project-4", title: "Cleo — E-commerce Store", slug: { current: "cleo-ecommerce" }, category: "Website Design", year: "2024", description: "Fashion e-commerce website focused on conversion.", accentColor: "#f472b6", tags: ["E-commerce", "Webflow", "Mobile"], featured: false, order: 4 },
  { _id: "project-5", title: "AutoFlow — AI Workflow", slug: { current: "autoflow-ai" }, category: "AI Automation", year: "2025", description: "AI-powered content and lead generation system.", accentColor: "#34d399", tags: ["Make.com", "AI", "Automation"], featured: false, order: 5 },
  { _id: "project-6", title: "Meridian — Brand & Web", slug: { current: "meridian-brand-web" }, category: "Branding", year: "2023", description: "Brand identity and marketing site for a fintech company.", accentColor: "#fb923c", tags: ["Branding", "Web", "Fintech"], featured: false, order: 6 },
];
projects.forEach((p) => tx.createOrReplace({ _type: "project", ...p }));

// ── Testimonials ───────────────────────────────────────────────
const testimonials = [
  { _id: "testimonial-1", quote: "Feranmi completely transformed our brand. The attention to detail and strategic thinking behind every decision was remarkable.", name: "Amara Osei", role: "CEO", company: "Lumina Studio", initials: "AO", accentColor: "#c8f53c", order: 1 },
  { _id: "testimonial-2", quote: "Working with Feranmi was seamless. He delivered a world-class product that our users love — on time and beyond expectations.", name: "David Mensah", role: "Founder", company: "Revive Health", initials: "DM", accentColor: "#a78bfa", order: 2 },
  { _id: "testimonial-3", quote: "The website Feranmi built for us generated 3x more leads in the first month. Incredible ROI and a beautiful design to boot.", name: "Chioma Adeyemi", role: "Director", company: "Forma Agency", initials: "CA", accentColor: "#60a5fa", order: 3 },
];
testimonials.forEach((t) => tx.createOrReplace({ _type: "testimonial", ...t }));

// ── FAQ ────────────────────────────────────────────────────────
const faqs = [
  { _id: "faq-1", question: "What does your design process look like?", answer: "I start with a discovery call to understand your goals, audience, and vision. From there I move through research, moodboards, wireframes, high-fidelity design, and handoff — keeping you in the loop at every stage.", order: 1 },
  { _id: "faq-2", question: "How long does a typical project take?", answer: "It depends on scope. A landing page takes 1–2 weeks. A full website or brand identity is usually 3–6 weeks. Larger projects are planned in sprints and scoped before we start.", order: 2 },
  { _id: "faq-3", question: "Do you work with startups or only established businesses?", answer: "Both. I've worked with early-stage founders building their first brand and scaling companies refreshing an existing one. If you have a clear vision (or need help finding one), we can work together.", order: 3 },
  { _id: "faq-4", question: "What do I need to prepare before we start working?", answer: "Ideally: a clear brief, examples of styles you like, your brand assets (if any), and access to any existing accounts. We'll walk through everything in the kickoff call.", order: 4 },
  { _id: "faq-5", question: "Do you offer revisions?", answer: "Yes — all packages include revision rounds. I work iteratively so by the time we reach the final delivery, the design is already close to what you envisioned.", order: 5 },
  { _id: "faq-6", question: "Can you build the website as well, or just design it?", answer: "I do both. I design and build in Webflow for most client sites. For custom dev needs, I collaborate with trusted development partners.", order: 6 },
];
faqs.forEach((f) => tx.createOrReplace({ _type: "faqItem", ...f }));

// ── Pricing Plans ──────────────────────────────────────────────
const plans = [
  { _id: "plan-1", name: "Starter", price: "500", priceNGN: "800,000", tagline: "Perfect for personal brands and simple landing pages.", accentColor: "#787878", featured: false, features: ["Single-page website / landing page", "Mobile-responsive design", "Webflow development", "2 revision rounds", "7-day delivery", "Basic SEO setup"], notIncluded: ["Brand identity", "AI automation", "Strategy session"], order: 1 },
  { _id: "plan-2", name: "Business", price: "1,500", priceNGN: "2,400,000", tagline: "For growing brands that need a full web presence.", accentColor: "#60a5fa", featured: false, features: ["Up to 5-page website", "Custom UI design in Figma", "Webflow development", "Basic brand refresh", "3 revision rounds", "14-day delivery", "SEO optimisation"], notIncluded: ["Full brand identity", "AI automation"], order: 2 },
  { _id: "plan-3", name: "Growth", price: "3,500", priceNGN: "5,600,000", tagline: "Our most popular — website, brand, and strategy in one.", accentColor: "#c8f53c", featured: true, features: ["Up to 8-page website", "Full UI/UX design in Figma", "Webflow + animations", "Brand identity (logo, colour, type)", "4 revision rounds", "3-week delivery", "Full SEO", "30-day post-launch support"], notIncluded: ["AI automation workflows"], order: 3 },
  { _id: "plan-4", name: "Brand Lite", price: "600", priceNGN: "960,000", tagline: "For businesses that need a solid brand identity fast.", accentColor: "#f472b6", featured: false, features: ["Logo design (3 concepts)", "Primary colour palette", "Font pairing", "2 revision rounds", "Brand style tile", "7-day delivery"], notIncluded: ["Full guidelines doc", "Brand stationery", "Website design"], order: 4 },
  { _id: "plan-5", name: "Full Brand", price: "2,000", priceNGN: "3,200,000", tagline: "A complete brand identity system delivered end-to-end.", accentColor: "#34d399", featured: false, features: ["Logo suite (primary + variations)", "Colour system", "Typography system", "Brand guidelines PDF", "Social media kit", "Business card design", "3 revision rounds", "14-day delivery"], notIncluded: ["Website design", "AI automation"], order: 5 },
  { _id: "plan-6", name: "Elite", price: "8,000", priceNGN: "12,800,000", tagline: "For ambitious brands that want everything, done properly.", accentColor: "#a78bfa", featured: false, features: ["Everything in Growth", "Full brand identity system", "AI automation setup", "Digital strategy session", "Content planning framework", "Unlimited revisions", "6-week delivery", "60-day post-launch support", "Priority communication"], notIncluded: [], order: 6 },
];
plans.forEach((p) => tx.createOrReplace({ _type: "pricingPlan", ...p }));

// ── Courses ────────────────────────────────────────────────────
const courses = [
  { _id: "course-1", title: "Design Systems That Scale", category: "UI/UX Design", level: "Intermediate", duration: "6 hrs", lessons: 24, price: "$149", accentColor: "#c8f53c", description: "Build robust design systems in Figma from scratch. Covers tokens, components, auto-layout, documentation, and handoff to developers.", topics: ["Design tokens", "Component architecture", "Auto-layout mastery", "Dev handoff", "Documentation"], available: true, order: 1 },
  { _id: "course-2", title: "Web Design Fundamentals", category: "Website Design", level: "Beginner", duration: "4 hrs", lessons: 16, price: "$99", accentColor: "#60a5fa", description: "Everything you need to start designing websites that convert. Layout, typography, colour theory, and UX principles all in one place.", topics: ["Grid & layout", "Typography", "Colour theory", "UX principles", "Webflow basics"], available: true, order: 2 },
  { _id: "course-3", title: "Brand Identity from Zero", category: "Branding", level: "Beginner – Intermediate", duration: "5 hrs", lessons: 20, price: "$129", accentColor: "#f472b6", description: "A complete guide to building brand identities — from strategy and research through to logo design, colour systems, and final delivery.", topics: ["Brand strategy", "Logo design", "Colour & typography", "Brand guidelines", "Client delivery"], available: true, order: 3 },
  { _id: "course-4", title: "AI Automation for Creatives", category: "AI Automation", level: "All levels", duration: "3 hrs", lessons: 12, price: "$89", accentColor: "#34d399", description: "Use AI tools to automate your creative workflow. Content creation, lead generation, client onboarding — all on autopilot.", topics: ["Make.com workflows", "AI content pipelines", "Lead generation", "Client onboarding", "Prompt engineering"], available: false, order: 4 },
];
courses.forEach((c) => tx.createOrReplace({ _type: "course", ...c }));

// ── Commit ─────────────────────────────────────────────────────
console.log("Seeding Sanity dataset...");
tx.commit()
  .then(() => console.log("✅ Done! All content seeded successfully."))
  .catch((err) => console.error("❌ Error:", err.message));
