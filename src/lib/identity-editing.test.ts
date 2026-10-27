import { test } from "node:test";
import assert from "node:assert/strict";
import { IDENTITY_EDITING_ENABLED, assertIdentityEditingEnabled } from "./identity-editing";

test("identity editing is enabled as requested by the owner", () => {
  assert.equal(IDENTITY_EDITING_ENABLED, true);
  assert.doesNotThrow(assertIdentityEditingEnabled);
});
