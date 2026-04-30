import { Loader2 } from "lucide-react";
import { useState } from "react";
import JSZip from "jszip";

const DOWNLOAD_ICON_MASK =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/><polyline points='7 10 12 15 17 10'/><line x1='12' y1='15' x2='12' y2='3'/></svg>\")";

export interface ZipFileSpec {
  /** URL pública do arquivo (ex.: /fonts/GILROY-BOLD.TTF) ou data URL */
  url: string;
  /** Caminho dentro do zip (ex.: "GILROY/GILROY-BOLD.TTF") */
  path: string;
}

interface DownloadAllButtonProps {
  files: ZipFileSpec[];
  zipName: string;
  label?: string;
  className?: string;
}

export function DownloadAllButton({
  files,
  zipName,
  label = "DOWNLOAD DA PÁGINA",
  className = "",
}: DownloadAllButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const zip = new JSZip();
      await Promise.all(
        files.map(async (f) => {
          const res = await fetch(f.url);
          const blob = await res.blob();
          zip.file(f.path, blob);
        }),
      );
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = zipName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("[DownloadAllButton] erro ao gerar zip", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`gradient-hover inline-flex items-center gap-2 border border-foreground bg-background px-5 py-3 text-xs font-bold uppercase tracking-wide text-foreground disabled:opacity-60 ${className}`}
    >
      <span className="inline-flex items-center gap-2">
        {loading ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
        {loading ? "GERANDO ZIP..." : label}
      </span>
    </button>
  );
}
