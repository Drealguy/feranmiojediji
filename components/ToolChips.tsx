"use client";

const FALLBACK_TOOLS = [
  "Figma", "Webflow", "Framer", "Adobe Creative Suite",
  "ChatGPT / Claude", "Make.com", "Notion", "Lottie",
];

export default function ToolChips({ tools }: { tools?: string[] }) {
  const items = tools?.length ? tools : FALLBACK_TOOLS;
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((tool) => (
        <span
          key={tool}
          className="px-4 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-default"
          style={{ color: "var(--mut)", border: "1px solid var(--bdr)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--txt)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--mut)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--mut)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--bdr)";
          }}
        >
          {tool}
        </span>
      ))}
    </div>
  );
}
