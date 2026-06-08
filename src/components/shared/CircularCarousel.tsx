import { useState } from "react";
import aqui from "@/assets/carousel/aqui-e-brasil.png.asset.json";
import bora from "@/assets/carousel/bora-copar.png.asset.json";
import br360 from "@/assets/carousel/br-360.png.asset.json";
import copazona from "@/assets/carousel/copazona.png.asset.json";
import destrincha from "@/assets/carousel/destrincha-donan.png.asset.json";
import noche from "@/assets/carousel/noche-de-copa.png.asset.json";
import recopando from "@/assets/carousel/recopando.png.asset.json";
import roda from "@/assets/carousel/roda-de-bobo.png.asset.json";
import umdia from "@/assets/carousel/um-dia-com.png.asset.json";

const items = [
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
  const next = () => setIndex((i) => (i + 1) % items.length);

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
          0%   { transform: translateX(-120%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes cc-slide-out {
          0%   { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        .cc-jitter { animation: cc-jitter 2.4s ease-in-out infinite; }
        .cc-in     { animation: cc-slide-in 600ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .cc-out    { animation: cc-slide-out 600ms cubic-bezier(0.65, 0, 0.35, 1) both; }
      `}</style>
      <div
        className="group relative cursor-pointer select-none overflow-hidden"
        style={{ width: size, height: size }}
        onMouseEnter={next}
        onClick={next}
        aria-label="Carrossel de identidades"
      >
        <div className="cc-jitter absolute inset-0">
          {items.map((it, i) => {
            const prev = (index - 1 + items.length) % items.length;
            if (i !== index && i !== prev) return null;
            return (
              <img
                key={`${it.label}-${i === index ? "in" : "out"}-${index}`}
                src={it.src}
                alt={it.label}
                className={`absolute inset-0 h-full w-full object-contain ${
                  i === index ? "cc-in" : "cc-out"
                }`}
                draggable={false}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
