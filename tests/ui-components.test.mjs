import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true },
});

after(async () => {
  await vite.close();
});

async function readCssTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const contents = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return readCssTree(entryPath);
      }
      return entry.name.endsWith(".css") ? readFile(entryPath, "utf8") : "";
    }),
  );
  return contents.join("\n");
}

test("emits the site's responsive brand styles", async () => {
  const css = await readCssTree(path.join(root, "dist"));

  assert.match(css, /\.site-header/);
  assert.match(css, /\.hero-visual/);
  assert.match(css, /\.recipe-grid/);
  assert.match(css, /@media\s*\(width<=760px\)/);
  assert.match(css, /@media\s*\(width<=900px\)/);
  assert.match(css, /@media\s*\(width<=520px\)/);
  assert.match(css, /\.mobile-menu\{display:block\}/);
  assert.match(css, /\.recipe-grid\{grid-template-columns:1fr\}/);
  assert.match(css, /prefers-reduced-motion/);
});

test("provides twelve complete recipes, three per requested category", async () => {
  const { recipes, categories } = await vite.ssrLoadModule("/lib/recipes.ts");
  assert.equal(recipes.length, 12);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 12);
  assert.deepEqual(categories, ["Alle", "Gesicht", "Haare", "Körper", "Lippen & Hände"]);
  for (const category of categories.slice(1)) {
    assert.equal(recipes.filter((recipe) => recipe.category === category).length, 3, category);
  }
  for (const recipe of recipes) {
    assert.match(recipe.id, /^[a-z0-9-]+$/);
    assert.equal(recipe.ingredients.reduce((sum, ingredient) => sum + ingredient.grams, 0), recipe.yieldGrams, recipe.title);
    assert.ok(recipe.ingredients.every((ingredient) => ingredient.grams > 0 && ingredient.name.length > 4));
    assert.ok(recipe.steps.length >= 3 && recipe.steps.every((step) => step.length > 20));
    assert.ok(recipe.equipment && recipe.use && recipe.caution && recipe.minutes > 0);
  }
  assert.equal(recipes.filter((recipe) => recipe.fresh).length, 1);
});

test("filters categories and searches titles or ingredients without case or accent sensitivity", async () => {
  const { filterRecipes } = await vite.ssrLoadModule("/lib/recipes.ts");
  assert.equal(filterRecipes("Alle", "  ").length, 12);
  assert.equal(filterRecipes("Lippen & Hände", "").length, 3);
  assert.equal(filterRecipes("Haare", "  JOJOBA  ").length, 3);
  assert.deepEqual(filterRecipes("Alle", "HAFER").map((recipe) => recipe.id), ["hafer-maske"]);
  assert.deepEqual(filterRecipes("Alle", "korper kakao").map((recipe) => recipe.id), ["shea-koerperbutter", "feste-koerperpflege"]);
  assert.equal(filterRecipes("Gesicht", "Candelillawachs").length, 0);
  assert.equal(filterRecipes("Alle", "nichtvorhanden").length, 0);
});

test("forwards progress semantics to the primitive", async () => {
  const { Progress } = await vite.ssrLoadModule("/components/ui/progress.tsx");
  const html = renderToStaticMarkup(React.createElement(Progress, { value: 37 }));

  assert.match(html, /aria-valuenow="37"/);
  assert.match(html, /aria-valuetext="37%"/);
  assert.match(html, /data-state="loading"/);
});

test("emits chart themes for the starter's media dark mode", async () => {
  const { ChartStyle } = await vite.ssrLoadModule("/components/ui/chart.tsx");
  const html = renderToStaticMarkup(
    React.createElement(ChartStyle, {
      id: "contract",
      config: {
        latency: { theme: { light: "#ffffff", dark: "#000000" } },
      },
    }),
  );

  assert.match(html, /\[data-chart=contract\]/);
  assert.match(html, /@media \(prefers-color-scheme: dark\)/);
  assert.doesNotMatch(html, /\.dark/);
});

test("renders sidebar skeletons deterministically", async () => {
  const { SidebarMenuSkeleton } = await vite.ssrLoadModule(
    "/components/ui/sidebar.tsx",
  );
  const first = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));
  const second = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));

  assert.equal(first, second);
  assert.match(first, /--skeleton-width:70%/);
});
