import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesFrisvy03 } from "@/slides/deck-frisvy-03";

export const Route = createFileRoute("/frisvy-03")({
  head: () => ({
    meta: [
      { title: "Formación en IA · Encuentro 3: IA Generativa para aplicaciones técnicas" },
      {
        name: "description",
        content:
          "IA generativa aplicada al trabajo técnico: análisis de información, código, documentación y flujos de trabajo.",
      },
    ],
  }),
  component: Frisvy03,
});

function Frisvy03() {
  return (
    <PresentationDeck
      slides={slidesFrisvy03}
      storageKey="slide-index-frisvy-03"
      deckTitle="Encuentro 3 · IA Generativa para aplicaciones técnicas"
    />
  );
}
