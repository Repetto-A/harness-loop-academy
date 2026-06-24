# Lab 02 — Change SDD completo

**Clase:** 2 | **Duración:** 45 min | **Repo:** `harnessed-app` o tu proyecto con harness de Lab 01

## Objetivo

Un change SDD de punta a punta: explore → tasks → apply → verify, con evidencia de tests.

## Change sugerido (harnessed-app)

**Nombre:** `fix-missing-user-404`

**Scope:** Arreglar `getUserDisplayName` para devolver 404 en HTTP cuando el usuario no existe.

Alternativa en tu repo: endpoint `/health` con campo `version`, o validación de formulario.

## Paso 1 — Init (5 min)

```text
/sdd-init
```

O pedí al agente: *"Inicializá SDD en este proyecto en modo openspec o engram según detectes."*

Verificá que detecte Vitest y `validate:quick`.

## Paso 2 — Explore (10 min)

```text
/sdd-explore fix-missing-user-404
```

El agente debe leer `users.js`, `server.js`, tests existentes y reportar touchpoints.

**Vos validás:** ¿mencionó el bug semilla? ¿identificó tests que fallan?

## Paso 3 — Spec + tasks (10 min)

Pedí spec mínima usando [`templates/feature-spec.template.md`](../templates/feature-spec.template.md).

Criterios de aceptación obligatorios:

- [ ] `GET /api/users/999/display-name` → 404 JSON `{ error: "User not found" }`
- [ ] `npm test` verde
- [ ] `current-state.md` actualizado

## Paso 4 — Apply (15 min)

```text
/sdd-apply fix-missing-user-404
```

Reglas:

- Un writer; si tocás >3 archivos, el agente debería haber explorado antes.
- No mergear sin verify.

## Paso 5 — Verify (5 min)

```text
/sdd-verify fix-missing-user-404
```

Verify **no arregla** — solo reporta. Si hay CRITICAL, volvé a apply.

## Entregable

- Artefacto spec o tasks (path o screenshot Engram)
- Output de verify (pass/fail con evidencia)
- `git diff` del fix

## Bonus — Subagent de security

En paralelo: *"Lanzá subagente security reviewer en el diff actual."*

## Pregunta de cierre

> ¿En qué momento el inner loop te habría ahorrado tiempo si lo tuvieras antes?
