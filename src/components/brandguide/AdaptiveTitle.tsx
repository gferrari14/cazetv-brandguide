import { useEffect, useRef, useState } from "react";

/** Secondary titles use the wide face only when the actual text fits on one line. */
export function AdaptiveTitle({ text }: { text: string }) {
  const container = useRef<HTMLSpanElement>(null);
  const measurement = useRef<HTMLSpanElement>(null);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const element = container.current;
    const sample = measurement.current;
    if (!element || !sample) return;
    let active = true;
    const update = () => {
      if (active) setWide(text.length <= 24 && element.clientWidth >= 640 && sample.getBoundingClientRect().width <= element.clientWidth);
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    void document.fonts.ready.then(update);
    update();
    return () => { active = false; observer.disconnect(); };
  }, [text]);

  return (
    <span ref={container} className="relative block min-w-0 overflow-hidden">
      <span ref={measurement} aria-hidden="true" className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap font-display-wide font-bold">{text}</span>
      <span className={wide ? "font-display-wide" : "font-display"}>{text}</span>
    </span>
  );
}