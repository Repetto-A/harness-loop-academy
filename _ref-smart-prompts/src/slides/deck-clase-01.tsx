/**
 * Clase 1 — Context Engineering (~2.5h)
 * Copiar a: _ref-smart-prompts/src/slides/deck-clase-01.tsx
 */
import type React from "react";
import { SlideShell } from "@/components/SlideShell";
import { CodeBlock } from "@/components/CodeBlock";

export interface SlideDefClase01 {
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
          Clase 1 · ~2.5h
        </div>
        <h1 className="font-display text-8xl font-bold leading-[0.92]">
          El repo
          <br />
          <span className="text-ember">enseña al agente.</span>
        </h1>
        <p className="mt-10 text-3xl text-muted-foreground max-w-[1200px]">
          Dejá de repetir lo mismo en cada chat.
        </p>
      </div>
    </div>
  </Shell>
);

const Requisitos = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">
        Requisitos{" "}
        <span className="text-muted-foreground text-4xl">(para tu admin / IT)</span>
      </h2>
      <div className="grid grid-cols-3 gap-5">
        {[
          ["GitHub Copilot", "1 licencia por alumno (Business/Enterprise)"],
          ["Copilot Chat", "Habilitado en VS Code / Visual Studio"],
          ["Copilot coding agent", "Según plan corporativo"],
          ["Acceso al repo", "Permisos + gh auth login"],
          ["IDE + extensión", "VS Code o Visual Studio con Copilot"],
          ["Node.js 20+", "Para correr starters y slides"],
        ].map(([title, body]) => (
          <div key={title} className="bg-surface border border-border rounded-2xl p-7">
            <div className="font-mono text-sm text-ember mb-3">{title}</div>
            <div className="font-display text-xl leading-tight">{body}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const Thesis = () => (
  <Shell bg="ember">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-8xl font-bold leading-[0.95]">
        El chat se olvida.
        <br />
        El repo no.
      </h2>
    </div>
  </Shell>
);

const Problem = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">¿Les suena?</h2>
      <div className="grid grid-cols-2 gap-6">
        {[
          "Repetís las mismas instrucciones en cada chat",
          "El agente inventa convenciones del repo",
          "Salta tests o no sabe qué correr",
          "Cada dev promptea distinto en el equipo",
        ].map((t) => (
          <div key={t} className="bg-surface border border-border rounded-2xl p-8">
            <div className="font-display text-2xl leading-snug">{t}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const Prompting = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">Prompt que escala</h2>
      <div className="grid grid-cols-2 gap-8">
        <CodeBlock label="malo" tone="bad">
          {`Arreglá el bug de usuarios`}
        </CodeBlock>
        <CodeBlock label="bueno" tone="good">
          {`Bug 500 en GET /api/users/999/display-name.
Seguí docs/api-contract.md.
Cerrá solo si validate:closeout pasa.`}
        </CodeBlock>
      </div>
    </div>
  </Shell>
);

const ContextWindow = () => (
  <Shell bg="ember">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-7xl font-bold leading-[0.95]">
        La ventana
        <br />
        es el cuello de botella.
      </h2>
    </div>
  </Shell>
);

const HarnessVsLoop = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold max-w-[1400px]">
        Dos capas <span className="text-muted-foreground text-4xl">(hoy solo la primera)</span>
      </h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="rounded-2xl border-2 border-ember bg-ember/10 p-10">
          <div className="font-mono text-ember mb-4 uppercase tracking-widest">Harness</div>
          <div className="font-display text-3xl font-bold mb-4">Reglas del agente en el repo</div>
          <div className="text-xl text-muted-foreground">AGENTS, skills, tests, contratos</div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-10 opacity-80">
          <div className="font-mono text-muted-foreground mb-4 uppercase tracking-widest">Loop</div>
          <div className="font-display text-3xl font-bold mb-4">El sistema vuelve solo</div>
          <div className="text-xl text-muted-foreground">Material bonus — no hoy</div>
        </div>
      </div>
    </div>
  </Shell>
);

const Files = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">Qué va en el repo</h2>
      <div className="grid grid-cols-3 gap-5">
        {[
          ["AGENTS.md", "Contrato raíz (~120 líneas)"],
          ["copilot-instructions.md", "Equivalente Copilot"],
          ["docs/", "Estado actual, arquitectura, decisiones"],
          [".cursor/skills/", "Procesos que repetís (Cursor)"],
          ["scripts validate", "Tests que el agente debe correr"],
          ["docs/api-contract.md", "Fuente de verdad HTTP/API"],
        ].map(([title, body]) => (
          <div key={title} className="bg-surface border border-border rounded-2xl p-7">
            <div className="font-mono text-sm text-ember mb-3">{title}</div>
            <div className="font-display text-xl leading-tight">{body}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const CopilotVsCursor = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-5xl font-bold">Mismo repo, distinto IDE</h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="rounded-2xl border-2 border-ember bg-ember/10 p-10">
          <div className="font-mono text-ember mb-4 uppercase tracking-widest">GitHub Copilot</div>
          <div className="font-display text-2xl leading-snug">
            copilot-instructions.md · AGENTS.md · validate scripts
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-10">
          <div className="font-mono text-muted-foreground mb-4 uppercase tracking-widest">Cursor</div>
          <div className="font-display text-2xl leading-snug">
            + .cursor/rules · skills · hooks (bonus)
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

const Anti = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">
        Anti-patterns <span className="text-ember">rápidos</span>
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {[
          "MCP para documentación estática → usá skills",
          "50 skills instalados → curá 6–8",
          "AGENTS.md de 500 líneas → fragmentá",
          "LangGraph para coding normal → SDD + subagentes",
        ].map((t) => (
          <div key={t} className="bg-surface border border-border rounded-2xl p-8 flex items-center">
            <span className="text-ember font-mono mr-4">×</span>
            <span className="font-display text-2xl leading-snug">{t}</span>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const DemoPrompt = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Demo — mismo prompt, dos repos</h2>
      <CodeBlock label="chat nuevo · sin historial" tone="default">
        {`El cliente reporta 500 en GET /api/users/999/display-name en producción.
Investigá, arreglá, y prepará para merge.`}
      </CodeBlock>
      <p className="text-2xl text-muted-foreground">
        Primero <span className="text-foreground font-bold">broken-app</span>, después{" "}
        <span className="text-foreground font-bold">harnessed-app</span>.
      </p>
    </div>
  </Shell>
);

const DemoLive = () => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center items-center text-center">
      <div className="font-mono text-base text-ember uppercase tracking-[0.4em] mb-6">
        demo en vivo
      </div>
      <h2 className="font-display text-7xl font-bold mb-8">broken-app</h2>
      <p className="text-3xl text-muted-foreground max-w-[1100px]">
        Dejá que el agente termine. Después vos corrés{" "}
        <span className="font-mono text-foreground">npm run test:all</span>
      </p>
    </div>
  </Shell>
);

const DemoWow = () => (
  <Shell bg="ember">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-8xl font-bold leading-[0.95]">
        Tests verdes
        <br />
        ≠ listo.
      </h2>
    </div>
  </Shell>
);

const DemoHarnessed = () => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center items-center text-center">
      <div className="font-mono text-base text-ember uppercase tracking-[0.4em] mb-6">
        demo en vivo
      </div>
      <h2 className="font-display text-7xl font-bold mb-8">harnessed-app</h2>
      <p className="text-3xl text-muted-foreground max-w-[1100px]">
        Mismo prompt →{" "}
        <span className="font-mono text-foreground">validate:closeout</span> + Plantilla
        Closeout
      </p>
    </div>
  </Shell>
);

const Lab = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-6xl font-bold">Lab — 20 min</h2>
      <div className="grid grid-cols-2 gap-6">
        {[
          "Misión en 1–3 oraciones para tu repo",
          "1 regla que hoy repetís en chat → archivo",
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
        Próxima clase:
        <br />
        <span className="text-ember">spec antes de código.</span>
      </h2>
    </div>
  </Shell>
);

const Closing = () => (
  <Shell bg="ember">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-8xl font-bold leading-[0.95]">
        Dejá de ser
        <br />
        el prompt del equipo.
      </h2>
    </div>
  </Shell>
);

export const slidesClase01: SlideDefClase01[] = [
  {
    id: "c1-cover",
    title: "Portada",
    Component: Cover,
    notes:
      "~2.5h. Hoy: prompting práctico + context engineering + archivos del repo. Copilot-first.",
  },
  {
    id: "c1-requisitos",
    title: "Requisitos (admin)",
    Component: Requisitos,
    notes:
      "Housekeeping ~30 seg (o checklist pre-clase). Confirmá que el admin habilitó Copilot por alumno: sin licencia + Chat no pueden hacer los labs. Salteá si ya está provisto.",
  },
  {
    id: "c1-thesis",
    title: "Tesis",
    Component: Thesis,
    notes: "Frase que debe quedar: el chat se olvida, el repo no. Pausa 3 segundos.",
  },
  {
    id: "c1-problem",
    title: "¿Les suena?",
    Component: Problem,
    notes: "Preguntá al aula. Levanten mano. Conectá con dolor real de equipos.",
  },
  {
    id: "c1-prompting",
    title: "Prompt que escala",
    Component: Prompting,
    notes: "Contraste malo/bueno. Rol, restricciones, criterio de éxito, validación.",
  },
  {
    id: "c1-context-window",
    title: "Ventana de contexto",
    Component: ContextWindow,
    notes: "Bottleneck real. Archivos > mega-prompt. Boot sequence en AGENTS.",
  },
  {
    id: "c1-harness-loop",
    title: "Harness vs loop",
    Component: HarnessVsLoop,
    notes: "Loop es bonus material — no profundizar.",
  },
  {
    id: "c1-files",
    title: "Archivos",
    Component: Files,
    notes: "Recorré grid. AGENTS corto. copilot-instructions para Copilot.",
  },
  {
    id: "c1-copilot-cursor",
    title: "Copilot vs Cursor",
    Component: CopilotVsCursor,
    notes: "Mismo harness en repo. Instructor puede usar Cursor.",
  },
  {
    id: "c1-anti",
    title: "Anti-patterns",
    Component: Anti,
    notes: "Rápido, 2 min max. Son las objeciones que van a tener.",
  },
  {
    id: "c1-demo-prompt",
    title: "Prompt demo",
    Component: DemoPrompt,
    notes: "Copiá prompt al chat NUEVO. Copilot o Cursor. Dos workspaces.",
  },
  {
    id: "c1-demo-live",
    title: "Demo broken",
    Component: DemoLive,
    notes: "25 min max. No spoilees. Al terminar agente: npm run test:all en silencio 5 seg.",
  },
  {
    id: "c1-demo-wow",
    title: "Wow",
    Component: DemoWow,
    notes: "Punchline. Tests verdes parciales ≠ producción OK.",
  },
  {
    id: "c1-demo-harnessed",
    title: "Demo harnessed",
    Component: DemoHarnessed,
    notes: "Mismo prompt, chat nuevo. Mostrar validate:closeout + Closeout en respuesta.",
  },
  {
    id: "c1-lab",
    title: "Lab",
    Component: Lab,
    notes: "Circular por sala. Misión <5 líneas. Homework: lab-01 opcional.",
  },
  {
    id: "c1-bridge",
    title: "Puente",
    Component: Bridge,
    notes: "Clase 2: SDD — spec antes de código.",
  },
  {
    id: "c1-closing",
    title: "Cierre",
    Component: Closing,
    notes: "Pregunta: ¿qué regla pondrían mañana en un archivo?",
  },
];
