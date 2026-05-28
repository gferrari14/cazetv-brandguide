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
    <div className="relative h-screen w-screen overflow-hidden bg-background text-foreground" style={{ cursor: "none" }}>
      <video
        src="/videos/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/40" aria-hidden />

      {/* Logo top-left */}
      <header className="absolute left-3 top-4 z-10 md:left-4">
        <Link to="/" aria-label="CazéTV">
          <img src={navLogo} alt="CazéTV" className="h-10 w-auto md:h-12" />
        </Link>
      </header>

      {/* Buttons bottom-left */}
      <nav className="absolute bottom-4 left-3 z-10 flex flex-col gap-2 md:left-4">
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
