import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesClase02 } from "@/slides/deck-clase-02";

export const Route = createFileRoute("/harness-02")({
  head: () => ({
    meta: [
      { title: "Harness & Loop — Clase 2: Spec antes de código" },
      {
        name: "description",
        content: "Proyecto real + SDD + verificación.",
      },
    ],
  }),
  component: Harness02,
});

function Harness02() {
  return (
    <PresentationDeck
      slides={slidesClase02}
      storageKey="slide-index-harness-02"
      deckTitle="Clase 2 · SDD · ~2.5h"
    />
  );
}
