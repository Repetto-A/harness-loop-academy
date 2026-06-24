import type React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Globe,
  FileText,
  FolderOpen,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageSquareMore,
  NotebookTabs,
  QrCode,
  Twitter,
  Workflow,
} from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { SlideShell } from "@/components/SlideShell";

export interface SlideDef30 {
  id: string;
  title: string;
  notes: string;
  Component: React.ComponentType<{ step?: number }>;
  steps?: number;
}

function Deck30Shell({
  children,
  bg = "default",
  noChrome = false,
}: {
  children: React.ReactNode;
  bg?: "default" | "ember" | "panel";
  noChrome?: boolean;
}) {
  const watermarkClass = bg === "ember" ? "text-[oklch(0.18_0_0)]/28" : "text-muted-foreground/45";

  return (
    <SlideShell noChrome={noChrome} bg={bg}>
      <div className="absolute right-6 bottom-10 pointer-events-none z-10">
        <div className={`font-mono text-sm tracking-[0.28em] uppercase ${watermarkClass}`}>
          Alejandro Repetto
        </div>
      </div>
      {children}
    </SlideShell>
  );
}

const Cover30 = () => (
  <Deck30Shell noChrome>
    <div className="flex h-full items-center">
      <div>
        <h1 className="font-display text-8xl font-bold leading-[0.92]">
          De prompts sueltos
          <br />a <span className="text-ember">workflows inteligentes</span>.
        </h1>
      </div>
    </div>
  </Deck30Shell>
);

const Thesis30 = () => (
  <Deck30Shell noChrome bg="ember">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-8xl font-bold leading-[0.95]">
        Un buen input
        <br />
        logra un buen output.
      </h2>
    </div>
  </Deck30Shell>
);

const AskBetter30 = () => (
  <Deck30Shell noChrome>
    <div className="flex-1 flex flex-col justify-center gap-12">
      <h2 className="font-display text-7xl font-bold leading-[0.98] max-w-[1450px]">
        Antes de cambiar de modelo,
        <br />
        <span className="text-ember">mejorá la forma en que le hablás.</span>
      </h2>
      <p className="text-3xl text-muted-foreground italic max-w-[1300px]">
        A veces el problema no es la IA. Es pedirle las cosas como si le mandaras un audio de
        WhatsApp a un amigo a las 2 AM.
      </p>
    </div>
  </Deck30Shell>
);

const AskOnly30 = () => (
  <Deck30Shell noChrome>
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-7xl font-bold leading-[1.02] max-w-[1500px]">
        ¿Qué tiene que tener un buen mensaje
        <br />
        para que la IA nos entienda?
      </h2>
    </div>
  </Deck30Shell>
);

const AskReveal30 = ({ step = 0 }: { step?: number }) => {
  const expanded = step > 0;
  const missing = [
    "Sabor a limon",
    "Apta para celiacos",
    "No tengo horno",
    "No soy gran cocinero",
    "Somos 8 personas",
    "Damela paso a paso",
  ];

  return (
    <Deck30Shell noChrome>
      <div className="flex-1 flex items-center">
        <motion.div
          layout
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`w-full ${expanded ? "space-y-10" : "space-y-12 text-center"}`}
        >
          <motion.div
            layout
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={
              expanded
                ? "flex flex-col items-center gap-8"
                : "flex justify-center"
            }
          >
            <motion.div
              layout
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={expanded ? "max-w-[1120px] w-full" : "max-w-[1100px]"}
            >
              <CodeBlock
                label="prompt"
                tone={expanded ? "bad" : "default"}
                className={
                  expanded
                    ? "shadow-[0_18px_60px_rgba(0,0,0,0.28)] [&_pre]:text-[1.85rem] [&_pre]:leading-[1.5] [&_pre]:p-12 [&_div:first-child]:text-base"
                    : "shadow-[0_24px_80px_rgba(0,0,0,0.32)] [&_pre]:text-[2.35rem] [&_pre]:leading-[1.45] [&_pre]:p-14 [&_div:first-child]:text-base"
                }
              >{`Quiero que me ayudes a hacer una torta.`}</CodeBlock>
            </motion.div>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 28 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="w-full max-w-[1120px]"
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="font-display font-bold leading-[1.02] text-4xl text-center mb-5"
                  >
                    ¿Qué le falta?
                  </motion.h2>
                  <div className="grid grid-cols-2 gap-4">
                    {missing.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-border bg-surface px-6 py-5 text-left min-h-[112px] flex items-center"
                      >
                        <div className="font-display text-2xl leading-tight">{item}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </Deck30Shell>
  );
};

const MetaPromptEarly30 = () => (
  <Deck30Shell noChrome>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold leading-[1] max-w-[1500px]">
        No necesitás escribir el prompt perfecto.
      </h2>
      <p className="text-3xl text-muted-foreground max-w-[1400px]">
        Pedile a la IA que te haga las preguntas necesarias.
      </p>
      <div className="max-w-[1450px]">
        <CodeBlock label="meta-prompt" tone="good">
          {`Quiero hacer una torta.

Antes de responder, haceme las preguntas necesarias
para entender sabor, ocasion, ingredientes disponibles,
restricciones y el resultado que busco.

Cuando tengas suficiente información,
proponeme un prompt mejorado.`}
        </CodeBlock>
      </div>
    </div>
  </Deck30Shell>
);

const Anatomy30 = () => {
  const items = [
    "Contexto",
    "Objetivo",
    "Restricciones",
    "Formato Esperado",
    "Criterio de Calidad",
    "Ejemplos",
  ];

  return (
    <Deck30Shell noChrome>
      <div className="flex-1 flex flex-col justify-center gap-12">
        <div className="flex items-end justify-between gap-10">
          <h2 className="font-display text-6xl font-bold">¿Qué tiene un buen prompt?</h2>

        </div>
        <div className="grid grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={item}
              className="bg-surface border border-border rounded-2xl p-8 min-h-[180px] flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-full bg-ember/12 border border-ember/30 flex items-center justify-center font-mono text-ember">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="font-display text-3xl leading-tight">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </Deck30Shell>
  );
};

const Desk30 = () => (
  <Deck30Shell noChrome>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <div>
        <h2 className="font-display text-6xl font-bold">Ventana de contexto</h2>
        <p className="mt-4 text-3xl text-muted-foreground">Pensala como si fueran documentos en tu escritorio</p>
      </div>

      <div className="rounded-[2.5rem] border border-border/60 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_35%),linear-gradient(135deg,rgba(44,44,48,1),rgba(24,24,28,1))] p-7">
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              title: "Vacío",
              body: "La IA no tiene info suficiente y adivina.",
              icon: "single",
            },
            {
              title: "Ordenado",
              body: "La IA tiene la info justa, responde bien.",
              icon: "double",
              highlight: true,
            },
            {
              title: "Repleto",
              body: "Hay demasiado quilombo, pierde el foco.",
              icon: "grid",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl border p-7 min-h-[270px] flex flex-col ${
                item.highlight
                  ? "border-ember bg-[oklch(0.24_0.04_35)] shadow-[0_0_0_1px_oklch(0.66_0.18_38)]"
                  : "border-border bg-[oklch(0.16_0_0)]"
              }`}
            >
              <div className="mb-8">
                {item.icon === "single" && (
                  <div className="w-14 h-14 rounded-[1rem] border-[5px] border-white/65" />
                )}
                {item.icon === "double" && (
                  <div className="relative w-[72px] h-[72px]">
                    <div className="absolute inset-0 rounded-none border-[5px] border-ember" />
                    <div className="absolute left-[18px] top-[18px] w-9 h-9 bg-ember" />
                  </div>
                )}
                {item.icon === "grid" && (
                  <div className="grid grid-cols-4 gap-2 w-[64px]">
                    {Array.from({ length: 16 }).map((_, index) => (
                      <div key={index} className="w-3 h-3 border-[3px] border-white/65" />
                    ))}
                  </div>
                )}
              </div>
              <div className="font-display text-[2.6rem] font-bold leading-[0.95] mb-5">
                {item.title}
              </div>
              <div className="text-[1.45rem] text-muted-foreground leading-snug">{item.body}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-2xl">
        Más contexto no siempre es mejor.
        <span className="text-ember font-bold"> Mejor contexto sí.</span>
      </p>
    </div>
  </Deck30Shell>
);

const GoodPractices30 = () => (
  <Deck30Shell noChrome>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">Buenas prácticas</h2>
      <div className="grid grid-cols-2 gap-6">
        {[
          "Si cambiás de tema, nuevo chat.",
          "Si el chat responde peor, pedile un resumen y arrancá otro.",
          "No mezcles cinco proyectos en la misma conversación.",
          "Antes de pedir acción, pedí plan.",
          "Antes de pedir plan, pedí preguntas si falta claridad.",
          "Reutilizar contexto ahorra tiempo y mejora consistencia.",
        ].map((text) => (
          <div key={text} className="bg-surface border border-border rounded-2xl p-8">
            <div className="font-display text-2xl leading-snug">{text}</div>
          </div>
        ))}
      </div>
    </div>
  </Deck30Shell>
);

const PlanMode30 = () => (
  <Deck30Shell noChrome>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-7xl font-bold leading-[0.98] max-w-[1500px]">
        Tomate una pausa.
      </h2>
      <p className="text-3xl text-muted-foreground max-w-[1500px] leading-snug">
        Pensá tu prompt, planealo, hacete preguntas vos y a la IA, armá un plan de ejecución,
        critícalo si hace falta y recién al final pedile que lo ejecute.
      </p>
      <div className="grid grid-cols-5 gap-5">
        {["Pensar el prompt", "Hacer preguntas", "Planear", "Criticar el plan", "Ejecutar"].map(
          (item) => (
            <div
              key={item}
              className="bg-surface border border-border rounded-2xl p-7 min-h-[180px] flex items-center"
            >
              <div className="font-display text-2xl leading-tight">{item}</div>
            </div>
          ),
        )}
      </div>
      <p className="font-mono text-xl text-ember">
        Consejo: para estos planes, Markdown funciona excelente.
      </p>
    </div>
  </Deck30Shell>
);

const Transition30 = () => (
  <Deck30Shell noChrome bg="panel">
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-7xl font-bold leading-[0.97] max-w-[1500px]">
        IA agéntica.
      </h2>
      <p className="text-4xl text-foreground max-w-[1500px] leading-snug">
        El chat con la IA es muy noble,
        <br />
        pero jubílenlo si van a hacer cosas grandes.
      </p>
      <p className="text-3xl text-muted-foreground">Hagamos un verdadero sistema inteligente.</p>
    </div>
  </Deck30Shell>
);

const OrganizedContext30 = () => (
  <Deck30Shell noChrome>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold max-w-[1450px]">
        Organicemos mejor el contexto.
      </h2>
      <div className="grid grid-cols-3 gap-6">
        {[
          ["PROMPT.md", "Lo dinámico: Lo que quieras hacer ahora"],
          ["RULES.md", "Instrucciones estables o restricciones"],
          ["AGENTS.md", "Guía de trabajo del proyecto o entorno"],
          ["SKILLS.md", "Procedimientos reutilizables"],
          ["MEMORY.md", "Estado, decisiones y contexto de largo plazo"],
          ["PLAN.md", "Milestones, próximos pasos y dirección"],
        ].map(([title, body]) => (
          <div key={title} className="bg-surface border border-border rounded-2xl p-8">
            <div className="font-mono text-base text-ember mb-4">{title}</div>
            <div className="font-display text-2xl leading-tight">{body}</div>
          </div>
        ))}
      </div>
    </div>
  </Deck30Shell>
);

const Reusable30 = () => (
  <Deck30Shell noChrome>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-7xl font-bold leading-[0.98]">
        Hacé tus prompts reutilizables.
      </h2>
      <div className="flex flex-wrap gap-4">
        {[
          "resumen semanal",
          "analizar mails",
          "generar contenido",
          "revisar código",
          "armar propuestas",
          "seguir un proyecto",
          "procesos propios",
        ].map((item) => (
          <div
            key={item}
            className="px-6 py-4 rounded-full bg-surface border border-border text-2xl font-display"
          >
            {item}
          </div>
        ))}
      </div>
      <p className="text-2xl text-muted-foreground">
        Reutilizar contexto ahorra tiempo y mejora consistencia.
      </p>
    </div>
  </Deck30Shell>
);

const Connectors30 = () => {
  const items = [
    [FolderOpen, "Drive"],
    [Mail, "Gmail"],
    [CalendarDays, "Calendar"],
    [NotebookTabs, "Notion"],
    [MessageSquareMore, "Slack"],
    [Github, "GitHub"],
    [FileText, "Docs"],
    [Workflow, "Sheets"],
  ] as const;

  return (
    <Deck30Shell noChrome>
      <div className="flex-1 flex flex-col justify-center gap-8">
        <h2 className="font-display text-5xl font-bold leading-[1.02]">
          El modelo es el cerebro.
          <br />
          <span className="text-ember">Los conectores son los músculos.</span>
        </h2>
        <p className="text-2xl text-muted-foreground max-w-[1300px] leading-snug">
          Una IA sin herramientas puede pensar y escribir.
          <br />
          Una IA con conectores puede cruzar informacion, realizar tareas y hasta pedir ayuda
          invocando mas agentes IA.
        </p>
        <div className="grid grid-cols-4 gap-5">
          {items.map(([Icon, name]) => (
            <div
              key={name}
              className="rounded-3xl border border-border bg-surface h-[160px] flex flex-col items-center justify-center gap-4"
            >
              <Icon className="w-11 h-11 text-muted-foreground" strokeWidth={1.75} />
              <div className="font-display text-[1.7rem]">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </Deck30Shell>
  );
};

const Automation30 = () => (
  <Deck30Shell noChrome>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-7xl font-bold leading-[0.98]">Automatizar tareas.</h2>
      <div className="grid grid-cols-3 gap-6">
        {[
          ["cada mañana", "resumirme los mails que llegaron durante la noche"],
          ["todos los lunes", "proponerme un plan semanal"],
          ["cada viernes", "hacer un cierre de pendientes"],
          ["antes de reuniones", "prepararme el contexto del día"],
          ["todos los días", "revisar novedades de un tema"],
          ["cada semana", "resumir qué pasó y qué sigue"],
        ].map(([when, what]) => (
          <div key={when + what} className="bg-surface border border-border rounded-2xl p-8">
            <div className="font-mono text-base text-ember mb-4 uppercase tracking-widest">
              {when}
            </div>
            <div className="font-display text-2xl leading-tight">{what}</div>
          </div>
        ))}
      </div>
    </div>
  </Deck30Shell>
);

const Closing30 = () => (
  <Deck30Shell noChrome bg="ember">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-8xl font-bold leading-[0.95] max-w-[1500px]">
        La ventaja no es usar IA.
        <br />
        La ventaja es{" "}
        <span className="underline decoration-[6px] underline-offset-[12px]">saber dirigirla.</span>
      </h2>
    </div>
  </Deck30Shell>
);

const Thanks30 = () => (
  <Deck30Shell noChrome>
    <div className="flex-1 flex items-center">
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-16 w-full items-center">
        <div>
          <h2 className="font-display text-8xl font-bold leading-[0.94] mb-10">Gracias.</h2>
          <div className="mb-8">
            <div className="font-display text-3xl">Alejandro Repetto</div>
            <div className="text-xl text-muted-foreground">Software Engineer · AI & Automation</div>
          </div>
          <a
            href="https://repetto-a.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-4 text-3xl text-muted-foreground mb-10 transition-all duration-300 hover:text-foreground"
          >
            <Globe className="w-7 h-7 text-ember transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              repetto-a.com
            </span>
          </a>
          <div className="space-y-4 text-muted-foreground/80">
            <a
              href="https://www.linkedin.com/in/alejandro-repetto/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 text-xl transition-all duration-300 hover:text-foreground"
            >
              <Linkedin className="w-5 h-5 text-ember/85" strokeWidth={1.8} />
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                linkedin.com/in/alejandro-repetto
              </span>
            </a>
            <a
              href="https://x.com/AleRepetto5"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 text-xl transition-all duration-300 hover:text-foreground"
            >
              <Twitter className="w-5 h-5 text-ember/85" strokeWidth={1.8} />
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                x.com/AleRepetto5
              </span>
            </a>
            <a
              href="https://www.instagram.com/repettoale"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 text-xl transition-all duration-300 hover:text-foreground"
            >
              <Instagram className="w-5 h-5 text-ember/85" strokeWidth={1.8} />
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                @repettoale
              </span>
            </a>
          </div>
        </div>

        <div className="justify-self-end">
          <div className="relative rounded-[2.4rem] border border-ember/30 bg-[radial-gradient(circle_at_top,rgba(255,110,47,0.08),transparent_35%),linear-gradient(180deg,rgba(28,28,32,1),rgba(18,18,22,1))] p-8 w-[360px] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="absolute inset-0 rounded-[2.4rem] border border-white/5 pointer-events-none" />
            <div className="w-[292px] h-[292px] rounded-[1.6rem] bg-white overflow-hidden flex items-center justify-center mx-auto shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=276x276&data=https%3A%2F%2Fcharla-ia-alejandrorepetto.vercel.app%2F"
                alt="QR a la presentación"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-7 flex justify-center text-muted-foreground text-center">
              <span className="font-mono text-sm uppercase tracking-[0.3em]">
              Escaneá para ver la presentación
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Deck30Shell>
);

export const slides30: SlideDef30[] = [
  {
    id: "cover-30",
    title: "Portada",
    Component: Cover30,
    notes:
      "Portada limpia con tu nombre y título muy discretos. No adelantes conceptos. Entrá con presencia y pasá rápido a la frase principal.",
  },
  {
    id: "thesis-30",
    title: "Un buen input",
    Component: Thesis30,
    notes:
      "Acá no hace falta más texto. Vos explicás oralmente que lo que recibe la IA condiciona mucho lo que devuelve.",
  },
  {
    id: "ask-better-30",
    title: "Pedir mejor",
    Component: AskBetter30,
    notes:
      "Explicá que muchas veces no hace falta cambiar de modelo: hace falta pedir mejor. El ejemplo del audio de WhatsApp lo baja a tierra enseguida.",
  },
  {
    id: "ask-only-30",
    title: "Pregunta",
    Component: AskOnly30,
    notes:
      "Pausa y preguntá al público antes de mostrar ejemplos. Esta slide es solo para abrir la conversación.",
  },
  {
    id: "ask-reveal-30",
    title: "Budín",
    Component: AskReveal30,
    steps: 1,
    notes:
      "Primero dejá el prompt solo y hacé jugar a la audiencia. En la primera flecha aparecen cosas que faltaban: sabor, restricciones, dificultad, etc. Recién después seguí a la slide siguiente.",
  },
  {
    id: "anatomy-30",
    title: "Anatomía",
    Component: Anatomy30,
    notes:
      "Mostrá los componentes como piezas, no como documento técnico. La idea es que se lleven una estructura mental simple.",
  },
  {
    id: "meta-early-30",
    title: "Meta-prompt",
    Component: MetaPromptEarly30,
    notes:
      "Después de mostrar la estructura, volvés al ejemplo del budín. La idea es mostrar que, si no sabés escribir el prompt, la IA puede ayudarte a construirlo haciéndote las preguntas correctas.",
  },
  {
    id: "desk-30",
    title: "Ventana de contexto",
    Component: Desk30,
    notes:
      "Volvé a explicar la context window como escritorio. Si falta contexto, inventa o responde flojo; si sobra ruido, también empeora.",
  },
  {
    id: "practices-30",
    title: "Buenas prácticas",
    Component: GoodPractices30,
    notes:
      "Este slide tiene mucho valor práctico. Son cosas que la gente puede aplicar al día siguiente.",
  },
  {
    id: "plan-mode-30",
    title: "Tomate una pausa",
    Component: PlanMode30,
    notes:
      "Contá tu proceso real: pensar el prompt, hacer preguntas, planear, criticar el plan con la IA y recién después ejecutar. Mencioná Markdown.",
  },
  {
    id: "transition-30",
    title: "IA agéntica",
    Component: Transition30,
    notes:
      "Usá esta slide como parate narrativo para entrar a la parte agéntica sin asustar demasiado.",
  },
  {
    id: "organized-context-30",
    title: "Organicemos mejor el contexto",
    Component: OrganizedContext30,
    notes: "Explicá que el prompt enorme se puede dividir en piezas más estables y reutilizables.",
  },
  {
    id: "reusable-30",
    title: "Reutilizable",
    Component: Reusable30,
    notes:
      "Dejá muy fuerte la idea de reutilización. Si algo se repite, no conviene reexplicarlo de cero siempre.",
  },
  {
    id: "connectors-30",
    title: "Conectores",
    Component: Connectors30,
    notes:
      "Explicalo como músculo. La IA sola piensa; con herramientas puede leer, cruzar información y actuar.",
  },
  {
    id: "automation-30",
    title: "Automatizar tareas",
    Component: Automation30,
    notes:
      "Acá explicás oralmente desde automatizaciones hasta crons, pero la slide queda como ancla visual de rutinas delegables.",
  },
  {
    id: "closing-30",
    title: "Cierre",
    Component: Closing30,
    notes: "Volvé a la idea central: la ventaja no es solo usar IA, sino saber dirigirla mejor.",
  },
  {
    id: "thanks-30",
    title: "Gracias",
    Component: Thanks30,
    notes:
      "Slide final de contacto: portfolio, QR y redes. Ideal si después compartís la presentación.",
  },
];
