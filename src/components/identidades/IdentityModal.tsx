import { useEffect, useMemo, useRef, useState } from "react";
import { X, Download, Plus, Type, Image as ImageIcon, Trash2, GripVertical, Pencil, Check, Replace, Loader2, FolderPlus, Upload } from "lucide-react";
import JSZip from "jszip";
import {
  type IdentityMaterial,
  type MaterialKind,
  deleteMaterial,
  listMaterials,
  updateMaterialFolder,
  uploadMaterial,
} from "@/lib/identity-materials";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Identity } from "@/data/identities";
import {
  type IdentityBlock,
  createBlock,
  deleteBlock,
  listBlocks,
  reorderBlocks,
  updateBlock,
  uploadSlideImage,
} from "@/lib/identity-blocks";

interface Props {
  identity: Identity;
  open: boolean;
  onClose: () => void;
}

type AssetItem = {
  label: string;
  href?: string;
  external?: boolean;
  onClick?: () => void | Promise<void>;
};

async function downloadFile(url: string, filename: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(objectUrl);
}

async function downloadZip(
  files: { url: string; path: string }[],
  zipName: string,
) {
  const zip = new JSZip();
  await Promise.all(
    files.map(async (f) => {
      const res = await fetch(f.url);
      const blob = await res.blob();
      zip.file(f.path, blob);
    }),
  );
  const blob = await zip.generateAsync({ type: "blob" });
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = zipName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(objectUrl);
}

const ASSETS_BY_IDENTITY: Record<string, AssetItem[]> = {
  "um-dia-com": [
    {
      label: "LOGO",
      onClick: () =>
        downloadZip(
          [
            { url: "/identidades/um-dia-com/LOGO_FUNDO_CLARO.png", path: "LOGO_FUNDO_CLARO.png" },
            { url: "/identidades/um-dia-com/LOGO_FUNDO_ESCURO.png", path: "LOGO_FUNDO_ESCURO.png" },
          ],
          "UM-DIA-COM-LOGOS.zip",
        ),
    },
    {
      label: "ASSETS",
      onClick: () => downloadFile("/identidades/um-dia-com/ASSETS.zip", "UM-DIA-COM-ASSETS.zip"),
    },
    {
      label: "FONTES",
      onClick: () =>
        downloadFile("/identidades/um-dia-com/RoyaleCouture-Sans.otf", "RoyaleCouture-Sans.otf"),
    },
    {
      label: "KIT COMPLETO",
      onClick: () =>
        downloadZip(
          [
            { url: "/identidades/um-dia-com/LOGO_FUNDO_CLARO.png", path: "LOGO/LOGO_FUNDO_CLARO.png" },
            { url: "/identidades/um-dia-com/LOGO_FUNDO_ESCURO.png", path: "LOGO/LOGO_FUNDO_ESCURO.png" },
            { url: "/identidades/um-dia-com/ASSETS.zip", path: "ASSETS.zip" },
            { url: "/identidades/um-dia-com/RoyaleCouture-Sans.otf", path: "FONTES/RoyaleCouture-Sans.otf" },
          ],
          "UM-DIA-COM-KIT-COMPLETO.zip",
        ),
    },
    { label: "GUIDE", href: "#", external: true },
  ],
};

const DEFAULT_ASSETS: AssetItem[] = [
  { label: "LOGO", href: "#" },
  { label: "ASSETS", href: "#" },
  { label: "TIPOGRAFIA", href: "#" },
  { label: "KIT COMPLETO", href: "#" },
  { label: "GUIDE", href: "#", external: true },
];

export function IdentityModal({ identity, open, onClose }: Props) {
  const [blocks, setBlocks] = useState<IdentityBlock[]>([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [materials, setMaterials] = useState<IdentityMaterial[]>([]);
  const [materialsOpen, setMaterialsOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Load blocks when opening
  useEffect(() => {
    if (!open || !identity.slug) return;
    let cancelled = false;
    setLoading(true);
    listBlocks(identity.slug)
      .then((data) => {
        if (!cancelled) setBlocks(data);
      })
      .catch((e) => console.error("[IdentityModal] listBlocks", e))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [open, identity.slug]);

  // Load materials when opening
  useEffect(() => {
    if (!open || !identity.slug) return;
    let cancelled = false;
    listMaterials(identity.slug)
      .then((d) => !cancelled && setMaterials(d))
      .catch((e) => console.error("[IdentityModal] listMaterials", e));
    return () => {
      cancelled = true;
    };
  }, [open, identity.slug]);

  const refreshMaterials = async () => {
    setMaterials(await listMaterials(identity.slug));
  };

  const refresh = async () => {
    const data = await listBlocks(identity.slug);
    setBlocks(data);
  };

  const insertAt = async (
    insertAfterIndex: number,
    payload: Partial<IdentityBlock> & { type: "slide" | "text" },
  ) => {
    try {
      const tempPosition =
        (blocks.reduce((m, b) => Math.max(m, b.position), 0) || 0) + 1;
      const created = await createBlock({
        identity_slug: identity.slug,
        position: tempPosition,
        ...payload,
      });
      // Place the new block at the requested index and renumber 1..N
      const next = [...blocks];
      next.splice(insertAfterIndex + 1, 0, created);
      const renumbered = next.map((b, i) => ({ ...b, position: i + 1 }));
      setBlocks(renumbered);
      await reorderBlocks(renumbered.map((b) => ({ id: b.id, position: b.position })));
    } catch (err) {
      console.error("[IdentityModal] insertAt", err);
      alert("Não foi possível adicionar o bloco. Tente novamente.");
      await refresh();
    }
  };

  const handleAddText = async (insertAfterIndex: number) => {
    await insertAt(insertAfterIndex, { type: "text", text_content: "" });
  };

  const handleAddSlide = async (insertAfterIndex: number, files: File[]) => {
    try {
      for (const file of files) {
        const url = await uploadSlideImage(identity.slug, file);
        await insertAt(insertAfterIndex, {
          type: "slide",
          image_url: url,
          preserve_ratio: true,
          natural_size: true,
        });
      }
    } catch (err) {
      console.error("[IdentityModal] handleAddSlide", err);
      alert("Falha ao enviar uma ou mais imagens. Verifique os arquivos e tente novamente.");
    }
  };

  const handleReplaceImage = async (block: IdentityBlock, file: File) => {
    const url = await uploadSlideImage(identity.slug, file);
    await updateBlock(block.id, { image_url: url });
    await refresh();
  };

  const handleUpdateText = async (block: IdentityBlock, text: string) => {
    await updateBlock(block.id, { text_content: text });
    setBlocks((b) => b.map((x) => (x.id === block.id ? { ...x, text_content: text } : x)));
  };

  const handleDelete = async (block: IdentityBlock) => {
    if (!confirm("Excluir este bloco?")) return;
    await deleteBlock(block.id);
    await refresh();
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const onDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const reordered = arrayMove(blocks, oldIndex, newIndex);
    const renumbered = reordered.map((b, i) => ({ ...b, position: i + 1 }));
    setBlocks(renumbered);
    try {
      await reorderBlocks(renumbered.map((b) => ({ id: b.id, position: b.position })));
    } catch (err) {
      console.error("[IdentityModal] reorder", err);
      await refresh();
    }
  };

  if (!open) return null;

  return (
    <div
      className="site-surface fixed inset-0 z-[200] flex flex-col animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Projeto ${identity.name}`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
            Identidade
          </span>
          <span className="text-lg font-bold uppercase tracking-wide text-white">
            {identity.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMaterialsOpen(true)}
            className="flex h-10 items-center gap-2 border-2 border-white/30 px-4 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
          >
            <FolderPlus className="size-3.5" />
            Materiais
            {materials.length > 0 && (
              <span className="ml-1 rounded-full bg-white/15 px-1.5 py-0.5 text-[9px]">
                {materials.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setEditMode((v) => !v)}
            className={`flex h-10 items-center gap-2 border-2 px-4 text-[10px] font-bold uppercase tracking-widest transition ${
              editMode
                ? "border-white bg-white text-black"
                : "border-white/30 text-white hover:bg-white hover:text-black"
            }`}
          >
            {editMode ? <Check className="size-3.5" /> : <Pencil className="size-3.5" />}
            {editMode ? "Concluir" : "Editar"}
          </button>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="flex size-10 items-center justify-center border-2 border-white/30 text-white transition hover:bg-white hover:text-black"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 pt-4 md:px-10">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6">
          {loading && (
            <div className="flex items-center justify-center py-20 text-white/40">
              <Loader2 className="size-5 animate-spin" />
            </div>
          )}

          {!loading && blocks.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">
                Nenhum slide ainda
              </p>
              {editMode && (
                <InsertBar onAddText={() => handleAddText(-1)} onAddSlide={(files) => handleAddSlide(-1, files)} />
              )}
            </div>
          )}

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
              {blocks.map((block, i) => (
                <div key={block.id} className="flex flex-col gap-4">
                  {editMode && i === 0 && (
                    <InsertBar
                      onAddText={() => handleAddText(-1)}
                      onAddSlide={(files) => handleAddSlide(-1, files)}
                    />
                  )}
                  <SortableBlock
                    block={block}
                    editMode={editMode}
                    onUpdateText={(t) => handleUpdateText(block, t)}
                    onReplaceImage={(f) => handleReplaceImage(block, f)}
                    onDelete={() => handleDelete(block)}
                  />
                  {editMode && (
                    <InsertBar
                      onAddText={() => handleAddText(i)}
                      onAddSlide={(files) => handleAddSlide(i, files)}
                    />
                  )}
                </div>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Floating download menu */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center px-4">
        <div className="pointer-events-auto flex items-center gap-1 border-2 border-white/25 bg-black/70 p-1.5 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
          <DownloadMenu identity={identity} materials={materials} />
        </div>
      </div>

      {materialsOpen && (
        <MaterialsPanel
          slug={identity.slug}
          materials={materials}
          onClose={() => setMaterialsOpen(false)}
          onChanged={refreshMaterials}
        />
      )}
    </div>
  );
}

function computePosition(blocks: IdentityBlock[], afterIndex: number): number {
  if (blocks.length === 0) return 1;
  if (afterIndex < 0) {
    return (blocks[0]?.position ?? 1) - 1;
  }
  const current = blocks[afterIndex];
  const next = blocks[afterIndex + 1];
  if (!next) return current.position + 1;
  return (current.position + next.position) / 2;
}

function SortableBlock({
  block,
  editMode,
  onUpdateText,
  onReplaceImage,
  onDelete,
}: {
  block: IdentityBlock;
  editMode: boolean;
  onUpdateText: (text: string) => void;
  onReplaceImage: (file: File) => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
    disabled: !editMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {editMode && (
        <div className="absolute -left-10 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-1">
          <button
            {...attributes}
            {...listeners}
            className="flex size-7 cursor-grab items-center justify-center border border-white/20 bg-black/70 text-white/60 hover:text-white active:cursor-grabbing"
            aria-label="Arrastar"
          >
            <GripVertical className="size-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="flex size-7 items-center justify-center border border-white/20 bg-black/70 text-white/60 transition hover:border-red-500/60 hover:text-red-400"
            aria-label="Excluir"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      )}

      {block.type === "text" ? (
        <TextBlockView block={block} editMode={editMode} onUpdate={onUpdateText} />
      ) : (
        <SlideBlockView block={block} editMode={editMode} onReplace={onReplaceImage} />
      )}
    </div>
  );
}

function TextBlockView({
  block,
  editMode,
  onUpdate,
}: {
  block: IdentityBlock;
  editMode: boolean;
  onUpdate: (text: string) => void;
}) {
  const [value, setValue] = useState(block.text_content ?? "");
  useEffect(() => setValue(block.text_content ?? ""), [block.text_content]);

  if (editMode) {
    return (
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          if (value !== (block.text_content ?? "")) onUpdate(value);
        }}
        placeholder="Escreva sobre o conceito por trás dessa identidade…"
        className="min-h-[140px] w-full resize-y border-2 border-dashed border-white/20 bg-white/[0.02] p-4 text-[11px] font-light leading-relaxed text-left text-white/90 outline-none placeholder:text-white/30 focus:border-white/60"
      />
    );
  }

  if (!value.trim()) return null;

  return (
    <div className="mx-auto max-w-[820px] px-0 py-10">
      <p className="whitespace-pre-wrap pl-[6px] text-[11px] font-light leading-relaxed text-left text-white/85">
        {value}
      </p>
    </div>
  );
}

function SlideBlockView({
  block,
  editMode,
  onReplace,
}: {
  block: IdentityBlock;
  editMode: boolean;
  onReplace: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);

  const onPick = async (file?: File | null) => {
    if (!file) return;
    setBusy(true);
    try {
      await onReplace(file);
    } finally {
      setBusy(false);
    }
  };

  const content = block.image_url ? (
    <img src={block.image_url} alt="" className="block h-auto w-full" />
  ) : (
    <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden border-2 border-white/20 bg-gradient-to-br from-white/[0.06] to-white/[0.01]">
      <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">Sem imagem</span>
    </div>
  );

  return (
    <div className="relative">
      {content}
      {editMode && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            className="hidden"
            onChange={(e) => void onPick(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="absolute right-3 top-3 z-10 flex items-center gap-2 border border-white/30 bg-black/80 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur transition hover:bg-white hover:text-black disabled:opacity-50"
          >
            {busy ? <Loader2 className="size-3 animate-spin" /> : <Replace className="size-3" />}
            Substituir
          </button>
        </>
      )}
    </div>
  );
}

function InsertBar({
  onAddText,
  onAddSlide,
}: {
  onAddText: () => void;
  onAddSlide: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const list = Array.from(files);
    setBusy(true);
    try {
      await onAddSlide(list);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="group flex items-center justify-center gap-2 py-1 opacity-30 transition hover:opacity-100">
      <div className="h-px flex-1 bg-white/15" />
      <button
        type="button"
        onClick={onAddText}
        className="inline-flex items-center gap-1.5 border border-white/25 bg-black/60 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white/80 transition hover:bg-white hover:text-black"
      >
        <Type className="size-3" />
        Texto
      </button>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="inline-flex items-center gap-1.5 border border-white/25 bg-black/60 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white/80 transition hover:bg-white hover:text-black disabled:opacity-50"
      >
        {busy ? <Loader2 className="size-3 animate-spin" /> : <ImageIcon className="size-3" />}
        Slide
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp"
        multiple
        className="hidden"
        onChange={(e) => void handleFiles(e.target.files)}
      />
      <div className="h-px flex-1 bg-white/15" />
      <Plus className="size-3 text-white/30" />
    </div>
  );
}

// =============== Download menu (uses uploaded materials when present) ===============

const KIND_LABEL: Record<MaterialKind, string> = {
  logo: "LOGO",
  asset: "ASSETS",
  fonte: "FONTES",
};
const KIND_ORDER: MaterialKind[] = ["logo", "asset", "fonte"];

async function downloadSingle(url: string, filename: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const obj = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = obj;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(obj);
}

async function downloadMaterialsZip(items: IdentityMaterial[], zipName: string) {
  const zip = new JSZip();
  await Promise.all(
    items.map(async (m) => {
      const res = await fetch(m.file_url);
      const blob = await res.blob();
      const kindFolder = KIND_LABEL[m.kind];
      const sub = m.folder ? `${m.folder}/` : "";
      zip.file(`${kindFolder}/${sub}${m.filename}`, blob);
    }),
  );
  const blob = await zip.generateAsync({ type: "blob" });
  const obj = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = obj;
  a.download = zipName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(obj);
}


function DownloadMenu({
  identity,
  materials,
}: {
  identity: Identity;
  materials: IdentityMaterial[];
}) {
  const className =
    "group inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/80 transition hover:bg-white hover:text-black disabled:opacity-40";

  // If no materials uploaded yet, fall back to legacy hardcoded assets.
  if (materials.length === 0) {
    const items = ASSETS_BY_IDENTITY[identity.slug] ?? DEFAULT_ASSETS;
    return (
      <>
        {items.map((a) => {
          if (a.onClick) {
            return (
              <button key={a.label} type="button" onClick={() => void a.onClick?.()} className={className}>
                <Download className="size-3" />
                {a.label}
              </button>
            );
          }
          return (
            <a
              key={a.label}
              href={a.href}
              {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
              className={className}
            >
              <Download className="size-3" />
              {a.label}
            </a>
          );
        })}
      </>
    );
  }

  const byKind: Record<MaterialKind, IdentityMaterial[]> = { logo: [], asset: [], fonte: [] };
  for (const m of materials) byKind[m.kind].push(m);

  const slug = identity.slug.toUpperCase();

  return (
    <>
      {KIND_ORDER.filter((k) => byKind[k].length > 0).map((k) => {
        const items = byKind[k];
        const label = KIND_LABEL[k];
        const handle = () =>
          items.length === 1
            ? downloadSingle(items[0].file_url, items[0].filename)
            : downloadMaterialsZip(items, `${slug}-${label}.zip`);
        return (
          <button key={k} type="button" onClick={() => void handle()} className={className}>
            <Download className="size-3" />
            {label}
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => void downloadMaterialsZip(materials, `${slug}-KIT-COMPLETO.zip`)}
        className={className}
      >
        <Download className="size-3" />
        Kit Completo
      </button>
    </>
  );
}

// =============== Materials side panel ===============

function MaterialsPanel({
  slug,
  materials,
  onClose,
  onChanged,
}: {
  slug: string;
  materials: IdentityMaterial[];
  onClose: () => void;
  onChanged: () => void | Promise<void>;
}) {
  const grouped = useMemo(() => {
    const g: Record<MaterialKind, IdentityMaterial[]> = { logo: [], asset: [], fonte: [] };
    for (const m of materials) g[m.kind].push(m);
    return g;
  }, [materials]);

  return (
    <div
      className="fixed inset-0 z-[300] flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="site-surface flex h-full w-full max-w-md flex-col border-l-2 border-white/15"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Materiais</p>
            <p className="text-base font-bold uppercase tracking-wide text-white">Logo, Fontes, Assets</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="flex size-9 items-center justify-center border-2 border-white/30 text-white transition hover:bg-white hover:text-black"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <MaterialSection
            slug={slug}
            kind="logo"
            title="Logo"
            accept="image/*,.svg,.ai,.eps,.pdf"
            items={grouped.logo}
            onChanged={onChanged}
          />
          <MaterialSection
            slug={slug}
            kind="fonte"
            title="Fontes"
            accept=".otf,.ttf,.woff,.woff2,.zip"
            items={grouped.fonte}
            onChanged={onChanged}
          />
          <MaterialSection
            slug={slug}
            kind="asset"
            title="Assets"
            accept="*/*"
            items={grouped.asset}
            onChanged={onChanged}
            useFolders
          />

        </div>
      </div>
    </div>
  );
}

function MaterialSection({
  slug,
  kind,
  title,
  accept,
  items,
  onChanged,
  useFolders = false,
}: {
  slug: string;
  kind: MaterialKind;
  title: string;
  accept: string;
  items: IdentityMaterial[];
  onChanged: () => void | Promise<void>;
  useFolders?: boolean;
}) {
  const [extraFolders, setExtraFolders] = useState<string[]>([]);
  const [newFolderInput, setNewFolderInput] = useState("");
  const [creating, setCreating] = useState(false);

  const groups = useMemo(() => {
    const map = new Map<string, IdentityMaterial[]>();
    if (useFolders) map.set("", []);
    for (const m of items) {
      const key = (m.folder || "").trim();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(m);
    }
    if (useFolders) {
      for (const f of extraFolders) if (!map.has(f)) map.set(f, []);
    } else {
      if (!map.has("")) map.set("", []);
    }
    return Array.from(map.entries()).sort(([a], [b]) => {
      if (a === "") return -1;
      if (b === "") return 1;
      return a.localeCompare(b);
    });
  }, [items, extraFolders, useFolders]);

  const addFolder = () => {
    const name = newFolderInput.replace(/[^\w\- ]+/g, "").trim();
    if (!name) return;
    setExtraFolders((f) => (f.includes(name) ? f : [...f, name]));
    setNewFolderInput("");
    setCreating(false);
  };

  return (
    <section className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/80">
          {title} {items.length > 0 && <span className="text-white/40">· {items.length}</span>}
        </h3>
        {useFolders && (
          creating ? (
            <div className="flex items-center gap-1">
              <input
                autoFocus
                value={newFolderInput}
                onChange={(e) => setNewFolderInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addFolder();
                  if (e.key === "Escape") {
                    setCreating(false);
                    setNewFolderInput("");
                  }
                }}
                placeholder="Nome da pasta"
                className="h-7 w-36 border border-white/25 bg-black px-2 text-[10px] uppercase tracking-widest text-white outline-none focus:border-white"
              />
              <button
                type="button"
                onClick={addFolder}
                className="flex h-7 items-center gap-1 border border-white/25 bg-white px-2 text-[9px] font-bold uppercase tracking-widest text-black"
              >
                <Check className="size-3" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setCreating(false);
                  setNewFolderInput("");
                }}
                className="flex h-7 w-7 items-center justify-center border border-white/25 text-white/60 hover:text-white"
              >
                <X className="size-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setCreating(true)}
              className="inline-flex items-center gap-1.5 border border-white/25 bg-white/[0.04] px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
            >
              <FolderPlus className="size-3" />
              Nova pasta
            </button>
          )
        )}
      </div>

      <div className="flex flex-col gap-4">
        {groups.map(([folder, list]) => (
          <FolderGroup
            key={folder || "__root__"}
            slug={slug}
            kind={kind}
            accept={accept}
            folder={folder}
            items={list}
            useFolders={useFolders}
            onChanged={onChanged}
            onRemoveEmpty={
              useFolders && folder && list.length === 0
                ? () => setExtraFolders((f) => f.filter((x) => x !== folder))
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}

function FolderGroup({
  slug,
  kind,
  accept,
  folder,
  items,
  useFolders,
  onChanged,
  onRemoveEmpty,
}: {
  slug: string;
  kind: MaterialKind;
  accept: string;
  folder: string;
  items: IdentityMaterial[];
  useFolders: boolean;
  onChanged: () => void | Promise<void>;
  onRemoveEmpty?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(0);
  const [total, setTotal] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const list = Array.from(files);
    setTotal(list.length);
    setUploading(0);
    let done = 0;
    const queue = [...list];
    const worker = async () => {
      while (queue.length) {
        const f = queue.shift();
        if (!f) break;
        try {
          await uploadMaterial(slug, kind, f, folder);
        } catch (e) {
          console.error("[MaterialsPanel] upload", e);
        } finally {
          done += 1;
          setUploading(done);
        }
      }
    };
    await Promise.all([worker(), worker(), worker()]);
    setTotal(0);
    setUploading(0);
    if (inputRef.current) inputRef.current.value = "";
    await onChanged();
  };

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current += 1;
    if (dragCounter.current === 1) setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    const materialId = e.dataTransfer.getData("application/x-material-id");
    if (materialId) {
      // Internal drag: move existing material to this folder
      if (items.some((m) => m.id === materialId)) return; // same folder
      try {
        await updateMaterialFolder(materialId, folder);
        await onChanged();
      } catch (err) {
        console.error("[MaterialsPanel] move", err);
      }
      return;
    }
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const busy = total > 0;
  const label = folder || (useFolders ? "Sem pasta" : "");

  return (
    <div>
      {useFolders && (
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
            📁 {label}{" "}
            {items.length > 0 && <span className="text-white/30">· {items.length}</span>}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-1.5 border border-white/20 bg-white/[0.04] px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-black disabled:opacity-50"
            >
              {busy ? <Loader2 className="size-3 animate-spin" /> : <Upload className="size-3" />}
              {busy ? `${uploading}/${total}` : "Enviar"}
            </button>
            {onRemoveEmpty && (
              <button
                type="button"
                onClick={onRemoveEmpty}
                aria-label="Remover pasta vazia"
                className="flex size-6 items-center justify-center border border-white/15 text-white/40 hover:border-red-500/60 hover:text-red-400"
              >
                <Trash2 className="size-3" />
              </button>
            )}
          </div>
        </div>
      )}
      {!useFolders && (
        <div className="mb-2 flex justify-end">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-1.5 border border-white/25 bg-white/[0.04] px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-black disabled:opacity-50"
          >
            {busy ? <Loader2 className="size-3 animate-spin" /> : <Upload className="size-3" />}
            {busy ? `${uploading}/${total}` : "Enviar"}
          </button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        className="hidden"
        onChange={(e) => void processFiles(e.target.files)}
      />
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`transition-colors ${
          isDragging
            ? "border-2 border-dashed border-white/60 bg-white/[0.06]"
            : "border border-dashed border-white/15 bg-transparent"
        }`}
      >
        {items.length === 0 && !busy ? (
          <p className="px-4 py-6 text-center text-[10px] uppercase tracking-widest text-white/30">
            Arraste arquivos aqui ou clique em "Enviar"
          </p>
        ) : (
          <ul className="flex flex-col">
            {items.map((m) => (
              <li
                key={m.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("application/x-material-id", m.id);
                  e.dataTransfer.effectAllowed = "move";
                }}
                className="flex cursor-grab items-center gap-2 border-b border-white/10 bg-white/[0.02] px-3 py-2 last:border-b-0 active:cursor-grabbing"
              >
                <a
                  href={m.file_url}
                  download={m.filename}
                  draggable={false}
                  className="flex-1 truncate text-xs text-white/85 hover:text-white"
                  title={m.filename}
                >
                  {m.filename}
                </a>
                <span className="text-[9px] text-white/40">
                  {(m.size / 1024).toFixed(0)} KB
                </span>
                <button
                  onClick={async () => {
                    if (!confirm(`Excluir ${m.filename}?`)) return;
                    await deleteMaterial(m);
                    await onChanged();
                  }}
                  className="flex size-6 items-center justify-center text-white/40 transition hover:text-red-400"
                  aria-label="Excluir"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
        {busy && (
          <div className="flex items-center gap-2 border-t border-white/10 px-3 py-2">
            <Loader2 className="size-3 animate-spin text-white/60" />
            <span className="text-[10px] text-white/60">
              Enviando {uploading} de {total}…
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

