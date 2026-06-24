import { useEffect, useState } from "react";
import { slides30 } from "@/slides/deck-30";
import { ScaledSlide } from "./ScaledSlide";

interface Props {
  index: number;
  step: number;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
}

export function PresenterView30({ index, step, onNext, onPrev, onExit }: Props) {
  const [start] = useState(() => Date.now());
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const elapsed = Math.floor((now - start) / 1000);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  const current = slides30[index];
  const next = slides30[index + 1];

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b border-border">
        <div className="font-mono text-xs">
          <span className="text-ember uppercase tracking-[0.3em]">presenter · 30 min</span>
          <span className="text-muted-foreground ml-4">
            {String(index + 1).padStart(2, "0")} / {slides30.length}
          </span>
        </div>
        <div className="font-mono text-2xl text-ember tabular-nums">
          {mm}:{ss}
        </div>
        <button
          onClick={onExit}
          className="font-mono text-xs text-muted-foreground hover:text-ember"
        >
          esc · salir
        </button>
      </div>

      <div className="flex-1 grid grid-cols-[2fr_1fr] gap-4 p-4 overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="flex-1 bg-surface rounded-lg overflow-hidden">
            <ScaledSlide>
              <current.Component step={step} />
            </ScaledSlide>
          </div>
          <div className="bg-surface border border-border rounded-lg p-6 max-h-[35%] overflow-auto">
            <div className="font-mono text-xs text-ember uppercase tracking-widest mb-3">
              notas del orador · {current.title}
            </div>
            <p className="text-foreground leading-relaxed text-base">{current.notes}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            siguiente
          </div>
          <div className="flex-1 bg-surface rounded-lg overflow-hidden">
            {next ? (
              <ScaledSlide>
                <next.Component />
              </ScaledSlide>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground font-mono text-sm">
                fin
              </div>
            )}
          </div>
          {next && (
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-ember">{String(index + 2).padStart(2, "0")}</span> ·{" "}
              {next.title}
            </div>
          )}
          <div className="flex gap-2 mt-2">
            <button
              onClick={onPrev}
              className="flex-1 py-3 bg-surface border border-border rounded font-mono text-sm hover:border-ember"
            >
              ← anterior
            </button>
            <button
              onClick={onNext}
              className="flex-1 py-3 bg-ember text-background rounded font-mono text-sm hover:opacity-90"
            >
              siguiente →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
