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
      <video
        src="/videos/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-15"
      />

      {/* Título no topo, ocupando toda a largura */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[5] px-2 md:px-3">
        <h1
          className="select-none whitespace-nowrap uppercase text-white"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: "clamp(48px, 16vw, 320px)",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            width: "100%",
            transform: "scaleY(1.05)",
            transformOrigin: "top left",
          }}
        >
          BRANDING CAZÉTV
        </h1>
      </div>

      {/* Logo bottom-right */}
      <header className="absolute bottom-4 right-3 z-10 md:right-4">
        <Link to="/" aria-label="CazéTV">
          <img src={navLogo} alt="CazéTV" className="h-10 w-auto md:h-12" />
        </Link>
      </header>

      {/* Buttons */}
      <nav className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-row flex-wrap justify-center gap-2">
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
