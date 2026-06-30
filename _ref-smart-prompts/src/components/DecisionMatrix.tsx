import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";

type Strategy = "propietario" | "local" | "hibrido";

interface AxisDef {
  id: string;
  label: string;
  options: { value: string; label: string; scores: Record<Strategy, number> }[];
}

const AXES: AxisDef[] = [
  {
    id: "data",
    label: "Tipo de dato",
    options: [
      {
        value: "public",
        label: "Público / genérico",
        scores: { propietario: 2, local: 1, hibrido: 1 },
      },
      {
        value: "internal",
        label: "Interno no sensible",
        scores: { propietario: 2, local: 1, hibrido: 2 },
      },
      {
        value: "pii",
        label: "PII / datos personales",
        scores: { propietario: 0, local: 3, hibrido: 3 },
      },
      {
        value: "secret",
        label: "Secreto comercial / legal",
        scores: { propietario: 0, local: 3, hibrido: 3 },
      },
    ],
  },
  {
    id: "risk",
    label: "Riesgo del error",
    options: [
      { value: "low", label: "Bajo (borrador)", scores: { propietario: 2, local: 2, hibrido: 1 } },
      {
        value: "medium",
        label: "Medio (revisión humana)",
        scores: { propietario: 2, local: 2, hibrido: 3 },
      },
      {
        value: "high",
        label: "Alto (decisión crítica)",
        scores: { propietario: 1, local: 2, hibrido: 3 },
      },
    ],
  },
  {
    id: "quality",
    label: "Necesidad de calidad",
    options: [
      {
        value: "basic",
        label: "Clasificación / extracción",
        scores: { propietario: 1, local: 3, hibrido: 2 },
      },
      {
        value: "good",
        label: "Resumen / redacción",
        scores: { propietario: 2, local: 2, hibrido: 2 },
      },
      {
        value: "frontier",
        label: "Razonamiento complejo",
        scores: { propietario: 3, local: 0, hibrido: 3 },
      },
    ],
  },
  {
    id: "frequency",
    label: "Frecuencia de uso",
    options: [
      { value: "once", label: "Ocasional", scores: { propietario: 3, local: 0, hibrido: 2 } },
      { value: "daily", label: "Diario", scores: { propietario: 2, local: 2, hibrido: 2 } },
      { value: "high", label: "Alto volumen", scores: { propietario: 1, local: 3, hibrido: 2 } },
    ],
  },
  {
    id: "privacy",
    label: "Privacidad",
    options: [
      { value: "none", label: "Sin restricción", scores: { propietario: 3, local: 1, hibrido: 1 } },
      {
        value: "policy",
        label: "Política interna estricta",
        scores: { propietario: 0, local: 3, hibrido: 3 },
      },
      {
        value: "regulatory",
        label: "Regulatorio (GDPR, etc.)",
        scores: { propietario: 0, local: 3, hibrido: 3 },
      },
    ],
  },
  {
    id: "trace",
    label: "Trazabilidad",
    options: [
      { value: "optional", label: "Opcional", scores: { propietario: 2, local: 2, hibrido: 1 } },
      {
        value: "required",
        label: "Auditoría requerida",
        scores: { propietario: 1, local: 2, hibrido: 3 },
      },
    ],
  },
  {
    id: "cost",
    label: "Presupuesto",
    options: [
      {
        value: "low",
        label: "Mínimo / capex limitado",
        scores: { propietario: 1, local: 3, hibrido: 2 },
      },
      {
        value: "medium",
        label: "Moderado (API OK)",
        scores: { propietario: 3, local: 1, hibrido: 2 },
      },
      {
        value: "high",
        label: "Alto (velocidad > costo)",
        scores: { propietario: 3, local: 0, hibrido: 2 },
      },
    ],
  },
];

const STRATEGY_META: Record<Strategy, { label: string; color: string; summary: string }> = {
  propietario: {
    label: "Modelo propietario",
    color: "border-ember bg-ember/10 text-ember",
    summary:
      "Mejor calidad y salida rápida. Datos no sensibles o con acuerdo de tratamiento (DPA).",
  },
  local: {
    label: "Local / open weights",
    color: "border-blue-500/50 bg-blue-500/10 text-blue-300",
    summary:
      "Datos en tu perímetro, tareas acotadas y menor dependencia externa. Más operación propia.",
  },
  hibrido: {
    label: "Híbrido",
    color: "border-purple-500/50 bg-purple-500/10 text-purple-300",
    summary: "Anonimizar en tu entorno, razonar con modelo propietario, revisar humano y auditar.",
  },
};

const DEFAULT_SELECTIONS: Record<string, string> = {
  data: "pii",
  risk: "medium",
  quality: "frontier",
  frequency: "daily",
  privacy: "policy",
  trace: "required",
  cost: "medium",
};

function computeRecommendation(selections: Record<string, string>): {
  strategy: Strategy;
  scores: Record<Strategy, number>;
  reasons: string[];
} {
  const totals: Record<Strategy, number> = { propietario: 0, local: 0, hibrido: 0 };
  const reasons: string[] = [];

  for (const axis of AXES) {
    const selected = axis.options.find((o) => o.value === selections[axis.id]);
    if (!selected) continue;
    totals.propietario += selected.scores.propietario;
    totals.local += selected.scores.local;
    totals.hibrido += selected.scores.hibrido;

    const best = (Object.entries(selected.scores) as [Strategy, number][]).sort(
      (a, b) => b[1] - a[1],
    )[0];
    if (best[1] >= 2) {
      reasons.push(`${axis.label} → ${STRATEGY_META[best[0]].label}`);
    }
  }

  const strategy = (Object.entries(totals) as [Strategy, number][]).sort(
    (a, b) => b[1] - a[1],
  )[0][0];
  return { strategy, scores: totals, reasons: reasons.slice(0, 4) };
}

export function DecisionMatrix() {
  const [selections, setSelections] = useState(DEFAULT_SELECTIONS);

  const { strategy, scores, reasons } = useMemo(
    () => computeRecommendation(selections),
    [selections],
  );

  const meta = STRATEGY_META[strategy];
  const maxScore = Math.max(...Object.values(scores), 1);

  const BAR_COLOR: Record<Strategy, string> = {
    propietario: "bg-ember",
    local: "bg-blue-500",
    hibrido: "bg-purple-500",
  };
  const SHORT_LABEL: Record<Strategy, string> = {
    propietario: "Propietario",
    local: "Local",
    hibrido: "Híbrido",
  };

  return (
    <div className="flex h-full flex-col gap-4 pointer-events-auto">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display text-4xl font-bold">¿Qué estrategia conviene?</h2>
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember/60" />
            <span className="relative inline-flex size-2 rounded-full bg-ember" />
          </span>
          Recalcula en vivo
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.95fr_1fr] gap-6">
        {/* Panel de control: un criterio por fila */}
        <div className="flex flex-col gap-2.5 overflow-auto pr-1">
          <div className="mb-0.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
            Ajustá cada criterio de tu caso →
          </div>
          {AXES.map((axis) => (
            <div
              key={axis.id}
              className="grid grid-cols-[140px_1fr] items-center gap-4 rounded-xl border border-border/60 bg-surface/30 px-4 py-2.5"
            >
              <div className="text-right font-mono text-xs uppercase leading-tight tracking-wider text-muted-foreground">
                {axis.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {axis.options.map((opt) => {
                  const selected = selections[axis.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelections((s) => ({ ...s, [axis.id]: opt.value }))}
                      className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm transition-all pointer-events-auto ${
                        selected
                          ? "bg-ember font-semibold text-[oklch(0.18_0_0)] ring-2 ring-ember/40"
                          : "border border-border bg-surface text-muted-foreground hover:border-ember/50 hover:text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Resultado en vivo */}
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface/50 p-5">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <CheckCircle2 className="size-4 text-ember" />
            Estrategia recomendada
          </div>
          <div
            className={`rounded-xl border-2 px-4 py-3 text-center font-display text-2xl font-bold transition-colors ${meta.color}`}
          >
            {meta.label}
          </div>
          <p className="text-sm leading-snug text-muted-foreground">{meta.summary}</p>

          <div className="mt-1 flex flex-col gap-2.5">
            {(Object.entries(scores) as [Strategy, number][])
              .sort((a, b) => b[1] - a[1])
              .map(([s, score]) => {
                const isWinner = s === strategy;
                const pct = Math.round((score / maxScore) * 100);
                return (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-20 shrink-0 text-right text-xs ${
                        isWinner ? "font-semibold text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {SHORT_LABEL[s]}
                    </div>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[oklch(0.22_0_0)]">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isWinner ? BAR_COLOR[s] : "bg-[oklch(0.42_0_0)]"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div
                      className={`w-5 text-right font-mono text-xs tabular-nums ${
                        isWinner ? "font-bold text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {score}
                    </div>
                  </div>
                );
              })}
          </div>

          {reasons.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border/60 pt-3">
              <span className="w-full font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                Por qué
              </span>
              {reasons.map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  {r}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
