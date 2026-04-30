import { createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";

export const Route = createFileRoute("/cores")({
  component: CoresPage,
});

interface BrandColor {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  textOnDark?: boolean;
}

const palette: BrandColor[] = [
  { name: "Branco", hex: "#FFFFFF", rgb: "255, 255, 255", cmyk: "0, 0, 0, 0" },
  { name: "Preto", hex: "#000000", rgb: "0, 0, 0", cmyk: "100, 100, 100, 100", textOnDark: true },
  { name: "Azul", hex: "#61B8E0", rgb: "97, 184, 224", cmyk: "60, 10, 5, 0" },
  { name: "Verde", hex: "#58C071", rgb: "88, 192, 113", cmyk: "65, 0, 70, 0" },
  { name: "Rosa", hex: "#F64C68", rgb: "246, 76, 104", cmyk: "0, 82, 42, 0" },
  { name: "Amarelo", hex: "#F3C11B", rgb: "243, 193, 27", cmyk: "5, 24, 92, 0" },
];

function CoresPage() {
  return (
    <BrandLayout>
      <PageHeader
        title="Cores"
        description="A paleta principal da CazéTV combina neutros (preto e branco) com quatro cores vibrantes que dão vida à marca em todos os pontos de contato."
      />

      <SectionBlock
        title="Paleta principal"
        eyebrow="Cores oficiais"
        description="Especificações para web (HEX/RGB) e impresso (CMYK)."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {palette.map((color) => (
            <div key={color.hex} className="overflow-hidden border border-border bg-card">
              <div
                className="flex h-40 items-end p-4"
                style={{ backgroundColor: color.hex, color: color.textOnDark ? "#FFFFFF" : "#000000" }}
              >
                <p className="text-xs font-bold uppercase">{color.name}</p>
              </div>
              <div className="space-y-1 p-5 text-xs text-muted-foreground">
                <p className="text-sm font-bold uppercase text-foreground">{color.hex}</p>
                <p>RGB: {color.rgb}</p>
                <p>CMYK: {color.cmyk}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="Regras de contraste"
        eyebrow="Aplicações"
        description="As escolhas de contraste impactam diretamente a legibilidade e a experiência. Combinações recomendadas para títulos, textos e fundos."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="border border-border p-8" style={{ backgroundColor: "#000000" }}>
            <p className="text-xs font-bold uppercase" style={{ color: "#FFFFFF" }}>Texto branco</p>
            <p className="mt-2 text-2xl font-bold uppercase" style={{ color: "#F3C11B" }}>CazéTV</p>
            <p className="mt-3 text-xs" style={{ color: "#FFFFFF" }}>Recomendado</p>
          </div>
          <div className="border border-border p-8" style={{ backgroundColor: "#FFFFFF" }}>
            <p className="text-xs font-bold uppercase" style={{ color: "#000000" }}>Texto preto</p>
            <p className="mt-2 text-2xl font-bold uppercase" style={{ color: "#F64C68" }}>CazéTV</p>
            <p className="mt-3 text-xs" style={{ color: "#000000" }}>Recomendado</p>
          </div>
          <div className="border border-border p-8" style={{ backgroundColor: "#61B8E0" }}>
            <p className="text-xs font-bold uppercase" style={{ color: "#000000" }}>Texto preto</p>
            <p className="mt-2 text-2xl font-bold uppercase" style={{ color: "#FFFFFF" }}>CazéTV</p>
            <p className="mt-3 text-xs" style={{ color: "#000000" }}>Recomendado</p>
          </div>
          <div className="border border-border p-8" style={{ backgroundColor: "#58C071" }}>
            <p className="text-xs font-bold uppercase" style={{ color: "#000000" }}>Texto preto</p>
            <p className="mt-2 text-2xl font-bold uppercase" style={{ color: "#FFFFFF" }}>CazéTV</p>
            <p className="mt-3 text-xs" style={{ color: "#000000" }}>Recomendado</p>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          As cores devem ser aplicadas garantindo alto contraste e legibilidade em qualquer contexto. Fundos
          claros pedem cores escuras; fundos escuros exigem cores claras ou versões negativas da marca.
        </p>
      </SectionBlock>
    </BrandLayout>
  );
}
