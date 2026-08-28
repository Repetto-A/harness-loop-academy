/**
 * Captura PNG de cada slide de los decks sesion-02 / sesion-03 / sesion-05
 * y arma un PDF por deck. Basado en export-deck-pdf-harness-05.mjs.
 *
 * Uso: npm run dev  →  node scripts/capture-sesiones.mjs [--out-dir exports/sesiones]
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const WIDTH = 1920;
const HEIGHT = 1080;
const BASE_URL = "http://localhost:8080";

const DECKS = [
  { route: "/sesion-02", storageKey: "slide-index-sesion-02", count: 32, name: "sesion-02" },
  { route: "/sesion-03", storageKey: "slide-index-sesion-03", count: 33, name: "sesion-03" },
  { route: "/sesion-05", storageKey: "slide-index-sesion-05", count: 35, name: "sesion-05" },
];

const outDirArg = process.argv.indexOf("--out-dir");
const OUT_DIR = path.resolve(root, outDirArg > -1 ? process.argv[outDirArg + 1] : "exports/sesiones");

const onlyArg = process.argv.indexOf("--only");
const ONLY = onlyArg > -1 ? process.argv[onlyArg + 1] : null;

async function hideChrome(page) {
  await page.addStyleTag({
    content: `
      .absolute.bottom-0.left-0.right-0 { display: none !important; }
      button[aria-label="anterior"], button[aria-label="siguiente"] { display: none !important; }
      .fixed.inset-0 .absolute.inset-0 { opacity: 1 !important; transform: none !important; }
    `,
  });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const deck of DECKS) {
    if (ONLY && deck.name !== ONLY) continue;
    const deckDir = path.join(OUT_DIR, deck.name);
    await mkdir(deckDir, { recursive: true });
    const pngPaths = [];
    const url = `${BASE_URL}${deck.route}`;

    for (let i = 0; i < deck.count; i++) {
      await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
      await page.evaluate(
        ({ storageKey, index }) => localStorage.setItem(storageKey, String(index)),
        { storageKey: deck.storageKey, index: i },
      );
      await page.reload({ waitUntil: "networkidle", timeout: 120_000 });
      await hideChrome(page);
      await page.waitForSelector(".slide-content", { timeout: 30_000 });
      await page.waitForTimeout(450);
      const pngPath = path.join(deckDir, `${String(i + 1).padStart(2, "0")}.png`);
      await page.locator(".slide-content").screenshot({ path: pngPath, type: "png" });
      pngPaths.push(pngPath);
      console.log(`  ${deck.name} · slide ${i + 1}/${deck.count}`);
    }

    const pdfDoc = await PDFDocument.create();
    for (const p of pngPaths) {
      const image = await pdfDoc.embedPng(await readFile(p));
      const pdfPage = pdfDoc.addPage([WIDTH, HEIGHT]);
      pdfPage.drawImage(image, { x: 0, y: 0, width: WIDTH, height: HEIGHT });
    }
    const pdfPath = path.join(OUT_DIR, `${deck.name}.pdf`);
    await writeFile(pdfPath, await pdfDoc.save());
    console.log(`PDF listo: ${pdfPath}`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
