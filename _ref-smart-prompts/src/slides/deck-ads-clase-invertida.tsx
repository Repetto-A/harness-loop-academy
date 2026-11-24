/**
 * Grupo ADS · Clase invertida
 * Transformación del modelo de clases al modelo entidad-relación (MER).
 * Contenido tomado solo de los docs "Guiones" y "Contexto de Informacion".
 * Orden: portada, agenda, bloque 1 (integrantes 1 y 2), bloque 2 (3 y 4),
 * bloque 3 (5 y 6), kahoot, cierre.
 */
import type React from "react";
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

function FlowBox({ title, sub, accent = false }: { title: string; sub?: string; accent?: boolean }) {
  return (
    <div
      className={[
        "rounded-xl border px-6 py-5 text-center min-w-[220px]",
        accent ? "border-2 border-ember bg-ember/10" : "border-border bg-surface/80",
      ].join(" ")}
    >
      <div className="font-display text-2xl font-bold leading-tight">{title}</div>
      {sub && <div className="mt-2 text-base text-muted-foreground leading-snug">{sub}</div>}
    </div>
  );
}

const Arrow = ({ c = "→" }: { c?: string }) => (
  <span aria-hidden className="font-mono text-3xl text-ember">
    {c}
  </span>
);

type Pair = [string, string];

function Cards({ cols, items, minH = "min-h-[160px]" }: { cols: 2 | 3 | 4; items: Pair[]; minH?: string }) {
  return (
    <CardGrid
      cols={cols}
      items={items}
      render={(item) => {
        const [title, body] = item as Pair;
        return (
          <DeckCard className={`flex h-full ${minH} flex-col p-7`}>
            <div className="font-display text-2xl font-bold text-ember mb-3">{title}</div>
            <div className="text-xl text-muted-foreground leading-snug flex-1">{body}</div>
          </DeckCard>
        );
      }}
    />
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="font-mono text-sm uppercase tracking-widest text-ember">{children}</div>;
}

/* ---------- Inicio ---------- */

const Cover = () => (
  <Shell>
    <RevealStack className="flex h-full items-center">
      <div>
        <RevealItem>
          <Kicker>Grupo ADS · Clase invertida</Kicker>
        </RevealItem>
        <RevealItem>
          <h1 className="mt-6 font-display text-[clamp(4rem,9vw,7rem)] font-bold leading-[0.92] text-balance">
            Del modelo de clases al modelo entidad-relación.
          </h1>
        </RevealItem>
        <RevealItem>
          <SlideLead className="mt-10 max-w-[1400px]">
            Persistencia, reglas de transformación y normalización.
          </SlideLead>
        </RevealItem>
      </div>
    </RevealStack>
  </Shell>
);

const Agenda = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Hoy</SlideTitle>
      </RevealItem>
      <Cards
        cols={3}
        minH="min-h-[260px]"
        items={[
          ["1. Fundamentos", "Persistencia, bases de datos y estructura del modelo relacional."],
          ["2. Transformación", "Reglas de mapeo de clases, asociaciones y generalizaciones."],
          ["3. Normalización", "Formas normales y un ejemplo aplicado."],
        ]}
      />
      <RevealItem>
        <SlideLead>Al final: kahoot.</SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

/* ---------- Bloque 1 ---------- */

const PersistQuestion = () => (
  <Shell bg="ember">
    <div aria-hidden className="pointer-events-none absolute left-8 top-8 z-10 font-mono text-[clamp(3rem,8vh,5.5rem)] font-bold leading-none tracking-tighter text-[oklch(0.18_0_0/0.35)]">01</div>
    <StatementSlide>
      <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] max-w-[1500px] text-balance">
        Cómo mantengo la persistencia de los objetos?
      </h2>
    </StatementSlide>
  </Shell>
);

const Persistence = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Persistencia</SlideTitle>
      </RevealItem>
      <RevealItem>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <FlowBox title="Objetos en RAM" sub="viven mientras el programa se ejecuta" />
          <Arrow />
          <FlowBox title="Persistencia" sub="preservar la información y poder recuperarla" accent />
        </div>
      </RevealItem>
      <RevealItem>
        <SlideLead className="text-center">
          Es la propiedad de los datos para <span className="text-foreground font-bold">sobrevivir</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Databases = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>La respuesta: una base de datos</SlideTitle>
      </RevealItem>
      <Cards
        cols={2}
        minH="min-h-[220px]"
        items={[
          ["Orientadas a objetos", "En teoría, el paso natural: objetos en clases y subclases, datos y código encapsulados."],
          ["Relacionales", "En la práctica comercial, casi siempre: tablas normalizadas que varían con el tiempo."],
        ]}
      />
    </ContentSlide>
  </Shell>
);

const Goal = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle className="text-center">Nuestro trabajo</SlideTitle>
      </RevealItem>
      <RevealItem>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <FlowBox title="Modelo de Clases" sub="conceptual, orientado a objetos" />
          <Arrow />
          <FlowBox title="MER" sub="relacional y estructurado" accent />
        </div>
      </RevealItem>
      <RevealItem>
        <SlideLead className="text-center">
          Sin <span className="text-foreground font-bold">pérdida de datos</span>.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Tables = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] max-w-[1500px] text-balance">
        Todo se representa en tablas.
        <br />
        Filas y columnas, sin orden predeterminado.
      </h2>
    </StatementSlide>
  </Shell>
);

const Components = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Los componentes</SlideTitle>
      </RevealItem>
      <Cards
        cols={2}
        items={[
          ["Entidad", "La tabla. Un objeto que será gestionado."],
          ["Atributo", "El campo. Las columnas que definen tipos de datos."],
          ["Clave Primaria (PK)", "Identificador único de cada fila. Ej: Cliente_ID."],
          ["Clave Foránea (FK)", "La PK de una tabla incluida en otra para relacionarlas."],
        ]}
      />
    </ContentSlide>
  </Shell>
);

/* ---------- Bloque 2 ---------- */

const Mapping = () => (
  <Shell section="02">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Mapeo directo</SlideTitle>
      </RevealItem>
      <RevealStack className="flex flex-col items-center gap-5">
        {(
          [
            ["Clases", "Entidades"],
            ["Asociaciones", "Interrelaciones"],
            ["Atributos", "Atributos"],
          ] as Pair[]
        ).map(([a, b]) => (
          <RevealItem key={a}>
            <div className="flex items-center gap-6">
              <div className="w-[320px]"><FlowBox title={a} /></div>
              <Arrow />
              <div className="w-[320px]"><FlowBox title={b} accent /></div>
            </div>
          </RevealItem>
        ))}
      </RevealStack>
    </ContentSlide>
  </Shell>
);

const TwoDifferences = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Dos grandes diferencias</SlideTitle>
      </RevealItem>
      <Cards
        cols={2}
        minH="min-h-[240px]"
        items={[
          ["Se crea la PK", "Sí o sí. En memoria no hacía falta; la tabla la requiere."],
          ["Desaparecen las operaciones", "El modelo de datos no tiene comportamiento. Solo almacena."],
        ]}
      />
    </ContentSlide>
  </Shell>
);

const Associations = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Asociaciones y composición</SlideTitle>
      </RevealItem>
      <Cards
        cols={2}
        minH="min-h-[240px]"
        items={[
          ["Asociación", "Se mantiene la misma multiplicidad: 1 a 1, 1 a muchos, 0 a muchos."],
          ["Composición", "El todo (Factura) es entidad fuerte. La parte (Línea de detalle), entidad débil."],
        ]}
      />
    </ContentSlide>
  </Shell>
);

const AssocClass = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle className="text-center">Clase asociación</SlideTitle>
      </RevealItem>
      <RevealItem>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <FlowBox title="Clase asociación" />
          <Arrow />
          <FlowBox title="Interrelación M:N" sub="con sus atributos" accent />
        </div>
      </RevealItem>
      <RevealItem>
        <SlideLead className="text-center">Usualmente genera una tabla intermedia.</SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const Generalization = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Generalización: tres opciones</SlideTitle>
      </RevealItem>
      <Cards
        cols={3}
        minH="min-h-[280px]"
        items={[
          ["Modelo completo", "Tabla padre y tablas hijas, conectadas por claves foráneas."],
          ["Bajar atributos", "Los atributos de la superclase pasan a las subclases. La superclase desaparece."],
          ["Subir atributos", "Los de las subclases pasan a la superclase. Se suele usar un campo \"tipo\"."],
        ]}
      />
      <RevealItem>
        <SlideLead>Se elige según el costo/beneficio del sistema.</SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

const WhyER = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Por qué armar el diagrama ER</SlideTitle>
      </RevealItem>
      <Cards
        cols={3}
        minH="min-h-[240px]"
        items={[
          ["Visualiza", "Cómo interactúan las entidades y dónde mejorar el diseño."],
          ["Simplifica", "Desglosa sistemas complejos en partes manejables."],
          ["Comunica", "Muestra cómo funciona el negocio sin ser experto en código."],
        ]}
      />
    </ContentSlide>
  </Shell>
);

/* ---------- Bloque 3 ---------- */

const NormStatement = () => (
  <Shell bg="ember">
    <div aria-hidden className="pointer-events-none absolute left-8 top-8 z-10 font-mono text-[clamp(3rem,8vh,5.5rem)] font-bold leading-none tracking-tighter text-[oklch(0.18_0_0/0.35)]">03</div>
    <StatementSlide>
      <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] max-w-[1500px] text-balance">
        El trabajo no termina: hay que normalizar.
      </h2>
    </StatementSlide>
  </Shell>
);

const NormWhy = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Para qué normalizar</SlideTitle>
      </RevealItem>
      <Cards
        cols={3}
        minH="min-h-[200px]"
        items={[
          ["Menos redundancia", "Minimizar datos repetidos."],
          ["Menos problemas", "Disminuir problemas de actualización."],
          ["Integridad", "Proteger la integridad de la información."],
        ]}
      />
    </ContentSlide>
  </Shell>
);

const NF123 = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Las tres primeras formas normales</SlideTitle>
      </RevealItem>
      <Cards
        cols={3}
        minH="min-h-[320px]"
        items={[
          ["1FN", "Valores únicos y elementales. Nada de dos direcciones en la misma celda."],
          ["2FN", "En 1FN, y todo atributo depende de la clave primaria completa, no de una parte."],
          ["3FN", "En 2FN, sin dependencias transitivas. Si el Código Postal deduce la Ciudad, se separa."],
        ]}
      />
    </ContentSlide>
  </Shell>
);

const NF45 = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Nivel avanzado</SlideTitle>
      </RevealItem>
      <Cards
        cols={2}
        minH="min-h-[220px]"
        items={[
          ["4FN", "Elimina dependencias multivaloradas."],
          ["5FN", "Dependencias de unión (JOIN): se separa lo que se puede reconstruir uniendo proyecciones."],
        ]}
      />
    </ContentSlide>
  </Shell>
);

const Consequence = () => (
  <Shell bg="ember">
    <StatementSlide>
      <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] max-w-[1500px] text-balance">
        El modelo de datos es consecuencia del modelo de clases.
        <br />
        Se diseña después.
      </h2>
    </StatementSlide>
  </Shell>
);

const Example = () => (
  <Shell bg="panel">
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Ejemplo: sistema de compras</SlideTitle>
      </RevealItem>
      <RevealItem>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <FlowBox title="Cliente" sub="PK: id cliente" />
          <Arrow />
          <FlowBox title="Pedido" sub="PK propia · FK: id cliente" />
          <Arrow />
          <FlowBox title="Tabla intermedia" sub="ítem, cantidad, precio" accent />
          <Arrow c="←" />
          <FlowBox title="Producto" />
        </div>
      </RevealItem>
      <RevealItem>
        <SlideLead className="text-center">
          Un pedido puede tener muchos productos. La tabla intermedia respeta 1FN y 2FN.
        </SlideLead>
      </RevealItem>
    </ContentSlide>
  </Shell>
);

/* ---------- Final ---------- */

const Kahoot = () => (
  <Shell bg="ember">
    <StatementSlide>
      <div>
        <div className="font-mono text-lg uppercase tracking-widest opacity-70">Ahora ustedes</div>
        <h2 className="mt-6 font-display text-[clamp(4rem,10vw,9rem)] font-bold leading-[0.95]">Kahoot</h2>
      </div>
    </StatementSlide>
  </Shell>
);

const Closing = () => (
  <Shell>
    <ContentSlide>
      <RevealItem>
        <SlideTitle>Para llevarse</SlideTitle>
      </RevealItem>
      <RevealStack className="flex flex-col gap-4">
        {[
          "Persistir es que los datos sobrevivan: base de datos relacional.",
          "Clases a entidades, asociaciones a interrelaciones. Se crea la PK, se van las operaciones.",
          "Generalización: tres opciones, según costo/beneficio.",
          "Después, normalizar: 1FN, 2FN, 3FN.",
        ].map((t) => (
          <RevealItem key={t}>
            <DeckCard className="px-7 py-5">
              <div className="text-2xl leading-snug">{t}</div>
            </DeckCard>
          </RevealItem>
        ))}
      </RevealStack>
    </ContentSlide>
  </Shell>
);

export const slidesAdsClaseInvertida: SlideDefBase[] = [
  { id: "ads-cover", title: "Portada", Component: Cover,
    notes: "Buenas tardes. Hoy vamos a analizar la transformación del modelo de clases al modelo entidad-relación (MER)." },
  { id: "ads-agenda", title: "Agenda", Component: Agenda,
    notes: "Tres bloques: fundamentos y persistencia, reglas de transformación, normalización con un ejemplo. Cerramos con el kahoot." },
  { id: "ads-persist-q", title: "La pregunta clave", Component: PersistQuestion,
    notes: "Integrante 1. La pregunta clave: cómo mantengo la persistencia de los objetos." },
  { id: "ads-persistence", title: "Persistencia", Component: Persistence,
    notes: "Los objetos viven en la RAM mientras el programa se ejecuta. Persistencia: propiedad de los datos para sobrevivir; en programación, preservar permanentemente la información de un objeto y poder recuperarla." },
  { id: "ads-databases", title: "Bases de datos", Component: Databases,
    notes: "Una base de datos organiza y almacena la información de manera accesible. Existen las orientadas a objetos, pero en el entorno comercial solemos usar relacionales: colecciones de tablas normalizadas que varían con el tiempo." },
  { id: "ads-goal", title: "Nuestro trabajo", Component: Goal,
    notes: "Como diseñadores: lograr que el modelo de clases se transforme sin pérdida de datos en un MER." },
  { id: "ads-tables", title: "Todo en tablas", Component: Tables,
    notes: "Gaspar Scaglia. Principios básicos: todos los datos en tablas, filas y columnas sin orden predeterminado salvo que lo indique la consulta." },
  { id: "ads-components", title: "Entidad, atributo, PK, FK", Component: Components,
    notes: "Cada tabla es una entidad, los campos son atributos. PK: identificador único. FK: incluir la PK de una tabla en otra para establecer la relación." },
  { id: "ads-mapping", title: "Mapeo directo", Component: Mapping,
    notes: "Nazareno Russo. Qué normas rigen la transformación: clases a entidades, asociaciones a interrelaciones, atributos se mantienen." },
  { id: "ads-differences", title: "Dos grandes diferencias", Component: TwoDifferences,
    notes: "Al transformar una clase hay que crearle un atributo identificador (PK) que en memoria no era necesario. Y las operaciones desaparecen: el modelo de datos no tiene comportamiento, solo almacena." },
  { id: "ads-associations", title: "Asociaciones y composición", Component: Associations,
    notes: "Integrante 4. Se mantiene la multiplicidad. En composición, el todo es entidad fuerte y la parte entidad débil." },
  { id: "ads-assoc-class", title: "Clase asociación", Component: AssocClass,
    notes: "La clase asociación se transforma en una interrelación M:N y sus atributos se guardan en esa interrelación." },
  { id: "ads-generalization", title: "Generalización", Component: Generalization,
    notes: "El caso más estratégico. Tres normas: superclase y subclases; bajar atributos a las subclases; subir atributos a la superclase. Se decide por costo/beneficio." },
  { id: "ads-why-er", title: "Por qué el diagrama ER", Component: WhyER,
    notes: "Por qué nos tomamos el trabajo: visualiza relaciones, simplifica sistemas complejos y comunica cómo funciona el negocio." },
  { id: "ads-norm", title: "Normalizar", Component: NormStatement,
    notes: "Santiago Ruppel. Una vez que tenemos el modelo conceptual, el trabajo no termina." },
  { id: "ads-norm-why", title: "Para qué normalizar", Component: NormWhy,
    notes: "Minimizar redundancia, disminuir problemas de actualización y proteger la integridad." },
  { id: "ads-nf123", title: "1FN, 2FN, 3FN", Component: NF123,
    notes: "1FN: valores únicos y elementales, sin listas en un campo. 2FN: depende de la clave completa; si la clave es simple, al estar en 1FN ya cumple. 3FN: sin dependencias transitivas." },
  { id: "ads-nf45", title: "4FN y 5FN", Component: NF45,
    notes: "A nivel más avanzado: 4FN para dependencias multivaloradas, 5FN para dependencias de unión complejas." },
  { id: "ads-consequence", title: "Se diseña después", Component: Consequence,
    notes: "Integrante 6. El modelo de datos es siempre una consecuencia del modelo de clases." },
  { id: "ads-example", title: "Ejemplo: compras", Component: Example,
    notes: "Cliente con su PK, Pedido con la suya e incorpora el id del Cliente como FK. Un pedido tiene muchos productos: tabla intermedia para respetar 1FN y 2FN, con ítem, cantidad y precio. Siempre analicen costos y beneficios en el modelo conceptual." },
  { id: "ads-kahoot", title: "Kahoot", Component: Kahoot,
    notes: "Acá va el kahoot. Compartir el código del juego." },
  { id: "ads-closing", title: "Para llevarse", Component: Closing,
    notes: "Repaso en cuatro líneas y gracias." },
];
