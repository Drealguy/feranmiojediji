"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

function getYouTubeId(url?: string) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) return parsed.searchParams.get("v") ?? parsed.pathname.split("/").pop() ?? null;
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
  } catch {
    return null;
  }
  return null;
}

export default function VideoSection({
  videoFile,
  videoUrl,
  videoThumbnail,
  videoLabel,
}: {
  videoFile?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  videoLabel?: string;
}) {
  const [playingYouTube, setPlayingYouTube] = useState(false);
  const youtubeId = getYouTubeId(videoUrl);

  return (
    <section className="py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em]" style={{ color: "var(--mut)" }}>Selected reel</p>
            <h2 className="text-2xl font-medium sm:text-3xl" style={{ color: "var(--txt)" }}>{videoLabel || "A closer look at how I work"}</h2>
          </div>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-[24px] sm:rounded-[32px]" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
          {videoFile ? (
            <video className="h-full w-full object-cover" controls playsInline preload="metadata" poster={videoThumbnail}>
              <source src={videoFile} />
              Your browser does not support the video element.
            </video>
          ) : playingYouTube && youtubeId ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={videoLabel || "Feranmi Ojediji showreel"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button type="button" onClick={() => youtubeId && setPlayingYouTube(true)} className="group absolute inset-0 flex h-full w-full items-center justify-center" aria-label={youtubeId ? "Play video" : "Video placeholder"}>
              {videoThumbnail ? (
                <Image src={videoThumbnail} alt="Video preview" fill sizes="(max-width: 768px) 100vw, 1152px" className="object-cover grayscale transition-transform duration-500 group-hover:scale-[1.02]" />
              ) : (
                <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, var(--surf2), var(--surf))" }} />
              )}
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-105" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}>
                <Play size={20} fill="currentColor" className="translate-x-0.5" />
              </span>
              {!youtubeId && (
                <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-2 text-xs" style={{ background: "var(--surf2)", color: "var(--mut)", border: "1px solid var(--bdr)" }}>
                  Upload your video in Sanity Studio
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
