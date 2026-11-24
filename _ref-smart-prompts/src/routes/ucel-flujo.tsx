import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesUcelFlujo } from "@/slides/deck-ucel-flujo";

export const Route = createFileRoute("/ucel-flujo")({
  head: () => ({
    meta: [
      { title: "UCEL · Del problema al sistema" },
      {
        name: "description",
        content:
          "Flujo de pensamiento para apalancarse de la IA: qué sistematizar, qué motor usar, cómo dar contexto y hasta dónde automatizar.",
      },
    ],
  }),
  component: UcelFlujoDeck,
});

function UcelFlujoDeck() {
  return (
    <PresentationDeck
      slides={slidesUcelFlujo}
      storageKey="slide-index-ucel-flujo"
      deckTitle="UCEL · Del problema al sistema"
    />
  );
}
