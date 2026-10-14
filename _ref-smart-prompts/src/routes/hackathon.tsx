import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesHackathonCrashCourse } from "@/slides/deck-hackathon-crash-course";

export const Route = createFileRoute("/hackathon")({
  head: () => ({
    meta: [
      { title: "Cómo competir en una hackathon (y sobrevivir en el intento) · Crash course 101" },
      {
        name: "description",
        content:
          "Crash course 101 de Alejandro Repetto: elegir y matar ideas, triage por wow, construir con agentes sin perder el hilo y pitchear en 3 minutos.",
      },
    ],
  }),
  component: Hackathon,
});

function Hackathon() {
  return (
    <PresentationDeck
      slides={slidesHackathonCrashCourse}
      storageKey="slide-index-hackathon"
      deckTitle="Cómo competir en una hackathon · Crash course 101"
    />
  );
}
