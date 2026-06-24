import type { SlideDefBase } from "@/slides/types";
import { ScaledSlide } from "./ScaledSlide";

interface Props {
  slides: SlideDefBase[];
  deckTitle: string;
  currentIndex: number;
  onSelect: (i: number) => void;
  onClose: () => void;
}

export function GridOverviewDeck({ slides, deckTitle, currentIndex, onSelect, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-background overflow-auto">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-8 py-4 flex items-center justify-between">
        <div>
          <div className="font-mono text-xs text-ember uppercase tracking-[0.3em]">
            grilla · {slides.length} slides
          </div>
          <div className="font-display text-xl font-bold mt-1">{deckTitle}</div>
        </div>
        <button
          onClick={onClose}
          className="font-mono text-sm text-muted-foreground hover:text-ember"
        >
          esc · volver
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 p-8">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onSelect(i)}
            className={`group text-left rounded-lg border-2 overflow-hidden bg-surface transition-all ${
              i === currentIndex
                ? "border-ember shadow-[0_0_0_4px_oklch(0.66_0.18_38_/_0.2)]"
                : "border-border hover:border-ember/50"
            }`}
          >
            <div className="aspect-video bg-background relative overflow-hidden">
              <ScaledSlide>
                <s.Component />
              </ScaledSlide>
            </div>
            <div className="px-4 py-3 flex items-center justify-between font-mono text-xs">
              <span className="text-ember">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-muted-foreground truncate ml-3">{s.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
