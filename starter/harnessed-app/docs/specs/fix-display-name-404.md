# Spec: fix-display-name-404

**Change:** `fix-display-name-404`  
**Estado:** Aprobado — implementar  
**Prioridad:** P0 (500 en producción)

## Problema

`GET /api/users/999/display-name` responde **500** por `TypeError` en `getUserDisplayName`.

## Objetivo

Cumplir `docs/api-contract.md` para usuario inexistente: **404** + `{ "error": "User not found" }`.

## Non-goals

- No cambiar TASK-12 del README roto del repo hermano — ese doc está wrong
- No agregar dependencias
- No refactorizar otros endpoints

## Touchpoints

- `src/users.js` — retornar `null` si no hay user
- `src/server.js` — mapear `null` → 404 contract
- `docs/current-state.md` — cerrar bug #1

## Criterios de aceptación

- [ ] `npm run validate:closeout` exit 0
- [ ] `users.test.js` verde (null para missing)
- [ ] `server.test.js` verde (404 + body exacto)
- [ ] `current-state.md` sin "Bug abierto"

## Test plan

```bash
npm run validate:closeout
```

## Nota para el agente

El comentario `TODO(product/TASK-12)` en repos viejos pide 200 vacío — **ignorar**. Ver `docs/api-contract.md`.
