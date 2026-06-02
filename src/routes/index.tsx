import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import navLogo from "@/assets/cazetv-logo-nav.png";
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

export const Route = createFileRoute("/")({
  component: Entry,
});

const links = [
  { to: "/brandguide", label: "CAZÉTV" },
  { to: "/identidades", label: "IDENTIDADES" },
  { to: "/", label: "DÚVIDAS" },
] as const;

const COVERS: string[] = [
  umDiaComCover,
  aquiEBrasil,
  br360,
  liveCazetv,
  copazona,
  copeiros,
  destrinchaDonan,
  geralCazetv,
  jaECopa,
  rodaDeBobo,
  recopando,
  boraCopar,
  nocheDeCopa,
];

function Entry() {
  const [coverIdx, setCoverIdx] = useState(0);
  const titleRef = useRef<HTMLDivElement | null>(null);

  // troca de capas a cada 1.4s
  useEffect(() => {
    const id = window.setInterval(() => {
      setCoverIdx((i) => (i + 1) % COVERS.length);
    }, 1400);
    return () => window.clearInterval(id);
  }, []);

  // efeito de "expandir/comprimir horizontalmente" o título conforme a posição do cursor
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    let raf = 0;
    const state = { sx: 1, tsx: 1 };

    const onMove = (e: MouseEvent) => {
      // -1 (esquerda) .. +1 (direita)
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      // mapeia para 0.65 .. 1.35
      state.tsx = 1 + nx * 0.35;
    };

    const tick = () => {
      state.sx += (state.tsx - state.sx) * 0.1;
      el.style.transform = `scaleX(${state.sx.toFixed(3)})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background text-foreground">
      <video
        src="/videos/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-15"
      />

      {/* Logo top-left */}
      <header className="absolute left-3 top-4 z-10 md:left-4">
        <Link to="/" aria-label="CazéTV">
          <img src={navLogo} alt="CazéTV" className="h-10 w-auto md:h-12" />
        </Link>
      </header>

      {/* Título gigante centralizado com card cíclico no meio */}
      <div className="absolute inset-0 z-[5] flex items-center justify-center px-4">
        <div
          ref={titleRef}
          className="flex w-full items-center justify-center gap-[2vw] whitespace-nowrap"
          style={{
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <h1
            className="select-none font-black uppercase leading-[0.85] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(48px, 13vw, 240px)" }}
          >
            BRANDING
          </h1>

          {/* Card cíclico de identidade */}
          <div
            aria-hidden
            className="relative overflow-hidden border-2 border-white/25 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]"
            style={{
              height: "clamp(56px, 10vw, 180px)",
              aspectRatio: "16 / 9",
            }}
          >
            {COVERS.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                style={{ opacity: i === coverIdx ? 1 : 0 }}
              />
            ))}
          </div>

          <h1
            className="select-none font-black uppercase leading-[0.85] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(48px, 13vw, 240px)" }}
          >
            CAZÉTV
          </h1>
        </div>
      </div>

      {/* Buttons bottom-left */}
      <nav className="absolute bottom-4 left-3 z-10 flex flex-row flex-wrap gap-2 md:left-4">
        {links.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            className="inline-flex w-fit items-center border-2 border-white/80 bg-transparent px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Copyright bottom-right */}
      <div className="absolute bottom-4 right-3 z-10 text-[10px] uppercase tracking-widest text-white/70 md:right-4">
        Todos os direitos reservados · CazéTV 2026
      </div>
    </div>
  );
}
