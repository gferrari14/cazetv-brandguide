import { Link, createFileRoute } from "@tanstack/react-router";
import navLogo from "@/assets/cazetv-logo-nav.png";

export const Route = createFileRoute("/")({
  component: Entry,
});

function Entry() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background px-4 py-8 sm:px-6 md:px-12 md:py-12 lg:px-24">
      <video
        src="/videos/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 size-full object-cover opacity-15"
      />

      <header className="animate-soft-reveal relative z-10">
        <img src={navLogo} alt="CazéTV" className="h-10 w-auto md:h-12" />
      </header>

      <main className="animate-soft-reveal relative z-10 flex flex-1 flex-col items-center justify-center gap-10 text-center">
        <h1 className="max-w-4xl text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl md:text-6xl">
          BEM-VINDO À CAZÉTV
        </h1>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Link
            to="/brandguide"
            className="gradient-hover border border-border bg-transparent px-10 py-5 text-base font-bold uppercase text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-lg"
          >
            <span>BRANDGUIDE</span>
          </Link>
          <Link
            to="/identidades"
            className="gradient-hover border border-border bg-transparent px-10 py-5 text-base font-bold uppercase text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-lg"
          >
            <span>IDENTIDADES</span>
          </Link>
        </div>
      </main>

      <footer className="relative z-10 text-right text-xs font-bold uppercase text-muted-foreground">
        Todos os direitos reservados · CazéTV 2026
      </footer>
    </div>
  );
}
