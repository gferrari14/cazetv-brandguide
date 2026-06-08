import { Link, createFileRoute } from "@tanstack/react-router";
import navLogo from "@/assets/cazetv-logo-nav.png";

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

      {/* Logo bottom-right */}
      <header className="absolute bottom-4 right-3 z-10 md:right-4">
        <Link to="/" aria-label="CazéTV">
          <img src={navLogo} alt="CazéTV" className="h-10 w-auto md:h-12" />
        </Link>
      </header>

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
