import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";
import exemplo1 from "@/assets/gradiente-exemplo-1.jpg";
import exemplo2 from "@/assets/gradiente-exemplo-2.jpg";
import exemplo3 from "@/assets/gradiente-exemplo-3.jpg";

const exemplos = [
  { src: exemplo1, alt: "Post CazéTV — De Volta? José Mourinho" },
  { src: exemplo2, alt: "Post CazéTV — É Vermelho, regra Copa do Mundo" },
  { src: exemplo3, alt: "Post CazéTV — Desfalque no Clássico, Lucas Paquetá" },
];

export const Route = createFileRoute("/gradiente")({
  component: GradientePage,
});

const stops = [
  { name: "Rosa", value: "#F64C68", position: "0%" },
  { name: "Amarelo", value: "#F3C11B", position: "35%" },
  { name: "Azul", value: "#61B8E0", position: "70%" },
  { name: "Verde", value: "#58C071", position: "100%" },
];

function buildGradientSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 200" width="1200" height="200">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#F64C68"/>
      <stop offset="35%" stop-color="#F3C11B"/>
      <stop offset="70%" stop-color="#61B8E0"/>
      <stop offset="100%" stop-color="#58C071"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="200" fill="url(#g)"/>
</svg>`;
}

async function downloadGradienteZip() {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  zip.file("GRADIENTE/cazetv-gradiente.svg", buildGradientSvg());
  zip.file(
    "GRADIENTE/cazetv-gradiente.css",
    `/* CazéTV — Gradiente Principal */\n.cazetv-gradient {\n  background: linear-gradient(90deg, #F64C68 0%, #F3C11B 35%, #61B8E0 70%, #58C071 100%);\n}\n`,
  );
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cazetv-gradiente.zip";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function GradientePage() {
  return (
    <BrandLayout>
      <PageHeader
        title="Gradiente CazéTV"
        description="O gradiente colorido da CazéTV funciona como um elemento gráfico proprietário, capaz de reforçar o reconhecimento da marca mesmo na ausência do logotipo."
        action={
          <button
            type="button"
            onClick={downloadGradienteZip}
            className="gradient-hover inline-flex items-center gap-2 border border-foreground bg-background px-5 py-3 text-xs font-bold uppercase tracking-wide text-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <Download className="size-4" />
              DOWNLOAD DO GRADIENTE
            </span>
          </button>
        }
      />

      <SectionBlock
        title="Gradiente principal"
        eyebrow="Elemento gráfico proprietário"
        description="Composto por quatro cores da paleta principal, na seguinte ordem fixa: rosa, amarelo, azul e verde."
      >
        <div className="overflow-hidden border border-border bg-card">
          <div
            className="h-48 w-full md:h-64"
            style={{ background: "var(--brand-gradient)" }}
          />
          <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
            {stops.map((stop) => (
              <div key={stop.value} className="bg-card p-5">
                <div className="mb-3 h-10 w-full" style={{ backgroundColor: stop.value }} />
                <p className="text-xs font-bold uppercase text-foreground">{stop.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stop.value}</p>
                <p className="text-xs text-muted-foreground">Parada: {stop.position}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border p-6 md:p-8">
            <p className="text-xs font-bold uppercase text-primary">CSS</p>
            <pre className="mt-2 overflow-x-auto text-xs leading-relaxed text-muted-foreground">
{`background: linear-gradient(
  90deg,
  #F64C68 0%,
  #F3C11B 35%,
  #61B8E0 70%,
  #58C071 100%
);`}
            </pre>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        title="Aplicações"
        eyebrow="Como aplicar"
        description="O gradiente deve ser aplicado exclusivamente sobre fundos preto ou branco. O uso predominante é recomendado sobre fundo preto, onde atinge maior intensidade, profundidade e presença visual."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="group overflow-hidden border border-border bg-black transition-colors duration-300 hover:bg-white">
            <div className="flex h-72 items-center justify-end p-6">
              <div
                className="h-full w-2"
                style={{
                  background:
                    "linear-gradient(180deg, #F64C68 0%, #F3C11B 35%, #61B8E0 70%, #58C071 100%)",
                }}
              />
            </div>
            <div className="border-t border-border bg-card p-5">
              <p className="text-xs font-bold uppercase text-primary">Recomendado</p>
              <p className="mt-1 text-sm text-foreground">Detalhe vertical sobre fundo preto.</p>
            </div>
          </div>

          <div className="group overflow-hidden border border-border bg-white transition-colors duration-300 hover:bg-black">
            <div className="flex h-72 items-end p-6">
              <div className="h-2 w-full" style={{ background: "var(--brand-gradient)" }} />
            </div>
            <div className="border-t border-border bg-card p-5">
              <p className="text-xs font-bold uppercase text-primary">Permitido</p>
              <p className="mt-1 text-sm text-foreground">Detalhe horizontal sobre fundo branco.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase text-primary">Do</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Aplicar somente sobre fundo preto ou branco.</li>
              <li>• Manter a ordem fixa: rosa → amarelo → azul → verde.</li>
              <li>• Usar como detalhe gráfico em transmissões, redes e materiais especiais.</li>
              <li>• Garantir uso limpo e controlado, preservando a leitura de textos e logo.</li>
            </ul>
          </div>
          <div className="border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase text-destructive">Don&apos;t</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Não alterar a ordem das cores.</li>
              <li>• Não modificar tonalidades ou aplicar efeitos adicionais.</li>
              <li>• Não usar sobre fundos coloridos, fotos ou texturas poluídas.</li>
              <li>• Não sobrepor ao logotipo nem prejudicar a leitura de textos.</li>
            </ul>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        title="Exemplos de uso"
        eyebrow="Posts e materiais de produção"
        description="Aplicações reais do gradiente em peças de conteúdo da CazéTV, como detalhe inferior em posts e cards editoriais."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exemplos.map((ex) => (
            <div key={ex.src} className="overflow-hidden border border-border bg-card">
              <img src={ex.src} alt={ex.alt} loading="lazy" className="block h-auto w-full" />
            </div>
          ))}
        </div>
      </SectionBlock>
    </BrandLayout>
  );
}
