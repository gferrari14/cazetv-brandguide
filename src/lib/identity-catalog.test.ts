import { describe, expect, test } from "bun:test";
import { mergeIdentities, prepareIdentity } from "./identity-catalog";

describe("new identities", () => {
  test("creates a program in the program category", () => {
    expect(prepareIdentity("Novo Programa", "programas", [])).toEqual({ name: "NOVO PROGRAMA", slug: "novo-programa", category: "programas" });
  });
  test("creates a competition in the competition category", () => {
    const identity = prepareIdentity("Nova Competição", "competicoes", []);
    expect(mergeIdentities([identity]).filter((item) => item.category === "competicoes")).toContainEqual({ name: "NOVA COMPETIÇÃO", slug: "nova-competicao", category: "competicoes" });
  });
  test("rejects an existing identity name", () => {
    expect(() => prepareIdentity("  GERAL CAZÉTV ", "programas", mergeIdentities([]))).toThrow();
  });
  test("rejects empty names", () => {
    expect(() => prepareIdentity("   ", "competicoes", [])).toThrow();
  });
});