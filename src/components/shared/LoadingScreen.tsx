import { useEffect, useState } from "react";

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

const assetUrls = Array.from(new Set([...srcAssetUrls, ...publicAssetUrls]));

const MIN_DURATION = 600; // piso visual mínimo para evitar flash em loads instantâneos
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
    const total = assetUrls.length || 1;
    let loaded = 0;

    // Atualiza o progresso real conforme cada asset termina de baixar
    const promises = assetUrls.map((url) =>
      preloadAsset(url).then(() => {
        if (cancelled) return;
        loaded += 1;
        setProgress(loaded / total);
      }),
    );

    Promise.all(promises).then(async () => {
      if (cancelled) return;
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
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={leaving}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-white text-black"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 900ms cubic-bezier(0.77, 0, 0.175, 1)",
        willChange: "transform",
      }}
    >
      {/* Barra de progresso no topo */}
      <div className="absolute left-0 right-0 top-0 h-[4px] bg-black/20">
        <div
          className="h-full bg-black"
          style={{
            width: `${progress * 100}%`,
            transition: "width 200ms ease-out",
          }}
        />
      </div>

      {/* Título centralizado */}
      <span
        className="font-black uppercase tracking-[0.25em] text-black"
        style={{ fontSize: "clamp(20px, 4vw, 48px)" }}
      >
        BRANDING CAZÉTV
      </span>
    </div>
  );
}
