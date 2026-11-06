import type { CSSProperties } from "react";

/**
 * Slow, ambient animation for the site's pixel-square background.
 * The base image drifts very slowly while extra squares, snapped to the same
 * grid rhythm as the artwork, fade in and out. Generated from a fixed seed so
 * server and client render identical markup.
 */

type Square = {
  left: number;
  top: number;
  w: number;
  h: number;
  alpha: number;
  duration: number;
  delay: number;
};

function seeded(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const COLS = 20;
const ROWS = 12;

const SQUARES: Square[] = (() => {
  const rand = seeded(20261106);
  const list: Square[] = [];
  for (let i = 0; i < 26; i += 1) {
    const w = rand() < 0.25 ? 2 : 1;
    const h = rand() < 0.15 ? 2 : 1;
    list.push({
      left: Math.floor(rand() * (COLS - w + 1)),
      top: Math.floor(rand() * (ROWS - h + 1)),
      w,
      h,
      alpha: 0.05 + rand() * 0.09,
      duration: 10 + rand() * 12,
      delay: -rand() * 22,
    });
  }
  return list;
})();

export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="site-bg-animated">
      <div className="site-bg-animated__image" />
      <div className="site-bg-animated__squares">
        {SQUARES.map((s, i) => (
          <span
            key={i}
            className="site-bg-animated__square"
            style={
              {
                left: `${(s.left / COLS) * 100}%`,
                top: `${(s.top / ROWS) * 100}%`,
                width: `${(s.w / COLS) * 100}%`,
                height: `${(s.h / ROWS) * 100}%`,
                "--square-alpha": s.alpha,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="site-bg-animated__dim" />
    </div>
  );
}
