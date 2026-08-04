import { createFileRoute } from "@tanstack/react-router";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";

export const Route = createFileRoute("/atributos")({
  component: AtributosPage,
});

const attributes = [
  {
    title: "AUTÊNTICA",
    description: "A CazéTV fala do seu jeito, sem filtros excessivos. A marca carrega a naturalidade de quem vive o jogo de verdade.",
  },
  {
    title: "AO VIVO",
    description: "A energia do momento é o combustível. Tudo gira em torno da experiência em tempo real, da emoção compartilhada.",
  },
  {
    title: "POPULAR",
    description: "Acessível, próxima e inclusiva. A CazéTV se comunica como o torcedor, sem distância ou arrogância.",
  },
  {
    title: "IRREVERENTE",
    description: "Com leveza e ousadia, a marca quebra formalidades sem perder respeito. O humor e a descontração fazem parte do DNA.",
  },
  {
    title: "CONECTADA",
    description: "Está na conversa, no comentário, na reação. A marca nasce da troca com a audiência e se fortalece com ela.",
  },
  {
    title: "DINÂMICA",
    description: "Rápida, versátil e sempre em movimento. A CazéTV acompanha o ritmo dos acontecimentos e das plataformas.",
  },
];

const toneItems = [
  { label: "FALA", description: "Direta, como numa conversa de bar. Sem linguagem corporativa ou rebuscada." },
  { label: "RITMO", description: "Rápida quando o momento pede, mas sempre com clareza. A informação nunca se perde no barulho." },
  { label: "EMOÇÃO", description: "Genuína. Celebramos, reclamamos, vibramos e brincamos junto com quem assiste." },
  { label: "HUMOR", description: "Leve e situacional. Não forçamos piadas, mas não perdemos a chance de descontrair." },
];

function AtributosPage() {
  return (
    <BrandLayout>
      <PageHeader
        title="Atributos"
        description="OS ATRIBUTOS DEFINEM QUEM A CAZÉTV É. ELES GUIAM O TOM, A FORMA DE SE COMUNICAR E A MANEIRA COMO A MARCA SE APRESENTA EM CADA PONTO DE CONTATO."
      />

      <SectionBlock
        title="Essência da marca"
        eyebrow="POR DENTRO DA CAZÉTV"
        description="A ESSÊNCIA DA CAZÉTV É TRANSFORMAR O UNIVERSO DO FUTEBOL E DOS EVENTOS AO VIVO EM UMA EXPERIÊNCIA PRÓXIMA, DIVERTIDA E INCLUSIVA. A MARCA NÃO APENAS TRANSMITE: ELA PARTICIPA, REAGE E CONSTRÓI SENTIMENTO COM QUEM ASSISTE."
      >
        <div className="overflow-hidden border border-border bg-card p-6 md:p-10">
          <p className="max-w-4xl text-sm leading-relaxed text-muted-foreground">
            A CAZÉTV É FEITA DE PESSOAS. DE TORCEDORES. DE QUEM ACORDA CEDO, DE QUEM FICA ATÉ TARDE, DE QUEM VIVE CADA LANCE COMO SE ESTIVESSE NO ESTÁDIO. NOSSA ESSÊNCIA ESTÁ EM LIGAR EMOÇÃO, INFORMAÇÃO E ENTRETENIMENTO NUM SÓ LUGAR — COM A CARA E A CORAGEM DE QUEM AMA O JOGO.
          </p>
        </div>
      </SectionBlock>

      <SectionBlock
        title="Atributos de marca"
        eyebrow="CARACTERÍSTICAS PRINCIPAIS"
        description="SEIS ATRIBUTOS DEFINEM A PERSONALIDADE DA CAZÉTV. ELES DEVEM ESTAR PRESENTES, DE FORMA EQUILIBRADA, EM TODA COMUNICAÇÃO DA MARCA."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {attributes.map((attr) => (
            <div key={attr.title} className="border border-border bg-card p-6 transition-transform hover:-translate-y-0.5">
              <p className="text-xs font-bold uppercase text-primary">{attr.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{attr.description}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="Tom de voz"
        eyebrow="COMO FALAMOS"
        description="O TOM DE VOZ DA CAZÉTV É A MESMA COISA EM TODAS AS PLATAFORMAS: PRÓXIMO, DIRETO E COM ENERGIA. ABAIXO, OS PILARES QUE GUAM A COMUNICAÇÃO."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {toneItems.map((item) => (
            <div key={item.label} className="border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase text-primary">{item.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="Personalidade"
        eyebrow="RESUMO DA MARCA"
        description="SE A CAZÉTV FOSSE UMA PESSOA, ELA SERIA AQUELE AMIGO QUE ENTENDE DE FUTEBOL, CONTA AS MELHORES HISTÓRIAS, NÃO TEM MEDO DE OPINAR E SEMPRE CONVOCA GERAL PARA ASSISTIR JUNTO."
      >
        <div className="overflow-hidden border border-border bg-black p-6 text-white md:p-10">
          <p className="max-w-4xl text-sm leading-relaxed">
            A PERSONALIDADE DA CAZÉTV É A DE QUEM COMANDA A RESENHA COM AUTORIDADE E LEVEZA. É POPULAR SEM SER VULGAR, É ENGRAÇADA SEM SER FORÇADA, É INFORMADA SEM SER CHATA. É A VOZ DE QUEM AMA O JOGO E QUER LEVAR ESSA PAIXÃO PARA O MAIOR NÚMERO POSSÍVEL DE PESSOAS.
          </p>
        </div>
      </SectionBlock>
    </BrandLayout>
  );
}
