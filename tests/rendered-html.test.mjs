import assert from "node:assert/strict";
import test from "node:test";

test("renders the Naturkosmetik landing page", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<html lang="de">/i);
  assert.match(html, /Natürlich gerührt – Rezeptbibliothek/);
  assert.match(html, /267 Einträgen/);
  assert.match(html, /naturkosmetik-hero-cool\.webp/);
  assert.match(html, /id="rezepte"/);
  assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1"/);
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "HTML IDs must be unique");
  const targets = new Set(ids);
  for (const [, target] of markup.matchAll(/href="#([^"]*)"/g)) {
    // Paginated recipe targets are resolved from the full registry in the client.
    assert.ok(target && (targets.has(target) || target.startsWith("rezept-")), `Missing navigation target: #${target}`);
  }
  assert.equal((markup.match(/class="recipe-disclosure"/g) ?? []).length, 12);
  assert.match(markup, /id="bibliothek"/);
  assert.match(markup, /255/);
  assert.match(markup, /Quellenverweise/);
  assert.match(markup, /<details class="mobile-menu"><summary/);
  assert.match(markup, /aria-label="Mobile Navigation"/);
  assert.match(markup, /Alle Pflegebereiche/);
  assert.match(markup, /Nächste Bibliotheksseite/);
  assert.match(markup, /for="recipe-query"/);
  assert.match(markup, /role="status" aria-live="polite"/);
  assert.doesNotMatch(markup, /href="(?:#|javascript:[^"]*)"/);
  assert.doesNotMatch(markup, /#videos|erprobte Rezepte/);
});
