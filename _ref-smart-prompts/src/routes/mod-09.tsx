import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesModulo09 } from "@/slides/deck-modulo-09";

export const Route = createFileRoute("/mod-09")({
  head: () => ({
    meta: [
      { title: "Curso online · Arquitecturas modernas IA" },
      {
        name: "description",
        content: "Harness, MCP, documentación y workflow Git: arquitectura 2026.",
      },
    ],
  }),
  component: Mod09,
});

function Mod09() {
  return (
    <PresentationDeck
      slides={slidesModulo09}
      storageKey="slide-index-mod-09"
      deckTitle="Arquitecturas modernas IA"
    />
  );
}
