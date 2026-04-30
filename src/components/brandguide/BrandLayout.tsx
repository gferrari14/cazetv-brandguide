import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import navLogo from "@/assets/cazetv-logo-nav.png";

const navLinks = [
  { path: "/logo", label: "LOGO" },
  { path: "/cores", label: "CORES" },
  { path: "/fontes", label: "FONTES" },
  { path: "/assets", label: "ASSETS" },
  { path: "/gradiente", label: "GRADIENTE" },
] as const;

export function BrandLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!isHome && (
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
          <div className="brand-container flex h-16 items-center justify-between">
            <Link to="/" className="logo-gradient-hover group relative flex items-center" aria-label="Brandguide CazéTV">
              <img src={navLogo} alt="CazéTV" className="logo-base h-7 w-auto md:h-8" />
              <span
                aria-hidden="true"
                className="logo-overlay pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ WebkitMaskImage: `url(${navLogo})`, maskImage: `url(${navLogo})` }}
              />
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`gradient-hover border border-transparent px-4 py-2 text-xs font-bold uppercase transition-colors ${
                    location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex size-10 items-center justify-center border border-border text-foreground transition-colors hover:bg-secondary md:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Abrir menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="border-t border-border bg-background md:hidden">
              <div className="brand-container py-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3 text-sm font-bold uppercase transition-colors hover:text-primary ${
                      location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      )}

      <main className={!isHome ? "pt-16" : undefined}>{children}</main>

      {!isHome && (
        <footer className="border-t border-border py-6">
          <div className="brand-container flex flex-col gap-2 text-xs uppercase text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>Brandguide CazéTV</span>
            <span>Todos os direitos reservados · CazéTV 2026</span>
          </div>
        </footer>
      )}
    </div>
  );
}
