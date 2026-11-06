import { test } from "node:test";
import assert from "node:assert/strict";
import { assertIdentityEditingEnabled, canEditIdentities, setIdentityEditingAllowed } from "./identity-editing";

test("non-admin visitors cannot edit identities", () => {
  setIdentityEditingAllowed(false);
  assert.equal(canEditIdentities(), false);
  assert.throws(assertIdentityEditingEnabled);
});

test("administrators can edit identities", () => {
  setIdentityEditingAllowed(true);
  assert.equal(canEditIdentities(), true);
  assert.doesNotThrow(assertIdentityEditingEnabled);
  setIdentityEditingAllowed(false);
});
