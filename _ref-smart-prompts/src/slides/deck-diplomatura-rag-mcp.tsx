/**
 * UCEL · Diplomatura IA · Clase: MCP, RAG, memoria, rutinas y agentes de trabajo (~2.5 h)
 * Complementa deck-ucel-flujo (se pueden dar en cualquier orden): allá están la escalera de contexto, rutinas (concepto)
 * y niveles de autonomía; acá se baja a herramientas y demos. Mismo estilo visual.
 * Fuentes de cada dato en las notas del orador.
 */
import type React from "react";
import { SlideShell } from "@/components/SlideShell";
import type { SlideDefBase } from "@/slides/types";

function Shell({ children, bg = "default" }: { children: React.ReactNode; bg?: "default" | "ember" | "panel" }) {
  const watermarkClass = bg === "ember" ? "text-[oklch(0.18_0_0)]/28" : "text-muted-foreground/45";
  return (
    <SlideShell noChrome bg={bg}>
      <div className="absolute right-6 bottom-10 pointer-events-none z-10">
        <div className={`font-mono text-sm tracking-[0.28em] uppercase ${watermarkClass}`}>UCEL · Diplomatura IA</div>
      </div>
      {children}
    </SlideShell>
  );
}

const Page = ({ title, children, kicker }: { title: string; children: React.ReactNode; kicker?: string }) => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      {kicker && <div className="font-mono text-base uppercase tracking-[0.28em] text-ember -mb-6">{kicker}</div>}
      <h2 className="font-display text-5xl font-bold max-w-[1500px]">{title}</h2>
      {children}
    </div>
  </Shell>
);

type Row = [string, string];
function Grid({ items, cols = 3, big = false }: { items: Row[]; cols?: 2 | 3 | 4; big?: boolean }) {
  const c = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" }[cols];
  return (
    <div className={`grid ${c} gap-6`}>
      {items.map(([t, d]) => (
        <div key={t} className={`rounded-2xl border border-border bg-surface ${big ? "p-8" : "px-7 py-6"}`}>
          <div className="font-display text-3xl font-bold text-ember mb-3">{t}</div>
          <div className="text-xl text-muted-foreground leading-snug">{d}</div>
        </div>
      ))}
    </div>
  );
}

const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="text-2xl text-muted-foreground max-w-[1400px]">{children}</p>
);

const Statement = ({ kicker, children }: { kicker?: string; children: React.ReactNode }) => (
  <Shell bg="ember">
    <div className="flex-1 flex flex-col justify-center gap-8">
      {kicker && <div className="font-mono text-base uppercase tracking-[0.28em] opacity-70">{kicker}</div>}
      <h2 className="font-display text-7xl font-bold leading-[1.02] max-w-[1500px]">{children}</h2>
    </div>
  </Shell>
);

const Img = ({ src, alt }: { src: string; alt: string }) => (
  <Shell>
    <div className="flex-1 flex items-center justify-center">
      <img src={src} alt={alt} className="h-[860px] w-auto max-w-full object-contain rounded-2xl" />
    </div>
  </Shell>
);

function Code({ children, label }: { children: string; label?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-[oklch(0.16_0_0)] p-7">
      {label && <div className="font-mono text-sm text-ember uppercase tracking-widest mb-3">{label}</div>}
      <pre className="font-mono text-xl leading-relaxed whitespace-pre-wrap text-foreground">{children}</pre>
    </div>
  );
}

/* ---------- Apertura ---------- */
const Cover = () => (
  <Shell>
    <div className="flex h-full flex-col justify-center gap-8">
      <div className="font-mono text-base uppercase tracking-[0.28em] text-ember">Diplomatura IA</div>
      <h1 className="font-display text-7xl font-bold leading-[0.92] max-w-[1500px]">
        Conectar, recordar
        <br />y <span className="text-ember">delegar</span>.
      </h1>
      <p className="text-3xl text-muted-foreground max-w-[1300px]">MCP, RAG, memoria, rutinas y agentes de trabajo. Con demos.</p>
    </div>
  </Shell>
);

const Agenda = () => (
  <Page title="Hoy.">
    <Grid cols={4} items={[
      ["01 MCP", "El enchufe. Demo: dólar e índices en vivo."],
      ["02 RAG", "Responder con tus documentos, citando."],
      ["03 Memoria", "Engram y grafos de conocimiento."],
      ["04 Rutinas", "Tareas que corren solas, con horario."],
      ["05 Agentes", "ChatGPT Work, Claude Cowork, Grok Bot."],
      ["06 Cómo trabajo yo", "Videos, placas y un equipo de bots."],
      ["07 Ejercicio", "Diseñan su propia rutina."],
      ["Cierre", "Qué se llevan."],
    ]} />
  </Page>
);

const Bridge = () => (
  <Page title="Se complementa con la otra clase." kicker="Del problema al sistema">
    <Grid cols={3} items={[
      ["Escalera de contexto", "Allá, el método. Acá, los peldaños RAG y memoria."],
      ["Rutinas", "Allá, el concepto. Acá, con qué herramienta y cómo."],
      ["Autonomía", "Allá, los niveles. Acá, cómo los aplican los agentes reales."],
    ]} />
  </Page>
);

/* ---------- 01 MCP ---------- */
const McpStatement = () => <Statement kicker="01 · MCP">MCP es el enchufe entre la IA y tus herramientas.</Statement>;

const McpWhat = () => (
  <Page title="Cliente, servidor, tools.">
    <Grid cols={3} big items={[
      ["Cliente", "Claude Desktop, Cursor, VS Code con Copilot. Donde chateás."],
      ["Servidor", "Un programa chico que expone herramientas."],
      ["Tools", "Nombre + descripción + qué datos pide. El modelo decide cuándo usarlas."],
    ]} />
    <Lead>La tool no piensa. El modelo elige cuándo enchufarla.</Lead>
  </Page>
);

const McpPortales = () => (
  <Page title="Demo: mcp-portales-ar." kicker="APIs públicas, sin key">
    <Grid cols={4} items={[
      ["Dólar", "Oficial, blue, MEP, CCL, tarjeta, cripto. dolarapi.com"],
      ["Monedas", "EUR, BRL, CLP, UYU. dolarapi.com"],
      ["Índices", "Riesgo país e inflación mensual. argentinadatos.com"],
      ["BCRA", "Reservas y variables monetarias. api.bcra.gob.ar"],
    ]} />
    <Lead>Más precio de cripto con CoinGecko. Siete tools, probadas hoy contra las APIs reales.</Lead>
  </Page>
);

const McpOutput = () => (
  <Page title="Lo que ve el modelo.">
    <div className="grid grid-cols-2 gap-6">
      <Code label="dolar_cotizacion · casa: blue">{`{ "fuente": "dolarapi.com",
  "datos": { "casa": "blue",
    "compra": 1545, "venta": 1565,
    "fechaActualizacion":
      "2026-10-21T18:57Z" } }`}</Code>
      <Code label="riesgo_pais">{`{ "fuente": "argentinadatos.com",
  "datos": { "valor": 672,
    "fecha": "2026-10-20" } }`}</Code>
    </div>
    <Lead>Salida real del 21/10/2026. Siempre con la fuente: el modelo puede citarla.</Lead>
  </Page>
);

const McpAsk = () => (
  <Page title="Qué le preguntamos en vivo.">
    <div className="flex flex-col gap-5">
      {["Cuánto está el blue y el MEP hoy, y cuál es la brecha con el oficial?",
        "Cómo vienen las reservas del BCRA en los últimos días informados?",
        "Armame una tabla con la inflación de los últimos 6 meses."].map((q) => (
        <div key={q} className="rounded-2xl border border-border bg-surface px-8 py-6 text-3xl font-display">"{q}"</div>
      ))}
    </div>
  </Page>
);

const McpUses = () => (
  <Page title="MCP en tu trabajo.">
    <Grid cols={3} items={[
      ["Contadores", "Cotizaciones e inflación del día dentro del chat, con fecha y fuente."],
      ["Comerciales", "Precios en otra moneda al momento de cotizar."],
      ["Administrativos", "Conectores a Drive, Gmail o Slack para buscar y resumir."],
    ]} />
    <Lead>El MCP no reemplaza al dato oficial: lo trae más rápido. Para algo que se firma, verificar en la fuente.</Lead>
  </Page>
);

/* ---------- 02 RAG ---------- */
const RagStatement = () => <Statement kicker="02 · RAG">Que responda con tus documentos. Y que diga de dónde lo sacó.</Statement>;

const RagIntro = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <h2 className="font-display text-8xl font-bold">Qué es un RAG?</h2>
      <p className="font-display text-4xl text-ember">Retrieval-Augmented Generation</p>
      <Lead>Buscar los fragmentos relevantes y dárselos al modelo antes de que responda.</Lead>
    </div>
  </Shell>
);

const RagFlow = () => <Img src="/harness-05/rag-flow.png" alt="Flujo RAG: indexación y consulta" />;
const RagEmb = () => (
  <Page title="Embeddings: buscar por significado.">
    <div className="flex justify-center">
      <img src="/harness-05/rag-embeddings.png" alt="Embeddings: textos parecidos quedan cerca" className="h-[600px] w-auto rounded-2xl" />
    </div>
  </Page>
);

const RagWhen = () => (
  <Page title="Cuándo sí y cuándo no.">
    <Grid cols={4} items={[
      ["Prompt largo", "Pocos documentos que entran en la ventana. Pegalos y listo."],
      ["Búsqueda", "Necesitás encontrar un documento, no una respuesta."],
      ["RAG", "Muchos documentos que cambian, y necesitás citas."],
      ["Fine-tuning", "Cambiar estilo o formato. No sirve para que sepa datos nuevos."],
    ]} />
    <Lead>Si cambia seguido o tiene que citar: RAG. Si entra en un prompt: no armes un RAG.</Lead>
  </Page>
);

const RagCases = () => (
  <Page title="RAG por oficio.">
    <Grid cols={3} items={[
      ["Abogados", "Sobre contratos propios y fallos bajados de SAIJ. Respuesta con cita al documento."],
      ["Contadores", "Sobre resoluciones y normativa de argentina.gob.ar/normativa, más las notas del estudio."],
      ["RRHH", "Sobre el reglamento interno y convenios: preguntas de licencias con la cláusula citada."],
      ["Comerciales", "Sobre fichas técnicas y listas de precios: qué modelo cumple tal requisito."],
      ["Administrativos", "Sobre procedimientos internos: cómo se carga un alta, paso a paso."],
      ["Todos", "La IA propone, la persona verifica la cita. La IA no firma."],
    ]} />
  </Page>
);

const RagLive = () => (
  <Page title="RAG en vivo: cuatro comandos." kicker="rag-demo/">
    <Code label="terminal">{`pip install chromadb
python rag.py indexar
python rag.py preguntar "Qué mide el riesgo país?"
# [1] Riesgo_país.md · fragmento 1 · fuente: es.wikipedia.org/...`}</Code>
    <Lead>Documentos → fragmentos → embeddings locales → Chroma → respuesta con citas [n].</Lead>
  </Page>
);

const RagNoCode = () => (
  <Page title="Sin programar.">
    <Grid cols={3} items={[
      ["NotebookLM", "Subís fuentes, responde solo con ellas y cita el pasaje. Gratis: 50 fuentes por notebook."],
      ["Claude Projects", "Archivos como conocimiento del proyecto."],
      ["GPT personalizado", "Archivos como conocimiento del GPT."],
    ]} />
    <Lead>Mismo principio. Ojo con qué subís: nada de datos personales sin permiso.</Lead>
  </Page>
);


/* ---------- Fine-tuning ---------- */
const FtWhat = () => (
  <Page title="Fine-tuning: enseñar la forma." kicker="Bonus">
    <Grid cols={3} big items={[
      ["Qué es", "Reentrenar un poco un modelo con tus ejemplos de entrada y salida."],
      ["LoRA", "Se entrena una capa chica encima. 0,22% del modelo, un archivo de 4 MB."],
      ["Para qué", "Formato y estilo fijos. No para que sepa datos nuevos."],
    ]} />
  </Page>
);

const FtDemo = () => (
  <Page title="Demo: mail informal a ficha." kicker="finetune-demo/ · Qwen2.5-0.5B-Instruct · CPU">
    <div className="grid grid-cols-2 gap-6">
      <Code label="antes">{`¡Hola Federico! Estoy aquí para
ayudarte con tu solicitud.
¿Podrías proporcionarme más
detalles sobre la carta...`}</Code>
      <Code label="después · 60 ejemplos · 1 min 48 s">{`ASUNTO: Consulta por carta documentalizada
CLIENTE: Federico
ÁREA: Estudio jurídico
DOCUMENTACIÓN: Recibos y recibos (Pendiente)
PLAZO: Fin de mes`}</Code>
    </div>
    <Lead>Aprendió el formato. Inventó el contenido. Datos de ejemplo, no clientes reales.</Lead>
  </Page>
);

const FtWhen = () => (
  <Page title="Prompt, RAG o fine-tuning.">
    <Grid cols={3} big items={[
      ["Prompt", "Primero. Instrucciones y 2 o 3 ejemplos."],
      ["RAG", "Responder con tus documentos y citar."],
      ["Fine-tuning", "El mismo formato miles de veces, con un modelo chico o local."],
    ]} />
    <Lead>Tip: pídanle a una IA que los acompañe en cada paso. Y lean lo que les da.</Lead>
  </Page>
);

/* ---------- 03 Memoria ---------- */
const MemStatement = () => <Statement kicker="03 · Memoria">El RAG sabe de tus documentos. La memoria sabe cómo trabajás.</Statement>;

const Engram = () => (
  <Page title="Engram." kicker="github.com/Gentleman-Programming/engram">
    <Grid cols={3} items={[
      ["Qué es", "Memoria persistente para agentes. Un programa local con SQLite."],
      ["Cómo se usa", "Por MCP: el agente guarda y busca decisiones, convenciones y bugs resueltos."],
      ["Con qué", "Claude Code, Cursor, VS Code con Copilot, Codex, Gemini CLI y otros."],
    ]} />
    <Lead>Hay otros proyectos con el mismo nombre. Este es el que usamos.</Lead>
  </Page>
);

const EngramImg = () => <Img src="/harness-05/engram-memory.png" alt="Engram: sesiones que guardan en una memoria persistente" />;

const Graph = () => (
  <Page title="Grafo de conocimiento.">
    <div className="grid grid-cols-2 gap-6 items-center">
      <img src="/harness-05/graph-concept.png" alt="Concepto de grafo" className="rounded-2xl max-h-[460px]" />
      <div className="flex flex-col gap-5">
        <Lead>Hechos como relaciones: sujeto, relación, objeto.</Lead>
        <Code label="grafo-demo/grafo.py">{`Si se cae api.bcra.gob.ar,
qué se rompe?
→ bcra_buscar_variable, bcra_serie`}</Code>
        <Lead>RAG busca parecido. El grafo sigue relaciones.</Lead>
      </div>
    </div>
  </Page>
);

/* ---------- 04 Rutinas ---------- */
const RoutStatement = () => <Statement kicker="04 · Rutinas">Una rutina es un prompt con horario.</Statement>;

const RoutTools = () => (
  <Page title="Dónde se programan.">
    <Grid cols={3} big items={[
      ["ChatGPT", "Scheduled tasks. Gratis: una vez por día. Pago: hasta cada hora."],
      ["Claude Cowork", "Scheduled tasks en la nube. Corren con la compu apagada."],
      ["GitHub Actions", "cron en UTC. Mínimo cada 5 minutos. Gratis en repos públicos."],
    ]} />
  </Page>
);

const RoutExamples = () => (
  <Page title="Rutinas que hacen cosas.">
    <Grid cols={3} items={[
      ["Contadores, 8:00", "Dólar, riesgo país e inflación en un resumen, cada mañana hábil."],
      ["Estudios contables", "Revisar el calendario de vencimientos de ARCA y avisar lo de la semana."],
      ["Abogados", "Buscar novedades sobre un tema en SAIJ cada semana y resumir."],
      ["RRHH", "Los lunes: resumen de mensajes del equipo en Slack."],
      ["Comerciales", "Cada viernes: informe de la planilla de ventas de Drive."],
      ["Todos", "La rutina deja un borrador. Vos decidís si sale."],
    ]} />
  </Page>
);

const RoutCron = () => (
  <Page title="Lo mismo con GitHub Actions." kicker="rutinas-demo/">
    <Code label=".github/workflows/resumen-diario.yml">{`on:
  schedule:
    - cron: "0 11 * * 1-5"   # 8:00 en Argentina
steps:
  - run: curl dolarapi.com/v1/dolares ...  > resumen.md`}</Code>
    <Lead>Salida real: oficial 1545, blue 1565, riesgo país 672, inflación de septiembre 1,9%.</Lead>
  </Page>
);

/* ---------- 05 Agentes ---------- */
const AgStatement = () => <Statement kicker="05 · Agentes">Del chat que contesta al agente que hace el trabajo.</Statement>;

const Agents = () => (
  <Page title="Agentes de trabajo, hoy.">
    <Grid cols={3} big items={[
      ["ChatGPT Work", "Tareas largas con apps conectadas. Entrega documentos, planillas, decks. ChatGPT agent ya no existe."],
      ["Claude Cowork", "Trabaja con tus archivos y conectores, tareas largas y programadas. Ahora se unifica en Claude."],
      ["Grok Bot", "Bots con computadora propia en la nube, rutinas y triggers. Pide aprobación antes de lo sensible."],
    ]} />
  </Page>
);

const AgentsRule = () => (
  <Page title="La regla es la misma.">
    <Grid cols={3} items={[
      ["Permisos", "Le das solo las cuentas que necesita."],
      ["Aprobación", "Lo que sale para afuera, lo aprobás vos."],
      ["Revisión", "Lees el resultado antes de usarlo."],
    ]} />
    <Lead>Es el nivel 2 de autonomía: la IA propone, vos aprobás.</Lead>
  </Page>
);

/* ---------- 06 Cómo trabajo yo ---------- */
const MeStatement = () => <Statement kicker="06 · Cómo trabajo yo">No uso un asistente. Uso un equipo.</Statement>;

const MeVideo = () => (
  <Page title="Editar videos.">
    <div className="grid grid-cols-5 gap-4">
      {[["ffmpeg", "corta y exporta"], ["faster-whisper", "transcribe"], ["Silencios", "recorta pausas"], ["Face tracking", "zoom a la cara"], ["Versiones", "varias para elegir"]].map(([t, d]) => (
        <div key={t} className="rounded-2xl border border-border bg-surface p-6 text-center">
          <div className="font-display text-2xl font-bold text-ember mb-2">{t}</div>
          <div className="text-lg text-muted-foreground">{d}</div>
        </div>
      ))}
    </div>
    <Lead>Lo hace Grok Bot o Claude. Yo reviso antes de publicar.</Lead>
  </Page>
);

const MeHarness = () => (
  <Page title="Un hub y especialistas.">
    <div className="flex flex-col items-center gap-6">
      <div className="rounded-2xl border-2 border-ember bg-ember/10 px-10 py-5 font-display text-3xl font-bold">Hub: reparte el trabajo</div>
      <div className="grid grid-cols-6 gap-4 w-full">
        {["Vuelos", "Outbound", "IG Follow", "Projects Manager", "Creative", "Researchy"].map((b) => (
          <div key={b} className="rounded-2xl border border-border bg-surface px-4 py-6 text-center font-display text-xl font-bold">{b}</div>
        ))}
      </div>
    </div>
    <Lead>Cada bot tiene un solo trabajo.</Lead>
  </Page>
);

const MeRoutines = () => (
  <Page title="Mis rutinas.">
    <Grid cols={3} items={[
      ["Todos los días", "Ideas de contenido."],
      ["Cada semana", "Temas calientes."],
      ["Cada noche", "Programación de posteos en Buffer."],
    ]} />
    <Lead>Solo borradores. Nada sale sin mi OK.</Lead>
  </Page>
);

const MePlacas = () => (
  <Page title="Placas.">
    <Grid cols={3} items={[
      ["Asset exacto", "Se adapta la pieza de producción, no una parecida."],
      ["Por formato", "Letterbox o recorte según cada red."],
      ["Caras", "Nunca se regeneran."],
    ]} />
  </Page>
);

const MeLearn = () => (
  <Page title="Cómo aprenden los bots.">
    <Grid cols={2} big items={[
      ["Dos veces = regla", "Si corrijo lo mismo dos veces, se vuelve una skill o una regla fija."],
      ["Memoria", "Recuerdan cómo me gustan las cosas entre conversaciones."],
    ]} />
    <Lead>Lo que se acumula vale más que el modelo.</Lead>
  </Page>
);

/* ---------- 07 Ejercicio y cierre ---------- */
const Exercise = () => (
  <Page title="Ejercicio: su rutina." kicker="20 min">
    <Grid cols={4} items={[
      ["1. Qué", "Una tarea repetida de tu trabajo."],
      ["2. Cuándo", "Horario o evento que la dispara."],
      ["3. Con qué", "Fuentes: MCP, documentos, conectores."],
      ["4. Qué entrega", "Borrador, resumen o aviso. Quién lo aprueba."],
    ]} />
    <Lead>Armala en ChatGPT o Claude con una scheduled task. Si no tienen plan pago: NotebookLM con sus documentos.</Lead>
  </Page>
);

const Closing = () => (
  <Page title="Para llevarse.">
    <div className="flex flex-col gap-4">
      {["MCP conecta la IA con datos vivos.", "RAG responde con tus documentos y cita.", "La memoria guarda cómo trabajás.", "Una rutina es un prompt con horario.", "El agente hace. Vos aprobás."].map((t) => (
        <div key={t} className="rounded-2xl border border-border bg-surface px-8 py-5 text-3xl font-display">{t}</div>
      ))}
    </div>
  </Page>
);

const N = (s: string) => s;
export const slidesDiplomaturaRagMcp: SlideDefBase[] = [
  { id: "d3-cover", title: "Portada", Component: Cover, notes: N("Clase de ~2,5 h. Público no técnico. Hoy: herramientas y demos. El método de decisión está en la otra clase (Del problema al sistema), que se puede dar antes o después.") },
  { id: "d3-agenda", title: "Agenda", Component: Agenda, notes: N("Tiempos sugeridos: MCP 30 min, RAG 30, memoria 15, rutinas 20, agentes 15, cómo trabajo yo 15, ejercicio 20, cierre 5.") },
  { id: "d3-bridge", title: "Cruce con la otra clase", Component: Bridge, notes: N("Referencia a /ucel-flujo (escalera de contexto, 06 Rutinas, 07 Autonomía). Si ya la dieron: 'en la otra clase vimos'. Si no: 'en la otra clase vamos a ver'. No repetir.") },
  { id: "d3-mcp", title: "MCP", Component: McpStatement, notes: N("Model Context Protocol. Hoy, uno armado para datos de Argentina.") },
  { id: "d3-mcp-what", title: "Cliente, servidor, tools", Component: McpWhat, notes: N("Clientes con config documentada: Claude Desktop (claude_desktop_config.json), Cursor (cursor.com/docs/mcp), VS Code (code.visualstudio.com/docs/copilot/reference/mcp-configuration).") },
  { id: "d3-mcp-portales", title: "mcp-portales-ar", Component: McpPortales, notes: N("APIs verificadas con curl el 21/10/2026, HTTP 200 sin key: dolarapi.com/v1/dolares y /cotizaciones, api.argentinadatos.com (riesgo-pais, inflacion), api.bcra.gob.ar/estadisticas/v4.0/monetarias, api.coingecko.com/api/v3/simple/price. Código en /workspace/diplomatura-clase/mcp-portales-ar.") },
  { id: "d3-mcp-output", title: "Salida real", Component: McpOutput, notes: N("Salida del cliente de prueba (test-output.txt). Abrir el MCP Inspector: npm run inspector. Actualizar los números el día de la clase.") },
  { id: "d3-mcp-ask", title: "Preguntas en vivo", Component: McpAsk, notes: N("Seguir GUION-DEMO.md. La segunda pregunta encadena bcra_buscar_variable y bcra_serie. Plan B sin internet: test-output.txt.") },
  { id: "d3-mcp-uses", title: "MCP en tu trabajo", Component: McpUses, notes: N("Ejemplos genéricos. Las APIs comunitarias no tienen SLA; para lo que se firma, ir a la fuente oficial.") },
  { id: "d3-rag", title: "RAG", Component: RagStatement, notes: N("Abrir el bloque. Diferencia clave con MCP: MCP trae datos vivos, RAG busca en tus documentos.") },
  { id: "d3-rag-intro", title: "Qué es un RAG", Component: RagIntro, notes: N("Pausa con la sigla. Retomado del deck 'Que la IA entienda tu codebase' (harness-05).") },
  { id: "d3-rag-flow", title: "Flujo RAG", Component: RagFlow, notes: N("Imagen de harness-05. Arriba indexación (documentos, chunks, embeddings, base vectorial), abajo consulta.") },
  { id: "d3-rag-emb", title: "Embeddings", Component: RagEmb, notes: N("Imagen de harness-05. Textos con significado parecido quedan cerca, aunque no compartan palabras.") },
  { id: "d3-rag-when", title: "Cuándo sí y cuándo no", Component: RagWhen, notes: N("Cruce con 'Regla de contexto' de la otra clase (/ucel-flujo): la trampa del fine-tune temprano, indexar vs entrenar.") },
  { id: "d3-rag-cases", title: "RAG por oficio", Component: RagCases, notes: N("Fuentes públicas reales: saij.gob.ar (jurisprudencia y normativa), argentina.gob.ar/normativa. Contratos y reglamentos: solo con permiso y sin datos personales.") },
  { id: "d3-rag-live", title: "RAG en vivo", Component: RagLive, notes: N("rag-demo/: docs de Wikipedia en español (CC BY-SA). Sin API key muestra solo la recuperación con citas; con OPENAI_API_KEY redacta. Embeddings all-MiniLM-L6-v2, mejor en inglés.") },
  { id: "d3-rag-nocode", title: "Sin programar", Component: RagNoCode, notes: N("NotebookLM: support.google.com/notebooklm/answer/14276569 y 16269187 (50 fuentes gratis, 500.000 palabras o 200 MB por fuente). Su ayuda ya lo nombra Gemini Notebook. Límites de Projects y GPTs: no verificados hoy.") },
  { id: "d3-ft-what", title: "Fine-tuning", Component: FtWhat, notes: N("Bonus, cierra el bloque RAG. Cifras de finetune-demo/salida/entrenamiento.log: 1.081.344 parámetros entrenables de 495.114.112 (0,22%). Adaptador ~4 MB.") },
  { id: "d3-ft-demo", title: "Demo fine-tuning", Component: FtDemo, notes: N("Qwen/Qwen2.5-0.5B-Instruct (huggingface.co/Qwen/Qwen2.5-0.5B-Instruct, Apache 2.0). Medido en el box: 8 núcleos, sin GPU, 1 min 48 s en total, loss 1,210 a 0,155. En Windows no está medido; puede tardar más. Salidas reales en salida/comparacion.md. Datos sintéticos generados por preparar.py.") },
  { id: "d3-ft-when", title: "Cuándo conviene", Component: FtWhen, notes: N("Probar prompt primero. Fine-tuning no agrega conocimiento: el demo lo muestra porque inventa documentación. Cruce con 'Regla de contexto' de la otra clase. Tip: cada paso (venv, pip, errores, generar ejemplos) se lo pueden pedir a una IA.") },
  { id: "d3-mem", title: "Memoria", Component: MemStatement, notes: N("RAG = el sistema y los documentos. Memoria = cómo trabajaste. Mismo encuadre que frisvy-03.") },
  { id: "d3-engram", title: "Engram", Component: Engram, notes: N("github.com/Gentleman-Programming/engram: binario Go, SQLite + FTS5, MCP, HTTP, CLI y TUI, licencia MIT. Otros con el mismo nombre: edg-l/engram-mcp, get-engram/engram, jamjet-labs/engram-mcp-server.") },
  { id: "d3-engram-img", title: "Engram visual", Component: EngramImg, notes: N("Imagen de harness-05: sesiones que guardan en memoria, sesión nueva que recupera.") },
  { id: "d3-graph", title: "Grafo de conocimiento", Component: Graph, notes: N("grafo-demo/grafo.py: tripletas tomadas del código del MCP. Ejemplo oficio: quién es responsable de qué cliente, qué contrato depende de qué anexo.") },
  { id: "d3-rout", title: "Rutinas", Component: RoutStatement, notes: N("Cruce con 06 Rutinas de la otra clase (/ucel-flujo).") },
  { id: "d3-rout-tools", title: "Dónde se programan", Component: RoutTools, notes: N("ChatGPT: help.openai.com/en/articles/10291617 (Free 1 vez por día, pago hasta cada hora; límites de tareas activas por plan). Claude: support.claude.com/en/articles/13854387 (planes pagos, corren en la nube). GitHub: docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows (UTC, mínimo 5 min, puede demorarse).") },
  { id: "d3-rout-examples", title: "Rutinas por oficio", Component: RoutExamples, notes: N("Fuentes: arca.gob.ar/vencimientos, saij.gob.ar. Los ejemplos de Slack y Drive coinciden con los usos que lista la ayuda de Claude (daily briefings, weekly reports).") },
  { id: "d3-rout-cron", title: "GitHub Actions", Component: RoutCron, notes: N("rutinas-demo/.github/workflows/resumen-diario.yml. Salida real del 21/10/2026 en salida-ejemplo.txt.") },
  { id: "d3-ag", title: "Agentes", Component: AgStatement, notes: N("Nombres verificados el 21/10/2026.") },
  { id: "d3-agents", title: "Agentes de trabajo", Component: Agents, notes: N("ChatGPT agent no está más disponible, reemplazado por ChatGPT Work: help.openai.com/en/articles/11752874, chatgpt.com/work. Claude Cowork: claude.com/product/cowork y support.claude.com/en/articles/13345190 (planes pagos; 'Claude Cowork is now just Claude' en despliegue). Grok Bot: x.ai/news/introducing-grok-bot, x.ai/bot/guides/grok-bot-101.") },
  { id: "d3-agents-rule", title: "La regla", Component: AgentsRule, notes: N("Las tres plataformas documentan aprobaciones o permisos. Cruce con 07 Autonomía de la otra clase (/ucel-flujo).") },
  { id: "d3-me", title: "Cómo trabajo yo", Component: MeStatement, notes: N("Bloque personal. Genérico, sin clientes ni contactos.") },
  { id: "d3-me-video", title: "Editar videos", Component: MeVideo, notes: N("ffmpeg (ffmpeg.org, filtro silencedetect para silencios), faster-whisper (github.com/SYSTRAN/faster-whisper) para transcribir. Varias versiones, elijo y reviso antes de publicar.") },
  { id: "d3-me-harness", title: "Hub y especialistas", Component: MeHarness, notes: N("El hub recibe el pedido y lo deriva. Un trabajo por bot: más fácil de corregir y de confiar.") },
  { id: "d3-me-routines", title: "Mis rutinas", Component: MeRoutines, notes: N("Rutinas con cron. Buffer: buffer.com. Todo queda en borrador hasta que lo apruebo.") },
  { id: "d3-me-placas", title: "Placas", Component: MePlacas, notes: N("Regla de producción: se adapta el asset aprobado, no se regenera.") },
  { id: "d3-me-learn", title: "Cómo aprenden", Component: MeLearn, notes: N("Cruce con 'Lo que se acumula' de la otra clase (/ucel-flujo).") },
  { id: "d3-exercise", title: "Ejercicio", Component: Exercise, notes: N("20 min en parejas. Circular. Bajar de 'área' a 'tarea con nombre', igual que la Ficha de la otra clase.") },
  { id: "d3-closing", title: "Cierre", Component: Closing, notes: N("Pregunta final: qué rutina van a dejar corriendo esta semana.") },
];
