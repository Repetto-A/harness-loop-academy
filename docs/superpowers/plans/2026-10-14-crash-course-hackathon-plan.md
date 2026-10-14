# Plan — Crash course hackathon

Fuente de verdad: `docs/superpowers/specs/2026-10-14-crash-course-hackathon-design.md`.

## Tanda 1 — Textos (un solo writer)

1. `class-scripts/hackathon-crash-course.md`: guion minuto a minuto de los 8 bloques. Por bloque incluye lo que se dice (en primera persona de Ale, sin inventar anécdotas más allá de las del spec), las frases para clip marcadas con `🎬`, la transición al bloque siguiente y qué cortar si falta tiempo. Al final, una sección "Recorte 45–60 (Cande)".
2. `handouts/hackathon-crash-course-checklist.md`: el destino del QR. Contiene entorno sí / repo no, el checklist de la semana, el filtro de 5, la plantilla de pitch y el esqueleto de AGENTS.md de memoria.
3. `hackathon/grok-bot-chief-of-staff.md`: el template del bot (rol, instrucciones, herramientas, memoria, prompts de ejemplo). Ale lo carga en Grok Bot.
4. `instructor-demos/hackathon-somos-huella-runbook.md`: el runbook de la demo. Cubre la preparación del Repo 1 (corrida completa), el guion de comandos del Repo 2 en vivo, el punto de cambio al salvavidas, qué no abrir en pantalla, cómo encaja Select 26 y cómo resetear.

## Tanda 2 — Deck (un solo writer, después de la Tanda 1)

5. `_ref-smart-prompts/src/slides/deck-hackathon-crash-course.tsx`: un deck nuevo con el sistema existente (`SlideShell`, `PresentationDeck`). Las notas de presentador salen del guion. Sigue `presentations/DISEÑO-MAESTRO.md`.
6. `_ref-smart-prompts/src/routes/hackathon.tsx` + una entrada en el home (`routes/index.tsx`).
7. Verificación: build del paquete `_ref-smart-prompts`. El `routeTree.gen.ts` lo regenera el plugin.

## Fuera de esta tanda (lo hace Ale)

- Confirmar con Cande la regla del entorno.
- Verificar Select 26 contra el blog oficial.
- Correr el ensayo cronometrado y generar el Repo 1.
- Cargar el bot en Grok Bot.
- Rehacer la portada.
- Generar el QR cuando el checklist tenga URL pública.
