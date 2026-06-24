# Demo SDD: Health check endpoint

**Clase:** 2 | **Duración:** ~40 min | **Repo:** `harnessed-app`

**Herramientas:** GitHub Copilot Chat (alumnos) o Cursor Agent (instructor). **No requiere Gentle AI.**

## Objetivo

SDD end-to-end en un change distinto al bug semilla.

**Change:** `add-health-version` — extender `GET /health` con `{ status, version, uptime }`.

---

## Script

| Min | Fase | Acción |
|-----|------|--------|
| 0–5 | Contexto | "El harness dice cómo; SDD dice qué." |
| 5–12 | explore | Agente lee server.js, tests, package.json — **sin implementar** |
| 12–18 | propose + spec | Escribir `specs/add-health-version/proposal.md` y `spec.md` |
| 18–22 | design + tasks | `design.md` + `tasks.md` en 2 batches |
| 22–35 | apply batch 1 | Solo implementación + test (max 2 archivos) |
| 35–38 | verify | Evidencia en `verification.md` — **no arreglar si falla** |
| 38–40 | archive | `archive.md` + actualizar current-state si aplica |

---

## Prompts (copiar en chat nuevo por fase)

### Explore

```text
Explorá server.js, tests y package.json. Documentá estado actual de GET /health
y qué habría que cambiar para agregar version (desde package.json) y uptime.
No implementes todavía.
```

### Proposal

```text
Escribí specs/add-health-version/proposal.md usando templates/spec-proposal.template.md:
problema, alternativas, scope acotado (máximo 2 archivos de código).
```

### Spec

```text
Escribí specs/add-health-version/spec.md con criterios de aceptación verificables
y tests esperados. Usá templates/spec-spec.template.md.
```

### Design

```text
Escribí specs/add-health-version/design.md: archivos a tocar, shape de respuesta JSON,
de dónde sale version. Usá templates/spec-design.template.md.
```

### Tasks

```text
Escribí specs/add-health-version/tasks.md en 2 batches:
Batch 1: implementación + test en server.js
Batch 2: actualizar docs/current-state.md
Usá templates/spec-tasks.template.md.
```

### Apply — Batch 1

```text
Implementá solo Batch 1 de specs/add-health-version/tasks.md.
Corré npm test antes de cerrar. No toques Batch 2.
```

### Verify

```text
Ejecutá npm test y npm run validate:quick si existe.
Escribí specs/add-health-version/verification.md con evidencia (exit codes y resumen).
No arregles si falla — solo reportá.
```

### Archive

```text
Si verification PASS, escribí specs/add-health-version/archive.md con tradeoffs
y si docs/current-state.md quedó actualizado.
```

---

## Subagent paralelo (~min 30)

Chat separado (Copilot o Cursor):

```text
Revisá si GET /health expone algo sensible en este repo.
Solo reporte — no cambies código.
```

---

## Fallo a propósito (opcional)

Saltear verify una vez → mostrar test rojo → "verify no arregla, reporta."

---

## Entregables visibles

- Carpeta `specs/add-health-version/` con 6 archivos
- `git diff` en server.js + test
- `verification.md` con PASS
- Línea en `docs/decision-log.md` si hubo desviación

---

## Gentle AI (solo instructor, opcional)

Si tenés Gentle AI instalado, podés mapear fases a `/sdd-explore`, `/sdd-apply`, etc.
**No enseñar esto a alumnos con solo Copilot.**
