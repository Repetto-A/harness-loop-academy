import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesDiplomaturaRagMcp } from "@/slides/deck-diplomatura-rag-mcp";

export const Route = createFileRoute("/diplomatura-rag-mcp")({
  head: () => ({
    meta: [
      { title: "UCEL · Conectar, recordar y delegar" },
      {
        name: "description",
        content:
          "MCP, RAG, memoria, rutinas y agentes de trabajo.",
      },
    ],
  }),
  component: DiplomaturaRagMcp,
});

function DiplomaturaRagMcp() {
  return (
    <PresentationDeck
      slides={slidesDiplomaturaRagMcp}
      storageKey="slide-index-diplomatura-rag-mcp"
      deckTitle="UCEL · Conectar, recordar y delegar"
    />
  );
}
