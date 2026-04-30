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
  { name: "Preto", hex: "#000000", rgb: "0, 0, 0", cmyk: "0, 0, 0, 100", textOnDark: true },
  { name: "Branco", hex: "#FFFFFF", rgb: "255, 255, 255", cmyk: "0, 0, 0, 0" },
];

function CoresPage() {
  return (
    <BrandLayout>
      <PageHeader
        title="Cores"
        description="A paleta da CazéTV é construída sobre dois neutros — preto e branco — acompanhados pelo gradiente colorido proprietário, que carrega toda a vibração da marca."
      />

      <SectionBlock
        title="Paleta principal"
        eyebrow="Cores oficiais"
        description="Apenas preto e branco compõem a base de comunicação. As cores vivas aparecem exclusivamente através do gradiente."
      >
        <div className="grid gap-4 sm:grid-cols-2">
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
        title="Gradiente CazéTV"
        eyebrow="Elemento gráfico"
        description="O gradiente é o único elemento colorido da marca e deve ser usado como asset gráfico — não como cor de texto ou fundo de leitura."
      >
        <div className="overflow-hidden border border-border bg-card">
          <div className="h-32 w-full" style={{ background: "var(--brand-gradient)" }} />
          <div className="border-t border-border p-5">
            <p className="text-sm font-bold uppercase text-foreground">Gradiente principal</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Rosa → Amarelo → Azul → Verde. Veja a página GRADIENTE para regras completas de aplicação.
            </p>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        title="Combinação recomendada"
        eyebrow="Regra principal"
        description="Existe uma combinação oficial e prioritária para transmitir a identidade CazéTV em qualquer ponto de contato."
      >
        <div className="overflow-hidden border border-border" style={{ backgroundColor: "#000000" }}>
          <div className="flex flex-col gap-8 p-8 md:p-14">
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "#FFFFFF" }}>
              Combinação principal
            </p>
            <p
              className="text-4xl uppercase leading-none md:text-6xl"
              style={{ color: "#FFFFFF", fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Fundo preto<br />Informação em branco<br />Asset gradiente
            </p>
            <div className="h-2 w-full" style={{ background: "var(--brand-gradient)" }} />
            <p className="max-w-2xl text-sm leading-relaxed" style={{ color: "#FFFFFF" }}>
              A combinação mais recomendada para transmitir CazéTV é o <strong>fundo preto</strong> com{" "}
              <strong>informação em branco</strong>, complementada por um <strong>asset gradiente</strong> —
              de preferência um retângulo fino aplicado como detalhe gráfico. Essa fórmula garante o máximo
              de presença, contraste e reconhecimento da marca.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase text-foreground">Do</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Priorize sempre fundo preto + texto branco.</li>
              <li>• Use o gradiente como asset gráfico fino (régua, detalhe, divisor).</li>
              <li>• Mantenha alto contraste e leitura limpa.</li>
            </ul>
          </div>
          <div className="border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase text-destructive">Don&apos;t</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Não use o gradiente como fundo de textos longos.</li>
              <li>• Não aplique cores fora do preto/branco em tipografia.</li>
              <li>• Não substitua o fundo preto por cores chapadas da paleta.</li>
            </ul>
          </div>
        </div>
      </SectionBlock>
    </BrandLayout>
  );
}
