import { identities, slugify, type Identity, type IdentityCategory } from "@/data/identities";

export function mergeIdentities(custom: Identity[]): Identity[] {
  const existing = new Set(identities.map((identity) => identity.slug));
  return [...identities, ...custom.filter((identity) => !existing.has(identity.slug))];
}

export function prepareIdentity(name: string, category: IdentityCategory, catalog: Identity[]): Identity {
  const normalized = name.trim().replace(/\s+/g, " ").toUpperCase();
  const slug = slugify(normalized);
  if (!slug) throw new Error("DIGITE UM NOME VÁLIDO PARA A IDENTIDADE.");
  if (catalog.some((identity) => identity.slug === slug)) {
    throw new Error("JÁ EXISTE UMA IDENTIDADE COM ESSE NOME.");
  }
  return { name: normalized, slug, category };
}