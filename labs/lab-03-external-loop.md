# Lab 03 — Loop externo

**Clase:** 3 | **Duración:** 45 min | **Elegí UNA opción**

## Objetivo

Implementar un loop cerrado: **trigger → agente → acción → verificación observable**.

---

## Opción A — Hook loop (dificultad baja)

**Ideal si:** no tenés Sentry/Linear.

1. Creá `.cursor/hooks.json` con evento `stop`.
2. Script que recuerde checklist de validación (ver `harnessed-app/.cursor/hooks/`).
3. Probá: pedí un fix al agente y verificá que al terminar pida evidencia de `validate:quick`.

**Entregable:** hooks.json + screenshot del follow-up message.

---

## Opción B — Session loop con `/loop` (dificultad media)

**Ideal si:** tenés `gh` y un PR abierto.

1. Abrí PR con el fix del Lab 02.
2. En Cursor Agents Window:

   ```text
   /loop 5m Revisá el CI del PR actual con gh. Si falla, diagnosticá y proponé fix scoped.
   ```

3. Dejá correr 2 ticks; documentá qué detectó.

**Entregable:** log de 2 iteraciones + estado final del PR.

---

## Opción C — Automation Sentry/Linear (dificultad alta)

**Ideal si:** MCP conectado y autenticado en Cursor.

1. Seguí [`instructor-demos/demo-sentry-loop.md`](../instructor-demos/demo-sentry-loop.md) sección "Setup alumno".
2. Usá plantilla [`templates/automation-sentry-fix.template.yaml`](../templates/automation-sentry-fix.template.yaml).
3. Draft en chat → aprobación → abrir Automations editor.
4. Dispará bug semilla; capturá PR o log del agente cloud.

**Entregable:** automation guardada + evidencia del trigger.

---

## Criterio común de éxito

| Paso | Observable |
|------|------------|
| Trigger | Algo externo o programado inicia el agente |
| Acción | Agente edita código o comenta con contexto |
| Verificación | Tests, CI o checklist explícito |
| Cierre | PR, comentario, o postmortem |

## Prep hackathon (5 min)

Leé [`hackathon/brief.md`](../hackathon/brief.md) y elegí con tu equipo qué loop van a construir el día del evento.
