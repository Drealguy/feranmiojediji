import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award as AwardIcon, BadgeCheck, Camera, Music2 } from "lucide-react";
import { awards, gallery, playlistNote, spotifyEmbedUrl, spotifyPlaylistUrl, type GalleryPhoto } from "@/lib/about";
import { experience } from "@/lib/experience";
import { WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | Feranmi Ojediji",
  description:
    "Feranmi Ojediji is a Nigerian designer, developer and product builder helping brands and businesses solve problems through design, technology and AI automation.",
};

/* ---------- Shared pieces (same look as the home page sections) ---------- */

function Card({ id, label, children }: { id?: string; label: string; children: React.ReactNode }) {
  return (
    <div className="p-2 sm:p-3">
      <section
        id={id}
        aria-label={label}
        className="scroll-mt-20 rounded-2xl border border-line bg-canvas px-5 py-20 text-center sm:px-10 sm:py-28"
      >
        {children}
      </section>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <p data-reveal className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium">
      <span aria-hidden className="size-2 rounded-full bg-brand" />
      {children}
    </p>
  );
}

const H2 =
  "mx-auto mt-8 max-w-[16ch] text-[2.25rem] font-medium leading-[1.04] tracking-[-0.045em] text-balance sm:mt-10 sm:text-[3.5rem] lg:text-[4.5rem]";

/** Small cream pill set inside a headline, holding an icon. */
function InlineIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className="mx-[0.18em] inline-grid h-[0.86em] w-[1.3em] -translate-y-[0.06em] place-items-center rounded-full bg-cream align-middle text-brand"
    >
      {children}
    </span>
  );
}

/* ---------- Gallery ---------- */

const TILTS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-[-1.5deg]", "rotate-[1.5deg]"];
const SHAPES: Record<NonNullable<GalleryPhoto["shape"]>, string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

function Polaroid({ photo, i }: { photo: GalleryPhoto; i: number }) {
  return (
    <figure
      className={`mb-3 break-inside-avoid rounded-md border border-line bg-white p-2 pb-3 sm:mb-5 sm:p-3 sm:pb-4 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.35)] transition-transform duration-500 hover:z-10 hover:rotate-0 hover:scale-[1.03] motion-reduce:transition-none ${
        TILTS[i % TILTS.length]
      }`}
    >
      <div className={`relative overflow-hidden rounded-sm bg-cream ${SHAPES[photo.shape ?? "square"]}`}>
        {photo.src ? (
          <Image src={photo.src} alt={photo.caption} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
        ) : (
          <div aria-hidden className="absolute inset-0 grid place-items-center text-brand/35">
            <Camera className="size-7" strokeWidth={1.5} />
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-center text-xs text-ink-soft italic sm:mt-3 sm:text-sm">{photo.caption}</figcaption>
    </figure>
  );
}

/* ---------- Page ---------- */

export default function AboutPage() {
  const embed = spotifyEmbedUrl(spotifyPlaylistUrl);
  const realAwards = awards.filter((a) => a.issuer !== "Issuer name");

  return (
    <>
      {/* Intro */}
      <Card label="About me">
        <Pill>About me</Pill>
        <h1 data-reveal className={H2}>
          Hi, I&apos;m{" "}
          <span className="whitespace-nowrap">
            Feranmi
            <span
              aria-hidden
              className="relative mx-[0.18em] inline-block h-[0.86em] w-[1.5em] -translate-y-[0.06em] overflow-hidden rounded-full bg-cream align-middle"
            >
              <Image src="/feranmi-cutout.png" alt="" fill preload sizes="10rem" className="object-cover object-[50%_18%] origin-bottom animate-[inline-peek_4.5s_ease-in-out_infinite] motion-reduce:animate-none" />
            </span>
          </span>
          <span className="block text-ink-soft">designer, developer and builder.</span>
        </h1>
        <div
          data-reveal
          className="mx-auto mt-6 max-w-[68ch] space-y-4 text-[1.0625rem] leading-relaxed text-ink-soft text-pretty sm:mt-8 sm:text-lg"
        >
          <p>
            I&apos;m Feranmi Ojediji, a Nigerian designer, developer and product builder with roughly six years of
            experience across brands, websites, SaaS and digital products.
          </p>
          <p>
            I help brands and businesses move from an unclear idea or inefficient process to a product, website or
            automation that is useful, credible and ready to grow.
          </p>
        </div>
        <div data-reveal className="mt-9 flex flex-wrap justify-center gap-3 sm:mt-10">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex h-12 items-center rounded-lg bg-brand px-5 text-[0.96875rem] font-medium text-cream transition-colors hover:bg-brand/90"
          >
            Work with me
          </a>
          <Link
            href="/projects"
            className="focus-ring group inline-flex h-12 items-center gap-2 rounded-lg border border-line px-5 text-[0.96875rem] font-medium transition-colors hover:border-ink/40"
          >
            See my projects
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none">
              →
            </span>
          </Link>
        </div>
      </Card>

      {/* Journey */}
      <Card id="journey" label="My journey">
        <Pill>My journey</Pill>
        <h2 data-reveal className={H2}>
          From a first{" "}
          <span className="whitespace-nowrap">
            logo
            <InlineIcon>
              <svg viewBox="0 0 24 24" className="h-[0.5em] w-auto animate-[inline-lift_2.8s_ease-in-out_infinite] motion-reduce:animate-none" fill="currentColor">
                <path d="M12 2 2 7l10 5 10-5-10-5Zm0 7.5L4.6 6 12 2.5 19.4 6 12 9.5ZM2 12l10 5 10-5-2.2-1.1L12 14.8 4.2 10.9 2 12Zm0 5 10 5 10-5-2.2-1.1L12 19.8l-7.8-3.9L2 17Z" />
              </svg>
            </InlineIcon>
          </span>
          <span className="block text-ink-soft">to full products.</span>
        </h2>
        <ol data-reveal-stagger className="mx-auto mt-14 max-w-3xl divide-y divide-line rounded-xl border border-line text-left sm:mt-16">
          {experience.map((e) => (
            <li key={e.title} className="grid gap-1 px-5 py-6 sm:grid-cols-[7rem_1fr] sm:gap-6 sm:px-7">
              <p className="text-sm font-medium text-brand tabular-nums">{e.period}</p>
              <div>
                <h3 className="text-[1.0625rem] font-medium tracking-[-0.02em]">{e.title}</h3>
                {e.detail && <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">{e.detail}</p>}
              </div>
            </li>
          ))}
        </ol>
      </Card>

      {/* Gallery */}
      <Card id="gallery" label="Gallery">
        <Pill>Gallery</Pill>
        <h2 data-reveal className={H2}>
          A few{" "}
          <span className="whitespace-nowrap">
            snapshots
            <InlineIcon>
              <Camera className="size-[0.5em] animate-[inline-snap_3.2s_ease-in-out_infinite] motion-reduce:animate-none" strokeWidth={2} />
            </InlineIcon>
          </span>
          <span className="block text-ink-soft">from along the way.</span>
        </h2>
        {/* Masonry polaroid wall: tilted frames that straighten on hover. */}
        <div className="mx-auto mt-14 max-w-5xl columns-2 gap-3 text-left sm:mt-16 sm:gap-5 sm:px-2 lg:columns-3">
          {gallery.map((p, i) => (
            <Polaroid key={p.caption + i} photo={p} i={i} />
          ))}
        </div>
      </Card>

      {/* On repeat (Spotify) */}
      <Card id="playlist" label="On repeat">
        <Pill>On repeat</Pill>
        <h2 data-reveal className={H2}>
          What&apos;s{" "}
          <span className="whitespace-nowrap">
            playing
            <InlineIcon>
              <Music2 className="size-[0.5em] animate-[inline-wiggle_1.6s_ease-in-out_infinite] motion-reduce:animate-none" strokeWidth={2} />
            </InlineIcon>
          </span>
          <span className="block text-ink-soft">while I build.</span>
        </h2>
        <p data-reveal className="mx-auto mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">
          {playlistNote}
        </p>

        <div data-reveal className="mx-auto mt-14 grid max-w-5xl items-center gap-10 text-left sm:mt-16 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-14">
          {/* Spinning record with my photo on the label. */}
          <div aria-hidden className="relative mx-auto aspect-square w-60 sm:w-72">
            <div className="absolute inset-0 animate-[spin_9s_linear_infinite] rounded-full bg-[radial-gradient(circle,#2a2a2a_0_34%,#111_35%,#1c1c1c_36%,#111_38%,#1e1e1e_40%,#111_43%,#1c1c1c_46%,#111_50%,#1e1e1e_55%,#111_60%,#1c1c1c_66%,#0d0d0d_71%)] shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)] motion-reduce:animate-none">
              <div className="absolute inset-[33%] overflow-hidden rounded-full bg-cream ring-4 ring-brand">
                <Image src="/feranmi-cutout.png" alt="" fill sizes="8rem" className="object-cover object-[50%_15%]" />
              </div>
              <div className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-canvas" />
            </div>
            {/* Tonearm */}
            <div className="absolute -top-2 -right-3 h-1/2 w-3 origin-top rotate-[28deg] rounded-full bg-gradient-to-b from-ink-soft/60 to-ink/80 sm:-right-4" />
          </div>

          {embed ? (
            <iframe
              title="Feranmi's Spotify playlist"
              src={embed}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="h-[352px] w-full rounded-xl border-0"
            />
          ) : (
            <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-line px-6 py-10 text-center">
              <Music2 aria-hidden className="size-6 text-brand/40" strokeWidth={1.5} />
              <p className="mt-4 font-medium">Playlist coming soon</p>
              <p className="mt-1 text-sm text-ink-soft">I&apos;m putting the tracks together.</p>
            </div>
          )}
        </div>
      </Card>

      {/* Awards & certifications */}
      <Card id="awards" label="Awards and certifications">
        <Pill>Awards &amp; certifications</Pill>
        <h2 data-reveal className={H2}>
          Recognition{" "}
          <span className="whitespace-nowrap">
            &amp; proof
            <InlineIcon>
              <BadgeCheck className="size-[0.5em] animate-[inline-pulse_2.4s_ease-in-out_infinite] motion-reduce:animate-none" strokeWidth={2} />
            </InlineIcon>
          </span>
          <span className="block text-ink-soft">of the craft.</span>
        </h2>

        <ul data-reveal-stagger className="mx-auto mt-14 grid max-w-5xl gap-3 text-left sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {realAwards.map((a) => {
            const Icon = a.kind === "Award" ? AwardIcon : BadgeCheck;
            const body = (
              <>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-full bg-cream text-brand transition-colors duration-300 group-hover:bg-cream/15 group-hover:text-cream">
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm text-ink-soft tabular-nums transition-colors duration-300 group-hover:text-cream/60">
                    {a.year}
                  </span>
                </div>
                <p className="mt-8 text-xs uppercase tracking-[0.06em] text-ink-soft transition-colors duration-300 group-hover:text-cream/60">
                  {a.kind}
                </p>
                <h3 className="mt-1.5 text-lg font-medium tracking-[-0.02em]">{a.title}</h3>
                <p className="mt-1 text-[0.9375rem] text-ink-soft transition-colors duration-300 group-hover:text-cream/75">
                  {a.issuer}
                  {a.href && " ↗"}
                </p>
              </>
            );
            const cls =
              "group flex h-full flex-col rounded-xl border border-line p-6 transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-cream motion-reduce:transition-none";
            return (
              <li key={a.title + a.year}>
                {a.href ? (
                  <a href={a.href} target="_blank" rel="noreferrer" className={`focus-ring ${cls}`}>
                    {body}
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </li>
            );
          })}
          {/* Open slots so the row never looks empty while the list grows. */}
          {Array.from({ length: Math.max(0, 3 - realAwards.length) }, (_, i) => (
            <li
              key={`slot-${i}`}
              aria-hidden
              className={`flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-line p-6 text-center ${
                i > 0 ? "hidden sm:flex" : ""
              } ${i > 1 ? "sm:hidden lg:flex" : ""}`}
            >
              <AwardIcon className="size-6 text-brand/35" strokeWidth={1.5} />
              <p className="mt-4 text-sm text-ink-soft">More coming soon</p>
            </li>
          ))}
        </ul>
      </Card>

    </>
  );
}
