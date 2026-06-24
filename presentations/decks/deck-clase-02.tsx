/**
 * Clase 2 — SDD (~2.5h)
 * Copiar a: _ref-smart-prompts/src/slides/deck-clase-02.tsx
 */
import type React from "react";
import { SlideShell } from "@/components/SlideShell";
import { CodeBlock } from "@/components/CodeBlock";

export interface SlideDefClase02 {
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
          Clase 2 · ~2.5h
        </div>
        <h1 className="font-display text-8xl font-bold leading-[0.92]">
          Spec
          <br />
          <span className="text-ember">antes de código.</span>
        </h1>
        <p className="mt-10 text-3xl text-muted-foreground max-w-[1200px]">
          Artefactos que sobreviven a la ventana de contexto.
        </p>
      </div>
    </div>
  </Shell>
);

const Recap = () => (
  <Shell bg="ember">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-7xl font-bold leading-[0.95]">
        Harness = CI/CD
        <br />
        del agente.
      </h2>
    </div>
  </Shell>
);

const SpecFolder = () => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center items-center text-center">
      <div className="font-mono text-base text-ember uppercase tracking-[0.4em] mb-6">
        demo en vivo
      </div>
      <h2 className="font-display text-7xl font-bold mb-8">harnessed-app</h2>
      <p className="text-3xl text-muted-foreground max-w-[1100px] font-mono">
        specs/add-health-version/
      </p>
    </div>
  </Shell>
);

const SpecFolderTree = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Carpeta de spec</h2>
      <CodeBlock label="specs/{feature}/" tone="good">
        {`proposal.md    — problema y scope
spec.md        — criterios de aceptación
design.md      — archivos y diseño
tasks.md       — batches (2–3 archivos max)
verification.md — evidencia (verify no arregla)
archive.md     — cierre y lessons`}
      </CodeBlock>
    </div>
  </Shell>
);

const BeforeAfter = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">Antes / después</h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-surface p-10">
          <div className="font-mono text-muted-foreground mb-4 uppercase tracking-widest">
            Antes
          </div>
          <div className="font-display text-3xl">Chat suelto → código → sorpresa</div>
        </div>
        <div className="rounded-2xl border-2 border-ember bg-ember/10 p-10">
          <div className="font-mono text-ember mb-4 uppercase tracking-widest">Después</div>
          <div className="font-display text-3xl">Spec → implementación → verify</div>
        </div>
      </div>
    </div>
  </Shell>
);

const SddSimple = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">SDD — 8 fases</h2>
      <CodeBlock label="flujo completo" tone="default">
        {`explore → propose → spec → design → tasks → apply → verify → archive`}
      </CodeBlock>
      <p className="text-2xl text-muted-foreground">En slide: 4 pasos — Entender · Spec · Code · Verificar</p>
    </div>
  </Shell>
);

const Verify = () => (
  <Shell bg="ember">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-8xl font-bold leading-[0.95]">
        Verificar
        <br />
        no arregla.
      </h2>
    </div>
  </Shell>
);

const SpecExample = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Fragmento de spec</h2>
      <CodeBlock label="specs/add-health-version/spec.md" tone="good">
        {`## Objetivo
GET /api/users/:id/display-name devuelve 404 si no existe.

## Criterios de aceptación
- [ ] 404 + body { error: "not_found" }
- [ ] 200 si existe
- [ ] npm run validate:closeout pasa

## Fuera de scope
- Cambiar schema de DB`}
      </CodeBlock>
    </div>
  </Shell>
);

const DemoSdd = () => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center items-center text-center">
      <div className="font-mono text-base text-ember uppercase tracking-[0.4em] mb-6">
        demo en vivo
      </div>
      <h2 className="font-display text-7xl font-bold mb-8">add-health-version</h2>
      <p className="text-3xl text-muted-foreground font-mono">
        explore → spec → apply batch 1 → verify
      </p>
    </div>
  </Shell>
);

const Subagents = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">Subagentes — cuándo sí</h2>
      <div className="grid grid-cols-4 gap-5">
        {[
          ["Explorer", "Entender código"],
          ["Implementer", "Escribir el fix"],
          ["Reviewer", "Buscar regresiones"],
          ["—", "No siempre hace falta"],
        ].map(([t, d]) => (
          <div key={t} className="bg-surface border border-border rounded-2xl p-8 text-center">
            <div className="font-display text-2xl font-bold mb-2">{t}</div>
            <div className="text-lg text-muted-foreground">{d}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const Lab = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-6xl font-bold">Lab — 25 min</h2>
      <div className="grid grid-cols-3 gap-6">
        {[
          "Elegí 1 change acotado",
          "Escribí spec con criterios",
          "Corré verify al final",
        ].map((t) => (
          <div key={t} className="bg-surface border border-border rounded-2xl p-8">
            <div className="font-display text-2xl">{t}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const Bridge = () => (
  <Shell bg="panel">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-7xl font-bold leading-[0.98]">
        Bonus:
        <br />
        <span className="text-ember">loops y autonomía.</span>
      </h2>
      <p className="mt-8 text-2xl text-muted-foreground">Material en class-scripts/clase-03.md</p>
    </div>
  </Shell>
);

const Closing = () => (
  <Shell bg="ember">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-8xl font-bold leading-[0.95]">
        Dejá de ser
        <br />
        el linter humano.
      </h2>
    </div>
  </Shell>
);

export const slidesClase02: SlideDefClase02[] = [
  {
    id: "c2-cover",
    title: "Portada",
    Component: Cover,
    notes: "Repaso 30 seg clase 1. Hoy: SDD con artefactos en specs/.",
  },
  {
    id: "c2-recap",
    title: "Recap harness",
    Component: Recap,
    notes: "Una frase. No repetir clase 1 entera.",
  },
  {
    id: "c2-spec-folder",
    title: "Demo harnessed-app",
    Component: SpecFolder,
    notes: "5 min. Mostrar harnessed-app y carpeta specs/add-health-version.",
  },
  {
    id: "c2-spec-tree",
    title: "Árbol de spec",
    Component: SpecFolderTree,
    notes: "Qué va en cada archivo. Qué NO va.",
  },
  {
    id: "c2-before-after",
    title: "Antes/después",
    Component: BeforeAfter,
    notes: "Chat suelto vs spec + verify.",
  },
  {
    id: "c2-sdd",
    title: "SDD 8 fases",
    Component: SddSimple,
    notes: "8 fases en pizarra; slide simplifica a 4.",
  },
  {
    id: "c2-verify",
    title: "Verificar",
    Component: Verify,
    notes: "Verify reporta evidencia. No arregla. El agente implementa; verify confirma.",
  },
  {
    id: "c2-spec",
    title: "Ejemplo spec",
    Component: SpecExample,
    notes: "Mostrar criterios checkbox. Fuera de scope explícito.",
  },
  {
    id: "c2-demo",
    title: "Demo SDD",
    Component: DemoSdd,
    notes: "40 min. demo-sdd-healthcheck.md — prompts en chat, sin Gentle AI.",
  },
  {
    id: "c2-subagents",
    title: "Subagentes",
    Component: Subagents,
    notes: "Cuándo sí (exploración paralela). Cuándo no (change de 10 líneas).",
  },
  {
    id: "c2-lab",
    title: "Lab",
    Component: Lab,
    notes: "25 min. lab-02-sdd-change. Circular.",
  },
  {
    id: "c2-bridge",
    title: "Bonus loops",
    Component: Bridge,
    notes: "2 min teaser. clase-03 es material extra opcional.",
  },
  {
    id: "c2-closing",
    title: "Cierre",
    Component: Closing,
    notes: "Pregunta: ¿qué change pondrían en spec antes de codear mañana?",
  },
];
