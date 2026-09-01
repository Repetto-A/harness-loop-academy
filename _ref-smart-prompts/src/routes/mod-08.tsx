import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesModulo08 } from "@/slides/deck-modulo-08";

export const Route = createFileRoute("/mod-08")({
  head: () => ({
    meta: [
      { title: "Curso online · Cursor AI" },
      {
        name: "description",
        content: "Setup, rules, skills y Agent mode con harness en el repo. Cursor 2026.",
      },
    ],
  }),
  component: Mod08,
});

function Mod08() {
  return (
    <PresentationDeck
      slides={slidesModulo08}
      storageKey="slide-index-mod-08"
      deckTitle="Cursor AI"
    />
  );
}
