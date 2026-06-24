import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slides } from "@/slides";
import { ScaledSlide } from "./ScaledSlide";
import { GridOverview } from "./GridOverview";
import { PresenterView } from "./PresenterView";
import { HelpOverlay } from "./HelpOverlay";

type Mode = "slide" | "grid" | "presenter";

export function Presentation() {
  const [index, setIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    const v = parseInt(localStorage.getItem("slide-index") ?? "0", 10);
    return isNaN(v) ? 0 : Math.min(Math.max(v, 0), slides.length - 1);
  });
  const [mode, setMode] = useState<Mode>("slide");
  const [showHelp, setShowHelp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("slide-index", String(index));
  }, [index]);

  const next = () => setIndex((i) => Math.min(i + 1, slides.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

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
        setIndex(slides.length - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  const current = slides[index];

  if (mode === "grid") {
    return (
      <GridOverview
        currentIndex={index}
        onSelect={(i) => {
          setIndex(i);
          setMode("slide");
        }}
        onClose={() => setMode("slide")}
      />
    );
  }

  if (mode === "presenter") {
    return (
      <PresenterView
        index={index}
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
              <current.Component />
            </ScaledSlide>
          </motion.div>
        </AnimatePresence>

        {/* click zones */}
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

      {/* footer bar */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-3 flex items-center gap-4 pointer-events-none">
        <div className="font-mono text-xs text-muted-foreground pointer-events-auto">
          <span className="text-ember">{String(index + 1).padStart(2, "0")}</span>
          <span className="opacity-50"> / {String(slides.length).padStart(2, "0")}</span>
          <span className="ml-4 opacity-60">{current.title}</span>
        </div>
        <div className="flex-1 h-[2px] bg-surface mx-4 overflow-hidden">
          <div
            className="h-full bg-ember transition-all duration-300"
            style={{ width: `${((index + 1) / slides.length) * 100}%` }}
          />
        </div>
        <div className="font-mono text-xs text-muted-foreground pointer-events-auto flex gap-3">
          <button onClick={() => setMode("grid")} className="hover:text-ember transition-colors">G grid</button>
          <button onClick={() => setMode("presenter")} className="hover:text-ember transition-colors">P presenter</button>
          <button onClick={toggleFullscreen} className="hover:text-ember transition-colors">F fullscreen</button>
          <button onClick={() => setShowHelp(true)} className="hover:text-ember transition-colors">? ayuda</button>
        </div>
      </div>

      {showHelp && <HelpOverlay onClose={() => setShowHelp(false)} />}
    </div>
  );
}
