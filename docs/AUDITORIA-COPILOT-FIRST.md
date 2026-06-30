# Auditoría — Reorientación Copilot-first (cierre)

Auditoría final de la reorientación del programa de **3 clases** a **2 clases Copilot-first**
(commit `e659f41`, "Reorient academy to 2-class Copilot-first program"). Este documento cierra
el trabajo que los subagentes originales dejaron incompleto: **skeptical review final**,
**inventario completo de materiales** y **tracker de gaps P1/P2**.

---

## 1. Skeptical review final

### Lo que quedó sólido (verificado)

- **Mensaje Copilot-first consistente** en Clase 1 y 2: decks (`deck-clase-01/02.tsx`), guiones
  (`class-scripts/clase-01/02.md`), `DISEÑO-MAESTRO.md` y `copilot-instructions.md` apuntan a
  GitHub Copilot como herramienta del alumno y Cursor como opción del instructor.
- **Gentle AI degradado a opcional** donde corresponde: `clase-02.md` (Q&A "¿Gentle AI necesario? No"),
  `demo-sdd-healthcheck.md` ("No requiere Gentle AI") y notas de deck-clase-02.
- **Starters ejecutables**: `broken-app` y `harnessed-app` instalan y corren; el bug sembrado
  (500 en `GET /api/users/999/display-name`) sigue siendo el estado intencional de la demo WOW.
- **Decks fuente == desplegados**: `presentations/decks/deck-clase-0X.tsx` idénticos a
  `_ref-smart-prompts/src/slides/deck-clase-0X.tsx` (antes de esta auditoría).

### Hallazgos críticos (gaps que faltaban cerrar)

| ID | Sev | Hallazgo | Estado |
|----|-----|----------|--------|
| F1 | P1 | **No existía slide de requisitos Copilot para el admin/IT.** Un alumno que llega sin licencia/Chat no puede hacer los labs, y no había un único lugar que dijera qué provisionar. | ✅ Cerrado en este PR |
| F2 | P1 | **Clase 3 figuraba como "bonus" en lugares dispersos** (README, DISEÑO-MAESTRO, puente de Clase 2), pero `clase-03.md` se leía como clase obligatoria completa, sin framing de apéndice. | ✅ Cerrado en este PR |
| F3 | P2 | **Conteos de slides incorrectos** en `presentations/README.md`: decía 13/13/14 (rutas) y 13/14/15 (tabla) cuando los decks reales eran 16/13/14. | ✅ Cerrado en este PR |
| F4 | P2 | **Residuo Gentle AI en Clase 3**: el guion lista el bloque "Gentle AI doctor" sin marcarlo opcional, pese a que el curso ya no depende de Gentle AI. | ✅ Mitigado vía apéndice (marca Gentle AI como opcional); guion bonus intacto |

### Residuos conocidos (aceptados, baja prioridad)

- `presentations/DISEÑO-MAESTRO.md` mantiene tablas de timing aproximadas; tras agregar el slide
  de requisitos, Clase 1 pasa a 17 slides. La tabla maestra no se renumeró exhaustivamente porque
  los tiempos son orientativos y la demo en vivo domina. (P3)
- Los conteos en `presentations/README.md` ahora reflejan la realidad **post-cambio** (17/13/14).

---

## 2. Inventario completo de materiales

| Categoría | Archivos |
|-----------|----------|
| Programa / raíz | `README.md`, `TEST-AHORA.md`, `AGENTS.md`, `docs/SETUP-CLOUD.md`, `docs/AUDITORIA-COPILOT-FIRST.md` (este) |
| Guiones de clase | `class-scripts/clase-01.md`, `clase-02.md`, `clase-03.md` (bonus), `apendice-clase-03.md` (nuevo) |
| Notas de slides | `slides/clase-01-notas.md`, `clase-02-notas.md`, `clase-03-notas.md` |
| Handouts | `handouts/01-harness-fundamentals.md` |
| Presentaciones (fuente) | `presentations/README.md`, `presentations/DISEÑO-MAESTRO.md`, `presentations/decks/deck-clase-01/02/03.tsx` |
| App de slides | `_ref-smart-prompts/` (decks en `src/slides/`, rutas `/`, `/harness-01..03`, `/ia-bien-usada`) |
| Starter sin harness | `starter/broken-app/` (`src/`, `README.md`, `CONTRIBUTING.md`) |
| Starter con harness | `starter/harnessed-app/` (`src/`, `docs/`, `scripts/`, `.cursor/`, `.github/copilot-instructions.md`, `AGENTS.md`) |
| Labs | `labs/lab-01-bootstrap-harness.md`, `lab-02-sdd-change.md`, `lab-03-external-loop.md` |
| Demos instructor | `instructor-demos/DEMO-CLASE1-WOW.md`, `demo-sdd-healthcheck.md`, `demo-sentry-loop.md`, `reset-clase1-demo.ps1`, `seeded-bug/` |
| Templates | `templates/AGENTS.md.template`, `spec-*.template.md`, `validation-matrix.template.md`, `automation-sentry-fix.template.yaml`, `postmortem.template.md` |
| Hackathon | `hackathon/brief.md`, `rubric.md`, `checklist-entrega.md` |

### Cobertura por clase

| Clase | Guion | Notas | Deck | Demo | Lab | Estado |
|-------|-------|-------|------|------|-----|--------|
| 1 — Context engineering | ✅ | ✅ | ✅ (17) | ✅ WOW | ✅ lab-01 | Núcleo |
| 2 — Spec antes de código | ✅ | ✅ | ✅ (13) | ✅ SDD healthcheck | ✅ lab-02 | Núcleo |
| 3 — Loop engineering | ✅ + apéndice | ✅ | ✅ (14) | ✅ Sentry loop | ✅ lab-03 | **Bonus / opcional** |

---

## 3. Tracker de gaps P1/P2

| Gap | Prioridad | Acción | Entregable |
|-----|-----------|--------|------------|
| Slide "Requisitos Copilot (admin)" | P1 | Slide `c1-requisitos` agregado a deck-clase-01 (fuente + desplegado) | `deck-clase-01.tsx` ×2, `slides/clase-01-notas.md` |
| Apéndice Clase 3 (framing bonus + requisitos extra) | P1 | Doc de apéndice + banner en guion + enlaces en README | `class-scripts/apendice-clase-03.md`, `clase-03.md`, `README.md` |
| Conteos de slides corregidos | P2 | Sincronizados con los decks reales (17/13/14) | `presentations/README.md` |
| Residuo Gentle AI en Clase 3 | P2 | Marcado opcional desde el apéndice | `apendice-clase-03.md` |

**Cerrado:** los 4 gaps P1/P2 pendientes de la auditoría. Residuos P3 documentados arriba.
