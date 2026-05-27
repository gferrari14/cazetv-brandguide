import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import navLogo from "@/assets/cazetv-logo-nav.png";
import mascotIcon from "@/assets/logo-icon-color.png";
import { identities } from "@/data/identities";
import { IdentityCard } from "@/components/identidades/IdentityCard";
import { IdentitiesSidebar } from "@/components/identidades/IdentitiesSidebar";
import { SearchBar } from "@/components/identidades/SearchBar";

export const Route = createFileRoute("/identidades")({
  component: IdentidadesPage,
});

const COLS = 4;
const CARD_W = 240;
const GAP_X = 32;
const GAP_Y = 48;
const SIDE_PAD = 120;
const TOP_PAD = 120;

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

  // Grid organizado: 4 colunas, posições determinísticas
  const layout = useMemo(() => {
    const cardH = (CARD_W * 9) / 16;
    return identities.map((id, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const x = SIDE_PAD + col * (CARD_W + GAP_X);
      const y = TOP_PAD + row * (cardH + GAP_Y);
      return { slug: id.slug, x, y, w: CARD_W, rotate: 0 };
    });
  }, []);

  const totalRows = Math.ceil(identities.length / COLS);
  const galleryHeight =
    TOP_PAD + totalRows * ((CARD_W * 9) / 16 + GAP_Y) + 80;

  const visibleSlugs = new Set(filtered.map((i) => i.slug));

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-30 flex items-center px-6 py-5 md:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label="Início">
          <img src={navLogo} alt="CazéTV" className="h-7 w-auto md:h-8" />
        </Link>
      </header>

      {/* Sidebar */}
      <IdentitiesSidebar items={identities} />

      {/* Galeria organizada */}
      <div
        className="relative mx-auto w-full"
        style={{
          height: galleryHeight,
          maxWidth: SIDE_PAD * 2 + COLS * CARD_W + (COLS - 1) * GAP_X,
        }}
      >
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

      {/* Search flutuante */}
      <SearchBar value={query} onChange={setQuery} />

      {/* Footer estilo Stripe Press */}
      <footer className="bg-white text-black">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-24 md:px-10">
          {/* Divisor com mascote */}
          <div className="relative mb-16 flex items-center justify-center">
            <div className="h-px w-full bg-black/80" />
            <img
              src={mascotIcon}
              alt="CazéTV"
              className="absolute h-14 w-14 rounded-full bg-white p-1"
            />
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest">
                Sobre
              </h3>
              <p className="text-sm leading-relaxed text-black/70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest">
                Identidades
              </h3>
              <p className="text-sm leading-relaxed text-black/70">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest">
                Contato
              </h3>
              <p className="text-sm leading-relaxed text-black/70">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-black/15 pt-8 text-xs uppercase tracking-widest text-black/60 md:flex-row md:items-center">
            <span>© CazéTV 2026</span>
            <span>Todos os direitos reservados</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
