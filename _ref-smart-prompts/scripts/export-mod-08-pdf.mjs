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
    "/mod-08",
    "--storage-key",
    "slide-index-mod-08",
    "--count",
    "12",
    "--out",
    path.resolve(__dirname, "../../online-course/exports/modulo-08-cursor.pdf"),
  ],
  { stdio: "inherit" },
);
