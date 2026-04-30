import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import JSZip from "jszip";

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
