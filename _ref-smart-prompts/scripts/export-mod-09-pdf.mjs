import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const script = path.join(__dirname, "export-mod-deck-pdf.mjs");

spawnSync(
  process.execPath,
  [
    script,
    "--route",
    "/mod-09",
    "--storage-key",
    "slide-index-mod-09",
    "--count",
    "14",
    "--step",
    "4:2",
    "--out",
    path.resolve(__dirname, "../../online-course/exports/modulo-09-arquitecturas.pdf"),
  ],
  { stdio: "inherit" },
);
