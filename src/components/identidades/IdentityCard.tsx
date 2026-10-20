import { useRef, useState, type PointerEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { Identity } from "@/data/identities";
import umDiaComCover from "@/assets/um-dia-com/capa.jpg";
import aquiEBrasil from "@/assets/programas/aqui-e-brasil.png";
import br360 from "@/assets/programas/br-360.png";
import liveCazetv from "@/assets/programas/live-cazetv.jpg";
import copazona from "@/assets/programas/copazona.png";
import copeiros from "@/assets/programas/copeiros.png";
import destrinchaDonan from "@/assets/programas/destrincha-donan.png";
import geralCazetv from "@/assets/programas/geral-cazetv.png";
import jaECopa from "@/assets/programas/ja-e-copa.png";
import rodaDeBobo from "@/assets/programas/roda-de-bobo.png";
import recopando from "@/assets/programas/recopando.gif";
import boraCopar from "@/assets/competicoes/bora-copar.png";
import nocheDeCopa from "@/assets/competicoes/noche-de-copa.png";
import quemFezFezCover from "@/assets/quem-fez-fez/TELA_CONCEITO.png.asset.json";
import seisEmUmCover from "@/assets/seis-em-um/LOGO.png.asset.json";
import futInterCover from "@/assets/futebol-internacional/CAPA_FUT_INTER.png.asset.json";

const COVERS: Record<string, string> = {
  "futebol-internacional": futInterCover.url,
  "quem-fez-fez": quemFezFezCover.url,
  "seis-em-um": seisEmUmCover.url,
  "um-dia-com": umDiaComCover,
  "aqui-e-brasil": aquiEBrasil,
  "br-360": br360,
  "live-cazetv": liveCazetv,
  "copazona": copazona,
  "copeiros": copeiros,
  "destrincha-donan": destrinchaDonan,
  "geral-cazetv": geralCazetv,
  "ja-e-copa": jaECopa,
  "roda-de-bobo": rodaDeBobo,
  "recopando": recopando,
  "bora-copar": boraCopar,
  "noche-de-copa": nocheDeCopa,
};

interface Props {
  identity: Identity;
  initial: { x: number; y: number; w: number; rotate: number };
  zIndex: number;
  onFocus: () => void;
  onOpenModal?: (identity: Identity) => void;
  coverUrl?: string;
}

const DRAG_THRESHOLD = 4;

export function IdentityCard({ identity, initial, zIndex, onFocus, onOpenModal, coverUrl }: Props) {

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
      // abre o modal enquanto o card ainda está expandindo, criando uma
      // transição fluida entre o card e o conteúdo da identidade
      window.setTimeout(() => {
        if (onOpenModal) {
          onOpenModal(identity);
          // reset depois que o modal já cobriu a tela
          window.setTimeout(() => setZooming(false), 400);
        } else {
          navigate({ to: "/identidades/$slug", params: { slug: identity.slug } });
        }
      }, 420);
    }

  };

  return (
    <div
      data-identity-card
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
        cursor: "none",
      }}
      className="group absolute touch-none select-none transition-shadow"
    >

      <div
        className={[
          "relative overflow-hidden border-2 border-white/25 bg-white/[0.04] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]",
          zooming
            ? "animate-card-zoom origin-center"
            : "transition-transform group-hover:scale-[1.02]",
        ].join(" ")}
        style={{ aspectRatio: "16 / 9" }}
      >
        {coverUrl || COVERS[identity.slug] ? (
          <img
            src={coverUrl || COVERS[identity.slug]}
            alt={identity.name}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0" />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {identity.name}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
