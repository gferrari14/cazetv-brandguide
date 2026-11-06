import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { CustomCursor } from "@/components/identidades/CustomCursor";
import { AnimatedBackground } from "@/components/shared/AnimatedBackground";
import { supabase } from "@/integrations/supabase/client";
import { siteBackground, siteFonts } from "@/lib/site-media";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CAZÉTV BRANDGUIDE" },
      { name: "description", content: "CazéTV Brandguide Reimagined is a digital brand guide for CazéTV." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "CAZÉTV BRANDGUIDE" },
      { property: "og:description", content: "CazéTV Brandguide Reimagined is a digital brand guide for CazéTV." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "CAZÉTV BRANDGUIDE" },
      { name: "twitter:description", content: "CazéTV Brandguide Reimagined is a digital brand guide for CazéTV." },
    ],
    links: [
      { rel: "preload", as: "image", href: siteBackground.url },
      ...siteFonts.map((font) => ({ rel: "preload", as: "font", href: font.asset.url, type: font.asset.content_type, crossOrigin: "anonymous" as const })),
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "256x256", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const router = useRouter();
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      void router.invalidate();
    });
    return () => data.subscription.unsubscribe();
  }, [router]);
  return (
    <>
      <AnimatedBackground />
      <CustomCursor />
      <Outlet />
    </>
  );
}
