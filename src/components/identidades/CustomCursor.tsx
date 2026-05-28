import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

const EXPAND_SELECTOR = "a, button, [role='tab'], [data-cursor-target], [data-identity-card]";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setVisible(true);
      const el = ref.current;
      if (el) {
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      const target = e.target as HTMLElement | null;
      const over = !!target?.closest?.(EXPAND_SELECTOR);
      setExpanded(over);
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) setVisible(false);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex items-center justify-center"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 200ms ease",
        mixBlendMode: "difference",
      }}
    >
      <div
        className="flex items-center justify-center bg-white text-black"
        style={{
          width: expanded ? 48 : 12,
          height: expanded ? 48 : 12,
          transition:
            "width 220ms cubic-bezier(0.4,0,0.2,1), height 220ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <Plus
          className="text-black"
          style={{
            width: expanded ? 22 : 0,
            height: expanded ? 22 : 0,
            opacity: expanded ? 1 : 0,
            transition: "opacity 180ms ease",
          }}
          strokeWidth={2.5}
        />
      </div>
    </div>
  );
}
