/**
 * Prompts y APIs · Clase 1
 *
 * Arco: apertura (ronda + mano alzada) → cómo funciona un LLM (tokens, ventana, roles) →
 * anatomía del prompt real (system, rules, memoria, skills, tools/MCP, historial) →
 * guardrails → API: el harness sos vos (request, response, stateless, costo, tools,
 * JSON) → prompting que funciona (brief, técnicas, few-shot, disciplinas, iterar) →
 * práctica → cierre. RAG y fine-tuning quedan para la clase 2.
 */
import type React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CodeBlock } from "@/components/CodeBlock";
import { SlideShell } from "@/components/SlideShell";
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
import { slides30 } from "@/slides/deck-30";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

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

function Statement({ children, sub }: { children: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <SlideShell bg="ember" noChrome>
      <StatementSlide>
        <div className="max-w-[1500px]">
          <h2 className="font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[1.02] text-balance">
            {children}
          </h2>
          {sub && (
            <>
              <div aria-hidden className="mt-10 h-1 w-24 rounded-full bg-[oklch(0.18_0_0)]" />
              <p className="mt-8 max-w-[1300px] text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-snug text-pretty text-[oklch(0.18_0_0)]">
                {sub}
              </p>
            </>
          )}
        </div>
      </StatementSlide>
    </SlideShell>
  );
}

function SectionIntro({ num, title, lead }: { num: string; title: string; lead: string }) {
  return (
    <Shell bg="panel" section={num}>
      <RevealStack className="flex h-full min-h-0 flex-1 flex-col justify-center gap-8">
        <RevealItem>
          <h2 className="font-display text-[clamp(3.25rem,7.5vw,6.5rem)] font-bold leading-tight text-balance">
            {title}
          </h2>
        </RevealItem>
        <RevealItem>
          <SlideLead className="max-w-[1300px]">{lead}</SlideLead>
        </RevealItem>
      </RevealStack>
    </Shell>
  );
}

function TitledCard({
  title,
  children,
  accent = false,
}: {
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <DeckCard accent={accent} className="flex h-full flex-col">
      <div className="mb-3 font-display text-xl font-bold leading-tight text-ember">{title}</div>
      <div className="text-lg leading-snug text-muted-foreground">{children}</div>
    </DeckCard>
  );
}

function CardsSlide({
  title,
  lead,
  cols,
  cards,
}: {
  title: string;
  lead?: string;
  cols: 2 | 3 | 4;
  cards: readonly (readonly [string, string])[];
}) {
  return (
    <Shell>
      <ContentSlide loose>
        <RevealItem>
          <SlideTitle>{title}</SlideTitle>
        </RevealItem>
        {lead && (
          <RevealItem>
            <SlideLead>{lead}</SlideLead>
          </RevealItem>
        )}
        <CardGrid
          cols={cols}
          items={cards}
          render={(item) => {
            const [t, b] = item as readonly [string, string];
            return <TitledCard title={t}>{b}</TitledCard>;
          }}
        />
      </ContentSlide>
    </Shell>
  );
}

function NumberedList({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <RevealStack className="space-y-3">
      {items.map(([title, body], i) => (
        <RevealItem key={title}>
          <div className="flex gap-5 rounded-xl border border-border bg-surface/80 px-6 py-4">
            <div className="shrink-0 font-mono text-xl tabular-nums text-ember">{i + 1}</div>
            <div className="min-w-0">
              <div className="font-display text-xl leading-snug">{title}</div>
              <div className="mt-1 text-[1.05rem] leading-snug text-muted-foreground">{body}</div>
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealStack>
  );
}

function FlowBox({ title, sub, accent = false }: { title: string; sub?: string; accent?: boolean }) {
  return (
    <div
      className={[
        "min-w-[170px] rounded-xl border px-5 py-4 text-center",
        accent ? "border-2 border-ember bg-ember/10" : "border-border bg-surface/80",
      ].join(" ")}
    >
      <div className="font-display text-lg font-bold leading-tight">{title}</div>
      {sub && <div className="mt-1 text-sm leading-snug text-muted-foreground">{sub}</div>}
    </div>
  );
}

function Arrow({ label = "→" }: { label?: string }) {
  return (
    <span aria-hidden className="font-mono text-2xl text-ember">
      {label}
    </span>
  );
}

function StepReveal({
  step,
  rows,
  highlightLast = false,
}: {
  step: number;
  rows: readonly (readonly [string, string, string?])[];
  highlightLast?: boolean;
}) {
  const reduce = useReducedMotion();
  const allVisible = step >= rows.length;
  const dense = rows.length > 6;

  return (
    <div className={`${dense ? "space-y-1.5" : "space-y-2"} overflow-visible`}>
      {rows.map(([title, body, tag], i) => {
        const level = i + 1;
        if (step < level) return null;
        const isLast = level === rows.length;
        const focused = step === level || (allVisible && highlightLast && isLast);

        return (
          <motion.div
            key={title}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: focused ? 1 : allVisible ? 0.85 : 0.5, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.35, ease: EASE_OUT }}
            className={[
              "flex items-center gap-4 rounded-xl border px-5 backdrop-blur-sm",
              dense ? "py-2" : "py-3",
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
              <div className={`font-display leading-snug text-foreground ${dense ? "text-lg" : "text-xl"}`}>
                {title}
              </div>
              <div
                className={`leading-snug text-muted-foreground ${dense ? "text-base" : "mt-0.5 text-[1.05rem]"}`}
              >
                {body}
              </div>
            </div>
            {tag && (
              <div className="shrink-0 rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {tag}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ───────────────────────── Apertura ───────────────────────── */

const Cover = () => (
  <Shell>
    <RevealStack className="flex h-full items-center">
      <div>
        <RevealItem>
          <h1 className="font-display text-[clamp(3.5rem,8vw,6.5rem)] font-bold leading-[0.95] text-balance">
            Ingeniería de prompts
            <br />
            <span className="text-ember">y APIs de IA.</span>
          </h1>
        </RevealItem>
        <RevealItem>
          <SlideLead className="mt-10 max-w-[1300px]">Alejandro Repetto</SlideLead>
        </RevealItem>
      </div>
    </RevealStack>
  </Shell>
);

const Hook = () => (
  <Shell>
    <RevealStack className="flex h-full items-center">
      <div>
        <RevealItem>
          <h1 className="font-display text-[clamp(4rem,9vw,7rem)] font-bold leading-[0.92] text-balance">
            Lo que el modelo realmente lee.
          </h1>
        </RevealItem>
        <RevealItem>
          <SlideLead className="mt-10 max-w-[1400px]">
            Qué se arma antes de tu mensaje, qué pasa cuando lo armás vos por API, y cómo escribir
            prompts que funcionan.
          </SlideLead>
        </RevealItem>
      </div>
    </RevealStack>
  </Shell>
);

const Intros = () => (
  <CardsSlide
    title="¿Quién está acá?"
    cols={4}
    cards={[
      ["Nombre", "Y a qué te dedicás."],
      ["Qué IA usás", "ChatGPT, Claude, Gemini, Copilot, Cursor… o ninguna todavía."],
      ["Para qué", "La tarea concreta en la que más la usás hoy."],
      ["Qué te gustaría", "Algo que hoy hacés a mano y te encantaría automatizar."],
    ]}
  />
);

const Poll = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Mano alzada</SlideTitle>
      </RevealItem>
      <NumberedList
        items={[
          ["¿Usás un asistente de IA todas las semanas?", "Chat, IDE, lo que sea."],
          ["¿Le dejaste instrucciones fijas alguna vez?", "Custom instructions, un proyecto, una rule."],
          ["¿Usaste un skill?", "Sabés que existe y que se activa solo."],
          ["¿Conectaste un MCP?", "Una herramienta externa enchufada al asistente."],
          ["¿Llamaste a una API de un modelo?", "Por código, Postman, n8n o un playground."],
        ]}
      />
    </ContentSlide>
  </Shell>
);

const Roadmap = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Dos clases</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-8">
        <RevealItem>
          <DeckCard accent className="h-full p-8">
            <div className="mb-4 font-mono text-sm uppercase tracking-widest text-ember">Hoy</div>
            <ul className="space-y-3 text-xl leading-snug">
              <li>Cómo funciona un LLM por dentro</li>
              <li>Anatomía del prompt que llega al modelo</li>
              <li>APIs: el modelo sin harness</li>
              <li>Prompting que funciona + few-shot</li>
              <li>Del prompt al sistema: skills y contexto</li>
              <li>Práctica: tu primer skill</li>
            </ul>
          </DeckCard>
        </RevealItem>
        <RevealItem>
          <DeckCard className="h-full p-8">
            <div className="mb-4 font-mono text-sm uppercase tracking-widest text-muted-foreground">
              Próxima
            </div>
            <ul className="space-y-3 text-xl leading-snug text-muted-foreground">
              <li>RAG: darle al modelo tus documentos</li>
              <li>Fine-tuning: cambiar el modelo</li>
              <li>Cuándo usar cada técnica</li>
              <li>Evaluar si mejoró de verdad</li>
            </ul>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

/* ───────────────────────── 01 · Cómo funciona ───────────────────────── */

const S1Intro = () => (
  <SectionIntro
    num="01"
    title="Cómo funciona un LLM"
    lead="Repaso a fondo. Sin esto, todo lo demás parece magia."
  />
);

const NextToken = () => (
  <Statement sub="Todo lo demás (chat, agentes, tools, memoria) está construido alrededor de eso.">
    Un LLM hace una sola cosa: predecir el próximo token.
  </Statement>
);

const AUTOCOMPLETE = [
  ["azul", 0.62],
  ["gris", 0.17],
  ["el límite", 0.09],
  ["inmenso", 0.05],
] as const;

const Autocomplete = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Un autocompletado muy, muy bueno</SlideTitle>
      </RevealItem>
      <RevealItem>
        <div className="font-mono text-[clamp(2rem,4vw,3rem)]">
          El cielo es <span className="text-ember">___</span>
        </div>
      </RevealItem>
      <RevealStack className="space-y-3">
        {AUTOCOMPLETE.map(([word, p]) => (
          <RevealItem key={word}>
            <div className="flex items-center gap-5">
              <div className="w-40 font-mono text-xl">{word}</div>
              <div className="h-6 flex-1 overflow-hidden rounded-full bg-surface">
                <div className="h-full rounded-full bg-ember/70" style={{ width: `${p * 100}%` }} />
              </div>
              <div className="w-16 text-right font-mono text-lg text-muted-foreground">
                {Math.round(p * 100)}%
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealStack>
      <RevealItem>
        <p className="text-base text-muted-foreground">Probabilidades ilustrativas.</p>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Tokens = () => (
  <CardsSlide
    title="Tokens"
    lead="El modelo no lee palabras. Lee pedazos de texto."
    cols={3}
    cards={[
      [
        "Qué es",
        "Un fragmento: una palabra corta, parte de una palabra larga, un signo. En inglés, un token ronda los ¾ de una palabra.",
      ],
      [
        "Por qué importa",
        "Todo se mide en tokens: cuánto entra en la ventana, cuánto tarda y cuánto se cobra.",
      ],
      [
        "Ojo con el español",
        "Los tokenizadores se entrenan sobre todo con inglés: el mismo texto en español suele gastar más tokens.",
      ],
    ]}
  />
);

const ContextWindow = () => (
  <CardsSlide
    title="Ventana de contexto"
    lead="Todo lo que el modelo ve en una llamada. Es memoria de trabajo, no memoria."
    cols={3}
    cards={[
      [
        "Lo que no está, no existe",
        "Si un dato no entra en la ventana de esta llamada, para el modelo no existe.",
      ],
      [
        "Tiene tamaño",
        "Hoy hay modelos con ventanas enormes. Pero que entre no significa que lo use bien.",
      ],
      [
        "Se comparte",
        "Instrucciones, historial, archivos, herramientas y la respuesta: todo sale del mismo presupuesto.",
      ],
    ]}
  />
);

const Roles = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Roles: quién dice qué</SlideTitle>
      </RevealItem>
      <div className="grid grid-cols-[1fr_1.1fr] items-center gap-10">
        <RevealStack className="space-y-4">
          <RevealItem>
            <TitledCard title="system">Las reglas del juego. Quién es, cómo responde, qué no hace.</TitledCard>
          </RevealItem>
          <RevealItem>
            <TitledCard title="user">Lo que pide la persona.</TitledCard>
          </RevealItem>
          <RevealItem>
            <TitledCard title="assistant">Lo que respondió el modelo antes.</TitledCard>
          </RevealItem>
        </RevealStack>
        <RevealItem>
          <CodeBlock label="lo que viaja">{`system: "Sos un asistente de RR.HH.
         Respondé en 3 líneas."

user:      "¿Cuántos días de vacaciones
            tengo con 6 años?"

assistant: "Según la ley argentina..."

user:      "¿Y si trabajo part-time?"`}</CodeBlock>
        </RevealItem>
      </div>
    </ContentSlide>
  </Shell>
);

const Rereads = () => (
  <Statement sub="La “conversación” es una ilusión: en cada turno se le manda todo de nuevo.">
    El modelo no recuerda. Relee todo, cada vez.
  </Statement>
);

/* ───────────────────────── 02 · Anatomía del prompt ───────────────────────── */

const S2Intro = () => (
  <SectionIntro
    num="02"
    title="Anatomía del prompt real"
    lead="Lo que escribís es la punta. Abajo hay mucho más."
  />
);

const HARNESS_PARTS = [
  "Instrucciones",
  "Historial",
  "Memoria",
  "Herramientas",
  "Permisos",
  "El loop",
] as const;

const ModelVsHarness = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Modelo y harness</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 items-center gap-10">
        <RevealItem>
          <div className="relative rounded-3xl border-2 border-dashed border-ember/50 p-6">
            <div className="mb-4 font-mono text-sm uppercase tracking-widest text-ember">Harness</div>
            <div className="grid grid-cols-3 gap-2">
              {HARNESS_PARTS.slice(0, 3).map((p) => (
                <div key={p} className="rounded-lg border border-border bg-surface/80 px-3 py-2 text-center text-base">
                  {p}
                </div>
              ))}
            </div>
            <div className="my-4 rounded-2xl border-2 border-ember bg-ember/10 px-6 py-8 text-center">
              <div className="font-display text-3xl font-bold">Modelo</div>
              <div className="mt-1 text-base text-muted-foreground">texto entra → texto sale</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {HARNESS_PARTS.slice(3).map((p) => (
                <div key={p} className="rounded-lg border border-border bg-surface/80 px-3 py-2 text-center text-base">
                  {p}
                </div>
              ))}
            </div>
          </div>
        </RevealItem>
        <RevealStack className="space-y-4">
          <RevealItem>
            <TitledCard title="Modelo">
              El motor. Recibe texto, predice texto. No recuerda, no ejecuta, no sabe qué hora es.
            </TitledCard>
          </RevealItem>
          <RevealItem>
            <TitledCard title="Harness" accent>
              Todo lo que lo rodea: arma el prompt, guarda la conversación, ejecuta herramientas,
              decide qué se permite y repite el ciclo.
            </TitledCard>
          </RevealItem>
        </RevealStack>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const SameModelDifferentHarness = () => (
  <CardsSlide
    title="Mismo modelo, distinto harness"
    lead="Lo que usás todos los días no es “el modelo”: es un harness con un modelo adentro."
    cols={4}
    cards={[
      ["ChatGPT / Claude.ai", "Harness de chat: memoria, búsqueda web, archivos, proyectos."],
      ["Cursor / Copilot", "Harness de código: lee tu repo, edita archivos, corre comandos."],
      ["Claude Code", "Harness de agente en la terminal: rules, skills, MCPs, subagentes."],
      ["Tu app por API", "El harness lo escribís vos. Puede ser 30 líneas o un producto entero."],
    ]}
  />
);

const WriteVsRead = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Lo que escribís vs lo que lee</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-[1fr_1.4fr] items-center gap-10">
        <RevealItem>
          <DeckCard className="p-8">
            <div className="mb-3 font-mono text-sm uppercase tracking-widest text-muted-foreground">
              Vos
            </div>
            <div className="font-display text-3xl">“Resumime este mail”</div>
          </DeckCard>
        </RevealItem>
        <RevealItem>
          <DeckCard accent className="p-8">
            <div className="mb-3 font-mono text-sm uppercase tracking-widest text-ember">
              El modelo
            </div>
            <div className="space-y-1 font-mono text-base text-muted-foreground">
              <div>system prompt del producto · miles de tokens</div>
              <div>tus instrucciones y rules</div>
              <div>memoria sobre vos</div>
              <div>lista de skills</div>
              <div>definiciones de tools y MCPs</div>
              <div>el mail adjunto</div>
              <div>toda la conversación anterior</div>
              <div className="pt-2 text-xl text-foreground">“Resumime este mail”</div>
            </div>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const PROMPT_LAYERS = [
  ["System prompt del producto", "Lo escribe la empresa: identidad, fecha, estilo, límites, cómo usar herramientas.", "siempre"],
  ["Tus instrucciones", "Custom instructions, proyectos, rules, AGENTS.md / CLAUDE.md.", "siempre"],
  ["Memoria", "Lo que el producto guardó sobre vos, inyectado como texto.", "si está activa"],
  ["Skills", "Nombre y descripción de cada una. El contenido entra solo cuando hace falta.", "siempre · resumen"],
  ["Tools y MCPs", "Definición de cada herramienta: nombre, descripción y parámetros.", "si están conectadas"],
  ["Archivos y resultados", "Adjuntos, búsquedas web, respuestas de herramientas.", "cuando aparecen"],
  ["Historial", "Toda la conversación anterior, completa.", "cada turno"],
  ["Tu mensaje", "Lo único que escribiste vos, ahora.", "último"],
] as const;

const PromptStack = ({ step = 0 }: { step?: number }) => (
  <Shell>
    <ContentSlide loose>
      <SlideTitle>El prompt que llega al modelo</SlideTitle>
      <StepReveal step={step} rows={PROMPT_LAYERS} highlightLast />
    </ContentSlide>
  </Shell>
);

const SystemPrompt = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>System prompt: cómo suelen ser</SlideTitle>
      </RevealItem>
      <div className="grid grid-cols-[1fr_1.3fr] items-center gap-10">
        <RevealStack className="space-y-3 text-xl leading-snug">
          {[
            "Identidad: quién es y para quién trabaja",
            "Contexto: fecha, usuario, producto",
            "Estilo: largo, tono, formato",
            "Límites: qué no hace y qué hacer en ese caso",
            "Herramientas: cuándo usar cada una",
            "Casos difíciles: ejemplos de qué hacer",
          ].map((line) => (
            <RevealItem key={line}>
              <div className="flex gap-3">
                <span className="text-ember">▸</span>
                <span>{line}</span>
              </div>
            </RevealItem>
          ))}
        </RevealStack>
        <RevealItem>
          <CodeBlock label="ejemplo ilustrativo">{`Sos el asistente de soporte de Acme.
Hoy es 14/10/2026. El usuario es cliente plan Pro.

Respondé en español, en 3-5 líneas, sin jerga.
Si piden algo fuera de soporte, decilo y
derivá a ventas@acme.com.

Usá buscar_pedido solo si el usuario da un
número de pedido. Nunca inventes estados.

Si el usuario está enojado: primero reconocé
el problema, después la solución.`}</CodeBlock>
        </RevealItem>
      </div>
    </ContentSlide>
  </Shell>
);

const RealSystemPrompts = () => (
  <CardsSlide
    title="System prompts reales"
    lead="Leerlos es la mejor clase de prompting que existe."
    cols={3}
    cards={[
      [
        "Publicados",
        "Anthropic publica los system prompts de Claude.ai en su documentación. Son largos, específicos y llenos de casos borde.",
      ],
      [
        "Qué mirar",
        "Cuánto espacio le dedican al formato, a cuándo usar herramientas y a qué hacer cuando no saben.",
      ],
      [
        "Qué aprender",
        "No son frases mágicas. Son briefs detallados, escritos e iterados como cualquier documento de producto.",
      ],
    ]}
  />
);

const Rules = () => (
  <CardsSlide
    title="Tus instrucciones y rules"
    lead="Texto fijo que se suma en cada llamada. Cada herramienta lo llama distinto."
    cols={3}
    cards={[
      [
        "En el chat",
        "Custom instructions (ChatGPT), instrucciones de proyecto (Claude), Gems (Gemini).",
      ],
      [
        "En el código",
        "AGENTS.md, CLAUDE.md, .cursor/rules, copilot-instructions.md: un archivo en el repo que el agente lee siempre.",
      ],
      [
        "El costo",
        "Siempre cargadas = siempre pagan tokens. Y si contradicen al system prompt, suele ganar el producto.",
      ],
    ]}
  />
);

const SKILL_LEVELS = [
  ["Nombre + descripción", "Siempre en contexto. Pocas líneas por skill. Es el gatillo: si la descripción es mala, nunca se activa.", "siempre"],
  ["Instrucciones (SKILL.md)", "Se cargan cuando el pedido matchea la descripción.", "si matchea"],
  ["Archivos y scripts", "Plantillas, ejemplos, código. Solo si la tarea los necesita.", "si hace falta"],
] as const;

const Skills = ({ step = 0 }: { step?: number }) => (
  <Shell>
    <ContentSlide loose>
      <SlideTitle>Skills: carga progresiva</SlideTitle>
      <SlideLead>Cientos de skills instaladas sin llenar la ventana.</SlideLead>
      <StepReveal step={step} rows={SKILL_LEVELS} />
    </ContentSlide>
  </Shell>
);

const ToolDefinition = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Una tool, vista por el modelo</SlideTitle>
      </RevealItem>
      <div className="grid grid-cols-[1.2fr_1fr] items-center gap-10">
        <RevealItem>
          <CodeBlock label="definición de una herramienta">{`{
  "name": "buscar_pedido",
  "description": "Busca el estado de un pedido
                  por su número.",
  "input_schema": {
    "type": "object",
    "properties": {
      "numero": { "type": "string" }
    },
    "required": ["numero"]
  }
}`}</CodeBlock>
        </RevealItem>
        <RevealStack className="space-y-4">
          <RevealItem>
            <TitledCard title="Es texto">El modelo no ve el código de la herramienta. Ve esto.</TitledCard>
          </RevealItem>
          <RevealItem>
            <TitledCard title="La descripción manda">
              Con eso decide si la usa y cómo. Mala descripción, mal uso.
            </TitledCard>
          </RevealItem>
          <RevealItem>
            <TitledCard title="Un MCP es un paquete de estas">
              Conectar un MCP = sumar todas sus definiciones al prompt.
            </TitledCard>
          </RevealItem>
        </RevealStack>
      </div>
    </ContentSlide>
  </Shell>
);

const ToolLoop = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>El modelo no ejecuta nada</SlideTitle>
      </RevealItem>
      <RevealItem>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <FlowBox title="Modelo" sub="“quiero usar buscar_pedido con A-123”" />
          <Arrow />
          <FlowBox title="Harness" sub="ejecuta la herramienta de verdad" accent />
          <Arrow />
          <FlowBox title="Resultado" sub="vuelve como texto al contexto" />
          <Arrow />
          <FlowBox title="Modelo" sub="sigue con el dato nuevo" />
        </div>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          El modelo <span className="font-bold text-foreground">pide</span>. El harness{" "}
          <span className="font-bold text-foreground">hace</span>. Por eso el harness decide qué se
          permite, qué necesita aprobación y qué nunca se ejecuta.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const McpCost = () => (
  <CardsSlide
    title="El costo oculto de enchufar todo"
    cols={3}
    cards={[
      [
        "Antes del “hola”",
        "Cada MCP conectado suma sus definiciones. Varios servers con decenas de tools ocupan una parte grande de la ventana antes de que escribas nada.",
      ],
      [
        "Más opciones, más errores",
        "Con muchas herramientas parecidas, el modelo elige peor cuál usar.",
      ],
      [
        "Qué hacer",
        "Conectar solo lo que la tarea necesita. Algunos harnesses cargan las tools bajo demanda, como las skills.",
      ],
    ]}
  />
);

const Memory = () => (
  <CardsSlide
    title="Memoria"
    lead="No es que el modelo aprendió algo de vos."
    cols={3}
    cards={[
      ["Es texto", "El producto guarda notas sobre vos y las pega en el prompt de cada conversación nueva."],
      ["El modelo no cambia", "Los pesos son los mismos para todos. Lo personal está en el contexto."],
      ["Se puede ver y borrar", "Si una respuesta te sorprende, mirá qué memoria tiene cargada."],
    ]}
  />
);

const GUARDRAIL_LAYERS = [
  ["Entrenamiento", "Post-entrenamiento con feedback humano y principios escritos. Queda en los pesos: por eso se niega incluso por API sin ningún system prompt.", "modelo"],
  ["System prompt del producto", "Políticas propias de cada app: tono, temas a evitar, cómo responder.", "producto"],
  ["Clasificadores externos", "Otros modelos que revisan lo que entra y lo que sale, por fuera del LLM.", "plataforma"],
  ["Políticas de uso", "Términos de la cuenta, monitoreo de abuso, límites y bloqueos.", "cuenta"],
] as const;

const Guardrails = ({ step = 0 }: { step?: number }) => (
  <Shell>
    <ContentSlide loose>
      <SlideTitle>Guardrails: ¿dónde viven?</SlideTitle>
      <SlideLead>No es una sola cosa. Son capas.</SlideLead>
      <StepReveal step={step} rows={GUARDRAIL_LAYERS} />
    </ContentSlide>
  </Shell>
);

const MoreIsNotBetter = () => (
  <CardsSlide
    title="Más contexto no es mejor contexto"
    cols={4}
    cards={[
      ["Se pierde", "Lo que queda en el medio de un contexto largo tiende a recibir menos atención."],
      ["Se contradice", "Instrucciones de distintas capas que chocan: el modelo elige una, no siempre la tuya."],
      ["Cuesta", "Cada token se paga y se procesa, en cada turno."],
      ["Tarda", "Más contexto, más latencia hasta la primera palabra."],
    ]}
  />
);

const Break = () => (
  <Statement sub="Después: abrimos el capó.">Corte.</Statement>
);

/* ───────────────────────── 03 · API ───────────────────────── */

const S3Intro = () => (
  <SectionIntro
    num="03"
    title="APIs: el modelo sin harness"
    lead="Todo lo que vimos recién, en la API no existe. Lo armás vos."
  />
);

const YouAreTheHarness = () => (
  <Statement sub="Sin system prompt, sin memoria, sin herramientas, sin historial. Solo el modelo y lo que le mandes.">
    En la API, el harness sos vos.
  </Statement>
);

const WhatIsApi = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>¿Qué es una API?</SlideTitle>
      </RevealItem>
      <RevealItem>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <FlowBox title="Tu programa" sub="planilla, app, n8n, script" />
          <Arrow label="→ pedido →" />
          <FlowBox title="API del modelo" sub="Anthropic, OpenAI, Google…" accent />
          <Arrow label="→ respuesta →" />
          <FlowBox title="Tu programa" sub="usa el resultado" />
        </div>
      </RevealItem>
      <CardGrid
        cols={3}
        items={[
          ["Endpoint", "La dirección a la que se manda el pedido."],
          ["API key", "Tu credencial. Identifica quién paga."],
          ["JSON", "El formato del pedido y de la respuesta."],
        ]}
        render={(item) => {
          const [t, b] = item as [string, string];
          return <TitledCard title={t}>{b}</TitledCard>;
        }}
      />
    </ContentSlide>
  </Shell>
);

const CHAT_VS_API = [
  ["Memoria entre mensajes", "La maneja el producto", "La mandás vos, cada vez"],
  ["System prompt", "Viene escrito", "Vacío: lo escribís vos"],
  ["Búsqueda web, archivos", "Incluidos", "Los activás o los programás"],
  ["Herramientas", "Las conecta el producto", "Las definís y las ejecutás vos"],
  ["Cómo se paga", "Suscripción mensual", "Por token, de entrada y salida"],
  ["Para qué sirve", "Una persona conversando", "Un sistema que lo usa solo"],
] as const;

const ChatVsApi = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Asistente vs API</SlideTitle>
      </RevealItem>
      <RevealItem>
        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-surface px-6 py-3 font-mono text-sm uppercase tracking-widest text-muted-foreground">
            <div />
            <div>Asistente (chat)</div>
            <div className="text-ember">API</div>
          </div>
          {CHAT_VS_API.map(([row, chat, api]) => (
            <div
              key={row}
              className="grid grid-cols-[1.1fr_1fr_1fr] border-t border-border px-6 py-3 text-lg"
            >
              <div className="font-display font-bold">{row}</div>
              <div className="text-muted-foreground">{chat}</div>
              <div>{api}</div>
            </div>
          ))}
        </div>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const RequestAnatomy = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Anatomía de un pedido</SlideTitle>
      </RevealItem>
      <div className="grid grid-cols-[1.5fr_1fr] items-center gap-8">
        <RevealItem>
          <CodeBlock label="request · API de Claude" nowrap>{`curl https://api.anthropic.com/v1/messages \\
  -H "x-api-key: $ANTHROPIC_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "content-type: application/json" \\
  -d '{
    "model": "claude-sonnet-5-5",
    "max_tokens": 1024,
    "system": "Sos soporte de Acme. Respondé breve.",
    "messages": [
      { "role": "user",
        "content": "¿Cómo cambio mi contraseña?" }
    ]
  }'`}</CodeBlock>
        </RevealItem>
        <RevealStack className="space-y-3">
          {[
            ["model", "Qué modelo. Cambia calidad, velocidad y precio."],
            ["max_tokens", "Tope de largo de la respuesta."],
            ["system", "Opcional. Si no lo mandás, no hay."],
            ["messages", "La conversación. Toda."],
          ].map(([k, v]) => (
            <RevealItem key={k}>
              <div>
                <div className="font-mono text-lg text-ember">{k}</div>
                <div className="text-lg leading-snug text-muted-foreground">{v}</div>
              </div>
            </RevealItem>
          ))}
        </RevealStack>
      </div>
    </ContentSlide>
  </Shell>
);

const ResponseAnatomy = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Anatomía de una respuesta</SlideTitle>
      </RevealItem>
      <div className="grid grid-cols-[1.4fr_1fr] items-center gap-8">
        <RevealItem>
          <CodeBlock label="response · simplificada" nowrap>{`{
  "role": "assistant",
  "model": "claude-sonnet-5-5",
  "content": [
    { "type": "text",
      "text": "Entrá a Configuración > Seguridad..." }
  ],
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 41,
    "output_tokens": 87
  }
}`}</CodeBlock>
        </RevealItem>
        <RevealStack className="space-y-3">
          {[
            ["content", "Lo que respondió. Puede traer texto, pedidos de herramientas y más."],
            ["stop_reason", "Por qué paró: terminó, se quedó sin tokens, quiere usar una tool, se negó."],
            ["usage", "Cuántos tokens entraron y salieron. Eso es lo que pagás."],
          ].map(([k, v]) => (
            <RevealItem key={k}>
              <div>
                <div className="font-mono text-lg text-ember">{k}</div>
                <div className="text-lg leading-snug text-muted-foreground">{v}</div>
              </div>
            </RevealItem>
          ))}
        </RevealStack>
      </div>
    </ContentSlide>
  </Shell>
);

const PROVIDER_NAMES = [
  ["Instrucciones de sistema", "system", "instructions", "system_instruction"],
  ["La conversación", "messages", "input", "contents"],
  ["Rol del modelo", "assistant", "assistant", "model"],
  ["Tope de salida", "max_tokens", "max_output_tokens", "max_output_tokens"],
  ["El modelo pide una tool", "tool_use", "function_call", "function_call"],
  ["Tokens consumidos", "usage", "usage", "usage_metadata"],
] as const;

const ProviderNames = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Distintos nombres, la misma idea</SlideTitle>
      </RevealItem>
      <RevealItem>
        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="grid grid-cols-[1.3fr_1fr_1.1fr_1.1fr] gap-4 bg-surface px-6 py-3 font-mono text-sm uppercase tracking-widest text-muted-foreground">
            <div>Concepto</div>
            <div>Anthropic</div>
            <div>OpenAI</div>
            <div>Google Gemini</div>
          </div>
          {PROVIDER_NAMES.map(([concept, a, o, g]) => (
            <div
              key={concept}
              className="grid grid-cols-[1.3fr_1fr_1.1fr_1.1fr] gap-4 border-t border-border px-6 py-3 text-lg"
            >
              <div className="font-display font-bold">{concept}</div>
              <div className="min-w-0 break-words font-mono text-base">{a}</div>
              <div className="min-w-0 break-words font-mono text-base">{o}</div>
              <div className="min-w-0 break-words font-mono text-base">{g}</div>
            </div>
          ))}
        </div>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          Si entendés uno, entendés todos: instrucciones, conversación, herramientas y tokens. Lo
          que cambia es cómo se llama cada campo.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const STATELESS_STEPS = [
  ["Llamada 1", "messages: [ user: “Hola, mi nombre es Alejandro.” ] → “¡Hola Alejandro!”", "ok"],
  ["Llamada 2 (nueva)", "messages: [ user: “¿Cuál es mi nombre?” ] → “No puedo saberlo”… o inventa uno.", "no sabe"],
  ["Llamada 2 (con historial)", "messages: [ user: “…mi nombre es Alejandro.”, assistant: “¡Hola Alejandro!”, user: “¿Cuál es mi nombre?” ] → “Alejandro”", "historial"],
] as const;

const Stateless = ({ step = 0 }: { step?: number }) => (
  <Shell>
    <ContentSlide loose>
      <SlideTitle>Demo: la API no recuerda</SlideTitle>
      <StepReveal step={step} rows={STATELESS_STEPS} highlightLast />
    </ContentSlide>
  </Shell>
);

const HISTORY_TURNS = [1, 3, 5, 7, 9] as const;

const HistoryGrows = ({ step = 0 }: { step?: number }) => {
  const reduce = useReducedMotion();
  return (
    <Shell>
      <ContentSlide>
        <SlideTitle>El historial lo cargás vos (y lo pagás)</SlideTitle>
        <div className="space-y-3">
          {HISTORY_TURNS.map((count, i) => {
            if (step < i + 1) return null;
            return (
              <motion.div
                key={count}
                initial={reduce ? false : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: reduce ? 0.01 : 0.35, ease: EASE_OUT }}
                className="flex items-center gap-5"
              >
                <div className="w-28 font-mono text-lg text-muted-foreground">Turno {i + 1}</div>
                <div className="flex gap-1.5">
                  {Array.from({ length: count }).map((_, j) => (
                    <div
                      key={j}
                      className={[
                        "h-8 w-12 rounded-md border",
                        j === count - 1
                          ? "border-ember bg-ember/40"
                          : j % 2 === 0
                            ? "border-border bg-surface"
                            : "border-border bg-surface/50",
                      ].join(" ")}
                    />
                  ))}
                </div>
                <div className="font-mono text-base text-muted-foreground">{count} mensajes</div>
              </motion.div>
            );
          })}
        </div>
        {step >= HISTORY_TURNS.length && (
          <SlideLead>
            Cada turno manda todo lo anterior. Las conversaciones largas cuestan cada vez más: por
            eso los harnesses resumen, recortan o cachean.
          </SlideLead>
        )}
      </ContentSlide>
    </Shell>
  );
};

const PRICES = [
  ["Haiku 5.5", "rápido y barato", "$0.10", "$0.50", "$4.50"],
  ["Sonnet 5.5", "equilibrio", "$2", "$10", "$90"],
  ["Opus 5.5", "el más potente de la tabla", "$4", "$20", "$180"],
] as const;

const Cost = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Cuánto cuesta</SlideTitle>
      </RevealItem>
      <RevealItem>
        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="grid grid-cols-[1.2fr_1.6fr_1fr_1fr_1.3fr] bg-surface px-6 py-3 font-mono text-sm uppercase tracking-widest text-muted-foreground">
            <div>Modelo</div>
            <div />
            <div>Entrada</div>
            <div>Salida</div>
            <div className="text-ember">Ejemplo / mes</div>
          </div>
          {PRICES.map(([m, d, i, o, ex]) => (
            <div
              key={m}
              className="grid grid-cols-[1.2fr_1.6fr_1fr_1fr_1.3fr] border-t border-border px-6 py-4 text-lg"
            >
              <div className="font-display font-bold">{m}</div>
              <div className="text-muted-foreground">{d}</div>
              <div className="font-mono">{i}</div>
              <div className="font-mono">{o}</div>
              <div className="font-mono text-ember">{ex}</div>
            </div>
          ))}
        </div>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          USD por millón de tokens. Ejemplo: 10.000 llamadas al mes de 2.000 tokens de entrada y 500
          de salida. La salida cuesta 5 veces más que la entrada.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Params = () => (
  <CardsSlide
    title="Perillas que el chat no te muestra"
    lead="Cada proveedor y cada modelo tiene las suyas. Se leen en la documentación del modelo que usás."
    cols={3}
    cards={[
      ["model", "La decisión más grande: calidad, velocidad y precio en una sola línea."],
      ["max_tokens", "Tope de salida. Si se corta, stop_reason lo dice."],
      [
        "temperature",
        "Cuánta variación al elegir el próximo token. Existe en muchos modelos; en los Claude más nuevos ya no se acepta.",
      ],
      ["effort / reasoning", "Cuánto “piensa” antes de responder. Más esfuerzo, más calidad, más tokens."],
      ["stop_sequences", "Texto que, si aparece, corta la respuesta."],
      ["system", "Sí: también es un parámetro. El más importante de todos."],
    ]}
  />
);

const ApiTools = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Tools por API: el ida y vuelta</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem>
          <CodeBlock label="1 · el modelo pide" nowrap>{`"stop_reason": "tool_use",
"content": [{
  "type": "tool_use",
  "id": "toolu_01",
  "name": "buscar_pedido",
  "input": { "numero": "A-123" }
}]`}</CodeBlock>
        </RevealItem>
        <RevealItem>
          <CodeBlock label="2 · vos ejecutás y devolvés" tone="good" nowrap>{`{ "role": "user",
  "content": [{
    "type": "tool_result",
    "tool_use_id": "toolu_01",
    "content": "En camino, llega el jueves"
  }]
}`}</CodeBlock>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          Entre el paso 1 y el 2 está tu código: consultar la base, validar permisos, pedir
          aprobación. El modelo nunca toca tu sistema directamente.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const AgentIsLoop = () => (
  <Statement sub="Mientras el modelo pida herramientas, el loop sigue. Cuando responde texto, termina. Eso es un agente.">
    Un agente es un loop: llamar, ejecutar, devolver, repetir.
  </Statement>
);

const StructuredOutput = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Salida estructurada: hablarle a otros sistemas</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
        <RevealItem>
          <CodeBlock label="entrada: un mail">{`Hola, soy Marta Gómez de Ferretería Sur.
Necesito 40 cajas de tornillos 8mm para
el viernes. Es urgente, el anterior pedido
llegó incompleto.`}</CodeBlock>
        </RevealItem>
        <RevealItem>
          <Arrow />
        </RevealItem>
        <RevealItem>
          <CodeBlock label="salida: JSON con schema" tone="good">{`{
  "cliente": "Ferretería Sur",
  "producto": "tornillos 8mm",
  "cantidad": 40,
  "fecha_limite": "viernes",
  "urgente": true,
  "reclamo_previo": true
}`}</CodeBlock>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          Le pasás un schema y la API garantiza el formato. Eso va directo a una planilla, un CRM o
          un ticket, sin que nadie copie y pegue.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const HarnessChecklist = () => (
  <Shell>
    <ContentSlide loose>
      <RevealItem>
        <SlideTitle>Lo que el chat resolvía por vos</SlideTitle>
      </RevealItem>
      <CardGrid
        cols={4}
        items={[
          ["Instrucciones", "Escribir y versionar el system prompt."],
          ["Historial", "Guardarlo, recortarlo o resumirlo."],
          ["Herramientas", "Definirlas, ejecutarlas, controlar permisos."],
          ["Errores", "Reintentos, límites de uso, caídas del proveedor."],
          ["Costos", "Medir tokens, elegir modelo, cachear."],
          ["Seguridad", "La key, los datos sensibles, lo que entra al prompt."],
          ["Registros", "Guardar qué se mandó y qué volvió."],
          ["Calidad", "Probar con casos reales antes de cambiar algo."],
        ]}
        render={(item) => {
          const [t, b] = item as [string, string];
          return <TitledCard title={t}>{b}</TitledCard>;
        }}
      />
    </ContentSlide>
  </Shell>
);

const ApiKey = () => (
  <CardsSlide
    title="La API key es plata"
    cols={4}
    cards={[
      ["Nunca en el frontend", "Todo lo que corre en el navegador se puede leer."],
      ["Nunca en git", "Variables de entorno o un gestor de secretos."],
      ["Límites de gasto", "Configurarlos en la consola del proveedor antes de probar."],
      ["Una por proyecto", "Si se filtra, revocás una sola."],
    ]}
  />
);

const WhenApi = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>¿Chat o API?</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-8">
        <RevealItem>
          <DeckCard className="h-full p-8">
            <div className="mb-4 font-display text-2xl font-bold">Chat</div>
            <ul className="space-y-2 text-lg leading-snug text-muted-foreground">
              <li>Una persona, una tarea, ida y vuelta</li>
              <li>Explorar, pensar, redactar</li>
              <li>Volumen bajo, criterio humano en cada paso</li>
            </ul>
          </DeckCard>
        </RevealItem>
        <RevealItem>
          <DeckCard accent className="h-full p-8">
            <div className="mb-4 font-display text-2xl font-bold text-ember">API</div>
            <ul className="space-y-2 text-lg leading-snug">
              <li>La misma tarea, cientos de veces</li>
              <li>Integrada a un sistema que ya existe</li>
              <li>Sin una persona mirando cada respuesta</li>
            </ul>
          </DeckCard>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          Sin programar: n8n, Make o Zapier llaman a la API por vos. Los mismos conceptos aplican.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

/* ───────────────────────── 04 · Prompting ───────────────────────── */

const S4Intro = () => (
  <SectionIntro
    num="04"
    title="Prompts que funcionan"
    lead="Ahora que sabés qué lee el modelo: cómo escribir tu parte."
  />
);

const GoodBrief = () => (
  <Statement sub="Si un colega nuevo no podría hacer la tarea con tu mensaje, el modelo tampoco.">
    Un buen prompt es un buen brief.
  </Statement>
);

const PromptAnatomy = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Antes y después</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-[1fr_1.5fr] gap-6">
        <RevealItem>
          <CodeBlock label="vago" tone="bad">{`Escribime un mail para un
cliente que está enojado.`}</CodeBlock>
        </RevealItem>
        <RevealItem>
          <CodeBlock label="brief" tone="good">{`Contexto: soy responsable de cuentas en una
agencia. El cliente (retail, 3 años con nosotros)
recibió la campaña 4 días tarde.

Tarea: mail de respuesta.

Criterios: reconocer el error sin excusas,
explicar qué cambiamos, ofrecer 1 acción concreta.
Tono cercano, nada corporativo.

Formato: menos de 150 palabras, asunto incluido.`}</CodeBlock>
        </RevealItem>
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const Techniques = () => (
  <CardsSlide
    title="Técnicas que sí funcionan"
    cols={3}
    cards={[
      ["Explicá el porqué", "“Respondé breve porque se lee en el celular” funciona mejor que “respondé breve”."],
      ["Separá las partes", "Etiquetas tipo <contexto>, <documento>, <tarea> para que no se mezclen."],
      ["Pedí el formato", "Largo, estructura, idioma, tabla o JSON. No lo dejes a la suerte."],
      ["Decí qué hacer", "Mejor “usá párrafos cortos” que “no uses listas”."],
      ["Dejalo pensar", "En tareas difíciles: pedí que razone antes, o usá un modelo con razonamiento."],
      ["Dividí la tarea", "Varios prompts encadenados le ganan a uno gigante que hace todo."],
    ]}
  />
);

const FewShot = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Zero-shot vs few-shot</SlideTitle>
      </RevealItem>
      <RevealStack className="grid grid-cols-[1fr_1.4fr] gap-6">
        <RevealItem>
          <CodeBlock label="zero-shot · sin ejemplos">{`Clasificá este reclamo:
"Me cobraron dos veces."`}</CodeBlock>
        </RevealItem>
        <RevealItem>
          <CodeBlock label="few-shot · con ejemplos" tone="good">{`Clasificá reclamos en FACTURACIÓN,
ENVÍO o PRODUCTO. Respondé solo la categoría.

"El paquete nunca llegó" → ENVÍO
"Vino roto el vidrio" → PRODUCTO
"La factura dice otro CUIT" → FACTURACIÓN

"Me cobraron dos veces." →`}</CodeBlock>
        </RevealItem>
      </RevealStack>
      <RevealItem>
        <SlideLead>
          Los ejemplos enseñan lo que cuesta explicar: el formato, el criterio, el tono. Es la técnica
          más barata para mejorar un resultado.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const FewShotCare = () => (
  <CardsSlide
    title="Few-shot: cuidados"
    cols={3}
    cards={[
      ["Copia todo", "Formato, largo, tono… y también los errores y sesgos de tus ejemplos."],
      ["Variedad", "Ejemplos distintos entre sí, incluidos los casos difíciles. Si todos se parecen, sobreajusta."],
      ["Pocos y buenos", "3 a 5 bien elegidos suelen alcanzar. Más ejemplos = más tokens en cada llamada."],
    ]}
  />
);

const Disciplines = () => (
  <CardsSlide
    title="Mismo método, distintas disciplinas"
    lead="Lo que cambia es qué significa “bien hecho”."
    cols={4}
    cards={[
      ["Legal", "Citar la fuente, marcar incertidumbre, nunca inventar normativa."],
      ["Marketing", "Voz de marca, público, canal, largo exacto. Ejemplos de piezas aprobadas."],
      ["Datos y finanzas", "Mostrar el cálculo, formato numérico, qué hacer si falta un dato."],
      ["Desarrollo", "Stack, convenciones del repo, tests, qué no tocar."],
    ]}
  />
);

const Iterate = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Iterar como ingeniero</SlideTitle>
      </RevealItem>
      <NumberedList
        items={[
          ["Juntá casos reales", "10 o 20 entradas que representen lo que va a pasar de verdad, incluidas las raras."],
          ["Definí qué es “bien”", "Antes de probar, no después de ver la respuesta."],
          ["Cambiá una cosa por vez", "Si cambiás tres, no sabés cuál mejoró."],
          ["Guardá las versiones", "El prompt es código: se versiona, se compara, se vuelve atrás."],
        ]}
      />
    </ContentSlide>
  </Shell>
);

/* ───────────────────────── 05 · Práctica ───────────────────────── */

const S5Intro = () => (
  <SectionIntro
    num="05"
    title="Práctica"
    lead="Tu propio system prompt, probado en Google AI Studio."
  />
);

const Exercise = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>La consigna</SlideTitle>
      </RevealItem>
      <NumberedList
        items={[
          ["Abrí Google AI Studio", "aistudio.google.com, con tu cuenta de Google. Chat nuevo."],
          ["Elegí una tarea", "Algo que hacés seguido en tu trabajo: responder, clasificar, resumir, redactar."],
          ["Escribí el system prompt", "En “System instructions”, con la plantilla: contexto, tarea, criterios, formato."],
          ["Sumá 3 ejemplos y probalo", "Few-shot con casos reales, uno difícil. Después 5 entradas nuevas: anotá dónde falla."],
          ["Corregí una cosa y repetí", "Compará antes y después."],
        ]}
      />
    </ContentSlide>
  </Shell>
);

const Template = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Plantilla</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="system prompt">{`<contexto>
Quién sos, para quién trabajás, quién va a leer la respuesta.
</contexto>

<tarea>
Qué tenés que hacer con cada mensaje que llegue.
</tarea>

<criterios>
Qué hace que una respuesta esté bien. Qué hacer si falta información.
</criterios>

<formato>
Largo, estructura, tono, idioma.
</formato>

<ejemplos>
Entrada → salida esperada (3 casos, uno difícil).
</ejemplos>`}</CodeBlock>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const TechTrack = () => (
  <CardsSlide
    title="Si ya programás"
    lead="El mismo ejercicio, por API."
    cols={3}
    cards={[
      ["Un chat en 30 líneas", "Script que mantiene el historial y lo reenvía en cada turno. Imprimí usage en cada llamada."],
      ["Salida estructurada", "Que la respuesta sea un JSON con schema y validalo en tu código."],
      ["Una tool", "Definí una función simple (fecha, cálculo, búsqueda) y armá el loop tool_use → tool_result."],
    ]}
  />
);

/* ───────────────────────── Cierre ───────────────────────── */

const Takeaways = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Para llevarse</SlideTitle>
      </RevealItem>
      <NumberedList
        items={[
          ["Todo es texto en una ventana", "System, rules, skills, tools, memoria, historial y tu mensaje."],
          ["El modelo pide, el harness hace", "Herramientas, permisos y memoria viven afuera del modelo."],
          ["En la API, el harness sos vos", "Historial, instrucciones, tools, costos y seguridad."],
          ["La mesa ordenada", "Ni vacía ni repleta: el contexto justo para la tarea."],
          ["Tu proceso, escrito, se delega", "Y mejora cada vez que lo re-ajustás."],
        ]}
      />
    </ContentSlide>
  </Shell>
);

const NextClass = () => (
  <Statement sub="RAG, fine-tuning y cuándo conviene cada uno. Traé el skill que armaste hoy.">
    Próxima: cuando el prompt no alcanza.
  </Statement>
);

/* ───────────────────────── 04 · Del prompt al sistema ───────────────────────── */

const S5SystemIntro = () => (
  <SectionIntro
    num="05"
    title="Del prompt al sistema"
    lead="Lo que sabés hacer, escrito una vez, para delegarlo cada vez más."
  />
);

const PROCESS_LOOP = [
  ["Tu proceso", "Cómo lo pensás hoy, en tu cabeza: pasos, criterios, excepciones."],
  ["Escrito", "Lo racionalizás en un documento: un skill, una rule, un instructivo."],
  ["Delegado", "La IA lo ejecuta con ese documento como contexto."],
  ["Re-ajustado", "Cada vez que falla o encontrás algo nuevo, lo sumás al documento."],
] as const;

const ProcessToSkill = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Tu forma de pensar, convertida en skill</SlideTitle>
      </RevealItem>
      <RevealStack className="flex flex-wrap items-stretch justify-center gap-3">
        {PROCESS_LOOP.map(([title, sub], i) => (
          <RevealItem key={title} className="flex items-center gap-3">
            <div
              className={[
                "w-[300px] rounded-xl border px-5 py-5",
                i === 3 ? "border-2 border-ember bg-ember/10" : "border-border bg-surface/80",
              ].join(" ")}
            >
              <div className="font-mono text-sm text-ember">{i + 1}</div>
              <div className="mt-1 font-display text-2xl font-bold leading-tight">{title}</div>
              <div className="mt-2 text-base leading-snug text-muted-foreground">{sub}</div>
            </div>
            {i < PROCESS_LOOP.length - 1 && <Arrow />}
          </RevealItem>
        ))}
      </RevealStack>
      <RevealItem>
        <SlideLead>
          El paso 4 vuelve al 2. Cada vuelta, el documento sabe un poco más y vos delegás un poco
          más. Eso es apalancarse.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const CONTEXT_LADDER = [
  ["Prompt suelto", "Lo explicás de cero cada vez.", "hoy"],
  ["Rules / instrucciones fijas", "Lo que siempre aplica, cargado siempre.", "siempre"],
  ["Skills", "Procesos reutilizables que se cargan cuando hacen falta.", "a demanda"],
  ["memory.md", "Estado, decisiones y aprendizajes que se arrastran entre sesiones.", "bitácora"],
  ["Casos de éxito", "Ejemplos reales de trabajos bien hechos, en archivos.", "few-shot"],
  ["Todo en contexto (CAG)", "Si el material es chico, se carga entero y se cachea.", "chico"],
  ["RAG", "Si es grande: se busca y se trae solo lo relevante, por similitud de significado.", "grande"],
  ["Grafo y memoria persistente", "Relaciones entre cosas (Neo4j) y memoria de cómo trabajás (Engram).", "estructura"],
] as const;

const ContextLadder = ({ step = 0 }: { step?: number }) => (
  <Shell>
    <ContentSlide loose>
      <SlideTitle>Escalera de contexto</SlideTitle>
      <StepReveal step={step} rows={CONTEXT_LADDER} />
    </ContentSlide>
  </Shell>
);

const RagTeaser = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>RAG en un minuto</SlideTitle>
      </RevealItem>
      <RevealItem>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <FlowBox title="Tus documentos" sub="PDFs, wiki, mails, casos" />
          <Arrow />
          <FlowBox title="Se indexan" sub="por significado, no por palabra" />
          <Arrow />
          <FlowBox title="Pregunta" sub="se buscan los pedazos relevantes" accent />
          <Arrow />
          <FlowBox title="Respuesta" sub="con la fuente citada" />
        </div>
      </RevealItem>
      <RevealItem>
        <SlideLead>
          Es el “contexto justo” automatizado: en vez de pegar todo, se trae solo lo que sirve para
          esta pregunta. A fondo, la próxima clase.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const AgentDemo = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <div className="font-mono text-sm uppercase tracking-widest text-ember">Demo</div>
      </RevealItem>
      <RevealItem>
        <h2 className="font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[1.02] text-balance">
          “Buscame un monitor portátil en Mercado Libre.”
        </h2>
      </RevealItem>
      <RevealItem>
        <SlideLead className="max-w-[1300px]">
          Un agente que navega como vos. Si lo hacés seguido, los pasos y tus criterios (precio,
          envío, reputación) se escriben una vez en un skill.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const SkillExercise = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Tu primer skill</SlideTitle>
      </RevealItem>
      <NumberedList
        items={[
          ["Elegí un proceso tuyo", "Algo que hacés seguido y sabés hacer bien: responder, revisar, armar, clasificar."],
          ["Escribí cómo lo pensás", "Pasos, criterios de “bien hecho”, qué hacés cuando falta información."],
          ["Sumá 2 o 3 casos de éxito", "Trabajos reales bien resueltos, como ejemplos."],
          ["Probalo en tu asistente", "Proyecto (ChatGPT, Claude), Gem (Gemini) o pegado al inicio de un chat nuevo. Corré 3 casos nuevos y anotá dónde falla."],
          ["Re-ajustá", "Sumá lo que faltó al documento y volvé a probar. Esa es la vuelta que se repite siempre."],
        ]}
      />
    </ContentSlide>
  </Shell>
);

const SkillTemplate = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Plantilla de skill</SlideTitle>
      </RevealItem>
      <RevealItem>
        <CodeBlock label="SKILL.md">{`---
name: responder-reclamos
description: Usar cuando llega un reclamo de cliente por mail
             y hay que redactar la respuesta.
---

## Contexto
Quién soy, para quién trabajo, quién lee la respuesta.

## Pasos
1. ...  2. ...  3. ...

## Criterios de "bien hecho"
- ...
- Si falta información: preguntar antes de inventar.

## Casos de éxito
Entrada → respuesta que salió bien (2 o 3).`}</CodeBlock>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const SkillTechTrack = () => (
  <CardsSlide
    title="Si ya programás"
    lead="El mismo skill, más lejos."
    cols={3}
    cards={[
      ["Skill de verdad", "Guardalo como SKILL.md en Claude Code o Cursor y probá que la descripción lo dispare sola."],
      ["Por API", "Usalo como system prompt en un script que procese una carpeta de casos y devuelva JSON."],
      ["Con un agente", "Combinalo con navegación (Playwright o Claude in Chrome) para un trámite web repetido."],
    ]}
  />
);

const from30 = (id: string, overrides: Partial<SlideDefBase>): SlideDefBase => {
  const slide = slides30.find((s) => s.id === id);
  if (!slide) throw new Error(`Missing slide in deck-30: ${id}`);
  return { ...slide, ...overrides };
};

const allSlides: SlideDefBase[] = [
  {
    id: "pa1-cover",
    title: "Portada",
    Component: Cover,
    notes: "Portada. Presentarse brevemente antes de la ronda.",
  },
  {
    id: "pa1-hook",
    title: "Lo que el modelo lee",
    Component: Hook,
    notes: "Abrir con la promesa: hoy se ve lo que hay detrás del chat. Sin tecnicismos todavía.",
  },
  {
    id: "pa1-intros",
    title: "Ronda de presentación",
    Component: Intros,
    notes:
      "Ronda corta. Anotar herramientas y tareas que nombran: sirven de ejemplos durante toda la clase y para la práctica.",
  },
  {
    id: "pa1-poll",
    title: "Mano alzada",
    Component: Poll,
    notes:
      "Calibra la profundidad. Si casi nadie usó MCP o API, ir más lento en 02 y 03. Si varios llamaron a una API, apoyarse en ellos para la demo.",
  },
  {
    id: "pa1-roadmap",
    title: "Dos clases",
    Component: Roadmap,
    notes: "Encuadre: hoy contexto y API; la próxima, técnicas para mejorar resultados (RAG, fine-tuning).",
  },
  {
    id: "pa1-s1",
    title: "01 · Cómo funciona un LLM",
    Component: S1Intro,
    notes: "Avisar que es repaso pero más a fondo. Los que ya lo saben pueden ayudar con ejemplos.",
  },
  {
    id: "pa1-next-token",
    title: "Próximo token",
    Component: NextToken,
    notes: "Idea fuerza de toda la clase. Todo lo demás es ingeniería alrededor de esto.",
  },
  {
    id: "pa1-autocomplete",
    title: "Autocompletado",
    Component: Autocomplete,
    notes:
      "Elige con probabilidades, no busca en una base. De ahí salen las alucinaciones. DEMO opcional: `ollama run qwen2.5-coder:1.5b-base` y escribir 'Me llamo Ale.' → un modelo base no conversa, continúa el texto (inventa una biografía). Es el modelo antes de entrenarlo para chatear. Cargarlo antes de clase: la primera vez tarda.",
  },
  {
    id: "pa1-tokens",
    title: "Tokens",
    Component: Tokens,
    notes:
      "Demo opcional: tokenizer online de OpenAI con una frase en inglés y la misma en español. Comparar cantidad.",
  },
  {
    id: "pa1-window",
    title: "Ventana de contexto",
    Component: ContextWindow,
    notes: "Analogía posible: escritorio de trabajo, no archivo. Lo que no está arriba del escritorio no se usa.",
  },
  {
    id: "pa1-roles",
    title: "Roles",
    Component: Roles,
    notes: "System = reglas, user = pedido, assistant = respuestas previas. Ese formato es lo que viaja siempre.",
  },
  {
    id: "pa1-rereads",
    title: "Relee todo",
    Component: Rereads,
    notes: "Plantar la idea; se demuestra en vivo en el bloque de API.",
  },
  {
    id: "pa1-s2",
    title: "02 · Anatomía del prompt",
    Component: S2Intro,
    notes: "Acá entra el repaso de rules, skills y MCP, pero visto desde lo que le llega al modelo.",
  },
  {
    id: "pa1-harness-def",
    title: "Modelo y harness",
    Component: ModelVsHarness,
    notes:
      "Concepto que articula toda la clase. Analogía posible: motor vs auto. El motor solo no te lleva a ningún lado; el auto (volante, frenos, tablero) es el harness.",
  },
  {
    id: "pa1-same-model",
    title: "Mismo modelo, distinto harness",
    Component: SameModelDifferentHarness,
    notes:
      "Por eso el mismo modelo rinde distinto en ChatGPT, en Cursor o por API. Preguntar a la sala qué harnesses usan sin saberlo.",
  },
  {
    id: "pa1-write-vs-read",
    title: "Escribís vs lee",
    Component: WriteVsRead,
    notes: "Contraste visual. Tu mensaje es una línea; lo demás puede ser decenas de miles de tokens.",
  },
  {
    id: "pa1-stack",
    title: "El prompt real",
    Component: PromptStack,
    steps: PROMPT_LAYERS.length,
    notes:
      "Capa por capa. Para cada una: quién la escribe y cuándo entra. Las siguientes slides profundizan system, rules, skills, tools y memoria.",
  },
  {
    id: "pa1-system",
    title: "System prompt",
    Component: SystemPrompt,
    notes:
      "Ejemplo inventado, no de un producto real. Señalar fecha, límites y regla de herramientas. Hasta un modelo local trae uno: `ollama show qwen2.5:1.5b --system` → 'You are Qwen, created by Alibaba Cloud…'.",
  },
  {
    id: "pa1-real-system",
    title: "System prompts reales",
    Component: RealSystemPrompts,
    notes:
      "Abrir en vivo la página de system prompts de Claude en docs de Anthropic (release notes). Recorrer secciones, no leer entero. Mostrar cuánto es formato y casos borde.",
  },
  {
    id: "pa1-rules",
    title: "Instrucciones y rules",
    Component: Rules,
    notes: "Conectar con lo que vieron antes. Lo nuevo: siempre ocupan contexto y pueden chocar con el producto.",
  },
  {
    id: "pa1-skills",
    title: "Skills",
    Component: Skills,
    steps: SKILL_LEVELS.length,
    notes: "Carga progresiva. La descripción decide si se activa: escribirla es prompting.",
  },
  {
    id: "pa1-tool-def",
    title: "Definición de tool",
    Component: ToolDefinition,
    notes:
      "El modelo ve un JSON con nombre, descripción y parámetros. MCP = estandarizar cómo llegan estas definiciones. Prueba en vivo: paso 0 del script class-scripts/demo-api-sin-memoria.sh muestra la plantilla de Ollama, donde las tools se pegan como texto dentro del system.",
  },
  {
    id: "pa1-tool-loop",
    title: "El modelo no ejecuta",
    Component: ToolLoop,
    notes: "Pide vs hace. Clave para entender permisos y seguridad de agentes.",
  },
  {
    id: "pa1-mcp-cost",
    title: "Costo de MCP",
    Component: McpCost,
    notes: "Si alguien tiene un cliente con /context o similar, mostrar cuánto ocupan las tools antes de escribir.",
  },
  {
    id: "pa1-memory",
    title: "Memoria",
    Component: Memory,
    notes: "Desmitificar: no aprende de vos. Mostrar la pantalla de memoria de ChatGPT o Claude si hay tiempo.",
  },
  {
    id: "pa1-guardrails",
    title: "Guardrails",
    Component: Guardrails,
    steps: GUARDRAIL_LAYERS.length,
    notes:
      "Responde la pregunta típica. La capa 1 se demuestra en el bloque API: sin system prompt, igual se niega.",
  },
  {
    id: "pa1-more-context",
    title: "Más contexto no es mejor",
    Component: MoreIsNotBetter,
    notes: "Cierre del bloque 02: elegir qué entra es la habilidad, no meter todo.",
  },
  {
    id: "pa1-break",
    title: "Corte",
    Component: Break,
    notes: "Corte. Durante el corte, dejar abierto el playground para la demo.",
  },
  {
    id: "pa1-s3",
    title: "03 · APIs",
    Component: S3Intro,
    notes: "Puente: todo lo del bloque 02 lo hacía el producto. Ahora no hay producto.",
  },
  {
    id: "pa1-harness",
    title: "El harness sos vos",
    Component: YouAreTheHarness,
    notes: "Idea central del bloque. Volver a esta frase en cada slide siguiente.",
  },
  {
    id: "pa1-what-api",
    title: "Qué es una API",
    Component: WhatIsApi,
    notes: "Para los que están en cero. Programa habla con programa. Los técnicos pueden saltarlo rápido.",
  },
  {
    id: "pa1-chat-vs-api",
    title: "Asistente vs API",
    Component: ChatVsApi,
    notes: "La tabla que pidieron: diferencias con los asistentes comunes. Fila por fila.",
  },
  {
    id: "pa1-request",
    title: "Pedido",
    Component: RequestAnatomy,
    notes:
      "El ejemplo es de Claude, pero la demo es local con Ollama (gratis, misma forma: model + messages con roles). Las suscripciones de ChatGPT o Claude Pro no incluyen API; se paga aparte. La slide siguiente muestra que todos son iguales en forma.",
  },
  {
    id: "pa1-response",
    title: "Respuesta",
    Component: ResponseAnatomy,
    notes: "Versión simplificada. Apuntar a usage: eso es la factura.",
  },
  {
    id: "pa1-provider-names",
    title: "Distintos nombres",
    Component: ProviderNames,
    notes:
      "El ejemplo fue con Claude, pero la forma es la misma en todos. Nombres según SDKs a oct 2026: OpenAI muestra la Responses API; la vieja Chat Completions usa messages y rol system/developer. No memorizar: reconocer los conceptos.",
  },
  {
    id: "pa1-stateless",
    title: "Demo: no recuerda",
    Component: Stateless,
    steps: STATELESS_STEPS.length,
    notes:
      "DEMO: bash class-scripts/demo-api-sin-memoria.sh (Ollama + qwen2.5:1.5b). Paso 0: system y plantilla que agrega el runtime. Paso 1: sin historial, se niega o inventa (salió 'Elon Musk': la mesa vacía). Paso 2: con historial responde 'Alejandro' y los tokens de entrada suben. Si algo falla, la slide tiene el mismo resultado.",
  },
  {
    id: "pa1-history",
    title: "El historial crece",
    Component: HistoryGrows,
    steps: HISTORY_TURNS.length,
    notes: "Cada turno reenvía todo. Por eso existen resumen, recorte y caché de prompts.",
  },
  {
    id: "pa1-cost",
    title: "Costo",
    Component: Cost,
    notes:
      "Precios de lista de la API de Claude a oct 2026, verificar antes de dar clase. Cuenta: 2.000 in + 500 out por llamada × 10.000. El modelo más chico alcanza para muchas tareas.",
  },
  {
    id: "pa1-params",
    title: "Parámetros",
    Component: Params,
    notes:
      "Temperature es el ejemplo clásico, pero cambia por modelo: en los Claude más nuevos se controla con effort. Lección: leer la doc del modelo.",
  },
  {
    id: "pa1-api-tools",
    title: "Tools por API",
    Component: ApiTools,
    notes: "Mismo loop que en el bloque 02, pero ahora el harness es tu código.",
  },
  {
    id: "pa1-agent-loop",
    title: "Agente = loop",
    Component: AgentIsLoop,
    notes: "Desmitificar agentes. Cursor, Claude Code o Copilot son este loop con muy buenas tools y contexto.",
  },
  {
    id: "pa1-structured",
    title: "Salida estructurada",
    Component: StructuredOutput,
    notes: "El caso de integración más útil para no técnicos: de texto libre a datos. Conectar con n8n o Make.",
  },
  {
    id: "pa1-checklist",
    title: "Lo que resolvía el chat",
    Component: HarnessChecklist,
    notes: "Inventario de lo que hay que construir. No asustar: no todo hace falta el primer día.",
  },
  {
    id: "pa1-api-key",
    title: "API key",
    Component: ApiKey,
    notes: "Breve pero firme. Límite de gasto antes de la práctica.",
  },
  {
    id: "pa1-when-api",
    title: "Chat o API",
    Component: WhenApi,
    notes: "Criterio, no regla. Preguntar a la sala qué tarea suya pasaría a API.",
  },
  {
    id: "pa1-s4",
    title: "04 · Prompts que funcionan",
    Component: S4Intro,
    notes: "Ingeniería de prompts aplicada, con lo que ya saben de cómo se arma el contexto.",
  },
  {
    id: "pa1-brief",
    title: "Prompt = brief",
    Component: GoodBrief,
    notes: "Test del colega nuevo.",
  },
  {
    id: "pa1-before-after",
    title: "Antes y después",
    Component: PromptAnatomy,
    notes: "Probar ambos en vivo si hay tiempo. Señalar las piezas: contexto, tarea, criterios, formato.",
  },
  {
    id: "pa1-techniques",
    title: "Técnicas",
    Component: Techniques,
    notes: "Seis técnicas con respaldo en las guías de prompting de los proveedores. Sin frases mágicas.",
  },
  {
    id: "pa1-few-shot",
    title: "Few-shot",
    Component: FewShot,
    notes: "Correr el zero-shot y el few-shot en vivo: el zero-shot suele responder con explicación, el few-shot solo con la categoría.",
  },
  {
    id: "pa1-few-shot-care",
    title: "Few-shot: cuidados",
    Component: FewShotCare,
    notes: "Los ejemplos son lo que más pesa del prompt. Elegirlos con cuidado.",
  },
  {
    id: "pa1-disciplines",
    title: "Disciplinas",
    Component: Disciplines,
    notes: "Usar las profesiones de la ronda inicial. Preguntar qué es “bien hecho” en su área.",
  },
  {
    id: "pa1-iterate",
    title: "Iterar",
    Component: Iterate,
    notes: "Puente a la clase 2: evaluar si una técnica mejoró de verdad.",
  },
  {
    id: "pa1-s5",
    title: "05 · Práctica",
    Component: S5Intro,
    notes: "Formar parejas mezclando técnicos y no técnicos si el grupo lo permite.",
  },
  {
    id: "pa1-exercise",
    title: "Consigna",
    Component: Exercise,
    notes:
      "Google AI Studio: gratis con cuenta de Google, tiene System instructions y parámetros. Verificar acceso antes de clase. Recorrer mesas; al final 2 o 3 personas muestran antes y después.",
  },
  {
    id: "pa1-template",
    title: "Plantilla",
    Component: Template,
    notes: "Dejarla visible durante la práctica.",
  },
  {
    id: "pa1-tech-track",
    title: "Si ya programás",
    Component: TechTrack,
    notes: "Desafíos para los técnicos en paralelo. Pueden mostrar su script al final.",
  },
  {
    id: "pa1-takeaways",
    title: "Para llevarse",
    Component: Takeaways,
    notes: "Cinco ideas. Volver a la frase del harness.",
  },
  {
    id: "pa1-next",
    title: "Próxima clase",
    Component: NextClass,
    notes: "Pedir que traigan la tarea de hoy: en la clase 2 se mejora con RAG y se discute fine-tuning.",
  },
];

const byId = (id: string): SlideDefBase => {
  const slide = allSlides.find((s) => s.id === id);
  if (!slide) throw new Error(`Missing slide: ${id}`);
  return slide;
};

const newSlides: SlideDefBase[] = [
  {
    id: "pa1-s5-system",
    title: "05 · Del prompt al sistema",
    Component: S5SystemIntro,
    notes: "Bloque de valor práctico. Lo que aprendieron del contexto, aplicado a su propio trabajo.",
  },
  {
    id: "pa1-process-skill",
    title: "Proceso → skill",
    Component: ProcessToSkill,
    notes:
      "Mensaje central: si podés racionalizar cómo pensás un proceso, lo podés estandarizar y delegar. El documento se re-ajusta cada vez que aparece algo nuevo. SDD en una línea: antes de delegar, escribí qué querés y validalo.",
  },
  {
    id: "pa1-ladder",
    title: "Escalera de contexto",
    Component: ContextLadder,
    steps: CONTEXT_LADDER.length,
    notes:
      "Del prompt suelto a la memoria persistente. Cada escalón responde a la mesa: cómo darle el contexto justo. SALVATAJE: si no hay tiempo, recorrer solo hasta casos de éxito y decir que CAG, RAG y grafo son la próxima clase.",
  },
  {
    id: "pa1-rag-teaser",
    title: "RAG en un minuto (opcional)",
    Component: RagTeaser,
    notes:
      "OPCIONAL. Demo corta: Charlas IT Patagonia/clase-02-demos/03-demo-b-rag/vivo (ingest.py → wiki.db → retrieve → cita el path). O mencionar codebase-memory-mcp: se usa para repos pero es un RAG/grafo; se le puede ingestar cualquier documento. No profundizar: es la clase 2.",
  },
  {
    id: "pa1-agent-demo",
    title: "Demo agente (opcional)",
    Component: AgentDemo,
    notes:
      "OPCIONAL. Claude in Chrome o Playwright MCP: buscar un monitor portátil en Mercado Libre y comparar 3 opciones. Solo buscar, no comprar ni loguearse. Cerrar con: esto mismo, escrito como skill, queda semiautomático.",
  },
];

const practiceSlides: SlideDefBase[] = [
  {
    id: "pa1-s6",
    title: "06 · Práctica",
    Component: () => (
      <SectionIntro num="06" title="Práctica" lead="Tu primer skill, probado en el asistente que ya usás." />
    ),
    notes: "Formar parejas mezclando técnicos y no técnicos si el grupo lo permite.",
  },
  {
    id: "pa1-skill-exercise",
    title: "Tu primer skill",
    Component: SkillExercise,
    notes:
      "No hace falta API ni cuenta nueva: pegado al inicio de un chat nuevo funciona en cualquier plan gratis. Recorrer mesas; al final 2 o 3 muestran qué tuvieron que re-ajustar.",
  },
  {
    id: "pa1-skill-template",
    title: "Plantilla de skill",
    Component: SkillTemplate,
    notes: "Dejarla visible durante la práctica. La description es lo que dispara el skill: conectar con la slide de carga progresiva.",
  },
  {
    id: "pa1-skill-tech",
    title: "Si ya programás",
    Component: SkillTechTrack,
    notes: "Desafíos en paralelo para los técnicos.",
  },
];

export const slidesPromptsApis01: SlideDefBase[] = [
  // Apertura
  byId("pa1-cover"),
  byId("pa1-hook"),
  byId("pa1-intros"),
  byId("pa1-poll"),
  byId("pa1-roadmap"),
  // 01 · Cómo funciona un LLM
  byId("pa1-s1"),
  byId("pa1-next-token"),
  byId("pa1-autocomplete"),
  byId("pa1-tokens"),
  from30("desk-30", {
    id: "pa1-desk",
    notes:
      "La mesa. Vacía: adivina datos y relaciones. Repleta: se pierde y no atiende lo relevante. Ordenada: el punto justo. Todo el resto de la clase es cómo llegar a la mesa ordenada.",
  }),
  byId("pa1-roles"),
  byId("pa1-rereads"),
  // 02 · Anatomía del prompt
  byId("pa1-s2"),
  byId("pa1-harness-def"),
  byId("pa1-same-model"),
  byId("pa1-write-vs-read"),
  byId("pa1-stack"),
  byId("pa1-system"),
  byId("pa1-real-system"),
  byId("pa1-rules"),
  byId("pa1-skills"),
  byId("pa1-tool-def"),
  byId("pa1-tool-loop"),
  byId("pa1-mcp-cost"),
  byId("pa1-memory"),
  byId("pa1-guardrails"),
  byId("pa1-break"),
  // 03 · APIs
  byId("pa1-s3"),
  byId("pa1-harness"),
  byId("pa1-what-api"),
  byId("pa1-chat-vs-api"),
  byId("pa1-request"),
  byId("pa1-response"),
  byId("pa1-provider-names"),
  byId("pa1-stateless"),
  byId("pa1-cost"),
  byId("pa1-structured"),
  byId("pa1-when-api"),
  // 04 · Prompts que funcionan
  byId("pa1-s4"),
  from30("thesis-30", { id: "pa1-thesis", notes: "Un buen input logra un buen output. No es magia: es comunicarse mejor." }),
  from30("anatomy-30", { id: "pa1-anatomy-30", notes: "Las piezas de un buen prompt. Checklist: no siempre todas, pero saber que existen." }),
  byId("pa1-before-after"),
  byId("pa1-few-shot"),
  from30("practices-30", { id: "pa1-practices", notes: "Higiene de conversación: chat nuevo por tema, resumen y reinicio, plan antes de acción." }),
  from30("plan-mode-30", { id: "pa1-plan-mode", notes: "Pensar, preguntar, planear, criticar el plan, ejecutar." }),
  // 05 · Del prompt al sistema
  newSlides[0],
  from30("organized-context-30", { id: "pa1-organized", notes: "Separar lo dinámico (PROMPT) de lo estable (RULES, AGENTS), lo reutilizable (SKILLS) y lo que se arrastra (MEMORY, PLAN)." }),
  from30("reusable-30", { id: "pa1-reusable", notes: "Si lo hacés más de una vez, convertilo en algo reutilizable. Pedir ejemplos de la sala." }),
  newSlides[1],
  newSlides[2],
  newSlides[3],
  from30("connectors-30", { id: "pa1-connectors", notes: "Conectores/MCP como forma de traer contexto vivo sin copiar y pegar." }),
  from30("automation-30", { id: "pa1-automation", notes: "Qué tareas se pueden automatizar con este sistema." }),
  newSlides[4],
  // 06 · Práctica
  ...practiceSlides,
  // Cierre
  byId("pa1-takeaways"),
  byId("pa1-next"),
];

/** Slides fuera del recorrido: reserva para preguntas o para la clase 2. */
export const reserveSlidesPromptsApis01: SlideDefBase[] = [
  "pa1-window",
  "pa1-more-context",
  "pa1-history",
  "pa1-params",
  "pa1-api-tools",
  "pa1-agent-loop",
  "pa1-checklist",
  "pa1-api-key",
  "pa1-brief",
  "pa1-techniques",
  "pa1-few-shot-care",
  "pa1-disciplines",
  "pa1-iterate",
  "pa1-s5",
  "pa1-exercise",
  "pa1-template",
  "pa1-tech-track",
].map(byId);
