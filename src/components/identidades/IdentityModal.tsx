import { useEffect, useMemo, useRef, useState } from "react";
import { X, Download, Plus, Type, Image as ImageIcon, Trash2, GripVertical, Pencil, Check, Replace, Loader2, FolderPlus, Upload } from "lucide-react";
import JSZip from "jszip";
import {
  type IdentityMaterial,
  type MaterialKind,
  deleteMaterial,
  listMaterials,
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

  const handleAddText = async (insertAfterIndex: number) => {
    const position = computePosition(blocks, insertAfterIndex);
    await createBlock({
      identity_slug: identity.slug,
      type: "text",
      position,
      text_content: "",
    });
    await refresh();
  };

  const handleAddSlide = async (insertAfterIndex: number, file: File) => {
    const url = await uploadSlideImage(identity.slug, file);
    const position = computePosition(blocks, insertAfterIndex);
    await createBlock({
      identity_slug: identity.slug,
      type: "slide",
      position,
      image_url: url,
      preserve_ratio: true,
      natural_size: false,
    });
    await refresh();
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
      className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-sm animate-in fade-in duration-200"
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
                <InsertBar onAddText={() => handleAddText(-1)} onAddSlide={(f) => handleAddSlide(-1, f)} />
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
                      onAddSlide={(f) => handleAddSlide(-1, f)}
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
                      onAddSlide={(f) => handleAddSlide(i, f)}
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
          {(ASSETS_BY_IDENTITY[identity.slug] ?? DEFAULT_ASSETS).map((a) => {
            const className =
              "group inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/80 transition hover:bg-white hover:text-black";
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
                {...(a.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : { download: true })}
                className={className}
              >
                <Download className="size-3" />
                {a.label}
              </a>
            );
          })}
        </div>
      </div>
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
        className="min-h-[140px] w-full resize-y border-2 border-dashed border-white/20 bg-white/[0.02] p-8 text-center text-lg font-light leading-relaxed text-white/90 outline-none placeholder:text-white/30 focus:border-white/60"
      />
    );
  }

  if (!value.trim()) return null;

  return (
    <div className="mx-auto max-w-[820px] px-4 py-10">
      <p className="whitespace-pre-wrap text-center text-base font-light leading-relaxed tracking-wide text-white/85 md:text-lg">
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

  const content = block.natural_size && block.image_url ? (
    <img src={block.image_url} alt="" className="block h-auto w-full" />
  ) : (
    <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden border-2 border-white/20 bg-gradient-to-br from-white/[0.06] to-white/[0.01]">
      {block.image_url ? (
        <img
          src={block.image_url}
          alt=""
          className={`h-full w-full ${block.preserve_ratio ? "object-contain" : "object-cover"}`}
        />
      ) : (
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">Sem imagem</span>
      )}
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
  onAddSlide: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    setBusy(true);
    try {
      await onAddSlide(file);
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
        className="hidden"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />
      <div className="h-px flex-1 bg-white/15" />
      <Plus className="size-3 text-white/30" />
    </div>
  );
}
