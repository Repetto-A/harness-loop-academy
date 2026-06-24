# Guion Clase 2 — SDD + Agentes

**Duración total:** ~2h 30m | **Elevator pitch:** "Dejá de ser el linter humano."

## Materiales

- [`starter/harnessed-app`](../starter/harnessed-app)
- [`instructor-demos/demo-sdd-healthcheck.md`](../instructor-demos/demo-sdd-healthcheck.md)
- [`labs/lab-02-sdd-change.md`](../labs/lab-02-sdd-change.md)
- Templates en [`templates/spec-*.template.md`](../templates/)

---

## 0:00 – 0:05 | Puente desde Clase 1

**Decir:**

> Clase 1: el harness dice *cómo* trabajar. Hoy: *qué* construir antes de codear, en archivos que sobreviven a la ventana de contexto.

---

## 0:05 – 0:25 | SDD — 8 fases, 4 en slide (20 min)

Pizarra:

```txt
explore → propose → spec → design → tasks → apply → verify → archive
```

| Concepto | Mensaje |
|----------|---------|
| Artefactos > chat | Specs en `specs/{feature}/` persisten |
| Verify no arregla | Solo evidencia; apply arregla |
| Batches | Max 2–3 archivos por apply |
| Orchestrator delgado | Vos coordinás fases; agente ejecuta una a la vez |

Mostrar estructura en [`starter/harnessed-app/specs/`](../starter/harnessed-app/specs/).

---

## 0:25 – 0:45 | Tipos de artefactos (20 min)

| Archivo | Contiene | NO contiene |
|---------|----------|-------------|
| `proposal.md` | Problema, alternativas, scope | Código |
| `spec.md` | Criterios de aceptación verificables | Diseño de clases |
| `design.md` | Archivos, interfaces, riesgos | User stories repetidas |
| `tasks.md` | Batches con done criteria | "Implementar todo" |
| `verification.md` | Comandos + evidencia | Fixes |
| `archive.md` | Post-mortem, desviaciones | Spec activa |

---

## 0:45 – 1:00 | Subagentes (15 min)

Cuándo sí: explore en repo grande, security review en paralelo, verify fresco.

Cuándo no: change de 10 líneas, mismo agente con spec clara.

**Copilot:** pedir revisión en chat separado ("solo reportá, no cambies código").

**Hooks (2 min, bonus):** Cursor tiene `.cursor/hooks.json`; Copilot usa scripts en AGENTS. No profundizar.

---

## 1:00 – 1:40 | Demo SDD healthcheck (40 min)

Seguir [`demo-sdd-healthcheck.md`](../instructor-demos/demo-sdd-healthcheck.md).

Change: `add-health-version` en harnessed-app.

**Subagent paralelo (min 30):** security review de `/health` mientras apply corre.

**Fallo opcional:** saltear verify → mostrar deuda.

---

## 1:40 – 1:50 | Verify no arregla (10 min)

Demo rápida o narrada: verify reporta FAIL; apply en batch siguiente arregla.

---

## 1:50 – 2:15 | Lab alumno (25 min)

[`lab-02-sdd-change.md`](../labs/lab-02-sdd-change.md) — change acotado con spec + verify.

Ayudar con: tasks sin criterios, verify mezclado con apply.

---

## 2:15 – 2:30 | Cierre + teaser loops (15 min)

**Takeaways:**

1. Specs persisten; el chat no.
2. Batches chicos; verify con evidencia.
3. Archive cierra el ciclo.

**Bonus (2 slides):** loops = siguiente nivel — material en [`class-scripts/clase-03.md`](clase-03.md).

| Pregunta | Respuesta |
|----------|-----------|
| ¿SDD para todo? | No — one-liner ok; >3 archivos o API → spec |
| ¿Gentle AI necesario? | No — prompts en chat alcanzan |

---

## Checklist pre-clase

- [ ] harnessed-app con `npm install`
- [ ] Templates `spec-*.template.md` a mano
- [ ] Carpeta `specs/add-health-version/` vacía o con placeholders
- [ ] Slides: `/harness-02`
