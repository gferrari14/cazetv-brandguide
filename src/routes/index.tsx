import { Link, createFileRoute } from "@tanstack/react-router";
import navLogo from "@/assets/cazetv-logo-nav.png";
import gradientLine from "@/assets/Rectangle_80.png.asset.json";
import homeBg from "@/assets/home-bg.gif.asset.json";
import { CircularCarousel } from "@/components/shared/CircularCarousel";

export const Route = createFileRoute("/")({
  component: Entry,
});

const links = [
  { to: "/brandguide", label: "CAZÉTV" },
  { to: "/identidades", label: "IDENTIDADES" },
  { to: "/", label: "DÚVIDAS" },
] as const;

function Entry() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* GIF de fundo com 15% de opacidade e saturação zerada */}
      <img
        src={homeBg.url}
        alt=""
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-[0.15] saturate-0"
        aria-hidden="true"
      />

      {/* Título no topo, ocupando toda a largura via SVG (escala precisa) */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[5] px-2 md:px-3">
        <h1 className="sr-only">Branding CazéTV</h1>
        <svg
          viewBox="0 0 1000 200"
          preserveAspectRatio="xMidYMin meet"
          className="block w-full select-none"
          aria-hidden="true"
        >
          <text
            x="500"
            y="180"
            textAnchor="middle"
            fill="currentColor"
            className="text-white"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: "180px",
              letterSpacing: "-3px",
              textTransform: "uppercase",
            }}
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
          >
            BRANDING CAZÉTV
          </text>
        </svg>
      </div>

      {/* Carrossel circular sobreposto ao título */}
      <div className="pointer-events-none absolute left-1/2 top-[6vw] z-10 -translate-x-1/2">
        <div className="pointer-events-auto">
          <CircularCarousel size={280} />
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
            <img src={navLogo} alt="CazéTV" className="h-10 w-auto md:h-12" />
          </Link>
        </header>

        <div className="text-[10px] uppercase tracking-widest text-white/70">
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
