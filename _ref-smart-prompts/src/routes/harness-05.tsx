/**
 * Ruta del Encuentro 5.
 * Copiar a: _ref-smart-prompts/src/routes/harness-05.tsx
 *
 * Y agregar en src/routes/index.tsx, dentro del array CLASSES:
 *   {
 *     to: "/harness-05" as const,
 *     num: "05",
 *     title: "Que la IA entienda tu codebase",
 *     subtitle: "Codebase intelligence + harness · ~1h30",
 *   },
 */
import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesClase05 } from "@/slides/deck-clase-05";

export const Route = createFileRoute("/harness-05")({
  head: () => ({
    meta: [
      { title: "Harness & Loop · Encuentro 5: Codebase Intelligence & Harness Engineering" },
      {
        name: "description",
        content:
          "Que la IA entienda la codebase, las reglas de negocio y el contexto del equipo: contexto, restricciones y validación. Copilot-first, banca.",
      },
    ],
  }),
  component: Harness05,
});

function Harness05() {
  return (
    <PresentationDeck
      slides={slidesClase05}
      storageKey="slide-index-harness-05"
      deckTitle="Encuentro 5 · Codebase Intelligence & Harness Engineering · ~1h30"
    />
  );
}
