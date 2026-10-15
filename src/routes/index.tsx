import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { siteLogos } from "@/lib/site-media";
import gradientLine from "@/assets/Rectangle_80.png.asset.json";
import homeBg from "@/assets/home-bg.gif.asset.json";
import { CircularCarousel } from "@/components/shared/CircularCarousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Branding CazéTV" },
      {
        name: "description",
        content: "Guia de marca, identidades e materiais oficiais da CazéTV.",
      },
      { property: "og:title", content: "Branding CazéTV" },
      {
        property: "og:description",
        content: "Guia de marca, identidades e materiais oficiais da CazéTV.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Entry,
});

const links = [
  { to: "/brandguide", label: "CAZÉTV" },
  { to: "/identidades", label: "IDENTIDADES" },
  { to: "/", label: "DÚVIDAS" },
] as const;

function Entry() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    let active = true;
    const fit = () => {
      if (!active || !title.parentElement) return;
      title.style.fontSize = "180px";
      const naturalWidth = title.getBoundingClientRect().width;
      const parentStyle = getComputedStyle(title.parentElement);
      const availableWidth = title.parentElement.clientWidth - parseFloat(parentStyle.paddingLeft) - parseFloat(parentStyle.paddingRight);
      if (naturalWidth > 0) title.style.fontSize = `${180 * availableWidth / naturalWidth}px`;
    };
    const observer = new ResizeObserver(fit);
    if (title.parentElement) observer.observe(title.parentElement);
    void document.fonts.load('700 180px "Druk"').then(fit);
    fit();
    return () => { active = false; observer.disconnect(); };
  }, []);
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-transparent text-foreground">
      {/* GIF de fundo com 15% de opacidade e saturação zerada */}
      <img
        src={homeBg.url}
        alt=""
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-[0.15] saturate-0"
        aria-hidden="true"
      />

      {/* Título no topo, ocupando toda a largura via SVG (escala precisa) */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[5] px-2 md:px-3">
        <h1 ref={titleRef} className="home-title inline-block w-max whitespace-nowrap font-display font-bold uppercase leading-none text-foreground">BRANDING CAZÉTV</h1>
      </div>

      {/* Carrossel circular sobreposto ao título */}
      <div className="pointer-events-none absolute left-1/2 top-[6vw] z-10 -translate-x-1/2">
        <div className="pointer-events-auto">
          <CircularCarousel size={420} />
        </div>
      </div>

      {/* Linha gradiente no rodapé */}
      <img
        src={gradientLine.url}
        alt=""
        className="absolute bottom-0 left-0 z-0 h-1 w-full object-cover"
        aria-hidden="true"
      />

      {/* Container bottom-right: logo above copyright */}
      <div className="absolute bottom-4 right-3 z-10 flex flex-col items-end gap-2 md:right-4">
        <header>
          <Link to="/" aria-label="CazéTV">
            <img src={siteLogos.white} alt="CazéTV" className="h-10 w-auto md:h-12" />
          </Link>
        </header>

        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Todos os direitos reservados · CazéTV 2026
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
    </div>
  );
}
