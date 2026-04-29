import { createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";

export const Route = createFileRoute("/cores")({
  component: CoresPage,
});

const baseColors = [
  { name: "Preto", value: "#000000" },
  { name: "Branco", value: "#FFFFFF" },
];

function CoresPage() {
  return (
    <BrandLayout>
      <PageHeader title="Cores" description="Base neutra inicial para a identidade CazéTV, pronta para expansão com a paleta oficial." />
      <SectionBlock title="Paleta base" eyebrow="Fundação">
        <div className="grid gap-4 md:grid-cols-2">
          {baseColors.map((color) => (
            <div key={color.value} className="overflow-hidden border border-border bg-card">
              <div className="h-40" style={{ backgroundColor: color.value }} />
              <div className="p-5">
                <p className="text-sm font-bold uppercase text-foreground">{color.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{color.value}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>
    </BrandLayout>
  );
}
