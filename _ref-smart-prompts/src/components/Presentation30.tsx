import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slides30 } from "@/slides/deck-30";
import { GridOverview30 } from "./GridOverview30";
import { HelpOverlay } from "./HelpOverlay";
import { PresenterView30 } from "./PresenterView30";
import { ScaledSlide } from "./ScaledSlide";

type Mode = "slide" | "grid" | "presenter";

export function Presentation30() {
  const [index, setIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    const v = parseInt(localStorage.getItem("slide-index-30") ?? "0", 10);
    return isNaN(v) ? 0 : Math.min(Math.max(v, 0), slides30.length - 1);
  });
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<Mode>("slide");
  const [showHelp, setShowHelp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("slide-index-30", String(index));
  }, [index]);

  useEffect(() => {
    setStep(0);
  }, [index]);

  const next = () => {
    const maxStep = slides30[index]?.steps ?? 0;
    if (step < maxStep) {
      setStep((s) => s + 1);
      return;
    }
    setIndex((i) => Math.min(i + 1, slides30.length - 1));
  };

  const prev = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      return;
    }
    setIndex((i) => Math.max(i - 1, 0));
  };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "g" || e.key === "G") {
        setMode((m) => (m === "grid" ? "slide" : "grid"));
      } else if (e.key === "p" || e.key === "P") {
        setMode((m) => (m === "presenter" ? "slide" : "presenter"));
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      } else if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        setShowHelp((s) => !s);
      } else if (e.key === "Escape") {
        setShowHelp(false);
        if (mode !== "slide") setMode("slide");
      } else if (e.key === "Home") {
        setIndex(0);
      } else if (e.key === "End") {
        setIndex(slides30.length - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, index, step]);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  const current = slides30[index];

  if (mode === "grid") {
    return (
      <GridOverview30
        currentIndex={index}
        onSelect={(i) => {
          setIndex(i);
          setStep(0);
          setMode("slide");
        }}
        onClose={() => setMode("slide")}
      />
    );
  }

  if (mode === "presenter") {
    return (
      <PresenterView30
        index={index}
        step={step}
        onNext={next}
        onPrev={prev}
        onExit={() => setMode("slide")}
      />
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 bg-background flex flex-col">
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <ScaledSlide>
              <current.Component step={step} />
            </ScaledSlide>
          </motion.div>
        </AnimatePresence>

        <button
          aria-label="anterior"
          onClick={prev}
          className="absolute left-0 top-0 bottom-0 w-[15%] cursor-w-resize opacity-0"
        />
        <button
          aria-label="siguiente"
          onClick={next}
          className="absolute right-0 top-0 bottom-0 w-[15%] cursor-e-resize opacity-0"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-6 py-3 grid grid-cols-[112px_minmax(0,1fr)] items-center gap-3 pointer-events-none">
        <div className="font-mono text-[11px] text-muted-foreground/70 pointer-events-none whitespace-nowrap overflow-hidden">
          <span className="text-ember">{String(index + 1).padStart(2, "0")}</span>
          <span className="opacity-50"> / {String(slides30.length).padStart(2, "0")}</span>
        </div>
        <div className="h-[2px] bg-surface/70 overflow-hidden">
          <div
            className="h-full bg-ember/85 transition-all duration-300"
            style={{ width: `${((index + 1) / slides30.length) * 100}%` }}
          />
        </div>
      </div>

      {showHelp && <HelpOverlay onClose={() => setShowHelp(false)} />}
    </div>
  );
}
