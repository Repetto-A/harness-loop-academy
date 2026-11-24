/**
 * Shell IT Patagonia para decks Claude Architect.
 * Acento magenta #FF00BF, Encode Sans + Roboto (vía .itp-deck).
 * Misma API que Deck05Shell para migrar decks sin reescribir layouts.
 */
import type React from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export type ItpBg = "default" | "accent" | "panel" | "light";

function SlideBackdrop({ bg }: { bg: ItpBg }) {
  if (bg === "accent") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -right-[20%] -top-[30%] h-[70%] w-[55%] rounded-full bg-black/15 blur-3xl" />
        <div className="absolute -bottom-[25%] -left-[15%] h-[60%] w-[45%] rounded-full bg-black/10 blur-3xl" />
      </div>
    );
  }

  if (bg === "light") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-white" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_10%,rgba(255,0,191,0.08),transparent_50%)]" />
      </div>
    );
  }

  if (bg === "panel") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_85%,rgba(255,0,191,0.12),transparent_55%)]" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,rgba(255,0,191,0.16),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_90%,rgba(26,208,251,0.06),transparent_45%)]" />
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
}

const BG_CLASS: Record<ItpBg, string> = {
  default: "bg-[#0a0a0a] text-white",
  accent: "bg-[#FF00BF] text-black",
  panel: "bg-[#141414] text-white",
  light: "bg-white text-black",
};

export function Shell({
  children,
  bg = "default",
  section,
  flush = false,
  brandChrome = false,
}: {
  children: React.ReactNode;
  bg?: ItpBg;
  section?: string;
  flush?: boolean;
  /** Logo / handle ITP en esquinas (cover y cierre) */
  brandChrome?: boolean;
}) {
  return (
    <div className={`itp-deck relative flex h-full w-full flex-col ${BG_CLASS[bg]}`}>
      <SlideBackdrop bg={bg} />
      {brandChrome && (
        <>
          <div className="pointer-events-none absolute left-10 top-8 z-10 font-[family-name:var(--font-itp-display)] text-sm font-semibold tracking-wide text-white/90">
            IT Patagonia
          </div>
          <div className="pointer-events-none absolute bottom-8 left-10 z-10 space-y-0.5 font-[family-name:var(--font-itp-body)] text-xs text-white/60">
            <div>@itpatagonia</div>
            <div>www.itpatagonia.com</div>
          </div>
        </>
      )}
      {section && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-8 top-8 z-10 font-[family-name:var(--font-itp-display)] text-[clamp(3rem,8vh,5.5rem)] font-bold leading-none tracking-tighter text-[#FF00BF]/20"
        >
          {section}
        </div>
      )}
      <div
        className={[
          "relative z-[1] flex min-h-0 flex-1 flex-col",
          flush ? "p-0" : "px-32 py-28",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

export function RevealStack({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: reduce ? 0 : 0.05 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: reduce ? 0 : 20,
          filter: reduce ? "none" : "blur(6px)",
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: reduce ? 0.01 : 0.45, ease: EASE_OUT },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function DeckCard({
  children,
  accent,
  className,
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-6 transition-colors",
        accent
          ? "border-2 border-[#FF00BF] bg-[#FF00BF]/10 shadow-[0_0_40px_rgba(255,0,191,0.12)]"
          : "border-white/15 bg-white/5 backdrop-blur-sm",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function SlideTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`font-[family-name:var(--font-itp-display)] text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-tight text-balance ${className ?? ""}`}
    >
      {children}
    </h2>
  );
}

export function SlideLead({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`font-[family-name:var(--font-itp-body)] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug text-[#a3a3a3] text-pretty ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

export function StatementSlide({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="flex flex-1 items-center"
      initial={{ opacity: 0, y: reduce ? 0 : 16, filter: reduce ? "none" : "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: reduce ? 0.01 : 0.65, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

type Cols = 2 | 3 | 4;

const COL_CLASS: Record<Cols, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export function CardGrid({
  cols,
  items,
  render,
  gap = "gap-4",
}: {
  cols: Cols;
  items: readonly unknown[];
  render: (item: unknown, index: number) => React.ReactNode;
  gap?: string;
}) {
  return (
    <RevealStack className={`grid ${COL_CLASS[cols]} ${gap} items-stretch`}>
      {items.map((item, i) => (
        <RevealItem key={i} className="h-full">
          {render(item, i)}
        </RevealItem>
      ))}
    </RevealStack>
  );
}
