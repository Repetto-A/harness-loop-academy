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
    "Grafo a partir del código",
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
  <Shell section="05">
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

const Thesis = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold leading-[1.05] max-w-[1400px] text-balance">
        Cómo darle contexto de tu sistema, las reglas de negocio del banco y cómo validar lo que nos
        propone.
      </h2>
    </StatementSlide>
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
          ¿Qué es un grafo de código?
        </h2>
      </RevealItem>
      <RevealItem>
        <p className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-snug text-ember">
          Code Knowledge Graph
        </p>
      </RevealItem>
    </RevealStack>
  </Shell>
);

const GRAPH_CONCEPT_POINTS = [
  "Nodos: funciones, clases, endpoints, tablas, jobs, tests",
  "Aristas: llama, importa, escribe en, testea",
  "Preguntas de impacto, no de similitud textual",
] as const;

const GraphConcept = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El código como red de relaciones</SlideTitle>
      </RevealItem>
      <RevealItem>
        <SlideLead className="max-w-[1400px]">
          Indexás el repo una vez y queda un mapa estructural. No es RAG por similitud, son vínculos
          explícitos entre piezas del sistema.
        </SlideLead>
      </RevealItem>
      <RevealItem>
        <DeckCard accent className="p-8">
          <ul className="space-y-4 text-xl text-muted-foreground leading-snug">
            {GRAPH_CONCEPT_POINTS.map((t) => (
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
      <RevealItem>
        <SlideLead>
          El grafo responde{" "}
          <span className="text-foreground font-bold">qué se rompe si tocás esto</span>. Los vectores
          responden <span className="text-foreground font-bold">qué se parece</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const CODE_GRAPH_IMAGE = "/harness-05/code-graph.png";

const GraphVisual = () => (
  <Shell flush>
    <RevealStack className="flex h-full min-h-0 w-full flex-1 items-center justify-center px-4 py-2">
      <RevealItem className="flex h-full w-full max-w-[min(100%,1920px)] items-center justify-center">
        <img
          src={CODE_GRAPH_IMAGE}
          alt="Grafo de código: nodos conectados (endpoint, validador, servicio, tabla, job, test) y comparación de 412.000 tokens leyendo archivo por archivo versus 3.400 preguntando al grafo"
          width={1920}
          height={1080}
          className="h-full w-full object-contain"
        />
      </RevealItem>
    </RevealStack>
  </Shell>
);

const GraphCodebaseMemory = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El mix que hoy mejor encaja</SlideTitle>
      </RevealItem>
      <RevealItem>
        <SlideLead className="max-w-[1400px]">
          <span className="text-foreground font-medium">codebase-memory-mcp</span> une grafo estructural y
          búsqueda semántica local. El agente consulta vía MCP sin leer el repo archivo por archivo.
        </SlideLead>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem>
          <DeckCard accent className="flex h-full flex-col p-8">
            <div className="font-mono text-ember mb-3 uppercase tracking-widest">Grafo</div>
            <ul className="space-y-2 text-lg text-muted-foreground leading-snug">
              <li>¿Quién llama a esta función?</li>
              <li>¿Qué endpoints usan este validador?</li>
              <li>Trace de impacto en sub-milisegundo</li>
            </ul>
          </DeckCard>
        </RevealItem>
        <RevealItem>
          <DeckCard className="flex h-full flex-col p-8">
            <div className="font-mono text-ember mb-3 uppercase tracking-widest">Semántica local</div>
            <ul className="space-y-2 text-lg text-muted-foreground leading-snug">
              <li>Buscás “retry con backoff”</li>
              <li>Encuentra publish, emit o dispatch</li>
              <li>Cuando el nombre no coincide</li>
            </ul>
          </DeckCard>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <DeckCard accent className="mt-2 p-8">
          <div className="font-mono text-sm text-ember mb-3 uppercase tracking-widest">
            codebase-memory-mcp · referencia open source
          </div>
          <ul className="space-y-2 text-lg text-muted-foreground leading-snug">
            <li>Indexa el repo en un grafo persistente (tree-sitter + LSP híbrido, 158 lenguajes)</li>
            <li>~120× menos tokens que explorar archivo por archivo (3.400 vs 412.000 en su benchmark)</li>
            <li>14 herramientas MCP: trace, impacto, arquitectura, Cypher, código muerto</li>
            <li>100% local, binario estático, el código no sale de tu máquina</li>
          </ul>
          <p className="mt-4 text-base text-muted-foreground/90">
            En banco lo tomamos como{" "}
            <span className="text-foreground font-medium">referencia de arquitectura</span> para el harness,
            no como algo para instalar mañana en prod.
          </p>
        </DeckCard>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const GraphExample = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Preguntas de impacto que el grafo responde</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="impacto de un cambio" tone="default">
          {`Si modifico la validación de clientes corporativos:

→ ¿qué endpoints la usan?
→ ¿qué jobs dependen de eso?
→ ¿qué tests cubren el flujo?
→ ¿qué módulos podrían romperse?`}
        </CodeBlock>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          Eso es saber <span className="text-foreground font-bold">qué se va a romper</span> antes de tocar, no
          buscar código parecido.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const GraphProsCons = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Grafo: pros y contras</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-8">
        <RevealItem>
          <DeckCard accent className="p-8">
            <div className="font-mono text-ember mb-4 uppercase tracking-widest">Pros</div>
            <ul className="space-y-2 text-xl text-muted-foreground">
              <li>Costo, hasta 120x menos tokens que leer archivo por archivo</li>
              <li>Latencia, consultas en sub-milisegundo</li>
              <li>Precisión, menos ruido y sin perderse en el medio</li>
              <li>Trazabilidad de impacto, relaciones explícitas</li>
            </ul>
          </DeckCard>
        </RevealItem>
        <RevealItem>
          <DeckCard className="p-8">
            <div className="font-mono text-muted-foreground mb-4 uppercase tracking-widest">Contras</div>
            <ul className="space-y-2 text-xl text-muted-foreground">
              <li>Mantenimiento y costo</li>
              <li>Complejidad de armarlo</li>
              <li>Riesgo de grafo desactualizado</li>
              <li>Falsa sensación de precisión</li>
            </ul>
          </DeckCard>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <p className="text-xl text-muted-foreground/80">
          Esto existe hoy: el LSP del IDE, indexadores de símbolos, Graphify, MCP servers open source. Lo
          tomamos como idea para el harness, no como rollout inmediato en prod.
        </p>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const ENGRAM_IMAGE = "/harness-05/engram-memory.png";

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

const EngramVisual = () => (
  <Shell flush>
    <RevealStack className="flex h-full min-h-0 w-full flex-1 items-center justify-center px-6 py-4">
      <RevealItem className="flex h-full w-full max-w-[min(100%,1920px)] items-center justify-center">
        <img
          src={ENGRAM_IMAGE}
          alt="Diagrama de Engram: tres sesiones de IA (1, 2 y 3) guardan decisiones, convenciones, bugs resueltos y resúmenes en una memoria persistente central, y una sesión nueva recupera ese contexto; sobrevive entre sesiones y compactaciones"
          width={1536}
          height={1024}
          className="h-full w-full object-contain"
        />
      </RevealItem>
    </RevealStack>
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

const HarnessComponentsCore = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Qué compone un harness (1/2)</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={HARNESS_CORE}
        render={(t) => <DeckCard className="font-display text-lg leading-snug">{t as string}</DeckCard>}
      />
      <RevealItem>
        <SlideLead>La base del flujo, qué querés, con qué, bajo qué reglas y cómo se chequea solo.</SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const HarnessComponentsGuard = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Qué compone un harness (2/2)</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={HARNESS_GUARD}
        render={(t) => <DeckCard className="font-display text-lg leading-snug">{t as string}</DeckCard>}
      />
      <RevealItem>
        <SlideLead>
          Nada de magia. Tampoco un agente tocando producción solo. Es{" "}
          <span className="text-foreground font-bold">tener el control</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const MINI_HARNESS_STEPS = [
  "1. Escribile una spec clara",
  "2. Pasale los archivos que tocan",
  "3. Pedile el plan antes del código",
  "4. Pedile riesgos y supuestos",
  "5. Pedile los tests",
  "6. Chequealo contra las reglas internas",
  "7. Revisalo vos",
  "8. Volvé con el error concreto",
] as const;

const MiniHarnessCopilot = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Mini-harness manual con Copilot</SlideTitle>
      </RevealItem>
      <RevealItem>
        <SlideLead>No hace falta una herramienta nueva, con Copilot ya lo armás a mano.</SlideLead>
      </RevealItem>
      <CardGrid
        cols={2}
        items={MINI_HARNESS_STEPS}
        render={(t) => {
          const step = t as string;
          return (
            <DeckCard className="flex items-center gap-4 p-5">
              <span className="text-ember font-mono text-lg">{step.split(".")[0]}</span>
              <span className="font-display text-lg">{step.replace(/^\d+\.\s/, "")}</span>
            </DeckCard>
          );
        }}
      />
    </ContentSlide>
  </Shell>
);

function FlowPanel({ label, steps }: { label: string; steps: string[] }) {
  return (
    <DeckCard className="p-8">
      <div className="font-mono text-ember mb-3 uppercase tracking-widest">{label}</div>
      <ul className="space-y-1.5 text-lg text-muted-foreground">
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </DeckCard>
  );
}

const FlowsLegacyChange = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Flujos concretos (1/2)</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-8">
        <RevealItem>
          <FlowPanel
            label="A · Entender legacy"
            steps={[
              "Identificar archivos",
              "Pedir resumen",
              "Pedir diagrama textual",
              "Pedir puntos de riesgo",
              "Pedir tests faltantes",
              "Validar con código real",
            ]}
          />
        </RevealItem>
        <RevealItem>
          <FlowPanel
            label="B · Cambiar regla de negocio"
            steps={[
              "Escribir spec",
              "Recuperar contexto",
              "Identificar impacto",
              "Proponer cambios",
              "Generar tests",
              "Revisar seguridad y edge cases",
            ]}
          />
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const FlowsTestRefactor = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Flujos concretos (2/2)</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-8">
        <RevealItem>
          <FlowPanel
            label="C · Tests sobre código existente"
            steps={[
              "Pedir matriz de casos",
              "Detectar ramas no cubiertas",
              "Generar tests",
              "Ejecutar",
              "Corregir con errores reales",
            ]}
          />
        </RevealItem>
        <RevealItem>
          <FlowPanel
            label="D · Refactor seguro"
            steps={[
              "Definir objetivo",
              "Congelar comportamiento (tests antes)",
              "Cambios pequeños",
              "Validación incremental",
              "Rollback mental",
            ]}
          />
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const DoDont = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Qué sí y qué no</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-8">
        <RevealItem>
          <DeckCard accent className="p-8">
            <div className="font-mono text-ember mb-4 uppercase tracking-widest">Sí</div>
            <ul className="space-y-2 text-lg text-muted-foreground">
              <li>Usar IA para entender código</li>
              <li>Pedir plan antes de implementar</li>
              <li>Pedir riesgos y supuestos</li>
              <li>Usar specs y tests como contrato</li>
              <li>Usar contexto seleccionado</li>
              <li>Documentar decisiones</li>
            </ul>
          </DeckCard>
        </RevealItem>
        <RevealItem>
          <DeckCard className="border-2 border-[oklch(0.6_0.22_25)] bg-[oklch(0.6_0.22_25)]/10 p-8">
            <div className="font-mono text-[oklch(0.7_0.2_25)] mb-4 uppercase tracking-widest">No</div>
            <ul className="space-y-2 text-lg text-muted-foreground">
              <li>Pegar datos sensibles</li>
              <li>Confiar sin validar</li>
              <li>Pedir cambios enormes de una vez</li>
              <li>Aceptar código que no entendés</li>
              <li>Saltarse permisos / compliance / review</li>
              <li>Confundir “parece” con “está” correcto</li>
            </ul>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const LoopsAgents = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>
          Loops y agentes{" "}
          <span className="text-muted-foreground text-[clamp(1.25rem,2vw,1.75rem)]">
            (tendencia, no recomendación de prod)
          </span>
        </SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        gap="gap-5"
        items={[
          ["Loop", "Iteración controlada, planear, ejecutar, observar, corregir"],
          ["Agente", "Modelo + herramientas + límites + feedback"],
          ["Sin harness", "Solo una forma más rápida de equivocarse con confianza"],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="p-7">
              <div className="font-display text-2xl font-bold text-ember mb-2">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug">{body}</div>
            </DeckCard>
          );
        }}
      />
    </ContentSlide>
  </Shell>
);

const Activity = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Actividad · 15 min</SlideTitle>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          En salas breakout (3-4 personas): elijan un cambio real y armen el mini-harness antes de tocar código.
        </SlideLead>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          "Cambio elegido (1 oración)",
          "Spec, qué y por qué",
          "Contexto a recuperar (docs, tests, modelos)",
          "Impacto, qué podría romperse",
          "Qué NO compartir con la IA",
          "Cómo se valida (tests, review, criterios)",
          "Qué se registra para auditoría",
        ]}
        render={(t) => (
          <DeckCard className="flex items-center gap-4 p-5">
            <span aria-hidden className="text-ember font-mono text-lg">□</span>
            <span className="font-display text-lg">{t as string}</span>
          </DeckCard>
        )}
      />
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
          ["Context engineering", "es el puente"],
          ["RAG, grafos y memoria", "dan mejor contexto"],
          ["Harness engineering", "lo vuelve un flujo confiable"],
          ["En entornos regulados", "la ventaja es velocidad con trazabilidad"],
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
    id: "c5-thesis",
    title: "Tesis",
    Component: Thesis,
    notes: "Pausa 3 seg. Tesis completa en una frase. Debe quedar: contexto del sistema, reglas del banco, validar lo que propone.",
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
    title: "¿Qué es un grafo de código?",
    Component: GraphIntro,
    notes:
      "Pausa 2 seg. Portada del bloque, misma estructura que RAG y CAG. Sigla en inglés: Code Knowledge Graph.",
  },
  {
    id: "c5-graph-concept",
    title: "Grafo: concepto",
    Component: GraphConcept,
    notes:
      "Concepto primero. Nodos y aristas del sistema. No es similitud semántica, son vínculos explícitos. Cierre: grafo = impacto, vectores = parecido. Puente con slide 7.",
  },
  {
    id: "c5-graph-visual",
    title: "Grafo de código",
    Component: GraphVisual,
    notes:
      "Diagrama a pantalla completa. Izquierda: nodos y aristas. Derecha: 412k vs 3.4k tokens, 120x. Fuente benchmark codebase-memory-mcp. En Copilot hoy adjuntás los 3 archivos del grafo, no 20.",
  },
  {
    id: "c5-graph-mcp",
    title: "codebase-memory-mcp",
    Component: GraphCodebaseMemory,
    notes:
      "GRAN referencia del mix grafo + semántica. MCP local, 14 tools, tree-sitter + LSP, 100% local. Benchmark 120x menos tokens. En banco: arquitectura de referencia, no prod mañana. github.com/DeusData/codebase-memory-mcp",
  },
  {
    id: "c5-graph-example",
    title: "Grafo ejemplo",
    Component: GraphExample,
    notes: "Ejemplo: cambiar validación de clientes corporativos → qué endpoints, jobs, tests, módulos. Trazabilidad de impacto, no similitud.",
  },
  {
    id: "c5-graph-pros-cons",
    title: "Grafo pros/contras",
    Component: GraphProsCons,
    notes:
      "Pros: trazabilidad, navegación, contexto para IA. Contras: mantenimiento, complejidad, costo, grafo desactualizado, falsa precisión. Mencionar Graphify / indexadores / open source como CONCEPTO, no como demo dependiente.",
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
      "Diagrama a pantalla completa. Sesiones guardan en la memoria central; sesión nueva recupera contexto. Sobrevive entre sesiones y compactaciones. No leer texto, narrar el flujo.",
  },
  {
    id: "c5-harness-def",
    title: "Harness: definición",
    Component: HarnessDef,
    notes: "12 min. Definición: contexto + reglas + herramientas + validaciones + límites alrededor de la IA. Producir cambios útiles y verificables.",
  },
  {
    id: "c5-harness-core",
    title: "Harness: base",
    Component: HarnessComponentsCore,
    notes: "Specs, contexto, reglas, tests, linters, CI/CD. La base operativa del harness.",
  },
  {
    id: "c5-harness-guard",
    title: "Harness: control",
    Component: HarnessComponentsGuard,
    notes:
      "Seguridad, review, checklists, ambientes, logs, límites. Aclarar: no es magia, no es agente en prod solo. Es madurez y control.",
  },
  {
    id: "c5-mini-harness",
    title: "Mini-harness con Copilot",
    Component: MiniHarnessCopilot,
    notes: "Aunque solo tengamos Copilot: spec → archivos → plan → riesgos → tests → validar reglas → review → iterar con errores concretos. Esto es harness manual, hoy, sin instalar nada.",
  },
  {
    id: "c5-flows-1",
    title: "Flujos A y B",
    Component: FlowsLegacyChange,
    notes: "8 min. A: entender módulo legacy. B: cambiar regla de negocio. Recorrer pasos, anclar en su día a día.",
  },
  {
    id: "c5-flows-2",
    title: "Flujos C y D",
    Component: FlowsTestRefactor,
    notes: "C: tests sobre código existente (matriz de casos, ramas no cubiertas, ejecutar, corregir). D: refactor seguro (congelar comportamiento con tests antes, cambios chicos, rollback mental).",
  },
  {
    id: "c5-do-dont",
    title: "Sí y no",
    Component: DoDont,
    notes: "4 min. Lista clara de sí/no. El no más importante: datos sensibles y confiar sin validar. 'Parece correcto' ≠ 'está correcto'.",
  },
  {
    id: "c5-loops-agents",
    title: "Loops y agentes",
    Component: LoopsAgents,
    notes:
      "5 min (RECORTABLE si falta tiempo). Loop = iteración controlada. Agente = modelo + herramientas + límites + feedback. Sin harness, un agente es una forma más rápida de equivocarse con confianza. Tendencia, no recomendación para prod bancaria.",
  },
  {
    id: "c5-activity",
    title: "Actividad",
    Component: Activity,
    notes:
      "15 min. Salas breakout: arman el mini-harness de un cambio real antes de tocar código (cambio, spec, contexto, impacto, qué no compartir, validación, auditoría). Al volver, 1-2 equipos comparten en pantalla o por chat.",
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
      "Recap final encadenado: prompting (base) → context engineering (puente) → RAG/grafos/memoria (contexto) → harness (flujo confiable) → en entornos regulados, velocidad con trazabilidad. Pregunta final por chat o micrófono: ¿qué pondrían en su mini-harness mañana?",
  },
];
