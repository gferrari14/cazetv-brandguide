import { useEffect } from "react";
import { X, Download } from "lucide-react";
import JSZip from "jszip";
import type { Identity } from "@/data/identities";
import umDiaComSlide1 from "@/assets/um-dia-com/slide-1.gif";
import umDiaComSlide2 from "@/assets/um-dia-com/slide-1-chico-belt.png";
import umDiaComSlide3 from "@/assets/um-dia-com/slide-2-paleta.png";
import umDiaComSlide4 from "@/assets/um-dia-com/slide-3-fontes.png";
import umDiaComSlide5 from "@/assets/um-dia-com/slide-4-logo.gif";
import umDiaComSlide6 from "@/assets/um-dia-com/slide-assets.png";
import umDiaComSlide7 from "@/assets/um-dia-com/slide-5-insert.gif";
import umDiaComSlide8 from "@/assets/um-dia-com/slide-6-cidade.png";
import umDiaComSlide9 from "@/assets/um-dia-com/slide-7-prox-ep.gif";
import umDiaComSlide10 from "@/assets/um-dia-com/slide-8-logo-jp.png";

const SLIDE_MEDIA: Record<string, Record<number, string>> = {
  "um-dia-com": {
    1: umDiaComSlide1,
    2: umDiaComSlide2,
    3: umDiaComSlide3,
    4: umDiaComSlide4,
    5: umDiaComSlide5,
    6: umDiaComSlide6,
    7: umDiaComSlide7,
    8: umDiaComSlide8,
    9: umDiaComSlide9,
    10: umDiaComSlide10,
  },
};

// Slides que devem preservar a proporção original (sem cortar)
const PRESERVE_RATIO: Record<string, Set<number>> = {
  "um-dia-com": new Set([2, 3, 4, 5, 6, 7, 8, 9, 10]),
};

// Slides que não são 16:9 — renderizam no tamanho natural, sem caixa
const NATURAL_SIZE: Record<string, Set<number>> = {
  "um-dia-com": new Set([5, 7]),
};

interface Props {
  identity: Identity;
  open: boolean;
  onClose: () => void;
}

type AssetItem = {
  label: string;
  href?: string;
  external?: boolean;
  onClick?: () => void | Promise<void>;
};

async function downloadFile(url: string, filename: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(objectUrl);
}

async function downloadZip(
  files: { url: string; path: string }[],
  zipName: string,
) {
  const zip = new JSZip();
  await Promise.all(
    files.map(async (f) => {
      const res = await fetch(f.url);
      const blob = await res.blob();
      zip.file(f.path, blob);
    }),
  );
  const blob = await zip.generateAsync({ type: "blob" });
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = zipName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(objectUrl);
}

const ASSETS_BY_IDENTITY: Record<string, AssetItem[]> = {
  "um-dia-com": [
    {
      label: "LOGO",
      onClick: () =>
        downloadZip(
          [
            {
              url: "/identidades/um-dia-com/LOGO_FUNDO_CLARO.png",
              path: "LOGO_FUNDO_CLARO.png",
            },
            {
              url: "/identidades/um-dia-com/LOGO_FUNDO_ESCURO.png",
              path: "LOGO_FUNDO_ESCURO.png",
            },
          ],
          "UM-DIA-COM-LOGOS.zip",
        ),
    },
    { label: "ASSETS", href: "#" },
    {
      label: "FONTES",
      onClick: () =>
        downloadFile(
          "/identidades/um-dia-com/RoyaleCouture-Sans.otf",
          "RoyaleCouture-Sans.otf",
        ),
    },
    { label: "KIT COMPLETO", href: "#" },
    { label: "GUIDE", href: "#", external: true },
  ],
};

const DEFAULT_ASSETS: AssetItem[] = [
  { label: "LOGO", href: "#" },
    {
      label: "ASSETS",
      onClick: () =>
        downloadFile("/identidades/um-dia-com/ASSETS.zip", "UM-DIA-COM-ASSETS.zip"),
    },
  { label: "TIPOGRAFIA", href: "#" },
  { label: "KIT COMPLETO", href: "#" },
  { label: "GUIDE", href: "#", external: true },
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

  const mediaForIdentity = SLIDE_MEDIA[identity.slug];
  const slideCount = mediaForIdentity ? Object.keys(mediaForIdentity).length : 6;
  const slides = Array.from({ length: slideCount }, (_, i) => i + 1);

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
          className="flex size-10 items-center justify-center border-2 border-white/30 text-white transition hover:bg-white hover:text-black"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Scrollable slides */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 pt-4 md:px-10">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6">
          {slides.map((n) => {
            const media = SLIDE_MEDIA[identity.slug]?.[n];
            const preserve = PRESERVE_RATIO[identity.slug]?.has(n);
            const natural = NATURAL_SIZE[identity.slug]?.has(n);

            if (natural && media) {
              return (
                <img
                  key={n}
                  src={media}
                  alt={`${identity.name} slide ${n}`}
                  className="block h-auto w-full"
                />
              );
            }

            return (
              <div
                key={n}
                className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden border-2 border-white/20 bg-gradient-to-br from-white/[0.06] to-white/[0.01]"
              >
                {media ? (
                  <img
                    src={media}
                    alt={`${identity.name} slide ${n}`}
                    className={`h-full w-full ${preserve ? "object-contain" : "object-cover"}`}
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
        <div className="pointer-events-auto flex items-center gap-1 border-2 border-white/25 bg-black/70 p-1.5 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
          {(ASSETS_BY_IDENTITY[identity.slug] ?? DEFAULT_ASSETS).map((a) => {
            const className =
              "group inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/80 transition hover:bg-white hover:text-black";
            if (a.onClick) {
              return (
                <button
                  key={a.label}
                  type="button"
                  onClick={() => void a.onClick?.()}
                  className={className}
                >
                  <Download className="size-3" />
                  {a.label}
                </button>
              );
            }
            return (
              <a
                key={a.label}
                href={a.href}
                {...(a.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : { download: true })}
                className={className}
              >
                <Download className="size-3" />
                {a.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
