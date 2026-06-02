import { useEffect, useState } from "react";

// Coleta as URLs de todas as mídias importáveis do projeto para pré-carregar
const assetUrls = Object.values(
  import.meta.glob("/src/assets/**/*.{png,jpg,jpeg,gif,webp,svg}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
) as string[];

const MIN_DURATION = 1400; // duração mínima para a animação não piscar
const SESSION_KEY = "cazetv:loaded";

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem(SESSION_KEY);
  });

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    const start = performance.now();
    const total = assetUrls.length || 1;
    let loaded = 0;

    const updateProgress = () => {
      const realRatio = loaded / total;
      const elapsedRatio = Math.min(1, (performance.now() - start) / MIN_DURATION);
      // progresso = o menor entre o real (assets) e o tempo decorrido,
      // garantindo barra fluida e suave
      const p = Math.min(realRatio, elapsedRatio);
      setProgress(p);
    };

    // tick visual contínuo
    let raf = 0;
    const tick = () => {
      if (cancelled) return;
      updateProgress();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // pré-carregamento real
    Promise.all(
      assetUrls.map((url) =>
        preloadImage(url).then(() => {
          loaded += 1;
        }),
      ),
    ).then(async () => {
      // aguarda duração mínima
      const remaining = MIN_DURATION - (performance.now() - start);
      if (remaining > 0) {
        await new Promise((r) => setTimeout(r, remaining));
      }
      if (cancelled) return;
      setProgress(1);
      cancelAnimationFrame(raf);
      // pequena pausa para a barra "fechar" antes de subir
      setTimeout(() => {
        if (cancelled) return;
        setLeaving(true);
        // remove do DOM após a transição
        setTimeout(() => {
          if (cancelled) return;
          sessionStorage.setItem(SESSION_KEY, "1");
          setMounted(false);
        }, 900);
      }, 250);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={leaving}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-background text-foreground"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 900ms cubic-bezier(0.77, 0, 0.175, 1)",
        willChange: "transform",
      }}
    >
      {/* Barra de progresso no topo */}
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-foreground/10">
        <div
          className="h-full bg-foreground"
          style={{
            width: `${progress * 100}%`,
            transition: "width 120ms linear",
          }}
        />
      </div>

      {/* Título centralizado, bem pequeno */}
      <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-foreground/80">
        BRANDING CAZÉTV
      </span>
    </div>
  );
}
