"use client";

import { useState } from "react";

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    // youtube.com/watch?v=ID
    if (u.hostname.includes("youtube.com")) {
      return u.searchParams.get("v");
    }
    // youtu.be/ID
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1);
    }
    // youtube.com/shorts/ID or youtube.com/embed/ID
    const match = u.pathname.match(/(?:shorts|embed)\/([^/?]+)/);
    if (match) return match[1];
  } catch {}
  return null;
}

export default function VideoSection({
  videoUrl,
  videoLabel,
}: {
  videoUrl?: string;
  videoLabel?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const label = videoLabel ?? "Watch the process — 4 min";
  const videoId = videoUrl ? getYouTubeId(videoUrl) : null;

  return (
    <section className="py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>
            Behind the scenes
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--bdr)" }} />
        </div>

        <h2
          className="text-3xl md:text-4xl font-semibold tracking-tight mb-12 max-w-xl"
          style={{ color: "var(--txt)" }}
        >
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
          {playing && videoId ? (
            /* YouTube iframe */
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="Process video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,245,60,0.05) 0%, transparent 70%)",
                }}
              />
              {/* Grid lines */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--bdr) 1px, transparent 1px), linear-gradient(90deg, var(--bdr) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />

              {/* Play button */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                onClick={() => videoId && setPlaying(true)}
              >
                <button
                  className="rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: "var(--acc)", width: "72px", height: "72px" }}
                  aria-label="Play video"
                >
                  <svg
                    className="w-6 h-6 translate-x-0.5"
                    viewBox="0 0 24 24"
                    style={{ fill: "var(--acc-fg)" }}
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </button>
              </div>

              {!videoId && (
                <p
                  className="absolute bottom-16 left-0 right-0 text-center text-xs"
                  style={{ color: "var(--dim)" }}
                >
                  Add your YouTube URL in Sanity Studio to enable this video.
                </p>
              )}

              {/* Corner label */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                  style={{
                    background: "rgba(200,245,60,0.12)",
                    color: "var(--acc)",
                    border: "1px solid rgba(200,245,60,0.2)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--acc)" }}
                  />
                  Process reel 2025
                </span>
              </div>
            </>
          )}
        </div>

        <p className="mt-4 text-sm text-center sm:text-left" style={{ color: "var(--mut)" }}>
          {label}
        </p>
      </div>
    </section>
  );
}
