/**
 * Primitivas de slide para Encuentro 5.
 * Patrones adaptados de frontend-slides: viewport-fit, reveals escalonados,
 * fondos con profundidad, densidad controlada, prefers-reduced-motion.
 */
import type React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SlideShell } from "@/components/SlideShell";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type Bg = "default" | "ember" | "panel";

function SlideBackdrop({ bg }: { bg: Bg }) {
  if (bg === "ember") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -right-[20%] -top-[30%] h-[70%] w-[55%] rounded-full bg-[oklch(0.18_0_0/0.12)] blur-3xl" />
        <div className="absolute -bottom-[25%] -left-[15%] h-[60%] w-[45%] rounded-full bg-[oklch(0.18_0_0/0.08)] blur-3xl" />
      </div>
    );
  }

  if (bg === "panel") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_85%,oklch(0.66_0.18_38/0.12),transparent_55%)]" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,oklch(0.66_0.18_38/0.14),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_90%,oklch(0.32_0_0/0.5),transparent_45%)]" />
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
}

export function Shell({
  children,
  bg = "default",
  noChrome = true,
  section,
  flush = false,
}: {
  children: React.ReactNode;
  bg?: Bg;
  noChrome?: boolean;
  /** Número de sección (estilo Bold Signal) */
  section?: string;
  /** Ocupa casi todo el viewport (slides con diagrama o imagen) */
  flush?: boolean;
}) {
  return (
    <SlideShell noChrome={noChrome} bg={bg}>
      <SlideBackdrop bg={bg} />
      {section && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-8 top-8 z-10 font-mono text-[clamp(3rem,8vh,5.5rem)] font-bold leading-none tracking-tighter text-ember/20"
        >
          {section}
        </div>
      )}
      <div
        className={[
          "relative z-[1] flex min-h-0 flex-1 flex-col",
          flush ? "-mx-32 -my-32 h-full" : "",
        ].join(" ")}
      >
        {children}
      </div>
    </SlideShell>
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
          ? "border-2 border-ember bg-ember/10 shadow-[0_0_40px_oklch(0.66_0.18_38/0.08)]"
          : "border-border bg-surface/80 backdrop-blur-sm",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function SlideTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-tight text-balance ${className ?? ""}`}>
      {children}
    </h2>
  );
}

export function SlideLead({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug text-muted-foreground text-pretty ${className ?? ""}`}>
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
