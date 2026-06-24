# Hackathon — Construí tu Agent Harness MVP

## Formato

| | |
|---|---|
| **Duración** | 4–8 horas |
| **Equipos** | 2–4 desarrolladores |
| **Repo** | Proyecto real del equipo (recomendado) o fork de `starter/harnessed-app` |
| **Mentoría** | 1 instructor cada 2 equipos |

## Enunciado

> En tu repo real, implementá un **harness mínimo viable** y **un loop externo** que demuestre valor medible.
>
> No construyan un "coding agent" genérico — construyan **infraestructura** que haga predecible a quien ya usa IA en el equipo.

## Entregables obligatorios

1. **`AGENTS.md`** + al menos 1 rule (`.cursor/rules/`) o skill (`.cursor/skills/`) propio del dominio
2. **Matriz de validación** documentada en `docs/validation-matrix.md` con tiers quick/ui/full
3. **Un loop cerrado** demostrable — elegir uno:
   - Sentry o Linear → agente → PR
   - Comentario en PR → agente → push fix
   - Cron → agente → reporte (Slack/email/doc)
   - Hook loop con gate de tests al terminar sesión
4. **Evidencia:** PR mergeado **o** video ≤3 min + logs de validación
5. **Postmortem** de 5 líneas ([template](../templates/postmortem.template.md)): qué regla/skill agregaron porque el agente falló

## Lo que NO cuenta

- Solo instalar Gentle AI sin artefactos en el repo
- Prompt largo en un gist sin `AGENTS.md`
- Automation que solo postea "hello world"
- PR sin tests corridos (evidencia requerida)

## Timeline sugerido (8h)

| Hora | Actividad |
|------|-----------|
| 0:00 | Kickoff, formar equipos, elegir repo y tipo de loop |
| 0:30 | Bootstrap AGENTS + validation matrix |
| 1:30 | SDD mini: spec de 1 change acotado |
| 3:00 | Implementar change + verify |
| 4:00 | Almuerzo / break |
| 4:30 | Construir loop externo |
| 6:30 | Integración, evidencia, postmortem |
| 7:30 | Presentaciones 5 min/equipo |
| 8:00 | Premios + retrospectiva |

Timeline 4h: combinar bootstrap + 1 change + loop conservador (hook o `/loop`).

## Presentación final (5 min/equipo)

1. Demo del loop (live o video)
2. Mostrar AGENTS.md — qué regla es más importante
3. Postmortem: 1 fallo del agente → 1 mejora durable
4. Métrica: ¿qué ahorrarían por semana?

## Premios sugeridos

- **Mejor loop externo** — automation más útil para el negocio
- **Harness más limpio** — menos líneas, más efecto
- **Mejor recovery** — postmortem que más mejoró el sistema

## Soporte durante el evento

- Canal Slack/Discord con prefix `#harness-help`
- Office hours cada 90 min
- [`hackathon/checklist-entrega.md`](checklist-entrega.md) como guía de entrega

## Prerrequisitos

Completar Clases 1–3 o equivalente. Tener Cursor + Gentle AI + acceso git.
