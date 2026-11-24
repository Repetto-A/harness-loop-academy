/**
 * Catálogo de charlas: lo que se ve en el grid del home.
 * Sumar una charla = agregar un objeto. Sacarla del grid = status "archivada" (o borrar la línea).
 * `npm run new:talk -- <slug> "Título"` crea deck + ruta y agrega la entrada acá.
 */
import type { LinkProps } from "@tanstack/react-router";

export type TalkStatus = "lista" | "en-progreso" | "idea" | "archivada";

export interface Talk {
  to: LinkProps["to"];
  title: string;
  subtitle: string;
  /** Programa, cliente o evento. Se usa para filtrar. */
  track: string;
  status: TalkStatus;
  duration?: string;
  audience?: string;
  tags?: string[];
  /** PDF descargable servido desde /public */
  pdf?: string;
}

export const STATUS_LABEL: Record<TalkStatus, string> = {
  lista: "Lista",
  "en-progreso": "En progreso",
  idea: "Idea",
  archivada: "Archivada",
};

export const TALKS: Talk[] = [
  {
    to: "/hackatwin",
    title: "Cómo sobrevivir una hackathon",
    subtitle: "Explorar, matar, contar, apalancarse",
    track: "Hackathons",
    status: "lista",
    duration: "60 min",
    tags: ["hackathon", "pitch", "agentes"],
  },
  {
    to: "/hackathon",
    title: "Cómo competir en una hackathon",
    subtitle: "Crash course 101 · charla + demo",
    track: "Hackathons",
    status: "lista",
    duration: "~80 min",
    tags: ["hackathon", "pitch", "agentes"],
  },
  {
    to: "/ucel-flujo",
    title: "Del problema al sistema",
    subtitle: "Flujo de pensamiento para apalancarse de la IA",
    track: "UCEL · Diplomatura IA",
    status: "lista",
    duration: "~90 min",
    audience: "No técnicos",
    tags: ["automatización", "contexto"],
  },
  {
    to: "/diplomatura-rag-mcp",
    title: "Conectar, recordar y delegar",
    subtitle: "MCP, RAG, memoria, rutinas y agentes de trabajo",
    track: "UCEL · Diplomatura IA",
    status: "lista",
    tags: ["mcp", "rag", "memoria"],
  },
  {
    to: "/harness-01",
    title: "El repo enseña al agente",
    subtitle: "Context engineering · Copilot-first",
    track: "Harness & Loop",
    status: "lista",
    duration: "~2.5 h",
    tags: ["context engineering", "copilot"],
  },
  {
    to: "/harness-02",
    title: "Spec antes de código",
    subtitle: "SDD con artefactos",
    track: "Harness & Loop",
    status: "lista",
    duration: "~2.5 h",
    tags: ["sdd"],
  },
  {
    to: "/harness-03",
    title: "Loop engineering",
    subtitle: "Material extra · loops y autonomía",
    track: "Harness & Loop",
    status: "lista",
    duration: "90 min",
    tags: ["loops", "agentes"],
  },
  {
    to: "/harness-04",
    title: "Open source vs propietarios",
    subtitle: "Criterio, riesgos y qué encaja mejor",
    track: "Harness & Loop",
    status: "lista",
    tags: ["open source", "modelos"],
  },
  {
    to: "/harness-05",
    title: "Que la IA entienda tu codebase",
    subtitle: "Codebase intelligence + harness",
    track: "Harness & Loop",
    status: "lista",
    duration: "~1 h 30",
    tags: ["rag", "grafos", "engram"],
  },
  {
    to: "/sesion-02",
    title: "Multi-agent, Agentic RAG y sesiones",
    subtitle: "Claude Architect · Sesión 2",
    track: "Claude Architect",
    status: "lista",
    tags: ["multi-agent", "rag"],
    pdf: "/sesion-02.pdf",
  },
  {
    to: "/sesion-02-itp",
    title: "Multi-agent, Agentic RAG y sesiones",
    subtitle: "Sesión 2 · versión IT Patagonia",
    track: "Claude Architect",
    status: "lista",
    tags: ["multi-agent", "rag", "it patagonia"],
  },
  {
    to: "/sesion-03",
    title: "Diseño de ruta técnica MCP",
    subtitle: "Claude Architect · Sesión 3",
    track: "Claude Architect",
    status: "lista",
    tags: ["mcp"],
  },
  {
    to: "/sesion-05",
    title: "Context management, reliability y simulacro final",
    subtitle: "Claude Architect · Sesión 5",
    track: "Claude Architect",
    status: "lista",
    tags: ["contexto", "reliability"],
  },
  {
    to: "/frisvy-03",
    title: "IA para el trabajo técnico",
    subtitle: "Brief, Linear, SDD; RAG, grafo, Engram",
    track: "Frisvy",
    status: "lista",
    tags: ["sdd", "rag", "engram"],
  },
  {
    to: "/prompts-apis-01",
    title: "Lo que el modelo realmente lee",
    subtitle: "Anatomía del prompt, APIs sin harness, few-shot",
    track: "Prompts y APIs",
    status: "en-progreso",
    tags: ["prompting", "apis"],
  },
  {
    to: "/mod-06",
    title: "Modelos open source en tu IDE",
    subtitle: "Ollama + extensión oficial en VS Code",
    track: "Curso online",
    status: "lista",
    duration: "~50 min",
    tags: ["open source", "ollama"],
  },
  {
    to: "/mod-08",
    title: "Cursor AI",
    subtitle: "Harness y Agent mode",
    track: "Curso online",
    status: "lista",
    duration: "~50 min",
    tags: ["cursor"],
  },
  {
    to: "/mod-09",
    title: "Arquitecturas modernas IA",
    subtitle: "MCP + Git + docs",
    track: "Curso online",
    status: "lista",
    duration: "~50 min",
    tags: ["mcp", "arquitectura"],
  },
  {
    to: "/ads-clase-invertida",
    title: "Del modelo de clases al MER",
    subtitle: "Clase invertida · persistencia y normalización",
    track: "Facultad · ADS",
    status: "lista",
    tags: ["bases de datos"],
  },
  {
    to: "/von-neumann",
    title: "Arquitectura de Von Neumann",
    subtitle: "Una idea de 1945",
    track: "Facultad",
    status: "lista",
    tags: ["historia", "arquitectura"],
  },
  {
    to: "/ia-bien-usada",
    title: "IA bien usada",
    subtitle: "De prompts sueltos a workflows inteligentes",
    track: "Referencia",
    status: "lista",
    tags: ["prompting", "contexto"],
  },
  // <nuevas-charlas>
];
