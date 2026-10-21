import { supabase } from "@/integrations/supabase/client";
import { assertIdentityEditingEnabled } from "@/lib/identity-editing";

const EVENT = "identity-covers-changed";

export async function listCovers(): Promise<Record<string, string>> {
  const { data, error } = await supabase.from("identity_covers").select("identity_slug,image_url");
  if (error) throw error;
  return Object.fromEntries((data ?? []).map((r) => [r.identity_slug, r.image_url]));
}

export async function setCover(slug: string, imageUrl: string): Promise<void> {
  assertIdentityEditingEnabled();
  const { error } = await supabase
    .from("identity_covers")
    .upsert({ identity_slug: slug, image_url: imageUrl, updated_at: new Date().toISOString() });
  if (error) throw error;
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function onCoversChanged(cb: () => void): () => void {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}
