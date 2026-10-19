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
  assert.match(html, /Natürlich gerührt – Vegane Naturkosmetik/);
  assert.match(html, /Vegane Naturkosmetik selbst machen/);
  assert.match(html, /naturkosmetik-hero\.png/);
  assert.match(html, /id="rezepte"/);
});
