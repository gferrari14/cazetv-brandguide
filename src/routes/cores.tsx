import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
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
  { name: "PRETO", hex: "#000000", rgb: "0, 0, 0", cmyk: "0, 0, 0, 100", textOnDark: true },
  { name: "BRANCO", hex: "#FFFFFF", rgb: "255, 255, 255", cmyk: "0, 0, 0, 0" },
];

function ColorCard({ color }: { color: BrandColor }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group block w-full overflow-hidden border border-border bg-card text-left transition-transform hover:-translate-y-0.5"
      title={`Copiar ${color.hex}`}
    >
      <div
        className="relative flex h-40 items-end p-4"
        style={{ backgroundColor: color.hex, color: color.textOnDark ? "#FFFFFF" : "#000000" }}
      >
        <p className="text-xs font-bold uppercase">{color.name}</p>
        <span
          className="absolute right-3 top-3 inline-flex items-center gap-1 border px-2 py-1 text-[10px] font-bold uppercase"
          style={{
            borderColor: color.textOnDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
          }}
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? "COPIADO" : "COPIAR"}
        </span>
      </div>
      <div className="space-y-1 p-5 text-xs text-muted-foreground">
        <p className="text-sm font-bold uppercase text-foreground">{color.hex}</p>
        <p>RGB: {color.rgb}</p>
        <p>CMYK: {color.cmyk}</p>
      </div>
    </button>
  );
}

function GradientCopyCard() {
  const [copied, setCopied] = useState(false);
  const css = "linear-gradient(90deg, #F64C68 0%, #F3C11B 35%, #61B8E0 70%, #58C071 100%)";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="block w-full overflow-hidden border border-border bg-card text-left"
      title="Copiar CSS do gradiente"
    >
      <div className="relative h-32 w-full" style={{ background: "var(--brand-gradient)" }}>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 border border-black/30 bg-white/80 px-2 py-1 text-[10px] font-bold uppercase text-black">
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? "COPIADO" : "COPIAR CSS"}
        </span>
      </div>
      <div className="border-t border-border p-5">
        <p className="text-sm font-bold uppercase text-foreground">GRADIENTE PRINCIPAL</p>
        <p className="mt-1 text-xs text-muted-foreground">
          ROSA → AMARELO → AZUL → VERDE. VEJA A PÁGINA GRADIENTE PARA REGRAS COMPLETAS.
        </p>
      </div>
    </button>
  );
}

function buildPaletteText() {
  const lines = [
    "PALETA CAZÉTV",
    "",
    ...palette.map((c) => `${c.name}\n  HEX: ${c.hex}\n  RGB: ${c.rgb}\n  CMYK: ${c.cmyk}\n`),
    "GRADIENTE PRINCIPAL",
    "  CSS: linear-gradient(90deg, #F64C68 0%, #F3C11B 35%, #61B8E0 70%, #58C071 100%)",
  ];
  return lines.join("\n");
}

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

async function downloadCoresZip() {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  zip.file("PALETA/paleta-cazetv.txt", buildPaletteText());
  zip.file("GRADIENTE/cazetv-gradiente.svg", buildGradientSvg());
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cazetv-cores.zip";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function CoresPage() {
  return (
    <BrandLayout>
      <PageHeader
        title="CORES"
        description="A PALETA DA CAZÉTV É CONSTRUÍDA SOBRE DOIS NEUTROS — PRETO E BRANCO — ACOMPANHADOS PELO GRADIENTE COLORIDO PROPRIETÁRIO, QUE CARREGA TODA A VIBRAÇÃO DA MARCA."
        action={
          <button
            type="button"
            onClick={downloadCoresZip}
            className="gradient-hover inline-flex items-center gap-2 border border-foreground bg-background px-5 py-3 text-xs font-bold uppercase tracking-wide text-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <Download className="size-4" />
              DOWNLOAD DA PALETA
            </span>
          </button>
        }
      />

      <SectionBlock
        title="PALETA PRINCIPAL"
        eyebrow="CORES OFICIAIS"
        description="CLIQUE EM QUALQUER COR PARA COPIAR O VALOR HEX. APENAS PRETO E BRANCO COMPÕEM A BASE; AS CORES VIVAS APARECEM EXCLUSIVAMENTE PELO GRADIENTE."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {palette.map((color) => (
            <ColorCard key={color.hex} color={color} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="GRADIENTE CAZÉTV"
        eyebrow="ELEMENTO GRÁFICO"
        description="O GRADIENTE É O ÚNICO ELEMENTO COLORIDO DA MARCA E DEVE SER USADO COMO ASSET GRÁFICO — NÃO COMO COR DE TEXTO OU FUNDO DE LEITURA."
      >
        <GradientCopyCard />
      </SectionBlock>

      <SectionBlock
        title="COMBINAÇÃO RECOMENDADA"
        eyebrow="REGRA PRINCIPAL"
        description="EXISTE UMA COMBINAÇÃO OFICIAL E PRIORITÁRIA PARA TRANSMITIR A IDENTIDADE CAZÉTV EM QUALQUER PONTO DE CONTATO."
      >
        <div className="overflow-hidden border border-border" style={{ backgroundColor: "#000000" }}>
          <div className="flex flex-col gap-8 p-8 md:p-14">
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "#FFFFFF" }}>
              COMBINAÇÃO PRINCIPAL
            </p>
            <p
              className="text-4xl uppercase leading-[1.15] md:text-6xl"
              style={{ color: "#FFFFFF", fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              FUNDO PRETO<br />INFORMAÇÃO EM BRANCO<br />ASSET GRADIENTE
            </p>
            <div className="h-2 w-full" style={{ background: "var(--brand-gradient)" }} />
            <p className="max-w-2xl text-sm leading-relaxed" style={{ color: "#FFFFFF" }}>
              A COMBINAÇÃO MAIS RECOMENDADA PARA TRANSMITIR CAZÉTV É O <strong>FUNDO PRETO</strong> COM{" "}
              <strong>INFORMAÇÃO EM BRANCO</strong>, COMPLEMENTADA POR UM <strong>ASSET GRADIENTE</strong> —
              DE PREFERÊNCIA UM RETÂNGULO FINO APLICADO COMO DETALHE GRÁFICO. ESSA FÓRMULA GARANTE O MÁXIMO
              DE PRESENÇA, CONTRASTE E RECONHECIMENTO DA MARCA.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase text-foreground">DO</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• PRIORIZE SEMPRE FUNDO PRETO + TEXTO BRANCO.</li>
              <li>• USE O GRADIENTE COMO ASSET GRÁFICO FINO (RÉGUA, DETALHE, DIVISOR).</li>
              <li>• MANTENHA ALTO CONTRASTE E LEITURA LIMPA.</li>
            </ul>
          </div>
          <div className="border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase text-destructive">DON&apos;T</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• NÃO USE O GRADIENTE COMO FUNDO DE TEXTOS LONGOS.</li>
              <li>• NÃO APLIQUE CORES FORA DO PRETO/BRANCO EM TIPOGRAFIA.</li>
              <li>• NÃO SUBSTITUA O FUNDO PRETO POR CORES CHAPADAS DA PALETA.</li>
            </ul>
          </div>
        </div>
      </SectionBlock>
    </BrandLayout>
  );
}
