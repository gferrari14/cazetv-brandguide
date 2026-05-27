import { useRef, useState, type PointerEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { Identity } from "@/data/identities";

interface Props {
  identity: Identity;
  initial: { x: number; y: number; w: number; rotate: number };
  zIndex: number;
  onFocus: () => void;
}

const DRAG_THRESHOLD = 4;

export function IdentityCard({ identity, initial, zIndex, onFocus }: Props) {
  const navigate = useNavigate();
  const [pos, setPos] = useState({ x: initial.x, y: initial.y });
  const [zooming, setZooming] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  } | null>(null);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (zooming) return;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
      moved: false,
    };
    onFocus();
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    d.moved = true;
    setPos({ x: d.originX + dx, y: d.originY + dy });
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    dragRef.current = null;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    if (d && !d.moved) {
      onFocus();
      setZooming(true);
      // duração total da animação salto + zoom in antes de navegar
      window.setTimeout(() => {
        navigate({ to: "/identidades/$slug", params: { slug: identity.slug } });
      }, 650);
    }
  };

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        left: pos.x,
        top: pos.y,
        width: initial.w,
        transform: `rotate(${initial.rotate}deg)`,
        zIndex: zooming ? 100 : zIndex,
      }}
      className="group absolute touch-none select-none transition-shadow"
    >
      <div
        className={[
          "relative overflow-hidden border border-white/15 bg-white/[0.04] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]",
          zooming
            ? "animate-card-zoom origin-center"
            : "transition-transform group-hover:scale-[1.02]",
        ].join(" ")}
        style={{ aspectRatio: "16 / 9" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0" />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold uppercase tracking-widest text-white/40">
          {identity.name}
        </div>
      </div>
    </div>
  );
}
