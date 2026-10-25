import { copyFile, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToString } from "react-dom/server";
import react from "@vitejs/plugin-react";
import { build, createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const docs = path.join(root, "docs");

// GitHub Pages has no RSC server. Build a standalone React client from the same
// Home component instead of shipping Vinext's server-dependent history router.
await build({
  configFile: false,
  root: path.join(root, "github-pages"),
  base: "./",
  publicDir: path.join(root, "public"),
  plugins: [react()],
  resolve: { alias: { "@": root } },
  build: {
    outDir: docs,
    emptyOutDir: true,
    manifest: true,
  },
});

// Render content ahead of time so links, mobile menu and recipe disclosures
// remain usable even before JavaScript arrives. Middleware mode opens no port.
const renderer = await createServer({
  configFile: false,
  appType: "custom",
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true, hmr: false, watch: null },
});
try {
  const { default: Home } = await renderer.ssrLoadModule("/app/page.tsx");
  const template = await readFile(path.join(docs, "index.html"), "utf8");
  if (!template.includes("<!--app-html-->")) throw new Error("Missing static render placeholder");
  const html = template.replace("<!--app-html-->", renderToString(React.createElement(Home)));
  await writeFile(path.join(docs, "index.html"), html);
  await copyFile(path.join(docs, "index.html"), path.join(docs, "404.html"));
  await writeFile(path.join(docs, ".nojekyll"), "");
} finally {
  await renderer.close();
}
console.log("Standalone GitHub Pages export created in docs/ (no RSC server required)");
