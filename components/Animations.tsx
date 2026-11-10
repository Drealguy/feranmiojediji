"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

/*
  Site-wide motion, driven by data attributes so pages stay server components.

  data-split-load      letters rise in on page load (hero name)
  data-hero-fade       fades up just after the name
  data-split-lines     heading lines rise in when scrolled into view
  data-scrub-words     words go from faint to solid as you scroll past
  data-reveal          fades up when scrolled into view
  data-reveal-stagger  its children fade up one after another
  data-parallax="n"    drifts n px vertically while scrolling past
  data-layer="i"       isometric layers spread apart while scrolling
  data-motion-path / data-motion-dot   dot travels along the path (MotionPath)
  a[href^="#"]         smooth scroll to the target (ScrollTo)
*/

const HEADER_OFFSET = 76;

export default function Animations() {
  const pathname = usePathname();

  useGSAP(
    () => {
      // Smooth in-page scrolling for every hash link, motion or not.
      const onClick = (e: MouseEvent) => {
        const link = (e.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
        if (!link) return;
        const url = new URL(link.href);
        if (url.pathname !== window.location.pathname || !url.hash) return;
        const target = document.querySelector(url.hash);
        if (!target) return;
        e.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        gsap.to(window, {
          duration: reduce ? 0 : 1.1,
          ease: "power3.inOut",
          scrollTo: { y: target, offsetY: HEADER_OFFSET },
        });
        history.replaceState(null, "", url.hash);
      };
      document.addEventListener("click", onClick);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);

        // Hero name: letters rise in.
        q("[data-split-load]").forEach((el) => {
          SplitText.create(el, {
            type: "chars",
            onSplit(self) {
              gsap.set(el, { visibility: "visible" });
              return gsap.from(self.chars, {
                yPercent: 60,
                opacity: 0,
                rotate: 4,
                duration: 1,
                ease: "expo.out",
                stagger: 0.035,
                delay: 0.1,
              });
            },
          });
        });
        gsap.from(q("[data-hero-fade]"), {
          y: 18,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.55,
        });

        // Headings: lines rise from behind a mask.
        q("[data-split-lines]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 105,
                duration: 1,
                ease: "expo.out",
                stagger: 0.1,
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
              });
            },
          });
        });

        // Statement: each word fills in as you scroll.
        q("[data-scrub-words]").forEach((el) => {
          SplitText.create(el, {
            type: "words",
            autoSplit: true,
            onSplit(self) {
              return gsap.fromTo(
                self.words,
                { opacity: 0.15 },
                {
                  opacity: 1,
                  ease: "none",
                  stagger: 0.1,
                  scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
                },
              );
            },
          });
        });

        q("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 32,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        q("[data-reveal-stagger]").forEach((el) => {
          gsap.from(el.children, {
            y: 32,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        q("[data-parallax]").forEach((el) => {
          const distance = Number(el.dataset.parallax) || 60;
          gsap.to(el, {
            y: distance,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        // Isometric layers spread apart, higher layers further.
        q<SVGGElement>("[data-layer]").forEach((el) => {
          const i = Number(el.dataset.layer);
          gsap.fromTo(
            el,
            { y: i * 10 },
            {
              y: -i * 8,
              ease: "none",
              scrollTrigger: { trigger: el.ownerSVGElement, start: "top 90%", end: "bottom 20%", scrub: true },
            },
          );
        });

        // A dot travelling along its path, back and forth.
        q<SVGElement>("[data-motion-dot]").forEach((dot) => {
          const path = dot.ownerSVGElement?.querySelector<SVGPathElement>("[data-motion-path]");
          if (!path) return;
          gsap.to(dot, {
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
          });
        });

        ScrollTrigger.refresh();
      });

      return () => {
        document.removeEventListener("click", onClick);
        mm.revert();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
