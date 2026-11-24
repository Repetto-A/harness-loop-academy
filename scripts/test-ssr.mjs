import { join, dirname } from "node:path";
import { chdir } from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const appRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "_ref-smart-prompts");
chdir(appRoot);

const { default: server } = await import(pathToFileURL(join(appRoot, "dist/server/server.js")).href);

for (const path of ["/", "/sesion-02"]) {
  const res = await server.fetch(new Request(`https://example.com${path}`), {}, {});
  const text = await res.text();
  console.log(path, res.status, text.includes("Elegí") || text.includes("html"), text.length);
}
