import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { lovable } from "@/integrations/lovable/index";
import { ALLOWED_EMAIL_DOMAINS, safeRedirectPath } from "@/lib/site-access";
import { getSiteAccess, signOutOfSite } from "@/lib/site-session";

type AuthSearch = { redirect?: string; erro?: string };

const REDIRECT_KEY = "cazetv:after-login";

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): AuthSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
    erro: typeof search.erro === "string" ? search.erro : undefined,
  }),
  beforeLoad: async ({ search }) => {
    const access = await getSiteAccess();
    if (access.status === "member") {
      const stored = typeof window !== "undefined" ? sessionStorage.getItem(REDIRECT_KEY) : null;
      if (typeof window !== "undefined") sessionStorage.removeItem(REDIRECT_KEY);
      throw redirect({ href: safeRedirectPath(search.redirect ?? stored) });
    }
    if (access.status === "not-member") {
      await signOutOfSite();
      return { refused: true };
    }
    return { refused: false };
  },
  head: () => ({
    meta: [
      { title: "Entrar — Branding CazéTV" },
      { name: "description", content: "Acesso ao guia de marca da CazéTV com a conta Google da empresa." },
      { property: "og:title", content: "Entrar — Branding CazéTV" },
      { property: "og:description", content: "Acesso ao guia de marca da CazéTV com a conta Google da empresa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const GOOGLE_LOGO = (
  <svg aria-hidden="true" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
);

function AuthPage() {
  const search = Route.useSearch();
  const { refused } = Route.useRouteContext();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const domain = ALLOWED_EMAIL_DOMAINS[0];
  const domainRefused = refused || search.erro === "dominio";

  const signIn = async () => {
    setBusy(true);
    setError(null);
    sessionStorage.setItem(REDIRECT_KEY, safeRedirectPath(search.redirect));
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/auth`,
      extraParams: { hd: domain, prompt: "select_account" },
    });
    if (result.error) {
      setError("NÃO FOI POSSÍVEL ENTRAR COM O GOOGLE. TENTE NOVAMENTE.");
      setBusy(false);
      return;
    }
    // Com sessão definida, a troca de estado de login reavalia esta página e redireciona.
  };

  return (
    <main className="relative flex min-h-screen w-screen flex-col overflow-hidden text-foreground">
      <h1 className="sr-only">Entrar — Branding CazéTV</h1>
      <section className="flex flex-1 items-center justify-center px-3 py-24 md:px-4">
        <div className="w-full max-w-sm space-y-5">
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">ACESSO RESTRITO</p>
            <p className="text-[13px] uppercase leading-relaxed text-foreground">
              FAÇA LOGIN COM A SUA CONTA GOOGLE DA EMPRESA PARA ACESSAR A ÁREA DE BRANDING DA CAZÉTV.
            </p>
          </div>

          <button type="button" onClick={signIn} disabled={busy} className="google-button">
            {GOOGLE_LOGO}
            <span>{busy ? "Entrando…" : "Continuar com o Google"}</span>
          </button>

          {(error || domainRefused) && (
            <p role="alert" className="border-l-2 border-foreground pl-3 text-[11px] uppercase leading-relaxed text-foreground">
              {error ?? `ESSA CONTA NÃO TEM ACESSO. USE UM E-MAIL @${domain.toUpperCase()}.`}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
