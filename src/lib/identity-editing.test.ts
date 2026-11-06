import { test } from "node:test";
import assert from "node:assert/strict";
import { IDENTITY_EDITING_ENABLED, assertIdentityEditingEnabled } from "./identity-editing";

test("identity editing is locked as requested by the owner", () => {
  assert.equal(IDENTITY_EDITING_ENABLED, false);
  assert.throws(assertIdentityEditingEnabled);
});
