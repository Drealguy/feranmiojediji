// Maintenance & support plans. Layout modelled on yuyu.ng/maintenance-plans: three plans, a guaranteed
// response time each, card highlights plus a "full details" breakdown by category.
// Standard and Priority prices and terms come from the old site; Starter is new (₦45,000, one month minimum).
// TODO (Feranmi): check the per-plan feature lists and the Starter response time before going live.

export interface BillingCycle {
  id: string;
  label: string;
  months: number;
}

export const billingCycles: BillingCycle[] = [
  { id: "monthly", label: "Monthly", months: 1 },
  { id: "quarterly", label: "3 months", months: 3 },
  { id: "biannual", label: "6 months", months: 6 },
  { id: "annual", label: "12 months", months: 12 },
];

/** Shortest billing cycle, in months. */
export const MIN_MONTHS = 1;

export interface PlanDetailGroup {
  category: string;
  items: string[];
}

export interface MaintenancePlan {
  id: string;
  name: string;
  tagline: string;
  /** In naira. */
  monthlyPrice: number;
  responseTime: string;
  recommended?: boolean;
  /** Short list shown on the card. */
  highlights: string[];
  /** Full breakdown shown in "See full details", grouped by category. */
  details: PlanDetailGroup[];
}

export const plans: MaintenancePlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For simple websites that need to stay secure, backed up and online.",
    monthlyPrice: 45000,
    responseTime: "Acknowledged within 2 business days",
    highlights: [
      "Up to 2 small content updates a month",
      "Uptime monitoring",
      "Monthly backups",
      "Security patches and dependency updates",
      "Support via the agreed communication channel",
    ],
    details: [
      { category: "Content & updates", items: ["Up to 2 small content updates a month (text, images, links)"] },
      { category: "Security", items: ["Security patches and dependency updates", "SSL certificate monitoring"] },
      { category: "Backups & recovery", items: ["Monthly backups"] },
      { category: "Monitoring & performance", items: ["Uptime monitoring"] },
      {
        category: "Support",
        items: ["Fixes for issues with existing functionality", "Support via the agreed communication channel"],
      },
    ],
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "For sites and apps that need reliable, ongoing upkeep.",
    monthlyPrice: 65000,
    responseTime: "Acknowledged within 1 business day",
    highlights: [
      "Up to 5 content updates a month",
      "Bug investigation and fixes",
      "Weekly backups and basic database maintenance",
      "Server, hosting and third party service checks",
      "Deployment assistance",
    ],
    details: [
      {
        category: "Content & updates",
        items: ["Up to 5 content updates a month", "Small configuration changes", "Minor technical maintenance"],
      },
      { category: "Security", items: ["Security patches and dependency updates", "SSL certificate monitoring"] },
      { category: "Backups & recovery", items: ["Weekly backups", "Basic database maintenance"] },
      {
        category: "Monitoring & performance",
        items: [
          "Uptime monitoring",
          "Server, hosting and third party service checks (Railway, Vercel, Bunny.net, Resend, Stripe, etc.)",
        ],
      },
      {
        category: "Support",
        items: [
          "Bug investigation and fixes for existing functionality",
          "Infrastructure troubleshooting",
          "Deployment assistance",
          "Technical support via the agreed communication channel",
        ],
      },
    ],
  },
  {
    id: "priority",
    name: "Priority",
    tagline: "For businesses that want faster turnaround and a bit more room to grow.",
    monthlyPrice: 150000,
    responseTime: "Acknowledged same business day",
    recommended: true,
    highlights: [
      "Everything in Standard",
      "Up to 10 content updates a month",
      "Small, scoped feature additions (agreed in advance)",
      "Daily backups with on-demand restore",
      "Priority queueing for support requests",
    ],
    details: [
      {
        category: "Content & updates",
        items: [
          "Up to 10 content updates a month",
          "Small, scoped feature additions (agreed in advance)",
          "Minor new integrations (agreed in advance)",
        ],
      },
      { category: "Security", items: ["Security patches and dependency updates", "SSL certificate monitoring"] },
      {
        category: "Backups & recovery",
        items: ["Daily backups", "On-demand restore", "Extended database maintenance and optimisation"],
      },
      {
        category: "Monitoring & performance",
        items: [
          "Uptime and performance monitoring",
          "Server, hosting and third party service checks",
          "Monthly performance report",
        ],
      },
      {
        category: "Support",
        items: ["Everything in Standard", "Priority queueing for support requests"],
      },
    ],
  },
];

export const notIncluded = [
  "Website redesigns",
  "Major database restructuring",
  "New AI functionality",
  "New payment functionality",
  "Large content uploads",
  "Major infrastructure migrations",
  "Rebuilding or redevelopment",
  "Third party service fees",
];

export const supportTerms = [
  "Support requests are acknowledged within the response time listed on your plan.",
  "Resolution time depends on the complexity of the issue and any third party service involved.",
  "Critical production issues are prioritised where reasonably possible.",
  "This is not a 24/7 emergency support service.",
];

export const thirdPartyNote =
  "You remain responsible for the cost and management of third party services, including hosting, database, video storage, email, payment processing, domains, DNS, Cloudflare and other subscriptions.";

export const paymentNote =
  "Maintenance begins once your chosen plan has been paid for. New development or work outside your plan's scope is quoted separately.";

export function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}
