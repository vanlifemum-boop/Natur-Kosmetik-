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

test("imports every source recipe and all 1548 ingredient rows without duplicates", async () => {
  const { libraryEntries, libraryCounts, importMetadata, libraryCategories } = await vite.ssrLoadModule("/lib/library.ts");
  const source = JSON.parse(await readFile(path.join(root, "data/imported-recipes.json"), "utf8"));
  assert.equal(source.recipes.length, 255);
  assert.equal(new Set(source.recipes.map((entry) => entry.sourceUrl)).size, 255);
  assert.equal(importMetadata.ingredientRows, 1548);
  assert.equal(source.recipes.flatMap((entry) => entry.ingredients).filter((ingredient) => ingredient.quality === "Prüfen").length, 154);
  assert.deepEqual(libraryCounts, { all: 267, basis: 12, zutaten: 181, quelle: 74 });
  assert.equal(new Set(libraryEntries.map((entry) => entry.id)).size, 267);
  for (const entry of libraryEntries) {
    assert.ok(libraryCategories.includes(entry.category));
    if (entry.imported) {
      assert.deepEqual(entry.imported, source.recipes.find((recipe) => recipe.id === entry.id));
      const url = new URL(entry.imported.sourceUrl);
      assert.equal(url.protocol, "https:");
      assert.equal(url.hostname, "schwatzkatz.com");
    }
  }
});

test("library search, category/status combinations, sorting and empty results work", async () => {
  const { filterLibrary, defaultFilters, normalizeSearch } = await vite.ssrLoadModule("/lib/library.ts");
  assert.equal(filterLibrary(defaultFilters).length, 267);
  assert.equal(filterLibrary({ ...defaultFilters, status: "basis" }).length, 12);
  assert.equal(filterLibrary({ ...defaultFilters, category: "Haare", status: "basis" }).length, 3);
  assert.equal(filterLibrary({ ...defaultFilters, status: "quelle" }).length, 74);
  assert.equal(normalizeSearch("KÖRPER"), normalizeSearch("koerper"));
  assert.ok(filterLibrary({ ...defaultFilters, query: "  SONNENFLUID lichtschutzfaktor " }).some((entry) => entry.id === "sk-261"));
  assert.ok(filterLibrary({ ...defaultFilters, query: "Candelillawachs" }).some((entry) => entry.id === "aprikosen-lippenbalsam"));
  assert.equal(filterLibrary({ ...defaultFilters, query: "nichtvorhanden123" }).length, 0);
  const az = filterLibrary(defaultFilters).map((entry) => entry.id);
  const za = filterLibrary({ ...defaultFilters, sort: "za" }).map((entry) => entry.id);
  assert.deepEqual(za, [...az].reverse());
  assert.ok(filterLibrary({ ...defaultFilters, sort: "basis" }).slice(0, 12).every((entry) => entry.status === "basis"));
});

test("pagination covers all records exactly once and every deep link reveals its record", async () => {
  const { libraryEntries, defaultFilters, paginateLibrary, filtersForRecipe, recipeIdFromHash } = await vite.ssrLoadModule("/lib/library.ts");
  const first = paginateLibrary(defaultFilters);
  assert.equal(first.pages, 23);
  assert.equal(first.entries.length, 12);
  const visited = [];
  for (let page = 1; page <= first.pages; page++) visited.push(...paginateLibrary({ ...defaultFilters, page }).entries.map((entry) => entry.id));
  assert.equal(visited.length, 267);
  assert.equal(new Set(visited).size, 267);
  assert.equal(paginateLibrary({ ...defaultFilters, page: 999 }).page, 23);
  assert.equal(paginateLibrary({ ...defaultFilters, page: 23 }).entries.length, 3);
  assert.equal(paginateLibrary({ ...defaultFilters, page: -1 }).page, 1);
  for (const entry of libraryEntries) {
    assert.equal(recipeIdFromHash("#rezept-" + entry.id), entry.id);
    const settings = filtersForRecipe(entry.id, { ...defaultFilters, query: "no-matches", category: "Haare", page: 99 });
    assert.ok(paginateLibrary(settings).entries.some((item) => item.id === entry.id), entry.id);
  }
  assert.equal(recipeIdFromHash("#rezept-nicht-vorhanden"), null);
  const { default: Home } = await vite.ssrLoadModule("/app/page.tsx");
  const html = renderToStaticMarkup(React.createElement(Home));
  for (const [, hash] of html.matchAll(/href="(#rezept-[^"]+)"/g)) assert.ok(recipeIdFromHash(hash), hash);
});

test("source details retain phases and flag missing data, review rows and SPF claims", async () => {
  const { libraryEntries, ingredientGroups } = await vite.ssrLoadModule("/lib/library.ts");
  const { LibraryCard } = await vite.ssrLoadModule("/components/recipe-library-card.tsx");
  for (const entry of libraryEntries.filter((item) => item.imported)) {
    assert.equal(ingredientGroups(entry.imported).flatMap((group) => group.ingredients).length, entry.imported.ingredients.length);
  }
  const missing = libraryEntries.find((entry) => entry.id === "sk-268");
  const missingHtml = renderToStaticMarkup(React.createElement(LibraryCard, { entry: missing }));
  assert.match(missingHtml, /Keine Mengenangaben im Import/);
  assert.match(missingHtml, /Premium\/kein öffentlicher Rezeptblock/);
  assert.doesNotMatch(missingHtml, /class="recipe-steps"/);
  assert.match(missingHtml, /https:\/\/schwatzkatz.com\/tagescreme-gegen-trockene-haut\//);
  const lsf = libraryEntries.find((entry) => entry.id === "sk-121");
  assert.match(renderToStaticMarkup(React.createElement(LibraryCard, { entry: lsf })), /Kein zugesicherter UV-Schutz/);
  const review = libraryEntries.find((entry) => entry.imported?.ingredients.some((ingredient) => ingredient.quality === "Prüfen"));
  assert.match(renderToStaticMarkup(React.createElement(LibraryCard, { entry: review })), /Angabe prüfen/);
});

test("navigation performs one immediate page scroll and opens only requested recipe details", async () => {
  const { scrollToPageTarget, scrollTopForTarget, isPlainNavigationClick } = await vite.ssrLoadModule("/lib/scroll-navigation.ts");
  const disclosure = { open: false };
  const scrolls = [];
  const focuses = [];
  const target = { querySelector: () => disclosure, hasAttribute: () => false, setAttribute() {}, focus: (options) => focuses.push(options), getBoundingClientRect: () => ({ top: 400 }) };
  const header = { getBoundingClientRect: () => ({ height: 91 }) };
  const doc = { getElementById: () => target, querySelector: () => header };
  const win = { getComputedStyle: () => ({ position: "sticky" }), scrollY: 600, scrollTo: (options) => scrolls.push(options) };
  assert.equal(scrollToPageTarget("rezept-sk-261", doc, win), true);
  assert.equal(disclosure.open, true);
  assert.deepEqual(scrolls, [{ top: 893, left: 0, behavior: "auto" }]);
  assert.deepEqual(focuses, [{ preventScroll: true }]);
  disclosure.open = false;
  win.getComputedStyle = () => ({ position: "relative" });
  scrollToPageTarget("bibliothek", doc, win);
  assert.equal(disclosure.open, false);
  assert.equal(scrolls.at(-1).top, 984);
  assert.equal(scrollToPageTarget("missing", { getElementById: () => null }, win), false);
  assert.equal(scrolls.length, 2);
  assert.equal(scrollTopForTarget(-20, 0, 91), 0);
  const click = { button: 0, defaultPrevented: false, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false };
  assert.equal(isPlainNavigationClick(click), true);
  for (const key of ["defaultPrevented", "metaKey", "ctrlKey", "shiftKey", "altKey"]) assert.equal(isPlainNavigationClick({ ...click, [key]: true }), false);
  assert.equal(isPlainNavigationClick({ ...click, button: 1 }), false);
  const css = await readFile(path.join(root, "app/globals.css"), "utf8");
  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.doesNotMatch(css, /scroll-behavior:\s*smooth/);
  assert.match(css, /body, #app, \.site-shell \{[^}]*height: auto;[^}]*overflow: visible;[^}]*touch-action: auto/);
  assert.doesNotMatch(page, /addEventListener\(["'](?:wheel|touchmove|scroll)["']/);
  assert.doesNotMatch(page, /scrollIntoView|requestAnimationFrame/);
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
