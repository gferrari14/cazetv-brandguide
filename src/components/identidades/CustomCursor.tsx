import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

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
      const overCard = !!target?.closest?.("[data-identity-card]");
      setExpanded(overCard);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", (e) => {
      if (!(e as MouseEvent).relatedTarget) onLeave();
    });
    return () => {
      window.removeEventListener("mousemove", onMove);
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
