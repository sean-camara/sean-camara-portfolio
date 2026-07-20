import assert from "node:assert/strict";
import test from "node:test";
import { markIntroSeen, shouldShowIntro } from "./intro.ts";

function memoryStore(initial?: string) {
  let value = initial ?? null;
  return {
    getItem: () => value,
    setItem: (_key: string, next: string) => { value = next; },
  };
}

test("shows once per session", () => {
  const store = memoryStore();
  assert.equal(shouldShowIntro(store, false), true);
  markIntroSeen(store);
  assert.equal(shouldShowIntro(store, false), false);
});

test("bypasses intro for reduced motion", () => {
  assert.equal(shouldShowIntro(memoryStore(), true), false);
});

test("fails safely when session storage is unavailable", () => {
  const store = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
  assert.equal(shouldShowIntro(store, false), true);
  assert.doesNotThrow(() => markIntroSeen(store));
});
