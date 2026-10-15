import { useMemo, useState } from "react";
import JSZip from "jszip";
import { Loader2 } from "lucide-react";

const DOWNLOAD_ICON_MASK =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/><polyline points='7 10 12 15 17 10'/><line x1='12' y1='15' x2='12' y2='3'/></svg>\")";

const modules = import.meta.glob("@/assets/cazetv-assets/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type AssetVariant = "white" | "black";

function tint(source: string, variant: AssetVariant) {
  const color = variant === "white" ? "#fff" : "#000";
  return source
    .replace(/#fff(fff)?/gi, color)
    .replace(/#000(000)?/gi, color)
    .replace(/fill:\s*[^;}"']+/gi, `fill: ${color}`)
    .replace(/fill="(?!none)[^"]*"/gi, `fill="${color}"`);
}

const assets = Object.entries(modules)
  .map(([path, source]) => {
    const name = path.split("/").pop()!.replace(".svg", "");
    const index = Number(name.replace(/\D/g, "")) || 0;
    return { name, index, source, label: `ATIVO ${String(index).padStart(2, "0")}` };
  })
  .sort((a, b) => a.index - b.index);

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function svgToPngBlob(source: string, maxSize = 1024): Promise<Blob> {
  const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("svg load error"));
      img.src = url;
    });
    const w = img.naturalWidth || 100;
    const h = img.naturalHeight || 100;
    const scale = maxSize / Math.max(w, h);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => resolve(b!), "image/png"),
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}

function AssetCard({
  label,
  name,
  source,
  variant,
}: {
  label: string;
  name: string;
  source: string;
  variant: AssetVariant;
}) {
  const [busy, setBusy] = useState(false);
  const markup = useMemo(() => tint(source, variant), [source, variant]);

  const downloadSvg = () => {
    triggerDownload(
      new Blob([markup], { type: "image/svg+xml;charset=utf-8" }),
      `cazetv-${name.toLowerCase()}-${variant}.svg`,
    );
  };

  const downloadPng = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const blob = await svgToPngBlob(markup);
      triggerDownload(blob, `cazetv-${name.toLowerCase()}-${variant}.png`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 border border-border/40 p-4">
      <div
        className="flex h-16 w-full items-center justify-center [&_svg]:max-h-16 [&_svg]:max-w-[70%]"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
      <p
        className={`text-center text-[10px] font-bold uppercase tracking-wide ${
          variant === "white" ? "text-muted-foreground" : "text-black/50"
        }`}
      >
        {label}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={downloadSvg}
          className={`inline-flex items-center gap-1 border px-2 py-1 text-[10px] font-bold uppercase transition-opacity hover:opacity-60 ${
            variant === "white" ? "border-white/30 text-white" : "border-black/30 text-black"
          }`}
        >
          SVG
        </button>
        <button
          type="button"
          onClick={downloadPng}
          className={`inline-flex items-center gap-1 border px-2 py-1 text-[10px] font-bold uppercase transition-opacity hover:opacity-60 ${
            variant === "white" ? "border-white/30 text-white" : "border-black/30 text-black"
          }`}
        >
          {busy ? <Loader2 className="size-3 animate-spin" /> : "PNG"}
        </button>
      </div>
    </div>
  );
}

export function CazetvAssetsGrid() {
  const [variant, setVariant] = useState<AssetVariant>("white");
  const [zipping, setZipping] = useState(false);

  const downloadAll = async () => {
    if (zipping) return;
    setZipping(true);
    try {
      const zip = new JSZip();
      for (const v of ["white", "black"] as AssetVariant[]) {
        const svgFolder = zip.folder(`${v.toUpperCase()}/SVG`)!;
        const pngFolder = zip.folder(`${v.toUpperCase()}/PNG`)!;
        for (const asset of assets) {
          const markup = tint(asset.source, v);
          svgFolder.file(`cazetv-${asset.name.toLowerCase()}-${v}.svg`, markup);
          const png = await svgToPngBlob(markup);
          pngFolder.file(`cazetv-${asset.name.toLowerCase()}-${v}.png`, png);
        }
      }
      const blob = await zip.generateAsync({ type: "blob" });
      triggerDownload(blob, "cazetv-assets.zip");
    } finally {
      setZipping(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex border border-border">
          {(["white", "black"] as AssetVariant[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wide ${
                variant === v
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v === "white" ? "VERSÃO BRANCA" : "VERSÃO PRETA"}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={downloadAll}
          disabled={zipping}
          className="gradient-hover inline-flex items-center gap-2 border border-foreground bg-background px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-foreground disabled:opacity-60"
        >
          <span className="inline-flex items-center gap-2">
            {zipping ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <span
                aria-hidden="true"
                className="gradient-hover-icon size-3"
                style={{ ["--icon-mask" as string]: DOWNLOAD_ICON_MASK }}
              />
            )}
            {zipping ? "GERANDO ZIP..." : "BAIXAR TODOS"}
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden border border-border p-4 md:p-6 ${
          variant === "white" ? "bg-black" : "bg-white"
        }`}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
          {assets.map((asset) => (
            <AssetCard
              key={asset.name}
              label={asset.label}
              name={asset.name}
              source={asset.source}
              variant={variant}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
