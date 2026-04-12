import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { project } from "./project";
import { service } from "./service";
import { testimonial } from "./testimonial";
import { faqItem } from "./faqItem";
import { course } from "./course";
import { pricingPlan } from "./pricingPlan";
import { about } from "./about";

export const schemaTypes = [
  // Singletons
  siteSettings,
  homePage,
  about,
  // Collections
  project,
  service,
  testimonial,
  faqItem,
  course,
  pricingPlan,
];
