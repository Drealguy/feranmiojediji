import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(200,245,60,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--bdr) 1px, transparent 1px), linear-gradient(90deg, var(--bdr) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Isometric 404 SVG illustration */}
      <div className="relative mb-8 select-none" aria-hidden="true">
        <svg
          viewBox="0 0 520 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[min(520px,90vw)]"
        >
          {/* ── LEFT "4" ── isometric block letters */}
          {/* Vertical left bar — top face */}
          <polygon points="30,60 70,40 110,60 70,80" fill="#c8f53c" />
          {/* Vertical left bar — right face */}
          <polygon points="110,60 70,80 70,175 110,155" fill="#8ab528" />
          {/* Vertical left bar — front face */}
          <polygon points="30,60 70,80 70,175 30,155" fill="#a3cc32" />

          {/* Horizontal crossbar — top face */}
          <polygon points="30,115 110,75 150,95 70,135" fill="#c8f53c" />
          {/* Horizontal crossbar — right face */}
          <polygon points="150,95 70,135 70,155 150,115" fill="#8ab528" />
          {/* Horizontal crossbar — front face */}
          <polygon points="30,115 70,135 70,155 30,135" fill="#a3cc32" />

          {/* Vertical right bar — top face */}
          <polygon points="110,40 150,20 190,40 150,60" fill="#c8f53c" />
          {/* Vertical right bar — right face */}
          <polygon points="190,40 150,60 150,175 190,155" fill="#8ab528" />
          {/* Vertical right bar — front face */}
          <polygon points="110,40 150,60 150,175 110,155" fill="#a3cc32" />

          {/* ── RIGHT "4" ── */}
          {/* Vertical left bar — top face */}
          <polygon points="330,60 370,40 410,60 370,80" fill="#c8f53c" />
          {/* Vertical left bar — right face */}
          <polygon points="410,60 370,80 370,175 410,155" fill="#8ab528" />
          {/* Vertical left bar — front face */}
          <polygon points="330,60 370,80 370,175 330,155" fill="#a3cc32" />

          {/* Horizontal crossbar — top face */}
          <polygon points="330,115 410,75 450,95 370,135" fill="#c8f53c" />
          {/* Horizontal crossbar — right face */}
          <polygon points="450,95 370,135 370,155 450,115" fill="#8ab528" />
          {/* Horizontal crossbar — front face */}
          <polygon points="330,115 370,135 370,155 330,135" fill="#a3cc32" />

          {/* Vertical right bar — top face */}
          <polygon points="410,40 450,20 490,40 450,60" fill="#c8f53c" />
          {/* Vertical right bar — right face */}
          <polygon points="490,40 450,60 450,175 490,155" fill="#8ab528" />
          {/* Vertical right bar — front face */}
          <polygon points="410,40 450,60 450,175 410,155" fill="#a3cc32" />

          {/* ── "0" HOLE in the middle — isometric tube ── */}
          {/* Outer top ellipse */}
          <ellipse cx="260" cy="72" rx="48" ry="24" fill="#1e1e1e" stroke="#c8f53c" strokeWidth="2" />
          {/* Outer right face */}
          <path d="M308,72 L308,158 Q260,182 212,158 L212,72 Q260,96 308,72 Z" fill="#141414" stroke="#272727" strokeWidth="1" />
          {/* Inner top ellipse */}
          <ellipse cx="260" cy="72" rx="28" ry="14" fill="#0a0a0a" />
          {/* Inner bottom ellipse */}
          <ellipse cx="260" cy="158" rx="28" ry="14" fill="#0a0a0a" />
          {/* Inner right face */}
          <path d="M288,72 L288,158 Q260,172 232,158 L232,72 Q260,86 288,72 Z" fill="#0d0d0d" />
          {/* Outer bottom rim */}
          <ellipse cx="260" cy="158" rx="48" ry="24" fill="none" stroke="#c8f53c" strokeWidth="2" />

          {/* ── Ladder inside the "0" ── */}
          {/* Left rail */}
          <line x1="245" y1="80" x2="245" y2="150" stroke="#c8f53c" strokeWidth="3" strokeLinecap="round" />
          {/* Right rail */}
          <line x1="275" y1="80" x2="275" y2="150" stroke="#c8f53c" strokeWidth="3" strokeLinecap="round" />
          {/* Rungs */}
          <line x1="245" y1="95" x2="275" y2="95" stroke="#c8f53c" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="245" y1="110" x2="275" y2="110" stroke="#c8f53c" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="245" y1="125" x2="275" y2="125" stroke="#c8f53c" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="245" y1="140" x2="275" y2="140" stroke="#c8f53c" strokeWidth="2.5" strokeLinecap="round" />

          {/* Tiny figure climbing */}
          {/* Body */}
          <circle cx="260" cy="85" r="5" fill="#c8f53c" />
          <line x1="260" y1="90" x2="260" y2="102" stroke="#c8f53c" strokeWidth="2.5" strokeLinecap="round" />
          {/* Arms */}
          <line x1="260" y1="93" x2="253" y2="98" stroke="#c8f53c" strokeWidth="2" strokeLinecap="round" />
          <line x1="260" y1="93" x2="267" y2="88" stroke="#c8f53c" strokeWidth="2" strokeLinecap="round" />
          {/* Legs */}
          <line x1="260" y1="102" x2="255" y2="109" stroke="#c8f53c" strokeWidth="2" strokeLinecap="round" />
          <line x1="260" y1="102" x2="265" y2="107" stroke="#c8f53c" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Text content */}
      <div className="relative text-center max-w-md">
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "var(--acc)" }}
        >
          Error 404
        </p>
        <h1
          className="text-4xl sm:text-5xl font-semibold tracking-tight mb-3"
          style={{ color: "var(--txt)" }}
        >
          Something&rsquo;s missing.
        </h1>
        <p className="text-base mb-8" style={{ color: "var(--mut)" }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
          Let&rsquo;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
            style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 11h1v6a1 1 0 001 1h4v-4h2v4h4a1 1 0 001-1v-6h1a1 1 0 00.707-1.707l-7-7z" />
            </svg>
            Go to homepage
          </Link>
          <Link
            href="/works"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors"
            style={{
              border: "1px solid var(--bdr)",
              color: "var(--txt)",
              background: "var(--surf)",
            }}
          >
            View my work
          </Link>
        </div>
      </div>

      {/* Floating accent dots */}
      <div
        className="absolute top-1/4 left-[8%] w-2 h-2 rounded-full opacity-40 animate-bounce"
        style={{ background: "var(--acc)", animationDelay: "0s", animationDuration: "3s" }}
      />
      <div
        className="absolute top-1/3 right-[10%] w-1.5 h-1.5 rounded-full opacity-30 animate-bounce"
        style={{ background: "var(--acc)", animationDelay: "1s", animationDuration: "4s" }}
      />
      <div
        className="absolute bottom-1/4 left-[15%] w-1 h-1 rounded-full opacity-20 animate-bounce"
        style={{ background: "var(--acc)", animationDelay: "0.5s", animationDuration: "5s" }}
      />
    </div>
  );
}
