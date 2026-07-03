/**
 * Export harness-04 to PDF with faithful captures of interactive slides.
 *
 * Usage:
 *   node scripts/export-deck-pdf.mjs
 *
 * Requires dev server: npm run dev (http://localhost:8080)
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const STORAGE_KEY = "slide-index-harness-04";
const ROUTE = "/harness-04";
const WIDTH = 1920;
const HEIGHT = 1080;

/** 0-based slide indices in deck-clase-04 */
const SLIDE = {
  EVAL: 12,
  ANON: 18,
};

const PII_KINDS = ["Nombre", "CUIT", "DNI", "Dirección", "Email", "Teléfono", "Monto"];

function parseArgs(argv) {
  const args = {
    baseUrl: "http://localhost:8080",
    out: "exports/encuentro-04-open-source.pdf",
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
  await page.waitForTimeout(700);
}

async function screenshotSlide(page, pngPath) {
  await page.locator(".slide-content").screenshot({ path: pngPath, type: "png" });
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

async function clickAnonStep(page, stepLabel) {
  await page.getByRole("button", { name: new RegExp(stepLabel, "i") }).click();
  await page.waitForTimeout(450);
}

async function selectAllPiiKinds(page) {
  for (const kind of PII_KINDS) {
    const chip = page.getByRole("button", { name: new RegExp(`^${kind}:`) });
    await chip.waitFor({ state: "visible", timeout: 10_000 });
    const isOff = await chip.evaluate((el) => el.className.includes("bg-surface"));
    if (isOff) await chip.click();
  }
  await page.waitForTimeout(300);
}

async function captureHarness04(page, url, tmpDir) {
  const pngPaths = [];
  let n = 0;

  const capture = async (slideIndex, label, setup) => {
    await navigateToSlide(page, url, slideIndex);
    if (setup) await setup(page);
    n += 1;
    const pngPath = path.join(tmpDir, `${String(n).padStart(2, "0")}.png`);
    await screenshotSlide(page, pngPath);
    pngPaths.push(pngPath);
    console.log(`  ✓ ${label}`);
  };

  for (let i = 0; i < SLIDE.EVAL; i++) {
    await capture(i, `Slide ${i + 1}`);
  }

  await capture(SLIDE.EVAL, `Slide ${SLIDE.EVAL + 1} · evaluación (ejecutada)`, runGoldenEval);

  for (let i = SLIDE.EVAL + 1; i < SLIDE.ANON; i++) {
    await capture(i, `Slide ${i + 1}`);
  }

  // Anonimizador: 4 capturas en una sola visita (estado acumulado)
  await navigateToSlide(page, url, SLIDE.ANON);
  await clickAnonStep(page, "1 · Detectar");
  n += 1;
  pngPaths.push(path.join(tmpDir, `${String(n).padStart(2, "0")}.png`));
  await screenshotSlide(page, pngPaths.at(-1));
  console.log(`  ✓ Slide ${SLIDE.ANON + 1} · anonimización · paso 1 Detectar`);

  await selectAllPiiKinds(page);
  await clickAnonStep(page, "2 · Anonimizar");
  n += 1;
  pngPaths.push(path.join(tmpDir, `${String(n).padStart(2, "0")}.png`));
  await screenshotSlide(page, pngPaths.at(-1));
  console.log(`  ✓ Slide ${SLIDE.ANON + 1} · anonimización · paso 2 Anonimizar`);

  await clickAnonStep(page, "3 · Enviar");
  n += 1;
  pngPaths.push(path.join(tmpDir, `${String(n).padStart(2, "0")}.png`));
  await screenshotSlide(page, pngPaths.at(-1));
  console.log(`  ✓ Slide ${SLIDE.ANON + 1} · anonimización · paso 3 Enviar`);

  await clickAnonStep(page, "4 · Re-hidratar");
  n += 1;
  pngPaths.push(path.join(tmpDir, `${String(n).padStart(2, "0")}.png`));
  await screenshotSlide(page, pngPaths.at(-1));
  console.log(`  ✓ Slide ${SLIDE.ANON + 1} · anonimización · paso 4 Re-hidratar`);

  for (let i = SLIDE.ANON + 1; i < 23; i++) {
    await capture(i, `Slide ${i + 1}`);
  }

  return pngPaths;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const outPath = path.resolve(root, args.out);
  const tmpDir = path.resolve(root, ".export-tmp");
  const url = `${args.baseUrl.replace(/\/$/, "")}${ROUTE}`;

  await rm(tmpDir, { recursive: true, force: true });
  await mkdir(tmpDir, { recursive: true });
  await mkdir(path.dirname(outPath), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });

  console.log(`Exportando harness-04 (26 páginas) desde ${url}\n`);

  const pngPaths = await captureHarness04(page, url, tmpDir);

  await browser.close();

  const pdfDoc = await PDFDocument.create();
  for (const pngPath of pngPaths) {
    const pngBytes = await readFile(pngPath);
    const image = await pdfDoc.embedPng(pngBytes);
    const pdfPage = pdfDoc.addPage([WIDTH, HEIGHT]);
    pdfPage.drawImage(image, { x: 0, y: 0, width: WIDTH, height: HEIGHT });
  }

  const pdfBytes = await pdfDoc.save();
  const tmpPdf = path.join(tmpDir, "deck.pdf");
  await writeFile(tmpPdf, pdfBytes);

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
