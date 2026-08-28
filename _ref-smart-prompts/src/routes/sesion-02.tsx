import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesSesion02 } from "@/slides/deck-sesion-02";

export const Route = createFileRoute("/sesion-02")({
  head: () => ({
    meta: [
      { title: "Claude Architect · Sesión 2: Multi-agent, Agentic RAG y gestión de sesiones" },
      {
        name: "description",
        content:
          "Coordinar múltiples agentes, diseñar arquitecturas RAG agénticas y manejar estado y sesiones en sistemas conversacionales.",
      },
    ],
  }),
  component: Sesion02,
});

function Sesion02() {
  return (
    <PresentationDeck
      slides={slidesSesion02}
      storageKey="slide-index-sesion-02"
      deckTitle="Sesión 2 · Multi-agent, Agentic RAG y gestión de sesiones"
    />
  );
}
