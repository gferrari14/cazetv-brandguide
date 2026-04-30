import { Link, createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import navLogo from "@/assets/cazetv-logo-nav.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const sections = [
  { path: "/logo", label: "LOGO" },
  { path: "/cores", label: "CORES" },
  { path: "/fontes", label: "FONTES" },
  { path: "/assets", label: "ASSETS" },
  { path: "/gradiente", label: "GRADIENTE" },
] as const;

function Index() {
  return (
    <BrandLayout>
      <section className="guide-grid relative flex min-h-screen flex-col justify-between overflow-hidden bg-background px-4 py-8 sm:px-6 md:px-12 md:py-12 lg:px-24">
        <video
          src="/videos/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-15"
        />
        <div className="animate-soft-reveal pt-2 md:pt-4">
          <img src={navLogo} alt="CazéTV" className="mb-5 h-7 w-auto md:h-8" />
          <h1 className="max-w-6xl text-6xl font-bold uppercase leading-none text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
            BEM-VINDO AO BRANDGUIDE CAZÉTV
          </h1>
        </div>

        <div className="min-h-12 flex-1" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {sections.map((section) => (
              <Link
                key={section.path}
                to={section.path}
                className="gradient-hover border border-border bg-guide-panel px-4 py-3 text-sm font-bold uppercase text-foreground shadow-guide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-6"
              >
                <span>{section.label}</span>
              </Link>
            ))}
          </div>
          <div className="text-right text-xs font-bold uppercase text-muted-foreground">
            Todos os direitos reservados · CazéTV 2026
          </div>
        </div>
      </section>
    </BrandLayout>
  );
}
