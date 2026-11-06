import { supabase } from "@/integrations/supabase/client";
import type { Identity } from "@/data/identities";
import { mergeIdentities } from "@/lib/identity-catalog";

// Runs in the browser with the signed-in member's session (pages are client-only behind the gate).
export async function listIdentityCatalog(): Promise<Identity[]> {
  const { data, error } = await supabase.from("custom_identities")
    .select("slug,name,category").order("created_at", { ascending: true });
  if (error) throw error;
  const custom: Identity[] = [];
  for (const row of data ?? []) {
    if (row.category === "programas" || row.category === "competicoes") custom.push({ ...row, category: row.category });
  }
  return mergeIdentities(custom);
}
