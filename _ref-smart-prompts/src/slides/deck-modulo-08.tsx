/**
 * Cursor AI
 * Curso online corporativo: setup, rules, skills, Agent mode, harnessed-app
 */
import type React from "react";
import { SlideShell } from "@/components/SlideShell";
import { CodeBlock } from "@/components/CodeBlock";
import type { SlideDefBase } from "@/slides/types";

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
      {children}
    </SlideShell>
  );
}

const Cover = () => (
  <Shell>
    <div className="flex h-full items-center">
      <div>
        <h1 className="font-display text-8xl font-bold leading-[0.92]">
          Cursor AI
          <br />
          <span className="text-ember">2026.</span>
        </h1>
        <p className="mt-10 text-3xl text-muted-foreground max-w-[1200px]">
          Reglas, skills y Agent mode: el harness vive en el repo.
        </p>
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

const CursorIntro = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">Cursor en una frase</h2>
      <p className="text-3xl text-muted-foreground max-w-[1100px] leading-snug">
        IDE con IA nativa: chat, edición multiarchivo, terminal y reglas que viven en{" "}
        <span className="text-foreground font-bold">tu repositorio</span>, no en la sesión.
      </p>
      <div className="grid grid-cols-3 gap-5">
        {[
          ["Agent mode", "Planifica y ejecuta en el codebase"],
          ["Rules + skills", "Comportamiento reproducible"],
          ["validate:*", "Victoria verificable, no teatral"],
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

const HarnessMap = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">Mapa del harness en Cursor</h2>
      <div className="grid grid-cols-3 gap-5">
        {[
          ["AGENTS.md", "Contrato raíz (~120 líneas)"],
          [".cursor/rules/", "Reglas por glob / dominio"],
          [".cursor/skills/", "Procedimientos bajo demanda"],
          ["docs/", "current-state, specs, contratos"],
          ["package.json", "validate:quick / closeout"],
          [".cursor/hooks.json", "Gates opcionales (bonus)"],
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

const SetupChecklist = () => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-6xl font-bold">Setup en Cursor</h2>
      <div className="grid grid-cols-2 gap-6">
        {[
          "Cuenta + proyecto abierto (indexing ON)",
          ".cursorignore para node_modules, .next, dist",
          "Modelos cloud; Ollama opcional si usás local",
          "Terminal integrada con scripts npm",
        ].map((t) => (
          <div key={t} className="bg-surface border border-border rounded-2xl p-8">
            <div className="font-display text-2xl leading-snug">{t}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const RulesVsSkills = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">Rules vs Skills</h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="rounded-2xl border-2 border-ember bg-ember/10 p-10">
          <div className="font-mono text-ember mb-4 uppercase tracking-widest">Rules (.mdc)</div>
          <ul className="space-y-3 text-2xl text-muted-foreground">
            <li>Se aplican por glob automáticamente</li>
            <li>Convenciones de carpeta / stack</li>
            <li>Cortas, sin narrativa larga</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-10">
          <div className="font-mono text-muted-foreground mb-4 uppercase tracking-widest">Skills</div>
          <ul className="space-y-3 text-2xl text-muted-foreground">
            <li>El agente las invoca cuando corresponde</li>
            <li>Procesos repetibles (review, deploy)</li>
            <li>Curá 6–8 excelentes</li>
          </ul>
        </div>
      </div>
    </div>
  </Shell>
);

const SkillsLocation = () => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Dónde viven las skills</h2>
      <CodeBlock label="estructura en el repo" tone="default">
        {`.cursor/skills/
  code-review/
    SKILL.md          ← frontmatter name + description
  deploy-checklist/
    SKILL.md

# También: skills globales del usuario (~/.cursor/skills/)`}
      </CodeBlock>
      <p className="text-2xl text-muted-foreground max-w-[1000px]">
        Ejemplo demo:{" "}
        <span className="font-mono text-foreground">.cursor/skills/code-review/SKILL.md</span>; el
        agente la elige cuando el prompt pide review estructurado.
      </p>
    </div>
  </Shell>
);

const McpTeaser = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">
        MCP <span className="text-muted-foreground font-normal">(avance)</span>
      </h2>
      <p className="text-3xl text-muted-foreground max-w-[1050px] leading-snug">
        Model Context Protocol conecta Cursor con APIs, memoria y herramientas externas. Hoy solo
        mencionamos que existe: en{" "}
        <span className="text-foreground font-bold">arquitecturas modernas IA</span> lo vemos en
        profundidad (Engram, Supabase, etc.).
      </p>
      <p className="text-2xl text-muted-foreground">
        Regla práctica: docs estáticos → skills en el repo; datos vivos → MCP cuando corresponda.
      </p>
    </div>
  </Shell>
);

const AntiPatterns = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">
        Anti-patterns <span className="text-ember">rápidos</span>
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {[
          "MCP para docs estáticos → usá skills",
          "AGENTS.md de 500 líneas → fragmentá",
          "50 skills instalados → curá",
          "Victoria sin validate:closeout",
        ].map((t) => (
          <div key={t} className="bg-surface border border-border rounded-2xl p-8 flex items-center gap-4">
            <span className="text-ember font-mono text-2xl">×</span>
            <span className="font-display text-2xl leading-snug">{t}</span>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const AgentMode = () => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-6xl font-bold">Agent mode</h2>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="font-mono text-ember mb-4 uppercase tracking-widest">Puede</div>
          <ul className="space-y-2 text-2xl text-muted-foreground">
            <li>Leer / editar múltiples archivos</li>
            <li>Correr terminal (tests, scripts)</li>
            <li>Seguir AGENTS.md + skills</li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-muted-foreground mb-4 uppercase tracking-widest">No reemplaza</div>
          <ul className="space-y-2 text-2xl text-muted-foreground">
            <li>Tu criterio de merge</li>
            <li>Specs y contratos mal escritos</li>
            <li>Review humano en cambios críticos</li>
          </ul>
        </div>
      </div>
    </div>
  </Shell>
);

const BootSequence = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Boot sequence (harnessed-app)</h2>
      <CodeBlock label="orden de lectura" tone="default">
        {`1. AGENTS.md
2. docs/current-state.md
3. docs/api-contract.md
4. specs/ o docs/specs/ del feature`}
      </CodeBlock>
      <p className="text-2xl text-muted-foreground">
        El agente no adivina: <span className="text-foreground font-bold">leés vos en el repo qué es verdad</span>.
      </p>
    </div>
  </Shell>
);

const CloseoutTemplate = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Plantilla Closeout</h2>
      <CodeBlock label="cierre verificable" tone="good">
        {`## Closeout
- Cambios: ...
- Validación: npm run validate:closeout ✓
- Riesgos: ...
- Siguiente paso: PR / review`}
      </CodeBlock>
    </div>
  </Shell>
);

const DemoPrompt = () => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Demo: harnessed-app</h2>
      <CodeBlock label="Agent · chat nuevo" tone="default">
        {`El cliente reporta 500 en GET /api/users/999/display-name.
Seguí AGENTS.md: boot sequence, fix, validate:closeout,
code-review skill, Closeout.`}
      </CodeBlock>
    </div>
  </Shell>
);

const ClosingSteps = () => (
  <Shell bg="ember">
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold leading-tight">
        Llevá esto a tu repo
      </h2>
      <ol className="space-y-4 text-3xl text-muted-foreground list-decimal list-inside">
        <li>AGENTS.md desde template (~120 líneas)</li>
        <li>1 rule scoped + 1 skill de dominio</li>
        <li>validate:quick o validate:closeout</li>
        <li>Boot sequence de 4 archivos documentada</li>
      </ol>
    </div>
  </Shell>
);

export const slidesModulo08: SlideDefBase[] = [
  {
    id: "mod8-cover",
    title: "Portada",
    Component: Cover,
    notes: "Bloque Setup 0–2 min. Sesión autónoma: Cursor + harness en repo.",
  },
  {
    id: "mod8-thesis",
    title: "Tesis",
    Component: Thesis,
    notes: "Setup 2–4 min. Frase ancla. Pausa 3 segundos.",
  },
  {
    id: "mod8-intro",
    title: "Cursor en una frase",
    Component: CursorIntro,
    notes: "Setup 4–6 min. Sin puente a otras sesiones.",
  },
  {
    id: "mod8-map",
    title: "Mapa harness",
    Component: HarnessMap,
    notes: "Setup 6–10 min. Recorrer grid antes de abrir el IDE.",
  },
  {
    id: "mod8-setup",
    title: "Setup",
    Component: SetupChecklist,
    notes: "Cierre Setup: Settings, ignore, modelos cloud, terminal.",
  },
  {
    id: "mod8-rules-skills",
    title: "Rules vs Skills",
    Component: RulesVsSkills,
    notes: "Rules 10–14 min. Mostrar api-errors.mdc en harnessed-app.",
  },
  {
    id: "mod8-skills-location",
    title: "Ubicación skills",
    Component: SkillsLocation,
    notes: "Rules 17–20 min. Abrir code-review/SKILL.md. 2–3 min máximo.",
  },
  {
    id: "mod8-agent",
    title: "Agent mode",
    Component: AgentMode,
    notes: "Agent 20–24 min. Chat nuevo antes de la demo larga.",
  },
  {
    id: "mod8-boot",
    title: "Boot sequence",
    Component: BootSequence,
    notes: "Agent 24–28 min. Abrir AGENTS.md y docs en editor.",
  },
  {
    id: "mod8-closeout",
    title: "Closeout",
    Component: CloseoutTemplate,
    notes: "Agent 28–32 min. Explicar validate:closeout.",
  },
  {
    id: "mod8-mcp-teaser",
    title: "MCP avance",
    Component: McpTeaser,
    notes: "Agent 32–33 min. Teaser: profundidad en arquitecturas modernas IA.",
  },
  {
    id: "mod8-anti",
    title: "Anti-patterns",
    Component: AntiPatterns,
    notes: "Agent 33–35 min. Transición a demo proyecto.",
  },
  {
    id: "mod8-demo-prompt",
    title: "Prompt demo",
    Component: DemoPrompt,
    notes: "Proyecto 35–48 min. Bug 500 display-name. validate:closeout en verde.",
  },
  {
    id: "mod8-closing",
    title: "Cierre",
    Component: ClosingSteps,
    notes: "Proyecto 48–50 min. 4 pasos + ejercicio.md.",
  },
];
