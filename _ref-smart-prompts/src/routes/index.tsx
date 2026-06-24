import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harness & Loop Engineering — Capacitación" },
      {
        name: "description",
        content: "Presentaciones Clase 1–2 (+ bonus Clase 3): context engineering y SDD.",
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
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-8 py-16">
        <p className="font-mono text-sm uppercase tracking-[0.28em] text-ember">
          Harness & Loop Academy
        </p>
        <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-6xl">
          Elegí la clase
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Presentaciones integradas en smart-prompts. Atajos en cada deck: G grid, P
          presenter, F fullscreen.
        </p>

        <ul className="mt-12 space-y-4">
          {CLASSES.map((c) => (
            <li key={c.to}>
              <Link
                to={c.to}
                className="group flex items-center gap-6 rounded-xl border border-border/60 bg-card/40 px-6 py-5 transition-colors hover:border-ember/40 hover:bg-card/80"
              >
                <span className="font-mono text-2xl font-bold text-ember/80 group-hover:text-ember">
                  {c.num}
                </span>
                <div>
                  <div className="text-xl font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.subtitle}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-muted-foreground/70">
          Referencia original smart-prompts:{" "}
          <Link to="/ia-bien-usada" className="text-ember underline-offset-2 hover:underline">
            IA bien usada (deck-30)
          </Link>
        </p>
      </div>
    </div>
  );
}
