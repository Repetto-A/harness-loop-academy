import { cpSync, rmSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { chdir } from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appRoot = join(root, "_ref-smart-prompts");
const appDist = join(appRoot, "dist");
const outDist = join(root, "dist");
const indexPath = join(outDist, "client", "index.html");

rmSync(outDist, { recursive: true, force: true });
cpSync(appDist, outDist, { recursive: true });

// SSR solo en build time (node_modules disponibles) → index.html estático para Vercel.
chdir(appRoot);
const { default: server } = await import(
  pathToFileURL(join(appRoot, "dist/server/server.js")).href
);
const response = await server.fetch(new Request("https://localhost/"), {}, {});

if (!response.ok) {
  throw new Error(`No se pudo generar index.html (HTTP ${response.status})`);
}

const html = await response.text();
writeFileSync(indexPath, html);

console.log(`Vercel: dist/client listo con index.html (${html.length} bytes)`);
