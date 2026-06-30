/**
 * Arquitectura de Von Neumann — deck educativo (video YouTube)
 * Estilo: smart-prompts (SlideShell, font-display, text-ember, bg ember/panel).
 * Todos los diagramas son nativos (JSX + Tailwind + SVG inline), salvo las
 * imágenes históricas IMG-1/2/3.
 */
import type React from "react";
import { Fragment } from "react";
import { SlideShell } from "@/components/SlideShell";
import { CodeBlock } from "@/components/CodeBlock";

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
  return (
    <SlideShell noChrome={noChrome} bg={bg}>
      {children}
    </SlideShell>
  );
}

/** Encabezado reutilizable (eyebrow mono + título display) para slides de diagrama. */
function Heading({
  eyebrow,
  title,
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div>
      <div className="font-mono text-base text-ember mb-4 uppercase tracking-[0.3em]">
        {eyebrow}
      </div>
      <h2
        className={`font-display ${compact ? "text-5xl" : "text-6xl"} font-bold`}
      >
        {title}
      </h2>
    </div>
  );
}

/** Caja base del estilo deck (rounded-2xl border bg-surface). */
function Box({
  children,
  className = "",
  accent = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border ${
        accent ? "border-2 border-ember bg-ember/10" : "border-border bg-surface"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const HIST_PHOTOS = {
  portrait: "/von-neumann/von-neumann-portrait.png",
  eniac: "/von-neumann/eniac.png",
  edvac: "/von-neumann/edvac.png",
  coverBg: "/von-neumann/cover-bg.png",
  cierreGracias: "/von-neumann/cierre-gracias.png",
} as const;

const CANONICAL_ASSEMBLER = `LOAD R1,[A]\nLOAD R2,[B]\nADD R3,R1,R2\nSTORE [C],R3`;

const FDE_DEMO_STEPS = [
  {
    instr: "LOAD R1,[A]",
    result: "R1 = 5",
    detail: "El 5 de A sale de memoria y queda en R1.",
  },
  {
    instr: "LOAD R2,[B]",
    result: "R2 = 7",
    detail: "El 7 de B sale de memoria y queda en R2.",
  },
  {
    instr: "ADD R3,R1,R2",
    result: "R3 = 12",
    detail: "La ALU suma R1 y R2; el resultado va a R3.",
  },
  {
    instr: "STORE [C],R3",
    result: "C = 12",
    detail: "El 12 de R3 se escribe en memoria, en C.",
  },
] as const;

function HistPhoto({
  src,
  alt,
  aspect = "aspect-[4/5]",
  objectPosition = "center",
  label,
}: {
  src: string;
  alt: string;
  aspect?: string;
  objectPosition?: string;
  label?: string;
}) {
  return (
    <div className={`${aspect} w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 relative`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        style={{ objectPosition }}
      />
      {label && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4 pt-10 bg-gradient-to-t from-black/75 to-transparent"
        >
          <span className="font-mono text-sm uppercase tracking-[0.28em] text-white/50">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

// 1 — cover
const Cover = () => (
  <Shell>
    <img
      src={HIST_PHOTOS.coverBg}
      alt=""
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/50" />
    <div className="relative z-10 flex h-full items-center">
      <div>
        <h1 className="font-display text-8xl font-bold leading-[0.92]">
          Arquitectura
          <br />
          de <span className="text-ember">Von Neumann.</span>
        </h1>
        <p className="mt-10 text-3xl text-muted-foreground max-w-[1200px]">
          Una idea de 1945 que seguís usando hoy.
        </p>
      </div>
    </div>
  </Shell>
);

// 2 — historia-1 (split imagen + texto)
const Historia1 = () => (
  <Shell>
    <div className="grid grid-cols-[1fr_1.2fr] gap-20 h-full items-center">
      <div>
        <HistPhoto
          src={HIST_PHOTOS.portrait}
          alt="John von Neumann"
          objectPosition="center top"
        />
      </div>
      <div>
        <div className="font-mono text-base text-ember mb-6 uppercase tracking-[0.3em]">
          Historia
        </div>
        <h2 className="font-display text-6xl font-bold leading-[1.0]">
          Entre <span className="text-ember">1944 y 1946</span>.
        </h2>
        <p className="mt-10 text-3xl text-muted-foreground max-w-[700px] leading-snug">
          Von Neumann escribe un informe sobre las primeras computadoras
          electrónicas.
        </p>
        <p className="mt-8 text-2xl max-w-[700px] leading-snug">
          El aporte clave fue una memoria que guarda los datos{" "}
          <span className="text-ember font-bold">y</span> el programa.
        </p>
      </div>
    </div>
  </Shell>
);

// 3 — historia-2 (split: dos imágenes + texto)
const Historia2 = () => (
  <Shell>
    <div className="grid grid-cols-[1.1fr_1fr] gap-16 h-full items-center">
      <div>
        <div className="font-mono text-base text-ember mb-6 uppercase tracking-[0.3em]">
          Historia
        </div>
        <h2 className="font-display text-6xl font-bold leading-[1.0]">
          ENIAC <span className="text-ember">→</span> EDVAC
        </h2>
        <p className="mt-8 text-2xl text-muted-foreground max-w-[640px] leading-snug">
          Del recableado a mano al <span className="text-ember">programa almacenado</span> (1945).
        </p>
        <p className="mt-6 text-xl max-w-[640px] leading-snug text-muted-foreground">
          La ENIAC obligaba a recablear; la EDVAC guardaba el programa en memoria.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <HistPhoto
          src={HIST_PHOTOS.eniac}
          alt="Operadores programando el ENIAC con cables"
          aspect="aspect-[3/4]"
          label="ENIAC"
        />
        <HistPhoto
          src={HIST_PHOTOS.edvac}
          alt="EDVAC en el Ballistic Research Laboratory"
          aspect="aspect-[3/4]"
          label="EDVAC"
        />
      </div>
    </div>
  </Shell>
);

// 4 — modelo-3-bloques (grid 3)
const Modelo3Bloques = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <Heading eyebrow="El modelo" title="Tres bloques." />
      <div className="grid grid-cols-3 gap-8">
        {[
          ["CPU", "Ejecuta las instrucciones."],
          ["Memoria", "Guarda datos y programa, todo junto."],
          ["Entrada / Salida", "Conecta con el mundo."],
        ].map(([title, body], i) => (
          <div
            key={title}
            className={`rounded-2xl border p-10 ${
              i === 1 ? "border-2 border-ember bg-ember/10" : "border-border bg-surface"
            }`}
          >
            <div className="font-mono text-sm text-ember mb-4 uppercase tracking-widest">
              0{i + 1}
            </div>
            <div className="font-display text-4xl font-bold mb-4">{title}</div>
            <div className="text-2xl text-muted-foreground leading-snug">{body}</div>
          </div>
        ))}
      </div>
      <p className="font-mono text-lg text-muted-foreground">
        Conectados por <span className="text-ember">buses</span>.
      </p>
    </div>
  </Shell>
);

// 5 — diagrama-completo (diagrama nativo: CPU ↔ memoria ↔ E/S)
const DiagramaCompleto = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-6">
      <Heading compact eyebrow="El mapa" title="El diagrama completo." />

      <div className="grid grid-cols-[1.7fr_auto_1fr] items-center gap-6">
        {/* CPU: registros arriba; ALU + UC abajo */}
        <Box accent className="p-8">
          <div className="font-mono text-sm text-ember mb-6 uppercase tracking-widest">
            CPU
          </div>
          <Box className="p-5 mb-6">
            <div className="font-display text-2xl font-bold">Registros</div>
            <div className="font-mono text-base text-muted-foreground mt-1">
              PC · IR · MAR · MDR · AC · banco
            </div>
          </Box>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <Box className="p-5 text-center">
              <div className="font-display text-2xl font-bold">ALU</div>
              <div className="font-mono text-sm text-muted-foreground mt-1">calcula</div>
            </Box>
            <span className="text-ember font-mono text-3xl">↔</span>
            <Box className="p-5 text-center">
              <div className="font-display text-2xl font-bold">Unidad de Control</div>
              <div className="font-mono text-sm text-muted-foreground mt-1">dirige</div>
            </Box>
          </div>
        </Box>

        {/* puente CPU ↔ memoria */}
        <div className="flex flex-col items-center">
          <span className="text-ember font-mono text-4xl">↔</span>
          <span className="font-mono text-xs text-muted-foreground mt-2">buses</span>
        </div>

        {/* Memoria principal */}
        <Box className="p-8 text-center self-stretch flex flex-col justify-center">
          <div className="font-display text-3xl font-bold">Memoria</div>
          <div className="font-mono text-base text-muted-foreground mt-1">principal</div>
        </Box>
      </div>

      {/* CPU ↕ E/S */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-ember font-mono text-4xl">↕</span>
        <Box className="px-14 py-6 text-center">
          <div className="font-display text-3xl font-bold">Entrada / Salida</div>
        </Box>
      </div>
    </div>
  </Shell>
);

// 7 — alu (bloque función + grid de operaciones)
const Alu = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">
      <Heading
        compact
        eyebrow="El cálculo"
        title={
          <>
            ALU: <span className="text-ember">operandos y operación</span>.
          </>
        }
      />

      {/* bloque función: Op1, Op2, operación → resultado + flags/carry */}
      <div className="grid grid-cols-[1fr_auto_auto_auto_1fr] items-center gap-4">
        <div className="flex flex-col gap-3">
          {[
            ["Op1", "operando [4 bits]"],
            ["Op2", "operando [4 bits]"],
            ["Operación", "la elige la UC [4 bits]"],
          ].map(([k, v]) => (
            <Box key={k} className="px-5 py-3">
              <span className="font-display text-2xl font-bold">{k}</span>{" "}
              <span className="font-mono text-sm text-muted-foreground">{v}</span>
            </Box>
          ))}
        </div>

        <span className="text-ember font-mono text-3xl">→</span>

        <div className="relative w-[220px] h-[130px]">
          <svg viewBox="0 0 220 150" className="w-full h-full text-ember">
            <polygon
              points="10,15 90,15 110,42 130,15 210,15 160,135 60,135"
              fill="currentColor"
              fillOpacity={0.08}
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-4xl font-bold">ALU</span>
          </div>
        </div>

        <span className="text-ember font-mono text-3xl">→</span>

        <div className="flex flex-col gap-3">
          <Box accent className="px-5 py-3">
            <span className="font-display text-2xl font-bold">Resultado</span>{" "}
            <span className="font-mono text-sm text-muted-foreground">[4 bits]</span>
          </Box>
          <Box className="px-5 py-3">
            <span className="font-display text-2xl font-bold">Flags / Carry</span>
          </Box>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-5">
        <Box className="p-5">
          <div className="font-mono text-sm text-ember mb-3 uppercase tracking-widest">
            Aritméticas
          </div>
          <div className="font-display text-lg leading-relaxed">
            suma · resta · binario
          </div>
          <div className="mt-2 font-mono text-xs text-muted-foreground">
            complemento a 2 (voz)
          </div>
        </Box>
        <Box className="p-5">
          <div className="font-mono text-sm text-ember mb-3 uppercase tracking-widest">
            Lógicas (bit a bit)
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              ["AND", "Op1·Op2"],
              ["OR", "Op1 ∨ Op2"],
              ["NOT", "¬Op1"],
            ].map(([g, expr]) => (
              <div
                key={g}
                className="rounded-xl border border-border bg-surface-2/40 px-4 py-3 text-center"
              >
                <div className="font-display text-xl font-bold">{g}</div>
                <div className="font-mono text-sm text-muted-foreground">{expr}</div>
              </div>
            ))}
          </div>
        </Box>
      </div>
    </div>
  </Shell>
);

// 8 — unidad-control (diagrama nativo: IR/reloj → UC → señales)
const UnidadControl = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-6">
      <Heading
        compact
        eyebrow="El director"
        title={
          <>
            Unidad de <span className="text-ember">Control</span>.
          </>
        }
      />

      <div className="grid grid-cols-[auto_auto_auto_auto_auto_auto_1fr] items-center gap-4">
        {/* entradas */}
        <div className="flex flex-col gap-4">
          <Box className="px-5 py-4 text-center">
            <div className="font-display text-xl font-bold">IR</div>
            <div className="font-mono text-xs text-muted-foreground">instrucción</div>
          </Box>
          <Box className="px-5 py-4 text-center">
            <div className="font-display text-xl font-bold">Reloj</div>
            <div className="font-mono text-xs text-muted-foreground">clock</div>
          </Box>
        </div>

        <span className="text-ember font-mono text-2xl">→</span>

        {/* etapas */}
        <div className="flex flex-col gap-4">
          <Box className="px-5 py-4 text-center">
            <div className="font-display text-xl font-bold">Decodificador</div>
            <div className="font-mono text-xs text-muted-foreground">q1 … qn</div>
          </Box>
          <Box className="px-5 py-4 text-center">
            <div className="font-display text-xl font-bold">Gen. de tiempos</div>
            <div className="font-mono text-xs text-muted-foreground">T1 … Tn</div>
          </Box>
        </div>

        <span className="text-ember font-mono text-2xl">→</span>

        {/* UC central */}
        <Box accent className="px-7 py-8 text-center self-stretch flex flex-col justify-center">
          <div className="font-display text-2xl font-bold leading-tight">
            Unidad
            <br />
            de Control
          </div>
        </Box>

        <span className="text-ember font-mono text-2xl">→</span>

        {/* salidas: señales de control */}
        <div className="flex flex-col gap-3">
          <div className="font-mono text-sm text-ember uppercase tracking-widest">
            señales X1 … Xn
          </div>
          {["ALU", "Registros", "Memoria"].map((d) => (
            <Box key={d} className="px-5 py-2 text-center">
              <span className="font-display text-lg font-bold">{d}</span>
            </Box>
          ))}
        </div>
      </div>
    </div>
  </Shell>
);

// 9 — registros-memoria (dos columnas)
const RegistrosMemoria = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-6">
      <Heading compact eyebrow="Dónde viven los datos" title="Registros y memoria." />

      <div className="grid grid-cols-2 gap-8">
        {/* Registros */}
        <Box accent className="p-8">
          <div className="font-mono text-sm text-ember mb-2 uppercase tracking-widest">
            Registros
          </div>
          <div className="text-xl text-muted-foreground mb-6">
            Memoria ultrarrápida dentro de la CPU.
          </div>
          <div className="flex flex-col gap-3">
            {[
              ["PC", "próxima instrucción"],
              ["IR", "instrucción actual"],
              ["MAR / MDR", "puerta a memoria"],
              ["AC", "resultados intermedios"],
              ["Banco", "propósito general"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-3">
                <span className="font-mono text-lg text-ember w-32 shrink-0">{k}</span>
                <span className="text-xl">{v}</span>
              </div>
            ))}
          </div>
        </Box>

        {/* Memoria */}
        <Box className="p-8">
          <div className="font-mono text-sm text-ember mb-6 uppercase tracking-widest">
            Memoria
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-surface-2/40 p-5">
              <div className="font-display text-2xl font-bold">Principal · RAM</div>
              <div className="text-lg text-muted-foreground mt-1">
                Volátil y rápida. Guarda programa + datos.
              </div>
            </div>
            <div className="flex justify-center font-mono text-ember text-2xl">↕</div>
            <div className="rounded-xl border border-border bg-surface-2/40 p-5">
              <div className="font-display text-2xl font-bold">Secundaria · ROM</div>
              <div className="text-lg text-muted-foreground mt-1">
                No volátil. Firmware y datos fijos.
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  </Shell>
);

// 10 — buses (grid 3)
const Buses = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <Heading eyebrow="Las conexiones" title="Tres buses." />
      <div className="grid grid-cols-3 gap-8">
        {[
          ["Datos", "↔", "Bidireccional", "El contenido que va y viene."],
          ["Direcciones", "→", "Unidireccional", "Desde la CPU: el dónde."],
          ["Control", "⇄", "Señales", "RW, reloj, interrupciones (CPU ↔ periféricos)."],
        ].map(([title, arrow, kind, body], i) => (
          <Box key={title as string} accent={i === 0} className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-sm text-ember uppercase tracking-widest">
                {kind}
              </span>
              <span className="font-mono text-3xl text-ember">{arrow}</span>
            </div>
            <div className="font-display text-3xl font-bold mb-3">{title}</div>
            <div className="text-xl text-muted-foreground leading-snug">{body}</div>
          </Box>
        ))}
      </div>
    </div>
  </Shell>
);

// 11 — cuello-botella (tesis + diagrama del bus saturado)
const CuelloBotella = () => (
  <Shell bg="ember">
    <div className="flex h-full items-center">
      <div className="grid w-full grid-cols-[1fr_1.1fr] gap-12 items-center">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.3em] mb-4 opacity-60">
            El límite del modelo
          </p>
          <h2 className="font-display text-6xl font-bold leading-[0.95]">
            Un solo bus
            <br />
            = cuello de botella.
          </h2>
          <p className="mt-6 text-xl opacity-80 leading-snug max-w-[480px]">
            Datos, direcciones y control comparten el mismo canal. Si llegan a la vez,
            la CPU espera.
          </p>
          <p className="mt-4 font-mono text-base opacity-70">
            La caché y el pipeline lo alivian →
          </p>
        </div>

        <div
          className="rounded-2xl border-2 border-[oklch(0.18_0_0)]/35 bg-[oklch(0.18_0_0)]/12 p-7"
        >
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-5">
            <div className="rounded-2xl border-2 border-[oklch(0.18_0_0)]/40 bg-[oklch(0.18_0_0)]/18 p-5 text-center">
              <div className="font-display text-3xl font-bold">CPU</div>
              <div className="mt-2 font-mono text-xs opacity-70">quiere leer / escribir</div>
              <div className="mt-3 inline-block rounded-lg border border-[oklch(0.18_0_0)]/50 px-3 py-1.5 font-mono text-xs opacity-90">
                esperando…
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 w-[200px]">
              <span className="font-mono text-xs uppercase tracking-[0.25em] opacity-80">
                un solo bus
              </span>
              <div className="relative h-14 w-full rounded-full border-2 border-[oklch(0.18_0_0)]/45 bg-[oklch(0.18_0_0)]/10">
                <div className="absolute inset-0 flex items-center justify-center gap-1.5 px-2">
                  {["D", "I", "A", "D", "C"].map((label, i) => (
                    <div
                      key={`${label}-${i}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[oklch(0.18_0_0)]/50 bg-[oklch(0.18_0_0)]/25 font-mono text-xs font-bold"
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] opacity-80">
                saturado
              </span>
            </div>

            <div className="rounded-2xl border-2 border-[oklch(0.18_0_0)]/40 bg-[oklch(0.18_0_0)]/18 p-5 text-center">
              <div className="font-display text-3xl font-bold">Memoria</div>
              <div className="mt-2 font-mono text-xs opacity-70">datos + programa</div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-1 font-mono text-sm opacity-85">
            <span><strong className="opacity-100">D</strong> = datos</span>
            <span><strong className="opacity-100">I</strong> = instrucción</span>
            <span><strong className="opacity-100">A</strong> = dirección</span>
            <span><strong className="opacity-100">C</strong> = control</span>
          </div>
          <p className="mt-3 text-center font-mono text-xs opacity-75">
            D repetido = dos peticiones de datos compitiendo
          </p>
        </div>
      </div>
    </div>
  </Shell>
);

// 12 — mitigaciones (grid 4)
const Mitigaciones = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-6">
      <Heading compact eyebrow="Cómo se alivia" title="Cuatro estrategias." />
      <div className="grid grid-cols-2 gap-5">
        {[
          ["Caché", "Guarda los datos frecuentes cerca de la CPU."],
          ["Harvard modificada", "Cachés separadas para instrucciones y datos."],
          [
            "Pipeline",
            "Varias instrucciones en distintas fases a la vez.",
          ],
          [
            "Predictores de salto",
            "Adivinan if/loops para no frenar el pipeline.",
          ],
        ].map(([title, body], i) => (
          <Box key={title} className="p-6">
            <div className="font-mono text-sm text-ember mb-3 uppercase tracking-widest">
              0{i + 1}
            </div>
            <div className="font-display text-2xl font-bold mb-2">{title}</div>
            <div className="text-lg text-muted-foreground leading-snug">{body}</div>
          </Box>
        ))}
      </div>
    </div>
  </Shell>
);

// 13 — codigo-lenguajes (escalera de abstracción)
const CodigoLenguajes = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      <Heading
        eyebrow="Del hardware al software"
        title={
          <>
            De unos y ceros a <span className="text-ember">Python</span>.
          </>
        }
      />

      <div className="flex items-stretch gap-6">
        {/* eje de abstracción */}
        <div className="flex flex-col items-center justify-between py-2">
          <span className="font-mono text-2xl text-ember">↑</span>
          <span className="font-mono text-sm text-muted-foreground [writing-mode:vertical-rl] rotate-180">
            más abstracción
          </span>
        </div>

        {/* escalones (de más alto a más bajo nivel) */}
        <div className="flex-1 flex flex-col gap-4">
          {[
            ["C / Python", "alto nivel", "good", "c = a + b", 8],
            [
              "Assembler",
              "bajo nivel legible",
              "default",
              CANONICAL_ASSEMBLER,
              4,
            ],
            ["Código máquina", "0 / 1 · no legible", "bad", "10100001 00010110 …", 0],
          ].map(([title, sub, tone, code, indent]) => (
            <div key={title as string} style={{ marginLeft: `${(indent as number) * 1.5}rem` }}>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-display text-2xl font-bold">{title}</span>
                <span className="font-mono text-sm text-muted-foreground">{sub}</span>
              </div>
              <CodeBlock tone={tone as "default" | "good" | "bad"}>
                {code as string}
              </CodeBlock>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Shell>
);

// 14 — ciclo-fde-fases (F1–F3 + PC)
const CicloFdeFases = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <Heading
        eyebrow="El ciclo"
        title={
          <>
            Buscar · Decodificar · <span className="text-ember">Ejecutar</span>
          </>
        }
      />
      <div className="flex items-center justify-center gap-6">
        {["Buscar", "Decodificar", "Ejecutar"].map((s, i, arr) => (
          <Fragment key={s}>
            <div className="flex-1 max-w-[420px] rounded-2xl border border-border bg-surface p-8 text-center">
              <div className="font-mono text-sm text-ember mb-2">F{i + 1}</div>
              <div className="font-display text-3xl font-bold">{s}</div>
            </div>
            {i < arr.length - 1 && (
              <span className="text-ember font-mono text-3xl shrink-0">→</span>
            )}
          </Fragment>
        ))}
      </div>
      <p className="text-2xl max-w-[1300px] leading-snug">
        El <span className="text-ember font-bold">PC</span> apunta a la{" "}
        <span className="text-ember font-bold">próxima</span> instrucción; los saltos
        y loops cambian el PC y controlan el flujo.
      </p>
    </div>
  </Shell>
);

// 15 — ciclo-fde-ejemplo (mnemonics + A+B)
const CicloFdeEjemplo = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">
      <Heading compact eyebrow="Instrucciones básicas" title="LOAD · STORE · ADD · FIN." />
      <div className="flex flex-wrap gap-3">
        {[
          ["LOAD", "cargar"],
          ["STORE", "guardar"],
          ["ADD", "sumar"],
          ["FIN", "terminar"],
        ].map(([op, desc]) => (
          <div
            key={op}
            className="rounded-xl border border-border bg-surface px-5 py-3 text-center"
          >
            <span className="font-mono text-lg text-ember">{op}</span>
            <span className="ml-2 text-base text-muted-foreground">{desc}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <CodeBlock label="pseudocódigo · A=5 · B=7 · C=12" tone="good">
{`A = 5
B = 7
C = A + B`}
        </CodeBlock>
        <CodeBlock label="assembler" tone="default">{CANONICAL_ASSEMBLER}</CodeBlock>
      </div>
    </div>
  </Shell>
);

// 15 — simulador-vivo (demo didáctica paso a paso, 4 steps con →)
const SimuladorVivo = ({ step = 0 }: { step?: number }) => (
  <Shell bg="panel">
    <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">
      <Heading
        compact
        eyebrow="Ejemplo"
        title={
          <>
            C = A + B, <span className="text-ember">paso a paso</span>.
          </>
        }
      />

      <div className="grid grid-cols-[1.15fr_1fr] gap-6 items-start">
        <CodeBlock label="programa · A=5 · B=7" tone="good">
          {CANONICAL_ASSEMBLER}
        </CodeBlock>
        <p className="text-xl text-muted-foreground leading-snug">
          Cada instrucción pasa por buscar, decodificar y ejecutar. Pulsar{" "}
          <span className="text-ember font-mono">→</span> para revelar el
          resultado de cada una.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {FDE_DEMO_STEPS.map((s, i) => {
          const lit = step >= i + 1;
          return (
            <Box
              key={s.instr}
              accent={lit}
              className={`p-5 transition-opacity ${lit ? "" : "opacity-35"}`}
            >
              <div className="font-mono text-xs text-ember mb-2 uppercase tracking-widest">
                Instrucción {i + 1}
              </div>
              <div className="font-mono text-sm mb-2">{s.instr}</div>
              <div className="font-display text-2xl font-bold text-ember">
                {lit ? s.result : "…"}
              </div>
              {lit && (
                <p className="mt-2 text-sm text-muted-foreground leading-snug">
                  {s.detail}
                </p>
              )}
            </Box>
          );
        })}
      </div>
    </div>
  </Shell>
);

// 16 — cierre (imagen full-bleed: Gracias + nombre)
const Cierre = () => (
  <Shell noChrome>
    <img
      src={HIST_PHOTOS.cierreGracias}
      alt="Gracias — Alejandro Repetto"
      className="absolute inset-0 h-full w-full object-cover"
    />
  </Shell>
);

// 17 — fuentes (créditos)
const Fuentes = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <Heading eyebrow="Referencias" title="Fuentes y material." />
      <div className="grid grid-cols-2 gap-6 max-w-[1400px]">
        {[
          ["Mr Ryan", "Historia y cuello de botella de Von Neumann"],
          ["VT Security", "Componentes, ciclo FDE y LOAD/STORE/ADD"],
          ["Material de cátedra", "Diagramas CPU, buses y registros"],
          ["Sitio educativo", "Simulador FDE interactivo (bonus en descripción)"],
        ].map(([k, v]) => (
          <div key={k} className="bg-surface border border-border rounded-2xl p-8">
            <div className="font-mono text-sm text-ember mb-3 uppercase tracking-widest">
              {k}
            </div>
            <div className="font-display text-2xl leading-snug">{v}</div>
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

export const slidesVonNeumann: SlideDefBase[] = [
  {
    id: "cover",
    title: "Portada",
    Component: Cover,
    notes:
      "Hook: ¿Sabías que tu dispositivo y una computadora de finales de la Segunda Guerra Mundial usan la misma arquitectura? Von Neumann — en este video: de dónde salió, cómo funciona y por qué es relevante.",
  },
  {
    id: "historia-1",
    title: "Entre 1944 y 1946",
    Component: Historia1,
    notes:
      "Entre 1944 y 1946 von Neumann escribe un informe sobre las primeras computadoras electrónicas. El aporte clave: memoria que guarda datos Y programa (nombre 'programa almacenado' en historia-2).",
  },
  {
    id: "historia-2",
    title: "ENIAC → EDVAC",
    Component: Historia2,
    notes:
      "Vio las limitaciones del ENIAC (recableado a mano). Con el EDVAC nace el 'programa almacenado' (1945): del recableado al programa en memoria.",
  },
  {
    id: "modelo-3-bloques",
    title: "Tres bloques",
    Component: Modelo3Bloques,
    notes:
      "Mapa rápido (30 s): la CPU ejecuta, la memoria guarda datos y programa juntos, la E/S conecta con el mundo. Los tres bloques se conectan por buses.",
  },
  {
    id: "diagrama-completo",
    title: "El diagrama completo",
    Component: DiagramaCompleto,
    notes:
      "Mapa completo: CPU (registros incl. AC, ALU, UC), memoria principal y E/S. Primera vez que nombramos las piezas internas.",
  },
  {
    id: "buses",
    title: "Tres buses",
    Component: Buses,
    notes:
      "Tres buses: datos (bidireccional), direcciones (unidireccional desde CPU) y control (RW, reloj, interrupciones).",
  },
  {
    id: "alu",
    title: "ALU: el cálculo",
    Component: Alu,
    notes:
      "ALU: A, B, operación → resultado + flags. Aritmética (suma, resta, binario; complemento a 2 en voz). Lógica AND/OR/NOT en slide; NAND/NOR en voz si hace falta.",
  },
  {
    id: "unidad-control",
    title: "Unidad de Control",
    Component: UnidadControl,
    notes:
      "UC decodifica IR, sincroniza con reloj (T1..Tn), emite señales X1..Xn hacia ALU, registros y memoria.",
  },
  {
    id: "registros-memoria",
    title: "Registros y memoria",
    Component: RegistrosMemoria,
    notes:
      "Registros: PC, IR, MAR/MDR, AC, banco. RAM volátil (principal) vs ROM no volátil (secundaria, firmware).",
  },
  {
    id: "cuello-botella",
    title: "Cuello de botella",
    Component: CuelloBotella,
    notes:
      "CPU y memoria comparten un solo bus (D/I/A/C saturado). Cuello de botella Von Neumann. Caché y pipeline lo alivian → mitigaciones.",
  },
  {
    id: "mitigaciones",
    title: "Cómo se alivia",
    Component: Mitigaciones,
    notes:
      "Caché, Harvard modificada, pipeline, predictores de salto (estático/dinámico).",
  },
  {
    id: "ciclo-fde-fases",
    title: "Ciclo FDE",
    Component: CicloFdeFases,
    notes:
      "Fetch, Decode, Execute. PC apunta a la PRÓXIMA instrucción; saltos y loops cambian el PC.",
  },
  {
    id: "ciclo-fde-ejemplo",
    title: "LOAD · STORE · ADD · FIN",
    Component: CicloFdeEjemplo,
    notes:
      "Mnemonics básicos + ejemplo A=5, B=7, C=12. Mismo programa que el simulador.",
  },
  {
    id: "codigo-lenguajes",
    title: "De unos y ceros a Python",
    Component: CodigoLenguajes,
    notes:
      "Escalera: código máquina → assembler (LOAD/ADD/STORE alineado al simulador) → C/Python.",
  },
  {
    id: "simulador-vivo",
    title: "C = A + B paso a paso",
    Component: SimuladorVivo,
    steps: 4,
    notes:
      "Demo didáctica en deck: 4 instrucciones, 4 pasos con →. Narrar al revelar cada card. Sitio educativo opcional en descripción.",
  },
  {
    id: "cierre",
    title: "Cierre",
    Component: Cierre,
    notes:
      "Cierre a cámara (guion Toma N). Imagen cierre-gracias.png opcional como outro 2–3 s tras la voz.",
  },
  {
    id: "fuentes",
    title: "Fuentes y material",
    Component: Fuentes,
    notes:
      "Referencias: Mr Ryan, VT Security, cátedra, sitio simulador.",
  },
];
