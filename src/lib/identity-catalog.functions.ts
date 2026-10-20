import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { Identity } from "@/data/identities";
import { mergeIdentities } from "@/lib/identity-catalog";

export const listIdentityCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  const url = process.env['SUPABASE_URL'];
  if (!key || !url) throw new Error("NÃO FOI POSSÍVEL CARREGAR AS IDENTIDADES.");
  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
      headers.set("apikey", key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.from("custom_identities")
    .select("slug,name,category").order("created_at", { ascending: true });
  if (error) throw error;
  const custom: Identity[] = [];
  for (const row of data ?? []) {
    if (row.category === "programas" || row.category === "competicoes") custom.push({ ...row, category: row.category });
  }
  return mergeIdentities(custom);
});