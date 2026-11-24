/**
 * UCEL · Diplomatura IA · Clase 2
 * Flujo de pensamiento: del problema al sistema (sin arquitectura).
 * Método adaptado de Mate & Build / Encuentro 4, para profesionales diversos.
 */
import type React from "react";
import { SlideShell } from "@/components/SlideShell";
import type { SlideDefBase } from "@/slides/types";

function Shell({
  children,
  bg = "default",
}: {
  children: React.ReactNode;
  bg?: "default" | "ember" | "panel";
}) {
  const watermarkClass = bg === "ember" ? "text-[oklch(0.18_0_0)]/28" : "text-muted-foreground/45";

  return (
    <SlideShell noChrome bg={bg}>
      <div className="absolute right-6 bottom-10 pointer-events-none z-10">
        <div className={`font-mono text-sm tracking-[0.28em] uppercase ${watermarkClass}`}>
          UCEL · Diplomatura IA
        </div>
      </div>
      {children}
    </SlideShell>
  );
}

const Cover = () => (
  <Shell>
    <div className="flex h-full flex-col justify-center gap-8">
      <h1 className="font-display text-7xl font-bold leading-[0.92] max-w-[1500px]">
        Del problema
        <br />
        al <span className="text-ember">sistema</span>.
      </h1>
      <p className="text-3xl text-muted-foreground max-w-[1200px]">
        Un flujo de pensamiento para apalancarte de la IA: sin arquitectura, sin elegir modelo
        primero.
      </p>
    </div>
  </Shell>
);

const Bridge = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">La clase pasada.</h2>
      <div className="grid grid-cols-2 gap-6">
        {["API y conectores", "Rules y skills", "Projects / AGENTS", "MCPs (usar y armar)"].map(
          (t) => (
            <div
              key={t}
              className="rounded-2xl border border-border bg-surface px-8 py-7 font-display text-3xl font-bold"
            >
              {t}
            </div>
          ),
        )}
      </div>
      <p className="text-2xl text-muted-foreground">
        Hoy: <span className="text-foreground">antes</span> de tocar la herramienta: cómo decidir
        qué vale la pena sistematizar.
      </p>
    </div>
  </Shell>
);

const Thesis = () => (
  <Shell bg="ember">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-7xl font-bold leading-[0.95] max-w-[1500px]">
        No elegís un modelo.
        <br />
        Elegís un <span className="underline decoration-[6px] underline-offset-[14px]">sistema</span>
        .
      </h2>
    </div>
  </Shell>
);

const FlowIntro = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold max-w-[1400px]">
        El flujo de pensamiento.
      </h2>
      <p className="text-3xl text-muted-foreground max-w-[1300px]">
        Siete preguntas. Si no las podés responder, todavía no estás listo para automatizar.
      </p>
    </div>
  </Shell>
);

const FlowList = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-5">
      {[
        ["01", "¿Qué estoy haciendo hoy?"],
        ["02", "¿Se puede sistematizar?"],
        ["03", "¿Qué se automatiza y qué no?"],
        ["04", "¿Lo corre un LLM o una función normal?"],
        ["05", "¿Qué info necesita? ¿Realtime o persistente?"],
        ["06", "¿Puedo armar una rutina semi-automática?"],
        ["07", "¿Tiene sentido 100% autónomo?"],
      ].map(([n, t]) => (
        <div key={n} className="grid grid-cols-[100px_1fr] items-baseline gap-4">
          <div className="font-mono text-2xl text-ember">{n}</div>
          <div className="font-display text-3xl font-bold leading-tight">{t}</div>
        </div>
      ))}
    </div>
  </Shell>
);

const Q1 = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <div className="font-mono text-base uppercase tracking-[0.28em] text-ember">01</div>
      <h2 className="font-display text-6xl font-bold leading-[0.98] max-w-[1450px]">
        ¿Qué estoy haciendo hoy?
      </h2>
      <p className="text-3xl text-muted-foreground max-w-[1200px]">
        Un proceso con nombre. No “quiero IA”. No un área. Un trabajo concreto que duele.
      </p>
      <div className="mt-4 grid grid-cols-3 gap-5">
        {[
          ["Mal", "“Mejorar ventas con IA”"],
          ["Bien", "“Pasar pedidos de WhatsApp al Excel”"],
          ["Mejor", "“60 pedidos/día tipados a mano”"],
        ].map(([label, text]) => (
          <div key={label} className="rounded-2xl border border-border bg-surface p-7">
            <div className="font-mono text-sm uppercase tracking-widest text-ember mb-3">{label}</div>
            <div className="font-display text-2xl leading-snug">{text}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const Q2 = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <div className="font-mono text-base uppercase tracking-[0.28em] text-ember">02</div>
      <h2 className="font-display text-6xl font-bold">¿Se puede sistematizar?</h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-surface p-10">
          <div className="font-display text-3xl font-bold mb-4">Sí, si…</div>
          <ul className="space-y-3 text-2xl text-muted-foreground">
            <li>Hay pasos repetibles</li>
            <li>Entra y sale algo observable</li>
            <li>Alguien más podría hacerlo con una guía</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-10">
          <div className="font-display text-3xl font-bold mb-4">Todavía no, si…</div>
          <ul className="space-y-3 text-2xl text-muted-foreground">
            <li>Es juicio único cada vez</li>
            <li>Depende de “estar en la cabeza de alguien”</li>
            <li>No sabés describir el camino feliz</li>
          </ul>
        </div>
      </div>
    </div>
  </Shell>
);

const Q3 = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <div className="font-mono text-base uppercase tracking-[0.28em] text-ember">03</div>
      <h2 className="font-display text-5xl font-bold max-w-[1450px]">
        ¿Qué se automatiza y qué no?
      </h2>
      <div className="grid grid-cols-3 gap-6">
        {[
          ["Regla", "Si X entonces Y. Sin ambigüedad."],
          ["Juicio", "Criterio, gusto, riesgo, relación."],
          ["Responsabilidad", "Alguien firma. Siempre."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-border bg-surface p-8">
            <div className="font-display text-3xl font-bold mb-4">{t}</div>
            <div className="text-2xl text-muted-foreground leading-snug">{d}</div>
          </div>
        ))}
      </div>
      <p className="text-2xl text-muted-foreground">
        La automatización vive en la <span className="text-foreground font-semibold">regla</span>.
        El humano se queda con el juicio y la firma.
      </p>
    </div>
  </Shell>
);

const Q4 = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <div className="font-mono text-base uppercase tracking-[0.28em] text-ember">04</div>
      <h2 className="font-display text-5xl font-bold max-w-[1450px]">
        ¿LLM o función normal?
      </h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-surface p-10">
          <div className="font-mono text-sm uppercase tracking-widest text-ember mb-4">
            Función / regla
          </div>
          <ul className="space-y-3 text-2xl text-muted-foreground">
            <li>Números, umbrales, SQL</li>
            <li>Parsers, planillas, regex</li>
            <li>“Si confianza &lt; 0.9 → cola”</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-ember/40 bg-ember/5 p-10">
          <div className="font-mono text-sm uppercase tracking-widest text-ember mb-4">LLM</div>
          <ul className="space-y-3 text-2xl text-muted-foreground">
            <li>Lenguaje, ambigüedad</li>
            <li>Extraer, redactar, clasificar</li>
            <li>Proponer, no decidir solo</li>
          </ul>
        </div>
      </div>
      <p className="text-3xl font-display font-bold">
        Casi nunca es un modelo solo. Es un sistema con varios motores.
      </p>
    </div>
  </Shell>
);

const Motors = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Cada paso tiene un motor.</h2>
      <div className="grid grid-cols-4 gap-4">
        {[
          ["LLM", "ember"],
          ["OCR / visión", "ember"],
          ["Embeddings", "ember"],
          ["Transcripción", "ember"],
          ["Parser / regex", "gray"],
          ["SQL / planilla", "gray"],
          ["Regla / umbral", "gray"],
          ["Persona", "person"],
        ].map(([label, kind]) => (
          <div
            key={label}
            className={
              kind === "gray"
                ? "rounded-2xl border border-border/80 bg-muted/30 px-5 py-6 text-center font-display text-xl font-bold text-muted-foreground"
                : kind === "person"
                  ? "rounded-2xl border border-ember/50 bg-ember/10 px-5 py-6 text-center font-display text-xl font-bold"
                  : "rounded-2xl border border-border bg-surface px-5 py-6 text-center font-display text-xl font-bold"
            }
          >
            {label}
            {kind === "gray" && (
              <div className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
                sin modelo
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-2xl text-muted-foreground">
        Gris = no hay modelo. Si un paso es gris, no le pongas IA porque “suena bien”.
      </p>
    </div>
  </Shell>
);

const Q5 = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <div className="font-mono text-base uppercase tracking-[0.28em] text-ember">05</div>
      <h2 className="font-display text-5xl font-bold max-w-[1450px]">
        ¿Qué info necesita el agente?
      </h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-surface p-10">
          <div className="font-display text-3xl font-bold mb-4">Realtime</div>
          <p className="text-2xl text-muted-foreground leading-snug">
            Mail de hoy, calendario, stock, cotización, mensaje de WhatsApp. Cambia todo el tiempo.
            Entra por conectores.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-10">
          <div className="font-display text-3xl font-bold mb-4">Persistente</div>
          <p className="text-2xl text-muted-foreground leading-snug">
            Cómo trabajás, políticas, tono, clientes, “así lo hacemos acá”. Sobrevive a la sesión.
            Vive en archivos, Projects, memoria.
          </p>
        </div>
      </div>
    </div>
  </Shell>
);

const ContextLadder = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-6">
      <h2 className="font-display text-5xl font-bold mb-2">Cómo le doy el contexto.</h2>
      {[
        ["1", "Prompt suelto", "Explorar. Una vez."],
        ["2", "Few-shot", "2-3 ejemplos de “así lo hago yo”."],
        ["3", "Archivos estáticos", "Rules, brief, plantillas, FAQ en un Project."],
        ["4", "Memoria / notas vivas", "Decisiones y preferencias que cambian."],
        ["5", "RAG / índice", "Corpus grande: “buscá en esto y citá fuente”."],
        ["6", "Fine-tuning", "Casi nunca al principio. Caro de mantener."],
      ].map(([n, t, d]) => (
        <div key={n} className="grid grid-cols-[70px_340px_1fr] items-baseline gap-4">
          <div className="font-mono text-2xl text-ember">{n}</div>
          <div className="font-display text-3xl font-bold">{t}</div>
          <div className="text-2xl text-muted-foreground">{d}</div>
        </div>
      ))}
    </div>
  </Shell>
);

const ContextRule = () => (
  <Shell bg="ember">
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-6xl font-bold leading-[0.98] max-w-[1500px]">
        Primero archivos y ejemplos.
        <br />
        Después índice.
        <br />
        Fine-tune casi nunca.
      </h2>
      <p className="text-2xl max-w-[1200px] opacity-80">
        Fine-tunear con 50 documentos cuando indexarlos alcanzaba es la trampa más cara de la lista.
      </p>
    </div>
  </Shell>
);

const Q6 = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <div className="font-mono text-base uppercase tracking-[0.28em] text-ember">06</div>
      <h2 className="font-display text-5xl font-bold max-w-[1450px]">
        ¿Puedo armar una rutina?
      </h2>
      <div className="grid grid-cols-3 gap-5">
        {[
          ["cada mañana", "resumen de mails de la noche"],
          ["todos los lunes", "plan semanal propuesto"],
          ["cada noche", "clasificar lo nuevo y dejar informe"],
          ["antes de reunirme", "contexto del día"],
          ["al llegar un pedido", "proponer campos + cola"],
          ["cuando alguien se va", "entrevistar y publicar fichas"],
        ].map(([when, what]) => (
          <div key={when} className="rounded-2xl border border-border bg-surface p-7">
            <div className="font-mono text-sm uppercase tracking-widest text-ember mb-3">{when}</div>
            <div className="font-display text-2xl leading-snug">{what}</div>
          </div>
        ))}
      </div>
      <p className="text-2xl text-muted-foreground">
        Semi-automático = corre solo hasta un punto. Vos confirmás.
      </p>
    </div>
  </Shell>
);

const Q7 = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <div className="font-mono text-base uppercase tracking-[0.28em] text-ember">07</div>
      <h2 className="font-display text-5xl font-bold max-w-[1450px]">
        ¿Tiene sentido 100% autónomo?
      </h2>
      <div className="grid grid-cols-4 gap-5">
        {[
          ["0", "Solo sugiere", "Vos hacés todo"],
          ["1", "Borrador", "Vos editás y mandás"],
          ["2", "Ejecuta con OK", "Default profesional"],
          ["3", "Autónomo", "Raro al inicio"],
        ].map(([n, t, d]) => (
          <div key={n} className="rounded-2xl border border-border bg-surface p-7">
            <div className="font-mono text-4xl text-ember mb-4">{n}</div>
            <div className="font-display text-2xl font-bold mb-2">{t}</div>
            <div className="text-xl text-muted-foreground">{d}</div>
          </div>
        ))}
      </div>
      <p className="text-3xl font-display font-bold">
        Si duda → cola de excepciones. <span className="text-ember">No inventa.</span>
      </p>
    </div>
  </Shell>
);

const PatternABC = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Dónde sale el dato.</h2>
      <div className="grid grid-cols-3 gap-6">
        {[
          [
            "A",
            "Default",
            "El dato va a la API (con contrato). Volumen chico o mediano. 15 de 19 casos reales caen acá.",
          ],
          [
            "B",
            "Índice propio",
            "Armás el índice en tu red. Solo sale lo anonimizado o la pregunta. El conocimiento es tuyo.",
          ],
          [
            "C",
            "Excepción",
            "Corre en el equipo: sin red, o prohibición real. Offline ≠ local. No son lo mismo.",
          ],
        ].map(([letter, title, body]) => (
          <div key={letter} className="rounded-2xl border border-border bg-surface p-8">
            <div className="font-mono text-5xl text-ember mb-3">{letter}</div>
            <div className="font-display text-3xl font-bold mb-4">{title}</div>
            <div className="text-xl text-muted-foreground leading-snug">{body}</div>
          </div>
        ))}
      </div>
      <p className="text-2xl text-muted-foreground">
        Arrancá en <span className="text-foreground font-semibold">A</span>. Para bajar a B o C,
        escribí el motivo.
      </p>
    </div>
  </Shell>
);

const FlowDiagram = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-5xl font-bold">Cómo se lee un flujo.</h2>
      <div className="grid grid-cols-4 gap-4">
        {[
          ["01", "Tu red", "Infra y datos"],
          ["02", "Fuera", "Modelo por API"],
          ["03", "Vuelve", "Resultado limpio"],
          ["04", "Persona", "Confirma o firma"],
        ].map(([n, t, d]) => (
          <div key={n} className="rounded-2xl border border-border bg-surface p-8 text-center">
            <div className="font-mono text-ember text-xl mb-3">{n}</div>
            <div className="font-display text-3xl font-bold mb-2">{t}</div>
            <div className="text-xl text-muted-foreground">{d}</div>
          </div>
        ))}
      </div>
      <p className="text-2xl text-muted-foreground max-w-[1300px]">
        La flecha naranja marca dónde cruza el dato. Lo que se acumula con el uso (correcciones,
        histórico, golden set) es lo que hace que el sistema mejore.
      </p>
    </div>
  </Shell>
);

const Accumulates = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-5xl font-bold max-w-[1400px]">
        Lo que se acumula vale más que el modelo.
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {[
          ["Correcciones", "Cada fix del humano ajusta el mes que viene"],
          ["Histórico", "Curva de precios, costos reales, fallas"],
          ["Índice propio", "Portable: cambia el proveedor, el índice queda"],
          ["Golden set", "Casos etiquetados a mano para medir calidad"],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-border bg-surface p-8">
            <div className="font-display text-3xl font-bold mb-3">{t}</div>
            <div className="text-2xl text-muted-foreground">{d}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const ThreeCases = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Tres casos que le sirven a casi todos.</h2>
      <div className="grid grid-cols-3 gap-6">
        {[
          [
            "01",
            "Entrada desordenada",
            "Mail, PDF, WhatsApp → campos propuestos → vos confirmás. Si duda, cola.",
          ],
          [
            "02",
            "Texto libre que nadie lee",
            "Clasificar de noche. Informe de patrones. Barato, bajo riesgo.",
          ],
          [
            "03",
            "Oficio que se va",
            "Entrevistar → ficha → base consultable. Lo que preguntan y no está define el próximo tema.",
          ],
        ].map(([n, t, d]) => (
          <div key={n} className="rounded-2xl border border-border bg-surface p-8">
            <div className="font-mono text-ember text-xl mb-3">{n}</div>
            <div className="font-display text-3xl font-bold mb-4 leading-tight">{t}</div>
            <div className="text-xl text-muted-foreground leading-snug">{d}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const Traps = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-6">
      <h2 className="font-display text-5xl font-bold mb-2">Trampas.</h2>
      {[
        ["“Lo fine-tuneamos”", "Cuando indexar alcanzaba y costaba 10× menos."],
        ["“Un modelo para todo”", "Razonamiento caro para clasificar un ticket."],
        ["“100% autónomo”", "Sin cola de excepciones ni firma."],
        ["“Local = offline”", "Sin red, la GPU de la oficina tampoco sirve."],
        ["“Ya lo anonimizamos”", "Y el agente tiene búsqueda web abierta."],
      ].map(([said, happens]) => (
        <div key={said} className="grid grid-cols-2 gap-6 items-baseline">
          <div className="font-display text-2xl font-bold">{said}</div>
          <div className="text-2xl text-muted-foreground">{happens}</div>
        </div>
      ))}
    </div>
  </Shell>
);

const Ficha = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-5">
      <h2 className="font-display text-5xl font-bold mb-2">Ficha · 8 campos.</h2>
      <p className="text-xl text-muted-foreground mb-2">
        Si no se completa entero, no está listo para arrancar. Sirve igual para descartar.
      </p>
      <div className="grid grid-cols-2 gap-x-10 gap-y-3">
        {[
          ["01", "¿Cuál es el caso concreto?"],
          ["02", "¿Qué datos entran? ¿Hay prohibición?"],
          ["03", "¿Qué pasa si se equivoca?"],
          ["04", "¿Patrón A, B o C? (default A)"],
          ["05", "¿Dónde entra la revisión humana?"],
          ["06", "¿Qué queda registrado?"],
          ["07", "¿Cómo medís que funciona?"],
          ["08", "¿Plan B si el proveedor cambia?"],
        ].map(([n, t]) => (
          <div key={n} className="grid grid-cols-[70px_1fr] items-baseline gap-3">
            <div className="font-mono text-ember text-xl">{n}</div>
            <div className="font-display text-2xl font-bold leading-tight">{t}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const Activity = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">Actividad · 15 minutos.</h2>
      <div className="flex flex-col gap-5 font-display text-4xl font-bold leading-tight">
        <div>1. Elegí un proceso que te duele.</div>
        <div>
          2. Completá la <span className="text-ember">ficha</span>.
        </div>
        <div>3. Marcá el nivel de autonomía (0-3).</div>
        <div>4. Escribí qué motor va en cada paso.</div>
      </div>
      <p className="text-2xl text-muted-foreground">
        Te vas con algo escrito. No con teoría.
      </p>
    </div>
  </Shell>
);

const Closing = () => (
  <Shell bg="ember">
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-7xl font-bold leading-[0.95] max-w-[1500px]">
        La ventaja no es usar IA.
        <br />
        Es saber <span className="underline decoration-[6px] underline-offset-[14px]">dirigirla</span>
        .
      </h2>
      <p className="text-3xl max-w-[1200px] opacity-85">
        Pensá el sistema. Medí. Dejá que se acumule. Firmá vos lo que importa.
      </p>
    </div>
  </Shell>
);

export const slidesUcelFlujo: SlideDefBase[] = [
  {
    id: "ucel-cover",
    title: "Portada",
    Component: Cover,
    notes:
      "Clase 2 UCEL. Público no técnico. Tesis: del problema al sistema, sin arrancar por el modelo.",
  },
  {
    id: "ucel-bridge",
    title: "Puente clase 1",
    Component: Bridge,
    notes:
      "Repaso rápido: API, rules/skills, projects, MCP. Hoy es el método de decisión antes de la herramienta.",
  },
  {
    id: "ucel-thesis",
    title: "Tesis",
    Component: Thesis,
    notes: "Frase ancla. Repetila. Mate & Build / Encuentro 4 en versión para oficios diversos.",
  },
  {
    id: "ucel-flow-intro",
    title: "Flujo intro",
    Component: FlowIntro,
    notes: "Siete preguntas. Si no cierran, no automatizar todavía.",
  },
  {
    id: "ucel-flow-list",
    title: "Las 7 preguntas",
    Component: FlowList,
    notes: "Dejá esta slide visible mientras recorrés. Es el handout mental.",
  },
  {
    id: "ucel-q1",
    title: "01 Caso concreto",
    Component: Q1,
    notes: "Pedí ejemplos de la sala. Corregí los vagos en vivo.",
  },
  {
    id: "ucel-q2",
    title: "02 Sistematizar",
    Component: Q2,
    notes: "Si no se puede describir el camino feliz, todavía es exploración, no automatización.",
  },
  {
    id: "ucel-q3",
    title: "03 Qué sí / qué no",
    Component: Q3,
    notes: "Regla vs juicio vs responsabilidad. La IA no firma.",
  },
  {
    id: "ucel-q4",
    title: "04 LLM vs función",
    Component: Q4,
    notes: "Insistir: no todo es LLM. Híbrido es el default real.",
  },
  {
    id: "ucel-motors",
    title: "Motores",
    Component: Motors,
    notes:
      "Etiqueta gris = sin modelo. Ejemplo: SQL de costos, umbral de confianza, planilla. Visión supervisada ≠ LLM.",
  },
  {
    id: "ucel-q5",
    title: "05 Info",
    Component: Q5,
    notes: "Realtime por conectores. Persistente en archivos/Projects/memoria.",
  },
  {
    id: "ucel-context",
    title: "Escalera de contexto",
    Component: ContextLadder,
    notes: "Subí de a un peldaño. Few-shot + rules resuelven el 80%.",
  },
  {
    id: "ucel-context-rule",
    title: "Regla de contexto",
    Component: ContextRule,
    notes: "Trampa del fine-tune temprano. Contala con el ejemplo de indexar vs entrenar.",
  },
  {
    id: "ucel-q6",
    title: "06 Rutinas",
    Component: Q6,
    notes: "Cron / Project scheduled / n8n: el concepto, no el tutorial.",
  },
  {
    id: "ucel-q7",
    title: "07 Autonomía",
    Component: Q7,
    notes: "Nivel 2 es el default profesional. Cola de excepciones obligatoria.",
  },
  {
    id: "ucel-abc",
    title: "Patrones A B C",
    Component: PatternABC,
    notes:
      "Versión liviana de Encuentro 4. Default A. Local ≠ offline. No profundizar en GPU.",
  },
  {
    id: "ucel-flow-diagram",
    title: "Leer un flujo",
    Component: FlowDiagram,
    notes: "Lenguaje visual Mate & Build. Sin draw.io.",
  },
  {
    id: "ucel-accumulates",
    title: "Lo que se acumula",
    Component: Accumulates,
    notes: "El activo no es el modelo: es el índice, el golden set, el histórico.",
  },
  {
    id: "ucel-cases",
    title: "Tres casos",
    Component: ThreeCases,
    notes:
      "Universales: entrada desordenada, texto libre, oficio. Si hay tiempo, contá uno de punta a punta.",
  },
  {
    id: "ucel-traps",
    title: "Trampas",
    Component: Traps,
    notes: "Pedí cuál vieron. Genera conversación.",
  },
  {
    id: "ucel-ficha",
    title: "Ficha",
    Component: Ficha,
    notes: "Entregable. Estrategia arranca en A. Campo motor por paso si hay tiempo.",
  },
  {
    id: "ucel-activity",
    title: "Actividad",
    Component: Activity,
    notes: "15 min. Circulá. Ayudá a bajar de ‘área’ a ‘proceso con nombre’.",
  },
  {
    id: "ucel-closing",
    title: "Cierre",
    Component: Closing,
    notes: "Cierre. Pregunta final: qué proceso van a fichar esta semana.",
  },
];
