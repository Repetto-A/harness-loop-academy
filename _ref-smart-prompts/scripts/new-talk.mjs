#!/usr/bin/env node
// Crea una charla nueva: deck + ruta + entrada en el catálogo.
// Uso: npm run new:talk -- <slug> "Título" ["Programa o evento"]
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [slug, title, track = "Nuevas"] = process.argv.slice(2);
if (!slug || !title || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error('Uso: npm run new:talk -- <slug-en-kebab-case> "Título" ["Programa"]');
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const camel = slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const slidesName = `slides${camel[0].toUpperCase()}${camel.slice(1)}`;
const deckPath = join(root, "src/slides", `deck-${slug}.tsx`);
const routePath = join(root, "src/routes", `${slug}.tsx`);
const catalogPath = join(root, "src/talks/catalog.ts");
const json = (s) => JSON.stringify(s);

if (existsSync(deckPath) || existsSync(routePath)) {
  console.error(`Ya existe una charla con el slug "${slug}".`);
  process.exit(1);
}

writeFileSync(
  deckPath,
  `import { RevealItem, Shell, SlideLead, SlideTitle, StatementSlide } from "@/components/deck05/Deck05Shell";
import type { SlideDefBase } from "@/slides/types";

const Cover = () => (
  <StatementSlide>
    <h1 className="font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-tight">
      {${json(title)}}
    </h1>
  </StatementSlide>
);

const Idea = () => (
  <Shell>
    <RevealItem>
      <SlideTitle>La idea</SlideTitle>
    </RevealItem>
    <RevealItem>
      <SlideLead>Escribí acá el mensaje central de la charla.</SlideLead>
    </RevealItem>
  </Shell>
);

export const ${slidesName}: SlideDefBase[] = [
  { id: "cover", title: "Portada", notes: "", Component: Cover },
  { id: "idea", title: "La idea", notes: "", Component: Idea },
];
`,
);

writeFileSync(
  routePath,
  `import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { ${slidesName} } from "@/slides/deck-${slug}";

export const Route = createFileRoute("/${slug}")({
  head: () => ({ meta: [{ title: ${json(title)} }] }),
  component: Deck,
});

function Deck() {
  return (
    <PresentationDeck slides={${slidesName}} storageKey="slide-index-${slug}" deckTitle={${json(title)}} />
  );
}
`,
);

const marker = "  // <nuevas-charlas>";
const catalog = readFileSync(catalogPath, "utf8");
if (!catalog.includes(marker)) {
  console.error(
    "No encontré el marcador <nuevas-charlas> en catalog.ts; agregá la entrada a mano.",
  );
  process.exit(1);
}
const entry = `  {
    to: "/${slug}",
    title: ${json(title)},
    subtitle: "",
    track: ${json(track)},
    status: "idea",
  },
`;
writeFileSync(catalogPath, catalog.replace(marker, entry + marker));

console.log(`Listo: /${slug}
  deck:     src/slides/deck-${slug}.tsx
  ruta:     src/routes/${slug}.tsx
  catálogo: src/talks/catalog.ts (status "idea")
Corré npm run dev para que se regenere el árbol de rutas.`);
