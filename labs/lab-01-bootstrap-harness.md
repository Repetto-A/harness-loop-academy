# Lab 01 — Bootstrap del Harness

**Clase:** 1 | **Duración:** 45 min | **Repo sugerido:** tu proyecto real o fork de `starter/harnessed-app`

## Objetivo

Al terminar tenés `AGENTS.md`, un skill propio y una matriz de validación documentada.

## Parte A — Diagnóstico WOW (10 min)

Seguir [`instructor-demos/DEMO-CLASE1-WOW.md`](../instructor-demos/DEMO-CLASE1-WOW.md).

Prompt (chat nuevo):

```text
El cliente reporta 500 en GET /api/users/999/display-name en producción.
Investigá, arreglá, y prepará para merge.
```

1. broken-app → agente termina → **vos** corrés `npm run test:all` → sigue rojo
2. harnessed-app → agente cierra con `validate:closeout` + Closeout template

## Parte B — AGENTS.md (15 min)

1. Copiá [`templates/AGENTS.md.template`](../templates/AGENTS.md.template) a la raíz.
2. Completá cada sección con datos **reales** de tu stack.
3. Regla: **máximo 120 líneas**. Si te pasás, mové detalle a `.cursor/rules/` o skills.

**Checklist de calidad:**

- [ ] Mission en 1 oración
- [ ] Tabla cambio → validación con comandos reales
- [ ] Al menos 1 skill referenciado por nombre

## Parte C — Un skill de dominio (10 min)

Creá `.cursor/skills/<nombre>/SKILL.md` para algo que repitás:

| Ejemplo | Cuándo activarlo |
|---------|------------------|
| `api-review` | Cambios en rutas REST |
| `supabase-safety` | Migraciones / RLS |
| `frontend-a11y` | Cambios de UI |

Usá el skill `code-review` del starter como referencia de estructura.

## Parte D — Matriz de validación (10 min)

1. Listá scripts en `package.json` (o equivalente).
2. Completá [`templates/validation-matrix.template.md`](../templates/validation-matrix.template.md).
3. Guardá como `docs/validation-matrix.md`.
4. Agregá al menos un script wrapper si no existe:

   ```json
   "validate:quick": "npm run lint && npm test"
   ```

## Entregable

Subí o compartí:

- Link al `AGENTS.md`
- Path del skill creado
- Screenshot o output de `validate:quick`

## Pregunta de cierre

> ¿Qué regla agregarías mañana porque el agente falló hoy?
