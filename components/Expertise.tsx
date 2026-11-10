const services = [
  {
    title: "Product design",
    description:
      "Product strategy, user flows and interfaces for web apps and SaaS, shaped around real users and business goals.",
  },
  {
    title: "Software development",
    description:
      "Custom web apps and internal tools built from product idea to reliable, launch ready software.",
  },
  {
    title: "Business websites",
    description:
      "Strategic websites that clarify your offer, strengthen trust and turn the right visitors into enquiries.",
  },
  {
    title: "AI & automation",
    description:
      "Practical AI features and automated workflows that reduce repetitive work and help your team operate better.",
  },
];

/* Isometric stack of interface layers. Plane coordinates are projected with
   the matrix on the <g>; each layer is lifted on screen by its `lift`. */
const layers = [
  { x: 0, y: 0, w: 230, h: 160, lift: 0 },
  { x: 16, y: 16, w: 124, h: 84, lift: 36 },
  { x: 152, y: 16, w: 62, h: 128, lift: 36 },
  { x: 28, y: 28, w: 100, h: 28, lift: 66 },
  { x: 28, y: 66, w: 100, h: 24, lift: 66 },
  { x: 58, y: 36, w: 76, h: 46, lift: 104, top: true },
];

const ISO = "matrix(0.866 0.5 -0.866 0.5 0 0)";

/* Screen position of a layer's centre, used for the travelling dot's path. */
function centre(i: number) {
  const l = layers[i];
  const cx = l.x + l.w / 2;
  const cy = l.y + l.h / 2;
  return [0.866 * (cx - cy), 0.5 * (cx + cy) - l.lift] as const;
}

/* Base → side panel → content → top card, as one smooth curve. */
const FLOW = (() => {
  const pts = [0, 2, 1, 3, 5].map(centre);
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    d += ` C${x0.toFixed(1)} ${(y0 - 30).toFixed(1)} ${x1.toFixed(1)} ${(y1 + 30).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  return d;
})();

function LayerStack() {
  return (
    <svg
      viewBox="-160 -64 380 276"
      aria-hidden
      className="w-full max-w-[16rem] text-ink sm:max-w-[22rem]"
      fill="none"
      strokeWidth="1"
    >
      {layers.map((l, i) => (
        <g key={i} data-layer={Math.round(l.lift / 26)}>
          {/* Edge, drawn a few pixels lower to give the layer thickness. */}
          <g transform={`translate(0 ${6 - l.lift}) ${ISO}`}>
            <rect
              x={l.x}
              y={l.y}
              width={l.w}
              height={l.h}
              rx="8"
              className="fill-canvas stroke-current opacity-30"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <g transform={`translate(0 ${-l.lift}) ${ISO}`}>
            <rect
              x={l.x}
              y={l.y}
              width={l.w}
              height={l.h}
              rx="8"
              className={l.top ? "fill-canvas stroke-current" : "fill-canvas stroke-current opacity-45"}
              strokeWidth={l.top ? 1.4 : 1}
              vectorEffect="non-scaling-stroke"
            />
            {l.top && (
              <rect
                x={l.x + 22}
                y={l.y + 16}
                width={l.w - 44}
                height="10"
                rx="5"
                className="stroke-current"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </g>
        </g>
      ))}
      {/* A dot travels through the layers along this path (GSAP MotionPath). */}
      <path
        data-motion-path
        d={FLOW}
        className="stroke-current opacity-35"
        strokeDasharray="2 4"
        vectorEffect="non-scaling-stroke"
      />
      <circle data-motion-dot r="4" className="fill-brand" cx={centre(0)[0]} cy={centre(0)[1]} />
    </svg>
  );
}

export default function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="scroll-mt-20">
      {/* How I think */}
      <div className="grid items-center gap-14 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:px-16">
        <div className="max-w-xl">
          <p className="text-sm text-ink-soft">How I think</p>
          <h2
            id="expertise-heading"
            data-split-lines
            className="mt-5 text-[2.25rem] font-medium leading-[1.05] tracking-[-0.04em] sm:text-[2.75rem]"
          >
            Every product is a <span className="block text-ink-soft/70">stack of decisions.</span>
          </h2>
          <p data-reveal className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">
            Take a product apart and you find its layers: the problem, the flow, the interface and
            the code underneath. I design and build each one on purpose, and how they fit together,
            so the product holds up when real people use it every day.
          </p>
        </div>
        <div className="flex justify-center">
          <LayerStack />
        </div>
      </div>

      {/* What I do */}
      <div className="flex h-14 items-center border-y border-line px-4 sm:px-7">
        <h3 className="text-sm text-ink-soft">What I do</h3>
      </div>
      <ol data-reveal-stagger className="grid sm:grid-cols-2">
        {services.map((s, i) => (
          <li key={s.title} className="border-b border-line px-4 py-8 sm:px-7 sm:odd:border-r">
            <p className="text-sm tabular-nums text-ink-soft">{String(i + 1).padStart(2, "0")}</p>
            <h4 className="mt-3 text-[1.0625rem] font-medium tracking-[-0.02em]">{s.title}</h4>
            <p className="mt-1.5 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-soft">
              {s.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
