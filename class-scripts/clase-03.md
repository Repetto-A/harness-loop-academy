# Guion Clase 3 — Loop Engineering + Hackathon Prep

> **Material bonus / opcional** — fuera del programa núcleo de 2 clases Copilot-first.
> Ver framing, requisitos extra y herramientas opcionales en
> [`apendice-clase-03.md`](apendice-clase-03.md).

**Duración total:** 2h 30m – 3h | **Elevator pitch:** "Dejá de ser el webhook."

## Materiales

- [`instructor-demos/demo-sentry-loop.md`](../instructor-demos/demo-sentry-loop.md)
- [`labs/lab-03-external-loop.md`](../labs/lab-03-external-loop.md)
- [`hackathon/brief.md`](../hackathon/brief.md)
- MCP Sentry + GitHub autenticados

---

## 0:00 – 0:15 | Tipos de loop

**Diagrama:**

```txt
Trigger externo / /loop / git CI → Agente → build+test → review → PR
```

| Loop | Mecanismo | Ejemplo |
|------|-----------|---------|
| Session | `/loop 5m` | vigilar CI |
| PR babysit | skill babysit | comentarios + CI |
| SDD | fases + verify | change completo |
| Automation | Sentry/Linear | issue → PR |
| Hook | stop / beforeShell | gate validación |

---

## 0:15 – 1:15 | Demo estrella — Sentry loop (60 min)

Seguir [`demo-sentry-loop.md`](../instructor-demos/demo-sentry-loop.md) minuto a minuto.

**Tener fallback listo** (recording o PR backup).

Narrar en cada paso: trigger → acción → verificación.

---

## 1:15 – 1:45 | Bloques adicionales (30 min)

| Tema | Min | Punto clave |
|------|-----|-------------|
| Cuándo NO automatizar | 10 | producto ambiguo, migraciones, secretos |
| MCP auth gate | 5 | autenticar en chat antes del editor |
| Observabilidad | 5 | qué loguear del agente |
| Gentle AI doctor | 5 | skill-registry, per-phase models |
| Variante Linear | 5 | issue created → spec en PR |

Demo corta `/babysit` si hay PR del Lab 02 (5 min).

---

## 1:45 – 2:30 | Lab alumno — elegir loop (45 min)

[`lab-03-external-loop.md`](../labs/lab-03-external-loop.md)

Opción A para mayoría; C para 1–2 equipos avanzados.

---

## 2:30 – 2:45 | Brief hackathon (15 min)

Leer [`hackathon/brief.md`](../hackathon/brief.md) en voz alta.

Formar equipos 2–4, confirmar repo real por equipo.

**Decir:**

> En la hackathon no construyen un chatbot — construyen infraestructura que hace predecible a quien ya usa IA.

---

## 2:45 – 3:00 | Q&A final

| Pregunta | Respuesta |
|----------|-----------|
| ¿Automation en prod día 1? | Empezar conservador: comentar en PR si CI falla |
| ¿Reemplaza on-call? | No — acelera triage y fixes mecánicos |

---

## Checklist pre-clase

- [ ] Automation probada 1x antes
- [ ] Issue Sentry pre-seeded
- [ ] PR backup branch
- [ ] hackathon/brief.md compartido con equipos
