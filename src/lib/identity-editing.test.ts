import { test } from "node:test";
import assert from "node:assert/strict";
import { IDENTITY_EDITING_ENABLED, assertIdentityEditingEnabled } from "./identity-editing";

test("identity editing remains temporarily blocked until the owner requests reactivation", () => {
  assert.equal(IDENTITY_EDITING_ENABLED, false);
  assert.throws(assertIdentityEditingEnabled, /TEMPORARIAMENTE BLOQUEADA/);
});