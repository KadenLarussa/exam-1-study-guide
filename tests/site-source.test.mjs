import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("builds the GitHub Pages entry", async () => {
  const html = await readFile(new URL("../pages-dist/index.html", import.meta.url), "utf8");
  assert.match(html, /Paramedic Exam 1 Practice/);
  assert.match(html, /<div id="root"><\/div>/);
});

test("keeps the requested study controls and references", async () => {
  const [page, data] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/studyData.ts", import.meta.url), "utf8"),
  ]);
  assert.match(page, /Question weights/);
  assert.match(page, /Number of questions/);
  assert.match(page, /Hint:/);
  assert.match(data, /Fentanyl/);
  assert.match(data, /analysis of variance \(ANOVA\)/);
});

