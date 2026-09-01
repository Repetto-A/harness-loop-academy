/**
 * Sesión 5 · Context management, reliability y simulacro final
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

function FlowChain({ items }: { items: { title: string; sub?: string; accent?: boolean }[] }) {
  return (
    <RevealStack className="flex flex-wrap items-center gap-4">
      {items.map((item, i) => (
        <RevealItem key={item.title} className="flex items-center gap-4">
          <FlowBox title={item.title} sub={item.sub} accent={item.accent} />
          {i < items.length - 1 && (
            <span aria-hidden className="shrink-0 font-mono text-2xl text-ember">
              →
            </span>
          )}
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
            Sesión 5 · Claude Certified Architect
          </div>
        </RevealItem>
        <RevealItem>
          <h1 className="font-display text-[clamp(3.5rem,8vw,6.5rem)] font-bold leading-[0.95] text-balance">
            Context management,
            <br />
            <span className="text-ember">reliability y simulacro final.</span>
          </h1>
        </RevealItem>
        <RevealItem>
          <SlideLead className="mt-10 max-w-[1300px]">
            Última bajada teórica del programa. Después, a diseñar: el simulacro integra todo lo
            que vimos.
          </SlideLead>
        </RevealItem>
      </div>
    </RevealStack>
  </Shell>
);

const JourneyMap = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El recorrido hasta acá</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={4}
        items={[
          ["01", "Arquitectura", "Agentes, workflows y cuándo usar cada uno"],
          ["02", "Multi-agent y RAG", "Coordinar agentes, retrieval con criterio, sesiones"],
          ["03", "MCP", "Herramientas conectadas por protocolo, no a mano"],
          ["04", "Claude Code", "Workflows técnicos y prompts de producción"],
        ]}
        render={(item) => {
          const [num, title, body] = item as [string, string, string];
          return (
            <DeckCard className="flex h-full min-h-[170px] flex-col p-6">
              <div className="font-mono text-lg text-ember/70 mb-2">{num}</div>
              <div className="font-display text-xl font-bold mb-2">{title}</div>
              <div className="text-base text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
      <RevealItem>
        <SlideLead>
          Hoy todo eso se junta bajo dos preguntas:{" "}
          <span className="text-foreground font-bold">¿entra en la ventana?</span> y{" "}
          <span className="text-foreground font-bold">¿qué pasa cuando falla?</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Thesis = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] max-w-[1500px] text-balance">
        Todo lo que armamos compite
        <br />
        por el mismo espacio: el contexto.
      </h2>
    </StatementSlide>
  </Shell>
);

const WINDOW_SEGMENTS = [
  { label: "System prompt", detail: "fijo", width: "12%", cls: "bg-ember/30 border-ember/50" },
  { label: "Historial", detail: "crece por turno", width: "24%", cls: "bg-surface border-border" },
  {
    label: "Tool results",
    detail: "el que explota",
    width: "30%",
    cls: "bg-ember/15 border-ember/40",
  },
  { label: "Docs del RAG", detail: "entra por búsqueda", width: "20%", cls: "bg-surface border-border" },
  {
    label: "Espacio libre",
    detail: "para razonar y responder",
    width: "14%",
    cls: "bg-transparent border-dashed border-muted-foreground/40",
  },
];

const WindowAnatomy = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Anatomía de la ventana</SlideTitle>
      </RevealItem>
      <RevealItem>
        <div className="flex w-full gap-1.5">
          {WINDOW_SEGMENTS.map((s) => (
            <div
              key={s.label}
              style={{ width: s.width }}
              className={`rounded-lg border px-3 py-6 text-center ${s.cls}`}
            >
              <div className="font-display text-base font-bold leading-tight">{s.label}</div>
              <div className="mt-1 text-xs text-muted-foreground leading-snug">{s.detail}</div>
            </div>
          ))}
        </div>
      </RevealItem>
      <RevealItem>
        <SlideLead className="max-w-[1400px]">
          El modelo no ve tu sistema. Ve esta ventana, en este orden, hasta que se llena. Y los
          tool results crecen solos:{" "}
          <span className="text-foreground font-bold">nadie los invitó a quedarse</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Compression = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Comprimir sin perder lo importante</SlideTitle>
      </RevealItem>
      <RevealStack className="flex flex-wrap items-center gap-4">
        <RevealItem>
          <FlowBox title="Turnos 1 a 40" sub="ya no entran" className="px-8 py-5" />
        </RevealItem>
        <RevealItem>
          <span aria-hidden className="shrink-0 font-mono text-2xl text-ember">→</span>
        </RevealItem>
        <RevealItem>
          <FlowBox accent title="Compactar" sub="una llamada extra" className="px-8 py-5" />
        </RevealItem>
        <RevealItem>
          <span aria-hidden className="shrink-0 font-mono text-2xl text-ember">→</span>
        </RevealItem>
        <RevealItem className="flex gap-1.5">
          <FlowBox title="System" sub="intacto" />
          <FlowBox title="Resumen" sub="decisiones y datos duros" accent />
          <FlowBox title="Últimos turnos" sub="crudos" />
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead className="max-w-[1400px]">
          Se dispara por umbral, no a mano. Las instrucciones y las decisiones{" "}
          <span className="text-foreground font-bold">no se resumen: se copian</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const MultiAgentContext = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Contexto en multi-agente</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Cada agente ve lo suyo", "El worker de triage no necesita el historial completo del cliente."],
          ["Resúmenes entre agentes", "El orquestador pasa el resultado, no la conversación."],
          ["Referencias, no payloads", "Un tool result de 30 kb se guarda afuera y viaja el id."],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[150px] flex-col p-8">
              <div className="font-display text-xl font-bold text-ember mb-3">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
      <RevealItem>
        <SlideLead>
          El contexto no se hereda. <span className="text-foreground font-bold">Se reparte.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const MemoryVsContext = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>¿Ventana o base de datos?</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-muted-foreground">
              Contexto de sesión
            </div>
            <p className="text-xl text-muted-foreground leading-snug flex-1">
              Vive en la ventana. Lo pagás en cada llamada, lo use el modelo o no.
            </p>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard accent className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-ember">
              Memoria de largo plazo
            </div>
            <p className="text-xl text-muted-foreground leading-snug flex-1">
              Vive afuera, en DB o vector store. La pagás solo cuando la traés.
            </p>
          </DeckCard>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          La pregunta no es dónde guardar.{" "}
          <span className="text-foreground font-bold">Es cuándo traer.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Priority = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Cuando el espacio escasea</SlideTitle>
      </RevealItem>
      <RevealStack className="space-y-3">
        {[
          ["01", "Instrucciones del sistema", "no se tocan"],
          ["02", "La tarea actual", "lo que el usuario pidió recién"],
          ["03", "Decisiones ya tomadas", "perderlas es repetir trabajo"],
          ["04", "Los últimos turnos", "el hilo inmediato"],
          ["05", "Todo lo demás", "se resume o se va"],
        ].map(([num, title, body]) => (
          <RevealItem key={num}>
            <DeckCard className="flex items-baseline gap-5 px-6 py-4">
              <span className="font-mono text-lg tabular-nums text-ember/70">{num}</span>
              <span className="font-display text-2xl font-bold">{title}</span>
              <span className="text-xl text-muted-foreground">{body}</span>
            </DeckCard>
          </RevealItem>
        ))}
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const ContextCost = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Contexto y plata</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Tokens de entrada", "El historial entero se cobra en cada llamada. Crece solo."],
          ["Latencia", "Más contexto, más tarda el primer token."],
          ["Prompt caching", "Lo que se repite igual (system, docs fijos) se cachea y baja el costo."],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[150px] flex-col p-8">
              <div className="font-display text-xl font-bold text-ember mb-3">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
    </ContentSlide>
  </Shell>
);

const ContextAntipatterns = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>
          Anti-patrones <span className="text-ember">de contexto</span>
        </SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          "Prompt gigante estático que viaja completo en cada llamada",
          "El mismo doc dos veces: hardcodeado y recuperado por RAG",
          "Historial sin limpiar: tool results viejos que ya no sirven",
          "Pegar el documento entero cuando la respuesta usaba dos párrafos",
        ]}
        render={(item) => <CrossCard text={item as string} />}
      />
    </ContentSlide>
  </Shell>
);

const ContextMonitoring = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Si no lo medís, no lo ves</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Tokens por llamada", "Desglosado: system, historial, tools, docs."],
          ["% de ventana usado", "Alerta antes del truncamiento silencioso."],
          ["Costo por conversación", "El promedio esconde a los outliers: mirá la distribución."],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[150px] flex-col p-8">
              <div className="font-display text-xl font-bold text-ember mb-3">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
    </ContentSlide>
  </Shell>
);

const ContextCase = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Caso: presupuesto de contexto</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-[1fr_auto_1.1fr] items-center gap-6">
        <RevealItem className="flex flex-col gap-3">
          <FlowBox title="System prompt" sub="2k · fijo, cacheado" className="text-left" />
          <FlowBox title="Memoria del usuario" sub="1k · solo lo de este usuario" className="text-left" />
          <FlowBox title="RAG" sub="4k máx · top 3 chunks" className="text-left" />
          <FlowBox title="Tool results" sub="4k máx · resumidos" className="text-left" />
          <FlowBox title="Historial" sub="8k · resumen + últimos turnos" className="text-left" />
        </RevealItem>
        <RevealItem>
          <span aria-hidden className="font-mono text-2xl text-ember">→</span>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard accent className="flex h-full flex-col justify-center p-8">
            <div className="font-mono text-sm uppercase tracking-widest text-ember mb-3">
              La ventana
            </div>
            <div className="font-display text-2xl font-bold leading-snug">
              Cada fuente entra con presupuesto.
            </div>
            <p className="mt-4 text-lg text-muted-foreground leading-snug">
              Sin presupuesto, una fuente se come la ventana y las demás quedan afuera sin que
              nadie lo decida.
            </p>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const ReliabilityIntro = () => (
  <SectionIntro question="¿Qué significa reliability?" sub="Mucho más que uptime" />
);

const ReliabilityStatement = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(2.75rem,6.5vw,6rem)] font-bold leading-[1.05] max-w-[1500px] text-balance">
        El sistema puede estar 100% online
        <br />
        y aun así mandarse cualquiera.
      </h2>
    </StatementSlide>
  </Shell>
);

const FailureSources = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>De qué se rompe un agente</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          ["Alucina", "Inventa con total confianza. La falla más barata de producir y la más cara de detectar."],
          ["Tool call incorrecto", "Tool equivocada o parámetros mal armados."],
          ["Timeouts y APIs caídas", "La falla clásica de siempre, ahora en medio de un razonamiento."],
          ["Datos viejos", "Responde perfecto con la wiki de hace dos años."],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[130px] flex-col p-7">
              <div className="font-display text-xl font-bold text-ember mb-2">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
    </ContentSlide>
  </Shell>
);

const Fallbacks = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Fallbacks: el plan B explícito</SlideTitle>
      </RevealItem>
      <FlowChain
        items={[
          { title: "Falla" },
          { title: "Retry", sub: "máximo 2" },
          { title: "Degradar", sub: "otra fuente o respuesta parcial" },
          { title: "Escalar a humano", accent: true },
        ]}
      />
      <RevealItem>
        <SlideLead className="max-w-[1400px]">
          Si el plan B no está diseñado, el modelo lo improvisa.{" "}
          <span className="text-foreground font-bold">E improvisar es inventar.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const HumanInTheLoop = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Human-in-the-loop</SlideTitle>
      </RevealItem>
      <RevealStack className="flex flex-col gap-3">
        <RevealItem className="flex flex-wrap items-center gap-4">
          <FlowBox title="El agente propone" className="px-8 py-4" />
          <span aria-hidden className="shrink-0 font-mono text-2xl text-ember">→</span>
          <FlowBox accent title="¿Acción crítica?" className="px-8 py-4" />
        </RevealItem>
        <RevealItem className="ml-16 flex flex-wrap items-center gap-4">
          <span className="font-mono text-base text-ember">sí →</span>
          <FlowBox title="Revisión humana" sub="con el contexto que usó el agente" />
          <span aria-hidden className="shrink-0 font-mono text-2xl text-ember">→</span>
          <FlowBox title="Ejecutar" />
        </RevealItem>
        <RevealItem className="ml-16 flex flex-wrap items-center gap-4">
          <span className="font-mono text-base text-muted-foreground">no →</span>
          <FlowBox title="Ejecutar" sub="directo, con log" />
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead className="max-w-[1400px]">
          El checkpoint va donde el error duele: pagos, borrado, comunicación al cliente.{" "}
          <span className="text-foreground font-bold">No en cada paso.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const OutputValidation = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Validar antes de ejecutar</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="entre el output y la acción" tone="good" className="max-w-[1300px]">
          {`output del agente
  → ¿es JSON válido? ¿están todos los campos?
  → ¿el monto está dentro del límite?
  → ¿la cuenta existe?
  → recién ahí, ejecutar`}
        </CodeBlock>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          El output del modelo es un borrador{" "}
          <span className="text-foreground font-bold">hasta que pasa validación</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Logging = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Trazabilidad</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Cada tool call", "Args, resultado, latencia, con id de sesión."],
          ["Cada decisión", "Qué contexto tenía el agente cuando la tomó."],
          ["Reconstruible", "Poder responder \"por qué hizo eso\" seis meses después."],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[150px] flex-col p-8">
              <div className="font-display text-xl font-bold text-ember mb-3">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
      <RevealItem>
        <SlideLead>
          Cuando algo sale mal, la pregunta es qué vio el agente.{" "}
          <span className="text-foreground font-bold">Si no quedó logueado, no lo sabés.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const AgentTesting = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Testear agentes no es testear software</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-muted-foreground">
              Software clásico
            </div>
            <p className="text-xl text-muted-foreground leading-snug flex-1">
              Misma entrada, misma salida. Un assert y listo.
            </p>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard accent className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-ember">Sistemas agénticos</div>
            <p className="text-xl text-muted-foreground leading-snug flex-1">
              Misma entrada, salidas distintas. Evaluás contra criterios: ¿resolvió? ¿citó fuente?
              ¿respetó el límite?
            </p>
          </DeckCard>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead className="max-w-[1400px]">
          Golden set de casos reales + evals automáticos + review humano. Se corre{" "}
          <span className="text-foreground font-bold">antes de cada cambio de prompt o de modelo</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Metrics = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Métricas que importan</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={4}
        items={[
          ["Resolución", "% de casos resueltos sin intervención humana"],
          ["Escalamiento", "Cuánto deriva a una persona, y por qué"],
          ["Precisión crítica", "Errores en acciones que tocan plata o datos"],
          ["Costo por interacción", "Tokens + tools + reintentos, por conversación"],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[160px] flex-col p-6">
              <div className="font-display text-lg font-bold text-ember mb-2">{title}</div>
              <div className="text-base text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
    </ContentSlide>
  </Shell>
);

const ReliabilityCost = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>La robustez se paga</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Retries", "Duplican tokens y latencia."],
          ["Validación", "Cada check es una llamada más o una regla que mantener."],
          ["Human-in-the-loop", "Personas en el circuito: el recurso más caro."],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[140px] flex-col p-8">
              <div className="font-display text-xl font-bold text-ember mb-3">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
      <RevealItem>
        <SlideLead className="max-w-[1400px]">
          No todo necesita el mismo nivel. Clasificá las acciones por riesgo y{" "}
          <span className="text-foreground font-bold">poné la robustez donde duele</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const ReliabilityChecklist = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Checklist antes de producción</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          "¿Qué hace el sistema cuando una tool falla?",
          "¿Qué acciones requieren aprobación humana?",
          "¿Todo output que ejecuta algo pasa por validación?",
          "¿Podés reconstruir qué hizo el agente y por qué?",
          "¿Contra qué golden set lo probaste?",
          "¿Cómo te enterás si empeora en producción?",
        ]}
        render={(item) => <CheckboxCard text={item as string} />}
      />
    </ContentSlide>
  </Shell>
);

const PaymentsCase = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Caso: autorización de pagos</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="validación crítica antes de ejecutar" tone="good" className="max-w-[1500px]">
          {`El agente propone: pagar $2.4M a un proveedor nuevo

1. validación      → schema ok, cuenta válida
2. regla dura      → monto mayor al límite: aprobación humana, siempre
3. cola de revisión → el humano ve la propuesta y el contexto que usó
4. decisión        → aprueba o rechaza. Queda logueado y alimenta métricas`}
        </CodeBlock>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          La regla del monto no vive en el prompt: es código.{" "}
          <span className="text-foreground font-bold">Al modelo no se le negocia.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const EndToEnd = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El mapa completo</SlideTitle>
      </RevealItem>
      <RevealStack className="flex flex-col items-center gap-2">
        <RevealItem className="w-full max-w-[1250px]">
          <FlowBox title="Canales" sub="web · WhatsApp · API" className="py-3" />
        </RevealItem>
        <RevealItem>
          <span aria-hidden className="font-mono text-xl text-ember">↓</span>
        </RevealItem>
        <RevealItem className="w-full max-w-[1250px]">
          <FlowBox title="Agentes" sub="orquestador + workers · sesiones por usuario" className="py-3" />
        </RevealItem>
        <RevealItem>
          <span aria-hidden className="font-mono text-xl text-ember">↓</span>
        </RevealItem>
        <RevealItem className="w-full max-w-[1250px]">
          <FlowBox title="MCP" sub="un protocolo para todas las herramientas" className="py-3" />
        </RevealItem>
        <RevealItem>
          <span aria-hidden className="font-mono text-xl text-ember">↓</span>
        </RevealItem>
        <RevealItem className="grid w-full max-w-[1250px] grid-cols-3 gap-3">
          <FlowBox title="Vector store" sub="RAG" />
          <FlowBox title="DB" sub="sesiones y memoria" />
          <FlowBox title="APIs internas" />
        </RevealItem>
        <RevealItem className="w-full max-w-[1250px]">
          <FlowBox
            accent
            title="Transversal"
            sub="validación · human-in-the-loop · trazabilidad · presupuesto de contexto"
            className="mt-2 py-3"
          />
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const NewProjectFramework = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Un proyecto nuevo, en orden</SlideTitle>
      </RevealItem>
      <RevealStack className="space-y-3">
        {[
          ["01", "¿Qué problema y para quién?"],
          ["02", "¿Alcanza un workflow o hace falta un agente?"],
          ["03", "¿Qué datos y herramientas necesita? (RAG, MCP)"],
          ["04", "¿Dónde puede fallar y qué pasa cuando falla?"],
          ["05", "¿Qué valida un humano?"],
          ["06", "¿Cómo medís que funciona?"],
        ].map(([num, q]) => (
          <RevealItem key={num}>
            <DeckCard className="flex items-baseline gap-5 px-6 py-4">
              <span className="font-mono text-lg tabular-nums text-ember/70">{num}</span>
              <span className="font-display text-2xl font-bold">{q}</span>
            </DeckCard>
          </RevealItem>
        ))}
      </RevealStack>
      <RevealItem>
        <SlideLead>
          Las primeras dos preguntas matan la mitad de los proyectos.{" "}
          <span className="text-foreground font-bold">Mejor ahí que en producción.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const ProgramAntipatterns = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>
          Los anti-patrones <span className="text-ember">del programa</span>
        </SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          "Multi-agente porque suena bien",
          "RAG sin fuente de verdad ni re-indexación",
          "Un server MCP para algo que era una función",
          "Prompt gigante estático como única fuente de contexto",
          "Ejecutar outputs sin validar",
          "Confiar en \"parece que anda\" sin golden set",
        ]}
        render={(item) => <CrossCard text={item as string} />}
      />
    </ContentSlide>
  </Shell>
);

const DesignTemplate = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>La plantilla que se llevan</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="diseño de arquitectura agéntica" tone="good" className="max-w-[1300px]">
          {`# Diseño de arquitectura agéntica

## Problema y usuario
## Workflow o agente (justificar)
## Agentes y roles, contrato de cada uno
## Fuentes de contexto y presupuesto de tokens
## Herramientas (MCP) y permisos
## Puntos de falla y fallbacks
## Checkpoints humanos
## Métricas de éxito
## Fuera de scope`}
        </CodeBlock>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          Si una sección no se puede llenar,{" "}
          <span className="text-foreground font-bold">todavía no hay que implementar</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const SimulacroIntro = () => (
  <Shell bg="panel">
    <StatementSlide>
      <div className="flex flex-col gap-8">
        <p className="font-mono text-base uppercase tracking-[0.4em] text-ember">
          simulacro final · en grupos
        </p>
        <h2 className="font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.98]">
          El caso.
        </h2>
        <SlideLead className="max-w-[1300px]">
          Un problema de negocio real. Ustedes diseñan la arquitectura completa: agentes,
          contexto, herramientas y plan de fallas.
        </SlideLead>
      </div>
    </StatementSlide>
  </Shell>
);

const SimulacroConsigna = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Consigna</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem className="h-full">
          <DeckCard accent className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-ember">Entregan</div>
            <ul className="space-y-3 text-xl text-muted-foreground leading-snug">
              <li>Diagrama de la arquitectura</li>
              <li>Roles y contrato de cada agente</li>
              <li>Fuentes de contexto, con presupuesto</li>
              <li>Plan de fallas y checkpoints humanos</li>
              <li>Métricas de éxito</li>
            </ul>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-muted-foreground">Evaluamos</div>
            <ul className="space-y-3 text-xl text-muted-foreground leading-snug">
              <li>Criterio: por qué cada pieza está ahí</li>
              <li>Simplicidad: qué decidieron NO poner</li>
              <li>Honestidad sobre riesgos y costos</li>
            </ul>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const SimulacroDynamics = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Dinámica</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["45 min", "Diseño en grupos, con la plantilla"],
          ["10 min por grupo", "Exposición: decisiones, no diapositivas"],
          ["Feedback", "Qué está fuerte, qué se cae en producción"],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[150px] flex-col p-8">
              <div className="font-mono text-2xl font-bold text-ember mb-3">{title}</div>
              <div className="font-display text-xl leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
    </ContentSlide>
  </Shell>
);

const ProgramRecap = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El programa, en cinco líneas</SlideTitle>
      </RevealItem>
      <RevealStack className="space-y-3">
        {[
          ["Sesión 1", "arquitectura: agente vs workflow"],
          ["Sesión 2", "multi-agente, Agentic RAG y sesiones"],
          ["Sesión 3", "MCP: herramientas por protocolo"],
          ["Sesión 4", "Claude Code y prompts de producción"],
          ["Sesión 5", "contexto, reliability y el diseño completo"],
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

const Resources = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Para seguir</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Docs", "Anthropic docs y la spec de MCP. Se actualizan rápido: volvé seguido."],
          ["Práctica", "La plantilla más un caso chico propio vale más que otro curso."],
          ["Comunidad", "Los servers MCP y evals open source son el mejor código de ejemplo."],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[150px] flex-col p-8">
              <div className="font-display text-xl font-bold text-ember mb-3">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
    </ContentSlide>
  </Shell>
);

const Closing = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] max-w-[1500px] text-balance">
        Los modelos cambian cada seis meses.
        <br />
        El criterio queda.
      </h2>
    </StatementSlide>
  </Shell>
);

const Thanks = () => (
  <Shell>
    <RevealStack className="flex h-full min-h-0 flex-1 flex-col items-center justify-center text-center">
      <RevealItem>
        <h2 className="font-display text-9xl font-bold mb-12">Gracias.</h2>
      </RevealItem>
      <RevealItem>
        <SlideLead className="mb-8">Preguntas, dudas, contraejemplos. Todo bienvenido.</SlideLead>
      </RevealItem>
      <RevealItem>
        <div className="font-mono text-xl tracking-widest text-ember">contacto · @tu-handle</div>
      </RevealItem>
    </RevealStack>
  </Shell>
);

export const slidesSesion05: SlideDefBase[] = [
  {
    id: "s5-cover",
    title: "Portada",
    Component: Cover,
    notes:
      "Sesión de cierre. Dos bloques teóricos (contexto y reliability) y después el simulacro. Avisar la logística del simulacro desde el arranque para que administren energía.",
  },
  {
    id: "s5-map",
    title: "El recorrido",
    Component: JourneyMap,
    notes:
      "3 min. Mapa de las 4 sesiones anteriores en una slide. El hilo de hoy: ¿entra en la ventana? y ¿qué pasa cuando falla?",
  },
  {
    id: "s5-thesis",
    title: "Tesis de contexto",
    Component: Thesis,
    notes:
      "Pausa 3 seg. RAG, tools, memoria, historial: todo compite por la misma ventana. Por eso el context management es transversal y no un tema más.",
  },
  {
    id: "s5-anatomy",
    title: "Anatomía de la ventana",
    Component: WindowAnatomy,
    notes:
      "Narrar la barra de izquierda a derecha: system fijo, historial crece por turno, tool results es el que explota (resaltado), docs del RAG, y el espacio libre para razonar. Proporciones ilustrativas, no medidas.",
  },
  {
    id: "s5-compression",
    title: "Compresión",
    Component: Compression,
    notes:
      "Profundiza lo visto en sesión 2: acá el cuándo y el cómo. Umbral automático (por ejemplo al 80% de ventana), y la regla: instrucciones y decisiones no se resumen, se copian tal cual.",
  },
  {
    id: "s5-multiagent-context",
    title: "Contexto en multi-agente",
    Component: MultiAgentContext,
    notes:
      "El error típico: heredar todo el contexto a cada worker. Tres reglas: cada uno ve lo suyo, entre agentes viajan resúmenes, los payloads grandes se referencian por id.",
  },
  {
    id: "s5-memory-context",
    title: "Ventana o DB",
    Component: MemoryVsContext,
    notes:
      "Repaso profundizado de sesión 2 con lente de costo: la ventana se paga en cada llamada, la memoria externa solo cuando se trae. La pregunta de diseño es cuándo traer.",
  },
  {
    id: "s5-priority",
    title: "Priorización",
    Component: Priority,
    notes:
      "Orden de prioridad cuando no entra todo. Recorrer del 01 al 05. El 03 (decisiones) es el que más se olvida y el que más caro sale perder.",
  },
  {
    id: "s5-costs",
    title: "Contexto y plata",
    Component: ContextCost,
    notes:
      "Tokens de entrada crecen solos con el historial. Latencia proporcional al contexto. Prompt caching para lo estable: system y docs fijos. Números orales si tenés un caso a mano.",
  },
  {
    id: "s5-antipatterns",
    title: "Anti-patrones de contexto",
    Component: ContextAntipatterns,
    notes:
      "Los cuatro más vistos. El doc duplicado (hardcodeado más RAG) es el más silencioso: nadie lo nota hasta mirar la factura.",
  },
  {
    id: "s5-monitoring",
    title: "Monitoreo",
    Component: ContextMonitoring,
    notes:
      "Corto. Tres cosas medibles: tokens desglosados por fuente, % de ventana, costo por conversación mirando distribución y no promedio.",
  },
  {
    id: "s5-context-case",
    title: "Caso presupuesto",
    Component: ContextCase,
    notes:
      "Caso integrador del bloque: cada fuente (system, memoria, RAG, tools, historial) entra con presupuesto explícito. Sin presupuesto, una fuente se come la ventana sin que nadie lo decida.",
  },
  {
    id: "s5-reliability-intro",
    title: "¿Qué es reliability?",
    Component: ReliabilityIntro,
    notes:
      "Pausa 2 seg. Cambio de bloque, misma estructura de pregunta que la serie. No responder todavía.",
  },
  {
    id: "s5-reliability-statement",
    title: "Online y cualquiera",
    Component: ReliabilityStatement,
    notes:
      "Punchline: uptime perfecto no implica comportamiento correcto. En agentes, la falla grave no es el 500: es la acción incorrecta ejecutada con confianza.",
  },
  {
    id: "s5-failures",
    title: "Fuentes de falla",
    Component: FailureSources,
    notes:
      "Cuatro fuentes: alucinación, tool call incorrecto, timeouts, datos viejos. Un ejemplo oral de cada una, ideal de proyectos propios.",
  },
  {
    id: "s5-fallbacks",
    title: "Fallbacks",
    Component: Fallbacks,
    notes:
      "La cadena: retry acotado, degradar (otra fuente o respuesta parcial honesta), escalar a humano. La frase clave: si el plan B no está diseñado, el modelo improvisa, e improvisar es inventar.",
  },
  {
    id: "s5-hitl",
    title: "Human-in-the-loop",
    Component: HumanInTheLoop,
    notes:
      "Retoma sesión 1. El gate va donde el error duele: pagos, borrados, comunicación externa. HITL en cada paso mata la utilidad del sistema: es un instrumento fino, no una manta.",
  },
  {
    id: "s5-validation",
    title: "Validación de outputs",
    Component: OutputValidation,
    notes:
      "Schema primero, reglas de negocio después, acción al final. El output del modelo es un borrador hasta que pasa validación. Conectar con el caso de pagos que viene.",
  },
  {
    id: "s5-logging",
    title: "Trazabilidad",
    Component: Logging,
    notes:
      "Loguear tool calls con args y resultado, y el contexto de cada decisión. La pregunta post-incidente siempre es qué vio el agente.",
  },
  {
    id: "s5-testing",
    title: "Testing de agentes",
    Component: AgentTesting,
    notes:
      "Contraste con testing clásico: acá se evalúa contra criterios, no contra strings. Golden set + evals + review humano, corridos antes de cada cambio de prompt o modelo.",
  },
  {
    id: "s5-metrics",
    title: "Métricas",
    Component: Metrics,
    notes:
      "Cuatro métricas de producción. Resolución y escalamiento cuentan la historia juntas: alta resolución con escalamiento cero suele ser señal de que el agente no escala cuando debería.",
  },
  {
    id: "s5-reliability-cost",
    title: "Robustez y costo",
    Component: ReliabilityCost,
    notes:
      "Trade-off honesto: cada mecanismo de reliability cuesta tokens, latencia o personas. Clasificar acciones por riesgo y proteger las que duelen.",
  },
  {
    id: "s5-reliability-checklist",
    title: "Checklist reliability",
    Component: ReliabilityChecklist,
    notes: "Recorrer rápido. Son las seis preguntas antes de ir a producción.",
  },
  {
    id: "s5-payments-case",
    title: "Caso pagos",
    Component: PaymentsCase,
    notes:
      "Tu experiencia con control de autorizaciones de pago, en genérico. El punto central: la regla del monto es código, no prompt. Al modelo no se le negocia. Contar el detalle de mostrar al humano el contexto que usó el agente.",
  },
  {
    id: "s5-endtoend",
    title: "El mapa completo",
    Component: EndToEnd,
    notes:
      "Todo el programa en un diagrama: canales, agentes con sesiones, MCP como capa de herramientas, datos abajo, y la franja transversal de control. Dejarla 1 min en pantalla: es la foto que se llevan.",
  },
  {
    id: "s5-framework",
    title: "Proyecto nuevo",
    Component: NewProjectFramework,
    notes:
      "Las seis preguntas en orden para arrancar cualquier arquitectura. Las dos primeras matan la mitad de los proyectos, y está bien que así sea.",
  },
  {
    id: "s5-program-antipatterns",
    title: "Anti-patrones del programa",
    Component: ProgramAntipatterns,
    notes:
      "Resumen de los anti-patrones de las 5 sesiones. Preguntar cuál vieron (o cometieron) en su trabajo: genera la mejor conversación del día.",
  },
  {
    id: "s5-template",
    title: "Plantilla de diseño",
    Component: DesignTemplate,
    notes:
      "El entregable del curso: la plantilla que van a usar en el simulacro y después. Si una sección no se puede llenar, el proyecto no está listo para implementarse.",
  },
  {
    id: "s5-simulacro",
    title: "Simulacro",
    Component: SimulacroIntro,
    notes:
      "Presentar el caso de negocio en voz o en handout (elegirlo según el perfil del grupo). Grupos de 3 a 4. La plantilla de la slide anterior es la guía.",
  },
  {
    id: "s5-consigna",
    title: "Consigna",
    Component: SimulacroConsigna,
    notes:
      "Qué entregan y qué evaluamos. Insistir en la columna derecha: se evalúa criterio y honestidad, no cantidad de cajas en el diagrama.",
  },
  {
    id: "s5-dinamica",
    title: "Dinámica",
    Component: SimulacroDynamics,
    notes:
      "45 min de diseño, 10 por grupo de exposición, feedback al final. La dinámica es modular: ajustar tiempos según cómo venga el día.",
  },
  {
    id: "s5-program-recap",
    title: "El programa",
    Component: ProgramRecap,
    notes: "Después del simulacro. Recap del programa completo en cinco líneas, leerlo despacio.",
  },
  {
    id: "s5-resources",
    title: "Para seguir",
    Component: Resources,
    notes:
      "Docs oficiales (cambian rápido), práctica con un caso propio, y leer servers y evals open source como código de ejemplo.",
  },
  {
    id: "s5-closing",
    title: "Cierre",
    Component: Closing,
    notes:
      "Cierre del programa. Los modelos cambian cada seis meses, el criterio de arquitectura queda. Pausa larga.",
  },
  {
    id: "s5-thanks",
    title: "Gracias",
    Component: Thanks,
    notes: "Agradecimientos, contacto, y abrir preguntas finales.",
  },
];
