export interface Identity {
  slug: string;
  name: string;
}

export const identities: Identity[] = [
  { slug: "copa-do-mundo", name: "Copa do Mundo" },
  { slug: "libertadores", name: "Libertadores" },
  { slug: "champions-league", name: "Champions League" },
  { slug: "premier-league", name: "Premier League" },
  { slug: "la-liga", name: "La Liga" },
  { slug: "serie-a", name: "Serie A" },
  { slug: "brasileirao", name: "Brasileirão" },
  { slug: "copa-america", name: "Copa América" },
  { slug: "nba", name: "NBA" },
  { slug: "ufc", name: "UFC" },
  { slug: "formula-1", name: "Fórmula 1" },
  { slug: "olimpiadas", name: "Olimpíadas" },
];
