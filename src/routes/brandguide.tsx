import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/brandguide")({
  head: () => ({ meta: [
    {"title": "Brandguide — CazéTV Brandguide"},
    {"name": "description", "content": "Guia oficial de identidade visual da CazéTV."},
    {"property": "og:title", "content": "Brandguide — CazéTV Brandguide"},
    {"property": "og:description", "content": "Guia oficial de identidade visual da CazéTV."},
    {"property": "og:type", "content": "website"},
    {"name": "twitter:card", "content": "summary"},
  ] }),
  beforeLoad: () => {
    throw redirect({ to: "/atributos" });
  },
});
