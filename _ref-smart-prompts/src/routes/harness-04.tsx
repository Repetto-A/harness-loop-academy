import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesClase04 } from "@/slides/deck-clase-04";

export const Route = createFileRoute("/harness-04")({
  head: () => ({
    meta: [
      { title: "Harness & Loop — Encuentro 4: Open source vs propietarios" },
      {
        name: "description",
        content:
          "Decidir cuándo usar IA propietaria, open source, local o híbrido — desde negocio, riesgo y operación.",
      },
    ],
  }),
  component: Harness04,
});

function Harness04() {
  return (
    <PresentationDeck
      slides={slidesClase04}
      storageKey="slide-index-harness-04"
      deckTitle="Encuentro 4 · Open source vs propietarios"
    />
  );
}
