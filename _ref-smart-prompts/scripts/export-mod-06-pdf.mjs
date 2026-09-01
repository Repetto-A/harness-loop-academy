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
    "/mod-06",
    "--storage-key",
    "slide-index-mod-06",
    "--count",
    "15",
    "--eval-index",
    "-1",
    "--out",
    path.resolve(__dirname, "../../online-course/exports/modulo-06-deepseek-oss.pdf"),
  ],
  { stdio: "inherit" },
);
