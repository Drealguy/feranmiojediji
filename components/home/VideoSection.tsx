export default function VideoSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>
            Behind the scenes
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--bdr)" }} />
        </div>

        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-12 max-w-xl" style={{ color: "var(--txt)" }}>
          Watch how I craft experiences from idea to launch
        </h2>

        {/* Video container */}
        <div
          className="relative w-full rounded-3xl overflow-hidden cursor-pointer group"
          style={{
            background: "var(--surf)",
            border: "1px solid var(--bdr)",
            aspectRatio: "16/9",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,245,60,0.05) 0%, transparent 70%)",
            }}
          />
          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(var(--bdr) 1px, transparent 1px), linear-gradient(90deg, var(--bdr) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Play button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <button
              className="rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ background: "var(--acc)", width: "72px", height: "72px" }}
              aria-label="Play video"
            >
              <svg className="w-6 h-6 translate-x-0.5" viewBox="0 0 24 24" style={{ fill: "var(--acc-fg)" }}>
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
            <p className="text-sm" style={{ color: "var(--mut)" }}>Watch the process — 4 min</p>
          </div>

          {/* Corner label */}
          <div className="absolute bottom-6 left-6">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
              style={{
                background: "rgba(200,245,60,0.12)",
                color: "var(--acc)",
                border: "1px solid rgba(200,245,60,0.2)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--acc)" }} />
              Process reel 2025
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
