import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import footerLogo from "@/assets/cazetv-logo-footer.png";

const REVEAL_DISTANCE = 600;

interface RevealFooterProps {
  text?: string;
}

export function RevealFooter({
  text = "AS IDENTIDADES DA CAZÉTV NASCEM PARA DAR FORMA, VOZ E ENERGIA A CADA PROGRAMA, CAMPEONATO E PROJETO ESPECIAL.\n\nESTE ESPAÇO REÚNE OS SISTEMAS VISUAIS QUE CONSTRUÍMOS AO LONGO DO TEMPO: LOGOS, CORES, TIPOGRAFIAS, GRAFISMOS, ASSETS E REGRAS DE USO. PARA MANTER NOSSA MARCA VIVA, CONSISTENTE E DINÂMICA.",
}: RevealFooterProps) {
  const paragraphs = text.split(/\n\n+/);
  const [footerProgress, setFooterProgress] = useState(0);
  const gradientRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const distanceFromBottom = max - scrolled;
      const p = Math.max(0, Math.min(1, 1 - distanceFromBottom / REVEAL_DISTANCE));
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

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const driftX = Math.sin(t * 0.25) * 12;
      const m = mousePos.current;
      const mx = m ? m.x : 50 + driftX;
      const my = 100;
      const cursorLift = m ? Math.max(0, (100 - m.y) / 100) : 0;
      const targetScale = 1 + cursorLift * 1.4;
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

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mousePos.current = {
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    };
  };
  const onMouseLeave = () => { mousePos.current = null; };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <div style={{ height: REVEAL_DISTANCE }} aria-hidden />
      <footer
        className="fixed inset-x-0 bottom-0 z-50 flex h-auto min-h-[55vh] flex-col justify-between overflow-hidden bg-white text-black"
        style={{
          transform: `translateY(${(1 - footerProgress) * 100}%)`,
          transition: "transform 80ms linear",
          willChange: "transform",
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative z-10 flex h-full w-full flex-col px-3 pb-0 pt-8 md:px-4">
          <button
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            className="self-start border border-black/20 p-3 transition hover:bg-black hover:text-white"
          >
            <ArrowUp className="size-5" />
          </button>

          <div className="flex flex-1 flex-col justify-center py-10">
            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="max-w-5xl text-sm font-normal leading-relaxed text-black md:text-base lg:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="relative mt-auto">
            <img src={footerLogo} alt="CazéTV" className="mb-3 h-10 w-auto md:h-12" />
            <div className="h-0.5 w-full bg-black" />
            <div className="flex flex-col items-start justify-between gap-1 py-2 text-xs uppercase tracking-widest text-black/60 md:flex-row md:items-center">
              <span>© CazéTV 2026</span>
              <span>Todos os direitos reservados</span>
            </div>
          </div>
        </div>



        <div
          ref={gradientRef}
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-16 -right-16 z-0 h-[60%]"
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
    </>
  );
}
