import { createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";
import { brandBackgrounds } from "@/lib/site-media";
import { DownloadButton } from "@/components/brandguide/DownloadButton";

export const Route = createFileRoute("/background")({
  component: BackgroundPage,
  head: () => ({
    meta: [
      { title: "Background · CAZÉTV BRANDGUIDE" },
      { name: "description", content: "Backgrounds e imagens de marca da CazéTV." },
      { property: "og:title", content: "Background · CAZÉTV BRANDGUIDE" },
      { property: "og:description", content: "Backgrounds e imagens de marca da CazéTV." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function BackgroundPage() {
  return (
    <BrandLayout>
      <PageHeader
        title="BACKGROUND"
        description="IMAGENS, TEXTURAS E ELEMENTOS VISUAIS QUE COMPÕEM O FUNDO DA COMUNICAÇÃO DA CAZÉTV."
      />

      <SectionBlock
        title="BACKGROUNDS"
        eyebrow="ELEMENTOS DE FUNDO"
        description="VERSÕES OFICIAIS DO BACKGROUND DA MARCA NOS FORMATOS HORIZONTAL E VERTICAL."
      >
        <div className="grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="overflow-hidden border border-border bg-card">
            <img
              src={brandBackgrounds.horizontal}
              alt="Background CazéTV horizontal"
              className="w-full"
              loading="lazy"
            />
            <div className="flex items-center justify-between border-t border-border bg-card/80 px-5 py-3">
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                HORIZONTAL · 1920×1080
              </span>
              <DownloadButton href={brandBackgrounds.horizontal} filename="BACKGROUND_HORIZONTAL.png" label="BAIXAR" />
            </div>
          </div>
          <div className="overflow-hidden border border-border bg-card">
            <img
              src={brandBackgrounds.vertical}
              alt="Background CazéTV vertical"
              className="w-full"
              loading="lazy"
            />
            <div className="flex items-center justify-between border-t border-border bg-card/80 px-5 py-3">
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                VERTICAL · 1080×1350
              </span>
              <DownloadButton href={brandBackgrounds.vertical} filename="BACKGROUND_VERTICAL.png" label="BAIXAR" />
            </div>
          </div>
        </div>
      </SectionBlock>

    </BrandLayout>
  );
}
