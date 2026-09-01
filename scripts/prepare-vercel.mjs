import { cpSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const appDist = join(root, "_ref-smart-prompts", "dist");
const outDist = join(root, "dist");

rmSync(outDist, { recursive: true, force: true });
cpSync(appDist, outDist, { recursive: true });

console.log("Vercel: copied _ref-smart-prompts/dist -> dist/");
