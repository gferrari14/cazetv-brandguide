import { test } from "node:test";
import assert from "node:assert/strict";
import { isAllowedSiteEmail, safeRedirectPath } from "./site-access";

test("company Google accounts (@livemode.com) can enter", () => {
  assert.equal(isAllowedSiteEmail("gferrari@livemode.com"), true);
  assert.equal(isAllowedSiteEmail("Alguem@LiveMode.com"), true);
});

test("other email domains are refused", () => {
  assert.equal(isAllowedSiteEmail("alguem@gmail.com"), false);
  assert.equal(isAllowedSiteEmail("alguem@livemode.com.br"), false);
  assert.equal(isAllowedSiteEmail("alguem@fake-livemode.com"), false);
  assert.equal(isAllowedSiteEmail(null), false);
});

test("post-login redirect stays on the site", () => {
  assert.equal(safeRedirectPath("/identidades"), "/identidades");
  assert.equal(safeRedirectPath("https://evil.com"), "/");
  assert.equal(safeRedirectPath("//evil.com"), "/");
});
