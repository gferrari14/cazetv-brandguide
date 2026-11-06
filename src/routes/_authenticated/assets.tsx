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
import { CazetvAssetsGrid } from "@/components/brandguide/CazetvAssetsGrid";

const DOWNLOAD_ICON_MASK =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/><polyline points='7 10 12 15 17 10'/><line x1='12' y1='15' x2='12' y2='3'/></svg>\")";

export const Route = createFileRoute("/_authenticated/assets")({
  head: () => ({ meta: [
    {"title": "Assets — CazéTV Brandguide"},
    {"name": "description", "content": "Elementos gráficos e ícones oficiais da CazéTV para download."},
    {"property": "og:title", "content": "Assets — CazéTV Brandguide"},
    {"property": "og:description", "content": "Elementos gráficos e ícones oficiais da CazéTV para download."},
    {"property": "og:type", "content": "website"},
    {"name": "twitter:card", "content": "summary"},
  ] }),
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
  registerRef,
}: {
  Icon: (typeof institutionalIcons)[number]["Icon"];
  label: string;
  file: string;
  registerRef: (file: string, node: SVGSVGElement | null) => void;
}) {
  const ref = useRef<SVGSVGElement>(null);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex size-16 items-center justify-center">
        <Icon
          ref={(node) => {
            ref.current = node;
            registerRef(file, node);
          }}
          className="size-8 stroke-[1.25]"
          color="#FFFFFF"
        />
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
          <span
            aria-hidden="true"
            className="gradient-hover-icon size-3"
            style={{ ["--icon-mask" as string]: DOWNLOAD_ICON_MASK }}
          />
          SVG
        </span>
      </button>
    </div>
  );
}

function AssetsPage() {
  const refsMap = useRef<Map<string, SVGSVGElement | null>>(new Map());
  const [zipping, setZipping] = useState(false);

  const registerRef = (file: string, node: SVGSVGElement | null) => {
    refsMap.current.set(file, node);
  };

  const downloadAll = async () => {
    if (zipping) return;
    setZipping(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder("ICONES")!;
      for (const { file } of institutionalIcons) {
        const node = refsMap.current.get(file);
        if (!node) continue;
        const clone = node.cloneNode(true) as SVGSVGElement;
        clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        const source = new XMLSerializer().serializeToString(clone);
        folder.file(`cazetv-icone-${file}.svg`, source);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cazetv-assets.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setZipping(false);
    }
  };

  return (
    <BrandLayout>
      <PageHeader
        title="ASSETS"
        description="CONJUNTO DE ELEMENTOS GRÁFICOS EXCLUSIVOS DA CAZÉTV, INCLUINDO O SISTEMA DE ÍCONES INSTITUCIONAIS USADO EM INTERFACES, APRESENTAÇÕES E MATERIAIS EDITORIAIS."
        action={
          <button
            type="button"
            onClick={downloadAll}
            disabled={zipping}
            className="gradient-hover inline-flex items-center gap-2 border border-foreground bg-background px-5 py-3 text-xs font-bold uppercase tracking-wide text-foreground disabled:opacity-60"
          >
            <span className="inline-flex items-center gap-2">
              {zipping ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <span
                  aria-hidden="true"
                  className="gradient-hover-icon size-4"
                  style={{ ["--icon-mask" as string]: DOWNLOAD_ICON_MASK }}
                />
              )}
              {zipping ? "GERANDO ZIP..." : "DOWNLOAD DE TODOS OS ASSETS"}
            </span>
          </button>
        }
      />

      <SectionBlock
        title="ASSETS CAZÉTV"
        eyebrow="ELEMENTOS GRÁFICOS"
        description="ELEMENTOS GRÁFICOS INSPIRADOS NO UNIVERSO DO TECLADO, QUE TRANSFORMAM PALAVRAS, SENTIMENTOS E EMOJIS EM UMA COMUNICAÇÃO MAIS FLUIDA E EXPRESSIVA, APROXIMANDO O PÚBLICO DA EXPERIÊNCIA AO VIVO."
      >
        <CazetvAssetsGrid />
      </SectionBlock>

      <SectionBlock
        title="ÍCONES INSTITUCIONAIS"
        eyebrow="SISTEMA DE ÍCONES"
        description="ÍCONES EM ESTILO LINE, TRAÇO UNIFORME, COM CANTOS SUAVEMENTE ARREDONDADOS. DEVEM SER APLICADOS EM BRANCO SOBRE FUNDO PRETO OU EM PRETO SOBRE FUNDO BRANCO. CLIQUE EM SVG PARA BAIXAR INDIVIDUALMENTE."
      >
        <div className="overflow-hidden border border-border bg-black p-6 md:p-10">
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
            {institutionalIcons.map(({ Icon, label, file }) => (
              <IconCard
                key={label}
                Icon={Icon}
                label={label}
                file={file}
                registerRef={registerRef}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase text-primary">ESPECIFICAÇÕES</p>
            <ul className="mt-3 space-y-2 text-[12px] leading-[1.6] tracking-[0.02em] md:text-[13px] text-muted-foreground">
              <li>• ESTILO: LINE / OUTLINE.</li>
              <li>• ESPESSURA UNIFORME DO TRAÇO.</li>
              <li>• CANTOS SUAVEMENTE ARREDONDADOS.</li>
              <li>• COR: BRANCO EM FUNDO ESCURO, PRETO EM FUNDO CLARO.</li>
            </ul>
          </div>
          <div className="border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase text-muted-foreground">DON&apos;T</p>
            <ul className="mt-3 space-y-2 text-[12px] leading-[1.6] tracking-[0.02em] md:text-[13px] text-muted-foreground">
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
