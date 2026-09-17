"use client";

import { useEffect, useRef, useState } from "react";

const PREVIEW_WIDTH = 1440;
const PREVIEW_HEIGHT = 3600;
const SCROLL_DURATION_MS = 5000;
const PAUSE_MS = 1400;

export default function LiveSitePreview({ url, className = "" }: { url: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      const nextScale = width / PREVIEW_WIDTH;
      setScale(nextScale);
      setMaxOffset(Math.max(PREVIEW_HEIGHT - height / nextScale, 0));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!maxOffset) return;
    const id = setInterval(() => setScrolledDown((v) => !v), SCROLL_DURATION_MS + PAUSE_MS);
    return () => clearInterval(id);
  }, [maxOffset]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} style={{ background: "var(--surf)" }}>
      {scale > 0 && (
        <iframe
          src={url}
          title="Live site preview"
          tabIndex={-1}
          aria-hidden="true"
          sandbox="allow-scripts"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
          style={{
            width: PREVIEW_WIDTH,
            height: PREVIEW_HEIGHT,
            transform: `scale(${scale}) translateY(${scrolledDown ? -maxOffset : 0}px)`,
            transition: `transform ${SCROLL_DURATION_MS}ms ease-in-out`,
            opacity: loaded ? 1 : 0,
          }}
        />
      )}
    </div>
  );
}
