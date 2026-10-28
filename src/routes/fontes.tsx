import { createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";
import { DownloadButton } from "@/components/brandguide/DownloadButton";
import { DownloadAllButton } from "@/components/brandguide/DownloadAllButton";
import { siteFonts } from "@/lib/site-media";

export const Route = createFileRoute("/fontes")({
  head: () => ({ meta: [
    { title: "Fontes — CazéTV Brandguide" },
    { name: "description", content: "Druk, Druk Wide e Monoglyphic: tipografia oficial, regras de uso e downloads da CazéTV." },
    { property: "og:title", content: "Fontes — CazéTV Brandguide" },
    { property: "og:description", content: "Conheça e baixe as fontes Druk, Druk Wide e Monoglyphic da CazéTV." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: FontesPage,
});

function FontesPage() {
  return (
    <BrandLayout>
      <PageHeader title="TIPOGRAFIA" description="IMPACTO NOS TÍTULOS. PERSONALIDADE EM CADA DETALHE. DRUK E MONOGLYPHIC FORMAM O SISTEMA TIPOGRÁFICO DA CAZÉTV."
        action={<DownloadAllButton zipName="cazetv-fontes.zip" label="DOWNLOAD DE TODAS AS FONTES" files={siteFonts.map((font) => ({ url: font.asset.url, path: font.path }))} />} />
      {siteFonts.map((font) => (
        <SectionBlock key={font.name} title={font.name} titleClassName={font.className} eyebrow={font.role}
          description={font.family === "Druk" ? "VERSÃO CONDENSADA PARA TÍTULOS PRINCIPAIS, NOMES DE PÁGINAS E ATRIBUTOS, FRASES LONGAS E ÁREAS ESTREITAS. PESO BOLD · 700."
            : font.family === "Druk Wide" ? "VERSÃO EXPANDIDA PARA TÍTULOS SECUNDÁRIOS CURTOS, EM ÁREAS COM ESPAÇO HORIZONTAL SUFICIENTE. PESO BOLD · 700."
            : "FONTE VARIÁVEL PARA TEXTOS CORRIDOS, NAVEGAÇÃO, BOTÕES, CAMPOS, LEGENDAS E CRÉDITOS. PESOS DE 100 A 900; CORPO EM REGULAR · 400."}>
          <div className="font-specimen border-y border-border py-8 md:py-12">
            <p className="mb-5 text-xs text-muted-foreground">{font.family === "Monoglyphic" ? "REGULAR · 400" : "BOLD · 700"}</p>
            <p className={`${font.className} ${font.family === "Monoglyphic" ? "text-2xl font-normal md:text-4xl" : font.family === "Druk Wide" ? "text-2xl font-bold md:text-5xl" : "text-5xl font-bold md:text-8xl"} break-words leading-tight text-foreground`}>CAZÉTV</p>
            <p className={`${font.className} mt-6 break-words text-xl leading-relaxed md:text-3xl ${font.family === "Monoglyphic" ? "font-normal" : "font-bold"}`}>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />0123456789 · Á É Í Ó Ú Ã Õ Ç</p>
            {font.family === "Monoglyphic" && <p className="mt-6 max-w-3xl text-[12px] leading-[1.6] tracking-[0.02em] md:text-[13px]">A CAZÉTV TRANSFORMA A EXPERIÊNCIA DE ASSISTIR A ESPORTES EM UM EVENTO VIVO, PARTICIPATIVO E GENUINAMENTE CONECTADO.</p>}
          </div>
          <div className="mt-5"><DownloadButton href={font.asset.url} filename={font.asset.original_filename} label={`DOWNLOAD ${font.name}`} /></div>
        </SectionBlock>
      ))}
      <SectionBlock title="HIERARQUIA" eyebrow="COMO COMBINAR" description="DRUK NOS TÍTULOS. MONOGLYPHIC NOS TEXTOS E NA INTERFACE. SEMPRE EM CAIXA ALTA.">
        <div className="space-y-10">
          <div><p className="mb-3 text-[11px] tracking-[0.08em] text-muted-foreground">TÍTULO PRINCIPAL · DRUK CONDENSADA</p><h3 className="font-display text-6xl leading-none md:text-8xl">ESPORTE AO VIVO</h3></div>
          <div><p className="mb-3 text-[11px] tracking-[0.08em] text-muted-foreground">TÍTULO SECUNDÁRIO CURTO · DRUK WIDE</p><p className="font-display-wide break-words text-2xl font-bold leading-tight md:text-4xl">CAZÉTV</p></div>
          <div><p className="mb-3 text-[11px] tracking-[0.08em] text-muted-foreground">CORPO · MONOGLYPHIC REGULAR</p><p className="max-w-3xl text-[12px] leading-[1.6] tracking-[0.02em] md:text-[13px]">A DRUK CONDENSADA É A ESCOLHA PARA TÍTULOS PRINCIPAIS E FRASES LONGAS. A DRUK WIDE DESTACA TÍTULOS SECUNDÁRIOS CURTOS QUE CABEM EM UMA LINHA. EM ÁREAS ESTREITAS, USE A CONDENSADA. TEXTOS PEQUENOS E BOTÕES USAM MONOGLYPHIC.</p></div>
        </div>
      </SectionBlock>
      <SectionBlock title="SEMPRE EM CAIXA ALTA" eyebrow="REGRA DE USO" description="A CAIXA ALTA É PARTE DA IDENTIDADE VERBAL DA CAZÉTV. VALE PARA TÍTULOS, CORPO DE TEXTO, BOTÕES E LEGENDAS.">
        <p className="font-display text-5xl font-bold leading-none md:text-7xl">PRESENÇA. ENERGIA. CAZÉTV.</p>
      </SectionBlock>
    </BrandLayout>
  );
}
