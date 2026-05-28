import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import navLogo from "@/assets/cazetv-logo-nav.png";
import { identities } from "@/data/identities";

export const Route = createFileRoute("/identidades/$slug")({
  loader: ({ params }) => {
    const identity = identities.find((i) => i.slug === params.slug);
    if (!identity) throw notFound();
    return { identity };
  },
  component: IdentityPage,
});

function IdentityPage() {
  const { identity } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between px-3 py-4 md:px-4">
        <Link to="/" className="flex items-center gap-3" aria-label="Início">
          <img src={navLogo} alt="CazéTV" className="h-10 w-auto md:h-12" />
        </Link>
        <Link
          to="/identidades"
          className="inline-flex items-center gap-2 border-2 border-white/80 bg-transparent px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
        >
          <ArrowLeft className="size-3" />
          <span>Voltar</span>
        </Link>
      </header>

      <main className="brand-container flex min-h-[80vh] flex-col items-center justify-center text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/50">
          Identidade
        </p>
        <h1 className="text-5xl font-bold uppercase leading-none md:text-7xl">
          {identity.name}
        </h1>
        <p className="mt-8 text-sm uppercase tracking-widest text-white/40">
          Em breve
        </p>
      </main>
    </div>
  );
}
