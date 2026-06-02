import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import navLogo from "@/assets/cazetv-logo-nav.png";
import { identities, type IdentityCategory } from "@/data/identities";
import { IdentityCard } from "@/components/identidades/IdentityCard";
import { IdentitiesSidebar } from "@/components/identidades/IdentitiesSidebar";
import { IdentityModal } from "@/components/identidades/IdentityModal";
import { SearchBar } from "@/components/identidades/SearchBar";
import { RevealFooter } from "@/components/shared/RevealFooter";



export const Route = createFileRoute("/identidades")({
  component: IdentidadesPage,
});

const COLS = 3;
const CARD_W = 360;
const GAP_X = 56;
const GAP_Y = 80;
const SIDE_PAD = 40;
const TOP_PAD = 100;
const PARALLAX_STRENGTH = 50; // px máximo de deslocamento dos cards seguindo o cursor

function IdentidadesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<IdentityCategory>("programas");
  const [topSlug, setTopSlug] = useState<string | null>(null);
  const [modalIdentity, setModalIdentity] = useState<
    import("@/data/identities").Identity | null
  >(null);



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
    // Padrão assimétrico inspirado em blit.studio
    const variants = [
      { dx: 0,    dy: 0,   scale: 1.0,  rot: -1 },
      { dx: 60,   dy: 40,  scale: 0.85, rot: 1.5 },
      { dx: -30,  dy: 80,  scale: 1.1,  rot: -0.5 },
      { dx: 40,   dy: -30, scale: 0.9,  rot: 2 },
      { dx: -50,  dy: 50,  scale: 1.05, rot: -1.5 },
      { dx: 20,   dy: 90,  scale: 0.95, rot: 0.5 },
      { dx: -20,  dy: -20, scale: 1.0,  rot: 1 },
      { dx: 70,   dy: 30,  scale: 0.88, rot: -2 },
      { dx: -40,  dy: 60,  scale: 1.08, rot: 0.8 },
    ];
    return categoryItems.map((id, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const v = variants[i % variants.length];
      const w = CARD_W * v.scale;
      const x = SIDE_PAD + col * (CARD_W + GAP_X) + v.dx;
      const y = TOP_PAD + row * (cardH + GAP_Y) + v.dy;
      return { slug: id.slug, x, y, w, rotate: v.rot };
    });
  }, [categoryItems]);


  const totalRows = Math.max(1, Math.ceil(categoryItems.length / COLS));
  const galleryHeight =
    TOP_PAD + totalRows * ((CARD_W * 9) / 16 + GAP_Y) + 240;

  const visibleSlugs = new Set(filtered.map((i) => i.slug));

  // (rodapé com reveal/gradiente foi movido para o componente RevealFooter)

  // Parallax: cards seguem o cursor (com lerp suave)
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const cursorOffset = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      cursorOffset.current.tx = -nx * PARALLAX_STRENGTH;
      cursorOffset.current.ty = -ny * PARALLAX_STRENGTH * 0.5;
    };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const tick = () => {
      const c = cursorOffset.current;
      c.x += (c.tx - c.x) * 0.08;
      c.y += (c.ty - c.y) * 0.08;
      if (galleryRef.current) {
        galleryRef.current.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative bg-background text-foreground">


      {/* Header */}
      <header className="sticky top-0 z-30 flex items-start px-3 py-4 md:px-4">
        <Link to="/" className="flex items-center gap-3" aria-label="Início">
          <img src={navLogo} alt="CazéTV" className="h-10 w-auto md:h-12" />
        </Link>
      </header>

      {/* Switch Programas/Competições — canto inferior esquerdo, alinhado à busca */}
      <div className="fixed bottom-20 left-3 z-40 md:left-4">
        <div
          role="tablist"
          aria-label="Categoria"
          className="inline-flex items-center border-2 border-white/30 bg-black/60 p-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-xl"
        >
          {(
            [
              { id: "programas", label: "Programas" },
              { id: "competicoes", label: "Competições" },
            ] as const
          ).map((opt) => {
            const active = category === opt.id;
            return (
              <button
                key={opt.id}
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(opt.id)}
                className={`px-4 py-2.5 uppercase transition-colors ${
                  active
                    ? "bg-white text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {opt.label.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>



      {/* Sidebar */}
      <IdentitiesSidebar items={categoryItems} />


      {/* Galeria */}
      <div
        ref={galleryRef}
        className="relative mx-auto w-full"
        style={{
          height: galleryHeight,
          maxWidth: SIDE_PAD * 2 + COLS * CARD_W + (COLS - 1) * GAP_X,
          willChange: "transform",
        }}
      >

        {layout.map((l, i) => {
          const identity = categoryItems.find((id) => id.slug === l.slug)!;
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
                onOpenModal={
                  identity.category === "programas"
                    ? (id) => setModalIdentity(id)
                    : undefined
                }
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

      <RevealFooter
        text="AS IDENTIDADES DA CAZÉTV NASCEM PARA DAR FORMA, VOZ E ENERGIA A CADA PROGRAMA, CAMPEONATO E PROJETO ESPECIAL. ESTE ESPAÇO REÚNE OS SISTEMAS VISUAIS QUE CONSTRUÍMOS AO LONGO DO TEMPO: LOGOS, CORES, TIPOGRAFIAS, GRAFISMOS, ASSETS E REGRAS DE USO. PARA MANTER NOSSA MARCA VIVA, CONSISTENTE E DINÂMICA."
      />

      <IdentityModal
        identity={modalIdentity ?? { slug: "", name: "", category: "programas" }}
        open={!!modalIdentity}
        onClose={() => setModalIdentity(null)}
      />

    </div>
  );
}
