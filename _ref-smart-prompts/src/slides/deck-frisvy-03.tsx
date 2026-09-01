/**
 * Frisvy · IA para el trabajo técnico
 *
 * Arco 1: el agente ya ve el código → brief (AGENTS.md, rules, skills, docs) →
 * MCP/Linear → SDD (ticket → spec → validar → código).
 * Arco 2 (si hay tiempo): escalera de contexto → RAG → grafo → Engram. Sin CAG.
 * Cierre: Para llevarse. La demo en vivo la hace el facilitator fuera del deck.
 */
import type React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CodeBlock } from "@/components/CodeBlock";
import {
  CardGrid,
  DeckCard,
  RevealItem,
  RevealStack,
  Shell,
  SlideLead,
  SlideTitle,
  StatementSlide,
} from "@/components/deck05/Deck05Shell";
import type { SlideDefBase } from "@/slides/types";

function ContentSlide({
  children,
  loose = false,
}: {
  children: React.ReactNode;
  loose?: boolean;
}) {
  return (
    <div
      className={[
        "deck-slide-inner flex min-h-0 flex-1 flex-col justify-center gap-6",
        loose ? "overflow-x-visible overflow-y-auto py-2" : "gap-8",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function FlowBox({
  title,
  sub,
  accent = false,
}: {
  title: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-xl border px-5 py-4 text-center min-w-[150px]",
        accent ? "border-2 border-ember bg-ember/10" : "border-border bg-surface/80",
      ].join(" ")}
    >
      <div className="font-display text-lg font-bold leading-tight">{title}</div>
      {sub && <div className="mt-1 text-sm text-muted-foreground leading-snug">{sub}</div>}
    </div>
  );
}

const Cover = () => (
  <Shell>
    <RevealStack className="flex h-full items-center">
      <div>
        <RevealItem>
          <h1 className="font-display text-[clamp(4rem,9vw,7rem)] font-bold leading-[0.92] text-balance">
            IA para el trabajo técnico.
          </h1>
        </RevealItem>
        <RevealItem>
          <SlideLead className="mt-10 max-w-[1400px]">
            Brief en el repo, Linear y validar la spec. Cuando eso no alcanza: RAG, grafo y
            memoria entre sesiones.
          </SlideLead>
        </RevealItem>
      </div>
    </RevealStack>
  </Shell>
);

const AlreadySees = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El agente ya ve el código</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-8">
        <RevealItem>
          <DeckCard className="flex h-full min-h-[220px] flex-col p-8">
            <div className="font-display text-xl font-bold text-ember mb-4">Lo que ya tiene</div>
            <p className="text-lg text-muted-foreground leading-snug">
              El IDE ya te da el árbol, los tests y git. Eso no es el problema.
            </p>
          </DeckCard>
        </RevealItem>
        <RevealItem>
          <DeckCard className="flex h-full min-h-[220px] flex-col p-8">
            <div className="font-display text-xl font-bold text-ember mb-4">Lo que no tiene</div>
            <p className="text-lg text-muted-foreground leading-snug">
              Cómo se trabaja acá, qué capa se toca, y qué es{" "}
              <span className="text-foreground font-bold">este</span> ticket. Eso no está en el
              árbol. Se deja escrito.
            </p>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const Loop = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Spec-driven: del pedido al merge</SlideTitle>
      </RevealItem>
      <RevealItem>
        <div className="flex flex-wrap items-start justify-center gap-3">
          <div className="pt-1">
            <FlowBox title="Ticket" sub="el pedido crudo" />
          </div>
          <span aria-hidden className="pt-6 font-mono text-2xl text-ember">
            →
          </span>
          <div className="flex flex-col items-stretch">
            <div className="flex items-center gap-3">
              <FlowBox title="Spec" sub="qué vamos a hacer" />
              <span aria-hidden className="font-mono text-2xl text-ember">
                →
              </span>
              <FlowBox title="Validar" sub="revisamos juntos" accent />
            </div>
            <div className="mx-6 mt-0 flex h-12 flex-col items-center justify-end rounded-b-xl border-x-2 border-b-2 border-ember/80 pb-1.5">
              <span className="font-mono text-sm text-ember">← si no cierra, se reescribe</span>
            </div>
          </div>
          <span aria-hidden className="pt-6 font-mono text-2xl text-ember">
            →
          </span>
          <div className="pt-1">
            <FlowBox title="Código" sub="recién ahí el agente" />
          </div>
        </div>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          Es importante <span className="text-foreground font-bold">validar todo</span> lo que
          importa antes de pasar a la implementación. Si la spec está mal, se corrige
          acá, no en el PR.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Validate = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] max-w-[1500px] text-balance">
        Validar no es burocracia.
        <br />
        Es ser responsables.
      </h2>
    </StatementSlide>
  </Shell>
);

const SpecAnatomy = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Una spec a la que se puede decir que sí</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          ["Objetivo", "Qué queda distinto cuando esto está hecho. Una frase."],
          ["Criterios", "Checks observables: status, archivo, permiso, test."],
          ["Fuera de alcance", "Qué no hacemos ahora. Si no lo decís, el agente lo inventa."],
          ["Cómo se verifica", "Lo que vas a correr vos. El chat no firma el merge."],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[120px] flex-col p-7">
              <div className="font-display text-xl font-bold text-ember mb-2">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
    </ContentSlide>
  </Shell>
);

const RepoBrief = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El repo es el brief permanente</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-8 items-stretch">
        <RevealItem>
          <CodeBlock label="lo mínimo que conviene dejar" nowrap className="h-full">
            {`AGENTS.md
.agents/
  rules/
  skills/
    tocar-dominio/
      SKILL.md
docs/
  arquitectura.md
  decisiones/`}
          </CodeBlock>
        </RevealItem>
        <RevealItem>
          <div className="flex h-full flex-col justify-between gap-4">
            {[
              ["AGENTS.md", "El manual del repo. Estándar portable; Claude Code también lee CLAUDE.md."],
              ["Rules", ".agents/rules. Corto y siempre: cómo se llaman las cosas, qué no se toca."],
              ["Skills", ".agents/skills. Un tipo de trabajo, un procedimiento. Se dispara cuando aplica."],
              ["Docs", "El mapa. Arquitectura y decisiones. Se consulta; no es un rule."],
            ].map(([title, body]) => (
              <DeckCard key={title} className="px-6 py-4">
                <div className="font-display text-lg font-bold text-ember">{title}</div>
                <div className="mt-1 text-base text-muted-foreground leading-snug">{body}</div>
              </DeckCard>
            ))}
          </div>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const SkillAnatomy = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Anatomía de un skill</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          [
            "name",
            "Cómo se llama. Corto, un tipo de trabajo: tocar-dominio, review-pr.",
          ],
          [
            "description",
            "Cuándo se dispara. El agente lee esto para decidir si aplica. Si es vago, no lo usa.",
          ],
          [
            "El cuerpo",
            "El procedimiento. Qué tocar, cómo, qué no. Una página, no un wiki.",
          ],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[170px] flex-col p-7">
              <div className="font-mono text-sm text-ember mb-3 uppercase tracking-widest">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
    </ContentSlide>
  </Shell>
);

const HexagonSkill = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Ejemplo: cómo se toca el dominio</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label=".agents/skills/tocar-dominio/SKILL.md" tone="good" className="max-w-[1400px]">
          {`---
name: tocar-dominio
description: Cambiar lógica de negocio o un puerto. No adapters HTTP.
---

Qué tocar
- Lógica: domain/   Contratos: ports/
- Nunca controllers/ ni adapters/ en el mismo cambio

Cómo tocar
- Puerto primero, tests del dominio sin I/O
- Si pide un endpoint, split: dominio / adapter HTTP`}
        </CodeBlock>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          Si lo hacés seguido, no vivas re-escribiendo los prompts.{" "}
          <span className="text-foreground font-bold">Hacé una skill.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const McpWhat = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle className="text-center">MCP</SlideTitle>
      </RevealItem>
      <RevealItem>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <FlowBox title="Cliente" sub="Claude Code, el IDE. Habla el protocolo." />
          <span aria-hidden className="font-mono text-3xl text-ember">
            ↔
          </span>
          <FlowBox title="Servidor" sub="Linear, GitHub, el browser. Expone la herramienta." accent />
        </div>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const McpPrimitives = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Lo que expone un MCP server</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          [
            "Tools",
            "Acciones: buscar un issue, comentar, crear. Las elige el modelo.",
          ],
          [
            "Resources",
            "Datos para leer: el issue, un doc. No ejecutan nada.",
          ],
          [
            "Prompts",
            "Recetas que reparte el server. Las pedís vos, no el modelo.",
          ],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[170px] flex-col p-8">
              <div className="font-mono text-sm text-ember mb-3 uppercase tracking-widest">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
    </ContentSlide>
  </Shell>
);

const Platforms = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El issue vive en Linear</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-8">
        <RevealItem>
          <CodeBlock label="una vez, en Claude Code">
            {`claude mcp add --transport http linear https://mcp.linear.app/mcp

# en la sesión: /mcp  →  login con Linear`}
          </CodeBlock>
        </RevealItem>
        <RevealItem>
          <CodeBlock label="después, cada ticket" tone="good">
            {`Traé FRIS-123 de Linear.

Armá la spec:
- objetivo
- criterios
- fuera de alcance
- cómo se verifica

No implementes todavía.`}
          </CodeBlock>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          Pegar el issue se pudre. Conectado, lee el pedido vivo.{" "}
          <span className="text-foreground font-bold">Vos seguís recortando y validando.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const CONTEXT_LEVELS: [string, string][] = [
  [
    "Archivos sueltos",
    "Adjuntá al chat los archivos que importan. El agente no siempre los cruza solo: los elegís vos.",
  ],
  [
    "Búsqueda textual",
    "grep, @archivo o la búsqueda del IDE. Encuentra texto, no cómo se conectan las piezas.",
  ],
  [
    "Brief en el repo",
    "AGENTS.md, rules, skills, docs. Cómo se trabaja acá y lo que el código no dice solo.",
  ],
  [
    "RAG",
    "Vectorizás docs y código. El harness busca lo relevante por similitud semántica.",
  ],
  [
    "Grafo de conocimientos",
    "Mapa de relaciones del repo: qué llama a qué, qué ruta toca qué servicio, sin leer archivo por archivo.",
  ],
  [
    "Memoria persistente (Engram)",
    "Decisiones, convenciones y bugs resueltos quedan guardados. La próxima sesión no arranca de cero.",
  ],
];

function ContextLevelSteps({ step = 0 }: { step?: number }) {
  const reduce = useReducedMotion();
  const allVisible = step >= CONTEXT_LEVELS.length;

  return (
    <div className="space-y-2 overflow-visible">
      {CONTEXT_LEVELS.map(([title, body], i) => {
        const level = i + 1;
        const visible = step >= level;
        const focused = step === level || (allVisible && level === CONTEXT_LEVELS.length);

        if (!visible) return null;

        return (
          <motion.div
            key={title}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{
              opacity: focused ? 1 : allVisible ? 0.8 : 0.45,
              y: 0,
            }}
            transition={{ duration: reduce ? 0.01 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={[
              "flex gap-4 rounded-xl border px-5 py-3 backdrop-blur-sm",
              focused
                ? "border-ember/70 bg-ember/10 ring-1 ring-ember/30"
                : "border-border bg-surface/80",
            ].join(" ")}
          >
            <div
              className={`shrink-0 font-mono text-lg tabular-nums ${focused ? "text-ember" : "text-ember/70"}`}
            >
              {level}
            </div>
            <div className="min-w-0 flex-1">
              <div
                className={`font-display text-lg leading-snug ${focused ? "text-foreground" : "text-foreground/85"}`}
              >
                {title}
              </div>
              <div
                className={`mt-0.5 text-[0.95rem] leading-snug ${focused ? "text-muted-foreground" : "text-muted-foreground/75"}`}
              >
                {body}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

const ContextLevels = ({ step = 0 }: { step?: number }) => {
  return (
    <Shell>
      <ContentSlide loose>
        <SlideTitle>¿Cómo le enseñamos a la IA nuestra codebase?</SlideTitle>
        <ContextLevelSteps step={step} />
      </ContentSlide>
    </Shell>
  );
};

const RAG_FLOW_IMAGE = "/harness-05/rag-flow.png";

const RagIntro = () => (
  <Shell>
    <RevealStack className="flex h-full min-h-0 flex-1 flex-col justify-center gap-8">
      <RevealItem>
        <h2 className="font-display text-[clamp(3.25rem,7.5vw,6.5rem)] font-bold leading-tight text-balance">
          ¿Qué es un RAG?
        </h2>
      </RevealItem>
      <RevealItem>
        <p className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-snug text-ember">
          Retrieval-Augmented Generation
        </p>
      </RevealItem>
    </RevealStack>
  </Shell>
);

const RagWhat = () => (
  <Shell flush>
    <RevealStack className="flex h-full min-h-0 w-full flex-1 items-center justify-center px-6 py-4">
      <RevealItem className="flex h-full w-full max-w-[min(100%,1920px)] items-center justify-center">
        <img
          src={RAG_FLOW_IMAGE}
          alt="Flujo RAG: indexación del conocimiento y consulta"
          width={1600}
          height={900}
          className="h-full w-full object-contain"
        />
      </RevealItem>
    </RevealStack>
  </Shell>
);

const RagBankExample = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Ejemplo: cambiar una regla de negocio</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="antes de sugerir código, recuperar" tone="good">
          {`Tarea: modificar la validación de un límite de negocio.

Recuperar primero:
- Doc de la regla y sus excepciones
- Quién llama al validador
- Tests existentes del flujo
- Modelo de datos involucrado
- Convenciones internas del módulo`}
        </CodeBlock>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          Sin ese contexto, te tira algo que <span className="text-foreground font-bold">parece bien</span> pero
          se saltea la excepción que pide la regla.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const RAG_INDEX_YES = [
  "Documentación de negocio y arquitectura",
  "Contratos de API y OpenAPI",
  "Tests, son ejemplos vivos de cómo se usa",
  "Convenciones del equipo y ADRs",
] as const;

const RAG_INDEX_NO = [
  "Datos reales de usuarios, nada de PII",
  "Secrets, tokens y credenciales",
  "Dumps y backups de producción",
  "Logs con información sensible",
] as const;

const RagIndexing = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Qué darle de contexto y qué dejar afuera</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem className="h-full">
          <DeckCard accent className="flex h-full flex-col p-8">
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-ember/20 font-bold text-ember"
              >
                ✓
              </span>
              <span className="font-mono uppercase tracking-widest text-ember">Va</span>
            </div>
            <ul className="space-y-3 text-xl text-muted-foreground leading-snug">
              {RAG_INDEX_YES.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col border-2 border-[oklch(0.6_0.22_25)] bg-[oklch(0.6_0.22_25)]/10 p-8">
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[oklch(0.6_0.22_25)]/25 font-bold text-[oklch(0.75_0.2_25)]"
              >
                ✕
              </span>
              <span className="font-mono uppercase tracking-widest text-[oklch(0.75_0.2_25)]">
                Nunca
              </span>
            </div>
            <ul className="space-y-3 text-xl text-muted-foreground leading-snug">
              {RAG_INDEX_NO.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const GraphIntro = () => (
  <Shell>
    <RevealStack className="flex h-full min-h-0 flex-1 flex-col justify-center gap-8">
      <RevealItem>
        <h2 className="font-display text-[clamp(3.25rem,7.5vw,6.5rem)] font-bold leading-tight text-balance">
          ¿Qué es un grafo de conocimientos?
        </h2>
      </RevealItem>
      <RevealItem>
        <p className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-snug text-ember">
          Knowledge Graph
        </p>
      </RevealItem>
    </RevealStack>
  </Shell>
);

const GRAPH_CONCEPT_IMAGE = "/harness-05/graph-concept.png";

const GraphConcept = () => (
  <Shell flush>
    <RevealStack className="flex h-full min-h-0 w-full flex-1 items-center justify-center px-6 py-4">
      <RevealItem className="flex h-full w-full max-w-[min(100%,1680px)] items-center justify-center">
        <img
          src={GRAPH_CONCEPT_IMAGE}
          alt="Grafo de conocimientos: nodos conectados y pregunta de impacto"
          width={1920}
          height={1080}
          className="max-h-[91%] max-w-[94%] object-contain"
        />
      </RevealItem>
    </RevealStack>
  </Shell>
);

const CODE_GRAPH_IMAGE = "/harness-05/code-graph.png";

const GraphVisual = () => (
  <Shell flush>
    <RevealStack className="flex h-full min-h-0 w-full flex-1 items-center justify-center px-6 py-4">
      <RevealItem className="flex h-full w-full max-w-[min(100%,1680px)] items-center justify-center">
        <img
          src={CODE_GRAPH_IMAGE}
          alt="Grafo del sistema y comparación de tokens leyendo archivo por archivo versus preguntando al grafo"
          width={1920}
          height={1080}
          className="max-h-[91%] max-w-[94%] object-contain"
        />
      </RevealItem>
    </RevealStack>
  </Shell>
);

const EngramIntro = () => (
  <Shell>
    <RevealStack className="flex h-full min-h-0 flex-1 flex-col justify-center gap-8">
      <RevealItem>
        <h2 className="font-display text-[clamp(3.25rem,7.5vw,6.5rem)] font-bold leading-tight text-balance">
          ¿Qué es Engram?
        </h2>
      </RevealItem>
      <RevealItem>
        <p className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-snug text-ember">
          Memoria persistente entre sesiones
        </p>
      </RevealItem>
    </RevealStack>
  </Shell>
);

const ENGRAM_SAVES = [
  "Decisiones y por qué se tomaron",
  "Convenciones del equipo y del proyecto",
  "Bugs resueltos y cómo se arreglaron",
  "Resúmenes de lo que se hizo en cada sesión",
] as const;

const EngramWhat = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>La IA que no arranca de cero</SlideTitle>
      </RevealItem>
      <RevealItem>
        <SlideLead className="max-w-[1400px]">
          RAG y el grafo describen <span className="text-foreground font-medium">tu sistema</span>.
          Engram recuerda <span className="text-foreground font-medium">cómo trabajaste en él</span>:
          guarda lo que decidiste y lo recupera en la próxima sesión, aunque se reinicie el chat.
        </SlideLead>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem className="h-full">
          <DeckCard accent className="flex h-full flex-col p-8">
            <div className="font-mono text-sm text-ember mb-3 uppercase tracking-widest">Qué guarda</div>
            <ul className="space-y-2 text-lg text-muted-foreground leading-snug">
              {ENGRAM_SAVES.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="shrink-0 text-ember" aria-hidden>
                    →
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-8">
            <div className="font-mono text-sm text-ember mb-3 uppercase tracking-widest">
              Cómo encaja
            </div>
            <ul className="space-y-2 text-lg text-muted-foreground leading-snug">
              <li>El conocimiento del equipo no se pierde al cerrar el chat</li>
              <li>No repetís el mismo contexto en cada sesión</li>
              <li>Corre local, vos decidís qué se guarda</li>
              <li>Ojo: nada de PII ni secretos en la memoria</li>
            </ul>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const ENGRAM_IMAGE = "/harness-05/engram-memory.png";

const EngramVisual = () => (
  <Shell flush>
    <RevealStack className="flex h-full min-h-0 w-full flex-1 items-center justify-center px-6 py-5">
      <RevealItem className="flex h-full w-full max-w-[min(100%,1520px)] items-center justify-center">
        <img
          src={ENGRAM_IMAGE}
          alt="Diagrama de Engram: sesiones guardan decisiones en memoria persistente y una sesión nueva las recupera"
          width={1536}
          height={1024}
          className="max-h-[88%] max-w-[94%] object-contain"
        />
      </RevealItem>
    </RevealStack>
  </Shell>
);

const RecapFinal = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Para llevarse</SlideTitle>
      </RevealItem>
      <RevealStack className="space-y-3">
        {[
          ["Brief", "AGENTS.md, .agents/rules, skills, docs"],
          ["MCP", "Linear vivo, no un paste que se pudre"],
          ["SDD", "ticket, spec, validar, código. Si no cierra, se vuelve."],
          ["Contexto", "RAG, grafo, Engram: cuando el brief solo no alcanza"],
          ["Criterio", "si no lo podés verificar, no está hecho"],
        ].map(([a, b]) => (
          <RevealItem key={a}>
            <DeckCard className="flex items-baseline gap-4 px-6 py-4">
              <span className="font-display text-2xl font-bold text-ember">{a}</span>
              <span className="text-xl text-muted-foreground">{b}</span>
            </DeckCard>
          </RevealItem>
        ))}
      </RevealStack>
    </ContentSlide>
  </Shell>
);

export const slidesFrisvy03: SlideDefBase[] = [
  {
    id: "f3-cover",
    title: "Portada",
    Component: Cover,
    notes:
      "Sin sello de programa. Mapa de la hora: brief + Linear + SDD; después escalera (RAG, grafo, Engram). Demo en vivo al cerrar.",
  },
  {
    id: "f3-already-sees",
    title: "Ya ve el código",
    Component: AlreadySees,
    notes:
      "No pelearse con el IDE. El hueco es cómo se trabaja y qué es este ticket. Sin pie que anticipe el brief: eso viene en la siguiente.",
  },
  {
    id: "f3-repo-brief",
    title: "El repo es el brief",
    Component: RepoBrief,
    notes:
      "Lo mínimo: AGENTS.md, .agents/rules, .agents/skills, docs. Es el peldaño 'brief' de la escalera, no todo el contexto posible. No es un curso de Cursor. memory.md no está a propósito.",
  },
  {
    id: "f3-skill-anatomy",
    title: "Anatomía de un skill",
    Component: SkillAnatomy,
    notes:
      "Tres piezas: name, description, cuerpo. Description vaga = no se dispara. El cuerpo es el procedimiento, corto. Sin pie en slide.",
  },
  {
    id: "f3-hex-skill",
    title: "Ejemplo skill",
    Component: HexagonSkill,
    notes:
      "Leer description en voz alta. Punch: si lo hacés seguido, no reescribas prompts: hacé una skill. Si no usan hexagonal, traducir: dónde vive la regla de negocio.",
  },
  {
    id: "f3-mcp",
    title: "MCP",
    Component: McpWhat,
    notes:
      "Título solo MCP, centrado. Cliente = el IDE. Servidor = Linear. No diseñamos un server.",
  },
  {
    id: "f3-mcp-primitives",
    title: "Lo que expone un MCP server",
    Component: McpPrimitives,
    notes:
      "Tools las elige el modelo, resources se leen, prompts los pedís vos. Linear casi todo es tools. Sin pie en slide.",
  },
  {
    id: "f3-platforms",
    title: "Linear",
    Component: Platforms,
    notes:
      "Una vez el enchufe, después 'traé FRIS-123'. Si hay un issue real, sustituir el ID. En otros IDEs: settings MCP → Linear. Seguis recortando vos.",
  },
  {
    id: "f3-loop",
    title: "Spec-driven",
    Component: Loop,
    notes:
      "Recién ahora SDD: el brief ya está. Señalar la vuelta spec ↔ validar. Validar todo lo que importa antes de codear.",
  },
  {
    id: "f3-validate",
    title: "Validar",
    Component: Validate,
    notes: "Pausa. Validar es respeto por el tiempo de todos, no un trámite.",
  },
  {
    id: "f3-spec-anatomy",
    title: "Una spec a la que se puede decir que sí",
    Component: SpecAnatomy,
    notes:
      "Cuatro piezas. Fuera de alcance y cómo se verifica son las que más faltan en un ticket de Slack.",
  },
  {
    id: "f3-context-levels",
    title: "Escalera de contexto",
    Component: ContextLevels,
    steps: 6,
    notes:
      "Bloque 2. Skippeable si no hay tiempo. Escalera: archivos → búsqueda → brief → RAG → grafo → Engram. Sin pie de cierre (no entra). Sin CAG, sin Linear/spec acá.",
  },
  {
    id: "f3-rag-intro",
    title: "¿Qué es un RAG?",
    Component: RagIntro,
    notes: "Pausa. Sigla en pantalla. Después el flujo.",
  },
  {
    id: "f3-rag-flow",
    title: "Flujo RAG",
    Component: RagWhat,
    notes: "Diagrama a pantalla completa. Indexación arriba, consulta abajo.",
  },
  {
    id: "f3-rag-bank",
    title: "RAG ejemplo",
    Component: RagBankExample,
    notes:
      "Regla de negocio genérica. Sin recuperar docs/tests/excepciones, inventa algo plausible.",
  },
  {
    id: "f3-rag-index",
    title: "Qué indexar",
    Component: RagIndexing,
    notes: "Va vs nunca. Nada de PII, secrets, dumps, logs sensibles.",
  },
  {
    id: "f3-graph-intro",
    title: "¿Qué es un grafo?",
    Component: GraphIntro,
    notes: "Pausa. Knowledge graph. Relaciones determinísticas, no similitud.",
  },
  {
    id: "f3-graph-concept",
    title: "Grafo: concepto",
    Component: GraphConcept,
    notes: "Impacto: qué se rompe si tocás el validador.",
  },
  {
    id: "f3-graph-visual",
    title: "Grafo del sistema",
    Component: GraphVisual,
    notes: "Tokens: archivo por archivo vs preguntar al grafo. Sin codebase-memory-mcp.",
  },
  {
    id: "f3-engram-intro",
    title: "¿Qué es Engram?",
    Component: EngramIntro,
    notes: "Pausa. Memoria entre sesiones. No es el brief del repo.",
  },
  {
    id: "f3-engram-what",
    title: "Engram: concepto",
    Component: EngramWhat,
    notes:
      "RAG/grafo = sistema. Engram = cómo laburaste. Local, sin PII. Sin mencionar CAG.",
  },
  {
    id: "f3-engram-visual",
    title: "Engram: visual",
    Component: EngramVisual,
    notes: "Diagrama de sesiones → memoria → sesión nueva.",
  },
  {
    id: "f3-recap-final",
    title: "Para llevarse",
    Component: RecapFinal,
    notes:
      "Cinco líneas. Cierra acá y arranca la demo en vivo. Si se saltó el bloque 2, igual: brief, MCP, SDD, criterio.",
  },
];
