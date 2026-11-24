import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesSesion02Itp } from "@/slides/deck-sesion-02-itp";

export const Route = createFileRoute("/sesion-02-itp")({
  head: () => ({
    meta: [
      { title: "IT Patagonia · Sesión 2: Multi-agent, Agentic RAG y gestión de sesiones" },
      {
        name: "description",
        content:
          "Versión IT Patagonia de la sesión 2 de Claude Architect: multi-agent, RAG agéntico y sesiones.",
      },
    ],
  }),
  component: Sesion02Itp,
});

function Sesion02Itp() {
  return (
    <PresentationDeck
      slides={slidesSesion02Itp}
      storageKey="slide-index-sesion-02-itp"
      deckTitle="IT Patagonia · Sesión 2 · Multi-agent, Agentic RAG y sesiones"
    />
  );
}
