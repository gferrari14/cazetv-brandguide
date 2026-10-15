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
        <div className="grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="overflow-hidden border border-border bg-card">
            <img
              src={bgHorizontal.url}
              alt="Background CazéTV horizontal"
              className="w-full"
              loading="lazy"
            />
            <div className="flex items-center justify-between border-t border-border bg-card/80 px-5 py-3">
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                HORIZONTAL · 1920×1080
              </span>
              <a
                href={bgHorizontal.url}
                download="BACKGROUND_HORIZONTAL.png"
                className="gradient-hover inline-flex items-center gap-2 border border-white bg-black px-4 py-2 text-xs font-bold uppercase tracking-wide text-white"
              >
                BAIXAR
              </a>
            </div>
          </div>
          <div className="overflow-hidden border border-border bg-card">
            <img
              src={bgVertical.url}
              alt="Background CazéTV vertical"
              className="w-full"
              loading="lazy"
            />
            <div className="flex items-center justify-between border-t border-border bg-card/80 px-5 py-3">
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                VERTICAL · 1080×1350
              </span>
              <a
                href={bgVertical.url}
                download="BACKGROUND_VERTICAL.png"
                className="gradient-hover inline-flex items-center gap-2 border border-white bg-black px-4 py-2 text-xs font-bold uppercase tracking-wide text-white"
              >
                BAIXAR
              </a>
            </div>
          </div>
        </div>
      </SectionBlock>

    </BrandLayout>
  );
}
