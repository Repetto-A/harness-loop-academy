/**
 * Cómo competir en una hackathon (y sobrevivir en el intento) · Crash course 101
 * Alejandro Repetto
 *
 * Source of truth: class-scripts/hackathon-crash-course.md (8 blocks, in order).
 * Style: few words, big type, one idea per slide. Tables stay legible from the back of a room.
 * The live demo (block 5) happens outside the deck: only divider slides live here.
 * Reuses the deck05 primitives (Shell, RevealStack, DeckCard, ...).
 */
import type React from "react";
import {
  DeckCard,
  RevealItem,
  RevealStack,
  Shell,
  StatementSlide,
} from "@/components/deck05/Deck05Shell";
import type { SlideDefBase } from "@/slides/types";

// Public checklist URL. Leave empty until it exists: the QR slot then renders a neutral "QR" box.
const CHECKLIST_URL: string = "";

const INK = "text-[oklch(0.18_0_0)]";
const INK_SOFT = "text-[oklch(0.18_0_0)]/70";

/* ------------------------------------------------------------------ */
/* Building blocks                                                    */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[30px] uppercase tracking-[0.3em] text-ember">{children}</div>
  );
}

function Stage({ children, gap = "gap-10" }: { children: React.ReactNode; gap?: string }) {
  return (
    <RevealStack className={`flex min-h-0 flex-1 flex-col justify-center ${gap}`}>
      {children}
    </RevealStack>
  );
}

function Headline({
  children,
  size = 112,
  className = "",
}: {
  children: React.ReactNode;
  size?: number;
  className?: string;
}) {
  return (
    <h2
      style={{ fontSize: size }}
      className={`font-display font-bold leading-[1.02] text-balance ${className}`}
    >
      {children}
    </h2>
  );
}

function Sub({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[44px] leading-snug text-muted-foreground text-pretty ${className}`}>
      {children}
    </p>
  );
}

function Em({ children }: { children: React.ReactNode }) {
  return <span className="font-bold text-foreground">{children}</span>;
}

/** Full-bleed ember statement: one sentence, big. */
function Statement({
  children,
  sub,
  size = 120,
}: {
  children: React.ReactNode;
  sub?: React.ReactNode;
  size?: number;
}) {
  return (
    <Shell bg="ember">
      <StatementSlide>
        <div className="flex flex-col gap-12">
          <h2
            style={{ fontSize: size }}
            className={`font-display max-w-[1664px] font-bold leading-[1.02] text-balance ${INK}`}
          >
            {children}
          </h2>
          {sub && (
            <p className={`max-w-[1400px] font-display text-[48px] leading-snug ${INK_SOFT}`}>
              {sub}
            </p>
          )}
        </div>
      </StatementSlide>
    </Shell>
  );
}

/** Block opener: giant number + title + clock. */
function Divider({
  num,
  title,
  time,
  anchor,
  children,
}: {
  num: string;
  title: string;
  time: string;
  anchor?: string;
  children?: React.ReactNode;
}) {
  return (
    <Shell bg="panel">
      <Stage gap="gap-8">
        <RevealItem>
          <div className="flex items-end gap-16">
            <div
              aria-hidden
              className="font-mono text-[320px] font-bold leading-[0.8] tracking-tighter text-ember"
            >
              {num}
            </div>
            <div className="pb-4">
              <div className="mb-4 font-mono text-[26px] uppercase tracking-[0.3em] text-muted-foreground">
                {time}
              </div>
              <h2 className="font-display text-[104px] font-bold leading-[1.0] text-balance">
                {title}
              </h2>
            </div>
          </div>
        </RevealItem>
        {anchor && (
          <RevealItem>
            <p className="font-display text-[44px] leading-snug text-muted-foreground">
              Ancla: <span className="text-ember">{anchor}</span>
            </p>
          </RevealItem>
        )}
        {children && <RevealItem>{children}</RevealItem>}
      </Stage>
    </Shell>
  );
}

function FlowBox({
  title,
  sub,
  accent = false,
  size = "md",
  className = "",
}: {
  title: string;
  sub?: string;
  accent?: boolean;
  size?: "md" | "lg";
  className?: string;
}) {
  const lg = size === "lg";
  return (
    <div
      className={[
        lg
          ? "rounded-2xl border px-10 py-7 text-center"
          : "rounded-2xl border px-8 py-5 text-center",
        accent ? "border-2 border-ember bg-ember/10" : "border-border bg-surface/80",
        className,
      ].join(" ")}
    >
      <div className={`font-display font-bold leading-tight ${lg ? "text-[52px]" : "text-[40px]"}`}>
        {title}
      </div>
      {sub && (
        <div
          className={`mt-1 leading-snug text-muted-foreground ${lg ? "text-[32px]" : "text-[28px]"}`}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <span aria-hidden className="shrink-0 font-mono text-[52px] leading-none text-ember">
      {down ? "↓" : "→"}
    </span>
  );
}

/** Simple grid table: header row + rows of ReactNodes. */
function Table({
  head,
  rows,
  cols,
  rowClass = "py-4",
}: {
  head: string[];
  rows: React.ReactNode[][];
  cols: string;
  rowClass?: string;
}) {
  return (
    <RevealStack className="flex flex-col">
      <RevealItem>
        <div
          style={{ gridTemplateColumns: cols }}
          className="grid gap-x-10 border-b-2 border-ember/60 pb-3 font-mono text-[28px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          {head.map((h) => (
            <div key={h}>{h}</div>
          ))}
        </div>
      </RevealItem>
      {rows.map((r, i) => (
        <RevealItem key={i}>
          <div
            style={{ gridTemplateColumns: cols }}
            className={`grid items-center gap-x-10 border-b border-border/70 ${rowClass}`}
          >
            {r.map((cell, j) => (
              <div key={j}>{cell}</div>
            ))}
          </div>
        </RevealItem>
      ))}
    </RevealStack>
  );
}

function QrSlot({ size = 380 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="flex shrink-0 flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-ember/70 bg-surface/70 text-center"
    >
      {CHECKLIST_URL ? (
        <>
          <span className="font-mono text-[24px] uppercase tracking-[0.3em] text-ember">
            checklist
          </span>
          <span className="break-all px-8 font-mono text-[32px] leading-snug">{CHECKLIST_URL}</span>
        </>
      ) : (
        <span className="font-display text-[120px] font-bold leading-none text-muted-foreground/60">
          QR
        </span>
      )}
    </div>
  );
}

function NexaChivo() {
  return (
    <div className="inline-flex items-center gap-4 rounded-full border border-border bg-surface/80 px-8 py-3">
      <span className="font-display text-[44px] font-bold tracking-wide">NEXA</span>
    </div>
  );
}

/** Technical-block slide: concept name, the translation as headline, why Saturday, a visual. */
function Concept({
  n,
  name,
  translation,
  why,
  children,
}: {
  n: number;
  name: string;
  translation: string;
  why: string;
  children?: React.ReactNode;
}) {
  return (
    <Shell>
      <Stage gap="gap-9">
        <RevealItem>
          <Eyebrow>
            Técnico · {n}/7 · {name}
          </Eyebrow>
        </RevealItem>
        <RevealItem>
          <Headline size={116}>{translation}</Headline>
        </RevealItem>
        {children && <RevealItem>{children}</RevealItem>}
        <RevealItem>
          <div className="flex items-baseline gap-6 border-t border-border/70 pt-7">
            <span className="shrink-0 font-mono text-[28px] uppercase tracking-[0.25em] text-ember">
              el sábado
            </span>
            <span className="font-display text-[44px] leading-snug">{why}</span>
          </div>
        </RevealItem>
      </Stage>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Block 0 · Apertura                                                 */
/* ------------------------------------------------------------------ */

const Cover = () => (
  <Shell>
    <Stage gap="gap-12">
      <RevealItem>
        <Eyebrow>Crash course 101</Eyebrow>
      </RevealItem>
      <RevealItem>
        <h1 className="font-display text-[132px] font-bold leading-[0.96] text-balance">
          Cómo competir en una hackathon
          <br />
          <span className="text-ember">(y sobrevivir en el intento)</span>
        </h1>
      </RevealItem>
      <RevealItem>
        <div className="font-mono text-[34px] tracking-wide text-muted-foreground">
          Alejandro Repetto
        </div>
      </RevealItem>
    </Stage>
  </Shell>
);

const OpeningArc = () => (
  <Statement size={116}>
    En mi primera hack no hablé.
    <br />
    Le dejé el pitch a un profe.
  </Statement>
);

const Agenda = () => (
  <Shell>
    <Stage gap="gap-12">
      <RevealItem>
        <Headline size={96}>No es un curso de programación.</Headline>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        {[
          ["01", "Elegir una idea"],
          ["02", "Matarla a tiempo"],
          ["03", "Construir con agentes sin perder el hilo"],
          ["04", "Contar lo que hicieron"],
        ].map(([n, t]) => (
          <RevealItem key={n} className="h-full">
            <DeckCard className="flex h-full items-baseline gap-6 px-8 py-8">
              <span className="font-mono text-[34px] text-ember">{n}</span>
              <span className="font-display text-[48px] font-bold leading-tight">{t}</span>
            </DeckCard>
          </RevealItem>
        ))}
      </RevealStack>
    </Stage>
  </Shell>
);

const Tone = () => (
  <Shell>
    <Stage>
      <RevealItem>
        <Eyebrow>El tono</Eyebrow>
      </RevealItem>
      <RevealItem>
        <Headline size={128}>
          La idea no es participar.
          <br />
          <span className="text-ember">Es terminar, y que se vea.</span>
        </Headline>
      </RevealItem>
    </Stage>
  </Shell>
);

/* ------------------------------------------------------------------ */
/* Block 1 · Mentalidad                                               */
/* ------------------------------------------------------------------ */

const DividerMentalidad = () => (
  <Divider
    num="1"
    title="Mentalidad"
    time="0:03 · 10 min"
    anchor="Abby Care y mi hack sin terminar"
  />
);

const HighAgency = () => (
  <Shell>
    <Stage>
      <RevealItem>
        <Eyebrow>High agency</Eyebrow>
      </RevealItem>
      <RevealItem>
        <Headline size={132}>
          Nadie te va a decir
          <br />
          <span className="text-ember">qué hacer el sábado.</span>
        </Headline>
      </RevealItem>
      <RevealItem>
        <Sub>Si algo se traba, lo destrabás vos.</Sub>
      </RevealItem>
    </Stage>
  </Shell>
);

const WhatIsAHack = () => (
  <Shell>
    <Stage gap="gap-14">
      <RevealItem>
        <Eyebrow>Qué es una hack</Eyebrow>
      </RevealItem>
      <RevealStack className="grid grid-cols-3 gap-6">
        {[
          ["12", "horas"],
          ["1", "jurado"],
          ["3", "minutos"],
        ].map(([n, u]) => (
          <RevealItem key={u} className="h-full">
            <DeckCard className="flex h-full flex-col items-center justify-center gap-2 px-6 py-10 text-center">
              <span className="font-display text-[220px] font-bold leading-none text-ember">
                {n}
              </span>
              <span className="font-display text-[56px] font-bold">{u}</span>
            </DeckCard>
          </RevealItem>
        ))}
      </RevealStack>
      <RevealItem>
        <Sub>
          Gana la mejor demo <Em>contada</Em>.
        </Sub>
      </RevealItem>
    </Stage>
  </Shell>
);

const PeoplePrize = () => (
  <Shell>
    <Stage>
      <RevealItem>
        <Headline size={120}>
          El premio real
          <br />
          <span className="text-ember">es la gente.</span>
        </Headline>
      </RevealItem>
      <RevealStack className="grid grid-cols-3 gap-6">
        {["Mentores", "Sponsors", "Jurado"].map((t) => (
          <RevealItem key={t} className="h-full">
            <DeckCard className="px-8 py-8 text-center">
              <span className="font-display text-[64px] font-bold">{t}</span>
            </DeckCard>
          </RevealItem>
        ))}
      </RevealStack>
      <RevealItem>
        <Sub>Vayan con intención: con quién hablar y qué preguntarle.</Sub>
      </RevealItem>
    </Stage>
  </Shell>
);

const LifeIsASale = () => (
  <Statement size={150} sub="El pitch es una habilidad para siempre, no un trámite.">
    La vida es una venta.
  </Statement>
);

const Ownership = () => (
  <Shell>
    <Stage>
      <RevealItem>
        <Eyebrow>Ownership</Eyebrow>
      </RevealItem>
      <RevealItem>
        <Headline size={120}>
          Sin roles fijos.
          <br />
          <span className="text-ember">Cada tarea, un dueño.</span>
        </Headline>
      </RevealItem>
      <RevealItem>
        <Sub>
          Todos tocan todo. El reparto sale de fortalezas y debilidades, y se habla el{" "}
          <Em>primer día</Em>, no a las 15:00.
        </Sub>
      </RevealItem>
    </Stage>
  </Shell>
);

const AbbyCare = () => (
  <Shell>
    <Stage gap="gap-8">
      <RevealItem>
        <Eyebrow>Historia · Abby Care</Eyebrow>
      </RevealItem>
      <RevealItem>
        <div className="font-display text-[260px] font-bold leading-[0.9] tracking-tight text-ember">
          US$ 225M
        </div>
      </RevealItem>
      <RevealItem>
        <Headline size={64} className="max-w-[1500px] !leading-[1.1]">
          Tuvieron la idea. La perdieron discutiendo la certificación y cómo llamar a los médicos.
        </Headline>
      </RevealItem>
      <RevealItem>
        <div className="font-mono text-[26px] text-muted-foreground">Fuente: Forbes Uruguay</div>
      </RevealItem>
    </Stage>
  </Shell>
);

const MonthSix = () => (
  <Statement size={130} sub="Todo lo que no se ve en el demo es para después.">
    Importaba en el mes 6,
    <br />
    no en la hora 3.
  </Statement>
);

const OwnHack = () => (
  <Shell>
    <Stage gap="gap-12">
      <RevealItem>
        <Eyebrow>Historia · mi hack</Eyebrow>
      </RevealItem>
      <RevealItem>
        <Headline size={88}>Yo también lo hice.</Headline>
      </RevealItem>
      <RevealItem className="flex flex-wrap items-center gap-6">
        <FlowBox size="lg" title="Diplomacia estirada" sub="para no ser el dictador" />
        <Arrow />
        <FlowBox size="lg" title="Tiempo perdido" />
        <Arrow />
        <FlowBox size="lg" accent title="Proyecto sin terminar" />
      </RevealItem>
    </Stage>
  </Shell>
);

const ContrastTip = () => (
  <Shell>
    <Stage gap="gap-10">
      <RevealItem>
        <Headline size={88}>
          Otras veces, la diplomacia <span className="text-ember">sí funcionó.</span>
        </Headline>
      </RevealItem>
      <RevealItem>
        <Sub>No hay regla. Depende del instinto, de la gente y de cuánto falta para las 18:00.</Sub>
      </RevealItem>
      <RevealItem>
        <DeckCard accent className="flex items-baseline gap-8 px-10 py-8">
          <span className="font-mono text-[30px] uppercase tracking-[0.25em] text-ember">
            tip, no regla
          </span>
          <span className="font-display text-[52px] font-bold leading-tight">
            Timebox a las discusiones.
          </span>
        </DeckCard>
      </RevealItem>
    </Stage>
  </Shell>
);

const EmpathyNotFreeze = () => (
  <Statement size={150}>
    Empatía sí,
    <br />
    freeze no.
  </Statement>
);

const FinishIt = () => (
  <Shell>
    <Stage>
      <RevealItem>
        <Eyebrow>Terminar sí o sí</Eyebrow>
      </RevealItem>
      <RevealItem>
        <Headline size={116}>
          Algo <span className="text-ember">feo que anda</span>
          <br />
          le gana a algo hermoso
          <br />a medias.
        </Headline>
      </RevealItem>
    </Stage>
  </Shell>
);

/* ------------------------------------------------------------------ */
/* Block 2 · Elegir y triage                                          */
/* ------------------------------------------------------------------ */

const DividerTriage = () => (
  <Divider
    num="2"
    title="Elegir y triage"
    time="0:13 · 12 min"
    anchor="el pivot por la doc del sponsor"
  />
);

const Brainstorm = () => (
  <Shell>
    <Stage>
      <RevealItem>
        <Eyebrow>Brainstorm en equipo</Eyebrow>
      </RevealItem>
      <RevealItem>
        <Headline size={132}>
          Primero <span className="text-ember">cantidad.</span>
        </Headline>
      </RevealItem>
      <RevealItem>
        <Sub>
          Mucha idea mala sobre la mesa, sin juzgar. Que el <Em>bot</Em> tire variantes y haga
          research mientras ustedes discuten.
        </Sub>
      </RevealItem>
    </Stage>
  </Shell>
);

const KillThem = () => (
  <Shell>
    <Stage gap="gap-12">
      <RevealItem>
        <Headline size={124}>
          Si quieren ganar, <span className="text-ember">mátenlas.</span>
        </Headline>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        {[
          "Las muy comunes",
          "Las que no cierran",
          "Las sin mercado",
          "El Frankenstein por sponsors",
        ].map((t) => (
          <RevealItem key={t} className="h-full">
            <DeckCard className="flex h-full items-center gap-6 px-8 py-8">
              <span aria-hidden className="font-mono text-[48px] text-ember">
                ×
              </span>
              <span className="font-display text-[48px] font-bold leading-tight">{t}</span>
            </DeckCard>
          </RevealItem>
        ))}
      </RevealStack>
      <RevealItem>
        <Sub>
          Multi-track <Em>coherente</Em> es maximizar premios. Pegar el track solo por la plata, no.
        </Sub>
      </RevealItem>
    </Stage>
  </Shell>
);

const FilterOfFive = () => (
  <Shell>
    <Stage gap="gap-8">
      <RevealItem>
        <Headline size={88}>
          El filtro de <span className="text-ember">5</span>
        </Headline>
      </RevealItem>
      <Table
        head={["Pregunta", "Mata si..."]}
        cols="1fr 1.6fr"
        rowClass="py-6"
        rows={[
          ["¿Duele?", "Nadie tiene ese problema"],
          ["¿Se ve?", "No hay un momento wow en 3 min"],
          ["¿Se termina?", "No entra en ~6 h reales de código"],
          ["¿Sobrevive?", "Depende de una sola API o doc que se puede romper"],
          ["¿El track tiene sentido?", "El track está pegado por el premio"],
        ].map(([q, kill]) => [
          <span key="q" className="font-display text-[54px] font-bold leading-tight text-ember">
            {q}
          </span>,
          <span key="k" className="font-display text-[46px] leading-snug">
            {kill}
          </span>,
        ])}
      />
    </Stage>
  </Shell>
);

const LensDemo = () => (
  <Statement size={128}>
    ¿Qué se ve en los
    <br />3 minutos de demo?
  </Statement>
);

const PivotStory = () => (
  <Shell>
    <Stage gap="gap-12">
      <RevealItem>
        <Eyebrow>Historia · el pivot</Eyebrow>
      </RevealItem>
      <RevealItem className="flex flex-wrap items-center gap-6">
        <FlowBox title="A mitad de la hack" />
        <Arrow />
        <FlowBox title="El sponsor no tenía documentación" />
        <Arrow />
        <FlowBox accent title="Pivot" sub="y salió excelente igual" />
      </RevealItem>
      <RevealItem>
        <Headline size={92}>
          Elegí ideas que <span className="text-ember">sobrevivan</span> a que algo se rompa.
        </Headline>
      </RevealItem>
    </Stage>
  </Shell>
);

function Quadrant({
  step,
  title,
  sub,
  accent = false,
}: {
  step?: string;
  title: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <DeckCard
      accent={accent}
      className="flex h-full min-h-[210px] flex-col justify-center gap-2 px-8 py-6"
    >
      {step && <div className="font-mono text-[30px] text-ember">{step}</div>}
      <div className="font-display text-[54px] font-bold leading-tight">{title}</div>
      {sub && <div className="text-[36px] leading-snug text-muted-foreground">{sub}</div>}
    </DeckCard>
  );
}

const TriageMatrix = () => (
  <Shell>
    <Stage gap="gap-6">
      <RevealItem>
        <Headline size={80}>
          Triage por <span className="text-ember">wow</span>
        </Headline>
      </RevealItem>
      <RevealItem>
        <div className="grid grid-cols-[60px_1fr_1fr] grid-rows-[1fr_1fr_auto] gap-4">
          <div className="row-span-2 flex items-center justify-center">
            <span className="-rotate-90 whitespace-nowrap font-mono text-[28px] uppercase tracking-[0.25em] text-muted-foreground">
              se ve →
            </span>
          </div>
          <Quadrant accent step="1° siempre" title="Visible y seguro" sub="Primero esto" />
          <Quadrant step="2°" title="Visible y riesgoso" sub="Atacalo temprano" />
          <Quadrant title="No se ve y es seguro" sub="Se simplifica o se mockea" />
          <Quadrant title="No se ve y es riesgoso" sub="Se mockea. Si preguntan, se dice." />
          <div />
          <div className="text-center font-mono text-[28px] uppercase tracking-[0.25em] text-muted-foreground">
            riesgo bajo
          </div>
          <div className="text-center font-mono text-[28px] uppercase tracking-[0.25em] text-muted-foreground">
            riesgo alto
          </div>
        </div>
      </RevealItem>
    </Stage>
  </Shell>
);

const MockIt = () => (
  <Statement size={104}>
    Lo que no se ve, se mockea.
    <br />Y si el jurado pregunta, se dice.
  </Statement>
);

/* ------------------------------------------------------------------ */
/* Block 3 · Grok Bot                                                 */
/* ------------------------------------------------------------------ */

const DividerGrok = () => (
  <Divider num="3" title="Grok Bot" time="0:25 · 5 min" anchor="el puente a lo técnico" />
);

const GrokWhat = () => (
  <Shell>
    <Stage gap="gap-12">
      <RevealItem>
        <Eyebrow>Grok Bot</Eyebrow>
      </RevealItem>
      <RevealItem>
        <Headline size={104}>
          Compañeros de equipo
          <br />
          <span className="text-ember">hechos con IA.</span>
        </Headline>
      </RevealItem>
      <RevealStack className="grid grid-cols-4 gap-5">
        {["Su propia computadora", "Su memoria", "Herramientas por MCP o API", "Un navegador"].map(
          (t) => (
            <RevealItem key={t} className="h-full">
              <DeckCard className="flex h-full items-center px-6 py-9">
                <span className="font-display text-[42px] font-bold leading-tight">{t}</span>
              </DeckCard>
            </RevealItem>
          ),
        )}
      </RevealStack>
      <RevealItem>
        <Sub>Y se comparten como templates.</Sub>
      </RevealItem>
    </Stage>
  </Shell>
);

const BotAnatomy = () => (
  <Shell>
    <Stage gap="gap-10">
      <RevealItem>
        <Headline size={88}>
          Cuatro cosas. <span className="text-ember">Nada más.</span>
        </Headline>
      </RevealItem>
      <RevealStack className="grid grid-cols-4 gap-5">
        {[
          ["Rol", "Quién es y para qué sirve", "Chief of Staff de hack"],
          ["Instrucciones", "Cómo trabaja", "Filtro de 5, triage, pitch, ownership"],
          ["Herramientas", "Qué puede tocar", "Navegador, MCP/API"],
          ["Memoria", "Qué recuerda entre charlas", "Decisiones del equipo"],
        ].map(([name, what, mine]) => (
          <RevealItem key={name} className="h-full">
            <DeckCard className="flex h-full flex-col gap-4 px-6 py-8">
              <div className="font-display text-[44px] font-bold leading-tight text-ember">
                {name}
              </div>
              <div className="text-[34px] leading-snug text-muted-foreground">{what}</div>
              <div className="mt-auto border-t border-border/70 pt-4">
                <div className="mb-1 font-mono text-[22px] uppercase tracking-[0.2em] text-muted-foreground">
                  en mi bot
                </div>
                <div className="font-display text-[38px] font-bold leading-snug">{mine}</div>
              </div>
            </DeckCard>
          </RevealItem>
        ))}
      </RevealStack>
    </Stage>
  </Shell>
);

const BotLive = () => (
  <Shell>
    <Stage>
      <RevealItem>
        <Eyebrow>En vivo</Eyebrow>
      </RevealItem>
      <RevealItem>
        <Headline size={116}>
          Una idea de la sala,
          <br />
          <span className="text-ember">pasada por el filtro de 5.</span>
        </Headline>
      </RevealItem>
      <RevealItem>
        <Sub>¿Alguien me da una idea de hack?</Sub>
      </RevealItem>
    </Stage>
  </Shell>
);

const BotBridge = () => (
  <Shell>
    <Stage gap="gap-10">
      <RevealItem>
        <Headline size={104}>
          Lo mismo que el bot,
          <br />
          <span className="text-ember">en tu repo.</span>
        </Headline>
      </RevealItem>
      <RevealStack className="flex flex-col gap-4">
        {[
          ["Rol + instrucciones", "AGENTS.md"],
          ["Herramientas", "MCP"],
          ["Memoria", "Engram"],
        ].map(([bot, repo]) => (
          <RevealItem key={bot} className="flex items-center gap-8">
            <FlowBox size="lg" title={bot} className="w-[760px]" />
            <Arrow />
            <FlowBox size="lg" accent title={repo} className="w-[520px]" />
          </RevealItem>
        ))}
      </RevealStack>
    </Stage>
  </Shell>
);

/* ------------------------------------------------------------------ */
/* Block 4 · Técnico                                                  */
/* ------------------------------------------------------------------ */

const DividerTecnico = () => (
  <Divider
    num="4"
    title="Técnico"
    time="0:30 · 15 min"
    anchor="“Lo mismo que el bot, en tu repo.”"
  />
);

const SevenConcepts = () => (
  <Shell>
    <Stage gap="gap-5">
      <RevealItem>
        <Headline size={72}>
          Siete conceptos, <span className="text-ember">una traducción cada uno</span>
        </Headline>
      </RevealItem>
      <Table
        head={["Concepto", "Traducción", "Por qué el sábado"]}
        cols="0.75fr 0.95fr 1.5fr"
        rowClass="py-3"
        rows={[
          [
            "Ventana de contexto",
            "Un pizarrón que se borra",
            "A las 15:00 el chat ya no recuerda lo de las 9:00",
          ],
          [
            "AGENTS.md",
            "Las instrucciones del bot, en el repo",
            "Cualquier chat nuevo arranca sabiendo",
          ],
          [
            "Spec de 1 página",
            "El guion de demo como contrato",
            "Contraste de 10 seg con la cadena empresa",
          ],
          ["Skills", "Recetas que se cargan solas", "No repetís el mismo prompt 20 veces"],
          ["MCP", "El USB de las herramientas", "El agente toca Supabase directo"],
          ["Engram", "Memoria entre chats", "Las decisiones sobreviven al chat"],
          [
            "Grafo de código",
            "El mapa del repo",
            "A la hora 8, el agente navega en vez de leer todo",
          ],
        ].map(([c, t, w]) => [
          <span key="c" className="font-display text-[38px] font-bold leading-tight text-ember">
            {c}
          </span>,
          <span key="t" className="font-display text-[36px] font-bold leading-tight">
            {t}
          </span>,
          <span key="w" className="text-[30px] leading-snug text-muted-foreground">
            {w}
          </span>,
        ])}
      />
    </Stage>
  </Shell>
);

const WINDOW_SEGMENTS = [
  {
    label: "9:00 · lo que decidimos",
    cls: "border-dashed border-muted-foreground/50 opacity-40",
    width: "30%",
  },
  { label: "Lo reciente", cls: "border-border bg-surface", width: "28%" },
  { label: "15:00 · hoy", cls: "border-ember/60 bg-ember/15", width: "42%" },
];

const ContextWindow = () => (
  <Concept
    n={1}
    name="Ventana de contexto"
    translation="Un pizarrón que se borra."
    why="A las 15:00 el chat ya no recuerda lo decidido a las 9:00."
  >
    <div className="flex w-full gap-2">
      {WINDOW_SEGMENTS.map((s) => (
        <div
          key={s.label}
          style={{ width: s.width }}
          className={`rounded-xl border px-5 py-6 text-center font-display text-[38px] font-bold ${s.cls}`}
        >
          {s.label}
        </div>
      ))}
    </div>
  </Concept>
);

const AgentsMd = () => (
  <Concept
    n={2}
    name="AGENTS.md"
    translation="Las instrucciones del bot, en el repo."
    why="Cualquier chat nuevo arranca sabiendo."
  >
    <div className="flex flex-wrap gap-4">
      {["Qué es el proyecto", "Cómo se trabaja", "Qué no se toca", "Cómo se verifica"].map((t) => (
        <FlowBox key={t} title={t} className="!py-5 !px-7" />
      ))}
    </div>
  </Concept>
);

const OnePageSpec = () => (
  <Concept
    n={3}
    name="Spec de 1 página"
    translation="El guion de demo como contrato."
    why="Qué se tiene que ver en los 3 minutos. Y qué queda afuera."
  />
);

const NovaBank = () => (
  <Shell>
    <Stage gap="gap-10">
      <RevealItem>
        <Eyebrow>Contraste de 10 segundos</Eyebrow>
      </RevealItem>
      <RevealItem>
        <div className="mb-4 font-mono text-[28px] uppercase tracking-[0.25em] text-muted-foreground">
          Empresa · NovaBank · 5 pasos, 5 personas
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {["PRD", "Tickets", "Spec", "PR", "Review"].map((t, i, arr) => (
            <div key={t} className="flex items-center gap-4">
              <FlowBox size="lg" title={t} className="!px-8" />
              {i < arr.length - 1 && <Arrow />}
            </div>
          ))}
        </div>
      </RevealItem>
      <RevealItem>
        <div className="mb-4 font-mono text-[28px] uppercase tracking-[0.25em] text-ember">
          Versión hack · 10 minutos
        </div>
        <DeckCard accent className="flex items-center gap-8 px-10 py-8">
          <span className="font-display text-[88px] font-bold leading-none text-ember">1</span>
          <span className="font-display text-[56px] font-bold leading-tight">
            página que dice qué se ve en la demo.
          </span>
        </DeckCard>
      </RevealItem>
    </Stage>
  </Shell>
);

const Skills = () => (
  <Concept
    n={4}
    name="Skills"
    translation="Recetas que se cargan solas."
    why="No repetís el mismo prompt 20 veces."
  >
    <div className="flex items-center gap-6">
      <FlowBox size="lg" title="La tarea matchea" />
      <Arrow />
      <FlowBox size="lg" accent title="Se carga la receta" sub="sin pegar nada" />
    </div>
  </Concept>
);

const Mcp = () => (
  <Concept
    n={5}
    name="MCP"
    translation="El USB de las herramientas."
    why="El agente toca Supabase directo."
  >
    <div className="flex items-center gap-6">
      <FlowBox size="lg" title="Agente" />
      <Arrow />
      <FlowBox size="lg" accent title="MCP" sub="un estándar para enchufar" />
      <Arrow />
      <FlowBox size="lg" title="Supabase" sub="sin copiar y pegar SQL" />
    </div>
  </Concept>
);

const EngramConcept = () => (
  <Concept
    n={6}
    name="Engram"
    translation="Memoria entre chats."
    why="Las decisiones sobreviven al chat."
  >
    <div className="flex flex-wrap items-center gap-6">
      <FlowBox size="lg" title="Chat 1" sub="decisiones, bugs, descubrimientos" />
      <Arrow />
      <FlowBox size="lg" accent title="Engram" sub="notas por MCP" />
      <Arrow />
      <FlowBox size="lg" title="Chat nuevo" sub="las busca" />
    </div>
  </Concept>
);

const CodeGraph = () => (
  <Concept
    n={7}
    name="Grafo de código"
    translation="El mapa del repo."
    why="A la hora 8, el agente navega en vez de leer todo."
  >
    <div className="grid grid-cols-2 gap-6">
      <DeckCard className="px-8 py-6">
        <div className="mb-2 font-mono text-[28px] uppercase tracking-[0.2em] text-muted-foreground">
          sin mapa
        </div>
        <div className="font-display text-[44px] font-bold leading-tight">
          Lee archivo por archivo.
        </div>
      </DeckCard>
      <DeckCard accent className="px-8 py-6">
        <div className="mb-2 font-mono text-[28px] uppercase tracking-[0.2em] text-ember">
          con mapa
        </div>
        <div className="font-display text-[44px] font-bold leading-tight">Navega.</div>
      </DeckCard>
    </div>
  </Concept>
);

/* ------------------------------------------------------------------ */
/* Block 5 · Demo (happens outside the deck)                          */
/* ------------------------------------------------------------------ */

const DividerDemo = () => (
  <Divider
    num="5"
    title="Demo en vivo"
    time="0:45 · 15 min"
    anchor="Somos Huella · Supabase pgvector"
  >
    <div className="flex flex-wrap items-center gap-4">
      {["Gentle AI", "Grafo", "SDD", "Supabase", "Engram"].map((t, i, arr) => (
        <div key={t} className="flex items-center gap-4">
          <span className="rounded-full border border-border bg-surface/80 px-7 py-3 font-display text-[40px] font-bold">
            {t}
          </span>
          {i < arr.length - 1 && <Arrow />}
        </div>
      ))}
    </div>
  </Divider>
);

const DemoFeature = () => (
  <Shell>
    <Stage gap="gap-10">
      <RevealItem>
        <Eyebrow>Somos Huella · proyecto humanitario</Eyebrow>
      </RevealItem>
      <RevealItem>
        <Sub>Familias que buscan a un ser querido. La feature:</Sub>
      </RevealItem>
      <RevealItem>
        <Headline size={96}>
          Supabase pgvector como <span className="text-ember">índice alternativo</span> de búsqueda,{" "}
          <span className="text-ember">sin migrar datos.</span>
        </Headline>
      </RevealItem>
    </Stage>
  </Shell>
);

const WhatIsLeftOut = () => (
  <Statement size={132} sub="La spec es lo que NO hacés.">
    ¿Qué queda afuera?
  </Statement>
);

const BackFromDemo = () => (
  <Shell>
    <Stage>
      <RevealItem>
        <Eyebrow>De vuelta a las slides</Eyebrow>
      </RevealItem>
      <RevealItem>
        <Headline size={112}>
          Ya tienen la idea, el mapa y la spec.
          <br />
          <span className="text-ember">Falta contarlo.</span>
        </Headline>
      </RevealItem>
    </Stage>
  </Shell>
);

/* ------------------------------------------------------------------ */
/* Block 6 · Pitch                                                    */
/* ------------------------------------------------------------------ */

const DividerPitch = () => (
  <Divider num="6" title="Pitch" time="1:00 · 10 min" anchor="el callback del arco" />
);

const PitchTable = () => (
  <Shell>
    <Stage gap="gap-8">
      <RevealItem>
        <Headline size={80}>
          3 minutos, <span className="text-ember">5 partes.</span>
        </Headline>
      </RevealItem>
      <Table
        head={["Parte", "Qué", "Regla"]}
        cols="0.95fr 1fr 1.25fr"
        rowClass="py-4"
        rows={[
          ["Problema", "Que duela, con una persona concreta", "~20 seg"],
          ["Solución", "La demo, no slides", "El wow elegido en el triage"],
          ["Por qué nosotros", "Este equipo, este problema", "Una línea por persona, máximo"],
          ["Impacto futuro", "Hacia dónde va", "Abby Care: el mes 6 que no cabía en la hora 3"],
          ["CTA", "Qué piden", "Una sola cosa"],
        ].map(([p, q, r]) => [
          <span key="p" className="font-display text-[50px] font-bold leading-tight text-ember">
            {p}
          </span>,
          <span key="q" className="font-display text-[40px] leading-snug">
            {q}
          </span>,
          <span key="r" className="text-[34px] leading-snug text-muted-foreground">
            {r}
          </span>,
        ])}
      />
    </Stage>
  </Shell>
);

const WhoPitches = () => (
  <Shell>
    <Stage gap="gap-10">
      <RevealItem>
        <Headline size={100}>
          Quién pitchea es una decisión de <span className="text-ember">liderazgo.</span>
        </Headline>
      </RevealItem>
      <RevealStack className="grid grid-cols-3 gap-5">
        {["El mejor orador", "Quien más lo necesita", "1 o 2 personas. No más."].map((t) => (
          <RevealItem key={t} className="h-full">
            <DeckCard className="flex h-full items-center px-7 py-8">
              <span className="font-display text-[40px] font-bold leading-tight">{t}</span>
            </DeckCard>
          </RevealItem>
        ))}
      </RevealStack>
      <RevealItem>
        <Sub>
          Yo cedí el pitch muchas veces para que otros se animaran. No todo es ganar esa hack.
        </Sub>
      </RevealItem>
    </Stage>
  </Shell>
);

const Practice = () => (
  <Shell>
    <Stage>
      <RevealItem>
        <Eyebrow>Practicar</Eyebrow>
      </RevealItem>
      <RevealItem>
        <Headline size={124}>
          <span className="text-ember">3 veces</span> antes de las 18:00.
        </Headline>
      </RevealItem>
      <RevealItem>
        <Sub>En voz alta, con cronómetro.</Sub>
      </RevealItem>
    </Stage>
  </Shell>
);

const NextTimeSpeak = () => (
  <Statement size={150}>
    La próxima vez,
    <br />
    hablen.
  </Statement>
);

/* ------------------------------------------------------------------ */
/* Block 7 · Cierre                                                   */
/* ------------------------------------------------------------------ */

const DividerCierre = () => (
  <Divider num="7" title="Cierre" time="1:10 · 5 min" anchor="“9:05, primer commit: AGENTS.md”" />
);

const EnvYesRepoNo = () => (
  <Shell>
    <Stage gap="gap-8">
      <RevealItem>
        <Headline size={80}>
          Entorno <span className="text-ember">sí.</span> Repo{" "}
          <span className="text-ember">no.</span>
        </Headline>
      </RevealItem>
      <RevealStack className="grid grid-cols-2 gap-6">
        <RevealItem className="h-full">
          <DeckCard className="flex h-full flex-col gap-5 px-8 py-8">
            <div className="font-mono text-[28px] uppercase tracking-[0.2em] text-muted-foreground">
              Antes del sábado · permitido
            </div>
            <div>
              <div className="font-display text-[52px] font-bold text-ember">Entorno</div>
              <div className="text-[34px] leading-snug">
                Cuentas (Supabase, Grok Bot, Cursor), créditos, MCP, Gentle AI / Engram, skills
                globales
              </div>
            </div>
            <div>
              <div className="font-display text-[52px] font-bold text-ember">Cabeza</div>
              <div className="text-[34px] leading-snug">
                Filtro de ideas, plantilla de pitch, esqueleto de AGENTS.md de memoria
              </div>
            </div>
          </DeckCard>
        </RevealItem>
        <RevealItem className="h-full">
          <DeckCard accent className="flex h-full flex-col gap-5 px-8 py-8">
            <div className="font-mono text-[28px] uppercase tracking-[0.2em] text-ember">
              Desde las 9:00 · cero
            </div>
            <div>
              <div className="font-display text-[52px] font-bold">El repo</div>
              <div className="text-[34px] leading-snug">AGENTS.md, spec, código</div>
            </div>
            <div>
              <div className="font-display text-[52px] font-bold">Lo específico</div>
              <div className="text-[34px] leading-snug">Todo lo del proyecto</div>
            </div>
          </DeckCard>
        </RevealItem>
      </RevealStack>
    </Stage>
  </Shell>
);

const WeekChecklist = () => (
  <Shell>
    <div className="flex min-h-0 flex-1 items-center gap-16">
      <RevealStack className="flex flex-1 flex-col gap-8">
        <RevealItem>
          <Eyebrow>El QR · para la semana</Eyebrow>
        </RevealItem>
        <RevealItem>
          <Headline size={80}>Checklist y template.</Headline>
        </RevealItem>
        <RevealStack className="flex flex-col gap-3">
          {[
            "Instalar Gentle AI",
            "Probar Engram y SDD en cualquier repo",
            "Crear las cuentas",
            "Conocer a su equipo",
            "Cargar el template del Grok Bot",
          ].map((t) => (
            <RevealItem key={t}>
              <div className="flex items-baseline gap-5">
                <span aria-hidden className="font-mono text-[40px] text-ember">
                  □
                </span>
                <span className="font-display text-[44px] font-bold leading-tight">{t}</span>
              </div>
            </RevealItem>
          ))}
        </RevealStack>
      </RevealStack>
      <QrSlot size={440} />
    </div>
  </Shell>
);

const FirstCommit = () => (
  <Statement size={150}>
    9:05,
    <br />
    primer commit: AGENTS.md.
  </Statement>
);

const ArcClose = () => (
  <Shell>
    <Stage gap="gap-12">
      <RevealItem>
        <Sub className="max-w-[1500px]">
          Hoy pitcheo a sponsors en <Em>ETHGlobal</Em>, streameo en <Em>Builders Off The Record</Em>{" "}
          y estoy acá.
        </Sub>
      </RevealItem>
      <RevealItem>
        <Headline size={140}>
          Ustedes empiezan <span className="text-ember">el sábado.</span>
        </Headline>
      </RevealItem>
    </Stage>
  </Shell>
);

const FinalScreen = () => (
  <Shell>
    <div className="flex min-h-0 flex-1 items-center gap-16">
      <RevealStack className="flex flex-1 flex-col gap-10">
        <RevealItem>
          <Headline size={150}>Preguntas.</Headline>
        </RevealItem>
        <RevealItem>
          <Sub>¿Qué idea pasamos por el filtro de 5?</Sub>
        </RevealItem>
        <RevealItem>
          <div className="font-mono text-[40px] tracking-wide text-muted-foreground">
            Alejandro Repetto
          </div>
        </RevealItem>
        <RevealItem>
          <NexaChivo />
        </RevealItem>
      </RevealStack>
      <QrSlot size={440} />
    </div>
  </Shell>
);

/* ------------------------------------------------------------------ */
/* Slide registry (notes: what to say + clip lines + timing)          */
/* ------------------------------------------------------------------ */

export const slidesHackathonCrashCourse: SlideDefBase[] = [
  // Block 0
  {
    id: "hk-cover",
    title: "Portada",
    Component: Cover,
    notes:
      "0:00 · Bloque 0, 3 min. Crash course 101, charla + demo, sin hands-on. Cada bloque cierra con transición y una línea 'si falta tiempo, cortá'. Lente de toda la charla: ¿qué se ve en los 3 minutos de demo?",
  },
  {
    id: "hk-arc-open",
    title: "Apertura: el arco",
    Component: OpeningArc,
    notes:
      "0:00 · Decir: 'En mi primera hack no hablé. Le dejé el pitch a un profe.' Pausa. 🎬 Frase de apertura: NO se corta nunca, el cierre depende de ella. 'Hoy les cuento lo que me hubiera gustado saber antes de esa hack.'",
  },
  {
    id: "hk-promise",
    title: "Qué van a ver",
    Component: Agenda,
    notes:
      "0:01 · 'No es un curso de programación. Es cómo elegir una idea, cómo matarla a tiempo, cómo construir con agentes sin perder el hilo y cómo contar lo que hicieron.' Pregunta a la sala (se corta si falta tiempo): ¿quién ya fue a una hackathon? ¿quién va por primera vez?",
  },
  {
    id: "hk-tone",
    title: "El tono",
    Component: Tone,
    notes:
      "0:02 · Charla para primerizos, pero el tono es competitivo. 'La idea no es participar. Es terminar, y que se vea.' Transición: 'Arranco por lo que más me costó: la cabeza.'",
  },
  // Block 1
  {
    id: "hk-b1",
    title: "1 · Mentalidad",
    Component: DividerMentalidad,
    notes:
      "0:03 · Bloque 1, 10 min. Ancla: Abby Care + mi hack sin terminar. Mínimo si falta tiempo: high agency, qué es una hack, Abby Care y terminar sí o sí. Pendiente: si hay criterios del jurado de HackaTwin, entran acá después de 'qué es una hack'.",
  },
  {
    id: "hk-high-agency",
    title: "High agency",
    Component: HighAgency,
    notes:
      "1 min · 'El principio que ordena todo es high agency. Nadie te va a asignar tareas ni a avisarte que vas mal. Si algo se traba, lo destrabás vos o no se destraba.' 🎬 'Nadie te va a decir qué hacer el sábado.'",
  },
  {
    id: "hk-what-hack",
    title: "Qué es una hack",
    Component: WhatIsAHack,
    notes:
      "1 min · 'Una hack son 12 horas, un jurado y 3 minutos. Gana la mejor demo contada. No gana el mejor código ni la idea más ambiciosa: gana lo que el jurado entiende y ve funcionando en tres minutos.' 🎬 'Una hack son 12 horas, un jurado y 3 minutos.'",
  },
  {
    id: "hk-people",
    title: "El premio es la gente",
    Component: PeoplePrize,
    notes:
      "1 min · Cortable. 'El premio real es la gente: mentores, sponsors y jurado. Vayan con intención: elijan con quién quieren hablar y qué le van a preguntar.'",
  },
  {
    id: "hk-sale",
    title: "La vida es una venta",
    Component: LifeIsASale,
    notes:
      "1 min · 'El pitch no es un trámite de la hackathon, es una habilidad para siempre: conseguir un trabajo, un cliente, una inversión, que alguien te preste atención. Una hack es el lugar más barato para practicarla.' 🎬 'La vida es una venta.'",
  },
  {
    id: "hk-ownership",
    title: "Ownership",
    Component: Ownership,
    notes:
      "1 min · Cortable. 'No armen roles fijos tipo vos hacés el front, vos el back. Todos tocan todo, pero cada tarea tiene un dueño. El reparto sale de fortalezas y debilidades, y eso se habla el primer día, no a las 15:00.'",
  },
  {
    id: "hk-abby",
    title: "Abby Care",
    Component: AbbyCare,
    notes:
      "4 min (con las dos historias) · Historia de un amigo de Ale. 'Tuvieron la idea de Abby Care y la perdieron discutiendo la certificación y cómo llamar a los médicos. Hoy vale 225 millones de dólares.' Fuente: Forbes Uruguay (post de LinkedIn de @forbesuruguay). Sin insultos hacia los compañeros de la historia: contar la decisión, no el defecto de la persona.",
  },
  {
    id: "hk-month6",
    title: "Mes 6, no hora 3",
    Component: MonthSix,
    notes:
      "Matiz clave: la certificación SÍ es parte del modelo de Abby Care. Importaba, pero en el mes 6, no en la hora 3. 🎬 'Importaba en el mes 6, no en la hora 3.' Todo lo que no se ve en el demo es para después. Este mes 6 vuelve en la tabla del pitch (impacto futuro).",
  },
  {
    id: "hk-own-hack",
    title: "Mi hack sin terminar",
    Component: OwnHack,
    notes:
      "'Yo también lo hice. En una hack mía estiré la diplomacia para no ser el dictador del equipo. Perdí tiempo y el proyecto quedó sin terminar.' Contar la decisión, no culpar a nadie del equipo.",
  },
  {
    id: "hk-contrast-tip",
    title: "Contraste y tip",
    Component: ContrastTip,
    notes:
      "'Ahora, otras veces la diplomacia sí funcionó. No hay regla. Depende del instinto, de la gente y de cuánto falta para las 18:00.' Tip opcional (cortable), no regla: timebox a las discusiones. Si no se cierra en un rato fijo, decide el dueño de esa tarea y se sigue.",
  },
  {
    id: "hk-empathy",
    title: "Empatía sí, freeze no",
    Component: EmpathyNotFreeze,
    notes: "🎬 'Empatía sí, freeze no.' Pausa corta. Es el cierre de las dos historias.",
  },
  {
    id: "hk-finish",
    title: "Terminar sí o sí",
    Component: FinishIt,
    notes:
      "1 min · 'Algo feo que anda le gana a algo hermoso a medias. Todas las veces.' 🎬 'Algo feo que anda le gana a algo hermoso a medias.' Transición: 'Con esa cabeza, ¿cómo se elige qué construir? Y sobre todo: cómo se mata una idea.'",
  },
  // Block 2
  {
    id: "hk-b2",
    title: "2 · Elegir y triage",
    Component: DividerTriage,
    notes:
      "0:13 · Bloque 2, 12 min. Ancla: pivot por la doc del sponsor. Lente transversal (se repite en 2, 5 y 6): ¿qué se ve en los 3 minutos de demo? Si falta tiempo, cortá el brainstorm; mínimo: filtro de 5 + triage.",
  },
  {
    id: "hk-brainstorm",
    title: "Brainstorm",
    Component: Brainstorm,
    notes:
      "2 min · Cortable. 'Primero cantidad, después calidad. Mucha idea mala sobre la mesa, sin juzgar. Y usen al bot: que les tire variantes y haga research mientras ustedes discuten.'",
  },
  {
    id: "hk-kill",
    title: "Matar ideas",
    Component: KillThem,
    notes:
      "2 min · Cuatro tipos mueren rápido: las muy comunes (el jurado ya las vio diez veces), las que no cierran (sin flujo completo), las sin mercado, y el Frankenstein por sponsors (pegarle tres tracks a una idea solo por la plata). Ojo: multi-track coherente es maximizar premios, y es válido. 🎬 'Matar una idea a las 10:00 sale barato. A las 15:00 sale carísimo.' (frase de redacción nueva; Ale puede reemplazarla por una propia).",
  },
  {
    id: "hk-filter",
    title: "Filtro de 5",
    Component: FilterOfFive,
    notes:
      "4 min · Recorrer la tabla una por una con una frase. 'Si una idea falla una sola, no la hagan.' '¿Se ve?' es la pregunta del jurado. Ojo con '¿se termina?': son 12 horas, pero ~6 de código real; el resto es setup, comer, pitch y cosas que salen mal. Multi-track coherente es válido; track pegado por el premio, no.",
  },
  {
    id: "hk-lens",
    title: "La lente del jurado",
    Component: LensDemo,
    notes:
      "🎬 '¿Qué se ve en los 3 minutos de demo?' Esta es la lente transversal: atraviesa la elección, el triage, la demo y cierra en el pitch. Repetirla en bloques 5 y 6.",
  },
  {
    id: "hk-pivot",
    title: "Historia: el pivot",
    Component: PivotStory,
    notes:
      "2 min · 'Una vez, a mitad de una hack, tuvimos que pivotear porque el sponsor no tenía documentación de lo que necesitábamos. Cambiamos de idea en el medio. Y salió excelente igual.' Lección = cuarta pregunta del filtro (¿sobrevive?). 🎬 'Elegí ideas que sobrevivan a que algo se rompa.'",
  },
  {
    id: "hk-matrix",
    title: "Matriz visibilidad × riesgo",
    Component: TriageMatrix,
    notes:
      "2 min · Dibujar/mostrar la 2×2. 'Dos ejes: cuánto se ve y cuánto riesgo tiene. Primero lo visible y seguro. Lo visible y riesgoso, lo atacan temprano. Lo que no se ve, se simplifica o se mockea.'",
  },
  {
    id: "hk-mock",
    title: "Mockear",
    Component: MockIt,
    notes:
      "🎬 'Lo que no se ve, se mockea. Y si el jurado pregunta, se dice.' Verdad ante el jurado: 'esto es un mock'. Transición: 'Todo esto lo puede hacer un bot con ustedes. Les muestro el mío.'",
  },
  // Block 3
  {
    id: "hk-b3",
    title: "3 · Grok Bot",
    Component: DividerGrok,
    notes:
      "0:25 · Bloque 3, 5 min. Ancla: puente a lo técnico. Fuera de alcance: cómo armar un bot desde cero (eso va al Grok Bot Meetup: 'eso es otro día'). Si falta tiempo, cortá el en vivo: solo tabla y QR.",
  },
  {
    id: "hk-grok-what",
    title: "Qué es Grok Bot",
    Component: GrokWhat,
    notes:
      "'Grok Bot son compañeros de equipo hechos con IA: tienen su propia computadora, su memoria, herramientas por MCP o API y un navegador. Y se pueden compartir como templates.'",
  },
  {
    id: "hk-bot-anatomy",
    title: "Anatomía del bot",
    Component: BotAnatomy,
    notes:
      "2 min · Mostrar el bot propio, una pieza por vez. Rol: Chief of Staff de hack. Instrucciones: filtro de 5, triage, plantilla de pitch, ownership. Herramientas: navegador, MCP/API. Memoria: decisiones del equipo. 🎬 'Rol, instrucciones, herramientas, memoria. Cuatro cosas.'",
  },
  {
    id: "hk-bot-live",
    title: "Bot en vivo",
    Component: BotLive,
    notes:
      "2 min · Pedirle una idea a la sala, elegir la más concreta. El bot hace research y la pasa por el filtro de 5; comentar en voz alta mientras corre. Si el bot tarda o falla: no esperar, mostrar la respuesta pregrabada o la captura del ensayo ('esto es lo que me devolvió ayer'). Cortable.",
  },
  {
    id: "hk-bot-bridge",
    title: "Puente: bot a repo",
    Component: BotBridge,
    notes:
      "1 min · Template por QR: filtro, triage y plantilla de pitch adentro; se carga en Grok Bot. Puente: 'lo que mostré es exactamente la misma anatomía que un agente de código. Solo cambia dónde vive: en vez de un bot, es tu repo.' 🎬 'Lo mismo que el bot, en tu repo.' Transición: 'Veamos el equivalente en el repo.'",
  },
  // Block 4
  {
    id: "hk-b4",
    title: "4 · Técnico",
    Component: DividerTecnico,
    notes:
      "0:30 · Bloque 4, 15 min. Siete conceptos, ~2 min cada uno: (1) qué es en una frase técnica, (2) la traducción para quien no es técnico, (3) por qué importa el sábado. Si falta tiempo, cortá skills y MCP. Mínimo: ventana, AGENTS.md, Engram y grafo (los que la demo necesita junto con AGENTS.md).",
  },
  {
    id: "hk-seven",
    title: "Siete conceptos",
    Component: SevenConcepts,
    notes:
      "Mapa del bloque, 20 seg. Dejar la tabla en pantalla y anunciar que cada concepto trae su traducción. No leerla toda: se desarma en las slides que siguen.",
  },
  {
    id: "hk-context",
    title: "Ventana de contexto",
    Component: ContextWindow,
    notes:
      "'El modelo tiene un límite de cuánto puede tener en la cabeza a la vez. Piénsenlo como un pizarrón que se borra: cuando se llena, lo viejo desaparece. A las 15:00, el chat ya no se acuerda de lo que decidieron a las 9:00.' 🎬 'El chat se olvida. El repo no.'",
  },
  {
    id: "hk-agents",
    title: "AGENTS.md",
    Component: AgentsMd,
    notes:
      "'Archivo en la raíz del repo con las instrucciones para cualquier agente: qué es el proyecto, cómo se trabaja, qué no se toca, cómo se verifica. Es lo mismo que las instrucciones del bot, pero vive en el repo. Por eso es lo primero del sábado.'",
  },
  {
    id: "hk-spec",
    title: "Spec de 1 página",
    Component: OnePageSpec,
    notes:
      "'Una spec de una página es el guion de la demo escrito como contrato: qué se tiene que ver en los 3 minutos, qué queda afuera.' Sigue el contraste de NovaBank.",
  },
  {
    id: "hk-novabank",
    title: "NovaBank vs versión hack",
    Component: NovaBank,
    notes:
      "10 seg · Contraste. 'En una empresa como NovaBank la cadena es: PRD, tickets, spec, PR, review. Cinco pasos con cinco personas. En una hack es una página, escrita en diez minutos, que dice qué se ve en la demo. Mismo principio, versión hack.'",
  },
  {
    id: "hk-skills",
    title: "Skills",
    Component: Skills,
    notes:
      "Cortable. 'Una skill es una receta que el agente carga solo cuando la tarea matchea. En vez de pegar el mismo prompt veinte veces, la receta se carga sola.'",
  },
  {
    id: "hk-mcp",
    title: "MCP",
    Component: Mcp,
    notes:
      "Cortable (se ve igual en la demo con Supabase). 'MCP es el USB de las herramientas: un estándar para enchufarle herramientas al agente. Con el MCP de Supabase, el agente toca la base directo en vez de que vos copies y pegues SQL.'",
  },
  {
    id: "hk-engram",
    title: "Engram",
    Component: EngramConcept,
    notes:
      "'Engram es la memoria entre chats. El agente guarda decisiones, bugs y descubrimientos, y en un chat nuevo las busca. No es magia: es un almacén de notas al que el agente escribe y lee por MCP.' Ojo: acá explico cómo funciona; cómo se instala lo vemos en la demo. Son dos cosas distintas. 🎬 'Las decisiones sobreviven al chat.'",
  },
  {
    id: "hk-graph",
    title: "Grafo de código",
    Component: CodeGraph,
    notes:
      "'El grafo es el mapa del repo: qué funciones existen, quién llama a quién. Sin mapa, el agente lee archivo por archivo. Con mapa, navega. A la hora 8, con el repo ya grande, la diferencia es entre que el agente tarde un minuto o que se pierda.' Transición: 'Ahora lo veo funcionar sobre un repo real: Somos Huella, un proyecto humanitario.'",
  },
  // Block 5
  {
    id: "hk-b5",
    title: "5 · Demo en vivo",
    Component: DividerDemo,
    notes:
      "0:45 · Bloque 5, 15 min. La demo corre fuera del deck. Detalle de comandos y plan B: instructor-demos/hackathon-somos-huella-runbook.md. Dos repos: Repo 2 en vivo (clon limpio) y Repo 1 pre-hecho = salvavidas. Reloj: 0:45 instalar Gentle AI (2) · 0:47 grafo (2) · 0:49 SDD proposal con la sala (4) · 0:53 Supabase / Select 26 (5) · 0:58 Engram recuerda (2). CUIDADO EN PANTALLA: no abrir frontend/.env.local con el proyector; para la búsqueda usar /ejemplos (datos de prueba).",
  },
  {
    id: "hk-demo-feature",
    title: "La feature",
    Component: DemoFeature,
    notes:
      "Antes de lanzar /sdd-new: 'Es un proyecto humanitario: familias que buscan a un ser querido. La feature: Supabase pgvector como índice alternativo de búsqueda, sin migrar datos.' Regla de espera: si el agente responde a tiempo, se espera y se comenta; si falla o tarda, se pasa al Repo 1 ('esto salió ayer con el mismo comando'). Supabase / Select 26: NO decir ningún anuncio hasta verificarlo contra el blog oficial.",
  },
  {
    id: "hk-left-out",
    title: "¿Qué queda afuera?",
    Component: WhatIsLeftOut,
    notes:
      "0:49 · Cuando salga la proposal, ponerla en pantalla. 'Esta es la parte donde ustedes opinan: lo que no se ve en el demo, ¿qué le sacamos?' Tomar 2 o 3 respuestas y pedirle al agente que las incorpore al scope. 🎬 '¿Qué queda afuera? La spec es lo que NO hacés.'",
  },
  {
    id: "hk-back",
    title: "De vuelta a las slides",
    Component: BackFromDemo,
    notes:
      "1:00 · Después del chat nuevo donde Engram recuerda ('No le expliqué nada. Lo recordó.' 🎬). Transición: 'Ya tienen la idea, el mapa y la spec. Falta lo que decide la hackathon: contarlo.'",
  },
  // Block 6
  {
    id: "hk-b6",
    title: "6 · Pitch",
    Component: DividerPitch,
    notes:
      "1:00 · Bloque 6, 10 min. Ancla: callback del arco. Lente: ¿qué se ve en los 3 minutos? Si falta tiempo, cortá 'practicar' y reducí 'quién pitchea' a una frase. Mínimo: tabla de las 5 partes + callback.",
  },
  {
    id: "hk-pitch-table",
    title: "Las 5 partes",
    Component: PitchTable,
    notes:
      "4 min · 'Pitch de 3 minutos, cinco partes. Fíjense que no hay slides en el medio.' Problema: una persona concreta, ~20 seg. Solución: la demo, el wow del triage. Por qué nosotros: una línea por persona. Impacto: el mes 6 de Abby Care que no cabía en la hora 3. CTA: una sola cosa. 🎬 'El impacto futuro es el mes 6 que no cabía en la hora 3.'",
  },
  {
    id: "hk-who-pitches",
    title: "Quién pitchea",
    Component: WhoPitches,
    notes:
      "3 min · 'Quién pitchea es una decisión de liderazgo. Estilos: el mejor orador, quien más lo necesita, o una o dos personas. No más. Yo cedí el pitch muchas veces para que otros se animaran. No todo es ganar esa hack.' 🎬 'Quién pitchea es una decisión de liderazgo.'",
  },
  {
    id: "hk-practice",
    title: "Practicar",
    Component: Practice,
    notes:
      "2 min · Cortable (decirlo en una frase en el cierre). 'Practíquenlo tres veces antes de las 18:00. En voz alta, con cronómetro.'",
  },
  {
    id: "hk-next-time",
    title: "Callback: hablen",
    Component: NextTimeSpeak,
    notes:
      "1 min · Cierra el arco: 'En mi primera hack no hablé. Le dejé el pitch a un profe. Si tengo que elegir una sola cosa para que se lleven hoy: la próxima vez, hablen.' Transición: 'Cierro con lo concreto: qué se puede hacer antes del sábado y qué no.'",
  },
  // Block 7
  {
    id: "hk-b7",
    title: "7 · Cierre",
    Component: DividerCierre,
    notes:
      "1:10 · Bloque 7, 5 min. Ancla: '9:05, primer commit: AGENTS.md.' Nunca cortar el 9:05 ni el cierre del arco. La regla de HackaTwin (entorno sí / repo no) se dice SIEMPRE, también en los recortes de 45 y 60.",
  },
  {
    id: "hk-env",
    title: "Entorno sí, repo no",
    Component: EnvYesRepoNo,
    notes:
      "2 min · 'En HackaTwin no se permite traer nada armado del proyecto. Preparás el entorno y la cabeza, pero no el repo. Hasta las 9:00 el repo no existe.' PENDIENTE: confirmar con Cande que el entorno personal cuenta como tooling permitido; hasta confirmar, decir 'pregúntenle a los organizadores' en lugar de afirmarlo.",
  },
  {
    id: "hk-qr",
    title: "El QR de la semana",
    Component: WeekChecklist,
    notes:
      "1 min · Cortable (el QR queda en pantalla, no se lee). 'El QR tiene el checklist de la semana: instalar Gentle AI, probar Engram y SDD en cualquier repo, crear las cuentas, conocer a su equipo. Y el template del Grok Bot.' Antes de la charla: completar CHECKLIST_URL en deck-hackathon-crash-course.tsx para que el slot muestre la URL.",
  },
  {
    id: "hk-first-commit",
    title: "9:05, primer commit",
    Component: FirstCommit,
    notes:
      "1 min · 'El sábado, 9:05, primer commit: AGENTS.md. Antes de escribir una línea de código.' 🎬 '9:05, primer commit: AGENTS.md.' Nunca cortar.",
  },
  {
    id: "hk-arc-close",
    title: "Cierre del arco",
    Component: ArcClose,
    notes:
      "1 min · 'Hoy pitcheo a sponsors en ETHGlobal, streameo en Builders Off The Record y estoy acá. Ustedes empiezan el sábado.' 🎬 'Ustedes empiezan el sábado.' Nunca cortar.",
  },
  {
    id: "hk-final",
    title: "Preguntas",
    Component: FinalScreen,
    notes:
      "1:15 – 1:20 · Preguntas, 5 min. Pantalla final: chivo NEXA + QR. Si no hay preguntas: '¿Qué idea de hack les gustaría pasar por el filtro de 5?' y correr una en vivo con el bot.",
  },
];
