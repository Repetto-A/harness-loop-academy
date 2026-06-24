/**
 * Clase 3 — Loop engineering (90 min)
 * Copiar a: smart-prompts/src/slides/deck-clase-03.tsx
 */
import type React from "react";
import { SlideShell } from "@/components/SlideShell";
import { CodeBlock } from "@/components/CodeBlock";

export interface SlideDefClase03 {
  id: string;
  title: string;
  notes: string;
  Component: React.ComponentType<{ step?: number }>;
  steps?: number;
}

function Shell({
  children,
  bg = "default",
  noChrome = true,
}: {
  children: React.ReactNode;
  bg?: "default" | "ember" | "panel";
  noChrome?: boolean;
}) {
  return (
    <SlideShell noChrome={noChrome} bg={bg}>
      <div className="absolute right-6 bottom-10 pointer-events-none z-10">
        <div className="font-mono text-sm tracking-[0.28em] uppercase text-muted-foreground/45">
          Ale · Harness & Loop
        </div>
      </div>
      {children}
    </SlideShell>
  );
}

const Cover = () => (
  <Shell>
    <div className="flex h-full items-center">
      <div>
        <div className="font-mono text-lg text-ember mb-8 uppercase tracking-[0.3em]">
          Clase 3 · 90 min
        </div>
        <h1 className="font-display text-8xl font-bold leading-[0.92]">
          Loop
          <br />
          <span className="text-ember">engineering.</span>
        </h1>
        <p className="mt-10 text-3xl text-muted-foreground max-w-[1200px]">
          Diseñás el sistema que promptea por vos.
        </p>
      </div>
    </div>
  </Shell>
);

const Thesis = () => (
  <Shell bg="ember">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-7xl font-bold leading-[0.95]">
        Ya no prompteás
        <br />
        cada turno.
        <br />
        Diseñás el ciclo.
      </h2>
    </div>
  </Shell>
);

const HarnessRecap = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">Harness vs Loop</h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-surface p-10">
          <div className="font-mono text-muted-foreground mb-4 uppercase tracking-widest">
            Harness
          </div>
          <ul className="font-display text-2xl space-y-3">
            <li>1 repo</li>
            <li>Vos abrís el chat</li>
            <li>Reglas + verify</li>
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-ember bg-ember/10 p-10">
          <div className="font-mono text-ember mb-4 uppercase tracking-widest">Loop</div>
          <ul className="font-display text-2xl space-y-3">
            <li>Corre solo</li>
            <li>Se repite</li>
            <li>Aprende del diff</li>
          </ul>
        </div>
      </div>
    </div>
  </Shell>
);

const FivePieces = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-5xl font-bold">5 piezas + memoria (Addy)</h2>
      <div className="grid grid-cols-3 gap-5">
        {[
          ["Automations", "Cron, webhooks, triggers"],
          ["Worktrees", "Paralelismo aislado"],
          ["Skills", "Procesos repetibles"],
          ["MCP", "Herramientas externas"],
          ["Subagentes", "Roles especializados"],
          ["Markdown", "Estado que sobrevive"],
        ].map(([t, d]) => (
          <div key={t} className="bg-surface border border-border rounded-2xl p-7">
            <div className="font-display text-xl font-bold mb-2">{t}</div>
            <div className="text-lg text-muted-foreground">{d}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const LoopSmall = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Loop chico — 1 repo</h2>
      <div className="flex flex-wrap gap-4 items-center text-2xl font-display">
        {["Trigger", "Triage", "Fix", "PR", "State file"].map((s, i, arr) => (
          <div key={s} className="flex items-center gap-4">
            <div className="px-6 py-4 rounded-xl border border-border bg-surface">{s}</div>
            {i < arr.length - 1 && <span className="text-ember font-mono">→</span>}
          </div>
        ))}
      </div>
      <p className="text-xl text-muted-foreground mt-4">
        Ej: Sentry → automation → agente → PR → actualizar current-state.md
      </p>
    </div>
  </Shell>
);

const DemoSmall = () => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center items-center text-center">
      <div className="font-mono text-base text-ember uppercase tracking-[0.4em] mb-6">
        demo en vivo
      </div>
      <h2 className="font-display text-7xl font-bold mb-8">Loop chico</h2>
      <p className="text-3xl text-muted-foreground">
        /loop · Sentry→PR · o automation Cursor
      </p>
    </div>
  </Shell>
);

const Memory = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">El modelo olvida. El repo no.</h2>
      <CodeBlock label="docs/current-state.md + lessons" tone="good">
        {`## Estado
Último loop: fix display-name 404 — merged #42

## Lessons (outer loop — Gabriel Chua)
- Review humano editó mensaje de error → agregado a api-contract.md
- No automatizar: cada edit humano → regla nueva manual`}
      </CodeBlock>
    </div>
  </Shell>
);

const LoopBig = () => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center items-center text-center">
      <div className="font-mono text-base text-ember uppercase tracking-[0.4em] mb-6">
        loop grande
      </div>
      <h2 className="font-display text-7xl font-bold mb-8">Multi-repo</h2>
      <p className="text-3xl text-muted-foreground max-w-[1100px]">
        OSS Orchestrator · GitHub Projects · steipete
      </p>
    </div>
  </Shell>
);

const Orchestrator = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-5xl font-bold">Control plane</h2>
      <div className="grid grid-cols-4 gap-5">
        {[
          ["Triage", "¿Qué entró?"],
          ["Clasificar", "Tipo + repo"],
          ["Delegar", "Thread por repo"],
          ["Monitorear", "Cada ~5 min"],
        ].map(([t, d]) => (
          <div key={t} className="bg-surface border border-border rounded-2xl p-8">
            <div className="font-display text-2xl font-bold mb-2">{t}</div>
            <div className="text-lg text-muted-foreground">{d}</div>
          </div>
        ))}
      </div>
      <p className="text-xl text-muted-foreground italic">
        No lo implementan hoy — entienden la forma.
      </p>
    </div>
  </Shell>
);

const Warnings = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">Advertencias honestas</h2>
      <div className="grid grid-cols-3 gap-6">
        {[
          ["Verificación tuya", "El loop no reemplaza tu juicio"],
          ["Deuda de comprensión", "Si no entendés el diff, pará"],
          ["No rendirse al harness", "Loop sin reglas = caos automático"],
        ].map(([t, d]) => (
          <div key={t} className="bg-surface border border-ember/40 rounded-2xl p-8">
            <div className="font-display text-2xl font-bold mb-3 text-ember">{t}</div>
            <div className="text-xl text-muted-foreground">{d}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const Hackathon = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-6xl font-bold">Hackathon</h2>
      <div className="grid grid-cols-3 gap-6">
        {[
          "Harness mínimo viable",
          "1 loop documentado",
          "Evidencia (PR / log / screenshot)",
        ].map((t) => (
          <div key={t} className="bg-surface border border-border rounded-2xl p-8">
            <div className="font-display text-2xl">{t}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const LabChoice = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-6xl font-bold">Lab — elegí 1</h2>
      <div className="grid grid-cols-3 gap-6">
        {[
          ["A", "Hook post-edit"],
          ["B", "/loop en repo propio"],
          ["C", "Automation + trigger"],
        ].map(([l, t]) => (
          <div key={l} className="bg-surface border border-border rounded-2xl p-8">
            <div className="font-mono text-ember text-3xl mb-3">{l}</div>
            <div className="font-display text-2xl">{t}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const Closing = () => (
  <Shell bg="ember">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-7xl font-bold leading-[0.95]">
        Construí el loop.
        <br />
        Seguí siendo el ingeniero.
      </h2>
    </div>
  </Shell>
);

const Thanks = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center items-center text-center">
      <h2 className="font-display text-9xl font-bold mb-12">Gracias.</h2>
      <p className="text-3xl text-muted-foreground mb-8">Preguntas · hackathon · contacto</p>
      <div className="font-mono text-xl text-ember tracking-widest">QR · @tu-handle</div>
    </div>
  </Shell>
);

export const slidesClase03: SlideDefClase03[] = [
  {
    id: "c3-cover",
    title: "Portada",
    Component: Cover,
    notes: "Clase final. Asumen harness + SDD de clases 1-2.",
  },
  {
    id: "c3-thesis",
    title: "Tesis",
    Component: Thesis,
    notes: "Addy Osmani + steipete en una frase cada uno si querés. Diseñás el ciclo, no cada prompt.",
  },
  {
    id: "c3-recap",
    title: "Harness vs loop",
    Component: HarnessRecap,
    notes: "Repaso visual 2 columnas. Harness = base obligatoria.",
  },
  {
    id: "c3-five",
    title: "5 piezas",
    Component: FivePieces,
    notes: "Addy framework. Memoria markdown = current-state, lessons.",
  },
  {
    id: "c3-loop-small",
    title: "Loop chico",
    Component: LoopSmall,
    notes: "Un repo. Trigger puede ser cron, Sentry, manual /loop.",
  },
  {
    id: "c3-demo-small",
    title: "Demo loop chico",
    Component: DemoSmall,
    notes: "25 min. La demo que tengas más armada. Narrá inner vs outer loop.",
  },
  {
    id: "c3-memory",
    title: "Memoria",
    Component: Memory,
    notes: "Gabriel Chua 2 min: outer loop aprende de edits humanos → lessons.md manual.",
  },
  {
    id: "c3-loop-big",
    title: "Loop grande",
    Component: LoopBig,
    notes: "Screenshot OSS Orchestrator si tenés. Aspiracional.",
  },
  {
    id: "c3-orchestrator",
    title: "Orchestrator",
    Component: Orchestrator,
    notes: "steipete: triage → clasificar → delegar threads → monitorear. Decision-ready PRs.",
  },
  {
    id: "c3-warnings",
    title: "Advertencias",
    Component: Warnings,
    notes: "Addy cierre honesto. No vender magia.",
  },
  {
    id: "c3-hackathon",
    title: "Hackathon",
    Component: Hackathon,
    notes: "Brief en hackathon/brief.md. Mostrar rúbrica rápido.",
  },
  {
    id: "c3-lab",
    title: "Lab opciones",
    Component: LabChoice,
    notes: "15 min. Cada uno elige A/B/C según su stack.",
  },
  {
    id: "c3-closing",
    title: "Cierre",
    Component: Closing,
    notes: "Ingeniero sigue siendo responsable del sistema.",
  },
  {
    id: "c3-thanks",
    title: "Gracias",
    Component: Thanks,
    notes: "QR contacto. Invitar a hackathon.",
  },
];
