import { useRef, useState } from "react";
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
  const [phase, setPhase] = useState<"idle" | "out">("idle");
  const lastChange = useRef<number>(0);
  const cooldown = 900; // ms — evita passar slides muito rápido
  const slideDuration = 900; // ms — duração da animação

  const next = () => {
    const now = Date.now();
    if (now - lastChange.current < cooldown) return;
    if (phase !== "idle") return;
    lastChange.current = now;
    setPhase("out");
    // Espera o slide atual sair completamente antes de mostrar o próximo
    window.setTimeout(() => {
      setIndex((i) => (i + 1) % items.length);
      setPhase("idle");
    }, slideDuration);
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
        @keyframes cc-slide-in {
          0%   { transform: translate(-62vw, 72vh) rotate(-14deg); opacity: 0; }
          32%  { transform: translate(-42vw, 40vh) rotate(-9deg); opacity: 1; }
          68%  { transform: translate(-18vw, 12vh) rotate(-4deg); opacity: 1; }
          100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
        }
        @keyframes cc-slide-out {
          0%   { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          32%  { transform: translate(18vw, 12vh) rotate(4deg); opacity: 1; }
          68%  { transform: translate(42vw, 40vh) rotate(9deg); opacity: 1; }
          100% { transform: translate(62vw, 72vh) rotate(14deg); opacity: 0; }
        }
        .cc-jitter { animation: cc-jitter 2.4s ease-in-out infinite; }
        .cc-in     { animation: cc-slide-in 900ms cubic-bezier(0.22, 0.72, 0.28, 1) both; }
        .cc-out    { animation: cc-slide-out 900ms cubic-bezier(0.72, 0, 0.78, 0.28) both; }

        @media (prefers-reduced-motion: reduce) {
          .cc-jitter { animation: none; }
          .cc-in, .cc-out { animation-duration: 1ms; }
        }
      `}</style>
      <div
        className="group relative cursor-pointer select-none"
        style={{ width: size, height: size }}
        onMouseEnter={next}
        onClick={next}
        aria-label="Carrossel de identidades"
      >
        {(() => {
          const it = items[index];
          const animClass = phase === "out" ? "cc-out" : "cc-in";
          return (
            <div key={`${it.label}-${phase}-${index}`} className={`absolute inset-0 ${animClass}`}>
              <div className="cc-jitter h-full w-full">
                <img
                  src={it.src}
                  alt={it.label}
                  className="h-full w-full object-contain"
                  draggable={false}
                />
              </div>
            </div>
          );
        })()}
      </div>

    </>
  );
}
