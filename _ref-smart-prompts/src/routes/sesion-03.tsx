import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesSesion03 } from "@/slides/deck-sesion-03";

export const Route = createFileRoute("/sesion-03")({
  head: () => ({
    meta: [
      { title: "Claude Architect · Sesión 3: Diseño de ruta técnica MCP" },
      {
        name: "description",
        content:
          "Qué es el Model Context Protocol, cómo diseñar un server MCP propio y la ruta técnica para llevarlo a producción.",
      },
    ],
  }),
  component: Sesion03,
});

function Sesion03() {
  return (
    <PresentationDeck
      slides={slidesSesion03}
      storageKey="slide-index-sesion-03"
      deckTitle="Sesión 3 · Diseño de ruta técnica MCP"
    />
  );
}
