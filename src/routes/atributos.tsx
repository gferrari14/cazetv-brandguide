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
    lines: ["I. ERA DA INFORMAÇÃO X ERA DA CONEXÃO"],
    subsections: [
      {
        heading: "NEUTRALIDADE X PERSONALIDADE",
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
        heading: "EXEMPLOS",
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
    lines: [
      "I. COPA ACERJ",
      "II. SER SEMPRE VERDADEIRO. MOSTRAR NOSSO MELHOR LADO E NOSSAS VULNERABILIDADES. NUNCA MENOSPREZAR O FÃ.",
    ],
    subsections: [
      {
        heading: "III. FANCENTRIC — DE VERDADE!",
        items: [
          { text: "SER TRANSPARENTE E OFERECER SEMPRE O MELHOR PRO FÃ. MESMO QUE NÃO SEJA O MELHOR PRA CAZÉTV." },
        ],
      },
      {
        heading: "IV. FERRAMENTAS DE CONEXÃO EM TEMPO REAL:",
        items: [
          { text: "ENQUETES (REDES, PGMS E TRANSMISSÕES)" },
          { text: "VÍDEOS RECEBIDOS" },
          { text: "RESPONDER O CHAT" },
          { text: "RESPONDER OS COMENTÁRIOS" },
        ],
      },
      {
        heading: "V. GESTÃO DA COMUNIDADE:",
        items: [
          { text: "GERAR BENEFÍCIOS ATRAVÉS DOS PATROCINADORES" },
          { text: "AÇÕES FÍSICAS (CASA CAZÉ)" },
        ],
      },
      {
        heading: "VI. PRODUÇÃO DE CONTEÚDO EM TORNO DA CAZÉTV",
        items: [
          { text: "POSTS E VÍDEOS QUE MOSTREM O NOSSO JEITO. QUE FAÇAM AS PESSOAS SE SENTIREM PARTE." },
          { text: "CONSTRUÇÃO DE COMUNIDADES DENTRO DA CZTV, ATRAVÉS DO ELENCO." },
        ],
      },
    ],
  },
  {
    title: "INCLUSÃO",
    color: WHITE,
    lines: ["I. ESTAR COM NOSSOS FÃS NAS BOAS E NAS MÁS"],
    subsections: [
      {
        items: [
          { text: "EXEMPLO: LIVE COM ZECA PAGODINHO E PODPAH (ARRECADAR DINHEIRO PRAS CHUVAS)" },
          { text: "EXEMPLO: CAMPANHA CONTRA A FOME" },
          { text: "SOMOS UM PAÍS DIVERSO E PLURAL. PRECISAMOS TRAZER ESSA PLURALIDADE PRA DENTRO DA CAZÉTV. AS PESSOAS PRECISAM SE RECONHECER PARA SE CONECTAR." },
        ],
        placeholders: 3,
      },
    ],
  },
  {
    title: "REBELDIA",
    color: WHITE,
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
