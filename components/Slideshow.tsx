"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { imageBlur } from "@/lib/image-blur";

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia(REDUCED).matches;

interface Props {
  images: string[];
  /** Used for alt text, e.g. "Athenisec". */
  title: string;
  /** Milliseconds per slide. */
  interval?: number;
}

/**
 * Image slideshow that advances on its own, moving to the right: each new image slides in from the left.
 * Loops seamlessly: a copy of the first image sits after the last, so the track keeps moving right and then
 * snaps back without a visible rewind. Pauses on hover or focus, and for visitors who prefer reduced motion.
 */
export default function Slideshow({ images, title, interval = 2000 }: Props) {
  // `step` runs 0..images.length; step === images.length is the copy of the first image.
  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const many = images.length > 1;
  const index = step % images.length;
  const track = many ? [...images, images[0]] : images;

  useEffect(() => {
    if (!many || paused || reduced) return;
    const id = window.setTimeout(() => {
      setAnimate(true);
      setStep((s) => s + 1);
    }, interval);
    return () => window.clearTimeout(id);
  }, [step, many, paused, reduced, interval]);

  // Re-enable the transition on the frame after an instant snap back to the start.
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  function onTransitionEnd() {
    if (step === images.length) {
      setAnimate(false);
      setStep(0);
    }
  }

  function goTo(i: number) {
    setAnimate(true);
    setStep(i);
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {many && (
        <div className="mb-4 flex justify-end gap-1.5" role="group" aria-label="Choose slide">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === index}
              className="focus-ring flex h-6 items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 motion-reduce:transition-none ${
                  i === index ? "w-6 bg-brand" : "w-1.5 bg-ink/20"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ink/5">
        {/* Laid out right to left, so moving the track right brings the next image in from the left. */}
        <div
          onTransitionEnd={onTransitionEnd}
          className={`flex h-full flex-row-reverse ${
            animate ? "transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none" : ""
          }`}
          style={{ transform: `translateX(${step * 100}%)` }}
        >
          {track.map((src, i) => (
            <div key={i} className="relative h-full w-full shrink-0" aria-hidden={i % images.length !== index || i === images.length}>
              <Image
                src={src}
                alt={`${title}, image ${(i % images.length) + 1}`}
                fill
                priority={i === 0}
                // Off-screen slides sit beside the frame, so lazy loading would leave them blank when they slide in.
                loading={i === 0 ? undefined : "eager"}
                placeholder={imageBlur[src] ? "blur" : "empty"}
                blurDataURL={imageBlur[src]}
                sizes="(min-width: 1280px) 1200px, 100vw"
                className={`object-cover ${!many ? "animate-[slow-pan_14s_ease-in-out_infinite_alternate] motion-reduce:animate-none" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
