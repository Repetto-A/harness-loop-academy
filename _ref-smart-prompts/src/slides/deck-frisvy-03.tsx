/**
 * Encuentro 3 · IA Generativa para aplicaciones técnicas
 * Formación de nivelación en IA · Frisvy
 *
 * Mismo sistema visual que los decks de la serie: primitivas de Deck05Shell,
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

const Cover = () => (
  <Shell>
    <RevealStack className="flex h-full items-center">
      <div>
        <RevealItem>
          <div className="mb-8 font-mono text-lg uppercase tracking-[0.3em] text-ember">
            Encuentro 3 · Formación en IA
          </div>
        </RevealItem>
        <RevealItem>
          <h1 className="font-display text-[clamp(4rem,9vw,7rem)] font-bold leading-[0.92] text-balance">
            IA generativa
            <br />
            <span className="text-ember">para el trabajo técnico.</span>
          </h1>
        </RevealItem>
        <RevealItem>
          <SlideLead className="mt-10 max-w-[1300px]">
            Análisis de información, código, documentación y flujos de trabajo. Lo que venimos
            viendo, aplicado a lo técnico.
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
        <SlideTitle>Lo que ya tenemos</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          ["Encuentro 1", "Qué hace bien la IA generativa, qué no, y cómo pedirle: contexto y formato."],
          ["Encuentro 2", "Uso en la organización: proyectos, instrucciones reutilizables, qué se comparte y qué no."],
        ]}
        render={(item) => {
          const [title, body] = item as [string, string];
          return (
            <DeckCard className="flex h-full min-h-[140px] flex-col p-8">
              <div className="font-mono text-sm text-ember mb-3">{title}</div>
              <div className="font-display text-xl leading-snug flex-1">{body}</div>
            </DeckCard>
          );
        }}
      />
      <RevealItem>
        <SlideLead>
          Hoy: todo eso aplicado a <span className="text-foreground font-bold">logs, specs, código y docs</span>.
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
        cols={4}
        items={[
          ["01", "Información técnica", "Logs, reportes y specs: leer más rápido"],
          ["02", "Código", "Entender, revisar y escribir con asistencia"],
          ["03", "Documentación", "Generarla y mejorarla sin sufrirla"],
          ["04", "Flujos de trabajo", "Dónde entra la IA y qué validás vos"],
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
          Cerramos con un <span className="text-foreground font-bold">hands on</span> sobre un caso
          del equipo.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Thesis = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] max-w-[1500px] text-balance">
        El modelo no conoce tu sistema.
        <br />
        Todo lo que sigue arranca ahí.
      </h2>
    </StatementSlide>
  </Shell>
);

const TechInfo = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Qué le podés tirar</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          ["Logs y stack traces", "Hipótesis de qué se rompió y por dónde empezar a mirar."],
          ["Reportes y planillas", "Extraer los datos que importan de un archivo que nadie quiere leer."],
          ["Specs y contratos de API", "Resumir, comparar versiones, encontrar la cláusula que buscás."],
          ["Documentación larga", "De 40 páginas a lo que necesitás para la tarea de hoy."],
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

const LogExample = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Ejemplo: un error en producción</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-8">
        <RevealItem>
          <CodeBlock label="así no" tone="bad">
            {`¿por qué falla esto?

[pega 3 líneas del error]`}
          </CodeBlock>
        </RevealItem>
        <RevealItem>
          <CodeBlock label="así sí" tone="good">
            {`Este stack trace apareció después del
deploy de ayer. Antes funcionaba.

[pega el trace completo + el cambio]

Dame 3 hipótesis ordenadas por
probabilidad y qué revisar en cada una.`}
          </CodeBlock>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          Lo del encuentro 1, aplicado: material completo, contexto de qué cambió,{" "}
          <span className="text-foreground font-bold">y el formato de salida pedido</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const OwnKnowledge = () => (
  <SectionIntro
    question="¿Y el conocimiento de tu equipo?"
    sub="El modelo sabe de todo en general y de lo tuyo, nada"
  />
);

const KnowledgeHow = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Trabajar con tu material</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["En la conversación", "Pegás la spec o el doc y preguntás sobre eso.", "Para consultas puntuales."],
          ["En un proyecto", "El material queda cargado y cada chat arranca sabiendo.", "Para trabajo recurrente."],
          ["Citando la fuente", "Pedís que responda señalando de qué parte del doc salió.", "Para poder verificar."],
        ]}
        render={(item) => {
          const [title, body, when] = item as [string, string, string];
          return (
            <DeckCard className="flex h-full min-h-[190px] flex-col p-8">
              <div className="font-mono text-sm text-ember mb-3 uppercase tracking-widest">{title}</div>
              <div className="font-display text-xl leading-snug mb-3 flex-1">{body}</div>
              <div className="border-t border-border pt-3 text-base text-muted-foreground">{when}</div>
            </DeckCard>
          );
        }}
      />
      <RevealItem>
        <SlideLead>
          Los proyectos del encuentro 2 son{" "}
          <span className="text-foreground font-bold">la herramienta central de esta sesión</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const SpecExample = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Con la spec y sin la spec</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-8">
        <RevealItem>
          <CodeBlock label="sin material" tone="bad">
            {`¿cómo se autentica un usuario
en la API?

→ respuesta genérica de manual.
  correcta en general, inútil
  para tu sistema.`}
          </CodeBlock>
        </RevealItem>
        <RevealItem>
          <CodeBlock label="con material" tone="good">
            {`[proyecto con la spec de la API cargada]

¿cómo se autentica un usuario?

→ el flujo de TU API, con los
  endpoints y headers reales.`}
          </CodeBlock>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const SensitiveData = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>
          Antes de pegar, <span className="text-ember">frenar</span>
        </SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          "Credenciales, tokens y API keys adentro del código que pegás",
          "Datos personales de clientes en logs y planillas",
          "Información contractual o comercial que no es tuya para compartir",
          "Código propietario en herramientas no aprobadas por la organización",
        ]}
        render={(item) => <CrossCard text={item as string} />}
      />
      <RevealItem>
        <SlideLead>
          Es lo de gobernanza del encuentro 2, en su versión técnica:{" "}
          <span className="text-foreground font-bold">limpiá antes de pegar</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const CodeIntro = () => (
  <SectionIntro question="¿Y para el código?" sub="Donde más rinde y donde más se nota el mal uso" />
);

const CodeUses = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Dónde rinde</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          ["Entender código ajeno", "Una función legacy sin comentarios explicada en un minuto."],
          ["Revisar antes del PR", "Otro par de ojos: casos borde, errores tontos, nombres confusos."],
          ["Tests y boilerplate", "Lo repetitivo que nadie quiere escribir a mano."],
          ["Migrar y traducir", "Entre lenguajes, versiones de framework o estilos del equipo."],
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

const CodeExample = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Ejemplo: revisar un cambio</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="pedido de review con foco" tone="good" className="max-w-[1400px]">
          {`Este cambio agrega el descuento por volumen
al cálculo de precios.

[pega el diff]

Revisalo con foco en:
- casos borde (cantidad 0, negativa, enorme)
- qué pasa si el cliente no tiene lista de precios
- no me interesa el estilo, solo la lógica`}
        </CodeBlock>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          Review con foco, no "revisá esto". Le decís{" "}
          <span className="text-foreground font-bold">qué te preocupa y qué ignorar</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const CodeStatement = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] max-w-[1500px] text-balance">
        Si no entendés el código
        <br />
        que te dio, no lo pegues.
      </h2>
    </StatementSlide>
  </Shell>
);

const CodeErrors = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>
          Errores comunes <span className="text-ember">con código</span>
        </SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          "Aceptar el código sin correrlo: compila en el chat, no en tu proyecto",
          "APIs y funciones inventadas que suenan perfectamente razonables",
          "Pedir el sistema entero de una en vez de ir por partes",
          "Perder el hilo: a la tercera corrección, mejor empezar un chat nuevo",
        ]}
        render={(item) => <CrossCard text={item as string} />}
      />
    </ContentSlide>
  </Shell>
);

const DocsUses = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Documentación: la deuda de siempre</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={2}
        items={[
          ["De notas a doc", "Apuntes sueltos de una reunión convertidos en documento estructurado."],
          ["Changelog y resúmenes", "Qué cambió y por qué, a partir de los commits o tickets."],
          ["Comentarios y docstrings", "El código que quedó sin explicar, explicado."],
          ["Para no técnicos", "El mismo contenido, contado para el cliente o para gerencia."],
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
      <RevealItem>
        <SlideLead>
          La IA arma el borrador. <span className="text-foreground font-bold">La precisión la ponés vos.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const DocsExample = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Ejemplo: de notas a documento</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="entrada y pedido" tone="good" className="max-w-[1400px]">
          {`Notas de la reunión de hoy:
- el cliente quiere export a excel
- juan dijo que la API de reportes no da, hay que rehacer
- deadline realista: fin de mes que viene
- queda pendiente definir permisos

Armá una minuta con: decisiones, pendientes
con responsable, y riesgos. Formato para
compartir con el cliente.`}
        </CodeBlock>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          Dos minutos de trabajo que antes eran veinte.{" "}
          <span className="text-foreground font-bold">Releer antes de mandar, siempre.</span>
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const WorkflowFlow = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El flujo que se repite</SlideTitle>
      </RevealItem>
      <FlowChain
        items={[
          { title: "Tarea" },
          { title: "Contexto", sub: "el material y qué querés" },
          { title: "Borrador con IA", sub: "análisis, código o doc" },
          { title: "Tu revisión", sub: "correr, verificar, corregir", accent: true },
          { title: "Entrega" },
        ]}
      />
      <RevealItem>
        <SlideLead>
          El paso resaltado no se saltea. La IA acelera los del medio,{" "}
          <span className="text-foreground font-bold">la responsabilidad del final es tuya</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Consistency = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Consistencia: plantillas de equipo</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Plantilla de review", "Los mismos criterios cada vez que alguien pide una revisión."],
          ["Plantilla de doc", "Toda la documentación del equipo con la misma estructura."],
          ["Plantilla de análisis", "Logs y errores siempre analizados con el mismo formato de salida."],
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
          Instrucciones reutilizables guardadas en el proyecto: el prompt bueno{" "}
          <span className="text-foreground font-bold">se escribe una vez</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const WhoValidates = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>La IA propone, vos validás</SlideTitle>
      </RevealItem>
      <RevealItem>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-ember">
              <th className="pb-4 font-mono text-base uppercase tracking-widest text-ember">Tarea</th>
              <th className="pb-4 font-mono text-base uppercase tracking-widest text-ember">La IA</th>
              <th className="pb-4 font-mono text-base uppercase tracking-widest text-ember">Vos</th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {[
              ["Analizar un log", "propone hipótesis", "confirmás contra el código"],
              ["Revisar un cambio", "señala problemas", "decidís qué aplicar"],
              ["Escribir tests", "genera los casos", "revisás qué quedó sin cubrir"],
              ["Documentar", "arma el borrador", "corregís precisión y tono"],
            ].map(([a, b, c]) => (
              <tr key={a} className="border-b border-border">
                <td className="py-5 font-display font-bold">{a}</td>
                <td className="py-5 text-muted-foreground">{b}</td>
                <td className="py-5 text-ember">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const HandsOn = () => (
  <Shell bg="panel">
    <StatementSlide>
      <div className="flex flex-col gap-8">
        <p className="font-mono text-base uppercase tracking-[0.4em] text-ember">
          hands on · caso técnico
        </p>
        <h2 className="font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.98]">
          Un caso real del equipo.
        </h2>
        <SlideLead className="max-w-[1300px]">
          Elegimos una tarea técnica de las de todos los días y la resolvemos con el flujo
          completo: contexto, pedido, borrador y validación.
        </SlideLead>
      </div>
    </StatementSlide>
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
          ["Contexto primero", "el modelo no conoce tu sistema: dale tu material"],
          ["Con foco", "qué querés, qué te preocupa, en qué formato"],
          ["Validación tuya", "correr el código, verificar el dato, releer el doc"],
          ["Plantillas", "el prompt bueno se escribe una vez y lo usa todo el equipo"],
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
        La IA te ahorra el tiempo de escribir.
        <br />
        No el de pensar.
      </h2>
    </StatementSlide>
  </Shell>
);

const NextSession = () => (
  <Shell bg="panel">
    <StatementSlide>
      <div className="flex flex-col gap-8">
        <h2 className="font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-bold leading-[0.98]">
          Próximo encuentro:
          <br />
          <span className="text-ember">asistentes especializados y nuevas formas de trabajo.</span>
        </h2>
        <SlideLead className="max-w-[1200px]">
          De conversaciones sueltas a entornos con contexto persistente: agentes, asistentes
          propios y qué modelo elegir para cada cosa.
        </SlideLead>
      </div>
    </StatementSlide>
  </Shell>
);

export const slidesFrisvy03: SlideDefBase[] = [
  {
    id: "f3-cover",
    title: "Portada",
    Component: Cover,
    notes:
      "El encuentro más técnico del programa. Si el grupo es mixto, avisar: los ejemplos son de trabajo técnico pero la lógica sirve para cualquier material complejo.",
  },
  {
    id: "f3-recap",
    title: "Recap",
    Component: Recap,
    notes:
      "3 min. Encuentro 1: cómo pedirle (contexto y formato). Encuentro 2: proyectos y gobernanza. Hoy se usan las dos cosas todo el tiempo.",
  },
  {
    id: "f3-agenda",
    title: "Agenda",
    Component: Agenda,
    notes: "30 seg. Cuatro bloques y el hands on al final. Administrar el tiempo: el bloque de código es el más largo.",
  },
  {
    id: "f3-thesis",
    title: "Tesis",
    Component: Thesis,
    notes:
      "Pausa 3 seg. La idea que ordena la sesión: el modelo sabe de todo en general y de lo tuyo, nada. Por eso todo lo de hoy empieza por darle tu material.",
  },
  {
    id: "f3-tech-info",
    title: "Información técnica",
    Component: TechInfo,
    notes:
      "Bloque 1. Cuatro tipos de material que el equipo maneja a diario. Preguntar cuál les consume más tiempo: eso ordena los ejemplos del hands on.",
  },
  {
    id: "f3-log-example",
    title: "Ejemplo log",
    Component: LogExample,
    notes:
      "Contraste malo/bueno con un error de producción. El bueno tiene las tres cosas del encuentro 1: material completo, contexto de qué cambió, formato de salida. Demo en vivo si hay tiempo.",
  },
  {
    id: "f3-own-knowledge",
    title: "¿Conocimiento propio?",
    Component: OwnKnowledge,
    notes:
      "Pausa 2 seg. Transición al bloque de conocimiento especializado. La frase de abajo es la clave: sabe de todo en general, de lo tuyo nada.",
  },
  {
    id: "f3-knowledge-how",
    title: "Trabajar con tu material",
    Component: KnowledgeHow,
    notes:
      "Tres niveles: pegar en la conversación (puntual), proyecto con material cargado (recurrente), pedir citas de la fuente (verificable). Los proyectos del encuentro 2 son la herramienta central.",
  },
  {
    id: "f3-spec-example",
    title: "Ejemplo spec",
    Component: SpecExample,
    notes:
      "El mismo pedido con y sin material: respuesta de manual vs respuesta de TU sistema. Es la demo más convincente de la sesión: hacerla en vivo con un doc del equipo si se puede.",
  },
  {
    id: "f3-sensitive",
    title: "Antes de pegar, frenar",
    Component: SensitiveData,
    notes:
      "Gobernanza del encuentro 2 en versión técnica. Credenciales en código pegado es el descuido más común. Mencionar qué herramientas están aprobadas en la organización.",
  },
  {
    id: "f3-code-intro",
    title: "¿Y para el código?",
    Component: CodeIntro,
    notes: "Pausa 2 seg. Cambio al bloque de código. Es donde más rinde y donde el mal uso se paga más caro.",
  },
  {
    id: "f3-code-uses",
    title: "Dónde rinde",
    Component: CodeUses,
    notes:
      "Cuatro usos: entender código ajeno (el favorito de todos), review antes del PR, tests y boilerplate, migraciones. Ejemplo oral de cada uno, corto.",
  },
  {
    id: "f3-code-example",
    title: "Ejemplo review",
    Component: CodeExample,
    notes:
      "Review con foco: le decís qué te preocupa y qué ignorar. Sin foco, la review vuelve genérica y comenta el estilo en vez de la lógica.",
  },
  {
    id: "f3-code-statement",
    title: "Si no lo entendés",
    Component: CodeStatement,
    notes:
      "Punchline del bloque. Pausa. El código que no entendés es deuda que firma otro: cuando se rompa, el que lo pegó no va a saber por qué.",
  },
  {
    id: "f3-code-errors",
    title: "Errores con código",
    Component: CodeErrors,
    notes:
      "Los cuatro clásicos. Las APIs inventadas merecen anécdota: funciones que suenan perfectas y no existen. El chat nuevo a la tercera corrección ahorra más tiempo del que parece.",
  },
  {
    id: "f3-docs-uses",
    title: "Documentación",
    Component: DocsUses,
    notes:
      "Bloque 3, más corto. La deuda eterna de los equipos técnicos. Cuatro usos, del borrador a la traducción para no técnicos. La IA arma el borrador, la precisión es tuya.",
  },
  {
    id: "f3-docs-example",
    title: "Ejemplo minuta",
    Component: DocsExample,
    notes:
      "Notas sueltas a minuta estructurada. Elegido a propósito por ser transversal: sirve igual para el que no programa. Releer antes de mandar, siempre.",
  },
  {
    id: "f3-workflow",
    title: "El flujo que se repite",
    Component: WorkflowFlow,
    notes:
      "Bloque 4. El mismo flujo de cinco pasos en todos los ejemplos de hoy: tarea, contexto, borrador, revisión (resaltada), entrega. La revisión no se saltea nunca.",
  },
  {
    id: "f3-consistency",
    title: "Plantillas de equipo",
    Component: Consistency,
    notes:
      "Consistencia entre personas: plantillas de review, doc y análisis guardadas en el proyecto. Conecta con instrucciones reutilizables del encuentro 2. El prompt bueno se escribe una vez.",
  },
  {
    id: "f3-who-validates",
    title: "La IA propone, vos validás",
    Component: WhoValidates,
    notes:
      "La tabla síntesis de la sesión. Recorrer la columna de la derecha: es la que define el trabajo de cada uno. Dejarla en pantalla un rato.",
  },
  {
    id: "f3-hands-on",
    title: "Hands on",
    Component: HandsOn,
    notes:
      "20 a 30 min. Elegir el caso según lo que respondieron en el bloque 1 (logs, spec, código o doc). Aplicar el flujo completo en vivo, con idas y vueltas reales. Si algo sale mal, mejor: se muestra cómo corregir.",
  },
  {
    id: "f3-recap-final",
    title: "Para llevarse",
    Component: RecapFinal,
    notes: "Recap encadenado, una línea por idea. Leerlo despacio.",
  },
  {
    id: "f3-closing",
    title: "Cierre",
    Component: Closing,
    notes: "Cierre. La IA ahorra el tiempo de escribir, no el de pensar. Pausa.",
  },
  {
    id: "f3-next",
    title: "Próximo encuentro",
    Component: NextSession,
    notes:
      "Teaser del encuentro 4 (cierre del programa): contexto persistente, asistentes especializados, modelos propietarios vs open source. Preguntas y cierre.",
  },
];
