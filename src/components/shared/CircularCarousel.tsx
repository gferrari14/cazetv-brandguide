import { useEffect, useRef, useState } from "react";
import aqui from "@/assets/carousel/aqui-e-brasil.png.asset.json";
import bora from "@/assets/carousel/bora-copar.png.asset.json";
import br360 from "@/assets/carousel/br-360.png.asset.json";
import copazona from "@/assets/carousel/copazona.png.asset.json";
import destrincha from "@/assets/carousel/destrincha-donan.png.asset.json";
import logoCazetv from "@/assets/carousel/logo-cazetv.png.asset.json";
import noche from "@/assets/carousel/noche-de-copa.png.asset.json";
import recopando from "@/assets/carousel/recopando.png.asset.json";
import roda from "@/assets/carousel/roda-de-bobo.png.asset.json";
import umdia from "@/assets/carousel/um-dia-com.png.asset.json";

const items = [
  { src: logoCazetv.url, label: "CazéTV" },
  { src: aqui.url, label: "Aqui é Brasil" },
  { src: bora.url, label: "Bora Copar" },
  { src: br360.url, label: "BR 360" },
  { src: copazona.url, label: "Copazona" },
  { src: destrincha.url, label: "Destrincha Donan" },
  { src: noche.url, label: "Noche de Copa" },
  { src: recopando.url, label: "Recopando" },
  { src: roda.url, label: "Roda de Bobo" },
  { src: umdia.url, label: "Um Dia Com" },
];

export function CircularCarousel({ size = 240 }: { size?: number }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const animating = useRef(false);
  const lastChange = useRef<number>(0);
  const duration = 2000;
  const cooldown = 2100;

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const next = () => {
    const now = Date.now();
    if (now - lastChange.current < cooldown) return;
    if (animating.current) return;

    lastChange.current = now;
    animating.current = true;

    const track = trackRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!track || reduceMotion) {
      setIndex((i) => (i + 1) % items.length);
      animating.current = false;
      return;
    }

    const startedAt = performance.now();
    let imageChanged = false;

    const animate = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      // Uma única curva temporal: acelera ao sair e desacelera somente ao chegar.
      const travel = 0.5 - Math.cos(progress * Math.PI) / 2;
      const outgoing = travel < 0.5;
      const halfProgress = outgoing ? travel * 2 : (travel - 0.5) * 2;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      // O ícone atravessa a tela de ponta a ponta: entra pelo extremo esquerdo
      // e sai pelo extremo direito, sempre totalmente fora da área visível no
      // instante em que a imagem troca.
      const horizontalReach = viewportWidth / 2 + size / 2 + 48;
      // Queda suave: mantém o ícone dentro da tela durante toda a travessia.
      const verticalReach = Math.min(viewportHeight * 0.28, horizontalReach * 0.5);
      // Some apenas ao encostar na borda, nunca no meio do caminho.
      const fadeAt = 0.92;

      let x: number;
      let y: number;
      let rotation: number;
      let opacity: number;

      if (outgoing) {
        x = horizontalReach * halfProgress;
        y = verticalReach * Math.sin((halfProgress * Math.PI) / 2);
        rotation = 14 * halfProgress;
        opacity = halfProgress < fadeAt ? 1 : Math.max(0, (1 - halfProgress) / (1 - fadeAt));
      } else {
        if (!imageChanged) {
          imageChanged = true;
          setIndex((i) => (i + 1) % items.length);
        }
        const arriving = 1 - halfProgress;
        x = -horizontalReach * arriving;
        y = verticalReach * Math.sin((arriving * Math.PI) / 2);
        rotation = -14 * arriving;
        opacity = arriving < fadeAt ? 1 : Math.max(0, (1 - arriving) / (1 - fadeAt));
      }

      track.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      track.style.opacity = String(opacity);

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      track.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
      track.style.opacity = "1";
      frameRef.current = null;
      animating.current = false;
    };

    frameRef.current = window.requestAnimationFrame(animate);
  };

  return (
    <>
      <style>{`
        @keyframes cc-jitter {
          0%   { transform: translate(0, 0) rotate(0deg); }
          15%  { transform: translate(-6px, 4px) rotate(-2deg); }
          30%  { transform: translate(5px, -3px) rotate(1.5deg); }
          45%  { transform: translate(-3px, -5px) rotate(-1deg); }
          60%  { transform: translate(4px, 5px) rotate(2deg); }
          75%  { transform: translate(-5px, 2px) rotate(-1.5deg); }
          90%  { transform: translate(3px, -4px) rotate(1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .cc-jitter { animation: cc-jitter 2.4s ease-in-out infinite; }
        .cc-track  { will-change: transform, opacity; }

        @media (prefers-reduced-motion: reduce) {
          .cc-jitter { animation: none; }
        }
      `}</style>
      <div
        className="group relative cursor-pointer select-none"
        style={{ width: size, height: size }}
        onMouseEnter={next}
        onClick={next}
        aria-label="Carrossel de identidades"
      >
        <div ref={trackRef} className="cc-track absolute inset-0">
          <div className="cc-jitter h-full w-full">
            <img
              src={items[index].src}
              alt={items[index].label}
              className="h-full w-full object-contain"
              draggable={false}
            />
          </div>
        </div>
      </div>

    </>
  );
}
