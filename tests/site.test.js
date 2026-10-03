import test from "node:test";
import assert from "node:assert/strict";
import { isPaperclipDocument } from "../src/site.js";

function documentFixture({ marker = true, root = true } = {}) {
  return {
    querySelector(selector) {
      if (selector === 'meta[name="apple-mobile-web-app-title"][content="Paperclip"]') {
        return marker ? {} : null;
      }
      if (selector === "#root") return root ? {} : null;
      return null;
    },
  };
}

test("accepts a Paperclip document on localhost even with a custom title", () => {
  assert.equal(isPaperclipDocument(documentFixture(), new URL("http://localhost:3100/onboarding")), true);
});

test("accepts Paperclip on 127.0.0.1 with a different port", () => {
  assert.equal(isPaperclipDocument(documentFixture(), new URL("http://127.0.0.1:3101/")), true);
});

test("rejects a non-local Paperclip-looking page", () => {
  assert.equal(isPaperclipDocument(documentFixture(), new URL("https://example.com/")), false);
});

test("rejects a different localhost app with a root element", () => {
  assert.equal(isPaperclipDocument(documentFixture({ marker: false }), new URL("http://localhost:3100/")), false);
});

test("rejects localhost without the Paperclip app root", () => {
  assert.equal(isPaperclipDocument(documentFixture({ root: false }), new URL("http://localhost:3100/")), false);
});
