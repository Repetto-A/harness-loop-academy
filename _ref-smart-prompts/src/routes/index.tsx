import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harness & Loop Engineering — Capacitación" },
      {
        name: "description",
        content:
          "Presentaciones: harness Copilot, sesiones Claude Architect, Frisvy y curso online.",
      },
    ],
  }),
  component: Index,
});

const CLASSES = [
  {
    to: "/harness-01" as const,
    num: "01",
    title: "El repo enseña al agente",
    subtitle: "Context engineering · ~2.5h · Copilot-first",
  },
  {
    to: "/harness-02" as const,
    num: "02",
    title: "Spec antes de código",
    subtitle: "SDD con artefactos · ~2.5h",
  },
  {
    to: "/harness-03" as const,
    num: "03",
    title: "Loop engineering (bonus)",
    subtitle: "Material extra · loops y autonomía",
  },
  {
    to: "/harness-04" as const,
    num: "04",
    title: "Open source vs propietarios",
    subtitle: "Criterio, riesgos y qué encaja mejor",
  },
  {
    to: "/harness-05" as const,
    num: "05",
    title: "Que la IA entienda tu codebase",
    subtitle: "Codebase intelligence + harness · ~1h30",
  },
];

const ARCHITECT_SESSIONS = [
  {
    to: "/sesion-02" as const,
    num: "02",
    title: "Multi-agent, Agentic RAG y sesiones",
    subtitle: "Claude Architect · Sesión 2",
  },
  {
    to: "/sesion-03" as const,
    num: "03",
    title: "Diseño de ruta técnica MCP",
    subtitle: "Claude Architect · Sesión 3",
  },
  {
    to: "/sesion-05" as const,
    num: "05",
    title: "Context management, reliability y simulacro final",
    subtitle: "Claude Architect · Sesión 5",
  },
];

const FRISVY = [
  {
    to: "/frisvy-03" as const,
    num: "03",
    title: "IA para el trabajo técnico",
    subtitle: "Brief, Linear, SDD; RAG, grafo, Engram",
  },
];

const ONLINE_MODULES = [
  {
    to: "/mod-06" as const,
    num: "06",
    title: "Modelos open source en tu IDE",
    subtitle: "Curso online · Ollama + extensión oficial en VS Code",
  },
  {
    to: "/mod-08" as const,
    num: "08",
    title: "Cursor AI",
    subtitle: "Curso online · harness y Agent mode",
  },
  {
    to: "/mod-09" as const,
    num: "09",
    title: "Arquitecturas modernas IA",
    subtitle: "Curso online · MCP + Git + docs",
  },
];

function DeckList({
  items,
  accent = false,
}: {
  items: typeof CLASSES;
  accent?: boolean;
}) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((c) => (
        <li key={c.to}>
          <Link
            to={c.to}
            className={
              accent
                ? "group flex items-center gap-5 rounded-xl border border-ember/30 bg-ember/5 px-5 py-4 transition-colors hover:border-ember/50 hover:bg-ember/10"
                : "group flex items-center gap-6 rounded-xl border border-border/60 bg-card/40 px-6 py-5 transition-colors hover:border-ember/40 hover:bg-card/80"
            }
          >
            <span
              className={
                accent
                  ? "font-mono text-xl font-bold text-ember/80 group-hover:text-ember"
                  : "font-mono text-2xl font-bold text-ember/80 group-hover:text-ember"
              }
            >
              {c.num}
            </span>
            <div className="min-w-0">
              <div className={accent ? "text-lg font-semibold" : "text-xl font-semibold"}>
                {c.title}
              </div>
              <div className="text-sm text-muted-foreground">{c.subtitle}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto min-h-screen max-w-5xl px-8 py-10">
        <p className="font-mono text-sm uppercase tracking-[0.28em] text-ember">
          Harness & Loop Academy
        </p>
        <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-6xl">
          Elegí la clase
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Presentaciones integradas en smart-prompts. Atajos en cada deck: G grid, P presenter, F
          fullscreen.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold">Harness & Loop (Copilot)</h2>
        <DeckList items={CLASSES} />

        <h2 className="mt-14 font-display text-2xl font-bold">Claude Architect</h2>
        <DeckList items={ARCHITECT_SESSIONS} />

        <h2 className="mt-14 font-display text-2xl font-bold">Frisvy</h2>
        <DeckList items={FRISVY} />

        <h2 className="mt-14 font-display text-3xl font-bold">Curso online (grabación)</h2>
        <p className="mt-2 text-muted-foreground">
          Orden de grabación: OSS en IDE → Cursor AI → Arquitecturas modernas IA
        </p>
        <DeckList items={ONLINE_MODULES} accent />

        <p className="mt-10 pb-8 text-sm text-muted-foreground/70">
          Referencia original smart-prompts:{" "}
          <Link to="/ia-bien-usada" className="text-ember underline-offset-2 hover:underline">
            IA bien usada (deck-30)
          </Link>
        </p>
      </div>
    </div>
  );
}
