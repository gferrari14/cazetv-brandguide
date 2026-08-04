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
        description="CONTEÚDO EM DESENVOLVIMENTO. EM BREVE VOCÊ ENCONTRARÁ AQUI OS BACKGROUNDS OFICIAIS DA MARCA."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex aspect-video items-center justify-center border border-border bg-card"
            >
              <p className="text-xs font-bold uppercase text-muted-foreground">PLACEHOLDER</p>
            </div>
          ))}
        </div>
      </SectionBlock>
    </BrandLayout>
  );
}
