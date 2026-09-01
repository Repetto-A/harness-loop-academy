/**
 * Export genérico de decks del curso online (mod-06, mod-08, mod-09).
 *
 * Usage:
 *   npm run dev
 *   node scripts/export-mod-deck-pdf.mjs --route /mod-08 --storage-key slide-index-mod-08 --count 12 --out ../online-course/exports/modulo-08-cursor.pdf
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const WIDTH = 1920;
const HEIGHT = 1080;

function parseArgs(argv) {
  const args = {
    baseUrl: "http://localhost:8080",
    route: "",
    storageKey: "",
    count: 0,
    out: "exports/deck.pdf",
    evalIndex: -1,
    stepSlides: {},
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--base-url" && argv[i + 1]) args.baseUrl = argv[++i];
    else if (argv[i] === "--route" && argv[i + 1]) args.route = argv[++i];
    else if (argv[i] === "--storage-key" && argv[i + 1]) args.storageKey = argv[++i];
    else if (argv[i] === "--count" && argv[i + 1]) args.count = Number(argv[++i]);
    else if (argv[i] === "--out" && argv[i + 1]) args.out = argv[++i];
    else if (argv[i] === "--eval-index" && argv[i + 1]) args.evalIndex = Number(argv[++i]);
    else if (argv[i] === "--step" && argv[i + 1]) {
      const [idx, steps] = argv[++i].split(":").map(Number);
      args.stepSlides[idx] = steps;
    }
  }
  if (!args.route || !args.storageKey || !args.count) {
    console.error(
      "Requerido: --route /mod-XX --storage-key slide-index-mod-XX --count N [--out path] [--eval-index N]",
    );
    process.exit(1);
  }
  return args;
}

async function hideChrome(page) {
  await page.addStyleTag({
    content: `
      .absolute.bottom-0.left-0.right-0 { display: none !important; }
      button[aria-label="anterior"], button[aria-label="siguiente"] { display: none !important; }
      .fixed.inset-0 .absolute.inset-0 {
        opacity: 1 !important;
        transform: none !important;
      }
    `,
  });
}

async function navigateToSlide(page, url, storageKey, slideIndex) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  await page.evaluate(
    ({ key, index }) => {
      localStorage.setItem(key, String(index));
    },
    { key: storageKey, index: slideIndex },
  );
  await page.reload({ waitUntil: "networkidle", timeout: 120_000 });
  await hideChrome(page);
  await page.waitForSelector(".slide-content", { timeout: 30_000 });
  await page.waitForTimeout(500);
}

async function advanceSteps(page, count) {
  for (let i = 0; i < count; i++) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(350);
  }
}

async function runGoldenEval(page) {
  const runBtn = page.getByRole("button", { name: /Ejecutar evaluación/i });
  await runBtn.waitFor({ state: "visible", timeout: 10_000 });
  await runBtn.click();
  await page.getByRole("button", { name: /Correr de nuevo/i }).waitFor({
    state: "visible",
    timeout: 15_000,
  });
  await page.waitForTimeout(500);
}

async function screenshotSlide(page, pngPath) {
  await page.locator(".slide-content").screenshot({ path: pngPath, type: "png" });
}

async function captureDeck(page, url, args, tmpDir) {
  const pngPaths = [];

  for (let i = 0; i < args.count; i++) {
    await navigateToSlide(page, url, args.storageKey, i);

    if (args.stepSlides[i]) await advanceSteps(page, args.stepSlides[i]);
    if (i === args.evalIndex) await runGoldenEval(page);

    await page.waitForTimeout(400);

    const pngPath = path.join(tmpDir, `${String(i + 1).padStart(2, "0")}.png`);
    await screenshotSlide(page, pngPath);
    pngPaths.push(pngPath);

    const notes = [];
    if (args.stepSlides[i]) notes.push(`step ${args.stepSlides[i]}`);
    if (i === args.evalIndex) notes.push("eval");
    console.log(`  ✓ Slide ${i + 1}/${args.count}${notes.length ? ` · ${notes.join(", ")}` : ""}`);
  }

  return pngPaths;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const outPath = path.isAbsolute(args.out)
    ? args.out
    : path.resolve(root, args.out);
  const tmpDir = path.resolve(root, ".export-tmp");
  const url = `${args.baseUrl.replace(/\/$/, "")}${args.route}`;

  await rm(tmpDir, { recursive: true, force: true });
  await mkdir(tmpDir, { recursive: true });
  await mkdir(path.dirname(outPath), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });

  console.log(`Exportando ${args.route} (${args.count} páginas) desde ${url}\n`);

  const pngPaths = await captureDeck(page, url, args, tmpDir);
  await browser.close();

  const pdfDoc = await PDFDocument.create();
  for (const pngPath of pngPaths) {
    const pngBytes = await readFile(pngPath);
    const image = await pdfDoc.embedPng(pngBytes);
    const pdfPage = pdfDoc.addPage([WIDTH, HEIGHT]);
    pdfPage.drawImage(image, { x: 0, y: 0, width: WIDTH, height: HEIGHT });
  }

  const pdfBytes = await pdfDoc.save();
  await writeFile(outPath, pdfBytes);
  await rm(tmpDir, { recursive: true, force: true });

  console.log(`\nPDF listo (${pngPaths.length} páginas): ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
