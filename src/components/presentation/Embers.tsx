import type { CSSProperties } from "react";

// Deterministic values so server and browser render the same embers.
const EMBERS = Array.from({ length: 28 }, (_, i) => {
  const r = (k: number) => (Math.sin(i * 97.13 + k * 13.7) + 1) / 2;
  return {
    left: `${(r(1) * 100).toFixed(2)}%`,
    size: `${(2 + r(2) * 3).toFixed(1)}px`,
    duration: 9 + r(3) * 12,
    delay: -r(4) * 20,
    drift: `${Math.round((r(5) - 0.5) * 160)}px`,
    opacity: 0.35 + r(6) * 0.6,
  };
});

export function Embers() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={
            {
              left: e.left,
              width: e.size,
              height: e.size,
              opacity: e.opacity,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
              "--drift": e.drift,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
