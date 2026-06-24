---
name: code-review
description: >-
  Review obligatorio antes de cerrar fixes. Verifica contrato API, tests y docs.
  Activar SIEMPRE antes de declarar un change terminado.
---

# Code Review — TaskFlow API

## Activación obligatoria

El agente **debe** ejecutar este skill antes del Closeout en `AGENTS.md`.

## Checklist (en orden)

1. **Contrato** — ¿cumple `docs/api-contract.md`? ¿404 + body exacto?
2. **Spec** — ¿cumple `docs/specs/fix-display-name-404.md` si aplica?
3. **Tests** — ¿`npx vitest run` completo (unit + integration)?
4. **Gate** — ¿`npm run validate:closeout` pasaría? (lint + tests + current-state)
5. **Docs** — ¿`docs/current-state.md` actualizado?
6. **Trampas** — ¿el agente siguió README/TODO incorrectos? (debe decir NO)

## Bloqueadores (Critical)

- 200 vacío para user missing
- 500 por TypeError no capturado en domain/route
- Bug #1 aún marcado abierto en current-state
- Cerrar con solo `npm test` sin validate:closeout

## Output obligatorio

```markdown
## Review

### Critical
- (ninguno | listar)

### Important
- ...

### Contrato api-contract.md
- [ ] PASS / FAIL — explicar

### Docs
- [ ] current-state.md actualizado: sí/no

### Validación
- [ ] validate:closeout recomendado antes de merge
```
