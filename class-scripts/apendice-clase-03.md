# Apéndice — Clase 3 (Loop Engineering) · material bonus opcional

> **Estado:** fuera del programa núcleo de 2 clases Copilot-first.
> Es material **extra/opcional**: se dicta solo si hay tiempo, audiencia avanzada o
> demanda explícita. Los alumnos completan el curso (y la hackathon mínima) sin esta clase.

## Por qué es apéndice y no Clase 3 obligatoria

La reorientación Copilot-first condensó el programa a **2 clases**:

1. **Clase 1 — Context engineering** (harness en el repo)
2. **Clase 2 — Spec antes de código** (SDD con artefactos)

Loop engineering (automatizaciones, orchestrators multi-repo, Sentry→PR) es el **siguiente nivel**:
asume harness + SDD ya dominados y depende de herramientas e integraciones que **no** son
prerrequisito del curso. Por eso vive como apéndice, no como clase central.

## Requisitos adicionales (solo si dictás este apéndice)

Estos **no** son requisitos del curso de 2 clases; pedilos únicamente si vas a correr el apéndice:

- **MCP Sentry + GitHub autenticados** en el chat (ver `instructor-demos/demo-sentry-loop.md`).
- Un repo real con CI donde probar el loop al menos 1 vez antes (ver checklist en `class-scripts/clase-03.md`).
- Issue de Sentry pre-seeded y un PR de backup como fallback de demo.

### Herramientas opcionales mencionadas en el guion

El guion `class-scripts/clase-03.md` y `deck-clase-03.tsx` mencionan tooling **opcional** que
**no** forma parte del stack Copilot-first del curso:

- **Gentle AI** (bloque "Gentle AI doctor", per-phase models): opcional, solo si el instructor ya lo tiene.
  El núcleo del curso funciona con prompts en chat (Copilot/Cursor) — ver `instructor-demos/demo-sdd-healthcheck.md`.
- **Variante Linear** (issue → spec en PR): ilustrativa; no requerida.

Si dictás el apéndice sin estas herramientas, saltá esos bloques: el resto (loop chico Sentry→PR,
advertencias honestas, brief de hackathon) se sostiene solo.

## Materiales del apéndice

| Material | Ruta |
|----------|------|
| Guion completo | [`class-scripts/clase-03.md`](clase-03.md) |
| Notas de slides | [`../slides/clase-03-notas.md`](../slides/clase-03-notas.md) |
| Deck | [`../presentations/decks/deck-clase-03.tsx`](../presentations/decks/deck-clase-03.tsx) → ruta `/harness-03` (bonus) |
| Demo estrella | [`../instructor-demos/demo-sentry-loop.md`](../instructor-demos/demo-sentry-loop.md) |
| Lab | [`../labs/lab-03-external-loop.md`](../labs/lab-03-external-loop.md) |
| Hackathon | [`../hackathon/`](../hackathon/) |

## Cómo encaja con la hackathon

La hackathon **sí** está incluida como cierre del curso, pero su entregable mínimo
(harness viable + 1 loop documentado + evidencia) se puede lograr con lo visto en
Clases 1–2. El apéndice profundiza el "1 loop" para equipos que quieran ir más lejos.
