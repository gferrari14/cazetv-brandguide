export type IdentityCategory = "programas" | "competicoes";

export interface Identity {
  slug: string;
  name: string;
  category: IdentityCategory;
}

const slugify = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const programasNames = [
  "GERAL CAZÉTV",
  "BORA COPAR",
  "JÁ É COPA",
  "COPEIROS",
  "AQUI É BRASIL",
  "NOCHE DE COPA",
  "DESTRINCHA DONAN",
  "BR-360",
  "RECOPANDO",
  "RODA DE BOBO",
  "UM DIA COM",
  "COPAZONA",
  "LIVE CAZÉTV",
];

const competicoesNames = [
  "BRASILEIRÃO",
  "PAULISTÃO",
  "COPA DAVIS",
  "MUTIRÃO OLÍMPICO",
  "COPA ACERJ",
  "FUTEBOL INTERNACIONAL",
];

export const identities: Identity[] = [
  ...programasNames.map((name) => ({
    slug: slugify(name),
    name,
    category: "programas" as const,
  })),
  ...competicoesNames.map((name) => ({
    slug: slugify(name),
    name,
    category: "competicoes" as const,
  })),
];
