import { createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";
import bgHorizontal from "@/assets/background-horizontal.png.asset.json";
import bgVertical from "@/assets/background-vertical.png.asset.json";

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
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <figure className="space-y-3">
            <img
              src={bgHorizontal.url}
              alt="Background CazéTV horizontal"
              className="w-full border border-border"
              loading="lazy"
            />
            <figcaption className="flex items-center justify-between text-xs font-bold uppercase text-muted-foreground">
              <span>HORIZONTAL · 1920×1080</span>
              <a href={bgHorizontal.url} download="BACKGROUND_HORIZONTAL.png" className="underline">
                BAIXAR
              </a>
            </figcaption>
          </figure>
          <figure className="space-y-3">
            <img
              src={bgVertical.url}
              alt="Background CazéTV vertical"
              className="w-full border border-border"
              loading="lazy"
            />
            <figcaption className="flex items-center justify-between text-xs font-bold uppercase text-muted-foreground">
              <span>VERTICAL · 1080×1350</span>
              <a href={bgVertical.url} download="BACKGROUND_VERTICAL.png" className="underline">
                BAIXAR
              </a>
            </figcaption>
          </figure>
        </div>
      </SectionBlock>

    </BrandLayout>
  );
}
