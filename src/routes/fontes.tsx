import { createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";

export const Route = createFileRoute("/fontes")({
  component: FontesPage,
});

function FontesPage() {
  return (
    <BrandLayout>
      <PageHeader title="Fontes" description="Toda a base tipográfica foi substituída por Gilroy, com Regular e Bold carregadas no projeto." />
      <SectionBlock title="Gilroy" eyebrow="Tipografia principal" description="Use Gilroy Regular para textos de apoio e Gilroy Bold para títulos, chamadas e navegação.">
        <div className="space-y-6 border border-border bg-card p-6 md:p-10">
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">Regular · 400</p>
            <p className="text-3xl font-normal uppercase text-foreground md:text-5xl">Brandguide CazéTV</p>
          </div>
          <div className="h-px bg-border" />
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">Bold · 700</p>
            <p className="text-3xl font-bold uppercase text-foreground md:text-5xl">Brandguide CazéTV</p>
          </div>
        </div>
      </SectionBlock>
    </BrandLayout>
  );
}
