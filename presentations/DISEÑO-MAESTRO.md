# Diseño maestro — 2 clases × ~2.5h (Copilot-first)

Formato visual: smart-prompts deck pattern

**Principio:** las slides son **anclas visuales**. La demo en vivo es el contenido principal.

**Herramienta alumno:** GitHub Copilot. **Instructor:** puede usar Cursor.

---

## Clase 1 — Context engineering

**Promesa:** Dejá de repetir lo mismo en cada chat.

| # | id | Tipo | Tiempo acum. | En pantalla | Qué decís |
|---|-----|------|--------------|-------------|-----------|
| 1 | cover | portada | 0:00 | Título | ~2.5h, contexto durable |
| 2 | thesis | ember | 0:02 | "El chat se olvida. El repo no." | Tesis |
| 3 | problem | grid | 0:07 | Síntomas del caos | "¿Les pasa?" |
| 4 | prompting | code 2col | 0:12 | Prompt malo vs bueno | Rol, restricciones, verify |
| 5 | context-window | ember | 0:17 | Ventana = bottleneck | Archivos > mega-prompt |
| 6 | harness-vs-loop | grid | 0:20 | Harness hoy / Loop bonus | No profundizar loops |
| 7 | files | grid | 0:25 | AGENTS, copilot-instructions, docs | ~120 líneas max |
| 8 | copilot-cursor | split | 0:30 | Copilot vs Cursor | Mismo repo |
| 9 | anti | grid | 0:33 | Anti-patterns | 2 min |
| 10 | demo-prompt | code | 0:35 | Prompt producción | Chat nuevo × 2 |
| 11 | demo-live | panel | 0:37–1:02 | broken-app | test:all wow |
| 12 | demo-wow | ember | 1:02 | Tests verdes ≠ listo | Punchline |
| 13 | demo-harnessed | panel | 1:04–1:25 | harnessed-app | validate:closeout |
| 14 | lab | grid | 1:25 | Misión + 1 regla | 20 min |
| 15 | bridge | panel | 1:45 | Spec antes de código | Puente clase 2 |
| 16 | closing | ember | 1:48 | Cierre | |

---

## Clase 2 — Spec antes de código

**Promesa:** Artefactos que sobreviven a la ventana de contexto.

| # | id | Tiempo | En pantalla | Qué decís |
|---|-----|--------|-------------|-----------|
| 1 | cover | 0:00 | Spec antes de código | Repaso 30s |
| 2 | recap | 0:03 | Harness = CI/CD agente | |
| 3 | spec-folder | 0:05 | harnessed-app | Carpeta specs/ |
| 4 | spec-tree | 0:10 | 6 archivos por feature | Qué va / qué no |
| 5 | before-after | 0:15 | Chat vs spec | |
| 6 | sdd-8 | 0:20 | 8 fases → 4 en slide | explore…archive |
| 7 | verify | 0:25 | Verificar no arregla | |
| 8 | spec-example | 0:30 | Fragmento spec.md | |
| 9 | demo-sdd | 0:32–1:12 | add-health-version | Prompts en chat |
| 10 | subagents | 1:12 | Cuándo sí / no | |
| 11 | lab | 1:17 | lab-02 | 25 min |
| 12 | bridge | 1:42 | Bonus loops | 2 min |
| 13 | closing | 1:45 | Cierre | |

---

## Material extra (no en programa 2 clases)

- **Clase 3** — [`deck-clase-03.tsx`](decks/deck-clase-03.tsx): loops, Sentry, hackathon
- **Hackathon** — [`hackathon/`](../hackathon/)

---

## Integración smart-prompts

Decks fuente: [`presentations/decks/`](decks/)  
Copia activa: [`_ref-smart-prompts/src/slides/`](../_ref-smart-prompts/src/slides/)

Rutas: `/harness-01`, `/harness-02`, `/harness-03` (bonus)
