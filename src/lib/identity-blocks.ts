import { supabase } from "@/integrations/supabase/client";
import { assertIdentityEditingEnabled } from "@/lib/identity-editing";

export type IdentityBlock = {
  id: string;
  identity_slug: string;
  position: number;
  type: "slide" | "text";
  image_url: string | null;
  text_content: string | null;
  preserve_ratio: boolean;
  natural_size: boolean;
  created_at: string;
  updated_at: string;
};

const TABLE = "identity_blocks";
const BUCKET = "identity-slides";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = () => (supabase as any).from(TABLE);

export async function listBlocks(slug: string): Promise<IdentityBlock[]> {
  const { data, error } = await db()
    .select("*")
    .eq("identity_slug", slug)
    .order("position", { ascending: true });
  if (error) throw error;
  return (data ?? []) as IdentityBlock[];
}

export async function createBlock(
  input: Partial<IdentityBlock> & { identity_slug: string; type: "slide" | "text"; position: number },
): Promise<IdentityBlock> {
  assertIdentityEditingEnabled();
  const { data, error } = await db().insert(input).select().single();
  if (error) throw error;
  return data as IdentityBlock;
}

export async function updateBlock(
  id: string,
  patch: Partial<IdentityBlock>,
): Promise<void> {
  assertIdentityEditingEnabled();
  const { error } = await db().update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteBlock(id: string): Promise<void> {
  assertIdentityEditingEnabled();
  const { error } = await db().delete().eq("id", id);
  if (error) throw error;
}

export async function reorderBlocks(
  items: { id: string; position: number }[],
): Promise<void> {
  assertIdentityEditingEnabled();
  // Sequential updates — small lists, fine in client.
  for (const it of items) {
    const { error } = await db().update({ position: it.position }).eq("id", it.id);
    if (error) throw error;
  }
}

// Private bucket — we use long-lived signed URLs (~10 years).
const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 10;

export async function uploadSlideImage(
  slug: string,
  file: File,
): Promise<string> {
  assertIdentityEditingEnabled();
  const ext = file.name.split(".").pop() ?? "png";
  const path = `${slug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL);
  if (signErr) throw signErr;
  return data.signedUrl;
}
