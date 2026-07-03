/**
 * Export harness-05 to PDF — one page per slide, animations in final state.
 *
 * Usage:
 *   npm run dev   (http://localhost:8080)
 *   node scripts/export-deck-pdf-harness-05.mjs
 *
 * Options:
 *   --base-url http://localhost:8080
 *   --out exports/encuentro-05-codebase-intelligence.pdf
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const STORAGE_KEY = "slide-index-harness-05";
const ROUTE = "/harness-05";
const WIDTH = 1920;
const HEIGHT = 1080;
const SLIDE_COUNT = 32;

/** 0-based index → number of "next" presses to reach final step state */
const STEP_SLIDES = {
  5: 7, // c5-context-levels
  11: 2, // c5-cag
};

function parseArgs(argv) {
  const args = {
    baseUrl: "http://localhost:8080",
    out: "exports/encuentro-05-codebase-intelligence.pdf",
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--base-url" && argv[i + 1]) args.baseUrl = argv[i + 1];
    if (argv[i] === "--out" && argv[i + 1]) args.out = argv[i + 1];
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

async function navigateToSlide(page, url, slideIndex) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  await page.evaluate(
    ({ storageKey, index }) => {
      localStorage.setItem(storageKey, String(index));
    },
    { storageKey: STORAGE_KEY, index: slideIndex },
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

async function screenshotSlide(page, pngPath) {
  await page.locator(".slide-content").screenshot({ path: pngPath, type: "png" });
}

async function captureHarness05(page, url, tmpDir) {
  const pngPaths = [];

  for (let i = 0; i < SLIDE_COUNT; i++) {
    await navigateToSlide(page, url, i);

    const steps = STEP_SLIDES[i];
    if (steps) await advanceSteps(page, steps);

    await page.waitForTimeout(400);

    const pngPath = path.join(tmpDir, `${String(i + 1).padStart(2, "0")}.png`);
    await screenshotSlide(page, pngPath);
    pngPaths.push(pngPath);

    const stepNote = steps ? ` · step ${steps}` : "";
    console.log(`  ✓ Slide ${i + 1}/${SLIDE_COUNT}${stepNote}`);
  }

  return pngPaths;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const outPath = path.resolve(root, args.out);
  const tmpDir = path.resolve(root, ".export-tmp-h05");
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

  console.log(`Exportando harness-05 (${SLIDE_COUNT} páginas) desde ${url}\n`);

  const pngPaths = await captureHarness05(page, url, tmpDir);

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

  await rm(tmpDir, { recursive: true, force: true });

  console.log(`\nPDF listo (${pngPaths.length} páginas): ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
