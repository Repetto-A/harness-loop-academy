import { createFileRoute } from "@tanstack/react-router";
import { Presentation30 } from "@/components/Presentation30";

export const Route = createFileRoute("/ia-bien-usada")({
  head: () => ({
    meta: [
      { title: "IA bien usada — De prompts sueltos a workflows inteligentes" },
      {
        name: "description",
        content:
          "Charla sobre uso correcto de IA: prompts, contexto, buenas practicas, IA agentica, memoria, skills, conectores y automatizaciones.",
      },
      { property: "og:title", content: "IA bien usada" },
      {
        property: "og:description",
        content: "De prompts sueltos a workflows inteligentes.",
      },
    ],
  }),
  component: IaBienUsada,
});

function IaBienUsada() {
  return <Presentation30 />;
}
