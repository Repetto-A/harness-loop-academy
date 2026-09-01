import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesModulo06 } from "@/slides/deck-modulo-06";

export const Route = createFileRoute("/mod-06")({
  head: () => ({
    meta: [
      { title: "Curso online · Modelos open source en tu IDE" },
      {
        name: "description",
        content: "Modelos open, Ollama en local y extensión oficial en VS Code.",
      },
    ],
  }),
  component: Mod06,
});

function Mod06() {
  return (
    <PresentationDeck
      slides={slidesModulo06}
      storageKey="slide-index-mod-06"
      deckTitle="Modelos open source en tu IDE"
    />
  );
}
