import localFont from "next/font/local";

// Inter Tight, self-hosted (SIL Open Font License, see fonts/InterTight-OFL.txt).
// Variable fonts: one file covers every weight from 100 to 900.

export const interTight = localFont({
  src: [
    { path: "../fonts/InterTight-Variable.ttf", weight: "100 900", style: "normal" },
    { path: "../fonts/InterTight-Italic-Variable.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-inter-tight",
  display: "swap",
});
