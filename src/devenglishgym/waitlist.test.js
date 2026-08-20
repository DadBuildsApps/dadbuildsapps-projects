import test from "node:test"
import assert from "node:assert/strict"
import { getViewport, isEmailValid, normalizeSource } from "./waitlist.js"

test("normalizeSource accepts only defined campaign sources", () => {
  assert.equal(normalizeSource("x"), "x")
  assert.equal(normalizeSource(" YouTube "), "youtube")
  assert.equal(normalizeSource("newsletter"), "unknown")
  assert.equal(normalizeSource(), "direct")
})

test("getViewport uses stable analytics buckets", () => {
  assert.equal(getViewport(390), "mobile")
  assert.equal(getViewport(768), "tablet")
  assert.equal(getViewport(1440), "desktop")
})

test("isEmailValid rejects malformed and oversized values", () => {
  assert.equal(isEmailValid("gaku@example.com"), true)
  assert.equal(isEmailValid("gaku example.com"), false)
  assert.equal(isEmailValid(`${"a".repeat(250)}@example.com`), false)
})
