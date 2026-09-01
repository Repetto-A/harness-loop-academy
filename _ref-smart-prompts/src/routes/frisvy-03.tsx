import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesFrisvy03 } from "@/slides/deck-frisvy-03";

export const Route = createFileRoute("/frisvy-03")({
  head: () => ({
    meta: [
      { title: "IA para el trabajo técnico" },
      {
        name: "description",
        content:
          "Brief en el repo, Linear vía MCP, validar la spec. Cuando no alcanza: RAG, grafo de conocimientos y Engram.",
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
      deckTitle="IA para el trabajo técnico"
    />
  );
}
