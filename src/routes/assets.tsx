import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/assets")({
  component: AssetsPage,
});

const institutionalIcons = [
  { Icon: User, label: "Usuário" },
  { Icon: Users, label: "Grupo" },
  { Icon: MessageCircle, label: "Conversa" },
  { Icon: Calendar, label: "Calendário" },
  { Icon: X, label: "Fechar" },
  { Icon: Minimize2, label: "Reduzir" },
  { Icon: MessageSquare, label: "Mensagem" },
  { Icon: TriangleAlert, label: "Alerta" },
  { Icon: Smartphone, label: "Mobile" },
  { Icon: Monitor, label: "Tela" },
  { Icon: MapPin, label: "Local" },
  { Icon: Clock, label: "Tempo" },
  { Icon: Check, label: "Confirmar" },
  { Icon: ArrowUpRight, label: "Crescimento" },
  { Icon: BarChart3, label: "Barras" },
  { Icon: LineChart, label: "Linha" },
  { Icon: PieChart, label: "Pizza" },
  { Icon: Bell, label: "Notificação" },
  { Icon: ArrowRight, label: "Avançar" },
  { Icon: ArrowLeft, label: "Voltar" },
  { Icon: Search, label: "Buscar" },
  { Icon: Folder, label: "Pasta" },
  { Icon: FileText, label: "Documento" },
  { Icon: StickyNote, label: "Nota" },
];

function AssetsPage() {
  return (
    <BrandLayout>
      <PageHeader
        title="Assets"
        description="Conjunto de elementos gráficos exclusivos da CazéTV, incluindo o sistema de ícones institucionais usado em interfaces, apresentações e materiais editoriais."
      />

      <SectionBlock
        title="Ícones institucionais"
        eyebrow="Sistema de ícones"
        description="Ícones em estilo line, traço uniforme, com cantos suavemente arredondados. Devem ser aplicados em branco sobre fundo preto ou em preto sobre fundo branco."
      >
        <div className="overflow-hidden border border-border bg-black p-6 md:p-10">
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
            {institutionalIcons.map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="flex size-16 items-center justify-center">
                  <Icon className="size-8 stroke-[1.25]" color="#FFFFFF" />
                </div>
                <p className="text-center text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase text-primary">Especificações</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Estilo: line / outline.</li>
              <li>• Espessura uniforme do traço.</li>
              <li>• Cantos suavemente arredondados.</li>
              <li>• Cor: branco em fundo escuro, preto em fundo claro.</li>
            </ul>
          </div>
          <div className="border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase text-destructive">Don&apos;t</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Não preencher os ícones com cores da paleta.</li>
              <li>• Não aplicar sombras, gradientes ou efeitos.</li>
              <li>• Não distorcer ou rotacionar.</li>
              <li>• Não misturar estilos (line + filled) na mesma peça.</li>
            </ul>
          </div>
        </div>
      </SectionBlock>
    </BrandLayout>
  );
}
