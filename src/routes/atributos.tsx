import { createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { AttributeBlock, type AttributeItem } from "@/components/brandguide/AttributeBlock";

export const Route = createFileRoute("/atributos")({
  component: AtributosPage,
  head: () => ({
    meta: [
      { title: "Atributos · CAZÉTV BRANDGUIDE" },
      { name: "description", content: "Conheça os atributos, essência e tom de voz da marca CazéTV." },
      { property: "og:title", content: "Atributos · CAZÉTV BRANDGUIDE" },
      { property: "og:description", content: "Conheça os atributos, essência e tom de voz da marca CazéTV." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

// Cada atributo tem sua cor. Adicione `media: "url"` para trocar o placeholder por gif/foto.
const attributes: AttributeItem[] = [
  {
    title: "PAIXÃO",
    color: "var(--brand-pink)",
    lines: [
      "I. NOSSA MISSÃO É O QUE NOS MOVE.",
      "II. TUDO COMEÇA E TERMINA NA PAIXÃO PELO ESPORTE.",
    ],
    subsections: [
      {
        heading: "III. PROFUNDIDADE NO CONTEÚDO",
        items: [
          "“SER CRIATIVO NÃO É SER SUPERFICIAL.”",
          "MAIS ESTUDO, MAIS REPERTÓRIO, MAIS CONTEXTO.",
          "“O PÚBLICO SENTE QUANDO O CONTEÚDO VEM DE QUEM ENTENDE O ASSUNTO.”",
        ],
      },
    ],
  },
  {
    title: "AUTENTICIDADE",
    color: "var(--brand-blue)",
    lines: [],
  },
];

function AtributosPage() {
  return (
    <BrandLayout>
      <PageHeader
        title="Atributos"
        description="OS ATRIBUTOS DEFINEM QUEM A CAZÉTV É. ELES GUIAM O TOM, A FORMA DE SE COMUNICAR E A MANEIRA COMO A MARCA SE APRESENTA EM CADA PONTO DE CONTATO."
      />

      <div className="brand-container">
        {attributes.map((attr) => (
          <AttributeBlock key={attr.title} attribute={attr} />
        ))}
      </div>
    </BrandLayout>
  );
}
