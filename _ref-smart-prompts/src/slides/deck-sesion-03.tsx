/**
 * Sesión 3 · Diseño de ruta técnica MCP (Model Context Protocol)
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
            Sesión 3 · Claude Certified Architect
          </div>
        </RevealItem>
        <RevealItem>
          <h1 className="font-display text-[clamp(4rem,9vw,7rem)] font-bold leading-[0.92] text-balance">
            Diseño de ruta técnica
            <br />
            <span className="text-ember">MCP.</span>
          </h1>
        </RevealItem>
        <RevealItem>
          <SlideLead className="mt-10 max-w-[1300px]">
            Qué es el Model Context Protocol, cómo se diseña un server propio y qué mirar antes de
            llevarlo a producción.
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
        <SlideTitle>Dónde estamos parados</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Multi-agente", "Orquestador, pipeline, peer-to-peer. Cada agente con su contrato."],
          ["Agentic RAG", "El agente decide qué buscar y evalúa lo que encuentra."],
          ["Sesiones", "El estado vive afuera del modelo, con dueño claro."],
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
          Todos esos agentes usan herramientas. Hoy:{" "}
          <span className="text-foreground font-bold">cómo conectarlas sin escribir un conector a medida por cada una</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Thesis = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] max-w-[1500px] text-balance">
        Antes de MCP, cada integración
        <br />
        era un conector hecho a mano.
      </h2>
    </StatementSlide>
  </Shell>
);

const ProblemNxM = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>
          El problema: <span className="text-ember">N × M</span>
        </SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-8">
            <div className="mb-3 font-mono uppercase tracking-widest text-muted-foreground">
              Sin protocolo
            </div>
            <div className="mb-4 font-mono text-4xl font-bold text-muted-foreground">4 × 6 = 24</div>
            <p className="text-xl text-muted-foreground leading-snug flex-1">
              4 agentes por 6 herramientas: 24 integraciones a medida. Cada una con su auth, su
              formato de errores y sus bugs. Cambiás de modelo y las reescribís.
            </p>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard accent className="flex h-full flex-col p-8">
            <div className="mb-3 font-mono uppercase tracking-widest text-ember">Con MCP</div>
            <div className="mb-4 font-mono text-4xl font-bold text-ember">4 + 6 = 10</div>
            <p className="text-xl text-muted-foreground leading-snug flex-1">
              4 clientes más 6 servers: 10 piezas. La herramienta se escribe una vez y cualquier
              cliente compatible la usa.
            </p>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const WhatIsMcp = () => <SectionIntro question="¿Qué es MCP?" sub="Model Context Protocol" />;

const UsbAnalogy = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(2.75rem,6.5vw,6rem)] font-bold leading-[1.05] max-w-[1500px] text-balance">
        El USB-C de los agentes:
        <br />
        un puerto común en vez de un conector por dispositivo.
      </h2>
    </StatementSlide>
  </Shell>
);

const Architecture = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Host, client, server</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-[1.1fr_auto_1fr] items-center gap-6">
        <RevealItem className="h-full">
          <DeckCard accent className="flex h-full flex-col justify-center gap-4 p-8">
            <div className="font-mono text-sm uppercase tracking-widest text-ember">Host</div>
            <div className="font-display text-2xl font-bold leading-tight">
              La app donde vive el modelo
            </div>
            <div className="text-lg text-muted-foreground leading-snug">
              Claude Desktop, un IDE, tu propio agente.
            </div>
            <div className="rounded-xl border border-ember/40 bg-ember/5 px-4 py-3">
              <div className="font-mono text-sm text-ember">MCP client</div>
              <div className="text-sm text-muted-foreground">uno por server, conexión 1 a 1</div>
            </div>
          </DeckCard>
        </RevealItem>
        <RevealItem className="flex flex-col items-center gap-10">
          <span aria-hidden className="font-mono text-2xl text-ember">→</span>
          <span aria-hidden className="font-mono text-2xl text-ember">→</span>
          <span aria-hidden className="font-mono text-2xl text-ember">→</span>
        </RevealItem>
        <RevealItem className="flex h-full flex-col justify-center gap-4">
          <FlowBox title="Server: repositorio" sub="→ API de GitHub" className="text-left" />
          <FlowBox title="Server: facturación" sub="→ base de datos interna" className="text-left" />
          <FlowBox title="Server: archivos" sub="→ filesystem local" className="text-left" />
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          El server envuelve la herramienta y la expone por protocolo.{" "}
          <span className="text-foreground font-bold">El host no sabe nada de la API que hay atrás.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Primitives = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Lo que expone un server</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Tools", "Funciones que se ejecutan: buscar, crear, modificar.", "Las elige el modelo."],
          ["Resources", "Datos para leer: archivos, tablas, docs.", "Los controla la aplicación."],
          ["Prompts", "Templates reutilizables que reparte el server.", "Los elige el usuario."],
        ]}
        render={(item) => {
          const [title, body, who] = item as [string, string, string];
          return (
            <DeckCard className="flex h-full min-h-[190px] flex-col p-8">
              <div className="font-mono text-sm text-ember mb-3 uppercase tracking-widest">{title}</div>
              <div className="font-display text-xl leading-snug mb-3 flex-1">{body}</div>
              <div className="border-t border-border pt-3 text-base text-muted-foreground">{who}</div>
            </DeckCard>
          );
        }}
      />
      <RevealItem>
        <SlideLead>
          Tres primitivos. La mayoría de los servers solo usa tools,{" "}
          <span className="text-foreground font-bold">y está bien</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Transports = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>
          Transportes: <span className="text-ember">stdio</span> vs Streamable HTTP
        </SlideTitle>
      </RevealItem>
      <RevealItem>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-ember">
              <th className="pb-4 font-mono text-base uppercase tracking-widest text-ember" />
              <th className="pb-4 font-mono text-base uppercase tracking-widest text-ember">stdio</th>
              <th className="pb-4 font-mono text-base uppercase tracking-widest text-ember">
                Streamable HTTP
              </th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {[
              ["Dónde corre el server", "En tu máquina, proceso hijo", "Donde quieras, atrás de una URL"],
              ["Clientes", "Uno: el host que lo lanzó", "Muchos, concurrentes"],
              ["Auth", "Ninguna, confianza local", "OAuth, tokens, lo que definas"],
              ["Usalo para", "Desarrollo y herramientas locales", "Producción y equipos"],
            ].map(([dim, a, b]) => (
              <tr key={dim} className="border-b border-border">
                <td className="py-5 font-display font-bold">{dim}</td>
                <td className="py-5 text-muted-foreground">{a}</td>
                <td className="py-5 text-muted-foreground">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          SSE como transporte propio quedó deprecado. Si una guía vieja lo menciona,{" "}
          <span className="text-foreground font-bold">es eso</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const VsFunctionCalling = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>¿Y function calling?</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-muted-foreground">
              Function calling
            </div>
            <div className="font-display text-2xl font-bold mb-4">Tools adentro de tu app</div>
            <p className="text-xl text-muted-foreground leading-snug flex-1">
              Definidas para tu app, en tu app. Cambiás de cliente o de modelo y las reescribís.
            </p>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard accent className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-ember">MCP</div>
            <div className="font-display text-2xl font-bold mb-4">Tools atrás de un protocolo</div>
            <p className="text-xl text-muted-foreground leading-snug flex-1">
              Viven en un server. Cualquier host compatible las descubre y las usa, sin código
              nuevo.
            </p>
          </DeckCard>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          Abajo del protocolo sigue habiendo function calling.{" "}
          <span className="text-foreground font-bold">MCP lo vuelve portable.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Ecosystem = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El ecosistema hoy</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Clientes", "Claude Desktop y Claude Code, IDEs, n8n, agentes propios."],
          ["Servers", "GitHub, Slack, Postgres, filesystem. Miles de la comunidad."],
          ["Registry", "Catálogo para publicar y descubrir servers."],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[140px] flex-col p-8">
              <div className="font-display text-2xl font-bold text-ember mb-3">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
      <RevealItem>
        <SlideLead>
          Antes de construir, buscá.{" "}
          <span className="text-foreground font-bold">Es probable que tu integración ya exista.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const BuildOrNot = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>¿Server propio o no?</SlideTitle>
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
              <span className="font-mono uppercase tracking-widest text-ember">Construí uno</span>
            </div>
            <ul className="space-y-3 text-xl text-muted-foreground leading-snug">
              <li>Es un sistema interno tuyo, no hay server que lo conozca</li>
              <li>Necesitás controlar permisos y qué se expone</li>
              <li>El server existente hace demasiado o muy poco</li>
            </ul>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-8">
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted-foreground/15 font-bold text-muted-foreground"
              >
                ✕
              </span>
              <span className="font-mono uppercase tracking-widest text-muted-foreground">
                No construyas
              </span>
            </div>
            <ul className="space-y-3 text-xl text-muted-foreground leading-snug">
              <li>Ya existe uno mantenido para esa API</li>
              <li>Es para un experimento de una tarde</li>
              <li>Con function calling simple alcanza</li>
            </ul>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const ToolDesign = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Tools que el modelo entienda</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-8">
        <RevealItem>
          <CodeBlock label="así no" tone="bad">
            {`tool: consulta
desc: hace una consulta
params: { data: string }`}
          </CodeBlock>
        </RevealItem>
        <RevealItem>
          <CodeBlock label="así sí" tone="good">
            {`tool: buscar_facturas
desc: Busca facturas por cliente y rango
      de fechas. Devuelve máximo 20.
params: {
  cliente_id: string,
  desde: date,
  hasta: date
}`}
          </CodeBlock>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          La descripción es el prompt de la tool.{" "}
          <span className="text-foreground font-bold">El modelo elige con eso.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Granularity = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Granularidad</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Muy atómica", "12 llamadas para una operación simple. Lento y frágil.", false],
          ["Una acción de negocio", "buscar_facturas, crear_ticket. El modelo la usa de una.", true],
          ["Muy monolítica", "hacer_todo(params). Nadie sabe cómo llamarla. El modelo tampoco.", false],
        ]}
        render={(item) => {
          const [title, body, accent] = item as [string, string, boolean];
          return (
            <DeckCard accent={accent} className="flex h-full min-h-[170px] flex-col p-8">
              <div className="font-display text-2xl font-bold mb-3">{title}</div>
              <div className="text-lg text-muted-foreground leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
    </ContentSlide>
  </Shell>
);

const ResourcesVsTools = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>¿Resource o tool?</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-muted-foreground">Resource</div>
            <div className="font-display text-2xl font-bold mb-4">El dato se lee</div>
            <p className="text-xl text-muted-foreground leading-snug flex-1">
              Un doc, una config, un catálogo. Sin efectos, sin parámetros. La app decide cuándo
              cargarlo.
            </p>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard accent className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-ember">Tool</div>
            <div className="font-display text-2xl font-bold mb-4">La acción se ejecuta</div>
            <p className="text-xl text-muted-foreground leading-snug flex-1">
              Buscar con parámetros, crear, modificar. El modelo decide cuándo llamarla.
            </p>
          </DeckCard>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          Si es solo lectura y no lleva parámetros,{" "}
          <span className="text-foreground font-bold">probablemente sea un resource</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const PromptsPrimitive = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Prompts como primitivo</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="ejemplo" tone="good" className="max-w-[1300px]">
          {`prompt: revisar_pr
args: { repo, numero }

→ devuelve el template de review que usa todo
  el equipo, con los pasos y el criterio`}
        </CodeBlock>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          El server también reparte prompts: el mismo proceso para todos,{" "}
          <span className="text-foreground font-bold">versionado en un solo lugar</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const AuthSlide = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Credenciales y permisos</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Credenciales en el server", "Nunca en el prompt ni en el contexto del modelo."],
          ["Permisos mínimos", "El server expone lo que decidís exponer, no toda la API."],
          ["Local vs remoto", "Variables de entorno para stdio. OAuth para servers HTTP."],
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

const DesignErrors = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>
          Errores de diseño <span className="text-ember">que se repiten</span>
        </SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          "Descripciones escritas para humanos que el modelo no entiende",
          "Respuestas de 50 kb que saturan la ventana del cliente",
          "Errores sin mensaje útil: el modelo reintenta a ciegas",
          "Diez tools que se pisan entre sí para hacer lo mismo",
        ]}
        render={(item) => <CrossCard text={item as string} />}
      />
    </ContentSlide>
  </Shell>
);

const VersioningTesting = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Versionar y probar</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-ember">Versionado</div>
            <p className="text-xl text-muted-foreground leading-snug flex-1">
              Agregar tools es gratis. Cambiar una firma rompe a todos los clientes: sumá una tool
              nueva y deprecá la vieja.
            </p>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-ember">Testing</div>
            <p className="text-xl text-muted-foreground leading-snug flex-1">
              MCP Inspector para probar a mano. Tests de contrato por tool: casos felices y errores,
              antes de que la use un agente.
            </p>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const CaseServer = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Caso: server para un pipeline de cálculo</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="arquitectura real, simplificada" tone="good" className="max-w-[1500px]">
          {`server: analisis-cientifico

tools:
  validar_entrada(estructura)   → chequea el formato antes de gastar cómputo
  encolar_calculo(id, params)   → dispara el job, devuelve un ticket
  estado_calculo(ticket)        → el cálculo tarda minutos, se consulta
  resultados(ticket)            → resumen, no el dump completo`}
        </CodeBlock>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          La decisión clave: el cálculo tarda 20 minutos.{" "}
          <span className="text-foreground font-bold">La tool no espera</span>: devuelve un ticket
          y el agente consulta después.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const RouteToProduction = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>De la idea a producción</SlideTitle>
      </RevealItem>
      <FlowChain
        items={[
          { title: "Diseñar tools", sub: "nombres, params" },
          { title: "Server local", sub: "stdio" },
          { title: "Inspector", sub: "probar a mano" },
          { title: "HTTP + auth", sub: "transporte prod" },
          { title: "Deploy" },
          { title: "Logs y métricas", accent: true },
        ]}
      />
      <RevealItem>
        <SlideLead>
          El orden importa: las tools primero,{" "}
          <span className="text-foreground font-bold">el transporte y el hosting al final</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Hosting = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Dónde hostearlo</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-ember">Self-hosted</div>
            <p className="text-xl text-muted-foreground leading-snug flex-1">
              Tu infra, tus políticas de datos. Vos operás, vos parcheás.
            </p>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col p-8">
            <div className="mb-4 font-mono uppercase tracking-widest text-ember">Administrado</div>
            <p className="text-xl text-muted-foreground leading-snug flex-1">
              Plataformas que deployan servers MCP en minutos. Menos operación, menos control.
            </p>
          </DeckCard>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          La decisión es la de siempre:{" "}
          <span className="text-foreground font-bold">control vs operación</span>, según los datos
          que pasan por ahí.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Debugging = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Debugging de conexiones</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="errores reales, con sus causas" tone="default" className="max-w-[1500px]">
          {`"fetch is not defined"
→ runtime viejo: fetch existe desde Node 18.
  revisá la versión antes de culpar al server.

el client conecta y no pasa nada
→ un lado hablaba SSE, el otro Streamable HTTP.
  el transporte tiene que coincidir en ambos lados.

funciona local, muere en el deploy
→ stdio no viaja por la red. para clientes remotos, HTTP.`}
        </CodeBlock>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const N8nIntegration = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>MCP en plataformas de automatización</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["MCP Client Tool", "El nodo de n8n que conecta un flujo a tus servers MCP."],
          ["Transporte", "Desde n8n cloud, solo HTTP. stdio queda para instancias locales."],
          ["Credenciales", "Se configuran en la plataforma, no viajan en el flujo."],
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
          El mismo server que usa tu agente lo puede usar un workflow de n8n.{" "}
          <span className="text-foreground font-bold">Ese es el punto del protocolo.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Security = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Seguridad</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          ["Inputs del modelo", "Validalos como input de usuario. Lo son."],
          ["Prompt injection", "Un doc recuperado puede traer instrucciones. Los tool results también se sanitizan."],
          ["Acciones destructivas", "Borrar, pagar, mandar mails: confirmación o human-in-the-loop."],
          ["Servers de terceros", "Un server ajeno corre con tus permisos. Leé qué hace antes de instalarlo."],
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

const RouteChecklist = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Checklist de ruta técnica</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          "¿Ya existe un server para esto?",
          "Tools con nombre y descripción que el modelo entiende",
          "Credenciales fuera del contexto, permisos mínimos",
          "Transporte según dónde corre el cliente",
          "Probado con Inspector antes de conectar un agente",
          "Log de cada tool call: args, resultado, latencia",
          "Plan de versionado para no romper clientes",
          "Respuestas cortas: la ventana del cliente no es tuya",
        ]}
        render={(item) => <CheckboxCard text={item as string} />}
      />
    </ContentSlide>
  </Shell>
);

const Exercise = () => (
  <Shell bg="panel">
    <StatementSlide>
      <div className="flex flex-col gap-8">
        <p className="font-mono text-base uppercase tracking-[0.4em] text-ember">
          ejercicio · en grupos
        </p>
        <h2 className="font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.98]">
          Diseñen el server.
        </h2>
        <SlideLead className="max-w-[1300px]">
          Un caso de negocio, 15 minutos: qué tools expone, qué va como resource, qué transporte y
          qué permisos.
        </SlideLead>
      </div>
    </StatementSlide>
  </Shell>
);

const Integration = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>MCP + RAG + multi-agente</SlideTitle>
      </RevealItem>
      <RevealStack className="flex flex-col items-center gap-2.5">
        <RevealItem className="w-full max-w-[1200px]">
          <FlowBox title="Orquestador + workers" sub="los agentes de la sesión 2" className="py-4" />
        </RevealItem>
        <RevealItem>
          <span aria-hidden className="font-mono text-2xl text-ember">↓</span>
        </RevealItem>
        <RevealItem className="w-full max-w-[1200px]">
          <FlowBox
            accent
            title="MCP"
            sub="un protocolo para todas las herramientas"
            className="py-4"
          />
        </RevealItem>
        <RevealItem>
          <span aria-hidden className="font-mono text-2xl text-ember">↓</span>
        </RevealItem>
        <RevealItem className="grid w-full max-w-[1200px] grid-cols-3 gap-4">
          <FlowBox title="Vector store" sub="el RAG, atrás de un server" />
          <FlowBox title="DB de sesiones" sub="estado y memoria" />
          <FlowBox title="APIs internas" sub="facturación, CRM, lo que sea" />
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          Los workers no saben de conectores.{" "}
          <span className="text-foreground font-bold">Hablan un solo protocolo.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const AgentSdk = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>MCP y el Agent SDK</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="pseudocódigo" tone="good" className="max-w-[1400px]">
          {`# los servers se declaran, no se integran
agente = Agent(
    mcp_servers=[
        "npx -y @empresa/wiki-mcp",       # stdio, local
        "https://mcp.interno/facturas",   # HTTP, remoto
    ]
)

# las tools de cada server aparecen como tools
# del agente. sin conector a mano.`}
        </CodeBlock>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Myths = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>
          Mitos <span className="text-ember">y confusiones</span>
        </SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          "MCP reemplaza al RAG: no, el RAG puede vivir atrás de un server MCP",
          "MCP es solo para Claude: es un estándar abierto, lo hablan varios clientes",
          "Necesito MCP para todo: para tools internas simples, function calling alcanza",
          "Más servers es mejor: cada server suma tools y tokens a la ventana",
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
          ["El problema", "N × M conectores hechos a mano"],
          ["MCP", "la herramienta se escribe una vez, la usa cualquier cliente"],
          ["Diseño", "tools claras, granularidad justa, permisos mínimos"],
          ["Ruta técnica", "stdio para desarrollo, HTTP para producción"],
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
        El protocolo no piensa
        <br />
        la herramienta por vos.
        <br />
        Te ahorra el conector.
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
          <span className="text-ember">Claude Code y prompts de producción.</span>
        </h2>
        <SlideLead className="max-w-[1200px]">
          Workflows técnicos con el agente en la terminal, y cómo escribir prompts que aguantan
          producción.
        </SlideLead>
      </div>
    </StatementSlide>
  </Shell>
);

export const slidesSesion03: SlideDefBase[] = [
  {
    id: "s3-cover",
    title: "Portada",
    Component: Cover,
    notes:
      "Hoy: qué es MCP, cómo se diseña un server y la ruta a producción. Bloque 2 es el más técnico: si el grupo viene junior, versionado y testing se pasan rápido.",
  },
  {
    id: "s3-recap",
    title: "Recap sesión 2",
    Component: Recap,
    notes:
      "3 min. Una frase por card. El puente: los agentes de la sesión pasada usan herramientas, hoy vemos cómo conectarlas bien.",
  },
  {
    id: "s3-thesis",
    title: "Tesis",
    Component: Thesis,
    notes:
      "Pausa 3 seg. Quien haya integrado una API con function calling a mano sabe de qué hablamos. Preguntar quién lo sufrió.",
  },
  {
    id: "s3-problem",
    title: "El problema N × M",
    Component: ProblemNxM,
    notes:
      "La cuenta simple: N agentes por M herramientas es multiplicar, con protocolo es sumar. No profundizar todavía en cómo: eso viene ahora.",
  },
  {
    id: "s3-what",
    title: "¿Qué es MCP?",
    Component: WhatIsMcp,
    notes:
      "Pausa 2 seg. Pregunta + sigla, como los bloques de la serie. Definición corta en voz: estándar abierto para conectar modelos con herramientas y datos.",
  },
  {
    id: "s3-usb",
    title: "USB-C",
    Component: UsbAnalogy,
    notes:
      "La analogía oficial y funciona: antes cada dispositivo tenía su cable, ahora un puerto común. No estirarla más de 30 seg.",
  },
  {
    id: "s3-architecture",
    title: "Host, client, server",
    Component: Architecture,
    notes:
      "Narrar el diagrama: el host es la app donde vive el modelo, abre un client por server, conexión 1 a 1. El host no sabe nada de la API de atrás: eso es lo que compra el protocolo.",
  },
  {
    id: "s3-primitives",
    title: "Tools, resources, prompts",
    Component: Primitives,
    notes:
      "Los tres primitivos con quién decide: tools el modelo, resources la app, prompts el usuario. La mayoría de los servers reales solo tiene tools y no pasa nada.",
  },
  {
    id: "s3-transports",
    title: "Transportes",
    Component: Transports,
    notes:
      "stdio: local, proceso hijo, cero auth. Streamable HTTP: remoto, multi-cliente, auth. Mencionar que SSE como transporte quedó deprecado: aparece en tutoriales viejos y confunde.",
  },
  {
    id: "s3-vs-fc",
    title: "MCP vs function calling",
    Component: VsFunctionCalling,
    notes:
      "No son rivales: function calling es el mecanismo, MCP lo hace portable entre clientes. Lo que gana el arquitecto: escribir la tool una vez.",
  },
  {
    id: "s3-ecosystem",
    title: "Ecosistema",
    Component: Ecosystem,
    notes:
      "Clientes, servers, registry. Mensaje único: buscá antes de construir. El ecosistema se mueve rápido, lo que hoy no existe quizás exista el mes que viene.",
  },
  {
    id: "s3-build-or-not",
    title: "¿Server propio?",
    Component: BuildOrNot,
    notes:
      "Criterio de decisión en dos columnas. El caso típico para construir: sistema interno. El caso típico para no construir: la API pública famosa que ya tiene server mantenido.",
  },
  {
    id: "s3-tool-design",
    title: "Diseño de tools",
    Component: ToolDesign,
    notes:
      "Contraste malo/bueno. La descripción es el prompt de la tool: si el modelo no entiende cuándo usarla, no la usa o la usa mal. Nombres de negocio, parámetros tipados.",
  },
  {
    id: "s3-granularity",
    title: "Granularidad",
    Component: Granularity,
    notes:
      "El medio resaltado: una acción de negocio por tool. Contar un ejemplo de cada extremo si hay tiempo.",
  },
  {
    id: "s3-resources-tools",
    title: "Resource vs tool",
    Component: ResourcesVsTools,
    notes:
      "Regla práctica: solo lectura y sin parámetros, resource. Acción o búsqueda parametrizada, tool. No sobrepensarlo.",
  },
  {
    id: "s3-prompts",
    title: "Prompts del server",
    Component: PromptsPrimitive,
    notes:
      "El primitivo menos usado y subvalorado: el server reparte templates versionados. Conectar con skills de la serie interna si el grupo los conoce.",
  },
  {
    id: "s3-auth",
    title: "Auth y permisos",
    Component: AuthSlide,
    notes:
      "Tres reglas: credenciales en el server (jamás en el contexto), permisos mínimos, env vars local y OAuth remoto. Corto y al pie.",
  },
  {
    id: "s3-design-errors",
    title: "Errores de diseño",
    Component: DesignErrors,
    notes:
      "Los cuatro que más se ven. El de respuestas gigantes conecta con contexto (sesión 5): la ventana del cliente no es tuya.",
  },
  {
    id: "s3-versioning-testing",
    title: "Versionado y testing",
    Component: VersioningTesting,
    notes:
      "Rápido si el grupo es junior. Regla de oro: no cambiar firmas, agregar y deprecar. Inspector para probar a mano antes de conectar agentes.",
  },
  {
    id: "s3-case",
    title: "Caso server real",
    Component: CaseServer,
    notes:
      "Caso real (tipo pipeline científico ADMET, contado en genérico). El aprendizaje: jobs largos piden patrón asíncrono con ticket, la tool nunca cuelga esperando. Anécdota de cómo llegamos a eso.",
  },
  {
    id: "s3-route",
    title: "Ruta a producción",
    Component: RouteToProduction,
    notes:
      "El camino completo. Insistir en el orden: primero las tools en local con stdio, el transporte y el hosting son decisiones del final.",
  },
  {
    id: "s3-hosting",
    title: "Hosting",
    Component: Hosting,
    notes: "Corto. Self-hosted vs administrado: control vs operación, según qué datos pasan por el server.",
  },
  {
    id: "s3-debugging",
    title: "Debugging",
    Component: Debugging,
    notes:
      "Anécdotas reales de debugging (n8n MCP Client Tool, fetch is not defined, mismatch de transporte). Contarlas en primera persona: es lo que más queda de la sesión.",
  },
  {
    id: "s3-n8n",
    title: "MCP en n8n",
    Component: N8nIntegration,
    notes:
      "El nodo MCP Client Tool conecta cualquier flujo n8n a tus servers. Desde cloud solo HTTP. El punto: el mismo server sirve a tu agente y a la automatización.",
  },
  {
    id: "s3-security",
    title: "Seguridad",
    Component: Security,
    notes:
      "El server ejecuta lo que pide un modelo: validar args como input de usuario, sanitizar tool results (prompt injection), HITL para acciones destructivas, y ojo con servers de terceros.",
  },
  {
    id: "s3-checklist",
    title: "Checklist",
    Component: RouteChecklist,
    notes: "Recorrer rápido. Es la síntesis operativa de toda la sesión, se la llevan como checklist.",
  },
  {
    id: "s3-exercise",
    title: "Ejercicio",
    Component: Exercise,
    notes:
      "15 a 20 min. Dar un caso de negocio concreto (elegir según el grupo). Cada grupo define tools, resources, transporte, permisos. Puesta en común corta: comparar granularidades.",
  },
  {
    id: "s3-integration",
    title: "MCP + RAG + multi-agente",
    Component: Integration,
    notes:
      "El mapa integrador: los agentes arriba, MCP como capa única de herramientas, abajo el vector store, las sesiones y las APIs. El RAG de la sesión 2 puede ser un server más.",
  },
  {
    id: "s3-agent-sdk",
    title: "MCP y Agent SDK",
    Component: AgentSdk,
    notes:
      "Pseudocódigo a propósito: la forma importa más que la sintaxis. Los servers se declaran en la config del agente y sus tools aparecen solas.",
  },
  {
    id: "s3-myths",
    title: "Mitos",
    Component: Myths,
    notes:
      "Los cuatro mitos que más aparecen. El último es el más caro: cada server instalado mete tools y tokens en cada llamada.",
  },
  {
    id: "s3-recap-final",
    title: "Para llevarse",
    Component: RecapFinal,
    notes: "Recap encadenado. Una línea por bloque, leerlo despacio.",
  },
  {
    id: "s3-closing",
    title: "Cierre",
    Component: Closing,
    notes:
      "Cierre: el protocolo resuelve el conector, el diseño de la herramienta sigue siendo tu laburo. Pausa.",
  },
  {
    id: "s3-next",
    title: "Próxima sesión",
    Component: NextSession,
    notes: "Teaser sesión 4: Claude Code, workflows técnicos y prompt engineering para producción.",
  },
];
