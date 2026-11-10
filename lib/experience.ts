export interface ExperienceEntry {
  /** Shown as the commit date, e.g. "2022" or "2020 – 2022". */
  period: string;
  /** The commit message: one line, present tense works best. */
  title: string;
  detail?: string;
  /** Extra label, e.g. "HEAD → now" on the current entry. */
  tag?: string;
}

// Newest first. Taken from the timeline on the old About page; check and
// replace with real roles, companies and dates.
export const experience: ExperienceEntry[] = [
  {
    period: "Now",
    title: "Software builder & product designer",
    detail: "Designing and building web apps, business websites and internal tools from first sketch to launch.",
    tag: "HEAD → now",
  },
  {
    period: "2022",
    title: "Expand into AI automation and digital strategy",
    detail: "Workflows and AI features that take repetitive work off small teams.",
  },
  {
    period: "2020",
    title: "Move fully into web design and digital products",
    detail: "Campaign websites, ecommerce stores, learning platforms and invoicing software.",
  },
  {
    period: "2018",
    title: "First brand identity project for a tech startup",
  },
  {
    period: "2016",
    title: "Start freelancing with a first logo for a family business",
    tag: "initial commit",
  },
];
