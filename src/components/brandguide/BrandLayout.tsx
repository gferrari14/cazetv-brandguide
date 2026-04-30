import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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
            <Link to="/" className="text-sm font-bold uppercase tracking-normal text-foreground">
              Brandguide CazéTV
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-xs font-bold uppercase transition-colors hover:text-primary ${
                    location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
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
            <span>Base limpa para evolução visual.</span>
          </div>
        </footer>
      )}
    </div>
  );
}
