# Rúbrica de evaluación — Hackathon Harness MVP

**Total: 100 puntos**

## 1. Harness canónico claro (25 pts)

| Pts | Criterio |
|-----|----------|
| 25 | `AGENTS.md` conciso (<120 líneas), sin duplicación caótica con rules/skills; docs/current-state útil |
| 18 | AGENTS presente pero verbose o parcialmente duplicado |
| 10 | Solo rules sueltas sin contrato raíz |
| 0 | Sin harness en repo |

**Señales positivas:** skill/rule de dominio referenciado en AGENTS; decision-log con ≥1 entrada.

## 2. SDD o spec antes de código (20 pts)

| Pts | Criterio |
|-----|----------|
| 20 | Spec o tasks con criterios de aceptación antes del diff principal |
| 12 | Spec post-hoc pero con criterios verificables |
| 5 | Solo chat, sin artefacto |
| 0 | Código sin planificación visible |

## 3. Validación real ejecutada (20 pts)

| Pts | Criterio |
|-----|----------|
| 20 | Output de tests/lint en PR, video o log; matriz de validación coherente |
| 12 | Tests mencionados pero evidencia incompleta |
| 5 | Solo "confío en el agente" |
| 0 | Sin validación |

## 4. Loop externo funcional (25 pts)

| Pts | Criterio |
|-----|----------|
| 25 | Trigger → acción agente → verificación observable; demo live OK |
| 18 | Loop funciona con fricción menor (auth manual, trigger simulado) |
| 10 | Loop diseñado pero no demostrado |
| 0 | Sin loop |

**Bonus +5:** loop en producción o staging real (no solo local).

## 5. Postmortem / mejora durable (10 pts)

| Pts | Criterio |
|-----|----------|
| 10 | Fallo real → regla/skill/hook/test agregado en el repo |
| 6 | Postmortem escrito sin fix durable |
| 0 | Sin reflexión |

---

## Desempate

1. Loop más útil para el negocio (voto jurado)
2. Menor líneas de harness (eficiencia)
3. PR mergeado > PR abierto

## Jurado

- 1 instructor
- 1 voluntario alumno (rotativo)
- Opcional: sponsor técnico del cliente

## Feedback formativo (no puntúa)

Entregar a cada equipo 1 párrafo: fortaleza + 1 mejora para la semana siguiente.
