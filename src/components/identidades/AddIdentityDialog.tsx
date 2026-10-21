import { useState, type FormEvent } from "react";
import { Plus, Loader2 } from "lucide-react";
import type { Identity, IdentityCategory } from "@/data/identities";
import { prepareIdentity } from "@/lib/identity-catalog";
import { IDENTITY_EDITING_ENABLED, assertIdentityEditingEnabled } from "@/lib/identity-editing";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Props {
  category: IdentityCategory;
  catalog: Identity[];
  onCreated: (identity: Identity) => void;
}

export function AddIdentityDialog({ category, catalog, onCreated }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(category);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setError("");
    setSaving(true);
    try {
      assertIdentityEditingEnabled();
      const identity = prepareIdentity(name, selected, catalog);
      const { error: insertError } = await supabase.from("custom_identities").insert(identity);
      if (insertError) {
        if (insertError.code === "23505") throw new Error("JÁ EXISTE UMA IDENTIDADE COM ESSE NOME.");
        throw new Error("NÃO FOI POSSÍVEL CRIAR A IDENTIDADE. TENTE NOVAMENTE.");
      }
      setOpen(false);
      onCreated(identity);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "NÃO FOI POSSÍVEL CRIAR A IDENTIDADE.");
    } finally {
      setSaving(false);
    }
  }

  if (!IDENTITY_EDITING_ENABLED) return null;

  return <>
    <Button variant="outline" className="h-10 rounded-none border-foreground/30 bg-background/80 text-[11px] uppercase" onClick={() => {
      setName(""); setSelected(category); setError(""); setOpen(true);
    }}><Plus aria-hidden="true" />NOVA IDENTIDADE</Button>
    <Dialog open={open} onOpenChange={(value) => { if (!saving) setOpen(value); }}>
      <DialogContent className="w-[calc(100%-2rem)] rounded-none border-foreground/30 sm:rounded-none">
        <DialogTitle className="font-display text-3xl font-normal tracking-normal">NOVA IDENTIDADE</DialogTitle>
        <DialogDescription className="sr-only">Adicionar programa ou competição</DialogDescription>
        <form onSubmit={submit} className="space-y-6">
          <div role="tablist" aria-label="Categoria da nova identidade" className="flex border-b border-foreground/30">
            {([{ id: "programas", label: "PROGRAMAS" }, { id: "competicoes", label: "COMPETIÇÕES" }] as const).map((item) =>
              <Button key={item.id} type="button" role="tab" aria-selected={selected === item.id} variant={selected === item.id ? "default" : "ghost"} className="flex-1 rounded-none text-[11px]" disabled={saving} onClick={() => setSelected(item.id)}>{item.label}</Button>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="new-identity-name" className="text-[11px] text-muted-foreground">NOME DA IDENTIDADE</label>
            <Input id="new-identity-name" value={name} onChange={(event) => setName(event.target.value)} required disabled={saving} className="h-11 rounded-none border-foreground/30 text-sm uppercase" autoComplete="off" />
          </div>
          {error && <p role="alert" className="text-xs text-foreground">{error}</p>}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" className="rounded-none text-[11px]" disabled={saving} onClick={() => setOpen(false)}>CANCELAR</Button>
            <Button type="submit" className="rounded-none text-[11px]" disabled={saving}>{saving ? <Loader2 className="animate-spin" /> : <Plus />} {saving ? "CRIANDO…" : "CRIAR IDENTIDADE"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </>;
}