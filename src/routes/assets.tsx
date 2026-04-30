import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import JSZip from "jszip";
import { Loader2 } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Calendar,
  Check,
  Clock,
  Download,
  FileText,
  Folder,
  LineChart,
  MapPin,
  MessageCircle,
  MessageSquare,
  Minimize2,
  Monitor,
  PieChart,
  Search,
  Smartphone,
  StickyNote,
  TriangleAlert,
  User,
  Users,
  X,
} from "lucide-react";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";

export const Route = createFileRoute("/assets")({
  component: AssetsPage,
});

const institutionalIcons = [
  { Icon: User, label: "USUÁRIO", file: "usuario" },
  { Icon: Users, label: "GRUPO", file: "grupo" },
  { Icon: MessageCircle, label: "CONVERSA", file: "conversa" },
  { Icon: Calendar, label: "CALENDÁRIO", file: "calendario" },
  { Icon: X, label: "FECHAR", file: "fechar" },
  { Icon: Minimize2, label: "REDUZIR", file: "reduzir" },
  { Icon: MessageSquare, label: "MENSAGEM", file: "mensagem" },
  { Icon: TriangleAlert, label: "ALERTA", file: "alerta" },
  { Icon: Smartphone, label: "MOBILE", file: "mobile" },
  { Icon: Monitor, label: "TELA", file: "tela" },
  { Icon: MapPin, label: "LOCAL", file: "local" },
  { Icon: Clock, label: "TEMPO", file: "tempo" },
  { Icon: Check, label: "CONFIRMAR", file: "confirmar" },
  { Icon: ArrowUpRight, label: "CRESCIMENTO", file: "crescimento" },
  { Icon: BarChart3, label: "BARRAS", file: "barras" },
  { Icon: LineChart, label: "LINHA", file: "linha" },
  { Icon: PieChart, label: "PIZZA", file: "pizza" },
  { Icon: Bell, label: "NOTIFICAÇÃO", file: "notificacao" },
  { Icon: ArrowRight, label: "AVANÇAR", file: "avancar" },
  { Icon: ArrowLeft, label: "VOLTAR", file: "voltar" },
  { Icon: Search, label: "BUSCAR", file: "buscar" },
  { Icon: Folder, label: "PASTA", file: "pasta" },
  { Icon: FileText, label: "DOCUMENTO", file: "documento" },
  { Icon: StickyNote, label: "NOTA", file: "nota" },
];

function downloadSvgFromNode(svgEl: SVGSVGElement | null, filename: string) {
  if (!svgEl) return;
  const clone = svgEl.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const source = new XMLSerializer().serializeToString(clone);
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function IconCard({
  Icon,
  label,
  file,
}: {
  Icon: (typeof institutionalIcons)[number]["Icon"];
  label: string;
  file: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex size-16 items-center justify-center">
        <Icon ref={ref} className="size-8 stroke-[1.25]" color="#FFFFFF" />
      </div>
      <p className="text-center text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <button
        type="button"
        onClick={() => downloadSvgFromNode(ref.current, `cazetv-icone-${file}.svg`)}
        className="gradient-hover inline-flex items-center gap-1 border border-border px-2 py-1 text-[10px] font-bold uppercase text-foreground"
        title={`Baixar ${label}`}
      >
        <span className="inline-flex items-center gap-1">
          <Download className="size-3" />
          SVG
        </span>
      </button>
    </div>
  );
}

function AssetsPage() {
  return (
    <BrandLayout>
      <PageHeader
        title="ASSETS"
        description="CONJUNTO DE ELEMENTOS GRÁFICOS EXCLUSIVOS DA CAZÉTV, INCLUINDO O SISTEMA DE ÍCONES INSTITUCIONAIS USADO EM INTERFACES, APRESENTAÇÕES E MATERIAIS EDITORIAIS."
      />

      <SectionBlock
        title="ÍCONES INSTITUCIONAIS"
        eyebrow="SISTEMA DE ÍCONES"
        description="ÍCONES EM ESTILO LINE, TRAÇO UNIFORME, COM CANTOS SUAVEMENTE ARREDONDADOS. DEVEM SER APLICADOS EM BRANCO SOBRE FUNDO PRETO OU EM PRETO SOBRE FUNDO BRANCO. CLIQUE EM SVG PARA BAIXAR INDIVIDUALMENTE."
      >
        <div className="overflow-hidden border border-border bg-black p-6 md:p-10">
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
            {institutionalIcons.map(({ Icon, label, file }) => (
              <IconCard key={label} Icon={Icon} label={label} file={file} />
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase text-primary">ESPECIFICAÇÕES</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• ESTILO: LINE / OUTLINE.</li>
              <li>• ESPESSURA UNIFORME DO TRAÇO.</li>
              <li>• CANTOS SUAVEMENTE ARREDONDADOS.</li>
              <li>• COR: BRANCO EM FUNDO ESCURO, PRETO EM FUNDO CLARO.</li>
            </ul>
          </div>
          <div className="border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase text-destructive">DON&apos;T</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• NÃO PREENCHER OS ÍCONES COM CORES DA PALETA.</li>
              <li>• NÃO APLICAR SOMBRAS, GRADIENTES OU EFEITOS.</li>
              <li>• NÃO DISTORCER OU ROTACIONAR.</li>
              <li>• NÃO MISTURAR ESTILOS (LINE + FILLED) NA MESMA PEÇA.</li>
            </ul>
          </div>
        </div>
      </SectionBlock>
    </BrandLayout>
  );
}
