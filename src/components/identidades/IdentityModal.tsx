import { useEffect } from "react";
import { X, Download } from "lucide-react";
import type { Identity } from "@/data/identities";
import umDiaComSlide1 from "@/assets/um-dia-com/slide-1.gif";

const SLIDE_MEDIA: Record<string, Record<number, string>> = {
  "um-dia-com": { 1: umDiaComSlide1 },
};

interface Props {
  identity: Identity;
  open: boolean;
  onClose: () => void;
}

const assets = [
  { label: "LOGO", href: "#" },
  { label: "ASSETS", href: "#" },
  { label: "TIPOGRAFIA", href: "#" },
  { label: "KIT COMPLETO", href: "#" },
];

export function IdentityModal({ identity, open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const slides = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Projeto ${identity.name}`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
            Identidade
          </span>
          <span className="text-lg font-bold uppercase tracking-wide text-white">
            {identity.name}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Scrollable slides */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 pt-4 md:px-10">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6">
          {slides.map((n) => {
            const media = SLIDE_MEDIA[identity.slug]?.[n];
            return (
              <div
                key={n}
                className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01]"
              >
                {media ? (
                  <img
                    src={media}
                    alt={`${identity.name} slide ${n}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">
                    {identity.name} — slide {n}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating download menu */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center px-4">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/15 bg-black/70 p-1.5 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
          {assets.map((a) => (
            <a
              key={a.label}
              href={a.href}
              download
              className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/80 transition hover:bg-white hover:text-black"
            >
              <Download className="size-3" />
              {a.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
