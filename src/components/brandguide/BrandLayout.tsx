import { Link, useLocation } from "@tanstack/react-router";
import { siteLogos } from "@/lib/site-media";
import { RevealFooter } from "@/components/shared/RevealFooter";

const navLinks = [
  { path: "/atributos", label: "ATRIBUTOS" },
  { path: "/logo", label: "LOGO" },
  { path: "/cores", label: "CORES" },
  { path: "/fontes", label: "FONTES" },
  { path: "/assets", label: "ASSETS" },
  { path: "/background", label: "BACKGROUND" },
  { path: "/gradiente", label: "GRADIENTE" },
] as const;

export function BrandLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-transparent text-foreground">
      {/* Logo top-left */}
      <header className="fixed left-3 top-4 z-40 md:left-4">
        <Link to="/" aria-label="Início">
          <img src={siteLogos.white} alt="CazéTV" className="h-10 w-auto md:h-12" />
        </Link>
      </header>

      <main className="pb-32 pt-20">{children}</main>

      {/* Bottom nav — fixed, centered-left */}
      <nav className="fixed bottom-4 left-3 z-40 flex flex-row flex-wrap gap-2 md:left-4">
        {navLinks.map((link) => {
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`inline-flex w-fit items-center border-2 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                active
                  ? "border-white bg-white text-black"
                  : "border-white/80 bg-black/60 text-white backdrop-blur-xl hover:bg-white hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <RevealFooter text={"ESTE É O BRANDGUIDE DA CAZÉTV: O LUGAR ONDE REUNIMOS TUDO QUE AJUDA A DAR CARA, VOZ E PERSONALIDADE PARA A NOSSA MARCA.\n\nAQUI VOCÊ ENCONTRA OS ELEMENTOS QUE FAZEM PARTE DO NOSSO UNIVERSO VISUAL: LOGOS, CORES, GRAFISMOS, TIPOGRAFIAS E OUTRAS REFERÊNCIAS. JUNTO COM ORIENTAÇÕES PARA USAR TUDO DO JEITO CERTO. A IDEIA É SIMPLES: FACILITAR A VIDA DE QUEM CRIA COM A GENTE E GARANTIR QUE A CAZÉTV CONTINUE SENDO RECONHECIDA EM QUALQUER LUGAR, SEM PERDER O NOSSO JEITO, NOSSA ENERGIA E AQUILO EM QUE ACREDITAMOS."} />
    </div>
  );
}
