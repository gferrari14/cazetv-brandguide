import { createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";

export const Route = createFileRoute("/assets")({
  component: AssetsPage,
});

function AssetsPage() {
  return (
    <BrandLayout>
      <PageHeader
        title="Assets"
        description="Estrutura reservada para os assets proprietários da CazéTV. As ilustrações e grafismos da Copa foram removidos desta versão base."
      />
      <SectionBlock title="Biblioteca visual" eyebrow="Base limpa">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex aspect-square items-center justify-center border border-dashed border-guide-line bg-guide-panel p-6">
              <span className="text-center text-sm font-bold uppercase text-muted-foreground">Asset CazéTV {index + 1}</span>
            </div>
          ))}
        </div>
      </SectionBlock>
    </BrandLayout>
  );
}
