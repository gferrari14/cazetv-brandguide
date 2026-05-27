import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import navLogo from "@/assets/cazetv-logo-nav.png";
import { identities } from "@/data/identities";
import { IdentityCard } from "@/components/identidades/IdentityCard";
import { IdentitiesSidebar } from "@/components/identidades/IdentitiesSidebar";
import { SearchBar } from "@/components/identidades/SearchBar";

export const Route = createFileRoute("/identidades")({
  component: IdentidadesPage,
});

// Pseudo-random determinístico baseado no índice
function seeded(i: number, salt: number) {
  const x = Math.sin((i + 1) * 9301 + salt * 49297) * 233280;
  return x - Math.floor(x);
}

function IdentidadesPage() {
  const [query, setQuery] = useState("");
  const [topSlug, setTopSlug] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      identities.filter((i) =>
        i.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  // Posições orgânicas determinísticas dentro de uma área central
  const layout = useMemo(() => {
    // assume viewport ~ 1400x800 como referência; cards posicionados absolutos
    const areaW = 1400;
    const areaH = 720;
    const sidePad = 240; // espaço pra sidebar
    return identities.map((id, i) => {
      const w = 280 + Math.floor(seeded(i, 1) * 140); // 280-420
      const x = sidePad + Math.floor(seeded(i, 2) * (areaW - sidePad - w - 40));
      const y = 60 + Math.floor(seeded(i, 3) * (areaH - 200));
      const rotate = (seeded(i, 4) - 0.5) * 6; // -3 a 3 deg
      return { slug: id.slug, x, y, w, rotate };
    });
  }, []);

  const visibleSlugs = new Set(filtered.map((i) => i.slug));

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label="Início">
          <img src={navLogo} alt="CazéTV" className="h-7 w-auto md:h-8" />
          <span className="hidden text-[10px] font-bold uppercase tracking-widest text-white/70 sm:inline">
            Identidades
          </span>
        </Link>
        <Link
          to="/brandguide"
          className="gradient-hover no-border text-[10px] font-bold uppercase tracking-widest text-white/70"
        >
          <span>Brandguide</span>
        </Link>
      </header>

      {/* Sidebar */}
      <IdentitiesSidebar items={identities} />

      {/* Galeria */}
      <div className="relative mx-auto h-screen w-full max-w-[1500px]">
        {layout.map((l, i) => {
          const identity = identities.find((id) => id.slug === l.slug)!;
          const isVisible = visibleSlugs.has(l.slug);
          return (
            <div
              key={l.slug}
              style={{
                opacity: isVisible ? 1 : 0.1,
                pointerEvents: isVisible ? "auto" : "none",
                transition: "opacity 200ms ease",
              }}
            >
              <IdentityCard
                identity={identity}
                initial={l}
                zIndex={topSlug === l.slug ? 50 : 10 + i}
                onFocus={() => setTopSlug(l.slug)}
              />
            </div>
          );
        })}
      </div>

      {/* Search */}
      <SearchBar value={query} onChange={setQuery} />
    </div>
  );
}
