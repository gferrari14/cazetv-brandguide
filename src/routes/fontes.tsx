import { createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";
import { DownloadButton } from "@/components/brandguide/DownloadButton";
import { DownloadAllButton } from "@/components/brandguide/DownloadAllButton";

export const Route = createFileRoute("/fontes")({
  component: FontesPage,
});

function FontesPage() {
  return (
    <BrandLayout>
      <PageHeader
        title="TIPOGRAFIA"
        description="A SELEÇÃO DE FONTES FOI UMA DECISÃO ESTRATÉGICA PARA COMUNICAR OS VALORES DA MARCA, CRIANDO CONTRASTE VISUAL ENTRE O TRADICIONAL E O MODERNO."
        action={
          <DownloadAllButton
            zipName="cazetv-fontes.zip"
            label="DOWNLOAD DE TODAS AS FONTES"
            files={[
              { url: "/fonts/GILROY-REGULAR.TTF", path: "GILROY/GILROY-REGULAR.TTF" },
              { url: "/fonts/GILROY-BOLD.TTF", path: "GILROY/GILROY-BOLD.TTF" },
              { url: "/fonts/TUSKERGROTESK-3500MEDIUM.OTF", path: "TUSKER/TUSKERGROTESK-3500MEDIUM.OTF" },
              { url: "/fonts/TUSKERGROTESK-3500MEDIUM.TTF", path: "TUSKER/TUSKERGROTESK-3500MEDIUM.TTF" },
              { url: "/fonts/TUSKERGROTESK-4600SEMIBOLD.OTF", path: "TUSKER/TUSKERGROTESK-4600SEMIBOLD.OTF" },
              { url: "/fonts/TUSKERGROTESK-4600SEMIBOLD.TTF", path: "TUSKER/TUSKERGROTESK-4600SEMIBOLD.TTF" },
            ]}
          />
        }
      />

      <SectionBlock
        title="GILROY"
        eyebrow="TIPOGRAFIA PRINCIPAL"
        description="USADA PARA TEXTOS CORRIDOS, CONTEÚDOS DE APOIO, NAVEGAÇÃO E INTERFACE. PESOS DISPONÍVEIS: REGULAR E BOLD."
      >
        <div className="space-y-6 border border-border bg-card p-6 md:p-10">
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">REGULAR · 400</p>
            <p className="text-3xl font-normal uppercase text-foreground md:text-5xl">AA BB CC 0123 CAZÉTV</p>
          </div>
          <div className="h-px bg-border" />
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">BOLD · 700</p>
            <p className="text-3xl font-bold uppercase text-foreground md:text-5xl">AA BB CC 0123 CAZÉTV</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <DownloadButton href="/fonts/GILROY-REGULAR.TTF" filename="GILROY-REGULAR.TTF" label="GILROY REGULAR" />
          <DownloadButton href="/fonts/GILROY-BOLD.TTF" filename="GILROY-BOLD.TTF" label="GILROY BOLD" />
        </div>
      </SectionBlock>

      <SectionBlock
        title="TUSKER GROTESK"
        eyebrow="TIPOGRAFIA DE DISPLAY"
        description="RESERVADA PARA TÍTULOS E TEXTOS EM DESTAQUE. IDEAL PARA INFORMAÇÕES CURTAS E DE ALTO IMPACTO. PESOS: 3500 MEDIUM E 4600 SEMIBOLD."
      >
        <div className="space-y-6 border border-border bg-card p-6 md:p-10">
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">TUSKER GROTESK · 3500 MEDIUM</p>
            <p
              className="text-4xl uppercase tracking-wide text-foreground md:text-6xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              BEM-VINDO À CAZÉTV
            </p>
          </div>
          <div className="h-px bg-border" />
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">TUSKER GROTESK · 4600 SEMIBOLD</p>
            <p
              className="text-4xl uppercase tracking-wide text-foreground md:text-6xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              ESPORTE AO VIVO
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <DownloadButton
            href="/fonts/TUSKERGROTESK-3500MEDIUM.OTF"
            filename="TUSKERGROTESK-3500MEDIUM.OTF"
            label="TUSKER 3500 MEDIUM (OTF)"
          />
          <DownloadButton
            href="/fonts/TUSKERGROTESK-3500MEDIUM.TTF"
            filename="TUSKERGROTESK-3500MEDIUM.TTF"
            label="TUSKER 3500 MEDIUM (TTF)"
          />
          <DownloadButton
            href="/fonts/TUSKERGROTESK-4600SEMIBOLD.OTF"
            filename="TUSKERGROTESK-4600SEMIBOLD.OTF"
            label="TUSKER 4600 SEMIBOLD (OTF)"
          />
          <DownloadButton
            href="/fonts/TUSKERGROTESK-4600SEMIBOLD.TTF"
            filename="TUSKERGROTESK-4600SEMIBOLD.TTF"
            label="TUSKER 4600 SEMIBOLD (TTF)"
          />
        </div>
      </SectionBlock>

      <SectionBlock
        title="HIERARQUIA"
        eyebrow="COMO COMBINAR"
        description="A TUSKER É RESERVADA PARA TÍTULOS E DESTAQUES. PARA TEXTOS CORRIDOS E CONTEÚDOS DE APOIO, UTILIZE A GILROY. SEMPRE EM CAIXA ALTA."
      >
        <div className="space-y-6 border border-border bg-card p-6 md:p-10">
          <div>
            <p className="text-xs font-bold uppercase text-primary">TÍTULO · TUSKER GROTESK SEMIBOLD</p>
            <h3
              className="mt-2 text-4xl uppercase text-foreground md:text-6xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              ESPORTE AO VIVO
            </h3>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-primary">SUBTÍTULO · GILROY BOLD</p>
            <p className="mt-2 text-xl font-bold uppercase text-foreground md:text-2xl">
              TRANSMISSÕES DIGITAIS DA NOVA GERAÇÃO
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-primary">CORPO · GILROY REGULAR</p>
            <p className="mt-2 max-w-2xl text-base uppercase leading-relaxed text-muted-foreground">
              A CAZÉTV TRANSFORMA A EXPERIÊNCIA DE ASSISTIR A ESPORTES EM UM EVENTO VIVO, PARTICIPATIVO
              E GENUINAMENTE CONECTADO. A GILROY É A BASE PARA TODA A COMUNICAÇÃO EDITORIAL E DIGITAL.
            </p>
          </div>
        </div>
      </SectionBlock>
    </BrandLayout>
  );
}
