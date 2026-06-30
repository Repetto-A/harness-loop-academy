import { useMemo, useState, type ReactNode } from "react";
import { Shield, Eye, Lock, KeyRound, Send, ShieldAlert, ArrowRight, Sparkles } from "lucide-react";

const SAMPLE_CONTRACT = `CONTRATO DE SERVICIOS - CONFIDENCIAL

Entre Acme Corp S.A. (CUIT 30-71234567-8) y el Sr. Juan Carlos Pérez
(DNI 28.456.789), domiciliado en Av. Corrientes 1234, CABA.

Contacto: juan.perez@empresa.com.ar · Tel: +54 11 4567-8901

Cláusula 3 - Honorarios: USD 125.000 anuales + bono de USD 45.000
condicionado a cumplimiento de KPIs comerciales del cliente TechNova SRL.

Datos del cliente final: María González (DNI 35.678.901), email
maria.gonzalez@cliente.com, tel 011-5555-4321.

Información comercial reservada: margen del 32% sobre contrato base.
No divulgar a terceros.`;

type PiiKind = "nombre" | "dni" | "cuit" | "email" | "telefono" | "direccion" | "monto";

interface PiiMatch {
  start: number;
  end: number;
  text: string;
  kind: PiiKind;
  token: string;
}

const PII_PATTERNS: { kind: PiiKind; regex: RegExp }[] = [
  { kind: "email", regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g },
  { kind: "cuit", regex: /\b\d{2}-\d{8}-\d\b/g },
  { kind: "dni", regex: /\b(?:DNI\s*)?\d{1,2}\.\d{3}\.\d{3}\b/gi },
  { kind: "telefono", regex: /(?:\+54\s?)?(?:0?11[\s-]?)?\d{4}[\s-]?\d{4}|Tel:\s*[\d\s+-]+/gi },
  {
    kind: "direccion",
    regex:
      /(?:Av\.|Calle|domiciliado en)\s+[A-Za-zÁÉÍÓÚáéíóúñÑ\s\d,.-]+(?:CABA|Buenos Aires|\d{4})/gi,
  },
  { kind: "monto", regex: /(?:USD|ARS|\$)\s*[\d.,]+(?:\.\d{2})?|\bUSD\s+\d[\d.,]*/gi },
  {
    kind: "nombre",
    regex:
      /\b(?:Sr\.|Sra\.|Dr\.|Dra\.)?\s*(?:[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)+)\b/g,
  },
];

const KIND_LABELS: Record<PiiKind, string> = {
  nombre: "Nombre",
  dni: "DNI",
  cuit: "CUIT",
  email: "Email",
  telefono: "Teléfono",
  direccion: "Dirección",
  monto: "Monto",
};

const KIND_COLORS: Record<PiiKind, string> = {
  nombre: "bg-red-500/30 text-red-200",
  dni: "bg-orange-500/30 text-orange-200",
  cuit: "bg-orange-500/30 text-orange-200",
  email: "bg-yellow-500/30 text-yellow-200",
  telefono: "bg-purple-500/30 text-purple-200",
  direccion: "bg-blue-500/30 text-blue-200",
  monto: "bg-pink-500/30 text-pink-200",
};

const KIND_WEIGHT: Record<PiiKind, number> = {
  dni: 5,
  cuit: 5,
  email: 4,
  nombre: 3,
  telefono: 3,
  direccion: 2,
  monto: 1,
};

function detectPii(text: string): PiiMatch[] {
  const counters: Record<PiiKind, number> = {
    nombre: 0,
    dni: 0,
    cuit: 0,
    email: 0,
    telefono: 0,
    direccion: 0,
    monto: 0,
  };

  const raw: Omit<PiiMatch, "token">[] = [];

  for (const { kind, regex } of PII_PATTERNS) {
    regex.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text)) !== null) {
      const value = m[0].trim();
      if (value.length < 3 && kind === "nombre") continue;
      if (kind === "nombre" && !isLikelyNombre(value)) continue;
      raw.push({ start: m.index, end: m.index + m[0].length, text: m[0], kind });
    }
  }

  raw.sort((a, b) => a.start - b.start || b.end - a.end);

  const merged: Omit<PiiMatch, "token">[] = [];
  for (const match of raw) {
    const overlap = merged.some((m) => match.start < m.end && match.end > m.start);
    if (!overlap) merged.push(match);
  }

  return merged.map((m) => {
    counters[m.kind]++;
    const prefix = m.kind.toUpperCase().replace("TELEFONO", "TEL");
    return { ...m, token: `[${prefix}_${counters[m.kind]}]` };
  });
}

function anonymizeText(text: string, matches: PiiMatch[]): string {
  if (matches.length === 0) return text;
  let result = "";
  let cursor = 0;
  for (const m of matches) {
    result += text.slice(cursor, m.start) + m.token;
    cursor = m.end;
  }
  result += text.slice(cursor);
  return result;
}

const NOMBRE_STOPWORDS = new Set([
  "de",
  "del",
  "la",
  "el",
  "los",
  "las",
  "entre",
  "y",
  "o",
  "confidencial",
  "servicios",
  "contrato",
  "cláusula",
  "datos",
  "información",
  "contacto",
  "honorarios",
  "cliente",
  "final",
  "comercial",
  "reservada",
]);

function isLikelyNombre(value: string): boolean {
  const trimmed = value.trim();
  if (/^(Acme|TechNova|CONTRATO|Cláusula|Datos|Información)/i.test(trimmed)) return false;
  const words = trimmed.replace(/^(?:Sr|Sra|Dr|Dra)\.\s*/i, "").split(/\s+/);
  const meaningful = words.filter((w) => !NOMBRE_STOPWORDS.has(w.toLowerCase()));
  return meaningful.length >= 2;
}

function HighlightedText({
  text,
  matches,
  activeKinds,
  variant = "discover",
}: {
  text: string;
  matches: PiiMatch[];
  activeKinds: Set<PiiKind>;
  variant?: "discover" | "audit";
}) {
  if (matches.length === 0) return <>{text}</>;

  const parts: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((m, i) => {
    if (cursor < m.start) parts.push(<span key={`t-${i}`}>{text.slice(cursor, m.start)}</span>);
    const masked = activeKinds.has(m.kind);

    if (variant === "discover" && !masked) {
      parts.push(<span key={`m-${i}`}>{m.text}</span>);
    } else {
      parts.push(
        <mark
          key={`m-${i}`}
          className={`rounded px-0.5 transition-all ${
            masked
              ? KIND_COLORS[m.kind]
              : "bg-transparent text-red-300 underline decoration-dotted decoration-red-400"
          }`}
          title={`${KIND_LABELS[m.kind]}${masked ? " · se enmascara" : " · queda expuesto"}`}
        >
          {m.text}
        </mark>,
      );
    }
    cursor = m.end;
  });
  if (cursor < text.length) parts.push(<span key="tail">{text.slice(cursor)}</span>);
  return <>{parts}</>;
}

function MaskedSourceText({
  text,
  matches,
  activeKinds,
}: {
  text: string;
  matches: PiiMatch[];
  activeKinds: Set<PiiKind>;
}) {
  if (matches.length === 0) return <>{text}</>;

  const parts: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((m, i) => {
    if (cursor < m.start) parts.push(<span key={`t-${i}`}>{text.slice(cursor, m.start)}</span>);
    if (activeKinds.has(m.kind)) {
      parts.push(
        <mark
          key={`m-${i}`}
          className="rounded px-0.5 bg-ember/20 text-ember ring-1 ring-ember/30"
          title={`${KIND_LABELS[m.kind]} → ${m.token}`}
        >
          {m.text}
        </mark>,
      );
    } else {
      parts.push(
        <span
          key={`m-${i}`}
          className="text-red-300 underline decoration-dotted decoration-red-400/70"
          title={`${KIND_LABELS[m.kind]} · queda expuesto`}
        >
          {m.text}
        </span>,
      );
    }
    cursor = m.end;
  });
  if (cursor < text.length) parts.push(<span key="tail">{text.slice(cursor)}</span>);
  return <>{parts}</>;
}

function AnonymizedRenderedText({ text, matches }: { text: string; matches: PiiMatch[] }) {
  if (matches.length === 0) return <>{text}</>;

  const parts: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((m, i) => {
    if (cursor < m.start) parts.push(<span key={`t-${i}`}>{text.slice(cursor, m.start)}</span>);
    parts.push(
      <span
        key={`m-${i}`}
        className="rounded px-1 py-px bg-ember/25 text-ember font-semibold"
        title={m.text}
      >
        {m.token}
      </span>,
    );
    cursor = m.end;
  });
  if (cursor < text.length) parts.push(<span key="tail">{text.slice(cursor)}</span>);
  return <>{parts}</>;
}

function BeforeAfterCompare({
  text,
  matches,
  maskedMatches,
  activeKinds,
}: {
  text: string;
  matches: PiiMatch[];
  maskedMatches: PiiMatch[];
  activeKinds: Set<PiiKind>;
}) {
  const lines = text.split("\n");
  let offset = 0;

  if (maskedMatches.length === 0) {
    return (
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-[oklch(0.14_0_0)] px-6 text-center">
        <Lock className="size-8 text-muted-foreground mb-3" />
        <p className="font-display text-lg text-muted-foreground">
          Marcá al menos un tipo de dato arriba para ver el antes y después.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col rounded-xl border border-border overflow-hidden bg-[oklch(0.14_0_0)]">
      <div className="grid grid-cols-2 border-b border-border bg-surface/60 shrink-0">
        <div className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground flex items-center gap-2 border-r border-border">
          <span className="size-2 rounded-full bg-[oklch(0.6_0.22_25)]" />
          Original · queda en tu equipo
        </div>
        <div className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-ember flex items-center gap-2">
          <Lock className="size-3.5" />
          Anonimizado · apto para salir
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto divide-y divide-border/40">
        {lines.map((line, i) => {
          const lineStart = offset;
          const lineEnd = lineStart + line.length;
          offset = lineEnd + 1;

          const lineAll = matches.filter((m) => m.start >= lineStart && m.end <= lineEnd);
          const lineMasked = maskedMatches.filter((m) => m.start >= lineStart && m.end <= lineEnd);

          return (
            <div key={i} className="grid grid-cols-2 min-h-[2rem]">
              <div className="px-4 py-2 font-mono text-xs leading-relaxed whitespace-pre-wrap border-r border-border/40 text-foreground/90">
                {line.length === 0 ? (
                  <span className="opacity-0 select-none">·</span>
                ) : (
                  <MaskedSourceText
                    text={line}
                    matches={lineAll.map((m) => ({
                      ...m,
                      start: m.start - lineStart,
                      end: m.end - lineStart,
                    }))}
                    activeKinds={activeKinds}
                  />
                )}
              </div>
              <div className="px-4 py-2 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                {line.length === 0 ? (
                  <span className="opacity-0 select-none">·</span>
                ) : lineMasked.length > 0 ? (
                  <AnonymizedRenderedText
                    text={line}
                    matches={lineMasked.map((m) => ({
                      ...m,
                      start: m.start - lineStart,
                      end: m.end - lineStart,
                    }))}
                  />
                ) : (
                  line
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const STEPS = [
  { id: "detect", label: "1 · Detectar", icon: Eye },
  { id: "anon", label: "2 · Anonimizar", icon: Lock },
  { id: "send", label: "3 · Enviar", icon: Send },
  { id: "rehydrate", label: "4 · Re-hidratar", icon: KeyRound },
] as const;

type StepId = (typeof STEPS)[number]["id"];

function buildModelAnswer(matches: PiiMatch[]): string {
  const nombre = matches.find((m) => m.kind === "nombre")?.token ?? "[NOMBRE_1]";
  const montos = matches.filter((m) => m.kind === "monto").map((m) => m.token);
  const m1 = montos[0] ?? "[MONTO_1]";
  const m2 = montos[1] ?? "[MONTO_2]";
  return `La cláusula 3 fija honorarios de ${m1} anuales para ${nombre}, con un bono de ${m2} atado a KPIs. Sugiero aclarar la moneda y el plazo de pago antes de firmar.`;
}

function rehydrate(answer: string, matches: PiiMatch[]): string {
  let result = answer;
  for (const m of matches) {
    result = result.split(m.token).join(m.text);
  }
  return result;
}

export function LocalAnonymizerDemo() {
  const [text, setText] = useState(SAMPLE_CONTRACT);
  const [step, setStep] = useState<StepId>("detect");
  const [editing, setEditing] = useState(false);
  const [activeKinds, setActiveKinds] = useState<Set<PiiKind>>(() => new Set());

  const matches = useMemo(() => detectPii(text), [text]);

  const maskedMatches = useMemo(
    () => matches.filter((m) => activeKinds.has(m.kind)),
    [matches, activeKinds],
  );
  const exposedMatches = useMemo(
    () => matches.filter((m) => !activeKinds.has(m.kind)),
    [matches, activeKinds],
  );

  const anonymized = useMemo(() => anonymizeText(text, maskedMatches), [text, maskedMatches]);
  const modelAnswer = useMemo(() => buildModelAnswer(matches), [matches]);
  const rehydrated = useMemo(() => rehydrate(modelAnswer, matches), [modelAnswer, matches]);

  const kindCounts = useMemo(() => {
    const counts: Partial<Record<PiiKind, number>> = {};
    for (const m of matches) counts[m.kind] = (counts[m.kind] ?? 0) + 1;
    return counts;
  }, [matches]);

  const totalWeight = useMemo(
    () => matches.reduce((sum, m) => sum + KIND_WEIGHT[m.kind], 0) || 1,
    [matches],
  );
  const exposedWeight = useMemo(
    () => exposedMatches.reduce((sum, m) => sum + KIND_WEIGHT[m.kind], 0),
    [exposedMatches],
  );
  const exposurePct = Math.round((exposedWeight / totalWeight) * 100);

  const exposureColor =
    exposurePct >= 66
      ? "oklch(0.6 0.22 25)"
      : exposurePct >= 25
        ? "oklch(0.75 0.16 75)"
        : "oklch(0.72 0.18 150)";
  const exposureLabel = exposurePct >= 66 ? "ALTA" : exposurePct >= 25 ? "MEDIA" : "BAJA";

  function toggleKind(kind: PiiKind) {
    setActiveKinds((prev) => {
      const next = new Set(prev);
      if (next.has(kind)) next.delete(kind);
      else next.add(kind);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-4 h-full pointer-events-auto">
      <h2 className="font-display text-4xl font-bold">Anonimización local</h2>

      {/* Stepper + medidor de exposición compacto */}
      <div className="flex items-center justify-between gap-4 pointer-events-auto">
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep(s.id)}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-2 font-mono text-sm uppercase tracking-wider transition-colors pointer-events-auto ${
                    active
                      ? "bg-ember text-[oklch(0.18_0_0)]"
                      : "border border-border bg-surface hover:border-ember/40"
                  }`}
                >
                  <Icon className="size-4" />
                  {s.label}
                </button>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="size-3.5 text-muted-foreground shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        <div
          className="flex items-center gap-2.5 rounded-full border px-3 py-1.5 shrink-0"
          style={{ borderColor: `${exposureColor}55`, background: `${exposureColor}14` }}
          title="Nivel de datos sensibles que aún cruzarían la red"
        >
          {exposurePct >= 25 ? (
            <ShieldAlert className="size-4" style={{ color: exposureColor }} />
          ) : (
            <Shield className="size-4" style={{ color: exposureColor }} />
          )}
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Exposición
          </span>
          <div className="h-1.5 w-16 rounded-full bg-[oklch(0.22_0_0)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${exposurePct}%`, background: exposureColor }}
            />
          </div>
          <span
            className="font-mono text-xs font-bold tabular-nums"
            style={{ color: exposureColor }}
          >
            {exposureLabel}
          </span>
        </div>
      </div>

      {Object.keys(kindCounts).length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mr-1">
            {activeKinds.size === 0
              ? "Marcá qué tipos de dato enmascarar:"
              : "Click para agregar o quitar:"}
          </span>
          {(Object.entries(kindCounts) as [PiiKind, number][]).map(([kind, count]) => {
            const on = activeKinds.has(kind);
            return (
              <button
                key={kind}
                type="button"
                onClick={() => toggleKind(kind)}
                className={`rounded-full px-2.5 py-0.5 text-xs font-mono transition-all pointer-events-auto ${
                  on
                    ? KIND_COLORS[kind]
                    : "border border-border bg-surface text-muted-foreground hover:border-ember/40"
                }`}
                title={on ? "Se enmascara" : "Click para marcar"}
              >
                {KIND_LABELS[kind]}: {count}
              </button>
            );
          })}
        </div>
      )}

      {/* STEP: detectar */}
      {step === "detect" && (
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest">
              <Eye className="size-3.5" />
              Datos que NO deberían salir del perímetro
            </div>
            <button
              type="button"
              onClick={() => setEditing((v) => !v)}
              className="rounded-lg border border-border bg-surface px-3 py-1 font-mono text-xs uppercase tracking-wider hover:border-ember/40 pointer-events-auto"
            >
              {editing ? "Ver resaltado" : "Editar texto"}
            </button>
          </div>
          {editing ? (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 min-h-[280px] w-full rounded-xl border border-border bg-[oklch(0.14_0_0)] p-5 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-ember/50 pointer-events-auto"
              spellCheck={false}
            />
          ) : (
            <div className="flex-1 min-h-[280px] overflow-auto rounded-xl border border-border bg-[oklch(0.14_0_0)] p-5 font-mono text-sm leading-relaxed whitespace-pre-wrap">
              <HighlightedText
                text={text}
                matches={matches}
                activeKinds={activeKinds}
                variant="discover"
              />
            </div>
          )}
        </div>
      )}

      {/* STEP: anonimizar */}
      {step === "anon" && (
        <BeforeAfterCompare
          text={text}
          matches={matches}
          maskedMatches={maskedMatches}
          activeKinds={activeKinds}
        />
      )}

      {/* STEP: enviar (boundary) */}
      {step === "send" && (
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 flex-1 min-h-0 items-stretch">
          <div className="flex flex-col min-h-0">
            <div className="font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2 text-[oklch(0.72_0.18_150)]">
              <Shield className="size-3.5" />
              Tu equipo / tu red
            </div>
            <div className="flex-1 overflow-auto rounded-xl border border-[oklch(0.72_0.18_150)]/40 bg-[oklch(0.72_0.18_150)]/5 p-4">
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                <KeyRound className="size-3.5" /> Vault local · token ↔ original
              </div>
              <div className="flex flex-col gap-1 font-mono text-xs">
                {maskedMatches.length === 0 && (
                  <span className="text-muted-foreground">Sin enmascarar nada aún.</span>
                )}
                {maskedMatches.map((m, i) => (
                  <div key={`${m.token}-${i}`} className="flex items-center gap-2">
                    <span className="text-ember">{m.token}</span>
                    <ArrowRight className="size-3 text-muted-foreground" />
                    <span className="text-foreground/80 truncate">{m.text}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-[oklch(0.72_0.18_150)]">
                Este mapa nunca sale de tu equipo.
              </p>
            </div>
          </div>

          {/* Boundary */}
          <div className="relative flex flex-col items-center justify-center px-1">
            <div className="h-full w-px border-l-2 border-dashed border-ember/50" />
            <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 rounded-lg border border-ember/40 bg-ember/10 px-3 py-2">
              <Send className="size-4 text-ember" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-ember">
                límite de red
              </span>
            </div>
          </div>

          <div className="flex flex-col min-h-0">
            <div className="font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2 text-ember">
              <Send className="size-3.5" />
              Lo que cruza a la API externa
            </div>
            <div className="flex-1 overflow-auto rounded-xl border-2 border-ember/40 bg-ember/5 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
              {anonymized}
            </div>
            {exposedMatches.length > 0 && (
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                <ShieldAlert className="size-4 shrink-0" />
                {exposedMatches.length} dato(s) sin enmascarar todavía cruzan la red.
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP: re-hidratar */}
      {step === "rehydrate" && (
        <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
          <div className="flex flex-col min-h-0">
            <div className="font-mono text-xs text-ember uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles className="size-3.5" />
              Respuesta del modelo (con tokens)
            </div>
            <div className="flex-1 overflow-auto rounded-xl border border-ember/40 bg-ember/5 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
              {modelAnswer}
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              El modelo nunca vio los datos reales, responde sobre los tokens.
            </p>
          </div>
          <div className="flex flex-col min-h-0">
            <div className="font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2 text-[oklch(0.72_0.18_150)]">
              <KeyRound className="size-3.5" />
              Re-hidratada en tu equipo
            </div>
            <div className="flex-1 overflow-auto rounded-xl border-2 border-[oklch(0.72_0.18_150)]/40 bg-[oklch(0.72_0.18_150)]/5 p-4 text-sm leading-relaxed whitespace-pre-wrap">
              {rehydrated}
            </div>
            <p className="mt-2 text-[11px] text-[oklch(0.72_0.18_150)]">
              El vault local reemplaza los tokens por los valores reales.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between gap-5">
        <p className="text-base text-muted-foreground">
          El riesgo no es usar IA, sino enviar{" "}
          <span className="text-foreground font-semibold">datos sensibles sin anonimizar</span>. El
          mapa para revertir vive solo en tu equipo.
        </p>
        <div className="flex items-start gap-2 shrink-0 max-w-[44%] rounded-lg border border-border bg-surface/60 px-3 py-2">
          <ShieldAlert className="size-4 text-ember shrink-0 mt-0.5" />
          <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
            Demo educativa: detecta PII con regex y se le escapa un nombre en minúscula o sin
            título. En producción: NER, Microsoft Presidio o modelos de PII.
          </p>
        </div>
      </div>
    </div>
  );
}
