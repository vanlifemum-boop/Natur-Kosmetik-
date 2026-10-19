import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const docs = fileURLToPath(new URL("../docs/", import.meta.url));
const base = new URL("https://vanlifemum-boop.github.io/Natur-Kosmetik-/index.html");

test("exports assets relative to the GitHub Pages project, including hydration", async () => {
  const html = await readFile(path.join(docs, "index.html"), "utf8");
  assert.doesNotMatch(html, /(?:src|href)="\/(?!\/)/);
  const assets = [...html.matchAll(/(?:src|href)="(\.\/[^"?#]+)"/g)].map((match) => match[1]);
  assert.ok(assets.length >= 4, "Expected CSS, JS, favicon and hero references");
  for (const asset of new Set(assets)) {
    const resolved = new URL(asset, base);
    assert.ok(resolved.pathname.startsWith("/Natur-Kosmetik-/"), asset);
    await access(path.resolve(docs, asset));
  }
  assert.match(html, /<script type="module"[^>]+src="\.\/assets\/index-[\w-]+\.js"/);
  assert.doesNotMatch(html, /__VINEXT|<!--app-html-->/);
  assert.match(html, /<div id="app">/);
  assert.equal((html.match(/class="recipe-disclosure"/g) ?? []).length, 12);
  assert.match(html, /<details class="mobile-menu"><summary/);
  assert.match(html, /id="rezept-aprikosen-lippenbalsam"/);
  await access(path.join(docs, ".nojekyll"));
  assert.equal(await readFile(path.join(docs, "404.html"), "utf8"), html);
});

test("all manifest entries and JavaScript chunk imports exist in the export", async () => {
  const manifest = JSON.parse(await readFile(path.join(docs, ".vite/manifest.json"), "utf8"));
  for (const entry of Object.values(manifest)) {
    await access(path.join(docs, entry.file));
    for (const stylesheet of entry.css ?? []) await access(path.join(docs, stylesheet));
    for (const dependency of [...(entry.imports ?? []), ...(entry.dynamicImports ?? [])]) {
      assert.ok(manifest[dependency], `Missing manifest dependency: ${dependency}`);
      await access(path.join(docs, manifest[dependency].file));
    }
  }
  const assetDir = path.join(docs, "assets");
  for (const filename of await readdir(assetDir)) {
    if (!filename.endsWith(".js")) continue;
    const js = await readFile(path.join(assetDir, filename), "utf8");
    assert.doesNotMatch(js, /["'`]\/assets\//, `Root-relative asset in ${filename}`);
    for (const [, dependency] of js.matchAll(/["'`](\.\/[^"'`]+\.js)["'`]/g)) {
      await access(path.resolve(assetDir, dependency));
    }
  }
  const page = await readFile(path.join(docs, manifest["index.html"].file), "utf8");
  assert.match(page, /\.\/naturkosmetik-hero-cool\.webp/);
  assert.match(page, /hashchange/);
  assert.match(page, /scrollIntoView/);
  assert.doesNotMatch(page, /__VINEXT_RSC|text\/x-component/);
});
