export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Photo or company logo in /public. Without one, the card shows the person's initials. */
  avatar?: string;
}

// Real client quotes only (with their permission). Never publish invented testimonials.
export const testimonials: Testimonial[] = [
  {
    quote:
      "I just wanted to say I genuinely appreciate all the work you've put into VindicateFX Academy. You initially estimated about three weeks, but you delivered a fully functional platform in under two weeks. That's impressive, and I don't take that for granted. You've been patient with all my ideas and revisions, and you've brought the vision to life much faster than I expected. Thank you for that.",
    name: "Clement",
    role: "Vindicate FX Academy",
    avatar: "/testimonials/vindicate-fx.png",
  },
];
