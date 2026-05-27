import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import navLogo from "@/assets/cazetv-logo-nav.png";
import mascotIcon from "@/assets/logo-icon-color.png";
import { identities, type IdentityCategory } from "@/data/identities";
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
  const [category, setCategory] = useState<IdentityCategory>("programas");
  const [topSlug, setTopSlug] = useState<string | null>(null);
  const [footerProgress, setFooterProgress] = useState(0);

  const categoryItems = useMemo(
    () => identities.filter((i) => i.category === category),
    [category],
  );

  const filtered = useMemo(
    () =>
      categoryItems.filter((i) =>
        i.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query, categoryItems],
  );

  const layout = useMemo(() => {
    const cardH = (CARD_W * 9) / 16;
    return categoryItems.map((id, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const x = SIDE_PAD + col * (CARD_W + GAP_X);
      const y = TOP_PAD + row * (cardH + GAP_Y);
      return { slug: id.slug, x, y, w: CARD_W, rotate: 0 };
    });
  }, [categoryItems]);

  const totalRows = Math.max(1, Math.ceil(categoryItems.length / COLS));
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

  // Gradiente: segue o cursor diretamente + drift autônomo quando ocioso
  // + expansão baseada na velocidade do cursor
  const gradientRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef<{ x: number; y: number } | null>(null); // %, ou null se fora
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      // drift autônomo horizontal na base
      const driftX = Math.sin(t * 0.25) * 12; // %

      const m = mousePos.current;
      // X segue o cursor (com leve drift quando ocioso)
      const mx = m ? m.x : 50 + driftX;
      // Y travado na base — expansão controlada pelo --scale
      const my = 100;

      // expansão: cursor mais alto / mais distante da base = mais expansão
      // m.y vai de 0 (topo) a 100 (base). Quanto menor, maior expansão.
      const cursorLift = m ? Math.max(0, (100 - m.y) / 100) : 0; // 0..1
      const targetScale = 1 + cursorLift * 1.4;
      // easing simples para suavizar
      const prev = parseFloat(
        gradientRef.current?.style.getPropertyValue("--scale") || "1",
      );
      const scale = prev + (targetScale - prev) * 0.15;

      const el = gradientRef.current;
      if (el) {
        el.style.setProperty("--mx", `${mx}%`);
        el.style.setProperty("--my", `${my}%`);
        el.style.setProperty("--scale", `${scale}`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onFooterMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    mousePos.current = { x, y };
  };
  const onFooterMouseLeave = () => {
    mousePos.current = null;
  };

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="relative bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center px-6 py-5 md:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label="Início">
          <img src={navLogo} alt="CazéTV" className="h-10 w-auto md:h-12" />
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
        className="fixed inset-x-0 bottom-0 z-50 h-screen overflow-hidden bg-white text-black"
        style={{
          transform: `translateY(${(1 - footerProgress) * 100}%)`,
          transition: "transform 80ms linear",
          willChange: "transform",
        }}
        onMouseMove={onFooterMouseMove}
        onMouseLeave={onFooterMouseLeave}
      >
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col px-8 pb-10 pt-12 md:px-14">
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
                className="absolute left-1/2 h-12 w-12 -translate-x-1/2"
              />
            </div>
            <div className="flex flex-col items-start justify-between gap-2 text-xs uppercase tracking-widest text-black/60 md:flex-row md:items-center">
              <span>© CazéTV 2026</span>
              <span>Todos os direitos reservados</span>
            </div>
          </div>
        </div>

        {/* Gradiente colorido com drift autônomo + leve influência do cursor */}
        <div
          ref={gradientRef}
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 -right-24 z-0 h-[85%]"
          style={{
            background: `
              radial-gradient(calc(60% * var(--scale, 1)) calc(80% * var(--scale, 1)) at var(--mx, 30%) var(--my, 100%), rgba(246,76,104,0.55), transparent 60%),
              radial-gradient(calc(55% * var(--scale, 1)) calc(75% * var(--scale, 1)) at calc(var(--mx, 70%) + 25%) calc(var(--my, 100%) - 5%), rgba(97,184,224,0.55), transparent 65%),
              radial-gradient(calc(40% * var(--scale, 1)) calc(60% * var(--scale, 1)) at calc(var(--mx, 50%) - 15%) calc(var(--my, 100%) + 10%), rgba(243,193,27,0.35), transparent 70%)
            `,
            filter: "blur(40px)",
          }}
        />
      </footer>
    </div>
  );
}
