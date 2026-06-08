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
    <div
      className="group relative cursor-pointer select-none"
      style={{ width: size, height: size }}
      onMouseEnter={next}
      onClick={next}
      aria-label="Carrossel de identidades"
    >
      {/* slow rotation wrapper */}
      <div className="absolute inset-0 animate-[spin_18s_linear_infinite]">
        {items.map((it, i) => (
          <img
            key={it.label}
            src={it.src}
            alt={it.label}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
