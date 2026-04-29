import { createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";

export const Route = createFileRoute("/logo")({
  component: LogoPage,
});

function LogoPage() {
  return (
    <BrandLayout>
      <PageHeader
        title="Logo"
        description="Área preparada para receber o sistema de logos e assinaturas da CazéTV sem nenhum elemento visual herdado do brandguide anterior."
      />
      <SectionBlock title="Construção" eyebrow="Em desenvolvimento" description="Inclua aqui as versões principais, variações cromáticas, área de respiro e regras de aplicação do logo CazéTV.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex aspect-video items-center justify-center border border-dashed border-guide-line bg-guide-panel p-8">
            <span className="text-sm font-bold uppercase text-muted-foreground">Logo principal</span>
          </div>
          <div className="flex aspect-video items-center justify-center border border-dashed border-guide-line bg-guide-panel p-8">
            <span className="text-sm font-bold uppercase text-muted-foreground">Variações</span>
          </div>
        </div>
      </SectionBlock>
    </BrandLayout>
  );
}
