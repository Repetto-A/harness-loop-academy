/**
 * Encuentro 4: Open Source vs modelos propietarios
 */
import type React from "react";
import { SlideShell } from "@/components/SlideShell";
import { CodeBlock } from "@/components/CodeBlock";
import { LocalAnonymizerDemo } from "@/components/LocalAnonymizerDemo";
import { DecisionMatrix } from "@/components/DecisionMatrix";
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

const Cover = () => (
  <Shell>
    <div className="flex h-full items-center">
      <div>
        <h1 className="font-display text-7xl font-bold leading-[0.92]">
          Open source vs
          <br />
          <span className="text-ember">modelos propietarios.</span>
        </h1>
        <p className="mt-10 text-3xl text-muted-foreground max-w-[1200px]">
          Tener criterio, evaluar riesgos y procedimientos para ver qué encaja mejor.
        </p>
      </div>
    </div>
  </Shell>
);

const OpeningQuestion = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-5xl font-bold leading-tight max-w-[1500px]">
        ¿Qué elegirían para analizar <span className="text-ember">contratos internos</span>?
      </h2>
      <div className="grid grid-cols-5 gap-4 c4-stagger">
        {["ChatGPT", "Copilot", "Claude", "Modelo local", "Lo hago a mano"].map((t) => (
          <div
            key={t}
            className="bg-surface border border-border rounded-2xl p-6 text-center font-display text-xl"
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const DependsThesis = () => (
  <Shell bg="ember">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-9xl font-bold leading-none">Depende.</h2>
    </div>
  </Shell>
);

const ConceptMap = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-7">
      <h2 className="font-display text-5xl font-bold">Qué es cada cosa</h2>
      <div className="flex flex-col gap-6 c4-stagger">
        {[
          {
            group: "Capas de acceso",
            accent: "text-ember",
            cols: "grid-cols-4",
            items: [
              ["Modelo", "Red entrenada con pesos y arquitectura (GPT, Llama, Claude…)"],
              ["Plataforma", "Producto listo para usar (ChatGPT, Copilot, Cursor)"],
              ["API", "Interfaz para invocar el modelo desde código"],
              ["Herramienta", "Interfaz de usuario sobre el modelo"],
            ],
          },
          {
            group: "Patrones de sistema",
            accent: "text-blue-400",
            cols: "grid-cols-3",
            items: [
              ["Harness", "Reglas, validación y orquestación alrededor del modelo"],
              ["RAG", "Retrieval Augmented Generation: consulta apoyada en contexto recuperado"],
              ["Agente", "Modelo que elige acciones y usa herramientas en un loop"],
            ],
          },
          {
            group: "Despliegue",
            accent: "text-purple-400",
            cols: "grid-cols-3",
            items: [["Modelo local", "Corre en tu infraestructura, sin enviar datos a terceros"]],
          },
        ].map(({ group, accent, cols, items }) => (
          <div key={group}>
            <div
              className={`font-mono text-xs uppercase tracking-widest mb-3 ${accent} opacity-90`}
            >
              {group}
            </div>
            <div className={`grid ${cols} gap-4`}>
              {items.map(([title, body]) => (
                <div key={title} className="bg-surface border border-border rounded-2xl p-5">
                  <div className="font-mono text-sm text-ember mb-2">{title}</div>
                  <div className="font-display text-base leading-snug">{body}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const SystemNotModel = () => (
  <Shell bg="ember">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-7xl font-bold leading-[0.95]">
        No elegís solo
        <br />
        el modelo.
        <br />
        Elegís el sistema.
      </h2>
    </div>
  </Shell>
);

const FourCategories = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">
        No son dos opciones, son <span className="text-ember">cuatro</span>
      </h2>
      <div className="grid grid-cols-4 gap-4 c4-stagger">
        {[
          {
            title: "Propietario cerrado",
            body: "Pesos privados. Acceso por API o suscripción",
            ex: "GPT-5.x, Claude, ChatGPT, Copilot",
            titleCls: "text-ember",
            borderCls: "border-ember/50",
          },
          {
            title: "Open weights",
            body: "Pesos descargables, licencia con condiciones",
            ex: "Llama 4, Mistral, Qwen, DeepSeek",
            titleCls: "text-blue-400",
            borderCls: "border-blue-500/40",
          },
          {
            title: "Open weights hosteado",
            body: "Modelo abierto, lo corre un tercero",
            ex: "Groq, Together, Bedrock, Vertex",
            titleCls: "text-purple-400",
            borderCls: "border-purple-500/40",
          },
          {
            title: "Open source real",
            body: "Pesos + receta + datos abiertos",
            ex: "OLMo, modelos de investigación",
            titleCls: "text-green-400",
            borderCls: "border-green-500/40",
          },
        ].map(({ title, body, ex, titleCls, borderCls }) => (
          <div key={title} className={`rounded-2xl border bg-surface p-6 ${borderCls}`}>
            <div className={`font-display text-xl font-bold mb-2 ${titleCls}`}>{title}</div>
            <div className="text-base text-muted-foreground leading-snug mb-3">{body}</div>
            <div className="font-mono text-xs text-foreground/70">{ex}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const ModelsForTasks = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-4">
      <h2 className="font-display text-5xl font-bold">¿Qué modelo usar para cada tarea?</h2>
      <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-3 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <div />
        <div className="text-blue-400">En tu máquina / open</div>
        <div className="text-ember">API o suscripción</div>
      </div>
      <div className="space-y-1.5 c4-stagger">
        {[
          [
            "Razonamiento complejo",
            "DeepSeek V4, Qwen 3.6 grande",
            "Claude Opus, GPT-5.x, Gemini Pro",
          ],
          ["Coding y agentes", "Qwen 3.6 Coder, Devstral", "Claude Opus, GPT-5.x"],
          ["Clasificar / extraer", "Qwen chico, Gemma 4, Phi", "Gemini Flash, GPT-5 mini"],
          ["Resúmenes simples", "Llama 4, Mistral", "Gemini Flash, Claude Haiku"],
          ["Multimodal / visión", "Qwen-VL, Gemma 4", "Gemini, GPT-5.x"],
          ["Generar imágenes", "FLUX, Stable Diffusion", "GPT Image, Imagen, Midjourney"],
          ["Embeddings (RAG)", "nomic-embed, bge", "OpenAI, Voyage, Cohere"],
        ].map(([task, local, api]) => (
          <div
            key={task}
            className="grid grid-cols-[1.1fr_1fr_1fr] gap-3 items-center bg-surface border border-border rounded-xl px-4 py-2"
          >
            <div className="font-display text-base">{task}</div>
            <div className="text-center text-sm text-muted-foreground">{local}</div>
            <div className="text-center text-sm text-muted-foreground">{api}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
          <div className="font-mono text-xs text-blue-400 uppercase tracking-widest mb-2">
            Cómo correrlo en tu máquina
          </div>
          <div className="text-sm text-muted-foreground leading-snug">
            <span className="text-foreground">Ollama / LM Studio:</span> probar y usar en tu PC, sin
            montar servidor.
            <br />
            <span className="text-foreground">vLLM:</span> servir el modelo en red para tu equipo o
            producción (más setup, más escala).
          </div>
        </div>
        <div className="rounded-xl border border-ember/30 bg-ember/5 p-4">
          <div className="font-mono text-xs text-ember uppercase tracking-widest mb-2">
            Cómo usarlo en la empresa
          </div>
          <div className="text-sm text-muted-foreground leading-snug">
            <span className="text-foreground">Suscripción:</span> ChatGPT, Copilot, Claude (app o
            plan de equipo).
            <br />
            <span className="text-foreground">API en tu cloud:</span> Azure OpenAI, Bedrock, Vertex
            (mismo modelo, tus políticas de datos).
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

const OpenSourceClarify = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">
        Lo que suele <span className="text-ember">confundir</span>
      </h2>
      <div className="grid grid-cols-2 gap-6 c4-stagger">
        {[
          [
            "Free ≠ enterprise",
            "ChatGPT free y ChatGPT Enterprise no tienen las mismas reglas de datos ni retención",
          ],
          [
            "Licencia con letra chica",
            "Podés descargar Llama o Mistral y aun así tener restricciones comerciales",
          ],
          [
            "Local sigue costando",
            "GPU, operación, actualizaciones y ajuste fino: no es cero pesos",
          ],
          [
            "Hosteado ≠ tuyo",
            "Groq o Together corren open weights, pero tus datos pasan por su infra",
          ],
        ].map(([title, body]) => (
          <div key={title} className="bg-surface border border-border rounded-2xl p-8">
            <div className="font-display text-2xl font-bold text-ember mb-3">{title}</div>
            <div className="text-xl text-muted-foreground leading-snug">{body}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

function ComparisonRows({
  rows,
  footer,
  hybrid = false,
}: {
  rows: string[][];
  footer?: string;
  hybrid?: boolean;
}) {
  const colsClass = hybrid ? "grid-cols-[1.1fr_1fr_1fr_1fr]" : "grid-cols-3";
  const cellText = hybrid ? "text-sm" : "text-base";
  return (
    <>
      <div
        className={`grid ${colsClass} gap-3 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2`}
      >
        <div />
        <div className="text-ember">Propietario</div>
        <div className="text-blue-400">Local / open</div>
        {hybrid && <div className="text-purple-400">Híbrido</div>}
      </div>
      <div className="space-y-2 c4-stagger">
        {rows.map(([dim, prop, local, hyb]) => (
          <div
            key={dim}
            className={`grid ${colsClass} gap-3 items-center bg-surface border border-border rounded-xl px-5 py-3`}
          >
            <div className="font-display text-lg">{dim}</div>
            <div className={`text-center ${cellText} text-muted-foreground`}>{prop}</div>
            <div className={`text-center ${cellText} text-muted-foreground`}>{local}</div>
            {hybrid && <div className={`text-center ${cellText} text-purple-300/90`}>{hyb}</div>}
          </div>
        ))}
      </div>
      {footer && <p className="text-lg text-muted-foreground mt-4">{footer}</p>}
    </>
  );
}

const ComparisonGrid = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-5">
      <h2 className="font-display text-5xl font-bold">Comparativa: calidad y costo</h2>
      <ComparisonRows
        hybrid
        rows={[
          [
            "Calidad",
            "Tope en tareas complejas",
            "La brecha se achicó en 2026 (Llama, Qwen, DeepSeek)",
            "Razonás en el mejor modelo, el dato lo preparás local",
          ],
          [
            "Privacidad",
            "Según contrato (DPA)",
            "Datos en tu perímetro",
            "Anonimizás local, mandás solo lo limpio",
          ],
          [
            "Costo al arrancar",
            "Bajo: API o suscripción",
            "Alto: GPU y setup",
            "Medio: API más una capa local",
          ],
          [
            "Costo a escala",
            "Sube con el volumen",
            "Se amortiza a volumen alto",
            "Lo barato local, lo crítico por API",
          ],
          ["Tiempo de implementación", "Rápido", "Lento", "Medio"],
        ]}
        footer="La curva de costo se cruza: la API arranca barata y se encarece a escala; lo propio arranca caro y se amortiza a volumen sostenido."
      />
    </div>
  </Shell>
);

const ComparisonGridOps = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-5">
      <h2 className="font-display text-5xl font-bold">Comparativa: operación</h2>
      <ComparisonRows
        rows={[
          ["Mantenimiento", "Del proveedor", "Propio"],
          ["Escalabilidad", "Gestionada por el vendor", "La construís vos"],
          ["Gobernanza", "Políticas del proveedor", "Políticas internas"],
          ["Soporte", "Contrato comercial (SLA)", "Comunidad o consultoría"],
          ["Trazabilidad", "Logs del proveedor", "Logs propios"],
        ]}
        footer="A volumen alto y sostenido, lo propio puede salir más barato que la API."
      />
    </div>
  </Shell>
);

const WhenProprietary = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">
        ¿Cuándo usar <span className="text-ember">modelos propietarios</span>?
      </h2>
      <div className="grid grid-cols-2 gap-5 c4-stagger">
        {[
          "Razonamiento complejo donde importa la calidad",
          "Producto listo, sin montar infraestructura",
          "Integraciones con M365, Google, Slack, etc.",
          "Necesitás salir rápido a producción",
          "Datos no sensibles, o con acuerdo de tratamiento (DPA)",
          "Sin equipo que opere modelos (MLOps)",
        ].map((t) => (
          <div
            key={t}
            className="rounded-2xl border-2 border-ember bg-ember/10 p-7 font-display text-xl leading-snug"
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const WhenLocal = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">
        ¿Cuándo usar <span className="text-blue-400">modelos locales / open</span>?
      </h2>
      <div className="grid grid-cols-2 gap-5 c4-stagger">
        {[
          "Datos sensibles: PII, salud, legal, financiero",
          "Los datos no deberían salir de tu red o infraestructura",
          "Querés menos dependencia de un proveedor externo",
          "Tareas acotadas: clasificación, extracción, etiquetado",
          "Resúmenes simples con un modelo chico y económico",
          "Pruebas internas con control estricto de acceso",
        ].map((t) => (
          <div
            key={t}
            className="rounded-2xl border border-blue-500/40 bg-blue-500/10 p-7 font-display text-xl leading-snug"
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const WhenHybrid = () => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center gap-8">
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-purple-400 mb-3">
          La síntesis de las dos
        </div>
        <h2 className="font-display text-6xl font-bold">
          ¿Cuándo conviene armar <span className="text-purple-400">procesos híbridos</span>?
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-5 c4-stagger">
        {[
          "Necesitás calidad de frontera pero los datos no pueden ir crudos a una API",
          "La regulación exige control local y aun así querés razonamiento avanzado",
          "Un modelo solo no alcanza: anonimizar o recuperar local, razonar en API",
          "Hay que auditar entradas y salidas, con revisión humana antes de actuar",
          "Tareas simples en volumen conviene local; las críticas, en modelo propietario",
          "La política prohíbe SaaS consumer pero el equipo igual necesita IA",
        ].map((t) => (
          <div
            key={t}
            className="flex items-start gap-4 rounded-2xl border-2 border-purple-500/50 bg-purple-500/15 p-7 font-display text-xl leading-snug"
          >
            <span className="mt-1 size-2 shrink-0 rounded-full bg-purple-400" />
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const Risks = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Riesgos a evaluar</h2>
      <div className="grid grid-cols-3 gap-4 c4-stagger">
        {[
          ["Fuga de datos", "Prompts, logs y retención del proveedor"],
          ["Entrenan con tus datos", "Revisá opt-out y tier enterprise"],
          ["Alucinación", "Inventa con seguridad: crítico en legal, salud, finanzas"],
          ["Lock-in", "Prompts, evals e integraciones atadas a un proveedor"],
          ["Deprecación", "Te cambian o retiran la versión que tenías en producción"],
          ["Compliance", "Datos personales, normativa local y sectorial"],
        ].map(([title, body]) => (
          <div key={title} className="bg-surface border border-border rounded-2xl p-6">
            <div className="font-display text-xl font-bold text-ember mb-2">{title}</div>
            <div className="text-base text-muted-foreground leading-snug">{body}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const DemoIntro = () => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-6xl font-bold">Flujo híbrido en acción</h2>
      <div className="grid grid-cols-4 gap-4 c4-stagger">
        {[
          "1. Detectar qué no debe salir del perímetro",
          "2. Anonimizar en tu entorno y guardar el mapa local",
          "3. Enviar solo la versión sin PII al modelo propietario",
          "4. Re-hidratar la respuesta con el mapa que quedó local",
        ].map((t, i) => (
          <div
            key={t}
            className="bg-surface border border-border rounded-2xl p-6 font-display text-xl"
          >
            <span className="text-ember font-mono mr-2">{i + 1}.</span>
            {t.replace(/^\d+\.\s/, "")}
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const DemoInteractive = () => (
  <Shell>
    <div className="flex-1 flex flex-col min-h-0 pointer-events-auto">
      <LocalAnonymizerDemo />
    </div>
  </Shell>
);

const DemoCompare = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Mismo análisis, distinto riesgo</h2>
      <div className="grid grid-cols-2 gap-8 c4-stagger">
        <CodeBlock label="documento original → API externa" tone="bad">
          {`Analizá este contrato y decime si la cláusula 3 es favorable.

[Adjuntás el PDF con DNI, CUIT, emails y montos reales…]`}
        </CodeBlock>
        <CodeBlock label="documento anonimizado → API externa" tone="good">
          {`Analizá este contrato y decime si la cláusula 3 es favorable.

[Adjuntás la versión con [NOMBRE_1], [CUIT_1], [MONTO_1]…]`}
        </CodeBlock>
      </div>
      <p className="text-2xl text-muted-foreground text-center">
        Mismo tipo de análisis.{" "}
        <span className="text-foreground font-bold">Distinto riesgo de exposición.</span>
      </p>
    </div>
  </Shell>
);

const MatrixInteractive = () => (
  <Shell>
    <div className="flex-1 flex flex-col min-h-0 pointer-events-auto">
      <DecisionMatrix />
    </div>
  </Shell>
);

const CommonTraps = () => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">
        Trampas <span className="text-ember">comunes</span>
      </h2>
      <div className="grid grid-cols-2 gap-5 c4-stagger">
        {[
          "“Corremos local para estar seguros”, pero el equipo pega el mismo doc en ChatGPT",
          "“Ya lo anonimizamos”, pero el agente tiene web search y filtra el contexto",
          "“Elegimos open source” sin leer la licencia comercial",
          "“Fine-tuneamos” con 50 ejemplos cuando alcanzaba con RAG",
          "“Un solo modelo para todo” sin evaluar por tipo de tarea",
          "“Local es gratis” sin contar GPU, operación ni mantenimiento",
        ].map((t) => (
          <div
            key={t}
            className="flex items-start gap-4 bg-surface border border-border rounded-2xl p-6"
          >
            <span className="text-ember font-mono text-xl shrink-0">×</span>
            <span className="font-display text-lg leading-snug">{t}</span>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const Activity = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-5xl font-bold">Armá tu caso</h2>
      <p className="text-2xl text-muted-foreground">Elegí un caso real y completá:</p>
      <div className="grid grid-cols-2 gap-4 c4-stagger">
        {[
          "Caso de uso concreto",
          "Qué datos entran en juego",
          "Qué pasa si la IA se equivoca",
          "Estrategia elegida (propietario, local, híbrido)",
          "Dónde entra la revisión humana",
          "Qué queda registrado para auditoría",
          "Cómo medís que funciona",
          "Plan B si el proveedor cambia o falla",
        ].map((t) => (
          <div
            key={t}
            className="flex items-center gap-4 bg-surface border border-border rounded-2xl p-6"
          >
            <span className="text-ember font-mono text-xl">□</span>
            <span className="font-display text-xl">{t}</span>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const Closing = () => (
  <Shell bg="ember">
    <div className="flex-1 flex items-center">
      <h2 className="font-display text-7xl font-bold leading-[0.95]">
        El problema no es
        <br />
        usar IA.
        <br />
        Es usarla sin criterio.
      </h2>
    </div>
  </Shell>
);

export const slidesClase04: SlideDefBase[] = [
  {
    id: "c4-cover",
    title: "Portada",
    Component: Cover,
    notes:
      "Objetivo: decidir cuándo propietario, local o híbrido con criterio, riesgos y procedimientos.",
  },
  {
    id: "c4-opening",
    title: "Pregunta disparadora",
    Component: OpeningQuestion,
    notes:
      "Apertura. ChatGPT, Copilot, Claude, local, manual: todas pueden ser válidas según el caso.",
  },
  {
    id: "c4-depends",
    title: "Depende",
    Component: DependsThesis,
    notes:
      "Decí en voz: la respuesta correcta casi siempre depende del caso, los datos y el procedimiento.",
  },
  {
    id: "c4-concept-map",
    title: "Mapa conceptual",
    Component: ConceptMap,
    notes:
      "Agrupado en tres capas: acceso (modelo, plataforma, API, herramienta), patrones de sistema (harness, RAG, agente) y despliegue (modelo local). RAG = Retrieval Augmented Generation: no es memoria del modelo, recuperás contexto de tus fuentes y lo inyectás en la consulta.",
  },
  {
    id: "c4-system",
    title: "El sistema",
    Component: SystemNotModel,
    notes: "Idea clave: no elegís solo el modelo, elegís todo el sistema alrededor.",
  },
  {
    id: "c4-categories",
    title: "Cuatro categorías",
    Component: FourCategories,
    notes:
      "Cuatro opciones: cerrado (API o suscripción), open weights (descargás), hosteado (tercero corre open weights), open source real (pesos+datos+receta). Orden de menos a más control sobre el stack.",
  },
  {
    id: "c4-open-clarify",
    title: "Lo que confunde",
    Component: OpenSourceClarify,
    notes:
      "No repetir la slide anterior: acá van trampas operativas. Free vs enterprise, licencias, costo local, hosteado no es lo mismo que on-prem.",
  },
  {
    id: "c4-comparison",
    title: "Comparativa calidad",
    Component: ComparisonGrid,
    notes:
      "Tres columnas para no caer en falsa dicotomía: propietario, local/open e híbrido. Remarcar dos cosas: en 2026 la brecha de calidad open vs propietario se achicó (Llama, Qwen, DeepSeek competitivos), y la curva de costo se cruza (API barata al inicio y cara a escala; self-hosting al revés).",
  },
  {
    id: "c4-comparison-ops",
    title: "Comparativa operación",
    Component: ComparisonGridOps,
    notes:
      "Segunda mitad: mantenimiento, escala, gobernanza, soporte, trazabilidad. Cerrar con curva de costo que se cruza.",
  },
  {
    id: "c4-models",
    title: "Modelos por tarea",
    Component: ModelsForTasks,
    notes:
      "Tabla = qué modelo según tarea (incluye imágenes). Abajo = cómo correrlo: Ollama/LM Studio para probar en tu PC; vLLM para servir en red/prod. Empresa: suscripción vs API en tu cloud. Son dos capas distintas.",
  },
  {
    id: "c4-when-prop",
    title: "Cuándo propietarios",
    Component: WhenProprietary,
    notes: "Máxima calidad, UX lista, integraciones, time-to-market.",
  },
  {
    id: "c4-when-local",
    title: "Cuándo locales / open",
    Component: WhenLocal,
    notes:
      "Datos sensibles, datos que no deberían salir del perímetro, baja dependencia, tareas acotadas, prototipos internos.",
  },
  {
    id: "c4-when-hybrid",
    title: "Cuándo procesos híbridos",
    Component: WhenHybrid,
    notes:
      "Cuando ningún extremo alcanza solo: calidad + privacidad, regulación + razonamiento, política anti-SaaS + necesidad de IA.",
  },
  {
    id: "c4-risks",
    title: "Riesgos a evaluar",
    Component: Risks,
    notes:
      "Tono accionable, no alarmista. Un mini-ejemplo por riesgo. Conectar: la demo que sigue ataca el primero (fuga de datos).",
  },
  {
    id: "c4-demo-intro",
    title: "Demo intro",
    Component: DemoIntro,
    notes:
      "Presentar flujo de round-trip: detectar PII, anonimizar guardando el mapa local, enviar solo lo limpio, re-hidratar la respuesta. Insistir: el mapa nunca sale del equipo.",
  },
  {
    id: "c4-demo-interactive",
    title: "Demo anonimizador",
    Component: DemoInteractive,
    notes:
      "Demo en vivo: el documento entra sin resaltar. Pedí que marquen tipos de dato (Nombre, DNI, Email…) y ver cómo aparece el color y baja la exposición. Luego Anonimizar, Enviar (vault + límite de red), Re-hidratar. Truco: marcar solo algunos y pasar a Anonimizar para mostrar lo que queda expuesto en rojo. Honestidad: la detección es por regex, frágil. Aclarar que en producción se usa NER o Microsoft Presidio, y que un nombre en minúscula o sin título se le escapa.",
  },
  {
    id: "c4-demo-compare",
    title: "Demo comparación",
    Component: DemoCompare,
    notes: "Contrastar prompt con documento crudo vs anonimizado. Misma calidad, distinto riesgo.",
  },
  {
    id: "c4-matrix",
    title: "Matriz de decisión",
    Component: MatrixInteractive,
    notes: "Usar matriz interactiva con un caso del grupo. Ajustar ejes y mostrar recomendación.",
  },
  {
    id: "c4-traps",
    title: "Trampas comunes",
    Component: CommonTraps,
    notes:
      "Genera conversación. Preguntá cuál vieron en su empresa. La primera y la segunda son las más frecuentes.",
  },
  {
    id: "c4-activity",
    title: "Actividad final",
    Component: Activity,
    notes:
      "Equipos completan checklist: caso, datos, riesgo, estrategia, validación, registro, métrica.",
  },
  {
    id: "c4-closing",
    title: "Cierre",
    Component: Closing,
    notes:
      "Cierre. El problema no es usar IA, es usarla sin criterio. Pregunta final: qué cambiarían mañana en su procedimiento.",
  },
];
