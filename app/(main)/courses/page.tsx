export const revalidate = 3600;

import type { Metadata } from "next";
import CourseCatalog, { type Course } from "@/components/CourseCatalog";
import { sanityFetch } from "@/sanity/lib/client";
import { coursesQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Courses | Feranmi Ojediji",
  description: "Learn web design, branding, and digital strategy directly from Feranmi Ojediji.",
  alternates: { canonical: "https://feranmiojediji.com/courses" },
  openGraph: { title: "Courses | Feranmi Ojediji", description: "Learn web design, branding, and digital strategy directly from Feranmi Ojediji.", url: "https://feranmiojediji.com/courses", images: [{ url: "/feranmi.jpg", width: 1200, height: 630, alt: "Feranmi Ojediji" }] },
  twitter: { card: "summary_large_image", title: "Courses | Feranmi Ojediji", images: ["/feranmi.jpg"] },
};

const FALLBACK: Course[] = [
  { _id: "1", title: "Design Systems That Scale", category: "UI/UX Design", level: "Intermediate", duration: "6 hrs", lessons: 24, price: "$149", accentColor: "#7c3aed", description: "Build robust design systems in Figma from scratch, from tokens and components to documentation and developer handoff.", available: true },
  { _id: "2", title: "Web Design Fundamentals", category: "Website Design", level: "Beginner", duration: "4 hrs", lessons: 16, price: "$99", accentColor: "#2563eb", description: "Learn layout, typography, colour and UX principles for websites that are clear, useful and built to convert.", available: true },
  { _id: "3", title: "Brand Identity from Zero", category: "Branding", level: "Beginner – Intermediate", duration: "5 hrs", lessons: 20, price: "$129", accentColor: "#db2777", description: "Build a complete brand identity from research and strategy through logo design, visual systems and delivery.", available: true },
  { _id: "4", title: "Social Media Design for Creatives", category: "Social Media Design", level: "All levels", duration: "3 hrs", lessons: 12, price: "$89", accentColor: "#059669", description: "Create stronger social content and build a repeatable workflow for producing it efficiently.", available: false },
];

export default async function Courses() {
  const raw = await sanityFetch<Course[]>(coursesQuery).catch(() => null);
  return <CourseCatalog courses={raw?.length ? raw : FALLBACK} />;
}
