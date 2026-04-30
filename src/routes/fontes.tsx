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
      <PageHeader
        title="Tipografia"
        description="A seleção de fontes foi uma decisão estratégica para comunicar os valores da marca, criando contraste visual entre o tradicional e o moderno."
      />

      <SectionBlock
        title="Gilroy"
        eyebrow="Tipografia principal"
        description="Usada para textos corridos, conteúdos de apoio, navegação e interface. Pesos disponíveis: Regular, SemiBold e ExtraBold."
      >
        <div className="space-y-6 border border-border bg-card p-6 md:p-10">
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">Regular · 400</p>
            <p className="text-3xl font-normal uppercase text-foreground md:text-5xl">Aa Bb Cc 0123 CazéTV</p>
          </div>
          <div className="h-px bg-border" />
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">SemiBold · 600</p>
            <p className="text-3xl font-semibold uppercase text-foreground md:text-5xl">Aa Bb Cc 0123 CazéTV</p>
          </div>
          <div className="h-px bg-border" />
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">ExtraBold · 800</p>
            <p className="text-3xl font-bold uppercase text-foreground md:text-5xl">Aa Bb Cc 0123 CazéTV</p>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        title="Tusker"
        eyebrow="Tipografia de display"
        description="Reservada para títulos e textos em destaque. Ideal para transmitir informações curtas e de alto impacto. Pesos de referência: 4600 SemiBold e 3500 Medium."
      >
        <div className="border border-border bg-card p-6 md:p-10">
          <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">Tusker · Display</p>
          <p className="text-4xl font-bold uppercase tracking-wide text-foreground md:text-7xl">
            BEM-VINDO À CAZÉTV
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            *Tusker não está embarcada nesta versão do brandguide. Use Gilroy ExtraBold como substituto até a fonte ser disponibilizada.
          </p>
        </div>
      </SectionBlock>

      <SectionBlock
        title="Hierarquia"
        eyebrow="Como combinar"
        description="A Tusker é reservada para títulos e destaques. Para textos corridos e conteúdos de apoio, utilize a Gilroy."
      >
        <div className="space-y-6 border border-border bg-card p-6 md:p-10">
          <div>
            <p className="text-xs font-bold uppercase text-primary">Título · Tusker / Gilroy ExtraBold</p>
            <h3 className="mt-2 text-4xl font-bold uppercase text-foreground md:text-6xl">
              Esporte ao vivo
            </h3>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-primary">Subtítulo · Gilroy SemiBold</p>
            <p className="mt-2 text-xl font-semibold uppercase text-foreground md:text-2xl">
              Transmissões digitais da nova geração
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-primary">Corpo · Gilroy Regular</p>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
              A CazéTV transforma a experiência de assistir a esportes em um evento vivo, participativo e
              genuinamente conectado. A Gilroy é a base para toda a comunicação editorial e digital.
            </p>
          </div>
        </div>
      </SectionBlock>
    </BrandLayout>
  );
}
