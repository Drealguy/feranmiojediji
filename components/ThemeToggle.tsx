"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95"
      style={{
        background: "var(--surf)",
        border: "1px solid var(--bdr)",
        color: "var(--mut)",
        willChange: "transform",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--mut)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--txt)";
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--bdr)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--mut)";
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
      }}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
