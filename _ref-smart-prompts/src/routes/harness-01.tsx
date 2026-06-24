import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesClase01 } from "@/slides/deck-clase-01";

export const Route = createFileRoute("/harness-01")({
  head: () => ({
    meta: [
      { title: "Harness & Loop — Clase 1: El repo enseña al agente" },
      {
        name: "description",
        content: "Capacitación harness engineering — contexto durable en el repo.",
      },
    ],
  }),
  component: Harness01,
});

function Harness01() {
  return (
    <PresentationDeck
      slides={slidesClase01}
      storageKey="slide-index-harness-01"
      deckTitle="Clase 1 · Context engineering · ~2.5h"
    />
  );
}
