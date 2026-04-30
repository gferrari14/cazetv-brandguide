import { createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";
import logoColor from "@/assets/cazetv-logo-color.jpg";
import logoBlack from "@/assets/cazetv-logo-black.jpg";
import logoWhite from "@/assets/cazetv-logo-white.jpg";
import symbolLight from "@/assets/cazetv-symbol-light.jpg";
import symbolDark from "@/assets/cazetv-symbol-dark.jpg";

export const Route = createFileRoute("/logo")({
  component: LogoPage,
});

function LogoPage() {
  return (
    <BrandLayout>
      <PageHeader
        title="Logo"
        description="O logotipo colorido é a versão característica da marca CazéTV. Pode aparecer em preto ou branco quando necessário, sempre com aprovação da equipe de marca."
      />

      <SectionBlock
        title="Marca nominativa"
        eyebrow="Versões oficiais"
        description="Use sempre os arquivos oficiais. Não recrie, deforme ou altere as cores do logo."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="overflow-hidden border border-border bg-white">
            <div className="flex aspect-video items-center justify-center p-8">
              <img src={logoColor} alt="Logo CazéTV colorido" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="border-t border-border bg-card p-4">
              <p className="text-xs font-bold uppercase text-primary">Principal · Colorido</p>
            </div>
          </div>
          <div className="overflow-hidden border border-border bg-white">
            <div className="flex aspect-video items-center justify-center p-8">
              <img src={logoBlack} alt="Logo CazéTV preto" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="border-t border-border bg-card p-4">
              <p className="text-xs font-bold uppercase text-primary">Preto · Fundo claro</p>
            </div>
          </div>
          <div className="overflow-hidden border border-border bg-black">
            <div className="flex aspect-video items-center justify-center p-8">
              <img src={logoWhite} alt="Logo CazéTV branco" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="border-t border-border bg-card p-4">
              <p className="text-xs font-bold uppercase text-primary">Branco · Fundo escuro</p>
            </div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        title="Cazé símbolo"
        eyebrow="Símbolo isolado"
        description="O símbolo pode ser usado isoladamente em aplicações reduzidas, ícones e contextos onde a marca já esteja consolidada."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden border border-border bg-white">
            <div className="flex aspect-square items-center justify-center p-10">
              <img src={symbolLight} alt="Símbolo CazéTV em fundo claro" className="max-h-full max-w-full object-contain" />
            </div>
          </div>
          <div className="overflow-hidden border border-border bg-black">
            <div className="flex aspect-square items-center justify-center p-10">
              <img src={symbolDark} alt="Símbolo CazéTV em fundo escuro" className="max-h-full max-w-full object-contain" />
            </div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        title="Área de proteção"
        eyebrow="Parâmetros de uso"
        description="O logotipo deve sempre ter espaço para respirar e se destacar. A largura da letra T é a medida ideal de respiro mínimo em torno da marca."
      >
        <div className="border border-border bg-white p-10">
          <div className="flex items-center justify-center">
            <img src={logoColor} alt="Logo CazéTV com área de proteção" className="max-h-48" />
          </div>
        </div>
      </SectionBlock>

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
    </BrandLayout>
  );
}
