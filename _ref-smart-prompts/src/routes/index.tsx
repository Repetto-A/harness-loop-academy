import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harness & Loop Engineering — Capacitación" },
      {
        name: "description",
        content:
          "Presentaciones: IA bien usada, open source vs propietarios, y codebase intelligence.",
      },
    ],
  }),
  component: Index,
});

const CLASSES = [
  {
    to: "/ia-bien-usada" as const,
    num: "01",
    title: "IA bien usada",
    subtitle: "Referencia original smart-prompts · deck-30",
  },
  {
    to: "/harness-04" as const,
    num: "02",
    title: "Open source vs propietarios",
    subtitle: "Criterio, riesgos y qué encaja mejor",
  },
  {
    to: "/harness-05" as const,
    num: "03",
    title: "Que la IA entienda tu codebase",
    subtitle: "Codebase intelligence + harness · ~1h30",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-8 py-16">
        <h1 className="font-display text-5xl font-bold leading-tight md:text-6xl">
          Elegí la clase
        </h1>

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

        <p className="mt-8 text-sm text-muted-foreground">
          Atajos en cada deck: G grid, P presenter, F fullscreen.
        </p>
      </div>
    </div>
  );
}
