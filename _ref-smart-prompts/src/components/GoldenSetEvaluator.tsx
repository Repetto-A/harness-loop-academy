import { useEffect, useMemo, useRef, useState } from "react";
import { Check, X, Play, RotateCcw, Zap, DollarSign } from "lucide-react";

type ModelId = "gemma" | "qwen" | "gpt";

interface ModelDef {
  id: ModelId;
  name: string;
  tag: string;
  tagColor: string;
  cost: number; // 1 = barato, 3 = caro
  latency: string;
  costLabel: string;
}

const MODELS: ModelDef[] = [
  {
    id: "gemma",
    name: "Gemma 4 (local)",
    tag: "En tu máquina",
    tagColor: "text-blue-400",
    cost: 1,
    latency: "rápido",
    costLabel: "casi gratis",
  },
  {
    id: "qwen",
    name: "Qwen 3.6 (local)",
    tag: "En tu máquina",
    tagColor: "text-blue-400",
    cost: 2,
    latency: "medio",
    costLabel: "GPU propia",
  },
  {
    id: "gpt",
    name: "GPT-5 mini (API)",
    tag: "API externa",
    tagColor: "text-ember",
    cost: 3,
    latency: "depende de red",
    costLabel: "paga por uso",
  },
];

interface Case {
  input: string;
  expected: string;
  // si el modelo acierta este caso
  correct: Record<ModelId, boolean>;
}

const GOLDEN_SET: Case[] = [
  {
    input: "No puedo entrar a mi cuenta desde ayer",
    expected: "Acceso",
    correct: { gemma: true, qwen: true, gpt: true },
  },
  {
    input: "Me cobraron dos veces el mismo plan",
    expected: "Facturación",
    correct: { gemma: true, qwen: true, gpt: true },
  },
  {
    input: "¿Tienen descuento para equipos grandes?",
    expected: "Ventas",
    correct: { gemma: false, qwen: true, gpt: true },
  },
  {
    input: "La app se cierra sola al subir un archivo",
    expected: "Bug técnico",
    correct: { gemma: true, qwen: true, gpt: true },
  },
  {
    input: "Quiero cancelar pero me siguen facturando",
    expected: "Facturación",
    correct: { gemma: false, qwen: false, gpt: true },
  },
  {
    input: "El informe exportado sale con datos de otro cliente",
    expected: "Bug técnico",
    correct: { gemma: true, qwen: true, gpt: true },
  },
  {
    input: "¿Pueden mandarme una factura A a nombre de mi empresa?",
    expected: "Facturación",
    correct: { gemma: true, qwen: true, gpt: true },
  },
  {
    input: "Necesito una demo antes de contratar el plan anual",
    expected: "Ventas",
    correct: { gemma: false, qwen: true, gpt: true },
  },
];

const COST_DOTS = (cost: number) => Array.from({ length: 3 }, (_, i) => i < cost);

export function GoldenSetEvaluator() {
  const [ran, setRan] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [threshold, setThreshold] = useState(85);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = GOLDEN_SET.length;
  const running = ran && revealed < total;

  useEffect(() => {
    if (!ran) return;
    timer.current = setInterval(() => {
      setRevealed((r) => {
        if (r >= total) {
          if (timer.current) clearInterval(timer.current);
          return r;
        }
        return r + 1;
      });
    }, 220);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [ran, total]);

  const accuracy = useMemo(() => {
    const acc: Record<ModelId, number> = { gemma: 0, qwen: 0, gpt: 0 };
    const shown = GOLDEN_SET.slice(0, revealed);
    for (const c of shown) {
      for (const m of MODELS) if (c.correct[m.id]) acc[m.id]++;
    }
    return acc;
  }, [revealed]);

  const pct = (m: ModelId) => (revealed === 0 ? 0 : Math.round((accuracy[m] / revealed) * 100));

  // El más barato que cumple el umbral (solo con la evaluación completa).
  const recommended = useMemo(() => {
    if (revealed < total) return null;
    const passing = MODELS.filter((m) => pct(m.id) >= threshold).sort((a, b) => a.cost - b.cost);
    return passing[0] ?? null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed, threshold, total]);

  function run() {
    setRevealed(0);
    setRan(true);
  }
  function reset() {
    if (timer.current) clearInterval(timer.current);
    setRan(false);
    setRevealed(0);
  }

  return (
    <div className="flex h-full flex-col gap-4 pointer-events-auto">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-4xl font-bold">¿Suficientemente bueno?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tarea: clasificar tickets de soporte. Mismo set de casos para los tres modelos.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {!ran || revealed >= total ? (
            <button
              type="button"
              onClick={run}
              className="flex items-center gap-2 rounded-lg bg-ember px-4 py-2 font-mono text-sm uppercase tracking-wider text-[oklch(0.18_0_0)] pointer-events-auto"
            >
              <Play className="size-4" />
              {ran ? "Correr de nuevo" : "Ejecutar evaluación"}
            </button>
          ) : (
            <span className="font-mono text-sm text-muted-foreground">
              Evaluando… {revealed}/{total}
            </span>
          )}
          {ran && (
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 font-mono text-xs uppercase tracking-wider hover:border-ember/40 pointer-events-auto"
              title="Reiniciar"
            >
              <RotateCcw className="size-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid flex-1 min-h-0 grid-cols-[1.5fr_1fr] gap-6">
        {/* Tabla golden set */}
        <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-[oklch(0.14_0_0)]">
          <div className="grid grid-cols-[1fr_repeat(3,7rem)] border-b border-border bg-surface/60 text-center shrink-0">
            <div className="px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Caso · categoría esperada
            </div>
            {MODELS.map((m) => (
              <div
                key={m.id}
                className="border-l border-border px-2 py-2.5 font-mono text-xs uppercase tracking-wide"
              >
                <div className={`font-semibold ${m.tagColor}`}>
                  {m.id === "gemma" ? "Gemma 4" : m.id === "qwen" ? "Qwen 3.6" : "GPT-5 mini"}
                </div>
                {revealed > 0 && (
                  <div
                    className={`mt-0.5 text-sm font-bold tabular-nums ${
                      revealed >= total && pct(m.id) >= threshold
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {`${pct(m.id)}%`}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-auto divide-y divide-border/40">
            {GOLDEN_SET.map((c, i) => {
              const isRevealed = i < revealed;
              return (
                <div key={c.input} className="grid grid-cols-[1fr_repeat(3,7rem)] items-center">
                  <div className="px-4 py-2.5">
                    <div className="text-sm leading-snug">{c.input}</div>
                    <div className="mt-0.5 font-mono text-[11px] text-ember">{c.expected}</div>
                  </div>
                  {MODELS.map((m) => (
                    <div
                      key={m.id}
                      className="flex h-full items-center justify-center border-l border-border/40 py-2"
                    >
                      {!isRevealed ? (
                        <span className="text-muted-foreground/40">–</span>
                      ) : c.correct[m.id] ? (
                        <Check className="size-4 text-green-400" />
                      ) : (
                        <X className="size-4 text-red-400" />
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel de decisión */}
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface/50 p-5">
          <div>
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span>Umbral mínimo aceptable</span>
              <span className="text-foreground">{threshold}%</span>
            </div>
            <input
              type="range"
              min={50}
              max={100}
              step={5}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="mt-2 w-full accent-ember pointer-events-auto"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              No buscás el mejor: buscás el más barato que cumpla tu barra.
            </p>
          </div>

          <div className="mt-1 border-t border-border/60 pt-4">
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Veredicto
            </div>
            {revealed < total ? (
              <p className="mt-2 text-sm text-muted-foreground">
                Ejecutá la evaluación para ver qué modelo alcanza.
              </p>
            ) : recommended ? (
              <>
                <div className="mt-2 inline-block rounded-xl border-2 border-green-500/50 bg-green-500/10 px-4 py-2 font-display text-xl font-bold text-green-300">
                  {recommended.name}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Es el más barato que supera el {threshold}%. Pagar por uno mejor no cambia el
                  resultado de tu tarea.
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="size-3.5" />
                    {COST_DOTS(recommended.cost).map((on, i) => (
                      <span
                        key={i}
                        className={`size-1.5 rounded-full ${on ? "bg-ember" : "bg-border"}`}
                      />
                    ))}
                    {recommended.costLabel}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="size-3.5" />
                    {recommended.latency}
                  </span>
                </div>
              </>
            ) : (
              <p className="mt-2 text-sm text-red-300">
                Ningún modelo llega al {threshold}%. Bajá la barra, mejorá el prompt o sumá contexto
                (RAG).
              </p>
            )}
          </div>

          <p className="mt-auto text-xs text-muted-foreground/80">
            Elegí contra tus casos, no por el leaderboard ni por la fama del modelo.
          </p>
        </div>
      </div>
    </div>
  );
}
