import { useCallback, useMemo, useRef, useState, type PointerEvent } from "react";

// Supuestos simples y editables conceptualmente (mensuales).
const API_PER_REQ = 0.03; // USD por request a la API
const LOCAL_FIXED = 800; // USD fijos: GPU amortizada + operación
const LOCAL_PER_REQ = 0.002; // USD marginal por request local

const MAX_VOL = 100_000; // tope del eje X (requests / mes)

const apiCost = (vol: number) => vol * API_PER_REQ;
const localCost = (vol: number) => LOCAL_FIXED + vol * LOCAL_PER_REQ;

// Punto donde se cruzan: API_PER_REQ * q = LOCAL_FIXED + LOCAL_PER_REQ * q
const BREAK_EVEN = Math.round(LOCAL_FIXED / (API_PER_REQ - LOCAL_PER_REQ));

const fmtUSD = (n: number) => (n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${Math.round(n)}`);
const fmtVol = (n: number) => (n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`);

// Geometría del SVG.
const W = 560;
const H = 320;
const PAD = { top: 20, right: 24, bottom: 40, left: 56 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

const yMax = Math.max(apiCost(MAX_VOL), localCost(MAX_VOL));

const x = (vol: number) => PAD.left + (vol / MAX_VOL) * plotW;
const y = (cost: number) => PAD.top + plotH - (cost / yMax) * plotH;

function volFromPointer(svg: SVGSVGElement, clientX: number) {
  const rect = svg.getBoundingClientRect();
  const relX = (clientX - rect.left) / rect.width;
  const svgX = relX * W;
  const raw = ((svgX - PAD.left) / plotW) * MAX_VOL;
  const clamped = Math.max(0, Math.min(MAX_VOL, raw));
  return Math.round(clamped / 1000) * 1000;
}

export function CostCalculator() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [vol, setVol] = useState(BREAK_EVEN);

  const setVolFromPointer = useCallback((clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    setVol(volFromPointer(svg, clientX));
  }, []);

  const onPlotPointerDown = useCallback(
    (e: PointerEvent<SVGRectElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      setVolFromPointer(e.clientX);
    },
    [setVolFromPointer],
  );

  const onPlotPointerMove = useCallback(
    (e: PointerEvent<SVGRectElement>) => {
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
      setVolFromPointer(e.clientX);
    },
    [setVolFromPointer],
  );

  const onPlotPointerUp = useCallback((e: PointerEvent<SVGRectElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  const api = apiCost(vol);
  const local = localCost(vol);
  const localWins = local < api;

  const gridLines = useMemo(() => [0.25, 0.5, 0.75, 1].map((f) => f * yMax), []);
  const xTicks = useMemo(() => [0, 0.25, 0.5, 0.75, 1].map((f) => f * MAX_VOL), []);

  return (
    <div className="flex h-full flex-col gap-4 pointer-events-auto">
      <div>
        <h2 className="font-display text-4xl font-bold">¿API o infraestructura propia?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A bajo volumen gana la API. A volumen sostenido, lo propio se amortiza.
        </p>
      </div>

      <div className="grid flex-1 min-h-0 grid-cols-[1.5fr_1fr] gap-6">
        {/* Chart */}
        <div className="flex min-h-0 flex-col items-center justify-center rounded-2xl border border-border bg-[oklch(0.14_0_0)] p-3">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="h-full w-full touch-none select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid horizontal + labels Y */}
            {gridLines.map((c) => (
              <g key={c}>
                <line
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={y(c)}
                  y2={y(c)}
                  stroke="oklch(0.28 0 0)"
                  strokeWidth={1}
                />
                <text
                  x={PAD.left - 8}
                  y={y(c) + 4}
                  textAnchor="end"
                  className="fill-[oklch(0.6_0_0)] font-mono"
                  fontSize={11}
                >
                  {fmtUSD(c)}
                </text>
              </g>
            ))}

            {/* Ticks X */}
            {xTicks.map((v) => (
              <text
                key={v}
                x={x(v)}
                y={H - PAD.bottom + 18}
                textAnchor="middle"
                className="fill-[oklch(0.6_0_0)] font-mono"
                fontSize={11}
              >
                {fmtVol(v)}
              </text>
            ))}
            <text
              x={PAD.left + plotW / 2}
              y={H - 6}
              textAnchor="middle"
              className="fill-[oklch(0.55_0_0)] font-mono"
              fontSize={11}
            >
              requests / mes
            </text>

            {/* Zona donde conviene lo local (a la derecha del cruce) */}
            <rect
              x={x(BREAK_EVEN)}
              y={PAD.top}
              width={W - PAD.right - x(BREAK_EVEN)}
              height={plotH}
              fill="oklch(0.6 0.13 230 / 0.07)"
            />

            {/* Línea API */}
            <line
              x1={x(0)}
              y1={y(apiCost(0))}
              x2={x(MAX_VOL)}
              y2={y(apiCost(MAX_VOL))}
              stroke="var(--color-ember, oklch(0.7 0.18 50))"
              strokeWidth={2.5}
            />
            {/* Línea Local */}
            <line
              x1={x(0)}
              y1={y(localCost(0))}
              x2={x(MAX_VOL)}
              y2={y(localCost(MAX_VOL))}
              stroke="oklch(0.65 0.18 250)"
              strokeWidth={2.5}
            />

            {/* Punto de cruce */}
            <line
              x1={x(BREAK_EVEN)}
              y1={PAD.top}
              x2={x(BREAK_EVEN)}
              y2={PAD.top + plotH}
              stroke="oklch(0.7 0 0)"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            <circle cx={x(BREAK_EVEN)} cy={y(apiCost(BREAK_EVEN))} r={4} fill="oklch(0.85 0 0)" />
            <text
              x={x(BREAK_EVEN)}
              y={PAD.top - 4}
              textAnchor="middle"
              className="fill-[oklch(0.8_0_0)] font-mono"
              fontSize={10}
            >
              se cruzan en {fmtVol(BREAK_EVEN)}
            </text>

            {/* Marcador del volumen actual */}
            <line
              x1={x(vol)}
              y1={PAD.top}
              x2={x(vol)}
              y2={PAD.top + plotH}
              stroke="oklch(0.85 0 0 / 0.5)"
              strokeWidth={1.5}
            />
            <circle
              cx={x(vol)}
              cy={y(api)}
              r={5}
              fill="var(--color-ember, oklch(0.7 0.18 50))"
              stroke="oklch(0.14 0 0)"
              strokeWidth={2}
            />
            <circle
              cx={x(vol)}
              cy={y(local)}
              r={5}
              fill="oklch(0.65 0.18 250)"
              stroke="oklch(0.14 0 0)"
              strokeWidth={2}
            />

            {/* Zona interactiva: clic o arrastre horizontal */}
            <rect
              x={PAD.left}
              y={PAD.top}
              width={plotW}
              height={plotH}
              fill="transparent"
              className="cursor-col-resize pointer-events-auto"
              onPointerDown={onPlotPointerDown}
              onPointerMove={onPlotPointerMove}
              onPointerUp={onPlotPointerUp}
              onPointerCancel={onPlotPointerUp}
            />
          </svg>
        </div>

        {/* Panel control + lectura */}
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface/50 p-5">
          <div>
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span>Volumen mensual</span>
              <span className="text-foreground">{vol.toLocaleString("es-AR")} req</span>
            </div>
            <input
              type="range"
              min={0}
              max={MAX_VOL}
              step={1000}
              value={vol}
              onChange={(e) => setVol(Number(e.target.value))}
              className="mt-2 w-full accent-ember pointer-events-auto"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div
              className={`rounded-xl border-2 p-4 transition-colors ${
                !localWins ? "border-ember bg-ember/10" : "border-border bg-surface/40"
              }`}
            >
              <div className="font-mono text-[11px] uppercase tracking-widest text-ember">API</div>
              <div className="mt-1 font-display text-2xl font-bold tabular-nums">{fmtUSD(api)}</div>
              <div className="text-[11px] text-muted-foreground">por mes</div>
            </div>
            <div
              className={`rounded-xl border-2 p-4 transition-colors ${
                localWins ? "border-blue-500 bg-blue-500/10" : "border-border bg-surface/40"
              }`}
            >
              <div className="font-mono text-[11px] uppercase tracking-widest text-blue-400">
                Local
              </div>
              <div className="mt-1 font-display text-2xl font-bold tabular-nums">
                {fmtUSD(local)}
              </div>
              <div className="text-[11px] text-muted-foreground">por mes</div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-[oklch(0.14_0_0)] p-4">
            <div className="text-sm leading-snug">
              {localWins ? (
                <>
                  A <span className="font-semibold text-foreground">{fmtVol(vol)} req/mes</span>, lo
                  propio sale{" "}
                  <span className="font-semibold text-blue-400">{fmtUSD(api - local)}</span> más
                  barato por mes.
                </>
              ) : (
                <>
                  A <span className="font-semibold text-foreground">{fmtVol(vol)} req/mes</span>, la
                  API sale <span className="font-semibold text-ember">{fmtUSD(local - api)}</span>{" "}
                  más barata por mes.
                </>
              )}
            </div>
          </div>

          <p className="mt-auto text-xs text-muted-foreground/80">
            Supuestos: API ${API_PER_REQ}/req · local ${LOCAL_FIXED}/mes fijos + ${LOCAL_PER_REQ}
            /req. El costo local NO incluye el tiempo de operar el modelo.
          </p>
        </div>
      </div>
    </div>
  );
}
