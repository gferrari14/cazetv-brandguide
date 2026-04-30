import { createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";
import { DownloadButton } from "@/components/brandguide/DownloadButton";
import { DownloadAllButton } from "@/components/brandguide/DownloadAllButton";
import logoFullColor from "@/assets/logo-icon-color.png";
import logoFullBlack from "@/assets/logo-full-black.png";
import logoFullWhite from "@/assets/logo-full-white.png";
import symbolBlack from "@/assets/symbol-black.png";
import symbolWhite from "@/assets/symbol-white.png";
import nominativaBlack from "@/assets/nominativa-symbol-black.png";
import nominativaWhite from "@/assets/nominativa-symbol-white.png";
import nominativaSimboloBlack from "@/assets/nominativa-simbolo-black.png";
import nominativaSimboloWhite from "@/assets/nominativa-simbolo-white.png";
import logoFundosAplicacao from "@/assets/logo-fundos-aplicacao.png";

export const Route = createFileRoute("/logo")({
  component: LogoPage,
});

const backgroundSwatches = [
  { label: "Rosa", className: "bg-[#ff3ea5]", logo: logoFullWhite },
  { label: "Azul", className: "bg-[#1e3a8a]", logo: logoFullWhite },
  { label: "Gramado", className: "bg-[#1f6f3f]", logo: logoFullWhite },
  { label: "Estádio", className: "bg-[#0a0a0a]", logo: logoFullWhite },
  { label: "Amarelo", className: "bg-[#facc15]", logo: logoFullBlack },
  { label: "Bokeh", className: "bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#3a1a5a]", logo: logoFullWhite },
] as const;

function LogoPage() {
  return (
    <BrandLayout>
      <PageHeader
        title="Logo"
        description="O logotipo colorido é a versão característica da marca CazéTV. Pode aparecer em preto ou branco quando necessário, sempre com aprovação da equipe de marca."
        action={
          <DownloadAllButton
            zipName="cazetv-logos.zip"
            label="DOWNLOAD DE TODOS OS LOGOS"
            files={[
              { url: logoFullColor, path: "LOGOTIPO/cazetv-logo-color.png" },
              { url: logoFullBlack, path: "LOGOTIPO/cazetv-logo-black.png" },
              { url: logoFullWhite, path: "LOGOTIPO/cazetv-logo-white.png" },
              { url: symbolBlack, path: "SIMBOLO/cazetv-symbol-black.png" },
              { url: symbolWhite, path: "SIMBOLO/cazetv-symbol-white.png" },
              { url: nominativaBlack, path: "NOMINATIVA/cazetv-nominativa-black.png" },
              { url: nominativaWhite, path: "NOMINATIVA/cazetv-nominativa-white.png" },
            ]}
          />
        }
      />

      {/* 1. LOGOTIPOS */}
      <SectionBlock
        title="Logotipos"
        eyebrow="Versões oficiais"
        description="Use sempre os arquivos oficiais. A versão colorida é a principal. As versões em preto e branco devem ser aplicadas conforme o contraste do fundo."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="overflow-hidden border border-border bg-white">
            <div className="flex aspect-video items-center justify-center p-8">
              <img src={logoFullColor} alt="Logotipo CazéTV colorido" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border bg-card p-4">
              <p className="text-xs font-bold uppercase text-primary">PRINCIPAL · COLORIDO</p>
              <DownloadButton href={logoFullColor} filename="cazetv-logo-color.png" />
            </div>
          </div>
          <div className="overflow-hidden border border-border bg-white">
            <div className="flex aspect-video items-center justify-center p-8">
              <img src={logoFullBlack} alt="Logotipo CazéTV preto" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border bg-card p-4">
              <p className="text-xs font-bold uppercase text-primary">PRETO · FUNDO CLARO</p>
              <DownloadButton href={logoFullBlack} filename="cazetv-logo-black.png" />
            </div>
          </div>
          <div className="overflow-hidden border border-border bg-black">
            <div className="flex aspect-video items-center justify-center p-8">
              <img src={logoFullWhite} alt="Logotipo CazéTV branco" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border bg-card p-4">
              <p className="text-xs font-bold uppercase text-primary">BRANCO · FUNDO ESCURO</p>
              <DownloadButton href={logoFullWhite} filename="cazetv-logo-white.png" />
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* 2. SIMBOLO CAZÉ */}
      <SectionBlock
        title="Símbolo Cazé"
        eyebrow="Símbolo isolado"
        description="O símbolo pode ser usado isoladamente em aplicações reduzidas, ícones e contextos onde a marca já esteja consolidada."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden border border-border bg-white">
            <div className="flex aspect-square items-center justify-center p-12">
              <img src={symbolBlack} alt="Símbolo CazéTV em fundo claro" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border bg-card p-4">
              <p className="text-xs font-bold uppercase text-primary">SÍMBOLO · FUNDO CLARO</p>
              <DownloadButton href={symbolBlack} filename="cazetv-symbol-black.png" />
            </div>
          </div>
          <div className="overflow-hidden border border-border bg-black">
            <div className="flex aspect-square items-center justify-center p-12">
              <img src={symbolWhite} alt="Símbolo CazéTV em fundo escuro" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border bg-card p-4">
              <p className="text-xs font-bold uppercase text-primary">SÍMBOLO · FUNDO ESCURO</p>
              <DownloadButton href={symbolWhite} filename="cazetv-symbol-white.png" />
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* 3. PARÂMETROS DE USO - ÁREA DE PROTEÇÃO */}
      <SectionBlock
        title="Parâmetros de uso"
        eyebrow="Área de proteção"
      >
        <div className="border border-border bg-white p-6 md:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:items-center">
            <div className="space-y-4 text-sm leading-relaxed text-neutral-700">
              <p>
                Nosso logotipo deve sempre ter espaço para <strong>respirar e se destacar</strong>. Para garantir essa presença, definimos uma área de respiro mínima em torno da marca.
              </p>
              <p>
                Utilizamos a largura da letra <strong>T</strong> como medida ideal para estabelecer essa margem. Essa proporção assegura equilíbrio nas aplicações e reforça a clareza e autoridade visual do logotipo em qualquer contexto.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {[
                { src: logoFullColor, alt: "Logotipo CazéTV com área de proteção", h: "h-24 md:h-28" },
                { src: symbolBlack, alt: "Símbolo CazéTV com área de proteção", h: "h-24 md:h-28" },
              ].map((item, i) => (
                <div key={i} className="relative mx-auto w-full max-w-[260px] aspect-square">
                  {/* Dashed inner box */}
                  <div className="absolute inset-[14%] border border-dashed border-neutral-400" />
                  {/* Grey corner blocks (T-width markers) */}
                  <div className="absolute left-0 top-0 h-[14%] w-[14%] bg-neutral-400" />
                  <div className="absolute right-0 top-0 h-[14%] w-[14%] bg-neutral-400" />
                  <div className="absolute bottom-0 left-0 h-[14%] w-[14%] bg-neutral-400" />
                  <div className="absolute bottom-0 right-0 h-[14%] w-[14%] bg-neutral-400" />
                  {/* Mid-edge grey blocks */}
                  <div className="absolute left-1/2 top-0 h-[14%] w-[14%] -translate-x-1/2 bg-neutral-400" />
                  <div className="absolute bottom-0 left-1/2 h-[14%] w-[14%] -translate-x-1/2 bg-neutral-400" />
                  <div className="absolute left-0 top-1/2 h-[14%] w-[14%] -translate-y-1/2 bg-neutral-400" />
                  <div className="absolute right-0 top-1/2 h-[14%] w-[14%] -translate-y-1/2 bg-neutral-400" />
                  {/* Logo */}
                  <div className="absolute inset-[14%] flex items-center justify-center p-3">
                    <img src={item.src} alt={item.alt} className={`${item.h} w-auto max-h-full max-w-full object-contain`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* 4. MARCA NOMINATIVA */}
      <SectionBlock
        title="Marca nominativa"
        eyebrow="Logotipo + símbolo"
        description="A marca nominativa combina o símbolo Cazé ao lado do logotipo. Use essa versão quando precisar reforçar a identidade completa da marca."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden border border-border bg-white">
            <div className="flex aspect-video items-center justify-center p-10">
              <img src={nominativaBlack} alt="Marca nominativa CazéTV preta" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border bg-card p-4">
              <p className="text-xs font-bold uppercase text-primary">PRETO · FUNDO CLARO</p>
              <DownloadButton href={nominativaBlack} filename="cazetv-nominativa-black.png" />
            </div>
          </div>
          <div className="overflow-hidden border border-border bg-black">
            <div className="flex aspect-video items-center justify-center p-10">
              <img src={nominativaWhite} alt="Marca nominativa CazéTV branca" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border bg-card p-4">
              <p className="text-xs font-bold uppercase text-primary">BRANCO · FUNDO ESCURO</p>
              <DownloadButton href={nominativaWhite} filename="cazetv-nominativa-white.png" />
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* 5. MARCA NOMINATIVA SÍMBOLO CAZÉ */}
      <SectionBlock
        title="Marca nominativa · Símbolo Cazé"
        eyebrow="Versão consolidada"
        description="Combinação do símbolo Cazé com a marca nominativa. Aplicação recomendada quando há espaço para a marca completa em destaque."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden border border-border bg-white">
            <div className="flex aspect-video items-center justify-center p-10">
              <img src={nominativaSimboloBlack} alt="Símbolo Cazé preto" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border bg-card p-4">
              <p className="text-xs font-bold uppercase text-primary">PRETO · FUNDO CLARO</p>
              <DownloadButton href={nominativaSimboloBlack} filename="cazetv-nominativa-simbolo-black.png" />
            </div>
          </div>
          <div className="overflow-hidden border border-border bg-black">
            <div className="flex aspect-video items-center justify-center p-10">
              <img src={nominativaSimboloWhite} alt="Símbolo Cazé branco" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border bg-card p-4">
              <p className="text-xs font-bold uppercase text-primary">BRANCO · FUNDO ESCURO</p>
              <DownloadButton href={nominativaSimboloWhite} filename="cazetv-nominativa-simbolo-white.png" />
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* 6. LOGO APLICADO EM FUNDOS */}
      <SectionBlock
        title="Logo aplicado em fundos"
        eyebrow="Versatilidade"
        description="O logo deve sempre garantir contraste e legibilidade. Use a versão branca em fundos escuros ou coloridos saturados, e a versão preta em fundos claros ou amarelos."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {backgroundSwatches.map((bg) => (
            <div key={bg.label} className="overflow-hidden border border-border">
              <div className={`flex aspect-square items-center justify-center p-10 ${bg.className}`}>
                <img src={bg.logo} alt={`Logo CazéTV em fundo ${bg.label}`} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="border-t border-border bg-card p-4">
                <p className="text-xs font-bold uppercase text-primary">FUNDO · {bg.label}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* 7. REDUÇÕES MÍNIMAS */}
      <SectionBlock
        title="Reduções mínimas"
        eyebrow="Tamanhos mínimos"
        description="Abaixo desses limites, a leitura do logo e a integridade dos elementos visuais ficam comprometidas."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <p className="mb-4 text-xs font-bold uppercase text-primary">Impresso</p>
            <div className="flex items-baseline justify-between border-b border-border pb-3">
              <span className="text-sm text-foreground">Logotipo</span>
              <span className="text-sm font-bold text-foreground">25 mm</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-sm text-foreground">Símbolo</span>
              <span className="text-sm font-bold text-foreground">8,5 mm</span>
            </div>
          </div>
          <div className="border border-border bg-card p-6">
            <p className="mb-4 text-xs font-bold uppercase text-primary">Digital</p>
            <div className="flex items-baseline justify-between border-b border-border pb-3">
              <span className="text-sm text-foreground">Logotipo</span>
              <span className="text-sm font-bold text-foreground">100 px</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-sm text-foreground">Símbolo</span>
              <span className="text-sm font-bold text-foreground">35 px</span>
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* 8. DO & DON'T */}
      <SectionBlock title="Do & Don't" eyebrow="Boas práticas">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase text-primary">Do</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Utilizar sempre os arquivos oficiais do logo.</li>
              <li>• Respeitar a área de proteção.</li>
              <li>• Aplicar sobre fundos com bom contraste.</li>
              <li>• Usar a versão correta para cada contexto.</li>
              <li>• Manter proporções originais.</li>
              <li>• Usar cores oficiais da marca.</li>
              <li>• Seguir os padrões mesmo em peças geradas por IA.</li>
            </ul>
          </div>
          <div className="border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase text-destructive">Don&apos;t</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Não alterar as cores do logotipo.</li>
              <li>• Não deformar o logotipo.</li>
              <li>• Não aplicar sobre fundos poluídos ou sem contraste.</li>
              <li>• Não recriar o logo com IA.</li>
              <li>• Não adicionar efeitos gráficos ao logo.</li>
              <li>• Não usar abaixo da redução mínima.</li>
              <li>• Não modificar a tipografia do logo.</li>
            </ul>
          </div>
        </div>
      </SectionBlock>

      {/* 9. APLICAÇÕES INCORRETAS */}
      <SectionBlock
        title="Aplicações incorretas"
        eyebrow="O que evitar"
        description="Os exemplos abaixo mostram usos que comprometem a integridade da marca e devem ser evitados."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Não distorcer", style: { transform: "scaleX(1.4)" } },
            { label: "Não rotacionar", style: { transform: "rotate(-12deg)" } },
            { label: "Não alterar cores", style: { filter: "hue-rotate(120deg) saturate(2)" } },
            { label: "Não adicionar sombra", style: { filter: "drop-shadow(6px 6px 0 #ff3ea5)" } },
            { label: "Não aplicar em fundo poluído", bg: "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22><circle cx=%2210%22 cy=%2210%22 r=%224%22 fill=%22%23ff3ea5%22/></svg>')] bg-repeat" },
            { label: "Não usar baixo contraste", bg: "bg-[#3a3a3a]" },
          ].map((item) => (
            <div key={item.label} className="overflow-hidden border border-border">
              <div className={`relative flex aspect-video items-center justify-center p-8 ${item.bg ?? "bg-white"}`}>
                <img
                  src={item.bg?.includes("#3a3a3a") ? logoFullBlack : logoFullColor}
                  alt={item.label}
                  className="max-h-full max-w-full object-contain"
                  style={item.style}
                />
                <div className="pointer-events-none absolute inset-4 border-2 border-destructive" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-1 w-3/4 rotate-[-18deg] bg-destructive/80" />
                </div>
              </div>
              <div className="border-t border-border bg-card p-4">
                <p className="text-xs font-bold uppercase text-destructive">✕ {item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>
    </BrandLayout>
  );
}
