/**
 * Arquitecturas modernas IA: codebase intelligence + MCP + harness + workflow
 * Standalone corporate deck
 */
import type React from "react";
import { SlideShell } from "@/components/SlideShell";
import { slidesClase05 } from "@/slides/deck-clase-05";
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

function CodeBlock({
  children,
  label,
}: {
  children: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 font-mono text-lg whitespace-pre-wrap">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{label}</div>
      {children}
    </div>
  );
}

const Mod9Cover = () => (
  <Shell>
    <div className="flex h-full items-center">
      <div>
        <h1 className="font-display text-7xl font-bold leading-[0.92]">
          Arquitecturas
          <br />
          <span className="text-ember">modernas IA.</span>
        </h1>
        <p className="mt-10 text-3xl text-muted-foreground max-w-[1200px]">
          Codebase intelligence, MCP (grafo + memoria), documentación en repo y workflow
          reproducible: sistema 2026 para dev o equipo chico.
        </p>
      </div>
    </div>
  </Shell>
);

const ArchitectureDiagram = () => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Arquitectura en capas</h2>
      <div className="grid grid-cols-3 gap-6 text-center">
        <div className="rounded-2xl border-2 border-ember bg-ember/10 p-8">
          <div className="font-mono text-sm text-ember mb-4 uppercase tracking-widest">Developer</div>
          <div className="font-display text-2xl">Cursor IDE</div>
          <div className="font-display text-2xl mt-2 text-muted-foreground">Git repo</div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-8">
          <div className="font-mono text-sm text-ember mb-4 uppercase tracking-widest">Harness</div>
          <div className="text-lg text-muted-foreground space-y-1">
            <div>AGENTS.md</div>
            <div>rules · skills</div>
            <div>docs · specs</div>
            <div>validate scripts</div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-8">
          <div className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-widest">
            Contexto codebase
          </div>
          <div className="text-lg text-muted-foreground space-y-1">
            <div>RAG (docs + tests)</div>
            <div>codebase-memory-mcp</div>
            <div>Engram (memoria)</div>
            <div>Context7 (docs libs)</div>
          </div>
        </div>
      </div>
      <p className="text-2xl text-muted-foreground text-center max-w-[1000px] mx-auto">
        El harness vive en Git; RAG, grafo y Engram son{" "}
        <span className="text-foreground font-semibold">extensiones MCP</span>, no reemplazan
        AGENTS.md ni las specs.
      </p>
    </div>
  </Shell>
);

const DocsTable = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Documentación que importa</h2>
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-left text-xl">
          <thead className="bg-surface font-mono text-sm uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="p-4">Archivo</th>
              <th className="p-4">Rol</th>
              <th className="p-4">RAG / grafo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              ["AGENTS.md", "Contrato portable para todos los agentes", "CAG: precarga estable"],
              [".cursor/rules/", "Reglas scoped por glob", "No indexar: ya en contexto"],
              ["docs/current-state.md", "Hechos durables del proyecto", "CAG + opcional RAG"],
              ["specs/*/spec.md", "Intención del cambio activo", "Git, no MCP"],
              ["Tests + ADRs", "Verdad ejecutable y decisiones", "Sí: indexar en RAG/grafo"],
            ].map(([file, role, rag]) => (
              <tr key={file}>
                <td className="p-4 font-mono text-ember">{file}</td>
                <td className="p-4 text-muted-foreground">{role}</td>
                <td className="p-4 text-muted-foreground text-base">{rag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xl text-muted-foreground">
        Regla: lo estático y corto → repo (CAG). Lo voluminoso o relacional → RAG o grafo. Nunca
        PII ni secrets en índices.
      </p>
    </div>
  </Shell>
);

const WorkflowGit = () => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Workflow Git + SDD lite</h2>
      <CodeBlock label="secuencia">
        {`git checkout -b feat/nombre
# spec en specs/<feature>/spec.md  (objetivo + criterios)
# Agent implementa siguiendo spec + AGENTS.md
npm run validate:closeout
git commit → PR`}
      </CodeBlock>
      <p className="text-2xl text-muted-foreground max-w-[900px]">
        SDD lite = spec en repo antes de codear + validate como gate. No hace falta openspec
        completo para empezar.
      </p>
    </div>
  </Shell>
);

const Mod9GentleAi = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8 max-w-[1100px]">
      <h2 className="font-display text-5xl font-bold">Gentle AI: capa opcional</h2>
      <p className="text-2xl text-muted-foreground">
        Acelerador open source sobre Cursor + harness del repo.{" "}
        <span className="text-foreground font-semibold">No es requisito</span> para alumnos.
      </p>
      <div className="grid grid-cols-2 gap-6 text-lg">
        <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
          <div className="font-mono text-sm text-ember uppercase tracking-widest">Qué hace</div>
          <ul className="text-muted-foreground space-y-2 list-disc pl-5">
            <li>Orquesta fases SDD como comandos</li>
            <li>Skills registry unificado</li>
            <li>Mismo repo harness, no otro sistema</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
          <div className="font-mono text-sm text-ember uppercase tracking-widest">Mapeo SDD</div>
          <ul className="font-mono text-base text-muted-foreground space-y-2">
            <li>/sdd-explore → explorar antes de spec</li>
            <li>/sdd-design → artefactos en specs/</li>
            <li>/sdd-apply → implementar</li>
            <li>/sdd-verify → validate + cierre</li>
          </ul>
        </div>
      </div>
      <p className="text-xl text-muted-foreground font-mono">
        github.com/Gentleman-Programming/gentle-ai
      </p>
    </div>
  </Shell>
);

const ArchitectureLevels = () => (
  <Shell bg="ember">
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Arquitectura recomendada 2026</h2>
      <div className="space-y-4 text-xl text-muted-foreground font-mono">
        <p>RAG + codebase-memory-mcp + Engram + AGENTS/specs</p>
      </div>
      <div className="space-y-6 text-2xl text-muted-foreground">
        <p>
          <span className="text-foreground font-bold">Nivel 1:</span> AGENTS + 1 skill + validate +
          frontera
        </p>
        <p>
          <span className="text-foreground font-bold">Nivel 2:</span> + rules + specs + MCP grafo o
          Engram
        </p>
        <p>
          <span className="text-foreground font-bold">Nivel 3:</span> + OSS local + golden set + CI
          validate
        </p>
      </div>
    </div>
  </Shell>
);

type SlidePick = { id: string; notes: string };

function pickSlidesWithNotes(entries: SlidePick[]): SlideDefBase[] {
  const byId = new Map(slidesClase05.map((s) => [s.id, s]));
  return entries
    .map(({ id, notes }) => {
      const slide = byId.get(id);
      if (!slide) return null;
      return { ...slide, notes };
    })
    .filter((s): s is SlideDefBase => Boolean(s));
}

const REUSED_SLIDES: SlidePick[] = [
  {
    id: "c5-problem",
    notes:
      "0–8 min (tras diagrama). Sin contexto estructurado la IA rellena con respuestas plausibles. Pedir ejemplo de su repo.",
  },
  {
    id: "c5-context-levels",
    notes:
      "Escalones de complejidad: manual → RAG → grafo (codebase-memory-mcp) → Engram. Cierre: cada capa resuelve un tipo de pregunta.",
  },
  {
    id: "c5-rag-intro",
    notes: "8–12 min. Puerta al bloque RAG. Pregunta en pantalla; no explicar aún.",
  },
  {
    id: "c5-rag-what",
    notes: "Flujo indexación + consulta. En Cursor: @ archivos = retrieval manual.",
  },
  {
    id: "c5-rag-indexing",
    notes: "Qué indexar vs qué va en AGENTS/rules. Nunca PII ni secrets.",
  },
  {
    id: "c5-graph-intro",
    notes: "12–14 min. Knowledge graph: conocimiento estructurado, no solo texto parecido.",
  },
  {
    id: "c5-graph-concept",
    notes: "Nodos y aristas: impacto, no similitud. Validador como ejemplo oral.",
  },
  {
    id: "c5-graph-visual",
    notes: "Beneficio tokens (benchmark). Ejemplo: cambio en validación → qué toca.",
  },
  {
    id: "c5-graph-pros-cons",
    notes: "Pros/contras. Un repo por grafo; re-indexar tras cambios grandes.",
  },
  {
    id: "c5-graph-mcp",
    notes:
      "14–18 min. Demo codebase-memory-mcp: instalar, indexar harnessed-app, consulta impacto. UI :9749 opcional.",
  },
  {
    id: "c5-engram-intro",
    notes: "Puerta bloque Engram: memoria entre sesiones.",
  },
  {
    id: "c5-engram-what",
    notes: "Engram guarda decisiones y convenciones; complementa grafo/RAG.",
  },
  {
    id: "c5-engram-visual",
    notes: "Demo mem_search / mem_save boot sequence. Nuevo chat → recuperar.",
  },
  {
    id: "c5-control-bridge",
    notes: "18 min. Puente: contexto resuelto → ¿cómo controlamos al agente? Harness.",
  },
  {
    id: "c5-harness-def",
    notes: "18–24 min. Definición harness: contexto + reglas + tools + validate + límites.",
  },
  {
    id: "c5-harness-components",
    notes: "Componentes en repo. Mostrar AGENTS.md en harnessed-app.",
  },
  {
    id: "c5-closing",
    notes: "48–50 min. Cierre: mejor contexto + límites + proceso, no modelo más grande.",
  },
];

const reused = pickSlidesWithNotes(REUSED_SLIDES);

export const slidesModulo09: SlideDefBase[] = [
  {
    id: "mod9-cover",
    title: "Portada",
    Component: Mod9Cover,
    notes: "Intro 30 s. Standalone: codebase intelligence + MCP + workflow.",
  },
  {
    id: "mod9-architecture",
    title: "Diagrama arquitectura",
    Component: ArchitectureDiagram,
    notes: "0–8 min. Tres capas: developer, harness en repo, contexto codebase vía MCP.",
  },
  ...reused.slice(0, 2),
  ...reused.slice(2, 5),
  ...reused.slice(5, 10),
  ...reused.slice(10, 13),
  {
    id: "mod9-docs",
    title: "Documentación",
    Component: DocsTable,
    notes: "18–30 min. Tabla + boot sequence en harnessed-app. Qué indexar vs CAG.",
  },
  ...reused.slice(13, 16),
  {
    id: "mod9-workflow",
    title: "Workflow Git + SDD lite",
    Component: WorkflowGit,
    notes: "30–42 min. Demo branch → spec → agent → validate → commit. Ver demo-mcp-workflow.md.",
  },
  {
    id: "mod9-gentle-ai",
    title: "Gentle AI (opcional)",
    Component: Mod9GentleAi,
    notes:
      "30 s–2 min. Solo mención. Opcional para instructor con gentle-ai. Mapeo /sdd-*: no requisito alumnos.",
  },
  {
    id: "mod9-levels",
    title: "Arquitectura recomendada",
    Component: ArchitectureLevels,
    notes: "42–48 min. Handout arquitectura-recomendada.md. Stack RAG + grafo + Engram.",
  },
  reused[16]!,
];
