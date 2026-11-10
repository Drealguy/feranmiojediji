"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check, Mic, Square, Trash2 } from "lucide-react";

const WHATSAPP_NUMBER = "2349167802170";

const SERVICES = ["Website", "Web app or software", "Product design", "AI & automation", "Maintenance", "Something else"];
const TIMELINES = ["As soon as possible", "Within a month", "In 1–3 months", "Just exploring"];

type StepId = "name" | "email" | "services" | "details" | "timeline" | "review";
const STEPS: StepId[] = ["name", "email", "services", "details", "timeline", "review"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ---------------- Voice note (recording only; transcription comes later) ---------------- */

function VoiceNote({ audioUrl, onChange }: { audioUrl: string | null; onChange: (url: string | null) => void }) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  useEffect(() => {
    if (!recording) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [recording]);

  // Stop the mic if the visitor leaves the step mid-recording.
  useEffect(() => () => recorder.current?.stream.getTracks().forEach((t) => t.stop()), []);

  async function start() {
    setError(null);
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Voice notes aren't supported in this browser. You can type instead.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunks.current = [];
      rec.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        onChange(URL.createObjectURL(new Blob(chunks.current, { type: rec.mimeType })));
      };
      recorder.current = rec;
      rec.start();
      setSeconds(0);
      setRecording(true);
    } catch {
      setError("I couldn't access your microphone. Check the permission, or type instead.");
    }
  }

  function stop() {
    recorder.current?.stop();
    setRecording(false);
  }

  const time = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="mt-5">
      {audioUrl ? (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <audio controls src={audioUrl} className="h-10 max-w-full" />
          <button
            type="button"
            onClick={() => {
              URL.revokeObjectURL(audioUrl);
              onChange(null);
            }}
            className="focus-ring inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-medium hover:border-ink/40"
          >
            <Trash2 aria-hidden className="size-4" /> Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={recording ? stop : start}
          aria-pressed={recording}
          className={`focus-ring inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors ${
            recording ? "bg-red-600 text-white hover:bg-red-700" : "border border-line hover:border-ink/40"
          }`}
        >
          {recording ? (
            <>
              <span aria-hidden className="relative flex size-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/70 motion-reduce:animate-none" />
                <Square className="relative size-2.5 fill-current" />
              </span>
              Stop recording · <span className="tabular-nums">{time}</span>
            </>
          ) : (
            <>
              <Mic aria-hidden className="size-4" /> Record a voice note instead
            </>
          )}
        </button>
      )}
      <p className="mt-3 text-xs text-ink-soft">
        {error ?? "Prefer talking? Record it. Automatic transcription is coming soon."}
      </p>
    </div>
  );
}

/* ---------------- The flow ---------------- */

export default function ContactFlow() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [details, setDetails] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timeline, setTimeline] = useState("");
  const [sent, setSent] = useState(false);
  const [touched, setTouched] = useState(false);
  const fieldRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  /** Changes step and clears any "please fill this in" message from the previous one. */
  const goTo = (next: number | ((s: number) => number)) => {
    setTouched(false);
    setStep(next);
  };

  const id = STEPS[step];
  const first = name.trim().split(/\s+/)[0] ?? "";

  const valid: Record<StepId, boolean> = {
    name: name.trim().length > 1,
    email: EMAIL_RE.test(email.trim()),
    services: services.length > 0,
    details: details.trim().length > 0 || Boolean(audioUrl),
    timeline: Boolean(timeline),
    review: true,
  };

  // Move focus to the new question so keyboard and screen-reader users follow along.
  useEffect(() => {
    const t = window.setTimeout(() => (fieldRef.current ?? headingRef.current)?.focus({ preventScroll: true }), 60);
    return () => window.clearTimeout(t);
  }, [step]);

  function next() {
    if (!valid[id]) {
      setTouched(true);
      return;
    }
    goTo((s) => Math.min(s + 1, STEPS.length - 1));
  }
  const back = () => goTo((s) => Math.max(s - 1, 0));

  function whatsappLink() {
    const lines = [
      `Hi Feranmi, I'd like to start a project.`,
      ``,
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Looking for: ${services.join(", ")}`,
      `Timeline: ${timeline}`,
      ``,
      `About the project:`,
      details.trim() || "(I recorded a voice note and will send it here.)",
    ];
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  const toggle = (s: string) => setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const QUESTION =
    "mx-auto max-w-[18ch] text-[2rem] font-medium leading-[1.06] tracking-[-0.04em] text-balance outline-none sm:text-[3rem] lg:text-[3.5rem]";
  const INPUT =
    "focus-ring mx-auto mt-10 block w-full max-w-xl border-b-2 border-line bg-transparent pb-3 text-center text-[1.5rem] font-medium tracking-[-0.02em] outline-none transition-colors placeholder:text-ink/20 focus:border-brand sm:text-[1.875rem]";
  const chip = (on: boolean) =>
    `focus-ring inline-flex h-12 items-center gap-2 rounded-full border px-5 text-[0.9375rem] font-medium transition-colors ${
      on ? "border-brand bg-brand text-cream" : "border-line hover:border-ink/40"
    }`;

  if (sent) {
    return (
      <div className="flex flex-col items-center">
        <span className="grid size-14 place-items-center rounded-full bg-brand text-cream">
          <Check aria-hidden className="size-6" />
        </span>
        <h1 ref={headingRef} tabIndex={-1} className={`${QUESTION} mt-8`}>
          Thanks, {first}. <span className="block text-ink-soft">Talk soon.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink-soft">
          Your message is ready in WhatsApp. Send it there and I&apos;ll get back to you.
          {audioUrl && " Don't forget to send your voice note in the same chat."}
        </p>
        <Link
          href="/projects"
          className="focus-ring mt-9 inline-flex h-12 items-center rounded-lg border border-line px-5 text-[0.96875rem] font-medium hover:border-ink/40"
        >
          Browse my projects while you wait
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      noValidate
    >
      {/* Progress */}
      <div className="mx-auto mb-12 flex max-w-xl items-center gap-4 sm:mb-16">
        <span className="text-sm text-ink-soft tabular-nums">
          {step + 1} / {STEPS.length}
        </span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10" aria-hidden>
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* One question at a time; each new step slides up into place. */}
      <div key={id} className="animate-[step-in_0.5s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none">
        {id === "name" && (
          <>
            <label htmlFor="name" className={`${QUESTION} block`}>
              Let&apos;s start with your name.
            </label>
            <input
              ref={fieldRef}
              id="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your name"
              className={INPUT}
            />
          </>
        )}

        {id === "email" && (
          <>
            <label htmlFor="email" className={`${QUESTION} block`}>
              Nice to meet you, {first}. <span className="block text-ink-soft">What&apos;s your email?</span>
            </label>
            <input
              ref={fieldRef}
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className={INPUT}
            />
          </>
        )}

        {id === "services" && (
          <fieldset>
            <legend className={`${QUESTION} block`}>
              What can I help you with? <span className="block text-ink-soft">Pick all that apply.</span>
            </legend>
            <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-2.5">
              {SERVICES.map((s) => {
                const on = services.includes(s);
                return (
                  <button key={s} type="button" aria-pressed={on} onClick={() => toggle(s)} className={chip(on)}>
                    {on && <Check aria-hidden className="size-4" />}
                    {s}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {id === "details" && (
          <>
            <label htmlFor="details" className={`${QUESTION} block`}>
              Tell me about the project.
              <span className="block text-ink-soft">The problem, the goal, anything.</span>
            </label>
            <textarea
              ref={fieldRef}
              id="details"
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              onKeyDown={(e) => {
                // Cmd/Ctrl + Enter continues; plain Enter adds a new line.
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  next();
                }
              }}
              placeholder="I need a website that…"
              className={`${INPUT} resize-none text-left text-[1.125rem] font-normal leading-relaxed sm:text-[1.25rem]`}
            />
            <VoiceNote audioUrl={audioUrl} onChange={setAudioUrl} />
          </>
        )}

        {id === "timeline" && (
          <fieldset>
            <legend className={`${QUESTION} block`}>
              When would you like <span className="block text-ink-soft">to get started?</span>
            </legend>
            <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-2.5">
              {TIMELINES.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={timeline === t}
                  onClick={() => {
                    setTimeline(t);
                    window.setTimeout(() => goTo((s) => s + 1), 250);
                  }}
                  className={chip(timeline === t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {id === "review" && (
          <>
            <h1 ref={headingRef} tabIndex={-1} className={QUESTION}>
              All set, {first}. <span className="block text-ink-soft">Here&apos;s what I got.</span>
            </h1>
            <dl className="mx-auto mt-10 max-w-xl divide-y divide-line rounded-xl border border-line text-left">
              {[
                ["Name", name.trim(), 0],
                ["Email", email.trim(), 1],
                ["Looking for", services.join(", "), 2],
                ["About the project", details.trim() || (audioUrl ? "Voice note recorded" : ""), 3],
                ["Timeline", timeline, 4],
              ].map(([label, value, target]) => (
                <div key={label as string} className="flex items-start justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <dt className="text-xs uppercase tracking-[0.06em] text-ink-soft">{label}</dt>
                    <dd className="mt-1 text-[0.9375rem] break-words whitespace-pre-line">{value}</dd>
                  </div>
                  <button
                    type="button"
                    onClick={() => goTo(target as number)}
                    className="focus-ring shrink-0 text-sm font-medium text-ink-soft underline underline-offset-4 hover:text-ink"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </dl>
          </>
        )}
      </div>

      {touched && !valid[id] && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {id === "name" && "Please tell me your name."}
          {id === "email" && "That email doesn't look quite right."}
          {id === "services" && "Pick at least one."}
          {id === "details" && "Write a few words, or record a voice note."}
          {id === "timeline" && "Pick one."}
        </p>
      )}

      {/* Controls */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-12">
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className="focus-ring inline-flex h-12 items-center gap-2 rounded-lg border border-line px-5 text-[0.96875rem] font-medium hover:border-ink/40"
          >
            ← Back
          </button>
        )}
        {id === "review" ? (
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            onClick={() => setSent(true)}
            className="focus-ring inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-6 text-[0.96875rem] font-medium text-cream hover:bg-brand/90"
          >
            Send on WhatsApp →
          </a>
        ) : (
          id !== "timeline" && (
            <button
              type="submit"
              className="focus-ring inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-6 text-[0.96875rem] font-medium text-cream hover:bg-brand/90"
            >
              Continue →
            </button>
          )
        )}
      </div>
      {id !== "review" && id !== "timeline" && (
        <p className="mt-4 hidden text-xs text-ink-soft sm:block">
          Press <kbd className="rounded border border-line px-1.5 py-0.5 font-sans">{id === "details" ? "Ctrl ↵" : "Enter ↵"}</kbd> to
          continue
        </p>
      )}
    </form>
  );
}
