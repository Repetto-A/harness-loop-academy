import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesClase03 } from "@/slides/deck-clase-03";

export const Route = createFileRoute("/harness-03")({
  head: () => ({
    meta: [
      { title: "Harness & Loop — Clase 3: Loop engineering" },
      {
        name: "description",
        content: "Automations, loops chicos y grandes, hackathon.",
      },
    ],
  }),
  component: Harness03,
});

function Harness03() {
  return (
    <PresentationDeck
      slides={slidesClase03}
      storageKey="slide-index-harness-03"
      deckTitle="Clase 3 · Loop engineering · 90 min"
    />
  );
}
