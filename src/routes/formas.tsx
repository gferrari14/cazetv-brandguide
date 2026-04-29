import { createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";

export const Route = createFileRoute("/formas")({
  component: FormasPage,
});

function FormasPage() {
  return (
    <BrandLayout>
      <PageHeader
        title="Formas"
        description="Área preparada para um novo sistema gráfico CazéTV, sem backgrounds, formas ou ilustrações herdadas da Copa."
      />
      <SectionBlock title="Sistema gráfico" eyebrow="A definir">
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex aspect-[4/3] items-center justify-center border border-dashed border-guide-line bg-guide-panel p-6">
              <span className="text-center text-sm font-bold uppercase text-muted-foreground">Forma base {index + 1}</span>
            </div>
          ))}
        </div>
      </SectionBlock>
    </BrandLayout>
  );
}
