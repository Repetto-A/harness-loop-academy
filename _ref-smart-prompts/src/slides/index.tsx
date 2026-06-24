import type React from "react";
import { SlideShell } from "@/components/SlideShell";
import { CodeBlock } from "@/components/CodeBlock";

export interface SlideDef {
  id: string;
  title: string;
  notes: string;
  Component: () => React.ReactElement;
}

const Cover = () => (
  <SlideShell noChrome>
    <div className="flex flex-col h-full justify-between">
      <div />
      <div>
        <div className="font-mono text-lg text-ember mb-8 uppercase tracking-[0.3em]">
          IA bien usada
        </div>
        <h1 className="font-display text-7xl font-bold leading-[0.95]">
          De prompts sueltos
          <br />
          a <span className="text-ember">workflows inteligentes</span>.
        </h1>
        <p className="mt-12 text-2xl text-muted-foreground max-w-[1400px]">
          Un buen input logra un buen output. Hablemos de contexto, reglas,
          memoria y cómo dirigir a la IA en serio.
        </p>
      </div>
      <div />
    </div>
  </SlideShell>
);

const Thesis = () => (
  <SlideShell block="B01" eyebrow="Tesis" bg="ember">
    <div className="flex-1 flex flex-col justify-center">
      <p className="font-mono text-xl mb-8 opacity-70">la idea de toda la charla:</p>
      <h2 className="font-display text-8xl font-bold leading-[0.95]">
        Un buen input
        <br />
        logra un buen output.
      </h2>
      <p className="mt-16 text-3xl max-w-[1400px] opacity-80">
        No es magia. No es un truco de "prompt engineering". Es comunicarse mejor.
      </p>
    </div>
  </SlideShell>
);

const NoMagic = () => (
  <SlideShell block="B02" eyebrow="Intro">
    <h2 className="font-display text-6xl font-bold mb-16">
      El modelo <span className="text-ember">no hace magia.</span>
    </h2>
    <div className="grid grid-cols-2 gap-16 mt-8 max-w-[1500px]">
      <div>
        <p className="text-2xl text-muted-foreground leading-relaxed">
          Hoy todos corremos atrás del último modelo: más parámetros,
          más contexto, salió ayer, promete razonar mejor, escribir mejor,
          hacerte una startup mientras dormís.
        </p>
      </div>
      <div className="border-l-4 border-ember pl-10">
        <p className="text-3xl font-display leading-tight">
          Pero antes de correr atrás del último modelo, hay una habilidad
          más básica: <span className="text-ember">aprender a comunicarse bien con la IA.</span>
        </p>
        <p className="mt-10 text-xl text-muted-foreground italic">
          No tiene sentido usar el modelo más inteligente del mundo si le
          explicamos el problema como un audio de WhatsApp a las 2 AM.
        </p>
      </div>
    </div>
  </SlideShell>
);

const AskAudience = () => (
  <SlideShell block="B03" eyebrow="Pregunta al público">
    <h2 className="font-display text-5xl font-bold mb-12">
      ¿Qué tiene que tener un buen mensaje
      <br />
      para pedirle algo a una IA?
    </h2>
    <div className="grid grid-cols-[1.2fr_1fr] gap-16 items-center mt-8">
      <CodeBlock label="prompt típico">{`Quiero que me ayudes a hacer tal cosa.`}</CodeBlock>
      <div>
        <p className="font-mono text-base uppercase tracking-[0.3em] text-ember mb-6">
          ¿qué le falta?
        </p>
        <ul className="text-2xl space-y-3 text-muted-foreground">
          <li>· contexto</li>
          <li>· objetivo</li>
          <li>· para quién es</li>
          <li>· qué formato</li>
          <li>· qué evitar</li>
          <li>· ejemplos</li>
          <li>· qué significa "bien hecho"</li>
        </ul>
      </div>
    </div>
  </SlideShell>
);

const PromptEngNoHumo = () => (
  <SlideShell block="B04" eyebrow="Bajado a tierra">
    <h2 className="font-display text-6xl font-bold mb-12">
      Prompt engineering, <span className="text-ember">sin humo.</span>
    </h2>
    <p className="text-3xl text-muted-foreground mb-16 max-w-[1500px]">
      No es magia. Es aprender a dar contexto.
    </p>
    <div className="grid grid-cols-3 gap-8 mt-8">
      {[
        ["qué", "queremos que haga"],
        ["por qué", "lo queremos"],
        ["con qué", "información trabaja"],
        ["qué reglas", "respeta"],
        ["cómo", "lo entrega"],
        ["cómo evaluamos", "si está bien"],
      ].map(([k, v]) => (
        <div key={k} className="bg-surface border border-border rounded-lg p-8">
          <div className="font-mono text-base text-ember uppercase tracking-widest mb-3">{k}</div>
          <div className="font-display text-2xl">{v}</div>
        </div>
      ))}
    </div>
    <p className="mt-12 text-xl text-muted-foreground italic">
      Y sí, también podemos pedirle que no cometa errores… pero eso no
      funciona así. Si funcionara, ya estaríamos todos jubilados.
    </p>
  </SlideShell>
);

const NoMindReader = () => (
  <SlideShell block="B05" eyebrow="Compañero especial">
    <h2 className="font-display text-6xl font-bold mb-16">
      La IA <span className="text-ember">no lee tu mente.</span>
    </h2>
    <div className="grid grid-cols-2 gap-16 max-w-[1600px]">
      <div>
        <p className="text-2xl text-muted-foreground leading-relaxed">
          Pensala como un compañero de laburo muy capaz, pero bastante especial.
          Necesita que le expliques cosas que para vos son obvias.
        </p>
        <p className="mt-8 text-2xl text-foreground font-display">
          Hasta que el agua moja, decíselo.
        </p>
      </div>
      <ul className="space-y-6 text-2xl">
        {[
          "no conoce tu objetivo real",
          "no sabe tus restricciones",
          "no entiende tu estándar de calidad",
          "si no le das contexto, inventa",
        ].map((t) => (
          <li key={t} className="flex gap-5">
            <span className="text-ember font-mono">×</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  </SlideShell>
);

const Anatomy = () => {
  const parts = [
    ["Tarea", "qué hacer"],
    ["Objetivo", "para qué"],
    ["Contexto", "situación"],
    ["Referencias", "links, archivos"],
    ["Reglas", "qué sí y qué no"],
    ["Formato", "cómo entregar"],
    ["Proceso", "pasos"],
    ["Criterios de éxito", "cómo evaluar"],
    ["Modo de error", "qué hacer si falta info"],
  ];
  return (
    <SlideShell block="B06" eyebrow="Anatomía">
      <h2 className="font-display text-6xl font-bold mb-12">
        Anatomía de un <span className="text-ember">buen prompt.</span>
      </h2>
      <div className="grid grid-cols-3 gap-6 mt-8">
        {parts.map(([k, v], i) => (
          <div
            key={k}
            className="bg-surface border border-border rounded-lg p-8 relative"
          >
            <div className="absolute top-4 right-5 font-mono text-base text-ember/60">
              0{i + 1}
            </div>
            <div className="font-display text-3xl font-bold mb-3">{k}</div>
            <div className="text-lg text-muted-foreground">{v}</div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
};

const PromptBad = () => (
  <SlideShell block="B07" eyebrow="Ejemplo malo">
    <h2 className="font-display text-5xl font-bold mb-12">
      Mismo modelo, <span className="text-ember">distinto contexto.</span>
    </h2>
    <p className="text-2xl text-muted-foreground mb-10">Empecemos por el típico:</p>
    <CodeBlock label="prompt malo" tone="bad" className="max-w-[1400px]">
      {`Haceme una presentación sobre IA.`}
    </CodeBlock>
    <p className="mt-12 text-xl text-muted-foreground italic">
      Va a salir cualquier cosa. Y la culpa no es del modelo.
    </p>
  </SlideShell>
);

const PromptGood = () => (
  <SlideShell block="B07" eyebrow="Ejemplo mejorado">
    <h2 className="font-display text-4xl font-bold mb-8">
      El mismo pedido, <span className="text-ember">con contexto.</span>
    </h2>
    <CodeBlock label="prompt mejorado" tone="good" className="max-w-[1500px]">
{`# Tarea
Ayudame a armar una presentación sobre el uso correcto de IA.

# Objetivo
Charla para estudiantes y semi técnicos. Quiero que aprendan a usar
mejor ChatGPT, Claude o Cursor.

# Contexto
Charla introductoria. Nada de paper ni venta de curso. Práctica,
cercana, con ejemplos.

# Audiencia
Personas que usan IA pero no estructuran bien sus pedidos.

# Reglas
- evitá tecnicismos innecesarios
- ejemplos bajados a tierra
- tono directo, con humor liviano
- no vendas humo

# Formato
Outline de slides: título + idea central + ejemplo verbal por slide.

# Proceso
Primero proponé la estructura. No diseñes las slides todavía.`}
    </CodeBlock>
  </SlideShell>
);

const ContextWindow = () => (
  <SlideShell block="B08" eyebrow="Ventana de contexto">
    <h2 className="font-display text-6xl font-bold mb-12">
      La ventana de contexto
      <br />
      es como una <span className="text-ember">mesa.</span>
    </h2>
    <div className="grid grid-cols-3 gap-10 mt-12">
      {[
        { t: "mesa vacía", d: "no tiene info suficiente.", emoji: "▢" },
        { t: "mesa ordenada", d: "lo justo, bien puesto.", emoji: "▣" },
        { t: "mesa explotada", d: "ruido, pierde foco.", emoji: "▦" },
      ].map((c, i) => (
        <div
          key={c.t}
          className={`p-10 rounded-lg border-2 ${
            i === 1 ? "border-ember bg-ember/10" : "border-border bg-surface"
          }`}
        >
          <div className={`text-7xl mb-6 ${i === 1 ? "text-ember" : "text-muted-foreground"}`}>
            {c.emoji}
          </div>
          <div className="font-display text-3xl font-bold mb-3">{c.t}</div>
          <div className="text-xl text-muted-foreground">{c.d}</div>
        </div>
      ))}
    </div>
    <p className="mt-16 text-2xl">
      El objetivo no es darle <span className="line-through text-muted-foreground">mucho</span>{" "}
      contexto. Es darle <span className="text-ember font-bold">buen</span> contexto.
    </p>
  </SlideShell>
);

const ContextSignalNoise = () => (
  <SlideShell block="B09" eyebrow="Señal vs ruido">
    <h2 className="font-display text-5xl font-bold mb-16">
      Más contexto <span className="text-ember">no siempre es mejor.</span>
    </h2>
    <div className="grid grid-cols-2 gap-16 mb-16">
      <div className="bg-surface border border-border rounded-lg p-10">
        <div className="font-mono text-base uppercase tracking-widest text-ember mb-4">señal</div>
        <p className="text-3xl font-display">información que cambia la respuesta.</p>
      </div>
      <div className="bg-surface border border-border rounded-lg p-10">
        <div className="font-mono text-base uppercase tracking-widest text-muted-foreground mb-4">
          ruido
        </div>
        <p className="text-3xl font-display text-muted-foreground">
          el resto. <span className="italic">Ruido con autoestima.</span>
        </p>
      </div>
    </div>
    <CodeBlock label="ejemplo de filtrado" tone="good">
{`Te paso este documento.
Leé especialmente la sección 3.
Ignorá la parte histórica.
Necesito decidir entre las opciones A y B.
Comparalas por costo, dificultad y riesgo.`}
    </CodeBlock>
  </SlideShell>
);

const MetaPrompt = () => (
  <SlideShell block="B10" eyebrow="Meta prompting">
    <h2 className="font-display text-5xl font-bold mb-6">
      La IA también puede <span className="text-ember">revisar el pedido.</span>
    </h2>
    <p className="text-2xl text-muted-foreground mb-12">
      Usar prompts para mejorar prompts, criterios y respuestas.
    </p>
    <div className="grid grid-cols-3 gap-6">
      <CodeBlock label="autocrítica" tone="good">
{`Criticá tu propia respuesta.
Marcá supuestos débiles.
Decime qué podría estar mal.
Proponé una versión mejor.`}
      </CodeBlock>
      <CodeBlock label="mejorar el prompt" tone="good">
{`Antes de responder,
ayudame a mejorar este prompt.
Decime qué falta, qué es ambiguo
y qué debería agregar.`}
      </CodeBlock>
      <CodeBlock label="reviewer" tone="good">
{`Actuá como reviewer.
Buscá inconsistencias, riesgos
y partes incompletas.
No me des la razón si no corresponde.`}
      </CodeBlock>
    </div>
  </SlideShell>
);

const PromptToSystem = () => (
  <SlideShell block="B11" eyebrow="De prompt a sistema">
    <h2 className="font-display text-5xl font-bold mb-12">
      De prompt suelto a <span className="text-ember">sistema de trabajo.</span>
    </h2>
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b-2 border-ember">
          <th className="font-mono text-base uppercase tracking-widest text-ember pb-4">parte</th>
          <th className="font-mono text-base uppercase tracking-widest text-ember pb-4">dónde va</th>
          <th className="font-mono text-base uppercase tracking-widest text-ember pb-4">ejemplo</th>
        </tr>
      </thead>
      <tbody className="text-2xl">
        {[
          ["Estable", "CLAUDE.md / AGENTS.md", "reglas, stack, tono, estándares"],
          ["Dinámico", "prompt actual", "tarea concreta de hoy"],
          ["Reutilizable", "skills / templates", "procesos repetibles"],
          ["Memoria", "memory.md", "estado, decisiones, pendientes"],
        ].map(([a, b, c]) => (
          <tr key={a} className="border-b border-border">
            <td className="py-6 font-display font-bold">{a}</td>
            <td className="py-6 font-mono text-ember">{b}</td>
            <td className="py-6 text-muted-foreground">{c}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </SlideShell>
);

const FilesPersistent = () => (
  <SlideShell block="B12" eyebrow="Archivos persistentes">
    <h2 className="font-display text-5xl font-bold mb-12">
      No expliques todo <span className="text-ember">de cero cada vez.</span>
    </h2>
    <div className="grid grid-cols-[1.2fr_1fr] gap-16 items-start">
      <CodeBlock label="estructura del proyecto">
{`project/
  CLAUDE.md          ← reglas, stack, tono
  AGENTS.md          ← cómo trabajan los agentes
  memory.md          ← estado actual, decisiones
  docs/
    current-state.md
    decisions.md
    roadmap.md
  skills/
    frontend-review/
      SKILL.md
    code-review/
      SKILL.md
    product-strategy/
      SKILL.md`}
      </CodeBlock>
      <div>
        <p className="text-3xl font-display mb-8 leading-tight">
          Si es <span className="text-ember">importante</span> y se{" "}
          <span className="text-ember">repite</span>, documentalo.
        </p>
        <p className="text-xl text-muted-foreground">
          El prompt es el pedido de hoy. La memoria es la bitácora. Las
          reglas son el manual del equipo.
        </p>
      </div>
    </div>
  </SlideShell>
);

const ClaudeMd = () => (
  <SlideShell block="B12" eyebrow="Ejemplo CLAUDE.md / AGENTS.md">
    <h2 className="font-display text-4xl font-bold mb-8">
      Reglas que <span className="text-ember">no querés repetir</span> en cada prompt.
    </h2>
    <CodeBlock label="CLAUDE.md" tone="good">
{`# Project Instructions

## Product
Plataforma para conectar comunidades tech, eventos y oportunidades.

## Stack
- Next.js · TypeScript · TailwindCSS · Supabase

## Rules
- No cambiar arquitectura sin explicarlo antes.
- No romper componentes existentes.
- Diseño limpio, moderno, responsive.
- Priorizar claridad sobre complejidad.

## Workflow
1. Analizar código existente.
2. Proponer plan corto.
3. Recién después modificar archivos.

## Output style
- Directo. Marcá supuestos. Explicá riesgos.`}
    </CodeBlock>
  </SlideShell>
);

const MemoryMd = () => (
  <SlideShell block="B13" eyebrow="Ejemplo memory.md">
    <h2 className="font-display text-4xl font-bold mb-8">
      La <span className="text-ember">bitácora</span> del proyecto.
    </h2>
    <CodeBlock label="memory.md" tone="good">
{`# Project Memory

## Qué estamos construyendo
Plataforma para conectar comunidades tech, eventos y oportunidades.

## Estado actual
- Landing funcional.
- Sección de comunidades creada.
- Eventos cargados manualmente.
- Falta mejorar dashboard de admin.

## Decisiones tomadas
- Supabase para auth, db y storage.
- Diseño moderno, no corporativo.
- Priorizamos velocidad de iteración.

## Próximo paso
Pantalla de admin para que comunidades gestionen eventos.`}
    </CodeBlock>
  </SlideShell>
);

const Skills = () => (
  <SlideShell block="B14" eyebrow="Skills / templates">
    <h2 className="font-display text-5xl font-bold mb-6">
      Procesos que <span className="text-ember">no querés reescribir.</span>
    </h2>
    <p className="text-2xl text-muted-foreground mb-12">
      Si lo usás más de una vez, convertilo en template.
    </p>
    <CodeBlock label="skills/frontend-review/SKILL.md" tone="good">
{`# Frontend Review Skill

When reviewing a frontend screen:

1. Check visual hierarchy.
2. Check spacing and alignment.
3. Check responsive behavior.
4. Check empty states.
5. Check loading states.
6. Check accessibility basics.
7. Suggest concrete improvements.

Do not give generic feedback.
Always include specific UI changes.`}
    </CodeBlock>
  </SlideShell>
);

const Subagents = () => (
  <SlideShell block="B15" eyebrow="Subagents">
    <h2 className="font-display text-5xl font-bold mb-12">
      Cuando una sola IA <span className="text-ember">no alcanza.</span>
    </h2>
    <div className="grid grid-cols-4 gap-6 mt-8">
      {[
        ["Designer", "revisa diseño"],
        ["Reviewer", "revisa código"],
        ["PM", "piensa producto"],
        ["Debugger", "analiza bugs"],
      ].map(([t, d]) => (
        <div key={t} className="bg-surface border border-border rounded-lg p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-ember/15 border-2 border-ember mx-auto mb-6 flex items-center justify-center">
            <span className="text-ember font-mono text-2xl">●</span>
          </div>
          <div className="font-display text-2xl font-bold mb-2">{t}</div>
          <div className="text-lg text-muted-foreground">{d}</div>
        </div>
      ))}
    </div>
    <p className="mt-16 text-xl text-muted-foreground italic max-w-[1400px]">
      Pero ojo: esto ya es otro nivel. Primero hay que aprender a dar buen contexto.
    </p>
  </SlideShell>
);

const Workflow = () => {
  const steps = [
    "Idea vaga",
    "Prompt estructurado",
    "Spec",
    "Plan",
    "Tasks",
    "Implementación",
    "Review",
    "Update memoria",
    "Iteración",
  ];
  return (
    <SlideShell block="B16" eyebrow="Workflow AI-first">
      <h2 className="font-display text-5xl font-bold mb-16">
        Pipeline <span className="text-ember">AI-first.</span>
      </h2>
      <div className="flex flex-wrap gap-4 items-center">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-4">
            <div className={`px-6 py-5 rounded-lg border ${i === 4 ? "border-ember bg-ember/10" : "border-border bg-surface"}`}>
              <div className="font-mono text-sm text-ember mb-1">0{i + 1}</div>
              <div className="font-display text-xl font-bold">{s}</div>
            </div>
            {i < steps.length - 1 && <span className="text-ember font-mono text-2xl">→</span>}
          </div>
        ))}
      </div>
      <p className="mt-20 text-2xl text-muted-foreground max-w-[1500px]">
        Dejamos de usar IA para responder cosas y empezamos a usarla
        para <span className="text-foreground font-bold">trabajar con nosotros</span>.
      </p>
    </SlideShell>
  );
};

const SpecDriven = () => (
  <SlideShell block="B17" eyebrow="Spec-driven development">
    <h2 className="font-display text-5xl font-bold mb-12">
      Spec antes que <span className="text-ember">código.</span>
    </h2>
    <div className="grid grid-cols-2 gap-16">
      <div>
        <p className="text-2xl mb-6 leading-relaxed">
          Una spec es un documento corto que describe <span className="text-ember">qué</span> querés
          construir y <span className="text-ember">por qué</span>, antes de tirar prompts.
        </p>
        <ul className="space-y-4 text-xl text-muted-foreground">
          <li>· objetivo del feature</li>
          <li>· usuario y caso de uso</li>
          <li>· criterios de éxito</li>
          <li>· qué está fuera de scope</li>
          <li>· dependencias y riesgos</li>
        </ul>
      </div>
      <div className="border-l-4 border-ember pl-10">
        <p className="text-3xl font-display leading-tight">
          La IA trabaja muchísimo mejor sobre una spec clara que sobre
          una idea vaga.
        </p>
        <p className="mt-8 text-xl text-muted-foreground italic">
          Y vos también.
        </p>
      </div>
    </div>
  </SlideShell>
);

const McpRag = () => (
  <SlideShell block="B18" eyebrow="Mención">
    <h2 className="font-display text-5xl font-bold mb-12">
      MCP, RAG y compañía.
    </h2>
    <div className="grid grid-cols-2 gap-16">
      <div className="bg-surface border border-border rounded-lg p-10">
        <div className="font-mono text-base uppercase tracking-widest text-ember mb-4">MCP</div>
        <p className="text-2xl font-display mb-4">Model Context Protocol</p>
        <p className="text-xl text-muted-foreground">
          Estándar para conectar la IA a herramientas externas:
          tu base de datos, tu Notion, tu repo.
        </p>
      </div>
      <div className="bg-surface border border-border rounded-lg p-10">
        <div className="font-mono text-base uppercase tracking-widest text-ember mb-4">RAG</div>
        <p className="text-2xl font-display mb-4">Retrieval-Augmented Generation</p>
        <p className="text-xl text-muted-foreground">
          La IA busca info relevante en una base de conocimiento
          antes de responder. Contexto a demanda.
        </p>
      </div>
    </div>
    <p className="mt-16 text-xl text-muted-foreground italic">
      Mención, no clase. Otro día lo abrimos.
    </p>
  </SlideShell>
);

const DemoSlot = () => (
  <SlideShell block="B19" eyebrow="Demo / momento abierto" bg="panel">
    <div className="flex-1 flex flex-col justify-center items-center text-center">
      <div className="font-mono text-base text-ember uppercase tracking-[0.4em] mb-8">
        en vivo
      </div>
      <h2 className="font-display text-7xl font-bold mb-12">
        Demo.
      </h2>
      <p className="text-3xl text-muted-foreground max-w-[1400px]">
        Mostramos un prompt real, lo mejoramos juntos
        y lo pasamos por Claude / Cursor.
      </p>
    </div>
  </SlideShell>
);

const ExerciseQR = () => (
  <SlideShell block="B20" eyebrow="Ejercicio">
    <h2 className="font-display text-5xl font-bold mb-12">
      Te toca: <span className="text-ember">mejorá este prompt.</span>
    </h2>
    <div className="grid grid-cols-[1.4fr_1fr] gap-16 items-center">
      <CodeBlock label="prompt malo" tone="bad">
{`Ayudame a estudiar para un examen.`}
      </CodeBlock>
      <div className="flex flex-col items-center">
        <div className="w-72 h-72 bg-foreground rounded-lg flex items-center justify-center">
          <div className="grid grid-cols-8 gap-1 p-6">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 ${
                  Math.random() > 0.5 ? "bg-background" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="mt-6 font-mono text-base text-muted-foreground uppercase tracking-widest">
          escaneá · template
        </p>
      </div>
    </div>
  </SlideShell>
);

const ExerciseGood = () => (
  <SlideShell block="B20" eyebrow="Una versión esperada">
    <h2 className="font-display text-4xl font-bold mb-8">
      Algo así, <span className="text-ember">por ejemplo:</span>
    </h2>
    <CodeBlock label="prompt mejorado" tone="good">
{`# Tarea
Ayudame a estudiar para un examen de [materia].

# Objetivo
Entender los temas principales y practicar con preguntas similares
a las del examen.

# Contexto
Tengo [nivel actual]. El examen es el [fecha].
Los temas son [temas]. Tengo dificultad especialmente con [tema].

# Material de referencia
Te paso apuntes, ejercicios y programa de la materia.

# Formato
1. Plan de estudio de 7 días.
2. Preguntas de práctica.
3. Mini examen final.

# Criterios de éxito
Poder explicar los conceptos sin memorizar y resolver ejercicios
tipo examen.`}
    </CodeBlock>
  </SlideShell>
);

const Quotes = () => (
  <SlideShell block="B21" eyebrow="Para llevarse">
    <div className="flex-1 flex flex-col justify-center gap-12 max-w-[1500px]">
      {[
        "Contexto útil es información que cambia la respuesta. El resto es ruido con autoestima.",
        "El prompt es el pedido de hoy. La memoria es la bitácora. Las reglas son el manual del equipo.",
        "Prompting es el inicio. Contexto, memoria y workflow son el salto real.",
      ].map((q, i) => (
        <div key={i} className="border-l-4 border-ember pl-10">
          <p className="font-display text-3xl leading-snug">"{q}"</p>
        </div>
      ))}
    </div>
  </SlideShell>
);

const Closing = () => (
  <SlideShell block="B22" eyebrow="Cierre" bg="ember">
    <div className="flex-1 flex flex-col justify-center">
      <p className="font-mono text-xl mb-8 opacity-70">y entonces…</p>
      <h2 className="font-display text-8xl font-bold leading-[0.95]">
        La ventaja no es usar IA.
        <br />
        La ventaja es <span className="underline decoration-[6px] underline-offset-[12px]">saber dirigirla</span>.
      </h2>
      <p className="mt-16 text-3xl max-w-[1400px] opacity-80">
        No delegues criterio. Delegá trabajo.
      </p>
    </div>
  </SlideShell>
);

const ThankYou = () => (
  <SlideShell noChrome>
    <div className="flex-1 flex flex-col justify-center items-center text-center">
      <h2 className="font-display text-9xl font-bold mb-16">
        Gracias.
      </h2>
      <p className="text-3xl text-muted-foreground mb-12">
        Preguntas, dudas, contraejemplos. Todo bienvenido.
      </p>
      <div className="font-mono text-xl text-ember tracking-widest">
        @tu-handle · ia-bien-usada.dev
      </div>
    </div>
  </SlideShell>
);

export const slides: SlideDef[] = [
  { id: "cover", title: "Cover", Component: Cover, notes: "Saludo, presentación, contexto. Avisar duración (~60 min). Tono: directo, práctico, con humor." },
  { id: "thesis", title: "Tesis", Component: Thesis, notes: "Un buen input logra un buen output. La idea de toda la charla. No es prompt engineering místico — es comunicarse mejor." },
  { id: "no-magic", title: "El modelo no hace magia", Component: NoMagic, notes: "Hoy todos corremos atrás del último modelo. Pero antes hay una habilidad más básica: aprender a comunicarnos. No tiene sentido usar el modelo más caro si le explicamos como un audio de WhatsApp a las 2 AM." },
  { id: "ask", title: "Pregunta al público", Component: AskAudience, notes: "Levanten la mano: ¿qué tiene que tener un buen mensaje para una IA? Pedir nombre. Analizar el prompt típico que muestra el slide. Esperar respuestas: contexto, objetivo, formato, ejemplos…" },
  { id: "no-humo", title: "Prompt engineering sin humo", Component: PromptEngNoHumo, notes: "Bajar el término a tierra. Es dar contexto. Repasar los 6 elementos. Chiste sobre 'no cometas errores' al final." },
  { id: "no-mind", title: "La IA no lee tu mente", Component: NoMindReader, notes: "Compañero capaz pero especial. Hasta que el agua moja, decíselo. Si no le das contexto, inventa." },
  { id: "anatomy", title: "Anatomía de un prompt", Component: Anatomy, notes: "Mostrar los 9 bloques. Es una checklist que pueden copiar. No hay que llenar todos siempre — pero saber que existen." },
  { id: "bad", title: "Prompt malo", Component: PromptBad, notes: "Mostrar el clásico 'haceme una presentación sobre IA'. Va a salir cualquier cosa. Y no es culpa del modelo." },
  { id: "good", title: "Prompt mejorado", Component: PromptGood, notes: "Mismo pedido, con tarea/objetivo/contexto/audiencia/reglas/formato/proceso. Notar la diferencia." },
  { id: "context-window", title: "Ventana de contexto", Component: ContextWindow, notes: "Analogía de la mesa: vacía, ordenada, explotada. No es memoria mágica. El objetivo no es darle MUCHO, es darle BUEN contexto." },
  { id: "signal-noise", title: "Señal vs ruido", Component: ContextSignalNoise, notes: "Contexto útil = información que cambia la respuesta. El resto es ruido con autoestima. Mostrar el ejemplo de filtrado." },
  { id: "meta", title: "Meta prompting", Component: MetaPrompt, notes: "Usar IA para mejorar prompts y revisar respuestas. Tres ejemplos: autocrítica, mejora del prompt, reviewer." },
  { id: "to-system", title: "De prompt a sistema", Component: PromptToSystem, notes: "Cuando trabajamos con Claude Code, Cursor, Codex, agentes — pasamos de prompts sueltos a un sistema. Separar estable / dinámico / reutilizable / memoria." },
  { id: "files", title: "Archivos persistentes", Component: FilesPersistent, notes: "Lo estable va en CLAUDE.md / AGENTS.md. Skills para procesos repetibles. Memory.md para el estado del proyecto." },
  { id: "claude-md", title: "Ejemplo CLAUDE.md", Component: ClaudeMd, notes: "Mostrar un CLAUDE.md real. Reglas que no querés repetir cada vez que abrís un chat." },
  { id: "memory-md", title: "Ejemplo memory.md", Component: MemoryMd, notes: "La bitácora del proyecto. Estado, decisiones, próximo paso. Permite retomar contexto rápido en cada sesión." },
  { id: "skills", title: "Skills / templates", Component: Skills, notes: "Si lo usás más de una vez, convertilo en template. Ejemplo: revisión de frontend, code review, escritura de mails." },
  { id: "subagents", title: "Subagents", Component: Subagents, notes: "Mención. Cuando una IA no alcanza, agentes especializados. No entrar en detalle — primero hay que dominar contexto." },
  { id: "workflow", title: "Workflow AI-first", Component: Workflow, notes: "El pipeline completo: idea → prompt → spec → plan → tasks → impl → review → memoria → iteración. La diferencia aparece cuando dejamos de usar IA solo para responder y empezamos a trabajar CON ella." },
  { id: "spec", title: "Spec-driven", Component: SpecDriven, notes: "Spec antes que código. Documento corto: qué, por qué, criterios, scope, riesgos. La IA (y vos) trabajan mucho mejor con una spec clara." },
  { id: "mcp-rag", title: "MCP / RAG", Component: McpRag, notes: "Mención breve: MCP = protocolo para conectar herramientas. RAG = búsqueda + generación. No clase. Otro día." },
  { id: "demo", title: "Demo", Component: DemoSlot, notes: "Slot opcional para demo en vivo: tomar un prompt real del público, mejorarlo con la estructura y pasarlo por una IA." },
  { id: "exercise", title: "Ejercicio QR", Component: ExerciseQR, notes: "Mostrar el prompt malo. Pedir que lo mejoren usando el template. Dar 3-5 minutos. El QR lleva al template." },
  { id: "exercise-good", title: "Ejercicio resuelto", Component: ExerciseGood, notes: "Mostrar una versión esperada. No es la única. Resaltar criterios de éxito." },
  { id: "quotes", title: "Para llevarse", Component: Quotes, notes: "Tres frases clave para que se queden con algo concreto." },
  { id: "closing", title: "Cierre", Component: Closing, notes: "La ventaja no es usar IA. La ventaja es saber dirigirla. No delegues criterio: delegá trabajo." },
  { id: "thanks", title: "Gracias", Component: ThankYou, notes: "Preguntas. Dejar contacto y QR." },
];
