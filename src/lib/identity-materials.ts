import { supabase } from "@/integrations/supabase/client";

export type MaterialKind = "logo" | "asset" | "fonte";

export type IdentityMaterial = {
  id: string;
  identity_slug: string;
  kind: MaterialKind;
  file_url: string;
  storage_path: string;
  filename: string;
  size: number;
  content_type: string | null;
  position: number;
  folder: string;
  created_at: string;
  updated_at: string;
};


const TABLE = "identity_materials";
const BUCKET = "identity-slides"; // reuse existing bucket
const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 10;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = () => (supabase as any).from(TABLE);

export async function listMaterials(slug: string): Promise<IdentityMaterial[]> {
  const { data, error } = await db()
    .select("*")
    .eq("identity_slug", slug)
    .order("kind", { ascending: true })
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as IdentityMaterial[];
}

export async function uploadMaterial(
  slug: string,
  kind: MaterialKind,
  file: File,
  folder: string = "",
): Promise<IdentityMaterial> {
  const safeName = file.name.replace(/[^\w.\-]+/g, "_");
  const safeFolder = folder.replace(/[^\w\- ]+/g, "_").trim();
  const folderSeg = safeFolder ? `${safeFolder}/` : "";
  const path = `materials/${slug}/${kind}/${folderSeg}${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}-${safeName}`;
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (upErr) throw upErr;
  const { data: signed, error: signErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL);
  if (signErr) throw signErr;

  const { data, error } = await db()
    .insert({
      identity_slug: slug,
      kind,
      file_url: signed.signedUrl,
      storage_path: path,
      filename: file.name,
      size: file.size,
      content_type: file.type || null,
      position: 0,
      folder: safeFolder,
    })
    .select()
    .single();
  if (error) throw error;
  return data as IdentityMaterial;
}


export async function deleteMaterial(m: IdentityMaterial): Promise<void> {
  await supabase.storage.from(BUCKET).remove([m.storage_path]).catch(() => {});
  const { error } = await db().delete().eq("id", m.id);
  if (error) throw error;
}
