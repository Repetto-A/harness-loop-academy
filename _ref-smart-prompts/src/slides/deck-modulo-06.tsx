/**

 * Modelos open source, Ollama e IDE

 * Subset de deck-clase-04 (taxonomía OSS) + Ollama en VS Code

 */

import type React from "react";

import { SlideShell } from "@/components/SlideShell";

import { slidesClase04 } from "@/slides/deck-clase-04";

import type { SlideDefBase } from "@/slides/types";



function Shell({

  children,

  bg = "default",

  noChrome = true,

}: {

  children: React.ReactNode;

  bg?: "default" | "ember" | "panel";

  noChrome?: boolean;

}) {

  const atmos =

    bg === "ember" ? "c4-atmos-ember" : bg === "panel" ? "c4-atmos-panel" : "c4-atmos-default";

  return (

    <SlideShell noChrome={noChrome} bg={bg}>

      <div className={`c4-atmos ${atmos} -inset-32`} />

      <div className="relative z-[1] flex-1 flex flex-col min-h-0 c4-reveal">{children}</div>

    </SlideShell>

  );

}



const Mod6Cover = () => (

  <Shell>

    <div className="flex h-full items-center">

      <div>

        <h1 className="font-display text-7xl font-bold leading-[0.92]">

          Modelos open

          <br />

          <span className="text-ember">source en tu IDE.</span>

        </h1>

        <p className="mt-10 text-3xl text-muted-foreground max-w-[1200px]">

          Qué tipos de modelo podemos usar y cómo nos ayudan a optimizar nuestros costos mientras

          mantenemos la gobernanza de nuestros datos.

        </p>

      </div>

    </div>

  </Shell>

);



const Mod6IdeIntegration = () => (

  <Shell bg="panel">

    <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">

      <h2 className="font-display text-4xl font-bold leading-tight">

        Conectar LLMs locales a tu IDE

      </h2>

      <div className="rounded-2xl border-2 border-blue-500/50 bg-blue-500/10 p-7">

        <div className="font-mono text-blue-400 mb-4 text-sm uppercase tracking-widest">VS Code</div>

        <ol className="space-y-3 text-lg text-muted-foreground leading-snug list-decimal list-inside">

          <li>

            Instalá la extensión oficial{" "}

            <span className="text-foreground font-semibold">Ollama</span> desde el marketplace.

          </li>

          <li>

            La extensión usa tus modelos locales en el endpoint por defecto{" "}

            <span className="font-mono text-base text-foreground">http://localhost:11434</span>.

          </li>

          <li>

            En el chat, elegí el modelo que quieras en la sección{" "}

            <span className="text-foreground font-semibold">Ollama</span>.

          </li>

        </ol>

      </div>

      <div className="rounded-xl border border-ember/40 bg-ember/5 px-6 py-4">

        <div className="font-mono text-xs uppercase tracking-widest text-ember mb-2">

          Si aparece error BYOK

        </div>

        <p className="text-base text-muted-foreground leading-snug">

          Settings → buscá{" "}

          <span className="font-mono text-foreground">BYOK utility model default</span> → cambiá a{" "}

          <span className="text-foreground font-semibold">Main Agent Model</span>.

        </p>

      </div>

    </div>

  </Shell>

);



const Mod6WhenOpenVsFrontier = () => (

  <Shell>

    <div className="flex-1 flex flex-col justify-center gap-8">

      <h2 className="font-display text-5xl font-bold">

        ¿Cuándo usar <span className="text-blue-400">open</span> vs{" "}

        <span className="text-ember">frontera</span>?

      </h2>

      <div className="grid grid-cols-2 gap-6 c4-stagger">

        <div>

          <div className="font-mono text-sm uppercase tracking-widest text-blue-400 mb-4">

            Open / local

          </div>

          <ul className="space-y-3">

            {[

              "Datos sensibles: PII, salud, legal, financiero",

              "Los datos no deberían salir de tu red",

              "Menos dependencia de un proveedor externo",

              "Tareas acotadas: clasificar, extraer, etiquetar",

              "Resúmenes simples con un modelo chico",

              "Prototipos internos con control de acceso",

            ].map((item) => (

              <li

                key={item}

                className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-5 py-4 font-display text-lg leading-snug"

              >

                {item}

              </li>

            ))}

          </ul>

        </div>

        <div>

          <div className="font-mono text-sm uppercase tracking-widest text-ember mb-4">

            Frontera / propietario

          </div>

          <ul className="space-y-3">

            {[

              "Razonamiento complejo donde importa la calidad",

              "Producto listo, sin montar infraestructura",

              "Integraciones con M365, Google, Slack, etc.",

              "Necesitás salir rápido a producción",

              "Datos no sensibles, o con DPA",

              "Sin equipo que opere modelos (MLOps)",

            ].map((item) => (

              <li

                key={item}

                className="rounded-xl border-2 border-ember bg-ember/10 px-5 py-4 font-display text-lg leading-snug"

              >

                {item}

              </li>

            ))}

          </ul>

        </div>

      </div>

    </div>

  </Shell>

);



const Mod6SystemAndHybrid = () => (

  <Shell>

    <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">

      <div>

        <h2 className="font-display text-4xl font-bold leading-tight">

          No elegís solo el <span className="text-ember">modelo</span>. Elegís el{" "}

          <span className="text-ember">sistema</span>.

        </h2>

        <p className="mt-3 text-lg text-muted-foreground max-w-[1400px] leading-snug">

          Este sistema define tu privacidad, qué licencia comercial te limita, si podés escalar y a

          qué costo, qué herramientas podés usar, la inteligencia de los modelos, etc.

        </p>

        <p className="mt-3 text-lg text-muted-foreground max-w-[1400px] leading-snug">

          A raíz de esto surgen flujos híbridos que son capaces de utilizar lo mejor de ambos

          mundos, combinan parte de tareas realizadas en local y otra parte en IA de frontera.

        </p>

      </div>

      <div className="font-mono text-xs uppercase tracking-widest text-purple-400">

        Usos comunes del approach híbrido

      </div>

      <div className="grid grid-cols-2 gap-5">

        {[

          {

            title: "Anonimizar información",

            body: "Detectás PII en local, reemplazás con tokens y guardás el mapa. Solo mandás texto limpio a la frontera; al volver, re-hidratás con el mapa que nunca salió.",

          },

          {

            title: "Pre-procesar para ahorrar tokens",

            body: "OCR, extracción o clasificación en local. Llegás a Claude o GPT con data ya procesada y una query más chica.",

          },

        ].map(({ title, body }) => (

          <div

            key={title}

            className="rounded-2xl border-2 border-purple-500/40 bg-purple-500/10 p-6"

          >

            <div className="font-display text-xl font-bold text-purple-300 mb-3">{title}</div>

            <div className="text-base text-muted-foreground leading-snug">{body}</div>

          </div>

        ))}

      </div>

    </div>

  </Shell>

);



const Mod6ModelAnatomy = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">
      <h2 className="font-display text-4xl font-bold leading-tight">
        Cómo leer el <span className="text-blue-400">nombre</span> de un modelo
      </h2>

      <div className="rounded-2xl border border-border bg-surface px-8 py-6">
        <div className="font-mono text-3xl tracking-tight">
          <span className="text-foreground">qwen2.5</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-blue-400">7b</span>
          <span className="text-muted-foreground">-</span>
          <span className="text-purple-400">instruct</span>
          <span className="text-muted-foreground">-</span>
          <span className="text-ember">q4</span>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-4 c4-stagger">
          {[
            {
              label: "Familia",
              body: "Quién lo entrenó y qué arquitectura usa.",
              cls: "text-foreground",
            },
            {
              label: "Escala",
              body: "Cantidad de parámetros. Más = más capacidad y más memoria.",
              cls: "text-blue-400",
            },
            {
              label: "Ajuste",
              body: "Afinado para seguir instrucciones y chatear.",
              cls: "text-purple-400",
            },
            {
              label: "Cuantización",
              body: "Precisión de los pesos. Menos bits = menos memoria.",
              cls: "text-ember",
            },
          ].map(({ label, body, cls }) => (
            <div key={label} className="rounded-xl border border-border bg-background/40 p-4">
              <div className={`font-mono text-xs uppercase tracking-widest mb-2 ${cls}`}>
                {label}
              </div>
              <div className="text-base text-muted-foreground leading-snug">{body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-ember/40 bg-ember/5 px-6 py-4">
        <div className="font-mono text-xs uppercase tracking-widest text-ember mb-2">Ojo</div>
        <p className="text-base text-muted-foreground leading-snug">
          <span className="text-foreground font-semibold">3B, 7B, 14B, 70B</span> son modelos
          distintos, de menor a mayor capacidad. La{" "}
          <span className="text-foreground">cuantización</span> no cambia esa cifra: es el mismo
          modelo guardado con menos precisión.
        </p>
      </div>
    </div>
  </Shell>
);

const Mod6Quantization = () => {
  const variants = [
    {
      tag: "FP16 · sin cuantizar",
      mem: "≈ 14 GB",
      width: "100%",
      note: "Precisión completa. La referencia de calidad.",
      cls: "text-ember",
      bar: "bg-ember/70",
      border: "border-ember/50",
    },
    {
      tag: "Q8",
      mem: "≈ 7–8 GB",
      width: "55%",
      note: "Casi sin pérdida perceptible.",
      cls: "text-purple-400",
      bar: "bg-purple-500/70",
      border: "border-purple-500/40",
    },
    {
      tag: "Q4",
      mem: "≈ 4–5 GB",
      width: "32%",
      note: "El default práctico para correr local.",
      cls: "text-blue-400",
      bar: "bg-blue-500/70",
      border: "border-blue-500/40",
    },
  ];
  return (
    <Shell>
      <div className="flex-1 flex flex-col justify-center gap-5 min-h-0">
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight">
            Cuantización: <span className="text-blue-400">el mismo modelo</span>, menos memoria
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-[1400px] leading-snug">
            Un mismo 7B ocupa muy distinto según con cuánta precisión guardes sus pesos.
          </p>
        </div>
        <div className="space-y-3">
          {variants.map((v) => (
            <div key={v.tag} className={`rounded-2xl border bg-surface px-6 py-4 ${v.border}`}>
              <div className="flex items-baseline justify-between mb-3">
                <span className={`font-mono text-sm uppercase tracking-widest ${v.cls}`}>
                  {v.tag}
                </span>
                <span className="font-display text-2xl font-bold text-foreground">{v.mem}</span>
              </div>
              <div className="h-3 rounded-full bg-background/60 overflow-hidden">
                <div className={`h-full rounded-full ${v.bar}`} style={{ width: v.width }} />
              </div>
              <div className="mt-3 text-base text-muted-foreground leading-snug">{v.note}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-ember/40 bg-ember/5 px-6 py-4">
          <p className="text-base text-muted-foreground leading-snug">
            <span className="text-foreground font-semibold">No es gratis:</span> a menos bits, algo
            de precisión se pierde. Para extraer campos o clasificar casi no se nota; para
            razonamiento fino, sí.
          </p>
        </div>
      </div>
    </Shell>
  );
};

const Mod6Memory = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">
      <div>
        <h2 className="font-display text-4xl font-bold leading-tight">
          <span className="text-blue-400">RAM</span> y <span className="text-blue-400">VRAM</span>:
          qué tiene que entrar
        </h2>
        <p className="mt-3 text-lg text-muted-foreground max-w-[1400px] leading-snug">
          El modelo corre rápido si entra en memoria. Dónde entra define tu velocidad.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 c4-stagger">
        <div className="rounded-2xl border border-blue-500/40 bg-blue-500/10 p-6">
          <div className="font-mono text-xs uppercase tracking-widest text-blue-400 mb-3">
            GPU + VRAM
          </div>
          <p className="text-lg text-foreground/90 leading-snug mb-2">
            Si el modelo entra en la VRAM, la GPU infiere rápido.
          </p>
          <p className="text-base text-muted-foreground leading-snug">
            Es el camino ideal, pero la VRAM suele ser el recurso más escaso.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
            CPU + RAM
          </div>
          <p className="text-lg text-foreground/90 leading-snug mb-2">
            Sin GPU, corre en RAM sobre CPU: funciona, pero más lento.
          </p>
          <p className="text-base text-muted-foreground leading-snug">
            Ollama puede repartir capas entre GPU y CPU si no entra todo.
          </p>
        </div>
      </div>

      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-purple-400 mb-3">
          Regla práctica (con margen para SO y contexto)
        </div>
        <div className="grid grid-cols-3 gap-4 c4-stagger">
          {[
            { mem: "8 GB", model: "1B – 3B en Q4" },
            { mem: "16 GB", model: "7B – 8B en Q4" },
            { mem: "32 GB", model: "14B en Q4" },
          ].map(({ mem, model }) => (
            <div
              key={mem}
              className="rounded-xl border border-border bg-surface px-5 py-4 flex items-baseline justify-between"
            >
              <span className="font-display text-2xl font-bold text-blue-400">{mem}</span>
              <span className="text-base text-muted-foreground text-right">{model}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-ember/40 bg-ember/5 px-6 py-4">
        <p className="text-base text-muted-foreground leading-snug">
          No entran solo los pesos: también el runtime y el{" "}
          <span className="text-foreground">contexto</span> (KV cache). Prompts largos comen
          memoria. Verificá con <span className="font-mono text-foreground">ollama ps</span>.
        </p>
      </div>
    </div>
  </Shell>
);

const Mod6ModelFit = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">
      <div>
        <h2 className="font-display text-4xl font-bold leading-tight">
          El modelo <span className="text-blue-400">más chico</span> que resuelve bien la tarea
        </h2>
        <p className="mt-3 text-lg text-muted-foreground max-w-[1400px] leading-snug">
          No arranques por el ranking. Arrancá por lo que tenés que hacer.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {[
          "Tarea",
          "Tipo de entrada",
          "Calidad mínima",
          "Memoria que tenés",
          "Latencia aceptable",
          "Probar con casos reales",
        ].map((step, i, arr) => (
          <div key={step} className="flex items-center gap-3">
            <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 font-mono text-sm text-blue-300">
              {step}
            </span>
            {i < arr.length - 1 ? <span className="text-muted-foreground">→</span> : null}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5 c4-stagger">
        {[
          {
            label: "Imagen / scan",
            body: "Modelo de visión u OCR dedicado. Acá empieza la factura.",
            cls: "text-blue-400",
            border: "border-blue-500/40",
          },
          {
            label: "Texto ya extraído",
            body: "Instruct chico (7B) para estructurar campos o anonimizar PII.",
            cls: "text-purple-400",
            border: "border-purple-500/40",
          },
          {
            label: "Razonamiento pesado",
            body: "Recién ahí escalás de tamaño o salís a un modelo de frontera.",
            cls: "text-ember",
            border: "border-ember/50",
          },
        ].map(({ label, body, cls, border }) => (
          <div key={label} className={`rounded-2xl border bg-surface p-6 ${border}`}>
            <div className={`font-mono text-xs uppercase tracking-widest mb-3 ${cls}`}>{label}</div>
            <div className="text-base text-muted-foreground leading-snug">{body}</div>
          </div>
        ))}
      </div>

      <p className="font-display text-2xl text-foreground/90 leading-snug">
        No elegimos por ranking: elegimos por <span className="text-blue-400">tarea</span>,{" "}
        <span className="text-purple-400">evidencia</span> y{" "}
        <span className="text-ember">hardware</span>.
      </p>
    </div>
  </Shell>
);

const Mod6Closing = () => (

  <Shell bg="ember">

    <div className="flex-1 flex items-center">

      <h2 className="font-display text-8xl font-bold leading-none">Gracias.</h2>

    </div>

  </Shell>

);



function pickSlides(ids: string[]): SlideDefBase[] {

  const byId = new Map(slidesClase04.map((s) => [s.id, s]));

  return ids.map((id) => byId.get(id)).filter((s): s is SlideDefBase => Boolean(s));

}



const REUSE_IDS = [

  "c4-concept-map",

  "c4-categories",

  "c4-deployment-spectrum",

  "c4-comparison",

  "c4-comparison-ops",

  "c4-models",

] as const;



const MOD6_NOTES: Record<string, string> = {

  "c4-concept-map":

    "~2 min. Glosario: modelo, API, herramienta, plataforma. El despliegue viene en la slide siguiente.",

  "c4-categories":

    "~3 min. Eje 1: licencia y pesos. DeepSeek, Qwen, Llama como ejemplos. Dejar claro que aún no hablamos de dónde corre.",

  "c4-deployment-spectrum":

    "~3 min. Eje 2: espectro de tu máquina (Ollama) hasta app consumer (ChatGPT) o API (Claude). Puente: el mismo Llama en laptop vs Groq. Si falta tiempo, extremos + hosteado por tercero. La slide siguiente conecta con sistema + híbrido.",

  "mod6-system-hybrid":

    "~3 min. El sistema define privacidad, licencia, escala, costo, herramientas e inteligencia. De ahí los híbridos. Ejemplos: anonimizar y pre-procesar para ahorrar tokens.",

  "c4-comparison":

    "~3 min. Calidad, privacidad, barrera de entrada y costo a escala. Sin curva de costo ni debate OSS vs frontera.",

  "c4-comparison-ops":

    "~2 min. Mantenimiento, escala, gobernanza, soporte y trazabilidad. Cierre rápido; sin profundizar MLOps ni on-prem.",

  "c4-models":

    "~3 min. Tabla por tarea. Sin explicar cómo servir los modelos; eso viene en la slide de IDE.",

};



const mod6SystemAndHybrid: SlideDefBase = {

  id: "mod6-system-hybrid",

  title: "Sistema y flujos híbridos",

  Component: Mod6SystemAndHybrid,

  notes: MOD6_NOTES["mod6-system-hybrid"],

};



const mod6WhenOpenVsFrontier: SlideDefBase = {

  id: "mod6-when-open-vs-frontier",

  title: "Cuándo open vs frontera",

  Component: Mod6WhenOpenVsFrontier,

  notes:

    "~2 min. Dos columnas: cuándo conviene open/local y cuándo frontera. Puente a modelos por tarea y conexión en IDE.",

};



const reused = pickSlides([...REUSE_IDS]).map((slide) => ({

  ...slide,

  notes: MOD6_NOTES[slide.id] ?? slide.notes,

}));



const taxonomySlides = (() => {

  const slides = reused;

  const withSystem = (() => {

    const deployIdx = slides.findIndex((s) => s.id === "c4-deployment-spectrum");

    if (deployIdx === -1) return [...slides, mod6SystemAndHybrid];

    return [

      ...slides.slice(0, deployIdx + 1),

      mod6SystemAndHybrid,

      ...slides.slice(deployIdx + 1),

    ];

  })();

  const modelsIdx = withSystem.findIndex((s) => s.id === "c4-models");

  if (modelsIdx === -1) return [...withSystem, mod6WhenOpenVsFrontier];

  return [

    ...withSystem.slice(0, modelsIdx + 1),

    mod6WhenOpenVsFrontier,

    ...withSystem.slice(modelsIdx + 1),

  ];

})();

const mod6Closing: SlideDefBase = {

  id: "mod6-closing",

  title: "Cierre",

  Component: Mod6Closing,

  notes:

    "~1 min. Solo Gracias. Corte limpio para grabación.",

};



export const slidesModulo06: SlideDefBase[] = [

  {

    id: "mod6-cover",

    title: "Portada",

    Component: Mod6Cover,

    notes:

      "~1 min intro standalone. Promesa: taxonomía OSS + Ollama conectado al IDE vía extensión oficial.",

  },

  ...taxonomySlides,

  {

    id: "mod6-ide-integration",

    title: "LLMs locales en IDE",

    Component: Mod6IdeIntegration,

    notes:

      "~15 min. Extensión oficial Ollama en VS Code, endpoint local, elegir modelo en chat. Si falla BYOK: Settings → BYOK utility model default → Main Agent Model.",

  },
  {
    id: "mod6-model-anatomy",
    title: "Anatomía del nombre",
    Component: Mod6ModelAnatomy,
    notes:
      "~2 min. Entra tras la demo de la spec de Nexa. Descomponé qwen2.5:7b-instruct-q4: familia, escala (parámetros), ajuste, cuantización. Punto clave: 3B/7B/14B/70B son modelos distintos; la cuantización NO agrega parámetros, es el mismo modelo con menos precisión. Transición: 'Elegimos la escala; ahora veamos cómo hacer que entre en la máquina'.",
  },
  {
    id: "mod6-quantization",
    title: "Cuantización",
    Component: Mod6Quantization,
    notes:
      "~2,5 min. Mismo 7B en FP16 (~14 GB), Q8 (~7-8 GB) y Q4 (~4-5 GB); son órdenes de magnitud, cuentan sobre todo los pesos. Barras decrecientes. Tradeoff: menos bits = menos memoria y más velocidad, con algo de pérdida de precisión (poca para extraer/clasificar). No venderlo como gratis. Transición: 'Comprimido o no, hay un cuello físico: la memoria'.",
  },
  {
    id: "mod6-memory",
    title: "RAM y VRAM",
    Component: Mod6Memory,
    notes:
      "~2,5 min. VRAM (GPU) = rápido si el modelo entra; RAM (CPU) = más lento pero válido; Ollama reparte capas. No entran solo los pesos: runtime + contexto/KV cache. Regla con margen: 8 GB→1-3B Q4, 16 GB→7-8B Q4, 32 GB→14B Q4. Comando ollama ps. No reabrir on-prem/nube (eso fue el espectro de despliegue). Transición: 'Con esto, elijamos el modelo para ESTA tarea'.",
  },
  {
    id: "mod6-model-fit",
    title: "Elegir por tarea",
    Component: Mod6ModelFit,
    notes:
      "~3 min. Embudo: tarea → tipo de entrada → calidad mínima → memoria → latencia → probar con casos reales. Aplicado al flujo OCR: imagen/scan→visión u OCR; texto extraído→instruct 7B para estructurar o anonimizar; razonamiento pesado→escalar o frontera. Anti-patrón: no usar un 70B/razonador para leer CUIT y totales. Cierre: 'No elegimos por ranking; elegimos por tarea, evidencia y hardware'. Salida → abrir demo OCR con demo-factura-ocr.png.",
  },

  mod6Closing,

];


