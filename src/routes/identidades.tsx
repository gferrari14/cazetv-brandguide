import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowUp } from "lucide-react";
import navLogo from "@/assets/cazetv-logo-nav.png";
import mascotIcon from "@/assets/logo-icon-color.png";
import { identities } from "@/data/identities";
import { IdentityCard } from "@/components/identidades/IdentityCard";
import { IdentitiesSidebar } from "@/components/identidades/IdentitiesSidebar";
import { SearchBar } from "@/components/identidades/SearchBar";

export const Route = createFileRoute("/identidades")({
  component: IdentidadesPage,
});

const COLS = 3;
const CARD_W = 360;
const GAP_X = 40;
const GAP_Y = 72;
const SIDE_PAD = 80;
const TOP_PAD = 120;
const REVEAL_DISTANCE = 600; // px de rolagem para o rodapé subir totalmente

function IdentidadesPage() {
  const [query, setQuery] = useState("");
  const [topSlug, setTopSlug] = useState<string | null>(null);
  const [footerProgress, setFooterProgress] = useState(0);

  const filtered = useMemo(
    () =>
      identities.filter((i) =>
        i.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

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
    TOP_PAD + totalRows * ((CARD_W * 9) / 16 + GAP_Y) + 240;

  const visibleSlugs = new Set(filtered.map((i) => i.slug));

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const distanceFromBottom = max - scrolled;
      // progresso de 0 -> 1 conforme se aproxima do fim
      const p = Math.max(
        0,
        Math.min(1, 1 - distanceFromBottom / REVEAL_DISTANCE),
      );
      setFooterProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="relative bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center px-6 py-5 md:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label="Início">
          <img src={navLogo} alt="CazéTV" className="h-7 w-auto md:h-8" />
        </Link>
      </header>

      {/* Sidebar */}
      <IdentitiesSidebar items={identities} />

      {/* Galeria */}
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

      {/* Barra de pesquisa flutuante (um pouco acima do fim) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-40 flex justify-center px-4">
        <div className="pointer-events-auto w-full max-w-md">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      {/* Espaço extra para permitir mais scroll antes do rodapé */}
      <div style={{ height: REVEAL_DISTANCE }} aria-hidden />

      {/* Footer fixo que SOBE sobre o conteúdo */}
      <footer
        className="fixed inset-x-0 bottom-0 z-50 h-screen bg-white text-black"
        style={{
          transform: `translateY(${(1 - footerProgress) * 100}%)`,
          transition: "transform 80ms linear",
          willChange: "transform",
        }}
      >
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col px-8 pb-10 pt-12 md:px-14">
          <button
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            className="self-start rounded-full border border-black/20 p-3 transition hover:bg-black hover:text-white"
          >
            <ArrowUp className="size-5" />
          </button>

          <div className="mt-12 flex-1">
            <h2 className="max-w-[14ch] text-[clamp(3rem,8vw,7.5rem)] font-light leading-[0.95] tracking-tight">
              Lorem ipsum dolor sit amet consectetur.
            </h2>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-black/70 md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p>
          </div>

          <div className="relative mt-10">
            <div className="relative mb-6 flex items-center">
              <div className="h-px w-full bg-black" />
              <img
                src={mascotIcon}
                alt="CazéTV"
                className="absolute left-1/2 h-12 w-12 -translate-x-1/2 rounded-full bg-white p-1"
              />
            </div>
            <div className="flex flex-col items-start justify-between gap-2 text-xs uppercase tracking-widest text-black/60 md:flex-row md:items-center">
              <span>© CazéTV 2026</span>
              <span>Todos os direitos reservados</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
