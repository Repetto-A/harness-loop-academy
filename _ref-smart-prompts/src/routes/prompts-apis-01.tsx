import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesPromptsApis01 } from "@/slides/deck-prompts-apis-01";

export const Route = createFileRoute("/prompts-apis-01")({
  head: () => ({
    meta: [
      { title: "Lo que el modelo realmente lee" },
      {
        name: "description",
        content:
          "Anatomía del prompt real, APIs sin harness y prompting que funciona. Clase 1 de 2.",
      },
    ],
  }),
  component: PromptsApis01,
});

function PromptsApis01() {
  return (
    <PresentationDeck
      slides={slidesPromptsApis01}
      storageKey="slide-index-prompts-apis-01"
      deckTitle="Lo que el modelo realmente lee"
    />
  );
}
