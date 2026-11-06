import { test } from "node:test";
import assert from "node:assert/strict";
import { shuffle } from "./shuffle";

test("shuffle keeps the same items", () => {
  const input = ["a", "b", "c", "d", "e"];
  const out = shuffle(input);
  assert.equal(out.length, 5);
  assert.deepEqual([...out].sort(), input);
});

test("shuffle reorders with a given random source", () => {
  assert.deepEqual(shuffle([1, 2, 3], () => 0), [2, 3, 1]);
});
