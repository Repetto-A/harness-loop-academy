/**
 * Encuentro 5 · Codebase Intelligence & Harness Engineering (~1h30)
 *
 * Audiencia: desarrolladores de banco (legacy, compliance, datos sensibles,
 * herramientas corporativas limitadas, Copilot-first).
 *
 * Para usar en el deck system de referencia:
 *   1. Copiar este archivo a: _ref-smart-prompts/src/slides/deck-clase-05.tsx
 *   2. Copiar la ruta a:       _ref-smart-prompts/src/routes/harness-05.tsx
 *      (ver archivo harness-05.route.tsx en esta carpeta)
 *   3. Agregar la entrada en src/routes/index.tsx (CLASSES) apuntando a /harness-05
 *
 * Formato calcado de deck-clase-04.tsx: slides "statement" (bg ember) intercalados
 * con grids de contenido; speaker notes en el campo `notes`.
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

const CONTEXT_LEVELS: [string, string][] = [
  [
    "Archivos sueltos",
    "Adjuntá al chat los archivos que importan. Copilot no siempre los cruza solo, los elegís vos.",
  ],
  [
    "Búsqueda textual",
    "grep, @archivo o búsqueda del IDE. Encuentra coincidencias de texto, no cómo se conectan las piezas.",
  ],
  [
    "Docs y decisiones",
    "Reglas de negocio y ADRs que el código no dice. Van en copilot-instructions, skills o specs del ticket.",
  ],
  [
    "RAG",
    "Vectorizás docs y código en tu repo. Tu harness busca lo relevante por similitud semántica.",
  ],
  [
    "Grafo de conocimientos",
    "Mapa de relaciones del repo, qué llama a qué, qué ruta expone qué servicio, sin leer archivo por archivo.",
  ],
  [
    "Memoria persistente (Engram)",
    "Decisiones, convenciones y bugs resueltos quedan guardados. La IA los recupera en la próxima sesión, no arranca de cero.",
  ],
];

const PROBLEM_LEAD =
  "Reglas de negocio, permisos, flujos entre capas, integraciones, documentación interna, decisiones históricas y deuda técnica. Un core bancario es mucho más que el código que tenés abierto en el IDE.";

const HARNESS_CORE = [
  "Specs claras",
  "Contexto correcto",
  "Reglas del proyecto",
  "Tests",
  "Linters",
  "CI/CD",
] as const;

const HARNESS_GUARD = [
  "Validación de seguridad",
  "Review humano",
  "Checklists",
  "Ambientes de prueba",
  "Logs y trazabilidad",
  "Límites explícitos",
] as const;

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

function ContextLevelSteps({ step = 0 }: { step?: number }) {
  const reduce = useReducedMotion();
  const showClosing = step >= CONTEXT_LEVELS.length + 1;

  return (
    <div className="space-y-2.5 overflow-visible">
      {CONTEXT_LEVELS.map(([title, body], i) => {
        const level = i + 1;
        const visible = step >= level;
        const focused = step === level && !showClosing;

        if (!visible) return null;

        return (
          <motion.div
            key={title}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{
              opacity: focused ? 1 : showClosing ? 0.75 : 0.45,
              y: 0,
            }}
            transition={{ duration: reduce ? 0.01 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={[
              "flex gap-4 rounded-xl border px-5 py-4 backdrop-blur-sm",
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
                className={`mt-1 text-base leading-snug ${focused ? "text-muted-foreground" : "text-muted-foreground/75"}`}
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
  const reduce = useReducedMotion();
  const showClosing = step >= CONTEXT_LEVELS.length + 1;

  return (
    <Shell>
      <ContentSlide loose>
        <SlideTitle>¿Cómo le enseñamos a la IA nuestra codebase?</SlideTitle>
        <ContextLevelSteps step={step} />
        {showClosing && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.35 }}
          >
            <SlideLead>
              Los embeddings encuentran{" "}
              <span className="text-foreground font-bold">similitudes semánticas</span>. Los grafos,{" "}
              <span className="text-foreground font-bold">relaciones determinísticas</span>. Y Engram{" "}
              <span className="text-foreground font-bold">recuerda las decisiones</span> entre sesiones.
            </SlideLead>
          </motion.div>
        )}
      </ContentSlide>
    </Shell>
  );
};

const Cover = () => (
  <Shell>
    <RevealStack className="flex h-full items-center">
      <RevealItem>
        <h1 className="font-display text-[clamp(4rem,9vw,7rem)] font-bold leading-[0.92] text-balance">
          Que la IA entienda
          <br />
          <span className="text-ember">tu codebase.</span>
        </h1>
      </RevealItem>
      <RevealItem>
        <SlideLead className="mt-10 max-w-[1200px]">
          Cómo darle contexto de tu sistema, las reglas de negocio del banco y cómo validar lo que nos
          propone.
        </SlideLead>
      </RevealItem>
    </RevealStack>
  </Shell>
);

const Recap = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Lo que ya saben</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          [
            "Prompt engineering",
            "Cómo pedir bien las cosas, roles, restricciones, criterio, etc.",
          ],
          [
            "Context engineering",
            "Qué tiene sentido que entre y qué no en la ventana de contexto.",
          ],
          ["Skills", "Prompts reutilizables por todo el equipo."],
          ["MCP", "Conectar la IA a herramientas y datos."],
          [
            "Spec-Driven Development",
            "Nuevo paradigma de programación basado en specs.",
          ],
          ["Validación", "Tests, review y reglas de negocio antes de confiar."],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[140px] flex-col">
              <div className="font-mono text-sm text-ember mb-2">{title}</div>
              <div className="font-display text-lg leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
      <RevealItem>
        <SlideLead>
          Hasta acá vimos <span className="text-foreground font-bold">cómo pedirle</span>. Hoy vamos a{" "}
          <span className="text-foreground font-bold">darle con qué trabajar</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const ProblemReal = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El problema real</SlideTitle>
      </RevealItem>
      <RevealItem>
        <SlideLead className="max-w-[1400px]">{PROBLEM_LEAD}</SlideLead>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          La IA no ve nada de esto.{" "}
          <span className="text-foreground font-bold">Por eso se equivoca.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const PlausibleWrong = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] font-bold leading-[1.05] max-w-[1300px] text-balance">
        El problema es que no te avisa que no sabe algo,
        <br />
        lo inventa.
      </h2>
    </StatementSlide>
  </Shell>
);

const AutocompleteVsAssistant = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Dos formas de usar IA</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-8">
        <RevealItem>
          <DeckCard className="p-10 opacity-90">
            <div className="font-mono text-muted-foreground mb-4 uppercase tracking-widest">Autocomplete</div>
            <div className="font-display text-2xl font-bold mb-4">Completa la línea</div>
            <div className="text-xl text-muted-foreground leading-snug">
              No sabe de qué flujo es, ni qué reglas aplican, ni qué rompe. Te ahorra teclas.
            </div>
          </DeckCard>
        </RevealItem>
        <RevealItem>
          <DeckCard accent className="p-10">
            <div className="font-mono text-ember mb-4 uppercase tracking-widest">Asistente contextualizado</div>
            <div className="font-display text-2xl font-bold mb-4">Entiende el sistema</div>
            <div className="text-xl text-muted-foreground leading-snug">
              Sabe con qué trabaja, qué no puede tocar y cómo se chequea. Te ayuda a decidir.
            </div>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

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
          alt="Flujo RAG: indexación del conocimiento (base, documentos, chunks, embeddings, base vectorial) y consulta (pregunta, embedding, similitud, documentos recuperados, contexto al LLM, respuesta)"
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
        <SlideTitle>Ejemplo: regla de transferencias</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="antes de sugerir código, recuperar" tone="good">
          {`Tarea: modificar la validación de transferencias > 1M.

Recuperar primero:
- Doc de negocio del límite y excepciones
- Endpoints que llaman al validador
- Tests existentes del flujo
- Modelo de datos de la transacción
- Validadores previos y convenciones internas`}
        </CodeBlock>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          Sin ese contexto, te tira algo que <span className="text-foreground font-bold">parece bien</span> pero
          se saltea la excepción que pide la norma.
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
  "Datos reales de clientes, nada de PII",
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

const CagIntro = () => (
  <Shell>
    <RevealStack className="flex h-full min-h-0 flex-1 flex-col justify-center gap-8">
      <RevealItem>
        <h2 className="font-display text-[clamp(3.25rem,7.5vw,6.5rem)] font-bold leading-tight text-balance">
          ¿Qué es un CAG?
        </h2>
      </RevealItem>
      <RevealItem>
        <p className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-snug text-ember">
          Cache-Augmented Generation
        </p>
      </RevealItem>
    </RevealStack>
  </Shell>
);

const CAG_USE_CASES: [string, string][] = [
  [
    "Banca e inversiones",
    "Precarga normas de compliance y criterios de inversión. Los datos de mercado en vivo van por RAG.",
  ],
  [
    "Seguros",
    "Precarga reglas de la póliza y flujos de siniestros. Aprueba casos simples sin buscar en cada consulta.",
  ],
  [
    "RRHH y reclutamiento",
    "Precarga descripciones de puesto, criterios de hiring y normas laborales para matchear CVs al toque.",
  ],
  [
    "Soporte IT",
    "Precarga runbooks, protocolos de troubleshooting y logs típicos para diagnosticar sin leer todo el repo.",
  ],
  [
    "Salud",
    "Precarga guías clínicas y protocolos de tratamiento. El historial del paciente entra en tiempo real.",
  ],
  [
    "Tu repo con Copilot",
    "copilot-instructions, ADRs, convenciones del equipo. Siempre en contexto, como un AGENTS.md.",
  ],
];

const CAG_EXPLAIN_POINTS = [
  "Precargás documentos y reglas al inicio de la sesión",
  "El modelo responde sin buscar en una base vectorial en cada consulta",
  "Ideal para conocimiento estable: compliance, convenciones, runbooks",
] as const;

const CagMemory = ({ step = 0 }: { step?: number }) => {
  const reduce = useReducedMotion();
  const showCompare = step >= 1;
  const showClosing = step >= 2;

  return (
    <Shell>
      <ContentSlide>
        <SlideTitle>{showCompare ? "CAG vs RAG" : "Cómo funciona CAG"}</SlideTitle>

        {!showCompare ? (
          <>
            <RevealItem>
              <SlideLead className="max-w-[1400px]">
                Precarga lo que no cambia en cada consulta directamente en la ventana del modelo.
                No hace retrieval en tiempo real, ya lo trae cargado al arrancar.
              </SlideLead>
            </RevealItem>
            <RevealItem>
              <DeckCard accent className="p-8">
                <ul className="space-y-4 text-xl text-muted-foreground leading-snug">
                  {CAG_EXPLAIN_POINTS.map((t) => (
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
          </>
        ) : (
          <>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.01 : 0.35 }}
            >
              <SlideLead className="max-w-[1400px]">
                En tu repo ya lo hacés. Una parte va fija en cada sesión, la otra se activa cuando la
                tarea lo pide.
              </SlideLead>
            </motion.div>
            <RevealStack className="grid grid-cols-2 gap-6">
              <RevealItem className="h-full">
                <DeckCard accent className="flex h-full flex-col p-8">
                  <div className="font-mono text-sm text-ember mb-2 uppercase tracking-widest">CAG</div>
                  <div className="font-display text-2xl font-bold mb-4">≈ AGENTS.md</div>
                  <p className="text-xl text-muted-foreground leading-snug">
                    Se inyecta siempre al arrancar la sesión. Reglas del proyecto, convenciones,
                    contexto que no cambia en cada pregunta.
                  </p>
                </DeckCard>
              </RevealItem>
              <RevealItem className="h-full">
                <DeckCard className="flex h-full flex-col p-8">
                  <div className="font-mono text-sm text-ember mb-2 uppercase tracking-widest">RAG</div>
                  <div className="font-display text-2xl font-bold mb-4">≈ skills.md</div>
                  <p className="text-xl text-muted-foreground leading-snug">
                    Se activa solo cuando la tarea lo necesita. Busca por similitud en docs y código,
                    no va fijo en cada chat.
                  </p>
                </DeckCard>
              </RevealItem>
            </RevealStack>
            {showClosing && (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0.01 : 0.35 }}
              >
                <SlideLead>
                  Se pueden combinar.{" "}
                  <span className="text-foreground font-bold">
                    Ojo con apilar capas sin un propósito claro.
                  </span>
                </SlideLead>
              </motion.div>
            )}
          </>
        )}
      </ContentSlide>
    </Shell>
  );
};

const CagExamples = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Quién usa CAG y para qué</SlideTitle>
      </RevealItem>
      <RevealItem>
        <SlideLead className="max-w-[1400px]">
          Sistemas que precargan lo que no cambia en cada consulta. Respuestas más rápidas, menos
          dependencia de búsqueda en vivo.
        </SlideLead>
      </RevealItem>
      <CardGrid
        cols={2}
        gap="gap-4"
        items={CAG_USE_CASES}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[120px] flex-col p-6">
              <div className="font-display text-lg font-bold text-ember mb-2">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
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
          alt="Grafo de conocimientos nodo a nodo: Endpoint, Validador, Servicio, Tabla, Job, Test, Función y Clase conectados por aristas llama, importa, escribe en y testea. El validador resalta la pregunta de impacto: qué se rompe si lo tocás"
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
          alt="Grafo de conocimientos del sistema: nodos conectados (endpoint, validador, servicio, tabla, job, test) y comparación de 412.000 tokens leyendo archivo por archivo versus 3.400 preguntando al grafo"
          width={1920}
          height={1080}
          className="max-h-[91%] max-w-[94%] object-contain"
        />
      </RevealItem>
    </RevealStack>
  </Shell>
);

const GraphCodebaseMemory = () => (
  <Shell bg="panel">
    <ContentSlide loose>
      <RevealItem>
        <SlideTitle>codebase-memory-mcp</SlideTitle>
      </RevealItem>
      <RevealItem>
        <SlideLead className="max-w-[1400px]">
          Referencia open source del mix: grafo para impacto, semántica para lo que el nombre no dice. Un
          repo indexado, consultas vía MCP, 100% local.
        </SlideLead>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-5">
        <RevealItem className="h-full">
          <DeckCard accent className="flex h-full flex-col p-6">
            <div className="font-mono text-sm text-ember mb-2 uppercase tracking-widest">Qué hace</div>
            <ul className="space-y-1.5 text-base text-muted-foreground leading-snug">
              <li>Indexa un repo en grafo persistente (tree-sitter + LSP)</li>
              <li>14 herramientas MCP: trace, impact, search, architecture</li>
              <li>El código no sale de tu máquina</li>
            </ul>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-6">
            <div className="font-mono text-sm text-ember mb-2 uppercase tracking-widest">
              Consultas que habilita
            </div>
            <ul className="space-y-1.5 text-base text-muted-foreground leading-snug">
              <li>
                <span className="text-foreground font-medium">trace</span> → quién llama a esta función
              </li>
              <li>
                <span className="text-foreground font-medium">impact</span> → qué se rompe si cambio esto
              </li>
              <li>
                <span className="text-foreground font-medium">search</span> → encuentra por significado, no
                por nombre
              </li>
              <li>
                <span className="text-foreground font-medium">architecture</span> → mapa del módulo en un
                vistazo
              </li>
            </ul>
          </DeckCard>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <CodeBlock label="quick start" tone="default">
          {`# Instalar variante con UI (macOS / Linux)
curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash -s -- --ui

# Levantar el grafo en el browser
codebase-memory-mcp --ui=true --port=9749
# → http://localhost:9749`}
        </CodeBlock>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const GRAPH_PROS = [
  "Trazabilidad de impacto dentro del repo",
  "Relaciones explícitas, no suposiciones del modelo",
  "Menos ruido que explorar archivo por archivo",
] as const;

const GRAPH_CONS = [
  "Un grafo por repo, hexagonal distribuido necesita contratos aparte",
  "Mantenimiento: re-indexar cuando cambia el código",
  "Complejidad de armarlo y operarlo",
  "Falsa precisión si el grafo queda desactualizado",
] as const;

const GraphProsCons = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Grafo: pros y contras</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem className="h-full">
          <DeckCard accent className="flex h-full flex-col p-8">
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember/20 text-xl font-bold text-ember"
              >
                ✓
              </span>
              <span className="font-mono text-sm uppercase tracking-[0.28em] text-ember">Pros</span>
            </div>
            <RevealStack className="flex flex-col gap-3">
              {GRAPH_PROS.map((t) => (
                <RevealItem key={t}>
                  <div className="flex items-start gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                    <span className="font-display text-lg leading-snug text-foreground/90">{t}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealStack>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-8">
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted-foreground/15 text-xl font-bold text-muted-foreground"
              >
                !
              </span>
              <span className="font-mono text-sm uppercase tracking-[0.28em] text-muted-foreground">
                Contras
              </span>
            </div>
            <RevealStack className="flex flex-col gap-3">
              {GRAPH_CONS.map((t) => (
                <RevealItem key={t}>
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-1.5 shrink-0 font-mono text-sm text-muted-foreground/60"
                    >
                      △
                    </span>
                    <span className="text-lg leading-snug text-muted-foreground">{t}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealStack>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
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
          RAG, CAG y el grafo describen <span className="text-foreground font-medium">tu sistema</span>.
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
              Cómo encaja en el banco
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
          alt="Diagrama de Engram: tres sesiones de IA guardan decisiones, convenciones, bugs resueltos y resúmenes en una memoria persistente central, y una sesión nueva recupera ese contexto"
          width={1536}
          height={1024}
          className="max-h-[88%] max-w-[94%] object-contain"
        />
      </RevealItem>
    </RevealStack>
  </Shell>
);

const ControlBridge = () => (
  <Shell bg="ember">
    <StatementSlide>
      <div className="flex flex-col gap-8">
        <p className="font-mono text-sm uppercase tracking-[0.28em] text-ember-foreground/70">
          Ya vimos cómo darle contexto
        </p>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] max-w-[1400px] text-balance">
          La IA ya entiende tu sistema.
          <br />
          ¿Cómo controlamos que trabaje bien?
        </h2>
      </div>
    </StatementSlide>
  </Shell>
);

const HarnessDef = () => (
  <Shell bg="ember">
    <StatementSlide>
      <div className="flex flex-col gap-10">
        <h2 className="font-display text-[clamp(3rem,7vw,6rem)] font-bold text-balance">Harness engineering</h2>
        <p className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-snug max-w-[1500px]">
          Todo lo que armás alrededor de la IA (contexto, reglas, herramientas, validaciones y límites)
          para que lo que produzca sea <span className="underline">útil y se pueda verificar</span>.
        </p>
      </div>
    </StatementSlide>
  </Shell>
);

function HarnessColumn({
  kicker,
  descriptor,
  items,
  accent = false,
}: {
  kicker: string;
  descriptor: string;
  items: readonly string[];
  accent?: boolean;
}) {
  return (
    <DeckCard accent={accent} className="flex h-full flex-col p-8">
      <div className="mb-1 font-mono text-sm uppercase tracking-[0.28em] text-ember">{kicker}</div>
      <p className="mb-5 text-base text-muted-foreground/80">{descriptor}</p>
      <ul className="flex flex-col gap-2.5">
        {items.map((t, i) => (
          <li key={t} className="flex items-center gap-3">
            <span
              aria-hidden
              className="w-7 shrink-0 font-mono text-sm tabular-nums text-ember/70"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-lg leading-snug text-foreground/90">{t}</span>
          </li>
        ))}
      </ul>
    </DeckCard>
  );
}

const HarnessComponents = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Qué compone un harness</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem className="h-full">
          <HarnessColumn
            kicker="La base"
            descriptor="Qué querés, con qué y bajo qué reglas."
            items={HARNESS_CORE}
            accent
          />
        </RevealItem>
        <RevealItem className="h-full">
          <HarnessColumn
            kicker="El control"
            descriptor="Cómo se chequea antes de llegar a prod."
            items={HARNESS_GUARD}
          />
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          No es una herramienta, es <span className="text-foreground font-bold">tener el control</span> de lo
          que produce la IA.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const FLOWS: [string, string, string[]][] = [
  [
    "A",
    "Entender legacy",
    ["Identificar archivos", "Pedir resumen + diagrama textual", "Marcar puntos de riesgo", "Validar contra el código real"],
  ],
  [
    "B",
    "Cambiar regla de negocio",
    ["Escribir la spec", "Recuperar contexto e impacto", "Proponer cambios, frenar ahí", "Generar tests + edge cases"],
  ],
  [
    "C",
    "Tests sobre código existente",
    ["Pedir matriz de casos", "Detectar ramas sin cubrir", "Generar y ejecutar", "Corregir con errores reales"],
  ],
  [
    "D",
    "Refactor seguro",
    ["Congelar comportamiento (tests antes)", "Cambios chicos", "Validación incremental", "Plan de rollback"],
  ],
];

const FlowsConcrete = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El harness en tu día a día</SlideTitle>
      </RevealItem>
      <RevealItem>
        <SlideLead className="max-w-[1400px]">
          Cuatro tareas de todos los días. En cada una, los pasos para encararla con la IA sin romper
          nada, no un prompt suelto.
        </SlideLead>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-5">
        {FLOWS.map(([tag, title, steps]) => (
          <RevealItem key={tag} className="h-full">
            <DeckCard className="flex h-full flex-col p-6">
              <div className="mb-3 flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ember/15 font-mono text-lg font-bold text-ember"
                >
                  {tag}
                </span>
                <span className="font-display text-xl font-bold leading-tight">{title}</span>
              </div>
              <ul className="space-y-1.5 text-base text-muted-foreground leading-snug md:text-lg">
                {steps.map((s) => (
                  <li key={s} className="flex gap-2.5">
                    <span aria-hidden className="shrink-0 text-ember/70">
                      →
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </DeckCard>
          </RevealItem>
        ))}
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const LoopsIntro = () => (
  <Shell>
    <RevealStack className="flex h-full min-h-0 flex-1 flex-col justify-center gap-8">
      <RevealItem>
        <h2 className="font-display text-[clamp(3.25rem,7.5vw,6.5rem)] font-bold leading-tight text-balance">
          Loops Engineering
        </h2>
      </RevealItem>
      <RevealItem>
        <p className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-snug text-ember">
          Diseñás el ciclo, no cada prompt
        </p>
      </RevealItem>
    </RevealStack>
  </Shell>
);

const LoopsHarnessCompare = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Harness vs Loop</SlideTitle>
      </RevealItem>
      <RevealItem>
        <SlideLead className="max-w-[1400px]">
          El harness es la base. El loop es el paso siguiente: el sistema vuelve solo, con tus reglas.
        </SlideLead>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-8">
            <div className="font-mono text-sm text-muted-foreground mb-3 uppercase tracking-widest">
              Harness
            </div>
            <ul className="space-y-2.5 text-lg text-muted-foreground leading-snug">
              <li>Vos abrís el chat</li>
              <li>Reglas, specs, tests y verify</li>
              <li>Un repo, un ticket, un cambio</li>
            </ul>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard accent className="flex h-full flex-col p-8">
            <div className="font-mono text-sm text-ember mb-3 uppercase tracking-widest">Loop</div>
            <ul className="space-y-2.5 text-lg text-muted-foreground leading-snug">
              <li>Corre solo (trigger o cron)</li>
              <li>Se repite hasta cumplir criterio</li>
              <li>Aprende del diff y del estado en repo</li>
            </ul>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const LOOP_CYCLE_IMAGE = "/harness-05/loop-cycle.png";

const LoopsCycle = () => (
  <Shell flush>
    <RevealStack className="flex h-full min-h-0 w-full flex-1 items-center justify-center px-6 py-4">
      <RevealItem className="flex h-full w-full max-w-[min(100%,1920px)] items-center justify-center">
        <img
          src={LOOP_CYCLE_IMAGE}
          alt="Loop chico en un repo: Trigger, Spec o contexto, Agente, Validar y Cierre en ciclo circular. Ejemplo: ticket, spec en repo, agente, npm test más review, merge"
          width={1600}
          height={900}
          className="h-full w-full object-contain"
        />
      </RevealItem>
    </RevealStack>
  </Shell>
);

const LOOP_PIECES: [string, string][] = [
  ["Automations", "Cron, webhooks, triggers"],
  ["Skills", "Procesos repetibles"],
  ["MCP", "Herramientas externas"],
  ["Subagentes", "Roles especializados"],
  ["Markdown en repo", "Estado que sobrevive"],
  ["Verify", "Tests y gates antes del cierre"],
];

const LoopsPieces = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>De qué está hecho un loop</SlideTitle>
      </RevealItem>
      <RevealItem>
        <SlideLead className="max-w-[1400px]">
          No es solo el modelo iterando. Es trigger + herramientas + reglas + memoria en el repo.
        </SlideLead>
      </RevealItem>
      <CardGrid
        cols={3}
        gap="gap-4"
        items={LOOP_PIECES}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[100px] flex-col p-5">
              <div className="font-display text-lg font-bold text-ember mb-1">{title}</div>
              <div className="text-base text-muted-foreground leading-snug">{body}</div>
            </DeckCard>
          );
        }}
      />
    </ContentSlide>
  </Shell>
);

const LOOP_WARNINGS: [string, string][] = [
  ["Verificación tuya", "El loop no reemplaza tu juicio"],
  ["Deuda de comprensión", "Si no entendés el diff, pará"],
  ["Loop sin harness", "Autonomía sin reglas = caos automático"],
];

const LoopsWarnings = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Advertencias</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-3 gap-5">
        {LOOP_WARNINGS.map(([title, body]) => (
          <RevealItem key={title} className="h-full">
            <DeckCard className="flex h-full flex-col border-2 border-ember/40 p-6">
              <div className="font-display text-xl font-bold text-ember mb-2">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug">{body}</div>
            </DeckCard>
          </RevealItem>
        ))}
      </RevealStack>
      <RevealItem>
        <SlideLead>
          Construí el loop.{" "}
          <span className="text-foreground font-bold">Seguí siendo el ingeniero.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Closing = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(3.25rem,7.5vw,7rem)] font-bold leading-[0.95] text-balance">
        El salto no es
        <br />
        una IA más potente.
        <br />
        Es mejor contexto, límites y proceso.
      </h2>
    </StatementSlide>
  </Shell>
);

const ClosingRecap = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Para llevarse</SlideTitle>
      </RevealItem>
      <RevealStack className="space-y-3">
        {[
          ["Prompt engineering", "es la base"],
          ["Context engineering", "es estratégico"],
          ["RAG, grafos y memoria", "sirven como herramientas del context engineering"],
          ["Harness engineering", "vuelve el flujo confiable"],
          ["Loop engineering", "persigue la autonomía controlada en los agentes"],
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

export const slidesClase05: SlideDefBase[] = [
  {
    id: "c5-cover",
    title: "Portada",
    Component: Cover,
    notes:
      "~1h30. Objetivo: contexto del sistema, reglas de negocio del banco, validar lo que propone. Copilot-first, legacy. Tesis en tres partes: contexto, reglas, validación.",
  },
  {
    id: "c5-recap",
    title: "Recap",
    Component: Recap,
    notes:
      "5 min. Recap: prompt engineering, context engineering, skills, MCP, SDD, validación. Todo eso es la base. Hoy profundizamos contexto del sistema, reglas del banco y cómo validar propuestas.",
  },
  {
    id: "c5-problem",
    title: "El problema real",
    Component: ProblemReal,
    notes:
      "8 min. Sin cards: leer el párrafo. Reglas, permisos, capas, integraciones, docs, decisiones, deuda. Cierre: la IA no lo ve y se equivoca. Pedir por chat un ejemplo de su sistema.",
  },
  {
    id: "c5-plausible",
    title: "Plausible pero incorrecto",
    Component: PlausibleWrong,
    notes: "Punchline. No avisa la duda: rellena con algo plausible. Conectar con alucinación y con el ejemplo de transferencias.",
  },
  {
    id: "c5-autocomplete",
    title: "Autocomplete vs asistente",
    Component: AutocompleteVsAssistant,
    notes: "Diferenciar IA como autocomplete (acelera tipeo) vs asistente contextualizado (acelera decisiones porque entiende el sistema).",
  },
  {
    id: "c5-context-levels",
    title: "Enseñar la codebase a la IA",
    Component: ContextLevels,
    steps: 7,
    notes:
      "12 min. 6 escalones + cierre (7 clicks). Orden de complejidad: manual → búsqueda → docs/ADRs → RAG → grafo → memoria persistente (Engram). Cierre: embeddings vs grafos vs memoria entre sesiones.",
  },
  {
    id: "c5-rag-intro",
    title: "¿Qué es un RAG?",
    Component: RagIntro,
    notes: "Pausa 2 seg. Pregunta en pantalla; debajo el significado de la sigla. No explicar aún; la siguiente slide muestra el flujo.",
  },
  {
    id: "c5-rag-what",
    title: "Flujo RAG",
    Component: RagWhat,
    notes:
      "10 min. Diagrama a pantalla completa: narrás indexación arriba, consulta abajo. En Copilot: adjuntar archivos = retrieval manual.",
  },
  {
    id: "c5-rag-example",
    title: "RAG ejemplo banco",
    Component: RagBankExample,
    notes: "Ejemplo concreto: modificar validación de transferencias. Antes de sugerir código, recuperar doc de negocio, endpoints, tests, modelo, validadores, convenciones.",
  },
  {
    id: "c5-rag-indexing",
    title: "Qué darle de contexto",
    Component: RagIndexing,
    notes:
      "Dos columnas, va vs nunca. Va: docs, contratos, tests, ADRs. Nunca: PII, secrets, dumps, logs sensibles.",
  },
  {
    id: "c5-cag-intro",
    title: "¿Qué es un CAG?",
    Component: CagIntro,
    notes:
      "Pausa 2 seg. Misma estructura que RAG: pregunta + sigla. No explicar aún; la siguiente slide baja a la analogía AGENTS.md vs skills.",
  },
  {
    id: "c5-cag",
    title: "Cómo funciona CAG",
    Component: CagMemory,
    steps: 2,
    notes:
      "3 clicks. 1) Qué es CAG: precarga estable en la ventana del modelo, sin retrieval en cada consulta. 2) Comparar CAG≈AGENTS.md vs RAG≈skills.md. 3) Se combinan, ojo con apilar capas sin propósito.",
  },
  {
    id: "c5-cag-examples",
    title: "Ejemplos de CAG",
    Component: CagExamples,
    notes:
      "Ejemplos por industria (Lumenova): banca precarga compliance, seguros reglas de póliza, RRHH criterios, IT runbooks, salud protocolos. Cierre dev: copilot-instructions y ADRs = CAG del repo. Lo dinámico sigue yendo por RAG.",
  },
  {
    id: "c5-graph-intro",
    title: "¿Qué es un grafo de conocimientos?",
    Component: GraphIntro,
    notes:
      "Pausa 2 seg. Portada del bloque, misma estructura que RAG y CAG. Knowledge Graph, no 'grafo de código'. El código es la fuente, el concepto es conocimiento estructurado.",
  },
  {
    id: "c5-graph-concept",
    title: "Knowledge graph de la codebase",
    Component: GraphConcept,
    notes:
      "Diagrama nodo a nodo a pantalla completa. Narrar tipos de nodos (endpoint, validador, servicio, tabla, job, test) y aristas (llama, importa, escribe en, testea). Resaltar Validador: pregunta de impacto, no similitud. Cierre: grafo = impacto, vectores = parecido.",
  },
  {
    id: "c5-graph-visual",
    title: "Grafo de conocimientos",
    Component: GraphVisual,
    notes:
      "Beneficio concreto. Izquierda: nodos y aristas (no re-explicar, ya visto). Derecha: 412k vs 3.4k tokens, 120×. Fuente benchmark codebase-memory-mcp. Ejemplo oral: validación clientes corporativos → endpoints, jobs, tests.",
  },
  {
    id: "c5-graph-pros-cons",
    title: "Grafo pros/contras",
    Component: GraphProsCons,
    notes:
      "Pros y contras del grafo. Pros: impacto dentro del repo, relaciones explícitas. Contras: un repo por grafo, re-indexar, hexagonal distribuido necesita OpenAPI/ADRs aparte. No repetir benchmark de tokens.",
  },
  {
    id: "c5-graph-mcp",
    title: "codebase-memory-mcp",
    Component: GraphCodebaseMemory,
    notes:
      "Cierre del bloque y puente: sabiendo pros/contras, acá está la herramienta que lo hace. Referencia open source del mix grafo+semántica. Quick start: instalar con --ui, levantar con --ui=true --port=9749, abrir localhost:9749. Requiere binario UI (no el estándar). Luego indexar el repo desde el agente. No repetir 120×. github.com/DeusData/codebase-memory-mcp",
  },
  {
    id: "c5-engram-intro",
    title: "¿Qué es Engram?",
    Component: EngramIntro,
    notes:
      "Pausa 2 seg. Portada del bloque, misma estructura que RAG, CAG y grafo. Engram = memoria persistente entre sesiones.",
  },
  {
    id: "c5-engram-what",
    title: "Engram: concepto",
    Component: EngramWhat,
    notes:
      "Clave: RAG/CAG/grafo describen el sistema; Engram recuerda cómo trabajaste en él. Guarda decisiones, convenciones, bugs, resúmenes y los recupera al arrancar. Banco: conocimiento que no se pierde, corre local, sin PII ni secretos.",
  },
  {
    id: "c5-engram-visual",
    title: "Engram diagrama",
    Component: EngramVisual,
    notes:
      "Imagen centrada con margen (no fullscreen). Narrar: sesiones guardan → memoria central → sesión nueva recupera. Sobrevive entre sesiones y compactaciones.",
  },
  {
    id: "c5-control-bridge",
    title: "Del contexto al control",
    Component: ControlBridge,
    notes:
      "Puente. Cerramos el bloque de contexto (RAG, CAG, grafo, Engram): la IA ya entiende el sistema. Ahora la pregunta cambia: cómo controlamos que trabaje bien. Eso es el harness.",
  },
  {
    id: "c5-harness-def",
    title: "Harness: definición",
    Component: HarnessDef,
    notes: "12 min. Definición: contexto + reglas + herramientas + validaciones + límites alrededor de la IA. Producir cambios útiles y verificables.",
  },
  {
    id: "c5-harness-components",
    title: "Harness: componentes",
    Component: HarnessComponents,
    notes:
      "Dos grupos en una slide. La base: specs, contexto, reglas, tests, linters, CI/CD. El control: seguridad, review, checklists, ambientes, logs, límites. Cierre: no es herramienta, es tener el control.",
  },
  {
    id: "c5-flows",
    title: "El harness en tu día a día",
    Component: FlowsConcrete,
    notes:
      "8 min. Marco: tareas de todos los días, no features de IA. En cada una, el paso a paso para hacerla con IA sin romper. A entender legacy, B cambiar regla de negocio, C tests sobre código existente, D refactor seguro. En B, 'frenar ahí' = que proponga pero no aplique solo. Cierre oral: 'parece correcto' no es 'está correcto'.",
  },
  {
    id: "c5-loops-intro",
    title: "Loops Engineering",
    Component: LoopsIntro,
    notes:
      "Pausa 2 seg. Tesis de clase 3: diseñás el ciclo, no cada prompt. Puente desde harness: autonomía controlada.",
  },
  {
    id: "c5-loops-compare",
    title: "Harness vs Loop",
    Component: LoopsHarnessCompare,
    notes:
      "Repaso visual clase 3. Harness: vos abrís chat, reglas+verify, un ticket. Loop: corre solo, se repite, aprende del diff. El harness es base obligatoria.",
  },
  {
    id: "c5-loops-cycle",
    title: "Loop chico",
    Component: LoopsCycle,
    notes:
      "Diagrama circular a pantalla completa. Narrar los 5 pasos en orden y el footer: ticket → spec en repo → agente → npm test + review → merge. Copilot coding agent con reglas claras. Inner loop; outer loop = lessons en markdown (mencionar 10 seg si hay tiempo).",
  },
  {
    id: "c5-loops-pieces",
    title: "Piezas del loop",
    Component: LoopsPieces,
    notes:
      "Framework Addy (clase 3): automations, skills, MCP, subagentes, markdown estado, verify. No profundizar MCP ni multi-repo.",
  },
  {
    id: "c5-loops-warnings",
    title: "Advertencias loop",
    Component: LoopsWarnings,
    notes:
      "Cierre honesto clase 3. Loop no reemplaza juicio. No mergear lo que no entendés. Loop sin harness = caos. Cierre: Construí el loop, seguí siendo el ingeniero. RECORTABLE: si falta tiempo, saltar piezas y quedarse en compare + cycle.",
  },
  {
    id: "c5-closing",
    title: "Cierre",
    Component: Closing,
    notes: "Cierre fuerte. El salto no es una IA más potente: es mejor contexto, límites y proceso.",
  },
  {
    id: "c5-closing-recap",
    title: "Para llevarse",
    Component: ClosingRecap,
    notes:
      "Recap final encadenado: prompt (base) → context engineering (estratégico) → RAG/grafos/memoria (herramientas del context) → harness (flujo confiable) → loop engineering (autonomía en agentes). Pregunta final: ¿qué pondrían en su harness mañana?",
  },
];
