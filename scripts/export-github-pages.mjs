import { copyFile, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const docs = path.join(root, "docs");
const client = path.join(root, "dist", "client");

await rm(docs, { recursive: true, force: true });
await mkdir(docs, { recursive: true });
await cp(client, docs, { recursive: true });

const workerUrl = pathToFileURL(path.join(root, "dist", "server", "index.js"));
workerUrl.searchParams.set("github-pages-export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("http://localhost/", {
    headers: { accept: "text/html" },
  }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Static export failed with status ${response.status}`);
}

const rewriteRootPaths = (source) =>
  source
    .replaceAll('"/assets/', '"./assets/')
    .replaceAll('\\"/assets/', '\\"./assets/')
    .replaceAll('href="/assets/', 'href="./assets/')
    .replaceAll('src="/assets/', 'src="./assets/')
    .replaceAll('"/favicon.svg"', '"./favicon.svg"')
    .replaceAll('\\"/favicon.svg\\"', '\\"./favicon.svg\\"')
    .replaceAll('href="/favicon.svg"', 'href="./favicon.svg"')
    .replaceAll('"/naturkosmetik-hero.png"', '"./naturkosmetik-hero.png"')
    .replaceAll('\\"/naturkosmetik-hero.png\\"', '\\"./naturkosmetik-hero.png\\"')
    .replaceAll('src="/naturkosmetik-hero.png"', 'src="./naturkosmetik-hero.png"')
    .replaceAll('href="/naturkosmetik-hero.png"', 'href="./naturkosmetik-hero.png"');

const html = rewriteRootPaths(await response.text());
await writeFile(path.join(docs, "index.html"), html);
await copyFile(path.join(docs, "index.html"), path.join(docs, "404.html"));
await writeFile(path.join(docs, ".nojekyll"), "");

const manifest = JSON.parse(await readFile(path.join(client, ".vite", "manifest.json"), "utf8"));
const pageBundle = Object.values(manifest).find((entry) => entry.src === "app/page.tsx")?.file;
if (pageBundle) {
  const bundlePath = path.join(docs, pageBundle);
  const bundle = await readFile(bundlePath, "utf8");
  await writeFile(
    bundlePath,
    bundle.replaceAll("`/naturkosmetik-hero.png`", "`./naturkosmetik-hero.png`"),
  );
}

console.log("GitHub Pages export created in docs/");
