import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { mergeIdentities, prepareIdentity } from "./identity-catalog";

describe("new identities", () => {
  test("creates a program in the program category", () => {
    assert.deepEqual(prepareIdentity("Novo Programa", "programas", []), { name: "NOVO PROGRAMA", slug: "novo-programa", category: "programas" });
  });
  test("creates a competition in the competition category", () => {
    const identity = prepareIdentity("Nova Competição", "competicoes", []);
    assert.deepEqual(mergeIdentities([identity]).find((item) => item.slug === "nova-competicao"), { name: "NOVA COMPETIÇÃO", slug: "nova-competicao", category: "competicoes" });
  });
  test("rejects an existing identity name", () => {
    assert.throws(() => prepareIdentity("  GERAL CAZÉTV ", "programas", mergeIdentities([])));
  });
  test("rejects empty names", () => {
    assert.throws(() => prepareIdentity("   ", "competicoes", []));
  });
});