import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesVonNeumann } from "@/slides/deck-von-neumann";

export const Route = createFileRoute("/von-neumann")({
  head: () => ({
    meta: [
      { title: "Arquitectura de Von Neumann — Una idea de 1945" },
      {
        name: "description",
        content:
          "Deck educativo sobre la arquitectura de Von Neumann: programa almacenado, modelo de 3 bloques, cuello de botella y ciclo FDE.",
      },
    ],
  }),
  component: VonNeumann,
});

function VonNeumann() {
  return (
    <PresentationDeck
      slides={slidesVonNeumann}
      storageKey="slide-index-von-neumann"
      deckTitle="Arquitectura de Von Neumann"
    />
  );
}
