/**
 * Export sesión 2 (Claude Architect) to PDF — one page per slide,
 * with reveal / stagger transitions already in their final visible state.
 *
 * Intended as pre-talk handout material.
 *
 * Usage:
 *   npm run dev   (http://localhost:8080)
 *   npm run export:pdf:sesion-02
 *
 * Options:
 *   --base-url http://localhost:8080
 *   --out exports/sesion-02-multi-agent-agentic-rag.pdf
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const STORAGE_KEY = "slide-index-sesion-02";
const ROUTE = "/sesion-02";
const WIDTH = 1920;
const HEIGHT = 1080;
const SLIDE_COUNT = 32;

function parseArgs(argv) {
  const args = {
    baseUrl: "http://localhost:8080",
    out: "exports/sesion-02-multi-agent-agentic-rag.pdf",
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--base-url" && argv[i + 1]) args.baseUrl = argv[i + 1];
    if (argv[i] === "--out" && argv[i + 1]) args.out = argv[i + 1];
  }
  return args;
}

async function hideChromeAndSettleReveals(page) {
  await page.addStyleTag({
    content: `
      .absolute.bottom-0.left-0.right-0 { display: none !important; }
      button[aria-label="anterior"], button[aria-label="siguiente"] { display: none !important; }
      .fixed.inset-0 .absolute.inset-0 {
        opacity: 1 !important;
        transform: none !important;
        filter: none !important;
      }
      /* RevealItem / StatementSlide (framer-motion): already fully visible.
         Do not target .slide-content itself — it uses transform: scale(). */
      .slide-content div[style*="opacity"],
      .slide-content div[style*="filter"],
      .slide-content div[style*="blur"] {
        opacity: 1 !important;
        filter: none !important;
        transform: none !important;
      }
    `,
  });
}

async function navigateToSlide(page, url, slideIndex) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  await page.evaluate(
    ({ storageKey, index }) => {
      localStorage.setItem(storageKey, String(index));
    },
    { storageKey: STORAGE_KEY, index: slideIndex },
  );
  await page.reload({ waitUntil: "networkidle", timeout: 120_000 });
  await hideChromeAndSettleReveals(page);
  await page.waitForSelector(".slide-content", { timeout: 30_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);
}

async function screenshotSlide(page, pngPath) {
  await page.locator(".slide-content").screenshot({ path: pngPath, type: "png" });
}

async function captureDeck(page, url, tmpDir) {
  const pngPaths = [];

  for (let i = 0; i < SLIDE_COUNT; i++) {
    await navigateToSlide(page, url, i);
    const pngPath = path.join(tmpDir, `${String(i + 1).padStart(2, "0")}.png`);
    await screenshotSlide(page, pngPath);
    pngPaths.push(pngPath);
    console.log(`  ✓ Slide ${i + 1}/${SLIDE_COUNT}`);
  }

  return pngPaths;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const outPath = path.resolve(root, args.out);
  const tmpDir = path.resolve(root, ".export-tmp-sesion-02");
  const url = `${args.baseUrl.replace(/\/$/, "")}${ROUTE}`;

  await rm(tmpDir, { recursive: true, force: true });
  await mkdir(tmpDir, { recursive: true });
  await mkdir(path.dirname(outPath), { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: "reduce" });

  console.log(`Exportando sesión 2 (${SLIDE_COUNT} páginas, reveals finales) desde ${url}\n`);

  const pngPaths = await captureDeck(page, url, tmpDir);

  await browser.close();

  const pdfDoc = await PDFDocument.create();
  for (const pngPath of pngPaths) {
    const pngBytes = await readFile(pngPath);
    const image = await pdfDoc.embedPng(pngBytes);
    const pdfPage = pdfDoc.addPage([WIDTH, HEIGHT]);
    pdfPage.drawImage(image, { x: 0, y: 0, width: WIDTH, height: HEIGHT });
  }

  const pdfBytes = await pdfDoc.save();

  try {
    await writeFile(outPath, pdfBytes);
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && err.code === "EBUSY") {
      const altPath = outPath.replace(/\.pdf$/i, "-nuevo.pdf");
      await writeFile(altPath, pdfBytes);
      console.log(`\nEl PDF anterior está abierto. Guardado como:\n${altPath}`);
      await rm(tmpDir, { recursive: true, force: true });
      return;
    }
    throw err;
  }

  const publicPath = path.resolve(root, "public/sesion-02.pdf");
  await mkdir(path.dirname(publicPath), { recursive: true });
  await writeFile(publicPath, pdfBytes);

  await rm(tmpDir, { recursive: true, force: true });

  console.log(`\nPDF listo (${pngPaths.length} páginas): ${outPath}`);
  console.log(`Copia pública: ${publicPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
