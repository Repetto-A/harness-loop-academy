import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesHackatwin } from "@/slides/deck-hackatwin";

export const Route = createFileRoute("/hackatwin")({
  head: () => ({
    meta: [
      { title: "Cómo sobrevivir una hackathon — HackaTwin" },
      {
        name: "description",
        content:
          "Workshop de 60 minutos para llegar al sábado con una frase, un pitch y un repo que el agente puede leer.",
      },
    ],
  }),
  component: HackatwinDeck,
});

function HackatwinDeck() {
  return (
    <PresentationDeck
      slides={slidesHackatwin}
      storageKey="slide-index-hackatwin"
      deckTitle="HackaTwin · Cómo sobrevivir una hackathon · 60 min"
    />
  );
}
