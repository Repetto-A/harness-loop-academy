/**
 * HackaTwin — apoyo. Pocas slides, sin membrete.
 */
import type React from "react";
import { SlideShell } from "@/components/SlideShell";

export interface SlideDefHackatwin {
  id: string;
  title: string;
  notes: string;
  Component: React.ComponentType<{ step?: number }>;
  steps?: number;
}

function Shell({
  children,
  bg = "default",
}: {
  children: React.ReactNode;
  bg?: "default" | "ember" | "panel";
}) {
  return (
    <SlideShell noChrome bg={bg}>
      {children}
    </SlideShell>
  );
}

const Cover = () => (
  <Shell>
    <div className="flex h-full items-center">
      <h1 className="font-display text-8xl font-bold leading-[0.92]">
        Cómo sobrevivir
        <br />
        <span className="text-ember">una hackathon.</span>
      </h1>
    </div>
  </Shell>
);

const Explore = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-12">
      <h2 className="font-display text-6xl font-bold">En equipo. Qué áreas explorar.</h2>
      <div className="grid grid-cols-2 gap-6">
        {["A quién le duele", "Qué se hace a mano", "Qué se puede mostrar", "Qué track"].map((t) => (
          <div key={t} className="font-display text-4xl font-bold">
            {t}
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const Kill = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-12">
      <h2 className="font-display text-6xl font-bold">Si quieren ganar, mátenlas.</h2>
      <div className="grid grid-cols-2 gap-8">
        {["Las muy comunes", "Las que no cierran", "Las sin mercado", "Cachivaches por sponsors"].map(
          (t) => (
            <div key={t} className="font-display text-4xl font-bold">
              {t}
            </div>
          ),
        )}
      </div>
    </div>
  </Shell>
);

const Before = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-10">
      <h2 className="font-display text-6xl font-bold">Antes de codear.</h2>
      <div className="flex flex-col gap-4 font-display text-5xl font-bold leading-tight">
        <div>Qué van a contar.</div>
        <div>El aha.</div>
        <div className="text-ember">Que funcione.</div>
      </div>
    </div>
  </Shell>
);

const Pitch = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-8">
      {[
        ["1", "Problema", "Que duela."],
        ["2", "Qué hicieron", "Lo que está en la pantalla."],
        ["3", "Por qué ustedes", "Este equipo, este problema."],
        ["4", "Qué piden", "Plata, que la prueben, lo que sea."],
      ].map(([n, t, d]) => (
        <div key={n} className="grid grid-cols-[80px_1fr] gap-6 items-baseline">
          <div className="font-mono text-ember text-4xl">{n}</div>
          <div>
            <div className="font-display text-5xl font-bold leading-none">{t}</div>
            <div className="mt-2 text-2xl text-muted-foreground">{d}</div>
          </div>
        </div>
      ))}
    </div>
  </Shell>
);

const Leverage = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-12">
      <h2 className="font-display text-6xl font-bold">¿Cómo nos apalancamos?</h2>
      <div className="grid grid-cols-2 gap-8">
        {["Ventana de contexto", "Skills", "MCP", "SDD"].map((t) => (
          <div key={t} className="font-display text-5xl font-bold">
            {t}
          </div>
        ))}
      </div>
    </div>
  </Shell>
);

const Persistence = () => (
  <Shell>
    <div className="flex-1 flex flex-col justify-center gap-12">
      <h2 className="font-display text-6xl font-bold">Y que no se pierda.</h2>
      <div className="flex flex-col gap-4 font-display text-5xl font-bold">
        <div>Engram</div>
        <div>RAG</div>
        <div>Grafo</div>
      </div>
    </div>
  </Shell>
);

const slides: SlideDefHackatwin["Component"][] = [
  Cover,
  Explore,
  Kill,
  Before,
  Pitch,
  Leverage,
  Persistence,
];

const titles = ["Portada", "Explorar", "Matar", "Antes", "Pitch", "Apalancarnos", "Persistencia"];

export const slidesHackatwin: SlideDefHackatwin[] = slides.map((Component, i) => ({
  id: `ht-${i + 1}`,
  title: titles[i],
  notes: "",
  Component,
}));
