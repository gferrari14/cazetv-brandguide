import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { IdentityModal } from "@/components/identidades/IdentityModal";
import { listIdentityCatalog } from "@/lib/identity-catalog.functions";

export const Route = createFileRoute("/identidades/$slug")({
  loader: async ({ params }) => {
    const catalog = await listIdentityCatalog();
    const identity = catalog.find((i) => i.slug === params.slug);
    if (!identity) throw notFound();
    return { identity };
  },
  head: ({ loaderData }) => {
    const title = `${loaderData?.identity.name ?? "Identidade"} — CazéTV`;
    const description = `Identidade visual de ${loaderData?.identity.name ?? "um programa da CazéTV"}.`;
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] };
  },
  component: IdentityPage,
});

function IdentityPage() {
  const { identity } = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <IdentityModal
      identity={identity}
      open
      onClose={() => navigate({ to: "/identidades" })}
    />
  );
}
