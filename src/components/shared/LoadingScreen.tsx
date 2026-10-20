import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { siteBackground, siteFonts } from "@/lib/site-media";
import { supabase } from "@/integrations/supabase/client";

// Coleta as URLs de todas as mídias importáveis do projeto para pré-carregar
const srcAssetUrls = Object.values(
  import.meta.glob(
    "/src/assets/**/*.{png,jpg,jpeg,gif,webp,avif,svg,mp4,webm,mov,mp3,ogg,wav,woff,woff2,ttf,otf}",
    {
      eager: true,
      query: "?url",
      import: "default",
    },
  ),
) as string[];

// Mídias servidas a partir de /public — também são pré-carregadas aqui para
// que não haja delay de aparição depois que a tela de loading sai.
const publicAssetUrls: string[] = [
  "/videos/hero-bg.mp4",
  "/favicon.png",
  "/cursors/default-28.png",
  "/cursors/default-40.png",
  "/cursors/default-56.png",
  "/cursors/default-filled-72.png",
  "/cursors/finger-cursor-64.svg",
  "/cursors/finger-cursor.svg",
  "/cursors/pointer-32.png",
  "/cursors/pointer-48.png",
  "/cursors/pointer-64.png",
  "/cursors/pointer-filled-88.png",
  "/cursors/pointer.svg",
  "/fonts/GILROY-BLACK.TTF",
  "/fonts/GILROY-BOLD.TTF",
  "/fonts/GILROY-REGULAR.TTF",
  "/fonts/TUSKERGROTESK-3500MEDIUM.OTF",
  "/fonts/TUSKERGROTESK-3500MEDIUM.TTF",
  "/fonts/TUSKERGROTESK-4600SEMIBOLD.OTF",
  "/fonts/TUSKERGROTESK-4600SEMIBOLD.TTF",
  "/identidades/um-dia-com/LOGO_FUNDO_CLARO.png",
  "/identidades/um-dia-com/LOGO_FUNDO_ESCURO.png",
  "/identidades/um-dia-com/RoyaleCouture-Sans.otf",
  "/identidades/um-dia-com/slides/slide-1.gif",
  "/identidades/um-dia-com/slides/slide-1-chico-belt.png",
  "/identidades/um-dia-com/slides/slide-2-paleta.png",
  "/identidades/um-dia-com/slides/slide-3-fontes.png",
  "/identidades/um-dia-com/slides/slide-4-logo.gif",
  "/identidades/um-dia-com/slides/slide-assets.png",
  "/identidades/um-dia-com/slides/slide-5-insert.gif",
  "/identidades/um-dia-com/slides/slide-6-cidade.png",
  "/identidades/um-dia-com/slides/slide-7-prox-ep.gif",
  "/identidades/um-dia-com/slides/slide-8-logo-jp.png",
];

const pointerAssets = Object.values(import.meta.glob<{ url: string }>("/src/assets/**/*.asset.json", { eager: true, import: "default" })).map((asset) => asset.url);
const assetUrls = Array.from(new Set([...srcAssetUrls, ...publicAssetUrls.filter((url) => !url.startsWith("/fonts/")), ...pointerAssets, siteBackground.url]));

const MIN_DURATION = 600; // piso visual mínimo para evitar flash em loads instantâneos
const MAX_DURATION = 15000; // evita bloquear a abertura caso alguma mídia demore ou não responda
// Todas as páginas do site: código e dados são pré-carregados durante o loading
const SITE_ROUTES = ["/", "/identidades", "/atributos", "/logo", "/cores", "/fontes", "/assets", "/background", "/gradiente", "/duvidas", "/brandguide"];
const SESSION_KEY = "cazetv:loaded";

// Baixa de fato o asset (qualquer tipo de mídia) e o coloca no cache do browser.
// Usamos fetch em vez de new Image() para que vídeos, fontes e áudios também sejam baixados.
function preloadAsset(src: string): Promise<void> {
  return fetch(src, { cache: "force-cache" })
    .then((r) => r.blob())
    .then(() => undefined)
    .catch(() => undefined);
}

export function LoadingScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  // mount apenas no cliente para evitar mismatch de SSR
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sessionStorage.getItem(SESSION_KEY)) setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    const start = performance.now();

    const run = async () => {
      // Imagens das apresentações e capas salvas no banco
      const remoteUrls: string[] = [];
      try {
        const [blocks, covers] = await Promise.all([
          supabase.from("identity_blocks").select("image_url"),
          supabase.from("identity_covers").select("image_url"),
        ]);
        for (const row of [...(blocks.data ?? []), ...(covers.data ?? [])]) {
          if (row.image_url) remoteUrls.push(row.image_url);
        }
      } catch {
        /* segue sem as imagens remotas */
      }
      const urls = Array.from(new Set([...assetUrls, ...remoteUrls]));
      const routeTasks = SITE_ROUTES.map((to) =>
        router.preloadRoute({ to } as never).catch(() => undefined),
      );
      const total = urls.length + routeTasks.length || 1;
      let loaded = 0;
      const tick = () => {
        if (cancelled) return;
        loaded += 1;
        setProgress(loaded / total);
      };
      await Promise.all([
        ...urls.map((url) => preloadAsset(url).then(tick)),
        ...routeTasks.map((p) => p.then(tick)),
      ]);
    };

    Promise.race([
      run(),
      new Promise<void>((resolve) => setTimeout(resolve, MAX_DURATION)),
    ]).then(async () => {
      if (cancelled) return;
      await Promise.all(siteFonts.map((font) => document.fonts.load(`700 16px "${font.family}"`)));
      // Garante o piso de duração mínima apenas se o load real for mais rápido
      const remaining = MIN_DURATION - (performance.now() - start);
      if (remaining > 0) {
        await new Promise((r) => setTimeout(r, remaining));
      }
      if (cancelled) return;
      setProgress(1);
      // pequena pausa para a barra "fechar" antes de subir
      setTimeout(() => {
        if (cancelled) return;
        setLeaving(true);
        setTimeout(() => {
          if (cancelled) return;
          sessionStorage.setItem(SESSION_KEY, "1");
          setMounted(false);
        }, 900);
      }, 250);
    });

    return () => {
      cancelled = true;
    };
  }, [mounted, router]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={leaving}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-primary text-primary-foreground"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 900ms cubic-bezier(0.77, 0, 0.175, 1)",
        willChange: "transform",
      }}
    >
      {/* Barra de progresso no topo */}
      <div className="absolute left-0 right-0 top-0 h-[4px] bg-primary-foreground/20">
        <div
          className="h-full bg-primary-foreground"
          style={{
            width: `${progress * 100}%`,
            transition: "width 200ms ease-out",
          }}
        />
      </div>

      {/* Título centralizado */}
      <span
        className="font-display-wide text-3xl font-bold uppercase text-primary-foreground animate-pulse-slow"
      >
        BRANDING CAZÉTV
      </span>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
