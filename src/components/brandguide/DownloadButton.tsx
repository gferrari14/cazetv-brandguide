import { Download } from "lucide-react";

interface DownloadButtonProps {
  href: string;
  filename?: string;
  label?: string;
  className?: string;
}

export function DownloadButton({ href, filename, label = "DOWNLOAD", className = "" }: DownloadButtonProps) {
  return (
    <a
      href={href}
      download={filename ?? true}
      className={`gradient-hover group relative inline-flex items-center gap-2 overflow-hidden border border-border bg-background px-4 py-2 text-xs font-bold uppercase tracking-wide text-foreground transition-colors ${className}`}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        <Download className="size-3.5" />
        {label}
      </span>
    </a>
  );
}
