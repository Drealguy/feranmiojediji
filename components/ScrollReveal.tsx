"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** "up" (default) | "down" | "left" | "right" | "fade" */
  direction?: "up" | "down" | "left" | "right" | "fade";
  distance?: number;
  duration?: number;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 0.7,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from: gsap.TweenVars = { opacity: 0, duration, delay, ease: "power3.out" };
    if (direction === "up")    from.y = distance;
    if (direction === "down")  from.y = -distance;
    if (direction === "left")  from.x = distance;
    if (direction === "right") from.x = -distance;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...from,
        clearProps: "opacity,x,y",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [delay, direction, distance, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
