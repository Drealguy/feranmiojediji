"use client";

import { useState } from "react";

const PHONE = "2349167802170"; // +234 prefix for Nigeria, no leading 0
const WA_LINK = `https://wa.me/${PHONE}?text=Hi%20Feranmi%2C%20I%20found%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project.`;

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-300"
      style={{ filter: "drop-shadow(0 4px 20px rgba(37,211,102,0.35))" }}
    >
      {/* Label tooltip */}
      <span
        className="text-xs font-medium px-3 py-2 rounded-xl whitespace-nowrap transition-all duration-300"
        style={{
          background: "#25d366",
          color: "#fff",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0) scale(1)" : "translateX(8px) scale(0.95)",
          pointerEvents: "none",
        }}
      >
        Chat on WhatsApp
      </span>

      {/* Button */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: "#25d366",
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      >
        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.002 2.667C8.638 2.667 2.667 8.637 2.667 16c0 2.363.627 4.673 1.818 6.698L2.667 29.333l6.835-1.791A13.29 13.29 0 0 0 16.002 29.333C23.363 29.333 29.333 23.363 29.333 16S23.363 2.667 16.002 2.667Zm0 2.4c5.907 0 10.932 5.025 10.932 10.933 0 5.908-5.025 10.933-10.932 10.933a10.9 10.9 0 0 1-5.57-1.525l-.394-.236-4.057 1.063 1.083-3.956-.26-.41A10.897 10.897 0 0 1 5.069 16C5.069 10.092 10.094 5.067 16.002 5.067Zm-4.01 5.54c-.2 0-.524.075-.8.375-.274.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.1 3.275 5.15 4.575.72.313 1.28.5 1.718.637.722.23 1.38.198 1.9.12.58-.087 1.787-.73 2.037-1.437.25-.706.25-1.313.175-1.438-.075-.124-.275-.2-.575-.35-.3-.149-1.775-.875-2.05-.975-.274-.1-.474-.15-.675.15-.2.3-.774.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.465-2.41-1.485-.89-.793-1.49-1.773-1.665-2.073-.175-.3-.019-.463.132-.612.136-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.584-.492-.505-.675-.514l-.575-.012Z" />
        </svg>
      </div>
    </a>
  );
}
