interface DownloadButtonProps {
  href: string;
  filename?: string;
  label?: string;
  className?: string;
}

// SVG do ícone "download" do Lucide, codificado como data URI para usar como mask.
const DOWNLOAD_ICON_MASK =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/><polyline points='7 10 12 15 17 10'/><line x1='12' y1='15' x2='12' y2='3'/></svg>\")";

export function DownloadButton({ href, filename, label = "DOWNLOAD", className = "" }: DownloadButtonProps) {
  return (
    <a
      href={href}
      download={filename ?? true}
      className={`gradient-hover group relative inline-flex items-center gap-2 overflow-hidden border border-border bg-background px-4 py-2 text-xs font-bold uppercase tracking-wide text-foreground transition-colors ${className}`}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        <span
          aria-hidden="true"
          className="gradient-hover-icon size-3.5"
          style={{ ["--icon-mask" as string]: DOWNLOAD_ICON_MASK }}
        />
        {label}
      </span>
    </a>
  );
}
