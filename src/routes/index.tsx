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

      {/* Logo top-left */}
      <header className="absolute left-3 top-4 z-10 md:left-4">
        <Link to="/" aria-label="CazéTV">
          <img src={navLogo} alt="CazéTV" className="h-10 w-auto md:h-12" />
        </Link>
      </header>

      {/* Título pequeno, verticalmente central e alinhado à esquerda */}
      <div className="pointer-events-none absolute left-3 top-1/2 z-[5] -translate-y-1/2 md:left-4">
        <h1 className="select-none text-left font-black uppercase leading-[0.85] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(20px, 6vw, 80px)" }}>
          BRANDING CAZÉTV
        </h1>
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
