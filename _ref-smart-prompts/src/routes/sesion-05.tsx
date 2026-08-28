import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesSesion05 } from "@/slides/deck-sesion-05";

export const Route = createFileRoute("/sesion-05")({
  head: () => ({
    meta: [
      { title: "Claude Architect · Sesión 5: Context management, reliability y simulacro final" },
      {
        name: "description",
        content:
          "Cierre del programa: context management avanzado, reliability en sistemas agénticos y simulacro final de arquitectura.",
      },
    ],
  }),
  component: Sesion05,
});

function Sesion05() {
  return (
    <PresentationDeck
      slides={slidesSesion05}
      storageKey="slide-index-sesion-05"
      deckTitle="Sesión 5 · Context management, reliability y simulacro final"
    />
  );
}
