/**
 * Sesión 2 · Multi-agent, Agentic RAG y gestión de sesiones
 * Claude Certified Architect · Foundations
 *
 * Mismo sistema visual que deck-clase-05: primitivas de Deck05Shell,
 * statements en ember, card grids, tablas y diagramas simples de cajas.
 */
import type React from "react";
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

function ContentSlide({ children }: { children: React.ReactNode }) {
  return (
    <div className="deck-slide-inner flex min-h-0 flex-1 flex-col justify-center gap-8">
      {children}
    </div>
  );
}

function SectionIntro({ question, sub }: { question: string; sub: string }) {
  return (
    <Shell>
      <RevealStack className="flex h-full min-h-0 flex-1 flex-col justify-center gap-8">
        <RevealItem>
          <h2 className="font-display text-[clamp(3.25rem,7.5vw,6.5rem)] font-bold leading-tight text-balance">
            {question}
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-snug text-ember">
            {sub}
          </p>
        </RevealItem>
      </RevealStack>
    </Shell>
  );
}

function FlowBox({
  title,
  sub,
  accent = false,
  className,
}: {
  title: string;
  sub?: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-xl border px-5 py-3 text-center",
        accent ? "border-2 border-ember bg-ember/10" : "border-border bg-surface/80",
        className ?? "",
      ].join(" ")}
    >
      <div className="font-display text-lg font-bold leading-tight">{title}</div>
      {sub && <div className="mt-1 text-sm text-muted-foreground leading-snug">{sub}</div>}
    </div>
  );
}

function FlowArrow() {
  return (
    <span aria-hidden className="shrink-0 font-mono text-2xl text-ember">
      →
    </span>
  );
}

function FlowChain({ items }: { items: { title: string; sub?: string; accent?: boolean }[] }) {
  return (
    <RevealStack className="flex flex-wrap items-center gap-4">
      {items.map((item, i) => (
        <RevealItem key={item.title} className="flex items-center gap-4">
          <FlowBox title={item.title} sub={item.sub} accent={item.accent} />
          {i < items.length - 1 && <FlowArrow />}
        </RevealItem>
      ))}
    </RevealStack>
  );
}

function CrossCard({ text }: { text: string }) {
  return (
    <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-surface/80 p-6">
      <span aria-hidden className="shrink-0 font-mono text-xl text-ember">
        ×
      </span>
      <span className="font-display text-lg leading-snug">{text}</span>
    </div>
  );
}

function CheckboxCard({ text }: { text: string }) {
  return (
    <div className="flex h-full items-center gap-4 rounded-2xl border border-border bg-surface/80 p-6">
      <span aria-hidden className="shrink-0 font-mono text-xl text-ember">
        □
      </span>
      <span className="font-display text-lg leading-snug">{text}</span>
    </div>
  );
}

const Cover = () => (
  <Shell>
    <RevealStack className="flex h-full items-center">
      <div>
        <RevealItem>
          <div className="mb-8 font-mono text-lg uppercase tracking-[0.3em] text-ember">
            Sesión 2 · Claude Certified Architect
          </div>
        </RevealItem>
        <RevealItem>
          <h1 className="font-display text-[clamp(4rem,9vw,7rem)] font-bold leading-[0.92] text-balance">
            Varios agentes,
            <br />
            <span className="text-ember">un solo sistema.</span>
          </h1>
        </RevealItem>
        <RevealItem>
          <SlideLead className="mt-10 max-w-[1300px]">
            Multi-agent, Agentic RAG y gestión de sesiones: coordinar agentes, buscar con criterio
            y no perder el hilo de la conversación.
          </SlideLead>
        </RevealItem>
      </div>
    </RevealStack>
  </Shell>
);

const Recap = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Lo que quedó de la sesión 1</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Agente", "Modelo + herramientas + loop. Decide qué paso sigue."],
          ["Workflow vs agente", "Si el flujo es fijo y conocido, no necesitás un agente."],
          ["Human-in-the-loop", "Checkpoints humanos donde el error duele."],
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
          Hoy: qué pasa cuando <span className="text-foreground font-bold">un solo agente no alcanza</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Agenda = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Hoy</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["01", "Multi-agent", "Patrones para coordinar varios agentes sin que se pisen"],
          ["02", "Agentic RAG", "El retrieval deja de ser una búsqueda fija"],
          ["03", "Sesiones y estado", "El modelo es stateless: quién sostiene la conversación"],
        ]}
        render={(item) => {
          const [num, title, body] = item as [string, string, string];
          return (
            <DeckCard className="flex h-full min-h-[160px] flex-col p-8">
              <div className="font-mono text-lg text-ember/70 mb-3">{num}</div>
              <div className="font-display text-2xl font-bold mb-2">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
    </ContentSlide>
  </Shell>
);

const Thesis = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] max-w-[1500px] text-balance">
        Un agente puede hacer todo.
        <br />
        Eso no significa que deba hacerlo.
      </h2>
    </StatementSlide>
  </Shell>
);

const WhyMulti = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>¿Por qué multi-agente?</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Contexto", "Un agente que hace todo arrastra todo. La ventana se llena de cosas que no usa."],
          ["Especialización", "Un rol claro con pocas herramientas rinde más que un prompt gigante."],
          ["Paralelismo", "Tareas independientes pueden correr a la vez."],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[150px] flex-col p-8">
              <div className="font-display text-2xl font-bold text-ember mb-3">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
      <RevealItem>
        <SlideLead>
          La contra: más costo, más latencia, más cosas que se rompen.{" "}
          <span className="text-foreground font-bold">Multi-agente se justifica, no se asume.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const PatternOrchestrator = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Patrón 1: orquestador y workers</SlideTitle>
      </RevealItem>
      <RevealStack className="flex flex-col items-center gap-3">
        <RevealItem className="w-full max-w-[700px]">
          <FlowBox
            accent
            title="Orquestador"
            sub="entiende el pedido, reparte, junta los resultados"
            className="py-5"
          />
        </RevealItem>
        <RevealItem className="grid w-full max-w-[1100px] grid-cols-3 justify-items-center">
          <span aria-hidden className="font-mono text-2xl text-ember">↓</span>
          <span aria-hidden className="font-mono text-2xl text-ember">↓</span>
          <span aria-hidden className="font-mono text-2xl text-ember">↓</span>
        </RevealItem>
        <RevealItem className="grid w-full max-w-[1100px] grid-cols-3 gap-5">
          <FlowBox title="Worker búsqueda" sub="recupera información" />
          <FlowBox title="Worker análisis" sub="procesa y valida" />
          <FlowBox title="Worker redacción" sub="arma la salida" />
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          Cada worker hace una sola cosa bien. Los resultados{" "}
          <span className="text-foreground font-bold">vuelven al orquestador</span>, que arma la
          respuesta final.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const PatternPipeline = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Patrón 2: pipeline</SlideTitle>
      </RevealItem>
      <FlowChain
        items={[
          { title: "Entrada" },
          { title: "Extraer", sub: "agente 1" },
          { title: "Clasificar", sub: "agente 2" },
          { title: "Redactar", sub: "agente 3" },
          { title: "Validar", sub: "agente 4", accent: true },
        ]}
      />
      <RevealItem>
        <SlideLead>
          La salida de uno es la entrada del siguiente. Orden fijo,{" "}
          <span className="text-foreground font-bold">fácil de debuggear</span>: sabés en qué paso
          se rompió.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const PatternPeer = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Patrón 3: peer-to-peer</SlideTitle>
      </RevealItem>
      <RevealStack className="flex flex-wrap items-center gap-4">
        <RevealItem className="flex items-center gap-4">
          <FlowBox title="Agente A" sub="propone" className="px-8 py-5" />
          <span aria-hidden className="font-mono text-2xl text-ember">↔</span>
        </RevealItem>
        <RevealItem className="flex items-center gap-4">
          <FlowBox title="Agente B" sub="critica" className="px-8 py-5" />
          <span aria-hidden className="font-mono text-2xl text-ember">↔</span>
        </RevealItem>
        <RevealItem>
          <FlowBox title="Agente C" sub="decide" className="px-8 py-5" />
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          Sin jerarquía fija: cualquiera le habla a cualquiera. El más flexible y{" "}
          <span className="text-foreground font-bold">el más difícil de controlar</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const PatternsTable = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Cuándo usar cada uno</SlideTitle>
      </RevealItem>
      <RevealItem>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-ember">
              <th className="pb-4 font-mono text-base uppercase tracking-widest text-ember">Patrón</th>
              <th className="pb-4 font-mono text-base uppercase tracking-widest text-ember">Cuándo</th>
              <th className="pb-4 font-mono text-base uppercase tracking-widest text-ember">Riesgo</th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {[
              [
                "Orquestador y workers",
                "Tareas variadas que hay que repartir",
                "El orquestador es cuello de botella",
              ],
              ["Pipeline", "Proceso conocido, pasos fijos", "Rígido: un paso malo arrastra al resto"],
              ["Peer-to-peer", "Problemas abiertos, agentes que negocian", "Difícil de debuggear y de acotar"],
            ].map(([a, b, c]) => (
              <tr key={a} className="border-b border-border">
                <td className="py-6 font-display font-bold">{a}</td>
                <td className="py-6 text-muted-foreground">{b}</td>
                <td className="py-6 text-muted-foreground">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          Si dudás, <span className="text-foreground font-bold">arrancá con orquestador y workers</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const AgentContract = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El contrato de cada agente</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="definición de un worker" tone="good" className="max-w-[1400px]">
          {`Rol: triage de tickets de soporte

Recibe:   ticket crudo + historial del cliente
Devuelve: { categoria, prioridad, resumen } en JSON
Puede:    buscar en la wiki, leer el CRM
No puede: responder al cliente, escribir en la DB`}
        </CodeBlock>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          Si no podés escribir esto en cinco líneas,{" "}
          <span className="text-foreground font-bold">el agente está mal recortado</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Communication = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Qué se pasan los agentes</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem className="h-full">
          <DeckCard accent className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-ember">Se pasa</div>
            <ul className="space-y-3 text-xl text-muted-foreground leading-snug">
              <li>Resultados estructurados: JSON, no prosa</li>
              <li>Referencias a datos: un id, no el documento entero</li>
              <li>Lo mínimo que el paso siguiente necesita</li>
            </ul>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-muted-foreground">No se pasa</div>
            <ul className="space-y-3 text-xl text-muted-foreground leading-snug">
              <li>El historial completo de la conversación</li>
              <li>Contexto crudo "por las dudas"</li>
              <li>Tool results enteros sin resumir</li>
            </ul>
          </DeckCard>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          Pasá <span className="text-foreground font-bold">resultados</span>, no conversaciones.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const ErrorHandling = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Cuando un agente falla</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Falla técnica", "Timeout o error de tool. Retry con límite y fallback definido."],
          ["Alucinación", "Devuelve algo inventado. El output se valida contra schema antes de usarse."],
          ["Silencio", "No responde. El orquestador tiene timeout propio: no espera para siempre."],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[150px] flex-col p-8">
              <div className="font-display text-2xl font-bold text-ember mb-3">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
      <RevealItem>
        <SlideLead>
          El plan para cada falla se diseña <span className="text-foreground font-bold">antes</span>.
          En producción es tarde.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const CostLatency = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El precio de dividir</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Tokens", "Cada agente paga su system prompt y su contexto. Dividir multiplica."],
          ["Latencia", "Los pasos se encadenan: la respuesta tarda la suma."],
          ["Debug", "Un error puede nacer en un agente y explotar en otro."],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[150px] flex-col p-8">
              <div className="font-display text-2xl font-bold text-ember mb-3">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
      <RevealItem>
        <SlideLead>
          Medí el sistema con un agente{" "}
          <span className="text-foreground font-bold">antes de partirlo en cinco</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const CaseMulti = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Caso: asistente de soporte</SlideTitle>
      </RevealItem>
      <RevealStack className="flex flex-col items-center gap-3">
        <RevealItem className="w-full max-w-[760px]">
          <FlowBox
            accent
            title="Orquestador"
            sub="recibe el mensaje, decide qué hace falta"
            className="py-5"
          />
        </RevealItem>
        <RevealItem className="grid w-full max-w-[1200px] grid-cols-3 justify-items-center">
          <span aria-hidden className="font-mono text-2xl text-ember">↓</span>
          <span aria-hidden className="font-mono text-2xl text-ember">↓</span>
          <span aria-hidden className="font-mono text-2xl text-ember">↓</span>
        </RevealItem>
        <RevealItem className="grid w-full max-w-[1200px] grid-cols-3 gap-5">
          <FlowBox title="Triage" sub="clasifica y prioriza" />
          <FlowBox title="Retrieval" sub="busca en wiki y manuales" />
          <FlowBox title="Redacción" sub="responde con el tono de la empresa" />
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          Arquitectura real, simplificada. Cada worker con su contrato de cinco líneas y{" "}
          <span className="text-foreground font-bold">sin acceso a lo que no necesita</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const RagRecap = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>RAG clásico, repaso en un diagrama</SlideTitle>
      </RevealItem>
      <FlowChain
        items={[
          { title: "Pregunta" },
          { title: "Embedding" },
          { title: "Vector store" },
          { title: "Top-k chunks" },
          { title: "Modelo" },
          { title: "Respuesta", accent: true },
        ]}
      />
      <RevealItem>
        <SlideLead>
          Una búsqueda, definida por código.{" "}
          <span className="text-foreground font-bold">El modelo no decide nada.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const RagLimits = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] max-w-[1500px] text-balance">
        El RAG clásico busca una vez.
        <br />
        Si buscó mal, responde mal.
      </h2>
    </StatementSlide>
  </Shell>
);

const AgenticIntro = () => (
  <SectionIntro question="¿Qué es Agentic RAG?" sub="El agente decide qué, cuándo y dónde buscar" />
);

const AgenticFlow = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El flujo agéntico</SlideTitle>
      </RevealItem>
      <FlowChain
        items={[
          { title: "Pregunta" },
          { title: "¿Qué me falta saber?", sub: "el agente decide" },
          { title: "Buscar", sub: "wiki · DB · API" },
          { title: "Evaluar", sub: "¿alcanza?", accent: true },
          { title: "Responder", sub: "con fuentes" },
        ]}
      />
      <RevealItem>
        <div className="inline-flex items-center gap-3 rounded-full border border-ember/50 bg-ember/5 px-6 py-3">
          <span aria-hidden className="font-mono text-xl text-ember">↺</span>
          <span className="font-mono text-base text-ember">
            no alcanza: reformular la query o cambiar de fuente
          </span>
        </div>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          El retrieval deja de ser un paso fijo y pasa a ser{" "}
          <span className="text-foreground font-bold">una herramienta más del agente</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const AgenticPieces = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Qué cambia respecto al clásico</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          ["Retrieval iterativo", "Busca, mira qué vino, vuelve a buscar con mejor query."],
          ["Multi-fuente", "Wiki, base de datos, APIs externas. Elige dónde según la pregunta."],
          ["Re-ranking", "De 20 chunks recuperados pasan 3: los que responden la pregunta."],
          ["Validación", "Responde citando fuente. Sin fuente, dice que no sabe."],
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

const RagCase = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Caso: wiki de soporte técnico</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="lo que hace el agente por adentro" tone="good" className="max-w-[1500px]">
          {`Usuario: el lector de tarjetas no lee, ¿qué hago?

1. buscar("lector no lee tarjeta")     → 12 resultados, ninguno del modelo X
2. buscar("lector X troubleshooting")  → doc oficial del fabricante
3. evaluar                             → cubre el caso, versión vigente
4. responder con los pasos + link a la fuente`}
        </CodeBlock>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          Dos búsquedas en vez de una. La diferencia entre "no encontré nada" y{" "}
          <span className="text-foreground font-bold">una respuesta útil</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const RagErrors = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>
          Errores comunes en <span className="text-ember">RAG agéntico</span>
        </SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          "Over-retrieval: traer 40 chunks por las dudas y saturar el contexto",
          "Sin fuente de verdad: dos docs se contradicen y el agente elige al azar",
          "Loop infinito: re-buscar sin límite de intentos",
          "Indexar todo: PII y secretos adentro del vector store",
        ]}
        render={(item) => <CrossCard text={item as string} />}
      />
    </ContentSlide>
  </Shell>
);

const RagChecklist = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Antes de implementar</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          "¿Qué fuentes entran y quién las mantiene?",
          "¿Cada cuánto se re-indexa?",
          "¿Qué responde si no encuentra nada?",
          "¿Cuántas búsquedas máximo por pregunta?",
          "¿Cómo medís que responde bien?",
          "¿Qué NO debería estar indexado?",
        ]}
        render={(item) => <CheckboxCard text={item as string} />}
      />
    </ContentSlide>
  </Shell>
);

const StateThesis = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] max-w-[1500px] text-balance">
        El modelo es stateless.
        <br />
        La conversación la sostenés vos.
      </h2>
    </StatementSlide>
  </Shell>
);

const SessionMemoryContext = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Contexto, sesión, memoria</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Contexto", "Lo que el modelo ve en esta llamada.", "Vive en la ventana, muere con ella."],
          ["Sesión", "Una conversación con principio y fin.", "Vive en tu backend mientras dura."],
          ["Memoria", "Lo que sobrevive entre sesiones.", "Vive en una DB, se trae cuando sirve."],
        ]}
        render={(item) => {
          const [title, body, where] = item as [string, string, string];
          return (
            <DeckCard className="flex h-full min-h-[180px] flex-col p-8">
              <div className="font-mono text-sm text-ember mb-3 uppercase tracking-widest">{title}</div>
              <div className="font-display text-xl leading-snug mb-3 flex-1">{body}</div>
              <div className="border-t border-border pt-3 text-base text-muted-foreground">{where}</div>
            </DeckCard>
          );
        }}
      />
      <RevealItem>
        <SlideLead>
          Tres cosas distintas. Si las mezclás,{" "}
          <span className="text-foreground font-bold">el bug aparece solo</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Persistence = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Dónde vive cada cosa</SlideTitle>
      </RevealItem>
      <RevealItem>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-ember">
              <th className="pb-4 font-mono text-base uppercase tracking-widest text-ember">Qué</th>
              <th className="pb-4 font-mono text-base uppercase tracking-widest text-ember">Dónde</th>
              <th className="pb-4 font-mono text-base uppercase tracking-widest text-ember">Por qué</th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {[
              ["Turnos recientes", "cache (Redis)", "rápido, se descarta al cerrar"],
              ["Conversación completa", "base de datos", "auditoría y análisis"],
              ["Conocimiento del usuario", "DB + vector store", "memoria de largo plazo"],
              ["Documentos y wiki", "vector store", "retrieval semántico"],
            ].map(([a, b, c]) => (
              <tr key={a} className="border-b border-border">
                <td className="py-5 font-display font-bold">{a}</td>
                <td className="py-5 font-mono text-ember">{b}</td>
                <td className="py-5 text-muted-foreground">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const ConversationGrowth = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Cuando la conversación crece</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Truncar", "Cortás los turnos viejos. Barato. Perdés lo que dijeron al principio.", false],
          [
            "Resumen progresivo",
            "Comprimís lo viejo en un resumen que se va actualizando. Cuesta una llamada extra, no pierde decisiones.",
            true,
          ],
          ["Extracción selectiva", "Guardás solo datos duros y decisiones. Lo demás se va.", false],
        ]}
        render={(item) => {
          const [title, body, accent] = item as [string, string, boolean];
          return (
            <DeckCard accent={accent} className="flex h-full min-h-[190px] flex-col p-8">
              <div className="font-display text-2xl font-bold mb-3">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
      <RevealItem>
        <SlideLead>
          El historial completo no entra.{" "}
          <span className="text-foreground font-bold">Elegí qué perder.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const MultiUser = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Caso: bot de WhatsApp, muchas conversaciones</SlideTitle>
      </RevealItem>
      <RevealStack className="flex flex-col gap-3">
        {[
          ["Usuario A", "sesión A · historial + estado + memoria"],
          ["Usuario B", "sesión B · historial + estado + memoria"],
          ["Usuario C", "sesión C · historial + estado + memoria"],
        ].map(([user, session]) => (
          <RevealItem key={user} className="flex items-center gap-4">
            <FlowBox title={user} className="w-[280px]" />
            <FlowArrow />
            <FlowBox title={session} className="flex-1 text-left" />
          </RevealItem>
        ))}
      </RevealStack>
      <RevealStack className="grid grid-cols-2 gap-5">
        <RevealItem className="h-full">
          <DeckCard accent className="h-full p-6">
            <div className="font-mono text-sm text-ember mb-2 uppercase tracking-widest">La clave</div>
            <div className="font-display text-lg leading-snug">
              session_id = número de teléfono. Todo lo que persiste cuelga de ahí.
            </div>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard className="h-full border-2 border-ember/40 p-6">
            <div className="font-mono text-sm text-ember mb-2 uppercase tracking-widest">El bug clásico</div>
            <div className="font-display text-lg leading-snug">
              Contexto compartido entre sesiones: el usuario A ve datos del usuario B.
            </div>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const Identity = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Retomar a un usuario</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="lo que se carga al arrancar la sesión" tone="good" className="max-w-[1400px]">
          {`usuario: 8841

memoria    → prefiere factura A, ya reportó el bug del lector
resumen    → conversaciones anteriores, comprimidas
historial  → solo los últimos turnos de esta sesión`}
        </CodeBlock>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          Continuidad no es guardar todo. Es{" "}
          <span className="text-foreground font-bold">traer poco y bien elegido</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const CombinedErrors = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>
          Errores al <span className="text-ember">combinar todo</span>
        </SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          "Multi-agente porque suena bien: un agente alcanzaba",
          "Cada worker con su propio RAG: contexto duplicado, factura doble",
          "Sesión infinita sin resumen: la ventana explota a los 50 turnos",
          "Estado importante solo en la ventana: se corta la sesión y no queda nada",
        ]}
        render={(item) => <CrossCard text={item as string} />}
      />
    </ContentSlide>
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
          ["Multi-agente", "solo cuando un agente no alcanza"],
          ["Patrones", "orquestador, pipeline, peer-to-peer: cada uno con su caso"],
          ["Agentic RAG", "el agente decide qué buscar y evalúa lo que encuentra"],
          ["Sesiones", "el estado vive afuera del modelo, con dueño claro"],
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

const Closing = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] max-w-[1500px] text-balance">
        Más agentes no es mejor arquitectura.
        <br />
        Mejor coordinación, sí.
      </h2>
    </StatementSlide>
  </Shell>
);

const NextSession = () => (
  <Shell bg="panel">
    <StatementSlide>
      <div className="flex flex-col gap-8">
        <h2 className="font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-bold leading-[0.98]">
          Próxima sesión:
          <br />
          <span className="text-ember">diseño de ruta técnica MCP.</span>
        </h2>
        <SlideLead className="max-w-[1200px]">
          Todas estas piezas necesitan herramientas. MCP es cómo se conectan sin escribir un
          conector por cada una.
        </SlideLead>
      </div>
    </StatementSlide>
  </Shell>
);

export const slidesSesion02: SlideDefBase[] = [
  {
    id: "s2-cover",
    title: "Portada",
    Component: Cover,
    notes:
      "Presentación breve. Tres bloques hoy: multi-agent, Agentic RAG, sesiones. Es la sesión más densa en conceptos nuevos: avisar que el bloque 3 se puede recortar si venimos justos.",
  },
  {
    id: "s2-recap",
    title: "Recap sesión 1",
    Component: Recap,
    notes:
      "5 min máximo. No volver a explicar: una frase por card. Preguntar si quedó alguna duda grande de la sesión 1 antes de arrancar.",
  },
  {
    id: "s2-agenda",
    title: "Agenda",
    Component: Agenda,
    notes: "30 seg. Tres bloques. El hilo: coordinar, buscar, recordar.",
  },
  {
    id: "s2-thesis",
    title: "Tesis",
    Component: Thesis,
    notes:
      "Pausa 3 seg. La tesis del bloque 1: dividir no es un fin, es una herramienta. Todo lo que sigue cuelga de esta frase.",
  },
  {
    id: "s2-why",
    title: "¿Por qué multi-agente?",
    Component: WhyMulti,
    notes:
      "Tres razones válidas: contexto, especialización, paralelismo. Insistir en la contra: multi-agente se justifica, no se asume. Conectar con la tesis anterior.",
  },
  {
    id: "s2-orchestrator",
    title: "Orquestador y workers",
    Component: PatternOrchestrator,
    notes:
      "El patrón default. Narrar el diagrama: pedido entra, orquestador reparte, workers ejecutan, resultados vuelven. Analogía: tech lead con equipo.",
  },
  {
    id: "s2-pipeline",
    title: "Pipeline",
    Component: PatternPipeline,
    notes:
      "Cadena fija. Cuándo brilla: procesos conocidos tipo extraer, clasificar, redactar, validar. Fácil de debuggear porque sabés en qué paso se rompió.",
  },
  {
    id: "s2-peer",
    title: "Peer-to-peer",
    Component: PatternPeer,
    notes:
      "Sin jerarquía: proponen, critican, deciden entre sí. Útil para problemas abiertos (debate, revisión cruzada). Advertir: es el más difícil de acotar y el más caro.",
  },
  {
    id: "s2-patterns-table",
    title: "Comparación de patrones",
    Component: PatternsTable,
    notes:
      "Tabla resumen. Recorrer riesgo por fila, no releer todo. Cierre: si dudás, orquestador y workers.",
  },
  {
    id: "s2-contract",
    title: "Contrato de agente",
    Component: AgentContract,
    notes:
      "Un agente se define como una API: recibe, devuelve, puede, no puede. El test de las cinco líneas: si no entra, el recorte está mal hecho.",
  },
  {
    id: "s2-communication",
    title: "Comunicación entre agentes",
    Component: Communication,
    notes:
      "Qué viaja entre agentes. Resultados estructurados sí, conversaciones no. El historial completo entre agentes es el error más común: duplica tokens y mete ruido.",
  },
  {
    id: "s2-errors",
    title: "Manejo de errores",
    Component: ErrorHandling,
    notes:
      "Tres modos de falla: técnica, alucinación, silencio. Para cada uno hay una respuesta de diseño: retry acotado, validación por schema, timeout del orquestador.",
  },
  {
    id: "s2-cost",
    title: "Costos y latencia",
    Component: CostLatency,
    notes:
      "Honestidad de costos: dividir multiplica tokens y suma latencia. Regla práctica: medir con un agente antes de partir en cinco.",
  },
  {
    id: "s2-case-multi",
    title: "Caso multi-agente",
    Component: CaseMulti,
    notes:
      "Acá va tu caso real de asistentes (tipo Sofía / ValerIA / Rosario) contado en genérico: sin nombres de cliente ni detalles contractuales. Contar una anécdota de algo que se rompió y cómo el contrato lo arregló.",
  },
  {
    id: "s2-rag-recap",
    title: "RAG clásico",
    Component: RagRecap,
    notes:
      "Repaso de 2 min: embeddings, vector store, top-k. El punto no es el pipeline, es quién decide: acá decide el código, siempre igual.",
  },
  {
    id: "s2-rag-limits",
    title: "Límite del clásico",
    Component: RagLimits,
    notes:
      "Punchline. Una sola búsqueda, sin evaluar lo que vino. Si la query era mala o el doc estaba en otra fuente, la respuesta nace muerta.",
  },
  {
    id: "s2-agentic-intro",
    title: "¿Qué es Agentic RAG?",
    Component: AgenticIntro,
    notes: "Pausa 2 seg. Pregunta en pantalla, misma estructura que los bloques de la serie. No explicar todavía.",
  },
  {
    id: "s2-agentic-flow",
    title: "Flujo agéntico",
    Component: AgenticFlow,
    notes:
      "Narrar el diagrama: el agente decide qué le falta, busca, evalúa, y si no alcanza reformula o cambia de fuente. El loop de abajo es la diferencia con el clásico.",
  },
  {
    id: "s2-agentic-pieces",
    title: "Qué cambia",
    Component: AgenticPieces,
    notes:
      "Cuatro piezas: iterar, multi-fuente, re-ranking, validación con fuente. La última es la más importante para sistemas serios: sin fuente, dice que no sabe.",
  },
  {
    id: "s2-rag-case",
    title: "Caso wiki soporte",
    Component: RagCase,
    notes:
      "Caso tipo wiki de soporte técnico (inspirado en casos reales, en genérico). Leer el trace: la segunda búsqueda es la que salva la respuesta. Eso el RAG clásico no lo hace.",
  },
  {
    id: "s2-rag-errors",
    title: "Errores RAG agéntico",
    Component: RagErrors,
    notes:
      "Los cuatro clásicos. Over-retrieval conecta con contexto (sesión 5). El límite de intentos evita loops carísimos. Lo de PII en el índice: nunca, sin excepción.",
  },
  {
    id: "s2-rag-checklist",
    title: "Checklist RAG",
    Component: RagChecklist,
    notes:
      "Checklist para llevarse. Recorrer rápido. La última pregunta (qué NO indexar) es la que nadie se hace a tiempo.",
  },
  {
    id: "s2-state-thesis",
    title: "Tesis de estado",
    Component: StateThesis,
    notes:
      "Pausa. Cambio de bloque. El modelo no recuerda nada entre llamadas: toda la sensación de conversación la construye tu sistema.",
  },
  {
    id: "s2-session-memory-context",
    title: "Contexto, sesión, memoria",
    Component: SessionMemoryContext,
    notes:
      "La slide conceptual del bloque. Tres cosas con vida distinta: la ventana muere con la llamada, la sesión con la conversación, la memoria sobrevive. Ejemplos orales de cada una.",
  },
  {
    id: "s2-persistence",
    title: "Persistencia",
    Component: Persistence,
    notes:
      "Tabla rápida. No es dogma: es el mapeo típico. Lo importante es que cada dato tenga un lugar decidido, no que quede 'en el chat'.",
  },
  {
    id: "s2-growth",
    title: "Conversación que crece",
    Component: ConversationGrowth,
    notes:
      "Tres estrategias cuando el historial no entra. El resumen progresivo es el equilibrio para la mayoría de los casos (card resaltada). En sesión 5 profundizamos cuándo disparar cada una.",
  },
  {
    id: "s2-multiuser",
    title: "Caso WhatsApp",
    Component: MultiUser,
    notes:
      "Caso bot de WhatsApp con muchas conversaciones simultáneas (patrón general, sin datos de cliente). Aislamiento por session_id. Contar el bug clásico de contexto cruzado: es gravísimo y pasa más de lo que parece.",
  },
  {
    id: "s2-identity",
    title: "Identidad y continuidad",
    Component: Identity,
    notes:
      "Qué se carga al arrancar una sesión: memoria seleccionada, resumen, últimos turnos. Continuidad es curaduría, no volcar todo el historial.",
  },
  {
    id: "s2-combined-errors",
    title: "Errores combinando todo",
    Component: CombinedErrors,
    notes:
      "Los errores aparecen al combinar: multi-agente innecesario, RAG duplicado por worker, sesión sin resumen, estado solo en la ventana. Preguntar cuál les suena de su sistema.",
  },
  {
    id: "s2-recap-final",
    title: "Para llevarse",
    Component: RecapFinal,
    notes: "Recap encadenado, una línea por bloque. Leerlo despacio, es lo que se llevan.",
  },
  {
    id: "s2-closing",
    title: "Cierre",
    Component: Closing,
    notes: "Cierre fuerte. Más agentes no es mejor arquitectura, mejor coordinación sí. Pausa y siguiente.",
  },
  {
    id: "s2-next",
    title: "Próxima sesión",
    Component: NextSession,
    notes:
      "Teaser de 1 min: los agentes de hoy usan herramientas, MCP es el protocolo para conectarlas. Cierre y preguntas.",
  },
];
