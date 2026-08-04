import { createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { AttributeBlock, type AttributeItem } from "@/components/brandguide/AttributeBlock";

export const Route = createFileRoute("/atributos")({
  component: AtributosPage,
  head: () => ({
    meta: [
      { title: "Atributos · CAZÉTV BRANDGUIDE" },
      { name: "description", content: "Conheça os cinco atributos da marca CazéTV: paixão, autenticidade, comunidade, inclusão e rebeldia." },
      { property: "og:title", content: "Atributos · CAZÉTV BRANDGUIDE" },
      { property: "og:description", content: "Conheça os cinco atributos da marca CazéTV: paixão, autenticidade, comunidade, inclusão e rebeldia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

// Cada atributo tem sua cor (por enquanto todas brancas).
// Adicione `media: "url"` para trocar os placeholders por gif/foto.
const WHITE = "var(--foreground)";

const attributes: AttributeItem[] = [
  {
    title: "PAIXÃO",
    color: WHITE,
    mediaFit: "text",
    lines: [
      "I. NOSSA MISSÃO É O QUE NOS MOVE.",
      "II. TUDO COMEÇA E TERMINA NA PAIXÃO PELO ESPORTE.",
    ],
    subsections: [
      {
        heading: "III. PROFUNDIDADE NO CONTEÚDO",
        items: [
          { text: "“SER CRIATIVO NÃO É SER SUPERFICIAL.”" },
          { text: "MAIS ESTUDO, MAIS REPERTÓRIO, MAIS CONTEXTO." },
          { text: "“O PÚBLICO SENTE QUANDO O CONTEÚDO VEM DE QUEM ENTENDE O ASSUNTO.”" },
        ],
      },
    ],
  },
  {
    title: "AUTENTICIDADE",
    color: WHITE,
    hideMediaPlaceholder: true,
    lines: ["I. ERA DA INFORMAÇÃO X ERA DA CONEXÃO"],
    subsections: [
      {
        heading: "I. ERA DA INFORMAÇÃO X ERA DA CONEXÃO",
        items: [
          { text: "“ANTES, INFORMAÇÃO ERA PODER. AGORA, É CONEXÃO.”" },
          { text: "“AS PESSOAS QUEREM SE SENTIR PARTE — E ISSO É O QUE FAZEMOS DE MELHOR.”" },
          {
            text: "ERA DA INFORMAÇÃO:",
            sub: [
              "NEUTRALIDADE — O CANAL ERA MEIO E A IMPARCIALIDADE ERA FUNDAMENTAL PARA NÃO CORROMPER A MENSAGEM. ERA NECESSÁRIO PADRONIZAR. UNIFORMES IGUAIS. PROIBIDO SOTAQUE. PROIBIDO PINTAR O CABELO, TER BARBA, PINTAR A UNHA. PROIBIDO SE EMOCIONAR. PROIBIDO SE EXPRESSAR.",
            ],
          },
          {
            text: "ERA DA CONEXÃO:",
            sub: [
              "A INFORMAÇÃO JÁ EXISTE. NÃO É SOBRE PASSÁ-LA, MAS COMO PASSÁ-LA. A CAZÉTV TROUXE TODAS AS CAMADAS ANTES PROIBIDAS PRA FRENTE DA CÂMERA. NOS EXPRESSAMOS, CHORAMOS, ENTREGAMOS MODA, ESTILO DE VIDA, OPINIÃO.",
            ],
          },
        ],
      },
      {
        placeholders: 2,
      },
      {
        heading: "I. A EDIÇÃO DE VÍDEO MUDOU.",
        items: [
          {
            text: "NÃO EXISTE MAIS INÍCIO, MEIO E FIM. A GUERRA POR ATENÇÃO E RETENÇÃO TRANSFORMOU A FORMA DE EDITAR VÍDEO NO MUNDO DIGITAL. É PRECISO BRIGAR POR CADA SEGUNDO. O INÍCIO DO VÍDEO VAI CONDICIONAR AS PESSOAS ASSISTIREM ATÉ O FIM.",
          },
          {
            text: "CONTEÚDO ‘LO-FI’. CONTEÚDOS REAIS. APOSTAM NA SIMPLICIDADE, AUTENTICIDADE E VERDADE. AS PESSOAS SE CONECTAM COM HISTÓRIAS VERDADEIRAS. CONTEÚDO SIMPLES É DIFERENTE DE CONTEÚDO RUIM.",
          },
        ],
      },
    ],
  },
  {
    title: "COMUNIDADE",
    color: WHITE,
    hideMediaPlaceholder: true,
    lines: [],
    grid: [
      { number: "01", text: "SER SEMPRE VERDADEIRO" },
      { number: "02", text: "FANCENTRIC! DE VERDADE!" },
      { number: "03", text: "GESTÃO DA COMUNIDADE" },
      { number: "04", text: "PRODUÇÃO DE CONTEÚDO ENTORNO DA CAZÉTV" },
      { number: "05", text: "FERRAMENTAS DE CONEXÃO EM TEMPO REAL" },
      { number: "06", text: "CONSTRUÇÃO DE COMUNIDADES DENTRO DA CZTV, ATRAVÉS DO ELENCO" },
    ],
  },
  {
    title: "INCLUSÃO",
    color: WHITE,
    hideMediaPlaceholder: true,
    lines: ["I. ESTAR COM NOSSOS FÃS NAS BOAS E NAS MÁS"],
    subsections: [
      {
        imageGrid: [
          { number: "01", text: "LIVE COM ZECA PAGODINHO E PODPAH (ARRECADAR DINHEIRO PRAS CHUVAS)" },
          { number: "02", text: "CAMPANHA CONTRA A FOME" },
          { number: "03", text: "AS PESSOAS PRECISAM SE RECONHECER PARA SE CONECTAR." },
        ],
      },
    ],
  },
  {
    title: "REBELDIA",
    color: WHITE,
    hideMediaPlaceholder: true,
    lines: ["A REGRA É NÃO TER REGRAS."],
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
