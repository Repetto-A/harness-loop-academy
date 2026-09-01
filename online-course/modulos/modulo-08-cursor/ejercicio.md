# Ejercicio — Bootstrap harness en Cursor (Módulo 8)

**Duración:** ~20 min | **Contexto:** curso online corporativo (módulo autónomo)

## Objetivo

Tener en tu repo (o fork de `starter/harnessed-app`) un harness mínimo funcional en Cursor: contrato raíz, una regla scoped, un skill y validación reproducible.

## Pasos

### A — AGENTS.md (8 min)

1. Copiá [`templates/AGENTS.md.template`](../../../templates/AGENTS.md.template) a la raíz del proyecto.
2. Completá con datos reales de tu stack (máx. ~120 líneas).
3. Documentá la boot sequence: qué archivos debe leer el agente antes de codear.

### B — Una regla (5 min)

Creá `.cursor/rules/<dominio>.mdc` con glob acotado (ej. `src/api/**/*.js`). Inspiración en el demo: `.cursor/rules/api-errors.mdc` dentro de `starter/harnessed-app`.

### C — Un skill (5 min)

Creá `.cursor/skills/<nombre>/SKILL.md` para un proceso que repitás (review de API, migraciones, a11y). Estructura mínima:

```yaml
---
name: mi-skill
description: Cuándo usar este skill (frases que disparen al agente).
---
```

El agente descubre skills por el frontmatter; no hace falta registrarlas en otro archivo.

### D — Validación (2 min)

Agregá o documentá en `package.json`:

```json
"validate:quick": "npm run lint && npm test"
```

Ideal: también un `validate:closeout` si tu repo ya tiene lint + test + build.

## Entregable

- [ ] `AGENTS.md` en raíz
- [ ] 1 archivo en `.cursor/rules/`
- [ ] 1 skill en `.cursor/skills/<nombre>/SKILL.md`
- [ ] Captura: Agent en chat nuevo citando tu boot sequence o invocando el skill

## Criterios de éxito

El agente puede citar tu boot sequence y correr `validate:quick` (o `validate:closeout`) sin que se lo repitas en el prompt.

## Referencia demo

Guion y demo en vivo: [`GUION-GRABACION.md`](./GUION-GRABACION.md) · reset: [`instructor-demos/reset-clase1-demo.ps1`](../../../instructor-demos/reset-clase1-demo.ps1)
